const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = '/Users/alans/Downloads/files (1)/coach-resource-library.json';
const libraryData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Generate SQL INSERT statements
let sql = `-- =====================================================
-- SEED DATA FOR COACH RESOURCE LIBRARY
-- Auto-generated from coach-resource-library.json
-- =====================================================

-- =====================================================
-- 1. INSERT CATEGORIES
-- =====================================================
`;

libraryData.categories.forEach((category, index) => {
  sql += `INSERT INTO resource_library_categories (id, name, description, icon, color, sort_order)
VALUES ('${category.id}', '${category.name.replace(/'/g, "''")}', '${category.description.replace(/'/g, "''")}', '${category.icon}', '${category.color}', ${index + 1});\n\n`;
});

sql += `-- =====================================================
-- 2. INSERT TAGS
-- =====================================================
`;

libraryData.tags.forEach((tag, index) => {
  sql += `INSERT INTO resource_library_tags (id, name, type, sort_order)
VALUES ('${tag.id}', '${tag.name.replace(/'/g, "''")}', '${tag.type}', ${index + 1});\n\n`;
});

sql += `-- =====================================================
-- 3. INSERT RESOURCES
-- =====================================================
`;

libraryData.resources.forEach((resource, index) => {
  const escapedTitle = resource.title.replace(/'/g, "''");
  const escapedDescription = resource.description.replace(/'/g, "''");
  const escapedUrl = resource.url.replace(/'/g, "''");
  
  sql += `INSERT INTO resource_library_resources (id, title, description, type, url, category_id, featured, sort_order)
VALUES ('${resource.id}', '${escapedTitle}', '${escapedDescription}', '${resource.type}', '${escapedUrl}', '${resource.categoryId}', ${resource.featured}, ${index + 1});\n\n`;
});

sql += `-- =====================================================
-- 4. INSERT RESOURCE-TAG RELATIONSHIPS
-- =====================================================
`;

libraryData.resources.forEach((resource) => {
  resource.tags.forEach((tagId) => {
    sql += `INSERT INTO resource_library_resource_tags (resource_id, tag_id)
VALUES ('${resource.id}', '${tagId}');\n`;
  });
  sql += '\n';
});

// Write to file
const outputPath = path.join(__dirname, '..', 'supabase', 'migrations', 'seed_resource_library_data.sql');
fs.writeFileSync(outputPath, sql);

console.log('✅ Resource library seed data generated!');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Categories: ${libraryData.categories.length}`);
console.log(`🏷️  Tags: ${libraryData.tags.length}`);
console.log(`📚 Resources: ${libraryData.resources.length}`);

// Calculate tag relationships
const totalTags = libraryData.resources.reduce((sum, r) => sum + r.tags.length, 0);
console.log(`🔗 Resource-Tag relationships: ${totalTags}`);
