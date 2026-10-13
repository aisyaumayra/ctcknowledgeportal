import { Link } from 'react-router-dom'
import { Footer } from '../Footer'
import { Header } from '../Header'

interface ResourceNotFoundProps {
  resourceType: string
  returnTo: string
  returnLabel: string
}

export function ResourceNotFound({ resourceType, returnTo, returnLabel }: ResourceNotFoundProps) {
  return (
    <div className="app-shell">
      <Header />
      <main className="not-found-page">
        <div className="not-found-card">
          <span className="not-found-card__icon" aria-hidden="true">?</span>
          <span className="eyebrow">{resourceType}</span>
          <h1>Resource not found</h1>
          <p>The resource may have been moved, archived, or the address may be incorrect.</p>
          <Link to={returnTo}>← {returnLabel}</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
