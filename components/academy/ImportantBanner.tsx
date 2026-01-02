"use client"

import { ReactNode } from "react"

interface ImportantBannerProps {
  bigText: string
  subText?: string
  children?: ReactNode
}

export function ImportantBanner({ bigText, subText, children }: ImportantBannerProps) {
  return (
    <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] rounded-2xl p-6 md:p-8 text-center my-8 text-optavia-dark">
      <div className="text-xl md:text-2xl font-bold mb-2">{bigText}</div>
      {subText && <div className="text-base opacity-95">{subText}</div>}
      {children}
    </div>
  )
}
