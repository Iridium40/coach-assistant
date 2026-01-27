"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, ChevronRight, Trophy, Users, Star, Award } from "lucide-react"
import { RANK_REQUIREMENTS, type RankType } from "@/hooks/use-rank-calculator"

interface RankProgressCardProps {
  currentRank: string
  nextRank: string | null
  activeClients: number
  frontlineCoaches: number
  qualifyingLegs: number // SC+ teams
  edTeams?: number
  fibcTeams?: number
  gaps: {
    points: number
    scTeams: number
    edTeams: number
    fibcTeams: number
  } | null
}

export function RankProgressCard({
  currentRank,
  nextRank,
  activeClients,
  frontlineCoaches,
  qualifyingLegs,
  edTeams = 0,
  fibcTeams = 0,
  gaps,
}: RankProgressCardProps) {
  const currentReqs = RANK_REQUIREMENTS[currentRank as RankType]
  const nextReqs = nextRank ? RANK_REQUIREMENTS[nextRank as RankType] : null

  // Calculate points: ~4 clients = 1 point, 1 SC team = 1 point
  const clientPoints = Math.floor(activeClients / 4)
  const totalPoints = clientPoints + qualifyingLegs

  // Calculate progress percentage toward next rank
  let progressPercent = 100
  if (nextReqs && gaps) {
    const totalGaps = gaps.points + gaps.scTeams + gaps.edTeams + gaps.fibcTeams
    const totalReqs = nextReqs.minPoints + nextReqs.scTeams + nextReqs.edTeams + nextReqs.fibcTeams
    if (totalReqs > 0) {
      progressPercent = Math.round(((totalReqs - totalGaps) / totalReqs) * 100)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-optavia-dark">
            <TrendingUp className="h-5 w-5 text-amber-600" />
            Business Growth
          </CardTitle>
          <Link href="/my-business">
            <Button variant="ghost" size="sm" className="text-amber-700 hover:bg-amber-100 -mr-2">
              View Details <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Current Rank */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
              <span className="text-2xl">{currentReqs?.icon || '🏆'}</span>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Rank</div>
              <div className="text-xl font-bold text-amber-800">{currentRank}</div>
              <div className="text-xs text-gray-500">{totalPoints} points</div>
            </div>
          </div>

          {/* Progress to Next Rank */}
          {nextRank && nextReqs ? (
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Next:</span>
                  <Badge className="bg-amber-600 text-white">
                    {nextReqs.icon} {nextRank}
                  </Badge>
                </div>
                <span className="text-sm font-semibold text-amber-700">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2 mb-3" />

              {/* Requirements */}
              <div className="space-y-1">
                {/* Points requirement */}
                {gaps && gaps.points > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">
                      Need <strong className="text-amber-700">{gaps.points}</strong> more point{gaps.points > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-gray-400">({totalPoints}/{nextReqs.minPoints})</span>
                  </div>
                )}
                
                {/* SC Teams requirement (for FIBC track) */}
                {gaps && gaps.scTeams > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-purple-500" />
                    <span className="text-gray-700">
                      Need <strong className="text-amber-700">{gaps.scTeams}</strong> SC+ team{gaps.scTeams > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-gray-400">({qualifyingLegs}/{nextReqs.scTeams})</span>
                  </div>
                )}
                
                {/* ED Teams requirement (for higher ranks) */}
                {gaps && gaps.edTeams > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-700">
                      Need <strong className="text-amber-700">{gaps.edTeams}</strong> ED+ team{gaps.edTeams > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-gray-400">({edTeams}/{nextReqs.edTeams})</span>
                  </div>
                )}
                
                {/* FIBC Teams requirement (for FIBL/IPD) */}
                {gaps && gaps.fibcTeams > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-700">
                      Need <strong className="text-amber-700">{gaps.fibcTeams}</strong> FIBC+ team{gaps.fibcTeams > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-gray-400">({fibcTeams}/{nextReqs.fibcTeams})</span>
                  </div>
                )}
                
                {/* Ready for promotion */}
                {gaps && gaps.points === 0 && gaps.scTeams === 0 && gaps.edTeams === 0 && gaps.fibcTeams === 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                    <Trophy className="h-4 w-4" />
                    Ready for promotion!
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-amber-500" />
                <p className="text-sm font-medium text-amber-700">You've reached the top rank!</p>
                <p className="text-xs text-gray-500">Congratulations on your achievement! 🎉</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
