"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, GraduationCap } from "lucide-react"

interface OnboardingProps {
  onComplete: (isNewCoach: boolean) => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/two-women-walking-exercising-with-water-bottles.jpg')",
          }}
        />
        {/* Green Gradient Overlay (85-90% opacity) */}
        <div 
          className="absolute inset-0 bg-[hsl(var(--optavia-green))]"
          style={{ opacity: 0.87 }}
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white z-10">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">Welcome to OPTAVIA Health Coach Hub</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Your comprehensive resource center for coaching success, training modules, and delicious Lean & Green
            recipes
          </p>
        </div>
      </div>

      {/* Selection Cards */}
      <div className="container mx-auto px-4 -mt-24 relative z-10 pb-12">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card
            className="p-8 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onComplete(true)}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[hsl(var(--optavia-green-light))] flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-[hsl(var(--optavia-green))]" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-optavia-dark">I'm a New Coach</h2>
              <p className="text-optavia-gray">
                Get started with a guided journey through essential resources and training modules designed specifically
                for new coaches.
              </p>
              <Button
                className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
                onClick={() => onComplete(true)}
              >
                Start New Coach Journey
              </Button>
            </div>
          </Card>

          <Card
            className="p-8 bg-white hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => onComplete(false)}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[hsl(var(--optavia-green-light))] flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-[hsl(var(--optavia-green))]" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-optavia-dark">I'm an Existing Coach</h2>
              <p className="text-optavia-gray">
                Access all resources, training modules, and recipes. Continue building your coaching business with full
                access.
              </p>
              <Button
                className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
                onClick={() => onComplete(false)}
              >
                Access All Resources
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
