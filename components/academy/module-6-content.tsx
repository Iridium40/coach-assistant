"use client"

import { ModuleContent } from "./ModuleContent"
import { getModuleById } from "@/lib/academy-data"

export function Module6Content() {
  const module = getModuleById("module-6")
  
  if (!module) {
    return <div className="text-center py-12 text-gray-500">Module not found</div>
  }

  return <ModuleContent module={module} />
}
