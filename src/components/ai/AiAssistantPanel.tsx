import { useEffect, useRef, useState } from 'react'

type Sender = 'assistant' | 'user'

interface Message {
  id: string
  sender: Sender
  text: string
}

interface AiAssistantPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AiAssistantPanel({ isOpen, onClose }: AiAssistantPanelProps) {
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'intro',
      sender: 'assistant',
      text: 'This assistant will help interpret data, summarize audits, and surface insights once wired to backend intelligence.',
    },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (endRef.current && typeof endRef.current.scrollIntoView === 'function') {
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  function appendMessage(sender: Sender, text: string) {
    setMessages((prev) => [...prev, { id: `${sender}-${Date.now()}`, sender, text }])
  }

  function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!messageInput.trim()) {
      return
    }

    const userText = messageInput.trim()
    appendMessage('user', userText)
    setMessageInput('')

    setTimeout(() => {
      appendMessage('assistant', 'Acknowledged. AI responses will appear here in a future iteration.')
    }, 400)
  }

  return (
    <aside className={['ai-panel', isOpen ? 'ai-panel--open' : ''].join(' ').trim()} aria-hidden={!isOpen}>
      <div className="ai-panel__header">
        <div>
          <p className="page-eyebrow">Assistant</p>
          <h3 className="inspector__title">AI Assistant</h3>
        </div>
        <button type="button" className="icon-button icon-button--ghost" aria-label="Close AI assistant" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="ai-panel__messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={['ai-panel__message', message.sender === 'user' ? 'ai-panel__message--user' : '']
              .join(' ')
              .trim()}
          >
            <p style={{ margin: 0 }}>{message.text}</p>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form className="ai-panel__footer" onSubmit={handleSend}>
        <textarea
          className="ai-panel__input"
          rows={3}
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          placeholder="Ask about metrics, logs, or entities..."
        />
        <div style={{ marginTop: 'var(--space-sm)', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="button button--primary">
            Send
          </button>
        </div>
      </form>
    </aside>
  )
}

