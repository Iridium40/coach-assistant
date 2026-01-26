const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = '/Users/alans/Downloads/files (1)/coach-resource-library.json';
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Generate TypeScript content
const tsContent = `/**
 * Coach Resource Library Data
 * Version 1.0 - Searchable collection of training resources
 * Auto-generated from coach-resource-library.json
 */

export interface ResourceCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface ResourceTag {
  id: string
  name: string
  type: "format" | "level" | "content" | "audience" | "rank"
}

export interface Resource {
  id: string
  title: string
  description: string
  type: "doc" | "video" | "pdf" | "link" | "canva" | "form"
  url: string
  categoryId: string
  tags: string[]
  featured: boolean
}

export interface ResourceLibrary {
  library: {
    title: string
    description: string
    version: string
    totalResources: number
    totalCategories: number
  }
  categories: ResourceCategory[]
  tags: ResourceTag[]
  resources: Resource[]
}

// Full resource library data
export const RESOURCE_LIBRARY: ResourceLibrary = ${JSON.stringify(jsonData, null, 2)}

// Helper function to get a category by ID
export function getCategoryById(categoryId: string): ResourceCategory | undefined {
  return RESOURCE_LIBRARY.categories.find(c => c.id === categoryId)
}

// Helper function to get a resource by ID
export function getResourceById(resourceId: string): Resource | undefined {
  return RESOURCE_LIBRARY.resources.find(r => r.id === resourceId)
}

// Helper function to get resources by category
export function getResourcesByCategory(categoryId: string): Resource[] {
  return RESOURCE_LIBRARY.resources.filter(r => r.categoryId === categoryId)
}

// Helper function to get resources by tag
export function getResourcesByTag(tagId: string): Resource[] {
  return RESOURCE_LIBRARY.resources.filter(r => r.tags.includes(tagId))
}

// Helper function to get featured resources
export function getFeaturedResources(): Resource[] {
  return RESOURCE_LIBRARY.resources.filter(r => r.featured)
}

// Helper function to search resources
export function searchResources(query: string): Resource[] {
  const lowerQuery = query.toLowerCase()
  return RESOURCE_LIBRARY.resources.filter(r => 
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery)
  )
}

// Helper function to get resource type icon
export function getResourceTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    doc: "📄",
    video: "🎥",
    pdf: "📑",
    link: "🔗",
    canva: "🎨",
    form: "📋"
  }
  return icons[type] || "📎"
}

// Helper function to get resource type label
export function getResourceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    doc: "Document",
    video: "Video",
    pdf: "PDF",
    link: "Link",
    canva: "Canva",
    form: "Form"
  }
  return labels[type] || "Resource"
}

// Helper function to get tags by type
export function getTagsByType(type: ResourceTag['type']): ResourceTag[] {
  return RESOURCE_LIBRARY.tags.filter(t => t.type === type)
}
`;

// Write to the lib directory
const outputPath = path.join(__dirname, '..', 'lib', 'resource-library-data.ts');
fs.writeFileSync(outputPath, tsContent);

console.log('✅ Resource library data converted successfully!');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Categories: ${jsonData.categories.length}`);
console.log(`🏷️  Tags: ${jsonData.tags.length}`);
console.log(`📚 Resources: ${jsonData.resources.length}`);
