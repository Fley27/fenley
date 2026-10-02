export function Mock({ kind }) {
  if (kind === 'phone') {
    return (
      <div className="mock mock-phone" aria-hidden="true">
        <div className="mock-device">
          <span className="mock-notch" />
          <div className="mock-screen">
            <span className="mock-chip" />
            <span className="mock-line w80" />
            <span className="mock-line w60" />
            <span className="mock-block" />
            <span className="mock-cta" />
          </div>
        </div>
      </div>
    )
  }

  if (kind === 'dash') {
    return (
      <div className="mock mock-dash" aria-hidden="true">
        <div className="mock-dash-top">
          <b />
          <b />
          <b />
        </div>
        <div className="mock-chart">
          <i style={{ height: '38%' }} />
          <i style={{ height: '62%' }} />
          <i style={{ height: '48%' }} />
          <i style={{ height: '84%' }} />
          <i style={{ height: '70%' }} />
          <i style={{ height: '100%' }} />
          <i style={{ height: '88%' }} />
        </div>
        <div className="mock-legend">
          <span className="mock-line w60" />
          <span className="mock-line w40" />
        </div>
      </div>
    )
  }

  return (
    <div className="mock mock-browser" aria-hidden="true">
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span />
      </div>
      <div className="mock-page">
        <span className="mock-hero-block" />
        <span className="mock-line w70" />
        <span className="mock-line w50" />
        <div className="mock-tiles">
          <b />
          <b />
          <b />
        </div>
      </div>
    </div>
  )
}

export function TagRow({ items }) {
  return (
    <div className="tag-row">
      {items.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  )
}
