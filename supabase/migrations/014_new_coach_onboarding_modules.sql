-- Migration: New Coach Onboarding Modules
-- Add 3 onboarding modules for new coaches (Welcome, Business Resources, Acronyms Guide)
-- These modules should appear first for new coaches and guide them through initial training

-- Insert 3 new onboarding modules
-- Using sort_order -3, -2, -1 to ensure they appear first (before existing modules which start at 1)
INSERT INTO modules (id, title, description, category, sort_order, for_new_coach, icon) VALUES
  (
    'new-coach-welcome',
    'New Coach Welcome',
    'Start your coaching journey! Learn about the apprenticeship model, your first 30 days, and how to connect with your mentorship team.',
    'Getting Started',
    -3,
    true,
    '🎉'
  ),
  (
    'business-resources',
    'Business Resources',
    'Power Hour calls, MAP templates, financial setup guidance, branding basics, and everything you need to run your business like a pro.',
    'Getting Started',
    -2,
    true,
    '💼'
  ),
  (
    'acronyms-guide',
    'Acronyms Guide',
    'FQV? PV? GQV? CAB? Master the language of OPTAVIA coaching with our complete glossary of terminology.',
    'Getting Started',
    -1,
    true,
    '📖'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert resources for each module
-- Using special URL format that will be handled by our viewer component
INSERT INTO module_resources (id, module_id, title, resource_type, url, sort_order) VALUES
  (
    'welcome-content',
    'new-coach-welcome',
    'Welcome Guide',
    'doc',
    '/onboarding/welcome',
    1
  ),
  (
    'business-content',
    'business-resources',
    'Business Guide',
    'doc',
    '/onboarding/business',
    1
  ),
  (
    'acronyms-content',
    'acronyms-guide',
    'Acronyms Glossary',
    'doc',
    '/onboarding/acronyms',
    1
  )
ON CONFLICT (id) DO NOTHING;
