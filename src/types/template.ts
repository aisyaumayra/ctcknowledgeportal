import type { KnowledgeDepartment, ResourceSort } from './resource'

export type TemplateCategory =
  | 'Project Management'
  | 'Reports'
  | 'Forms'
  | 'Checklists'
  | 'Proposals'

export type TemplateCategoryFilter = 'All' | TemplateCategory

export type TemplateFileType = 'Word' | 'Excel' | 'PowerPoint' | 'PDF'

export type TemplateFileTypeFilter = 'All Types' | TemplateFileType

export type TemplateStatus = 'Active' | 'Draft' | 'Archived'

export interface TemplateResource {
  id: string
  name: string
  description: string
  department: KnowledgeDepartment
  category: TemplateCategory
  fileType: TemplateFileType
  version: string
  owner: string
  tags: string[]
  updatedAt: string
  status: TemplateStatus
  usageGuidance: string[]
}

export type TemplateSort = ResourceSort
