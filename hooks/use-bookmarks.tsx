"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

export interface Bookmark {
  id: string
  user_id: string
  resource_id: string
  bookmarked_at: string
}

export function useBookmarks(user: User | null) {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Load user's bookmarks
  const loadBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks(new Set())
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("user_bookmarks")
        .select("resource_id")
        .eq("user_id", user.id)

      if (error) {
        console.error("Error loading bookmarks:", error)
        return
      }

      const bookmarkSet = new Set(data?.map((b) => b.resource_id) || [])
      setBookmarks(bookmarkSet)
    } catch (err) {
      console.error("Error loading bookmarks:", err)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  // Initial load
  useEffect(() => {
    loadBookmarks()
  }, [loadBookmarks])

  // Check if a resource is bookmarked
  const isBookmarked = useCallback((resourceId: string): boolean => {
    return bookmarks.has(resourceId)
  }, [bookmarks])

  // Toggle bookmark status
  const toggleBookmark = useCallback(async (resourceId: string): Promise<boolean> => {
    if (!user) return false

    const wasBookmarked = bookmarks.has(resourceId)

    try {
      if (wasBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from("user_bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("resource_id", resourceId)

        if (error) {
          console.error("Error removing bookmark:", error)
          return false
        }

        // Optimistic update
        setBookmarks((prev) => {
          const newSet = new Set(prev)
          newSet.delete(resourceId)
          return newSet
        })
      } else {
        // Add bookmark
        const { error } = await supabase
          .from("user_bookmarks")
          .insert({
            user_id: user.id,
            resource_id: resourceId,
          })

        if (error) {
          console.error("Error adding bookmark:", error)
          return false
        }

        // Optimistic update
        setBookmarks((prev) => {
          const newSet = new Set(prev)
          newSet.add(resourceId)
          return newSet
        })
      }

      return true
    } catch (err) {
      console.error("Error toggling bookmark:", err)
      return false
    }
  }, [user, bookmarks, supabase])

  // Get all bookmarked resource IDs
  const getBookmarkedIds = useCallback((): string[] => {
    return Array.from(bookmarks)
  }, [bookmarks])

  return {
    bookmarks,
    loading,
    isBookmarked,
    toggleBookmark,
    getBookmarkedIds,
    refresh: loadBookmarks,
  }
}
