"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useUserData } from "@/contexts/user-data-context"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import {
  X, Plus, Edit, Trash2, ExternalLink,
  ChevronUp, ChevronDown, Eye, EyeOff, Loader2, ArrowLeft
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import type { Database } from "@/lib/supabase/types"

type ClientSupportResource = Database["public"]["Tables"]["client_support_resources"]["Row"]

const CATEGORIES = [
  "Getting Started",
  "Support Systems",
  "Growth",
  "Education",
]

const CATEGORY_COLORS: Record<string, string> = {
  "Getting Started": "#00A651",
  "Support Systems": "#f59e0b",
  "Growth": "#8b5cf6",
  "Education": "#ec4899",
}

export function AdminClientSupportResources() {
  const { user, profile } = useUserData()
  const { toast } = useToast()
  const supabase = createClient()
  const [resources, setResources] = useState<ClientSupportResource[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("📄")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("Getting Started")
  const [color, setColor] = useState("#00A651")
  const [isVideo, setIsVideo] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [resourceToDelete, setResourceToDelete] = useState<ClientSupportResource | null>(null)

  const isAdmin = profile?.user_role?.toLowerCase() === "admin"
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user || !isAdmin) {
      setLoading(false)
      return
    }
    loadResources()
  }, [user, isAdmin])

  const loadResources = async () => {
    const { data, error } = await supabase
      .from("client_support_resources")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true })

    if (error) {
      toast({ title: "Error", description: "Failed to load resources", variant: "destructive" })
    } else {
      setResources(data || [])
    }
    setLoading(false)
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setIcon("📄")
    setUrl("")
    setCategory("Getting Started")
    setColor("#00A651")
    setIsVideo(false)
    setIsActive(true)
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (resource: ClientSupportResource, e?: React.MouseEvent) => {
    e?.stopPropagation()
    e?.preventDefault()
    setTitle(resource.title)
    setDescription(resource.description || "")
    setIcon(resource.icon || "📄")
    setUrl(resource.url)
    setCategory(resource.category)
    setColor(resource.color || "#00A651")
    setIsVideo(resource.is_video)
    setIsActive(resource.is_active)
    setEditingId(resource.id)
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleDeleteClick = (resource: ClientSupportResource, e?: React.MouseEvent) => {
    e?.stopPropagation()
    e?.preventDefault()
    setResourceToDelete(resource)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!resourceToDelete) return
    const { error } = await supabase.from("client_support_resources").delete().eq("id", resourceToDelete.id)
    if (error) {
      toast({ title: "Error", description: "Failed to delete resource", variant: "destructive" })
    } else {
      toast({ title: "Success", description: "Resource deleted" })
      loadResources()
    }
    setDeleteDialogOpen(false)
    setResourceToDelete(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSubmitting(true)

    const categoryResources = resources.filter(r => r.category === category)
    const maxOrder = categoryResources.length > 0
      ? Math.max(...categoryResources.map(r => r.sort_order))
      : 0

    const resourceData = {
      title,
      description: description || null,
      icon,
      url,
      category,
      color,
      is_video: isVideo,
      is_active: isActive,
      sort_order: editingId
        ? resources.find(r => r.id === editingId)?.sort_order || maxOrder + 1
        : maxOrder + 1,
      created_by: user.id,
    }

    let error
    if (editingId) {
      const { error: updateError } = await supabase
        .from("client_support_resources")
        .update(resourceData)
        .eq("id", editingId)
      error = updateError
    } else {
      const { error: insertError } = await supabase.from("client_support_resources").insert(resourceData)
      error = insertError
    }

    if (error) {
      console.error("Resource save error:", error)
      toast({ title: "Error", description: error.message || "Failed to save resource", variant: "destructive" })
      setSubmitting(false)
      return
    }

    toast({ title: "Success", description: `Resource ${editingId ? "updated" : "created"} successfully` })
    resetForm()
    loadResources()
    setSubmitting(false)
  }

  const toggleActive = async (resource: ClientSupportResource) => {
    const { error } = await supabase
      .from("client_support_resources")
      .update({ is_active: !resource.is_active })
      .eq("id", resource.id)
    if (error) {
      toast({ title: "Error", description: "Failed to update resource", variant: "destructive" })
    } else {
      loadResources()
    }
  }

  const reorderResource = async (resourceId: string, direction: "up" | "down") => {
    setSavingOrder(true)
    const resourceToMove = resources.find(r => r.id === resourceId)
    if (!resourceToMove) { setSavingOrder(false); return }

    const categoryResources = resources
      .filter(r => r.category === resourceToMove.category)
      .sort((a, b) => a.sort_order - b.sort_order)

    const currentIndex = categoryResources.findIndex(r => r.id === resourceId)
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= categoryResources.length) { setSavingOrder(false); return }

    const updatedResources = Array.from(categoryResources)
    const [removed] = updatedResources.splice(currentIndex, 1)
    updatedResources.splice(newIndex, 0, removed)

    const updates = updatedResources.map((r, idx) => ({ id: r.id, sort_order: idx + 1 }))
    for (const update of updates) {
      await supabase.from("client_support_resources").update({ sort_order: update.sort_order }).eq("id", update.id)
    }

    toast({ title: "Success", description: "Resource order updated" })
    loadResources()
    setSavingOrder(false)
  }

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) acc[resource.category] = []
    acc[resource.category].push(resource)
    return acc
  }, {} as Record<string, ClientSupportResource[]>)

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-optavia-gray">You do not have permission to access this page.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--optavia-green))] mx-auto"></div>
        <p className="text-optavia-gray mt-4">Loading resources...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Button variant="ghost" size="sm" asChild className="text-optavia-gray hover:bg-gray-100">
          <a href="/client-calendar"><ArrowLeft className="h-4 w-4 mr-1" /> Back</a>
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark">Client Support Resources</h1>
          <p className="text-optavia-gray text-sm mt-1">Manage the master list of documents, videos, and guides shown on the Client Calendar</p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8" ref={formRef}>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-optavia-dark">
                    {editingId ? "Edit Resource" : "Add New Resource"}
                  </CardTitle>
                  <CardDescription className="text-optavia-gray">
                    Add a client support resource that will appear in the Master Resource List
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-optavia-dark">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Red/Yellow/Green Client Support Model"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-optavia-dark">Category *</Label>
                    <Select value={category} onValueChange={(val) => { setCategory(val); setColor(CATEGORY_COLORS[val] || "#00A651") }}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200 shadow-lg">
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-optavia-dark">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of what this resource provides..."
                    rows={2}
                    className="border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-optavia-dark">URL *</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://..."
                      required
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon" className="text-optavia-dark">Icon (emoji)</Label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="📄"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color" className="text-optavia-dark">Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="#00A651"
                        className="border-gray-300 flex-1"
                      />
                      <div className="w-10 h-10 rounded-md border border-gray-300 flex-shrink-0" style={{ background: color }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch id="is_video" checked={isVideo} onCheckedChange={setIsVideo} />
                    <Label htmlFor="is_video" className="text-optavia-dark">Is Video</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
                    <Label htmlFor="is_active" className="text-optavia-dark">Active</Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={submitting} className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]">
                    {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</> : editingId ? "Update Resource" : "Add Resource"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resource List grouped by category */}
      {Object.entries(groupedResources).map(([cat, catResources]) => (
        <div key={cat} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full" style={{ background: CATEGORY_COLORS[cat] || "#6b7280" }} />
            <h2 className="font-heading font-bold text-lg text-optavia-dark uppercase tracking-wide">{cat}</h2>
            <Badge variant="outline" className="text-xs">{catResources.length}</Badge>
          </div>

          <div className="space-y-2">
            {catResources.sort((a, b) => a.sort_order - b.sort_order).map((resource) => (
              <div
                key={resource.id}
                className={`flex items-start gap-4 p-4 bg-white rounded-lg border transition-colors ${resource.is_active ? "border-gray-200" : "border-gray-200 opacity-50"}`}
              >
                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5 flex-shrink-0 mt-1">
                  <button
                    onClick={() => reorderResource(resource.id, "up")}
                    disabled={savingOrder}
                    className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => reorderResource(resource.id, "down")}
                    disabled={savingOrder}
                    className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${resource.color || "#00A651"}15`, border: `1px solid ${resource.color || "#00A651"}30` }}
                >
                  {resource.icon || "📄"}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-optavia-dark">{resource.title}</span>
                    {resource.is_video && (
                      <Badge className="bg-amber-100 text-amber-800 text-[10px] font-bold">VIDEO</Badge>
                    )}
                    {!resource.is_active && (
                      <Badge variant="outline" className="text-[10px] text-gray-400">HIDDEN</Badge>
                    )}
                  </div>
                  {resource.description && (
                    <p className="text-sm text-optavia-gray mt-0.5 line-clamp-2">{resource.description}</p>
                  )}
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {resource.url.length > 60 ? resource.url.slice(0, 60) + "..." : resource.url}
                  </a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => handleEdit(resource, e)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleActive(resource)}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                    title={resource.is_active ? "Hide" : "Show"}
                  >
                    {resource.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(resource, e)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {resources.length === 0 && (
        <div className="text-center py-12 text-optavia-gray">
          <p className="text-lg font-medium">No resources yet</p>
          <p className="text-sm mt-1">Click &quot;Add Resource&quot; to create the first client support resource.</p>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{resourceToDelete?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
