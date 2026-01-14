export type CoachRank =
  | "Coach"
  | "SC"
  | "MG"
  | "AD"
  | "DR"
  | "ED"
  | "IED"
  | "FIBC"
  | "IGD"
  | "FIBL"
  | "IND"
  | "IPD"

export const COACH_RANK_OPTIONS: Array<{ value: CoachRank; label: string }> = [
  { value: "Coach", label: "Coach" },
  { value: "SC", label: "SC (Senior Coach)" },
  { value: "MG", label: "MG (Manager)" },
  { value: "AD", label: "AD (Associate Director)" },
  { value: "DR", label: "DR (Director)" },
  { value: "ED", label: "ED (Executive Director)" },
  { value: "IED", label: "IED (Integrated Executive Director)" },
  { value: "FIBC", label: "FIBC (Fully Integrated Business Coach)" },
  { value: "IGD", label: "IGD (Integrated Global Director)" },
  { value: "FIBL", label: "FIBL (Fully Integrated Business Leader)" },
  { value: "IND", label: "IND (Integrated National Director)" },
  { value: "IPD", label: "IPD (Integrated Presidential Director)" },
]

