"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RankCalculator } from "@/components/rank-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function MyBusinessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Rank Calculator</h1>
              <p className="text-sm sm:text-base opacity-90">
                Track your progress and see what you need to reach the next rank
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
              Your Rank Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RankCalculator />
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
