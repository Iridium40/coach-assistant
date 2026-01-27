"use client"

import { useState, useMemo, useCallback } from "react"
import { useResourceLibrary, resourceTypeIcons, TAG_TYPE_LABELS, type ResourceLibraryResource } from "@/hooks/use-resource-library"
import { useUserData } from "@/contexts/user-data-context"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { SearchWithHistory } from "@/components/search-with-history"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { 
  Search, 
  ExternalLink, 
  FileText, 
  Video, 
  Palette, 
  Link2, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Bookmark, 
  Filter, 
  X, 
  FileIcon, 
  FormInput,
  Rocket,
  Briefcase,
  Share2,
  Users,
  Clipboard,
  UserPlus,
  MessageCircle,
  Wrench,
  BookOpen,
  Heart,
  UserCheck,
  BarChart2,
  Award,
  TrendingUp,
  DollarSign,
  FolderOpen,
  type LucideIcon,
} from "lucide-react"
import { EmbeddedContentViewer } from "@/components/embedded-content-viewer"
import { TrainingContextualResources } from "@/components/resources"
import { useToast } from "@/hooks/use-toast"

// Map icon names from database to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  "rocket": Rocket,
  "briefcase": Briefcase,
  "share-2": Share2,
  "users": Users,
  "clipboard": Clipboard,
  "user-plus": UserPlus,
  "message-circle": MessageCircle,
  "tool": Wrench,
  "book-open": BookOpen,
  "heart": Heart,
  "user-check": UserCheck,
  "bar-chart-2": BarChart2,
  "award": Award,
  "trending-up": TrendingUp,
  "dollar-sign": DollarSign,
  // Fallback
  "folder": FolderOpen,
}

// Helper component to render category icons
function CategoryIcon({ iconName, className }: { iconName: string; className?: string }) {
  const IconComponent = iconMap[iconName] || FolderOpen
  return <IconComponent className={className || "h-4 w-4"} />
}

export function TrainingResourcesTab() {
  const { user } = useUserData()
  const { toast } = useToast()
  
  const {
    resources,
    categories,
    tags,
    tagsByType,
    loading,
    filterResources,
    getCategoryIcon,
    getCategoryColor,
    getCategoryById,
    isCompleted,
    toggleCompletion,
    progress,
    getCategoryProgress,
    searchSuggestions,
  } = useResourceLibrary(user)

  const { isBookmarked, toggleBookmark } = useBookmarks(user)

  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<ResourceLibraryResource | null>(null)
  const [showTagFilters, setShowTagFilters] = useState(false)

  // Types that cannot be embedded - open directly in new tab
  const nonEmbeddableTypes = ["canva", "form"]
  
  // Open resource in embedded viewer or new tab - also marks as complete
  const openResource = (resource: ResourceLibraryResource) => {
    // Mark as complete when opening (if not already)
    if (user && !isCompleted(resource.id)) {
      toggleCompletion(resource.id)
    }
    
    // Check if resource type or URL indicates non-embeddable content
    const isCanvaUrl = resource.url.includes("canva.com")
    const isJotFormUrl = resource.url.includes("jotform.com")
    const isNonEmbeddable = nonEmbeddableTypes.includes(resource.type) || isCanvaUrl || isJotFormUrl
    
    if (isNonEmbeddable) {
      // Open directly in new tab
      window.open(resource.url, "_blank", "noopener,noreferrer")
    } else {
      // Open in embedded viewer
      setSelectedResource(resource)
      setViewerOpen(true)
    }
  }

  // Handle bookmark toggle
  const handleToggleBookmark = async (e: React.MouseEvent, resourceId: string, resourceTitle: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) return
    
    const wasBookmarked = isBookmarked(resourceId)
    const success = await toggleBookmark(resourceId)
    
    if (success) {
      toast({
        title: wasBookmarked ? "Bookmark removed" : "Bookmarked!",
        description: wasBookmarked 
          ? `"${resourceTitle}" removed from bookmarks`
          : `"${resourceTitle}" added to bookmarks`,
      })
    }
  }

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    )
  }

  // Clear all tag filters
  const clearTagFilters = () => {
    setSelectedTags([])
  }

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  // Expand all categories
  const expandAll = () => {
    setExpandedCategories(new Set(categories.map(c => c.id)))
  }

  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories(new Set())
  }

  // Filter resources based on category, tags, and search
  const filteredResources = useMemo(() => {
    return filterResources(selectedCategory, selectedTags, searchQuery)
  }, [filterResources, selectedCategory, selectedTags, searchQuery])

  // Group filtered resources by category for display
  const groupedFiltered = useMemo(() => {
    const grouped: Record<string, ResourceLibraryResource[]> = {}
    filteredResources.forEach(r => {
      if (!grouped[r.category_id]) grouped[r.category_id] = []
      grouped[r.category_id].push(r)
    })
    // Sort resources within each category by sort_order
    Object.keys(grouped).forEach(catId => {
      grouped[catId].sort((a, b) => a.sort_order - b.sort_order)
    })
    return grouped
  }, [filteredResources])

  // Get categories in correct order based on sort_order
  const orderedCategories = useMemo(() => {
    const categoriesInResults = Object.keys(groupedFiltered)
    return categories
      .filter(c => categoriesInResults.includes(c.id))
      .sort((a, b) => a.sort_order - b.sort_order)
  }, [groupedFiltered, categories])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-red-500" />
      case "canva":
        return <Palette className="h-4 w-4 text-purple-500" />
      case "doc":
      case "document":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "pdf":
        return <FileIcon className="h-4 w-4 text-orange-500" />
      case "form":
        return <FormInput className="h-4 w-4 text-green-500" />
      default:
        return <Link2 className="h-4 w-4 text-gray-500" />
    }
  }

  // Get selected tag names for display
  const selectedTagNames = useMemo(() => {
    return selectedTags.map(tagId => {
      const tag = tags.find(t => t.id === tagId)
      return tag?.name || tagId
    })
  }, [selectedTags, tags])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--optavia-green))]"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Title and Description with Progress */}
      <div className="text-center py-4 sm:py-6 mb-4 sm:mb-6">
        <h2 className="font-heading font-bold text-xl sm:text-3xl text-optavia-dark mb-2">
          Training Resources
        </h2>
        {user && (
          <div className="max-w-md mx-auto mt-3 px-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-optavia-gray">Your Progress</span>
              <span className="font-semibold text-[hsl(var(--optavia-green))]">
                {progress.completed} / {progress.total} ({progress.percentage}%)
              </span>
            </div>
            <Progress value={progress.percentage} className="h-2" />
          </div>
        )}
      </div>

      {/* Search and Filter */}
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        <div className="flex flex-col gap-3">
          {/* Search with autocomplete suggestions */}
          <div className="w-full sm:max-w-md">
            <SearchWithHistory
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search resources..."
              suggestions={searchSuggestions}
              storageKey="training-resources"
            />
          </div>

          {/* Category Filter - Mobile Dropdown */}
          <div className="sm:hidden">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">
                  <span className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    <span>All Categories</span>
                  </span>
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <span className="flex items-center gap-2">
                      <CategoryIcon iconName={cat.icon} className="h-4 w-4" />
                      <span className="truncate">{cat.name.length > 30 ? cat.name.slice(0, 30) + "..." : cat.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Filter - Desktop Buttons */}
        <div className="hidden sm:flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("All")}
            className={
              selectedCategory === "All"
                ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                : "border-gray-300 text-optavia-dark hover:bg-gray-100"
            }
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                  : "border-gray-300 text-optavia-dark hover:bg-gray-100"
              }`}
            >
              <CategoryIcon iconName={cat.icon} className="h-4 w-4" />
              <span>{cat.name.length > 20 ? cat.name.slice(0, 20) + "..." : cat.name}</span>
            </Button>
          ))}
        </div>

        {/* Tag Filters - Collapsible */}
        <Collapsible open={showTagFilters} onOpenChange={setShowTagFilters}>
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-optavia-gray hover:text-optavia-dark">
                <Filter className="h-4 w-4 mr-1" />
                Filter by Tags
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {selectedTags.length}
                  </Badge>
                )}
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showTagFilters ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearTagFilters}
                className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <X className="h-3 w-3 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
          
          <CollapsibleContent className="mt-3">
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              {Object.entries(tagsByType).map(([type, typeTags]) => (
                <div key={type}>
                  <h4 className="text-xs font-semibold text-optavia-gray uppercase tracking-wide mb-2">
                    {TAG_TYPE_LABELS[type] || type}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {typeTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag.id)
                      return (
                        <button
                          key={tag.id}
                          onClick={() => toggleTag(tag.id)}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            isSelected
                              ? "bg-[hsl(var(--optavia-green))] text-white border-[hsl(var(--optavia-green))]"
                              : "bg-white text-optavia-dark border-gray-300 hover:border-[hsl(var(--optavia-green))] hover:text-[hsl(var(--optavia-green))]"
                          }`}
                        >
                          {tag.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Active filters display */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-optavia-gray">Active filters:</span>
            {selectedTagNames.map((name, idx) => (
              <Badge
                key={selectedTags[idx]}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-gray-200"
                onClick={() => toggleTag(selectedTags[idx])}
              >
                {name}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      {(searchQuery || selectedTags.length > 0) && (
        <p className="text-sm text-optavia-gray mb-3 sm:mb-4 px-1">
          Found {filteredResources.length} result{filteredResources.length !== 1 ? "s" : ""}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedTags.length > 0 && ` with ${selectedTags.length} filter${selectedTags.length !== 1 ? "s" : ""}`}
        </p>
      )}

      {/* Resources grouped by category */}
      {orderedCategories.length === 0 ? (
        <div className="text-center py-12 text-optavia-gray">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No resources found matching your criteria.</p>
          {(selectedTags.length > 0 || searchQuery) && (
            <Button
              variant="link"
              onClick={() => {
                clearTagFilters()
                setSearchQuery("")
              }}
              className="mt-2 text-[hsl(var(--optavia-green))]"
            >
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {/* Expand/Collapse All buttons */}
          <div className="flex justify-end gap-2 px-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={expandAll}
              className="text-xs text-optavia-gray hover:text-optavia-dark"
            >
              Expand All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={collapseAll}
              className="text-xs text-optavia-gray hover:text-optavia-dark"
            >
              Collapse All
            </Button>
          </div>

          {orderedCategories.map((category) => {
            const catResources = groupedFiltered[category.id]
            const isExpanded = expandedCategories.has(category.id)
            const catProgress = getCategoryProgress(category.id)
            const isComplete = catProgress.completed === catProgress.total && catProgress.total > 0
            
            return (
              <div key={category.id} className="border rounded-lg overflow-hidden bg-white">
                {/* Category Header - Clickable */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors text-left"
                >
                  {/* Expand/Collapse Icon */}
                  <div className="flex-shrink-0 text-gray-400">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <CategoryIcon iconName={category.icon} className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-optavia-dark line-clamp-1 flex-1">
                    {category.name}
                  </h3>
                  
                  {/* Category Progress */}
                  {user && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isComplete ? (
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {catProgress.completed}/{catProgress.total}
                        </Badge>
                      )}
                    </div>
                  )}
                  {!user && (
                    <Badge variant="secondary" className="flex-shrink-0 text-xs">
                      {catResources.length}
                    </Badge>
                  )}
                </button>

                {/* Resources List - Collapsible */}
                {isExpanded && (
                  <div className="border-t">
                    <div className="bg-gray-50/50 divide-y divide-gray-100">
                      {catResources.map((resource) => {
                        const completed = isCompleted(resource.id)
                        const bookmarked = isBookmarked(resource.id)
                        return (
                          <div
                            key={resource.id}
                            className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition-colors group ${
                              completed ? "bg-green-50/50" : ""
                            }`}
                          >
                            {/* Checkbox */}
                            {user && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleCompletion(resource.id)
                                }}
                                className="flex-shrink-0 p-0.5"
                                title={completed ? "Mark as incomplete" : "Mark as complete"}
                              >
                                {completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                                )}
                              </button>
                            )}

                            {/* Type Icon */}
                            <div className="flex-shrink-0 w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center">
                              {getTypeIcon(resource.type)}
                            </div>

                            {/* Content - Clickable to open in viewer */}
                            <button
                              onClick={() => openResource(resource)}
                              className="flex-1 min-w-0 flex items-center gap-2 text-left"
                            >
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-medium text-sm leading-snug group-hover:text-[hsl(var(--optavia-green))] transition-colors truncate ${
                                  completed ? "text-gray-500" : "text-optavia-dark"
                                }`}>
                                  {resource.title}
                                </h4>
                                {/* Show tags on hover or when filtered */}
                                {resource.tags && resource.tags.length > 0 && (
                                  <div className="hidden group-hover:flex flex-wrap gap-1 mt-1">
                                    {resource.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag.id}
                                        className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
                                      >
                                        {tag.name}
                                      </span>
                                    ))}
                                    {resource.tags.length > 3 && (
                                      <span className="text-[10px] px-1.5 py-0.5 text-gray-400">
                                        +{resource.tags.length - 3}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Type badge + Open Icon */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge variant="outline" className="text-[10px] capitalize hidden sm:inline-flex">
                                  {resource.type}
                                </Badge>
                                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[hsl(var(--optavia-green))] transition-colors" />
                              </div>
                            </button>

                            {/* Bookmark Button */}
                            {user && (
                              <button
                                onClick={(e) => handleToggleBookmark(e, resource.id, resource.title)}
                                className="flex-shrink-0 p-1 hover:bg-gray-200 rounded transition-colors"
                                title={bookmarked ? "Remove bookmark" : "Bookmark this resource"}
                              >
                                <Bookmark 
                                  className={`h-4 w-4 transition-colors ${
                                    bookmarked 
                                      ? "fill-amber-400 text-amber-400" 
                                      : "text-gray-300 hover:text-amber-400"
                                  }`} 
                                />
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    
                    {/* Related External Resources for this category */}
                    <div className="p-3 bg-white border-t">
                      <TrainingContextualResources trainingCategory={category.name} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Embedded Content Viewer */}
      {selectedResource && (
        <EmbeddedContentViewer
          open={viewerOpen}
          onOpenChange={setViewerOpen}
          url={selectedResource.url}
          title={selectedResource.title}
          type={selectedResource.type}
        />
      )}
    </div>
  )
}
