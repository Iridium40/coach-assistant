"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUserData } from "@/contexts/user-data-context"
import { useClients } from "@/hooks/use-clients"
import {
  useRankCalculator,
  RANK_ORDER,
  RANK_REQUIREMENTS,
  RANK_COLORS,
  type RankType,
} from "@/hooks/use-rank-calculator"
import {
  Users,
  Star,
  TrendingUp,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  ExternalLink,
  User,
  X,
} from "lucide-react"

interface SimulatedCoach {
  id: string
  rank: RankType
}

export function RankCalculator() {
  const { user } = useUserData()
  const { stats: clientStats } = useClients()
  
  const {
    rankData,
    frontlineCoaches,
    qualifyingLegsCount,
    loading,
    updateRankData,
  } = useRankCalculator(user)

  const [showRankSelector, setShowRankSelector] = useState(false)
  const [selectedCoachRank, setSelectedCoachRank] = useState<RankType>("Senior Coach")
  
  // Current data
  const currentRank = (rankData?.current_rank || "Coach") as RankType
  const activeClients = clientStats.active
  
  // Simulation state
  const [simClients, setSimClients] = useState(activeClients)
  const [simCoaches, setSimCoaches] = useState<SimulatedCoach[]>(
    frontlineCoaches.map(c => ({
      id: c.id,
      rank: c.coach_rank as RankType
    }))
  )

  // Update simulation when actual data changes
  useMemo(() => {
    setSimClients(activeClients)
    setSimCoaches(frontlineCoaches.map(c => ({
      id: c.id,
      rank: c.coach_rank as RankType
    })))
  }, [activeClients, frontlineCoaches])

  // Ranks that qualify as FIBC+ (FIBC or higher integrated ranks)
  const FIBC_PLUS_RANKS = ['FIBC', 'Integrated Regional Director', 'Integrated National Director', 'FIBL', 'IPD']
  
  // Ranks that qualify as ED+ (Executive Director or higher - includes all integrated ranks)
  const ED_PLUS_RANKS = [
    'Executive Director', 'FIBC', 
    'Regional Director', 'Integrated Regional Director',
    'National Director', 'Integrated National Director', 
    'Global Director', 'FIBL',
    'Presidential Director', 'IPD'
  ]
  
  // Ranks that qualify as SC+ (Senior Coach or higher)
  const SC_PLUS_RANKS = [
    'Senior Coach', 'Manager', 'Associate Director', 'Director',
    'Executive Director', 'FIBC',
    'Regional Director', 'Integrated Regional Director',
    'National Director', 'Integrated National Director',
    'Global Director', 'FIBL',
    'Presidential Director', 'IPD'
  ]

  // Calculate current stats using explicit rank lists
  const scTeamsCount = simCoaches.filter(c => SC_PLUS_RANKS.includes(c.rank)).length
  const edTeamsCount = simCoaches.filter(c => ED_PLUS_RANKS.includes(c.rank)).length
  const fibcTeamsCount = simCoaches.filter(c => FIBC_PLUS_RANKS.includes(c.rank)).length

  // Calculate qualifying points
  // Assumption: Each client is qualified (~$300-400 volume each)
  // 5 clients = 1 Qualifying Point (simplified for visual clarity)
  const clientPoints = Math.floor(simClients / 5)
  
  // Each SC+ team counts as 1 Qualifying Point
  const scTeamPoints = scTeamsCount
  const totalPoints = clientPoints + scTeamPoints

  // Check if user qualifies as FIBC (integrated track)
  // Requires: ED qualification (5 points) + 5 SC teams
  const isFIBCQualified = scTeamsCount >= 5 && totalPoints >= 5

  // Determine rank based on simulated stats
  const calculateRank = (): RankType => {
    // Start from highest rank and work down
    for (let i = RANK_ORDER.length - 1; i >= 0; i--) {
      const rank = RANK_ORDER[i]
      const reqs = RANK_REQUIREMENTS[rank]
      
      // Skip integrated ranks if not FIBC qualified
      if (reqs.requiresFIBC && !isFIBCQualified) {
        continue
      }
      
      // Check all requirements
      if (
        totalPoints >= reqs.minPoints &&
        scTeamsCount >= reqs.scTeams &&
        edTeamsCount >= reqs.edTeams &&
        fibcTeamsCount >= reqs.fibcTeams
      ) {
        return rank
      }
    }
    return 'Coach'
  }

  const projectedRank = calculateRank()
  const projectedRankIndex = RANK_ORDER.indexOf(projectedRank)
  const projectedRankInfo = RANK_REQUIREMENTS[projectedRank]
  const projectedRankColors = RANK_COLORS[projectedRank]

  // Get next rank
  const nextRank = projectedRankIndex < RANK_ORDER.length - 1
    ? RANK_ORDER[projectedRankIndex + 1]
    : null
  const nextRankReqs = nextRank ? RANK_REQUIREMENTS[nextRank] : null

  // Calculate gaps to next rank
  const gaps = nextRankReqs ? {
    points: Math.max(0, nextRankReqs.minPoints - totalPoints),
    scTeams: Math.max(0, nextRankReqs.scTeams - scTeamsCount),
    edTeams: Math.max(0, nextRankReqs.edTeams - edTeamsCount),
    fibcTeams: Math.max(0, nextRankReqs.fibcTeams - fibcTeamsCount),
  } : null

  // Add a coach
  const addCoach = (rank: RankType) => {
    setSimCoaches([...simCoaches, { id: Date.now().toString(), rank }])
  }

  // Remove last coach
  const removeCoach = () => {
    if (simCoaches.length > 0) {
      setSimCoaches(simCoaches.slice(0, -1))
    }
  }

  // Reset to current
  const resetSimulation = () => {
    setSimClients(activeClients)
    setSimCoaches(frontlineCoaches.map(c => ({
      id: c.id,
      rank: c.coach_rank as RankType
    })))
  }

  const handleRankChange = async (newRank: RankType) => {
    await updateRankData({
      current_rank: newRank,
      rank_achieved_date: new Date().toISOString().split("T")[0]
    })
    setShowRankSelector(false)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--optavia-green))]"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Rank Calculator</h2>
          <p className="text-sm text-gray-500">Simulate different scenarios</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={resetSimulation}
          className="flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      </div>

      {/* Current Rank Display */}
      <Card className={`${projectedRankColors.bg} border-2 ${projectedRankColors.accent.replace('bg-', 'border-')}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRankSelector(true)}
              className={`w-12 h-12 ${projectedRankColors.accent} rounded-full flex items-center justify-center hover:opacity-90 transition-opacity text-white`}
              title="Set your current rank"
            >
              <span className="text-2xl">{projectedRankInfo.icon}</span>
            </button>
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                {projectedRank === currentRank ? 'Current Rank' : 'Projected Rank'}
              </p>
              <h3 className={`text-xl font-bold ${projectedRankColors.text}`}>
                {projectedRank}
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {totalPoints} Qualifying Points ({clientPoints} from clients + {scTeamPoints} from SC teams)
              </p>
            </div>
            {projectedRank !== currentRank && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Simulated
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Simulation Controls */}
      <div className="grid grid-cols-1 gap-4">
        {/* Active Clients */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-semibold text-gray-700">
                  <Users className="h-5 w-5 text-green-600" />
                  Active Clients
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSimClients(Math.max(0, simClients - 1))}
                    disabled={simClients === 0}
                    className="h-8 w-8 p-0 border-green-300 hover:bg-green-100"
                  >
                    <Minus className="h-4 w-4 text-green-700" />
                  </Button>
                  <span className="text-2xl font-bold text-green-700 w-16 text-center bg-white px-3 py-1 rounded-lg border-2 border-green-300">
                    {simClients}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSimClients(simClients + 1)}
                    disabled={simClients >= 50}
                    className="h-8 w-8 p-0 border-green-300 hover:bg-green-100"
                  >
                    <Plus className="h-4 w-4 text-green-700" />
                  </Button>
                </div>
              </div>

              {/* Points Legend */}
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <div className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <span>5 clients = 1 point</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-green-600 font-bold">{clientPoints} point{clientPoints !== 1 ? 's' : ''} from {simClients} client{simClients !== 1 ? 's' : ''}</span>
                </div>
                
                {/* Visual Points Groups */}
                <div className="space-y-2">
                  {/* Completed Points (groups of 5) */}
                  {clientPoints > 0 && (
                    <div className="space-y-2">
                      {Array.from({ length: clientPoints }).map((_, pointIdx) => (
                        <div key={pointIdx} className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, clientIdx) => (
                              <div
                                key={clientIdx}
                                className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-600 flex items-center justify-center text-white shadow-sm"
                                title={`Client ${pointIdx * 5 + clientIdx + 1}`}
                              >
                                <User className="h-4 w-4" />
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-full border border-amber-300">
                            <span className="text-amber-700 font-bold text-sm">= 1 PT</span>
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Remaining clients (not yet a full point) */}
                  {simClients % 5 > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: simClients % 5 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-green-200 border-2 border-green-400 border-dashed flex items-center justify-center text-green-600"
                            title={`Client ${clientPoints * 5 + idx + 1}`}
                          >
                            <User className="h-4 w-4" />
                          </div>
                        ))}
                        {/* Empty slots to show what's needed for next point */}
                        {Array.from({ length: 5 - (simClients % 5) }).map((_, idx) => (
                          <div
                            key={`empty-${idx}`}
                            className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300 border-dashed flex items-center justify-center text-gray-400"
                            title={`Need ${5 - (simClients % 5)} more for next point`}
                          >
                            <User className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full border border-gray-300">
                        <span className="text-gray-500 text-xs">+{5 - (simClients % 5)} for next point</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Empty state */}
                  {simClients === 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <div
                            key={`empty-${idx}`}
                            className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300 border-dashed flex items-center justify-center text-gray-400"
                          >
                            <User className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full border border-gray-300">
                        <span className="text-gray-500 text-xs">Add 5 clients = 1 point</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Add Buttons */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500 self-center">Quick add:</span>
                {[5, 10, 15, 20, 25].map((num) => (
                  <Button
                    key={num}
                    size="sm"
                    variant="outline"
                    onClick={() => setSimClients(num)}
                    className={`h-7 px-2 text-xs ${simClients === num ? 'bg-green-100 border-green-500 text-green-700' : 'border-green-300 text-green-600 hover:bg-green-50'}`}
                  >
                    {num} ({num / 5} pt{num > 5 ? 's' : ''})
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frontline Coaches */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-semibold text-gray-700">
                  <Star className="h-5 w-5 text-purple-600" />
                  Frontline Coaches
                </Label>
                <Badge variant="secondary" className="text-sm bg-white border-2 border-purple-300 text-purple-700 font-semibold">
                  {simCoaches.length} total ({scTeamsCount} SC+{edTeamsCount > 0 ? `, ${edTeamsCount} ED+` : ''}{fibcTeamsCount > 0 ? `, ${fibcTeamsCount} FIBC+` : ''})
                </Badge>
              </div>

              {/* Add Coach Controls */}
              <div className="flex gap-2">
                <Select value={selectedCoachRank} onValueChange={(value) => setSelectedCoachRank(value as RankType)}>
                  <SelectTrigger className="flex-1 bg-white border-purple-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Coach">Coach</SelectItem>
                    <SelectItem value="Senior Coach">Senior Coach</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Associate Director">Associate Director</SelectItem>
                    <SelectItem value="Director">Director</SelectItem>
                    <SelectItem value="Executive Director">Executive Director</SelectItem>
                    <SelectItem value="FIBC">FIBC (Integrated ED)</SelectItem>
                    <SelectItem value="Regional Director">Regional Director</SelectItem>
                    <SelectItem value="Integrated Regional Director">Integrated Regional Director</SelectItem>
                    <SelectItem value="National Director">National Director</SelectItem>
                    <SelectItem value="Integrated National Director">Integrated National Director</SelectItem>
                    <SelectItem value="Global Director">Global Director</SelectItem>
                    <SelectItem value="FIBL">FIBL (Integrated GD)</SelectItem>
                    <SelectItem value="Presidential Director">Presidential Director</SelectItem>
                    <SelectItem value="IPD">IPD (Integrated PD)</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addCoach(selectedCoachRank)}
                  className="h-10 w-10 p-0 border-purple-300 hover:bg-purple-100"
                >
                  <Plus className="h-4 w-4 text-purple-700" />
                </Button>
              </div>

              {/* Coach List */}
              {simCoaches.length > 0 ? (
                <div className="space-y-1 max-h-60 overflow-y-auto bg-white p-2 rounded border border-purple-200">
                  {simCoaches.map((coach, idx) => {
                    const isSC = SC_PLUS_RANKS.includes(coach.rank)
                    const isED = ED_PLUS_RANKS.includes(coach.rank)
                    const isFIBC = FIBC_PLUS_RANKS.includes(coach.rank)
                    
                    // Determine background color based on rank tier
                    let bgClass = 'bg-gray-50 border border-gray-200'
                    if (isFIBC) {
                      bgClass = 'bg-orange-50 border border-orange-200'
                    } else if (isED) {
                      bgClass = 'bg-purple-50 border border-purple-200'
                    } else if (isSC) {
                      bgClass = 'bg-green-50 border border-green-200'
                    }
                    
                    return (
                      <div
                        key={coach.id}
                        className={`flex items-center justify-between p-2 rounded text-sm ${bgClass}`}
                      >
                        <span className="text-gray-600 font-medium">Coach {idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={isSC ? "default" : "secondary"} 
                            className={`text-xs ${isFIBC ? 'bg-orange-500' : isED ? 'bg-purple-500' : ''}`}
                          >
                            {coach.rank}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const newCoaches = simCoaches.filter((_, i) => i !== idx)
                              setSimCoaches(newCoaches)
                            }}
                            className="h-6 w-6 p-0 hover:bg-red-100"
                          >
                            <X className="h-3 w-3 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white p-6 rounded border border-purple-200 text-center text-gray-400 text-sm">
                  Select a rank and click + to add coaches
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Points:</span>
                <span className="font-bold text-purple-700">
                  {totalPoints} ({clientPoints} from clients + {scTeamPoints} from SC teams)
                </span>
              </div>

              <p className="text-xs text-gray-600 bg-white p-2 rounded border border-purple-200">
                💡 <span className="font-medium">Tip:</span> 1 Point = 5 clients OR 1 SC+ Team (assumes all are qualified)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Rank Requirements */}
      {nextRank && nextRankReqs && gaps && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <h4 className="font-semibold text-gray-700">
                To reach {nextRank}:
              </h4>
            </div>

            {/* Points requirement */}
            {nextRankReqs.minPoints > 0 && (
              <div className="mb-3 p-3 bg-white rounded border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points Needed:</span>
                  <span className={`text-lg font-bold ${gaps.points > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {gaps.points > 0 ? `+${gaps.points} more` : '✓ Met'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {totalPoints}/{nextRankReqs.minPoints} points (5 clients or 1 SC+ team = 1 point)
                </div>
              </div>
            )}

            {/* SC Team requirements (for FIBC track) */}
            {nextRankReqs.scTeams > 0 && (
              <div className="mb-3">
                <div className="text-center p-2 bg-white rounded border border-green-200">
                  <div className={`text-lg font-bold ${gaps.scTeams > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {gaps.scTeams > 0 ? `+${gaps.scTeams}` : '✓'}
                  </div>
                  <div className="text-[10px] text-gray-500">SC Teams</div>
                  <div className="text-[9px] text-gray-400">({scTeamsCount}/{nextRankReqs.scTeams})</div>
                </div>
              </div>
            )}

            {/* ED/FIBC Team requirements (for higher ranks) */}
            {(nextRankReqs.edTeams > 0 || nextRankReqs.fibcTeams > 0) && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {nextRankReqs.edTeams > 0 && (
                  <div className="text-center p-2 bg-white rounded border border-purple-200">
                    <div className={`text-lg font-bold ${gaps.edTeams > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {gaps.edTeams > 0 ? `+${gaps.edTeams}` : '✓'}
                    </div>
                    <div className="text-[10px] text-gray-500">ED Teams</div>
                    <div className="text-[9px] text-gray-400">({edTeamsCount}/{nextRankReqs.edTeams})</div>
                  </div>
                )}
                {nextRankReqs.fibcTeams > 0 && (
                  <div className="text-center p-2 bg-white rounded border border-orange-200">
                    <div className={`text-lg font-bold ${gaps.fibcTeams > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {gaps.fibcTeams > 0 ? `+${gaps.fibcTeams}` : '✓'}
                    </div>
                    <div className="text-[10px] text-gray-500">FIBC Teams</div>
                    <div className="text-[9px] text-gray-400">({fibcTeamsCount}/{nextRankReqs.fibcTeams})</div>
                  </div>
                )}
              </div>
            )}

            {gaps.points === 0 && gaps.scTeams === 0 && gaps.edTeams === 0 && gaps.fibcTeams === 0 && (
              <div className="flex items-center gap-2 p-2 bg-green-100 rounded-lg border border-green-300">
                <Sparkles className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-700 font-medium">
                  You meet all requirements for {nextRank}!
                </p>
              </div>
            )}

            <p className="text-xs text-gray-600 mt-2">
              {nextRankReqs.note}
            </p>
          </CardContent>
        </Card>
      )}

      {/* No Next Rank */}
      {!nextRank && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-semibold text-gray-700">Top Rank Achieved!</p>
            <p className="text-sm text-gray-600 mt-1">
              You've reached the highest rank in OPTAVIA
            </p>
          </CardContent>
        </Card>
      )}

      {/* OPTAVIA Connect Link */}
      <a
        href="https://connect.optavia.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 text-sm"
      >
        <img src="/media/optavia_logo.svg" alt="" className="h-4 w-4" />
        Verify volume in OPTAVIA Connect
        <ExternalLink className="h-3 w-3" />
      </a>

      {/* Rank Journey */}
      <div className="flex items-center justify-between overflow-x-auto pb-2 gap-1 px-1">
        {RANK_ORDER.map((rank, idx) => {
          const isCurrentOrPast = idx <= projectedRankIndex
          const isCurrent = rank === projectedRank
          const colors = RANK_COLORS[rank]

          return (
            <div key={rank} className="flex items-center">
              <div className={`flex flex-col items-center ${isCurrent ? "scale-110" : ""}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs
                    ${isCurrentOrPast ? colors.accent + " text-white" : "bg-gray-200 text-gray-400"}`}
                >
                  {RANK_REQUIREMENTS[rank].icon}
                </div>
                <span className={`text-[9px] mt-0.5 ${isCurrent ? "font-bold" : "text-gray-400"}`}>
                  {rank.split(" ")[0]}
                </span>
              </div>
              {idx < RANK_ORDER.length - 1 && (
                <div className={`w-3 h-0.5 mx-0.5 ${idx < projectedRankIndex ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Rank Selector Modal */}
      <Dialog open={showRankSelector} onOpenChange={setShowRankSelector}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Your Current Rank</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500 mb-4">
            Choose your current rank as shown in OPTAVIA Connect.
          </p>
          <div className="space-y-2">
            {RANK_ORDER.map((rank) => {
              const info = RANK_REQUIREMENTS[rank]
              const colors = RANK_COLORS[rank]
              const isSelected = rank === currentRank

              return (
                <button
                  key={rank}
                  onClick={() => handleRankChange(rank)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? `${colors.bg} border-current ${colors.text}`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">{info.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{rank}</p>
                    <p className="text-xs text-gray-500">{info.description}</p>
                  </div>
                  {isSelected && <span className="text-green-500">✓</span>}
                </button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
