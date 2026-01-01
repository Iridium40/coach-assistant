-- Migration: Coaching Amplifier Academy
-- Add 6 academy modules for advanced coach training with rank-based access control

-- Add required_rank column to modules table if it doesn't exist
ALTER TABLE modules
ADD COLUMN IF NOT EXISTS required_rank TEXT;

-- Update category check constraint to include "Academy Course"
ALTER TABLE modules DROP CONSTRAINT IF EXISTS modules_category_check;
ALTER TABLE modules
ADD CONSTRAINT modules_category_check 
CHECK (category IN ('Getting Started', 'Client Support', 'Business Building', 'Training', 'Academy Course'));

-- Insert 6 academy modules with sort_order starting at 100 and required_rank
INSERT INTO modules (id, title, description, category, sort_order, for_new_coach, icon, required_rank) VALUES
  (
    'academy-module-1',
    'New Coach Foundations',
    'Master the fundamentals of OPTAVIA coaching. Learn the apprenticeship model, complete your first 30 days, and earn your Client Acquisition Bonus.',
    'Academy Course',
    100,
    false,
    '🎓',
    NULL
  ),
  (
    'academy-module-2',
    'Building Your Business',
    'Develop consistent client flow, master the Monthly Action Plan, accumulate Qualifying Points, and build toward Executive Director.',
    'Academy Course',
    101,
    false,
    '💼',
    'SC'
  ),
  (
    'academy-module-3',
    'Leadership Development',
    'Achieve FIBC status, develop your first Executive Director, and step into regional leadership. This is where duplication begins.',
    'Academy Course',
    102,
    false,
    '👥',
    'ED'
  ),
  (
    'academy-module-4',
    'National Expansion',
    'Build multiple Executive Director teams, unlock Elite Leadership Bonuses, and create systems that scale across your organization.',
    'Academy Course',
    103,
    false,
    '🌍',
    'IRD'
  ),
  (
    'academy-module-5',
    'Executive Leadership',
    'Step into company-wide influence. Master multi-generation team building and unlock all three Elite Leadership Bonus tiers.',
    'Academy Course',
    104,
    false,
    '👑',
    'IGD'
  ),
  (
    'academy-module-6',
    'Legacy Building',
    'Achieve the highest rank in OPTAVIA. Build 10 Executive Director teams (5 FIBC) and create a legacy that transforms thousands of lives.',
    'Academy Course',
    105,
    false,
    '✨',
    'Presidential'
  )
ON CONFLICT (id) DO UPDATE
SET required_rank = EXCLUDED.required_rank,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    sort_order = EXCLUDED.sort_order,
    for_new_coach = EXCLUDED.for_new_coach,
    icon = EXCLUDED.icon;

-- Insert resources for each module
INSERT INTO module_resources (id, module_id, title, resource_type, url, sort_order) VALUES
  (
    'academy-resource-1',
    'academy-module-1',
    'New Coach Foundations Guide',
    'doc',
    '/academy/module-1',
    1
  ),
  (
    'academy-resource-2',
    'academy-module-2',
    'Building Your Business Guide',
    'doc',
    '/academy/module-2',
    1
  ),
  (
    'academy-resource-3',
    'academy-module-3',
    'Leadership Development Guide',
    'doc',
    '/academy/module-3',
    1
  ),
  (
    'academy-resource-4',
    'academy-module-4',
    'National Expansion Guide',
    'doc',
    '/academy/module-4',
    1
  ),
  (
    'academy-resource-5',
    'academy-module-5',
    'Executive Leadership Guide',
    'doc',
    '/academy/module-5',
    1
  ),
  (
    'academy-resource-6',
    'academy-module-6',
    'Legacy Building Guide',
    'doc',
    '/academy/module-6',
    1
  )
ON CONFLICT (id) DO NOTHING;
