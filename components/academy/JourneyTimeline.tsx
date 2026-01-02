"use client"

interface TimelineItem {
  rank: string
  milestone: string
}

interface JourneyTimelineProps {
  items: TimelineItem[]
}

export function JourneyTimeline({ items }: JourneyTimelineProps) {
  return (
    <div className="relative my-8">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[hsl(var(--optavia-green))] to-[#fbbf24]" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] flex items-center justify-center font-bold text-sm text-optavia-dark border-2 border-white shadow-md">
              {index + 1}
            </div>
            <div className="bg-white border border-[hsl(var(--optavia-border))] rounded-xl p-4 shadow-sm">
              <div className="font-bold text-[hsl(var(--optavia-green))] mb-1">{item.rank}</div>
              <div className="text-sm text-optavia-dark">{item.milestone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
