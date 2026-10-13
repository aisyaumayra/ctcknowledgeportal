import { Link } from 'react-router-dom'
import type { GlobalSearchResult } from '../types/search'
import { formatDisplayDate } from '../utils/date'

interface SearchResultCardProps {
  result: GlobalSearchResult
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <article className={`search-result-card search-result-card--${result.type.toLowerCase()}`}>
      <div className="search-result-card__main">
        <div className="search-result-card__topline">
          <span className="search-result-card__type">{result.type}</span>
          <span className="search-result-card__metadata">
            {result.metadata.join(' • ')}
          </span>
        </div>
        <h2>
          <Link to={result.href}>{result.title}</Link>
        </h2>
        <p>{result.description}</p>
        <ul className="search-result-card__tags" aria-label={`${result.title} tags`}>
          {result.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>

      <div className="search-result-card__aside">
        <span>Updated {formatDisplayDate(result.updatedAt)}</span>
        <Link className="search-result-card__action" to={result.href}>
          View {result.type} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
