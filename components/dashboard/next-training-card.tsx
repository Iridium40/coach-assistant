"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, ChevronRight, CheckCircle, BookOpen, ExternalLink } from "lucide-react"
import { useTrainingResources, meetsRankRequirement, COACH_RANKS, type TrainingResource, type TrainingCategory } from "@/hooks/use-training-resources"
import type { User } from "@supabase/supabase-js"

interface NextTrainingCardProps {
  user: User | null
  userRank: string | null
  isNewCoach?: boolean
}

interface NextTrainingRecommendation {
  category: TrainingCategory
  nextResource: TrainingResource
  categoryProgress: {
    completed: number
    total: number
    percentage: number
  }
  overallProgress: {
    completed: number
    total: number
    percentage: number
  }
}

export function NextTrainingCard({ user, userRank, isNewCoach }: NextTrainingCardProps) {
  const {
    resources,
    categories,
    uniqueCategories,
    isCompleted,
    progress,
    getCategoryProgress,
  } = useTrainingResources(user, userRank)

  // Find the next recommended training
  const recommendation = useMemo((): NextTrainingRecommendation | null => {
    if (!categories.length || !resources.length) return null

    // Get accessible categories sorted by sort_order
    const accessibleCategories = categories
      .filter(cat => cat.is_active && meetsRankRequirement(userRank, cat.required_rank))
      .sort((a, b) => a.sort_order - b.sort_order)

    // Find the first category with uncompleted resources
    for (const category of accessibleCategories) {
      const categoryResources = resources
        .filter(r => r.category === category.name)
        .sort((a, b) => a.sort_order - b.sort_order)

      // Find first uncompleted resource in this category
      const nextResource = categoryResources.find(r => !isCompleted(r.id))

      if (nextResource) {
        const catProgress = getCategoryProgress(category.name)
        return {
          category,
          nextResource,
          categoryProgress: catProgress,
          overallProgress: progress,
        }
      }
    }

    // All training complete
    return null
  }, [categories, resources, userRank, isCompleted, getCategoryProgress, progress])

  // All training complete state
  if (!recommendation && progress.total > 0 && progress.completed >= progress.total) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[hsl(var(--optavia-green))] shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2 text-optavia-dark">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
            {isNewCoach ? "New Coach Training Path" : "Your Training Progress"}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-3 p-4 bg-green-100 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">All Training Complete! 🎉</p>
              <p className="text-sm text-green-700">
                You've completed all {progress.total} available modules for your rank.
              </p>
            </div>
          </div>
          <Link href="/training" className="block mt-4">
            <Button variant="outline" className="w-full">
              Review Training
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  // No recommendation (no resources yet or still loading)
  if (!recommendation) {
    return null
  }

  const { category, nextResource, categoryProgress, overallProgress } = recommendation

  // Get rank label for display
  const getRankLabel = (rank: string | null) => {
    if (!rank) return null
    const found = COACH_RANKS.find(r => r.value === rank)
    return found ? found.label : rank
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[hsl(var(--optavia-green))] shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2 text-optavia-dark">
            <GraduationCap className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
            {isNewCoach ? "New Coach Training Path" : "Continue Your Training"}
          </CardTitle>
          <Badge variant="secondary" className="bg-white">
            {overallProgress.completed}/{overallProgress.total} complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Overall Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-bold text-[hsl(var(--optavia-green))]">
              {overallProgress.percentage}%
            </span>
          </div>
          <Progress value={overallProgress.percentage} className="h-2" />
        </div>

        {/* Current Category */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h4 className="font-semibold text-optavia-dark">{category.name}</h4>
                {category.required_rank && (
                  <Badge variant="outline" className="text-xs text-purple-600 border-purple-300 mt-1">
                    {getRankLabel(category.required_rank)}+ Level
                  </Badge>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {categoryProgress.completed}/{categoryProgress.total}
            </span>
          </div>
          <Progress value={categoryProgress.percentage} className="h-1.5 mb-3" />
          
          {/* Next Module */}
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex-shrink-0">
              <BookOpen className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Up Next</p>
              <p className="font-medium text-optavia-dark truncate">{nextResource.title}</p>
              <Badge variant="outline" className="text-[10px] mt-1 capitalize">
                {nextResource.type}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link href="/training">
          <Button
            className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
            size="lg"
          >
            Continue Training
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
