"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useReminders } from "@/hooks/use-reminders"
import { getProgramDay, getDayPhase } from "@/hooks/use-clients"
import type { User } from "@supabase/supabase-js"
import type { Prospect } from "@/hooks/use-prospects"
import type { ZoomCall } from "@/lib/types"
import type { ExpandedZoomCall } from "@/lib/expand-recurring-events"
import { isMilestoneCelebratedToday, markMilestoneCelebratedToday } from "@/lib/milestone-celebrations"

interface TodaysFocusProps {
  user: User | null
  userRank: string | null
  isNewCoach?: boolean
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
  const [dayOffset, setDayOffset] = useState(0)

  const selectedDate = new Date()
  selectedDate.setDate(selectedDate.getDate() + dayOffset)
  const isToday = dayOffset === 0
  const isTomorrow = dayOffset === 1
  const isYesterday = dayOffset === -1

  const focusLabel = isToday
    ? "Today's Focus"
    : isTomorrow
    ? "Tomorrow's Focus"
    : isYesterday
    ? "Yesterday's Focus"
    : selectedDate.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })

  // Get reminders for selected day
  const selectedReminders = reminders.filter(r => {
    if (r.is_completed) return false
    if (isToday) return isDueToday?.(r) || isOverdue?.(r)
    if (!r.due_date) return false
    const dueDate = new Date(r.due_date).toISOString().split("T")[0]
    return dueDate === selectedDate.toISOString().split("T")[0]
  }).slice(0, 3)

  const dayStart = new Date(selectedDate)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(selectedDate)
  dayEnd.setHours(23, 59, 59, 999)

  // Get new clients who start on the selected day (Day 1)
  const newClientsOnDay = clients.filter(c => {
    if (c.status !== "active") return false
    const programDay = getProgramDay(c.start_date, selectedDate)
    return programDay === 1
  })

  // Get other clients needing touchpoints (only for today — future days haven't happened yet)
  const newClientIds = new Set(newClientsOnDay.map((c: any) => c.id))
  const allClientsNeedingAction = isToday
    ? clients.filter(c => c.status === "active" && needsAttention(c) && !newClientIds.has(c.id))
    : []
  const clientsNeedingAction = allClientsNeedingAction.slice(0, 5)
  const moreClientsCount = allClientsNeedingAction.length - clientsNeedingAction.length

  // Get HAs scheduled for selected day
  const haScheduledOnDay = prospects.filter(p => 
    p.ha_scheduled_at && 
    new Date(p.ha_scheduled_at) >= dayStart && 
    new Date(p.ha_scheduled_at) <= dayEnd
  ).slice(0, 3)

  // Get meetings for selected day
  const meetingsOnDay = upcomingMeetings
    .filter((m) => {
      const start = new Date(m.occurrence_date)
      if (start < dayStart || start > dayEnd) return false

      if (isToday) {
        const durationMins = typeof m.duration_minutes === "number" ? m.duration_minutes : 60
        const end = new Date(start.getTime() + durationMins * 60_000)
        const graceMs = 15 * 60_000
        if (Date.now() > end.getTime() + graceMs) return false
      }

      return true
    })
    .slice(0, 3)

  // Get milestone clients for selected day
  const milestoneClients = clients
    .filter((c) => {
      if (c.status !== "active") return false
      const day = getProgramDay(c.start_date, selectedDate)
      if (![7, 14, 21, 30].includes(day)) return false
      if (isToday) return !isMilestoneCelebratedToday({ clientId: c.id, programDay: day })
      return true
    })
    .slice(0, 2)

  const hasCoachingActions = newClientsOnDay.length > 0 || clientsNeedingAction.length > 0 || haScheduledOnDay.length > 0 || milestoneClients.length > 0 || selectedReminders.length > 0
  const hasCalendarEvents = meetingsOnDay.length > 0

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
            {focusLabel}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              onClick={() => setDayOffset(d => d - 1)}
              disabled={dayOffset <= -7}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {!isToday && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-[hsl(var(--optavia-green))] hover:text-[hsl(var(--optavia-green))]"
                onClick={() => setDayOffset(0)}
              >
                Today
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-700"
              onClick={() => setDayOffset(d => d + 1)}
              disabled={dayOffset >= 7}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Today's Schedule - Calendar Events */}
        {hasCalendarEvents && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {isToday ? "Today's Schedule" : "Schedule"}
            </p>
            {meetingsOnDay.map((meeting, idx) => (
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
          </div>
        )}

        {/* Divider when both sections have content */}
        {hasCalendarEvents && <div className="border-t border-gray-200" />}

        {/* Coaching Actions Section */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Coaching Actions
          </p>

          {hasCoachingActions ? (
            <div className="space-y-2">
              {newClientsOnDay.map((client: any) => (
                <div
                  key={`new-${client.id}`}
                  className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-green-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-sm">🎉</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{client.label}</div>
                      <div className="text-xs text-green-600">New client — Day 1! Welcome check-in needed</div>
                    </div>
                  </div>
                  <Link href="/client-tracker?filter=needs_attention">
                    <Button
                      size="sm"
                      className="h-7 text-xs px-3 bg-green-500 hover:bg-green-600 text-white"
                    >
                      Welcome
                    </Button>
                  </Link>
                </div>
              ))}

              {haScheduledOnDay.map(prospect => (
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
                    <Link href="/client-tracker?filter=needs_attention">
                      <Button
                        size="sm"
                        className="h-7 text-xs px-3 bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Check In
                      </Button>
                    </Link>
                  </div>
                )
              })}

              {/* More clients link */}
              {moreClientsCount > 0 && (
                <Link href="/client-tracker?filter=needs_attention" className="block">
                  <div className="text-center py-1.5 text-xs text-orange-600 hover:text-orange-800 hover:underline">
                    + {moreClientsCount} more client{moreClientsCount > 1 ? "s" : ""} need check-ins → View Client List
                  </div>
                </Link>
              )}

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

              {selectedReminders.map(reminder => {
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
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-700 text-sm">
                  {isToday ? "All coaching actions complete" : "No coaching actions scheduled"}
                </p>
                <p className="text-xs text-green-600/70 mt-0.5">
                  {isToday
                    ? "No client check-ins, health assessments, milestones, or reminders pending."
                    : "No health assessments, milestones, or new clients for this day."}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
