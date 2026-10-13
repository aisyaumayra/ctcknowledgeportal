import { Link } from 'react-router-dom'
import type { TemplateResource } from '../types/template'

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

interface TemplateCardProps {
  template: TemplateResource
}

export function TemplateCard({ template }: TemplateCardProps) {
  const formattedDate = dateFormatter.format(new Date(`${template.updatedAt}T00:00:00`))

  return (
    <article className="knowledge-card template-card">
      <div className="knowledge-card__topline">
        <div className="template-card__file">
          <span className="template-card__file-icon" aria-hidden="true">
            <svg viewBox="0 0 28 28">
              <path d="M7 3.5h9l5 5v16H7v-21Z" />
              <path d="M16 3.5v5h5M10.5 14h7M10.5 18h5" />
            </svg>
          </span>
          <span>{template.fileType}</span>
        </div>
        <span className={`template-card__status template-card__status--${template.status.toLowerCase()}`}>
          {template.status}
        </span>
      </div>

      <div className="knowledge-card__body template-card__body">
        <div className="template-card__context">
          <span>{template.category}</span>
          <span aria-hidden="true">•</span>
          <span>{template.department}</span>
        </div>
        <h2>{template.name}</h2>
        <p>{template.description}</p>
        <ul className="knowledge-card__tags" aria-label="Tags">
          {template.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <dl className="template-card__details">
          <div>
            <dt>Version</dt>
            <dd>v{template.version}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{template.owner}</dd>
          </div>
        </dl>
      </div>

      <div className="knowledge-card__footer">
        <span>
          Updated <time dateTime={template.updatedAt}>{formattedDate}</time>
        </span>
        <Link className="resource-action" to={`/templates/${template.id}`} aria-label={`View Template: ${template.name}`}>
          View Template <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
