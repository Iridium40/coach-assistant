"use client"

interface PointsItem {
  value: string
  desc: string
}

interface PointsBoxProps {
  label: string
  items: PointsItem[]
}

export function PointsBox({ label, items }: PointsBoxProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700 font-bold mb-4">
        <span>📊</span>
        <span>{label}</span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            {index > 0 && <div className="text-amber-600 font-bold text-lg mb-4 md:mb-0 md:mx-4">OR</div>}
            <div className="bg-white px-6 py-4 rounded-xl text-center w-full border border-amber-200">
              <div className="text-2xl font-bold text-amber-700">{item.value}</div>
              <div className="text-sm text-optavia-gray mt-1">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
