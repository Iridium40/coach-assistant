-- Add phone_number column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Add a comment describing the column
COMMENT ON COLUMN profiles.phone_number IS 'User phone number for contact purposes';

