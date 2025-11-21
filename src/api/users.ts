import type { Result, User } from 'common-strategy'
import { getJson } from '@/api/client'

export interface UsersListResponse {
  items: User[]
}

const MOCK_USERS: User[] = [
  {
    id: 'user_001',
    email: 'operations@example.com',
    displayName: 'Operations Owner',
    isActive: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 120,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: 'user_002',
    email: 'editor@example.com',
    displayName: 'Content Editor',
    isActive: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: 'user_003',
    email: 'viewer@example.com',
    isActive: false,
    displayName: 'Read Only',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 200,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
]

export async function fetchUsersMock(): Promise<Result<UsersListResponse>> {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return { ok: true, data: { items: MOCK_USERS } }
}

/**
 * TODO: Replace fetchUsersMock with this function once server-strategy exposes /admin/users.
 */
export async function fetchUsers(): Promise<Result<UsersListResponse>> {
  return getJson<UsersListResponse>('/admin/users')
}

