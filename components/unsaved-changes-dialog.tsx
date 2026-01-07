"use client"

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
import { AlertTriangle } from "lucide-react"

interface UnsavedChangesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmLeave: () => void
  onSaveAndLeave?: () => void
  changeCount?: number
}

export function UnsavedChangesDialog({
  open,
  onOpenChange,
  onConfirmLeave,
  onSaveAndLeave,
  changeCount = 0,
}: UnsavedChangesDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                Unsaved Changes
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                You have {changeCount} unsaved {changeCount === 1 ? "change" : "changes"}. 
                Are you sure you want to leave? Your changes will be lost.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-2 sm:gap-2">
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300">
            Stay on Page
          </AlertDialogCancel>
          {onSaveAndLeave && (
            <AlertDialogAction
              onClick={onSaveAndLeave}
              className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
            >
              Save & Leave
            </AlertDialogAction>
          )}
          <AlertDialogAction
            onClick={onConfirmLeave}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Leave Without Saving
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
