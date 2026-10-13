export type CategoryIcon = 'knowledge' | 'templates' | 'projects'

export interface KnowledgeCategory {
  id: CategoryIcon
  title: string
  description: string
  items: string[]
  actionLabel: string
}

export interface Resource {
  id: number
  title: string
  description: string
  category: string
  department: string
  updatedLabel: string
  fileType: string
}

export type KnowledgeType = 'SOP' | 'Guide' | 'Best Practice' | 'Lessons Learned'

export type KnowledgeCategoryFilter =
  | 'All'
  | 'SOPs'
  | 'Guides'
  | 'Best Practices'
  | 'Lessons Learned'

export type KnowledgeDepartment =
  | 'Engineering'
  | 'Project Management'
  | 'Sales'
  | 'Operations'
  | 'Finance'

export type DepartmentFilter = 'All Departments' | KnowledgeDepartment

export type ResourceSort = 'Newest' | 'Oldest' | 'A-Z'

export interface KnowledgeResource {
  id: string
  title: string
  description: string
  type: KnowledgeType
  department: KnowledgeDepartment
  tags: string[]
  updatedAt: string
  owner: string
  content: KnowledgeContentSection[]
  attachment: AttachedResource
  relatedKnowledgeIds: string[]
}

export interface KnowledgeContentSection {
  heading: string
  paragraphs: string[]
}

export interface AttachedResource {
  name: string
  fileType: string
  version: string
  sizeLabel: string
}
