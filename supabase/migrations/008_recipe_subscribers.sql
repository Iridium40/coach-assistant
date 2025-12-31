-- ============================================
-- SCHEMA: Recipe Notification Subscribers
-- For clients who want to be notified of new recipes
-- ============================================

-- Create recipe_subscribers table
CREATE TABLE IF NOT EXISTS recipe_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_recipe_subscribers_email ON recipe_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_recipe_subscribers_subscribed ON recipe_subscribers(subscribed) WHERE subscribed = true;

-- Enable RLS
ALTER TABLE recipe_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (sign up)
CREATE POLICY "Anyone can subscribe to recipe notifications"
  ON recipe_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow updating own subscription (by email match - for unsubscribe)
CREATE POLICY "Anyone can update subscription status"
  ON recipe_subscribers FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Admins can view all subscribers
CREATE POLICY "Admins can view all subscribers"
  ON recipe_subscribers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

-- Policy: Admins can delete subscribers
CREATE POLICY "Admins can delete subscribers"
  ON recipe_subscribers FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_recipe_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS recipe_subscribers_updated_at ON recipe_subscribers;
CREATE TRIGGER recipe_subscribers_updated_at
  BEFORE UPDATE ON recipe_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_recipe_subscribers_updated_at();

