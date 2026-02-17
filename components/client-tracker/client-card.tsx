"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Calendar,
  Star,
  MessageSquare,
  CalendarPlus,
  Send,
  Repeat,
  CheckCircle,
  Circle,
  X,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Edit2,
  Check,
} from "lucide-react"
import { ReminderButton } from "@/components/reminders-panel"
import { ClientContextualResources } from "@/components/resources"
import { getDayPhase, getProgramDay, type Client, type ClientStatus } from "@/hooks/use-clients"
import { isMilestoneDay } from "@/hooks/use-touchpoint-templates"

interface ClientCardProps {
  client: Client
  onToggleTouchpoint: (id: string, type: "am_done" | "pm_done") => Promise<boolean>
  onToggleCoachProspect: (id: string) => Promise<boolean>
  onStatusChange: (id: string, status: ClientStatus) => void
  onUpdateClient: (id: string, updates: Partial<Client>) => Promise<boolean>
  onOpenTextTemplates: (client: Client) => void
  onOpenScheduleModal: (client: Client) => void
  onSendSMS: (client: Client) => void
  onClearSchedule: (clientId: string) => void
  onCompleteCheckIn: (client: Client) => void
  isScheduledDue: (client: Client) => boolean
  needsAttention: (client: Client) => boolean
}

export function ClientCard({
  client,
  onToggleTouchpoint,
  onToggleCoachProspect,
  onStatusChange,
  onUpdateClient,
  onOpenTextTemplates,
  onOpenScheduleModal,
  onSendSMS,
  onClearSchedule,
  onCompleteCheckIn,
  isScheduledDue,
  needsAttention,
}: ClientCardProps) {
  const [showResources, setShowResources] = useState(false)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesValue, setNotesValue] = useState(client.notes || "")
  const notesRef = useRef<HTMLTextAreaElement>(null)
  const programDay = getProgramDay(client.start_date)
  const phase = getDayPhase(programDay)
  const attention = needsAttention(client)

  // Sync notes value when client data changes externally
  useEffect(() => {
    if (!editingNotes) {
      setNotesValue(client.notes || "")
    }
  }, [client.notes, editingNotes])

  const handleSaveNotes = async () => {
    const trimmed = notesValue.trim()
    await onUpdateClient(client.id, { notes: trimmed || null })
    setEditingNotes(false)
  }

  const handleCancelNotes = () => {
    setNotesValue(client.notes || "")
    setEditingNotes(false)
  }

  // Compute attention reason for display
  const attentionReason = (() => {
    if (!attention) return null
    const now = new Date()
    const todayStr = now.toISOString().split("T")[0]

    if (client.next_scheduled_at) {
      const scheduledDate = new Date(client.next_scheduled_at)
      const scheduledDateStr = scheduledDate.toISOString().split("T")[0]
      if (scheduledDateStr < todayStr) return "Overdue check-in"
      if (scheduledDateStr === todayStr) return "Check-in due today"
    }

    if (client.last_touchpoint_date) {
      const lastCheckIn = new Date(client.last_touchpoint_date)
      const daysSince = Math.floor((now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24))
      if (daysSince >= 10) return `No check-in for ${daysSince} days`
    } else {
      return "No check-in recorded"
    }

    return "Needs attention"
  })()

  return (
    <Card
      className={`transition-shadow hover:shadow-md ${
        attention
          ? "border-orange-300 bg-orange-50"
          : phase.milestone
          ? "border-green-300 bg-green-50"
          : ""
      }`}
    >
      <CardContent className="p-4">
        {/* Header Row: Day Badge + Client Info */}
        <div className="flex items-start gap-3">
          {/* Day Badge */}
          <div
            className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
            style={{ backgroundColor: phase.bg }}
          >
            <div className="text-[10px] font-semibold" style={{ color: phase.color }}>
              DAY
            </div>
            <div className="text-xl font-bold" style={{ color: phase.color }}>
              {programDay}
            </div>
          </div>

          {/* Client Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900">{client.label}</span>
              {client.status === "goal_achieved" && (
                <Badge className="bg-yellow-100 text-yellow-800">🏆 Goal Achieved</Badge>
              )}
              {client.status === "future_coach" && (
                <Badge className="bg-pink-100 text-pink-700">🌟 Future Coach</Badge>
              )}
              {client.status === "coach_launched" && (
                <Badge className="bg-cyan-100 text-cyan-700">🚀 Coach Launched</Badge>
              )}
              {client.status === "completed" && (
                <Badge className="bg-green-100 text-green-700">✅ Completed</Badge>
              )}
              {client.is_coach_prospect && client.status !== "paused" && (
                <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Coach Prospect
                </Badge>
              )}
              {client.status === "paused" && (
                <Badge variant="secondary">⏸️ Paused</Badge>
              )}
              {phase.milestone && (
                <Badge style={{ backgroundColor: phase.bg, color: phase.color }}>
                  {phase.label}
                </Badge>
              )}
              {attention && attentionReason && (
                <Badge className="bg-orange-200 text-orange-800 flex items-center gap-1">
                  <Circle className="h-2 w-2 fill-orange-500 text-orange-500" />
                  {attentionReason}
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
        </div>

        {/* Scheduled Time Row */}
        {client.status !== "paused" && client.next_scheduled_at && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <Badge
              className={`flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium ${
                new Date(client.next_scheduled_at) < new Date()
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              {new Date(client.next_scheduled_at).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              {new Date(client.next_scheduled_at).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
              {client.recurring_frequency && client.recurring_frequency !== "none" && (
                <Repeat className="h-3 w-3 ml-1" />
              )}
            </Badge>
            {client.phone && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSendSMS(client)}
                className="h-7 w-7 p-0 text-green-500 hover:text-green-700 hover:bg-green-50"
                title="Send SMS reminder"
              >
                <Send className="h-3 w-3" />
              </Button>
            )}
            {new Date(client.next_scheduled_at!).setHours(0, 0, 0, 0) <=
              new Date().setHours(0, 0, 0, 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCompleteCheckIn(client)}
                className="h-7 w-7 p-0 bg-green-100 hover:bg-green-200 rounded-full"
                title="Mark check-in as completed"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onClearSchedule(client.id)}
              className="h-7 w-7 p-0 bg-red-100 hover:bg-red-200 rounded-full"
              title="Cancel scheduled check-in"
            >
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}

        {/* Action Buttons - Status full-width, then Check In + Schedule share a row */}
        <div className="mt-4 space-y-2 sm:space-y-0 sm:flex sm:gap-2">
          {/* Status Select - full width on mobile */}
          <Select
            value={client.status}
            onValueChange={(value) => onStatusChange(client.id, value as ClientStatus)}
          >
            <SelectTrigger className="w-full sm:flex-1 sm:min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">⭐ Client</SelectItem>
              <SelectItem value="goal_achieved">🏆 Goal Achieved</SelectItem>
              <SelectItem value="future_coach">🌟 Future Coach</SelectItem>
              <SelectItem value="coach_launched">🚀 Launched</SelectItem>
              <SelectItem value="completed">✅ Completed</SelectItem>
              <SelectItem value="paused">⏸️ Paused</SelectItem>
            </SelectContent>
          </Select>

          {client.status !== "paused" && (
            <div className="grid grid-cols-2 gap-2 sm:contents">
              {/* Check-in Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!client.am_done && isScheduledDue(client)) {
                    onCompleteCheckIn(client)
                    return
                  }
                  onToggleTouchpoint(client.id, "am_done")
                }}
                className={`w-full sm:flex-1 ${
                  client.am_done
                    ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                    : "text-green-600 border-green-200 hover:bg-green-50"
                }`}
              >
                {client.am_done ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <Circle className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs sm:text-sm">{client.am_done ? "Checked In" : "Check In"}</span>
              </Button>
              {/* Schedule Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenScheduleModal(client)}
                className="w-full sm:flex-1 text-purple-600 border-purple-200 hover:bg-purple-50"
              >
                <CalendarPlus className="h-4 w-4 mr-1" />
                <span className="text-xs sm:text-sm">Schedule</span>
              </Button>
            </div>
          )}
        </div>

        {/* Secondary Actions: Text, Coach?, Remind */}
        <div className={`mt-3 pt-3 border-t grid ${client.status !== "paused" ? "grid-cols-3" : "grid-cols-2"} sm:flex sm:flex-wrap items-center gap-2`}>
          {client.status !== "paused" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenTextTemplates(client)}
              className={`w-full ${
                isMilestoneDay(programDay) && client.last_celebrated_day !== programDay
                  ? "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200 animate-pulse"
                  : "text-blue-600 border-blue-200 hover:bg-blue-50"
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-xs sm:text-sm">
                {isMilestoneDay(programDay) && client.last_celebrated_day !== programDay ? "Celebrate!" : "Text"}
              </span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            className={`w-full ${client.is_coach_prospect ? "bg-orange-50 text-orange-700" : ""}`}
            onClick={() => onToggleCoachProspect(client.id)}
          >
            <Star className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">{client.is_coach_prospect ? "Coach" : "Coach?"}</span>
          </Button>

          <ReminderButton
            entityType="client"
            entityId={client.id}
            entityName={client.label}
            variant="outline"
          />
        </div>

        {/* Notes Section - always visible, click to edit */}
        <div className="mt-3 pt-3 border-t">
          {editingNotes ? (
            <div className="space-y-2">
              <Textarea
                ref={notesRef}
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
                placeholder="Add notes about this client..."
                className="text-sm min-h-[60px] resize-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleSaveNotes()
                  }
                  if (e.key === "Escape") {
                    handleCancelNotes()
                  }
                }}
              />
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleSaveNotes} className="h-7 text-xs bg-[hsl(var(--optavia-green))]">
                  <Check className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancelNotes} className="h-7 text-xs">
                  Cancel
                </Button>
                <span className="text-[10px] text-gray-400 ml-auto">⌘+Enter to save</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditingNotes(true)}
              className="w-full text-left group flex items-start gap-1.5 hover:bg-gray-50 rounded p-1 -m-1 transition-colors"
            >
              <span className="text-sm text-gray-600 flex-1">
                {client.notes ? (
                  <>📝 {client.notes}</>
                ) : (
                  <span className="text-gray-400 italic">Add notes...</span>
                )}
              </span>
              <Edit2 className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-0.5" />
            </button>
          )}
        </div>

        {/* Contextual Resources Section */}
        <Collapsible open={showResources} onOpenChange={setShowResources}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 pt-3 border-t flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            >
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="text-xs">Coaching Guide & Resources</span>
              {showResources ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <ClientContextualResources
              programDay={programDay}
              clientStatus={client.status}
              clientName={client.label}
              compact
            />
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
