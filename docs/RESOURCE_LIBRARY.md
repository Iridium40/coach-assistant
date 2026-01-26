# Coach Resource Library

## Overview

The Coach Resource Library is a searchable, categorized collection of 89 training resources organized into 15 categories with a comprehensive tagging system for targeted searches.

## Database Structure

### Tables

#### 1. `resource_library_categories`
Organizes resources into logical categories.

**Columns:**
- `id` (TEXT, PK): Unique identifier (e.g., "getting-started")
- `name` (TEXT): Display name (e.g., "Getting Started")
- `description` (TEXT): Category description
- `icon` (TEXT): Lucide icon name
- `color` (TEXT): Hex color code for UI
- `sort_order` (INTEGER): Display order
- `is_active` (BOOLEAN): Active status
- `created_at`, `updated_at` (TIMESTAMPTZ)

**15 Categories:**
1. Getting Started
2. Business Setup & Branding
3. Social Media & Content
4. Prospecting & Conversations
5. Health Assessment & Closing
6. Client Onboarding
7. Daily Client Coaching
8. Client Troubleshooting
9. Nutrition & Meal Guides
10. Metabolic Health Education
11. Sponsoring & Team Building
12. OPTAVIA Connect & Numbers
13. Leadership & Team Development
14. Rank Advancement Trackers
15. Business & Finance

#### 2. `resource_library_tags`
Tags for filtering and searching resources.

**Columns:**
- `id` (TEXT, PK): Unique identifier
- `name` (TEXT): Display name
- `type` (TEXT): Tag type (format, level, content, audience, rank)
- `sort_order` (INTEGER): Display order
- `is_active` (BOOLEAN): Active status
- `created_at`, `updated_at` (TIMESTAMPTZ)

**Tag Types:**
- **Format**: video, document, pdf, form, canva, link
- **Level**: beginner, intermediate, advanced
- **Content**: scripts, copy-paste, training-call, quick-reference, checklist, tracker
- **Audience**: client-facing, coach-only
- **Rank**: new-coach, senior-coach, manager, director, executive, top-rank

#### 3. `resource_library_resources`
The main resources table.

**Columns:**
- `id` (TEXT, PK): Unique identifier (e.g., "res-001")
- `title` (TEXT): Resource title
- `description` (TEXT): Detailed description
- `type` (TEXT): Resource type (doc, video, pdf, link, canva, form)
- `url` (TEXT): Resource URL
- `category_id` (TEXT, FK): References categories
- `featured` (BOOLEAN): Featured resource flag
- `sort_order` (INTEGER): Display order
- `is_active` (BOOLEAN): Active status
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### 4. `resource_library_resource_tags`
Many-to-many junction table linking resources to tags.

**Columns:**
- `resource_id` (TEXT, FK): References resources
- `tag_id` (TEXT, FK): References tags
- `created_at` (TIMESTAMPTZ)

## Usage Examples

### Query Resources by Category

\`\`\`sql
SELECT r.* 
FROM resource_library_resources r
WHERE r.category_id = 'getting-started'
  AND r.is_active = true
ORDER BY r.sort_order;
\`\`\`

### Query Resources by Tag

\`\`\`sql
SELECT DISTINCT r.*
FROM resource_library_resources r
JOIN resource_library_resource_tags rt ON r.id = rt.resource_id
WHERE rt.tag_id = 'beginner'
  AND r.is_active = true
ORDER BY r.sort_order;
\`\`\`

### Query Featured Resources

\`\`\`sql
SELECT r.*, c.name as category_name, c.color as category_color
FROM resource_library_resources r
JOIN resource_library_categories c ON r.category_id = c.id
WHERE r.featured = true
  AND r.is_active = true
ORDER BY r.sort_order;
\`\`\`

### Search Resources

\`\`\`sql
SELECT r.*, c.name as category_name
FROM resource_library_resources r
JOIN resource_library_categories c ON r.category_id = c.id
WHERE (r.title ILIKE '%health assessment%' 
   OR r.description ILIKE '%health assessment%')
  AND r.is_active = true
ORDER BY r.sort_order;
\`\`\`

### Query Resources by Multiple Tags

\`\`\`sql
SELECT DISTINCT r.*
FROM resource_library_resources r
JOIN resource_library_resource_tags rt ON r.id = rt.resource_id
WHERE rt.tag_id IN ('video', 'beginner', 'new-coach')
  AND r.is_active = true
GROUP BY r.id
HAVING COUNT(DISTINCT rt.tag_id) = 3  -- Must have all 3 tags
ORDER BY r.sort_order;
\`\`\`

## TypeScript/JavaScript Usage

### Import the Library

\`\`\`typescript
import { 
  RESOURCE_LIBRARY,
  getCategoryById,
  getResourcesByCategory,
  getResourcesByTag,
  getFeaturedResources,
  searchResources
} from '@/lib/resource-library-data'
\`\`\`

### Get Resources by Category

\`\`\`typescript
const gettingStartedResources = getResourcesByCategory('getting-started')
\`\`\`

### Get Resources by Tag

\`\`\`typescript
const beginnerVideos = getResourcesByTag('video')
  .filter(r => r.tags.includes('beginner'))
\`\`\`

### Search Resources

\`\`\`typescript
const results = searchResources('health assessment')
\`\`\`

### Get Featured Resources

\`\`\`typescript
const featured = getFeaturedResources()
\`\`\`

## Migration Files

1. **create_resource_library_tables.sql**: Creates all tables, indexes, RLS policies
2. **seed_resource_library_data.sql**: Inserts all categories, tags, resources, and relationships

## Data Files

1. **lib/resource-library-data.ts**: TypeScript data file with helper functions
2. **scripts/convert-resource-library-json.js**: Conversion script from JSON to TypeScript
3. **scripts/seed-resource-library.js**: Generates SQL seed data from JSON

## Key Features

### 1. Categorization
- 15 distinct categories with icons and colors
- Easy to browse by topic area
- Visual organization in UI

### 2. Tagging System
- 5 tag types for flexible filtering
- Multiple tags per resource
- Supports complex search queries

### 3. Featured Resources
- Highlight important/popular resources
- Can be displayed prominently in UI
- 24 featured resources out of 89 total

### 4. Resource Types
- **doc**: Google Docs (scripts, guides, checklists)
- **video**: Vimeo/YouTube training videos
- **pdf**: Official OPTAVIA PDFs
- **link**: External links
- **canva**: Canva templates
- **form**: JotForm templates

### 5. Rank-Based Filtering
- Resources tagged by appropriate rank level
- New coaches see beginner content
- Advanced content for higher ranks

### 6. Audience Targeting
- **client-facing**: Resources to share with clients
- **coach-only**: Internal training materials

## Statistics

- **Total Resources**: 89
- **Categories**: 15
- **Tags**: 23
- **Featured Resources**: 24
- **Resource-Tag Relationships**: 348
- **Average Tags per Resource**: 3.9

## Future Enhancements

1. **User Bookmarks**: Track which resources users have bookmarked
2. **Completion Tracking**: Mark resources as "completed"
3. **Rating System**: Allow coaches to rate resources
4. **Usage Analytics**: Track which resources are most accessed
5. **Recommendations**: Suggest resources based on user's rank and activity
6. **Search History**: Track popular searches
7. **Related Resources**: Show related resources based on tags
