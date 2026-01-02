-- Add Health Assessment Mastery module to Client Support category
-- Requires Senior Coach+ rank (SC)

INSERT INTO modules (id, title, description, category, sort_order, for_new_coach, icon, required_rank) VALUES
  (
    'health-assessment-mastery',
    'Health Assessment Mastery',
    'Master the art of conducting Health Assessment calls that convert prospects into clients — with empathy, structure, and confidence.',
    'Client Support',
    8, -- After existing Client Support modules
    false,
    '📞',
    'SC'
  )
ON CONFLICT (id) DO UPDATE
SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  sort_order = EXCLUDED.sort_order,
  for_new_coach = EXCLUDED.for_new_coach,
  icon = EXCLUDED.icon,
  required_rank = EXCLUDED.required_rank;

-- Add resource for the module
INSERT INTO module_resources (id, module_id, title, resource_type, url, sort_order) VALUES
  (
    'ha-mastery-1',
    'health-assessment-mastery',
    'Health Assessment Mastery Training',
    'doc',
    '/training/health-assessment-mastery',
    1
  )
ON CONFLICT (id) DO UPDATE
SET 
  title = EXCLUDED.title,
  resource_type = EXCLUDED.resource_type,
  url = EXCLUDED.url,
  sort_order = EXCLUDED.sort_order;
