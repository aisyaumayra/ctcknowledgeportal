import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { SearchResultCard } from '../components/SearchResultCard'
import { normalizeSearchQuery, searchPortal } from '../services/searchService'
import type { SearchResultFilter, SearchResultType } from '../types/search'

const resultFilters: readonly SearchResultFilter[] = ['All', 'Knowledge', 'Templates', 'Projects']

const filterTypeMap: Partial<Record<SearchResultFilter, SearchResultType>> = {
  Knowledge: 'Knowledge',
  Templates: 'Template',
  Projects: 'Project',
}

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<SearchResultFilter>('All')
  const queryParameter = searchParams.get('q') ?? ''
  const searchResponse = useMemo(() => searchPortal(queryParameter), [queryParameter])
  const selectedType = filterTypeMap[activeFilter]
  const visibleResults = selectedType
    ? searchResponse.results.filter((result) => result.type === selectedType)
    : searchResponse.results

  function handleSearch(query: string) {
    const normalizedQuery = normalizeSearchQuery(query)
    setActiveFilter('All')
    setSearchParams(normalizedQuery ? { q: normalizedQuery } : {})
  }

  return (
    <div className="app-shell search-page">
      <Header />
      <main>
        <section className="search-page__hero" aria-labelledby="search-page-heading">
          <div className="search-page__glow" aria-hidden="true" />
          <div className="search-page__hero-content">
            <span className="hero__eyebrow">Search every collection</span>
            <h1 id="search-page-heading">Search company knowledge</h1>
            <p>Find trusted knowledge, approved templates, and reusable project experience in one place.</p>
            <SearchBar
              key={searchResponse.query}
              initialQuery={searchResponse.query}
              inputId="search-results-query"
              variant="results"
              onSearch={handleSearch}
            />
          </div>
        </section>

        <section className="search-results" aria-labelledby="search-results-heading">
          {!searchResponse.query ? (
            <div className="search-state">
              <span className="search-state__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></svg>
              </span>
              <h2 id="search-results-heading">Start your search</h2>
              <p>Enter a search term above to explore knowledge, templates, and projects.</p>
            </div>
          ) : (
            <>
              <div className="search-results__heading">
                <div>
                  <span className="eyebrow">Global search</span>
                  <h2 id="search-results-heading">
                    {searchResponse.counts.All} {searchResponse.counts.All === 1 ? 'result' : 'results'} for “{searchResponse.query}”
                  </h2>
                </div>
                <p>{visibleResults.length} currently shown</p>
              </div>

              <div className="search-results__filters" aria-label="Filter search results by type">
                {resultFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={activeFilter === filter ? 'search-type-filter search-type-filter--active' : 'search-type-filter'}
                    aria-label={`${filter}, ${searchResponse.counts[filter]} results`}
                    aria-pressed={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                  >
                    <span>{filter}</span>
                    <span className="search-type-filter__count">{searchResponse.counts[filter]}</span>
                  </button>
                ))}
              </div>

              {visibleResults.length > 0 ? (
                <div className="search-results__list">
                  {visibleResults.map((result) => <SearchResultCard key={`${result.type}-${result.id}`} result={result} />)}
                </div>
              ) : (
                <div className="search-state search-state--compact">
                  <span className="search-state__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5M8 8l5 5m0-5-5 5" /></svg>
                  </span>
                  <h2>No results found</h2>
                  <p>
                    {activeFilter === 'All'
                      ? 'Try a different term or check the spelling.'
                      : `No ${activeFilter.toLowerCase()} match this search. Try another result type or a different term.`}
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
