-- Create signup_access_codes table
-- Access codes that new users must enter during self-registration
CREATE TABLE IF NOT EXISTS public.signup_access_codes (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  label TEXT,
  is_active BOOLEAN DEFAULT true,
  max_uses INTEGER,
  usage_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Index for fast code lookups
CREATE INDEX IF NOT EXISTS idx_signup_access_codes_code ON public.signup_access_codes(code);

-- Auto-update updated_at
CREATE TRIGGER update_signup_access_codes_updated_at
  BEFORE UPDATE ON signup_access_codes
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

COMMENT ON TABLE public.signup_access_codes IS 'Access codes required for self-service sign-up';

-- Enable RLS
ALTER TABLE public.signup_access_codes ENABLE ROW LEVEL SECURITY;

-- Anon users can validate codes (needed during signup before auth)
CREATE POLICY "Anon can validate active access codes"
  ON public.signup_access_codes FOR SELECT
  TO anon
  USING (is_active = true);

-- Authenticated users can read codes (for admin UI)
CREATE POLICY "Authenticated users can read access codes"
  ON public.signup_access_codes FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can insert
CREATE POLICY "Admins can create access codes"
  ON public.signup_access_codes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

-- Only admins can update
CREATE POLICY "Admins can update access codes"
  ON public.signup_access_codes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

-- Only admins can delete
CREATE POLICY "Admins can delete access codes"
  ON public.signup_access_codes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

-- Allow anon to increment usage_count during signup
CREATE POLICY "Anon can increment usage on active codes"
  ON public.signup_access_codes FOR UPDATE
  TO anon
  USING (is_active = true)
  WITH CHECK (is_active = true);

-- Seed default access code
INSERT INTO public.signup_access_codes (code, label, is_active)
VALUES ('OPTAVIA', 'Default signup code', true)
ON CONFLICT (code) DO NOTHING;
