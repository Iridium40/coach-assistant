"use client"

import { useEffect, useMemo, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ModuleDetail } from "@/components/module-detail"
import { useAuth } from "@/hooks/use-auth"
import { useSupabaseData } from "@/hooks/use-supabase-data"
import { modules } from "@/lib/data"
import type { UserData } from "@/lib/types"

export default function TrainingModulePage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = params?.id as string
  const { user, loading: authLoading } = useAuth()
  const {
    profile,
    completedResources,
    bookmarks,
    favoriteRecipes,
    loading: dataLoading,
  } = useSupabaseData(user)

  // Find the module by ID
  const module = useMemo(() => {
    return modules.find((m) => m.id === moduleId)
  }, [moduleId])

  // Convert Supabase data to UserData format - memoize to prevent unnecessary re-renders
  const userData = useMemo(() => {
    return profile
      ? {
          isNewCoach: profile.is_new_coach,
          completedResources,
          bookmarks,
          favoriteRecipes,
          createdAt: profile.created_at,
        }
      : null
  }, [profile, completedResources, bookmarks, favoriteRecipes])

  // Memoize setUserData to prevent re-renders (no-op function for this page)
  const handleSetUserData = useCallback((data: UserData) => {
    // No-op: user data updates are handled by useSupabaseData hook
  }, [])

  // Handle back navigation
  const handleBack = useCallback(() => {
    router.push("/training")
  }, [router])

  useEffect(() => {
    if (authLoading || dataLoading) return

    if (!user) {
      router.replace("/login")
      return
    }

    // If module not found, redirect to training page
    if (!module) {
      router.replace("/training")
      return
    }
  }, [user, module, authLoading, dataLoading, router])

  // Show loading state while auth or data is loading, or if user exists but profile hasn't been created yet
  if (authLoading || dataLoading || (user && !profile)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if no user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Redirecting...</p>
        </div>
      </div>
    )
  }

  // If no userData or module not found, show loading (will redirect)
  if (!userData || !module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="training" />
      <main className="flex-1 bg-white">
        <ModuleDetail
          module={module}
          userData={userData}
          setUserData={handleSetUserData}
          onBack={handleBack}
        />
      </main>
      <Footer />
    </div>
  )
}

