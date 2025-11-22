import type { User } from 'common-strategy'

interface UserInspectorProps {
  user: User
}

export function UserInspector({ user }: UserInspectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      <div>
        <p className="page-eyebrow">Email</p>
        <p style={{ margin: 0, fontWeight: 600 }}>{user.email}</p>
      </div>
      <div>
        <p className="page-eyebrow">Status</p>
        <span className={user.isActive ? 'badge badge--success' : 'badge badge--muted'}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div>
        <p className="page-eyebrow">Identifiers</p>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{user.id}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--space-md)' }}>
        <div>
          <p className="page-eyebrow">Created</p>
          <p style={{ margin: 0 }}>{new Date(user.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="page-eyebrow">Updated</p>
          <p style={{ margin: 0 }}>{new Date(user.updatedAt).toLocaleString()}</p>
        </div>
      </div>
      <div>
        <p className="page-eyebrow">Notes</p>
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
          Detailed activity, permissions, and audit history will appear here once server data is wired up.
        </p>
      </div>
    </div>
  )
}

