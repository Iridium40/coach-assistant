"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { DashboardButton } from "@/lib/types"

const COLOR_STYLES: Record<string, { bg: string; text: string }> = {
  green: {
    bg: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100",
    text: "text-green-600",
  },
  blue: {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100",
    text: "text-blue-600",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:from-purple-100 hover:to-violet-100",
    text: "text-purple-600",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:from-orange-100 hover:to-amber-100",
    text: "text-orange-600",
  },
  red: {
    bg: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:from-red-100 hover:to-rose-100",
    text: "text-red-600",
  },
  pink: {
    bg: "bg-gradient-to-br from-pink-50 to-fuchsia-50 border-pink-200 hover:from-pink-100 hover:to-fuchsia-100",
    text: "text-pink-600",
  },
  teal: {
    bg: "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:from-teal-100 hover:to-cyan-100",
    text: "text-teal-600",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:from-amber-100 hover:to-yellow-100",
    text: "text-amber-600",
  },
}

const DEFAULT_COLOR = COLOR_STYLES.green

function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://")
}

export function QuickActions() {
  const [buttons, setButtons] = useState<DashboardButton[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchButtons = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("dashboard_buttons")
        .select("*")
        .order("sort_order", { ascending: true })

      if (!error && data) {
        setButtons(data)
      }
      setLoading(false)
    }

    fetchButtons()
  }, [])

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2 text-optavia-dark">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="min-h-[80px] rounded-lg border border-gray-200 bg-gray-50 animate-pulse"
              />
            ))}
          </div>
        ) : buttons.length === 0 ? (
          <div className="text-center py-8 text-optavia-gray text-sm">
            No quick actions configured.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 h-full">
            {buttons.map((button) => {
              const colorStyle = COLOR_STYLES[button.color] || DEFAULT_COLOR
              const external = isExternalUrl(button.url)

              const content = (
                <div
                  className={`w-full min-h-[80px] p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-center text-center ${colorStyle.bg}`}
                >
                  <p className="text-sm font-medium text-optavia-dark leading-tight">
                    {button.label}
                  </p>
                </div>
              )

              if (external) {
                return (
                  <a
                    key={button.id}
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full"
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link key={button.id} href={button.url} className="flex h-full">
                  {content}
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
