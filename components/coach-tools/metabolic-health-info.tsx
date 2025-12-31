"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  ExternalLink, 
  AlertTriangle, 
  TrendingUp, 
  Heart,
  Activity,
  Apple,
  Utensils,
  Scale,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Share2,
  Copy
} from "lucide-react"

const METABOLIC_MARKERS = [
  { name: "Blood Pressure", icon: Heart, description: "High blood pressure (≥130/85 mmHg)" },
  { name: "Blood Sugar", icon: Activity, description: "Elevated fasting glucose (≥100 mg/dL)" },
  { name: "Triglycerides", icon: TrendingUp, description: "High triglycerides (≥150 mg/dL)" },
  { name: "HDL Cholesterol", icon: AlertTriangle, description: "Low HDL (<40 mg/dL men, <50 mg/dL women)" },
  { name: "Waist Circumference", icon: Scale, description: "Excess abdominal fat (>40\" men, >35\" women)" },
]

const TALKING_POINTS = [
  {
    question: "What is metabolic syndrome?",
    answer: "A cluster of conditions that occur together, increasing the risk of heart disease, stroke, and type 2 diabetes. Having 3+ of the 5 markers indicates metabolic syndrome.",
  },
  {
    question: "How does weight loss help?",
    answer: "Even modest weight loss of 5-10% can significantly improve metabolic markers. The 5&1 Plan is designed to support healthy, sustainable weight loss while preserving muscle mass.",
  },
  {
    question: "Why is the 5&1 Plan effective?",
    answer: "It provides balanced nutrition with optimal protein (to preserve muscle), controlled portions, and the structure needed to create a caloric deficit while staying satisfied.",
  },
  {
    question: "How does OPTAVIA support metabolic health?",
    answer: "Through portion-controlled Fuelings, Lean & Green meals, and the Habits of Health system, OPTAVIA helps create sustainable lifestyle changes that support long-term metabolic health.",
  },
]

const OPTAVIA_APPROACH = [
  {
    title: "Optimal Nutrition",
    icon: Utensils,
    points: [
      "Balanced macronutrients in every Fueling",
      "Adequate protein to preserve lean muscle",
      "Controlled portions for sustainable weight loss",
    ],
  },
  {
    title: "Healthy Habits",
    icon: Apple,
    points: [
      "Habits of Health system for lifestyle transformation",
      "Coach support for accountability",
      "Gradual, sustainable changes",
    ],
  },
  {
    title: "Sustainable Results",
    icon: TrendingUp,
    points: [
      "Focus on lifelong transformation",
      "Not a quick fix—a lifestyle change",
      "Support for maintenance phase",
    ],
  },
]

const OPTAVIA_ACTIVE_URL = "https://www.optavia.com/us/en/products-programs/motion-active"

export function MetabolicHealthInfo() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  // Generate shareable text for metabolic health info
  const getMetabolicInfoText = () => {
    return `Understanding Metabolic Health with OPTAVIA

Did you know that even modest weight loss of 5-10% can significantly improve metabolic health markers?

Key Statistics:
• 1 in 3 U.S. adults are affected by metabolic syndrome
• We lose 3-8% of muscle mass per decade after age 30
• Lifestyle changes can significantly improve metabolic markers

How OPTAVIA Helps:
✓ Balanced nutrition in every Fueling
✓ Adequate protein to preserve lean muscle
✓ Controlled portions for sustainable weight loss
✓ Habits of Health system for lasting transformation
✓ Coach support for accountability

Learn more about OPTAVIA ACTIVE for muscle support: ${OPTAVIA_ACTIVE_URL}

Always consult with your healthcare provider before starting any weight loss program.`
  }

  // Copy info to clipboard
  const handleCopyInfo = async () => {
    try {
      await navigator.clipboard.writeText(getMetabolicInfoText())
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Metabolic health info copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  // Share info
  const handleShareInfo = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "Metabolic Health with OPTAVIA",
          text: getMetabolicInfoText(),
        })
        toast({
          title: "Shared!",
          description: "Metabolic health info shared successfully",
        })
      } catch (error: any) {
        if (error.name !== "AbortError") {
          handleCopyInfo()
        }
      }
    } else {
      handleCopyInfo()
    }
  }

  return (
    <div className="space-y-6">
      {/* Understanding Metabolic Dysfunction */}
      <div>
        <h4 className="font-semibold text-optavia-dark mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Understanding Metabolic Dysfunction
        </h4>
        <p className="text-sm text-optavia-gray mb-4">
          Metabolic syndrome affects approximately 1 in 3 U.S. adults. It's characterized by a 
          cluster of conditions that increase the risk of serious health problems. The good news? 
          Lifestyle changes, including weight loss and healthy eating, can significantly improve 
          these markers.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {METABOLIC_MARKERS.map((marker, index) => (
            <Card key={index} className="p-3 border-gray-200 bg-gray-50">
              <div className="flex items-start gap-2">
                <marker.icon className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h6 className="font-medium text-sm text-optavia-dark">{marker.name}</h6>
                  <p className="text-xs text-optavia-gray">{marker.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* How OPTAVIA Helps */}
      <div className="bg-[hsl(var(--optavia-green-light))] rounded-lg p-4">
        <h4 className="font-semibold text-optavia-dark mb-4">
          How OPTAVIA Supports Metabolic Health
        </h4>
        <div className="grid sm:grid-cols-3 gap-4">
          {OPTAVIA_APPROACH.map((approach, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <approach.icon className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                <h5 className="font-medium text-sm text-optavia-dark">{approach.title}</h5>
              </div>
              <ul className="space-y-1">
                {approach.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-optavia-gray">
                    <CheckCircle2 className="h-3 w-3 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Client Conversation Talking Points */}
      <div>
        <h4 className="font-semibold text-optavia-dark mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Client Conversation Talking Points
        </h4>
        <div className="space-y-3">
          {TALKING_POINTS.map((point, index) => (
            <Card key={index} className="p-4 border-gray-200">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="bg-[hsl(var(--optavia-green-light))] border-[hsl(var(--optavia-green))] text-[hsl(var(--optavia-green))] flex-shrink-0">
                  Q{index + 1}
                </Badge>
                <div>
                  <h6 className="font-medium text-sm text-optavia-dark mb-1">{point.question}</h6>
                  <p className="text-sm text-optavia-gray">{point.answer}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-[hsl(var(--optavia-green-light))] rounded-lg p-4">
        <h4 className="font-semibold text-optavia-dark mb-3">Key Statistics to Share</h4>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">5-10%</div>
            <div className="text-xs text-optavia-gray">Weight loss needed to improve metabolic markers</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-[hsl(var(--optavia-green))]">1 in 3</div>
            <div className="text-xs text-optavia-gray">U.S. adults affected by metabolic syndrome</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-amber-500">3-8%</div>
            <div className="text-xs text-optavia-gray">Muscle mass lost per decade after age 30</div>
          </div>
        </div>
      </div>

      {/* Share with Client */}
      <Button
        variant="default"
        className="w-full gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
        onClick={handleShareInfo}
      >
        <Share2 className="h-4 w-4" />
        Share Info with Client
      </Button>

      {/* Learn More Links */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2 border-gray-300 text-optavia-dark hover:bg-gray-50"
          onClick={() => window.open("https://www.optaviablog.com", "_blank")}
        >
          OPTAVIA Blog
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-2 border-[hsl(var(--optavia-green))] text-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))]"
          onClick={() => window.open(OPTAVIA_ACTIVE_URL, "_blank")}
        >
          OPTAVIA ACTIVE
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-optavia-gray">
        <strong>Disclaimer:</strong> This information is for educational purposes only and should not 
        be considered medical advice. Always recommend clients consult with their healthcare provider 
        before starting any weight loss program, especially if they have existing health conditions.
      </p>
    </div>
  )
}

