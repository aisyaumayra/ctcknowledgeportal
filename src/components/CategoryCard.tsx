import { Link } from 'react-router-dom'
import type { CategoryIcon, KnowledgeCategory } from '../types/resource'

const iconPaths: Record<CategoryIcon, React.ReactNode> = {
  knowledge: (
    <>
      <path d="M5.5 4.5h7.25A3.25 3.25 0 0 1 16 7.75V22H8.75a3.25 3.25 0 0 1-3.25-3.25V4.5Z" />
      <path d="M18.5 6.5h.75A3.25 3.25 0 0 1 22.5 9.75V22H16V7.75" />
      <path d="M9.5 9h3M9.5 13h3" />
    </>
  ),
  templates: (
    <>
      <path d="M7 3.5h8l5 5v14H7v-19Z" />
      <path d="M15 3.5v5h5M10.5 13h6M10.5 17h6" />
    </>
  ),
  projects: (
    <>
      <path d="M3.5 8.5h8l2-3h7v15h-17v-12Z" />
      <path d="M3.5 10.5h17M9 15.5h6" />
    </>
  ),
}

interface CategoryCardProps {
  category: KnowledgeCategory
}

export function CategoryCard({ category }: CategoryCardProps) {
  const route = category.id === 'knowledge'
    ? '/knowledge'
    : category.id === 'templates'
      ? '/templates'
      : category.id === 'projects'
        ? '/projects'
        : null

  return (
    <article className={`category-card category-card--${category.id}`} id={category.id}>
      <div className="category-card__topline">
        <span className="category-card__icon" aria-hidden="true">
          <svg viewBox="0 0 26 26">{iconPaths[category.id]}</svg>
        </span>
        <span className="category-card__count">3 collections</span>
      </div>
      <h2>{category.title}</h2>
      <p>{category.description}</p>
      <ul>
        {category.items.map((item) => (
          <li key={item}>
            <span aria-hidden="true">→</span>
            {item}
          </li>
        ))}
      </ul>
      {route ? (
        <Link className="category-card__action" to={route}>
          {category.actionLabel}
          <span aria-hidden="true">↗</span>
        </Link>
      ) : (
        <a className="category-card__action" href={`#${category.id}`}>
          {category.actionLabel}
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  )
}
