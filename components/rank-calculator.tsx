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

  // Calculate current stats
  const scTeamsCount = simCoaches.filter(c => 
    RANK_ORDER.indexOf(c.rank) >= RANK_ORDER.indexOf('Senior Coach')
  ).length

  // Calculate ED teams (Executive Director or higher)
  const edTeamsCount = simCoaches.filter(c => 
    RANK_ORDER.indexOf(c.rank) >= RANK_ORDER.indexOf('Executive Director')
  ).length

  // Calculate GD teams (Global Director or higher)
  const gdTeamsCount = simCoaches.filter(c => 
    RANK_ORDER.indexOf(c.rank) >= RANK_ORDER.indexOf('Global Director')
  ).length

  // Calculate qualifying points
  const clientQP = Math.floor(simClients / 3.5) // ~3-4 clients per QP
  const scTeamQP = scTeamsCount
  const totalQP = clientQP + scTeamQP

  // Determine rank based on simulated stats
  const calculateRank = (): RankType => {
    // Start from highest rank and work down
    for (let i = RANK_ORDER.length - 1; i >= 0; i--) {
      const rank = RANK_ORDER[i]
      const reqs = RANK_REQUIREMENTS[rank]
      
      if (
        simClients >= reqs.minClients &&
        simCoaches.length >= reqs.frontlineCoaches &&
        scTeamsCount >= reqs.scTeams &&
        edTeamsCount >= reqs.edTeams &&
        gdTeamsCount >= reqs.gdTeams
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
    clients: Math.max(0, nextRankReqs.minClients - simClients),
    coaches: Math.max(0, nextRankReqs.frontlineCoaches - simCoaches.length),
    scTeams: Math.max(0, nextRankReqs.scTeams - scTeamsCount),
    edTeams: Math.max(0, nextRankReqs.edTeams - edTeamsCount),
    gdTeams: Math.max(0, nextRankReqs.gdTeams - gdTeamsCount),
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
                {totalQP} Qualifying Points ({clientQP} from clients + {scTeamQP} from SC teams)
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
                    disabled={simClients >= 30}
                    className="h-8 w-8 p-0 border-green-300 hover:bg-green-100"
                  >
                    <Plus className="h-4 w-4 text-green-700" />
                  </Button>
                </div>
              </div>

              {/* Client Icons Grid */}
              <div className="bg-white p-3 rounded-lg border border-green-200 min-h-[100px]">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: simClients }).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors"
                      title={`Client ${idx + 1}`}
                    >
                      <User className="h-5 w-5" />
                    </div>
                  ))}
                  {simClients === 0 && (
                    <div className="w-full text-center py-6 text-gray-400 text-sm">
                      Click + to add clients
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Qualifying Points:</span>
                <span className="font-bold text-green-700">
                  ~{clientQP} QP from clients
                </span>
              </div>

              <p className="text-xs text-gray-600 bg-white p-2 rounded border border-green-200">
                💡 <span className="font-medium">Tip:</span> ~3-4 clients = 1 Qualifying Point
              </p>
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
                  {simCoaches.length} total ({scTeamsCount} SC+{edTeamsCount > 0 ? `, ${edTeamsCount} ED+` : ''}{gdTeamsCount > 0 ? `, ${gdTeamsCount} GD+` : ''})
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
                    <SelectItem value="FIBC">FIBC</SelectItem>
                    <SelectItem value="Regional Director">Regional Director</SelectItem>
                    <SelectItem value="National Director">National Director</SelectItem>
                    <SelectItem value="Global Director">Global Director</SelectItem>
                    <SelectItem value="Presidential Director">Presidential Director</SelectItem>
                    <SelectItem value="IPD">IPD</SelectItem>
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
                    const isSC = RANK_ORDER.indexOf(coach.rank) >= RANK_ORDER.indexOf('Senior Coach')
                    const isED = RANK_ORDER.indexOf(coach.rank) >= RANK_ORDER.indexOf('Executive Director')
                    const isGD = RANK_ORDER.indexOf(coach.rank) >= RANK_ORDER.indexOf('Global Director')
                    
                    // Determine background color based on rank tier
                    let bgClass = 'bg-gray-50 border border-gray-200'
                    if (isGD) {
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
                            className={`text-xs ${isGD ? 'bg-orange-500' : isED ? 'bg-purple-500' : ''}`}
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
                <span className="text-gray-600">Qualifying Points:</span>
                <span className="font-bold text-purple-700">
                  {scTeamQP} QP from SC+ teams
                </span>
              </div>

              <p className="text-xs text-gray-600 bg-white p-2 rounded border border-purple-200">
                💡 <span className="font-medium">Tip:</span> 1 SC Team = 1 Qualifying Point
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

            {/* Basic requirements (Clients, Coaches, SC Teams) */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-2 bg-white rounded">
                <div className={`text-lg font-bold ${gaps.clients > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {gaps.clients > 0 ? `+${gaps.clients}` : '✓'}
                </div>
                <div className="text-[10px] text-gray-500">Clients</div>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <div className={`text-lg font-bold ${gaps.coaches > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {gaps.coaches > 0 ? `+${gaps.coaches}` : '✓'}
                </div>
                <div className="text-[10px] text-gray-500">Coaches</div>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <div className={`text-lg font-bold ${gaps.scTeams > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                  {gaps.scTeams > 0 ? `+${gaps.scTeams}` : '✓'}
                </div>
                <div className="text-[10px] text-gray-500">SC Teams</div>
              </div>
            </div>

            {/* ED/GD Team requirements (for higher ranks) */}
            {(nextRankReqs.edTeams > 0 || nextRankReqs.gdTeams > 0) && (
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
                {nextRankReqs.gdTeams > 0 && (
                  <div className="text-center p-2 bg-white rounded border border-orange-200">
                    <div className={`text-lg font-bold ${gaps.gdTeams > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      {gaps.gdTeams > 0 ? `+${gaps.gdTeams}` : '✓'}
                    </div>
                    <div className="text-[10px] text-gray-500">GD Teams</div>
                    <div className="text-[9px] text-gray-400">({gdTeamsCount}/{nextRankReqs.gdTeams})</div>
                  </div>
                )}
              </div>
            )}

            {gaps.clients === 0 && gaps.coaches === 0 && gaps.scTeams === 0 && gaps.edTeams === 0 && gaps.gdTeams === 0 && (
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
