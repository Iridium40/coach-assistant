"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react"
import { useState } from "react"

function ViewerContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = searchParams.get("url")
  const title = searchParams.get("title") || "External Resource"
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-optavia-gray">No URL provided.</p>
          <Button variant="outline" onClick={() => router.back()} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar with back button and title */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3 max-w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex-shrink-0 gap-2 text-optavia-dark hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="font-medium text-sm sm:text-base text-optavia-dark truncate">
              {title}
            </h1>
            <p className="text-xs text-gray-400 truncate">{url}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open in New Tab</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && !error && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--optavia-green))]" />
          <span className="ml-3 text-optavia-gray">Loading...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-optavia-dark font-medium mb-2">
              This site can't be displayed inline
            </p>
            <p className="text-sm text-optavia-gray mb-4">
              Some websites restrict embedding. You can open it directly instead.
            </p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open {title}
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={url}
        title={title}
        className={`flex-1 w-full border-0 ${error ? "hidden" : ""}`}
        style={{ minHeight: loading && !error ? 0 : "calc(100vh - 60px)" }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
      />
    </div>
  )
}

export default function ViewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--optavia-green))]" />
        </div>
      }
    >
      <ViewerContent />
    </Suspense>
  )
}
