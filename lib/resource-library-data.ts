/**
 * Coach Resource Library Data
 * Version 1.0 - Searchable collection of training resources
 * Auto-generated from coach-resource-library.json
 */

export interface ResourceCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface ResourceTag {
  id: string
  name: string
  type: "format" | "level" | "content" | "audience" | "rank"
}

export interface Resource {
  id: string
  title: string
  description: string
  type: "doc" | "video" | "pdf" | "link" | "canva" | "form"
  url: string
  categoryId: string
  tags: string[]
  featured: boolean
}

export interface ResourceLibrary {
  library: {
    title: string
    description: string
    version: string
    totalResources: number
    totalCategories: number
  }
  categories: ResourceCategory[]
  tags: ResourceTag[]
  resources: Resource[]
}

// Full resource library data
export const RESOURCE_LIBRARY: ResourceLibrary = {
  "library": {
    "title": "Coach Resource Library",
    "description": "Searchable collection of training resources, guides, and tools for OPTAVIA coaches",
    "version": "1.0",
    "totalResources": 89,
    "totalCategories": 15
  },
  "categories": [
    {
      "id": "getting-started",
      "name": "Getting Started",
      "description": "Essential resources for new coaches just beginning their journey",
      "icon": "rocket",
      "color": "#4CAF50"
    },
    {
      "id": "business-setup",
      "name": "Business Setup & Branding",
      "description": "Set up your business, website, payments, and brand compliance",
      "icon": "briefcase",
      "color": "#2196F3"
    },
    {
      "id": "social-media",
      "name": "Social Media & Content",
      "description": "Create engaging content, reels, and build your online presence",
      "icon": "share-2",
      "color": "#E91E63"
    },
    {
      "id": "prospecting",
      "name": "Prospecting & Conversations",
      "description": "Build your prospect list and start meaningful conversations",
      "icon": "users",
      "color": "#9C27B0"
    },
    {
      "id": "health-assessment",
      "name": "Health Assessment & Closing",
      "description": "Conduct effective health assessments and handle objections",
      "icon": "clipboard",
      "color": "#FF9800"
    },
    {
      "id": "client-onboarding",
      "name": "Client Onboarding",
      "description": "Set up new clients for success from day one",
      "icon": "user-plus",
      "color": "#00BCD4"
    },
    {
      "id": "client-coaching",
      "name": "Daily Client Coaching",
      "description": "Daily texts, check-ins, and ongoing client support",
      "icon": "message-circle",
      "color": "#8BC34A"
    },
    {
      "id": "client-troubleshooting",
      "name": "Client Troubleshooting",
      "description": "Help clients overcome plateaus and challenges",
      "icon": "tool",
      "color": "#F44336"
    },
    {
      "id": "nutrition-guides",
      "name": "Nutrition & Meal Guides",
      "description": "Lean and green guides, condiments, dining out, and meal planning",
      "icon": "book-open",
      "color": "#4CAF50"
    },
    {
      "id": "metabolic-education",
      "name": "Metabolic Health Education",
      "description": "Educational content about metabolic health and the science",
      "icon": "heart",
      "color": "#E91E63"
    },
    {
      "id": "sponsoring",
      "name": "Sponsoring & Team Building",
      "description": "Sign new coaches and build your team",
      "icon": "user-check",
      "color": "#673AB7"
    },
    {
      "id": "connect-numbers",
      "name": "OPTAVIA Connect & Numbers",
      "description": "Track FQV, run projections, and use OPTAVIA Connect",
      "icon": "bar-chart-2",
      "color": "#3F51B5"
    },
    {
      "id": "leadership",
      "name": "Leadership & Team Development",
      "description": "Coach your coaches and develop leaders",
      "icon": "award",
      "color": "#009688"
    },
    {
      "id": "rank-trackers",
      "name": "Rank Advancement Trackers",
      "description": "Daily trackers and tools for each rank level",
      "icon": "trending-up",
      "color": "#FF5722"
    },
    {
      "id": "business-finance",
      "name": "Business & Finance",
      "description": "Taxes, compensation, and business systems",
      "icon": "dollar-sign",
      "color": "#607D8B"
    }
  ],
  "tags": [
    {
      "id": "video",
      "name": "Video",
      "type": "format"
    },
    {
      "id": "document",
      "name": "Document",
      "type": "format"
    },
    {
      "id": "pdf",
      "name": "PDF",
      "type": "format"
    },
    {
      "id": "form",
      "name": "Form/Template",
      "type": "format"
    },
    {
      "id": "canva",
      "name": "Canva",
      "type": "format"
    },
    {
      "id": "link",
      "name": "External Link",
      "type": "format"
    },
    {
      "id": "beginner",
      "name": "Beginner",
      "type": "level"
    },
    {
      "id": "intermediate",
      "name": "Intermediate",
      "type": "level"
    },
    {
      "id": "advanced",
      "name": "Advanced",
      "type": "level"
    },
    {
      "id": "scripts",
      "name": "Scripts & Templates",
      "type": "content"
    },
    {
      "id": "copy-paste",
      "name": "Copy & Paste Ready",
      "type": "content"
    },
    {
      "id": "training-call",
      "name": "Training Call Recording",
      "type": "content"
    },
    {
      "id": "quick-reference",
      "name": "Quick Reference",
      "type": "content"
    },
    {
      "id": "checklist",
      "name": "Checklist",
      "type": "content"
    },
    {
      "id": "tracker",
      "name": "Tracker",
      "type": "content"
    },
    {
      "id": "client-facing",
      "name": "Share with Clients",
      "type": "audience"
    },
    {
      "id": "coach-only",
      "name": "Coach Only",
      "type": "audience"
    },
    {
      "id": "new-coach",
      "name": "New Coach",
      "type": "rank"
    },
    {
      "id": "senior-coach",
      "name": "Senior Coach+",
      "type": "rank"
    },
    {
      "id": "manager",
      "name": "Manager+",
      "type": "rank"
    },
    {
      "id": "director",
      "name": "Director+",
      "type": "rank"
    },
    {
      "id": "executive",
      "name": "Executive Director+",
      "type": "rank"
    },
    {
      "id": "top-rank",
      "name": "Global/Presidential/IPD",
      "type": "rank"
    }
  ],
  "resources": [
    {
      "id": "res-001",
      "title": "New Coach Welcome Letter",
      "description": "Welcome letter template covering first steps, what to expect, and key resources for newly signed coaches",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1arNc-lNb1zJ2WJ0VS87Dpfre973u-IboIYxQqNUr7Vs/edit?usp=sharing",
      "categoryId": "getting-started",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-002",
      "title": "New Coach Checklist",
      "description": "Step-by-step checklist for new coaches to complete setup and launch preparation",
      "type": "doc",
      "url": "https://docs.google.com/document/d/118onAvS-zWGDClUpkSOLEcXhRNnuaCir/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
      "categoryId": "getting-started",
      "tags": [
        "document",
        "beginner",
        "checklist",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-003",
      "title": "How to Purchase Your Coaching Kit",
      "description": "Video walkthrough showing how to purchase your OPTAVIA coaching kit",
      "type": "video",
      "url": "https://vimeo.com/548985412",
      "categoryId": "getting-started",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-004",
      "title": "OPTAVIA Vocabulary",
      "description": "Complete glossary of OPTAVIA terms: FQV, QP, FIBC, ranks, fuelings, lean and green, and business terminology",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1jLPNcT5cROxHm8y_XWpCC4AQjnMo9bjwZs-Kz5UVXTY/edit?usp=sharing",
      "categoryId": "getting-started",
      "tags": [
        "document",
        "beginner",
        "quick-reference",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-005",
      "title": "OPTAVIA Compensation Plan",
      "description": "Official OPTAVIA compensation plan explaining income opportunities and rank requirements",
      "type": "pdf",
      "url": "https://optaviamedia.com/pdf/learn/OPTAVIA_LRN-Integrated-Compensation-Plan.pdf",
      "categoryId": "business-finance",
      "tags": [
        "pdf",
        "beginner",
        "quick-reference",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-006",
      "title": "OPTAVIA Coach Kit Purchase Link",
      "description": "Direct link to purchase the OPTAVIA coaching business kit",
      "type": "link",
      "url": "https://www.optavia.com/us/en/optavia-coach-business-kit/p/optavia-coach-business-kit-kt",
      "categoryId": "getting-started",
      "tags": [
        "link",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-007",
      "title": "Branding and Setting Up Your Business",
      "description": "Complete guide to branding your coaching business professionally",
      "type": "doc",
      "url": "https://docs.google.com/document/d/10aK_KwiHBXsVuUzRS2DjFmly0QH_VJ44ohSIMuxEJ3A/edit?usp=sharing",
      "categoryId": "business-setup",
      "tags": [
        "document",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-008",
      "title": "Setting Up Your Coaching Website",
      "description": "Video tutorial on setting up your coaching website and online presence",
      "type": "video",
      "url": "https://youtu.be/xtSR2nJJfAg?si=dHRxhzOE_b1wcIF5",
      "categoryId": "business-setup",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-009",
      "title": "Setting Up Your OPTAVIA Pay",
      "description": "Instructions for setting up OPTAVIA Pay to receive commission payments",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1LuGK2ZNo8lFI51vesDKKHdUDCpgKhvtztv3-KS06KvE/edit?usp=sharing",
      "categoryId": "business-setup",
      "tags": [
        "document",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-010",
      "title": "How to Add a Disclaimer to Your Pictures",
      "description": "Video tutorial on adding required wellness disclaimers to transformation photos",
      "type": "video",
      "url": "https://www.youtube.com/watch?v=Z4ABPUk5JHs",
      "categoryId": "business-setup",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-011",
      "title": "How to Add a Wellness Credit",
      "description": "Tutorial on properly crediting OPTAVIA and wellness disclaimers in posts",
      "type": "video",
      "url": "https://vimeo.com/473831198",
      "categoryId": "business-setup",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-012",
      "title": "Adam Tarleton Tax Talk",
      "description": "Tax considerations and strategies for OPTAVIA coaches",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1l7Q4nUmVZhjt5m0P4H9jaAjQ30LhpVP5SZ3yh9cn9PI/edit?usp=sharing",
      "categoryId": "business-finance",
      "tags": [
        "document",
        "intermediate",
        "coach-only"
      ],
      "featured": true
    },
    {
      "id": "res-013",
      "title": "Real Talk - Finances",
      "description": "Honest discussion about the financial realities of building a coaching business",
      "type": "video",
      "url": "https://vimeo.com/830269095/516b60d6c1",
      "categoryId": "business-finance",
      "tags": [
        "video",
        "beginner",
        "coach-only",
        "training-call"
      ],
      "featured": false
    },
    {
      "id": "res-014",
      "title": "How to Prepare for Your Social Media Launch",
      "description": "Guide to preparing social media profiles before your coaching launch - bio updates, content planning, strategy",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1MmQrsmqenglJr_SenBcBH_qkc4k6mWe_/edit?usp=sharing&ouid=103643178845055801965&rtpof=true&sd=true",
      "categoryId": "social-media",
      "tags": [
        "document",
        "beginner",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-015",
      "title": "Week One Posting Guide",
      "description": "Daily posting guide for your first week as a coach with content ideas and timing",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1DIV9pEZlmqzA8ZIAnCPExQ_KhOedjA38OauiOqtqL5c/edit?usp=sharing",
      "categoryId": "social-media",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-016",
      "title": "How to Work Your Launch Post",
      "description": "Best practices for your launch post - timing, engagement, common mistakes to avoid",
      "type": "doc",
      "url": "https://docs.google.com/document/d/11tutR54Y_rDUUWkQupfY8cHN9n_VH-fIQPwnTSnDLnU/edit?usp=sharing",
      "categoryId": "social-media",
      "tags": [
        "document",
        "beginner",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-017",
      "title": "How to Create a Simple Reel",
      "description": "Step-by-step video on creating engaging Instagram/Facebook Reels",
      "type": "video",
      "url": "https://vimeo.com/1147526154",
      "categoryId": "social-media",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-018",
      "title": "Effective Hashtags",
      "description": "Hashtag strategy guide to maximize reach and engagement",
      "type": "doc",
      "url": "https://docs.google.com/document/d/11HxoyfVs5Ns6ysDWCzBj4R8hEERVb6MOBdama6zNYko/edit?usp=sharing",
      "categoryId": "social-media",
      "tags": [
        "document",
        "beginner",
        "quick-reference",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-019",
      "title": "How to Create a 100's List - Dan Valentine",
      "description": "Video training on building your prospect list systematically",
      "type": "video",
      "url": "https://vimeo.com/810322204/8904d629b4",
      "categoryId": "prospecting",
      "tags": [
        "video",
        "beginner",
        "training-call",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-020",
      "title": "How to Create a 100's List - Allie McCabe",
      "description": "Alternative approach to building your prospect list",
      "type": "video",
      "url": "https://vimeo.com/791536952/642c420335",
      "categoryId": "prospecting",
      "tags": [
        "video",
        "beginner",
        "training-call",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-021",
      "title": "How to Start Conversations",
      "description": "Video guide on initiating conversations with prospects naturally",
      "type": "video",
      "url": "https://youtu.be/-mt9RIrgzIY",
      "categoryId": "prospecting",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-022",
      "title": "How to Have Effective Conversations",
      "description": "Visual guide to having effective prospect conversations with frameworks",
      "type": "canva",
      "url": "https://www.canva.com/design/DAGwKmV4-qY/jcb8D4BueFoAYZsc8uERiQ/view",
      "categoryId": "prospecting",
      "tags": [
        "canva",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-023",
      "title": "Interacting with the Likes",
      "description": "How to turn social media engagement into meaningful conversations",
      "type": "video",
      "url": "https://vimeo.com/810981023/dc92d43d3b",
      "categoryId": "prospecting",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-024",
      "title": "Weigh Day Post - Allie McCabe",
      "description": "How to create effective weekly weigh day content that attracts prospects",
      "type": "video",
      "url": "https://vimeo.com/814509040/e81b22cdbc",
      "categoryId": "social-media",
      "tags": [
        "video",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-025",
      "title": "How to Nail the Health Assessment",
      "description": "Step-by-step guide with scripts for opening, goals, weight history, motivation, and closing",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1A8UIEidVXGrz8jeDsqKbrRVPbbpWc3b0/edit?usp=sharing",
      "categoryId": "health-assessment",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-026",
      "title": "Health Assessment Training Resources",
      "description": "Training on transitioning casual conversations into health assessments",
      "type": "doc",
      "url": "https://docs.google.com/document/d/13V_-yPDivM_4k8K34ly4qjxMopxb52_qEypK4NiBld4/edit?usp=sharing",
      "categoryId": "health-assessment",
      "tags": [
        "document",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-027",
      "title": "Sample Metabolic Health Assessment JotForm",
      "description": "Digital health assessment form template - CLONE BEFORE USING",
      "type": "form",
      "url": "https://form.jotform.com/260074236698060",
      "categoryId": "health-assessment",
      "tags": [
        "form",
        "beginner",
        "new-coach",
        "copy-paste"
      ],
      "featured": true
    },
    {
      "id": "res-028",
      "title": "10 Questions to Gauge Metabolic Health",
      "description": "Video covering 10 diagnostic questions to assess metabolic health",
      "type": "video",
      "url": "https://vimeo.com/1135751990/8205c4652d?fl=tl&fe=ec",
      "categoryId": "health-assessment",
      "tags": [
        "video",
        "beginner",
        "new-coach",
        "client-facing"
      ],
      "featured": false
    },
    {
      "id": "res-029",
      "title": "Metabolic Talking Points for Coaches",
      "description": "Key talking points for discussing metabolic health with prospects and clients",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1GzyY4Je8wWtYxoY7DsuVlPTgCJWdEUzK8jp4UmS6MnQ/edit?usp=sharing",
      "categoryId": "health-assessment",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-030",
      "title": "Common Objections and How to Address Them",
      "description": "Comprehensive guide to handling objections: cost, time, spouse approval, skepticism",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1TQPw-pKAllqEz7MZXa3XEsxjN5Jo1T5b/edit?usp=sharing",
      "categoryId": "health-assessment",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-031",
      "title": "Handling Cost Objections",
      "description": "Video training on overcoming price and cost concerns",
      "type": "video",
      "url": "https://vimeo.com/1087174282/597b964a37",
      "categoryId": "health-assessment",
      "tags": [
        "video",
        "beginner",
        "training-call",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-032",
      "title": "How to Use Klarna for Payment Plans",
      "description": "Guide for offering payment plan options to prospects concerned about cost",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1o4eAoI6ljXyODnrHCOSIL34rx_7-LngJV1w5xq-nPtU/edit?usp=sharing",
      "categoryId": "health-assessment",
      "tags": [
        "document",
        "beginner",
        "new-coach",
        "client-facing"
      ],
      "featured": false
    },
    {
      "id": "res-033",
      "title": "Effective Follow Up After Health Assessment",
      "description": "Templates for follow-up messages - yes, maybe, and not-now responses",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1D-DyRUeV5r4jipqnudUxweh3HGFh_hPD/edit?usp=sharing",
      "categoryId": "health-assessment",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "copy-paste",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-034",
      "title": "New Client Checklist",
      "description": "Complete checklist for setting up new clients for success",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1c8WqcDJPVmSm6h9Ss2x3V02L0apIemDp/edit?usp=sharing",
      "categoryId": "client-onboarding",
      "tags": [
        "document",
        "beginner",
        "checklist",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-035",
      "title": "Welcome and 9 Tips Text",
      "description": "Copy-paste welcome message for new clients with 9 essential tips",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1x9k469K6XvuQ8rcPdgR3z4i9iXKLxBvSIR_77UuDgpM/edit?usp=sharing",
      "categoryId": "client-onboarding",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "copy-paste",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-036",
      "title": "5 Success Tips",
      "description": "Quick reference card with 5 essential tips for new clients",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1nss0Lsj1L6jr0X8AEZHZ4cdLOt9vW_SZXokHHLy-r9M/edit?usp=sharing",
      "categoryId": "client-onboarding",
      "tags": [
        "document",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-037",
      "title": "Universal Metabolic Health Kickoff Video",
      "description": "Team Strong kickoff call video to share with new clients",
      "type": "video",
      "url": "https://vimeo.com/user118093373/teamstrongkickoff",
      "categoryId": "client-onboarding",
      "tags": [
        "video",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-038",
      "title": "Lean and Green Video",
      "description": "Visual guide to lean and green meals for new clients",
      "type": "video",
      "url": "https://vimeo.com/414057972",
      "categoryId": "client-onboarding",
      "tags": [
        "video",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-039",
      "title": "Schedule for New Client Communication",
      "description": "Recommended communication schedule - daily, weekly, and milestone touchpoints",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1iYiwp4tMmlmqFDj8JoG8PNiFbF4ed6yRnMJnRMmzW1g/edit?usp=sharing",
      "categoryId": "client-coaching",
      "tags": [
        "document",
        "beginner",
        "quick-reference",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-040",
      "title": "New Client Videos Collection",
      "description": "Collection of video resources to share with new clients",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1yfVgcKDiXCP6Og1hopzSBGvI8l0MlQpoGt0hnxjXf_U/edit?usp=sharing",
      "categoryId": "client-onboarding",
      "tags": [
        "document",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-041",
      "title": "Metabolic Reset Day Before Text",
      "description": "Copy-paste message to send the day before client starts",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1V4vgLqx6-0uE9ZRfIp7024tTCB5NoqjHa0YAbV0_RlU/edit?usp=sharing",
      "categoryId": "client-coaching",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "copy-paste",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-042",
      "title": "Daily Texts Days 1-9",
      "description": "Copy-paste daily text templates for the first 9 days",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1gtH2fYDKLA6f3sv6-yxFUM8b6rLBqp8jF5R7h4ec6i4/edit?usp=sharing",
      "categoryId": "client-coaching",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "copy-paste",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-043",
      "title": "Day 1-4 Check In Questions",
      "description": "Specific check-in questions for the first 4 critical days",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1xZJ_afiL_W4YcinCkM6NbNWrH2GqZmRnS1XrB_BRLIM/edit?usp=sharing",
      "categoryId": "client-coaching",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-044",
      "title": "Daily Texts Days 10-31",
      "description": "Extended daily text templates for days 10-31",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1G9YtI07xIvazS4KZcCkLlB4N_E1axueXVeV4R0Na4Yc/edit?usp=sharing",
      "categoryId": "client-coaching",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "copy-paste",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-045",
      "title": "Systems Check Questions",
      "description": "Diagnostic questions to identify why a client might not be seeing results",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1xZJ_afiL_W4YcinCkM6NbNWrH2GqZmRnS1XrB_BRLIM/edit?usp=sharing",
      "categoryId": "client-troubleshooting",
      "tags": [
        "document",
        "intermediate",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-046",
      "title": "Detailed Systems Check - Not Losing Well",
      "description": "In-depth troubleshooting guide for clients not seeing results",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1HLqL_l7IELKgjlx5d3SBuXi2xdyBSaawJ5JmcKDoGHM/edit?usp=sharing",
      "categoryId": "client-troubleshooting",
      "tags": [
        "document",
        "intermediate",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-047",
      "title": "VIP Call How To",
      "description": "Guide to conducting VIP calls - structure, talking points, celebration",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1vtYewe5sbVziNTzz3Fk3l3DhRt1x0xTps_hxtYEQk7Q/edit?usp=sharing",
      "categoryId": "client-coaching",
      "tags": [
        "document",
        "beginner",
        "scripts",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-048",
      "title": "Condiment Guide",
      "description": "Official OPTAVIA condiment guidelines",
      "type": "pdf",
      "url": "http://optaviamedia.com/pdf/LEARN/OPTAVIA_CondimentSheet.pdf",
      "categoryId": "nutrition-guides",
      "tags": [
        "pdf",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-049",
      "title": "Lean and Green Guidelines",
      "description": "Complete official guide to lean and green meals",
      "type": "pdf",
      "url": "http://optaviamedia.com/pdf/learn/OPTAVIA-Lean-and-Green.pdf",
      "categoryId": "nutrition-guides",
      "tags": [
        "pdf",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-050",
      "title": "Vegetarian Lean/Green Options",
      "description": "Plant-based meal options for vegetarian clients",
      "type": "pdf",
      "url": "http://optaviamedia.com/pdf/LEARN/OPTAVIA-Vegetarian-Info-Sheet.pdf",
      "categoryId": "nutrition-guides",
      "tags": [
        "pdf",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-051",
      "title": "Vegetable Weight Conversions",
      "description": "Portion conversion charts for vegetables",
      "type": "pdf",
      "url": "http://optaviamedia.com/pdf/LEARN/OPTAVIA-Vegetarian_Conversion_Chart.pdf",
      "categoryId": "nutrition-guides",
      "tags": [
        "pdf",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-052",
      "title": "Optional Snack Guidelines",
      "description": "Official guide to approved optional snacks",
      "type": "link",
      "url": "https://answers.optavia.com/help/optimal-weight-5-1-plan-what-snacks-can-i-have",
      "categoryId": "nutrition-guides",
      "tags": [
        "link",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-053",
      "title": "Dining Out Guide",
      "description": "Official guide for eating at restaurants while on plan",
      "type": "pdf",
      "url": "http://optaviamedia.com/pdf/learn/50054-GUI_OPTAVIA-Dining-Out.pdf",
      "categoryId": "nutrition-guides",
      "tags": [
        "pdf",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-054",
      "title": "Product Claims Sheet (Allergy Info)",
      "description": "Allergen and ingredient information for OPTAVIA products",
      "type": "pdf",
      "url": "https://optaviamedia.com/pdf/product/OPTAVIA_DOC-Product-Claims-Sheet.pdf",
      "categoryId": "nutrition-guides",
      "tags": [
        "pdf",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-055",
      "title": "Eat This Every Day",
      "description": "Daily nutrition guidance for clients",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1_4kgw8X0_bHp6mbGW5Xtwdg0_W7hVYBWwNgHNSM3xLk/edit?usp=sharing",
      "categoryId": "nutrition-guides",
      "tags": [
        "document",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-056",
      "title": "Dr. Mills Interview",
      "description": "Medical perspective on metabolic health",
      "type": "video",
      "url": "https://www.youtube.com/watch?v=QS_31YRMvJY",
      "categoryId": "metabolic-education",
      "tags": [
        "video",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-057",
      "title": "What is Metabolic Health",
      "description": "Educational video overview of metabolic health concepts",
      "type": "video",
      "url": "https://www.youtube.com/watch?v=WE2BDJGA9-4",
      "categoryId": "metabolic-education",
      "tags": [
        "video",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-058",
      "title": "What Excess Fat Does to Your Body",
      "description": "Educational video on the health impact of excess body fat",
      "type": "video",
      "url": "https://www.facebook.com/reel/754946984357178",
      "categoryId": "metabolic-education",
      "tags": [
        "video",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-059",
      "title": "Dr. A Explains Soy",
      "description": "Dr. A addresses common concerns about soy in OPTAVIA products",
      "type": "video",
      "url": "https://vimeo.com/781971387/51372cbd27",
      "categoryId": "metabolic-education",
      "tags": [
        "video",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-060",
      "title": "Why Magnesium and Electrolytes Matter",
      "description": "Education on the importance of supplementation during metabolic reset",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1BuSh_8VJB2bQ2uCrk1-Lq1XSNRuJw8a_PU_Z16aWnII/edit?usp=sharing",
      "categoryId": "metabolic-education",
      "tags": [
        "document",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-061",
      "title": "Why the Metabolic Reset is Different",
      "description": "Explains what makes this program different from others",
      "type": "doc",
      "url": "https://docs.google.com/document/d/16XKOHVKrqrBNFeV5BGGl5Q1kZ6PHcBM8RisF80N-C7w/edit?usp=drivesdk",
      "categoryId": "metabolic-education",
      "tags": [
        "document",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-062",
      "title": "Digital Guides Collection",
      "description": "Collection of digital resources and guides",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1TtZoQcKzTT77PZP0XNlMH-e8HiYzwKhS1UL8ZW5BcT8/edit?usp=sharing",
      "categoryId": "nutrition-guides",
      "tags": [
        "document",
        "beginner",
        "quick-reference",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-063",
      "title": "How to Update Your Premier Order",
      "description": "Instructions for clients to modify auto-ship orders",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1D-ueL9kljNxEdqHFrvp9u-aze-z3-2glZaYN-936fCc/edit?usp=sharing",
      "categoryId": "client-coaching",
      "tags": [
        "document",
        "beginner",
        "client-facing",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-064",
      "title": "Quick Links - All Resources",
      "description": "Master document with all client and coach support links",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1rMvUSWUDvxEy7pTHKt5JmiLLtG6wrMaQpKVOgcCXmn0/edit?usp=sharing",
      "categoryId": "getting-started",
      "tags": [
        "document",
        "beginner",
        "quick-reference",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-065",
      "title": "All Recorded Training Calls",
      "description": "Library of all recorded training calls for coaches and clients",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1ad-MdPRzyrKflK2Y_mHmTBjU0lCVJydJJRsufFIDVko/edit?usp=sharing",
      "categoryId": "leadership",
      "tags": [
        "document",
        "beginner",
        "training-call",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-066",
      "title": "Fast Track to Senior Coach",
      "description": "Visual roadmap for accelerating to Senior Coach rank",
      "type": "canva",
      "url": "https://www.canva.com/design/DAGRyr_F44Y/3_36EEwhi6JmMZfl1ZKAvw/edit",
      "categoryId": "rank-trackers",
      "tags": [
        "canva",
        "beginner",
        "tracker",
        "new-coach"
      ],
      "featured": true
    },
    {
      "id": "res-067",
      "title": "30 Day Self-Evaluation",
      "description": "Self-assessment for new coaches at 30 days to evaluate progress",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1nOC6erBMIws-SZzQ40TCz5DEvBQpmVLMUCI5V7E_8Ys/edit?usp=sharing",
      "categoryId": "getting-started",
      "tags": [
        "document",
        "beginner",
        "checklist",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-068",
      "title": "How to Support Your Partner",
      "description": "Balancing your coaching business with your relationship",
      "type": "video",
      "url": "https://vimeo.com/705369855",
      "categoryId": "business-finance",
      "tags": [
        "video",
        "beginner",
        "coach-only",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-069",
      "title": "The Mindset Behind Effective Sponsorship",
      "description": "Psychology of sponsorship and team building",
      "type": "video",
      "url": "https://vimeo.com/665762974",
      "categoryId": "sponsoring",
      "tags": [
        "video",
        "intermediate",
        "training-call",
        "senior-coach"
      ],
      "featured": true
    },
    {
      "id": "res-070",
      "title": "Sponsoring Coach Pro Tips",
      "description": "Expert tips for sponsoring new coaches",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1FKzunmTLyZ_Zal4sG29O9nXk95pWStalxmIlIejfQh0/edit?usp=sharing",
      "categoryId": "sponsoring",
      "tags": [
        "document",
        "intermediate",
        "scripts",
        "senior-coach"
      ],
      "featured": true
    },
    {
      "id": "res-071",
      "title": "Sponsoring Coach Action Steps",
      "description": "Step-by-step action plan for sponsoring",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1FTi_PfLWuy_Q2ra9NS8XAf3nUNX5hMWxJ89ZUmO2rU4/edit?usp=sharing",
      "categoryId": "sponsoring",
      "tags": [
        "document",
        "intermediate",
        "checklist",
        "senior-coach"
      ],
      "featured": false
    },
    {
      "id": "res-072",
      "title": "MedSpa Introduction",
      "description": "Introducing the coaching opportunity to medical providers",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1Cyv1hiRq4aOGbMG_uC924nepwbm3soylfNMejEbNQGQ/edit?usp=sharing",
      "categoryId": "sponsoring",
      "tags": [
        "document",
        "intermediate",
        "scripts",
        "senior-coach"
      ],
      "featured": false
    },
    {
      "id": "res-073",
      "title": "Business Proposal Template",
      "description": "Professional template for business opportunity proposals",
      "type": "canva",
      "url": "https://www.canva.com/design/DAG_hHaPY0o/UExZZaZMgUZtBwxvkbrckg/edit",
      "categoryId": "sponsoring",
      "tags": [
        "canva",
        "intermediate",
        "senior-coach"
      ],
      "featured": false
    },
    {
      "id": "res-074",
      "title": "How to Check FQV in Connect",
      "description": "Video showing how to check Field Qualifying Volume",
      "type": "video",
      "url": "https://www.loom.com/share/799a4ae74a7645aabab8f3d67a4215cf",
      "categoryId": "connect-numbers",
      "tags": [
        "video",
        "intermediate",
        "senior-coach"
      ],
      "featured": true
    },
    {
      "id": "res-075",
      "title": "How to Run Projected Numbers",
      "description": "Projecting volume numbers for yourself and your team",
      "type": "video",
      "url": "https://www.loom.com/share/9da0ac3751e84db09ee375c9c039c527",
      "categoryId": "connect-numbers",
      "tags": [
        "video",
        "intermediate",
        "manager"
      ],
      "featured": true
    },
    {
      "id": "res-076",
      "title": "How to End the Month Strategically",
      "description": "Strategic month-end planning for hitting rank qualifications",
      "type": "video",
      "url": "https://vimeo.com/1105267713/6d51506452?fl=tl&fe=ec",
      "categoryId": "connect-numbers",
      "tags": [
        "video",
        "intermediate",
        "manager"
      ],
      "featured": true
    },
    {
      "id": "res-077",
      "title": "ED Daily Tracker",
      "description": "Daily activity tracker for Executive Directors",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1kCzIHm7DV1WPSTsbTh-NZr4qXj278iZ52vOPs08PfbE/edit",
      "categoryId": "rank-trackers",
      "tags": [
        "document",
        "advanced",
        "tracker",
        "executive"
      ],
      "featured": false
    },
    {
      "id": "res-078",
      "title": "FIBC Daily Tracker",
      "description": "Daily activity tracker for FIBC qualification",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1WSH2shc6mhmoJubPEdNOwyRC2VPotHOnzvYEBSDx-bk/edit",
      "categoryId": "rank-trackers",
      "tags": [
        "document",
        "advanced",
        "tracker",
        "executive"
      ],
      "featured": true
    },
    {
      "id": "res-079",
      "title": "Grow to FIBC Bubble Tracker",
      "description": "Visual tracker for FIBC progress",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1xwxMPmRRdBLHsyNLz1rkgMRDK6f8-_gr/edit",
      "categoryId": "rank-trackers",
      "tags": [
        "document",
        "advanced",
        "tracker",
        "executive"
      ],
      "featured": true
    },
    {
      "id": "res-080",
      "title": "10X Kickoff Call - Kristen Glass",
      "description": "10X methodology for rapid business growth",
      "type": "video",
      "url": "https://vimeo.com/manage/videos/1115495757/3e666d9fcd",
      "categoryId": "leadership",
      "tags": [
        "video",
        "advanced",
        "training-call",
        "director"
      ],
      "featured": true
    },
    {
      "id": "res-081",
      "title": "10X Kickoff Call",
      "description": "Alternative 10X methodology training",
      "type": "video",
      "url": "https://vimeo.com/1114863189?fl=tl&fe=ec",
      "categoryId": "leadership",
      "tags": [
        "video",
        "advanced",
        "training-call",
        "director"
      ],
      "featured": false
    },
    {
      "id": "res-082",
      "title": "Global/Presidential Daily Tracker",
      "description": "Daily tracker for Global and Presidential Directors",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1j9fcAHJ769BRyqaOhZ60HFzb7VhoB0gc3KL5pjyT1PQ/edit",
      "categoryId": "rank-trackers",
      "tags": [
        "document",
        "advanced",
        "tracker",
        "top-rank"
      ],
      "featured": false
    },
    {
      "id": "res-083",
      "title": "IPD Bubble Tracker",
      "description": "Visual tracker for IPD qualification progress",
      "type": "doc",
      "url": "https://docs.google.com/document/d/1JRnQ_uavSfOVj3Mvwf7T2lCASmj8jnEb/edit",
      "categoryId": "rank-trackers",
      "tags": [
        "document",
        "advanced",
        "tracker",
        "top-rank"
      ],
      "featured": true
    },
    {
      "id": "res-084",
      "title": "New Coach Foundations Guide",
      "description": "Academy Module 1 - foundational training",
      "type": "doc",
      "url": "/academy/module-1",
      "categoryId": "leadership",
      "tags": [
        "document",
        "beginner",
        "new-coach"
      ],
      "featured": false
    },
    {
      "id": "res-085",
      "title": "Building Your Business Guide",
      "description": "Academy Module 2 - business building",
      "type": "doc",
      "url": "/academy/module-2",
      "categoryId": "leadership",
      "tags": [
        "document",
        "intermediate",
        "senior-coach"
      ],
      "featured": false
    },
    {
      "id": "res-086",
      "title": "Leadership Development Guide",
      "description": "Academy Module 3 - leadership skills",
      "type": "doc",
      "url": "/academy/module-3",
      "categoryId": "leadership",
      "tags": [
        "document",
        "advanced",
        "executive"
      ],
      "featured": true
    },
    {
      "id": "res-087",
      "title": "National Expansion Guide",
      "description": "Academy Module 4 - national expansion",
      "type": "doc",
      "url": "/academy/module-4",
      "categoryId": "leadership",
      "tags": [
        "document",
        "advanced",
        "executive"
      ],
      "featured": false
    },
    {
      "id": "res-088",
      "title": "Executive Leadership Guide",
      "description": "Academy Module 5 - executive leadership",
      "type": "doc",
      "url": "/academy/module-5",
      "categoryId": "leadership",
      "tags": [
        "document",
        "advanced",
        "top-rank"
      ],
      "featured": false
    },
    {
      "id": "res-089",
      "title": "Legacy Building Guide",
      "description": "Academy Module 6 - building lasting impact",
      "type": "doc",
      "url": "/academy/module-6",
      "categoryId": "leadership",
      "tags": [
        "document",
        "advanced",
        "top-rank"
      ],
      "featured": false
    }
  ]
}

// Helper function to get a category by ID
export function getCategoryById(categoryId: string): ResourceCategory | undefined {
  return RESOURCE_LIBRARY.categories.find(c => c.id === categoryId)
}

// Helper function to get a resource by ID
export function getResourceById(resourceId: string): Resource | undefined {
  return RESOURCE_LIBRARY.resources.find(r => r.id === resourceId)
}

// Helper function to get resources by category
export function getResourcesByCategory(categoryId: string): Resource[] {
  return RESOURCE_LIBRARY.resources.filter(r => r.categoryId === categoryId)
}

// Helper function to get resources by tag
export function getResourcesByTag(tagId: string): Resource[] {
  return RESOURCE_LIBRARY.resources.filter(r => r.tags.includes(tagId))
}

// Helper function to get featured resources
export function getFeaturedResources(): Resource[] {
  return RESOURCE_LIBRARY.resources.filter(r => r.featured)
}

// Helper function to search resources
export function searchResources(query: string): Resource[] {
  const lowerQuery = query.toLowerCase()
  return RESOURCE_LIBRARY.resources.filter(r => 
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery)
  )
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

// Helper function to get tags by type
export function getTagsByType(type: ResourceTag['type']): ResourceTag[] {
  return RESOURCE_LIBRARY.tags.filter(t => t.type === type)
}
