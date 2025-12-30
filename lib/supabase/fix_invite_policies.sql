-- Fix invite RLS policies to be case-insensitive for user_role

-- Drop existing admin policies for invites
DROP POLICY IF EXISTS "Admins can view all invites" ON invites;
DROP POLICY IF EXISTS "Admins can delete any invite" ON invites;

-- Recreate with case-insensitive check
CREATE POLICY "Admins can view all invites"
  ON invites FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  );

CREATE POLICY "Admins can delete any invite"
  ON invites FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  );

-- Also fix the update policy for admins
DROP POLICY IF EXISTS "System can update invites when used" ON invites;

CREATE POLICY "System can update invites when used"
  ON invites FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = used_by 
    OR auth.uid() = invited_by
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND LOWER(profiles.user_role) = 'admin'
    )
  );

