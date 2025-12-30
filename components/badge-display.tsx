"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Rocket, Building2, Users, GraduationCap } from "lucide-react"
import { badgeConfig } from "@/lib/badge-config"

export interface AchievementBadge {
  id: string
  category: string
  badgeType: string
  earnedAt: string
}

interface BadgeDisplayProps {
  badges: AchievementBadge[]
}

// Icon mapping for badge categories
const badgeIcons: Record<string, React.ReactNode> = {
  "Getting Started": <Rocket className="h-6 w-6" />,
  "Business Building": <Building2 className="h-6 w-6" />,
  "Client Support": <Users className="h-6 w-6" />,
  "Training": <GraduationCap className="h-6 w-6" />,
}

// Color mapping for badge categories (Tailwind classes)
const badgeColors: Record<string, string> = {
  "Getting Started": "bg-blue-500",
  "Business Building": "bg-purple-500",
  "Client Support": "bg-green-500",
  "Training": "bg-orange-500",
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  if (badges.length === 0) {
    return (
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-optavia-dark flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription className="text-optavia-gray">
            Complete all resources in a category to earn achievement badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-optavia-gray py-8">
            No badges earned yet. Keep learning to unlock achievements!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-optavia-dark flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Achievements
        </CardTitle>
        <CardDescription className="text-optavia-gray">
          {badges.length} {badges.length === 1 ? "badge" : "badges"} earned
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => {
            const config = badgeConfig[badge.category]
            if (!config) return null

            const icon = badgeIcons[badge.category] || <Trophy className="h-6 w-6" />
            const color = badgeColors[badge.category] || "bg-gray-500"

            return (
              <div
                key={badge.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`${color} text-white p-3 rounded-lg flex-shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-optavia-dark text-sm sm:text-base">
                    {config.name}
                  </h3>
                  <p className="text-xs text-optavia-gray mt-1">{config.description}</p>
                  <p className="text-xs text-optavia-gray mt-2">
                    Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

