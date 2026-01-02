"use client"

import { ReactNode } from "react"

interface RequirementBoxProps {
  title: string
  children: ReactNode
  highlight?: boolean
}

export function RequirementBox({ title, children, highlight = false }: RequirementBoxProps) {
  return (
    <div
      className={`border rounded-xl p-6 my-4 ${
        highlight
          ? "bg-[hsl(var(--optavia-green-light))] border-[hsl(var(--optavia-green))]"
          : "bg-white border-[hsl(var(--optavia-border))]"
      }`}
    >
      <h3 className="font-bold text-lg mb-3 text-optavia-dark">{title}</h3>
      <div className="text-optavia-dark">{children}</div>
    </div>
  )
}
