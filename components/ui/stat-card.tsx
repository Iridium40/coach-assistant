"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: number | string
  subtitle?: string
  badge?: {
    text: string
    variant?: "default" | "success" | "warning" | "danger"
  }
  icon?: LucideIcon
  iconColor?: string
  href?: string
  borderColor?: string
  bgGradient?: string
  footer?: React.ReactNode
  loading?: boolean
}

export function StatCard({
  title,
  value,
  subtitle,
  badge,
  icon: Icon,
  iconColor = "text-gray-500",
  href,
  borderColor = "border-gray-200",
  bgGradient,
  footer,
  loading = false,
}: StatCardProps) {
  const getBadgeClass = (variant?: string) => {
    switch (variant) {
      case "success": return "bg-green-100 text-green-700"
      case "warning": return "bg-orange-100 text-orange-700"
      case "danger": return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  const content = (
    <Card
      className={`${borderColor} ${bgGradient || "bg-white"} hover:shadow-md transition-shadow ${
        href ? "cursor-pointer" : ""
      }`}
    >
      <CardContent className="pt-4 pb-4">
        {loading ? (
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />}
                <span className="text-sm font-medium text-gray-600">{title}</span>
              </div>
              {badge && (
                <Badge variant="secondary" className={`text-xs ${getBadgeClass(badge.variant)}`}>
                  {badge.text}
                </Badge>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
            {footer && <div className="mt-2">{footer}</div>}
          </>
        )}
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href} className="block">{content}</Link>
  }

  return content
}

// Skeleton loader for stat cards
export function StatCardSkeleton() {
  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="pt-4 pb-4">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </CardContent>
    </Card>
  )
}
