"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserData } from "@/contexts/user-data-context"
import { canAccessModule, getAcademyModuleNav, getRankDisplayName } from "@/lib/academy-utils"
import { createClient } from "@/lib/supabase/client"
import type { Module } from "@/lib/types"

// Import module content components (will be created)
import { Module1Content } from "@/components/academy/module-1-content"
import { Module2Content } from "@/components/academy/module-2-content"
import { Module3Content } from "@/components/academy/module-3-content"
import { Module4Content } from "@/components/academy/module-4-content"
import { Module5Content } from "@/components/academy/module-5-content"
import { Module6Content } from "@/components/academy/module-6-content"

export default function AcademyModulePage() {
  const params = useParams()
  const router = useRouter()
  const { profile, authLoading } = useUserData()
  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [moduleContent, setModuleContent] = useState<JSX.Element | null>(null)

  const moduleId = params?.['module-id'] as string

  useEffect(() => {
    if (!moduleId) return

    loadModule()
  }, [moduleId])

  const loadModule = async () => {
    setLoading(true)
    const supabase = createClient()

    // Find the module from modules table
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .eq("id", `academy-${moduleId}`)
      .single()

    if (error || !data) {
      console.error("Error loading module:", error)
      setLoading(false)
      return
    }

    const loadedModule: Module = {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category as Module["category"],
      order: data.sort_order,
      forNewCoach: data.for_new_coach,
      icon: data.icon,
      resources: [], // Resources loaded separately if needed
      required_rank: (data as any).required_rank || null,
    }

    setModule(loadedModule)
    setLoading(false)

    // Set module content based on module ID
    switch (moduleId) {
      case "module-1":
        setModuleContent(<Module1Content />)
        break
      case "module-2":
        setModuleContent(<Module2Content />)
        break
      case "module-3":
        setModuleContent(<Module3Content />)
        break
      case "module-4":
        setModuleContent(<Module4Content />)
        break
      case "module-5":
        setModuleContent(<Module5Content />)
        break
      case "module-6":
        setModuleContent(<Module6Content />)
        break
      default:
        setModuleContent(null)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00c760] mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <p className="text-slate-400 mb-6">The requested module could not be found.</p>
          <Link href="/training">
            <Button className="bg-[#00A651] hover:bg-[#00c760]">Back to Training</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Check access control
  const userRank = profile?.coach_rank || null
  const canAccess = canAccessModule(userRank, module.required_rank || null)

  if (!canAccess) {
    const nav = getAcademyModuleNav(moduleId, userRank)
    const requiredRankDisplay = getRankDisplayName(module.required_rank || "Unknown")

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        {/* Navigation */}
        <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
          <div className="container max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/training" className="flex items-center gap-2 text-slate-400 hover:text-[#00c760] transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Training</span>
            </Link>
          </div>
        </nav>

        {/* Locked Content */}
        <div className="container max-w-4xl mx-auto px-6 py-16">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-10 w-10 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
            <p className="text-xl text-slate-400 mb-8">{module.description}</p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-lg mb-2">
                You must achieve <strong className="text-amber-400">{requiredRankDisplay}</strong> rank to access this module.
              </p>
              <p className="text-slate-400">
                {nav.prev ? (
                  <>Complete the previous module and achieve the required rank to unlock this content.</>
                ) : (
                  <>Work on achieving the required rank to unlock this training module.</>
                )}
              </p>
            </div>
            <div className="mt-8">
              <Link href="/training">
                <Button className="bg-[#00A651] hover:bg-[#00c760]">Back to Training</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const nav = getAcademyModuleNav(moduleId, userRank)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/training" className="flex items-center gap-2 text-slate-400 hover:text-[#00c760] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>All Modules</span>
          </Link>
        </div>
      </nav>

      {/* Module Header */}
      <header className="container max-w-4xl mx-auto px-6 py-12">
        <div className="inline-flex items-center gap-2 bg-[#00A651]/15 border border-[#00A651]/30 text-[#00c760] px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <span>Module {moduleId.split('-')[1]}</span>
          {module.required_rank && (
            <>
              <span>•</span>
              <span>{getRankDisplayName(module.required_rank)}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          {module.title}
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl">{module.description}</p>
      </header>

      {/* Module Content */}
      <div className="container max-w-4xl mx-auto px-6 pb-16">
        {moduleContent}
      </div>

      {/* Navigation Footer */}
      <div className="container max-w-4xl mx-auto px-6 pb-12">
        <div className="flex justify-between gap-4 pt-8 border-t border-slate-700">
          {nav.prev ? (
            <Link href={nav.prev}>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                ← Previous Module
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {nav.next ? (
            nav.canAccessNext ? (
              <Link href={nav.next}>
                <Button className="bg-[#00A651] hover:bg-[#00c760]">
                  Next Module →
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col items-end">
                <Button disabled className="bg-slate-700 text-slate-400 cursor-not-allowed">
                  Next Module →
                </Button>
                <p className="text-xs text-slate-500 mt-2">
                  Requires {getRankDisplayName(nav.nextRequiredRank || "")} rank
                </p>
              </div>
            )
          ) : (
            moduleId === "module-6" && (
              <Link href="/training">
                <Button className="bg-[#00A651] hover:bg-[#00c760]">
                  ✓ Complete Training Guide
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}
