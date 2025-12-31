"use client"

import { MealSlot } from "./meal-slot"
import type { Recipe } from "@/lib/types"
import type { MealPlan, PlanType } from "./meal-planner"

interface WeeklyGridProps {
  mealPlan: MealPlan
  recipes: Recipe[]
  onSetMeal: (slotKey: string, recipe: Recipe | null) => void
  planType: PlanType
}

const DAYS = [
  { key: "monday", label: "Mon", fullLabel: "Monday" },
  { key: "tuesday", label: "Tue", fullLabel: "Tuesday" },
  { key: "wednesday", label: "Wed", fullLabel: "Wednesday" },
  { key: "thursday", label: "Thu", fullLabel: "Thursday" },
  { key: "friday", label: "Fri", fullLabel: "Friday" },
  { key: "saturday", label: "Sat", fullLabel: "Saturday" },
  { key: "sunday", label: "Sun", fullLabel: "Sunday" },
] as const

// Meals for 4&2 plan (two lean & greens per day)
const MEALS_4_2 = [
  { key: "lunch", label: "L&G #1" },
  { key: "dinner", label: "L&G #2" },
] as const

// Meals for 5&1 plan (one lean & green per day)
const MEALS_5_1 = [
  { key: "meal", label: "Lean & Green" },
] as const

export function WeeklyGrid({ mealPlan, recipes, onSetMeal, planType }: WeeklyGridProps) {
  const meals = planType === "5&1" ? MEALS_5_1 : MEALS_4_2
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header Row */}
      <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
        <div className="p-2 sm:p-3 font-medium text-optavia-gray text-xs sm:text-sm">
          {planType === "5&1" ? "Daily Meal" : "Meals"}
        </div>
        {DAYS.map((day) => (
          <div
            key={day.key}
            className="p-2 sm:p-3 font-semibold text-optavia-dark text-center text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">{day.fullLabel}</span>
            <span className="sm:hidden">{day.label}</span>
          </div>
        ))}
      </div>

      {/* Meal Rows */}
      {meals.map((meal) => (
        <div key={meal.key} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
          <div className="p-2 sm:p-3 font-medium text-optavia-gray text-xs sm:text-sm flex items-center bg-gray-50">
            {meal.label}
          </div>
          {DAYS.map((day) => {
            const slotKey = `${day.key}-${meal.key}`
            const recipe = mealPlan[slotKey] || null
            
            return (
              <MealSlot
                key={slotKey}
                slotKey={slotKey}
                recipe={recipe}
                recipes={recipes}
                onSelect={(r) => onSetMeal(slotKey, r)}
                onClear={() => onSetMeal(slotKey, null)}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

