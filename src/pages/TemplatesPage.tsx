import { useMemo, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ResourceControls } from '../components/ResourceControls'
import { TemplateCard } from '../components/TemplateCard'
import {
  templateCategoryOptions,
  templateDepartmentOptions,
  templateFileTypeOptions,
  templates,
} from '../data/templateData'
import type { DepartmentFilter } from '../types/resource'
import type {
  TemplateCategoryFilter,
  TemplateFileTypeFilter,
  TemplateSort,
} from '../types/template'

const sortOptions: readonly TemplateSort[] = ['Newest', 'Oldest', 'A-Z']

export function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategoryFilter>('All')
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentFilter>('All Departments')
  const [selectedFileType, setSelectedFileType] = useState<TemplateFileTypeFilter>('All Types')
  const [sortBy, setSortBy] = useState<TemplateSort>('Newest')

  const filteredTemplates = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase()

    return templates
      .filter((template) => template.status === 'Active')
      .filter((template) => {
        const searchableText = [
          template.name,
          template.description,
          template.department,
          template.category,
          ...template.tags,
        ].join(' ').toLocaleLowerCase()

        const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch)
        const matchesCategory = selectedCategory === 'All'
          || template.category === selectedCategory
        const matchesDepartment = selectedDepartment === 'All Departments'
          || template.department === selectedDepartment
        const matchesFileType = selectedFileType === 'All Types'
          || template.fileType === selectedFileType

        return matchesSearch && matchesCategory && matchesDepartment && matchesFileType
      })
      .sort((first, second) => {
        if (sortBy === 'A-Z') {
          return first.name.localeCompare(second.name)
        }

        const dateDifference = Date.parse(first.updatedAt) - Date.parse(second.updatedAt)
        return sortBy === 'Oldest' ? dateDifference : -dateDifference
      })
  }, [searchTerm, selectedCategory, selectedDepartment, selectedFileType, sortBy])

  function resetFilters() {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedDepartment('All Departments')
    setSelectedFileType('All Types')
    setSortBy('Newest')
  }

  return (
    <div className="app-shell templates-page">
      <Header />
      <main>
        <section className="knowledge-hero" aria-labelledby="templates-heading">
          <div className="knowledge-hero__glow" aria-hidden="true" />
          <div className="knowledge-hero__content">
            <span className="hero__eyebrow">Approved template library</span>
            <h1 id="templates-heading">Templates</h1>
            <p>Find approved, reusable templates and standardized documents for your work.</p>
          </div>
        </section>

        <div className="knowledge-content">
          <ResourceControls
            ariaLabel="Template filters"
            searchId="template-search"
            searchLabel="Search templates"
            searchPlaceholder="Search templates by name, category, department or tag..."
            searchTerm={searchTerm}
            categories={templateCategoryOptions}
            selectedCategory={selectedCategory}
            selectFilters={[
              {
                id: 'template-department',
                label: 'Department',
                value: selectedDepartment,
                options: templateDepartmentOptions,
                onChange: (value) => setSelectedDepartment(value as DepartmentFilter),
              },
              {
                id: 'template-file-type',
                label: 'File type',
                value: selectedFileType,
                options: templateFileTypeOptions,
                onChange: (value) => setSelectedFileType(value as TemplateFileTypeFilter),
              },
              {
                id: 'template-sort',
                label: 'Sort by',
                value: sortBy,
                options: sortOptions,
                onChange: (value) => setSortBy(value as TemplateSort),
              },
            ]}
            onSearchChange={setSearchTerm}
            onCategoryChange={(value) => setSelectedCategory(value as TemplateCategoryFilter)}
          />

          <section className="knowledge-results" aria-labelledby="template-results-heading" aria-live="polite">
            <div className="knowledge-results__heading">
              <div>
                <span className="eyebrow">Approved library</span>
                <h2 id="template-results-heading">
                  {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'}
                </h2>
              </div>
              <p>Only active templates are shown to employees</p>
            </div>

            {filteredTemplates.length > 0 ? (
              <div className="knowledge-grid" data-testid="template-grid">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
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
                <h2>No templates found</h2>
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
