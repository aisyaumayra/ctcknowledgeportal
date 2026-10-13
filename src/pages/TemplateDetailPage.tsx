import { useParams } from 'react-router-dom'
import { DetailPageShell } from '../components/detail/DetailPageShell'
import { DetailSection } from '../components/detail/DetailSection'
import { MetadataGrid } from '../components/detail/MetadataGrid'
import { ResourceNotFound } from '../components/detail/ResourceNotFound'
import { templates } from '../data/templateData'
import { formatDisplayDate } from '../utils/date'

export function TemplateDetailPage() {
  const { id } = useParams()
  const template = templates.find((item) => item.id === id)

  if (!template) {
    return <ResourceNotFound resourceType="Template library" returnTo="/templates" returnLabel="Back to Templates" />
  }

  return (
    <DetailPageShell
      backTo="/templates"
      backLabel="Back to Templates"
      eyebrow="Approved template"
      title={template.name}
      description={template.description}
      badges={(
        <>
          <span className="detail-badge detail-badge--orange">{template.fileType}</span>
          <span className={`detail-badge detail-status detail-status--${template.status.toLowerCase()}`}>{template.status}</span>
        </>
      )}
      actions={<button className="primary-action primary-action--orange" type="button">Use Template</button>}
    >
      <div className="detail-main">
        <DetailSection title="When to use this template" eyebrow="Usage guidance">
          <ul className="guidance-list">
            {template.usageGuidance.map((guidance) => (
              <li key={guidance}><span aria-hidden="true">✓</span>{guidance}</li>
            ))}
          </ul>
        </DetailSection>

        <DetailSection title="Template file" eyebrow="Approved document">
          <div className="document-card document-card--template">
            <span className="document-card__icon" aria-hidden="true">
              <svg viewBox="0 0 28 28"><path d="M7 3.5h9l5 5v16H7v-21Z" /><path d="M16 3.5v5h5M10.5 14h7M10.5 18h5" /></svg>
            </span>
            <div>
              <h3>{template.name}</h3>
              <p>{template.fileType} · Version {template.version} · {template.status}</p>
            </div>
            <button type="button">Use Template</button>
          </div>
          <p className="future-action-note">A document creation option can be added here in a future release.</p>
        </DetailSection>
      </div>

      <aside className="detail-sidebar">
        <DetailSection title="Template details">
          <MetadataGrid items={[
            { label: 'Department', value: template.department },
            { label: 'Category', value: template.category },
            { label: 'File type', value: template.fileType },
            { label: 'Version', value: `v${template.version}` },
            { label: 'Owner', value: template.owner },
            { label: 'Last updated', value: <time dateTime={template.updatedAt}>{formatDisplayDate(template.updatedAt)}</time> },
            { label: 'Status', value: template.status },
          ]} />
        </DetailSection>
        <DetailSection title="Tags">
          <ul className="detail-tags" aria-label="Tags">
            {template.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </DetailSection>
      </aside>
    </DetailPageShell>
  )
}
