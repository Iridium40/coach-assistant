-- Add scheduling and phone columns to clients and prospects tables
-- Run this in your Supabase SQL Editor

-- ============================================
-- CLIENTS TABLE: Add next_scheduled_at and phone columns
-- ============================================
DO $$ 
BEGIN
  -- Add next_scheduled_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'clients' 
    AND column_name = 'next_scheduled_at'
  ) THEN
    ALTER TABLE public.clients 
    ADD COLUMN next_scheduled_at TIMESTAMP WITH TIME ZONE NULL;
    
    CREATE INDEX IF NOT EXISTS idx_clients_next_scheduled_at 
    ON public.clients (next_scheduled_at) 
    WHERE next_scheduled_at IS NOT NULL;
    
    RAISE NOTICE 'Column next_scheduled_at added to clients table';
  ELSE
    RAISE NOTICE 'Column next_scheduled_at already exists in clients table';
  END IF;
  
  -- Add phone column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'clients' 
    AND column_name = 'phone'
  ) THEN
    ALTER TABLE public.clients 
    ADD COLUMN phone TEXT NULL;
    
    RAISE NOTICE 'Column phone added to clients table';
  ELSE
    RAISE NOTICE 'Column phone already exists in clients table';
  END IF;
END $$;

COMMENT ON COLUMN public.clients.next_scheduled_at IS 'Next scheduled check-in date/time for the client';
COMMENT ON COLUMN public.clients.phone IS 'Client phone number for SMS reminders';

-- ============================================
-- PROSPECTS TABLE: Add ha_scheduled_at and phone columns
-- ============================================
DO $$ 
BEGIN
  -- Add ha_scheduled_at column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'prospects' 
    AND column_name = 'ha_scheduled_at'
  ) THEN
    ALTER TABLE public.prospects 
    ADD COLUMN ha_scheduled_at TIMESTAMP WITH TIME ZONE NULL;
    
    CREATE INDEX IF NOT EXISTS idx_prospects_ha_scheduled_at 
    ON public.prospects (ha_scheduled_at) 
    WHERE ha_scheduled_at IS NOT NULL;
    
    RAISE NOTICE 'Column ha_scheduled_at added to prospects table';
  ELSE
    RAISE NOTICE 'Column ha_scheduled_at already exists in prospects table';
  END IF;
  
  -- Add phone column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'prospects' 
    AND column_name = 'phone'
  ) THEN
    ALTER TABLE public.prospects 
    ADD COLUMN phone TEXT NULL;
    
    RAISE NOTICE 'Column phone added to prospects table';
  ELSE
    RAISE NOTICE 'Column phone already exists in prospects table';
  END IF;
END $$;

COMMENT ON COLUMN public.prospects.ha_scheduled_at IS 'Scheduled date/time for Health Assessment call';
COMMENT ON COLUMN public.prospects.phone IS 'Prospect phone number for SMS reminders';
