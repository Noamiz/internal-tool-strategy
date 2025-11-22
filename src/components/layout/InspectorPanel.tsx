import { useId } from 'react'
import type { InspectorConfig } from '@/components/layout/layoutTypes'

interface InspectorPanelProps {
  isOpen: boolean
  config: InspectorConfig | null
  onClose: () => void
}

export function InspectorPanel({ isOpen, config, onClose }: InspectorPanelProps) {
  const titleId = useId()
  const subtitleId = `${titleId}-subtitle`

  return (
    <aside
      className={['inspector', isOpen && config ? 'inspector--open' : ''].join(' ').trim()}
      aria-hidden={!isOpen}
      role="complementary"
      aria-labelledby={config ? titleId : undefined}
      aria-describedby={config?.subtitle ? subtitleId : undefined}
    >
      {config && (
        <>
          <div className="inspector__header">
            <div>
              <p className="page-eyebrow">Inspector</p>
              <h3 className="inspector__title" id={titleId}>
                {config.title}
              </h3>
              {config.subtitle && (
                <p className="inspector__subtitle" id={subtitleId}>
                  {config.subtitle}
                </p>
              )}
            </div>
            <button type="button" className="icon-button icon-button--ghost" aria-label="Close inspector" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="inspector__body">{config.content}</div>
          {config.actions && config.actions.length > 0 && (
            <div className="inspector__actions">
              {config.actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="button button--ghost"
                  onClick={action.onClick}
                  disabled={action.disabled}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </aside>
  )
}

