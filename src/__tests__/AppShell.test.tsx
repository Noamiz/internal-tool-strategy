import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppShell } from '@/components/layout/AppShell'

function renderWithShell(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<div>Home Content</div>} />
          <Route path="/users" element={<div>Users Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('AppShell', () => {
  it('renders navigation, top bar, and routed content', () => {
    renderWithShell()

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument()
    expect(screen.getByText('Home Content')).toBeInTheDocument()
    expect(screen.getByText('Internal Console')).toBeInTheDocument()
  })

  it('opens the command palette via button and keyboard shortcut', () => {
    renderWithShell()

    fireEvent.click(screen.getByText(/command/i))
    expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByPlaceholderText(/type a command/i)).not.toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'k', metaKey: true })
    expect(screen.getByPlaceholderText(/type a command/i)).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
  })

  it('opens and closes the AI assistant panel', () => {
    renderWithShell()

    fireEvent.click(screen.getByText(/ask ai/i))
    const panel = screen.getByText(/ai assistant/i).closest('aside')
    expect(panel).toHaveClass('ai-panel--open')

    fireEvent.click(screen.getByLabelText(/close ai assistant/i))
    expect(panel).not.toHaveClass('ai-panel--open')
  })
})

