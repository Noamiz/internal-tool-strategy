export function DashboardPage() {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Overview</p>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-description">
            Internal overview. Future milestones include key metrics, quick links, alerts, and operational summaries.
          </p>
        </div>
      </header>
      <div className="card">
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
          Widgets, KPIs, and audit calls-to-action will live here once the system connects to live metrics.
        </p>
      </div>
    </section>
  )
}

