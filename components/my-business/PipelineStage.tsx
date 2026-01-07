"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ChevronRight, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { PipelineStage as PipelineStageType } from "@/hooks/use-pipeline"

// Stage descriptions for the info popups
const STAGE_DESCRIPTIONS: Record<string, { title: string; description: string }> = {
  new: {
    title: "New Prospects",
    description: "People you've just added to your 100's list. These are initial contacts who haven't yet been reached out to or qualified.",
  },
  interested: {
    title: "Interested",
    description: "Contacts who have shown interest in learning more about OPTAVIA. They've engaged with you and are considering the program.",
  },
  ha_scheduled: {
    title: "HA Scheduled",
    description: "Prospects who have a Health Assessment scheduled. This is a key conversion step - they're ready to learn their personalized health plan!",
  },
  client: {
    title: "Active Clients",
    description: "People who have started their OPTAVIA journey. They're actively on the program and working toward their health goals.",
  },
  coach_prospect: {
    title: "Future Coaches",
    description: "Clients who show potential and interest in becoming OPTAVIA coaches. They could be your future team members!",
  },
}

interface PipelineStageProps {
  stage: PipelineStageType
  isFirst?: boolean
  isLast?: boolean
}

export function PipelineStage({ stage, isFirst, isLast }: PipelineStageProps) {
  // Determine link based on stage
  const getLink = () => {
    if (stage.id === "client" || stage.id === "coach_prospect") {
      return "/client-tracker"
    }
    return `/prospect-tracker?status=${stage.id}`
  }

  const stageInfo = STAGE_DESCRIPTIONS[stage.id]

  return (
    <div className="flex items-center">
      <Link href={getLink()} className="block group">
        <Card
          className="p-4 min-w-[120px] hover:shadow-lg transition-all cursor-pointer border-2 group-hover:scale-105 relative"
          style={{ borderColor: stage.color }}
        >
          {/* Info icon in top-left corner */}
          {stageInfo && (
            <div 
              className="absolute top-1 left-1" 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      type="button"
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      <Info className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    align="start"
                    className="max-w-[220px] p-3 bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 z-50"
                  >
                    <p className="font-semibold text-gray-700 mb-1">{stageInfo.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {stageInfo.description}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <div className="text-center">
            <div className="text-2xl mb-1">{stage.icon}</div>
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: stage.color }}
            >
              {stage.count}
            </div>
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              {stage.label}
            </div>
          </div>

          {/* Click hint on hover */}
          <div className="mt-2 text-[10px] text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view
          </div>
        </Card>
      </Link>

      {/* Arrow between stages */}
      {!isLast && (
        <div className="px-2 text-gray-300">
          <ChevronRight className="h-6 w-6" />
        </div>
      )}
    </div>
  )
}
