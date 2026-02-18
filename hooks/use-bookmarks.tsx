"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

export type BookmarkSource = "training" | "coach_tool" | "external_resource"

export interface Bookmark {
  id: string
  user_id: string
  resource_id: string
  source: BookmarkSource
  bookmarked_at: string
}

export function useBookmarks(user: User | null) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useMemo(() => createClient(), [])

  const loadBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("user_bookmarks")
        .select("id, user_id, resource_id, source, bookmarked_at")
        .eq("user_id", user.id)

      if (error) {
        console.error("Error loading bookmarks:", error)
        return
      }

      setBookmarks(data || [])
    } catch (err) {
      console.error("Error loading bookmarks:", err)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    loadBookmarks()
  }, [loadBookmarks])

  const isBookmarked = useCallback((resourceId: string, source?: BookmarkSource): boolean => {
    if (source) {
      return bookmarks.some(b => b.resource_id === resourceId && b.source === source)
    }
    return bookmarks.some(b => b.resource_id === resourceId)
  }, [bookmarks])

  const toggleBookmark = useCallback(async (resourceId: string, source: BookmarkSource = "training"): Promise<boolean> => {
    if (!user) return false

    const existing = bookmarks.find(b => b.resource_id === resourceId && b.source === source)

    try {
      if (existing) {
        const { error } = await supabase
          .from("user_bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("resource_id", resourceId)
          .eq("source", source)

        if (error) {
          console.error("Error removing bookmark:", error)
          return false
        }

        setBookmarks(prev => prev.filter(b => !(b.resource_id === resourceId && b.source === source)))
      } else {
        const { data, error } = await supabase
          .from("user_bookmarks")
          .insert({
            user_id: user.id,
            resource_id: resourceId,
            source,
          })
          .select()
          .single()

        if (error) {
          console.error("Error adding bookmark:", error)
          return false
        }

        if (data) {
          setBookmarks(prev => [...prev, data])
        }
      }

      return true
    } catch (err) {
      console.error("Error toggling bookmark:", err)
      return false
    }
  }, [user, bookmarks, supabase])

  const getBookmarkedIds = useCallback((source?: BookmarkSource): string[] => {
    if (source) {
      return bookmarks.filter(b => b.source === source).map(b => b.resource_id)
    }
    return bookmarks.map(b => b.resource_id)
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
