"use client"

import { ReactNode } from "react"

interface LessonCardProps {
  number: number
  title: string
  subtitle?: string
  children: ReactNode
}

export function LessonCard({ number, title, subtitle, children }: LessonCardProps) {
  return (
    <div className="bg-white border border-[hsl(var(--optavia-border))] rounded-2xl p-6 md:p-8 mb-6 shadow-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] rounded-xl flex items-center justify-center text-xl font-bold text-optavia-dark flex-shrink-0">
          {number}
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-1 text-optavia-dark">{title}</h2>
          {subtitle && <p className="text-sm text-optavia-gray">{subtitle}</p>}
        </div>
      </div>
      <div className="text-optavia-dark leading-relaxed">
        {children}
      </div>
    </div>
  )
}
