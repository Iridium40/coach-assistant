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
              ? "bg-[#00A651]/10 border-[#00A651]"
              : "bg-slate-800/30 border-slate-700"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold ${
              rank.highlight
                ? "bg-gradient-to-br from-[#00A651] to-[#00c760]"
                : "bg-slate-700"
            }`}
          >
            {rank.points}
          </div>
          <div className="flex-1">
            <div className={`font-bold ${rank.highlight ? "text-white" : "text-slate-200"}`}>
              {rank.rankName}
            </div>
            <div className="text-sm text-slate-400">{rank.rankReq}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
