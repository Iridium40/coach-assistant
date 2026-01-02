-- Migration: Health Assessment Onboarding Module
-- Add health assessment training module to new coach onboarding path
-- This should be the 4th module in the onboarding sequence

-- Insert the health assessment onboarding module
-- Using sort_order 0 to place it after acronyms-guide (-1) but before other modules (1+)
INSERT INTO modules (id, title, description, category, sort_order, for_new_coach, icon) VALUES
  (
    'health-assessment-onboarding',
    'How to Conduct a Health Assessment',
    'Learn the fundamentals of conducting effective Health Assessment calls that connect with prospects and help them discover if OPTAVIA is right for them.',
    'Getting Started',
    0,
    true,
    '📞'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  for_new_coach = EXCLUDED.for_new_coach,
  icon = EXCLUDED.icon;

-- Insert resource for the health assessment onboarding module
INSERT INTO module_resources (id, module_id, title, resource_type, url, sort_order) VALUES
  (
    'health-assessment-onboarding-content',
    'health-assessment-onboarding',
    'Health Assessment Guide',
    'doc',
    '/onboarding/health-assessment',
    1
  )
ON CONFLICT (id) DO NOTHING;
