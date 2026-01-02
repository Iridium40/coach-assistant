"use client"

import { ClientTroubleshootingTool } from "@/components/client-troubleshooting-tool"

export function ClientTroubleshootingDialog() {
  return (
    <div className="max-h-[85vh] overflow-y-auto [&>div>div:first-child]:hidden [&>div>footer]:hidden [&>div>div:first-child]:!static">
      <ClientTroubleshootingTool />
    </div>
  )
}
