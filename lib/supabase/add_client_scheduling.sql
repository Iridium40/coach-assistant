-- Add scheduling columns to clients and prospects tables
-- Run this in your Supabase SQL Editor

-- ============================================
-- CLIENTS TABLE: Add next_scheduled_at column
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'clients' 
    AND column_name = 'next_scheduled_at'
  ) THEN
    ALTER TABLE public.clients 
    ADD COLUMN next_scheduled_at TIMESTAMP WITH TIME ZONE NULL;
    -- Add next_scheduled_at column to clients table for tracking scheduled check-ins
-- Run this in your Supabase SQL Editor

-- Add the column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'clients' 
    AND column_name = 'next_scheduled_at'
  ) THEN
    ALTER TABLE public.clients 
    ADD COLUMN next_scheduled_at TIMESTAMP WITH TIME ZONE NULL;
    
    -- Add an index for efficient queries on scheduled meetings
    CREATE INDEX IF NOT EXISTS idx_clients_next_scheduled_at 
    ON public.clients (next_scheduled_at) 
    WHERE next_scheduled_at IS NOT NULL;
    
    RAISE NOTICE 'Column next_scheduled_at added to clients table';
  ELSE
    RAISE NOTICE 'Column next_scheduled_at already exists';
  END IF;
END $$;

-- Optional: Add a comment to the column
COMMENT ON COLUMN public.clients.next_scheduled_at IS 'Next scheduled check-in date/time for the client';

    -- Add an index for efficient queries on scheduled meetings
    CREATE INDEX IF NOT EXISTS idx_clients_next_scheduled_at 
    ON public.clients (next_scheduled_at) 
    WHERE next_scheduled_at IS NOT NULL;
    
    RAISE NOTICE 'Column next_scheduled_at added to clients table';
  ELSE
    RAISE NOTICE 'Column next_scheduled_at already exists in clients table';
  END IF;
END $$;

COMMENT ON COLUMN public.clients.next_scheduled_at IS 'Next scheduled check-in date/time for the client';

-- ============================================
-- PROSPECTS TABLE: Add ha_scheduled_at column
-- ============================================
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'prospects' 
    AND column_name = 'ha_scheduled_at'
  ) THEN
    ALTER TABLE public.prospects 
    ADD COLUMN ha_scheduled_at TIMESTAMP WITH TIME ZONE NULL;
    
    -- Add an index for efficient queries on scheduled HAs
    CREATE INDEX IF NOT EXISTS idx_prospects_ha_scheduled_at 
    ON public.prospects (ha_scheduled_at) 
    WHERE ha_scheduled_at IS NOT NULL;
    
    RAISE NOTICE 'Column ha_scheduled_at added to prospects table';
  ELSE
    RAISE NOTICE 'Column ha_scheduled_at already exists in prospects table';
  END IF;
END $$;

COMMENT ON COLUMN public.prospects.ha_scheduled_at IS 'Scheduled date/time for Health Assessment call';
