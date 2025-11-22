import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface Command {
  id: string
  label: string
  description?: string
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  commands: Command[]
}

export function CommandPalette({ isOpen, onClose, commands }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setQuery('')
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, isOpen])

  const filteredCommands = useMemo(() => {
    const lowered = query.trim().toLowerCase()
    if (!lowered) {
      return commands
    }

    return commands.filter((command) => command.label.toLowerCase().includes(lowered))
  }, [commands, query])

  function handleCommandSelect(command: Command) {
    command.action()
    handleClose()
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const first = filteredCommands[0]
    if (first) {
      handleCommandSelect(first)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="command-palette" role="dialog" aria-modal="true">
      {/* TODO (accessibility): introduce optional focus trapping here so the command palette fully mirrors modal dialog behavior. */}
      <div className="command-palette__backdrop" onClick={handleClose} />
      <form className="command-palette__panel" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="command-palette__input"
          placeholder="Type a command or search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Command palette input"
        />
        <div className="command-palette__list">
          {filteredCommands.length === 0 && (
            <p style={{ padding: '1rem 1.25rem', color: 'var(--color-text-muted)' }}>No commands found.</p>
          )}
          {filteredCommands.map((command) => (
            <button
              key={command.id}
              type="button"
              className="command-palette__item"
              onClick={() => handleCommandSelect(command)}
            >
              <strong>{command.label}</strong>
              {command.description && (
                <span style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                  {command.description}
                </span>
              )}
            </button>
          ))}
        </div>
      </form>
    </div>
  )
}

