import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { KnowledgePage } from './KnowledgePage'

function renderKnowledgePage() {
  return render(
    <MemoryRouter initialEntries={['/knowledge']}>
      <KnowledgePage />
    </MemoryRouter>,
  )
}

function resourceTitles() {
  return within(screen.getByTestId('knowledge-grid'))
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)
}

describe('KnowledgePage', () => {
  it('renders the page header, navigation, controls, and mock resources', () => {
    renderKnowledgePage()

    expect(screen.getByRole('heading', { name: 'Knowledge', level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Discover proven practices/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Knowledge' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('heading', { name: '10 resources' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View VMware Deployment Guide' }))
      .toHaveAttribute('href', '/knowledge/vmware-deployment-guide')
  })

  it('searches across the local resource data', () => {
    renderKnowledgePage()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search knowledge resources' }), {
      target: { value: 'VMware' },
    })

    expect(screen.getByRole('heading', { name: 'VMware Deployment Guide' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 resource' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Project Closure SOP' })).not.toBeInTheDocument()
  })

  it('combines category and department filters', () => {
    renderKnowledgePage()

    fireEvent.click(screen.getByRole('button', { name: 'SOPs' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'Department' }), {
      target: { value: 'Operations' },
    })

    expect(screen.getByRole('heading', { name: 'Site Deployment SOP' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 resource' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Project Closure SOP' })).not.toBeInTheDocument()
  })

  it('sorts resources by oldest and alphabetically', () => {
    renderKnowledgePage()

    fireEvent.change(screen.getByRole('combobox', { name: 'Sort by' }), {
      target: { value: 'Oldest' },
    })
    expect(resourceTitles()[0]).toBe('Month-end Reconciliation SOP')

    fireEvent.change(screen.getByRole('combobox', { name: 'Sort by' }), {
      target: { value: 'A-Z' },
    })
    expect(resourceTitles()[0]).toBe('Customer Escalation Guide')
  })

  it('shows a clear empty state and can reset all filters', () => {
    renderKnowledgePage()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search knowledge resources' }), {
      target: { value: 'no matching knowledge item' },
    })

    expect(screen.getByRole('heading', { name: 'No knowledge resources found' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear all filters' }))
    expect(screen.getByRole('heading', { name: '10 resources' })).toBeInTheDocument()
  })
})
