"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ProgressBar } from "@/components/progress-bar"
import { ArrowLeft, Bookmark, ExternalLink, FileText, Video } from "lucide-react"
import type { Module, UserData } from "@/lib/types"

interface ModuleDetailProps {
  module: Module
  userData: UserData
  setUserData: (data: UserData) => void
  onBack: () => void
}

export function ModuleDetail({ module, userData, setUserData, onBack }: ModuleDetailProps) {
  const completedCount = module.resources.filter((resource) => userData.completedResources.includes(resource.id)).length

  const progress = module.resources.length > 0 ? Math.round((completedCount / module.resources.length) * 100) : 0

  const toggleComplete = (resourceId: string) => {
    const newCompleted = userData.completedResources.includes(resourceId)
      ? userData.completedResources.filter((id) => id !== resourceId)
      : [...userData.completedResources, resourceId]

    setUserData({
      ...userData,
      completedResources: newCompleted,
    })
  }

  const toggleBookmark = (resourceId: string) => {
    const newBookmarks = userData.bookmarks.includes(resourceId)
      ? userData.bookmarks.filter((id) => id !== resourceId)
      : [...userData.bookmarks, resourceId]

    setUserData({
      ...userData,
      bookmarks: newBookmarks,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Resources
      </Button>

      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{module.icon}</span>
          <div className="flex-1">
            <h1 className="font-heading font-bold text-3xl text-optavia-dark mb-2">{module.title}</h1>
            <Badge className="bg-[hsl(var(--optavia-green-light))] text-[hsl(var(--optavia-green))]">
              {module.category}
            </Badge>
            <p className="text-optavia-gray mt-3">{module.description}</p>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-heading font-semibold text-optavia-dark">Module Progress</span>
            <span className="font-bold text-[hsl(var(--optavia-green))]">{progress}%</span>
          </div>
          <ProgressBar progress={progress} />
          <p className="text-sm text-optavia-gray mt-2">
            {completedCount} of {module.resources.length} resources completed
          </p>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl text-optavia-dark">Resources</h2>
        {module.resources.map((resource) => {
          const isCompleted = userData.completedResources.includes(resource.id)
          const isBookmarked = userData.bookmarks.includes(resource.id)

          return (
            <Card key={resource.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <Checkbox checked={isCompleted} onCheckedChange={() => toggleComplete(resource.id)} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    {resource.type === "doc" ? (
                      <FileText className="h-5 w-5 text-[hsl(var(--optavia-green))] mt-0.5" />
                    ) : (
                      <Video className="h-5 w-5 text-[hsl(var(--optavia-green))] mt-0.5" />
                    )}
                    <h3
                      className={`font-heading font-semibold text-optavia-dark ${isCompleted ? "line-through opacity-60" : ""}`}
                    >
                      {resource.title}
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resource.type === "doc" ? "Document" : "Video"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleBookmark(resource.id)}
                    className={isBookmarked ? "text-[hsl(var(--optavia-green))]" : "text-optavia-gray"}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))]"
                    asChild
                  >
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Open
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
