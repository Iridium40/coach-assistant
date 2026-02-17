"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Announcements } from "@/components/announcements"
import { useUserData } from "@/contexts/user-data-context"
import { createClient } from "@/lib/supabase/client"
import {
  Video, Calendar, Clock, Users, ChevronRight,
  BookOpen, UtensilsCrossed, Wrench, ExternalLink, Award,
  CheckCircle, Sparkles, Star, GraduationCap, Link2, Pin,
  Droplets, Dumbbell, Activity, Share2, Bookmark,
  Info, Trophy, Heart, ClipboardList, Compass
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useProspects } from "@/hooks/use-prospects"
import { useClients } from "@/hooks/use-clients"
import { useTrainingResources } from "@/hooks/use-training-resources"
import { useRankCalculator, type RankType, RANK_REQUIREMENTS } from "@/hooks/use-rank-calculator"
import { useBookmarks } from "@/hooks/use-bookmarks"
import type { ZoomCall } from "@/lib/types"
import { expandRecurringEvents, getEventsForDate, type ExpandedZoomCall } from "@/lib/expand-recurring-events"
import { getOnboardingProgress } from "@/lib/onboarding-utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

// Dashboard Components
import { CoachTip, PipelineSnapshot, TodaysPriorities, RankProgressCard, QuickActions, NextTrainingCard } from "@/components/dashboard/index"
import { TodaysFocus } from "@/components/dashboard/TodaysFocus"
import { MilestoneActionModal } from "@/components/milestone-action-modal"
import { getProgramDay } from "@/hooks/use-clients"

// Coach Tools imports
import { WaterCalculator } from "@/components/coach-tools/water-calculator"
import { ExerciseGuide } from "@/components/coach-tools/exercise-guide"
import { MetabolicHealthInfo } from "@/components/coach-tools/metabolic-health-info"
import { ClientOnboardingDialog } from "@/components/coach-tools/client-onboarding-dialog"
import { ClientTroubleshootingDialog } from "@/components/coach-tools/client-troubleshooting-dialog"
import { SocialMediaPromptGenerator } from "@/components/social-media-prompt-generator"
import { OPTAVIAReferenceGuide } from "@/components/coach-tools/optavia-reference-guide"
import { ShareHALink } from "@/components/coach-tools/share-ha-link"
import { ObjectionNavigator } from "@/components/coach-tools/objection-navigator"

// Coach Tools definitions - must match IDs in coach-tools-tab.tsx for pinning to work
const COACH_TOOLS: { id: string; title: string; icon: LucideIcon; component: React.ComponentType }[] = [
  { id: "health-assessment", title: "Share Health Assessment", icon: ClipboardList, component: ShareHALink },
  { id: "client-onboarding", title: "Client Onboarding Tool", icon: Users, component: ClientOnboardingDialog },
  { id: "client-troubleshooting", title: "Client Troubleshooting Guide", icon: Wrench, component: ClientTroubleshootingDialog },
  { id: "water-calculator", title: "Water Intake Calculator", icon: Droplets, component: WaterCalculator },
  { id: "exercise-guide", title: "Exercise & Motion Guide", icon: Dumbbell, component: ExerciseGuide },
  { id: "metabolic-health", title: "Metabolic Health Education", icon: Activity, component: MetabolicHealthInfo },
  { id: "social-media-generator", title: "Social Media Post Generator", icon: Share2, component: SocialMediaPromptGenerator },
  { id: "objection-navigator", title: "Objection Navigator", icon: Compass, component: ObjectionNavigator },
  { id: "optavia-reference", title: "Condiments Quick Reference Guide", icon: BookOpen, component: OPTAVIAReferenceGuide },
]

// External Resources are now fetched from the database based on pinned IDs

export function DashboardOverview() {
  const { user, profile, badges, recipes, favoriteRecipes, completedResources } = useUserData()
  const supabase = createClient()

  // CRM hooks
  const { prospects, stats: prospectStats } = useProspects()
  const { clients, stats: clientStats, toggleTouchpoint, needsAttention } = useClients()

  // Training resources progress - pass user rank to properly filter accessible categories
  const { progress: trainingProgress, resources: trainingResources } = useTrainingResources(user, profile?.coach_rank || null)
  
  // Bookmarks for training resources
  const { getBookmarkedIds } = useBookmarks(user)

  // Rank calculator
  const { rankData, frontlineCoaches, qualifyingLegsCount, edTeamsCount, fibcTeamsCount, calculateGaps, getNextRank } = useRankCalculator(user)

  const [upcomingMeetings, setUpcomingMeetings] = useState<ExpandedZoomCall[]>([])
  const [loadingMeetings, setLoadingMeetings] = useState(true)
  const [onboardingProgress, setOnboardingProgress] = useState<{ completed: number; total: number; percentage: number }>({ completed: 0, total: 3, percentage: 0 })
  const [pinnedToolIds, setPinnedToolIds] = useState<string[]>([])
  const [pinnedResourceIds, setPinnedResourceIds] = useState<string[]>([])
  const [pinnedResources, setPinnedResources] = useState<{ id: string; title: string; url: string }[]>([])
  const [openToolId, setOpenToolId] = useState<string | null>(null)
  const [milestoneClient, setMilestoneClient] = useState<any | null>(null)
  const [showMilestoneModal, setShowMilestoneModal] = useState(false)
  const [showRankPromotionModal, setShowRankPromotionModal] = useState(false)
  const [promotedRank, setPromotedRank] = useState<string | null>(null)

  // Load pinned items from localStorage (with Safari-safe error handling)
  useEffect(() => {
    // Safety check for localStorage availability (Safari private mode, etc.)
    const isLocalStorageAvailable = () => {
      try {
        const testKey = "__test__"
        window.localStorage.setItem(testKey, testKey)
        window.localStorage.removeItem(testKey)
        return true
      } catch (e) {
        return false
      }
    }

    if (!isLocalStorageAvailable()) {
      console.warn("localStorage not available (possibly Safari private mode)")
      return
    }

    try {
      const savedTools = localStorage.getItem("pinnedTools")
      if (savedTools) {
        const parsed = JSON.parse(savedTools)
        if (Array.isArray(parsed)) {
          setPinnedToolIds(parsed)
        }
      }
    } catch (e) {
      console.error("Failed to parse pinned tools:", e)
    }

    try {
      const savedResources = localStorage.getItem("pinnedResources")
      if (savedResources) {
        const parsed = JSON.parse(savedResources)
        if (Array.isArray(parsed)) {
          setPinnedResourceIds(parsed)
        }
      }
    } catch (e) {
      console.error("Failed to parse pinned resources:", e)
    }
  }, [])

  // Get pinned tools and resources
  const pinnedTools = useMemo(() => {
    return COACH_TOOLS.filter(t => pinnedToolIds.includes(t.id))
  }, [pinnedToolIds])

  // Fetch pinned resources from the database
  useEffect(() => {
    if (pinnedResourceIds.length === 0) {
      setPinnedResources([])
      return
    }
    const fetchPinnedResources = async () => {
      const { data, error } = await supabase
        .from("external_resources")
        .select("id, title, url")
        .in("id", pinnedResourceIds)
        .eq("is_active", true)
      if (!error && data) {
        setPinnedResources(data)
      }
    }
    fetchPinnedResources()
  }, [pinnedResourceIds, supabase])

  // Get bookmarked training resources
  const bookmarkedTrainingResources = useMemo(() => {
    const bookmarkedIds = getBookmarkedIds()
    return trainingResources.filter(r => bookmarkedIds.includes(r.id))
  }, [trainingResources, getBookmarkedIds])

  const hasPinnedItems = pinnedTools.length > 0 || pinnedResources.length > 0 || bookmarkedTrainingResources.length > 0

  // Load today's meetings (including recurring)
  useEffect(() => {
    if (!user) return

    const loadMeetings = async () => {
      const today = new Date()

      // Fetch all meetings (including completed) to expand recurring ones
      // Recurring events may have a "completed" parent but still have valid future occurrences
      const { data, error } = await supabase
        .from("zoom_calls")
        .select("*")
        .in("status", ["upcoming", "live", "completed"])
        .order("scheduled_at", { ascending: true })

      if (!error && data) {
        // Expand recurring events and filter for today
        const expandedEvents = expandRecurringEvents(data)
        const todaysEvents = getEventsForDate(expandedEvents, today)
        setUpcomingMeetings(todaysEvents.slice(0, 5))
      }
      setLoadingMeetings(false)
    }

    loadMeetings()
  }, [user])

  // Load onboarding progress for new coaches
  useEffect(() => {
    if (!user || !profile?.is_new_coach) {
      setOnboardingProgress({ completed: 0, total: 3, percentage: 0 })
      return
    }

    const loadOnboardingProgress = async () => {
      const progress = await getOnboardingProgress(user.id)
      setOnboardingProgress(progress)
    }

    loadOnboardingProgress()
  }, [user, profile?.is_new_coach])

  // Get popular recipes
  const popularRecipes = useMemo(() => {
    const unfavoritedRecipes = recipes.filter(r => !favoriteRecipes.includes(r.id))
    const sortedByPopularity = [...unfavoritedRecipes].sort((a, b) =>
      (b.favoriteCount || 0) - (a.favoriteCount || 0)
    )
    return sortedByPopularity.slice(0, 4)
  }, [recipes, favoriteRecipes])

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const firstName = profile?.full_name?.split(" ")[0] || "Coach"

  // Calculate rank gaps for RankProgressCard
  const nextRank = rankData ? getNextRank(rankData.current_rank as RankType) : null
  const gaps = rankData ? calculateGaps(rankData.current_rank as RankType, clientStats.active) : null

  // Check if ready for promotion and show celebration
  useEffect(() => {
    if (!rankData || !nextRank || !gaps) return
    
    // Check if all gaps are 0 (ready for promotion) - must also have minimum 5 clients
    const isReadyForPromotion = gaps.points === 0 && gaps.scTeams === 0 && gaps.edTeams === 0 && gaps.fibcTeams === 0 && gaps.minClients === 0
    
    if (isReadyForPromotion) {
      // Check if we've already shown this celebration (using localStorage)
      const lastCelebratedRank = localStorage.getItem(`rankPromotionCelebrated_${nextRank}`)
      const currentRankKey = `${rankData.current_rank}_to_${nextRank}`
      
      // Only show if we haven't celebrated this specific promotion yet
      if (lastCelebratedRank !== currentRankKey) {
        setPromotedRank(nextRank)
        setShowRankPromotionModal(true)
        // Mark as celebrated
        localStorage.setItem(`rankPromotionCelebrated_${nextRank}`, currentRankKey)
      }
    }
  }, [rankData, nextRank, gaps])

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      {/* Welcome Section */}
      <div className="text-center py-4 sm:py-6 mb-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-2">
          {getGreeting()}, {firstName}!
        </h1>
        <p className="text-optavia-gray text-base sm:text-lg">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Announcements */}
      <Announcements />

      {/* Coach Tip of the Day */}
      <div className="mt-6">
        <CoachTip />
      </div>

      {/* Today's Focus - Combined Training + Today's Tasks */}
      <div className="mt-6">
        <TodaysFocus
          user={user}
          userRank={profile?.coach_rank || null}
          isNewCoach={profile?.is_new_coach}
          clients={clients}
          prospects={prospects}
          upcomingMeetings={upcomingMeetings}
          loadingMeetings={loadingMeetings}
          needsAttention={needsAttention}
          toggleTouchpoint={toggleTouchpoint}
          onCelebrateClick={(client) => {
            setMilestoneClient(client)
            setShowMilestoneModal(true)
          }}
        />
      </div>

      {/* Section 2: Pipeline Snapshot (4 stat cards) */}
      <div className="mt-6">
        <PipelineSnapshot
          clients={clients}
          clientStats={clientStats}
          prospects={prospects}
          prospectStats={prospectStats}
        />
      </div>

      {/* Quick Actions + Pinned Links */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {/* Quick Actions - driven by dashboard_buttons table */}
        <QuickActions />

        {/* Pinned Links Card */}
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg flex items-center gap-2 text-optavia-dark">
                  <Pin className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                  Pinned Links
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Info className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs p-3 bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200">
                      <p className="font-semibold text-gray-700 mb-1">Pinned Links</p>
                      <p className="text-sm text-gray-600">
                        Your pinned coach tools, external resource links, and bookmarked training resources from the Coach Tools, External Resources, and Training pages.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {hasPinnedItems ? (
              <div className="space-y-2">
                {/* Color Legend */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-1">
                  {pinnedTools.length > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                      Coach Tools
                    </span>
                  )}
                  {pinnedResources.length > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                      External Resources
                    </span>
                  )}
                  {bookmarkedTrainingResources.length > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      Training
                    </span>
                  )}
                </div>
                {/* Coach Tools - Teal/Green */}
                {pinnedTools.map((tool) => {
                  const IconComponent = tool.icon
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setOpenToolId(tool.id)}
                      className="w-full flex items-center gap-2 p-2.5 rounded-lg border-2 border-teal-400 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer group text-left"
                    >
                      <IconComponent className="h-4 w-4 text-teal-600 flex-shrink-0" />
                      <span className="font-medium text-sm text-optavia-dark group-hover:text-teal-700 flex-1 truncate">
                        {tool.title}
                      </span>
                      <ChevronRight className="h-3 w-3 text-optavia-gray flex-shrink-0" />
                    </button>
                  )
                })}

                {/* External Resources - Blue */}
                {pinnedResources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-blue-400 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer group"
                  >
                    <Link2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-sm text-optavia-dark group-hover:text-blue-700 flex-1 truncate">
                      {resource.title}
                    </span>
                    <ExternalLink className="h-3 w-3 text-optavia-gray flex-shrink-0" />
                  </a>
                ))}

                {/* Bookmarked Training Resources */}
                {bookmarkedTrainingResources.map((resource) => (
                  <a
                    key={`bookmark-${resource.id}`}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer group"
                  >
                    <Bookmark className="h-4 w-4 text-amber-500 fill-amber-400 flex-shrink-0" />
                    <span className="font-medium text-sm text-optavia-dark group-hover:text-amber-600 flex-1 truncate">
                      {resource.title}
                    </span>
                    <ExternalLink className="h-3 w-3 text-optavia-gray flex-shrink-0" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Pin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-optavia-gray mb-3">No quick links yet</p>
                <Link href="/resources">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[hsl(var(--optavia-green))] text-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))]"
                  >
                    <Pin className="h-3 w-3 mr-1" />
                    Browse Resources
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Popular Recipes */}
      {popularRecipes.length > 0 && (
        <Card className="mt-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-optavia-dark">
                <UtensilsCrossed className="h-5 w-5 text-orange-500" />
                Popular Recipes
              </CardTitle>
              <Link href="/recipes">
                <Button variant="ghost" size="sm" className="text-[hsl(var(--optavia-green))] hover:bg-green-50 -mr-2">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularRecipes.map((recipe) => (
                <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                  <div className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <img
                        src={recipe.image || "/recipies/placeholder.jpg"}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute top-2 left-2 bg-white/90 text-xs"
                      >
                        {recipe.category}
                      </Badge>
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-sm text-optavia-dark line-clamp-1">{recipe.title}</p>
                      <p className="text-xs text-optavia-gray mt-1">
                        {recipe.prepTime + recipe.cookTime} min · {recipe.difficulty}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tool Dialogs */}
      {COACH_TOOLS.map((tool) => {
        const ToolComponent = tool.component
        const IconComponent = tool.icon

        return (
          <Dialog key={tool.id} open={openToolId === tool.id} onOpenChange={(open) => !open && setOpenToolId(null)}>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-[95vw] md:max-w-5xl lg:max-w-6xl">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[hsl(var(--optavia-green-light))]">
                    <IconComponent className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                  </div>
                  <DialogTitle className="text-xl text-optavia-dark">{tool.title}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="mt-4">
                <ToolComponent />
              </div>
            </DialogContent>
          </Dialog>
        )
      })}

      {/* Milestone Action Modal */}
      {milestoneClient && (
        <MilestoneActionModal
          open={showMilestoneModal}
          onOpenChange={setShowMilestoneModal}
          clientId={milestoneClient.id}
          clientLabel={milestoneClient.label}
          programDay={getProgramDay(milestoneClient.start_date)}
          onMarkCelebrated={async () => {
            // Mark this milestone day as celebrated in the database
            const day = getProgramDay(milestoneClient.start_date)
            try {
              const { error } = await supabase
                .from("clients")
                .update({ last_celebrated_day: day })
                .eq("id", milestoneClient.id)
              
              if (!error) {
                setShowMilestoneModal(false)
                setMilestoneClient(null)
                // Refresh clients list to update the UI
                window.location.reload()
              }
            } catch (err) {
              console.error("Error marking milestone as celebrated:", err)
            }
          }}
          onTextSent={async () => {
            // Also mark as celebrated when text is sent
            const day = getProgramDay(milestoneClient.start_date)
            try {
              await supabase
                .from("clients")
                .update({ last_celebrated_day: day })
                .eq("id", milestoneClient.id)
              
              setShowMilestoneModal(false)
              setMilestoneClient(null)
            } catch (err) {
              console.error("Error marking milestone as celebrated:", err)
            }
          }}
        />
      )}

      {/* Rank Promotion Celebration Modal */}
      {promotedRank && (() => {
        const rankInfo = RANK_REQUIREMENTS[promotedRank as RankType]
        const rankIcon = rankInfo?.icon || '🏆'
        const rankName = promotedRank
        
        return (
          <Dialog open={showRankPromotionModal} onOpenChange={setShowRankPromotionModal}>
            <DialogContent className="max-w-md text-center">
              <div className="py-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  🎉 RANK PROMOTION! 🎉
                </h2>
                <div className="mb-4">
                  <div className="text-6xl mb-2">
                    {rankIcon}
                  </div>
                  <div className="text-3xl font-bold text-amber-700 mb-1">
                    {rankName}
                  </div>
                  <p className="text-lg text-gray-600 mt-2">
                    You've achieved all the requirements!
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-5 mb-4">
                  <div className="flex items-center justify-center gap-2 text-amber-700 mb-3">
                    <Star className="h-6 w-6 fill-current" />
                    <span className="font-bold text-lg">Incredible Achievement!</span>
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {rankName === "Senior Coach" && "Your first promotion! You're building momentum and making a real impact. Keep going! 🌟"}
                    {rankName === "Executive Director" && "Executive Director! You're leading by example and building a strong team. Amazing work! 💫"}
                    {rankName === "FIBC" && "FIBC! You've built a solid foundation with qualifying legs. You're a true leader! 🏆"}
                    {rankName === "Global Director" && "Global Director! Your influence is expanding. You're changing lives at scale! 🌍"}
                    {rankName === "Presidential Director" && "Presidential Director! The pinnacle of leadership. You've built an incredible legacy! 👑"}
                    {rankName === "IPD" && "IPD! The highest achievement. You've reached the absolute top! 💎"}
                    {!["Senior Coach", "Executive Director", "FIBC", "Global Director", "Presidential Director", "IPD"].includes(rankName) && 
                      `Congratulations on reaching ${rankName}! Your dedication and hard work have paid off. Keep inspiring others! 🎊`
                    }
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-700 font-medium">
                    💚 Remember: Rank is great, but the lives you've changed are what truly matter.
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => {
                  setShowRankPromotionModal(false)
                  setPromotedRank(null)
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg py-6 shadow-lg"
              >
                Continue the Journey! 🚀
              </Button>
            </DialogContent>
          </Dialog>
        )
      })()}
    </div>
  )
}
