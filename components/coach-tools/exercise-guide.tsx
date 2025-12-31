"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { 
  ExternalLink, 
  Dumbbell, 
  Heart, 
  Zap, 
  Timer,
  CheckCircle2,
  ArrowRight,
  Share2,
  Copy,
  Check
} from "lucide-react"

const WORKOUT_PLANS = {
  beginner: {
    title: "Beginner",
    description: "Just starting your motion journey",
    weeks: [
      { day: "Monday", activity: "15-min walk", type: "cardio" },
      { day: "Tuesday", activity: "Rest or light stretching", type: "rest" },
      { day: "Wednesday", activity: "15-min walk", type: "cardio" },
      { day: "Thursday", activity: "10-min bodyweight exercises", type: "strength" },
      { day: "Friday", activity: "15-min walk", type: "cardio" },
      { day: "Saturday", activity: "20-min leisure activity", type: "active" },
      { day: "Sunday", activity: "Rest", type: "rest" },
    ],
  },
  intermediate: {
    title: "Intermediate",
    description: "Building consistency and strength",
    weeks: [
      { day: "Monday", activity: "30-min brisk walk or jog", type: "cardio" },
      { day: "Tuesday", activity: "20-min strength training", type: "strength" },
      { day: "Wednesday", activity: "30-min cardio of choice", type: "cardio" },
      { day: "Thursday", activity: "20-min strength training", type: "strength" },
      { day: "Friday", activity: "30-min brisk walk or jog", type: "cardio" },
      { day: "Saturday", activity: "45-min active recreation", type: "active" },
      { day: "Sunday", activity: "Rest or yoga", type: "rest" },
    ],
  },
  advanced: {
    title: "Advanced",
    description: "Maximizing performance",
    weeks: [
      { day: "Monday", activity: "45-min HIIT or running", type: "cardio" },
      { day: "Tuesday", activity: "30-min upper body strength", type: "strength" },
      { day: "Wednesday", activity: "45-min cardio + core", type: "cardio" },
      { day: "Thursday", activity: "30-min lower body strength", type: "strength" },
      { day: "Friday", activity: "30-min HIIT", type: "cardio" },
      { day: "Saturday", activity: "60-min active recreation", type: "active" },
      { day: "Sunday", activity: "Active recovery or rest", type: "rest" },
    ],
  },
}

const OPTAVIA_ACTIVE_PRODUCTS = [
  {
    name: "Essential Amino Acid Blend",
    flavors: ["Strawberry Lemonade", "Orange Mango"],
    benefits: [
      "10g of EAAs per serving including 5.3g BCAAs",
      "Supports healthy muscle",
      "Aids post-exercise muscle recovery",
      "Reduces muscle soreness after exercise",
    ],
    features: ["Vegan", "Gluten-Free", "Kosher", "No artificial colors/flavors"],
  },
  {
    name: "OPTAVIA ACTIVE Whey Protein",
    flavors: ["Chocolate", "Vanilla"],
    benefits: [
      "24g of high-quality whey protein per serving",
      "Activates muscle protein synthesis",
      "Helps build muscle mass and strength",
      "Supports muscle growth",
    ],
    features: ["Kosher Dairy", "No Soy", "No artificial colors/flavors"],
  },
]

const OPTAVIA_ACTIVE_URL = "https://www.optavia.com/us/en/shop/optavia-active/c/active"
const OPTAVIA_MOTION_URL = "https://www.optavia.com/us/en/products-programs/motion-active"

export function ExerciseGuide() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<"beginner" | "intermediate" | "advanced">("beginner")
  const [copied, setCopied] = useState(false)

  // Generate shareable text for OPTAVIA ACTIVE
  const getOptaviaActiveShareText = () => {
    return `Check out OPTAVIA ACTIVE - Sports nutrition products designed to support your fitness journey!

🏋️ Essential Amino Acid Blend
• 10g of EAAs per serving including 5.3g BCAAs
• Supports healthy muscle & post-exercise recovery
• Available in Strawberry Lemonade & Orange Mango

💪 OPTAVIA ACTIVE Whey Protein
• 24g of high-quality whey protein per serving
• Helps build muscle mass and strength
• Available in Chocolate & Vanilla

Learn more: ${OPTAVIA_ACTIVE_URL}

These products are designed to work with OPTAVIA's nutrition plans to help protect muscle mass during weight loss and aging.`
  }

  // Copy OPTAVIA ACTIVE info to clipboard
  const handleCopyActiveInfo = async () => {
    try {
      await navigator.clipboard.writeText(getOptaviaActiveShareText())
      setCopied(true)
      toast({
        title: "Copied!",
        description: "OPTAVIA ACTIVE info copied to clipboard",
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

  // Share OPTAVIA ACTIVE info
  const handleShareActiveInfo = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: "OPTAVIA ACTIVE Products",
          text: getOptaviaActiveShareText(),
          url: OPTAVIA_ACTIVE_URL,
        })
        toast({
          title: "Shared!",
          description: "OPTAVIA ACTIVE info shared successfully",
        })
      } catch (error: any) {
        if (error.name !== "AbortError") {
          handleCopyActiveInfo()
        }
      }
    } else {
      handleCopyActiveInfo()
    }
  }

  // Copy just the link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(OPTAVIA_ACTIVE_URL)
      toast({
        title: "Link Copied!",
        description: "OPTAVIA ACTIVE shop link copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      })
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cardio":
        return "bg-red-100 text-red-700 border-red-200"
      case "strength":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "active":
        return "bg-green-100 text-green-700 border-green-200"
      case "rest":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="getting-started" className="text-xs sm:text-sm data-[state=active]:bg-white">
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="workout-plans" className="text-xs sm:text-sm data-[state=active]:bg-white">
            Workout Plans
          </TabsTrigger>
          <TabsTrigger value="optavia-active" className="text-xs sm:text-sm data-[state=active]:bg-white">
            OPTAVIA ACTIVE
          </TabsTrigger>
        </TabsList>

        {/* Getting Started Tab */}
        <TabsContent value="getting-started" className="space-y-4 mt-4">
          <div className="bg-[hsl(var(--optavia-green-light))] rounded-lg p-4">
            <h4 className="font-semibold text-optavia-dark mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
              Why Motion Matters
            </h4>
            <p className="text-sm text-optavia-gray mb-4">
              Regular physical activity is essential for maintaining muscle mass, especially during weight loss. 
              Starting as early as age 30, we lose 3-8% of muscle mass per decade. Motion helps preserve lean 
              muscle, boost metabolism, and support overall health.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-4 border-gray-200">
              <h5 className="font-medium text-optavia-dark mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Quick Tips
              </h5>
              <ul className="space-y-2 text-sm text-optavia-gray">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Start with just 10-15 minutes daily
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Walking counts as great exercise
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Consistency matters more than intensity
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Listen to your body and rest when needed
                </li>
              </ul>
            </Card>

            <Card className="p-4 border-gray-200">
              <h5 className="font-medium text-optavia-dark mb-2 flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-500" />
                Building the Habit
              </h5>
              <ul className="space-y-2 text-sm text-optavia-gray">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Schedule motion like an appointment
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Find activities you enjoy
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Track progress for motivation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                  Celebrate small wins
                </li>
              </ul>
            </Card>
          </div>
        </TabsContent>

        {/* Workout Plans Tab */}
        <TabsContent value="workout-plans" className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(WORKOUT_PLANS) as Array<keyof typeof WORKOUT_PLANS>).map((plan) => (
              <Button
                key={plan}
                variant={selectedPlan === plan ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlan(plan)}
                className={
                  selectedPlan === plan
                    ? "bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
                    : "border-gray-300"
                }
              >
                {WORKOUT_PLANS[plan].title}
              </Button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-optavia-dark mb-1">
              {WORKOUT_PLANS[selectedPlan].title} Plan
            </h4>
            <p className="text-sm text-optavia-gray mb-4">
              {WORKOUT_PLANS[selectedPlan].description}
            </p>

            <div className="space-y-2">
              {WORKOUT_PLANS[selectedPlan].weeks.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200"
                >
                  <div className="w-20 font-medium text-sm text-optavia-dark">
                    {day.day}
                  </div>
                  <div className="flex-1 text-sm text-optavia-gray">
                    {day.activity}
                  </div>
                  <Badge variant="outline" className={`text-xs ${getTypeColor(day.type)}`}>
                    {day.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-optavia-gray">
            <strong>Note:</strong> These are sample plans. Always consult with a healthcare provider 
            before starting any new exercise program.
          </p>
        </TabsContent>

        {/* OPTAVIA ACTIVE Tab */}
        <TabsContent value="optavia-active" className="space-y-4 mt-4">
          <div className="bg-gradient-to-r from-[hsl(var(--optavia-green-light))] to-blue-50 rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-optavia-dark mb-2 flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                  OPTAVIA ACTIVE Product Line
                </h4>
                <p className="text-sm text-optavia-gray">
                  Sports nutrition products designed to help people of all fitness levels optimize their 
                  motion habits and protect muscle mass during weight loss and aging.
                </p>
              </div>
              {/* Share buttons */}
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyActiveInfo}
                  className="h-8 w-8 text-[hsl(var(--optavia-green))] hover:bg-white"
                  title="Copy info to share with client"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShareActiveInfo}
                  className="h-8 w-8 text-[hsl(var(--optavia-green))] hover:bg-white"
                  title="Share with client"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {OPTAVIA_ACTIVE_PRODUCTS.map((product, index) => (
              <Card key={index} className="p-4 border-gray-200">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h5 className="font-semibold text-optavia-dark">{product.name}</h5>
                    <p className="text-xs text-optavia-gray">
                      Available in: {product.flavors.join(", ")}
                    </p>
                  </div>
                  <Badge className="bg-[hsl(var(--optavia-green))] text-white">$59.95</Badge>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-xs font-medium text-optavia-dark mb-2">Benefits:</h6>
                    <ul className="space-y-1">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-optavia-gray">
                          <CheckCircle2 className="h-3 w-3 text-[hsl(var(--optavia-green))] flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-xs font-medium text-optavia-dark mb-2">Features:</h6>
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs border-gray-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="gap-2 border-[hsl(var(--optavia-green))] text-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-light))]"
              onClick={() => window.open(OPTAVIA_ACTIVE_URL, "_blank")}
            >
              Shop OPTAVIA ACTIVE
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-gray-300 text-optavia-dark hover:bg-gray-50"
              onClick={handleCopyLink}
            >
              Copy Link for Client
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="default"
            className="w-full gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
            onClick={handleShareActiveInfo}
          >
            <Share2 className="h-4 w-4" />
            Share Product Info with Client
          </Button>

          <p className="text-xs text-optavia-gray">
            <em>These statements have not been evaluated by the Food and Drug Administration. 
            These products are not intended to diagnose, treat, cure or prevent any disease.</em>
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

