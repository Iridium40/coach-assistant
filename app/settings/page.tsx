"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserSettings } from "@/components/user-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { ZoomSettings } from "@/components/zoom-settings"
import { useUserData } from "@/contexts/user-data-context"
import { User, BellRing, Video } from "lucide-react"

type SettingsTab = "profile" | "notifications" | "zoom"

function SettingsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, authLoading, profile } = useUserData()

  const tabParam = searchParams.get("tab") as SettingsTab | null
  const [activeTab, setActiveTab] = useState<SettingsTab>(tabParam || "profile")

  const isTrainingOnly = (profile?.org_id ?? 1) === 2

  useEffect(() => {
    if (tabParam && ["profile", "notifications", "zoom"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login")
    }
  }, [authLoading, user, router])

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab)
    router.replace(`/settings?tab=${tab}`, { scroll: false })
  }

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

  const tabs = [
    { id: "profile" as SettingsTab, label: "Profile", icon: User },
    { id: "notifications" as SettingsTab, label: "Notifications", icon: BellRing },
    ...(!isTrainingOnly ? [{ id: "zoom" as SettingsTab, label: "Zoom Room", icon: Video }] : []),
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header activeTab="training" />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-6">
            My Settings
          </h1>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-1 -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-[hsl(var(--optavia-green))] text-[hsl(var(--optavia-green))]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <UserSettings onClose={() => router.push("/dashboard")} />
          )}
          {activeTab === "notifications" && (
            <NotificationSettings />
          )}
          {activeTab === "zoom" && !isTrainingOnly && (
            <ZoomSettings onClose={() => handleTabChange("profile")} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))] mx-auto mb-4"></div>
            <p className="text-optavia-gray">Loading...</p>
          </div>
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  )
}
