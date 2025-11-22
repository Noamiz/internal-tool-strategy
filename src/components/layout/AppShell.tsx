import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AiAssistantPanel } from '@/components/ai/AiAssistantPanel'
import { CommandPalette } from '@/components/command-palette/CommandPalette'
import { InspectorPanel } from '@/components/layout/InspectorPanel'
import type { InspectorConfig, LayoutContextValue } from '@/components/layout/layoutTypes'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/users': 'Users',
  '/data-explorer': 'Data Explorer',
  '/system': 'System',
  '/settings': 'Settings',
}

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [inspectorConfig, setInspectorConfig] = useState<InspectorConfig | null>(null)
  const [isInspectorOpen, setInspectorOpen] = useState(false)
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [isAiAssistantOpen, setAiAssistantOpen] = useState(false)
  const pageTitle = routeTitles[location.pathname] ?? 'Workspace'

  const openInspector = useCallback((config: InspectorConfig) => {
    setInspectorConfig(config)
    setInspectorOpen(true)
  }, [])

  const closeInspector = useCallback(() => {
    setInspectorConfig(null)
    setInspectorOpen(false)
  }, [])

  const handleInspectorDismiss = useCallback(() => {
    inspectorConfig?.onRequestClose?.()
    setInspectorConfig(null)
    setInspectorOpen(false)
  }, [inspectorConfig])

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const commands = useMemo(
    () => [
      {
        id: 'go-dashboard',
        label: 'Go to Dashboard',
        description: 'Return to the overview landing page',
        action: () => navigate('/'),
      },
      {
        id: 'go-users',
        label: 'Go to Users',
        description: 'Inspect internal users and relationships',
        action: () => navigate('/users'),
      },
      {
        id: 'go-system',
        label: 'Go to System',
        description: 'Jump to system health tools',
        action: () => navigate('/system'),
      },
      {
        id: 'open-ai',
        label: 'Open AI Assistant',
        description: 'Launch the assistant side panel',
        action: () => setAiAssistantOpen(true),
      },
      {
        id: 'toggle-sidebar',
        label: 'Toggle Sidebar',
        description: 'Collapse or expand navigation',
        action: toggleSidebar,
      },
    ],
    [navigate, toggleSidebar],
  )

  const outletContext = useMemo<LayoutContextValue>(
    () => ({
      openInspector,
      closeInspector,
    }),
    [closeInspector, openInspector],
  )

  return (
    <div className="app-shell">
      <TopBar
        pageTitle={pageTitle}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className={['app-shell__body', !isInspectorOpen ? 'app-shell__body--inspector-hidden' : ''].join(' ').trim()}>
        <Sidebar collapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />
        <main className="app-shell__content">
          <Outlet context={outletContext} />
        </main>
        <InspectorPanel isOpen={isInspectorOpen} config={inspectorConfig} onClose={handleInspectorDismiss} />
      </div>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        commands={commands.map((command) => ({
          ...command,
          action: () => {
            command.action()
            setCommandPaletteOpen(false)
          },
        }))}
      />
      <AiAssistantPanel isOpen={isAiAssistantOpen} onClose={() => setAiAssistantOpen(false)} />
    </div>
  )
}

