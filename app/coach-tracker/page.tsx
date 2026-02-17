"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import {
  useCoaches,
  COACH_STAGES,
  OPTAVIA_RANKS,
  getRankTitle,
  daysSinceLaunch,
  weekNumber,
  type Coach,
  type CoachStage,
  type NewCoach,
  type UpdateCoach,
} from "@/hooks/use-coaches"
import { useDebounce } from "@/hooks/use-debounce"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Plus,
  Search,
  AlertCircle,
  Edit2,
  Trash2,
  Download,
  CheckCircle,
  Rocket,
  Award,
  Check,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReminderButton } from "@/components/reminders-panel"
import { ErrorBoundary } from "@/components/ui/error-boundary"

// ─── Coach Card ───
function CoachCard({
  coach,
  onEdit,
  onRank,
  onCheckIn,
  onMoveStage,
  onDelete,
  onUpdateCoach,
}: {
  coach: Coach
  onEdit: (coach: Coach) => void
  onRank: (coach: Coach) => void
  onCheckIn: (coach: Coach) => void
  onMoveStage: (coachId: string, newStage: CoachStage) => void
  onDelete: (coach: Coach) => void
  onUpdateCoach: (id: string, updates: UpdateCoach) => Promise<boolean>
}) {
  const stage = COACH_STAGES.find(s => s.id === coach.stage) || COACH_STAGES[0]
  const stageIdx = COACH_STAGES.findIndex(s => s.id === coach.stage)
  const rankTitle = getRankTitle(coach.rank)
  const days = daysSinceLaunch(coach.launch_date)
  const weeks = weekNumber(coach.launch_date)

  const [editingNotes, setEditingNotes] = useState(false)
  const [notesValue, setNotesValue] = useState(coach.notes || "")
  const notesRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!editingNotes) {
      setNotesValue(coach.notes || "")
    }
  }, [coach.notes, editingNotes])

  const handleSaveNotes = async () => {
    const trimmed = notesValue.trim()
    await onUpdateCoach(coach.id, { notes: trimmed || null })
    setEditingNotes(false)
  }

  const handleCancelNotes = () => {
    setNotesValue(coach.notes || "")
    setEditingNotes(false)
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        {/* Header Row: Day Badge + Info */}
        <div className="flex items-start gap-3">
          {/* Day Badge */}
          <div
            className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${stage.color}15`, border: `2px solid ${stage.color}` }}
          >
            <div className="text-[10px] font-bold tracking-wider" style={{ color: stage.color }}>
              DAY
            </div>
            <div className="text-xl font-bold leading-tight" style={{ color: stage.color }}>
              {days}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900">{coach.label}</span>
              <Badge
                className="text-[10px] px-1.5 py-0 cursor-pointer hover:opacity-80"
                style={{ backgroundColor: stage.bg, color: stage.color, border: `1px solid ${stage.color}30` }}
                onClick={() => onRank(coach)}
              >
                {stage.icon} {stage.label}
              </Badge>
              {/* Rank Badge inline */}
              <button
                onClick={() => onRank(coach)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
              >
                <span className="text-xs">🏅</span>
                <span className="text-xs font-semibold text-purple-700">{rankTitle}</span>
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
              <span>
                Week {weeks} · Launched{" "}
                {new Date(coach.launch_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              {coach.last_check_in && (
                <span className="text-xs text-gray-400">
                  Last check-in: {new Date(coach.last_check_in).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              )}
            </div>
            {/* Stats inline */}
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-semibold text-[hsl(var(--optavia-green))]">
                {coach.clients_count} Clients
              </span>
              <span className="text-xs font-semibold text-blue-500">
                {coach.prospects_count} Prospects
              </span>
            </div>
          </div>
        </div>

        {/* Primary Actions - Status + Check In + Schedule (matching prospect/client layout) */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          {/* Stage Select (prominent, like prospect/client status dropdown) */}
          <Select
            value={coach.stage}
            onValueChange={(value) => onMoveStage(coach.id, value as CoachStage)}
          >
            <SelectTrigger className="flex-1 min-w-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COACH_STAGES.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.icon} {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Check In Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-[hsl(var(--optavia-green))]/50 text-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))]"
            onClick={() => onCheckIn(coach)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">Check In</span>
          </Button>

          {/* Rank Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-purple-600 border-purple-200 hover:bg-purple-50"
            onClick={() => onRank(coach)}
          >
            <Award className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">Rank</span>
          </Button>
        </div>

        {/* Secondary Actions: Edit, Remind, Delete (grid like prospect/client card) */}
        <div className="mt-3 pt-3 border-t grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(coach)}>
            <Edit2 className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">Edit</span>
          </Button>

          <ReminderButton
            entityType="client"
            entityId={coach.id}
            entityName={coach.label}
            variant="outline"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(coach)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="text-xs sm:text-sm">Remove</span>
          </Button>
        </div>

        {/* Notes - inline editable (matching prospect/client layout) */}
        <div className="mt-3 pt-3 border-t">
          {editingNotes ? (
            <div className="space-y-2">
              <Textarea
                ref={notesRef}
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
                placeholder="Add notes about this coach..."
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
                {coach.notes ? (
                  <>📝 {coach.notes}</>
                ) : (
                  <span className="text-gray-400 italic">Add notes...</span>
                )}
              </span>
              <Edit2 className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-0.5" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ───
export default function CoachTrackerPage() {
  const {
    coaches,
    loading,
    stats,
    addCoach,
    updateCoach,
    deleteCoach,
    checkIn,
    getFilteredCoaches,
  } = useCoaches()

  const { toast } = useToast()

  const [filterStage, setFilterStage] = useState<CoachStage | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 300)

  // Modals
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null)
  const [rankCoach, setRankCoach] = useState<Coach | null>(null)
  const [deletingCoach, setDeletingCoach] = useState<Coach | null>(null)

  // Add/Edit form state
  const [formName, setFormName] = useState("")
  const [formStage, setFormStage] = useState<CoachStage>("new_coach")
  const [formRank, setFormRank] = useState(1)
  const [formLaunchDate, setFormLaunchDate] = useState(new Date().toISOString().split("T")[0])
  const [formClients, setFormClients] = useState(0)
  const [formProspects, setFormProspects] = useState(0)
  const [formNotes, setFormNotes] = useState("")

  const filteredCoaches = useMemo(
    () => getFilteredCoaches(filterStage, debouncedSearch),
    [filterStage, debouncedSearch, getFilteredCoaches]
  )

  // Reset form
  const resetForm = () => {
    setFormName("")
    setFormStage("new_coach")
    setFormRank(1)
    setFormLaunchDate(new Date().toISOString().split("T")[0])
    setFormClients(0)
    setFormProspects(0)
    setFormNotes("")
  }

  // Open add modal
  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  // Open edit modal
  const openEditModal = (coach: Coach) => {
    setFormName(coach.label)
    setFormStage(coach.stage)
    setFormRank(coach.rank)
    setFormLaunchDate(coach.launch_date)
    setFormClients(coach.clients_count)
    setFormProspects(coach.prospects_count)
    setFormNotes(coach.notes || "")
    setEditingCoach(coach)
  }

  // Save (add or edit)
  const handleSave = async () => {
    if (!formName.trim()) return

    if (editingCoach) {
      const success = await updateCoach(editingCoach.id, {
        label: formName.trim(),
        stage: formStage,
        rank: formRank,
        launch_date: formLaunchDate,
        clients_count: formClients,
        prospects_count: formProspects,
        notes: formNotes || null,
      })
      if (success) {
        toast({ title: "Coach updated", description: `${formName} has been updated.` })
        setEditingCoach(null)
      }
    } else {
      const result = await addCoach({
        label: formName.trim(),
        stage: formStage,
        rank: formRank,
        launch_date: formLaunchDate,
        clients_count: formClients,
        prospects_count: formProspects,
        notes: formNotes || undefined,
      })
      if (result) {
        toast({ title: "Coach added", description: `${formName} has been added to your team.` })
        setShowAddModal(false)
      }
    }
  }

  // Move stage
  const handleMoveStage = async (coachId: string, newStage: CoachStage) => {
    const success = await updateCoach(coachId, { stage: newStage })
    if (success) {
      const stageLabel = COACH_STAGES.find(s => s.id === newStage)?.label
      toast({ title: "Stage updated", description: `Moved to ${stageLabel}` })
    }
  }

  // Check in
  const handleCheckIn = async (coach: Coach) => {
    const success = await checkIn(coach.id)
    if (success) {
      toast({ title: "✅ Check-in logged", description: `Checked in with ${coach.label}` })
    }
  }

  // Update rank
  const handleUpdateRank = async (coachId: string, newRank: number) => {
    const success = await updateCoach(coachId, { rank: newRank })
    if (success) {
      const rankTitle = getRankTitle(newRank)
      toast({ title: "🏅 Rank updated", description: `Updated to ${rankTitle}` })
      if (rankCoach) {
        setRankCoach({ ...rankCoach, rank: newRank })
      }
    }
  }

  // Delete
  const handleDelete = async () => {
    if (!deletingCoach) return
    const success = await deleteCoach(deletingCoach.id)
    if (success) {
      toast({ title: "Coach removed", description: `${deletingCoach.label} has been removed.` })
      setDeletingCoach(null)
    }
  }

  // Export CSV
  const exportToCSV = () => {
    const headers = ["Name", "Stage", "Rank", "Launch Date", "Clients", "Prospects", "Notes"]
    const rows = filteredCoaches.map(c => [
      c.label,
      COACH_STAGES.find(s => s.id === c.stage)?.label || c.stage,
      getRankTitle(c.rank),
      c.launch_date,
      c.clients_count,
      c.prospects_count,
      c.notes || "",
    ])
    const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v}"`).join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `my-coaches-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="text-sm opacity-80 mb-1">
            My Business &nbsp;›&nbsp; Coach Tracker
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Rocket className="h-7 w-7" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">My Coaches</h1>
                <p className="text-sm opacity-90">
                  Track team development, rank progression, and milestones
                </p>
              </div>
            </div>
            <Button
              onClick={openAddModal}
              className="bg-white text-[hsl(var(--optavia-green))] hover:bg-white/90 font-semibold"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Coach
            </Button>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>
              <strong>Privacy:</strong> Use nicknames only. Contact info should be managed in OPTAVIA&apos;s official coach portal.
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex-1">
        <ErrorBoundary>
          {/* Pipeline Stages */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
            {COACH_STAGES.map((stage) => {
              const count = stats[stage.id === "new_coach" ? "newCoach" : stage.id as keyof typeof stats] as number
              const isActive = filterStage === stage.id
              return (
                <button
                  key={stage.id}
                  onClick={() => setFilterStage(filterStage === stage.id ? "all" : stage.id)}
                  className="rounded-lg border-2 p-3 sm:p-4 text-center transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer"
                  style={{
                    borderColor: isActive ? stage.color : `${stage.color}50`,
                    backgroundColor: isActive ? stage.color : `${stage.color}08`,
                  }}
                >
                  <div className="text-lg sm:text-xl mb-0.5">{stage.icon}</div>
                  <div
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ color: isActive ? "white" : stage.color }}
                  >
                    {count}
                  </div>
                  <div
                    className="text-xs sm:text-sm font-medium mt-0.5 truncate"
                    style={{ color: isActive ? "white" : "#6b7280" }}
                  >
                    {stage.label}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col gap-4 mb-6">
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
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "all" as const, label: "All" },
                  ...COACH_STAGES.map(s => ({ value: s.id as const, label: s.label })),
                ].map(({ value, label }) => (
                  <Button
                    key={value}
                    variant={filterStage === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStage(value)}
                    className={filterStage === value ? "bg-[hsl(var(--optavia-green))]" : ""}
                  >
                    {label}
                  </Button>
                ))}
              </div>

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
            </div>
          </div>

          {/* Coach List */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex gap-4 animate-pulse">
                      <div className="w-14 h-14 bg-gray-200 rounded-xl" />
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-48" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCoaches.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {searchTerm ? "No coaches match your search" : filterStage !== "all" ? "No coaches in this stage" : "No coaches yet"}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {searchTerm
                  ? "Try a different search term"
                  : "Add your first downline coach to start tracking their journey"}
              </p>
              {!searchTerm && filterStage === "all" && (
                <Button onClick={openAddModal} className="bg-[hsl(var(--optavia-green))]">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Your First Coach
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCoaches.map(coach => (
                <CoachCard
                  key={coach.id}
                  coach={coach}
                  onEdit={openEditModal}
                  onRank={(c) => setRankCoach(c)}
                  onCheckIn={handleCheckIn}
                  onMoveStage={handleMoveStage}
                  onDelete={(c) => setDeletingCoach(c)}
                  onUpdateCoach={updateCoach}
                />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>

      <Footer />

      {/* ─── Add/Edit Coach Modal ─── */}
      <Dialog open={showAddModal || !!editingCoach} onOpenChange={(open) => {
        if (!open) { setShowAddModal(false); setEditingCoach(null) }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCoach ? "Edit Coach" : "Add Coach"}</DialogTitle>
            <DialogDescription>
              {editingCoach ? "Update coach details and progress." : "Add a new coach to track their journey."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name / Nickname</Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Coach's name or nickname"
              />
            </div>

            {/* Stage Picker */}
            <div>
              <Label>Stage</Label>
              <div className="grid grid-cols-4 gap-2 mt-1">
                {COACH_STAGES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setFormStage(s.id)}
                    className="p-2 rounded-lg border-2 text-center transition-all cursor-pointer"
                    style={{
                      borderColor: formStage === s.id ? s.color : "#e5e7eb",
                      backgroundColor: formStage === s.id ? `${s.color}10` : "white",
                    }}
                  >
                    <div className="text-lg">{s.icon}</div>
                    <div
                      className="text-[10px] font-bold mt-0.5"
                      style={{ color: formStage === s.id ? s.color : "#6b7280" }}
                    >
                      {s.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rank */}
            <div>
              <Label>OPTAVIA Rank</Label>
              <Select value={String(formRank)} onValueChange={(v) => setFormRank(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPTAVIA_RANKS.map(r => (
                    <SelectItem key={r.rank} value={String(r.rank)}>
                      {r.rank}. {r.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Launch Date */}
            <div>
              <Label>Launch Date</Label>
              <Input
                type="date"
                value={formLaunchDate}
                onChange={(e) => setFormLaunchDate(e.target.value)}
              />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Clients</Label>
                <Input
                  type="number"
                  min={0}
                  value={formClients}
                  onChange={(e) => setFormClients(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Prospects</Label>
                <Input
                  type="number"
                  min={0}
                  value={formProspects}
                  onChange={(e) => setFormProspects(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                placeholder="Add coaching notes, goals, next steps..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAddModal(false); setEditingCoach(null) }}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formName.trim()}
              className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
            >
              {editingCoach ? "Save Changes" : "Add Coach"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Rank Progression Modal ─── */}
      <Dialog open={!!rankCoach} onOpenChange={(open) => { if (!open) setRankCoach(null) }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rank Progression</DialogTitle>
            <DialogDescription>{rankCoach?.label}</DialogDescription>
          </DialogHeader>

          {rankCoach && (
            <div className="space-y-4">
              {/* Current Rank Summary */}
              <div className="rounded-xl bg-[hsl(var(--optavia-green-light))] p-4">
                <div className="font-bold text-[hsl(var(--optavia-green))] text-lg">
                  {getRankTitle(rankCoach.rank)}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Rank {rankCoach.rank} of 15
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden mt-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] transition-all duration-500"
                    style={{ width: `${(rankCoach.rank / 15) * 100}%` }}
                  />
                </div>
              </div>

              {/* Rank List */}
              <div className="max-h-[50vh] overflow-y-auto space-y-0.5">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Update Rank</p>
                {OPTAVIA_RANKS.map(r => {
                  const isCurrent = r.rank === rankCoach.rank
                  const isPast = r.rank < rankCoach.rank
                  return (
                    <button
                      key={r.rank}
                      onClick={() => handleUpdateRank(rankCoach.id, r.rank)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors rounded-lg ${
                        isCurrent
                          ? "bg-[hsl(var(--optavia-green-light))]"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isCurrent
                            ? "bg-[hsl(var(--optavia-green))] text-white"
                            : isPast
                            ? "bg-green-100 text-[hsl(var(--optavia-green))]"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isPast ? "✓" : r.rank}
                      </div>
                      <span
                        className={`flex-1 text-sm ${
                          isCurrent ? "font-bold text-[hsl(var(--optavia-green))]" : "text-gray-800"
                        }`}
                      >
                        {r.title}
                      </span>
                      {isCurrent && (
                        <Badge className="bg-[hsl(var(--optavia-green))]/10 text-[hsl(var(--optavia-green))] text-[10px]">
                          CURRENT
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" className="w-full" onClick={() => setRankCoach(null)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Delete Confirmation ─── */}
      <AlertDialog open={!!deletingCoach} onOpenChange={(open) => { if (!open) setDeletingCoach(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {deletingCoach?.label}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this coach from your tracker. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
