"use client"

import { useMemo } from "react"
import { useProspects, type Prospect } from "@/hooks/use-prospects"
import { useClients, type Client } from "@/hooks/use-clients"

export interface PipelineStage {
  id: string
  label: string
  color: string
  bgColor: string
  icon: string
  items: (Prospect | Client)[]
  count: number
}

export interface ActivityItem {
  id: string
  type: "prospect" | "client"
  name: string
  action: string
  timestamp: string
  status?: string
}

export interface PipelineData {
  stages: PipelineStage[]
  recentActivity: ActivityItem[]
  totals: {
    prospects: number
    clients: number
    futureCoaches: number
  }
}

export function usePipeline() {
  const { prospects, stats: prospectStats, loading: prospectsLoading } = useProspects()
  const { clients, stats: clientStats, loading: clientsLoading } = useClients()

  const loading = prospectsLoading || clientsLoading

  // Build pipeline stages
  const stages = useMemo((): PipelineStage[] => {
    const cold = prospects.filter(p => p.status === "cold")
    const warm = prospects.filter(p => p.status === "warm")
    const haScheduled = prospects.filter(p => p.status === "ha_scheduled")
    const haDone = prospects.filter(p => p.status === "ha_done")
    const activeClients = clients.filter(c => c.status === "active")
    const coachProspects = clients.filter(c => c.is_coach_prospect)

    return [
      {
        id: "cold",
        label: "Cold",
        color: "#78909c",
        bgColor: "#eceff1",
        icon: "🔵",
        items: cold,
        count: cold.length,
      },
      {
        id: "warm",
        label: "Warm",
        color: "#ff9800",
        bgColor: "#fff3e0",
        icon: "🟡",
        items: warm,
        count: warm.length,
      },
      {
        id: "ha_scheduled",
        label: "HA Scheduled",
        color: "#2196f3",
        bgColor: "#e3f2fd",
        icon: "📅",
        items: haScheduled,
        count: haScheduled.length,
      },
      {
        id: "ha_done",
        label: "HA Done",
        color: "#9c27b0",
        bgColor: "#f3e5f5",
        icon: "✅",
        items: haDone,
        count: haDone.length,
      },
      {
        id: "client",
        label: "Client",
        color: "#4caf50",
        bgColor: "#e8f5e9",
        icon: "⭐",
        items: activeClients,
        count: activeClients.length,
      },
      {
        id: "coach_prospect",
        label: "Future Coach",
        color: "#e91e63",
        bgColor: "#fce4ec",
        icon: "🚀",
        items: coachProspects,
        count: coachProspects.length,
      },
    ]
  }, [prospects, clients])

  // Build recent activity (based on updated_at timestamps)
  const recentActivity = useMemo((): ActivityItem[] => {
    const activities: ActivityItem[] = []

    // Add prospect activities
    prospects.forEach(p => {
      if (p.updated_at) {
        activities.push({
          id: `prospect-${p.id}`,
          type: "prospect",
          name: p.label,
          action: getProspectAction(p.status),
          timestamp: p.updated_at,
          status: p.status,
        })
      }
    })

    // Add client activities
    clients.forEach(c => {
      if (c.updated_at) {
        activities.push({
          id: `client-${c.id}`,
          type: "client",
          name: c.label,
          action: getClientAction(c.status),
          timestamp: c.updated_at,
          status: c.status,
        })
      }
    })

    // Sort by timestamp (most recent first) and take top 10
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)
  }, [prospects, clients])

  // Totals
  const totals = useMemo(() => ({
    prospects: prospectStats.total,
    clients: clientStats.active,
    futureCoaches: clientStats.coachProspects,
  }), [prospectStats, clientStats])

  return {
    stages,
    recentActivity,
    totals,
    loading,
    prospects,
    clients,
  }
}

// Helper functions
function getProspectAction(status: string): string {
  switch (status) {
    case "cold": return "Added to pipeline"
    case "warm": return "Moved to Warm"
    case "ha_scheduled": return "HA Scheduled"
    case "ha_done": return "Completed HA"
    case "converted": return "Became a client"
    case "coach": return "Became a coach"
    case "not_interested": return "Marked not interested"
    default: return "Updated"
  }
}

function getClientAction(status: string): string {
  switch (status) {
    case "active": return "Started program"
    case "paused": return "Paused program"
    case "completed": return "Completed program"
    default: return "Updated"
  }
}
