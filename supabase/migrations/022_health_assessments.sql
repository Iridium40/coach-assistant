-- Create health_assessments table (metadata only - no sensitive health data stored)
CREATE TABLE IF NOT EXISTS health_assessments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  coach_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  coach_email TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_first_name TEXT,
  client_last_name TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  email_sent_at TIMESTAMPTZ,
  email_sent_successfully BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_health_assessments_coach_id ON health_assessments(coach_id);
CREATE INDEX IF NOT EXISTS idx_health_assessments_coach_email ON health_assessments(coach_email);
CREATE INDEX IF NOT EXISTS idx_health_assessments_submitted_at ON health_assessments(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_health_assessments_read_at ON health_assessments(read_at);

-- Enable Row Level Security
ALTER TABLE health_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for health_assessments
-- Coaches can view their own assessments
CREATE POLICY "Coaches can view their own assessments"
  ON health_assessments FOR SELECT
  USING (auth.uid() = coach_id);

-- Coaches can update their own assessments (e.g., mark as read)
CREATE POLICY "Coaches can update their own assessments"
  ON health_assessments FOR UPDATE
  USING (auth.uid() = coach_id);

-- Public can insert assessments (for form submissions)
CREATE POLICY "Public can insert health assessments"
  ON health_assessments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can view all assessments
CREATE POLICY "Admins can view all assessments"
  ON health_assessments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

-- Add comment for documentation
COMMENT ON TABLE health_assessments IS 'Health assessment metadata only - sensitive data is emailed, not stored';
COMMENT ON COLUMN health_assessments.client_email IS 'Email of the client who submitted the assessment';
COMMENT ON COLUMN health_assessments.email_sent_successfully IS 'Whether the assessment email was successfully sent to the coach';
