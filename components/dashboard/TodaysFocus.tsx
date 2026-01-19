"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  ChevronRight,
  CheckCircle,
  BookOpen,
  Calendar,
  Clock,
  Users,
  Trophy,
  AlertCircle,
  Video,
  MessageSquare,
  Circle,
  Target,
  Bell,
  X,
} from "lucide-react"
import { useReminders } from "@/hooks/use-reminders"
import { getProgramDay, getDayPhase } from "@/hooks/use-clients"
import type { User } from "@supabase/supabase-js"
import type { Prospect } from "@/hooks/use-prospects"
import type { ZoomCall } from "@/lib/types"
import type { ExpandedZoomCall } from "@/lib/expand-recurring-events"
import { ACADEMY_MODULES, ACADEMY_RESOURCE_IDS, getAcademyProgress } from "@/lib/academy-utils"
import { isMilestoneCelebratedToday, markMilestoneCelebratedToday } from "@/lib/milestone-celebrations"

interface TodaysFocusProps {
  user: User | null
  userRank: string | null
  isNewCoach?: boolean
  completedResources: string[]
  clients: any[]
  prospects: Prospect[]
  upcomingMeetings: ExpandedZoomCall[]
  loadingMeetings: boolean
  needsAttention: (client: any) => boolean
  toggleTouchpoint: (clientId: string, field: "am_done" | "pm_done") => void
  onCelebrateClick?: (client: any) => void
}

export function TodaysFocus({
  user,
  userRank,
  isNewCoach,
  completedResources,
  clients,
  prospects,
  upcomingMeetings,
  loadingMeetings,
  needsAttention,
  toggleTouchpoint,
  onCelebrateClick,
}: TodaysFocusProps) {
  const { reminders = [], completeReminder, isOverdue, isDueToday } = useReminders()
  const [, forceRefresh] = useState(0)

  // Get today's reminders (due today or overdue, not completed)
  const todaysReminders = reminders.filter(r => 
    !r.is_completed && (isDueToday?.(r) || isOverdue?.(r))
  ).slice(0, 3)

  const today = new Date().toISOString().split("T")[0]
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  // Academy progress + next module (based on academy-resource-* completions)
  const academyProgress = useMemo(() => {
    return getAcademyProgress(completedResources || [])
  }, [completedResources])

  const nextAcademyResourceId = useMemo(() => {
    return ACADEMY_RESOURCE_IDS.find((id) => !completedResources.includes(id)) || null
  }, [completedResources])

  const nextAcademyModule = useMemo(() => {
    if (!nextAcademyResourceId) return null
    const num = nextAcademyResourceId.split("-").pop() // "1".."6"
    const moduleId = num ? `module-${num}` : null
    if (!moduleId) return null
    return ACADEMY_MODULES.find((m) => m.id === moduleId) || { id: moduleId, title: "Academy Module", requiredRank: null }
  }, [nextAcademyResourceId])

  const isAcademyComplete = academyProgress.total > 0 && academyProgress.completed >= academyProgress.total

  // Get clients needing touchpoints (limited)
  const clientsNeedingAction = clients
    .filter(c => c.status === "active" && needsAttention(c))
    .slice(0, 3)

  // Get HAs scheduled for today
  const haScheduledToday = prospects.filter(p => 
    p.ha_scheduled_at && 
    new Date(p.ha_scheduled_at) >= todayStart && 
    new Date(p.ha_scheduled_at) <= todayEnd
  ).slice(0, 3)

  // Get meetings today (already filtered by date in parent, use occurrence_date)
  const meetingsToday = upcomingMeetings
    .filter((m) => {
      const start = new Date(m.occurrence_date)
      if (start < todayStart || start > todayEnd) return false

      // Hide meetings that already ended (even if status didn't update)
      const durationMins = typeof m.duration_minutes === "number" ? m.duration_minutes : 60
      const end = new Date(start.getTime() + durationMins * 60_000)
      const graceMs = 15 * 60_000 // keep for 15 minutes after end
      if (Date.now() > end.getTime() + graceMs) return false

      return true
    })
    .slice(0, 3)

  // Get milestone clients
  const milestoneClients = clients
    .filter((c) => {
      if (c.status !== "active") return false
      const day = getProgramDay(c.start_date)
      if (![7, 14, 21, 30].includes(day)) return false
      return !isMilestoneCelebratedToday({ clientId: c.id, programDay: day })
    })
    .slice(0, 2)

  const hasActionItems = clientsNeedingAction.length > 0 || haScheduledToday.length > 0 || meetingsToday.length > 0 || milestoneClients.length > 0 || todaysReminders.length > 0

  // Get timezone abbreviation
  const getTimezoneAbbrev = (timezone: string): string => {
    const abbrevMap: Record<string, string> = {
      'America/New_York': 'ET',
      'America/Chicago': 'CT',
      'America/Denver': 'MT',
      'America/Los_Angeles': 'PT',
    }
    return abbrevMap[timezone] || timezone
  }

  const formatTime = (dateString: string, eventTimezone?: string) => {
    const date = new Date(dateString)
    const localTime = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
    
    // For events with a specific timezone, show both local and original time
    if (eventTimezone) {
      const originalTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: eventTimezone
      })
      const tzAbbrev = getTimezoneAbbrev(eventTimezone)
      
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (userTz !== eventTimezone) {
        return `${localTime} (${originalTime} ${tzAbbrev})`
      }
    }
    
    return localTime
  }

  return (
    <Card className="bg-gradient-to-br from-[hsl(var(--optavia-green-light))] to-white border-2 border-[hsl(var(--optavia-green))] shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2 text-optavia-dark">
            <Target className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
            Today's Focus
          </CardTitle>
          {!isAcademyComplete && academyProgress.total > 0 && (
            <Badge variant="secondary" className="bg-white">
              Academy: {academyProgress.completed}/{academyProgress.total}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Academy Section */}
        {isAcademyComplete ? (
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-orange-800 text-sm">Academy Complete! 🎉</p>
              <p className="text-xs text-orange-700">
                {academyProgress.total} modules completed
              </p>
            </div>
            <Link href="/training">
              <Button variant="outline" size="sm" className="text-xs">
                Review
              </Button>
            </Link>
          </div>
        ) : nextAcademyModule ? (
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[hsl(var(--optavia-accent))]" />
                <span className="text-sm font-medium text-gray-700">Continue Academy</span>
              </div>
              <span className="text-xs text-[hsl(var(--optavia-accent))] font-bold">
                {academyProgress.percentage}%
              </span>
            </div>
            <Progress value={academyProgress.percentage} className="h-1.5 mb-2 [&>div]:bg-[hsl(var(--optavia-accent))]" />
            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded border border-orange-200">
              <span className="text-lg">🧡</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Up Next</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {nextAcademyModule.title}
                </p>
              </div>
              <Link href={`/academy/${nextAcademyModule.id}`}>
                <Button size="sm" className="bg-[hsl(var(--optavia-accent))] hover:bg-[hsl(var(--optavia-accent))]/90 text-white text-xs">
                  Start
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        ) : null}

        {/* Divider if we have both sections */}
        {(isAcademyComplete || nextAcademyModule) && (hasActionItems || !hasActionItems) && (
          <div className="border-t border-green-200" />
        )}

        {/* Today's Tasks Section */}
        {hasActionItems ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Today's Tasks</p>
            
            {/* HAs Scheduled Today */}
            {haScheduledToday.map(prospect => (
              <div
                key={`ha-${prospect.id}`}
                className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-purple-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">{prospect.label}</div>
                    <div className="text-xs text-purple-600">
                      HA at {formatTime(prospect.ha_scheduled_at!)}
                    </div>
                  </div>
                </div>
                <Link href="/prospect-tracker">
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white text-xs h-7">
                    View
                  </Button>
                </Link>
              </div>
            ))}

            {/* Meetings Today */}
            {meetingsToday.map((meeting, idx) => (
              <div
                key={`${meeting.id}-${idx}`}
                className={`flex items-center justify-between p-2.5 bg-white rounded-lg border ${
                  meeting.status === "live" ? "border-red-300" : "border-blue-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    meeting.status === "live" ? "bg-red-100" : "bg-blue-100"
                  }`}>
                    <Video className={`h-4 w-4 ${meeting.status === "live" ? "text-red-500" : "text-blue-500"}`} />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900 line-clamp-1">
                      {meeting.title}
                      {meeting.is_occurrence && <span className="text-xs text-gray-400 ml-1">(recurring)</span>}
                    </div>
                    <div className="text-xs text-gray-500">{formatTime(meeting.occurrence_date, meeting.timezone)}</div>
                  </div>
                </div>
                {meeting.zoom_link && (
                  <Button
                    asChild
                    size="sm"
                    className={`text-xs h-7 ${meeting.status === "live" ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                  >
                    <a href={meeting.zoom_link} target="_blank" rel="noopener noreferrer">
                      {meeting.status === "live" ? "Join Now" : "Join"}
                    </a>
                  </Button>
                )}
              </div>
            ))}

            {/* Client Check-ins */}
            {clientsNeedingAction.map(client => {
              const programDay = getProgramDay(client.start_date)
              const phase = getDayPhase(programDay)
              return (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-orange-200"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex flex-col items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: phase.bg, color: phase.color }}
                    >
                      <span className="text-[7px]">D</span>
                      <span className="text-xs -mt-0.5">{programDay}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{client.label}</div>
                      <div className="text-xs text-orange-600">Check-in needed</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleTouchpoint(client.id, "am_done")}
                    className={`h-7 text-xs px-3 ${client.am_done ? "bg-green-100 text-green-700 border-green-300" : "text-green-600 border-green-200"}`}
                  >
                    {client.am_done ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Done
                      </>
                    ) : (
                      "Check In"
                    )}
                  </Button>
                </div>
              )
            })}

            {/* Milestone Celebrations */}
            {milestoneClients.map(client => {
              const programDay = getProgramDay(client.start_date)
              const phase = getDayPhase(programDay)
              return (
                <div
                  key={`milestone-${client.id}`}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-yellow-200 animate-pulse"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{client.label}</div>
                      <div className="text-xs text-yellow-600">{phase.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs h-7"
                      onClick={() => onCelebrateClick?.(client)}
                    >
                      🎉 Celebrate!
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                      onClick={() => {
                        markMilestoneCelebratedToday({ clientId: client.id, programDay })
                        forceRefresh((x) => x + 1)
                      }}
                      title="Dismiss for today"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span className="ml-1 hidden sm:inline">Dismiss</span>
                    </Button>
                  </div>
                </div>
              )
            })}

            {/* Today's Reminders */}
            {todaysReminders.map(reminder => {
              const reminderIsOverdue = isOverdue?.(reminder)
              return (
                <div
                  key={`reminder-${reminder.id}`}
                  className={`flex items-center justify-between p-2.5 bg-white rounded-lg border ${
                    reminderIsOverdue ? "border-red-200" : "border-amber-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      reminderIsOverdue ? "bg-red-100" : "bg-amber-100"
                    }`}>
                      <Bell className={`h-4 w-4 ${reminderIsOverdue ? "text-red-600" : "text-amber-600"}`} />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{reminder.title}</div>
                      <div className={`text-xs ${reminderIsOverdue ? "text-red-600" : "text-amber-600"}`}>
                        {reminderIsOverdue ? "Overdue" : "Due today"}
                        {reminder.entity_name && ` • ${reminder.entity_name}`}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => completeReminder?.(reminder.id)}
                    className="h-7 text-xs px-3 text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Done
                  </Button>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="h-10 w-10 mx-auto mb-2 text-green-500" />
            <p className="font-medium text-green-700 text-sm">All caught up for today!</p>
            <p className="text-xs text-gray-500 mt-0.5">Great job staying on top of your business.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
