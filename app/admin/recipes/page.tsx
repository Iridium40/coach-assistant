"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminRecipeManager } from "@/components/admin-recipe-manager"
import { useUserData } from "@/contexts/user-data-context"

export default function AdminRecipesPage() {
  const router = useRouter()
  const { user, authLoading, profile } = useUserData()

  const isAdmin = profile?.user_role?.toLowerCase() === "admin"

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.replace("/training")
    }
  }, [user, authLoading, isAdmin, router])

  if (authLoading || !user || !isAdmin) {
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
      <Header activeTab="admin" />
      <main className="flex-1 bg-white">
        <AdminRecipeManager />
      </main>
      <Footer />
    </div>
  )
}

