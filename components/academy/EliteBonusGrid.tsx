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
          className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center"
        >
          <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-2">{bonus.rank}</div>
          <div className="text-3xl font-bold text-amber-600 mb-2">{bonus.percent}</div>
          <div className="text-sm text-optavia-gray">{bonus.desc}</div>
        </div>
      ))}
    </div>
  )
}
