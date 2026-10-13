import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ProjectsPage } from './ProjectsPage'

function renderProjectsPage() {
  return render(
    <MemoryRouter initialEntries={['/projects']}>
      <ProjectsPage />
    </MemoryRouter>,
  )
}

function projectTitles() {
  return within(screen.getByTestId('project-grid'))
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)
}

describe('ProjectsPage', () => {
  it('renders project experience, counts, and active navigation', () => {
    renderProjectsPage()

    expect(screen.getByRole('heading', { name: 'Projects', level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Explore previous project experience/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '9 projects' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getAllByText('Knowledge items').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Reusable documents').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'View Project: Northstar Data Centre Modernization' }))
      .toHaveAttribute('href', '/projects/northstar-data-centre-modernization')
  })

  it('searches names, customers, technologies, tags, and project managers', () => {
    renderProjectsPage()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search projects' }), {
      target: { value: 'Aisha Rahman' },
    })

    expect(screen.getByRole('heading', { name: 'Northstar Data Centre Modernization' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 project' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Crestline Cloud Landing Zone' })).not.toBeInTheDocument()
  })

  it('filters by year', () => {
    renderProjectsPage()

    fireEvent.change(screen.getByRole('combobox', { name: 'Year' }), {
      target: { value: '2024' },
    })

    expect(screen.getByRole('heading', { name: '2 projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bluewave Server Consolidation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Harborview Collaboration Migration' })).toBeInTheDocument()
  })

  it('combines status, department, technology, and year filters', () => {
    renderProjectsPage()

    fireEvent.click(screen.getByRole('button', { name: 'Active' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'Department' }), {
      target: { value: 'Engineering' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Technology' }), {
      target: { value: 'VMware' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Year' }), {
      target: { value: '2026' },
    })

    expect(screen.getByRole('heading', { name: 'Northstar Data Centre Modernization' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 project' })).toBeInTheDocument()
  })

  it('sorts projects by oldest and alphabetically', () => {
    renderProjectsPage()

    fireEvent.change(screen.getByRole('combobox', { name: 'Sort by' }), {
      target: { value: 'Oldest' },
    })
    expect(projectTitles()[0]).toBe('Bluewave Server Consolidation')

    fireEvent.change(screen.getByRole('combobox', { name: 'Sort by' }), {
      target: { value: 'A-Z' },
    })
    expect(projectTitles()[0]).toBe('Altura Branch Network Refresh')
  })

  it('shows an empty state and clears every filter', () => {
    renderProjectsPage()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search projects' }), {
      target: { value: 'no matching fictional project' },
    })

    expect(screen.getByRole('heading', { name: 'No projects found' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear all filters' }))
    expect(screen.getByRole('heading', { name: '9 projects' })).toBeInTheDocument()
  })
})
