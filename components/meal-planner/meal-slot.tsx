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
}

export function MealSlot({ slotKey, recipe, recipes, onSelect, onClear }: MealSlotProps) {
  const [showPicker, setShowPicker] = useState(false)

  const handleSelect = (selectedRecipe: Recipe) => {
    onSelect(selectedRecipe)
    setShowPicker(false)
  }

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

