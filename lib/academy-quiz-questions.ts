export interface QuizQuestion {
  id: string
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: "A" | "B" | "C" | "D"
  explanation?: string
}

export interface ModuleQuiz {
  moduleId: string
  questions: QuizQuestion[]
}

// Quiz questions for each academy module
export const ACADEMY_QUIZZES: Record<string, QuizQuestion[]> = {
  "module-1": [
    {
      id: "q1",
      question: "What is the secret to new coach growth according to the module?",
      options: {
        A: "Memorizing all the training materials",
        B: "Simple, consistent action with mentorship support",
        C: "Working independently without help",
        D: "Focusing only on enrolling clients"
      },
      correctAnswer: "B",
      explanation: "The module emphasizes that growth comes from simple, consistent action while leaning into your Business Coach for mentorship."
    },
    {
      id: "q2",
      question: "What is the apprenticeship model approach?",
      options: {
        A: "Learn everything from reading manuals",
        B: "Your coach SHOWS → You WATCH → You LEARN",
        C: "Trial and error without guidance",
        D: "Attending only Saturday Huddles"
      },
      correctAnswer: "B",
      explanation: "The apprenticeship model involves learning by watching your coach and following their guidance, similar to a student teacher shadowing an experienced teacher."
    },
    {
      id: "q3",
      question: "What are the four core activities for your first 30 days?",
      options: {
        A: "Share, Connect, Listen, Support",
        B: "Sell, Market, Recruit, Train",
        C: "Study, Practice, Test, Review",
        D: "Attend, Participate, Observe, Complete"
      },
      correctAnswer: "A",
      explanation: "The four core activities are: SHARE your story on social media, CONNECT with mentorship in 3-way messages, LISTEN to Health Assessment calls, and SUPPORT new clients by co-coaching with mentors."
    },
    {
      id: "q4",
      question: "What is required to earn the $250 CAB (Client Acquisition Bonus)?",
      options: {
        A: "3 new clients with 275 PQV each",
        B: "5 new clients with 275 PQV each",
        C: "10 new clients total",
        D: "Achieve Senior Coach rank"
      },
      correctAnswer: "B",
      explanation: "To earn $250 CAB, you need to develop 5 new clients who each order at least 275 PQV in a month."
    },
    {
      id: "q5",
      question: "What are the requirements to achieve Senior Coach rank?",
      options: {
        A: "3 Ordering Entities and 800 GQV",
        B: "5 Ordering Entities and 1,200+ GQV",
        C: "7 Ordering Entities and 1,500 GQV",
        D: "Complete all onboarding modules"
      },
      correctAnswer: "B",
      explanation: "To achieve Senior Coach rank, you need 5 Ordering Entities (clients or coaches) and 1,200+ GQV (Group Qualifying Volume)."
    }
  ],
  "module-2": [
    {
      id: "q1",
      question: "What is the primary goal of Module 2: Building Your Business?",
      options: {
        A: "Achieve the highest rank immediately",
        B: "Develop consistent client flow and grow your frontline",
        C: "Focus only on personal volume",
        D: "Work independently without team support"
      },
      correctAnswer: "B",
      explanation: "Module 2 focuses on developing consistent client flow and growing your frontline team."
    },
    {
      id: "q2",
      question: "What rank do you need to achieve to unlock Module 3?",
      options: {
        A: "Coach",
        B: "Senior Coach (SC)",
        C: "Master Guide (MG)",
        D: "Executive Director (ED)"
      },
      correctAnswer: "B",
      explanation: "You need to achieve Senior Coach (SC) rank to access Module 3: Leadership Development."
    },
    {
      id: "q3",
      question: "What is the key to building a sustainable business as a coach?",
      options: {
        A: "Focusing only on sales volume",
        B: "Consistency in client acquisition and support",
        C: "Working alone without help",
        D: "Rapid expansion without planning"
      },
      correctAnswer: "B",
      explanation: "Consistency in client acquisition and providing excellent support is key to building a sustainable coaching business."
    },
    {
      id: "q4",
      question: "Which of the following is most important when growing your frontline?",
      options: {
        A: "Quantity over quality",
        B: "Finding the right clients who are committed to their journey",
        C: "Enrolling anyone quickly",
        D: "Focusing only on family and friends"
      },
      correctAnswer: "B",
      explanation: "It's important to find the right clients who are committed to their health journey, as they're more likely to succeed and contribute to your business growth."
    }
  ],
  "module-3": [
    {
      id: "q1",
      question: "What is the primary focus of Module 3: Leadership Development?",
      options: {
        A: "Personal client acquisition",
        B: "Achieving FIBC status and building Executive Director teams",
        C: "Individual sales volume",
        D: "Only personal development"
      },
      correctAnswer: "B",
      explanation: "Module 3 focuses on achieving FIBC status and developing Executive Director teams in your organization."
    },
    {
      id: "q2",
      question: "What rank is required to access Module 3?",
      options: {
        A: "Coach",
        B: "Senior Coach",
        C: "Executive Director (ED)",
        D: "Master Guide"
      },
      correctAnswer: "C",
      explanation: "You need to achieve Executive Director (ED) rank to access Module 3: Leadership Development."
    },
    {
      id: "q3",
      question: "What does FIBC stand for and why is it important?",
      options: {
        A: "First In Business Class - a recognition award",
        B: "Founder Independent Business Coach - a status that unlocks additional bonuses",
        C: "Fast Income Business Center - a revenue stream",
        D: "Focused Independent Building Center - a training program"
      },
      correctAnswer: "B",
      explanation: "FIBC (Founder Independent Business Coach) is a status that unlocks additional bonuses and is required for advanced leadership development."
    },
    {
      id: "q4",
      question: "What is the key difference between Module 2 and Module 3?",
      options: {
        A: "Module 3 is easier than Module 2",
        B: "Module 3 focuses on building leaders (EDs) while Module 2 focuses on client flow",
        C: "Module 3 doesn't require rank advancement",
        D: "Module 3 is only about personal development"
      },
      correctAnswer: "B",
      explanation: "Module 2 focuses on client acquisition and frontline growth, while Module 3 focuses on developing Executive Director teams and leadership."
    },
    {
      id: "q5",
      question: "Why is building Executive Director teams important?",
      options: {
        A: "It's optional for business growth",
        B: "It creates a leadership structure that can scale and generate additional income through bonuses",
        C: "It's only for recognition",
        D: "It's required by OPTAVIA policy"
      },
      correctAnswer: "B",
      explanation: "Building Executive Director teams creates a scalable leadership structure and unlocks generation bonuses that contribute to your business growth."
    }
  ],
  "module-4": [
    {
      id: "q1",
      question: "What is the primary goal of Module 4: National Expansion?",
      options: {
        A: "Focus only on local market",
        B: "Build multiple Executive Director teams across regions",
        C: "Achieve personal volume only",
        D: "Work with a single ED team"
      },
      correctAnswer: "B",
      explanation: "Module 4 focuses on building multiple Executive Director teams across different regions for national expansion."
    },
    {
      id: "q2",
      question: "What rank is required to access Module 4?",
      options: {
        A: "Executive Director (ED)",
        B: "Integrated Regional Director (IRD)",
        C: "Integrated Global Director (IGD)",
        D: "Regional Director (RD)"
      },
      correctAnswer: "B",
      explanation: "You need to achieve Integrated Regional Director (IRD) rank to access Module 4: National Expansion."
    },
    {
      id: "q3",
      question: "What are the key requirements for 'Integrated' titles (IND, IGD)?",
      options: {
        A: "Only volume requirements",
        B: "You must also maintain FIBC status",
        C: "No additional requirements",
        D: "Only team size requirements"
      },
      correctAnswer: "B",
      explanation: "For 'Integrated' titles (IND, IGD), you must also maintain FIBC status in addition to other rank requirements."
    },
    {
      id: "q4",
      question: "What is the main challenge when expanding nationally?",
      options: {
        A: "Finding clients",
        B: "Building systems at scale to support hundreds of coaches",
        C: "Personal volume",
        D: "Time zone differences"
      },
      correctAnswer: "B",
      explanation: "As you expand nationally, you need to build systems at scale (weekly calls, training resources, leadership pipelines) to support hundreds of coaches without personally mentoring everyone."
    }
  ],
  "module-5": [
    {
      id: "q1",
      question: "What is the focus of Module 5: Executive Leadership?",
      options: {
        A: "Personal client management",
        B: "Stepping into company-wide influence and strategic leadership",
        C: "Only regional development",
        D: "Individual coaching skills"
      },
      correctAnswer: "B",
      explanation: "Module 5 focuses on stepping into company-wide influence and strategic leadership at the executive level."
    },
    {
      id: "q2",
      question: "What rank is required to access Module 5?",
      options: {
        A: "Integrated Regional Director",
        B: "Integrated Global Director (IGD)",
        C: "Integrated National Director (IND)",
        D: "Executive Director"
      },
      correctAnswer: "B",
      explanation: "You need to achieve Integrated Global Director (IGD) rank to access Module 5: Executive Leadership."
    },
    {
      id: "q3",
      question: "What becomes the primary focus at the executive leadership level?",
      options: {
        A: "Direct client coaching",
        B: "Creating the environment where others can do their best work",
        C: "Personal volume only",
        D: "Individual team management"
      },
      correctAnswer: "B",
      explanation: "At the executive leadership level, your job shifts from doing the work to creating the environment where others can do their best work."
    }
  ],
  "module-6": [
    {
      id: "q1",
      question: "What is the ultimate goal of Module 6: Legacy Building?",
      options: {
        A: "Achieve Senior Coach",
        B: "Achieve the highest rank in OPTAVIA (Presidential)",
        C: "Build 5 ED teams",
        D: "Maintain current rank"
      },
      correctAnswer: "B",
      explanation: "Module 6 focuses on achieving the highest rank in OPTAVIA, which is Presidential, representing the pinnacle of legacy building."
    },
    {
      id: "q2",
      question: "What rank is required to access Module 6?",
      options: {
        A: "Integrated Global Director",
        B: "Presidential",
        C: "Integrated National Director",
        D: "Integrated Presidential Director"
      },
      correctAnswer: "B",
      explanation: "You need to achieve Presidential rank to access Module 6: Legacy Building."
    },
    {
      id: "q3",
      question: "What is the key requirement for achieving Presidential rank?",
      options: {
        A: "10 active Executive Director teams",
        B: "Build 10 active ED teams with at least 5 maintaining FIBC status",
        C: "Personal volume only",
        D: "Regional expansion only"
      },
      correctAnswer: "B",
      explanation: "To achieve Presidential rank, you need to build 10 active Executive Director teams in your organization, with at least 5 of those EDs maintaining FIBC status."
    },
    {
      id: "q4",
      question: "What does legacy building represent in OPTAVIA?",
      options: {
        A: "Personal achievement only",
        B: "Creating a sustainable, multi-generational business that impacts thousands of lives",
        C: "Short-term success",
        D: "Individual recognition"
      },
      correctAnswer: "B",
      explanation: "Legacy building represents creating a sustainable, multi-generational business that impacts thousands of lives and continues to grow beyond your direct involvement."
    }
  ]
}
