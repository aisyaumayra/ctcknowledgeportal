import { Link } from 'react-router-dom'
import { getProjectRelevantDate } from '../data/projectData'
import type { ProjectResource } from '../types/project'

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

interface ProjectCardProps {
  project: ProjectResource
}

export function ProjectCard({ project }: ProjectCardProps) {
  const relevantDate = getProjectRelevantDate(project)
  const formattedDate = dateFormatter.format(new Date(`${relevantDate}T00:00:00`))

  return (
    <article className="knowledge-card project-card">
      <div className="knowledge-card__topline">
        <span className={`project-card__status project-card__status--${project.status.toLowerCase()}`}>
          {project.status}
        </span>
        <span className="project-card__department">{project.department}</span>
      </div>

      <div className="knowledge-card__body project-card__body">
        <span className="project-card__customer">{project.customer}</span>
        <h2>{project.name}</h2>
        <p>{project.description}</p>

        <div className="project-card__technologies">
          <span>Technologies</span>
          <ul aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>

        <div className="project-card__knowledge">
          <div className="project-card__knowledge-heading">
            <span className="project-card__knowledge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 4.5h6a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5Z" />
                <path d="M16 6.5h.5a2.5 2.5 0 0 1 2.5 2.5V20h-5V7.5" />
              </svg>
            </span>
            <span>Reusable knowledge</span>
          </div>
          <ul className="project-card__highlights" aria-label="Knowledge highlights">
            {project.knowledgeHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <dl className="project-card__counts">
            <div>
              <dt>Knowledge items</dt>
              <dd>{project.knowledgeItemCount}</dd>
            </div>
            <div>
              <dt>Reusable documents</dt>
              <dd>{project.reusableDocumentCount}</dd>
            </div>
          </dl>
        </div>

        <dl className="project-card__details">
          <div>
            <dt>Project manager</dt>
            <dd>{project.projectManager}</dd>
          </div>
          <div>
            <dt>{project.status === 'Completed' ? 'Completed' : 'Started'}</dt>
            <dd><time dateTime={relevantDate}>{formattedDate}</time></dd>
          </div>
        </dl>
      </div>

      <div className="knowledge-card__footer project-card__footer">
        <span>{project.tags.join(' · ')}</span>
        <Link className="resource-action" to={`/projects/${project.id}`} aria-label={`View Project: ${project.name}`}>
          View Project <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
