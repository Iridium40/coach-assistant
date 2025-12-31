"use client"

import { useState, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Users } from "lucide-react"
import type { Recipe } from "@/lib/types"

interface RecipePickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipes: Recipe[]
  onSelect: (recipe: Recipe) => void
}

const CATEGORIES = ["All", "Chicken", "Seafood", "Beef", "Turkey", "Pork", "Vegetarian", "Breakfast"]

export function RecipePickerDialog({
  open,
  onOpenChange,
  recipes,
  onSelect,
}: RecipePickerDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory
      const matchesSearch =
        searchQuery === "" ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [recipes, selectedCategory, searchQuery])

  const handleSelect = (recipe: Recipe) => {
    onSelect(recipe)
    setSearchQuery("")
    setSelectedCategory("All")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-optavia-dark">Select a Recipe</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                  : "border-gray-300 text-optavia-dark hover:bg-gray-100"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Recipe List */}
        <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-8 text-optavia-gray">
              No recipes found matching your criteria
            </div>
          ) : (
            filteredRecipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => handleSelect(recipe)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))] transition-colors text-left"
              >
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-optavia-dark truncate">{recipe.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-optavia-gray">
                    <Badge variant="secondary" className="text-xs">
                      {recipe.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recipe.prepTime + recipe.cookTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {recipe.servings}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

