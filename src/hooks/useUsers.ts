import { useEffect, useState } from 'react'
import type { User } from 'common-strategy'
import { fetchUsers, fetchUsersMock } from '@/api/users'

interface UseUsersState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UseUsersState = {
  users: [],
  loading: true,
  error: null,
}

const SHOULD_USE_MOCK_USERS = import.meta.env.VITE_USE_MOCK_USERS === 'true'

export function useUsers(): UseUsersState {
  const [state, setState] = useState<UseUsersState>(initialState)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const result = SHOULD_USE_MOCK_USERS ? await fetchUsersMock() : await fetchUsers()

        if (!isMounted) {
          return
        }

        if (result.ok) {
          setState({ users: result.data.items, loading: false, error: null })
        } else {
          setState({ users: [], loading: false, error: result.error.message })
        }
      } catch (error) {
        if (!isMounted) {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Unable to load users. Please try again later.'
        setState({ users: [], loading: false, error: message })
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}

