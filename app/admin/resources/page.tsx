"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminResources } from "@/components/admin-resources"
import { useUserData } from "@/contexts/user-data-context"

export default function AdminResourcesPage() {
  const router = useRouter()
  const { authLoading, profile } = useUserData()

  const isAdmin = profile?.user_role?.toLowerCase() === "admin"

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.replace("/resources")
    }
  }, [authLoading, isAdmin, router])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
          <p className="text-optavia-gray">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="resources" />
      <main className="flex-1 bg-white">
        <AdminResources />
      </main>
      <Footer />
    </div>
  )
}
