"use client"

import { getRankGuidance } from "@/lib/coach-rank-guidance"
import { Target, UserCheck } from "lucide-react"

interface CoachRankGuideProps {
  rank: number
}

export function CoachRankGuide({ rank }: CoachRankGuideProps) {
  const guidance = getRankGuidance(rank)

  return (
    <div
      className="rounded-lg p-3 space-y-3"
      style={{
        backgroundColor: guidance.bg,
        borderLeft: `4px solid ${guidance.borderColor}`,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{guidance.emoji}</span>
        <span className="text-sm font-semibold" style={{ color: guidance.color }}>
          {guidance.title}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/60 text-gray-600 font-medium">
          {guidance.tier}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Target className="h-3.5 w-3.5" style={{ color: guidance.color }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: guidance.color }}>
            Coach Focus
          </span>
        </div>
        <ul className="space-y-1">
          {guidance.focusAreas.map((item, i) => (
            <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
              <span className="mt-1 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: guidance.color }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <UserCheck className="h-3.5 w-3.5" style={{ color: guidance.color }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: guidance.color }}>
            Your Actions
          </span>
        </div>
        <ul className="space-y-1">
          {guidance.sponsorActions.map((item, i) => (
            <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
              <span className="mt-1 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: guidance.color }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {guidance.nextRankGoal && (
        <div
          className="text-xs rounded-md p-2 font-medium"
          style={{ backgroundColor: `${guidance.color}10`, color: guidance.color }}
        >
          🎯 <span className="font-semibold">Next Goal:</span> {guidance.nextRankGoal}
        </div>
      )}
    </div>
  )
}
