/**
 * Compensation Plan Explained Module
 * Comprehensive training on the OPTAVIA Integrated Compensation Plan
 * Auto-generated from comp-plan-explained-module.json
 */

export interface CompPlanQuizOption {
  text: string
  isCorrect: boolean
}

export interface CompPlanQuiz {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface CompPlanSection {
  title: string
  content: string
  keyPoint?: string
  example?: string
  note?: string
}

export interface CompPlanLesson {
  id: string
  number: number
  title: string
  description: string
  content: {
    overview: string
    sections: any[]
    [key: string]: any
  }
  quiz: CompPlanQuiz[]
}

export interface CompPlanModule {
  module: {
    id: string
    title: string
    subtitle: string
    description: string
    icon: string
    color: string
    estimatedTime: string
    difficulty: string
    prerequisites: string[]
    officialSource: string
    effectiveDate: string
    lastUpdated: string
  }
  lessons: CompPlanLesson[]
  quickReference: {
    volumeTypes: Record<string, string>
    clientSupportMax: Record<string, string>
    fastStartBonuses: Record<string, string>
    consistencyBonuses: Record<string, string>
    fibcRequirements: Record<string, string>
    keyRankMilestones: Record<string, string>
  }
  glossary: Array<{
    term: string
    definition: string
  }>
}

// Full compensation plan module data
export const COMP_PLAN_MODULE: CompPlanModule = {
  "module": {
    "id": "comp-plan-explained",
    "title": "Compensation Plan Explained",
    "subtitle": "Understanding How You Get Paid",
    "description": "Master the OPTAVIA Integrated Compensation Plan. Learn exactly how commissions, bonuses, and rank advancement work so you can maximize your earnings and help your team do the same.",
    "icon": "dollar-sign",
    "color": "#00A651",
    "estimatedTime": "45-60 minutes",
    "difficulty": "Essential",
    "prerequisites": [],
    "officialSource": "https://optaviamedia.com/pdf/learn/OPTAVIA_LRN-Integrated-Compensation-Plan.pdf",
    "effectiveDate": "January 1, 2026",
    "lastUpdated": "2026-01-26"
  },
  "lessons": [
    {
      "id": "lesson-1",
      "number": 1,
      "title": "Understanding Volume Types",
      "description": "The foundation of everything - learn the difference between Compensation Volume and Qualifying Volume",
      "content": {
        "overview": "Before you can understand how you get paid, you need to understand OPTAVIA's two types of volume. This is the foundation everything else builds on.",
        "sections": [
          {
            "title": "Why Two Volume Types?",
            "content": "OPTAVIA uses two types of volume to protect the value of your business and ensure fair compensation across all markets.",
            "keyPoint": "Compensation Volume (CV) determines how much you earn. Qualifying Volume (QV) determines your rank and bonus eligibility."
          },
          {
            "title": "Compensation Volume (CV)",
            "content": "The value assigned to any product for compensation calculation. Products have CV ranging from 0% to 100% of the product price. All commissions and bonuses are paid on CV.",
            "example": "A $400 order might have $370 in Compensation Volume if some items (like shipping) don't count."
          },
          {
            "title": "Qualifying Volume (QV)",
            "content": "The amount assigned to an item to determine rank and bonus qualification. QV standardizes the duplication model so the level of effort stays the same over time and across markets.",
            "example": "The same $400 order might have $355 in Qualifying Volume."
          }
        ],
        "volumeHierarchy": [
          {
            "level": "Personal",
            "cv": "PCV - Personal Compensation Volume",
            "qv": "PQV - Personal Qualifying Volume",
            "description": "The volume from one person's order"
          },
          {
            "level": "Frontline",
            "cv": "FCV - Frontline Compensation Volume",
            "qv": "FQV - Frontline Qualifying Volume",
            "description": "Sum of all PCV/PQV from your Level 1 (personally sponsored) Clients and Coaches"
          },
          {
            "level": "Group",
            "cv": "GCV - Group Compensation Volume",
            "qv": "GQV - Group Qualifying Volume",
            "description": "Sum of all PCV/PQV in your entire organization"
          }
        ],
        "criticalNote": "Your own personal orders (PCV/PQV) are NOT included in your FCV/FQV or GCV/GQV. You are considered a Client of YOUR sponsor, so your personal orders benefit them, not you."
      },
      "quiz": [
        {
          "question": "What determines how much money you actually earn?",
          "options": ["Qualifying Volume (QV)", "Compensation Volume (CV)", "Both equally", "Neither"],
          "correct": 1,
          "explanation": "Compensation Volume (CV) is what your commissions and bonuses are calculated on. QV determines your rank."
        },
        {
          "question": "Does your personal order count toward your own FQV?",
          "options": ["Yes", "No", "Only if it's over $300", "Only in your first 6 months"],
          "correct": 1,
          "explanation": "Your personal orders benefit your sponsor, not you. You're considered their Client."
        }
      ]
    },
    {
      "id": "lesson-2",
      "number": 2,
      "title": "Client Support Compensation",
      "description": "How you earn from supporting your personal Clients",
      "content": {
        "overview": "Client acquisition and support is the foundation of your OPTAVIA business. Here's exactly how you get paid for helping your Clients.",
        "sections": [
          {
            "title": "Client Support Commissions (Base Rate)",
            "content": "Paid weekly on orders from your Frontline (Level 1) Clients.",
            "rates": {
              "first6Months": "15% of FCV",
              "after6Months": "10% of FCV"
            },
            "paymentSchedule": "Weekly - paid the week following orders (Mon-Sun commission week)"
          },
          {
            "title": "Client Support Bonus (Performance Tier)",
            "content": "Additional bonus paid monthly based on your FQV performance. Requires minimum 5 Ordering Entities.",
            "tiers": [
              { "fqv": "<1,200", "bonus": "N/A", "totalFirst6Mo": "15%", "totalAfter6Mo": "10%" },
              { "fqv": "1,200+", "bonus": "10%", "totalFirst6Mo": "25%", "totalAfter6Mo": "20%" },
              { "fqv": "2,400+", "bonus": "12%", "totalFirst6Mo": "27%", "totalAfter6Mo": "22%" },
              { "fqv": "3,600+", "bonus": "14%", "totalFirst6Mo": "29%", "totalAfter6Mo": "24%" },
              { "fqv": "4,800+", "bonus": "16%", "totalFirst6Mo": "31%", "totalAfter6Mo": "26%" },
              { "fqv": "6,000+", "bonus": "18%", "totalFirst6Mo": "33%", "totalAfter6Mo": "28%" }
            ],
            "paymentSchedule": "Monthly - paid on or about the 15th of the following month"
          }
        ],
        "example": {
          "scenario": "Coach in first 6 months with 5 Clients",
          "calculation": [
            "Each Client: 355 PQV / 370 PCV",
            "Total FQV: 355 × 5 = 1,775 FQV",
            "Total FCV: 370 × 5 = 1,850 FCV",
            "Qualifies for: 25% tier (15% commission + 10% bonus)",
            "Earnings: $1,850 × 25% = $462.50"
          ]
        }
      },
      "quiz": [
        {
          "question": "What's the maximum Client Support Compensation percentage in your first 6 months?",
          "options": ["28%", "33%", "25%", "18%"],
          "correct": 1,
          "explanation": "At 6,000+ FQV in your first 6 months, you earn 15% commission + 18% bonus = 33%"
        },
        {
          "question": "How often are Client Support Commissions paid?",
          "options": ["Daily", "Weekly", "Bi-weekly", "Monthly"],
          "correct": 1,
          "explanation": "Base commissions are paid weekly. The bonus portion is paid monthly."
        }
      ]
    },
    {
      "id": "lesson-3",
      "number": 3,
      "title": "Fast Start Bonuses",
      "description": "Special bonuses for new coaches and those who help them succeed",
      "content": {
        "overview": "OPTAVIA rewards coaches who get off to a fast start and sponsors who help them do it.",
        "sections": [
          {
            "title": "Coach Accelerator Bonus (CAB)",
            "content": "Available to NEW coaches in their first 3 months only.",
            "requirements": [
              "Develop at least 5 NEW Frontline Clients",
              "Each Client must order at least 275 PQV in a month",
              "Can earn CAB monthly for first 3 months"
            ],
            "bonus": "$250 per month you qualify",
            "maxEarnings": "$750 (if you earn it all 3 months)",
            "note": "A 'New Frontline Client' is someone who has NEVER previously ordered from OPTAVIA. Company-acquired leads don't count."
          },
          {
            "title": "Accelerator Assist Bonus",
            "content": "For SPONSORS who help their new coaches succeed.",
            "requirements": [
              "Your personally sponsored new Coach earns their first CAB",
              "Must be within their first 3 months"
            ],
            "bonus": "$250 matching bonus",
            "keyPoint": "When your new Coach wins, you win too!"
          }
        ],
        "strategy": {
          "title": "Fast Start Game Plan",
          "steps": [
            "Before signing a new Client, ensure they've never ordered from OPTAVIA before",
            "Help each new Client place an order of at least 275 PQV",
            "Focus your first 3 months on getting 5+ NEW Clients per month",
            "If you're a sponsor, prioritize helping your new Coaches hit CAB"
          ]
        }
      },
      "quiz": [
        {
          "question": "How long do you have to earn the Coach Accelerator Bonus?",
          "options": ["First month only", "First 3 months", "First 6 months", "First year"],
          "correct": 1,
          "explanation": "CAB is only available in your first 3 months as a Coach."
        },
        {
          "question": "What's the minimum PQV each new Client needs for you to earn CAB?",
          "options": ["200 PQV", "250 PQV", "275 PQV", "300 PQV"],
          "correct": 2,
          "explanation": "Each of your 5 new Clients must have at least 275 PQV."
        }
      ]
    },
    {
      "id": "lesson-4",
      "number": 4,
      "title": "Coach Consistency Bonus",
      "description": "Get rewarded for steady, consistent performance",
      "content": {
        "overview": "OPTAVIA rewards coaches who maintain consistent FQV month after month. This bonus recognizes sustained effort.",
        "sections": [
          {
            "title": "How It Works",
            "content": "Maintain qualifying FQV for 3 consecutive months to earn a bonus.",
            "tiers": [
              {
                "requirement": "Minimum 2,000 FQV/month for 3 consecutive months",
                "bonus": "$250"
              },
              {
                "requirement": "Average 4,000 FQV/month for 3 consecutive months",
                "bonus": "$500"
              },
              {
                "requirement": "Average 6,000 FQV/month for 3 consecutive months",
                "bonus": "$1,000"
              }
            ]
          },
          {
            "title": "Critical Rules",
            "rules": [
              "FQV cannot fall below 2,000 in ANY month or the clock resets",
              "The 3-month cycle can begin in any month",
              "You can earn this bonus up to 4 times per 12-month period",
              "For higher tiers, it's the AVERAGE that matters (you can have one lower month if others make up for it)"
            ]
          }
        ],
        "example": {
          "scenario": "Going for $500 bonus (4,000 average)",
          "months": [
            { "month": "January", "fqv": 3500, "status": "Below 4,000 but above 2,000 minimum" },
            { "month": "February", "fqv": 4200, "status": "Above average" },
            { "month": "March", "fqv": 4300, "status": "Above average" }
          ],
          "calculation": "Average: (3500 + 4200 + 4300) / 3 = 4,000 ✓",
          "result": "Earns $500 bonus!"
        },
        "failureExample": {
          "scenario": "Clock Reset",
          "months": [
            { "month": "January", "fqv": 4500 },
            { "month": "February", "fqv": 1800, "problem": "Below 2,000 minimum!" },
            { "month": "March", "fqv": 5000 }
          ],
          "result": "No bonus - February broke the 2,000 minimum requirement. Clock resets in March."
        }
      },
      "quiz": [
        {
          "question": "What happens if your FQV drops to 1,500 in month 2 of a consistency cycle?",
          "options": ["You still qualify if month 3 is high enough", "The 3-month clock resets to zero", "You get a partial bonus", "Nothing, minimums don't matter"],
          "correct": 1,
          "explanation": "FQV cannot fall below 2,000 in ANY month or the entire cycle resets."
        },
        {
          "question": "How many times per year can you earn the Consistency Bonus?",
          "options": ["Once", "Twice", "Four times", "Unlimited"],
          "correct": 2,
          "explanation": "You can earn this bonus up to 4 times in a 12-month period."
        }
      ]
    },
    {
      "id": "lesson-5",
      "number": 5,
      "title": "Rank Advancement",
      "description": "Understanding the career path from Coach to IPD",
      "content": {
        "overview": "The OPTAVIA career path rewards both client acquisition AND team building through Qualifying Points.",
        "sections": [
          {
            "title": "What is a Qualifying Point?",
            "content": "Qualifying Points (QP) are earned two ways:",
            "methods": [
              "1 QP for every 1,200 in FQV you generate",
              "1 QP for every qualified Senior Coach Team you have"
            ],
            "example": "With 2,400 FQV and 1 SC Team = 2 + 1 = 3 Qualifying Points (Associate Director)"
          },
          {
            "title": "What is an Ordering Entity?",
            "content": "Any Frontline Client or Coach with positive PQV in the month, OR a Coach Team with positive GQV.",
            "note": "Clients with zero or negative PQV (due to returns) don't count."
          }
        ],
        "rankTable": [
          {
            "rank": "Coach",
            "requirements": "Less than 1,200 GQV and 5 Ordering Entities",
            "qpNeeded": null
          },
          {
            "rank": "Senior Coach",
            "abbreviation": "SC",
            "requirements": "1,200 GQV and 5 Ordering Entities",
            "qpNeeded": null,
            "keyMilestone": true
          },
          {
            "rank": "Manager",
            "requirements": "Qualified SC + 2 Qualifying Points",
            "qpNeeded": 2
          },
          {
            "rank": "Associate Director",
            "abbreviation": "AD",
            "requirements": "Qualified SC + 3 Qualifying Points",
            "qpNeeded": 3
          },
          {
            "rank": "Director",
            "requirements": "Qualified SC + 4 Qualifying Points",
            "qpNeeded": 4
          },
          {
            "rank": "Executive Director",
            "abbreviation": "ED",
            "requirements": "Qualified SC + 5 Qualifying Points",
            "qpNeeded": 5,
            "keyMilestone": true
          },
          {
            "rank": "Integrated Executive Director (FIBC)",
            "abbreviation": "IED/FIBC",
            "requirements": "Qualified ED + 6,000 FQV + 5 SC Teams + 15,000 GQV",
            "keyMilestone": true,
            "note": "Also known as Fully Integrated Business Coach"
          }
        ],
        "advancedRanks": [
          {
            "rank": "Regional Director",
            "requirements": "Qualified ED + 1 ED Team"
          },
          {
            "rank": "Integrated Regional Director",
            "requirements": "Qualified FIBC + 1 ED Team"
          },
          {
            "rank": "National Director",
            "requirements": "Qualified ED + 3 ED Teams"
          },
          {
            "rank": "Integrated National Director",
            "requirements": "Qualified FIBC + 3 ED Teams"
          },
          {
            "rank": "Global Director",
            "requirements": "Qualified ED + 5 ED Teams"
          },
          {
            "rank": "Integrated Global Director (FIBL)",
            "requirements": "Qualified ED + 5 FIBC Teams",
            "note": "Also known as Fully Integrated Business Leader"
          },
          {
            "rank": "Presidential Director",
            "requirements": "Qualified ED + 10 ED Teams"
          },
          {
            "rank": "Integrated Presidential Director",
            "abbreviation": "IPD",
            "requirements": "Qualified FIBL + 5 additional ED Teams (10 total, 5 must be FIBC)",
            "keyMilestone": true
          }
        ],
        "importantNote": "You are PAID based on your current monthly rank performance, not your recognition title. Recognition title (highest achieved) is for recognition only."
      },
      "quiz": [
        {
          "question": "How many Qualifying Points do you need to reach Executive Director?",
          "options": ["3", "4", "5", "6"],
          "correct": 2,
          "explanation": "Executive Director requires Qualified Senior Coach status plus 5 Qualifying Points."
        },
        {
          "question": "How can you earn a Qualifying Point?",
          "options": ["Only through FQV", "Only through SC Teams", "Either 1,200 FQV OR 1 SC Team", "You can't earn them"],
          "correct": 2,
          "explanation": "You earn 1 QP for every 1,200 FQV OR every qualified Senior Coach Team."
        }
      ]
    },
    {
      "id": "lesson-6",
      "number": 6,
      "title": "Team Growth Bonus",
      "description": "Earning on your team's volume beyond Level 1",
      "content": {
        "overview": "Once you're a qualified Senior Coach or higher, you can earn on Coaches and their Teams beyond your Frontline.",
        "sections": [
          {
            "title": "How It Works",
            "content": "You earn a percentage on the volume of Coach Teams below your Frontline, based on YOUR rank and THEIR team rank.",
            "keyRule": "You earn the 'gap' between what you're entitled to and what the Coach above that team is earning."
          },
          {
            "title": "Team Growth Bonus Percentages",
            "note": "Paid on Level 2 and below (NOT your Frontline - that's covered by Client Support)",
            "table": {
              "headers": ["Team Rank", "SC Earns", "Manager Earns", "AD Earns", "Director Earns", "ED Earns"],
              "rows": [
                { "teamRank": "Coach", "sc": "4%", "manager": "6%", "ad": "8%", "director": "10%", "ed": "12%" },
                { "teamRank": "Senior Coach", "sc": "-", "manager": "2%", "ad": "4%", "director": "6%", "ed": "8%" },
                { "teamRank": "Manager", "sc": "-", "manager": "-", "ad": "2%", "director": "4%", "ed": "6%" },
                { "teamRank": "Associate Director", "sc": "-", "manager": "-", "ad": "-", "director": "2%", "ed": "4%" },
                { "teamRank": "Director", "sc": "-", "manager": "-", "ad": "-", "director": "-", "ed": "2%" },
                { "teamRank": "Executive Director", "sc": "-", "manager": "-", "ad": "-", "director": "-", "ed": "See Gen Bonus" }
              ]
            }
          }
        ],
        "example": {
          "scenario": "You're an Integrated Regional Director",
          "structure": [
            "Level 1 (Frontline): Manager - NOT included in Team Growth (covered by Client Support)",
            "Level 2: Senior Coach Team → You earn 8%",
            "Level 3: Manager Team → You earn 6%",
            "Level 4: Director Team → You earn 4%",
            "Level 5: Associate Director Team → You earn 2%",
            "Level 6: Executive Director Team → Covered by ED Generation Bonus"
          ]
        },
        "gapPrinciple": {
          "title": "Earning the Gap",
          "explanation": "If there's a Manager in your downline earning 6% on a Coach team below them, and you're entitled to 12% as an ED, you earn the remaining 6% (the gap)."
        }
      },
      "quiz": [
        {
          "question": "As an Executive Director, what percentage do you earn on a Coach team in your downline?",
          "options": ["4%", "8%", "10%", "12%"],
          "correct": 3,
          "explanation": "Executive Directors earn 12% on Coach teams in their downline."
        },
        {
          "question": "Does Team Growth Bonus pay on your Frontline (Level 1)?",
          "options": ["Yes", "No", "Only if they're Coaches", "Only above 1,200 FQV"],
          "correct": 1,
          "explanation": "Team Growth pays on Level 2 and below. Your Frontline is covered by Client Support compensation."
        }
      ]
    },
    {
      "id": "lesson-7",
      "number": 7,
      "title": "FIBC & FIBC Consistency Bonus",
      "description": "Mastering the Fully Integrated Business Coach level",
      "content": {
        "overview": "FIBC represents mastery of both Client Support AND Team Building. It's a major milestone that unlocks additional bonuses and recognition.",
        "sections": [
          {
            "title": "FIBC Qualification",
            "requirements": [
              "Qualify as Executive Director",
              "6,000+ Frontline Qualifying Volume (FQV)",
              "5+ Qualified Senior Coach Teams",
              "15,000+ Group Qualifying Volume (GQV)"
            ],
            "note": "Must meet ALL requirements in the same Monthly Bonus Period"
          },
          {
            "title": "FIBC Consistency Bonus",
            "content": "Maintain FIBC qualification for 3 consecutive months to earn $1,000.",
            "requirements": [
              "6,000+ FQV each month",
              "5+ SC Teams each month",
              "15,000+ GQV each month",
              "For 3 consecutive months"
            ],
            "frequency": "Can earn up to 4 times per 12-month period"
          },
          {
            "title": "Why FIBC Matters",
            "benefits": [
              "Unlocks 'Integrated' rank titles (IRD, IND, IGD, IPD)",
              "$1,000 consistency bonus (up to $4,000/year)",
              "Recognized as having mastered both competencies",
              "Required foundation for Integrated Presidential Director"
            ]
          }
        ],
        "strategy": {
          "title": "Path to FIBC",
          "steps": [
            "Build strong personal client base (6,000 FQV requires ~16-17 active clients)",
            "Focus on developing 5 separate Senior Coach legs",
            "Help each SC leg build to contribute to your 15,000 GQV",
            "Use the FIBC Daily Tracker to monitor progress"
          ]
        }
      },
      "quiz": [
        {
          "question": "What's the FQV requirement for FIBC?",
          "options": ["4,000", "5,000", "6,000", "10,000"],
          "correct": 2,
          "explanation": "FIBC requires 6,000 FQV along with 5 SC Teams and 15,000 GQV."
        },
        {
          "question": "How much is the FIBC Consistency Bonus?",
          "options": ["$250", "$500", "$750", "$1,000"],
          "correct": 3,
          "explanation": "The FIBC Consistency Bonus is $1,000 for maintaining FIBC for 3 consecutive months."
        }
      ]
    },
    {
      "id": "lesson-8",
      "number": 8,
      "title": "Executive Director Generation Bonus",
      "description": "Leadership compensation for developing Executive Directors",
      "content": {
        "overview": "Once you reach Regional Director or higher, you earn on 'Generations' of Executive Directors in your organization.",
        "sections": [
          {
            "title": "What is a Generation?",
            "content": "A Generation is all the Coaches and Clients within a qualified Executive Director's organization, down to the next qualified ED in depth.",
            "visual": "ED → (all their team) → next ED = One Generation"
          },
          {
            "title": "Generation Bonus Percentages",
            "note": "Paid as percentage of each ED's Group Compensation Volume (GCV)",
            "table": {
              "headers": ["Generation", "RD", "IRD", "ND", "IND", "GD", "IGD", "PD", "IPD"],
              "rows": [
                { "gen": "1", "rd": "2.5%", "ird": "2.5%", "nd": "2.5%", "ind": "2.5%", "gd": "2.5%", "igd": "2.5%", "pd": "2.5%", "ipd": "2.5%" },
                { "gen": "2", "rd": "-", "ird": "2.5%", "nd": "2.5%", "ind": "2.5%", "gd": "2.5%", "igd": "2.5%", "pd": "2.5%", "ipd": "2.5%" },
                { "gen": "3", "rd": "-", "ird": "-", "nd": "-", "ind": "2%", "gd": "2%", "igd": "2%", "pd": "2%", "ipd": "2%" },
                { "gen": "4", "rd": "-", "ird": "-", "nd": "-", "ind": "-", "gd": "-", "igd": "2%", "pd": "2%", "ipd": "2%" },
                { "gen": "5", "rd": "-", "ird": "-", "nd": "-", "ind": "-", "gd": "-", "igd": "-", "pd": "1.5%", "ipd": "1.5%" },
                { "gen": "6", "rd": "-", "ird": "-", "nd": "-", "ind": "-", "gd": "-", "igd": "-", "pd": "-", "ipd": "1.5%" }
              ]
            }
          },
          {
            "title": "Key Concept: ED Teams",
            "content": "An ED Team is a unique Line of Sponsorship starting with the first qualified ED in depth.",
            "important": "ED Teams do NOT need to be personally sponsored! The first ED in any leg qualifies that leg as an ED Team."
          }
        ],
        "example": {
          "scenario": "You're a Presidential Director",
          "earnings": [
            "Generation 1 ED: 2.5% of their GCV",
            "Generation 2 ED: 2.5% of their GCV",
            "Generation 3 ED: 2% of their GCV",
            "Generation 4 ED: 2% of their GCV",
            "Generation 5 ED: 1.5% of their GCV",
            "Generation 6 ED: Not earned (need IPD for 6th generation)"
          ]
        }
      },
      "quiz": [
        {
          "question": "How many generations deep does an IPD earn on?",
          "options": ["4", "5", "6", "Unlimited"],
          "correct": 2,
          "explanation": "An Integrated Presidential Director earns on 6 generations of Executive Directors."
        },
        {
          "question": "Does an ED Team need to be personally sponsored to count?",
          "options": ["Yes, always", "No, the first ED in any leg qualifies it", "Only for RD qualification", "Only above National Director"],
          "correct": 1,
          "explanation": "ED Teams do NOT need to be personally sponsored. The first qualified ED in any line of sponsorship qualifies that team."
        }
      ]
    },
    {
      "id": "lesson-9",
      "number": 9,
      "title": "Elite Leadership Bonuses",
      "description": "Top-tier compensation for National Directors and above",
      "content": {
        "overview": "Elite Leadership Bonuses reward top leaders for their role in directing and overseeing large OPTAVIA organizations.",
        "sections": [
          {
            "title": "Three Overlapping Bonuses",
            "content": "There are three Elite Leadership Bonuses that STACK (you can earn multiple):",
            "bonuses": [
              {
                "name": "National Elite Leadership Bonus",
                "rate": "0.5%",
                "requirement": "Qualified National Director or higher",
                "paidOn": "Entire organization down to 2nd National Director in each leg"
              },
              {
                "name": "Global Elite Leadership Bonus",
                "rate": "0.5%",
                "requirement": "Qualified Global Director or higher",
                "paidOn": "Entire organization down to 2nd Global Director in each leg"
              },
              {
                "name": "Presidential Elite Leadership Bonus",
                "rate": "0.5%",
                "requirement": "Qualified Presidential Director or higher",
                "paidOn": "Entire organization down to 2nd Presidential Director in each leg"
              }
            ]
          },
          {
            "title": "How It Works",
            "content": "You earn 0.5% on your entire business down to the SECOND qualified leader at your rank level or above.",
            "keyPoint": "You earn on the personal order of the 2nd leader but NOT on their team's volume."
          },
          {
            "title": "Why They Stack",
            "example": "As a Presidential Director, you earn:",
            "breakdown": [
              "0.5% National Elite (down to 2nd ND)",
              "0.5% Global Elite (down to 2nd GD)",
              "0.5% Presidential Elite (down to 2nd PD)",
              "Total potential: 1.5% on deep portions of your organization"
            ]
          }
        ],
        "potential": {
          "title": "Deep Earning Potential",
          "content": "Elite Leadership Bonuses can pay DEEPER than Generation Bonuses because they go down to the 2nd qualified leader at your level, regardless of how many EDs are in between."
        }
      },
      "quiz": [
        {
          "question": "What percentage is each Elite Leadership Bonus?",
          "options": ["0.25%", "0.5%", "1%", "2.5%"],
          "correct": 1,
          "explanation": "Each of the three Elite Leadership Bonuses pays 0.5%."
        },
        {
          "question": "Can a Presidential Director earn all three Elite Leadership Bonuses?",
          "options": ["No, only one", "Yes, they stack", "Only National and Global", "Only Presidential"],
          "correct": 1,
          "explanation": "The three bonuses overlap and stack. A PD can earn National, Global, AND Presidential Elite bonuses."
        }
      ]
    },
    {
      "id": "lesson-10",
      "number": 10,
      "title": "Payment & Recognition Rules",
      "description": "When you get paid and how recognition works",
      "content": {
        "overview": "Understanding payment schedules and the difference between qualified rank and recognition title.",
        "sections": [
          {
            "title": "Payment Schedule",
            "payments": [
              {
                "type": "Weekly Commissions (Client Support)",
                "schedule": "Paid the week following the commission week (Monday-Sunday)",
                "note": "Base rate only (15% or 10%). Bonus percentage paid monthly."
              },
              {
                "type": "Monthly Bonuses",
                "schedule": "Paid on or about the 15th of the following month",
                "includes": "Client Support Bonus, Team Growth, Generation Bonuses, Consistency Bonuses, Elite Leadership"
              }
            ],
            "method": "All compensation disbursed via OPTAVIA PAY virtual portal"
          },
          {
            "title": "Qualified Rank vs Recognition Title",
            "content": "Critical distinction!",
            "qualifiedRank": {
              "definition": "The rank you actually qualify for THIS month based on current performance",
              "impact": "Determines what you GET PAID"
            },
            "recognitionTitle": {
              "definition": "The highest rank you've ever achieved",
              "impact": "Used for recognition, events, invitations ONLY",
              "maintenance": "Subject to maintenance requirements for integrated ranks"
            },
            "example": "Your title might be Global Director, but if you only qualified as National Director this month, you're PAID as a National Director."
          },
          {
            "title": "Recognition Title Maintenance",
            "content": "For Integrated Executive Director and above:",
            "rule": "Must reach AND maintain qualifications for 3 consecutive months to be recognized at that title rank."
          },
          {
            "title": "Dispute Resolution",
            "content": "If you have questions about qualification, ranking, or performance:",
            "deadline": "You have 2 business days from end of the Weekly or Monthly period to notify OPTAVIA",
            "action": "Review your performance via OPTAVIA CONNECT throughout the month"
          }
        ],
        "monthlyBonusPeriod": {
          "start": "12:00 AM PST on the 1st of the month",
          "end": "11:59 PM PST on the last day of the month",
          "note": "Returns and refunds are NOT processed on the last day of the month"
        }
      },
      "quiz": [
        {
          "question": "If your recognition title is Global Director but you only qualify as Executive Director this month, what rank do you get paid at?",
          "options": ["Global Director", "Executive Director", "Average of both", "Whichever is higher"],
          "correct": 1,
          "explanation": "You are PAID based on your qualified rank (current month performance), not your recognition title."
        },
        {
          "question": "When are monthly bonuses paid?",
          "options": ["Last day of the month", "First of the following month", "On or about the 15th of following month", "Weekly"],
          "correct": 2,
          "explanation": "Monthly bonuses are paid on or about the 15th of the month following the Monthly Bonus Period."
        }
      ]
    }
  ],
  "quickReference": {
    "volumeTypes": {
      "CV": "Compensation Volume - What you're paid on",
      "QV": "Qualifying Volume - Determines rank",
      "PCV/PQV": "Personal - One person's order",
      "FCV/FQV": "Frontline - Your Level 1 total",
      "GCV/GQV": "Group - Your entire organization"
    },
    "clientSupportMax": {
      "first6Months": "33% at 6,000+ FQV",
      "after6Months": "28% at 6,000+ FQV"
    },
    "fastStartBonuses": {
      "CAB": "$250 for 5 new clients with 275+ PQV (first 3 months)",
      "AAB": "$250 matching bonus when your new coach earns CAB"
    },
    "consistencyBonuses": {
      "coach": "$250/$500/$1,000 for 2K/4K/6K FQV avg over 3 months",
      "fibc": "$1,000 for maintaining FIBC for 3 consecutive months"
    },
    "fibcRequirements": {
      "fqv": "6,000+",
      "scTeams": "5+",
      "gqv": "15,000+"
    },
    "keyRankMilestones": {
      "seniorCoach": "1,200 GQV + 5 Ordering Entities",
      "executiveDirector": "SC + 5 Qualifying Points",
      "fibc": "ED + 6K FQV + 5 SC Teams + 15K GQV",
      "ipd": "FIBL + 10 ED Teams (5 must be FIBC)"
    }
  },
  "glossary": [
    { "term": "CV", "definition": "Compensation Volume - value assigned to products for pay calculation" },
    { "term": "QV", "definition": "Qualifying Volume - value assigned to products for rank qualification" },
    { "term": "FQV", "definition": "Frontline Qualifying Volume - QV from your Level 1" },
    { "term": "GQV", "definition": "Group Qualifying Volume - QV from your entire organization" },
    { "term": "QP", "definition": "Qualifying Point - 1 per 1,200 FQV or 1 per SC Team" },
    { "term": "SC", "definition": "Senior Coach - 1,200 GQV + 5 Ordering Entities" },
    { "term": "ED", "definition": "Executive Director - SC + 5 Qualifying Points" },
    { "term": "FIBC", "definition": "Fully Integrated Business Coach - ED + 6K FQV + 5 SC Teams + 15K GQV" },
    { "term": "FIBL", "definition": "Fully Integrated Business Leader - ED + 5 FIBC Teams" },
    { "term": "IPD", "definition": "Integrated Presidential Director - FIBL + 10 ED Teams (5 FIBC)" },
    { "term": "Generation", "definition": "All Coaches/Clients within an ED's org down to next ED" },
    { "term": "Ordering Entity", "definition": "Frontline Client/Coach with positive PQV in the month" },
    { "term": "Compression", "definition": "Unqualified Coaches in line are skipped for certain bonuses" }
  ]
}

// Helper functions
export function getLessonById(lessonId: string): CompPlanLesson | undefined {
  return COMP_PLAN_MODULE.lessons.find(l => l.id === lessonId)
}

export function getLessonByNumber(number: number): CompPlanLesson | undefined {
  return COMP_PLAN_MODULE.lessons.find(l => l.number === number)
}

export function getGlossaryTerm(term: string): string | undefined {
  const entry = COMP_PLAN_MODULE.glossary.find(g => g.term.toLowerCase() === term.toLowerCase())
  return entry?.definition
}
