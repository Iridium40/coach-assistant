"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface UseAdminChangesOptions {
  onSave?: () => Promise<void>
  storageKeys?: string[] // localStorage keys to clear on save
}

export function useAdminChanges(options: UseAdminChangesOptions = {}) {
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [changeCount, setChangeCount] = useState(0)
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)
  const pendingNavigation = useRef<string | null>(null)

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

  // Warn user before leaving page (browser close/refresh) - native dialog is unavoidable here
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

  // Intercept link clicks for in-app navigation
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      
      if (!anchor) return
      
      const href = anchor.getAttribute("href")
      if (!href) return
      
      // Check if it's an internal navigation link
      const isInternal = href.startsWith("/") || href.startsWith(window.location.origin)
      const isSamePageAnchor = href.startsWith("#")
      const isExternal = anchor.getAttribute("target") === "_blank"
      
      if (isInternal && !isSamePageAnchor && !isExternal && href !== pathname) {
        e.preventDefault()
        e.stopPropagation()
        pendingNavigation.current = href
        setShowLeaveDialog(true)
      }
    }

    // Capture phase to intercept before navigation happens
    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [hasUnsavedChanges, pathname])

  // Handle confirmed leave
  const confirmLeave = useCallback(() => {
    setShowLeaveDialog(false)
    setHasUnsavedChanges(false)
    setChangeCount(0)
    
    if (pendingNavigation.current) {
      router.push(pendingNavigation.current)
      pendingNavigation.current = null
    }
  }, [router])

  // Handle save and leave
  const saveAndLeave = useCallback(async () => {
    await saveChanges()
    setShowLeaveDialog(false)
    
    if (pendingNavigation.current) {
      router.push(pendingNavigation.current)
      pendingNavigation.current = null
    }
  }, [saveChanges, router])

  // Cancel leaving
  const cancelLeave = useCallback(() => {
    setShowLeaveDialog(false)
    pendingNavigation.current = null
  }, [])

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
    // Dialog controls for in-app navigation
    showLeaveDialog,
    setShowLeaveDialog,
    confirmLeave,
    saveAndLeave,
    cancelLeave,
  }
}
