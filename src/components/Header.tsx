import { Link, NavLink } from 'react-router-dom'

const routeItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'Knowledge', to: '/knowledge', end: false },
  { label: 'Templates', to: '/templates', end: false },
  { label: 'Projects', to: '/projects', end: false },
]

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/" aria-label="Company Knowledge Hub home">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 28 28" role="img">
              <path d="M6 5.5h6.25A3.75 3.75 0 0 1 16 9.25V23H9.75A3.75 3.75 0 0 1 6 19.25V5.5Z" />
              <path d="M22 5.5h-3.25A3.75 3.75 0 0 0 15 9.25V23h3.25A3.75 3.75 0 0 0 22 19.25V5.5Z" />
              <path d="M10 10h2.5M10 14h2.5" />
            </svg>
          </span>
          <span>Company Knowledge Hub</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="main-nav">
            {routeItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'main-nav__link main-nav__link--active' : 'main-nav__link'
                  }
                  to={item.to}
                  end={item.end}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="profile" aria-label="Signed in as Alex Morgan">
          <span className="profile__avatar" aria-hidden="true">AM</span>
          <span className="profile__name">Alex Morgan</span>
        </div>
      </div>
    </header>
  )
}
