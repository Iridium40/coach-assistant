"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Leaf } from "lucide-react"
import type { DietaryFilters } from "./meal-planner"

interface DietaryFilterBarProps {
  filters: DietaryFilters
  onChange: (filters: DietaryFilters) => void
}

const PROTEIN_OPTIONS = [
  { key: "chicken" as const, label: "Chicken", emoji: "🍗" },
  { key: "beef" as const, label: "Beef", emoji: "🥩" },
  { key: "seafood" as const, label: "Seafood", emoji: "🐟" },
  { key: "turkey" as const, label: "Turkey", emoji: "🦃" },
  { key: "pork" as const, label: "Pork", emoji: "🥓" },
]

export function DietaryFilterBar({ filters, onChange }: DietaryFilterBarProps) {
  const toggleVegetarian = (checked: boolean) => {
    onChange({
      ...filters,
      vegetarianOnly: checked,
    })
  }

  const toggleProtein = (key: keyof DietaryFilters["proteins"], checked: boolean) => {
    onChange({
      ...filters,
      proteins: {
        ...filters.proteins,
        [key]: checked,
      },
    })
  }

  return (
    <Card className="p-4 bg-gray-50 border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Vegetarian Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            id="vegetarian"
            checked={filters.vegetarianOnly}
            onCheckedChange={toggleVegetarian}
          />
          <Label htmlFor="vegetarian" className="flex items-center gap-1 cursor-pointer text-optavia-dark">
            <Leaf className="h-4 w-4 text-green-600" />
            Vegetarian Only
          </Label>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-gray-300" />

        {/* Protein Preferences */}
        {!filters.vegetarianOnly && (
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-optavia-gray font-medium">Proteins:</span>
            {PROTEIN_OPTIONS.map((protein) => (
              <div key={protein.key} className="flex items-center gap-1.5">
                <Checkbox
                  id={protein.key}
                  checked={filters.proteins[protein.key]}
                  onCheckedChange={(checked) => toggleProtein(protein.key, !!checked)}
                />
                <Label htmlFor={protein.key} className="text-sm cursor-pointer text-optavia-dark">
                  <span className="mr-1">{protein.emoji}</span>
                  {protein.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

