"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUserData } from "@/contexts/user-data-context"
import { createClient } from "@/lib/supabase/client"
import { 
  Award, Users, TrendingUp, CheckCircle, Clock, 
  ChevronRight, RefreshCw, Download, Mail, Trophy,
  BookOpen, Star, Target, Calendar
} from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface TeamMember {
  coach_id: string
  coach_name: string
  coach_email: string
  total_quizzes_completed: number
  total_quizzes_passed: number
  average_score: number
  last_completion: string | null
}

interface QuizCompletion {
  coach_id: string
  coach_name: string
  coach_email: string
  module_id: string
  module_title: string
  score: number
  total_questions: number
  percentage: number
  passed: boolean
  completed_at: string
}

export default function TeamAchievementsPage() {
  const { user, profile } = useUserData()
  const [teamStats, setTeamStats] = useState<TeamMember[]>([])
  const [recentCompletions, setRecentCompletions] = useState<QuizCompletion[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [memberCompletions, setMemberCompletions] = useState<QuizCompletion[]>([])

  useEffect(() => {
    if (user?.id) {
      loadTeamData()
    }
  }, [user?.id])

  const loadTeamData = async () => {
    if (!user?.id) return
    setLoading(true)

    const supabase = createClient()

    // Get team members and their quiz stats
    const { data: stats, error: statsError } = await supabase
      .rpc("get_team_quiz_stats", { sponsor_user_id: user.id })

    if (statsError) {
      console.error("Error loading team stats:", statsError)
    } else {
      setTeamStats(stats || [])
    }

    // Get recent completions from team
    const { data: completions, error: completionsError } = await supabase
      .from("sponsor_team_quiz_progress")
      .select("*")
      .eq("sponsor_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(20)

    if (completionsError) {
      console.error("Error loading completions:", completionsError)
    } else {
      setRecentCompletions(completions || [])
    }

    setLoading(false)
  }

  const loadMemberCompletions = async (memberId: string) => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("quiz_completions")
      .select("*")
      .eq("user_id", memberId)
      .order("completed_at", { ascending: false })

    if (error) {
      console.error("Error loading member completions:", error)
    } else {
      setMemberCompletions(data || [])
    }
    setSelectedMember(memberId)
  }

  const totalTeamQuizzes = teamStats.reduce((sum, m) => sum + m.total_quizzes_completed, 0)
  const totalTeamPassed = teamStats.reduce((sum, m) => sum + m.total_quizzes_passed, 0)
  const teamPassRate = totalTeamQuizzes > 0 ? Math.round((totalTeamPassed / totalTeamQuizzes) * 100) : 0
  const avgTeamScore = teamStats.length > 0 
    ? Math.round(teamStats.reduce((sum, m) => sum + (m.average_score || 0), 0) / teamStats.filter(m => m.average_score).length)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
        <Header activeTab="team" />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--optavia-green))]"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header activeTab="team" />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-[hsl(var(--optavia-green))] to-[#008542] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-sm opacity-90 mb-2 uppercase tracking-wide">
                <span>Team</span>
                <ChevronRight className="h-4 w-4" />
                <span className="font-semibold">Training Achievements</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <Trophy className="h-8 w-8" />
                Team Training Achievements
              </h1>
              <p className="text-lg opacity-90">
                Track your team's quiz completions and celebrate their learning progress.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[hsl(var(--optavia-green))]">{teamStats.length}</div>
                      <div className="text-sm text-optavia-gray">Team Members</div>
                    </div>
                    <Users className="h-8 w-8 text-[hsl(var(--optavia-green))] opacity-30" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">{totalTeamQuizzes}</div>
                      <div className="text-sm text-optavia-gray">Quizzes Completed</div>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600 opacity-30" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-amber-600">{teamPassRate}%</div>
                      <div className="text-sm text-optavia-gray">Pass Rate</div>
                    </div>
                    <Target className="h-8 w-8 text-amber-600 opacity-30" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-purple-600">{avgTeamScore || 0}%</div>
                      <div className="text-sm text-optavia-gray">Avg Score</div>
                    </div>
                    <Star className="h-8 w-8 text-purple-600 opacity-30" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Team Members List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                          Team Progress
                        </CardTitle>
                        <CardDescription>Quiz completion status for each team member</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={loadTeamData}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {teamStats.length === 0 ? (
                      <div className="text-center py-12 text-optavia-gray">
                        <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                        <p>No team members found.</p>
                        <p className="text-sm mt-2">Team members will appear here when they complete quizzes.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {teamStats.map((member) => (
                          <div
                            key={member.coach_id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                              selectedMember === member.coach_id 
                                ? "border-[hsl(var(--optavia-green))] bg-green-50" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => loadMemberCompletions(member.coach_id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--optavia-green))] to-green-600 flex items-center justify-center text-white font-bold">
                                  {member.coach_name?.charAt(0) || "?"}
                                </div>
                                <div>
                                  <div className="font-semibold text-optavia-dark">{member.coach_name || "Unknown"}</div>
                                  <div className="text-sm text-optavia-gray">{member.coach_email}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <Badge variant={member.total_quizzes_passed > 0 ? "default" : "secondary"} className={member.total_quizzes_passed > 0 ? "bg-green-100 text-green-800" : ""}>
                                    {member.total_quizzes_passed}/{member.total_quizzes_completed} passed
                                  </Badge>
                                </div>
                                {member.last_completion && (
                                  <div className="text-xs text-optavia-gray mt-1">
                                    Last: {formatDistanceToNow(new Date(member.last_completion), { addSuffix: true })}
                                  </div>
                                )}
                              </div>
                            </div>
                            {member.average_score > 0 && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-optavia-gray">Average Score</span>
                                  <span className="font-semibold text-[hsl(var(--optavia-green))]">{Math.round(member.average_score)}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                  <div 
                                    className="h-full bg-[hsl(var(--optavia-green))] rounded-full transition-all"
                                    style={{ width: `${member.average_score}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity & Member Details */}
              <div className="space-y-6">
                {/* Selected Member Details */}
                {selectedMember && memberCompletions.length > 0 && (
                  <Card className="border-2 border-[hsl(var(--optavia-green))]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-[hsl(var(--optavia-green))]" />
                        Completed Quizzes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {memberCompletions.map((completion, index) => (
                          <div 
                            key={`${completion.module_id}-${index}`}
                            className={`p-3 rounded-lg ${completion.passed ? "bg-green-50" : "bg-amber-50"}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-sm text-optavia-dark">{completion.module_title}</div>
                              {completion.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Clock className="h-4 w-4 text-amber-600" />
                              )}
                            </div>
                            <div className="flex items-center justify-between mt-1 text-xs text-optavia-gray">
                              <span>{completion.score}/{completion.total_questions} ({completion.percentage}%)</span>
                              <span>{format(new Date(completion.completed_at), "MMM d")}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Team Activity */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentCompletions.length === 0 ? (
                      <div className="text-center py-8 text-optavia-gray">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No recent quiz completions</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {recentCompletions.slice(0, 10).map((completion, index) => (
                          <div 
                            key={`${completion.module_id}-${completion.coach_id}-${index}`}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              completion.passed ? "bg-green-100" : "bg-amber-100"
                            }`}>
                              {completion.passed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Clock className="h-4 w-4 text-amber-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-optavia-dark truncate">
                                {completion.coach_name}
                              </div>
                              <div className="text-xs text-optavia-gray truncate">
                                {completion.module_title}
                              </div>
                              <div className="text-xs text-optavia-gray">
                                {completion.percentage}% • {formatDistanceToNow(new Date(completion.completed_at), { addSuffix: true })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/training">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Training Modules
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start" onClick={loadTeamData}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
