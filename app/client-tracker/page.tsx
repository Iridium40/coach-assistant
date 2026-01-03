"use client"

import { useState } from "react"
import Link from "next/link"
import { useClients, getDayPhase, getProgramDay, type ClientStatus } from "@/hooks/use-clients"
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Users,
  Plus,
  CheckCircle,
  Circle,
  Calendar,
  Star,
  AlertCircle,
  Clock,
  ChevronRight,
  MessageSquare,
  Trophy,
  Flame,
  Sparkles,
  X,
  CalendarPlus,
  ExternalLink,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientTextTemplates } from "@/components/client-text-templates"

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

// Time slots
const TIME_SLOTS = [
  { label: "AM (9:00)", value: "am", hour: 9 },
  { label: "PM (6:00)", value: "pm", hour: 18 },
]

export default function ClientTrackerPage() {
  const {
    clients,
    loading,
    stats,
    addClient,
    toggleTouchpoint,
    toggleCoachProspect,
    updateStatus,
    needsAttention,
    getFilteredClients,
  } = useClients()
  const { toast } = useToast()

  const [showAddModal, setShowAddModal] = useState(false)
  const [showTextModal, setShowTextModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<ClientStatus | "all">("active")
  
  // Schedule state
  const [scheduleDay, setScheduleDay] = useState<number>(new Date().getDay())
  const [scheduleTime, setScheduleTime] = useState<"am" | "pm">("am")

  const today = new Date().toISOString().split("T")[0]

  const [newClient, setNewClient] = useState({
    label: "",
    startDate: today,
  })

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

  // Generate Google Calendar URL
  const generateCalendarUrl = (client: any, day: number, timeSlot: "am" | "pm"): string => {
    const targetDate = getNextDayDate(day)
    const hour = timeSlot === "am" ? 9 : 18
    targetDate.setHours(hour, 0, 0, 0)
    
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
  const openScheduleModal = (client: any) => {
    setSelectedClient(client)
    setScheduleDay(new Date().getDay())
    setScheduleTime("am")
    setShowScheduleModal(true)
  }

  // Handle adding to calendar
  const handleAddToCalendar = () => {
    if (!selectedClient) return
    const url = generateCalendarUrl(selectedClient, scheduleDay, scheduleTime)
    window.open(url, "_blank")
    setShowScheduleModal(false)
    toast({
      title: "📅 Opening Calendar",
      description: `Scheduling ${scheduleTime.toUpperCase()} check-in for ${selectedClient.label}`,
    })
  }

  const handleAddClient = async () => {
    if (!newClient.label.trim() || !newClient.startDate) return
    await addClient({
      label: newClient.label,
      start_date: newClient.startDate,
    })
    setNewClient({ label: "", startDate: today })
    setShowAddModal(false)
  }

  const openTextTemplates = (client: any) => {
    setSelectedClient(client)
    setShowTextModal(true)
  }

  const filteredClients = getFilteredClients(filterStatus)

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))]"></div>
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
            <div className="flex gap-3">
              <Link href="/prospect-tracker">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Users className="h-4 w-4 mr-2" />
                  Prospects
                </Button>
              </Link>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-white text-[hsl(var(--optavia-green))] hover:bg-white/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Client
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
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>
                <strong>AM/PM:</strong> Track your morning & evening check-ins with each client.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-[hsl(var(--optavia-green))]">{stats.active}</div>
              <div className="text-sm text-gray-500">Active</div>
            </CardContent>
          </Card>
          <Card className={stats.needsAttention > 0 ? "border-orange-300 bg-orange-50" : ""}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-orange-500">{stats.needsAttention}</div>
              <div className="text-sm text-gray-500">Need Attention</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-500">{stats.coachProspects}</div>
              <div className="text-sm text-gray-500">Coach Prospects</div>
            </CardContent>
          </Card>
          <Card className={stats.milestonesToday > 0 ? "border-yellow-300 bg-yellow-50" : ""}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{stats.milestonesToday}</div>
              <div className="text-sm text-gray-500">Milestones Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(["active", "paused", "all"] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className={filterStatus === status ? "bg-[hsl(var(--optavia-green))]" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Client List */}
        <div className="space-y-3">
          {filteredClients.map((client) => {
            const programDay = getProgramDay(client.start_date)
            const phase = getDayPhase(programDay)
            const attention = needsAttention(client)

            return (
              <Card
                key={client.id}
                className={`transition-shadow hover:shadow-md ${
                  attention
                    ? "border-orange-300 bg-orange-50"
                    : phase.milestone
                    ? "border-green-300 bg-green-50"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Day Badge */}
                    <div
                      className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: phase.bg }}
                    >
                      <div className="text-xs font-semibold" style={{ color: phase.color }}>
                        DAY
                      </div>
                      <div className="text-xl font-bold" style={{ color: phase.color }}>
                        {programDay}
                      </div>
                    </div>

                    {/* Client Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900">{client.label}</span>
                        {client.is_coach_prospect && (
                          <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            Coach Prospect
                          </Badge>
                        )}
                        {client.status === "paused" && (
                          <Badge variant="secondary">Paused</Badge>
                        )}
                        {phase.milestone && (
                          <Badge
                            style={{ backgroundColor: phase.bg, color: phase.color }}
                          >
                            {phase.label}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {phase.label} • Started{" "}
                        {new Date(client.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Touchpoint Buttons */}
                    {client.status === "active" && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button
                          variant={client.am_done ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTouchpoint(client.id, "am_done")}
                          className={client.am_done ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {client.am_done ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <Circle className="h-4 w-4 mr-1" />
                          )}
                          AM
                        </Button>
                        <Button
                          variant={client.pm_done ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTouchpoint(client.id, "pm_done")}
                          className={client.pm_done ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {client.pm_done ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <Circle className="h-4 w-4 mr-1" />
                          )}
                          PM
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openTextTemplates(client)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Text
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openScheduleModal(client)}
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                        >
                          <CalendarPlus className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCoachProspect(client.id)}
                        className={client.is_coach_prospect ? "bg-orange-50 text-orange-700" : ""}
                      >
                        {client.is_coach_prospect ? "★ Coach" : "☆ Coach?"}
                      </Button>
                      {client.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(client.id, "paused")}
                        >
                          Pause
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(client.id, "active")}
                          className="text-green-600"
                        >
                          Resume
                        </Button>
                      )}
                    </div>
                  </div>

                  {client.notes && (
                    <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                      📝 {client.notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}

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
      </div>

      {/* Add Client Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Client</DialogTitle>
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
                A name you'll recognize (no contact info needed)
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

      {/* Text Templates Modal */}
      {selectedClient && (
        <ClientTextTemplates
          open={showTextModal}
          onOpenChange={setShowTextModal}
          clientLabel={selectedClient.label}
          programDay={getProgramDay(selectedClient.start_date)}
        />
      )}

      {/* Schedule Check-in Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5 text-purple-600" />
              Schedule Check-in
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-gray-900">{selectedClient.label}</div>
                <div className="text-sm text-gray-500">
                  Day {getProgramDay(selectedClient.start_date)} • {getDayPhase(getProgramDay(selectedClient.start_date)).label}
                </div>
              </div>

              {/* Day Picker */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Day</Label>
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
                <Label className="text-sm font-medium mb-3 block">Select Time</Label>
                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.value}
                      onClick={() => setScheduleTime(slot.value as "am" | "pm")}
                      className={`p-4 rounded-lg text-center transition-colors border-2 ${
                        scheduleTime === slot.value
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <Clock className="h-5 w-5 mx-auto mb-1" />
                      <div className="font-medium">{slot.label}</div>
                      <div className="text-xs text-gray-500">30 min check-in</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-700 flex items-start gap-2">
                <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  This will open Google Calendar with a 30-minute event pre-filled with client details.
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddToCalendar}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
