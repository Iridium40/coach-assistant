"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ChevronRight, Sparkles, Award } from "lucide-react"
import { badgeConfig } from "@/lib/badge-config"

// Icon mapping for badge categories
const badgeIcons: Record<string, React.ReactNode> = {
  "Getting Started": <Award className="h-3 w-3" />,
  "Business Building": <Award className="h-3 w-3" />,
  "Client Support": <Award className="h-3 w-3" />,
  "Training": <Award className="h-3 w-3" />,
}

// Color mapping for badge categories
const badgeColors: Record<string, string> = {
  "Getting Started": "bg-blue-500",
  "Business Building": "bg-purple-500",
  "Client Support": "bg-green-500",
  "Training": "bg-orange-500",
}

interface TrainingProgress {
  total: number
  completed: number
  percentage: number
}

interface Badge {
  category?: string
  badgeType: string
  earnedAt: string
}

interface TrainingProgressCardProps {
  progress: TrainingProgress
  badges: Badge[]
  uniqueCategories: string[]
}

export function TrainingProgressCard({ progress, badges, uniqueCategories }: TrainingProgressCardProps) {
  // Get recent badges (last 3)
  const recentBadges = [...badges]
    .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
    .slice(0, 3)

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-optavia-dark">
            <BookOpen className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
            Training Progress
          </CardTitle>
          <Link href="/training">
            <Button variant="ghost" size="sm" className="text-[hsl(var(--optavia-green))] hover:bg-green-50 -mr-2">
              Continue <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-optavia-gray">Overall Progress</span>
            <span className="font-semibold text-[hsl(var(--optavia-green))]">{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
          <p className="text-xs text-optavia-gray mt-1">
            {progress.completed} of {progress.total} resources completed
          </p>
        </div>

        {/* Recent Badges */}
        {recentBadges.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-optavia-gray uppercase tracking-wide mb-2">
              Recent Badges
            </p>
            <div className="flex flex-wrap gap-2">
              {recentBadges.map((badge, idx) => {
                const category = badge.category || badge.badgeType
                const config = badgeConfig[category]
                const icon = badgeIcons[category] || <Award className="h-3 w-3" />
                const bgColor = badgeColors[category] || "bg-gray-500"

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 border border-gray-200"
                  >
                    <div className={`${bgColor} text-white p-1 rounded-full`}>
                      {icon}
                    </div>
                    <span className="text-xs font-medium text-optavia-dark">
                      {config?.name || badge.badgeType}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Continue Training or Complete */}
        {progress.percentage < 100 && progress.total > 0 && (
          <Link href="/training">
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
              <p className="text-xs text-green-600 font-medium mb-1">
                {uniqueCategories.length} categories to explore
              </p>
              <p className="font-medium text-sm text-optavia-dark flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Continue Training
              </p>
            </div>
          </Link>
        )}

        {progress.percentage === 100 && progress.total > 0 && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
            <Sparkles className="h-6 w-6 mx-auto mb-1 text-amber-500" />
            <p className="text-sm font-medium text-amber-700">All Training Complete!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
