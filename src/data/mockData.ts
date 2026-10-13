import type { KnowledgeCategory, Resource } from '../types/resource'

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'knowledge',
    title: 'Knowledge',
    description: 'Find practical guidance and trusted ways of working.',
    items: ['SOPs', 'Guides', 'Best Practices'],
    actionLabel: 'Explore knowledge',
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Start faster with approved, ready-to-use resources.',
    items: ['Approved Templates', 'Forms', 'Checklists'],
    actionLabel: 'Browse templates',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Build on the experience and outcomes of past work.',
    items: ['Previous Projects', 'References', 'Lessons Learned'],
    actionLabel: 'View projects',
  },
]

export const recentlyAddedResources: Resource[] = [
  {
    id: 1,
    title: 'New Employee Onboarding Guide',
    description: 'A step-by-step guide for a smooth first month at the company.',
    category: 'Guide',
    department: 'People & Culture',
    updatedLabel: 'Added today',
    fileType: 'PDF',
  },
  {
    id: 2,
    title: 'Project Kick-off Checklist',
    description: 'Essential steps, owners, and checkpoints for starting a project.',
    category: 'Checklist',
    department: 'Project Management',
    updatedLabel: 'Added yesterday',
    fileType: 'XLSX',
  },
  {
    id: 3,
    title: 'Brand Presentation Template',
    description: 'The latest approved presentation layout and brand styles.',
    category: 'Template',
    department: 'Marketing',
    updatedLabel: 'Added 2 days ago',
    fileType: 'PPTX',
  },
  {
    id: 4,
    title: 'Customer Handover Best Practices',
    description: 'Lessons and recommendations for consistent customer transitions.',
    category: 'Best Practice',
    department: 'Customer Success',
    updatedLabel: 'Added 3 days ago',
    fileType: 'DOCX',
  },
]
