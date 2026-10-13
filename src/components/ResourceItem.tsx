import type { Resource } from '../types/resource'

interface ResourceItemProps {
  resource: Resource
}

export function ResourceItem({ resource }: ResourceItemProps) {
  return (
    <article className="resource-item">
      <div className="resource-item__file" aria-hidden="true">
        <svg viewBox="0 0 28 28">
          <path d="M7 3.5h9l5 5v16H7v-21Z" />
          <path d="M16 3.5v5h5" />
        </svg>
        <span>{resource.fileType}</span>
      </div>
      <div className="resource-item__content">
        <div className="resource-item__meta">
          <span>{resource.category}</span>
          <span aria-hidden="true">•</span>
          <span>{resource.department}</span>
        </div>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
      </div>
      <div className="resource-item__aside">
        <time>{resource.updatedLabel}</time>
        <button type="button" aria-label={`Open ${resource.title}`}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}
