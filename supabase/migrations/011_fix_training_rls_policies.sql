-- Fix RLS policies for modules and module_resources to use lowercase 'admin'
-- This ensures consistency with the profiles table constraint

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage modules" ON modules;
DROP POLICY IF EXISTS "Admins can manage module_resources" ON module_resources;

-- Recreate with lowercase 'admin' for consistency
CREATE POLICY "Admins can manage modules"
  ON modules FOR ALL
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

CREATE POLICY "Admins can manage module_resources"
  ON module_resources FOR ALL
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
