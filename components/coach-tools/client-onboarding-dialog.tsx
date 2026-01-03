"use client"

import { ClientOnboardingTool } from "@/components/client-onboarding-tool"

export function ClientOnboardingDialog() {
  return (
    <div className="max-h-[85vh] overflow-y-auto [&>div>div:first-child]:hidden [&>div>footer]:hidden [&>div>div:first-child]:!static">
      <ClientOnboardingTool />
    </div>
  )
}
