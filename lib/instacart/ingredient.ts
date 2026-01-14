export function normalizeWhitespace(s: string) {
  return s.replace(/\s+/g, " ").trim()
}

export function toSearchQuery(nameRaw: string): string {
  const s = nameRaw.toLowerCase()
  const cleaned = normalizeWhitespace(
    s
      .replace(/\d+\.?\d*\s*(oz|lb|g|kg|cup|cups|tbsp|tsp|ml|l)\b/gi, " ")
      .replace(
        /\b(boneless|skinless|fresh|frozen|raw|cooked|diced|chopped|sliced|minced|trimmed|optional|to taste)\b/gi,
        " "
      )
      .replace(/[,()]/g, " ")
  )
  return cleaned.length > 0 ? cleaned : normalizeWhitespace(nameRaw)
}

export function keyForIngredient(nameRaw: string): string {
  // Stable-ish key for selection/sent tracking.
  // Keep it deterministic and conservative: lowercase + remove punctuation + normalize whitespace.
  return normalizeWhitespace(
    nameRaw
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
  )
}

export function recipeSentStorageKey(recipeId: string) {
  return `instacart.sent.recipe.${recipeId}`
}

export const mealPlanSentStorageKey = "instacart.sent.mealplan"

