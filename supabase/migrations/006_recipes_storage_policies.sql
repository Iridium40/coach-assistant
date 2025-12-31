-- Storage Bucket Policies for recipes
-- These policies allow admins to upload, read, and manage recipe images

-- Policy 1: Allow authenticated users to read recipe images (public access)
CREATE POLICY "Public can read recipe images"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'recipes'::text
);

-- Policy 2: Allow admins to upload recipe images
CREATE POLICY "Admins can upload recipe images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'recipes'::text
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_role = 'admin'
  )
);

-- Policy 3: Allow admins to update recipe images
CREATE POLICY "Admins can update recipe images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'recipes'::text
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_role = 'admin'
  )
)
WITH CHECK (
  bucket_id = 'recipes'::text
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_role = 'admin'
  )
);

-- Policy 4: Allow admins to delete recipe images
CREATE POLICY "Admins can delete recipe images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'recipes'::text
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_role = 'admin'
  )
);

