"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useClients, getDayPhase, getProgramDay, type ClientStatus, type RecurringFrequency, type Client } from "@/hooks/use-clients"
import { useCoaches } from "@/hooks/use-coaches"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Users,
  Plus,
  Calendar,
  AlertCircle,
  Clock,
  ChevronRight,
  Sparkles,
  X,
  CalendarPlus,
  ExternalLink,
  Phone,
  Send,
  Repeat,
  List,
  CalendarDays,
  ChevronLeft,
  CheckCircle,
  Search,
  Video,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MilestoneActionModal } from "@/components/milestone-action-modal"
import { ClientJourneyGuide } from "@/components/client-journey-guide"
import { GraduationCap, Trophy, Heart, Download } from "lucide-react"
import { ScheduleCalendarOptions } from "@/components/schedule-calendar-options"
import { sendCalendarInviteEmail } from "@/lib/email"
import { useUserData } from "@/contexts/user-data-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { StatsCardsSkeleton, ClientListSkeleton, WeekViewSkeleton } from "@/components/ui/skeleton-loaders"
import { ClientCard } from "@/components/client-tracker/client-card"
import type { CalendarEvent } from "@/lib/calendar-utils"

// Days of the week
const DAYS_OF_WEEK = [
  { short: "Sun", full: "Sunday", value: 0 },
  { short: "Mon", full: "Monday", value: 1 },
  { short: "Tue", full: "Tuesday", value: 2 },
  { short: "Wed", full: "Wednesday", value: 3 },
  { short: "Thu", full: "Thursday", value: 4 },
  { short: "Fri", full: "Friday", value: 5 },
  { short: "Sat", full: "Saturday", value: 6 },
]

// Time options for picker
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTE_OPTIONS = ["00", "15", "30", "45"]

export default function ClientTrackerPage() {
  const {
    clients,
    loading,
    stats,
    addClient,
    updateClient,
    toggleCoachProspect,
    toggleTouchpoint,
    updateStatus,
    needsAttention,
    getFilteredClients,
  } = useClients()
  const { coaches: trackedCoaches, addCoach } = useCoaches()
  const { toast } = useToast()
  const { profile } = useUserData()

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [showTextModal, setShowTextModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showGuideModal, setShowGuideModal] = useState(false)
  const [showMilestoneModal, setShowMilestoneModal] = useState(false)
  const [milestoneCount, setMilestoneCount] = useState(0)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [clientToClear, setClientToClear] = useState<string | null>(null)
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false)
  const [clientToComplete, setClientToComplete] = useState<Client | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [filterStatus, setFilterStatus] = useState<ClientStatus | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "week">("list")
  const [weekOffset, setWeekOffset] = useState(0) // 0 = current week, 1 = next week, etc.
  
  // Schedule state
  const [scheduleDay, setScheduleDay] = useState<number>(new Date().getDay())
  const [scheduleHour, setScheduleHour] = useState<number>(9)
  const [scheduleMinute, setScheduleMinute] = useState<string>("00")
  const [scheduleAmPm, setScheduleAmPm] = useState<"AM" | "PM">("AM")
  const [recurringFrequency, setRecurringFrequency] = useState<RecurringFrequency>("none")
  const [clientEmail, setClientEmail] = useState<string>("")
  const [clientPhone, setClientPhone] = useState<string>("")
  
  // Meeting type state (Phone vs Zoom)
  const [meetingType, setMeetingType] = useState<"phone" | "zoom">("phone")
  
  // Zoom details are read-only from profile (managed in My Settings -> Zoom)
  const zoomLink = profile?.zoom_link || ""
  const zoomMeetingId = profile?.zoom_meeting_id || ""
  const zoomPasscode = profile?.zoom_passcode || ""
  const hasZoomConfigured = !!profile?.zoom_link
  
  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Recurring frequency options
  const RECURRING_OPTIONS: { value: RecurringFrequency; label: string }[] = [
    { value: "none", label: "One-time" },
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Every 2 weeks" },
    { value: "monthly", label: "Monthly" },
  ]

  const today = new Date().toISOString().split("T")[0]

  const isScheduledDue = (client: Client) => {
    if (!client.next_scheduled_at) return false
    const scheduledDateStr = new Date(client.next_scheduled_at).toISOString().split("T")[0]
    return scheduledDateStr <= today
  }

  const handleMarkCheckInDone = async (client: Client) => {
    // This will mark AM done AND (if the scheduled check-in is due) auto-clear/auto-advance the schedule.
    await toggleTouchpoint(client.id, "am_done")
    toast({
      title: "✅ Check-in Completed!",
      description:
        client.recurring_frequency && client.recurring_frequency !== "none"
          ? "Recurring schedule advanced to the next check-in."
          : "Scheduled check-in cleared.",
    })
  }

  // Handle client status change with auto-add to Coach Tracker
  const handleStatusChange = async (clientId: string, newStatus: ClientStatus) => {
    const client = clients.find(c => c.id === clientId)
    if (!client) return

    const success = await updateStatus(clientId, newStatus)
    if (!success) return

    // When a client is moved to "coach_launched", auto-create a Coach Tracker entry
    if (newStatus === "coach_launched" && client.status !== "coach_launched") {
      const alreadyTracked = trackedCoaches.some(
        c => c.label.toLowerCase().trim() === client.label.toLowerCase().trim()
      )
      if (!alreadyTracked) {
        await addCoach({
          label: client.label,
          stage: "new_coach",
          rank: 1,
          launch_date: new Date().toISOString().split("T")[0],
        })
        toast({
          title: "🚀 Coach Launched!",
          description: `${client.label} has been added to your Coach Tracker.`,
        })
      } else {
        toast({
          title: "🚀 Coach Launched!",
          description: `${client.label} is already on your Coach Tracker.`,
        })
      }
    }
  }

  const [newClient, setNewClient] = useState({
    label: "",
    phone: "",
    startDate: today,
  })

  // Generate SMS text for calendar invite
  const generateSMSText = (client: Client, scheduledAt: Date): string => {
    const programDay = getProgramDay(client.start_date)
    const dateStr = scheduledAt.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    const timeStr = scheduledAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    return `Hi! 🌟 Just a reminder about our check-in scheduled for ${dateStr} at ${timeStr}. Looking forward to connecting! Day ${programDay} - you're doing great! 💪`
  }

  // Send SMS with scheduled meeting info
  const sendSMS = (client: Client) => {
    if (!client.phone || !client.next_scheduled_at) return
    const scheduledAt = new Date(client.next_scheduled_at)
    const message = generateSMSText(client, scheduledAt)
    const smsUrl = `sms:${client.phone}?body=${encodeURIComponent(message)}`
    window.open(smsUrl)
    toast({
      title: "📱 Opening Messages",
      description: `Sending reminder to ${client.label}`,
    })
  }

  // Get the next occurrence of a day of the week
  const getNextDayDate = (dayOfWeek: number): Date => {
    const now = new Date()
    const currentDay = now.getDay()
    let daysUntil = dayOfWeek - currentDay
    if (daysUntil <= 0) daysUntil += 7 // Next week if today or past
    const targetDate = new Date(now)
    targetDate.setDate(now.getDate() + daysUntil)
    return targetDate
  }

  // Convert 12-hour to 24-hour format
  const get24Hour = (hour: number, ampm: "AM" | "PM"): number => {
    if (ampm === "AM") {
      return hour === 12 ? 0 : hour
    } else {
      return hour === 12 ? 12 : hour + 12
    }
  }

  // Generate Google Calendar URL
  const generateCalendarUrl = (client: Client, day: number, hour: number, minute: string, ampm: "AM" | "PM"): string => {
    const targetDate = getNextDayDate(day)
    const hour24 = get24Hour(hour, ampm)
    targetDate.setHours(hour24, parseInt(minute), 0, 0)
    
    const endDate = new Date(targetDate)
    endDate.setMinutes(endDate.getMinutes() + 30) // 30 min duration
    
    const programDay = getProgramDay(client.start_date)
    const phase = getDayPhase(programDay)
    
    const title = `Check-in: ${client.label} (Day ${programDay})`
    const details = `Client: ${client.label}
Program Day: ${programDay}
Phase: ${phase.label}

Suggested talking points:
- How are you feeling today?
- Any challenges with meals?
- Celebrate wins!
${phase.milestone ? `\n🎉 MILESTONE: ${phase.label} - Celebrate this achievement!` : ""}`

    // Format dates for Google Calendar (YYYYMMDDTHHmmss)
    const formatDate = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    }
    
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${formatDate(targetDate)}/${formatDate(endDate)}`,
      details: details,
    })
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  // Open schedule modal
  const openScheduleModal = (client: Client) => {
    setSelectedClient(client)
    // Load existing recurring settings if available
    if (client.recurring_day !== null && client.recurring_day !== undefined) {
      setScheduleDay(client.recurring_day)
    } else {
      setScheduleDay(new Date().getDay())
    }
    if (client.recurring_time) {
      const [hour, minute] = client.recurring_time.split(":")
      const hourNum = parseInt(hour)
      setScheduleHour(hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum)
      setScheduleMinute(minute)
      setScheduleAmPm(hourNum >= 12 ? "PM" : "AM")
    } else {
      setScheduleHour(9)
      setScheduleMinute("00")
      setScheduleAmPm("AM")
    }
    setRecurringFrequency(client.recurring_frequency || "none")
    setClientEmail(client.email || "")
    setClientPhone(client.phone || "")
    setShowScheduleModal(true)
  }

  // Generate calendar event from schedule settings
  const generateCalendarEvent = (): CalendarEvent | null => {
    if (!selectedClient) return null
    
    const targetDate = getNextDayDate(scheduleDay)
    const hour24 = get24Hour(scheduleHour, scheduleAmPm)
    targetDate.setHours(hour24, parseInt(scheduleMinute), 0, 0)
    
    const endDate = new Date(targetDate)
    endDate.setMinutes(endDate.getMinutes() + 30) // 30 min duration
    
    const programDay = getProgramDay(selectedClient.start_date)
    const phase = getDayPhase(programDay)
    
    // Build meeting details based on meeting type
    let meetingDetails = ""
    let location = ""
    
    if (meetingType === "zoom" && zoomLink) {
      meetingDetails = `\n\n📹 Zoom Meeting:\n${zoomLink}`
      if (zoomMeetingId) meetingDetails += `\nMeeting ID: ${zoomMeetingId}`
      if (zoomPasscode) meetingDetails += `\nPasscode: ${zoomPasscode}`
      location = zoomLink
    } else if (meetingType === "phone") {
      meetingDetails = "\n\n📱 Phone Call"
      if (clientPhone) meetingDetails += `\nCall: ${clientPhone}`
    }
    
    return {
      title: `Check-in: ${selectedClient.label} (Day ${programDay})`,
      description: `Client: ${selectedClient.label}
Program Day: ${programDay}
Phase: ${phase.label}
${meetingDetails}

Suggested talking points:
- How are you feeling today?
- Any challenges with meals?
- Celebrate wins!
${phase.milestone ? `\n🎉 MILESTONE: ${phase.label} - Celebrate this achievement!` : ""}`,
      startDate: targetDate,
      endDate: endDate,
      location: location || undefined,
      uid: `client-${selectedClient.id}-${Date.now()}@coachingamplifier.com`,
    }
  }

  // Handle saving schedule settings (called before calendar actions)
  const handleSaveSchedule = async () => {
    if (!selectedClient) return
    
    // Calculate the scheduled datetime
    const targetDate = getNextDayDate(scheduleDay)
    const hour24 = get24Hour(scheduleHour, scheduleAmPm)
    targetDate.setHours(hour24, parseInt(scheduleMinute), 0, 0)
    
    // Format time for storage (HH:MM in 24-hour format)
    const timeStr = `${hour24.toString().padStart(2, "0")}:${scheduleMinute}`
    
    // Save the scheduled time and recurring settings to the client record
    // Note: email is not stored on client, only used for sending invites
    const success = await updateClient(selectedClient.id, {
      next_scheduled_at: targetDate.toISOString(),
      recurring_frequency: recurringFrequency,
      recurring_day: recurringFrequency !== "none" ? scheduleDay : null,
      recurring_time: recurringFrequency !== "none" ? timeStr : null,
      phone: clientPhone || null,
    })
    
    if (!success) {
      toast({
        title: "Failed to save schedule",
        description: "Please try again",
        variant: "destructive",
      })
      return
    }
    
    // Send calendar invite to the coach so they can save it to their local calendar
    const coachEmail = profile?.notification_email
    if (coachEmail) {
      const calendarEvent = generateCalendarEvent()
      if (calendarEvent) {
        sendCalendarInviteEmail({
          to: coachEmail,
          toName: profile?.full_name || undefined,
          fromEmail: coachEmail,
          fromName: profile?.full_name || undefined,
          eventTitle: calendarEvent.title,
          eventDescription: calendarEvent.description,
          startDate: calendarEvent.startDate.toISOString(),
          endDate: calendarEvent.endDate.toISOString(),
          eventType: "check-in",
        }).then((result) => {
          if (result.success) {
            toast({
              title: "📧 Calendar invite sent to you!",
              description: `Check ${coachEmail} to add this to your calendar`,
            })
          }
        }).catch(() => {
          // Silent fail - the schedule is already saved
        })
      }
    }

    setShowScheduleModal(false)
    setMeetingType("phone")
    
    const recurringLabel = recurringFrequency !== "none" 
      ? ` (${RECURRING_OPTIONS.find(r => r.value === recurringFrequency)?.label})`
      : ""
    toast({
      title: recurringFrequency !== "none" ? "🔄 Recurring Check-in Set" : "📅 Check-in Scheduled",
      description: `${scheduleHour}:${scheduleMinute} ${scheduleAmPm} on ${DAYS_OF_WEEK[scheduleDay].full}${recurringLabel}`,
    })
  }

  const handleAddClient = async () => {
    if (!newClient.label.trim() || !newClient.startDate) return
    
    // Get current total client count before adding
    const currentCount = clients.length
    
    await addClient({
      label: newClient.label,
      phone: newClient.phone || undefined,
      start_date: newClient.startDate,
    })
    setNewClient({ label: "", phone: "", startDate: today })
    setShowAddModal(false)
    
    // Check if new count is a milestone (5, 10, 15, 20, 25, etc.)
    const newCount = currentCount + 1
    if (newCount >= 5 && newCount % 5 === 0) {
      setMilestoneCount(newCount)
      setShowMilestoneModal(true)
    }
  }

  const exportToCSV = () => {
    const headers = ["Label", "Status", "Start Date", "Program Day", "Phase", "Coach Prospect", "Next Check-in", "Last Touchpoint", "Notes", "Created"]
    
    const rows = clients.map(c => {
      const programDay = getProgramDay(c.start_date)
      const phase = getDayPhase(programDay)
      return [
        c.label,
        c.status.charAt(0).toUpperCase() + c.status.slice(1),
        new Date(c.start_date).toLocaleDateString(),
        programDay.toString(),
        phase.label,
        c.is_coach_prospect ? "Yes" : "No",
        c.next_scheduled_at ? new Date(c.next_scheduled_at).toLocaleString() : "",
        c.last_touchpoint_date || "",
        c.notes?.replace(/"/g, '""') || "",
        new Date(c.created_at).toLocaleDateString(),
      ]
    })

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `clients-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export complete",
      description: `Exported ${clients.length} clients to CSV`,
    })
  }

  const openTextTemplates = (client: Client) => {
    setSelectedClient(client)
    setShowTextModal(true)
  }

  // Memoize filtered clients for better performance
  const filteredClients = useMemo(() => 
    getFilteredClients(filterStatus).filter(client =>
      !debouncedSearchTerm || client.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ), [filterStatus, debouncedSearchTerm, getFilteredClients]
  )

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        {/* Page Header Skeleton */}
        <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="h-4 w-32 bg-white/20 rounded mb-2" />
                <div className="h-8 w-48 bg-white/20 rounded mb-2" />
                <div className="h-4 w-64 bg-white/20 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-6">
          <StatsCardsSkeleton count={4} />
          <div className="space-y-4 mb-6">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <ClientListSkeleton count={5} />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm opacity-90 mb-1">
                <span>My Business</span>
                <ChevronRight className="h-4 w-4" />
                <span className="font-semibold">Client Tracker</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <Users className="h-8 w-8" />
                My Clients
              </h1>
              <p className="text-sm opacity-90 mt-1">
                Track daily touchpoints and milestones
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                className="bg-[#f88221] border-[#f88221] text-white hover:bg-[#e07520] text-xs sm:text-sm"
                onClick={() => setShowGuideModal(true)}
              >
                <GraduationCap className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Learn the Client Journey</span>
              </Button>
              <Link href="/prospect-tracker">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm">
                  <Users className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">100's List</span>
                </Button>
              </Link>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-white text-[hsl(var(--optavia-green))] hover:bg-white/90 text-xs sm:text-sm"
              >
                <Plus className="h-4 w-4 mr-1 sm:mr-2" />
                <span>Add</span>
                <span className="hidden sm:inline ml-1">Client</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-blue-700">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>
                <strong>Privacy:</strong> Use nicknames only. Contact info stays in OPTAVIA's portal.
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarPlus className="h-4 w-4 flex-shrink-0" />
              <span>
                <strong>Schedule:</strong> Add check-ins to your calendar and track upcoming meetings.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <ErrorBoundary>
        {/* Stats */}
        {/* Pipeline Stages */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-4">
          {[
            { id: "active" as ClientStatus, label: "Client", color: "#37B6AE", icon: "⭐", count: stats.active },
            { id: "goal_achieved" as ClientStatus, label: "Goal Achieved", color: "#ffd700", icon: "🏆", count: stats.goalAchieved },
            { id: "future_coach" as ClientStatus, label: "Future Coach", color: "#e91e63", icon: "🌟", count: stats.futureCoach },
            { id: "coach_launched" as ClientStatus, label: "Coach Launched", color: "#00bcd4", icon: "🚀", count: stats.coachLaunched },
            { id: "completed" as ClientStatus, label: "Completed", color: "#4caf50", icon: "✅", count: stats.completed },
          ].map((stage) => (
            <button
              key={stage.id}
              onClick={() => setFilterStatus(filterStatus === stage.id ? "all" : stage.id)}
              className="rounded-lg border-2 p-3 sm:p-4 text-center transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer"
              style={{
                borderColor: filterStatus === stage.id ? stage.color : `${stage.color}50`,
                backgroundColor: filterStatus === stage.id ? stage.color : `${stage.color}08`,
              }}
            >
              <div className="text-lg sm:text-xl mb-0.5">{stage.icon}</div>
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: filterStatus === stage.id ? "white" : stage.color }}
              >
                {stage.count}
              </div>
              <div
                className="text-xs sm:text-sm font-medium mt-0.5 truncate"
                style={{ color: filterStatus === stage.id ? "white" : "#6b7280" }}
              >
                {stage.label}
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
          {stats.needsAttention > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 font-medium">
              🚨 {stats.needsAttention} Need Attention
            </span>
          )}
          {stats.milestonesToday > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 font-medium">
              🎉 {stats.milestonesToday} Milestones Today
            </span>
          )}
          {stats.paused > 0 && (
            <button
              onClick={() => setFilterStatus(filterStatus === "paused" ? "all" : "paused")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                filterStatus === "paused"
                  ? "bg-gray-700 border-gray-700 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              ⏸️ {stats.paused} Paused
            </button>
          )}
        </div>

        {/* Search, Filter and View Toggle */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by label..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center justify-between gap-2">
            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {([
                { value: "all" as const, label: "All" },
                { value: "active" as const, label: "Active" },
                { value: "goal_achieved" as const, label: "Goal Achieved" },
                { value: "future_coach" as const, label: "Future Coach" },
                { value: "coach_launched" as const, label: "Launched" },
                { value: "completed" as const, label: "Completed" },
                { value: "paused" as const, label: "Paused" },
              ]).map(({ value, label }) => (
                <Button
                  key={value}
                  variant={filterStatus === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(value)}
                  className={filterStatus === value ? "bg-[hsl(var(--optavia-green))]" : ""}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* View Toggle & Export */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                className="text-gray-600"
                title="Export to CSV"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Export</span>
              </Button>
              <div className="flex rounded-lg border overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 sm:px-4 py-2 flex items-center justify-center gap-1.5 sm:gap-2 text-sm font-medium transition-colors ${
                    viewMode === "list"
                      ? "bg-[hsl(var(--optavia-green))] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-3 sm:px-4 py-2 flex items-center justify-center gap-1.5 sm:gap-2 text-sm font-medium transition-colors ${
                    viewMode === "week"
                      ? "bg-[hsl(var(--optavia-green))] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Week</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Week Calendar View */}
        {viewMode === "week" && (
          <div className="mb-6">
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWeekOffset(weekOffset - 1)}
                disabled={weekOffset <= 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="text-center">
                <span className="font-semibold text-gray-900">
                  {(() => {
                    const now = new Date()
                    const startOfWeek = new Date(now)
                    startOfWeek.setDate(now.getDate() - now.getDay() + weekOffset * 7)
                    const endOfWeek = new Date(startOfWeek)
                    endOfWeek.setDate(startOfWeek.getDate() + 6)
                    return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                  })()}
                </span>
                {weekOffset === 0 && (
                  <Badge className="ml-2 bg-green-100 text-green-700">This Week</Badge>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWeekOffset(weekOffset + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* Week Grid */}
            <div className="grid grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const now = new Date()
                const startOfWeek = new Date(now)
                startOfWeek.setDate(now.getDate() - now.getDay() + weekOffset * 7)
                const dayDate = new Date(startOfWeek)
                dayDate.setDate(startOfWeek.getDate() + day.value)
                const isToday = dayDate.toDateString() === now.toDateString()
                const isPast = dayDate < new Date(now.toDateString())

                // Get clients scheduled for this day
                const dayClients = filteredClients.filter((client) => {
                  if (!client.next_scheduled_at) return false
                  const scheduledDate = new Date(client.next_scheduled_at)
                  return scheduledDate.toDateString() === dayDate.toDateString()
                }).sort((a, b) => {
                  const aTime = new Date(a.next_scheduled_at!).getTime()
                  const bTime = new Date(b.next_scheduled_at!).getTime()
                  return aTime - bTime
                })

                return (
                  <div
                    key={day.value}
                    className={`min-h-[200px] rounded-lg border ${
                      isToday
                        ? "border-[hsl(var(--optavia-green))] bg-green-50"
                        : isPast
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {/* Day Header */}
                    <div
                      className={`px-2 py-2 border-b text-center ${
                        isToday ? "bg-[hsl(var(--optavia-green))] text-white" : "bg-gray-100"
                      }`}
                    >
                      <div className="text-xs font-medium">{day.short}</div>
                      <div className={`text-lg font-bold ${isToday ? "" : "text-gray-700"}`}>
                        {dayDate.getDate()}
                      </div>
                    </div>

                    {/* Day Content */}
                    <div className="p-2 space-y-2">
                      {dayClients.length === 0 ? (
                        <div className="text-xs text-gray-400 text-center py-4">
                          No check-ins
                        </div>
                      ) : (
                        dayClients.map((client) => {
                          const programDay = getProgramDay(client.start_date)
                          const phase = getDayPhase(programDay)
                          const scheduledTime = new Date(client.next_scheduled_at!).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })
                          return (
                            <div
                              key={client.id}
                              onClick={() => openScheduleModal(client)}
                              className="p-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm cursor-pointer transition-shadow"
                              style={{ borderLeftColor: phase.color, borderLeftWidth: "3px" }}
                            >
                              <div className="text-xs font-medium text-gray-900 truncate">
                                {client.label}
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-gray-500">{scheduledTime}</span>
                                <Badge
                                  className="text-[10px] px-1.5 py-0"
                                  style={{ backgroundColor: phase.bg, color: phase.color }}
                                >
                                  D{programDay}
                                </Badge>
                              </div>
                              {client.recurring_frequency && client.recurring_frequency !== "none" && (
                                <Repeat className="h-3 w-3 text-purple-400 mt-1" />
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Unscheduled Clients */}
            {(() => {
              const unscheduledClients = filteredClients.filter(c => !c.next_scheduled_at)
              if (unscheduledClients.length === 0) return null
              return (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-gray-700">Unscheduled ({unscheduledClients.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {unscheduledClients.map((client) => {
                      const programDay = getProgramDay(client.start_date)
                      const phase = getDayPhase(programDay)
                      return (
                        <Button
                          key={client.id}
                          variant="outline"
                          size="sm"
                          onClick={() => openScheduleModal(client)}
                          className="border-orange-200 text-orange-700 hover:bg-orange-50"
                        >
                          <div
                            className="w-5 h-5 rounded mr-2 flex items-center justify-center text-[10px] font-bold"
                            style={{ backgroundColor: phase.bg, color: phase.color }}
                          >
                            {programDay}
                          </div>
                          {client.label}
                          <CalendarPlus className="h-3 w-3 ml-2" />
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* Client List */}
        {viewMode === "list" && (
        <div className="space-y-3">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onToggleTouchpoint={toggleTouchpoint}
              onToggleCoachProspect={toggleCoachProspect}
              onStatusChange={handleStatusChange}
              onUpdateClient={updateClient}
              onEdit={(c) => {
                setEditingClient({ ...c })
                setShowEditModal(true)
              }}
              onOpenTextTemplates={openTextTemplates}
              onOpenScheduleModal={openScheduleModal}
              onSendSMS={sendSMS}
              onClearSchedule={(id) => {
                setClientToClear(id)
                setShowClearConfirm(true)
              }}
              onCompleteCheckIn={(c) => {
                if (!c.am_done && isScheduledDue(c)) {
                  setClientToComplete(c)
                  setShowCompleteConfirm(true)
                } else {
                  handleMarkCheckInDone(c)
                }
              }}
              isScheduledDue={isScheduledDue}
              needsAttention={needsAttention}
            />
          ))}

          {filteredClients.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No clients found</p>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Client
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        )}
        </ErrorBoundary>
      </div>

      {/* Add Client Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Client</DialogTitle>
            <DialogDescription>Add a new client to track their journey.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Label / Nickname *</Label>
              <Input
                value={newClient.label}
                onChange={(e) => setNewClient({ ...newClient, label: e.target.value })}
                placeholder="e.g., Jennifer, Mike"
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">
                A name you'll recognize
              </p>
            </div>
            <div>
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={newClient.startDate}
                onChange={(e) => setNewClient({ ...newClient, startDate: e.target.value })}
              />
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700 flex items-start gap-2">
              <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>
                We'll calculate their program day and show milestone reminders automatically!
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddClient}
              disabled={!newClient.label.trim() || !newClient.startDate}
              className="bg-[hsl(var(--optavia-green))]"
            >
              Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>Update client information.</DialogDescription>
          </DialogHeader>
          {editingClient && (
            <div className="space-y-4">
              <div>
                <Label>Label / Nickname</Label>
                <Input
                  value={editingClient.label}
                  onChange={(e) => setEditingClient({ ...editingClient, label: e.target.value })}
                  maxLength={50}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={editingClient.phone || ""}
                    onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                    placeholder="e.g., 555-123-4567"
                    className="pl-10"
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={editingClient.start_date}
                  onChange={(e) => setEditingClient({ ...editingClient, start_date: e.target.value })}
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={editingClient.notes || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, notes: e.target.value })}
                  placeholder="Notes about this client..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowEditModal(false); setEditingClient(null) }}>
              Cancel
            </Button>
            <Button
              disabled={!editingClient?.label.trim()}
              className="bg-[hsl(var(--optavia-green))]"
              onClick={async () => {
                if (!editingClient) return
                const success = await updateClient(editingClient.id, {
                  label: editingClient.label.trim(),
                  phone: editingClient.phone || null,
                  start_date: editingClient.start_date,
                  notes: editingClient.notes || null,
                })
                if (success) {
                  toast({ title: "Client updated", description: `${editingClient.label} has been updated.` })
                  setShowEditModal(false)
                  setEditingClient(null)
                } else {
                  toast({ title: "Error", description: "Failed to update client.", variant: "destructive" })
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Milestone Action Modal (Text Templates) */}
      {selectedClient && (
        <MilestoneActionModal
          open={showTextModal}
          onOpenChange={setShowTextModal}
          clientId={selectedClient.id}
          clientLabel={selectedClient.label}
          programDay={getProgramDay(selectedClient.start_date)}
          onScheduleClick={() => {
            setShowTextModal(false)
            setShowScheduleModal(true)
          }}
          onTextSent={() => {
            // Mark as checked in when text is sent
          }}
          onMarkCelebrated={async () => {
            // Mark this milestone day as celebrated in the database
            const programDay = getProgramDay(selectedClient.start_date)
            const success = await updateClient(selectedClient.id, {
              last_celebrated_day: programDay
            })
            if (success) {
              setShowTextModal(false)
            }
          }}
        />
      )}

      {/* Schedule Check-in Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5 text-purple-600" />
              Schedule Check-in
            </DialogTitle>
            <DialogDescription>Set a day and time for the client check-in.</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              {/* Client Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-gray-900">{selectedClient.label}</div>
                <div className="text-sm text-gray-500">
                  Day {getProgramDay(selectedClient.start_date)} • {getDayPhase(getProgramDay(selectedClient.start_date)).label}
                </div>
              </div>

              {/* Day Picker */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Select Day</Label>
                <div className="grid grid-cols-7 gap-1">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day.value}
                      onClick={() => setScheduleDay(day.value)}
                      className={`p-2 rounded-lg text-center transition-colors ${
                        scheduleDay === day.value
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <div className="text-xs font-medium">{day.short}</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Next {DAYS_OF_WEEK[scheduleDay].full}: {getNextDayDate(scheduleDay).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>

              {/* Time Picker */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Select Time</Label>
                <div className="flex items-center gap-2 justify-center">
                  {/* Hour */}
                  <select
                    value={scheduleHour}
                    onChange={(e) => setScheduleHour(parseInt(e.target.value))}
                    className="w-16 h-12 text-center text-lg font-medium border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {HOUR_OPTIONS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  <span className="text-2xl font-bold text-gray-400">:</span>
                  {/* Minute */}
                  <select
                    value={scheduleMinute}
                    onChange={(e) => setScheduleMinute(e.target.value)}
                    className="w-16 h-12 text-center text-lg font-medium border rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {MINUTE_OPTIONS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {/* AM/PM */}
                  <div className="flex rounded-lg border overflow-hidden">
                    <button
                      onClick={() => setScheduleAmPm("AM")}
                      className={`px-4 h-12 font-medium transition-colors ${
                        scheduleAmPm === "AM"
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      AM
                    </button>
                    <button
                      onClick={() => setScheduleAmPm("PM")}
                      className={`px-4 h-12 font-medium transition-colors ${
                        scheduleAmPm === "PM"
                          ? "bg-purple-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      PM
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">30 minute check-in</p>
              </div>

              {/* Recurring Frequency */}
              <div>
                <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-purple-500" />
                  Recurring
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RECURRING_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setRecurringFrequency(option.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        recurringFrequency === option.value
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {recurringFrequency !== "none" && (
                  <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                    <Repeat className="h-3 w-3" />
                    Repeats every {recurringFrequency === "weekly" ? "week" : recurringFrequency === "biweekly" ? "2 weeks" : "month"} on {DAYS_OF_WEEK[scheduleDay].full}
                  </p>
                )}
              </div>

              {/* Meeting Type Selector */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Meeting Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMeetingType("phone")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      meetingType === "phone"
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">Phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType("zoom")}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      meetingType === "zoom"
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <Video className="h-5 w-5" />
                    <span className="font-medium">Zoom</span>
                  </button>
                </div>
              </div>

              {/* Zoom Details (shown when Zoom is selected) - Read-only from profile */}
              {meetingType === "zoom" && (
                <div className="space-y-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-purple-700 text-sm font-medium">
                    <Video className="h-4 w-4" />
                    Zoom Meeting Details
                  </div>
                  {hasZoomConfigured ? (
                    <div className="space-y-2">
                      <Input
                        value={zoomLink}
                        readOnly
                        className="bg-gray-50 text-gray-700 cursor-default"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={zoomMeetingId || "—"}
                          readOnly
                          className="bg-gray-50 text-gray-700 cursor-default"
                        />
                        <Input
                          value={zoomPasscode || "—"}
                          readOnly
                          className="bg-gray-50 text-gray-700 cursor-default"
                        />
                      </div>
                      <p className="text-xs text-purple-600">
                        Managed in <Link href="/settings" className="underline font-medium">My Settings</Link> → Zoom tab
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-sm text-purple-700 mb-2">
                        No Zoom details configured yet.
                      </p>
                      <Link
                        href="/settings"
                        className="inline-flex items-center gap-1 text-sm font-medium text-purple-700 underline hover:text-purple-900"
                      >
                        Go to My Settings → Zoom tab to set it up
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Calendar Options with Email/SMS */}
              {generateCalendarEvent() && (
                <ScheduleCalendarOptions
                  event={generateCalendarEvent()!}
                  recipientName={selectedClient.label}
                  recipientEmail={clientEmail}
                  recipientPhone={clientPhone}
                  onEmailChange={setClientEmail}
                  onPhoneChange={setClientPhone}
                  onScheduleComplete={handleSaveSchedule}
                  eventType="check-in"
                  recurringFrequency={recurringFrequency}
                />
              )}

              {/* Info - only show for recurring */}
              {recurringFrequency !== "none" && (
                <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-700 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    We'll track your recurring schedule and auto-advance to the next check-in date.
                  </span>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowScheduleModal(false)
              setMeetingType("phone")
            }}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Journey Guide Modal */}
      <Dialog open={showGuideModal} onOpenChange={setShowGuideModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Learn the Client Journey
            </DialogTitle>
          </DialogHeader>
          <ClientJourneyGuide />
        </DialogContent>
      </Dialog>

      {/* Clear Schedule Confirmation */}
      <AlertDialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Scheduled Check-in?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the scheduled check-in time. You can always schedule a new one.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (clientToClear) {
                  updateClient(clientToClear, { 
                    next_scheduled_at: null,
                    recurring_frequency: null,
                    recurring_day: null,
                    recurring_time: null 
                  })
                  toast({
                    title: "❌ Check-in Cancelled",
                    description: "The scheduled check-in has been removed.",
                  })
                  setClientToClear(null)
                }
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Clear Schedule
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Complete Check-in Confirmation */}
      <AlertDialog
        open={showCompleteConfirm}
        onOpenChange={(open) => {
          setShowCompleteConfirm(open)
          if (!open) setClientToComplete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark check-in as done?</AlertDialogTitle>
            <AlertDialogDescription>
              {clientToComplete?.recurring_frequency && clientToComplete.recurring_frequency !== "none"
                ? "This will mark today's check-in complete and advance to the next scheduled check-in."
                : "This will mark today's check-in complete and clear the scheduled time."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!clientToComplete) return
                await handleMarkCheckInDone(clientToComplete)
                setClientToComplete(null)
                setShowCompleteConfirm(false)
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Mark Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Client Milestone Celebration Modal */}
      <Dialog open={showMilestoneModal} onOpenChange={setShowMilestoneModal}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 Amazing Achievement!
            </h2>
            <div className="text-5xl font-bold text-[hsl(var(--optavia-green))] mb-3">
              {milestoneCount} Clients!
            </div>
            <p className="text-gray-600 mb-4">
              You've now helped <strong>{milestoneCount} people</strong> on their health journey!
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                <Heart className="h-5 w-5 fill-current" />
                <span className="font-semibold">Lives Changed</span>
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <p className="text-sm text-green-600">
                {milestoneCount === 5 && "Your first 5! You're officially making an impact."}
                {milestoneCount === 10 && "Double digits! You're building real momentum."}
                {milestoneCount === 15 && "15 lives transformed. You're on fire! 🔥"}
                {milestoneCount === 20 && "20 clients! Think about the ripple effect you've created."}
                {milestoneCount === 25 && "A quarter century of transformations! Incredible."}
                {milestoneCount === 50 && "FIFTY clients! You're a true health champion! 🏆"}
                {milestoneCount === 75 && "75 people healthier because of YOU!"}
                {milestoneCount === 100 && "100 CLIENTS! You've changed 100 lives! 🌟"}
                {milestoneCount > 100 && `${milestoneCount} lives changed. You're a legend!`}
                {![5, 10, 15, 20, 25, 50, 75, 100].includes(milestoneCount) && milestoneCount <= 100 && milestoneCount > 25 && 
                  `${milestoneCount} clients helped on their journey!`
                }
              </p>
            </div>
            <p className="text-sm text-gray-500 italic">
              Rank is great, but impact is everything. Keep changing lives! 💚
            </p>
          </div>
          <Button 
            onClick={() => setShowMilestoneModal(false)}
            className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green))]/90"
          >
            Keep Going! 💪
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
