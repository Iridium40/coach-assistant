"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUserData } from "@/contexts/user-data-context"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { X, Search, Image, Check, ExternalLink, RefreshCw } from "lucide-react"
import type { Recipe } from "@/lib/types"

interface AdminRecipeManagerProps {
  onClose?: () => void
}

export function AdminRecipeManager({ onClose }: AdminRecipeManagerProps) {
  const { profile, recipes, refreshContent } = useUserData()
  const { toast } = useToast()
  const supabase = createClient()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [newImageUrl, setNewImageUrl] = useState("")
  const [saving, setSaving] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const isAdmin = profile?.user_role?.toLowerCase() === "admin"

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(recipes.map(r => r.category)))
    return ["All", ...cats.sort()]
  }, [recipes])

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "All" || recipe.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, categoryFilter])

  const handleEditImage = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setNewImageUrl(recipe.image || "")
    setPreviewError(false)
  }

  const handleSaveImage = async () => {
    if (!editingRecipe || !newImageUrl.trim()) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from("recipes")
        .update({ 
          image: newImageUrl.trim(),
          updated_at: new Date().toISOString()
        })
        .eq("id", editingRecipe.id)

      if (error) throw error

      toast({
        title: "Success",
        description: `Image updated for "${editingRecipe.title}"`,
      })

      // Refresh content to get updated recipes
      await refreshContent()
      setEditingRecipe(null)
      setNewImageUrl("")
    } catch (error: any) {
      console.error("Error updating recipe image:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update recipe image",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePreviewImage = () => {
    setPreviewError(false)
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white border border-gray-200">
          <CardContent className="pt-6">
            <p className="text-center text-optavia-gray">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark">
            Recipe Image Manager
          </h1>
          <p className="text-optavia-gray mt-1">
            Update recipe images to ensure accurate visual representation
          </p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Recipe Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map(recipe => (
          <Card 
            key={recipe.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleEditImage(recipe)}
          >
            <div className="relative aspect-video bg-gray-100">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Image className="h-12 w-12" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className="bg-white/90 text-xs px-2 py-1 rounded font-medium text-optavia-dark">
                  {recipe.category}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-optavia-dark line-clamp-1">
                {recipe.title}
              </h3>
              <p className="text-xs text-optavia-gray mt-1 line-clamp-2">
                {recipe.description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3 w-full gap-2"
                onClick={(e) => {
                  e.stopPropagation()
                  handleEditImage(recipe)
                }}
              >
                <Image className="h-3 w-3" />
                Update Image
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12 text-optavia-gray">
          No recipes found matching your search.
        </div>
      )}

      {/* Edit Image Dialog */}
      <Dialog open={!!editingRecipe} onOpenChange={() => setEditingRecipe(null)}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-optavia-dark">
              Update Image: {editingRecipe?.title}
            </DialogTitle>
            <DialogDescription className="text-optavia-gray">
              Paste an image URL that accurately represents this recipe
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Current Image */}
            <div>
              <Label className="text-sm text-optavia-gray">Current Image</Label>
              <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {editingRecipe?.image ? (
                  <img
                    src={editingRecipe.image}
                    alt="Current"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Image className="h-12 w-12" />
                    <span className="ml-2">No image</span>
                  </div>
                )}
              </div>
            </div>

            {/* New Image URL */}
            <div className="space-y-2">
              <Label htmlFor="newImageUrl">New Image URL</Label>
              <Input
                id="newImageUrl"
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={newImageUrl}
                onChange={(e) => {
                  setNewImageUrl(e.target.value)
                  setPreviewError(false)
                }}
                className="border-gray-300"
              />
              <p className="text-xs text-optavia-gray">
                Tip: Use Unsplash for high-quality food images. Add ?w=800&h=600&fit=crop to resize.
              </p>
            </div>

            {/* Preview */}
            {newImageUrl && newImageUrl !== editingRecipe?.image && (
              <div>
                <Label className="text-sm text-optavia-gray">Preview</Label>
                <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {previewError ? (
                    <div className="w-full h-full flex items-center justify-center text-red-500">
                      <X className="h-8 w-8" />
                      <span className="ml-2">Failed to load image</span>
                    </div>
                  ) : (
                    <img
                      src={newImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onLoad={handlePreviewImage}
                      onError={() => setPreviewError(true)}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Suggested Image Sources */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-optavia-dark text-sm mb-2">
                Find Images
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => window.open(`https://unsplash.com/s/photos/${encodeURIComponent(editingRecipe?.title || '')}`, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  Unsplash
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => window.open(`https://www.pexels.com/search/${encodeURIComponent(editingRecipe?.title || '')}`, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  Pexels
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => window.open(`https://pixabay.com/images/search/${encodeURIComponent(editingRecipe?.title || '')}`, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  Pixabay
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setEditingRecipe(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveImage}
                disabled={saving || !newImageUrl.trim() || previewError || newImageUrl === editingRecipe?.image}
                className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] gap-2"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Save Image
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

