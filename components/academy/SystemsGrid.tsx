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
          className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6"
        >
          <div className="text-3xl mb-3">{system.icon}</div>
          <div className="font-bold text-white mb-2">{system.title}</div>
          <div className="text-sm text-slate-400">{system.desc}</div>
        </div>
      ))}
    </div>
  )
}
