import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{location.pathname}{location.search}</output>
}

function renderSearchPage(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  )
}

describe('SearchResultsPage', () => {
  it('shows an instructional state for an empty query', () => {
    renderSearchPage('/search')

    expect(screen.getByRole('heading', { name: 'Start your search' })).toBeInTheDocument()
    expect(screen.queryByText('VMware Deployment Guide')).not.toBeInTheDocument()
  })

  it('shows cross-library results and filters them by type', () => {
    renderSearchPage('/search?q=vmware')

    expect(screen.getByRole('heading', { name: '3 results for “vmware”' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'VMware Deployment Guide' })).toHaveAttribute(
      'href',
      '/knowledge/vmware-deployment-guide',
    )
    expect(screen.getByRole('link', { name: 'Northstar Data Centre Modernization' })).toHaveAttribute(
      'href',
      '/projects/northstar-data-centre-modernization',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Projects, 2 results' }))

    expect(screen.getByText('2 currently shown')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'VMware Deployment Guide' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Bluewave Server Consolidation' })).toBeInTheDocument()
  })

  it('shows a no-results state while keeping search available', () => {
    renderSearchPage('/search?q=zzzz-no-match')

    expect(screen.getByRole('heading', { name: 'No results found' })).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: 'Search company knowledge' })).toHaveValue('zzzz-no-match')
  })

  it('updates the query and results when a new search is submitted', () => {
    renderSearchPage('/search?q=vmware')
    const input = screen.getByRole('searchbox', { name: 'Search company knowledge' })

    fireEvent.change(input, { target: { value: '  quotation   ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByTestId('location')).toHaveTextContent('/search?q=quotation')
    expect(screen.getByRole('heading', { name: '2 results for “quotation”' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Quotation Preparation Guide' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Quotation Template' })).toBeInTheDocument()
  })
})
