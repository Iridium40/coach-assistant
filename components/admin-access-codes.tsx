"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useUserData } from "@/contexts/user-data-context"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Plus, Trash2, Copy, Check, ShieldCheck, Loader2, ArrowLeft,
} from "lucide-react"

interface AccessCode {
  id: string
  code: string
  label: string | null
  is_active: boolean
  max_uses: number | null
  times_used: number
  created_by: string | null
  created_at: string
  expires_at: string | null
}

export function AdminAccessCodes({ onClose }: { onClose?: () => void }) {
  const { user, profile } = useUserData()
  const { toast } = useToast()
  const supabase = createClient()
  const [codes, setCodes] = useState<AccessCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [newCode, setNewCode] = useState("")
  const [newLabel, setNewLabel] = useState("")
  const [newMaxUses, setNewMaxUses] = useState("")
  const [newExpiresAt, setNewExpiresAt] = useState("")

  const isAdmin = profile?.user_role?.toLowerCase() === "admin"

  const fetchCodes = useCallback(async () => {
    const { data, error } = await supabase
      .from("signup_access_codes")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setCodes(data)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    if (isAdmin) fetchCodes()
  }, [isAdmin, fetchCodes])

  const generateCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let code = ""
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewCode(code)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCode.trim()) {
      toast({ title: "Required", description: "Please enter or generate a code.", variant: "destructive" })
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from("signup_access_codes")
      .insert({
        code: newCode.trim().toUpperCase(),
        label: newLabel.trim() || null,
        max_uses: newMaxUses ? parseInt(newMaxUses) : null,
        expires_at: newExpiresAt || null,
        created_by: user?.id || null,
      })

    if (error) {
      toast({
        title: "Error",
        description: error.message.includes("duplicate") ? "This code already exists." : error.message,
        variant: "destructive",
      })
    } else {
      toast({ title: "Access Code Created", description: `Code "${newCode.toUpperCase()}" is now active.` })
      setNewCode("")
      setNewLabel("")
      setNewMaxUses("")
      setNewExpiresAt("")
      setShowForm(false)
      fetchCodes()
    }
    setSubmitting(false)
  }

  const toggleActive = async (id: string, currentlyActive: boolean) => {
    const { error } = await supabase
      .from("signup_access_codes")
      .update({ is_active: !currentlyActive })
      .eq("id", id)

    if (!error) {
      setCodes(prev => prev.map(c => c.id === id ? { ...c, is_active: !currentlyActive } : c))
      toast({ title: currentlyActive ? "Code Deactivated" : "Code Activated" })
    }
  }

  const deleteCode = async (id: string, code: string) => {
    if (!confirm(`Delete access code "${code}"? This cannot be undone.`)) return

    const { error } = await supabase
      .from("signup_access_codes")
      .delete()
      .eq("id", id)

    if (!error) {
      setCodes(prev => prev.filter(c => c.id !== id))
      toast({ title: "Code Deleted" })
    }
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-white border border-gray-200">
          <CardContent className="pt-6 text-center">
            <p className="text-optavia-gray">You don&apos;t have permission to manage access codes.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-heading font-bold text-optavia-dark flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[hsl(var(--optavia-green))]" />
              Signup Access Codes
            </h1>
            <p className="text-sm text-optavia-gray mt-0.5">
              Manage codes that new users need to create an account
            </p>
          </div>
        </div>
        <Button
          onClick={() => { setShowForm(true); generateCode() }}
          className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Code
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-optavia-dark">Create Access Code</CardTitle>
            <CardDescription className="text-optavia-gray">
              Generate a code that users will enter during sign-up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-optavia-dark">Code</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                      placeholder="ACCESS123"
                      required
                      className="bg-white border-gray-300 text-optavia-dark uppercase tracking-wider font-mono"
                    />
                    <Button type="button" variant="outline" onClick={generateCode} className="shrink-0">
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-optavia-dark">Label (optional)</Label>
                  <Input
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="e.g. Spring 2026 Cohort"
                    className="bg-white border-gray-300 text-optavia-dark"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-optavia-dark">Max Uses (optional)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newMaxUses}
                    onChange={(e) => setNewMaxUses(e.target.value)}
                    placeholder="Unlimited"
                    className="bg-white border-gray-300 text-optavia-dark"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-optavia-dark">Expires (optional)</Label>
                  <Input
                    type="datetime-local"
                    value={newExpiresAt}
                    onChange={(e) => setNewExpiresAt(e.target.value)}
                    className="bg-white border-gray-300 text-optavia-dark"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                >
                  {submitting ? <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Creating...</> : "Create Code"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Codes List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-3"></div>
          <p className="text-sm text-optavia-gray">Loading access codes...</p>
        </div>
      ) : codes.length === 0 ? (
        <Card className="bg-white border border-gray-200">
          <CardContent className="py-12 text-center">
            <ShieldCheck className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-optavia-gray">No access codes yet. Create one to allow new users to sign up.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {codes.map((code) => {
            const isExpired = code.expires_at && new Date(code.expires_at) < new Date()
            const isMaxed = code.max_uses !== null && code.times_used >= code.max_uses
            const effectivelyActive = code.is_active && !isExpired && !isMaxed

            return (
              <Card key={code.id} className={`bg-white border shadow-sm transition-opacity ${effectivelyActive ? "border-gray-200" : "border-gray-200 opacity-60"}`}>
                <CardContent className="py-4 px-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => copyCode(code.code, code.id)}
                        className="font-mono text-lg font-bold tracking-wider text-optavia-dark hover:text-[hsl(var(--optavia-green))] transition-colors flex items-center gap-1.5 shrink-0"
                        title="Copy code"
                      >
                        {code.code}
                        {copiedId === code.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-gray-400" />
                        )}
                      </button>
                      {code.label && (
                        <span className="text-sm text-optavia-gray truncate">{code.label}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="outline" className={`text-xs ${effectivelyActive ? "border-green-300 text-green-700 bg-green-50" : "border-gray-300 text-gray-500"}`}>
                        {!code.is_active ? "Inactive" : isExpired ? "Expired" : isMaxed ? "Maxed Out" : "Active"}
                      </Badge>

                      <span className="text-xs text-optavia-gray whitespace-nowrap">
                        {code.times_used}{code.max_uses !== null ? `/${code.max_uses}` : ""} uses
                      </span>

                      {code.expires_at && (
                        <span className="text-xs text-optavia-gray whitespace-nowrap">
                          Exp: {new Date(code.expires_at).toLocaleDateString()}
                        </span>
                      )}

                      <Switch
                        checked={code.is_active}
                        onCheckedChange={() => toggleActive(code.id, code.is_active)}
                        className="data-[state=checked]:bg-[hsl(var(--optavia-green))]"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCode(code.id, code.code)}
                        className="text-gray-400 hover:text-red-500 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
