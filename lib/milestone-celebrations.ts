export function getMilestoneCelebrationKey(args: {
  clientId: string
  programDay: number
  dateStr?: string
}) {
  const date = args.dateStr || new Date().toISOString().split("T")[0]
  return `milestoneCelebrated:${args.clientId}:${args.programDay}:${date}`
}

export function isMilestoneCelebratedToday(args: { clientId: string; programDay: number }) {
  if (typeof window === "undefined") return false
  try {
    const key = getMilestoneCelebrationKey(args)
    return window.localStorage.getItem(key) === "1"
  } catch {
    return false
  }
}

export function markMilestoneCelebratedToday(args: { clientId: string; programDay: number }) {
  if (typeof window === "undefined") return
  try {
    const key = getMilestoneCelebrationKey(args)
    window.localStorage.setItem(key, "1")
  } catch {
    // ignore (e.g. Safari private mode)
  }
}

