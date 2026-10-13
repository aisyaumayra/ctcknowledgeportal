import type { ResourceSort } from './resource'

export type ProjectStatus = 'Active' | 'Completed'

export type ProjectStatusFilter = 'All' | ProjectStatus

export type ProjectDepartment =
  | 'Project Management'
  | 'Engineering'
  | 'Sales'
  | 'Operations'

export type ProjectDepartmentFilter = 'All Departments' | ProjectDepartment

export type ProjectTechnology =
  | 'VMware'
  | 'HP Server'
  | 'Networking'
  | 'Microsoft 365'
  | 'Cloud'
  | 'Security'

export type ProjectTechnologyFilter = 'All Technologies' | ProjectTechnology

export type ProjectYearFilter = 'All Years' | '2026' | '2025' | '2024'

export interface ProjectResource {
  id: string
  name: string
  customer: string
  description: string
  department: ProjectDepartment
  projectManager: string
  status: ProjectStatus
  startDate: string
  completionDate?: string
  technologies: ProjectTechnology[]
  tags: string[]
  knowledgeHighlights: string[]
  knowledgeItemCount: number
  reusableDocumentCount: number
  overview: string[]
  keyDeliverables: string[]
  lessonsLearned: string[]
  challengesAndSolutions: ProjectChallengeSolution[]
  relatedKnowledgeIds: string[]
  featuredReusableDocuments: ReusableDocumentReference[]
}

export interface ProjectChallengeSolution {
  challenge: string
  solution: string
}

export type ReusableDocumentReference =
  | {
      kind: 'template'
      templateId: string
    }
  | {
      kind: 'project-artifact'
      id: string
      name: string
      fileType: string
      description: string
    }

export type ProjectSort = ResourceSort
