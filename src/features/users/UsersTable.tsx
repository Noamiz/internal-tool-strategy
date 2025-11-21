import type { User } from 'common-strategy'

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Display name</th>
            <th>Active?</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.displayName ?? '—'}</td>
              <td>
                <span className={user.isActive ? 'badge badge--success' : 'badge badge--muted'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

