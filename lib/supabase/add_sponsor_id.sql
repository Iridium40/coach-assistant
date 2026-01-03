-- Add sponsor_id column to profiles table
-- This establishes the direct relationship between a coach and their sponsoring coach
-- using profile.id rather than optavia_id

-- Add the sponsor_id column
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS sponsor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_sponsor_id ON public.profiles(sponsor_id);

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.sponsor_id IS 'The profile ID of the sponsoring coach who invited this user';

-- Create a function to get team members for a sponsor
CREATE OR REPLACE FUNCTION get_team_members(sponsor_user_id UUID)
RETURNS TABLE (
  id UUID,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  coach_rank TEXT,
  created_at TIMESTAMPTZ,
  is_new_coach BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.email,
    p.full_name,
    p.avatar_url,
    p.coach_rank,
    p.created_at,
    p.is_new_coach
  FROM profiles p
  WHERE p.sponsor_id = sponsor_user_id
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view for sponsors to see their team
CREATE OR REPLACE VIEW sponsor_team AS
SELECT 
  p.sponsor_id,
  p.id AS coach_id,
  p.email AS coach_email,
  p.full_name AS coach_name,
  p.avatar_url,
  p.coach_rank,
  p.is_new_coach,
  p.created_at AS joined_at
FROM profiles p
WHERE p.sponsor_id IS NOT NULL;

-- Grant access to the view
GRANT SELECT ON sponsor_team TO authenticated;

-- RLS policy: Allow users to see their own sponsor
CREATE POLICY "Users can view their own sponsor"
  ON profiles FOR SELECT
  USING (
    -- Can view own profile
    auth.uid() = id
    -- Can view profile of their sponsor
    OR id = (SELECT sponsor_id FROM profiles WHERE id = auth.uid())
    -- Sponsors can view their team members
    OR sponsor_id = auth.uid()
  );

-- Migrate existing data: Set sponsor_id based on parent_optavia_id where possible
-- This will link coaches to their sponsors based on matching optavia_id
DO $$
BEGIN
  UPDATE profiles p
  SET sponsor_id = sponsor.id
  FROM profiles sponsor
  WHERE p.parent_optavia_id IS NOT NULL
    AND p.parent_optavia_id = sponsor.optavia_id
    AND p.sponsor_id IS NULL;
END $$;

-- Also set sponsor_id from invites table for any already used invites
UPDATE profiles p
SET sponsor_id = i.invited_by
FROM invites i
WHERE i.used_by = p.id
  AND p.sponsor_id IS NULL
  AND i.invited_by IS NOT NULL;
