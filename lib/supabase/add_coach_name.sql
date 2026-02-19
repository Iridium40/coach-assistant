-- Add coach_name column to profiles table
-- Free-form text field for users to indicate who their coach is during sign-up
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS coach_name TEXT;

COMMENT ON COLUMN public.profiles.coach_name IS 'Free-form text: the name of the coach who referred or supports this user';

-- Update the handle_new_user function to also extract coach_name from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, coach_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'coach_name'
  );

  INSERT INTO public.notification_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
