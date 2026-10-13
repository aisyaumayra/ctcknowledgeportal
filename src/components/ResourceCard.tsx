import { Link } from 'react-router-dom'
import type { KnowledgeResource } from '../types/resource'

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

interface ResourceCardProps {
  resource: KnowledgeResource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const formattedDate = dateFormatter.format(new Date(`${resource.updatedAt}T00:00:00`))

  return (
    <article className="knowledge-card">
      <div className="knowledge-card__topline">
        <span className={`knowledge-card__type knowledge-card__type--${resource.type.toLowerCase().replaceAll(' ', '-')}`}>
          {resource.type}
        </span>
        <span className="knowledge-card__department">{resource.department}</span>
      </div>

      <div className="knowledge-card__body">
        <h2>{resource.title}</h2>
        <p>{resource.description}</p>
        <ul className="knowledge-card__tags" aria-label="Tags">
          {resource.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <div className="knowledge-card__footer">
        <span>
          Updated <time dateTime={resource.updatedAt}>{formattedDate}</time>
        </span>
        <Link className="resource-action" to={`/knowledge/${resource.id}`} aria-label={`View ${resource.title}`}>
          View <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
