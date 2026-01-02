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

  const bgColor = checkedColor === "green" ? "bg-[hsl(var(--optavia-green))]" : "bg-[#fbbf24]"
  const borderColor = checkedColor === "green" ? "border-[hsl(var(--optavia-green))]" : "border-[#fbbf24]"

  return (
    <ul className="list-none my-6 space-y-3">
      {items.map((item, index) => {
        const itemId = item.id || index.toString()
        const isChecked = checked.has(itemId)
        return (
          <li key={index} className="flex items-start gap-3 py-3 border-b border-[hsl(var(--optavia-border))] last:border-b-0">
            <div
              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all flex-shrink-0 mt-0.5 ${
                isChecked
                  ? `${bgColor} ${borderColor}`
                  : "bg-white border-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))]"
              }`}
              onClick={() => toggleCheck(index)}
            >
              {isChecked && (
                <span className="text-optavia-dark font-bold text-sm">✓</span>
              )}
            </div>
            <span className={`flex-1 ${isChecked ? "text-optavia-light-gray line-through" : "text-optavia-dark"}`}>
              {item.text}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
