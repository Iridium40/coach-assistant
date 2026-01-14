"use client"

import Link from "next/link"
import { GraduationCap, Lock, CheckCircle2, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUserData } from "@/contexts/user-data-context"
import { ACADEMY_MODULES, canAccessModule, getAcademyProgress, getRankDisplayName } from "@/lib/academy-utils"

export function AcademyOverview() {
  const { user, profile, completedResources } = useUserData()

  // Hide for training-only orgs (keeps parity with existing behavior elsewhere)
  const orgId = profile?.org_id ?? 1
  const isTrainingOnly = orgId === 2
  if (isTrainingOnly) return null

  // If not authed yet, keep the section hidden (Training page already has its own loading gate)
  if (!user) return null

  const userRank = profile?.coach_rank || null
  const academyProgress = getAcademyProgress(completedResources)

  return (
    <div className="mb-6 sm:mb-8">
      <Card className="bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] border-0 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-white text-2xl sm:text-3xl font-bold">
                Coach Assistant Academy
              </CardTitle>
              <CardDescription className="text-white/90 text-base sm:text-lg mt-1">
                Structured courses to elevate your coaching career
              </CardDescription>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 bg-white/20 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-sm sm:text-base">
                Academy Progress
              </span>
              <span className="text-white font-bold text-sm sm:text-base">
                {academyProgress.completed} / {academyProgress.total} Modules
              </span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${academyProgress.percentage}%` }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACADEMY_MODULES.map((m) => {
              const moduleNumber = m.id.replace("module-", "")
              const href = `/academy/${m.id}`
              const locked = !canAccessModule(userRank, m.requiredRank || null)
              const isCompleted = completedResources.includes(`academy-resource-${moduleNumber}`)

              return (
                <Link
                  key={m.id}
                  href={locked ? "#" : href}
                  onClick={(e) => locked && e.preventDefault()}
                  className={`block rounded-xl p-4 sm:p-5 transition-all ${
                    locked
                      ? "bg-white/10 cursor-not-allowed opacity-60"
                      : "bg-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        locked ? "bg-white/20" : "bg-[hsl(var(--optavia-green-light))]"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2
                          className={`h-5 w-5 sm:h-6 sm:w-6 ${
                            locked ? "text-white/60" : "text-[hsl(var(--optavia-green))]"
                          }`}
                        />
                      ) : (
                        <span
                          className={`text-base sm:text-lg font-bold ${
                            locked ? "text-white/60" : "text-[hsl(var(--optavia-green))]"
                          }`}
                        >
                          {moduleNumber}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-bold text-sm sm:text-base ${
                            locked ? "text-white/80" : "text-optavia-dark"
                          }`}
                        >
                          {m.title}
                        </h3>
                        {locked && <Lock className="h-4 w-4 text-white/60 flex-shrink-0" />}
                      </div>

                      {m.requiredRank && (
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            locked
                              ? "border-white/30 text-white/70"
                              : "border-[hsl(var(--optavia-green))] text-[hsl(var(--optavia-green))]"
                          }`}
                        >
                          Requires {getRankDisplayName(m.requiredRank)}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {!locked ? (
                    <div className="flex items-center text-[hsl(var(--optavia-green))] text-sm font-semibold mt-2">
                      {isCompleted ? "Review Module" : "Start Module"}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  ) : (
                    <div className="flex items-center text-white/70 text-xs sm:text-sm mt-2">
                      Locked
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

