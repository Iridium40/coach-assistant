"use client"

import { MealSlot } from "./meal-slot"
import { useIsMobile } from "@/hooks/use-mobile"
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
  const isMobile = useIsMobile()
  
  // Mobile layout - vertical cards for each day
  if (isMobile) {
    return (
      <div className="space-y-3">
        {DAYS.map((day) => (
          <div key={day.key} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
              <h3 className="font-semibold text-sm text-optavia-dark">{day.fullLabel}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {meals.map((meal) => {
                const slotKey = `${day.key}-${meal.key}`
                const recipe = mealPlan[slotKey] || null
                
                return (
                  <div key={meal.key} className="p-2">
                    <div className="text-xs text-optavia-gray mb-1">{meal.label}</div>
                    <MealSlot
                      slotKey={slotKey}
                      recipe={recipe}
                      recipes={recipes}
                      onSelect={(r) => onSetMeal(slotKey, r)}
                      onClear={() => onSetMeal(slotKey, null)}
                      isMobile={true}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Desktop layout - grid
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden overflow-x-auto">
      {/* Header Row */}
      <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200 min-w-[600px]">
        <div className="p-2 sm:p-3 font-medium text-optavia-gray text-xs sm:text-sm">
          {planType === "5&1" ? "Daily Meal" : "Meals"}
        </div>
        {DAYS.map((day) => (
          <div
            key={day.key}
            className="p-2 sm:p-3 font-semibold text-optavia-dark text-center text-xs sm:text-sm"
          >
            <span className="hidden lg:inline">{day.fullLabel}</span>
            <span className="lg:hidden">{day.label}</span>
          </div>
        ))}
      </div>

      {/* Meal Rows */}
      {meals.map((meal) => (
        <div key={meal.key} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0 min-w-[600px]">
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

