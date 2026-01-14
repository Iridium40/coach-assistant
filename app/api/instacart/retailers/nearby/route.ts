import { NextResponse } from "next/server"

type NearbyRetailersRequest = {
  lat: number
  lng: number
  radiusMiles?: number
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<NearbyRetailersRequest>
    const lat = typeof body.lat === "number" ? body.lat : NaN
    const lng = typeof body.lng === "number" ? body.lng : NaN
    const radiusMiles =
      typeof body.radiusMiles === "number" && body.radiusMiles > 0 ? body.radiusMiles : 10

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return NextResponse.json(
        { error: "Invalid lat/lng" },
        { status: 400 }
      )
    }

    const apiKey = process.env.INSTACART_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfigured: missing INSTACART_API_KEY" },
        { status: 500 }
      )
    }

    const baseUrl = process.env.INSTACART_API_BASE_URL || "https://connect.instacart.com/v2"
    const url = new URL(`${baseUrl.replace(/\/$/, "")}/retailers/nearby`)
    url.searchParams.set("lat", String(lat))
    url.searchParams.set("lng", String(lng))
    url.searchParams.set("radius", String(radiusMiles))

    const resp = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Avoid Next caching potentially user-specific results
      cache: "no-store",
    })

    const text = await resp.text()
    if (!resp.ok) {
      return NextResponse.json(
        { error: `Instacart error: ${resp.status} ${resp.statusText}`, details: text },
        { status: 502 }
      )
    }

    let data: any
    try {
      data = text ? JSON.parse(text) : {}
    } catch {
      data = {}
    }

    return NextResponse.json({
      retailers: Array.isArray(data?.retailers) ? data.retailers : [],
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unexpected error" },
      { status: 500 }
    )
  }
}

