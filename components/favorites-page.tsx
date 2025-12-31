"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUserData } from "@/contexts/user-data-context"
import {
  Heart,
  Bookmark,
  Clock,
  Users,
  ChefHat,
  FileText,
  Video,
  ExternalLink,
  UtensilsCrossed,
  BookOpen,
  Star,
  ArrowLeft,
  X
} from "lucide-react"
import type { Recipe, Resource, Module } from "@/lib/types"

interface FavoritesPageProps {
  onClose?: () => void
}

export function FavoritesPage({ onClose }: FavoritesPageProps) {
  const router = useRouter()
  const { 
    favoriteRecipes: favoriteRecipeIds, 
    bookmarks: bookmarkIds, 
    recipes, 
    modules,
    toggleFavoriteRecipe,
    toggleBookmark
  } = useUserData()

  // Get favorite recipes with full details
  const favoriteRecipes = useMemo(() => {
    return recipes.filter(recipe => favoriteRecipeIds.includes(recipe.id))
  }, [recipes, favoriteRecipeIds])

  // Get bookmarked resources with full details and module info
  const bookmarkedResources = useMemo(() => {
    const resourcesWithModule: Array<{ resource: Resource; module: Module }> = []
    
    modules.forEach(module => {
      module.resources.forEach(resource => {
        if (bookmarkIds.includes(resource.id)) {
          resourcesWithModule.push({ resource, module })
        }
      })
    })
    
    return resourcesWithModule
  }, [modules, bookmarkIds])

  // Group recipes by category
  const recipesByCategory = useMemo(() => {
    const grouped: Record<string, Recipe[]> = {}
    favoriteRecipes.forEach(recipe => {
      if (!grouped[recipe.category]) {
        grouped[recipe.category] = []
      }
      grouped[recipe.category].push(recipe)
    })
    return grouped
  }, [favoriteRecipes])

  // Group resources by module category
  const resourcesByCategory = useMemo(() => {
    const grouped: Record<string, Array<{ resource: Resource; module: Module }>> = {}
    bookmarkedResources.forEach(item => {
      if (!grouped[item.module.category]) {
        grouped[item.module.category] = []
      }
      grouped[item.module.category].push(item)
    })
    return grouped
  }, [bookmarkedResources])

  const totalFavorites = favoriteRecipes.length + bookmarkedResources.length

  const handleRecipeClick = (recipe: Recipe) => {
    router.push(`/recipes/${recipe.id}`)
  }

  const handleResourceClick = (resource: Resource) => {
    window.open(resource.url, "_blank")
  }

  const handleRemoveFavoriteRecipe = async (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation()
    await toggleFavoriteRecipe(recipeId)
  }

  const handleRemoveBookmark = async (e: React.MouseEvent, resourceId: string) => {
    e.stopPropagation()
    await toggleBookmark(resourceId)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-optavia-gray hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark flex items-center gap-2">
              <Star className="h-7 w-7 text-yellow-500 fill-yellow-500" />
              My Favorites
            </h1>
            <p className="text-optavia-gray mt-1">
              {totalFavorites} {totalFavorites === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {totalFavorites === 0 ? (
        <Card className="bg-white border border-gray-200">
          <CardContent className="py-16 text-center">
            <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-optavia-dark mb-2">
              No favorites yet
            </h3>
            <p className="text-optavia-gray max-w-md mx-auto mb-6">
              Start saving your favorite recipes and training resources to access them quickly from here.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => router.push("/recipes")}
                className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] gap-2"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Browse Recipes
              </Button>
              <Button
                onClick={() => router.push("/training")}
                variant="outline"
                className="border-gray-300 gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Explore Training
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Favorite Recipes Section */}
          {favoriteRecipes.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <h2 className="font-heading font-bold text-xl text-optavia-dark">
                  Favorite Recipes
                </h2>
                <Badge variant="secondary" className="ml-2">
                  {favoriteRecipes.length}
                </Badge>
              </div>

              {Object.entries(recipesByCategory).map(([category, categoryRecipes]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-sm font-semibold text-optavia-gray uppercase tracking-wide mb-3 flex items-center gap-2">
                    <ChefHat className="h-4 w-4" />
                    {category}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryRecipes.map(recipe => (
                      <Card
                        key={recipe.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => handleRecipeClick(recipe)}
                      >
                        <div className="relative aspect-video bg-gray-100">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 hover:text-red-600 h-8 w-8"
                            onClick={(e) => handleRemoveFavoriteRecipe(e, recipe.id)}
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                          <Badge className="absolute bottom-2 left-2 bg-white/90 text-optavia-dark text-xs">
                            {recipe.difficulty}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-optavia-dark group-hover:text-[hsl(var(--optavia-green))] transition-colors line-clamp-1">
                            {recipe.title}
                          </h4>
                          <p className="text-xs text-optavia-gray mt-1 line-clamp-2">
                            {recipe.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-optavia-gray">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {recipe.prepTime + recipe.cookTime}m
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {recipe.servings}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Bookmarked Resources Section */}
          {bookmarkedResources.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Bookmark className="h-5 w-5 text-blue-500 fill-blue-500" />
                <h2 className="font-heading font-bold text-xl text-optavia-dark">
                  Saved Training Resources
                </h2>
                <Badge variant="secondary" className="ml-2">
                  {bookmarkedResources.length}
                </Badge>
              </div>

              {Object.entries(resourcesByCategory).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-sm font-semibold text-optavia-gray uppercase tracking-wide mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {items.map(({ resource, module }) => (
                      <Card
                        key={resource.id}
                        className="hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => handleResourceClick(resource)}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            resource.type === "video" 
                              ? "bg-red-100 text-red-600" 
                              : "bg-blue-100 text-blue-600"
                          }`}>
                            {resource.type === "video" ? (
                              <Video className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-optavia-dark group-hover:text-[hsl(var(--optavia-green))] transition-colors line-clamp-1">
                              {resource.title}
                            </h4>
                            <p className="text-xs text-optavia-gray">
                              {module.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                              onClick={(e) => handleRemoveBookmark(e, resource.id)}
                            >
                              <Bookmark className="h-4 w-4 fill-current" />
                            </Button>
                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[hsl(var(--optavia-green))]" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  )
}

