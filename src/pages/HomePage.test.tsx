import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { HomePage } from './HomePage'

function renderHomePage() {
  function LocationProbe() {
    const location = useLocation()
    return <output data-testid="location">{location.pathname}{location.search}</output>
  }

  return render(
    <MemoryRouter>
      <HomePage />
      <LocationProbe />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('renders the required navigation and main content', () => {
    renderHomePage()

    expect(screen.getByRole('link', { name: 'Company Knowledge Hub home' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Find company knowledge' })).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: 'Search company knowledge' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Recently Added' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Knowledge' })).toHaveAttribute('href', '/knowledge')
    expect(screen.getByRole('link', { name: 'Templates' })).toHaveAttribute('href', '/templates')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects')
  })

  it('renders all three mock knowledge collections and their items', () => {
    renderHomePage()

    expect(screen.getByRole('heading', { name: 'Knowledge' })).toBeInTheDocument()
    expect(screen.getByText('SOPs')).toBeInTheDocument()
    expect(screen.getByText('Guides')).toBeInTheDocument()
    expect(screen.getByText('Best Practices')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'Templates' })).toBeInTheDocument()
    expect(screen.getByText('Approved Templates')).toBeInTheDocument()
    expect(screen.getByText('Forms')).toBeInTheDocument()
    expect(screen.getByText('Checklists')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByText('Previous Projects')).toBeInTheDocument()
    expect(screen.getByText('References')).toBeInTheDocument()
    expect(screen.getByText('Lessons Learned')).toBeInTheDocument()
  })

  it('submits a normalized query to the global search route', () => {
    renderHomePage()

    fireEvent.change(screen.getByRole('searchbox', { name: 'Search company knowledge' }), {
      target: { value: '  VMware   deployment  ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByTestId('location')).toHaveTextContent('/search?q=VMware%20deployment')
  })
})
