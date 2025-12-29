"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function BlogTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center py-4 sm:py-8">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-3 sm:mb-4">
          OPTAVIA Blog
        </h2>
        <p className="text-optavia-gray text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          Discover helpful articles, tips, and insights to support your coaching journey and help your clients live their Lean & Green Life™.
        </p>
        <Button
          size="lg"
          className="gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-sm sm:text-base"
          asChild
        >
          <a href="https://www.optaviablog.com" target="_blank" rel="noopener noreferrer">
            Visit OPTAVIA Blog
            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </Button>
      </div>

      <Card className="p-4 sm:p-8">
        <div className="prose max-w-none">
          <h3 className="font-heading font-bold text-xl text-optavia-dark mb-4">
            Featured Topics
          </h3>
          <ul className="space-y-3 text-optavia-gray">
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Lean & Green meal recipes and tips</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Weight loss strategies and motivation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Metabolic health insights</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Healthy lifestyle tips and habits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Success stories and inspiration</span>
            </li>
          </ul>
        </div>
      </Card>

      <div className="text-center text-sm text-optavia-gray">
        <p>
          The OPTAVIA Blog provides valuable resources to help you and your clients on your health journey.
        </p>
      </div>
    </div>
  )
}

