"use client"

import { useState, useMemo } from "react"
import { Droplets, Dumbbell, Activity, Users, Wrench, Share2, BookOpen, Search, ClipboardList, Compass } from "lucide-react"
import { SearchWithHistory } from "@/components/search-with-history"
import { ToolCard } from "@/components/coach-tools/tool-card"
import { useBookmarks } from "@/hooks/use-bookmarks"
import { useUserData } from "@/contexts/user-data-context"
import { WaterCalculator } from "@/components/coach-tools/water-calculator"
import { ExerciseGuide } from "@/components/coach-tools/exercise-guide"
import { MetabolicHealthInfo } from "@/components/coach-tools/metabolic-health-info"
import { ClientOnboardingDialog } from "@/components/coach-tools/client-onboarding-dialog"
import { ClientTroubleshootingDialog } from "@/components/coach-tools/client-troubleshooting-dialog"
import { ShareHALink } from "@/components/coach-tools/share-ha-link"
import { SocialMediaPromptGenerator } from "@/components/social-media-prompt-generator"
import { OPTAVIAReferenceGuide } from "@/components/coach-tools/optavia-reference-guide"
import { ObjectionNavigator } from "@/components/coach-tools/objection-navigator"

const COACH_TOOLS = [
  {
    id: "health-assessment",
    title: "Share Health Assessment",
    description: "Share your personalized Health Assessment link with prospects and review submissions via email.",
    icon: ClipboardList,
    component: ShareHALink,
    expandMode: "dialog" as const,
  },
  {
    id: "client-onboarding",
    title: "Client Onboarding Tool",
    description: "Streamline new client onboarding with templates, checklists, and quick-copy messages.",
    icon: Users,
    component: ClientOnboardingDialog,
    expandMode: "dialog" as const,
  },
  {
    id: "client-troubleshooting",
    title: "Client Troubleshooting Guide",
    description: "Quick solutions and scripts for common client issues and challenges.",
    icon: Wrench,
    component: ClientTroubleshootingDialog,
    expandMode: "dialog" as const,
  },
  {
    id: "social-media-generator",
    title: "Social Media Post Generator",
    description: "Build prompts for ChatGPT to generate 3 unique social media post ideas instantly.",
    icon: Share2,
    component: SocialMediaPromptGenerator,
    expandMode: "dialog" as const,
  },
  {
    id: "objection-navigator",
    title: "Objection Navigator",
    description: "Real-time conversation scripts for handling common prospect objections with confidence.",
    icon: Compass,
    component: ObjectionNavigator,
    expandMode: "dialog" as const,
  },
  {
    id: "optavia-reference",
    title: "Condiments Quick Reference Guide",
    description: "Comprehensive guide to healthy fats, salad dressings, condiments, and portion sizes for the 5 & 1 Plan.",
    icon: BookOpen,
    component: OPTAVIAReferenceGuide,
    expandMode: "dialog" as const,
  },
  {
    id: "water-calculator",
    title: "Water Intake Calculator",
    description: "Calculate personalized daily water intake goals for your clients based on weight and activity level.",
    icon: Droplets,
    component: WaterCalculator,
  },
  {
    id: "exercise-guide",
    title: "Exercise & Motion Guide",
    description: "Weekly workout plans, OPTAVIA ACTIVE products, and motion tips for all fitness levels.",
    icon: Dumbbell,
    component: ExerciseGuide,
  },
  {
    id: "metabolic-health",
    title: "Metabolic Health Education",
    description: "Key information about metabolic health, talking points, and how OPTAVIA supports wellness.",
    icon: Activity,
    component: MetabolicHealthInfo,
  },
]

export function CoachToolsTab() {
  const { user } = useUserData()
  const { isBookmarked, toggleBookmark, getBookmarkedIds } = useBookmarks(user)
  const [searchQuery, setSearchQuery] = useState("")

  const pinnedToolIds = useMemo(() => getBookmarkedIds("coach_tool"), [getBookmarkedIds])

  const toggleToolPin = (toolId: string) => {
    toggleBookmark(toolId, "coach_tool")
  }

  // Filter coach tools by search query
  const filteredCoachTools = useMemo(() => {
    if (!searchQuery) return COACH_TOOLS
    const query = searchQuery.toLowerCase()
    return COACH_TOOLS.filter(tool =>
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Generate search suggestions from tool names
  const searchSuggestions = useMemo(() => {
    const suggestions: Set<string> = new Set()
    COACH_TOOLS.forEach((tool) => {
      suggestions.add(tool.title)
    })
    suggestions.add("Calculator")
    suggestions.add("Health")
    suggestions.add("Coach")
    suggestions.add("Onboarding")
    suggestions.add("Troubleshooting")
    suggestions.add("Social Media")
    return Array.from(suggestions)
  }, [])

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  return (
    <div>
      {/* Title and Description */}
      <div className="text-center py-4 sm:py-8 mb-6">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-3 sm:mb-4">
          Coach Tools
        </h2>
        <p className="text-optavia-gray text-base sm:text-lg max-w-2xl mx-auto px-4">
          Interactive tools to help you manage clients, create content, and streamline your coaching business.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="max-w-md">
          <SearchWithHistory
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search coach tools..."
            suggestions={searchSuggestions}
            storageKey="coach-tools"
          />
        </div>
        {searchQuery && (
          <div className="mt-2 text-sm text-optavia-gray">
            Found {filteredCoachTools.length} result{filteredCoachTools.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
          </div>
        )}
      </div>

      {/* Coach Tools Grid */}
      {filteredCoachTools.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCoachTools.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              expandMode={tool.expandMode || "dialog"}
              isPinned={pinnedToolIds.includes(tool.id)}
              onTogglePin={() => toggleToolPin(tool.id)}
            >
              {tool.component && <tool.component />}
            </ToolCard>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {filteredCoachTools.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-optavia-gray mx-auto mb-4 opacity-50" />
          <p className="text-optavia-gray text-lg">No tools found for &quot;{searchQuery}&quot;</p>
          <p className="text-optavia-gray text-sm mt-2">Try adjusting your search terms or clear the search</p>
        </div>
      )}
    </div>
  )
}
