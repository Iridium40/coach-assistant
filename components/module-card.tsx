"use client"

import { memo, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/progress-bar"
import { Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { getRankDisplayName } from "@/lib/academy-utils"
import type { Module, UserData } from "@/lib/types"

interface ModuleCardProps {
  module: Module
  userData: UserData
  onClick: () => void
  isLocked?: boolean
  requiredRank?: string | null
}

export const ModuleCard = memo(function ModuleCard({ module, userData, onClick, isLocked = false, requiredRank = null }: ModuleCardProps) {
  const completedCount = useMemo(() => 
    module.resources.filter((resource) => userData.completedResources.includes(resource.id)).length,
    [module.resources, userData.completedResources]
  )

  const progress = useMemo(() => 
    module.resources.length > 0 ? Math.round((completedCount / module.resources.length) * 100) : 0,
    [module.resources.length, completedCount]
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={`p-4 sm:p-6 transition-shadow border border-optavia-border relative ${
            isLocked 
              ? "opacity-60 cursor-not-allowed bg-gray-50" 
              : "hover:shadow-lg cursor-pointer"
          }`}
          onClick={onClick}
        >
          {isLocked && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-gray-200 rounded-full p-1.5">
                <Lock className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-2 sm:gap-3 mb-3">
            <span className="text-2xl sm:text-3xl flex-shrink-0">{module.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className={`font-heading font-bold text-base sm:text-lg mb-1 break-words ${
                isLocked ? "text-gray-500" : "text-optavia-dark"
              }`}>
                {module.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-[hsl(var(--optavia-green-light))] text-[hsl(var(--optavia-green))]">
                  {module.category}
                </Badge>
                {isLocked && (
                  <Badge variant="outline" className="border-gray-400 text-gray-600 text-xs">
                    Locked
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <p className={`text-sm mb-4 ${isLocked ? "text-gray-400" : "text-optavia-gray"}`}>
            {module.description}
          </p>

          {isLocked && requiredRank && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-4">
              <p className="text-xs text-amber-800">
                <strong>Requires:</strong> {getRankDisplayName(requiredRank)}
              </p>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${isLocked ? "text-gray-400" : "text-optavia-gray"}`}>
                Progress
              </span>
              <span className={`text-sm font-bold ${
                isLocked ? "text-gray-500" : "text-[hsl(var(--optavia-green))]"
              }`}>
                {progress}%
              </span>
            </div>
            <ProgressBar progress={progress} />
            <p className={`text-xs mt-1 ${isLocked ? "text-gray-400" : "text-optavia-light-gray"}`}>
              {completedCount} of {module.resources.length} completed
            </p>
          </div>
        </Card>
      </TooltipTrigger>
      {isLocked && requiredRank && (
        <TooltipContent>
          <p>Requires {getRankDisplayName(requiredRank)} rank to access</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
})
