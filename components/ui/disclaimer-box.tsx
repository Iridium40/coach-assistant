"use client"

import { AlertTriangle, DollarSign, Heart, Brain, Scale, Shield, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export type DisclaimerType = "financial" | "medical" | "mental-health" | "income" | "weight-loss" | "general" | "scope-of-practice"

interface DisclaimerBoxProps {
  type: DisclaimerType
  title?: string
  children?: React.ReactNode
  className?: string
  compact?: boolean
}

const disclaimerConfig: Record<DisclaimerType, {
  icon: typeof AlertTriangle
  defaultTitle: string
  defaultContent: string
  bgColor: string
  borderColor: string
  textColor: string
  iconColor: string
}> = {
  financial: {
    icon: DollarSign,
    defaultTitle: "Financial Disclaimer",
    defaultContent: "The financial guidance provided here is for general informational purposes only and is based on common practices within the health coaching industry. This is not professional tax, legal, accounting, or financial advice. As an independent contractor (1099), your tax situation is unique. We strongly recommend consulting with a qualified tax professional, CPA, or financial advisor for advice specific to your situation. Coaching Amplifier is not liable for any financial decisions made based on this information.",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-400",
    textColor: "text-amber-900",
    iconColor: "text-amber-600",
  },
  income: {
    icon: DollarSign,
    defaultTitle: "Income Disclaimer",
    defaultContent: "Income examples and potential earnings discussed are for illustrative purposes only and are not guarantees. Individual results vary significantly based on effort, skill, market conditions, and many other factors. OPTAVIA coaches are independent contractors. For actual income statistics, please refer to OPTAVIA's official Income Disclosure Statement. The majority of coaches do not earn significant income from coaching activities. Past performance does not guarantee future results.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-400",
    textColor: "text-blue-900",
    iconColor: "text-blue-600",
  },
  "weight-loss": {
    icon: Scale,
    defaultTitle: "Weight Loss & Health Disclaimer",
    defaultContent: "Individual weight loss results vary significantly. Average weight loss on the Optimal Weight 5 & 1 Plan® is 12 pounds. Clients are in weight loss, on average, for 12 weeks. Results depend on starting weight, program adherence, metabolic factors, and individual circumstances. The OPTAVIA program is not intended to diagnose, treat, cure, or prevent any disease. Clients with medical conditions should consult a healthcare provider before starting any weight loss program.",
    bgColor: "bg-green-50",
    borderColor: "border-green-400",
    textColor: "text-green-900",
    iconColor: "text-green-600",
  },
  medical: {
    icon: Heart,
    defaultTitle: "Scope of Practice Reminder",
    defaultContent: "Health coaches are not licensed medical professionals. Never diagnose medical conditions, recommend medication changes, or provide advice on managing diseases. Clients experiencing concerning symptoms should be referred to their healthcare provider. When in doubt, always recommend the client consult with their doctor.",
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
    textColor: "text-red-900",
    iconColor: "text-red-600",
  },
  "mental-health": {
    icon: Brain,
    defaultTitle: "Mental Health Disclaimer",
    defaultContent: "Health coaches are not licensed mental health professionals. The emotional support strategies discussed are for general encouragement, not mental health treatment. Refer clients showing signs of depression, anxiety disorders, eating disorders, or crisis situations to qualified mental health professionals. If a client expresses thoughts of self-harm, direct them to the 988 Suicide & Crisis Lifeline or emergency services immediately.",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-400",
    textColor: "text-purple-900",
    iconColor: "text-purple-600",
  },
  "scope-of-practice": {
    icon: Shield,
    defaultTitle: "Scope of Practice",
    defaultContent: "As a health coach, you provide support, accountability, and guidance within the OPTAVIA program. You are NOT a medical professional, registered dietitian, licensed therapist, or financial advisor. Stay within your scope by focusing on program implementation and emotional support while referring specialized questions to appropriate professionals.",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-400",
    textColor: "text-slate-900",
    iconColor: "text-slate-600",
  },
  general: {
    icon: Info,
    defaultTitle: "Important Notice",
    defaultContent: "The information provided is for educational purposes only. Results are not guaranteed and depend on individual effort and circumstances. Always refer to OPTAVIA's official resources for policies and guidelines.",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-400",
    textColor: "text-gray-900",
    iconColor: "text-gray-600",
  },
}

export function DisclaimerBox({ type, title, children, className, compact = false }: DisclaimerBoxProps) {
  const config = disclaimerConfig[type]
  const Icon = config.icon
  const displayTitle = title || config.defaultTitle
  const displayContent = children || config.defaultContent

  if (compact) {
    return (
      <div className={cn(
        `${config.bgColor} ${config.borderColor} border-l-4 p-3 rounded-r-lg`,
        className
      )}>
        <div className={`flex items-start gap-2 ${config.textColor}`}>
          <Icon className={`h-4 w-4 ${config.iconColor} flex-shrink-0 mt-0.5`} />
          <p className="text-xs leading-relaxed">{displayContent}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      `${config.bgColor} ${config.borderColor} border-l-4 p-4 rounded-r-lg`,
      className
    )}>
      <div className={`flex items-center gap-2 font-semibold ${config.textColor} mb-2`}>
        <Icon className={`h-5 w-5 ${config.iconColor}`} />
        {displayTitle}
      </div>
      <p className={`text-sm ${config.textColor} leading-relaxed`}>{displayContent}</p>
    </div>
  )
}

// Pre-built disclaimer components for common use cases
export function FinancialDisclaimer({ compact = false }: { compact?: boolean }) {
  return <DisclaimerBox type="financial" compact={compact} />
}

export function IncomeDisclaimer({ compact = false }: { compact?: boolean }) {
  return <DisclaimerBox type="income" compact={compact} />
}

export function WeightLossDisclaimer({ compact = false }: { compact?: boolean }) {
  return <DisclaimerBox type="weight-loss" compact={compact} />
}

export function MedicalDisclaimer({ compact = false }: { compact?: boolean }) {
  return <DisclaimerBox type="medical" compact={compact} />
}

export function MentalHealthDisclaimer({ compact = false }: { compact?: boolean }) {
  return <DisclaimerBox type="mental-health" compact={compact} />
}

export function ScopeOfPracticeDisclaimer({ compact = false }: { compact?: boolean }) {
  return <DisclaimerBox type="scope-of-practice" compact={compact} />
}
