-- Update coach_rank CHECK constraint to include all OPTAVIA coach ranks

DO $$ 
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_coach_rank_check'
    ) THEN
        ALTER TABLE public.profiles DROP CONSTRAINT profiles_coach_rank_check;
    END IF;
    
    -- Add new constraint with all OPTAVIA coach ranks
    ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_coach_rank_check CHECK (
        coach_rank IN (
            'Coach',      -- Entry-level
            'SC',         -- Senior Coach
            'MG',         -- Manager
            'AD',         -- Associate Director
            'DR',         -- Director
            'ED',         -- Executive Director
            'IED',        -- Integrated Executive Director
            'FIBC',       -- Fully Integrated Business Coach
            'IGD',        -- Integrated Global Director
            'FIBL',       -- Fully Integrated Business Leader
            'IND',        -- Integrated National Director
            'IPD'         -- Integrated Presidential Director
        )
    );
END $$;

-- Update comment for documentation
COMMENT ON COLUMN public.profiles.coach_rank IS 'OPTAVIA Coach Rank: Coach, SC, MG, AD, DR, ED, IED, FIBC, IGD, FIBL, IND, or IPD';

