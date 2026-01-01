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
    <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 my-6">
      {generations.map((gen, index) => (
        <div key={index} className="flex items-center gap-3 py-3 border-b border-slate-700/50 last:border-b-0">
          <div className="w-24 font-semibold text-slate-400 text-sm">{gen.label}</div>
          <div className="flex items-center gap-2 flex-1">
            <span className="text-slate-500">↓</span>
            {Array.from({ length: gen.count }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg bg-purple-500/30 border border-purple-500/50 flex items-center justify-center font-bold text-sm text-purple-300"
              >
                ED
              </div>
            ))}
          </div>
          {gen.bonus && (
            <div className="font-bold text-[#00c760]">{gen.bonus}</div>
          )}
        </div>
      ))}
    </div>
  )
}
