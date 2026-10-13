import type { Resource } from '../types/resource'
import { ResourceItem } from './ResourceItem'

interface RecentlyAddedProps {
  resources: Resource[]
}

export function RecentlyAdded({ resources }: RecentlyAddedProps) {
  return (
    <section className="recent" aria-labelledby="recent-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Stay up to date</span>
          <h2 id="recent-heading">Recently Added</h2>
        </div>
        <button className="text-button" type="button">
          View all resources <span aria-hidden="true">→</span>
        </button>
      </div>
      <div className="resource-list">
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  )
}
