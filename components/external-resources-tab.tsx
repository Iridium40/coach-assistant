"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ResourceCard } from "@/components/resource-card"
import { useUserData } from "@/contexts/user-data-context"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pin, X, ExternalLink, Users, BookOpen, Search } from "lucide-react"
import { SearchWithHistory } from "@/components/search-with-history"
import { createClient } from "@/lib/supabase/client"
import type { ExternalResource as DBExternalResource } from "@/lib/types"

interface Resource {
  id: string
  title: string
  description: string
  url: string
  buttonText: string
  category: string
  features: string[] | { tags?: string[]; type?: string; [key: string]: any } | null
}

export function ExternalResourcesTab() {
  const { user, profile } = useUserData()
  const { isBookmarked, toggleBookmark, getBookmarkedIds } = useBookmarks(user)
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "All")
  const [dbResources, setDbResources] = useState<DBExternalResource[]>([])
  const [loadingResources, setLoadingResources] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const pinnedIds = useMemo(() => getBookmarkedIds("external_resource"), [getBookmarkedIds])

  // Fetch resources from database
  useEffect(() => {
    const fetchResources = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("external_resources")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (!error && data) {
        setDbResources(data)
      }
      setLoadingResources(false)
    }

    fetchResources()
  }, [])

  // Sync selectedCategory with URL parameter when it changes
  useEffect(() => {
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const togglePin = (resourceId: string) => {
    toggleBookmark(resourceId, "external_resource")
  }

  // Convert database resources to the Resource format (preserving sort_order)
  // All resources now come from the database and can be managed via admin panel
  const resources: (Resource & { sort_order: number })[] = useMemo(() => {
    return dbResources.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      url: r.is_dynamic && r.url.includes("{optavia_id}") && profile?.optavia_id
        ? r.url.replace("{optavia_id}", profile.optavia_id)
        : r.url,
      buttonText: r.button_text,
      category: r.category,
      features: r.features,
      sort_order: r.sort_order,
    })).filter(r => {
      // Filter out dynamic resources if user doesn't meet the condition
      const dbResource = dbResources.find(db => db.id === r.id)
      if (dbResource?.show_condition === "optavia_id" && !profile?.optavia_id) {
        return false
      }
      return true
    }).sort((a, b) => a.sort_order - b.sort_order)
  }, [dbResources, profile?.optavia_id])

  // Get pinned resources
  const pinnedResources = useMemo(() => {
    return resources.filter((r) => pinnedIds.includes(r.id))
  }, [resources, pinnedIds])

  // Resource categories
  const categories = [
    "All",
    // Getting Started & Business
    "Getting Started",
    "Tax & Finance",
    "Business Development",
    // Client Journey
    "Journey Kickoff",
    "Client Text Templates",
    "Client Support",
    "Client Support Videos",
    // Nutrition & Health
    "Nutrition Guides",
    // Social & Marketing
    "Social Media Strategy",
    // Mindset & Growth
    "Troubleshooting",
    "Coaching Real Talk",
    // Legacy categories
    "OPTAVIA Portals",
    "Social Media",
    "Communities",
    "Training",
  ]

  // Memoize filtered resources with search
  const filteredResources = useMemo(() => {
    const filtered = resources.filter((resource) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        // Search in title, description, category, and tags
        // Handle both legacy array format and new JSONB object format
        const tags = Array.isArray(resource.features) 
          ? resource.features 
          : (resource.features?.tags && Array.isArray(resource.features.tags))
            ? resource.features.tags 
            : []
        const matchesSearch = 
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.category.toLowerCase().includes(query) ||
          tags.some((t: string) => t.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }
      
      // Apply category filter
      if (selectedCategory === "All") return true
      return resource.category === selectedCategory
    })
    // Sort by sort_order within the filtered results
    return filtered.sort((a, b) => a.sort_order - b.sort_order)
  }, [resources, selectedCategory, searchQuery])

  // Generate search suggestions from resource titles and descriptions
  const searchSuggestions = useMemo(() => {
    const suggestions: Set<string> = new Set()
    
    // Add resource titles
    resources.forEach((resource) => {
      suggestions.add(resource.title)
      // Add key words from description (first few words)
      const descWords = resource.description.split(" ").slice(0, 4).join(" ")
      if (descWords.length > 5) {
        suggestions.add(descWords)
      }
    })
    
    // Add common keywords
    suggestions.add("OPTAVIA")
    suggestions.add("Facebook")
    suggestions.add("Instagram")
    suggestions.add("YouTube")
    suggestions.add("Training")
    
    return Array.from(suggestions)
  }, [resources])

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  return (
    <div>
      {/* Title and Description */}
      <div className="text-center py-4 sm:py-8 mb-6">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-3 sm:mb-4">
          External Resources
        </h2>
        <p className="text-optavia-gray text-base sm:text-lg max-w-2xl mx-auto px-4">
          Access external resources and communities to support your coaching journey and help your clients succeed.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="max-w-md">
          <SearchWithHistory
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search resources..."
            suggestions={searchSuggestions}
            storageKey="resources"
          />
        </div>
        {/* Search Results Summary */}
        {searchQuery && (
          <div className="mt-2 text-sm text-optavia-gray">
            Found {filteredResources.length} result{filteredResources.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
          </div>
        )}
      </div>

      {/* Category Filter - Mobile Dropdown */}
      <div className="md:hidden mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full border-2 border-gray-300 text-optavia-dark bg-white hover:border-[hsl(var(--optavia-green))] focus:border-[hsl(var(--optavia-green))] focus:ring-[hsl(var(--optavia-green-light))]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white text-optavia-dark">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter - Desktop Buttons */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                : "border-gray-300 text-optavia-dark hover:bg-gray-100 hover:border-[hsl(var(--optavia-green))] hover:text-[hsl(var(--optavia-green))] bg-white"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* OPTAVIA & Community Resources */}
      {filteredResources.length > 0 && (
        <>
          {selectedCategory === "All" && (
            <h3 className="font-heading font-semibold text-lg text-optavia-dark mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
              External Resources
              {searchQuery && <span className="text-sm font-normal text-optavia-gray">({filteredResources.length} results)</span>}
            </h3>
          )}
          {selectedCategory === "OPTAVIA Portals" && (
            <h3 className="font-heading font-semibold text-lg text-optavia-dark mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
              OPTAVIA Portals & Resources
            </h3>
          )}
          {selectedCategory === "Communities" && (
            <h3 className="font-heading font-semibold text-lg text-optavia-dark mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
              Communities & Groups
            </h3>
          )}
          {selectedCategory === "Training" && (
            <h3 className="font-heading font-semibold text-lg text-optavia-dark mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
              Training Resources
            </h3>
          )}
          {selectedCategory === "Other" && (
            <h3 className="font-heading font-semibold text-lg text-optavia-dark mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
              Other Resources
            </h3>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                url={resource.url}
                buttonText={resource.buttonText}
                features={resource.features}
                isPinned={pinnedIds.includes(resource.id)}
                onTogglePin={() => togglePin(resource.id)}
              />
            ))}
          </div>
        </>
      )}

      {/* No Results Message */}
      {filteredResources.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-optavia-gray mx-auto mb-4 opacity-50" />
          <p className="text-optavia-gray text-lg">No results found for &quot;{searchQuery}&quot;</p>
          <p className="text-optavia-gray text-sm mt-2">Try adjusting your search terms or clear the search</p>
        </div>
      )}

      {filteredResources.length === 0 && !searchQuery && selectedCategory !== "All" && (
        <div className="text-center py-12 text-optavia-gray">No resources found in this category.</div>
      )}
    </div>
  )
}
