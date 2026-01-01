"use client"

import { ReactNode } from "react"

interface ComparisonItem {
  label: string
  content: ReactNode
  color?: "green" | "blue" | "purple"
}

interface ComparisonGridProps {
  items: ComparisonItem[]
}

export function ComparisonGrid({ items }: ComparisonGridProps) {
  const colorClasses = {
    green: "border-[#00A651]/30 bg-[#00A651]/5",
    blue: "border-blue-500/30 bg-blue-500/5",
    purple: "border-purple-500/30 bg-purple-500/5",
  }

  const labelColors = {
    green: "text-[#00c760]",
    blue: "text-blue-400",
    purple: "text-purple-400",
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      {items.map((item, index) => {
        const color = item.color || (index === 0 ? "green" : "blue")
        return (
          <div key={index} className={`border rounded-xl p-5 ${colorClasses[color]}`}>
            <div className={`font-semibold mb-2 ${labelColors[color]}`}>{item.label}</div>
            <div className="text-sm text-slate-300">{item.content}</div>
          </div>
        )
      })}
    </div>
  )
}
