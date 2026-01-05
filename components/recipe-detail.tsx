"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Clock, Users, Heart, ChefHat, Share2, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Recipe, UserData } from "@/lib/types"

interface RecipeDetailProps {
  recipe: Recipe
  userData: UserData
  setUserData: (data: UserData) => void
  toggleFavoriteRecipe?: (recipeId: string) => Promise<void>
  onBack: () => void
}

export function RecipeDetail({ recipe, userData, setUserData, toggleFavoriteRecipe, onBack }: RecipeDetailProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const isFavorite = userData.favoriteRecipes.includes(recipe.id)

  // Format ingredients for sharing
  const getIngredientsText = () => {
    return `${recipe.title}\n\nIngredients:\n${recipe.ingredients.map(i => `- ${i}`).join('\n')}`
  }

  // Copy ingredients to clipboard
  const handleCopyIngredients = async () => {
    try {
      await navigator.clipboard.writeText(getIngredientsText())
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Ingredient list copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy ingredients",
        variant: "destructive",
      })
    }
  }

  // Share ingredients using Web Share API
  const handleShareIngredients = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recipe.title} - Ingredients`,
          text: getIngredientsText(),
        })
        toast({
          title: "Shared!",
          description: "Ingredient list shared successfully",
        })
      } catch (error: any) {
        // User cancelled share - don't show error
        if (error.name !== "AbortError") {
          toast({
            title: "Error",
            description: "Failed to share ingredients",
            variant: "destructive",
          })
        }
      }
    } else {
      // Fallback to copy if share not available
      handleCopyIngredients()
    }
  }

  const toggleFavorite = async () => {
    if (toggleFavoriteRecipe) {
      // Use Supabase hook if available
      await toggleFavoriteRecipe(recipe.id)
    } else {
      // Fallback to local state (for backwards compatibility)
      const newFavorites = isFavorite
        ? userData.favoriteRecipes.filter((id) => id !== recipe.id)
        : [...userData.favoriteRecipes, recipe.id]

      setUserData({
        ...userData,
        favoriteRecipes: newFavorites,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
      <Button variant="ghost" onClick={onBack} className="mb-4 sm:mb-6 gap-2 text-sm sm:text-base">
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back to Recipes</span>
        <span className="sm:hidden">Back</span>
      </Button>

      {/* Hero Image */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden mb-6 sm:mb-8">
        <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[hsl(var(--optavia-green-light))] text-[hsl(var(--optavia-green))] text-xs sm:text-sm">
          {recipe.category}
        </Badge>
      </div>

      {/* Title and Quick Stats */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-optavia-dark flex-1 break-words">{recipe.title}</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className={`flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 ${isFavorite ? "text-red-500" : "text-optavia-gray"}`}
          >
            <Heart className={`h-5 w-5 sm:h-6 sm:w-6 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>

        <p className="text-optavia-gray text-base sm:text-lg mb-4 sm:mb-6">{recipe.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-4 sm:gap-6 text-optavia-gray mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium">Prep Time</div>
              <div className="font-bold text-optavia-dark">{recipe.prepTime} min</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium">Cook Time</div>
              <div className="font-bold text-optavia-dark">{recipe.cookTime} min</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium">Servings</div>
              <div className="font-bold text-optavia-dark">{recipe.servings}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            <div>
              <div className="text-sm font-medium">Difficulty</div>
              <div className="font-bold text-optavia-dark">{recipe.difficulty}</div>
            </div>
          </div>
        </div>

        {/* OPTAVIA Counts */}
        <Card className="p-3 sm:p-4 bg-[hsl(var(--optavia-green-light))]">
          <h3 className="font-heading font-semibold text-base sm:text-lg text-optavia-dark mb-2 sm:mb-3">OPTAVIA Counts</h3>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[hsl(var(--optavia-green))]">{recipe.counts.lean}</div>
              <div className="text-xs sm:text-sm text-optavia-gray">Lean</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[hsl(var(--optavia-green))]">{recipe.counts.green}</div>
              <div className="text-xs sm:text-sm text-optavia-gray">Green</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[hsl(var(--optavia-green))]">{recipe.counts.fat}</div>
              <div className="text-xs sm:text-sm text-optavia-gray">Healthy Fat</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-[hsl(var(--optavia-green))]">{recipe.counts.condiment}</div>
              <div className="text-xs sm:text-sm text-optavia-gray">Condiment</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Ingredients */}
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-optavia-dark mb-3 sm:mb-4">Ingredients</h2>
          <Card className="p-4 sm:p-6">
            <ul className="space-y-2 mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex gap-2 text-sm sm:text-base text-optavia-gray">
                  <span className="text-[hsl(var(--optavia-green))] flex-shrink-0">•</span>
                  <span className="break-words">{ingredient}</span>
                </li>
              ))}
            </ul>
            {/* Share/Copy Buttons */}
            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyIngredients}
                className="flex-1 gap-2 border-gray-300 text-optavia-dark hover:bg-gray-100"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy List"}
              </Button>
              {typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareIngredients}
                  className="flex-1 gap-2 border-gray-300 text-optavia-dark hover:bg-gray-100"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-optavia-dark mb-3 sm:mb-4">Instructions</h2>
          <Card className="p-4 sm:p-6">
            <ol className="space-y-3 sm:space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--optavia-green))] text-white flex items-center justify-center text-xs sm:text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm sm:text-base text-optavia-gray pt-0.5 break-words">{instruction}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  )
}
