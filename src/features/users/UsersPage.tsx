import { useEffect, useState } from 'react'
import type { User } from 'common-strategy'
import { useLayout } from '@/components/layout/useLayout'
import { UsersTable } from '@/features/users/UsersTable'
import { UserInspector } from '@/features/users/UserInspector'
import { useUsers } from '@/hooks/useUsers'

export function UsersPage() {
  const { users, loading, error } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { openInspector, closeInspector } = useLayout()

  useEffect(() => {
    if (selectedUser) {
      openInspector({
        title: selectedUser.displayName ?? 'User details',
        subtitle: selectedUser.email,
        content: <UserInspector user={selectedUser} />,
        actions: [
          { label: 'Edit user (soon)', disabled: true },
          { label: 'View logs (soon)', disabled: true },
        ],
        onRequestClose: () => setSelectedUser(null),
      })
    } else {
      closeInspector()
    }
  }, [closeInspector, openInspector, selectedUser])

  useEffect(() => {
    return () => {
      closeInspector()
    }
  }, [closeInspector])

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Operations</p>
          <h2 className="page-title">Users</h2>
          <p className="page-description">Inspect and manage user access from server-strategy.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="button button--ghost" type="button" disabled>
            Import CSV (soon)
          </button>
          <button className="button button--primary" type="button" disabled>
            + New User
          </button>
        </div>
      </header>
      {loading && (
        <>
          {/* TODO (E2E-XS v1 polish): replace this placeholder message with a shared skeleton component so all tables share the same shimmer loader. */}
          <p>Loading users...</p>
        </>
      )}
      {error && !loading && <p className="error">{error}</p>}
      {!loading && !error && (
        <UsersTable
          users={users}
          selectedUserId={selectedUser ? selectedUser.id : null}
          onSelectUser={(user) => setSelectedUser((current) => (current?.id === user.id ? null : user))}
        />
      )}
    </section>
  )
}

