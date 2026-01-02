"use client"

interface RankRung {
  points: string
  rankName: string
  rankReq: string
  highlight?: boolean
}

interface RankLadderProps {
  ranks: RankRung[]
}

export function RankLadder({ ranks }: RankLadderProps) {
  return (
    <div className="flex flex-col gap-3 my-6">
      {ranks.map((rank, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 p-4 rounded-xl border ${
            rank.highlight
              ? "bg-[hsl(var(--optavia-green-light))] border-[hsl(var(--optavia-green))]"
              : "bg-white border-[hsl(var(--optavia-border))]"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${
              rank.highlight
                ? "bg-gradient-to-br from-[hsl(var(--optavia-green))] to-[hsl(var(--optavia-green-dark))] text-optavia-dark"
                : "bg-gray-200 text-optavia-dark"
            }`}
          >
            {rank.points}
          </div>
          <div className="flex-1">
            <div className={`font-bold ${rank.highlight ? "text-[hsl(var(--optavia-green))]" : "text-optavia-dark"}`}>
              {rank.rankName}
            </div>
            <div className="text-sm text-optavia-gray">{rank.rankReq}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
