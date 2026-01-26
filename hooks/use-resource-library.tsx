"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

// Types for resource library tables
export interface ResourceLibraryCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ResourceLibraryTag {
  id: string
  name: string
  type: "format" | "level" | "content" | "audience" | "rank"
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ResourceLibraryResource {
  id: string
  title: string
  description: string
  type: "doc" | "video" | "pdf" | "link" | "canva" | "form"
  url: string
  category_id: string
  featured: boolean
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  // Joined data
  category?: ResourceLibraryCategory
  tags?: ResourceLibraryTag[]
}

export interface ResourceLibraryProgress {
  total: number
  completed: number
  percentage: number
}

// Tag type labels for UI grouping
export const TAG_TYPE_LABELS: Record<string, string> = {
  format: "Format",
  level: "Level",
  content: "Content Type",
  audience: "Audience",
  rank: "Coach Rank",
}

// Type icons for resource types
export const resourceTypeIcons: Record<string, string> = {
  doc: "📄",
  video: "🎬",
  pdf: "📑",
  link: "🔗",
  canva: "🎨",
  form: "📝",
}

export function useResourceLibrary(user?: User | null) {
  const [resources, setResources] = useState<ResourceLibraryResource[]>([])
  const [categories, setCategories] = useState<ResourceLibraryCategory[]>([])
  const [tags, setTags] = useState<ResourceLibraryTag[]>([])
  const [resourceTags, setResourceTags] = useState<Map<string, string[]>>(new Map())
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = useMemo(() => createClient(), [])

  // Load all data from resource library tables
  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Load categories
      const { data: catData, error: catError } = await supabase
        .from("resource_library_categories")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (catError) throw catError
      setCategories(catData || [])

      // Load tags
      const { data: tagData, error: tagError } = await supabase
        .from("resource_library_tags")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (tagError) throw tagError
      setTags(tagData || [])

      // Load resources
      const { data: resData, error: resError } = await supabase
        .from("resource_library_resources")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (resError) throw resError

      // Load resource-tag relationships
      const { data: resTagData, error: resTagError } = await supabase
        .from("resource_library_resource_tags")
        .select("resource_id, tag_id")

      if (resTagError) throw resTagError

      // Build resource-tags map
      const tagMap = new Map<string, string[]>()
      resTagData?.forEach((rt) => {
        const existing = tagMap.get(rt.resource_id) || []
        existing.push(rt.tag_id)
        tagMap.set(rt.resource_id, existing)
      })
      setResourceTags(tagMap)

      // Enrich resources with category and tags
      const categoryMap = new Map((catData || []).map((c) => [c.id, c]))
      const tagMapById = new Map((tagData || []).map((t) => [t.id, t]))

      const enrichedResources = (resData || []).map((r) => ({
        ...r,
        category: categoryMap.get(r.category_id),
        tags: (tagMap.get(r.id) || [])
          .map((tagId) => tagMapById.get(tagId))
          .filter(Boolean) as ResourceLibraryTag[],
      }))

      setResources(enrichedResources)

      // Load completions if user is logged in
      if (user) {
        const { data: compData, error: compError } = await supabase
          .from("training_resource_completions")
          .select("resource_id")
          .eq("user_id", user.id)

        if (!compError && compData) {
          setCompletedIds(new Set(compData.map((c) => c.resource_id)))
        }
      }
    } catch (err: any) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error loading resource library:", err)
      }
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Get tags grouped by type
  const tagsByType = useMemo(() => {
    const grouped: Record<string, ResourceLibraryTag[]> = {}
    tags.forEach((tag) => {
      if (!grouped[tag.type]) grouped[tag.type] = []
      grouped[tag.type].push(tag)
    })
    return grouped
  }, [tags])

  // Get category by ID
  const getCategoryById = useCallback(
    (categoryId: string) => {
      return categories.find((c) => c.id === categoryId)
    },
    [categories]
  )

  // Get category icon
  const getCategoryIcon = useCallback(
    (categoryId: string) => {
      return categories.find((c) => c.id === categoryId)?.icon || "📚"
    },
    [categories]
  )

  // Get category color
  const getCategoryColor = useCallback(
    (categoryId: string) => {
      return categories.find((c) => c.id === categoryId)?.color || "#6B7280"
    },
    [categories]
  )

  // Filter resources by category, tags, and search
  const filterResources = useCallback(
    (
      categoryId: string | "All",
      selectedTags: string[],
      searchQuery: string
    ): ResourceLibraryResource[] => {
      return resources
        .filter((r) => {
          // Category filter
          if (categoryId !== "All" && r.category_id !== categoryId) return false

          // Tag filter (AND logic - resource must have ALL selected tags)
          if (selectedTags.length > 0) {
            const resourceTagIds = r.tags?.map((t) => t.id) || []
            const hasAllTags = selectedTags.every((tagId) =>
              resourceTagIds.includes(tagId)
            )
            if (!hasAllTags) return false
          }

          // Search filter
          if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const matchesTitle = r.title.toLowerCase().includes(query)
            const matchesDescription = r.description?.toLowerCase().includes(query) || false
            const matchesCategory = r.category?.name.toLowerCase().includes(query) || false
            const matchesTags = r.tags?.some((t) =>
              t.name.toLowerCase().includes(query)
            ) || false
            return matchesTitle || matchesDescription || matchesCategory || matchesTags
          }

          return true
        })
        .sort((a, b) => a.sort_order - b.sort_order)
    },
    [resources]
  )

  // Group resources by category
  const groupedResources = useMemo(() => {
    const grouped: Record<string, ResourceLibraryResource[]> = {}
    categories.forEach((cat) => {
      grouped[cat.id] = resources
        .filter((r) => r.category_id === cat.id)
        .sort((a, b) => a.sort_order - b.sort_order)
    })
    return grouped
  }, [resources, categories])

  // Calculate overall progress
  const progress: ResourceLibraryProgress = useMemo(() => {
    const total = resources.length
    const completed = Array.from(completedIds).filter((id) =>
      resources.some((r) => r.id === id)
    ).length
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    return { total, completed, percentage }
  }, [resources, completedIds])

  // Check if a resource is completed
  const isCompleted = useCallback(
    (resourceId: string) => {
      return completedIds.has(resourceId)
    },
    [completedIds]
  )

  // Toggle completion status
  const toggleCompletion = useCallback(
    async (resourceId: string) => {
      if (!user) return

      const isCurrentlyCompleted = completedIds.has(resourceId)

      // Optimistic update
      setCompletedIds((prev) => {
        const newSet = new Set(prev)
        if (isCurrentlyCompleted) {
          newSet.delete(resourceId)
        } else {
          newSet.add(resourceId)
        }
        return newSet
      })

      try {
        if (isCurrentlyCompleted) {
          const { error } = await supabase
            .from("training_resource_completions")
            .delete()
            .eq("user_id", user.id)
            .eq("resource_id", resourceId)

          if (error) throw error
        } else {
          const { error } = await supabase
            .from("training_resource_completions")
            .insert([{ user_id: user.id, resource_id: resourceId }])

          if (error) throw error
        }
      } catch (err: any) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error toggling completion:", err)
        }
        // Revert on error
        setCompletedIds((prev) => {
          const newSet = new Set(prev)
          if (isCurrentlyCompleted) {
            newSet.add(resourceId)
          } else {
            newSet.delete(resourceId)
          }
          return newSet
        })
      }
    },
    [user, completedIds, supabase]
  )

  // Get category progress
  const getCategoryProgress = useCallback(
    (categoryId: string) => {
      const catResources = resources.filter((r) => r.category_id === categoryId)
      const catCompleted = catResources.filter((r) => completedIds.has(r.id)).length
      return {
        total: catResources.length,
        completed: catCompleted,
        percentage:
          catResources.length > 0
            ? Math.round((catCompleted / catResources.length) * 100)
            : 0,
      }
    },
    [resources, completedIds]
  )

  // Generate search suggestions from resources, categories, and tags
  const searchSuggestions = useMemo(() => {
    const suggestions: string[] = []
    resources.forEach((resource) => {
      if (!suggestions.includes(resource.title)) {
        suggestions.push(resource.title)
      }
    })
    categories.forEach((cat) => {
      if (!suggestions.includes(cat.name)) {
        suggestions.push(cat.name)
      }
    })
    tags.forEach((tag) => {
      if (!suggestions.includes(tag.name)) {
        suggestions.push(tag.name)
      }
    })
    return suggestions
  }, [resources, categories, tags])

  return {
    // Data
    resources,
    categories,
    tags,
    tagsByType,
    groupedResources,
    
    // Loading state
    loading,
    error,
    
    // Helpers
    getCategoryById,
    getCategoryIcon,
    getCategoryColor,
    filterResources,
    searchSuggestions,
    
    // Completion tracking
    completedIds,
    progress,
    isCompleted,
    toggleCompletion,
    getCategoryProgress,
    
    // Reload
    reload: loadData,
  }
}
