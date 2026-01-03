-- Training Resource Completions
-- Track which training resources each user has completed

-- Create table to track completions
CREATE TABLE IF NOT EXISTS training_resource_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES training_resources(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure each user can only complete a resource once
  UNIQUE(user_id, resource_id)
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_training_completions_user ON training_resource_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_training_completions_resource ON training_resource_completions(resource_id);

-- Enable RLS
ALTER TABLE training_resource_completions ENABLE ROW LEVEL SECURITY;

-- Users can view their own completions
CREATE POLICY "Users can view own completions"
  ON training_resource_completions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own completions
CREATE POLICY "Users can insert own completions"
  ON training_resource_completions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own completions (to uncomplete)
CREATE POLICY "Users can delete own completions"
  ON training_resource_completions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Admins can view all completions
CREATE POLICY "Admins can view all completions"
  ON training_resource_completions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND user_role = 'admin'
    )
  );

-- Grant permissions
GRANT SELECT, INSERT, DELETE ON training_resource_completions TO authenticated;

-- Function to get user's training progress
CREATE OR REPLACE FUNCTION get_training_progress(p_user_id UUID)
RETURNS TABLE (
  total_resources BIGINT,
  completed_resources BIGINT,
  percentage INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM training_resources WHERE is_active = TRUE) as total_resources,
    (SELECT COUNT(*) FROM training_resource_completions WHERE user_id = p_user_id) as completed_resources,
    CASE 
      WHEN (SELECT COUNT(*) FROM training_resources WHERE is_active = TRUE) = 0 THEN 0
      ELSE ROUND(
        (SELECT COUNT(*) FROM training_resource_completions WHERE user_id = p_user_id)::NUMERIC / 
        (SELECT COUNT(*) FROM training_resources WHERE is_active = TRUE)::NUMERIC * 100
      )::INTEGER
    END as percentage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_training_progress TO authenticated;
