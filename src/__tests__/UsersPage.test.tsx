import { BrowserRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import type { UsersListResponse } from '@/api/users'
import { UsersPage } from '@/features/users/UsersPage'
import { fetchUsersMock } from '@/api/users'

vi.mock('@/api/users', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/api/users')>()
  return {
    ...actual,
    fetchUsersMock: vi.fn(),
  }
})

const mockFetchUsers = vi.mocked(fetchUsersMock)

describe('UsersPage', () => {
  it('renders users from the mock API response', async () => {
    const response: UsersListResponse = {
      items: [
        {
          id: 'test-1',
          email: 'jane@example.com',
          displayName: 'Jane Example',
          isActive: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          id: 'test-2',
          email: 'john@example.com',
          displayName: 'John Example',
          isActive: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
    }

    mockFetchUsers.mockResolvedValue({ ok: true, data: response })

    render(
      <BrowserRouter>
        <UsersPage />
      </BrowserRouter>,
    )

    expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument()
    expect(screen.getByText(/loading users/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('jane@example.com')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })
  })
})

