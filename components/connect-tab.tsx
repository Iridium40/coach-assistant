"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ConnectTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center py-4 sm:py-8">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-optavia-dark mb-3 sm:mb-4">
          OPTAVIA Connect
        </h2>
        <p className="text-optavia-gray text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
          Access your OPTAVIA Connect portal to manage your business, track your progress, and access exclusive resources for coaches.
        </p>
        <Button
          size="lg"
          className="gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-sm sm:text-base"
          asChild
        >
          <a href="https://optaviaconnect.com/login" target="_blank" rel="noopener noreferrer">
            Go to OPTAVIA Connect
            <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </Button>
      </div>

      <Card className="p-4 sm:p-8">
        <div className="prose max-w-none">
          <h3 className="font-heading font-bold text-xl text-optavia-dark mb-4">
            What You Can Access
          </h3>
          <ul className="space-y-3 text-optavia-gray">
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Business performance tracking and analytics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Client management tools and resources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Training materials and certifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Marketing resources and support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(var(--optavia-green))] mt-1">•</span>
              <span>Commission and earnings information</span>
            </li>
          </ul>
        </div>
      </Card>

      <div className="text-center text-sm text-optavia-gray">
        <p>
          OPTAVIA Connect is your central hub for managing your coaching business and accessing exclusive coach resources.
        </p>
      </div>
    </div>
  )
}

