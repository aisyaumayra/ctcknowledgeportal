import { useNavigate } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { RecentlyAdded } from '../components/RecentlyAdded'
import { SearchBar } from '../components/SearchBar'
import { knowledgeCategories, recentlyAddedResources } from '../data/mockData'

export function HomePage() {
  const navigate = useNavigate()

  function handleSearch(query: string) {
    const normalizedQuery = query.trim().replace(/\s+/g, ' ')
    navigate(normalizedQuery ? `/search?q=${encodeURIComponent(normalizedQuery)}` : '/search')
  }

  return (
    <div id="home" className="app-shell">
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__glow hero__glow--one" aria-hidden="true" />
          <div className="hero__glow hero__glow--two" aria-hidden="true" />
          <div className="hero__content">
            <span className="hero__eyebrow">Your shared source of truth</span>
            <h1 id="hero-heading">Find company knowledge</h1>
            <p>
              Search trusted resources, proven practices, and reusable work from across the company.
            </p>
            <SearchBar onSearch={handleSearch} />
            <p className="hero__hint">
              <span>Popular:</span> onboarding, project checklist, brand template
            </p>
          </div>
        </section>

        <div className="page-content">
          <section className="category-section" aria-labelledby="category-heading">
            <div className="section-heading section-heading--categories">
              <div>
                <span className="eyebrow">Browse by collection</span>
                <h2 id="category-heading">Everything you need, in one place</h2>
              </div>
            </div>
            <div className="category-grid">
              {knowledgeCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>

          <RecentlyAdded resources={recentlyAddedResources} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
