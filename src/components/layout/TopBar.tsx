interface TopBarProps {
  pageTitle: string
  onOpenCommandPalette: () => void
  onOpenAiAssistant: () => void
  onToggleSidebar: () => void
  isSidebarCollapsed: boolean
}

export function TopBar({
  pageTitle,
  onOpenCommandPalette,
  onOpenAiAssistant,
  onToggleSidebar,
  isSidebarCollapsed,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <button type="button" className="icon-button icon-button--ghost" aria-label="Toggle navigation" onClick={onToggleSidebar}>
          {isSidebarCollapsed ? '☰' : '≡'}
        </button>
        <div className="top-bar__title-group">
          <p className="top-bar__app-label">Internal Console</p>
          <h1 className="top-bar__page-title">{pageTitle}</h1>
        </div>
        <label className="top-bar__search">
          <span role="img" aria-hidden="true">
            🔍
          </span>
          <input type="search" placeholder="Search (soon)" />
        </label>
      </div>
      <div className="top-bar__actions">
        <button type="button" className="icon-button icon-button--ghost" onClick={onOpenCommandPalette}>
          ⌘K
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Command</span>
        </button>
        <button type="button" className="icon-button icon-button--ghost" aria-label="Notifications">
          🔔
        </button>
        <button type="button" className="icon-button icon-button--accent" onClick={onOpenAiAssistant}>
          ✦ Ask AI
        </button>
        <div className="top-bar__avatar">XS</div>
      </div>
    </header>
  )
}

