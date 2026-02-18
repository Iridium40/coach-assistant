export interface RankGuidance {
  rank: number
  title: string
  tier: string
  emoji: string
  color: string
  bg: string
  borderColor: string
  focusAreas: string[]
  sponsorActions: string[]
  nextRankGoal: string | null
}

const RANK_GUIDANCE: Record<number, RankGuidance> = {
  // ── Getting Started (Ranks 1-3) ──
  1: {
    rank: 1,
    title: "New Coach",
    tier: "Getting Started",
    emoji: "🌱",
    color: "#16A34A",
    bg: "#F0FDF4",
    borderColor: "#86EFAC",
    focusAreas: [
      "Complete coach onboarding and training",
      "Write their 100's list of prospects",
      "Learn the Health Assessment process",
      "Get their first 3-5 clients on program",
      "Build daily social media habits",
    ],
    sponsorActions: [
      "Schedule weekly 1-on-1 calls",
      "Walk them through the 100's list exercise",
      "Role-play the HA invite conversation",
      "Celebrate every small win publicly",
      "Connect them to team calls and community",
    ],
    nextRankGoal: "Get certified with 5+ active clients to reach Associate Coach",
  },
  2: {
    rank: 2,
    title: "Associate Coach",
    tier: "Getting Started",
    emoji: "🌿",
    color: "#16A34A",
    bg: "#F0FDF4",
    borderColor: "#86EFAC",
    focusAreas: [
      "Maintain 5+ active clients consistently",
      "Sharpen HA delivery and follow-up skills",
      "Start hosting or co-hosting discovery calls",
      "Begin identifying future coach prospects among clients",
    ],
    sponsorActions: [
      "Review their pipeline and conversion rates",
      "Help them practice overcoming objections",
      "Introduce them to team leadership calls",
      "Ask: 'Who on your client list is showing coach potential?'",
    ],
    nextRankGoal: "Build consistency and deepen client relationships to reach Senior Coach",
  },
  3: {
    rank: 3,
    title: "Senior Coach",
    tier: "Getting Started",
    emoji: "🌳",
    color: "#16A34A",
    bg: "#F0FDF4",
    borderColor: "#86EFAC",
    focusAreas: [
      "Develop a repeatable client acquisition system",
      "Start having business opportunity conversations",
      "Attend leadership development events",
      "Build deeper client relationships to increase retention",
    ],
    sponsorActions: [
      "Help them create a daily method of operation (DMO)",
      "Co-present the business opportunity with them",
      "Share your own coaching journey as inspiration",
      "Set 90-day goals together for certification push",
    ],
    nextRankGoal: "Earn Certified Coach by deepening skills and achieving certification requirements",
  },

  // ── Building Momentum (Ranks 4-5) ──
  4: {
    rank: 4,
    title: "Certified Coach",
    tier: "Building Momentum",
    emoji: "✅",
    color: "#0D9488",
    bg: "#F0FDFA",
    borderColor: "#5EEAD4",
    focusAreas: [
      "Maintain certification standards and active client count",
      "Identify and mentor 1-2 potential new coaches",
      "Develop a signature approach to client onboarding",
      "Start building a personal brand on social media",
    ],
    sponsorActions: [
      "Celebrate their certification milestone",
      "Help them identify coaching prospects in their client base",
      "Teach them the coach invitation conversation",
      "Share team-building strategies and resources",
    ],
    nextRankGoal: "Sponsor your first coach and build team volume for Certified Executive Coach",
  },
  5: {
    rank: 5,
    title: "Certified Executive Coach",
    tier: "Building Momentum",
    emoji: "⭐",
    color: "#0D9488",
    bg: "#F0FDFA",
    borderColor: "#5EEAD4",
    focusAreas: [
      "Support newly sponsored coaches through their first 30 days",
      "Develop leadership and mentoring skills",
      "Create team culture and weekly rhythm",
      "Continue growing personal client base alongside team",
    ],
    sponsorActions: [
      "Teach them how to onboard and support new coaches",
      "Help them set up team communication (group chat, calls)",
      "Model the sponsor-coach relationship for them",
      "Co-mentor their first new coach together",
    ],
    nextRankGoal: "Grow your team and develop leaders to reach Manager",
  },

  // ── Team Building (Ranks 6-8) ──
  6: {
    rank: 6,
    title: "Manager",
    tier: "Team Building",
    emoji: "🔨",
    color: "#D97706",
    bg: "#FFFBEB",
    borderColor: "#FCD34D",
    focusAreas: [
      "Develop team structure and communication cadence",
      "Host weekly team calls and trainings",
      "Focus on duplication — teach your team to teach",
      "Track team volume and identify rising leaders",
    ],
    sponsorActions: [
      "Help them plan and run their first team calls",
      "Share organizational templates and systems",
      "Discuss leadership vs. management approaches",
      "Review their team's pipeline together monthly",
    ],
    nextRankGoal: "Develop Senior Coaches on your team and grow volume for Senior Manager",
  },
  7: {
    rank: 7,
    title: "Senior Manager",
    tier: "Team Building",
    emoji: "🏗️",
    color: "#D97706",
    bg: "#FFFBEB",
    borderColor: "#FCD34D",
    focusAreas: [
      "Mentor managers and develop next-level leaders",
      "Create recognition systems and team incentives",
      "Expand recruiting reach beyond warm market",
      "Build a leadership bench — who can lead when you can't?",
    ],
    sponsorActions: [
      "Strategic planning sessions for their team growth",
      "Help them identify and develop emerging leaders",
      "Share advanced team-building and retention strategies",
      "Encourage event attendance and personal development",
    ],
    nextRankGoal: "Build multiple producing legs and develop managers for Executive Manager",
  },
  8: {
    rank: 8,
    title: "Executive Manager",
    tier: "Team Building",
    emoji: "🏢",
    color: "#D97706",
    bg: "#FFFBEB",
    borderColor: "#FCD34D",
    focusAreas: [
      "Develop multiple independent team legs",
      "Create systems that work without your daily involvement",
      "Invest in personal leadership growth and coaching",
      "Focus on culture — recognition, support, and celebration",
    ],
    sponsorActions: [
      "Discuss organizational health and team dynamics",
      "Help them create scalable onboarding and training systems",
      "Introduce them to cross-team collaboration opportunities",
      "Celebrate their journey and vision for Director",
    ],
    nextRankGoal: "Develop qualifying team structures and volume for Director",
  },

  // ── Leadership (Ranks 9-11) ──
  9: {
    rank: 9,
    title: "Director",
    tier: "Leadership",
    emoji: "👑",
    color: "#7C3AED",
    bg: "#F5F3FF",
    borderColor: "#C4B5FD",
    focusAreas: [
      "Develop other Directors within your organization",
      "Build sustainable, self-running team systems",
      "Speak at events and become a visible leader in the community",
      "Focus on legacy — who are you developing to surpass you?",
    ],
    sponsorActions: [
      "Treat them as a peer and strategic partner",
      "Collaborate on organizational vision and 1-year planning",
      "Share advanced leadership and business strategies",
      "Connect them with other Directors for peer mentorship",
    ],
    nextRankGoal: "Expand organization depth and develop Directors for Executive Director",
  },
  10: {
    rank: 10,
    title: "Executive Director",
    tier: "Leadership",
    emoji: "💎",
    color: "#7C3AED",
    bg: "#F5F3FF",
    borderColor: "#C4B5FD",
    focusAreas: [
      "Develop multiple Director legs within your organization",
      "Create cross-team training events and leadership retreats",
      "Become a culture carrier — your energy sets the tone",
      "Mentor high-potential leaders with customized development plans",
    ],
    sponsorActions: [
      "Strategic partnership on organizational growth",
      "Support their event planning and leadership initiatives",
      "Encourage industry thought leadership (speaking, content)",
      "Discuss long-term business sustainability and vision",
    ],
    nextRankGoal: "Deepen organizational leadership and qualify for Senior Director",
  },
  11: {
    rank: 11,
    title: "Senior Director",
    tier: "Leadership",
    emoji: "🌟",
    color: "#7C3AED",
    bg: "#F5F3FF",
    borderColor: "#C4B5FD",
    focusAreas: [
      "Build a world-class organization with multiple Director lines",
      "Invest in legacy leadership — your leaders should be developing leaders",
      "Champion organizational culture, values, and mission",
      "Focus on the big picture while empowering your leaders to run day-to-day",
    ],
    sponsorActions: [
      "Peer-level strategic conversations about the business",
      "Support their vision for regional or national impact",
      "Collaborate on industry events and team gatherings",
      "Be a sounding board for complex leadership decisions",
    ],
    nextRankGoal: "Expand to regional influence and qualify for Regional Director",
  },

  // ── Executive (Ranks 12-15) ──
  12: {
    rank: 12,
    title: "Regional Director",
    tier: "Executive",
    emoji: "🏆",
    color: "#B45309",
    bg: "#FFF7ED",
    borderColor: "#FDBA74",
    focusAreas: [
      "Lead at a regional level — influence extends across multiple organizations",
      "Develop National Director candidates within your team",
      "Represent the company at major events and conventions",
      "Focus on organizational sustainability over personal production",
    ],
    sponsorActions: [
      "Strategic partnership and mutual support",
      "Collaborate on large-scale team events",
      "Celebrate and elevate their leadership publicly",
      "Provide a safe space for executive-level challenges",
    ],
    nextRankGoal: "Continue developing top leaders for National Director qualification",
  },
  13: {
    rank: 13,
    title: "National Director",
    tier: "Executive",
    emoji: "🎖️",
    color: "#B45309",
    bg: "#FFF7ED",
    borderColor: "#FDBA74",
    focusAreas: [
      "National-level leadership and influence",
      "Develop Presidential Director candidates",
      "Contribute to company culture and direction",
      "Legacy building — your organization runs without you",
    ],
    sponsorActions: [
      "Executive-level strategic partnership",
      "Support their national leadership initiatives",
      "Celebrate their extraordinary achievement",
      "Collaborate on vision for the industry",
    ],
    nextRankGoal: "Build toward Presidential Director through deep organizational leadership",
  },
  14: {
    rank: 14,
    title: "Presidential Director",
    tier: "Executive",
    emoji: "👔",
    color: "#B45309",
    bg: "#FFF7ED",
    borderColor: "#FDBA74",
    focusAreas: [
      "Top-tier organizational and industry leadership",
      "Mentoring the next generation of executive leaders",
      "Company ambassador and culture champion",
      "Giving back to the community and industry",
    ],
    sponsorActions: [
      "Peer-level relationship and mutual respect",
      "Celebrate this extraordinary accomplishment",
      "Support their legacy and industry contributions",
      "Learn from their experience and share it with your team",
    ],
    nextRankGoal: "Achieve Integrated Presidential Director — the pinnacle of OPTAVIA leadership",
  },
  15: {
    rank: 15,
    title: "Integrated Presidential Director",
    tier: "Executive",
    emoji: "🏛️",
    color: "#B45309",
    bg: "#FFF7ED",
    borderColor: "#FDBA74",
    focusAreas: [
      "The highest level of OPTAVIA leadership",
      "Organizational legacy that transcends your personal involvement",
      "Industry-level influence and thought leadership",
      "Developing the next generation of Presidential Directors",
    ],
    sponsorActions: [
      "Celebrate this pinnacle achievement",
      "Support their legacy and organizational vision",
      "Learn from their mastery of the business",
      "Collaborate as true partners in the mission",
    ],
    nextRankGoal: null,
  },
}

export function getRankGuidance(rank: number): RankGuidance {
  return RANK_GUIDANCE[rank] || RANK_GUIDANCE[1]
}

export function getTierForRank(rank: number): string {
  if (rank <= 3) return "Getting Started"
  if (rank <= 5) return "Building Momentum"
  if (rank <= 8) return "Team Building"
  if (rank <= 11) return "Leadership"
  return "Executive"
}
