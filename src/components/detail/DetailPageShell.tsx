import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../Footer'
import { Header } from '../Header'

interface DetailPageShellProps {
  backTo: string
  backLabel: string
  eyebrow: string
  title: string
  description: string
  badges?: ReactNode
  actions?: ReactNode
  children: ReactNode
}

export function DetailPageShell({
  backTo,
  backLabel,
  eyebrow,
  title,
  description,
  badges,
  actions,
  children,
}: DetailPageShellProps) {
  return (
    <div className="app-shell">
      <Header />
      <main className="detail-page">
        <div className="detail-page__container">
          <Link className="detail-back" to={backTo}>
            <span aria-hidden="true">←</span> {backLabel}
          </Link>

          <header className="detail-hero">
            <div className="detail-hero__content">
              <span className="detail-hero__eyebrow">{eyebrow}</span>
              {badges && <div className="detail-hero__badges">{badges}</div>}
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            {actions && <div className="detail-hero__actions">{actions}</div>}
          </header>

          <div className="detail-page__body">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
