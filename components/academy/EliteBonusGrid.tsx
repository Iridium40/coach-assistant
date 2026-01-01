"use client"

interface EliteBonusCard {
  rank: string
  percent: string
  desc: string
}

interface EliteBonusGridProps {
  bonuses: EliteBonusCard[]
}

export function EliteBonusGrid({ bonuses }: EliteBonusGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4 my-6">
      {bonuses.map((bonus, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-2xl p-6 text-center"
        >
          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">{bonus.rank}</div>
          <div className="text-3xl font-bold text-amber-200 mb-2">{bonus.percent}</div>
          <div className="text-sm text-amber-100">{bonus.desc}</div>
        </div>
      ))}
    </div>
  )
}
