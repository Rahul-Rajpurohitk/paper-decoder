import '../styles/library.css';

export default function PaperLibrary({ papers, onSelect }) {
  return (
    <div className="library">
      <div className="library-header">
        <div className="library-brand">
          <div className="library-logo">P</div>
          <h1 className="library-title">Paper Decoder</h1>
        </div>
        <p className="library-subtitle">
          Deep-dive deconstructions of frontier AI research. Every formula explained.
          Every design choice justified. Every diagram hand-crafted.
        </p>
        <div className="library-meta">
          <span>{papers.filter(p => p.status === 'ready').length} papers decoded</span>
          <span className="library-meta-dot" />
          <span>Built for learning, not skimming</span>
        </div>
      </div>

      <div className="paper-grid">
        {papers.map(p => (
          <div
            key={p.id}
            className={`paper-card ${p.status !== 'ready' ? 'disabled' : ''}`}
            onClick={() => p.status === 'ready' && onSelect(p.id)}
          >
            <div className="paper-card-body">
              <div className="paper-card-badges">
                {p.venue && (
                  <span className="paper-badge" style={{ background: `color-mix(in srgb, ${p.accent} 12%, transparent)`, color: p.accent }}>
                    {p.venue}
                  </span>
                )}
                {p.date && (
                  <span className="paper-badge" style={{ color: 'var(--text-faint)' }}>{p.date}</span>
                )}
                {p.status === 'upcoming' && (
                  <span className="paper-badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-faint)' }}>UPCOMING</span>
                )}
              </div>
              <h2 className="paper-card-title">{p.title}</h2>
              <p className="paper-card-subtitle">{p.subtitle}</p>
              {p.tags && (
                <div className="paper-card-tags">
                  {p.tags.map(t => <span key={t} className="paper-tag">{t}</span>)}
                </div>
              )}
              {p.status === 'ready' && (
                <div className="paper-card-cta" style={{ color: p.accent }}>Open deep-dive &rarr;</div>
              )}
            </div>
            {p.hero && (
              <div className="paper-card-hero">
                <div className="paper-hero-value" style={{ color: p.accent }}>
                  {p.hero.value}<span className="paper-hero-unit">{p.hero.unit}</span>
                </div>
                <div className="paper-hero-label">{p.hero.label}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
