import { NextResponse } from "next/server"

type CartCreateItem = {
  nameRaw: string
  count?: number
}

type CartCreateRequest = {
  retailerId: string
  items: CartCreateItem[]
}

function toSearchQuery(nameRaw: string) {
  // Basic best-effort normalization: strip quantities/units and common prep words.
  // Keep it conservative to avoid producing empty queries.
  const s = nameRaw.toLowerCase()
  const withoutQtyUnits = s
    .replace(/\d+\.?\d*\s*(oz|lb|g|kg|cup|cups|tbsp|tsp|ml|l)\b/gi, " ")
    .replace(/\b(boneless|skinless|fresh|frozen|raw|cooked|diced|chopped|sliced|minced|trimmed)\b/gi, " ")
    .replace(/[,()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  return withoutQtyUnits.length > 0 ? withoutQtyUnits : nameRaw.trim()
}

function safeQty(count?: number) {
  const n = typeof count === "number" ? Math.floor(count) : 1
  return Number.isFinite(n) && n > 0 ? n : 1
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CartCreateRequest>
    const retailerId = typeof body.retailerId === "string" ? body.retailerId.trim() : ""
    const items = Array.isArray(body.items) ? body.items : []

    if (!retailerId) {
      return NextResponse.json({ error: "Missing retailerId" }, { status: 400 })
    }
    if (items.length === 0) {
      return NextResponse.json({ error: "No items selected" }, { status: 400 })
    }
    if (items.length > 60) {
      return NextResponse.json({ error: "Too many items (max 60)" }, { status: 400 })
    }

    const apiKey = process.env.INSTACART_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfigured: missing INSTACART_API_KEY" },
        { status: 500 }
      )
    }

    const baseUrl = process.env.INSTACART_API_BASE_URL || "https://connect.instacart.com/v2"
    // Impact / affiliate tracking:
    // Prefer server-only vars, but tolerate NEXT_PUBLIC_IMPACT_PARTNER_ID if that's how it's configured today.
    const impactPartnerId =
      process.env.IMPACT_PARTNER_ID ||
      process.env.NEXT_PUBLIC_IMPACT_PARTNER_ID ||
      null
    // If Instacart provided a specific campaign id, default to 20313 per your guide.
    const impactCampaignId =
      process.env.IMPACT_CAMPAIGN_ID ||
      "20313"

    const mappedItems: Array<{
      nameRaw: string
      query: string
      matched: boolean
      product?: any
      productId?: string
      quantity: number
      error?: string
    }> = []

    const cartLineItems: Array<{ product_id: string; quantity: number }> = []

    // Sequential to be kind to rate limits for MVP.
    for (const item of items) {
      const nameRaw = typeof item?.nameRaw === "string" ? item.nameRaw.trim() : ""
      if (!nameRaw) continue

      const quantity = safeQty(item.count)
      const query = toSearchQuery(nameRaw)

      try {
        const searchUrl = new URL(
          `${baseUrl.replace(/\/$/, "")}/retailers/${encodeURIComponent(retailerId)}/products/search`
        )
        searchUrl.searchParams.set("query", query)

        const resp = await fetch(searchUrl.toString(), {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })

        const text = await resp.text()
        if (!resp.ok) {
          mappedItems.push({
            nameRaw,
            query,
            matched: false,
            quantity,
            error: `Search failed: ${resp.status} ${resp.statusText}`,
          })
          continue
        }

        let data: any = {}
        try {
          data = text ? JSON.parse(text) : {}
        } catch {
          data = {}
        }

        const products = Array.isArray(data?.products) ? data.products : []
        const best = products[0]
        const productId: string | undefined =
          best?.id ? String(best.id) : best?.product_id ? String(best.product_id) : undefined

        if (!best || !productId) {
          mappedItems.push({
            nameRaw,
            query,
            matched: false,
            quantity,
            error: "No products found",
          })
          continue
        }

        mappedItems.push({
          nameRaw,
          query,
          matched: true,
          quantity,
          productId,
          product: {
            id: productId,
            name: best?.name,
            price: best?.price,
            image_url: best?.image_url || best?.image,
            size: best?.size,
          },
        })

        cartLineItems.push({ product_id: productId, quantity })
      } catch (e: any) {
        mappedItems.push({
          nameRaw,
          query,
          matched: false,
          quantity,
          error: e?.message || "Unknown mapping error",
        })
      }
    }

    if (cartLineItems.length === 0) {
      return NextResponse.json(
        { error: "No valid items to add to cart", mappedItems },
        { status: 400 }
      )
    }

    const cartResp = await fetch(`${baseUrl.replace(/\/$/, "")}/carts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        retailer_id: retailerId,
        items: cartLineItems,
      }),
    })

    const cartText = await cartResp.text()
    if (!cartResp.ok) {
      return NextResponse.json(
        { error: `Cart create failed: ${cartResp.status} ${cartResp.statusText}`, details: cartText, mappedItems },
        { status: 502 }
      )
    }

    let cartData: any = {}
    try {
      cartData = cartText ? JSON.parse(cartText) : {}
    } catch {
      cartData = {}
    }

    const cartId: string | undefined =
      cartData?.id ? String(cartData.id) : cartData?.cart_id ? String(cartData.cart_id) : undefined
    const apiCheckoutUrl: string | undefined =
      typeof cartData?.checkout_url === "string" ? cartData.checkout_url : undefined

    const checkoutUrl = (() => {
      const base = apiCheckoutUrl || (cartId ? `https://www.instacart.com/checkout/${encodeURIComponent(cartId)}` : "")
      if (!base) return ""
      if (!impactPartnerId) return base
      const u = new URL(base)
      // Impact UTM parameters (required for commission tracking)
      u.searchParams.set("utm_campaign", "instacart-idp")
      u.searchParams.set("utm_medium", "affiliate")
      u.searchParams.set("utm_source", "instacart_idp")
      u.searchParams.set("utm_term", "partnertype-mediapartner")
      u.searchParams.set(
        "utm_content",
        `campaignid-${impactCampaignId}_partnerid-${impactPartnerId}`
      )
      return u.toString()
    })()

    if (!cartId || !checkoutUrl) {
      return NextResponse.json(
        { error: "Cart created but missing checkout URL", cart: cartData, mappedItems },
        { status: 502 }
      )
    }

    return NextResponse.json({
      cartId,
      checkoutUrl,
      mappedItems,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unexpected error" },
      { status: 500 }
    )
  }
}

