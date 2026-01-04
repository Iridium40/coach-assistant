"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
      <Link href={getLink()} className="block">
        <Card
          className="p-4 min-w-[140px] hover:shadow-md transition-shadow cursor-pointer border-t-4"
          style={{ borderTopColor: stage.color }}
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

          {/* Preview of items */}
          {stage.items.length > 0 && (
            <div className="mt-3 space-y-1">
              {stage.items.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="text-xs text-gray-500 truncate px-2 py-1 rounded"
                  style={{ backgroundColor: stage.bgColor }}
                >
                  {item.label}
                </div>
              ))}
              {stage.items.length > 3 && (
                <div className="text-xs text-gray-400 text-center">
                  +{stage.items.length - 3} more
                </div>
              )}
            </div>
          )}
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
