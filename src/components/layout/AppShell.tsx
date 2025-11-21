import type { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <Sidebar />
      </aside>
      <div className="app-shell__main">
        <TopBar />
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  )
}

