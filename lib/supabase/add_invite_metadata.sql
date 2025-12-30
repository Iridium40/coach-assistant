-- Add columns to invites table to store invite metadata
ALTER TABLE invites 
ADD COLUMN IF NOT EXISTS invited_full_name TEXT,
ADD COLUMN IF NOT EXISTS coach_rank TEXT CHECK (coach_rank IN ('Coach', 'SC', 'MG', 'AD', 'DR', 'ED', 'IED', 'FIBC', 'IGD', 'FIBL', 'IND', 'IPD'));

-- Add comments
COMMENT ON COLUMN invites.invited_full_name IS 'Full name of the invited user';
COMMENT ON COLUMN invites.coach_rank IS 'Coach rank assigned to the invited user';

