"use client"

import { useState } from "react"
import Link from "next/link"
import { useProspects, statusConfig, sourceOptions, actionTypeLabels, type ProspectStatus, type ProspectSource } from "@/hooks/use-prospects"
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
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Edit2,
  X,
  ArrowRight,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProspectTrackerPage() {
  const {
    prospects,
    loading,
    stats,
    addProspect,
    updateProspect,
    deleteProspect,
    logAction,
    getFilteredProspects,
    getDaysUntil,
  } = useProspects()

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProspect, setEditingProspect] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState<ProspectStatus | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [newProspect, setNewProspect] = useState({
    label: "",
    source: "social" as ProspectSource,
    notes: "",
  })

  const today = new Date().toISOString().split("T")[0]

  const handleAddProspect = async () => {
    if (!newProspect.label.trim()) return
    await addProspect(newProspect)
    setNewProspect({ label: "", source: "social", notes: "" })
    setShowAddModal(false)
  }

  const handleUpdateStatus = async (id: string, newStatus: ProspectStatus) => {
    await updateProspect(id, { status: newStatus })
  }

  const handleLogAction = async (id: string) => {
    await logAction(id, 3)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Remove this prospect?")) {
      await deleteProspect(id)
    }
  }

  const filteredProspects = getFilteredProspects(filterStatus, searchTerm)

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
                <span className="font-semibold">Prospect Tracker</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <Users className="h-8 w-8" />
                Prospect Tracker
              </h1>
              <p className="text-sm opacity-90 mt-1">
                Track your 100s list with privacy-first labels
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/client-tracker">
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Users className="h-4 w-4 mr-2" />
                  My Clients
                </Button>
              </Link>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-white text-[hsl(var(--optavia-green))] hover:bg-white/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Prospect
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>
              <strong>Privacy:</strong> Use nicknames only. Contact info should be managed in OPTAVIA's official coach portal.
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-[hsl(var(--optavia-green))]">{stats.total}</div>
              <div className="text-sm text-gray-500">Active Prospects</div>
            </CardContent>
          </Card>
          <Card className={stats.overdue > 0 ? "border-orange-300 bg-orange-50" : ""}>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-orange-500">{stats.overdue}</div>
              <div className="text-sm text-gray-500">Overdue</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-blue-500">{stats.inProgress}</div>
              <div className="text-sm text-gray-500">In Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.converted}</div>
              <div className="text-sm text-gray-500">Converted</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by label..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "cold", "warm", "ha_scheduled", "ha_done", "converted", "not_interested"] as const).map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className={filterStatus === status ? "bg-[hsl(var(--optavia-green))]" : ""}
                  >
                    {status === "all" ? "All" : statusConfig[status as ProspectStatus]?.label || status}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prospect List */}
        <div className="space-y-3">
          {filteredProspects.map((prospect) => {
            const config = statusConfig[prospect.status]
            const daysUntil = getDaysUntil(prospect.next_action)
            const isOverdue = daysUntil !== null && daysUntil < 0

            return (
              <Card
                key={prospect.id}
                className={`transition-shadow hover:shadow-md ${
                  isOverdue ? "border-orange-300 bg-orange-50" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Status Icon & Label */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: config.bg }}
                      >
                        {config.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{prospect.label}</span>
                          <Badge
                            variant="secondary"
                            style={{ backgroundColor: config.bg, color: config.color }}
                          >
                            {config.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span>{sourceOptions.find(s => s.value === prospect.source)?.label}</span>
                          {prospect.action_type && (
                            <span className="flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              {actionTypeLabels[prospect.action_type]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Next Action Date */}
                    {prospect.next_action && (
                      <div className="flex items-center gap-2">
                        {isOverdue ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {Math.abs(daysUntil!)} days overdue
                          </Badge>
                        ) : daysUntil === 0 ? (
                          <Badge className="bg-blue-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Today
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            In {daysUntil} days
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Select
                        value={prospect.status}
                        onValueChange={(value) => handleUpdateStatus(prospect.id, value as ProspectStatus)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value.icon} {value.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleLogAction(prospect.id)}
                        title="Log Action"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingProspect(prospect)
                          setShowEditModal(true)
                        }}
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(prospect.id)}
                        title="Delete"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {prospect.notes && (
                    <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                      📝 {prospect.notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}

          {filteredProspects.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No prospects found</p>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Prospect
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Prospect</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Label / Nickname *</Label>
              <Input
                value={newProspect.label}
                onChange={(e) => setNewProspect({ ...newProspect, label: e.target.value })}
                placeholder="e.g., Gym Sarah, Coffee shop mom"
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-1">
                A name you'll recognize (no contact info needed)
              </p>
            </div>
            <div>
              <Label>How did you meet?</Label>
              <Select
                value={newProspect.source}
                onValueChange={(value) => setNewProspect({ ...newProspect, source: value as ProspectSource })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes (optional)</Label>
              <Textarea
                value={newProspect.notes}
                onChange={(e) => setNewProspect({ ...newProspect, notes: e.target.value })}
                placeholder="Any helpful context..."
              />
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700 flex items-start gap-2">
              <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>Your contact info stays in OPTAVIA's portal. This is just for your tracking!</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProspect}
              disabled={!newProspect.label.trim()}
              className="bg-[hsl(var(--optavia-green))]"
            >
              Add Prospect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Prospect</DialogTitle>
          </DialogHeader>
          {editingProspect && (
            <div className="space-y-4">
              <div>
                <Label>Label / Nickname</Label>
                <Input
                  value={editingProspect.label}
                  onChange={(e) => setEditingProspect({ ...editingProspect, label: e.target.value })}
                  maxLength={50}
                />
              </div>
              <div>
                <Label>Source</Label>
                <Select
                  value={editingProspect.source}
                  onValueChange={(value) => setEditingProspect({ ...editingProspect, source: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceOptions.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={editingProspect.notes || ""}
                  onChange={(e) => setEditingProspect({ ...editingProspect, notes: e.target.value })}
                />
              </div>
              <div>
                <Label>Next Action Date</Label>
                <Input
                  type="date"
                  value={editingProspect.next_action || ""}
                  onChange={(e) => setEditingProspect({ ...editingProspect, next_action: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await updateProspect(editingProspect.id, {
                  label: editingProspect.label,
                  source: editingProspect.source,
                  notes: editingProspect.notes,
                  next_action: editingProspect.next_action,
                })
                setShowEditModal(false)
                setEditingProspect(null)
              }}
              className="bg-[hsl(var(--optavia-green))]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
