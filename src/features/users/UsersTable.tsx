import type { User } from 'common-strategy'

interface UsersTableProps {
  users: User[]
  selectedUserId: string | null
  onSelectUser: (user: User) => void
}

export function UsersTable({ users, selectedUserId, onSelectUser }: UsersTableProps) {
  function handleRowInteraction(event: React.KeyboardEvent<HTMLTableRowElement>, user: User) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectUser(user)
    }
  }

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
          {users.map((user) => {
            const isSelected = selectedUserId === user.id
            return (
              <tr
                key={user.id}
                className={['table-row', isSelected ? 'table-row--selected' : ''].join(' ').trim()}
                onClick={() => onSelectUser(user)}
                onKeyDown={(event) => handleRowInteraction(event, user)}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
              >
                <td>{user.email}</td>
                <td>{user.displayName ?? '—'}</td>
                <td>
                  <span className={user.isActive ? 'badge badge--success' : 'badge badge--muted'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

