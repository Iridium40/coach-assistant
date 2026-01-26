"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ExternalLink, 
  CheckCircle2, 
  Circle,
  ChevronDown,
  ChevronUp,
  FileText,
  Video,
  FileSpreadsheet,
  Link as LinkIcon,
  Palette,
  ClipboardList
} from "lucide-react"
import type { AcademyModule, AcademyLesson, AcademyResource } from "@/lib/academy-data"
import { getResourceTypeIcon, getResourceTypeLabel } from "@/lib/academy-data"

interface ModuleContentProps {
  module: AcademyModule
  completedLessons?: string[]
  onLessonComplete?: (lessonId: string) => void
}

export function ModuleContent({ module, completedLessons = [], onLessonComplete }: ModuleContentProps) {
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set([module.lessons[0]?.id]))

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons(prev => {
      const next = new Set(prev)
      if (next.has(lessonId)) {
        next.delete(lessonId)
      } else {
        next.add(lessonId)
      }
      return next
    })
  }

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId)
  }

  const getResourceIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      doc: <FileText className="h-4 w-4" />,
      video: <Video className="h-4 w-4" />,
      pdf: <FileSpreadsheet className="h-4 w-4" />,
      link: <LinkIcon className="h-4 w-4" />,
      canva: <Palette className="h-4 w-4" />,
      form: <ClipboardList className="h-4 w-4" />
    }
    return icons[type] || <LinkIcon className="h-4 w-4" />
  }

  const getResourceColor = (type: string) => {
    const colors: Record<string, string> = {
      doc: "bg-blue-100 text-blue-700 border-blue-200",
      video: "bg-purple-100 text-purple-700 border-purple-200",
      pdf: "bg-red-100 text-red-700 border-red-200",
      link: "bg-gray-100 text-gray-700 border-gray-200",
      canva: "bg-pink-100 text-pink-700 border-pink-200",
      form: "bg-green-100 text-green-700 border-green-200"
    }
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200"
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--optavia-green-light))] to-white border border-[hsl(var(--optavia-green))] rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[hsl(var(--optavia-green))] text-white flex items-center justify-center text-2xl font-bold">
            {module.number}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h1>
            <p className="text-gray-600">{module.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-white">
                {module.lessons.length} Lessons
              </Badge>
              <Badge variant="outline" className="bg-white">
                {module.lessons.reduce((sum, lesson) => sum + lesson.resources.length, 0)} Resources
              </Badge>
              {module.rankRequirement && (
                <Badge className="bg-[hsl(var(--optavia-green))] text-white">
                  {module.rankRequirement}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lessons */}
      {module.lessons.map((lesson, index) => {
        const isExpanded = expandedLessons.has(lesson.id)
        const isCompleted = isLessonCompleted(lesson.id)

        return (
          <Card key={lesson.id} className={`border-2 ${isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleLesson(lesson.id)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="font-mono">
                        {lesson.number}
                      </Badge>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {lesson.resources.length} Resources
                      </Badge>
                      {lesson.milestones.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {lesson.milestones.length} Milestones
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0 space-y-6">
                {/* Resources */}
                {lesson.resources.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">📚</span>
                      Resources
                    </h4>
                    <div className="space-y-2">
                      {lesson.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-[hsl(var(--optavia-green))] hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg border ${getResourceColor(resource.type)}`}>
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 group-hover:text-[hsl(var(--optavia-green))] transition-colors">
                                    {resource.title}
                                  </h5>
                                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                                </div>
                                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-[hsl(var(--optavia-green))] flex-shrink-0" />
                              </div>
                              <div className="mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {getResourceTypeLabel(resource.type)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milestones */}
                {lesson.milestones.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      Milestones
                    </h4>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {lesson.milestones.map((milestone, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-amber-600 font-bold mt-0.5">✓</span>
                            <span>{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Mark Complete Button */}
                {!isCompleted && onLessonComplete && (
                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => onLessonComplete(lesson.id)}
                      className="w-full bg-[hsl(var(--optavia-green))] hover:bg-[hsl(var(--optavia-green-dark))] text-white"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark Lesson Complete
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
