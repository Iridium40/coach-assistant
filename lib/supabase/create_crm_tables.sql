-- Privacy-First CRM Tables for Health Coaches
-- Uses labels/nicknames only - NO personal identifiable information stored
-- Contact info and health data managed in OPTAVIA's official portal

-- ============================================
-- DROP EXISTING TABLES (if they exist with wrong schema)
-- ============================================

DROP TABLE IF EXISTS prospects CASCADE;
DROP TABLE IF EXISTS clients CASCADE;

-- ============================================
-- PROSPECTS TABLE
-- For tracking the "100s list" with privacy
-- ============================================

CREATE TABLE prospects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Privacy-first: label only, no PII
  label VARCHAR(50) NOT NULL,  -- e.g., "Gym Sarah", "Coffee shop mom"
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'cold' 
    CHECK (status IN ('cold', 'warm', 'ha_scheduled', 'ha_done', 'converted', 'coach', 'not_interested')),
  
  -- Source tracking (how they met)
  source TEXT NOT NULL DEFAULT 'other'
    CHECK (source IN ('social', 'gym', 'work', 'family', 'referral', 'other')),
  
  -- Action tracking
  last_action DATE,
  next_action DATE,
  action_type TEXT
    CHECK (action_type IS NULL OR action_type IN ('reach_out', 'follow_up', 'schedule_ha', 'health_assessment', 'schedule_call', 'close')),
  
  -- Coach's notes (for their reference only)
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CLIENTS TABLE
-- For tracking active clients with privacy
-- ============================================

CREATE TABLE clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Privacy-first: label only, no PII
  label VARCHAR(50) NOT NULL,  -- e.g., "Jennifer", "Mike"
  
  -- Program tracking
  start_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'paused', 'completed', 'churned')),
  
  -- Coach prospect tracking (interested in becoming a coach)
  is_coach_prospect BOOLEAN DEFAULT FALSE,
  
  -- Daily touchpoint tracking (resets daily via app logic)
  am_done BOOLEAN DEFAULT FALSE,
  pm_done BOOLEAN DEFAULT FALSE,
  last_touchpoint_date DATE,  -- Track when touchpoints were last reset
  
  -- Coach's notes (for their reference only)
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_prospects_user_id ON prospects(user_id);
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(user_id, status);
CREATE INDEX IF NOT EXISTS idx_prospects_next_action ON prospects(user_id, next_action);

CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(user_id, status);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Prospects RLS Policies
CREATE POLICY "Users can view their own prospects"
  ON prospects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own prospects"
  ON prospects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prospects"
  ON prospects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prospects"
  ON prospects FOR DELETE
  USING (auth.uid() = user_id);

-- Clients RLS Policies
CREATE POLICY "Users can view their own clients"
  ON clients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own clients"
  ON clients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clients"
  ON clients FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own clients"
  ON clients FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS (reuse existing handle_updated_at function)
-- ============================================

CREATE TRIGGER update_prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE prospects IS 'Privacy-first prospect tracking - labels only, no PII';
COMMENT ON TABLE clients IS 'Privacy-first client tracking - labels only, no health data';
COMMENT ON COLUMN prospects.label IS 'A nickname/label the coach uses to identify the prospect (no real names required)';
COMMENT ON COLUMN clients.label IS 'A nickname/label the coach uses to identify the client (no real names required)';
