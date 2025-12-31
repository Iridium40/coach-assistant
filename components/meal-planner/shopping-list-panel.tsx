"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronDown, ChevronUp, Copy, Share2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Recipe } from "@/lib/types"

interface ShoppingListPanelProps {
  recipes: Recipe[]
}

export function ShoppingListPanel({ recipes }: ShoppingListPanelProps) {
  const { toast } = useToast()
  const [isExpanded, setIsExpanded] = useState(true)
  const [copied, setCopied] = useState(false)

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
  const totalIngredients = aggregatedIngredients.length

  return (
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
                {aggregatedIngredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-gray-50 text-sm"
                  >
                    <span className="text-optavia-dark">{item.ingredient}</span>
                    {item.count > 1 && (
                      <span className="text-xs text-optavia-gray bg-gray-100 px-1.5 py-0.5 rounded">
                        x{item.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>

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
  )
}

