"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Clock, Phone, MessageSquare, Calendar, Users, TrendingUp, Target, AlertCircle, ChevronRight, Star, Zap, Sun, Coffee, Scale, Heart, Award, Gift, Bell, Filter, RefreshCw, ChevronDown, ChevronUp, User, Mail, Play, Pause, BarChart3, Flame, Trophy, ArrowRight, ExternalLink, Plus, X, Check } from 'lucide-react';

export default function DailyActionDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState('all');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [expandedSection, setExpandedSection] = useState('priority');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const dayOfWeek = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const coachData = {
    name: 'Coach',
    rank: 'Executive Director $20K',
    rankProgress: 78,
    nextRank: 'ED $30K',
    streakDays: 12,
    weeklyGoal: { target: 10, completed: 7 },
  };

  const priorityActions = [
    {
      id: 'p1',
      type: 'ha',
      priority: 'critical',
      time: '7:00 PM',
      title: 'Health Assessment with Mike Williams',
      subtitle: 'Coworker • Very motivated, had health scare',
      person: 'Mike Williams',
      phone: '555-234-5678',
      icon: Target,
      color: '#e91e63',
      action: 'Start HA',
      tips: ['Review his health history', 'Have calculator ready', 'Prepare success stories']
    },
    {
      id: 'p2',
      type: 'follow-up',
      priority: 'high',
      time: 'Today',
      title: 'Follow up with Sarah Johnson',
      subtitle: 'Warm lead • Interested in weight loss',
      person: 'Sarah Johnson',
      phone: '555-123-4567',
      icon: Phone,
      color: '#ff9800',
      action: 'Call Now',
      tips: ['She mentioned husband might be interested', 'Ask about her timeline']
    },
    {
      id: 'p3',
      type: 'close',
      priority: 'high',
      time: 'Today',
      title: 'Close Amanda Torres on coaching',
      subtitle: 'Great client results • Interested in business',
      person: 'Amanda Torres',
      phone: '555-567-8901',
      icon: Award,
      color: '#9c27b0',
      action: 'Schedule Call',
      tips: ['Review her client journey', 'Prepare income disclosure', 'Have sign-up link ready']
    }
  ];

  const clientCheckIns = [
    {
      id: 'c1',
      name: 'Jennifer Davis',
      day: 3,
      phase: 'Critical Phase',
      phaseColor: '#f44336',
      lastContact: 'Yesterday',
      status: 'On Track',
      statusColor: '#4caf50',
      nextTouch: 'Evening check-in',
      touchTime: '7:00 PM',
      notes: 'Day 3 - hardest day, extra encouragement needed',
      morningDone: true,
      eveningDone: false
    },
    {
      id: 'c2',
      name: 'Robert Martinez',
      day: 7,
      phase: 'Week 1 Complete',
      phaseColor: '#4caf50',
      lastContact: 'Yesterday',
      status: 'Struggling',
      statusColor: '#ff9800',
      nextTouch: 'Celebration + Week 2 prep',
      touchTime: '8:00 PM',
      notes: 'Weigh-in day! Lost 5 lbs. Prepare celebration.',
      morningDone: true,
      eveningDone: false
    },
    {
      id: 'c3',
      name: 'Lisa Thompson',
      day: 14,
      phase: '2 Weeks Strong',
      phaseColor: '#2196f3',
      lastContact: '2 days ago',
      status: 'At Risk',
      statusColor: '#f44336',
      nextTouch: 'Check-in call',
      touchTime: 'ASAP',
      notes: 'Haven\'t heard from her - may be struggling',
      morningDone: false,
      eveningDone: false
    },
    {
      id: 'c4',
      name: 'David Wilson',
      day: 21,
      phase: 'Habit Formed!',
      phaseColor: '#9c27b0',
      lastContact: 'Yesterday',
      status: 'Crushing It',
      statusColor: '#4caf50',
      nextTouch: '21-day celebration',
      touchTime: '7:00 PM',
      notes: '21 days = habits formed! Big celebration.',
      morningDone: true,
      eveningDone: false
    }
  ];

  const prospectFollowUps = [
    {
      id: 'pr1',
      name: 'Emily Chen',
      status: 'Warm',
      statusColor: '#ff9800',
      lastContact: '3 days ago',
      source: 'Instagram',
      actionType: 'follow-up',
      notes: 'Liked my transformation post, started convo',
      overdue: true
    },
    {
      id: 'pr2',
      name: 'James Brown',
      status: 'Cold',
      statusColor: '#78909c',
      lastContact: '1 week ago',
      source: 'Gym',
      actionType: 'reach-out',
      notes: 'Mentioned wanting to lose weight',
      overdue: true
    },
    {
      id: 'pr3',
      name: 'Maria Garcia',
      status: 'HA Completed',
      statusColor: '#9c27b0',
      lastContact: 'Yesterday',
      source: 'Referral',
      actionType: 'close',
      notes: 'Did HA, very interested, needs to talk to husband',
      overdue: false
    }
  ];

  const upcomingEvents = [
    { id: 'e1', time: '12:00 PM', title: 'Team Training Call', type: 'team', duration: '1 hr' },
    { id: 'e2', time: '3:00 PM', title: 'New Coach Onboarding - Tyler', type: 'coaching', duration: '30 min' },
    { id: 'e3', time: '7:00 PM', title: 'Health Assessment - Mike', type: 'ha', duration: '45 min' },
  ];

  const stats = {
    activeClients: 8,
    clientsNeedingAttention: 2,
    prospectsInPipeline: 12,
    haScheduledThisWeek: 3,
    weeklyContacts: { done: 23, goal: 30 }
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const totalTasks = priorityActions.length + clientCheckIns.length + prospectFollowUps.length;
  const progressPercent = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)', fontFamily: "'Avenir Next', 'Segoe UI', sans-serif" }}>
      <header style={{ background: 'linear-gradient(135deg, #00A651 0%, #006633 100%)', padding: '24px 32px', color: 'white', boxShadow: '0 4px 20px rgba(0, 166, 81, 0.3)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 4 }}>{dayOfWeek} • {dateStr}</div>
              <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px 0' }}>
                {getGreeting()}, {coachData.name}! 👋
              </h1>
              <p style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>
                You have <strong>{totalTasks - completedCount} tasks</strong> remaining today. Let's make it count!
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>{timeStr}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: 20 }}>
                <Flame size={18} color="#ffc107" />
                <span style={{ fontWeight: 600 }}>{coachData.streakDays} Day Streak!</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 13, opacity: 0.9 }}>Today's Progress</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{completedCount}/{totalTasks} Complete</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #fff, rgba(255,255,255,0.8))',
                borderRadius: 4,
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#4caf50' }}>{stats.activeClients}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Active Clients</div>
              </div>
              <Heart size={24} color="#4caf50" style={{ opacity: 0.5 }} />
            </div>
          </div>
          <div style={{ background: stats.clientsNeedingAttention > 0 ? '#fff8e1' : 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: stats.clientsNeedingAttention > 0 ? '2px solid #ffc107' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#ff9800' }}>{stats.clientsNeedingAttention}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Need Attention</div>
              </div>
              <AlertCircle size={24} color="#ff9800" style={{ opacity: 0.5 }} />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#2196f3' }}>{stats.prospectsInPipeline}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>In Pipeline</div>
              </div>
              <Users size={24} color="#2196f3" style={{ opacity: 0.5 }} />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#9c27b0' }}>{stats.haScheduledThisWeek}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>HAs This Week</div>
              </div>
              <Target size={24} color="#9c27b0" style={{ opacity: 0.5 }} />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#00A651' }}>
                  {stats.weeklyContacts.done}<span style={{ fontSize: 16, color: '#888' }}>/{stats.weeklyContacts.goal}</span>
                </div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Weekly Contacts</div>
              </div>
              <MessageSquare size={24} color="#00A651" style={{ opacity: 0.5 }} />
            </div>
            <div style={{ marginTop: 8, height: 4, background: '#e0e0e0', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${(stats.weeklyContacts.done / stats.weeklyContacts.goal) * 100}%`, background: '#00A651', borderRadius: 2 }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <div>
            <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Zap size={20} color="#e91e63" />
                  Priority Actions
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#888', marginLeft: 8 }}>Do these first!</span>
                </h2>
                <span style={{ fontSize: 13, color: '#888' }}>{priorityActions.filter(a => completedTasks[a.id]).length}/{priorityActions.length} done</span>
              </div>

              {priorityActions.map((action, index) => {
                const Icon = action.icon;
                const isCompleted = completedTasks[action.id];

                return (
                  <div
                    key={action.id}
                    style={{
                      padding: 20,
                      marginBottom: index < priorityActions.length - 1 ? 12 : 0,
                      background: isCompleted ? '#f5f5f5' : `linear-gradient(135deg, ${action.color}08, ${action.color}03)`,
                      borderRadius: 12,
                      border: `2px solid ${isCompleted ? '#e0e0e0' : action.color}`,
                      opacity: isCompleted ? 0.6 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', gap: 16 }}>
                      <button
                        onClick={() => toggleTask(action.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 2 }}
                      >
                        {isCompleted ? (
                          <CheckCircle size={24} color="#4caf50" fill="#4caf50" />
                        ) : (
                          <Circle size={24} color={action.color} />
                        )}
                      </button>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{
                                padding: '2px 8px',
                                background: action.color,
                                color: 'white',
                                borderRadius: 4,
                                fontSize: 10,
                                fontWeight: 600,
                                textTransform: 'uppercase'
                              }}>
                                {action.priority}
                              </span>
                              <span style={{ fontSize: 12, color: '#888' }}>{action.time}</span>
                            </div>
                            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1a1a1a', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                              {action.title}
                            </h3>
                            <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#666' }}>{action.subtitle}</p>
                          </div>
                          <div style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: action.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon size={22} color="white" />
                          </div>
                        </div>

                        {!isCompleted && (
                          <>
                            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                              <button style={{
                                padding: '8px 16px',
                                background: action.color,
                                border: 'none',
                                borderRadius: 8,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: 13,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                              }}>
                                <Play size={14} />
                                {action.action}
                              </button>
                              <button style={{
                                padding: '8px 16px',
                                background: '#f0f0f0',
                                border: 'none',
                                borderRadius: 8,
                                color: '#666',
                                fontWeight: 500,
                                fontSize: 13,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                              }}>
                                <Phone size={14} />
                                {action.phone}
                              </button>
                            </div>

                            {action.tips && (
                              <div style={{ marginTop: 12, padding: 12, background: 'rgba(255,255,255,0.8)', borderRadius: 8 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#888', marginBottom: 6 }}>QUICK TIPS:</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                  {action.tips.map((tip, i) => (
                                    <span key={i} style={{ fontSize: 11, padding: '4px 8px', background: '#fff', borderRadius: 4, color: '#555' }}>
                                      • {tip}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Heart size={20} color="#4caf50" />
                  Client Check-ins
                </h2>
                <button style={{ fontSize: 13, color: '#00A651', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  View All Clients →
                </button>
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                {clientCheckIns.map((client) => {
                  const isCompleted = completedTasks[`client-${client.id}`];

                  return (
                    <div
                      key={client.id}
                      style={{
                        padding: 16,
                        background: client.status === 'At Risk' ? '#fff5f5' : '#fafafa',
                        borderRadius: 12,
                        border: client.status === 'At Risk' ? '2px solid #ffcdd2' : '1px solid #e0e0e0',
                        opacity: isCompleted ? 0.6 : 1
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={() => toggleTask(`client-${client.id}`)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            {isCompleted ? (
                              <CheckCircle size={20} color="#4caf50" fill="#4caf50" />
                            ) : (
                              <Circle size={20} color="#ccc" />
                            )}
                          </button>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{client.name}</span>
                              <span style={{
                                padding: '2px 8px',
                                background: client.phaseColor,
                                color: 'white',
                                borderRadius: 10,
                                fontSize: 10,
                                fontWeight: 600
                              }}>
                                Day {client.day}
                              </span>
                              <span style={{
                                padding: '2px 8px',
                                background: `${client.statusColor}20`,
                                color: client.statusColor,
                                borderRadius: 10,
                                fontSize: 10,
                                fontWeight: 600
                              }}>
                                {client.status}
                              </span>
                            </div>
                            <div style={{ fontSize: 12, color: '#666' }}>{client.notes}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: client.touchTime === 'ASAP' ? '#f44336' : '#1a1a1a' }}>
                            {client.touchTime}
                          </div>
                          <div style={{ fontSize: 11, color: '#888' }}>{client.nextTouch}</div>
                        </div>
                      </div>

                      {!isCompleted && (
                        <div style={{ display: 'flex', gap: 8, marginTop: 12, marginLeft: 32 }}>
                          <button style={{
                            padding: '6px 12px',
                            background: '#e3f2fd',
                            border: 'none',
                            borderRadius: 6,
                            color: '#1565c0',
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}>
                            <MessageSquare size={12} />
                            Send Text
                          </button>
                          <button style={{
                            padding: '6px 12px',
                            background: '#e8f5e9',
                            border: 'none',
                            borderRadius: 6,
                            color: '#2e7d32',
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}>
                            <Phone size={12} />
                            Call
                          </button>
                          <button style={{
                            padding: '6px 12px',
                            background: '#f3e5f5',
                            border: 'none',
                            borderRadius: 6,
                            color: '#7b1fa2',
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}>
                            <Scale size={12} />
                            Log Weigh-in
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Users size={20} color="#2196f3" />
                  Prospect Follow-ups
                  {prospectFollowUps.filter(p => p.overdue).length > 0 && (
                    <span style={{
                      padding: '2px 8px',
                      background: '#f44336',
                      color: 'white',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600
                    }}>
                      {prospectFollowUps.filter(p => p.overdue).length} Overdue
                    </span>
                  )}
                </h2>
                <button style={{ fontSize: 13, color: '#00A651', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  View Pipeline →
                </button>
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                {prospectFollowUps.map((prospect) => {
                  const isCompleted = completedTasks[`prospect-${prospect.id}`];

                  return (
                    <div
                      key={prospect.id}
                      style={{
                        padding: 16,
                        background: prospect.overdue ? '#fff8e1' : '#fafafa',
                        borderRadius: 12,
                        border: prospect.overdue ? '2px solid #ffe082' : '1px solid #e0e0e0',
                        opacity: isCompleted ? 0.6 : 1
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <button
                            onClick={() => toggleTask(`prospect-${prospect.id}`)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            {isCompleted ? (
                              <CheckCircle size={20} color="#4caf50" fill="#4caf50" />
                            ) : (
                              <Circle size={20} color="#ccc" />
                            )}
                          </button>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                              <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{prospect.name}</span>
                              <span style={{
                                padding: '2px 8px',
                                background: `${prospect.statusColor}20`,
                                color: prospect.statusColor,
                                borderRadius: 10,
                                fontSize: 10,
                                fontWeight: 600
                              }}>
                                {prospect.status}
                              </span>
                              {prospect.overdue && (
                                <span style={{ fontSize: 11, color: '#f57c00', fontWeight: 600 }}>
                                  <AlertCircle size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                  Overdue
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: '#666' }}>{prospect.notes}</div>
                            <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
                              {prospect.source} • Last contact: {prospect.lastContact}
                            </div>
                          </div>
                        </div>
                        {!isCompleted && (
                          <button style={{
                            padding: '8px 16px',
                            background: '#2196f3',
                            border: 'none',
                            borderRadius: 8,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: 'pointer'
                          }}>
                            Contact
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: 'linear-gradient(135deg, #1a1a1a, #333)', borderRadius: 16, padding: 24, marginBottom: 24, color: 'white' }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Current Rank</div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 700 }}>{coachData.rank}</h3>
              <div style={{ fontSize: 13, color: '#4caf50', marginBottom: 16 }}>
                {coachData.rankProgress}% to {coachData.nextRank}
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{
                  height: '100%',
                  width: `${coachData.rankProgress}%`,
                  background: 'linear-gradient(90deg, #00A651, #00c853)',
                  borderRadius: 4
                }} />
              </div>
              <button style={{
                width: '100%',
                padding: '10px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                color: 'white',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500
              }}>
                View Rank Calculator →
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={18} color="#2196f3" />
                Today's Schedule
              </h3>
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  style={{
                    padding: 12,
                    background: index === 0 ? '#e3f2fd' : '#fafafa',
                    borderRadius: 8,
                    marginBottom: index < upcomingEvents.length - 1 ? 8 : 0,
                    borderLeft: `3px solid ${index === 0 ? '#2196f3' : '#e0e0e0'}`
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{event.title}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                    {event.time} • {event.duration}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Target size={18} color="#00A651" />
                Weekly Goal
              </h3>
              <div style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: '#00A651' }}>
                  {coachData.weeklyGoal.completed}
                  <span style={{ fontSize: 24, color: '#888' }}>/{coachData.weeklyGoal.target}</span>
                </div>
                <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>Conversations This Week</div>
                <div style={{ marginTop: 16, height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(coachData.weeklyGoal.completed / coachData.weeklyGoal.target) * 100}%`,
                    background: 'linear-gradient(90deg, #00A651, #00c853)',
                    borderRadius: 4
                  }} />
                </div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 12 }}>
                  {coachData.weeklyGoal.target - coachData.weeklyGoal.completed} more to hit your goal!
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button style={{
                  padding: '12px 16px',
                  background: '#f0faf4',
                  border: '1px solid #c8e6c9',
                  borderRadius: 10,
                  color: '#2e7d32',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left'
                }}>
                  <Plus size={18} />
                  Add New Prospect
                </button>
                <button style={{
                  padding: '12px 16px',
                  background: '#e3f2fd',
                  border: '1px solid #bbdefb',
                  borderRadius: 10,
                  color: '#1565c0',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left'
                }}>
                  <Calendar size={18} />
                  Schedule Health Assessment
                </button>
                <button style={{
                  padding: '12px 16px',
                  background: '#fce4ec',
                  border: '1px solid #f8bbd9',
                  borderRadius: 10,
                  color: '#c2185b',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left'
                }}>
                  <Heart size={18} />
                  Add New Client
                </button>
                <button style={{
                  padding: '12px 16px',
                  background: '#f3e5f5',
                  border: '1px solid #e1bee7',
                  borderRadius: 10,
                  color: '#7b1fa2',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left'
                }}>
                  <MessageSquare size={18} />
                  Access Scripts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}