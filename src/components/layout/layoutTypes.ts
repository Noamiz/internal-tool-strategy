import type { ReactNode } from 'react'

export interface InspectorAction {
  label: string
  onClick?: () => void
  disabled?: boolean
}

export interface InspectorConfig {
  title: string
  subtitle?: string
  content: ReactNode
  actions?: InspectorAction[]
  onRequestClose?: () => void
}

export interface LayoutContextValue {
  openInspector: (config: InspectorConfig) => void
  closeInspector: () => void
}

