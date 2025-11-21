import { useEffect, useState } from 'react'
import type { User } from 'common-strategy'
import { fetchUsersMock } from '@/api/users'

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

export function useUsers(): UseUsersState {
  const [state, setState] = useState<UseUsersState>(initialState)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const result = await fetchUsersMock()

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

