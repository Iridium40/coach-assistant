"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Wand2, Send, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { WeeklyGrid } from "./weekly-grid"
import { DietaryFilterBar } from "./dietary-filter-bar"
import { ShoppingListPanel } from "./shopping-list-panel"
import { SendPlanDialog } from "./send-plan-dialog"
import type { Recipe } from "@/lib/types"

interface MealPlannerProps {
  recipes: Recipe[]
  coachName: string
}

export type MealSlotKey = 
  | "monday-lunch" | "monday-dinner"
  | "tuesday-lunch" | "tuesday-dinner"
  | "wednesday-lunch" | "wednesday-dinner"
  | "thursday-lunch" | "thursday-dinner"
  | "friday-lunch" | "friday-dinner"
  | "saturday-lunch" | "saturday-dinner"
  | "sunday-lunch" | "sunday-dinner"

export interface MealPlan {
  [key: string]: Recipe | null
}

export interface DietaryFilters {
  vegetarianOnly: boolean
  proteins: {
    chicken: boolean
    beef: boolean
    seafood: boolean
    turkey: boolean
    pork: boolean
  }
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const
const MEALS = ["lunch", "dinner"] as const

export function MealPlanner({ recipes, coachName }: MealPlannerProps) {
  const router = useRouter()
  const [mealPlan, setMealPlan] = useState<MealPlan>({})
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilters>({
    vegetarianOnly: false,
    proteins: {
      chicken: true,
      beef: true,
      seafood: true,
      turkey: true,
      pork: true,
    },
  })
  const [showSendDialog, setShowSendDialog] = useState(false)

  // Filter recipes based on dietary preferences
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      if (dietaryFilters.vegetarianOnly) {
        return recipe.category === "Vegetarian"
      }
      
      // Filter by protein preferences
      const categoryMap: Record<string, keyof typeof dietaryFilters.proteins> = {
        "Chicken": "chicken",
        "Beef": "beef",
        "Seafood": "seafood",
        "Turkey": "turkey",
        "Pork": "pork",
      }
      
      const proteinKey = categoryMap[recipe.category]
      if (proteinKey && !dietaryFilters.proteins[proteinKey]) {
        return false
      }
      
      // Vegetarian and Breakfast always pass protein filter
      return true
    })
  }, [recipes, dietaryFilters])

  // Get selected recipes from meal plan
  const selectedRecipes = useMemo(() => {
    return Object.values(mealPlan).filter((r): r is Recipe => r !== null)
  }, [mealPlan])

  // Check if any meals are planned
  const hasMeals = selectedRecipes.length > 0

  // Set a meal in the plan
  const setMeal = useCallback((slotKey: string, recipe: Recipe | null) => {
    setMealPlan((prev) => ({
      ...prev,
      [slotKey]: recipe,
    }))
  }, [])

  // Clear all meals
  const clearAllMeals = useCallback(() => {
    setMealPlan({})
  }, [])

  // Auto-fill with smart generation
  const autoFillMeals = useCallback(() => {
    const newPlan: MealPlan = {}
    const availableRecipes = [...filteredRecipes]
    
    if (availableRecipes.length === 0) return

    // Group recipes by category for variety
    const recipesByCategory: Record<string, Recipe[]> = {}
    availableRecipes.forEach((recipe) => {
      if (!recipesByCategory[recipe.category]) {
        recipesByCategory[recipe.category] = []
      }
      recipesByCategory[recipe.category].push(recipe)
    })

    const categories = Object.keys(recipesByCategory)
    let lastCategory = ""
    let categoryIndex = 0

    // Fill each slot
    DAYS.forEach((day) => {
      MEALS.forEach((meal) => {
        const slotKey = `${day}-${meal}`
        
        // Try to pick from a different category than the last meal
        let attempts = 0
        let selectedCategory = categories[categoryIndex % categories.length]
        
        while (selectedCategory === lastCategory && attempts < categories.length) {
          categoryIndex++
          selectedCategory = categories[categoryIndex % categories.length]
          attempts++
        }
        
        const categoryRecipes = recipesByCategory[selectedCategory]
        if (categoryRecipes && categoryRecipes.length > 0) {
          // Pick a random recipe from this category
          const randomIndex = Math.floor(Math.random() * categoryRecipes.length)
          newPlan[slotKey] = categoryRecipes[randomIndex]
          lastCategory = selectedCategory
          categoryIndex++
        }
      })
    })

    setMealPlan(newPlan)
  }, [filteredRecipes])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push("/recipes")}
            className="mb-2 gap-2 -ml-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes
          </Button>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark">
            Meal Planner
          </h1>
          <p className="text-optavia-gray mt-1">
            Create a personalized weekly meal plan for your client
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={autoFillMeals}
            className="gap-2 border-gray-300"
          >
            <Wand2 className="h-4 w-4" />
            Auto-Fill
          </Button>
          {hasMeals && (
            <>
              <Button
                variant="outline"
                onClick={clearAllMeals}
                className="gap-2 border-gray-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
              <Button
                onClick={() => setShowSendDialog(true)}
                className="gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
              >
                <Send className="h-4 w-4" />
                Send to Client
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Dietary Filters */}
      <DietaryFilterBar
        filters={dietaryFilters}
        onChange={setDietaryFilters}
      />

      {/* Main Content */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6">
        {/* Weekly Grid */}
        <WeeklyGrid
          mealPlan={mealPlan}
          recipes={filteredRecipes}
          onSetMeal={setMeal}
        />

        {/* Shopping List */}
        <ShoppingListPanel
          recipes={selectedRecipes}
        />
      </div>

      {/* Send Dialog */}
      <SendPlanDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        mealPlan={mealPlan}
        coachName={coachName}
      />
    </div>
  )
}

