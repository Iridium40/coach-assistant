"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Heart, Clock } from "lucide-react"
import type { ActivityItem } from "@/hooks/use-pipeline"

interface ActivityFeedProps {
  activities: ActivityItem[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60))
        return diffMins <= 1 ? "Just now" : `${diffMins}m ago`
      }
      return `${diffHours}h ago`
    }
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "cold": return "bg-gray-100 text-gray-600"
      case "warm": return "bg-orange-100 text-orange-700"
      case "ha_scheduled": return "bg-blue-100 text-blue-700"
      case "ha_done": return "bg-purple-100 text-purple-700"
      case "converted":
      case "active": return "bg-green-100 text-green-700"
      case "coach": return "bg-pink-100 text-pink-700"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No recent activity</p>
            <p className="text-xs text-gray-400 mt-1">
              Activity will appear here as you update your pipeline
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className={`p-2 rounded-lg ${activity.type === "prospect" ? "bg-blue-100" : "bg-green-100"}`}>
                {activity.type === "prospect" ? (
                  <Users className="h-4 w-4 text-blue-600" />
                ) : (
                  <Heart className="h-4 w-4 text-green-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm text-gray-900">{activity.name}</span>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.action}
                  </Badge>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
