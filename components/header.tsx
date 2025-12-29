"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, RotateCcw } from "lucide-react"

interface HeaderProps {
  onReset: () => void
  showReset: boolean
}

export function Header({ onReset, showReset }: HeaderProps) {
  return (
    <header className="border-b border-optavia-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-shrink">
          <div className="text-xl sm:text-2xl font-heading">
            <span className="font-extrabold text-optavia-green">Coaching</span>
            <span className="font-semibold text-optavia-green hidden sm:inline"> Amplifier</span>
            <span className="font-semibold text-optavia-green sm:hidden"> Amp</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {showReset && (
            <Button variant="outline" size="sm" onClick={onReset} className="gap-1 sm:gap-2 bg-transparent px-2 sm:px-3">
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}
          <Button
            size="sm"
            className="gap-1 sm:gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] px-2 sm:px-3 text-xs sm:text-sm"
            asChild
          >
            <a href="https://optaviaconnect.com/login" target="_blank" rel="noopener noreferrer">
              <span className="hidden sm:inline">OPTAVIA Connect</span>
              <span className="sm:hidden">Connect</span>
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
