import { Link, useParams } from 'react-router-dom'
import { DetailPageShell } from '../components/detail/DetailPageShell'
import { DetailSection } from '../components/detail/DetailSection'
import { MetadataGrid } from '../components/detail/MetadataGrid'
import { RelatedKnowledge } from '../components/detail/RelatedKnowledge'
import { ResourceNotFound } from '../components/detail/ResourceNotFound'
import { projects } from '../data/projectData'
import { templates } from '../data/templateData'
import { formatDisplayDate } from '../utils/date'

export function ProjectDetailPage() {
  const { id } = useParams()
  const project = projects.find((item) => item.id === id)

  if (!project) {
    return <ResourceNotFound resourceType="Project library" returnTo="/projects" returnLabel="Back to Projects" />
  }

  return (
    <DetailPageShell
      backTo="/projects"
      backLabel="Back to Projects"
      eyebrow="Project experience"
      title={project.name}
      description={project.description}
      badges={(
        <>
          <span className="detail-badge detail-badge--violet">{project.status}</span>
          <span className="detail-badge">{project.customer}</span>
        </>
      )}
    >
      <div className="detail-main">
        <DetailSection title="Project Overview" eyebrow="Context">
          <div className="prose-content">
            {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="project-detail-counts">
            <div><strong>{project.knowledgeItemCount}</strong><span>Knowledge items</span></div>
            <div><strong>{project.reusableDocumentCount}</strong><span>Reusable documents</span></div>
          </div>
        </DetailSection>

        <DetailSection title="Key Deliverables" eyebrow="Project outcomes">
          <ul className="detail-check-list">
            {project.keyDeliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
          </ul>
        </DetailSection>

        <DetailSection title="Lessons Learned" eyebrow="Reusable experience">
          <ol className="lessons-list">
            {project.lessonsLearned.map((lesson) => <li key={lesson}>{lesson}</li>)}
          </ol>
        </DetailSection>

        <DetailSection title="Challenges & Solutions" eyebrow="What we solved">
          <div className="challenge-list">
            {project.challengesAndSolutions.map((item) => (
              <article key={item.challenge}>
                <div><span>Challenge</span><p>{item.challenge}</p></div>
                <div><span>Solution</span><p>{item.solution}</p></div>
              </article>
            ))}
          </div>
        </DetailSection>

        <DetailSection title="Related Knowledge" eyebrow="Continue exploring">
          <RelatedKnowledge knowledgeIds={project.relatedKnowledgeIds} />
        </DetailSection>

        <DetailSection title="Reusable Documents" eyebrow="Featured resources">
          <div className="reusable-document-list">
            {project.featuredReusableDocuments.map((document) => {
              if (document.kind === 'template') {
                const template = templates.find((item) => item.id === document.templateId)
                if (!template) return null

                return (
                  <Link className="reusable-document" to={`/templates/${template.id}`} key={`template-${template.id}`}>
                    <span className="reusable-document__type">{template.fileType}</span>
                    <div><h3>{template.name}</h3><p>Approved template · Version {template.version}</p></div>
                    <span aria-hidden="true">→</span>
                  </Link>
                )
              }

              return (
                <article className="reusable-document" key={document.id}>
                  <span className="reusable-document__type">{document.fileType}</span>
                  <div><h3>{document.name}</h3><p>{document.description}</p></div>
                </article>
              )
            })}
          </div>
        </DetailSection>
      </div>

      <aside className="detail-sidebar">
        <DetailSection title="Project details">
          <MetadataGrid items={[
            { label: 'Customer', value: project.customer },
            { label: 'Department', value: project.department },
            { label: 'Project manager', value: project.projectManager },
            { label: 'Status', value: project.status },
            { label: 'Start date', value: <time dateTime={project.startDate}>{formatDisplayDate(project.startDate)}</time> },
            { label: 'Completion date', value: project.completionDate ? <time dateTime={project.completionDate}>{formatDisplayDate(project.completionDate)}</time> : 'In progress' },
          ]} />
        </DetailSection>
        <DetailSection title="Technologies">
          <ul className="detail-tags detail-tags--violet" aria-label="Technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </DetailSection>
        <DetailSection title="Tags">
          <ul className="detail-tags" aria-label="Tags">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </DetailSection>
      </aside>
    </DetailPageShell>
  )
}
