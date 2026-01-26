/**
 * Coach Assistant Academy Data
 * Version 4.0 - Complete lesson and resource structure
 * Auto-generated from coach-assistant-academy-data.json
 */

export interface AcademyResource {
  title: string
  type: "doc" | "video" | "pdf" | "link" | "canva" | "form"
  url: string
  description: string
}

export interface AcademyLesson {
  id: string
  number: string
  title: string
  description: string
  resources: AcademyResource[]
  milestones: string[]
}

export interface AcademyModule {
  id: string
  number: number
  title: string
  description: string
  rankRequirement: string
  rankRequirementCode: string
  icon: string
  lessons: AcademyLesson[]
}

export interface ClientSupportCategory {
  title: string
  resources: AcademyResource[]
}

export interface ClientSupportResources {
  title: string
  description: string
  categories: ClientSupportCategory[]
}

export interface AcademyData {
  academy: {
    title: string
    description: string
    version: string
    totalModules: number
    totalLessons: number
    totalResources: number
  }
  modules: AcademyModule[]
  clientSupportResources: ClientSupportResources
  rankCodes: Record<string, { name: string; level: number }>
}

// Full academy data
export const ACADEMY_DATA: AcademyData = {
  "academy": {
    "title": "Coach Assistant Academy",
    "description": "Structured courses to elevate your coaching career",
    "version": "4.0",
    "totalModules": 6,
    "totalLessons": 24,
    "totalResources": 119
  },
  "modules": [
    {
      "id": "module-1",
      "number": 1,
      "title": "New Coach Foundations",
      "description": "Master the fundamentals of your coaching business. This module covers everything from setup and branding through launching your business and acquiring your first clients.",
      "rankRequirement": "New Coach",
      "rankRequirementCode": "NEW_COACH",
      "icon": "graduation-cap",
      "lessons": [
        {
          "id": "lesson-1-1",
          "number": "1.1",
          "title": "Welcome & Getting Started",
          "description": "Your orientation to the coaching business and first critical steps.",
          "resources": [
            {
              "title": "New Coach Welcome Letter",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1arNc-lNb1zJ2WJ0VS87Dpfre973u-IboIYxQqNUr7Vs/edit?usp=sharing",
              "description": "First steps, what to expect, key resources"
            },
            {
              "title": "New Coach Checklist",
              "type": "doc",
              "url": "https://docs.google.com/document/d/118onAvS-zWGDClUpkSOLEcXhRNnuaCir/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
              "description": "Step-by-step checklist for getting started"
            },
            {
              "title": "How to Purchase Your Coaching Kit",
              "type": "video",
              "url": "https://vimeo.com/548985412",
              "description": "Video walkthrough of kit purchase"
            },
            {
              "title": "OPTAVIA Vocabulary",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1jLPNcT5cROxHm8y_XWpCC4AQjnMo9bjwZs-Kz5UVXTY/edit?usp=sharing",
              "description": "Glossary of OPTAVIA terms and acronyms"
            },
            {
              "title": "OPTAVIA Compensation Plan",
              "type": "pdf",
              "url": "https://optaviamedia.com/pdf/learn/OPTAVIA_LRN-Integrated-Compensation-Plan.pdf",
              "description": "Official compensation plan document"
            },
            {
              "title": "OPTAVIA Coach Kit",
              "type": "link",
              "url": "https://www.optavia.com/us/en/optavia-coach-business-kit/p/optavia-coach-business-kit-kt",
              "description": "Purchase link for coaching kit"
            }
          ],
          "milestones": [
            "Coach kit ordered",
            "Welcome letter and checklist reviewed",
            "Connected with sponsor/upline",
            "Compensation plan understood"
          ]
        },
        {
          "id": "lesson-1-2",
          "number": "1.2",
          "title": "Business Setup & Branding",
          "description": "Setting up the technical and branding foundations of your business.",
          "resources": [
            {
              "title": "Branding and Setting Up Your Business",
              "type": "doc",
              "url": "https://docs.google.com/document/d/10aK_KwiHBXsVuUzRS2DjFmly0QH_VJ44ohSIMuxEJ3A/edit?usp=sharing",
              "description": "Complete branding guide"
            },
            {
              "title": "Setting Up Your Coaching Website",
              "type": "video",
              "url": "https://youtu.be/xtSR2nJJfAg?si=dHRxhzOE_b1wcIF5",
              "description": "Website setup tutorial"
            },
            {
              "title": "Setting Up Your OPTAVIA Pay",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1LuGK2ZNo8lFI51vesDKKHdUDCpgKhvtztv3-KS06KvE/edit?usp=sharing",
              "description": "Commission payment setup"
            },
            {
              "title": "How to Add a Disclaimer to Your Pictures",
              "type": "video",
              "url": "https://www.youtube.com/watch?v=Z4ABPUk5JHs",
              "description": "Compliance for transformation photos"
            },
            {
              "title": "How to Add a Wellness Credit",
              "type": "video",
              "url": "https://vimeo.com/473831198",
              "description": "Legal compliance for posts"
            },
            {
              "title": "Adam Tarleton Tax Talk",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1l7Q4nUmVZhjt5m0P4H9jaAjQ30LhpVP5SZ3yh9cn9PI/edit?usp=sharing",
              "description": "Tax considerations for coaches"
            },
            {
              "title": "Real Talk - Finances",
              "type": "video",
              "url": "https://vimeo.com/830269095/516b60d6c1",
              "description": "Financial realities of the business"
            }
          ],
          "milestones": [
            "OPTAVIA Pay configured",
            "Website/landing page set up",
            "Social media bios updated with compliant language",
            "Tax tracking system in place"
          ]
        },
        {
          "id": "lesson-1-3",
          "number": "1.3",
          "title": "Launching Your Business",
          "description": "Preparing and executing your public launch announcement.",
          "resources": [
            {
              "title": "How to Prepare for Your Social Media Launch",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1MmQrsmqenglJr_SenBcBH_qkc4k6mWe_/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
              "description": "Bio updates, content planning, strategy"
            },
            {
              "title": "Week One Posting Guide",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1DIV9pEZlmqzA8ZIAnCPExQ_KhOedjA38OauiOqtqL5c/edit?usp=sharing",
              "description": "Daily posting guide for launch week"
            },
            {
              "title": "How to Work Your Launch Post and Common Mistakes",
              "type": "doc",
              "url": "https://docs.google.com/document/d/11tutR54Y_rDUUWkQupfY8cHN9n_VH-fIQPwnTSnDLnU/edit?usp=sharing",
              "description": "Timing, engagement, responding to comments"
            },
            {
              "title": "How to Create a Simple Reel",
              "type": "video",
              "url": "https://vimeo.com/1147526154",
              "description": "Creating engaging video content"
            },
            {
              "title": "Effective Hashtags",
              "type": "doc",
              "url": "https://docs.google.com/document/d/11HxoyfVs5Ns6ysDWCzBj4R8hEERVb6MOBdama6zNYko/edit?usp=sharing",
              "description": "Hashtag strategy for reach"
            }
          ],
          "milestones": [
            "Launch date set",
            "First week of content drafted",
            "Launch post published",
            "Engaged with all comments within 24 hours"
          ]
        },
        {
          "id": "lesson-1-4",
          "number": "1.4",
          "title": "Building Your Prospect List",
          "description": "Creating and working a warm market list systematically.",
          "resources": [
            {
              "title": "How to Create a 100's List with Dan Valentine",
              "type": "video",
              "url": "https://vimeo.com/810322204/8904d629b4",
              "description": "Building your prospect list systematically"
            },
            {
              "title": "How to Create a 100's List with Allie McCabe",
              "type": "video",
              "url": "https://vimeo.com/791536952/642c420335",
              "description": "Alternative approach to list building"
            },
            {
              "title": "How to Start Conversations",
              "type": "video",
              "url": "https://youtu.be/-mt9RIrgzIY",
              "description": "Initiating prospect conversations"
            },
            {
              "title": "How to Have Effective Conversations",
              "type": "canva",
              "url": "https://www.canva.com/design/DAGwKmV4-qY/jcb8D4BueFoAYZsc8uERiQ/view?utm_content=DAGwKmV4-qY&utm_campaign=designshare&utm_medium=link&utm_source=viewer",
              "description": "Visual guide to prospect conversations"
            },
            {
              "title": "Interacting with the Likes",
              "type": "video",
              "url": "https://vimeo.com/810981023/dc92d43d3b",
              "description": "Engaging with social media interactions"
            },
            {
              "title": "Weigh Day Post with Allie McCabe",
              "type": "video",
              "url": "https://vimeo.com/814509040/e81b22cdbc",
              "description": "Creating effective weigh day content"
            }
          ],
          "milestones": [
            "100+ names on prospect list",
            "Daily conversation habit established",
            "Social media engagement system in place"
          ]
        },
        {
          "id": "lesson-1-5",
          "number": "1.5",
          "title": "The Health Assessment",
          "description": "Mastering the discovery call that converts prospects to clients.",
          "resources": [
            {
              "title": "How to Nail the Health Assessment",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1A8UIEidVXGrz8jeDsqKbrRVPbbpWc3b0/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
              "description": "Scripts for opening, goals, motivation, closing"
            },
            {
              "title": "Health Assessment Training Resources",
              "type": "doc",
              "url": "https://docs.google.com/document/d/13V_-yPDivM_4k8K34ly4qjxMopxb52_qEypK4NiBld4/edit?usp=sharing",
              "description": "Transitioning conversations to health assessments"
            },
            {
              "title": "Sample Metabolic Jot Form",
              "type": "form",
              "url": "https://form.jotform.com/260074236698060",
              "description": "Digital health assessment form template (clone before using)"
            },
            {
              "title": "10 Questions to Gauge Metabolic Health",
              "type": "video",
              "url": "https://vimeo.com/1135751990/8205c4652d?fl=tl&fe=ec",
              "description": "Diagnostic questions for assessments"
            },
            {
              "title": "Metabolic Talking Points for Coaches",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1GzyY4Je8wWtYxoY7DsuVlPTgCJWdEUzK8jp4UmS6MnQ/edit?usp=sharing",
              "description": "Key talking points for metabolic health"
            },
            {
              "title": "Common Objections and How to Address Them",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1TQPw-pKAllqEz7MZXa3XEsxjN5Jo1T5b/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
              "description": "Cost, time, spouse approval, skepticism scripts"
            },
            {
              "title": "Handling Cost Objections",
              "type": "video",
              "url": "https://vimeo.com/1087174282/597b964a37",
              "description": "Specific training on price concerns"
            },
            {
              "title": "How to Use Klarna to Pay for an Order",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1o4eAoI6ljXyODnrHCOSIL34rx_7-LngJV1w5xq-nPtU/edit?usp=sharing",
              "description": "Payment plan option for prospects"
            },
            {
              "title": "Effective Follow Up After a Health Assessment",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1D-DyRUeV5r4jipqnudUxweh3HGFh_hPD/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
              "description": "Follow-up templates for yes/maybe/not-now"
            }
          ],
          "milestones": [
            "Health assessment script memorized",
            "JotForm cloned and customized",
            "Objection responses practiced with sponsor",
            "First client signed!"
          ]
        },
        {
          "id": "lesson-1-6",
          "number": "1.6",
          "title": "Coaching Your First Clients",
          "description": "Setting up clients for success from day one through month one.",
          "resources": [
            {
              "title": "New Client Checklist",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1c8WqcDJPVmSm6h9Ss2x3V02L0apIemDp/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
              "description": "Complete checklist for new client setup"
            },
            {
              "title": "Welcome and 9 Tips Text",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1x9k469K6XvuQ8rcPdgR3z4i9iXKLxBvSIR_77UuDgpM/edit?usp=sharing",
              "description": "Welcome message with 9 essential success tips"
            },
            {
              "title": "5 Success Tips",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1nss0Lsj1L6jr0X8AEZHZ4cdLOt9vW_SZXokHHLy-r9M/edit?usp=sharing",
              "description": "Quick reference success tips"
            },
            {
              "title": "Universal Metabolic Health Kickoff Video",
              "type": "video",
              "url": "https://vimeo.com/user118093373/teamstrongkickoff",
              "description": "Journey kickoff call template"
            },
            {
              "title": "Lean and Green Video",
              "type": "video",
              "url": "https://vimeo.com/414057972",
              "description": "Visual guide to lean and green meals"
            },
            {
              "title": "Schedule for New Client Communication",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1iYiwp4tMmlmqFDj8JoG8PNiFbF4ed6yRnMJnRMmzW1g/edit?usp=sharing",
              "description": "Daily, weekly, milestone touchpoint schedule"
            },
            {
              "title": "Metabolic Reset Day Before Text",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1V4vgLqx6-0uE9ZRfIp7024tTCB5NoqjHa0YAbV0_RlU/edit?usp=sharing",
              "description": "Preparation message before client starts"
            },
            {
              "title": "Metabolic Reset Daily Texts Days 1-9",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1gtH2fYDKLA6f3sv6-yxFUM8b6rLBqp8jF5R7h4ec6i4/edit?usp=sharing",
              "description": "Daily text templates for first 9 days"
            },
            {
              "title": "Day 1-4 Daily Check In Questions",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1xZJ_afiL_W4YcinCkM6NbNWrH2GqZmRnS1XrB_BRLIM/edit?usp=sharing",
              "description": "Specific questions for early days"
            },
            {
              "title": "Optional Metabolic Health Texts Days 10-31",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1G9YtI07xIvazS4KZcCkLlB4N_E1axueXVeV4R0Na4Yc/edit?usp=sharing",
              "description": "Extended daily templates for full month"
            },
            {
              "title": "Systems Check Questions",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1xZJ_afiL_W4YcinCkM6NbNWrH2GqZmRnS1XrB_BRLIM/edit?usp=sharing",
              "description": "Troubleshooting questions for struggling clients"
            },
            {
              "title": "Detailed Systems Check for Clients Not Losing Well",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1HLqL_l7IELKgjlx5d3SBuXi2xdyBSaawJ5JmcKDoGHM/edit?usp=sharing",
              "description": "Troubleshooting guide for plateaus"
            },
            {
              "title": "VIP Call How To",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1vtYewe5sbVziNTzz3Fk3l3DhRt1x0xTps_hxtYEQk7Q/edit?usp=sharing",
              "description": "Structure and talking points for VIP calls"
            }
          ],
          "milestones": [
            "Kickoff call completed within 48 hours",
            "Daily check-ins happening consistently",
            "VIP call conducted",
            "Client results documented"
          ]
        }
      ]
    },
    {
      "id": "module-2",
      "number": 2,
      "title": "Building Your Business",
      "description": "Scale your coaching practice and develop the habits of a successful business owner. Learn to build consistency, leverage social media, and plant seeds for team building.",
      "rankRequirement": "Senior Coach",
      "rankRequirementCode": "SENIOR_COACH",
      "icon": "trending-up",
      "lessons": [
        {
          "id": "lesson-2-1",
          "number": "2.1",
          "title": "Building Your Daily Rhythm",
          "description": "Establishing consistent activities that drive results.",
          "resources": [
            {
              "title": "Fast Track to Senior Coach",
              "type": "canva",
              "url": "https://www.canva.com/design/DAGRyr_F44Y/3_36EEwhi6JmMZfl1ZKAvw/edit?utm_content=DAGRyr_F44Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
              "description": "Visual roadmap to Senior Coach rank"
            },
            {
              "title": "30 Day New Coach Self-Evaluation",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1nOC6erBMIws-SZzQ40TCz5DEvBQpmVLMUCI5V7E_8Ys/edit?usp=sharing",
              "description": "Self-assessment at 30 days, action planning"
            },
            {
              "title": "Building Your Business Guide",
              "type": "doc",
              "url": "/academy/module-2",
              "description": "Academy module 2 - business building fundamentals"
            },
            {
              "title": "How to Support Your Partner in the Business",
              "type": "video",
              "url": "https://vimeo.com/705369855",
              "description": "Balancing business and relationships"
            }
          ],
          "milestones": [
            "30-day self-evaluation completed",
            "Daily activity rhythm established",
            "Tracking system in place",
            "Senior Coach rank achieved!"
          ]
        },
        {
          "id": "lesson-2-2",
          "number": "2.2",
          "title": "Social Media Mastery",
          "description": "Sustaining visibility and engagement for ongoing lead generation.",
          "resources": [
            {
              "title": "How to Create a Simple Reel",
              "type": "video",
              "url": "https://vimeo.com/1147526154",
              "description": "Creating engaging Reels"
            },
            {
              "title": "Effective Hashtags",
              "type": "doc",
              "url": "https://docs.google.com/document/d/11HxoyfVs5Ns6ysDWCzBj4R8hEERVb6MOBdama6zNYko/edit?usp=sharing",
              "description": "Hashtag strategy for visibility"
            },
            {
              "title": "Weigh Day Post with Allie McCabe",
              "type": "video",
              "url": "https://vimeo.com/814509040/e81b22cdbc",
              "description": "Weekly content that converts"
            },
            {
              "title": "Interacting with the Likes",
              "type": "video",
              "url": "https://vimeo.com/810981023/dc92d43d3b",
              "description": "Turning engagement into conversations"
            },
            {
              "title": "How to Have Effective Conversations",
              "type": "canva",
              "url": "https://www.canva.com/design/DAGwKmV4-qY/jcb8D4BueFoAYZsc8uERiQ/view",
              "description": "Conversation frameworks"
            }
          ],
          "milestones": [
            "Posting consistently 4-5x per week",
            "Engagement increasing month over month",
            "Content batching system in place"
          ]
        },
        {
          "id": "lesson-2-3",
          "number": "2.3",
          "title": "Sponsoring Your First Coaches",
          "description": "Introducing the business opportunity and signing team members.",
          "resources": [
            {
              "title": "The Mindset Behind Effective Sponsorship",
              "type": "video",
              "url": "https://vimeo.com/665762974",
              "description": "Psychology of team building"
            },
            {
              "title": "Sponsoring Coach Pro Tips",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1FKzunmTLyZ_Zal4sG29O9nXk95pWStalxmIlIejfQh0/edit?usp=sharing",
              "description": "Expert tips for sponsoring conversations"
            },
            {
              "title": "Sponsoring Coach Action Steps",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1FTi_PfLWuy_Q2ra9NS8XAf3nUNX5hMWxJ89ZUmO2rU4/edit?usp=sharing",
              "description": "Step-by-step sponsoring actions"
            },
            {
              "title": "MedSpa Introduction",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1Cyv1hiRq4aOGbMG_uC924nepwbm3soylfNMejEbNQGQ/edit?usp=sharing",
              "description": "Introducing opportunity to medical providers"
            },
            {
              "title": "Metabolic Health Coach Business Proposal",
              "type": "canva",
              "url": "https://www.canva.com/design/DAG_hHaPY0o/UExZZaZMgUZtBwxvkbrckg/edit",
              "description": "Professional business proposal template"
            },
            {
              "title": "OPTAVIA Compensation Plan",
              "type": "pdf",
              "url": "https://optaviamedia.com/pdf/learn/OPTAVIA_LRN-Integrated-Compensation-Plan.pdf",
              "description": "Income opportunity documentation"
            }
          ],
          "milestones": [
            "Identified clients with coach potential",
            "Business conversation initiated",
            "First coach signed!",
            "Manager rank achieved!"
          ]
        },
        {
          "id": "lesson-2-4",
          "number": "2.4",
          "title": "Understanding Your Numbers",
          "description": "Mastering OPTAVIA Connect to track and project growth.",
          "resources": [
            {
              "title": "Basic How to Check Your Current and Projected FQV",
              "type": "video",
              "url": "https://www.loom.com/share/799a4ae74a7645aabab8f3d67a4215cf",
              "description": "Navigate reports, understand numbers"
            },
            {
              "title": "How to Run Projected Numbers for Yourself and Team",
              "type": "video",
              "url": "https://www.loom.com/share/9da0ac3751e84db09ee375c9c039c527",
              "description": "Advanced volume projections"
            },
            {
              "title": "How to End the Month Strategically",
              "type": "video",
              "url": "https://vimeo.com/1105267713/6d51506452?fl=tl&fe=ec",
              "description": "Month-end planning, hitting qualifications"
            }
          ],
          "milestones": [
            "Can accurately project monthly volume",
            "Understands rank qualification requirements",
            "Strategic month-end habits established"
          ]
        }
      ]
    },
    {
      "id": "module-3",
      "number": 3,
      "title": "Leadership Development",
      "description": "Transition from individual contributor to leader of leaders. Learn to develop multiple legs, coach your coaches, and build team culture.",
      "rankRequirement": "Executive Director",
      "rankRequirementCode": "EXECUTIVE_DIRECTOR",
      "icon": "users",
      "lessons": [
        {
          "id": "lesson-3-1",
          "number": "3.1",
          "title": "Multi-Leg Development",
          "description": "Building width in your organization for stability and growth.",
          "resources": [
            {
              "title": "Leadership Development Guide",
              "type": "doc",
              "url": "/academy/module-3",
              "description": "Academy leadership training"
            },
            {
              "title": "How to Run Projected Numbers for Team",
              "type": "video",
              "url": "https://www.loom.com/share/9da0ac3751e84db09ee375c9c039c527",
              "description": "Planning volume across legs"
            },
            {
              "title": "How to End the Month Strategically",
              "type": "video",
              "url": "https://vimeo.com/1105267713/6d51506452?fl=tl&fe=ec",
              "description": "Strategic leg balancing"
            }
          ],
          "milestones": [
            "Multiple active legs established",
            "Coaches in each leg producing volume",
            "Director rank achieved!"
          ]
        },
        {
          "id": "lesson-3-2",
          "number": "3.2",
          "title": "Coaching Your Coaches",
          "description": "Developing leaders who can develop others.",
          "resources": [
            {
              "title": "Sponsoring Coach Pro Tips",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1FKzunmTLyZ_Zal4sG29O9nXk95pWStalxmIlIejfQh0/edit?usp=sharing",
              "description": "Tips for developing coaches"
            },
            {
              "title": "New Coach Welcome Letter",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1arNc-lNb1zJ2WJ0VS87Dpfre973u-IboIYxQqNUr7Vs/edit?usp=sharing",
              "description": "Onboarding template for new coaches"
            },
            {
              "title": "New Coach Checklist",
              "type": "doc",
              "url": "https://docs.google.com/document/d/118onAvS-zWGDClUpkSOLEcXhRNnuaCir/edit?usp=sharing",
              "description": "Setup checklist for new coaches"
            },
            {
              "title": "All Recorded Calls for Coaches and Clients",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1ad-MdPRzyrKflK2Y_mHmTBjU0lCVJydJJRsufFIDVko/edit?usp=sharing",
              "description": "Training call library"
            }
          ],
          "milestones": [
            "Regular 1:1s with frontline coaches",
            "Coaches developing their own teams",
            "Second-generation coaches in organization"
          ]
        },
        {
          "id": "lesson-3-3",
          "number": "3.3",
          "title": "Path to FIBC",
          "description": "Understanding and achieving FIBC qualification.",
          "resources": [
            {
              "title": "ED Daily Tracker",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1kCzIHm7DV1WPSTsbTh-NZr4qXj278iZ52vOPs08PfbE/edit",
              "description": "Executive Director daily tracking system"
            },
            {
              "title": "FIBC Daily Tracker",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1WSH2shc6mhmoJubPEdNOwyRC2VPotHOnzvYEBSDx-bk/edit",
              "description": "FIBC-specific daily tracker"
            },
            {
              "title": "Grow to FIBC Bubble Tracker",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1xwxMPmRRdBLHsyNLz1rkgMRDK6f8-_gr/edit",
              "description": "Visual tracker for FIBC progress"
            }
          ],
          "milestones": [
            "FIBC qualification requirements understood",
            "Daily tracking system in place",
            "90-day FIBC plan created",
            "Executive Director rank achieved!"
          ]
        },
        {
          "id": "lesson-3-4",
          "number": "3.4",
          "title": "Advanced Leadership Skills",
          "description": "Leading leaders and building organizational depth.",
          "resources": [
            {
              "title": "10X Kickoff Call with Kristen Glass",
              "type": "video",
              "url": "https://vimeo.com/manage/videos/1115495757/3e666d9fcd",
              "description": "10X methodology for rapid business growth"
            },
            {
              "title": "10X Kickoff Call",
              "type": "video",
              "url": "https://vimeo.com/1114863189?fl=tl&fe=ec",
              "description": "Alternative 10X training"
            },
            {
              "title": "Leadership Development Guide",
              "type": "doc",
              "url": "/academy/module-3",
              "description": "Advanced leadership training"
            }
          ],
          "milestones": [
            "10X methodology implemented",
            "Managers developing on multiple legs",
            "Leadership pipeline identified"
          ]
        }
      ]
    },
    {
      "id": "module-4",
      "number": 4,
      "title": "National Expansion",
      "description": "Scale your organization to regional and national levels. Learn strategies for building independent legs and leading at scale.",
      "rankRequirement": "Integrated Regional Director",
      "rankRequirementCode": "REGIONAL_DIRECTOR",
      "icon": "globe",
      "lessons": [
        {
          "id": "lesson-4-1",
          "number": "4.1",
          "title": "Regional Leadership",
          "description": "Leading significant organizational growth across regions.",
          "resources": [
            {
              "title": "National Expansion Guide",
              "type": "doc",
              "url": "/academy/module-4",
              "description": "Academy national expansion strategies"
            },
            {
              "title": "Leadership Development Guide",
              "type": "doc",
              "url": "/academy/module-3",
              "description": "Continued leadership training"
            },
            {
              "title": "All Recorded Calls for Coaches and Clients",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1ad-MdPRzyrKflK2Y_mHmTBjU0lCVJydJJRsufFIDVko/edit?usp=sharing",
              "description": "Advanced training library"
            }
          ],
          "milestones": [
            "Multiple Directors in organization",
            "Organizational communication system active",
            "Regional Director rank achieved!"
          ]
        },
        {
          "id": "lesson-4-2",
          "number": "4.2",
          "title": "Building Independent Legs",
          "description": "Developing strong, self-sustaining legs across your organization.",
          "resources": [
            {
              "title": "National Expansion Guide",
              "type": "doc",
              "url": "/academy/module-4",
              "description": "National growth strategies"
            },
            {
              "title": "Executive Leadership Guide",
              "type": "doc",
              "url": "/academy/module-5",
              "description": "Executive leadership training"
            }
          ],
          "milestones": [
            "Multiple strong legs producing independently",
            "Executive Directors in organization",
            "Legs operating without daily intervention"
          ]
        },
        {
          "id": "lesson-4-3",
          "number": "4.3",
          "title": "National Director Achievement",
          "description": "Strategies for reaching National Director status.",
          "resources": [
            {
              "title": "Executive Leadership Guide",
              "type": "doc",
              "url": "/academy/module-5",
              "description": "Academy executive training"
            },
            {
              "title": "National Expansion Guide",
              "type": "doc",
              "url": "/academy/module-4",
              "description": "National strategies"
            }
          ],
          "milestones": [
            "National Director qualification requirements met",
            "Strong leadership bench developed",
            "National Director rank achieved!"
          ]
        }
      ]
    },
    {
      "id": "module-5",
      "number": 5,
      "title": "Executive Leadership",
      "description": "Master the skills needed to lead massive organizations. Prepare for Global and Presidential Director achievement.",
      "rankRequirement": "Integrated Global Director",
      "rankRequirementCode": "GLOBAL_DIRECTOR",
      "icon": "award",
      "lessons": [
        {
          "id": "lesson-5-1",
          "number": "5.1",
          "title": "Global Organization Building",
          "description": "Building elite organizations with significant depth.",
          "resources": [
            {
              "title": "Global/Presidential Daily Tracker",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1j9fcAHJ769BRyqaOhZ60HFzb7VhoB0gc3KL5pjyT1PQ/edit",
              "description": "Daily tracking for Global/Presidential ranks"
            },
            {
              "title": "Executive Leadership Guide",
              "type": "doc",
              "url": "/academy/module-5",
              "description": "Executive leadership training"
            },
            {
              "title": "Legacy Building Guide",
              "type": "doc",
              "url": "/academy/module-6",
              "description": "Building lasting impact"
            }
          ],
          "milestones": [
            "National Directors in organization",
            "Significant organizational depth",
            "Global Director rank achieved!"
          ]
        },
        {
          "id": "lesson-5-2",
          "number": "5.2",
          "title": "Presidential Qualification",
          "description": "The final push to Presidential Director.",
          "resources": [
            {
              "title": "Global/Presidential Daily Tracker",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1j9fcAHJ769BRyqaOhZ60HFzb7VhoB0gc3KL5pjyT1PQ/edit",
              "description": "Presidential tracking"
            },
            {
              "title": "Executive Leadership Guide",
              "type": "doc",
              "url": "/academy/module-5",
              "description": "Advanced executive training"
            },
            {
              "title": "Legacy Building Guide",
              "type": "doc",
              "url": "/academy/module-6",
              "description": "Legacy development"
            }
          ],
          "milestones": [
            "Multiple Global Directors in organization",
            "Consistent presidential volume",
            "Presidential Director rank achieved!"
          ]
        },
        {
          "id": "lesson-5-3",
          "number": "5.3",
          "title": "Industry Leadership",
          "description": "Becoming a recognized leader in the industry.",
          "resources": [
            {
              "title": "Legacy Building Guide",
              "type": "doc",
              "url": "/academy/module-6",
              "description": "Building your legacy"
            },
            {
              "title": "Executive Leadership Guide",
              "type": "doc",
              "url": "/academy/module-5",
              "description": "Leadership platform"
            }
          ],
          "milestones": [
            "Recognized as team leader",
            "Contributing to broader organization",
            "Leadership platform established"
          ]
        },
        {
          "id": "lesson-5-4",
          "number": "5.4",
          "title": "Business Systems at Scale",
          "description": "Running your business like a professional enterprise.",
          "resources": [
            {
              "title": "Adam Tarleton Tax Talk",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1l7Q4nUmVZhjt5m0P4H9jaAjQ30LhpVP5SZ3yh9cn9PI/edit?usp=sharing",
              "description": "Tax strategies for high earners"
            },
            {
              "title": "Real Talk - Finances",
              "type": "video",
              "url": "https://vimeo.com/830269095/516b60d6c1",
              "description": "Financial management"
            }
          ],
          "milestones": [
            "Business infrastructure professionalized",
            "Support systems in place",
            "Financial systems optimized"
          ]
        }
      ]
    },
    {
      "id": "module-6",
      "number": 6,
      "title": "Legacy Building",
      "description": "Create lasting impact beyond personal achievement. Build a self-sustaining organization and mentor the next generation of leaders.",
      "rankRequirement": "Presidential Director",
      "rankRequirementCode": "PRESIDENTIAL_DIRECTOR",
      "icon": "crown",
      "lessons": [
        {
          "id": "lesson-6-1",
          "number": "6.1",
          "title": "Path to IPD",
          "description": "Building the final structure for true independence.",
          "resources": [
            {
              "title": "IPD Bubble Tracker",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1JRnQ_uavSfOVj3Mvwf7T2lCASmj8jnEb/edit",
              "description": "Visual tracker for IPD qualification"
            },
            {
              "title": "Legacy Building Guide",
              "type": "doc",
              "url": "/academy/module-6",
              "description": "Academy legacy training"
            },
            {
              "title": "Executive Leadership Guide",
              "type": "doc",
              "url": "/academy/module-5",
              "description": "Highest level leadership"
            }
          ],
          "milestones": [
            "IPD qualification requirements understood",
            "Multiple Presidential Directors in downline",
            "True passive income structure built"
          ]
        },
        {
          "id": "lesson-6-2",
          "number": "6.2",
          "title": "Creating Lasting Impact",
          "description": "Building something that lasts beyond your direct involvement.",
          "resources": [
            {
              "title": "Legacy Building Guide",
              "type": "doc",
              "url": "/academy/module-6",
              "description": "Creating lasting impact"
            },
            {
              "title": "All Recorded Calls for Coaches and Clients",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1ad-MdPRzyrKflK2Y_mHmTBjU0lCVJydJJRsufFIDVko/edit?usp=sharing",
              "description": "Training resources for future generations"
            }
          ],
          "milestones": [
            "Leadership succession plan in place",
            "Organization growing without daily intervention",
            "Legacy impact documented"
          ]
        },
        {
          "id": "lesson-6-3",
          "number": "6.3",
          "title": "IPD Achievement",
          "description": "Achieving the pinnacle of OPTAVIA coaching success.",
          "resources": [
            {
              "title": "IPD Bubble Tracker",
              "type": "doc",
              "url": "https://docs.google.com/document/d/1JRnQ_uavSfOVj3Mvwf7T2lCASmj8jnEb/edit",
              "description": "Final qualification tracking"
            },
            {
              "title": "Legacy Building Guide",
              "type": "doc",
              "url": "/academy/module-6",
              "description": "Cementing your legacy"
            }
          ],
          "milestones": [
            "IPD qualification met",
            "True freedom achieved",
            "Next generation leaders thriving",
            "CONGRATULATIONS - You've reached the pinnacle!"
          ]
        }
      ]
    }
  ],
  "clientSupportResources": {
    "title": "Client Support Resources",
    "description": "Resources available across all modules for client coaching support",
    "categories": [
      {
        "title": "OPTAVIA Digital Guides",
        "resources": [
          {
            "title": "Condiment Guide",
            "type": "pdf",
            "url": "http://optaviamedia.com/pdf/LEARN/OPTAVIA_CondimentSheet.pdf",
            "description": "Official OPTAVIA condiment guidelines"
          },
          {
            "title": "Lean and Green Guidelines",
            "type": "pdf",
            "url": "http://optaviamedia.com/pdf/learn/OPTAVIA-Lean-and-Green.pdf",
            "description": "Complete lean and green meal guide"
          },
          {
            "title": "Vegetarian Lean/Green Options",
            "type": "pdf",
            "url": "http://optaviamedia.com/pdf/LEARN/OPTAVIA-Vegetarian-Info-Sheet.pdf",
            "description": "Plant-based meal options"
          },
          {
            "title": "Vegetable Weight Conversions",
            "type": "pdf",
            "url": "http://optaviamedia.com/pdf/LEARN/OPTAVIA-Vegetarian_Conversion_Chart.pdf",
            "description": "Portion conversion charts"
          },
          {
            "title": "Optional Snack Guidelines",
            "type": "link",
            "url": "https://answers.optavia.com/help/optimal-weight-5-1-plan-what-snacks-can-i-have",
            "description": "Approved snack options"
          },
          {
            "title": "Dining Out Guide",
            "type": "pdf",
            "url": "http://optaviamedia.com/pdf/learn/50054-GUI_OPTAVIA-Dining-Out.pdf",
            "description": "Restaurant eating strategies"
          },
          {
            "title": "Product Claims Sheet (Allergy Info)",
            "type": "pdf",
            "url": "https://optaviamedia.com/pdf/product/OPTAVIA_DOC-Product-Claims-Sheet.pdf",
            "description": "Allergen and ingredient information"
          },
          {
            "title": "Eat This Every Day",
            "type": "doc",
            "url": "https://docs.google.com/document/d/1_4kgw8X0_bHp6mbGW5Xtwdg0_W7hVYBWwNgHNSM3xLk/edit?usp=sharing",
            "description": "Daily nutrition guidance"
          }
        ]
      },
      {
        "title": "Metabolic Health Education",
        "resources": [
          {
            "title": "Dr. Mills Interview",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=QS_31YRMvJY",
            "description": "Medical perspective on metabolic health"
          },
          {
            "title": "What is Metabolic Health",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=WE2BDJGA9-4",
            "description": "Educational overview of metabolic health"
          },
          {
            "title": "What Excess Fat is Doing to Your Body",
            "type": "video",
            "url": "https://www.facebook.com/reel/754946984357178",
            "description": "Impact of excess weight on health"
          },
          {
            "title": "Dr. A Explains Soy",
            "type": "video",
            "url": "https://vimeo.com/781971387/51372cbd27",
            "description": "Addressing soy concerns"
          },
          {
            "title": "Why Magnesium and Electrolytes are Important",
            "type": "doc",
            "url": "https://docs.google.com/document/d/1BuSh_8VJB2bQ2uCrk1-Lq1XSNRuJw8a_PU_Z16aWnII/edit?usp=sharing",
            "description": "Supplement education"
          },
          {
            "title": "Why the Metabolic Reset is Different",
            "type": "doc",
            "url": "https://docs.google.com/document/d/16XKOHVKrqrBNFeV5BGGl5Q1kZ6PHcBM8RisF80N-C7w/edit?usp=drivesdk",
            "description": "Program differentiation"
          }
        ]
      },
      {
        "title": "Quick Reference Links",
        "resources": [
          {
            "title": "Digital Guides",
            "type": "doc",
            "url": "https://docs.google.com/document/d/1TtZoQcKzTT77PZP0XNlMH-e8HiYzwKhS1UL8ZW5BcT8/edit?usp=sharing",
            "description": "Quick reference materials and tools"
          },
          {
            "title": "How to Update Your Premier Order",
            "type": "doc",
            "url": "https://docs.google.com/document/d/1D-ueL9kljNxEdqHFrvp9u-aze-z3-2glZaYN-936fCc/edit?usp=sharing",
            "description": "Auto-ship modification instructions"
          },
          {
            "title": "How to Update Your Premier+ Order (Official)",
            "type": "link",
            "url": "https://answers.optavia.com/help/s/article/Edit-Your-Premier-Items?language=en_US",
            "description": "Official OPTAVIA instructions"
          },
          {
            "title": "Quick Links",
            "type": "doc",
            "url": "https://docs.google.com/document/d/1rMvUSWUDvxEy7pTHKt5JmiLLtG6wrMaQpKVOgcCXmn0/edit?usp=sharing",
            "description": "Client and coach support quick links"
          },
          {
            "title": "All Recorded Calls",
            "type": "doc",
            "url": "https://docs.google.com/document/d/1ad-MdPRzyrKflK2Y_mHmTBjU0lCVJydJJRsufFIDVko/edit?usp=sharing",
            "description": "Library of call recordings"
          },
          {
            "title": "New Client Videos",
            "type": "doc",
            "url": "https://docs.google.com/document/d/1yfVgcKDiXCP6Og1hopzSBGvI8l0MlQpoGt0hnxjXf_U/edit?usp=sharing",
            "description": "Video resources for clients"
          }
        ]
      }
    ]
  },
  "rankCodes": {
    "NEW_COACH": {
      "name": "New Coach",
      "level": 1
    },
    "SENIOR_COACH": {
      "name": "Senior Coach",
      "level": 2
    },
    "MANAGER": {
      "name": "Manager",
      "level": 3
    },
    "DIRECTOR": {
      "name": "Director",
      "level": 4
    },
    "EXECUTIVE_DIRECTOR": {
      "name": "Executive Director",
      "level": 5
    },
    "REGIONAL_DIRECTOR": {
      "name": "Regional Director",
      "level": 6
    },
    "NATIONAL_DIRECTOR": {
      "name": "National Director",
      "level": 7
    },
    "GLOBAL_DIRECTOR": {
      "name": "Global Director",
      "level": 8
    },
    "PRESIDENTIAL_DIRECTOR": {
      "name": "Presidential Director",
      "level": 9
    },
    "IPD": {
      "name": "Independent Presidential Director",
      "level": 10
    }
  }
}

// Helper function to get a module by ID
export function getModuleById(moduleId: string): AcademyModule | undefined {
  return ACADEMY_DATA.modules.find(m => m.id === moduleId)
}

// Helper function to get a lesson by ID
export function getLessonById(lessonId: string): AcademyLesson | undefined {
  for (const module of ACADEMY_DATA.modules) {
    const lesson = module.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson
  }
  return undefined
}

// Helper function to get resource type icon
export function getResourceTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    doc: "📄",
    video: "🎥",
    pdf: "📑",
    link: "🔗",
    canva: "🎨",
    form: "📋"
  }
  return icons[type] || "📎"
}

// Helper function to get resource type label
export function getResourceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    doc: "Document",
    video: "Video",
    pdf: "PDF",
    link: "Link",
    canva: "Canva",
    form: "Form"
  }
  return labels[type] || "Resource"
}
