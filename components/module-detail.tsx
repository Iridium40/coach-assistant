"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ProgressBar } from "@/components/progress-bar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Bookmark, ExternalLink, FileText, Video, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { Module, UserData } from "@/lib/types"

interface ModuleDetailProps {
  module: Module
  userData: UserData
  setUserData: (data: UserData) => void
  onBack: () => void
}

export function ModuleDetail({ module, userData, setUserData, onBack }: ModuleDetailProps) {
  const { toast } = useToast()
  const [openResource, setOpenResource] = useState<{ url: string; title: string } | null>(null)
  const completedCount = module.resources.filter((resource) => userData.completedResources.includes(resource.id)).length

  const progress = module.resources.length > 0 ? Math.round((completedCount / module.resources.length) * 100) : 0

  const handleResourceClick = (url: string, title: string, openInNewTab: boolean = false) => {
    if (openInNewTab) {
      // Show toast notification
      toast({
        title: "Opening in new tab",
        description: `${title} opened in a new tab. Switch back to this tab to return to the app.`,
        duration: 4000,
      })
      // Open the link
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      // Open in modal
      setOpenResource({ url, title })
    }
  }

  // Convert Google Docs edit URL to view/embed URL if possible
  const getEmbedUrl = (url: string) => {
    // For Google Docs, try to convert to embeddable format
    if (url.includes("docs.google.com/document/d/")) {
      const docId = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/)?.[1]
      if (docId) {
        return `https://docs.google.com/document/d/${docId}/preview`
      }
    }
    // For other URLs, try to use the original URL
    return url
  }

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
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4 sm:mb-6 gap-2 text-sm sm:text-base">
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back to Resources</span>
        <span className="sm:hidden">Back</span>
      </Button>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <span className="text-3xl sm:text-5xl flex-shrink-0">{module.icon}</span>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-optavia-dark mb-2 break-words">{module.title}</h1>
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
            <Card key={resource.id} className="p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-4">
                <div className="pt-1 flex-shrink-0">
                  <Checkbox checked={isCompleted} onCheckedChange={() => toggleComplete(resource.id)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    {resource.type === "doc" ? (
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--optavia-green))] mt-0.5 flex-shrink-0" />
                    ) : (
                      <Video className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--optavia-green))] mt-0.5 flex-shrink-0" />
                    )}
                    <h3
                      className={`font-heading font-semibold text-sm sm:text-base text-optavia-dark break-words ${isCompleted ? "line-through opacity-60" : ""}`}
                    >
                      {resource.title}
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resource.type === "doc" ? "Document" : "Video"}
                  </Badge>
                </div>

                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleBookmark(resource.id)}
                        className={`h-8 w-8 sm:h-10 sm:w-10 ${isBookmarked ? "text-[hsl(var(--optavia-green))]" : "text-optavia-gray"}`}
                      >
                        <Bookmark className={`h-3 w-3 sm:h-4 sm:w-4 ${isBookmarked ? "fill-current" : ""}`} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isBookmarked ? "Remove bookmark" : "Bookmark this resource"}
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          className="gap-1 sm:gap-2 bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-xs sm:text-sm px-2 sm:px-3"
                          onClick={() => handleResourceClick(resource.url, resource.title, false)}
                        >
                          <span className="hidden sm:inline">View</span>
                          <span className="sm:hidden">View</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        View in app (opens in modal)
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                          onClick={() => handleResourceClick(resource.url, resource.title, true)}
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Open in new tab
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Resource View Modal */}
      <Dialog open={!!openResource} onOpenChange={(open) => !open && setOpenResource(null)}>
        <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 flex flex-col" showCloseButton={false}>
          <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
            <div className="flex items-center justify-between gap-2">
              <DialogTitle className="text-base sm:text-lg font-heading truncate flex-1">{openResource?.title}</DialogTitle>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (openResource) {
                      handleResourceClick(openResource.url, openResource.title, true)
                      setOpenResource(null)
                    }
                  }}
                  className="gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Open in New Tab</span>
                  <span className="sm:hidden">New Tab</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenResource(null)}
                  className="h-8 w-8 sm:h-10 sm:w-10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-hidden relative bg-gray-50">
            {openResource && (
              <>
                <iframe
                  src={getEmbedUrl(openResource.url)}
                  className="w-full h-full border-0"
                  title={openResource.title}
                  allow="clipboard-read; clipboard-write"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation-by-user-activation"
                />
                {/* Fallback message if iframe fails */}
                <div className="absolute inset-0 flex items-center justify-center bg-white p-6 hidden" id="iframe-fallback">
                  <Card className="p-6 max-w-md text-center">
                    <p className="text-optavia-gray mb-4">
                      This document cannot be displayed in the app. Please use the "Open in New Tab" button to view it.
                    </p>
                    <Button
                      onClick={() => {
                        if (openResource) {
                          handleResourceClick(openResource.url, openResource.title, true)
                          setOpenResource(null)
                        }
                      }}
                      className="gap-2"
                    >
                      Open in New Tab
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Card>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
