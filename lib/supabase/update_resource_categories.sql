-- Update external_resources categories to match new simplified category structure
-- New categories: OPTAVIA Portals, Social Media, Communities, Training

-- Update "Community" to "Communities"
UPDATE external_resources 
SET category = 'Communities', updated_at = NOW()
WHERE category = 'Community';

-- Update "OPTAVIA Resources" to "OPTAVIA Portals"
UPDATE external_resources 
SET category = 'OPTAVIA Portals', updated_at = NOW()
WHERE category = 'OPTAVIA Resources';

-- Update "Habits of Health" to "OPTAVIA Portals"
UPDATE external_resources 
SET category = 'OPTAVIA Portals', updated_at = NOW()
WHERE category = 'Habits of Health';

-- "Social Media" stays the same
-- "Training" stays the same

-- Verify the changes
SELECT category, COUNT(*) as count 
FROM external_resources 
GROUP BY category 
ORDER BY category;
