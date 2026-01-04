-- Create health_assessment_submissions table
-- This stores minimal metadata when a prospect submits a health assessment form
-- The actual assessment data is emailed to the coach, not stored in the database

CREATE TABLE IF NOT EXISTS health_assessment_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coach_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name TEXT,
  client_email TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  email_sent_at TIMESTAMPTZ,
  email_sent_successfully BOOLEAN DEFAULT false
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ha_submissions_coach_id ON health_assessment_submissions(coach_id);
CREATE INDEX IF NOT EXISTS idx_ha_submissions_submitted_at ON health_assessment_submissions(submitted_at DESC);

-- Enable RLS
ALTER TABLE health_assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (including anonymous) to insert submissions
-- This is required because prospects fill out the form without logging in
CREATE POLICY "Anyone can submit health assessments"
  ON health_assessment_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Coaches can view submissions sent to them
CREATE POLICY "Coaches can view their submissions"
  ON health_assessment_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = coach_id);

-- Coaches can delete their submissions
CREATE POLICY "Coaches can delete their submissions"
  ON health_assessment_submissions FOR DELETE
  TO authenticated
  USING (auth.uid() = coach_id);

-- Grant permissions
GRANT INSERT ON health_assessment_submissions TO anon;
GRANT SELECT, DELETE ON health_assessment_submissions TO authenticated;

-- Also ensure anon can read profiles to look up coach by email
-- (needed during form submission to get coach_id from email)
DROP POLICY IF EXISTS "Anyone can lookup coach by email" ON profiles;
CREATE POLICY "Anyone can lookup coach by email"
  ON profiles FOR SELECT
  TO anon
  USING (true);

GRANT SELECT ON profiles TO anon;
