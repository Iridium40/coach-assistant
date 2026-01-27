"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

/**
 * OPTAVIA Rank Calculator - Simplified Version
 * Based on the official OPTAVIA Integrated Compensation Plan (Effective January 1, 2026)
 * 
 * Simplified Assumptions:
 * - 1 Qualifying Point (QP) = ~3-4 active clients (generates ~$1,200 FQV) OR 1 Senior Coach Team
 * - Average client order = $355 PQV / $370 PCV
 * - Senior Coach = 3+ active clients (generates 1,200+ GQV)
 * - We track what we can measure: Active Clients + Frontline Coaches
 */

// Simplified rank progression - focusing on key milestones
export const RANK_ORDER = [
  'Coach',
  'Senior Coach',
  'Manager',
  'Associate Director',
  'Director',
  'Executive Director',
  'FIBC',
  'Regional Director',
  'National Director',
  'Global Director',
  'Presidential Director',
  'IPD'
] as const

export type RankType = typeof RANK_ORDER[number]

// Get rank index (higher = more senior)
export function getRankIndex(rank: string): number {
  const index = RANK_ORDER.indexOf(rank as RankType)
  return index >= 0 ? index : 0
}

// Check if a coach qualifies as a "qualifying leg" (Senior Coach or higher)
export function isQualifyingLeg(rank: string): boolean {
  return getRankIndex(rank) >= 1 // Senior Coach or higher
}

// Simplified rank requirements based on what we can track
// Note: Higher ranks (RD+) require ED/GD teams which we track separately
export const RANK_REQUIREMENTS: Record<RankType, {
  minClients: number          // Active clients needed (~$355 PQV each)
  frontlineCoaches: number    // Total frontline coaches
  scTeams: number            // Senior Coach+ teams needed
  edTeams: number            // Executive Director+ teams needed (for RD+)
  gdTeams: number            // Global Director+ teams needed (for IPD)
  description: string
  icon: string
  note: string
}> = {
  'Coach': {
    minClients: 0,
    frontlineCoaches: 0,
    scTeams: 0,
    edTeams: 0,
    gdTeams: 0,
    description: 'Starting rank - welcome to the team!',
    icon: '🌱',
    note: ''
  },
  'Senior Coach': {
    minClients: 3,
    frontlineCoaches: 0,
    scTeams: 0,
    edTeams: 0,
    gdTeams: 0,
    description: '3+ active clients (1,200 GQV + 5 Ordering Entities)',
    icon: '⭐',
    note: 'First milestone - unlocks team building bonuses'
  },
  'Manager': {
    minClients: 7,
    frontlineCoaches: 0,
    scTeams: 0,
    edTeams: 0,
    gdTeams: 0,
    description: 'SC + 2 Points (~7 clients OR mix of clients + SC teams)',
    icon: '📊',
    note: '1 Point = ~3-4 clients ($1,200 FQV) OR 1 SC Team'
  },
  'Associate Director': {
    minClients: 10,
    frontlineCoaches: 1,
    scTeams: 0,
    edTeams: 0,
    gdTeams: 0,
    description: 'SC + 3 Points (~10 clients OR mix of clients + SC teams)',
    icon: '🎯',
    note: '1 Point = ~3-4 clients ($1,200 FQV) OR 1 SC Team'
  },
  'Director': {
    minClients: 13,
    frontlineCoaches: 2,
    scTeams: 1,
    edTeams: 0,
    gdTeams: 0,
    description: 'SC + 4 Points (~13 clients OR mix of clients + SC teams)',
    icon: '💼',
    note: '1 Point = ~3-4 clients ($1,200 FQV) OR 1 SC Team'
  },
  'Executive Director': {
    minClients: 17,
    frontlineCoaches: 3,
    scTeams: 2,
    edTeams: 0,
    gdTeams: 0,
    description: 'SC + 5 Points (~17 clients OR mix of clients + SC teams)',
    icon: '💫',
    note: 'Major milestone - unlocks Generation Bonuses'
  },
  'FIBC': {
    minClients: 17,
    frontlineCoaches: 5,
    scTeams: 5,
    edTeams: 0,
    gdTeams: 0,
    description: 'ED + 17 clients + 5 SC Teams (6,000 FQV + 15,000 GQV)',
    icon: '🏆',
    note: 'Fully Integrated Business Coach - mastery of both client support and team building'
  },
  'Regional Director': {
    minClients: 17,
    frontlineCoaches: 5,
    scTeams: 5,
    edTeams: 1,
    gdTeams: 0,
    description: 'ED + 1 ED Team',
    icon: '🗺️',
    note: 'ED Team = first qualified Executive Director in any leg'
  },
  'National Director': {
    minClients: 17,
    frontlineCoaches: 5,
    scTeams: 5,
    edTeams: 3,
    gdTeams: 0,
    description: 'ED + 3 ED Teams',
    icon: '🇺🇸',
    note: 'Unlocks National Elite Leadership Bonus (0.5%)'
  },
  'Global Director': {
    minClients: 17,
    frontlineCoaches: 5,
    scTeams: 5,
    edTeams: 5,
    gdTeams: 0,
    description: 'ED + 5 ED Teams',
    icon: '🌍',
    note: 'Unlocks Global Elite Leadership Bonus (0.5%)'
  },
  'Presidential Director': {
    minClients: 17,
    frontlineCoaches: 5,
    scTeams: 5,
    edTeams: 10,
    gdTeams: 0,
    description: 'ED + 10 ED Teams',
    icon: '👑',
    note: 'Unlocks Presidential Elite Leadership Bonus (0.5%)'
  },
  'IPD': {
    minClients: 17,
    frontlineCoaches: 5,
    scTeams: 5,
    edTeams: 10,
    gdTeams: 5,
    description: 'PD + 5 GD Teams (10 ED Teams + 5 GD Teams)',
    icon: '💎',
    note: 'Integrated Presidential Director - highest rank'
  }
}

export const RANK_COLORS: Record<RankType, { bg: string; text: string; accent: string }> = {
  'Coach': { bg: 'bg-gray-100', text: 'text-gray-600', accent: 'bg-gray-500' },
  'Senior Coach': { bg: 'bg-blue-50', text: 'text-blue-600', accent: 'bg-blue-500' },
  'Manager': { bg: 'bg-cyan-50', text: 'text-cyan-600', accent: 'bg-cyan-500' },
  'Associate Director': { bg: 'bg-teal-50', text: 'text-teal-600', accent: 'bg-teal-500' },
  'Director': { bg: 'bg-indigo-50', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  'Executive Director': { bg: 'bg-purple-50', text: 'text-purple-600', accent: 'bg-purple-500' },
  'FIBC': { bg: 'bg-green-50', text: 'text-green-600', accent: 'bg-green-600' },
  'Regional Director': { bg: 'bg-lime-50', text: 'text-lime-700', accent: 'bg-lime-600' },
  'National Director': { bg: 'bg-yellow-50', text: 'text-yellow-700', accent: 'bg-yellow-600' },
  'Global Director': { bg: 'bg-orange-50', text: 'text-orange-600', accent: 'bg-orange-500' },
  'Presidential Director': { bg: 'bg-pink-50', text: 'text-pink-600', accent: 'bg-pink-600' },
  'IPD': { bg: 'bg-red-50', text: 'text-red-600', accent: 'bg-red-600' }
}

// Conversion rate assumptions for projections
export const CONVERSION_RATES = {
  cold_to_ha: 0.15,
  warm_to_ha: 0.40,
  scheduled_to_ha: 0.80,
  ha_to_client: 0.50,
  client_to_coach: 0.30,
}

export interface FrontlineCoach {
  id: string
  full_name: string | null
  email: string | null
  coach_rank: string
  is_qualifying: boolean
}

export interface RankData {
  coach_id: string
  current_rank: RankType
  rank_achieved_date: string | null
}

export interface ProspectPipeline {
  new: number
  interested: number
  ha_scheduled: number
}

export interface ClientStats {
  active: number
  paused: number
  completed: number
  coachProspects: number
}

export interface Projections {
  totalProspects: number
  projectedHAs: number
  newClients: number
  newCoaches: number
  totalCoaches: number
  totalClients: number
}

export interface Gaps {
  coaches: number
  clients: number
  qualifyingLegs: number
}

export function useRankCalculator(user: User | null) {
  const [rankData, setRankData] = useState<RankData | null>(null)
  const [frontlineCoaches, setFrontlineCoaches] = useState<FrontlineCoach[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  // Load rank data and frontline coaches
  const loadData = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Load rank data
      const { data: rankDataResult, error: rankError } = await supabase
        .from("coach_rank_data")
        .select("coach_id, current_rank, rank_achieved_date")
        .eq("coach_id", user.id)
        .single()

      if (rankError && rankError.code !== "PGRST116") {
        console.error("Error loading rank data:", rankError)
      }

      if (rankDataResult) {
        setRankData(rankDataResult as RankData)
      } else {
        // Create default rank data
        const defaultData: RankData = {
          coach_id: user.id,
          current_rank: "Coach",
          rank_achieved_date: null
        }
        setRankData(defaultData)

        // Try to insert default record
        await supabase
          .from("coach_rank_data")
          .insert([{ 
            coach_id: user.id,
            current_rank: "Coach",
            current_fqv: 0,
            current_pqv: 0,
            qualifying_points: 0,
            frontline_coaches: 0,
            total_team_size: 0
          }])
      }

      // Load frontline coaches from sponsor_team view (exclude self)
      const { data: coachesResult, error: coachesError } = await supabase
        .from("sponsor_team")
        .select("coach_id, coach_name, coach_email, coach_rank")
        .eq("sponsor_id", user.id)
        .neq("coach_id", user.id) // Don't include yourself as your own frontline coach

      if (coachesError) {
        console.error("Error loading frontline coaches:", coachesError)
        // Fallback: try querying profiles directly
        const { data: profilesResult } = await supabase
          .from("profiles")
          .select("id, full_name, email, coach_rank")
          .eq("sponsor_id", user.id)
          .neq("id", user.id) // Don't include yourself
        
        if (profilesResult) {
          const coaches: FrontlineCoach[] = profilesResult.map(c => ({
            id: c.id,
            full_name: c.full_name,
            email: c.email,
            coach_rank: c.coach_rank || "Coach",
            is_qualifying: isQualifyingLeg(c.coach_rank || "Coach")
          }))
          setFrontlineCoaches(coaches)
        }
      } else if (coachesResult) {
        const coaches: FrontlineCoach[] = coachesResult.map(c => ({
          id: c.coach_id,
          full_name: c.coach_name,
          email: c.coach_email,
          coach_rank: c.coach_rank || "Coach",
          is_qualifying: isQualifyingLeg(c.coach_rank || "Coach")
        }))
        setFrontlineCoaches(coaches)
      }
    } catch (err: any) {
      console.error("Error loading data:", err)
      setError(err.message)
      setRankData({
        coach_id: user.id,
        current_rank: "Coach",
        rank_achieved_date: null
      })
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Update rank data
  const updateRankData = useCallback(async (updates: Partial<RankData>) => {
    if (!user || !rankData) return

    setRankData(prev => prev ? { ...prev, ...updates } : prev)

    try {
      const { error } = await supabase
        .from("coach_rank_data")
        .upsert({
          coach_id: user.id,
          current_rank: updates.current_rank || rankData.current_rank,
          rank_achieved_date: updates.rank_achieved_date || rankData.rank_achieved_date,
          current_fqv: 0,
          current_pqv: 0,
          qualifying_points: 0,
          frontline_coaches: frontlineCoaches.length,
          total_team_size: frontlineCoaches.length
        })

      if (error) throw error
    } catch (err: any) {
      console.error("Error updating rank data:", err)
      loadData()
    }
  }, [user, rankData, frontlineCoaches.length, loadData])

  // Calculate projections from pipeline
  const calculateProjections = useCallback((
    prospects: ProspectPipeline,
    clients: ClientStats
  ): Projections => {
    const totalProspects = prospects.new + prospects.interested + prospects.ha_scheduled

    const projectedHAs =
      (prospects.new * CONVERSION_RATES.cold_to_ha) +
      (prospects.interested * CONVERSION_RATES.warm_to_ha) +
      (prospects.ha_scheduled * CONVERSION_RATES.scheduled_to_ha)

    const projectedNewClients = projectedHAs * CONVERSION_RATES.ha_to_client

    const projectedNewCoaches = clients.coachProspects * CONVERSION_RATES.client_to_coach

    return {
      totalProspects,
      projectedHAs: Math.round(projectedHAs),
      newClients: Math.round(projectedNewClients),
      newCoaches: Math.round(projectedNewCoaches),
      totalCoaches: frontlineCoaches.length + Math.round(projectedNewCoaches),
      totalClients: clients.active + Math.round(projectedNewClients)
    }
  }, [frontlineCoaches.length])

  // Calculate gaps to next rank
  const calculateGaps = useCallback((
    currentRank: RankType,
    activeClients: number
  ): Gaps | null => {
    const currentRankIndex = RANK_ORDER.indexOf(currentRank)
    const nextRank = currentRankIndex < RANK_ORDER.length - 1
      ? RANK_ORDER[currentRankIndex + 1]
      : null

    if (!nextRank) return null

    const nextRankReqs = RANK_REQUIREMENTS[nextRank]
    const scTeamsCount = frontlineCoaches.filter(c => c.is_qualifying).length

    return {
      coaches: Math.max(0, nextRankReqs.frontlineCoaches - frontlineCoaches.length),
      clients: Math.max(0, nextRankReqs.minClients - activeClients),
      qualifyingLegs: Math.max(0, nextRankReqs.scTeams - scTeamsCount)
    }
  }, [frontlineCoaches])

  // Calculate progress to next rank
  const calculateProgress = useCallback((
    currentRank: RankType,
    activeClients: number
  ): number => {
    const currentRankIndex = RANK_ORDER.indexOf(currentRank)
    const nextRank = currentRankIndex < RANK_ORDER.length - 1
      ? RANK_ORDER[currentRankIndex + 1]
      : null

    if (!nextRank) return 100

    const nextRankReqs = RANK_REQUIREMENTS[nextRank]
    const scTeamsCount = frontlineCoaches.filter(c => c.is_qualifying).length
    
    // Calculate client progress (40% weight)
    const clientProgress = nextRankReqs.minClients > 0
      ? Math.min((activeClients / nextRankReqs.minClients) * 100, 100)
      : 100

    // Calculate coach progress (30% weight)
    const coachProgress = nextRankReqs.frontlineCoaches > 0
      ? Math.min((frontlineCoaches.length / nextRankReqs.frontlineCoaches) * 100, 100)
      : 100

    // Calculate SC teams progress (30% weight)
    const scTeamsProgress = nextRankReqs.scTeams > 0
      ? Math.min((scTeamsCount / nextRankReqs.scTeams) * 100, 100)
      : 100

    return Math.round((clientProgress * 0.4) + (coachProgress * 0.3) + (scTeamsProgress * 0.3))
  }, [frontlineCoaches])

  // Generate action items
  const generateActionItems = useCallback((
    gaps: Gaps | null,
    projections: Projections,
    prospects: ProspectPipeline,
    clients: ClientStats,
    nextRank: RankType | null
  ): { priority: "high" | "medium" | "low"; text: string }[] => {
    if (!gaps || !nextRank) return []

    const items: { priority: "high" | "medium" | "low"; text: string }[] = []

    // Client gaps
    if (gaps.clients > 0) {
      items.push({
        priority: "high",
        text: `Need ${gaps.clients} more active clients`
      })
    }

    // Coach gaps
    if (gaps.coaches > 0) {
      if (clients.coachProspects > 0) {
        items.push({
          priority: "high",
          text: `Recruit ${gaps.coaches} more coaches (${clients.coachProspects} flagged as prospects)`
        })
      } else {
        items.push({
          priority: "medium",
          text: `Need ${gaps.coaches} more frontline coaches`
        })
      }
    }

    // Qualifying legs gaps
    if (gaps.qualifyingLegs > 0) {
      const nonQualifying = frontlineCoaches.filter(c => !c.is_qualifying)
      if (nonQualifying.length > 0) {
        items.push({
          priority: "high",
          text: `Help ${gaps.qualifyingLegs} coaches reach Senior Coach rank`
        })
      } else {
        items.push({
          priority: "medium",
          text: `Need ${gaps.qualifyingLegs} qualifying legs (Senior Coach+)`
        })
      }
    }

    // Pipeline actions
    if (prospects.ha_done > 0) {
      items.push({
        priority: "medium",
        text: `Follow up with ${prospects.ha_done} prospects who completed HA`
      })
    }

    return items.slice(0, 4)
  }, [frontlineCoaches])

  // Get next rank
  const getNextRank = useCallback((currentRank: RankType): RankType | null => {
    const currentRankIndex = RANK_ORDER.indexOf(currentRank)
    return currentRankIndex < RANK_ORDER.length - 1
      ? RANK_ORDER[currentRankIndex + 1]
      : null
  }, [])

  // Computed values
  const qualifyingLegsCount = frontlineCoaches.filter(c => c.is_qualifying).length

  return {
    rankData,
    frontlineCoaches,
    qualifyingLegsCount,
    loading,
    error,
    updateRankData,
    calculateProjections,
    calculateGaps,
    calculateProgress,
    generateActionItems,
    getNextRank,
    reload: loadData,
    RANK_ORDER,
    RANK_REQUIREMENTS,
    RANK_COLORS
  }
}
