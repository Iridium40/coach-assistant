"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Search, Filter, Plus, ChevronDown, ChevronUp, Phone, MessageSquare, Scale, Heart, Calendar, Clock, AlertCircle, CheckCircle, Circle, TrendingUp, TrendingDown, Minus, Star, MoreVertical, Edit2, Trash2, Eye, X, Check, Copy, ChevronRight, Target, Award, Zap, RefreshCw, Download, BarChart3, Activity, Mail } from 'lucide-react';

export default function ClientTracker() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Jennifer Davis',
      phone: '555-345-6789',
      email: 'jen@email.com',
      startDate: '2024-01-01',
      currentDay: 3,
      status: 'active',
      health: 'on-track',
      totalLost: 4.2,
      weeklyAvg: 4.2,
      lastContact: '2024-01-03',
      lastWeighIn: '2024-01-01',
      nextTouchpoint: { type: 'evening-text', time: '7:00 PM', day: 3 },
      todayMorning: true,
      todayEvening: false,
      notes: 'Very motivated! Husband considering joining too.',
      goalWeight: 145,
      startWeight: 185,
      currentWeight: 180.8,
      coachProspect: false,
      prospectId: null // Link to prospect pipeline by email
    },
    {
      id: 2,
      name: 'Robert Martinez',
      phone: '555-456-7890',
      email: 'robert@email.com',
      startDate: '2023-12-28',
      currentDay: 7,
      status: 'active',
      health: 'on-track',
      totalLost: 8.5,
      weeklyAvg: 8.5,
      lastContact: '2024-01-03',
      lastWeighIn: '2024-01-03',
      nextTouchpoint: { type: 'celebration', time: '8:00 PM', day: 7 },
      todayMorning: true,
      todayEvening: false,
      notes: 'Week 1 complete! Lost 8.5 lbs. Very happy.',
      goalWeight: 200,
      startWeight: 245,
      currentWeight: 236.5,
      coachProspect: true,
      prospectId: null
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      phone: '555-567-8901',
      email: 'lisa@email.com',
      startDate: '2023-12-21',
      currentDay: 14,
      status: 'active',
      health: 'at-risk',
      totalLost: 6.0,
      weeklyAvg: 3.0,
      lastContact: '2024-01-01',
      lastWeighIn: '2024-01-01',
      nextTouchpoint: { type: 'check-in-call', time: 'ASAP', day: 14 },
      todayMorning: false,
      todayEvening: false,
      notes: 'Haven\'t heard from her in 2 days. May be struggling.',
      goalWeight: 130,
      startWeight: 165,
      currentWeight: 159,
      coachProspect: false,
      prospectId: null
    },
    {
      id: 4,
      name: 'David Wilson',
      phone: '555-678-9012',
      email: 'david@email.com',
      startDate: '2023-12-14',
      currentDay: 21,
      status: 'active',
      health: 'crushing-it',
      totalLost: 18.2,
      weeklyAvg: 6.1,
      lastContact: '2024-01-03',
      lastWeighIn: '2024-01-03',
      nextTouchpoint: { type: '21-day-celebration', time: '7:00 PM', day: 21 },
      todayMorning: true,
      todayEvening: false,
      notes: '21 days! Forming habits. Great results.',
      goalWeight: 180,
      startWeight: 230,
      currentWeight: 211.8,
      coachProspect: true,
      prospectId: null
    },
    {
      id: 5,
      name: 'Amanda Torres',
      phone: '555-789-0123',
      email: 'amanda@email.com',
      startDate: '2023-11-10',
      currentDay: 55,
      status: 'active',
      health: 'on-track',
      totalLost: 32.5,
      weeklyAvg: 4.1,
      lastContact: '2024-01-02',
      lastWeighIn: '2024-01-02',
      nextTouchpoint: { type: 'weekly-call', time: '3:00 PM', day: 55 },
      todayMorning: true,
      todayEvening: true,
      notes: 'Almost at goal! Interested in coaching opportunity.',
      goalWeight: 140,
      startWeight: 175,
      currentWeight: 142.5,
      coachProspect: true,
      prospectId: 5 // Linked to Amanda Torres in prospect pipeline
    },
    {
      id: 6,
      name: 'Michael Brown',
      phone: '555-890-1234',
      email: 'michael@email.com',
      startDate: '2023-12-01',
      currentDay: 34,
      status: 'paused',
      health: 'paused',
      totalLost: 12.0,
      weeklyAvg: 3.0,
      lastContact: '2023-12-28',
      lastWeighIn: '2023-12-28',
      nextTouchpoint: { type: 're-engagement', time: 'When Ready', day: 34 },
      todayMorning: false,
      todayEvening: false,
      notes: 'Paused for holidays. Check in after Jan 5.',
      goalWeight: 195,
      startWeight: 240,
      currentWeight: 228,
      coachProspect: false,
      prospectId: null
    },
    {
      id: 7,
      name: 'Sarah Kim',
      phone: '555-901-2345',
      email: 'sarah.k@email.com',
      startDate: '2024-01-02',
      currentDay: 2,
      status: 'active',
      health: 'new',
      totalLost: 0,
      weeklyAvg: 0,
      lastContact: '2024-01-03',
      lastWeighIn: '2024-01-02',
      nextTouchpoint: { type: 'evening-text', time: '7:00 PM', day: 2 },
      todayMorning: true,
      todayEvening: false,
      notes: 'Day 2 - watch for withdrawal symptoms. Very excited to start.',
      goalWeight: 125,
      startWeight: 150,
      currentWeight: 150,
      coachProspect: false,
      prospectId: null
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterHealth, setFilterHealth] = useState('all');
  const [sortBy, setSortBy] = useState('nextAction');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showWeighInModal, setShowWeighInModal] = useState(false);
  const [newWeighIn, setNewWeighIn] = useState('');

  const healthStatuses: Record<string, { label: string; color: string; icon: any; bg: string }> = {
    'crushing-it': { label: 'Crushing It', color: '#4caf50', icon: TrendingUp, bg: '#e8f5e9' },
    'on-track': { label: 'On Track', color: '#2196f3', icon: CheckCircle, bg: '#e3f2fd' },
    'new': { label: 'New Client', color: '#9c27b0', icon: Star, bg: '#f3e5f5' },
    'at-risk': { label: 'At Risk', color: '#f44336', icon: AlertCircle, bg: '#ffebee' },
    'paused': { label: 'Paused', color: '#9e9e9e', icon: Minus, bg: '#f5f5f5' },
  };

  const getPhase = (day: number) => {
    if (day <= 3) return { label: 'Critical Phase', color: '#f44336', desc: 'Extra support needed' };
    if (day <= 7) return { label: 'Week 1', color: '#ff9800', desc: 'Building habits' };
    if (day <= 14) return { label: 'Week 2', color: '#2196f3', desc: 'Finding rhythm' };
    if (day <= 21) return { label: 'Week 3', color: '#9c27b0', desc: 'Habit formation' };
    if (day <= 30) return { label: 'Week 4', color: '#4caf50', desc: 'Strong finish' };
    if (day <= 60) return { label: 'Month 2', color: '#00bcd4', desc: 'Momentum building' };
    if (day <= 90) return { label: 'Month 3', color: '#009688', desc: 'Transformation' };
    return { label: 'Maintenance', color: '#607d8b', desc: 'Lifestyle phase' };
  };

  const getDaysSince = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getProgressPercent = (current: number, start: number, goal: number) => {
    const totalToLose = start - goal;
    const lost = start - current;
    return Math.min(100, Math.round((lost / totalToLose) * 100));
  };

  const filteredClients = clients
    .filter(c => {
      if (filterStatus !== 'all' && c.status !== filterStatus) return false;
      if (filterHealth !== 'all' && c.health !== filterHealth) return false;
      if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) && !c.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'nextAction') {
        if (a.health === 'at-risk' && b.health !== 'at-risk') return -1;
        if (b.health === 'at-risk' && a.health !== 'at-risk') return 1;
        return 0;
      }
      if (sortBy === 'day') return a.currentDay - b.currentDay;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') {
        const aProgress = getProgressPercent(a.currentWeight, a.startWeight, a.goalWeight);
        const bProgress = getProgressPercent(b.currentWeight, b.startWeight, b.goalWeight);
        return bProgress - aProgress;
      }
      return 0;
    });

  const stats = {
    total: clients.filter(c => c.status === 'active').length,
    needAttention: clients.filter(c => c.health === 'at-risk').length,
    newThisWeek: clients.filter(c => c.currentDay <= 7 && c.status === 'active').length,
    coachProspects: clients.filter(c => c.coachProspect).length,
    avgWeeklyLoss: (clients.filter(c => c.status === 'active' && c.weeklyAvg > 0).reduce((acc, c) => acc + c.weeklyAvg, 0) / Math.max(1, clients.filter(c => c.status === 'active' && c.weeklyAvg > 0).length)).toFixed(1),
    totalLostAllClients: clients.reduce((acc, c) => acc + c.totalLost, 0).toFixed(1)
  };

  const logWeighIn = () => {
    if (!selectedClient || !newWeighIn) return;
    const weight = parseFloat(newWeighIn);
    const updatedClients = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          currentWeight: weight,
          totalLost: parseFloat((c.startWeight - weight).toFixed(1)),
          lastWeighIn: new Date().toISOString().split('T')[0]
        };
      }
      return c;
    });
    setClients(updatedClients);
    setShowWeighInModal(false);
    setNewWeighIn('');
    setSelectedClient(null);
  };

  const markTouchpointComplete = (clientId: number, type: string) => {
    setClients(clients.map(c => {
      if (c.id === clientId) {
        if (type === 'morning') return { ...c, todayMorning: true, lastContact: new Date().toISOString().split('T')[0] };
        if (type === 'evening') return { ...c, todayEvening: true, lastContact: new Date().toISOString().split('T')[0] };
      }
      return c;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)', fontFamily: "'Avenir Next', 'Segoe UI', sans-serif" }}>
      <header style={{ background: 'linear-gradient(135deg, #00A651 0%, #006633 100%)', padding: '24px 32px', color: 'white', boxShadow: '0 4px 20px rgba(0, 166, 81, 0.3)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, opacity: 0.9, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <span>Coach Tools</span>
                <ChevronRight size={14} />
                <span style={{ fontWeight: 600 }}>Client Tracker</span>
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
                <Heart size={32} />
                Client Tracker
              </h1>
              <p style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>Track all your clients' progress, touchpoints, and health status in one place.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/prospect-pipeline">
                <button style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10, color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <Users size={18} />
                  View Pipeline
                </button>
              </Link>
              <button
                onClick={() => setShowAddModal(true)}
                style={{ padding: '12px 24px', background: 'white', border: 'none', borderRadius: 10, color: '#00A651', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
              >
                <Plus size={20} />
                Add Client
              </button>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
        {/* Integration Notice */}
        <div style={{ background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', borderRadius: 12, padding: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, border: '1px solid #90caf9' }}>
          <div style={{ padding: 12, background: '#2196f3', borderRadius: 10 }}>
            <RefreshCw size={24} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: '#1565c0', marginBottom: 4 }}>Integrated with Prospect Pipeline</div>
            <div style={{ fontSize: 13, color: '#1976d2' }}>Clients are automatically linked to their prospect records by email. Coach prospects are flagged for business opportunity follow-up.</div>
          </div>
          <Link href="/prospect-pipeline">
            <button style={{ padding: '10px 20px', background: '#2196f3', border: 'none', borderRadius: 8, color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
              Open Pipeline →
            </button>
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#4caf50' }}>{stats.total}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Active Clients</div>
              </div>
              <Heart size={24} color="#4caf50" style={{ opacity: 0.3 }} />
            </div>
          </div>
          <div style={{ background: stats.needAttention > 0 ? '#ffebee' : 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: stats.needAttention > 0 ? '2px solid #ef9a9a' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#f44336' }}>{stats.needAttention}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Need Attention</div>
              </div>
              <AlertCircle size={24} color="#f44336" style={{ opacity: 0.3 }} />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#9c27b0' }}>{stats.newThisWeek}</div>
                <div style={{ fontSize: 12, color: '#888' }}>In Week 1</div>
              </div>
              <Star size={24} color="#9c27b0" style={{ opacity: 0.3 }} />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#ff9800' }}>{stats.coachProspects}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Coach Prospects</div>
              </div>
              <Award size={24} color="#ff9800" style={{ opacity: 0.3 }} />
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#2196f3' }}>{stats.avgWeeklyLoss}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Avg Lbs/Week</div>
              </div>
              <TrendingDown size={24} color="#2196f3" style={{ opacity: 0.3 }} />
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#2e7d32' }}>{stats.totalLostAllClients}</div>
                <div style={{ fontSize: 12, color: '#1b5e20' }}>Total Lbs Lost!</div>
              </div>
              <Award size={24} color="#2e7d32" style={{ opacity: 0.5 }} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', borderRadius: 12, padding: 16, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 14 }}
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterHealth}
            onChange={(e) => setFilterHealth(e.target.value)}
            style={{ padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}
          >
            <option value="all">All Health</option>
            <option value="crushing-it">Crushing It</option>
            <option value="on-track">On Track</option>
            <option value="at-risk">At Risk</option>
            <option value="new">New Clients</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '10px 12px', border: '2px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}
          >
            <option value="nextAction">Needs Attention First</option>
            <option value="day">By Program Day</option>
            <option value="name">By Name</option>
            <option value="progress">By Progress %</option>
          </select>
        </div>

        {/* Client Cards */}
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredClients.map((client) => {
            const healthInfo = healthStatuses[client.health];
            const phase = getPhase(client.currentDay);
            const progressPercent = getProgressPercent(client.currentWeight, client.startWeight, client.goalWeight);
            const daysSinceContact = getDaysSince(client.lastContact);
            const HealthIcon = healthInfo.icon;

            return (
              <div
                key={client.id}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: client.health === 'at-risk' ? '2px solid #ef9a9a' : '1px solid #e0e0e0',
                  opacity: client.status === 'paused' ? 0.7 : 1
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 180px', gap: 24, alignItems: 'center' }}>
                  {/* Client Info */}
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 18,
                      position: 'relative'
                    }}>
                      {client.name.split(' ').map(n => n[0]).join('')}
                      {client.coachProspect && (
                        <div style={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: '#ff9800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Award size={12} color="white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a' }}>{client.name}</span>
                        <span style={{
                          padding: '2px 8px',
                          background: healthInfo.bg,
                          color: healthInfo.color,
                          borderRadius: 10,
                          fontSize: 11,
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}>
                          <HealthIcon size={12} />
                          {healthInfo.label}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
                        <span style={{
                          padding: '2px 8px',
                          background: phase.color,
                          color: 'white',
                          borderRadius: 6,
                          fontWeight: 600,
                          fontSize: 11
                        }}>
                          Day {client.currentDay}
                        </span>
                        <span style={{ color: '#888' }}>{phase.label}</span>
                        <span style={{ color: daysSinceContact > 1 ? '#f44336' : '#888' }}>
                          Last: {daysSinceContact === 0 ? 'Today' : daysSinceContact === 1 ? 'Yesterday' : `${daysSinceContact}d ago`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Weight Progress */}
                  <div>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Progress</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: '#00A651' }}>-{client.totalLost}</span>
                      <span style={{ fontSize: 13, color: '#888' }}>lbs</span>
                    </div>
                    <div style={{ height: 6, background: '#e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${progressPercent}%`,
                        background: `linear-gradient(90deg, #00A651, #00c853)`,
                        borderRadius: 3
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
                      {progressPercent}% to goal
                    </div>
                  </div>

                  {/* Today's Touchpoints */}
                  <div>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Touchpoints</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => markTouchpointComplete(client.id, 'morning')}
                        style={{
                          padding: '6px 12px',
                          background: client.todayMorning ? '#e8f5e9' : '#fff8e1',
                          border: `1px solid ${client.todayMorning ? '#a5d6a7' : '#ffe082'}`,
                          borderRadius: 6,
                          fontSize: 11,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          color: client.todayMorning ? '#2e7d32' : '#f57c00'
                        }}
                      >
                        {client.todayMorning ? <Check size={12} /> : <Circle size={12} />}
                        AM
                      </button>
                      <button
                        onClick={() => markTouchpointComplete(client.id, 'evening')}
                        style={{
                          padding: '6px 12px',
                          background: client.todayEvening ? '#e8f5e9' : '#fff8e1',
                          border: `1px solid ${client.todayEvening ? '#a5d6a7' : '#ffe082'}`,
                          borderRadius: 6,
                          fontSize: 11,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          color: client.todayEvening ? '#2e7d32' : '#f57c00'
                        }}
                      >
                        {client.todayEvening ? <Check size={12} /> : <Circle size={12} />}
                        PM
                      </button>
                    </div>
                  </div>

                  {/* Next Action */}
                  <div>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Next Action</div>
                    <div style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: client.nextTouchpoint.time === 'ASAP' ? '#f44336' : '#1a1a1a'
                    }}>
                      {client.nextTouchpoint.time}
                    </div>
                    <div style={{ fontSize: 12, color: '#666' }}>
                      {client.nextTouchpoint.type.replace(/-/g, ' ')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button
                      title="Send Text"
                      style={{ padding: 10, background: '#e3f2fd', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                    >
                      <MessageSquare size={18} color="#1565c0" />
                    </button>
                    <button
                      title="Call"
                      style={{ padding: 10, background: '#e8f5e9', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                    >
                      <Phone size={18} color="#2e7d32" />
                    </button>
                    <button
                      onClick={() => { setSelectedClient(client); setShowWeighInModal(true); }}
                      title="Log Weigh-in"
                      style={{ padding: 10, background: '#f3e5f5', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                    >
                      <Scale size={18} color="#7b1fa2" />
                    </button>
                    <button
                      onClick={() => { setSelectedClient(client); setShowDetailModal(true); }}
                      title="View Details"
                      style={{ padding: 10, background: '#f5f5f5', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                    >
                      <Eye size={18} color="#666" />
                    </button>
                  </div>
                </div>

                {client.notes && (
                  <div style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: '1px solid #f0f0f0',
                    fontSize: 13,
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{ fontWeight: 600, color: '#888' }}>Notes:</span>
                    {client.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredClients.length === 0 && (
          <div style={{ background: 'white', borderRadius: 16, padding: 60, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <Heart size={48} color="#ccc" style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 18, fontWeight: 600, color: '#888', marginBottom: 8 }}>No clients found</div>
            <div style={{ fontSize: 14, color: '#aaa' }}>Try adjusting your filters or add a new client.</div>
          </div>
        )}
      </div>

      {/* Weigh-in Modal */}
      {showWeighInModal && selectedClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 32, width: '100%', maxWidth: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Log Weigh-in</h2>
              <button onClick={() => { setShowWeighInModal(false); setSelectedClient(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} color="#888" />
              </button>
            </div>

            <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 10, marginBottom: 20 }}>
              <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{selectedClient.name}</div>
              <div style={{ fontSize: 13, color: '#888' }}>
                Day {selectedClient.currentDay} • Current: {selectedClient.currentWeight} lbs
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 8 }}>
                New Weight (lbs)
              </label>
              <input
                type="number"
                step="0.1"
                value={newWeighIn}
                onChange={(e) => setNewWeighIn(e.target.value)}
                placeholder={selectedClient.currentWeight.toString()}
                style={{ width: '100%', padding: '14px', border: '2px solid #e0e0e0', borderRadius: 10, fontSize: 18, fontWeight: 600, textAlign: 'center' }}
              />
            </div>

            {newWeighIn && (
              <div style={{
                padding: 16,
                background: parseFloat(newWeighIn) < selectedClient.currentWeight ? '#e8f5e9' : '#fff8e1',
                borderRadius: 10,
                marginBottom: 20,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: parseFloat(newWeighIn) < selectedClient.currentWeight ? '#4caf50' : '#ff9800' }}>
                  {parseFloat(newWeighIn) < selectedClient.currentWeight ? '-' : '+'}
                  {Math.abs(selectedClient.currentWeight - parseFloat(newWeighIn)).toFixed(1)} lbs
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>
                  {parseFloat(newWeighIn) < selectedClient.currentWeight ? 'Great progress!' : 'That\'s okay - fluctuations happen!'}
                </div>
              </div>
            )}

            <button
              onClick={logWeighIn}
              disabled={!newWeighIn}
              style={{
                width: '100%',
                padding: '14px',
                background: newWeighIn ? 'linear-gradient(135deg, #00A651, #00c853)' : '#e0e0e0',
                border: 'none',
                borderRadius: 10,
                color: 'white',
                fontWeight: 700,
                fontSize: 16,
                cursor: newWeighIn ? 'pointer' : 'not-allowed'
              }}
            >
              Log Weigh-in
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 32, width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{selectedClient.name}</h2>
              <button onClick={() => { setShowDetailModal(false); setSelectedClient(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} color="#888" />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#00A651' }}>Day {selectedClient.currentDay}</div>
                <div style={{ fontSize: 12, color: '#888' }}>On Program</div>
              </div>
              <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#2196f3' }}>-{selectedClient.totalLost}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Lbs Lost</div>
              </div>
              <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#ff9800' }}>{selectedClient.weeklyAvg}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Avg/Week</div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>Weight Journey</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#888' }}>Start: {selectedClient.startWeight} lbs</span>
                <span style={{ fontSize: 13, color: '#888' }}>Goal: {selectedClient.goalWeight} lbs</span>
              </div>
              <div style={{ height: 12, background: '#e0e0e0', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  height: '100%',
                  width: `${getProgressPercent(selectedClient.currentWeight, selectedClient.startWeight, selectedClient.goalWeight)}%`,
                  background: 'linear-gradient(90deg, #00A651, #00c853)',
                  borderRadius: 6
                }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#00A651' }}>
                  Current: {selectedClient.currentWeight} lbs
                </span>
                <span style={{ fontSize: 13, color: '#888', marginLeft: 12 }}>
                  ({(selectedClient.currentWeight - selectedClient.goalWeight).toFixed(1)} lbs to go)
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>Contact Info</div>
              <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 10 }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                    <Phone size={14} color="#888" />
                    {selectedClient.phone}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
                  <Mail size={14} color="#888" />
                  {selectedClient.email}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>Notes</div>
              <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 10, fontSize: 14, color: '#555' }}>
                {selectedClient.notes || 'No notes yet.'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{
                flex: 1,
                padding: '12px',
                background: '#e3f2fd',
                border: 'none',
                borderRadius: 10,
                color: '#1565c0',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}>
                <MessageSquare size={18} />
                Send Text
              </button>
              <button style={{
                flex: 1,
                padding: '12px',
                background: '#e8f5e9',
                border: 'none',
                borderRadius: 10,
                color: '#2e7d32',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}>
                <Calendar size={18} />
                View Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}