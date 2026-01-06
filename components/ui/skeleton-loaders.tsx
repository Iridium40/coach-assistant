"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// Stats cards skeleton for dashboard and tracker pages
export function StatsCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 text-center">
            <Skeleton className="h-9 w-16 mx-auto mb-2" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Client card skeleton for client tracker
export function ClientCardSkeleton() {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 flex-1" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

// Prospect card skeleton for prospect tracker
export function ProspectCardSkeleton() {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
        <div className="mt-3 pt-3 border-t flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

// Client list skeleton
export function ClientListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ClientCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Prospect list skeleton
export function ProspectListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProspectCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Dashboard overview skeleton
export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsCardsSkeleton count={4} />
      
      {/* Main content grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Week view skeleton
export function WeekViewSkeleton() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="min-h-[200px] rounded-lg border bg-white">
            <div className="px-2 py-2 border-b bg-gray-100 text-center">
              <Skeleton className="h-3 w-8 mx-auto mb-1" />
              <Skeleton className="h-6 w-6 mx-auto" />
            </div>
            <div className="p-2 space-y-2">
              {Array.from({ length: Math.floor(Math.random() * 3) }).map((_, j) => (
                <Skeleton key={j} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Full page loading skeleton with header placeholder
export function PageLoadingSkeleton({ title }: { title?: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header placeholder */}
      <div className="h-16 bg-white border-b" />
      
      {/* Page header placeholder */}
      <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Skeleton className="h-4 w-32 bg-white/20 mb-2" />
              <Skeleton className="h-8 w-48 bg-white/20" />
              <Skeleton className="h-4 w-64 bg-white/20 mt-2" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-32 bg-white/20" />
              <Skeleton className="h-10 w-28 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Content placeholder */}
      <div className="container mx-auto px-4 py-6">
        <StatsCardsSkeleton />
        <div className="space-y-4 mb-6">
          <Skeleton className="h-10 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        <ClientListSkeleton />
      </div>
    </div>
  )
}
