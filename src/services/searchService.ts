import { knowledgeResources } from '../data/knowledgeData'
import { getProjectRelevantDate, projects } from '../data/projectData'
import { templates } from '../data/templateData'
import type {
  GlobalSearchResponse,
  GlobalSearchResult,
  SearchResultCounts,
} from '../types/search'

export function normalizeSearchQuery(query: string) {
  return query.trim().replace(/\s+/g, ' ')
}

function matchesQuery(fields: string[], normalizedQuery: string) {
  const searchableText = fields.join(' ').toLocaleLowerCase()
  const tokens = normalizedQuery.toLocaleLowerCase().split(' ')
  return tokens.every((token) => searchableText.includes(token))
}

function resultRank(result: GlobalSearchResult, normalizedQuery: string) {
  const title = result.title.toLocaleLowerCase()
  const query = normalizedQuery.toLocaleLowerCase()
  if (title === query) return 0
  if (title.includes(query)) return 1
  return 2
}

export function searchPortal(query: string): GlobalSearchResponse {
  const normalizedQuery = normalizeSearchQuery(query)

  if (!normalizedQuery) {
    return {
      query: '',
      results: [],
      counts: { All: 0, Knowledge: 0, Templates: 0, Projects: 0 },
    }
  }

  const knowledgeResults: GlobalSearchResult[] = knowledgeResources
    .filter((resource) => matchesQuery([
      resource.title,
      resource.description,
      resource.type,
      resource.department,
      ...resource.tags,
    ], normalizedQuery))
    .map((resource) => ({
      id: resource.id,
      type: 'Knowledge',
      title: resource.title,
      description: resource.description,
      metadata: [resource.type, resource.department],
      tags: resource.tags,
      href: `/knowledge/${resource.id}`,
      updatedAt: resource.updatedAt,
    }))

  const templateResults: GlobalSearchResult[] = templates
    .filter((template) => template.status === 'Active')
    .filter((template) => matchesQuery([
      template.name,
      template.description,
      template.department,
      template.category,
      template.fileType,
      ...template.tags,
    ], normalizedQuery))
    .map((template) => ({
      id: template.id,
      type: 'Template',
      title: template.name,
      description: template.description,
      metadata: [template.fileType, template.department, `Version ${template.version}`],
      tags: template.tags,
      href: `/templates/${template.id}`,
      updatedAt: template.updatedAt,
    }))

  const projectResults: GlobalSearchResult[] = projects
    .filter((project) => matchesQuery([
      project.name,
      project.customer,
      project.description,
      project.department,
      project.projectManager,
      ...project.technologies,
      ...project.tags,
    ], normalizedQuery))
    .map((project) => ({
      id: project.id,
      type: 'Project',
      title: project.name,
      description: project.description,
      metadata: [project.department, ...project.technologies],
      tags: project.tags,
      href: `/projects/${project.id}`,
      updatedAt: getProjectRelevantDate(project),
    }))

  const results = [...knowledgeResults, ...templateResults, ...projectResults]
    .sort((first, second) => {
      const rankDifference = resultRank(first, normalizedQuery) - resultRank(second, normalizedQuery)
      return rankDifference || first.title.localeCompare(second.title)
    })

  const counts: SearchResultCounts = {
    All: results.length,
    Knowledge: knowledgeResults.length,
    Templates: templateResults.length,
    Projects: projectResults.length,
  }

  return { query: normalizedQuery, results, counts }
}
