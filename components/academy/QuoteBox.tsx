"use client"

import { ReactNode } from "react"

interface QuoteBoxProps {
  children: ReactNode
  color?: "green" | "yellow" | "blue"
}

export function QuoteBox({ children, color = "green" }: QuoteBoxProps) {
  const borderColors = {
    green: "border-[#00A651] bg-slate-800/30",
    yellow: "border-[#fbbf24] bg-amber-500/5",
    blue: "border-blue-500 bg-blue-500/5"
  }

  return (
    <div className={`border-l-4 rounded-r-xl p-5 md:p-6 my-6 italic ${borderColors[color]}`}>
      {children}
    </div>
  )
}
