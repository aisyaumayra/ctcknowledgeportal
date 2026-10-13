import type { ReactNode } from 'react'

interface DetailSectionProps {
  title: string
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function DetailSection({ title, eyebrow, children, className = '' }: DetailSectionProps) {
  return (
    <section className={`detail-section ${className}`.trim()}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      <div className="detail-section__content">{children}</div>
    </section>
  )
}
