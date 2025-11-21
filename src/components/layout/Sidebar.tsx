import { NavLink } from 'react-router-dom'

interface NavItem {
  label: string
  to: string
  isFuture?: boolean
  end?: boolean
}

const navigation: NavItem[] = [
  { label: 'Dashboard', to: '/', end: true },
  { label: 'Users', to: '/users' },
  { label: 'Data Explorer', to: '/data-explorer', isFuture: true },
  { label: 'System', to: '/system', isFuture: true },
]

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-initials">E2E</span>
        <span className="sidebar__brand-name">Internal Tool</span>
      </div>
      <nav className="sidebar__nav">
        {navigation.map((item) =>
          item.isFuture ? (
            <div key={item.label} className="sidebar__link sidebar__link--disabled">
              {item.label}
              <span className="sidebar__badge">Soon</span>
            </div>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                ['sidebar__link', isActive ? 'sidebar__link--active' : ''].join(' ').trim()
              }
              end={item.end}
            >
              {item.label}
            </NavLink>
          ),
        )}
      </nav>
    </div>
  )
}

