"use client"

import { ReactNode } from "react"

interface ImportantBannerProps {
  bigText: string
  subText?: string
  children?: ReactNode
}

export function ImportantBanner({ bigText, subText, children }: ImportantBannerProps) {
  return (
    <div className="bg-gradient-to-r from-[#00A651] to-[#00c760] rounded-2xl p-6 md:p-8 text-center my-8">
      <div className="text-xl md:text-2xl font-bold mb-2">{bigText}</div>
      {subText && <div className="text-base opacity-90">{subText}</div>}
      {children}
    </div>
  )
}
