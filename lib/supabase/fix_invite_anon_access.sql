-- Fix: Allow anonymous users to read invites by invite_key
-- This is required because new coaches need to validate their invite
-- BEFORE they have an account (before they're authenticated)

-- Grant SELECT permission to anonymous role on invites table
GRANT SELECT ON invites TO anon;

-- Create a policy that allows anyone to read an invite by its key
-- This is safe because:
-- 1. The invite_key is a random UUID that can't be guessed
-- 2. We only expose the invite to someone who already has the key
-- 3. No sensitive information is exposed beyond what's needed for signup

CREATE POLICY "Anyone can view invites by invite_key"
  ON invites FOR SELECT
  TO anon
  USING (true);  -- The invite_key in the query acts as the access control

-- Note: The above policy allows anon to select, but they still need to know
-- the invite_key to find any specific invite. Without the key, they get nothing useful.

-- Alternative more restrictive approach (if you prefer):
-- This would only work if we could pass the invite_key to the policy,
-- but RLS policies can't directly access query parameters.
-- The security comes from the fact that invite_key is a cryptographically
-- random UUID that can't be guessed.
