-- Migration: External Resources Management
-- Allows admins to manage external resource links shown on the Resources page

-- Create external_resources table
CREATE TABLE IF NOT EXISTS external_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Basic info
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT NOT NULL,
  button_text TEXT NOT NULL DEFAULT 'Visit Resource',
  
  -- Categorization
  category TEXT NOT NULL DEFAULT 'OPTAVIA Resources',
  
  -- Features (stored as JSON array of strings)
  features JSONB DEFAULT '[]'::jsonb,
  
  -- Display options
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Dynamic URL support (for resources that use user data like optavia_id)
  -- If true, the url field can contain placeholders like {optavia_id}
  is_dynamic BOOLEAN DEFAULT false,
  -- Condition for showing (e.g., 'optavia_id' means only show if user has optavia_id)
  show_condition TEXT,
  
  -- Icon (optional - for future use)
  icon TEXT,
  
  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_external_resources_category ON external_resources(category);
CREATE INDEX IF NOT EXISTS idx_external_resources_sort_order ON external_resources(sort_order);
CREATE INDEX IF NOT EXISTS idx_external_resources_active ON external_resources(is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE external_resources ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can view active resources
CREATE POLICY "Users can view active external resources"
  ON external_resources FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Policy: Admins can view all resources (including inactive)
CREATE POLICY "Admins can view all external resources"
  ON external_resources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  );

-- Policy: Only admins can insert
CREATE POLICY "Admins can create external resources"
  ON external_resources FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  );

-- Policy: Only admins can update
CREATE POLICY "Admins can update external resources"
  ON external_resources FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  );

-- Policy: Only admins can delete
CREATE POLICY "Admins can delete external resources"
  ON external_resources FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_external_resources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS external_resources_updated_at ON external_resources;
CREATE TRIGGER external_resources_updated_at
  BEFORE UPDATE ON external_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_external_resources_updated_at();

-- Seed initial data from current hardcoded resources
INSERT INTO external_resources (id, title, description, url, button_text, category, features, sort_order, is_active, is_dynamic, show_condition) VALUES
  (
    'a1b2c3d4-0001-4000-8000-000000000001',
    'Optavia Strong Facebook Group',
    'Join our community of coaches within OPTAVIA. Connect, share experiences, and support each other in building successful coaching businesses.',
    'https://www.facebook.com/groups/810104670912639',
    'Go to Facebook Group',
    'Community',
    '["Connect with fellow coaches", "Share best practices and tips", "Get support and encouragement", "Stay updated on community events", "Build your coaching network"]'::jsonb,
    1, true, false, NULL
  ),
  (
    'a1b2c3d4-0002-4000-8000-000000000002',
    'Healthy Edge 3.0 Team Page',
    'Welcome to Healthy Edge 3.0! Where legacy meets fresh momentum, and a brand-new chapter begins.',
    'https://www.facebook.com/groups/2156291101444241',
    'Join Team Page',
    'Community',
    '["Team updates and announcements", "Fresh momentum and new beginnings", "Connect with Healthy Edge team members", "Legacy community support", "Exclusive team resources"]'::jsonb,
    2, true, false, NULL
  ),
  (
    'a1b2c3d4-0003-4000-8000-000000000003',
    'Healthy Edge 3.0 Client Page',
    'Welcome to Healthy Edge 3.0 — our new, energized, and improved client community page!',
    'https://www.facebook.com/groups/778947831962215',
    'Join Client Page',
    'Community',
    '["Client community and support", "Share success stories and wins", "Energized and improved community", "Connect with fellow clients", "Inspiration and motivation"]'::jsonb,
    3, true, false, NULL
  ),
  (
    'a1b2c3d4-0004-4000-8000-000000000004',
    'OPTAVIA Connect',
    'Access your OPTAVIA Connect portal to manage your business, track your progress, and access exclusive resources for coaches.',
    'https://optaviaconnect.com/login',
    'Go to OPTAVIA Connect',
    'OPTAVIA Resources',
    '["Business performance tracking and analytics", "Client management tools and resources", "Training materials and certifications", "Marketing resources and support", "Commission and earnings information"]'::jsonb,
    10, true, false, NULL
  ),
  (
    'a1b2c3d4-0005-4000-8000-000000000005',
    'OPTAVIA Profile',
    'View your OPTAVIA coach profile page to showcase your coaching business and connect with potential clients.',
    'https://www.optavia.com/us/en/coach/{optavia_id}',
    'View My OPTAVIA Profile',
    'OPTAVIA Resources',
    '["Public coach profile page", "Share your coaching journey and story", "Connect with potential clients", "Build your coaching network", "Showcase your achievements and success"]'::jsonb,
    11, true, true, 'optavia_id'
  ),
  (
    'a1b2c3d4-0006-4000-8000-000000000006',
    'OPTAVIA Blog',
    'Discover helpful articles, tips, and insights to support your coaching journey and help your clients live their Lean & Green Life™.',
    'https://www.optaviablog.com',
    'Visit OPTAVIA Blog',
    'OPTAVIA Resources',
    '["Lean & Green meal recipes and tips", "Weight loss strategies and motivation", "Metabolic health insights", "Healthy lifestyle tips and habits", "Success stories and inspiration"]'::jsonb,
    12, true, false, NULL
  ),
  (
    'a1b2c3d4-0007-4000-8000-000000000007',
    'Habits of Health',
    'Access Dr. A''s Habits of Health system including daily tips, health assessments, the LifeBook, and transformational resources for whole-body wellness.',
    'https://www.habitsofhealth.com/',
    'Visit Habits of Health',
    'Habits of Health',
    '["Take the health assessment", "Download the LifeBook preview", "Daily tips and motivation from Dr. A", "Join the global Habits of Health community", "30-day email health challenge", "Blog articles on creating lasting habits"]'::jsonb,
    20, true, false, NULL
  ),
  (
    'a1b2c3d4-0008-4000-8000-000000000008',
    'OPTAVIA Habits of Health System',
    'The official OPTAVIA Habits of Health Transformational System covering the six habits: Weight Management, Eating & Hydration, Motion, Sleep, Mind, and Surroundings.',
    'https://www.optavia.com/us/en/habits-of-health',
    'Learn the 6 Habits',
    'Habits of Health',
    '["Six Habits of Health framework", "Habit tracking in the OPTAVIA app", "Micro-habits approach for lasting change", "Evidence-based behavior change system", "Holistic wellness beyond just nutrition", "Developed by Dr. Wayne Scott Andersen"]'::jsonb,
    21, true, false, NULL
  ),
  (
    'a1b2c3d4-0009-4000-8000-000000000009',
    'OPTAVIA Facebook',
    'Follow OPTAVIA on Facebook for the latest updates, success stories, and community engagement.',
    'https://www.facebook.com/optavia',
    'Go to Facebook Page',
    'Social Media',
    '["Latest OPTAVIA news and updates", "Success stories and testimonials", "Community engagement and discussions", "Health and wellness tips", "Event announcements and promotions"]'::jsonb,
    30, true, false, NULL
  ),
  (
    'a1b2c3d4-0010-4000-8000-000000000010',
    'OPTAVIA Instagram',
    'Get inspired by OPTAVIA''s Instagram feed featuring healthy recipes, transformation stories, and lifestyle tips.',
    'https://www.instagram.com/optavia',
    'Go to Instagram Page',
    'Social Media',
    '["Visual inspiration and recipes", "Transformation stories and testimonials", "Healthy lifestyle tips and tricks", "Behind-the-scenes content", "Community highlights and features"]'::jsonb,
    31, true, false, NULL
  ),
  (
    'a1b2c3d4-0011-4000-8000-000000000011',
    'OPTAVIA YouTube',
    'Watch OPTAVIA videos including recipes, coaching tips, success stories, and educational content.',
    'https://www.youtube.com/optavia',
    'Visit YouTube Channel',
    'Social Media',
    '["Recipe videos and cooking tutorials", "Coaching tips and strategies", "Success stories and transformations", "Educational health content", "Live events and webinars"]'::jsonb,
    32, true, false, NULL
  )
ON CONFLICT (id) DO NOTHING;
