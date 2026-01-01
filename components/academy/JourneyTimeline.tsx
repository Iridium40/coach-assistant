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
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00A651] to-[#fbbf24]" />
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative pl-12">
            <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#00A651] to-[#00c760] flex items-center justify-center font-bold text-sm border-2 border-slate-900">
              {index + 1}
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <div className="font-bold text-[#00c760] mb-1">{item.rank}</div>
              <div className="text-sm text-slate-300">{item.milestone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
