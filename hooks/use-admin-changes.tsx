"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface UseAdminChangesOptions {
  onSave?: () => Promise<void>
  storageKeys?: string[] // localStorage keys to clear on save
}

export function useAdminChanges(options: UseAdminChangesOptions = {}) {
  const { toast } = useToast()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [changeCount, setChangeCount] = useState(0)

  // Track a change
  const trackChange = useCallback(() => {
    setHasUnsavedChanges(true)
    setChangeCount(prev => prev + 1)
  }, [])

  // Clear all relevant caches
  const clearCaches = useCallback(() => {
    // Clear specific localStorage keys if provided
    const keysToClean = options.storageKeys || []
    
    // Common cache keys used across the app
    const defaultCacheKeys = [
      "pinnedTools",
      "pinnedResources",
      "training-resources-search-history",
      "resources-search-history",
      "recipes-search-history",
    ]
    
    const allKeys = [...new Set([...keysToClean, ...defaultCacheKeys])]
    
    // Safety check for localStorage availability
    try {
      const testKey = "__cache_clear_test__"
      window.localStorage.setItem(testKey, testKey)
      window.localStorage.removeItem(testKey)
      
      // Clear specified keys
      allKeys.forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch (e) {
          console.warn(`Failed to clear cache key: ${key}`, e)
        }
      })
      
      // Clear any keys that match patterns
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (
          key.includes("-search-history") ||
          key.includes("-cache") ||
          key.includes("_cached")
        )) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch (e) {
          console.warn(`Failed to clear cache key: ${key}`, e)
        }
      })
    } catch (e) {
      console.warn("localStorage not available for cache clearing", e)
    }

    // Clear sessionStorage as well
    try {
      sessionStorage.clear()
    } catch (e) {
      console.warn("sessionStorage not available for cache clearing", e)
    }
  }, [options.storageKeys])

  // Save changes and clear caches
  const saveChanges = useCallback(async () => {
    if (!hasUnsavedChanges) return

    setIsSaving(true)
    try {
      // Call custom save handler if provided
      if (options.onSave) {
        await options.onSave()
      }

      // Clear browser caches
      clearCaches()

      // Reset state
      setHasUnsavedChanges(false)
      setChangeCount(0)

      toast({
        title: "✅ Changes Published!",
        description: "All changes have been saved and caches cleared. Users will see the updates.",
      })
    } catch (error) {
      console.error("Failed to save changes:", error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }, [hasUnsavedChanges, options.onSave, clearCaches, toast])

  // Warn user before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?"
        return e.returnValue
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges])

  return {
    hasUnsavedChanges,
    isSaving,
    changeCount,
    trackChange,
    saveChanges,
    clearCaches,
    resetChanges: () => {
      setHasUnsavedChanges(false)
      setChangeCount(0)
    },
  }
}
