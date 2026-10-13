import { useMemo, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ResourceCard } from '../components/ResourceCard'
import { ResourceControls } from '../components/ResourceControls'
import {
  departmentOptions,
  knowledgeCategoryOptions,
  knowledgeResources,
} from '../data/knowledgeData'
import type {
  DepartmentFilter,
  KnowledgeCategoryFilter,
  KnowledgeType,
  ResourceSort,
} from '../types/resource'

const categoryTypeMap: Record<Exclude<KnowledgeCategoryFilter, 'All'>, KnowledgeType> = {
  SOPs: 'SOP',
  Guides: 'Guide',
  'Best Practices': 'Best Practice',
  'Lessons Learned': 'Lessons Learned',
}

export function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategoryFilter>('All')
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentFilter>('All Departments')
  const [sortBy, setSortBy] = useState<ResourceSort>('Newest')

  const filteredResources = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase()

    return knowledgeResources
      .filter((resource) => {
        const searchableText = [
          resource.title,
          resource.description,
          resource.type,
          resource.department,
          ...resource.tags,
        ].join(' ').toLocaleLowerCase()

        const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch)
        const matchesCategory = selectedCategory === 'All'
          || resource.type === categoryTypeMap[selectedCategory]
        const matchesDepartment = selectedDepartment === 'All Departments'
          || resource.department === selectedDepartment

        return matchesSearch && matchesCategory && matchesDepartment
      })
      .sort((first, second) => {
        if (sortBy === 'A-Z') {
          return first.title.localeCompare(second.title)
        }

        const dateDifference = Date.parse(first.updatedAt) - Date.parse(second.updatedAt)
        return sortBy === 'Oldest' ? dateDifference : -dateDifference
      })
  }, [searchTerm, selectedCategory, selectedDepartment, sortBy])

  function resetFilters() {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedDepartment('All Departments')
    setSortBy('Newest')
  }

  return (
    <div className="app-shell">
      <Header />
      <main>
        <section className="knowledge-hero" aria-labelledby="knowledge-heading">
          <div className="knowledge-hero__glow" aria-hidden="true" />
          <div className="knowledge-hero__content">
            <span className="hero__eyebrow">Company knowledge</span>
            <h1 id="knowledge-heading">Knowledge</h1>
            <p>Discover proven practices, guides and organizational knowledge shared across the company.</p>
          </div>
        </section>

        <div className="knowledge-content">
          <ResourceControls
            ariaLabel="Knowledge filters"
            searchId="knowledge-search"
            searchLabel="Search knowledge resources"
            searchPlaceholder="Search knowledge resources..."
            searchTerm={searchTerm}
            categories={knowledgeCategoryOptions}
            selectedCategory={selectedCategory}
            selectFilters={[
              {
                id: 'knowledge-department',
                label: 'Department',
                value: selectedDepartment,
                options: departmentOptions,
                onChange: (value) => setSelectedDepartment(value as DepartmentFilter),
              },
              {
                id: 'knowledge-sort',
                label: 'Sort by',
                value: sortBy,
                options: ['Newest', 'Oldest', 'A-Z'],
                onChange: (value) => setSortBy(value as ResourceSort),
              },
            ]}
            onSearchChange={setSearchTerm}
            onCategoryChange={(value) => setSelectedCategory(value as KnowledgeCategoryFilter)}
          />

          <section className="knowledge-results" aria-labelledby="results-heading" aria-live="polite">
            <div className="knowledge-results__heading">
              <div>
                <span className="eyebrow">Knowledge library</span>
                <h2 id="results-heading">
                  {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
                </h2>
              </div>
              <p>Showing resources that match your current filters</p>
            </div>

            {filteredResources.length > 0 ? (
              <div className="knowledge-grid" data-testid="knowledge-grid">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="knowledge-empty">
                <span className="knowledge-empty__icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <circle cx="14" cy="14" r="8" />
                    <path d="m20 20 6 6M10.5 14h7" />
                  </svg>
                </span>
                <h2>No knowledge resources found</h2>
                <p>Try a different search term or clear your current filters.</p>
                <button type="button" onClick={resetFilters}>Clear all filters</button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
