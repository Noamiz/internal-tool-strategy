interface PlaceholderPageProps {
  title: string
  eyebrow?: string
  description: string
}

export function PlaceholderPage({ title, eyebrow = 'Upcoming', description }: PlaceholderPageProps) {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">{eyebrow}</p>
          <h2 className="page-title">{title}</h2>
          <p className="page-description">{description}</p>
        </div>
      </header>
      <div className="card">
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{description}</p>
      </div>
    </section>
  )
}

