import { Link } from 'react-router-dom'
import { knowledgeResources } from '../../data/knowledgeData'

interface RelatedKnowledgeProps {
  knowledgeIds: string[]
}

export function RelatedKnowledge({ knowledgeIds }: RelatedKnowledgeProps) {
  const relatedResources = knowledgeIds
    .map((id) => knowledgeResources.find((resource) => resource.id === id))
    .filter((resource) => resource !== undefined)

  if (relatedResources.length === 0) {
    return <p className="detail-muted">No related knowledge has been linked yet.</p>
  }

  return (
    <div className="related-list">
      {relatedResources.map((resource) => (
        <Link className="related-card" to={`/knowledge/${resource.id}`} key={resource.id}>
          <div>
            <span>{resource.type} · {resource.department}</span>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
          </div>
          <span className="related-card__arrow" aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  )
}
