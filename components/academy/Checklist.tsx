"use client"

import { useState } from "react"

interface ChecklistItem {
  id?: string
  text: string
}

interface ChecklistProps {
  items: ChecklistItem[]
  checkedColor?: "green" | "yellow"
}

export function Checklist({ items, checkedColor = "green" }: ChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checked)
    const itemId = items[index].id || index.toString()
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId)
    } else {
      newChecked.add(itemId)
    }
    setChecked(newChecked)
  }

  const bgColor = checkedColor === "green" ? "bg-[#00A651]" : "bg-[#fbbf24]"
  const borderColor = checkedColor === "green" ? "border-[#00A651]" : "border-[#fbbf24]"

  return (
    <ul className="list-none my-6 space-y-3">
      {items.map((item, index) => {
        const itemId = item.id || index.toString()
        const isChecked = checked.has(itemId)
        return (
          <li key={index} className="flex items-start gap-3 py-3 border-b border-slate-700/50 last:border-b-0">
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all flex-shrink-0 mt-0.5 ${
                isChecked
                  ? `${bgColor} ${borderColor}`
                  : "bg-slate-700/30 border-[#00A651] hover:bg-slate-700/50"
              }`}
              onClick={() => toggleCheck(index)}
            >
              {isChecked && (
                <span className="text-white font-bold text-sm">✓</span>
              )}
            </div>
            <span className={`flex-1 ${isChecked ? "text-slate-400 line-through" : "text-slate-300"}`}>
              {item.text}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
