import { describe, expect, it } from 'vitest'
import { normalizeSearchQuery, searchPortal } from './searchService'

describe('searchPortal', () => {
  it('normalizes surrounding and repeated whitespace', () => {
    expect(normalizeSearchQuery('  VMWARE   deployment  ')).toBe('VMWARE deployment')
  })

  it('supports case-insensitive partial matching across canonical resources', () => {
    const response = searchPortal('  vmW  ')

    expect(response.query).toBe('vmW')
    expect(response.counts).toEqual({ All: 3, Knowledge: 1, Templates: 0, Projects: 2 })
    expect(response.results.map((result) => result.title)).toEqual(expect.arrayContaining([
      'VMware Deployment Guide',
      'Northstar Data Centre Modernization',
      'Bluewave Server Consolidation',
    ]))
  })

  it('searches resource-specific fields and provides detail links', () => {
    const projectResponse = searchPortal('Aisha Rahman')
    const templateResponse = searchPortal('PowerPoint')

    expect(projectResponse.results).toHaveLength(1)
    expect(projectResponse.results[0]).toMatchObject({
      type: 'Project',
      href: '/projects/northstar-data-centre-modernization',
    })
    expect(templateResponse.results[0]).toMatchObject({
      type: 'Template',
      href: '/templates/customer-proposal',
    })
  })

  it('returns no records for an empty query', () => {
    expect(searchPortal('   ')).toEqual({
      query: '',
      results: [],
      counts: { All: 0, Knowledge: 0, Templates: 0, Projects: 0 },
    })
  })

  it('does not expose inactive templates in employee search', () => {
    expect(searchPortal('Legacy Customer Proposal').results).toHaveLength(0)
    expect(searchPortal('Expense Claim Form Revised').results).toHaveLength(0)
  })
})
