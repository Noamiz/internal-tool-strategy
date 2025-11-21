import { UsersTable } from '@/features/users/UsersTable'
import { useUsers } from '@/hooks/useUsers'

export function UsersPage() {
  const { users, loading, error } = useUsers()

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Operations</p>
          <h2>Users</h2>
          <p className="page-description">Inspect and manage user access from server-strategy.</p>
        </div>
        <button className="button button--primary" type="button">
          + New User
        </button>
      </header>
      {loading && <p>Loading users...</p>}
      {error && !loading && <p className="error">{error}</p>}
      {!loading && !error && <UsersTable users={users} />}
    </section>
  )
}

