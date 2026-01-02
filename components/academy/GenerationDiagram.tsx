"use client"

interface GenerationRow {
  label: string
  count: number
  bonus?: string
}

interface GenerationDiagramProps {
  generations: GenerationRow[]
}

export function GenerationDiagram({ generations }: GenerationDiagramProps) {
  return (
    <div className="bg-white border border-[hsl(var(--optavia-border))] rounded-2xl p-6 my-6 shadow-sm">
      {generations.map((gen, index) => (
        <div key={index} className="flex items-center gap-3 py-3 border-b border-[hsl(var(--optavia-border))] last:border-b-0">
          <div className="w-24 font-semibold text-optavia-gray text-sm">{gen.label}</div>
          <div className="flex items-center gap-2 flex-1">
            <span className="text-optavia-light-gray">↓</span>
            {Array.from({ length: gen.count }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg bg-purple-100 border border-purple-300 flex items-center justify-center font-bold text-sm text-purple-700"
              >
                ED
              </div>
            ))}
          </div>
          {gen.bonus && (
            <div className="font-bold text-[hsl(var(--optavia-green))]">{gen.bonus}</div>
          )}
        </div>
      ))}
    </div>
  )
}
