"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Plus, Minus, Calculator, TrendingUp, Users, Star, Sparkles } from "lucide-react"
import {
  RANK_ORDER,
  RANK_REQUIREMENTS,
  RANK_COLORS,
  type RankType,
} from "@/hooks/use-rank-calculator"

interface SimulatedCoach {
  id: string
  rank: RankType
}

interface RankSimulatorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentClients: number
  currentCoaches: SimulatedCoach[]
}

export function RankSimulator({
  open,
  onOpenChange,
  currentClients,
  currentCoaches,
}: RankSimulatorProps) {
  const [simClients, setSimClients] = useState(currentClients)
  const [simCoaches, setSimCoaches] = useState<SimulatedCoach[]>(currentCoaches)

  // Calculate current stats
  const scTeamsCount = simCoaches.filter(c => 
    RANK_ORDER.indexOf(c.rank) >= RANK_ORDER.indexOf('Senior Coach')
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
        scTeamsCount >= reqs.scTeams
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
    setSimClients(currentClients)
    setSimCoaches(currentCoaches)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-purple-500" />
            Rank Simulator
          </DialogTitle>
          <DialogDescription>
            Play with different scenarios to see how adding clients and coaches impacts your rank
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Projected Rank */}
          <Card className={`${projectedRankColors.bg} border-2 ${projectedRankColors.accent.replace('bg-', 'border-')}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${projectedRankColors.accent} rounded-full flex items-center justify-center text-white text-2xl`}>
                  {projectedRankInfo.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Projected Rank</p>
                  <h3 className={`text-xl font-bold ${projectedRankColors.text}`}>
                    {projectedRank}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {totalQP} Qualifying Points ({clientQP} from clients + {scTeamQP} from SC teams)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Controls */}
          <div className="grid grid-cols-1 gap-4">
            {/* Active Clients Slider */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      Active Clients
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSimClients(Math.max(0, simClients - 1))}
                        className="h-7 w-7 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-lg font-bold text-green-600 w-12 text-center">
                        {simClients}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSimClients(simClients + 1)}
                        className="h-7 w-7 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Slider
                    value={[simClients]}
                    onValueChange={(value) => setSimClients(value[0])}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    ~{clientQP} Qualifying Points from clients (~3-4 clients = 1 QP)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Frontline Coaches */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-500" />
                      Frontline Coaches
                    </Label>
                    <Badge variant="secondary" className="text-sm">
                      {simCoaches.length} total ({scTeamsCount} SC+)
                    </Badge>
                  </div>

                  {/* Add Coach Controls */}
                  <div className="flex gap-2">
                    <Select onValueChange={(value) => addCoach(value as RankType)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Add a coach..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Coach">Coach</SelectItem>
                        <SelectItem value="Senior Coach">Senior Coach</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Associate Director">Associate Director</SelectItem>
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Executive Director">Executive Director</SelectItem>
                        <SelectItem value="FIBC">FIBC</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={removeCoach}
                      disabled={simCoaches.length === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Coach List */}
                  {simCoaches.length > 0 && (
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {simCoaches.map((coach, idx) => {
                        const isSC = RANK_ORDER.indexOf(coach.rank) >= RANK_ORDER.indexOf('Senior Coach')
                        return (
                          <div
                            key={coach.id}
                            className={`flex items-center justify-between p-2 rounded text-sm ${
                              isSC ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            <span className="text-gray-600">Coach {idx + 1}</span>
                            <Badge variant={isSC ? "default" : "secondary"} className="text-xs">
                              {coach.rank}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    {scTeamQP} Qualifying Points from SC+ teams
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

                {gaps.clients === 0 && gaps.coaches === 0 && gaps.scTeams === 0 && (
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

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={resetSimulation}
              className="flex-1"
            >
              Reset to Current
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
