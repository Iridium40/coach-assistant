const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = '/Users/alans/Downloads/files/coach-assistant-academy-data.json';
const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Generate TypeScript content
const tsContent = `/**
 * Coach Assistant Academy Data
 * Version 4.0 - Complete lesson and resource structure
 * Auto-generated from coach-assistant-academy-data.json
 */

export interface AcademyResource {
  title: string
  type: "doc" | "video" | "pdf" | "link" | "canva" | "form"
  url: string
  description: string
}

export interface AcademyLesson {
  id: string
  number: string
  title: string
  description: string
  resources: AcademyResource[]
  milestones: string[]
}

export interface AcademyModule {
  id: string
  number: number
  title: string
  description: string
  rankRequirement: string
  rankRequirementCode: string
  icon: string
  lessons: AcademyLesson[]
}

export interface ClientSupportCategory {
  title: string
  resources: AcademyResource[]
}

export interface ClientSupportResources {
  title: string
  description: string
  categories: ClientSupportCategory[]
}

export interface AcademyData {
  academy: {
    title: string
    description: string
    version: string
    totalModules: number
    totalLessons: number
    totalResources: number
  }
  modules: AcademyModule[]
  clientSupportResources: ClientSupportResources
  rankCodes: Record<string, { name: string; level: number }>
}

// Full academy data
export const ACADEMY_DATA: AcademyData = ${JSON.stringify(jsonData, null, 2)}

// Helper function to get a module by ID
export function getModuleById(moduleId: string): AcademyModule | undefined {
  return ACADEMY_DATA.modules.find(m => m.id === moduleId)
}

// Helper function to get a lesson by ID
export function getLessonById(lessonId: string): AcademyLesson | undefined {
  for (const module of ACADEMY_DATA.modules) {
    const lesson = module.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson
  }
  return undefined
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
`;

// Write to the lib directory
const outputPath = path.join(__dirname, '..', 'lib', 'academy-data.ts');
fs.writeFileSync(outputPath, tsContent);

console.log('✅ Academy data converted successfully!');
console.log(`📁 Output: ${outputPath}`);
console.log(`📊 Modules: ${jsonData.modules.length}`);
console.log(`📚 Total Lessons: ${jsonData.academy.totalLessons}`);
console.log(`📎 Total Resources: ${jsonData.academy.totalResources}`);
