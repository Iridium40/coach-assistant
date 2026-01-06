-- Add user's personal Zoom room details to profiles table
-- This allows coaches to save their Zoom room info for easy sharing

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS zoom_link TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS zoom_meeting_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS zoom_passcode TEXT;

-- Add comments explaining the columns
COMMENT ON COLUMN profiles.zoom_link IS 'User''s personal Zoom room link';
COMMENT ON COLUMN profiles.zoom_meeting_id IS 'User''s personal Zoom meeting ID';
COMMENT ON COLUMN profiles.zoom_passcode IS 'User''s personal Zoom room passcode';
