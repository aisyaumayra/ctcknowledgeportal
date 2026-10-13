import { useParams } from 'react-router-dom'
import { DetailPageShell } from '../components/detail/DetailPageShell'
import { DetailSection } from '../components/detail/DetailSection'
import { MetadataGrid } from '../components/detail/MetadataGrid'
import { RelatedKnowledge } from '../components/detail/RelatedKnowledge'
import { ResourceNotFound } from '../components/detail/ResourceNotFound'
import { knowledgeResources } from '../data/knowledgeData'
import { formatDisplayDate } from '../utils/date'

export function KnowledgeDetailPage() {
  const { id } = useParams()
  const resource = knowledgeResources.find((item) => item.id === id)

  if (!resource) {
    return <ResourceNotFound resourceType="Knowledge library" returnTo="/knowledge" returnLabel="Back to Knowledge" />
  }

  return (
    <DetailPageShell
      backTo="/knowledge"
      backLabel="Back to Knowledge"
      eyebrow="Knowledge resource"
      title={resource.title}
      description={resource.description}
      badges={(
        <>
          <span className="detail-badge detail-badge--teal">{resource.type}</span>
          <span className="detail-badge">{resource.department}</span>
        </>
      )}
      actions={<button className="primary-action" type="button">Open Document</button>}
    >
      <div className="detail-main">
        <DetailSection title="Summary" eyebrow="Company knowledge">
          <div className="prose-content">
            {resource.content.map((section) => (
              <div key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            ))}
          </div>
        </DetailSection>

        <DetailSection title="Attached resource" eyebrow="Document">
          <div className="document-card">
            <span className="document-card__icon" aria-hidden="true">
              <svg viewBox="0 0 28 28"><path d="M7 3.5h9l5 5v16H7v-21Z" /><path d="M16 3.5v5h5" /></svg>
            </span>
            <div>
              <h3>{resource.attachment.name}</h3>
              <p>{resource.attachment.fileType} · Version {resource.attachment.version} · {resource.attachment.sizeLabel}</p>
            </div>
            <button type="button">Open Document</button>
          </div>
        </DetailSection>

        <DetailSection title="Related knowledge" eyebrow="Continue exploring">
          <RelatedKnowledge knowledgeIds={resource.relatedKnowledgeIds} />
        </DetailSection>
      </div>

      <aside className="detail-sidebar">
        <DetailSection title="Resource details">
          <MetadataGrid items={[
            { label: 'Knowledge type', value: resource.type },
            { label: 'Department', value: resource.department },
            { label: 'Owner', value: resource.owner },
            { label: 'Last updated', value: <time dateTime={resource.updatedAt}>{formatDisplayDate(resource.updatedAt)}</time> },
          ]} />
        </DetailSection>
        <DetailSection title="Tags">
          <ul className="detail-tags" aria-label="Tags">
            {resource.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </DetailSection>
      </aside>
    </DetailPageShell>
  )
}
