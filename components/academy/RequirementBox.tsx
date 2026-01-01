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
          ? "bg-gradient-to-br from-[#00A651]/20 to-[#00A651]/10 border-[#00A651]"
          : "bg-slate-800/30 border-slate-700"
      }`}
    >
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <div className="text-slate-300">{children}</div>
    </div>
  )
}
