-- Add is_bulk_invite flag to invites table
-- Bulk invites should NOT set sponsor_id when used

ALTER TABLE invites 
ADD COLUMN IF NOT EXISTS is_bulk_invite BOOLEAN DEFAULT false;

-- Add comment for documentation
COMMENT ON COLUMN invites.is_bulk_invite IS 'If true, this invite was created via bulk import and should not set sponsor_id';
