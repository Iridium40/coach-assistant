-- =====================================================
-- Coach Resource Library Tables
-- New table structure for searchable, categorized training resources
-- =====================================================

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS resource_library_resource_tags CASCADE;
DROP TABLE IF EXISTS resource_library_resources CASCADE;
DROP TABLE IF EXISTS resource_library_tags CASCADE;
DROP TABLE IF EXISTS resource_library_categories CASCADE;

-- =====================================================
-- 1. RESOURCE CATEGORIES TABLE
-- =====================================================
CREATE TABLE resource_library_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE resource_library_categories IS 'Categories for organizing training resources (e.g., Getting Started, Business Setup, Social Media)';
COMMENT ON COLUMN resource_library_categories.id IS 'Unique identifier (e.g., "getting-started", "business-setup")';
COMMENT ON COLUMN resource_library_categories.icon IS 'Lucide icon name (e.g., "rocket", "briefcase")';
COMMENT ON COLUMN resource_library_categories.color IS 'Hex color code for category badge';

-- =====================================================
-- 2. RESOURCE TAGS TABLE
-- =====================================================
CREATE TABLE resource_library_tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('format', 'level', 'content', 'audience', 'rank')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE resource_library_tags IS 'Tags for filtering and searching resources';
COMMENT ON COLUMN resource_library_tags.type IS 'Tag type: format (video/doc), level (beginner/advanced), content (scripts/checklist), audience (client-facing/coach-only), rank (new-coach/senior-coach)';

-- =====================================================
-- 3. RESOURCES TABLE
-- =====================================================
CREATE TABLE resource_library_resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('doc', 'video', 'pdf', 'link', 'canva', 'form')),
  url TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES resource_library_categories(id) ON DELETE CASCADE,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE resource_library_resources IS 'Searchable library of training resources with categorization and tagging';
COMMENT ON COLUMN resource_library_resources.type IS 'Resource type: doc (Google Docs), video (Vimeo/YouTube), pdf, link (external), canva, form (JotForm)';
COMMENT ON COLUMN resource_library_resources.featured IS 'Whether this resource should be highlighted/featured';

-- =====================================================
-- 4. RESOURCE-TAG JUNCTION TABLE
-- =====================================================
CREATE TABLE resource_library_resource_tags (
  resource_id TEXT NOT NULL REFERENCES resource_library_resources(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES resource_library_tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (resource_id, tag_id)
);

COMMENT ON TABLE resource_library_resource_tags IS 'Many-to-many relationship between resources and tags';

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_resources_category ON resource_library_resources(category_id);
CREATE INDEX idx_resources_featured ON resource_library_resources(featured) WHERE featured = true;
CREATE INDEX idx_resources_type ON resource_library_resources(type);
CREATE INDEX idx_resources_active ON resource_library_resources(is_active) WHERE is_active = true;
CREATE INDEX idx_resource_tags_resource ON resource_library_resource_tags(resource_id);
CREATE INDEX idx_resource_tags_tag ON resource_library_resource_tags(tag_id);
CREATE INDEX idx_tags_type ON resource_library_tags(type);

-- =====================================================
-- RLS (ROW LEVEL SECURITY) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE resource_library_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_library_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_library_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_library_resource_tags ENABLE ROW LEVEL SECURITY;

-- Categories: Public read access
CREATE POLICY "Anyone can view active categories"
  ON resource_library_categories FOR SELECT
  USING (is_active = true);

-- Tags: Public read access
CREATE POLICY "Anyone can view active tags"
  ON resource_library_tags FOR SELECT
  USING (is_active = true);

-- Resources: Public read access
CREATE POLICY "Anyone can view active resources"
  ON resource_library_resources FOR SELECT
  USING (is_active = true);

-- Resource Tags: Public read access
CREATE POLICY "Anyone can view resource tags"
  ON resource_library_resource_tags FOR SELECT
  USING (true);

-- Admin write access (users with admin role)
CREATE POLICY "Admins can manage categories"
  ON resource_library_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

CREATE POLICY "Admins can manage tags"
  ON resource_library_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

CREATE POLICY "Admins can manage resources"
  ON resource_library_resources FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

CREATE POLICY "Admins can manage resource tags"
  ON resource_library_resource_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_role = 'admin'
    )
  );

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_resource_library_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON resource_library_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_resource_library_updated_at();

CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON resource_library_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_resource_library_updated_at();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resource_library_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_resource_library_updated_at();
