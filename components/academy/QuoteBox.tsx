"use client"

import { ReactNode } from "react"

interface QuoteBoxProps {
  children: ReactNode
  color?: "green" | "yellow" | "blue"
}

export function QuoteBox({ children, color = "green" }: QuoteBoxProps) {
  const borderColors = {
    green: "border-[hsl(var(--optavia-green))] bg-[hsl(var(--optavia-green-light))]",
    yellow: "border-[#fbbf24] bg-amber-50",
    blue: "border-blue-500 bg-blue-50"
  }

  return (
    <div className={`border-l-4 rounded-r-xl p-5 md:p-6 my-6 italic text-optavia-dark ${borderColors[color]}`}>
      {children}
    </div>
  )
}
