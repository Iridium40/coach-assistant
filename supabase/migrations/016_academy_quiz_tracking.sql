-- Create quiz_attempts table to track academy module quiz attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  score DECIMAL(5, 2) NOT NULL, -- Score as percentage (0-100)
  passed BOOLEAN NOT NULL DEFAULT false, -- Passed with 80% or higher
  answers JSONB NOT NULL, -- Store user's answers: {"question_1": "A", "question_2": "B", ...}
  correct_answers JSONB NOT NULL, -- Store correct answers for reference
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id) -- One completion per module per user
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_module_id ON quiz_attempts(module_id);

-- Enable RLS
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own quiz attempts
CREATE POLICY "Users can view their own quiz attempts"
  ON quiz_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own quiz attempts
CREATE POLICY "Users can insert their own quiz attempts"
  ON quiz_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own quiz attempts (in case they retake)
CREATE POLICY "Users can update their own quiz attempts"
  ON quiz_attempts
  FOR UPDATE
  USING (auth.uid() = user_id);
