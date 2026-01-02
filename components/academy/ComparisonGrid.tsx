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
    green: "border-[hsl(var(--optavia-green))] bg-[hsl(var(--optavia-green-light))]",
    blue: "border-blue-500 bg-blue-50",
    purple: "border-purple-500 bg-purple-50",
  }

  const labelColors = {
    green: "text-[hsl(var(--optavia-green))]",
    blue: "text-blue-600",
    purple: "text-purple-600",
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      {items.map((item, index) => {
        const color = item.color || (index === 0 ? "green" : "blue")
        return (
          <div key={index} className={`border rounded-xl p-5 ${colorClasses[color]}`}>
            <div className={`font-semibold mb-2 ${labelColors[color]}`}>{item.label}</div>
            <div className="text-sm text-optavia-dark">{item.content}</div>
          </div>
        )
      })}
    </div>
  )
}
