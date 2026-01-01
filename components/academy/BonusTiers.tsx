"use client"

interface BonusTier {
  amount: string
  fqv: string
  months?: string
}

interface BonusTiersProps {
  tiers: BonusTier[]
}

export function BonusTiers({ tiers }: BonusTiersProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className="bg-slate-800/30 border border-slate-700 rounded-xl p-5 text-center hover:border-[#00A651] transition-colors"
        >
          <div className="text-2xl font-bold text-[#00c760]">{tier.amount}</div>
          <div className="text-sm text-slate-400 mt-1">{tier.fqv}</div>
          {tier.months && <div className="text-xs text-slate-500 mt-1">{tier.months}</div>}
        </div>
      ))}
    </div>
  )
}
