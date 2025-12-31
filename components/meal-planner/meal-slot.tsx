"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { RecipePickerDialog } from "./recipe-picker-dialog"
import type { Recipe } from "@/lib/types"

interface MealSlotProps {
  slotKey: string
  recipe: Recipe | null
  recipes: Recipe[]
  onSelect: (recipe: Recipe) => void
  onClear: () => void
  isMobile?: boolean
}

export function MealSlot({ slotKey, recipe, recipes, onSelect, onClear, isMobile = false }: MealSlotProps) {
  const [showPicker, setShowPicker] = useState(false)

  const handleSelect = (selectedRecipe: Recipe) => {
    onSelect(selectedRecipe)
    setShowPicker(false)
  }

  // Mobile layout with recipe selected
  if (isMobile && recipe) {
    return (
      <>
        <div 
          className="flex items-center gap-3 p-2 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors group"
          onClick={() => setShowPicker(true)}
        >
          <img
            src={recipe.image || "/placeholder.svg"}
            alt={recipe.title}
            className="w-12 h-12 rounded object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-optavia-dark truncate">{recipe.title}</p>
            <p className="text-xs text-optavia-gray">{recipe.category}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <RecipePickerDialog
          open={showPicker}
          onOpenChange={setShowPicker}
          recipes={recipes}
          onSelect={handleSelect}
        />
      </>
    )
  }

  // Mobile layout without recipe
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setShowPicker(true)}
          className="w-full flex items-center gap-3 p-2 rounded-md border-2 border-dashed border-gray-300 hover:border-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))] transition-colors"
        >
          <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Plus className="h-5 w-5 text-gray-400" />
          </div>
          <span className="text-sm text-gray-500">Add a recipe</span>
        </button>

        <RecipePickerDialog
          open={showPicker}
          onOpenChange={setShowPicker}
          recipes={recipes}
          onSelect={handleSelect}
        />
      </>
    )
  }

  // Desktop layout with recipe
  if (recipe) {
    return (
      <>
        <div className="p-1 sm:p-2 min-h-[80px] sm:min-h-[100px] group relative">
          <div
            className="h-full rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-[hsl(var(--optavia-green))] transition-all"
            onClick={() => setShowPicker(true)}
          >
            <div className="relative h-full">
              <img
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2">
                <p className="text-white text-[10px] sm:text-xs font-medium line-clamp-2 leading-tight">
                  {recipe.title}
                </p>
              </div>
              {/* Clear button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onClear()
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <RecipePickerDialog
          open={showPicker}
          onOpenChange={setShowPicker}
          recipes={recipes}
          onSelect={handleSelect}
        />
      </>
    )
  }

  // Desktop layout without recipe
  return (
    <>
      <div className="p-1 sm:p-2 min-h-[80px] sm:min-h-[100px]">
        <button
          onClick={() => setShowPicker(true)}
          className="w-full h-full min-h-[72px] sm:min-h-[84px] rounded-md border-2 border-dashed border-gray-300 hover:border-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))] transition-colors flex items-center justify-center group"
        >
          <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-[hsl(var(--optavia-green))]" />
        </button>
      </div>

      <RecipePickerDialog
        open={showPicker}
        onOpenChange={setShowPicker}
        recipes={recipes}
        onSelect={handleSelect}
      />
    </>
  )
}

