-- Add last_sign_in_at column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS last_sign_in_at TIMESTAMPTZ;

-- Create a function to update last_sign_in_at when user signs in
CREATE OR REPLACE FUNCTION update_last_sign_in()
RETURNS TRIGGER AS $$
BEGIN
  -- Update profiles.last_sign_in_at when auth.users.last_sign_in_at changes
  UPDATE profiles
  SET last_sign_in_at = NEW.last_sign_in_at
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update last_sign_in_at on auth.users updates
-- Note: This requires access to auth schema, which may need to be run as a superuser
-- Alternative: Update this in the application code when user signs in

-- Add comment
COMMENT ON COLUMN profiles.last_sign_in_at IS 'Tracks when the user last signed in';

