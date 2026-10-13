export type SearchResultType = 'Knowledge' | 'Template' | 'Project'

export type SearchResultFilter = 'All' | 'Knowledge' | 'Templates' | 'Projects'

export interface GlobalSearchResult {
  id: string
  type: SearchResultType
  title: string
  description: string
  metadata: string[]
  tags: string[]
  href: string
  updatedAt: string
}

export interface SearchResultCounts {
  All: number
  Knowledge: number
  Templates: number
  Projects: number
}

export interface GlobalSearchResponse {
  query: string
  results: GlobalSearchResult[]
  counts: SearchResultCounts
}
