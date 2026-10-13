export interface ResourceSelectFilter {
  id: string
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

interface ResourceControlsProps {
  ariaLabel: string
  searchId: string
  searchLabel: string
  searchPlaceholder: string
  searchTerm: string
  filterLabel?: string
  categories: readonly string[]
  selectedCategory: string
  selectFilters: readonly ResourceSelectFilter[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function ResourceControls({
  ariaLabel,
  searchId,
  searchLabel,
  searchPlaceholder,
  searchTerm,
  filterLabel = 'Category',
  categories,
  selectedCategory,
  selectFilters,
  onSearchChange,
  onCategoryChange,
}: ResourceControlsProps) {
  return (
    <section className="resource-controls" aria-label={ariaLabel}>
      <div className="resource-controls__search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.75" />
          <path d="m16 16 4 4" />
        </svg>
        <label className="sr-only" htmlFor={searchId}>{searchLabel}</label>
        <input
          id={searchId}
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
        />
      </div>

      <div className="resource-controls__filters">
        <div className="filter-group" aria-labelledby="category-filter-label">
          <span id="category-filter-label" className="filter-label">{filterLabel}</span>
          <div className="filter-chips">
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategory === category ? 'filter-chip filter-chip--active' : 'filter-chip'}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="resource-controls__selects">
          {selectFilters.map((filter) => (
            <label className="select-field" key={filter.id}>
              <span>{filter.label}</span>
              <select
                id={filter.id}
                aria-label={filter.label}
                value={filter.value}
                onChange={(event) => filter.onChange(event.target.value)}
              >
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
