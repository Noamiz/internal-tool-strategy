import { NavLink } from 'react-router-dom'

interface NavItem {
  label: string
  to: string
  icon: string
  end?: boolean
}

const navigation: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: '🏠', end: true },
  { label: 'Users', to: '/users', icon: '👥' },
  { label: 'Data Explorer', to: '/data-explorer', icon: '📊' },
  { label: 'System', to: '/system', icon: '🛠' },
  { label: 'Settings', to: '/settings', icon: '⚙️' },
]

interface SidebarProps {
  collapsed: boolean
  onToggleSidebar: () => void
}

export function Sidebar({ collapsed, onToggleSidebar }: SidebarProps) {
  return (
    <aside className={['sidebar', collapsed ? 'sidebar--collapsed' : ''].join(' ').trim()}>
      <div className="sidebar__brand">
        <span className="sidebar__brand-badge">XS</span>
        <div>
          <p className="sidebar__brand-label">E2E Experience</p>
          <strong className="sidebar__link-label">Internal Tool</strong>
        </div>
      </div>
      <div className="sidebar__nav">
        {navigation.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) => ['sidebar__link', isActive ? 'sidebar__link--active' : ''].join(' ').trim()}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="sidebar__link-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
      <button type="button" className="sidebar__toggle" onClick={onToggleSidebar}>
        {collapsed ? 'Expand' : 'Collapse'}
      </button>
    </aside>
  )
}

