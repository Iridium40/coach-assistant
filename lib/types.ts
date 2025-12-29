export interface UserData {
  isNewCoach: boolean
  completedResources: string[]
  bookmarks: string[]
  favoriteRecipes: string[]
  createdAt: string
}

export interface Resource {
  id: string
  title: string
  type: "doc" | "video"
  url: string
}

export interface Module {
  id: string
  title: string
  description: string
  category: "Getting Started" | "Client Support" | "Business Building" | "Training"
  order: number
  forNewCoach: boolean
  icon: string
  resources: Resource[]
}

export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  category: "Chicken" | "Seafood" | "Beef" | "Turkey" | "Pork" | "Vegetarian" | "Breakfast"
  prepTime: number
  cookTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  counts: {
    lean: number
    green: number
    fat: number
    condiment: number
  }
  ingredients: string[]
  instructions: string[]
}
