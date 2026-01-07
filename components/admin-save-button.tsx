"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, Loader2, AlertTriangle } from "lucide-react"

interface AdminSaveButtonProps {
  hasUnsavedChanges: boolean
  isSaving: boolean
  changeCount: number
  onSave: () => void
}

export function AdminSaveButton({
  hasUnsavedChanges,
  isSaving,
  changeCount,
  onSave,
}: AdminSaveButtonProps) {
  if (!hasUnsavedChanges) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
      {/* Warning indicator */}
      <div className="bg-amber-100 border border-amber-300 rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <span className="text-sm font-medium text-amber-800">
          {changeCount} unsaved change{changeCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Save button */}
      <Button
        onClick={onSave}
        disabled={isSaving}
        size="lg"
        className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white shadow-lg shadow-green-500/30 px-6"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Save className="h-5 w-5 mr-2" />
            Publish Changes
          </>
        )}
      </Button>
    </div>
  )
}
