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
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-700 rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#00A651] to-[#00c760] rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0">
          {number}
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-1">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
      <div className="text-slate-300 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
