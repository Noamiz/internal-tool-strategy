import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppShell } from '@/components/layout/AppShell'

describe('AppShell', () => {
  it('renders navigation and children', () => {
    render(
      <BrowserRouter>
        <AppShell>
          <div>Test Content</div>
        </AppShell>
      </BrowserRouter>,
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})

