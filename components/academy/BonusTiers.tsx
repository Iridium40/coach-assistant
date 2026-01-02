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
          className="bg-white border border-[hsl(var(--optavia-border))] rounded-xl p-5 text-center hover:border-[hsl(var(--optavia-green))] transition-colors shadow-sm"
        >
          <div className="text-2xl font-bold text-[hsl(var(--optavia-green))]">{tier.amount}</div>
          <div className="text-sm text-optavia-gray mt-1">{tier.fqv}</div>
          {tier.months && <div className="text-xs text-optavia-light-gray mt-1">{tier.months}</div>}
        </div>
      ))}
    </div>
  )
}
