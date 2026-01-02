"use client"

interface SystemCard {
  icon: string
  title: string
  desc: string
}

interface SystemsGridProps {
  systems: SystemCard[]
}

export function SystemsGrid({ systems }: SystemsGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      {systems.map((system, index) => (
        <div
          key={index}
          className="bg-white border border-[hsl(var(--optavia-border))] rounded-2xl p-6 shadow-sm"
        >
          <div className="text-3xl mb-3">{system.icon}</div>
          <div className="font-bold text-optavia-dark mb-2">{system.title}</div>
          <div className="text-sm text-optavia-gray">{system.desc}</div>
        </div>
      ))}
    </div>
  )
}
