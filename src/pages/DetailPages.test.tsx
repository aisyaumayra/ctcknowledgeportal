import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'

function renderRoute(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('detail pages', () => {
  it('renders a knowledge detail using the canonical knowledge record', () => {
    renderRoute('/knowledge/vmware-deployment-guide')

    expect(screen.getByRole('heading', { name: 'VMware Deployment Guide', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to Knowledge/ })).toHaveAttribute('href', '/knowledge')
    expect(screen.getByText('Infrastructure Engineering')).toBeInTheDocument()
    expect(screen.getByText('VMware Deployment Guide.pdf')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Server Installation Best Practices/ }))
      .toHaveAttribute('href', '/knowledge/server-installation-best-practices')
    expect(screen.getAllByRole('button', { name: 'Open Document' })).toHaveLength(2)
  })

  it('renders a template detail with usage guidance and mock action', () => {
    renderRoute('/templates/monthly-project-report')

    expect(screen.getByRole('heading', { name: 'Monthly Project Report', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to Templates/ })).toHaveAttribute('href', '/templates')
    expect(screen.getByText('Project Governance Office')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'When to use this template' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Use Template' })).toHaveLength(2)
    expect(screen.queryByRole('button', { name: /Create Document/ })).not.toBeInTheDocument()
  })

  it('renders a project detail with reusable knowledge relationships', () => {
    renderRoute('/projects/northstar-data-centre-modernization')

    expect(screen.getByRole('heading', { name: 'Northstar Data Centre Modernization', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Back to Projects/ })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('heading', { name: 'Lessons Learned' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Challenges & Solutions' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /VMware Deployment Guide/ }))
      .toHaveAttribute('href', '/knowledge/vmware-deployment-guide')
    expect(screen.getByRole('link', { name: /Installation Checklist/ }))
      .toHaveAttribute('href', '/templates/installation-checklist')
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it.each([
    ['/knowledge/missing-resource', '/knowledge', 'Back to Knowledge'],
    ['/templates/missing-resource', '/templates', 'Back to Templates'],
    ['/projects/missing-resource', '/projects', 'Back to Projects'],
  ])('renders a not-found state for %s', (route, returnTo, returnLabel) => {
    renderRoute(route)

    expect(screen.getByRole('heading', { name: 'Resource not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: new RegExp(returnLabel) })).toHaveAttribute('href', returnTo)
  })
})
