"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import type { PipelineStage as PipelineStageType } from "@/hooks/use-pipeline"

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

  return (
    <div className="flex items-center">
      <Link href={getLink()} className="block group">
        <Card
          className="p-4 min-w-[120px] hover:shadow-lg transition-all cursor-pointer border-2 group-hover:scale-105"
          style={{ borderColor: stage.color }}
        >
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
