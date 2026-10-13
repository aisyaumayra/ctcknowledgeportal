import { useState, type FormEvent } from 'react'

interface SearchBarProps {
  initialQuery?: string
  inputId?: string
  label?: string
  placeholder?: string
  variant?: 'hero' | 'results'
  onSearch: (query: string) => void
}

export function SearchBar({
  initialQuery = '',
  inputId = 'global-search',
  label = 'Search company knowledge',
  placeholder = 'Search guides, templates, projects and more...',
  variant = 'hero',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <form className={variant === 'results' ? 'search search--results' : 'search'} role="search" onSubmit={handleSubmit}>
      <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6.75" />
        <path d="m16 16 4 4" />
      </svg>
      <label className="sr-only" htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  )
}
