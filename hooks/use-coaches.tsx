"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

// Types
export type CoachStage = 'new_coach' | 'building' | 'certified' | 'leader'

export interface Coach {
  id: string
  user_id: string
  label: string
  stage: CoachStage
  rank: number
  launch_date: string
  clients_count: number
  prospects_count: number
  notes: string | null
  last_check_in: string | null
  next_scheduled_at: string | null
  created_at: string
  updated_at: string
}

export interface NewCoach {
  label: string
  stage?: CoachStage
  rank?: number
  launch_date: string
  clients_count?: number
  prospects_count?: number
  notes?: string
}

export interface UpdateCoach {
  label?: string
  stage?: CoachStage
  rank?: number
  launch_date?: string
  clients_count?: number
  prospects_count?: number
  notes?: string | null
  last_check_in?: string | null
  next_scheduled_at?: string | null
}

// Stage configuration
export const COACH_STAGES: { id: CoachStage; label: string; icon: string; color: string; bg: string }[] = [
  { id: "new_coach", label: "New Coach", icon: "🌟", color: "#3B82F6", bg: "#EFF6FF" },
  { id: "building", label: "Building", icon: "🔨", color: "#F59E0B", bg: "#FFFBEB" },
  { id: "certified", label: "Certified", icon: "✅", color: "#14B8A6", bg: "#F0FDFA" },
  { id: "leader", label: "Leader", icon: "👑", color: "#8B5CF6", bg: "#F5F3FF" },
]

// OPTAVIA Rank ladder
export const OPTAVIA_RANKS = [
  { rank: 1, title: "New Coach" },
  { rank: 2, title: "Associate Coach" },
  { rank: 3, title: "Senior Coach" },
  { rank: 4, title: "Certified Coach" },
  { rank: 5, title: "Certified Executive Coach" },
  { rank: 6, title: "Manager" },
  { rank: 7, title: "Senior Manager" },
  { rank: 8, title: "Executive Manager" },
  { rank: 9, title: "Director" },
  { rank: 10, title: "Executive Director" },
  { rank: 11, title: "Senior Director" },
  { rank: 12, title: "Regional Director" },
  { rank: 13, title: "National Director" },
  { rank: 14, title: "Presidential Director" },
  { rank: 15, title: "Integrated Presidential Director" },
]

export function getRankTitle(rank: number): string {
  return OPTAVIA_RANKS.find(r => r.rank === rank)?.title || "New Coach"
}

export function daysSinceLaunch(launchDate: string): number {
  const start = new Date(launchDate)
  const now = new Date()
  return Math.max(0, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
}

export function weekNumber(launchDate: string): number {
  return Math.max(1, Math.ceil(daysSinceLaunch(launchDate) / 7))
}

export function useCoaches() {
  const { user } = useAuth()
  const supabase = useMemo(() => createClient(), [])

  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load coaches
  const loadCoaches = useCallback(async () => {
    if (!user) {
      setCoaches([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('downline_coaches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      setLoading(false)
      return
    }

    setCoaches(data || [])
    setLoading(false)
  }, [user, supabase])

  useEffect(() => {
    loadCoaches()
  }, [loadCoaches])

  // Add coach
  const addCoach = useCallback(async (newCoach: NewCoach): Promise<Coach | null> => {
    if (!user) return null

    const coachData = {
      user_id: user.id,
      label: newCoach.label.trim(),
      stage: newCoach.stage || 'new_coach' as CoachStage,
      rank: newCoach.rank || 1,
      launch_date: newCoach.launch_date,
      clients_count: newCoach.clients_count || 0,
      prospects_count: newCoach.prospects_count || 0,
      notes: newCoach.notes || null,
    }

    const { data, error: insertError } = await supabase
      .from('downline_coaches')
      .insert(coachData)
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      return null
    }

    setCoaches(prev => [data, ...prev])
    return data
  }, [user, supabase])

  // Update coach
  const updateCoach = useCallback(async (id: string, updates: UpdateCoach): Promise<boolean> => {
    if (!user) return false

    const { error: updateError } = await supabase
      .from('downline_coaches')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)

    if (updateError) {
      setError(updateError.message)
      return false
    }

    setCoaches(prev => prev.map(c =>
      c.id === id ? { ...c, ...updates, updated_at: new Date().toISOString() } : c
    ))
    return true
  }, [user, supabase])

  // Delete coach
  const deleteCoach = useCallback(async (id: string): Promise<boolean> => {
    if (!user) return false

    const { error: deleteError } = await supabase
      .from('downline_coaches')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (deleteError) {
      setError(deleteError.message)
      return false
    }

    setCoaches(prev => prev.filter(c => c.id !== id))
    return true
  }, [user, supabase])

  // Check in (update last_check_in)
  const checkIn = useCallback(async (id: string): Promise<boolean> => {
    const today = new Date().toISOString().split('T')[0]
    return updateCoach(id, { last_check_in: today })
  }, [updateCoach])

  // Stats
  const stats = useMemo(() => ({
    total: coaches.length,
    newCoach: coaches.filter(c => c.stage === 'new_coach').length,
    building: coaches.filter(c => c.stage === 'building').length,
    certified: coaches.filter(c => c.stage === 'certified').length,
    leader: coaches.filter(c => c.stage === 'leader').length,
  }), [coaches])

  // Filtered list
  const getFilteredCoaches = useCallback((
    filterStage: CoachStage | 'all' = 'all',
    searchTerm: string = ''
  ): Coach[] => {
    return coaches
      .filter(c => filterStage === 'all' || c.stage === filterStage)
      .filter(c => {
        if (!searchTerm.trim()) return true
        const term = searchTerm.toLowerCase()
        return c.label.toLowerCase().includes(term) ||
          (c.notes || '').toLowerCase().includes(term)
      })
      .sort((a, b) => {
        // Sort by launch date (most recent first)
        return new Date(b.launch_date).getTime() - new Date(a.launch_date).getTime()
      })
  }, [coaches])

  return {
    coaches,
    loading,
    error,
    stats,
    addCoach,
    updateCoach,
    deleteCoach,
    checkIn,
    getFilteredCoaches,
    refresh: loadCoaches,
  }
}
