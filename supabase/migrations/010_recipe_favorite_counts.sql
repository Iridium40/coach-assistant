-- Migration: Add favorite counts to recipes for popularity tracking
-- This enables showing popular recipes on the dashboard

-- Add favorite_count column to recipes table
ALTER TABLE recipes ADD COLUMN IF NOT EXISTS favorite_count INTEGER NOT NULL DEFAULT 0;

-- Create index for sorting by popularity
CREATE INDEX IF NOT EXISTS idx_recipes_favorite_count ON recipes(favorite_count DESC);

-- Function to update favorite count when favorites change
CREATE OR REPLACE FUNCTION update_recipe_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE recipes 
    SET favorite_count = favorite_count + 1 
    WHERE id = NEW.recipe_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE recipes 
    SET favorite_count = GREATEST(0, favorite_count - 1) 
    WHERE id = OLD.recipe_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers on favorite_recipes table
DROP TRIGGER IF EXISTS trigger_favorite_recipe_insert ON favorite_recipes;
CREATE TRIGGER trigger_favorite_recipe_insert
  AFTER INSERT ON favorite_recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_recipe_favorite_count();

DROP TRIGGER IF EXISTS trigger_favorite_recipe_delete ON favorite_recipes;
CREATE TRIGGER trigger_favorite_recipe_delete
  AFTER DELETE ON favorite_recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_recipe_favorite_count();

-- Initialize favorite_count for existing recipes based on current favorites
UPDATE recipes r
SET favorite_count = (
  SELECT COUNT(*) 
  FROM favorite_recipes fr 
  WHERE fr.recipe_id = r.id
);
