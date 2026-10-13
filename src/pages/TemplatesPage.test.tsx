import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TemplatesPage } from './TemplatesPage'

function renderTemplatesPage() {
  return render(
    <MemoryRouter initialEntries={['/templates']}>
      <TemplatesPage />
    </MemoryRouter>,
  )
}

function templateTitles() {
  return within(screen.getByTestId('template-grid'))
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)
}

describe('TemplatesPage', () => {
  it('renders the library with only active templates and active navigation', () => {
    renderTemplatesPage()

    expect(screen.getByRole('heading', { name: 'Templates', level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Find approved, reusable templates/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '10 templates' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Templates' })).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByText('Expense Claim Form – Revised')).not.toBeInTheDocument()
    expect(screen.queryByText('Legacy Customer Proposal')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View Template: Monthly Project Report' }))
      .toHaveAttribute('href', '/templates/monthly-project-report')
  })

  it('searches template names and metadata locally', () => {
    renderTemplatesPage()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search templates' }), {
      target: { value: 'quotation' },
    })

    expect(screen.getByRole('heading', { name: 'Quotation Template' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 template' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Project Plan' })).not.toBeInTheDocument()
  })

  it('filters by file type', () => {
    renderTemplatesPage()

    fireEvent.change(screen.getByRole('combobox', { name: 'File type' }), {
      target: { value: 'PDF' },
    })

    expect(screen.getByRole('heading', { name: 'Site Survey Form' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 template' })).toBeInTheDocument()
  })

  it('combines category, department, and file type filters', () => {
    renderTemplatesPage()

    fireEvent.click(screen.getByRole('button', { name: 'Checklists' }))
    fireEvent.change(screen.getByRole('combobox', { name: 'Department' }), {
      target: { value: 'Operations' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'File type' }), {
      target: { value: 'Excel' },
    })

    expect(screen.getByRole('heading', { name: 'Installation Checklist' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 template' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Project Handover Checklist' })).not.toBeInTheDocument()
  })

  it('sorts templates by oldest and alphabetically', () => {
    renderTemplatesPage()

    fireEvent.change(screen.getByRole('combobox', { name: 'Sort by' }), {
      target: { value: 'Oldest' },
    })
    expect(templateTitles()[0]).toBe('Meeting Minutes')

    fireEvent.change(screen.getByRole('combobox', { name: 'Sort by' }), {
      target: { value: 'A-Z' },
    })
    expect(templateTitles()[0]).toBe('Customer Proposal')
  })

  it('shows an empty state and clears all filters', () => {
    renderTemplatesPage()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search templates' }), {
      target: { value: 'no matching approved template' },
    })

    expect(screen.getByRole('heading', { name: 'No templates found' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear all filters' }))
    expect(screen.getByRole('heading', { name: '10 templates' })).toBeInTheDocument()
  })
})
