import { useMemo, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProjectCard } from '../components/ProjectCard'
import { ResourceControls } from '../components/ResourceControls'
import {
  getProjectRelevantDate,
  projectDepartmentOptions,
  projects,
  projectStatusOptions,
  projectTechnologyOptions,
  projectYearOptions,
} from '../data/projectData'
import type {
  ProjectDepartmentFilter,
  ProjectSort,
  ProjectStatusFilter,
  ProjectTechnologyFilter,
  ProjectYearFilter,
} from '../types/project'

const sortOptions: readonly ProjectSort[] = ['Newest', 'Oldest', 'A-Z']

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatusFilter>('All')
  const [selectedDepartment, setSelectedDepartment] = useState<ProjectDepartmentFilter>('All Departments')
  const [selectedTechnology, setSelectedTechnology] = useState<ProjectTechnologyFilter>('All Technologies')
  const [selectedYear, setSelectedYear] = useState<ProjectYearFilter>('All Years')
  const [sortBy, setSortBy] = useState<ProjectSort>('Newest')

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase()

    return projects
      .filter((project) => {
        const searchableText = [
          project.name,
          project.description,
          project.customer,
          project.projectManager,
          project.department,
          ...project.technologies,
          ...project.tags,
        ].join(' ').toLocaleLowerCase()

        const relevantDate = getProjectRelevantDate(project)
        const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch)
        const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus
        const matchesDepartment = selectedDepartment === 'All Departments'
          || project.department === selectedDepartment
        const matchesTechnology = selectedTechnology === 'All Technologies'
          || project.technologies.includes(selectedTechnology)
        const matchesYear = selectedYear === 'All Years' || relevantDate.startsWith(selectedYear)

        return matchesSearch
          && matchesStatus
          && matchesDepartment
          && matchesTechnology
          && matchesYear
      })
      .sort((first, second) => {
        if (sortBy === 'A-Z') {
          return first.name.localeCompare(second.name)
        }

        const dateDifference = Date.parse(getProjectRelevantDate(first))
          - Date.parse(getProjectRelevantDate(second))
        return sortBy === 'Oldest' ? dateDifference : -dateDifference
      })
  }, [searchTerm, selectedStatus, selectedDepartment, selectedTechnology, selectedYear, sortBy])

  function resetFilters() {
    setSearchTerm('')
    setSelectedStatus('All')
    setSelectedDepartment('All Departments')
    setSelectedTechnology('All Technologies')
    setSelectedYear('All Years')
    setSortBy('Newest')
  }

  return (
    <div className="app-shell projects-page">
      <Header />
      <main>
        <section className="knowledge-hero" aria-labelledby="projects-heading">
          <div className="knowledge-hero__glow" aria-hidden="true" />
          <div className="knowledge-hero__content">
            <span className="hero__eyebrow">Shared project experience</span>
            <h1 id="projects-heading">Projects</h1>
            <p>Explore previous project experience, reusable knowledge and lessons learned from across the organization.</p>
          </div>
        </section>

        <div className="knowledge-content">
          <ResourceControls
            ariaLabel="Project filters"
            searchId="project-search"
            searchLabel="Search projects"
            searchPlaceholder="Search projects, customers, technologies, tags or managers..."
            searchTerm={searchTerm}
            filterLabel="Status"
            categories={projectStatusOptions}
            selectedCategory={selectedStatus}
            selectFilters={[
              {
                id: 'project-department',
                label: 'Department',
                value: selectedDepartment,
                options: projectDepartmentOptions,
                onChange: (value) => setSelectedDepartment(value as ProjectDepartmentFilter),
              },
              {
                id: 'project-technology',
                label: 'Technology',
                value: selectedTechnology,
                options: projectTechnologyOptions,
                onChange: (value) => setSelectedTechnology(value as ProjectTechnologyFilter),
              },
              {
                id: 'project-year',
                label: 'Year',
                value: selectedYear,
                options: projectYearOptions,
                onChange: (value) => setSelectedYear(value as ProjectYearFilter),
              },
              {
                id: 'project-sort',
                label: 'Sort by',
                value: sortBy,
                options: sortOptions,
                onChange: (value) => setSortBy(value as ProjectSort),
              },
            ]}
            onSearchChange={setSearchTerm}
            onCategoryChange={(value) => setSelectedStatus(value as ProjectStatusFilter)}
          />

          <section className="knowledge-results" aria-labelledby="project-results-heading" aria-live="polite">
            <div className="knowledge-results__heading">
              <div>
                <span className="eyebrow">Experience library</span>
                <h2 id="project-results-heading">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                </h2>
              </div>
              <p>Discover reusable knowledge from completed and active work</p>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="knowledge-grid" data-testid="project-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
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
                <h2>No projects found</h2>
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
