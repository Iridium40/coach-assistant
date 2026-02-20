-- Add max_uses and expires_at columns to signup_access_codes
-- Run this against your production Supabase database

ALTER TABLE public.signup_access_codes
  ADD COLUMN IF NOT EXISTS max_uses INTEGER,
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
