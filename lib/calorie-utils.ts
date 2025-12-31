/**
 * OPTAVIA Lean & Green Calorie Estimation Utilities
 * 
 * Based on OPTAVIA's counting system:
 * - Lean: Protein portions (varies by type, using average)
 * - Green: Non-starchy vegetable servings
 * - Fat: Healthy fat servings
 * - Condiment: Condiment servings
 */

export interface RecipeCounts {
  lean: number
  green: number
  fat: number
  condiment: number
}

// Calorie values per serving (based on OPTAVIA guidelines)
const CALORIES_PER_SERVING = {
  lean: 120,      // Average of leanest (100), leaner (115), lean (150)
  green: 25,      // Non-starchy vegetables
  fat: 45,        // Healthy fats (olive oil, avocado, etc.)
  condiment: 10,  // Condiments and seasonings
}

/**
 * Estimate total calories for a recipe based on OPTAVIA counts
 */
export function estimateCalories(counts: RecipeCounts): number {
  return (
    counts.lean * CALORIES_PER_SERVING.lean +
    counts.green * CALORIES_PER_SERVING.green +
    counts.fat * CALORIES_PER_SERVING.fat +
    counts.condiment * CALORIES_PER_SERVING.condiment
  )
}

/**
 * Estimate calories per serving
 */
export function estimateCaloriesPerServing(counts: RecipeCounts, servings: number): number {
  const totalCalories = estimateCalories(counts)
  return Math.round(totalCalories / servings)
}

/**
 * Format calories for display
 */
export function formatCalories(calories: number): string {
  return `~${calories} cal`
}

/**
 * Get calorie range description
 */
export function getCalorieCategory(caloriesPerServing: number): {
  label: string
  color: string
} {
  if (caloriesPerServing < 200) {
    return { label: "Light", color: "text-green-600" }
  } else if (caloriesPerServing < 350) {
    return { label: "Balanced", color: "text-blue-600" }
  } else {
    return { label: "Hearty", color: "text-orange-600" }
  }
}

