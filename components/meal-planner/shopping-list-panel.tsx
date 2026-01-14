"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronDown, ChevronUp, Copy, Share2, Check, Store } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Recipe } from "@/lib/types"
import { keyForIngredient, mealPlanSentStorageKey } from "@/lib/instacart/ingredient"
import { RetailerPickerDialog, getSavedRetailer } from "@/components/instacart/retailer-picker-dialog"

interface ShoppingListPanelProps {
  recipes: Recipe[]
}

export function ShoppingListPanel({ recipes }: ShoppingListPanelProps) {
  const { toast } = useToast()
  const [isExpanded, setIsExpanded] = useState(true)
  const [copied, setCopied] = useState(false)
  const [instacartLoading, setInstacartLoading] = useState(false)
  const [showRetailerPicker, setShowRetailerPicker] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [sentKeys, setSentKeys] = useState<Set<string>>(new Set())
  const [showOrdered, setShowOrdered] = useState(false)
  const [selectedRetailer, setSelectedRetailer] = useState<{ id: string; name: string } | null>(null)

  // Aggregate ingredients from all recipes
  const aggregatedIngredients = useMemo(() => {
    const ingredientMap = new Map<string, number>()
    
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        // Normalize ingredient for grouping (lowercase, trim)
        const normalized = ingredient.toLowerCase().trim()
        ingredientMap.set(normalized, (ingredientMap.get(normalized) || 0) + 1)
      })
    })

    // Convert to array and sort
    return Array.from(ingredientMap.entries())
      .map(([ingredient, count]) => ({
        ingredient: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
        count,
      }))
      .sort((a, b) => a.ingredient.localeCompare(b.ingredient))
  }, [recipes])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(mealPlanSentStorageKey)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setSentKeys(new Set(parsed))
      }
    } catch {
      // ignore
    }
    setSelectedRetailer(getSavedRetailer())
    setSelectedKeys(new Set())
  }, [recipes.length])

  const persistSent = (next: Set<string>) => {
    setSentKeys(next)
    try {
      window.localStorage.setItem(mealPlanSentStorageKey, JSON.stringify(Array.from(next)))
    } catch {
      // ignore
    }
  }

  const visibleItems = useMemo(() => {
    const items = aggregatedIngredients.map((i) => ({
      ...i,
      key: keyForIngredient(i.ingredient),
    }))
    if (showOrdered) return items
    return items.filter((i) => !sentKeys.has(i.key))
  }, [aggregatedIngredients, sentKeys, showOrdered])

  const selectAllVisible = () => setSelectedKeys(new Set(visibleItems.map((i) => i.key)))
  const clearSelection = () => setSelectedKeys(new Set())
  const toggleItem = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const resetOrdered = () => {
    persistSent(new Set())
    clearSelection()
    toast({ title: "Reset", description: "Ordered items restored." })
  }

  const createInstacartCart = async () => {
    if (selectedKeys.size === 0) {
      toast({
        title: "Select items",
        description: "Choose at least one item to order.",
        variant: "destructive",
      })
      return
    }

    const retailer = selectedRetailer || getSavedRetailer()
    if (!retailer) {
      setShowRetailerPicker(true)
      return
    }

    const selected = visibleItems.filter((i) => selectedKeys.has(i.key))
    setInstacartLoading(true)
    try {
      const resp = await fetch("/api/instacart/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          retailerId: retailer.id,
          items: selected.map((i) => ({ nameRaw: i.ingredient, count: i.count })), // quantity = count
        }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data?.error || "Failed to create cart")
      const checkoutUrl: string | undefined = data?.checkoutUrl
      if (!checkoutUrl) throw new Error("Missing checkout URL")

      window.open(checkoutUrl, "_blank", "noopener,noreferrer")

      const nextSent = new Set(sentKeys)
      for (const i of selected) nextSent.add(i.key)
      persistSent(nextSent)
      clearSelection()

      toast({
        title: "Instacart cart created",
        description: `Opened checkout at ${retailer.name}.`,
      })
    } catch (e: any) {
      toast({
        title: "Instacart error",
        description: e?.message || "Couldn't create Instacart cart.",
        variant: "destructive",
      })
    } finally {
      setInstacartLoading(false)
    }
  }

  // Generate text for sharing
  const getShoppingListText = () => {
    if (aggregatedIngredients.length === 0) return ""
    
    const header = `Shopping List (${recipes.length} recipes)\n${"=".repeat(30)}\n\n`
    const items = aggregatedIngredients
      .map((item) => `- ${item.ingredient}${item.count > 1 ? ` (x${item.count})` : ""}`)
      .join("\n")
    
    return header + items
  }

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShoppingListText())
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Shopping list copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy shopping list",
        variant: "destructive",
      })
    }
  }

  // Share using Web Share API
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shopping List",
          text: getShoppingListText(),
        })
        toast({
          title: "Shared!",
          description: "Shopping list shared successfully",
        })
      } catch (error: any) {
        if (error.name !== "AbortError") {
          toast({
            title: "Error",
            description: "Failed to share shopping list",
            variant: "destructive",
          })
        }
      }
    } else {
      handleCopy()
    }
  }

  const uniqueRecipeCount = recipes.length
  const totalIngredients = visibleItems.length

  return (
    <>
      <Card className="bg-white border-gray-200 h-fit">
      <CardHeader className="pb-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full"
        >
          <CardTitle className="flex items-center gap-2 text-lg text-optavia-dark">
            <ShoppingCart className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
            Shopping List
          </CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-optavia-gray" />
          ) : (
            <ChevronDown className="h-5 w-5 text-optavia-gray" />
          )}
        </button>
        {!isExpanded && totalIngredients > 0 && (
          <p className="text-sm text-optavia-gray mt-1">
            {totalIngredients} items from {uniqueRecipeCount} recipes
          </p>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          {totalIngredients === 0 ? (
            <p className="text-sm text-optavia-gray text-center py-4">
              Add recipes to your meal plan to generate a shopping list
            </p>
          ) : (
            <>
              <p className="text-sm text-optavia-gray mb-3">
                {totalIngredients} items from {uniqueRecipeCount} recipes
              </p>

              {/* Ingredient List */}
              <div className="max-h-[300px] overflow-y-auto space-y-1 mb-4">
                {visibleItems.map((item, index) => {
                  const isSelected = selectedKeys.has(item.key)
                  const isSent = sentKeys.has(item.key)
                  return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-gray-50 text-sm"
                  >
                    <label className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-[hsl(var(--optavia-green))]"
                        checked={isSelected}
                        onChange={() => toggleItem(item.key)}
                        disabled={isSent && !showOrdered}
                      />
                      <span className="text-optavia-dark truncate">{item.ingredient}</span>
                    </label>
                    {item.count > 1 && (
                      <span className="text-xs text-optavia-gray bg-gray-100 px-1.5 py-0.5 rounded">
                        x{item.count}
                      </span>
                    )}
                  </div>
                )})}
              </div>

              {/* Instacart Controls */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="text-xs text-optavia-gray flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Store:{" "}
                  <button
                    type="button"
                    className="font-medium text-[hsl(var(--optavia-green))] hover:underline"
                    onClick={() => setShowRetailerPicker(true)}
                  >
                    {selectedRetailer?.name || "Choose store"}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={selectAllVisible}>
                    Select all
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={clearSelection}>
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => setShowOrdered((v) => !v)}
                  >
                    {showOrdered ? "Hide ordered" : "Show ordered"}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={resetOrdered}>
                    Reset
                  </Button>
                </div>
              </div>

              <Button
                onClick={createInstacartCart}
                disabled={instacartLoading || selectedKeys.size === 0}
                className="w-full gap-2 mb-3 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
              >
                {instacartLoading ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                {instacartLoading ? "Creating cart..." : "Create Instacart cart (selected)"}
              </Button>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="flex-1 gap-2 border-gray-300"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                {typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex-1 gap-2 border-gray-300"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      )}
      </Card>

      <RetailerPickerDialog
        open={showRetailerPicker}
        onOpenChange={setShowRetailerPicker}
        onSelected={(r) => setSelectedRetailer(r)}
      />
    </>
  )
}

