import { useState, useMemo } from 'react';
import '../styles/library.css';

const CATEGORY_ORDER = [
  'Agent Systems',
  'Knowledge & RAG',
  'Document AI',
  'ML Serving',
  'Vertical AI',
  'Foundational',
  'AI Papers',
];

const CATEGORY_META = {
  'Agent Systems':    { tag: 'AGT', desc: 'Autonomous workers — support, SWE, analyst, voice, sales, devops' },
  'Knowledge & RAG':  { tag: 'RAG', desc: 'Permission-aware search & synthesis across enterprise sources' },
  'Document AI':      { tag: 'DOC', desc: 'OCR + layout + typed extraction — the foundation under doc-AI products' },
  'ML Serving':       { tag: 'MLS', desc: 'Real-time recommendation systems, classical ML + LLM hybrid' },
  'Vertical AI':      { tag: 'VRT', desc: 'Domain-specific products — legal, healthcare, regulated industries' },
  'Foundational':     { tag: 'FND', desc: 'Concepts, frameworks, and patterns underneath every product above' },
  'AI Papers':        { tag: 'PPR', desc: 'Frontier research deconstructed — every formula, every diagram' },
};

function inferCategory(p) {
  if (p.category) return p.category;
  // heuristic for legacy AI papers
  return 'AI Papers';
}

export default function PaperLibrary({ papers, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const grouped = useMemo(() => {
    const map = {};
    papers.forEach(p => {
      const cat = inferCategory(p);
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    });
    return map;
  }, [papers]);

  const presentCategories = useMemo(
    () => CATEGORY_ORDER.filter(c => grouped[c] && grouped[c].length > 0),
    [grouped]
  );

  const visibleCategories =
    activeCategory === 'all' ? presentCategories : presentCategories.filter(c => c === activeCategory);

  const totalReady = papers.filter(p => p.status === 'ready').length;
  const projectCount = papers.filter(p => p.id?.startsWith('project-')).length;

  return (
    <div className="library">
      <div className="library-header">
        <div className="library-brand">
          <div className="library-logo">P</div>
          <h1 className="library-title">Paper Decoder</h1>
        </div>
        <p className="library-subtitle">
          Senior-level system designs for enterprise AI — agents, RAG, recsys, document AI, vertical apps —
          alongside frontier research deconstructed. Every architecture, every trade-off, every diagram hand-engineered.
        </p>
        <div className="library-meta">
          <span>{totalReady} modules</span>
          <span className="library-meta-dot" />
          <span>{projectCount} enterprise projects</span>
          <span className="library-meta-dot" />
          <span>{presentCategories.length} AI directions</span>
        </div>
      </div>

      {/* Category chips */}
      <div className="library-chips">
        <button
          className={`library-chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All <span className="library-chip-count">{papers.length}</span>
        </button>
        {presentCategories.map(c => (
          <button
            key={c}
            className={`library-chip ${activeCategory === c ? 'active' : ''}`}
            onClick={() => setActiveCategory(c)}
          >
            {c} <span className="library-chip-count">{grouped[c].length}</span>
          </button>
        ))}
      </div>

      {/* Category sections */}
      {visibleCategories.map(cat => {
        const meta = CATEGORY_META[cat] || { tag: '·', desc: '' };
        return (
          <section key={cat} className="library-category">
            <div className="library-category-header">
              <span className="library-category-tag">{meta.tag}</span>
              <h2 className="library-category-title">{cat}</h2>
              <span className="library-category-count">{grouped[cat].length}</span>
            </div>
            <p className="library-category-desc">{meta.desc}</p>

            <div className="paper-grid">
              {grouped[cat].map(p => (
                <div
                  key={p.id}
                  className={`paper-card ${p.status !== 'ready' ? 'disabled' : ''}`}
                  onClick={() => p.status === 'ready' && onSelect(p.id)}
                  style={{ '--accent': p.accent }}
                >
                  <span
                    className="paper-card-accent-bar"
                    style={{ background: p.accent }}
                  />
                  <div className="paper-card-body">
                    <div className="paper-card-badges">
                      {p.venue && (
                        <span className="paper-badge" style={{ background: `color-mix(in srgb, ${p.accent} 12%, transparent)`, color: p.accent }}>
                          {p.venue}
                        </span>
                      )}
                      {p.difficulty && (
                        <span className="paper-badge" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>{p.difficulty}</span>
                      )}
                      {p.status === 'upcoming' && (
                        <span className="paper-badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-faint)' }}>UPCOMING</span>
                      )}
                    </div>
                    <h3 className="paper-card-title">{p.title}</h3>
                    <p className="paper-card-subtitle">{p.subtitle}</p>
                    {p.tags && (
                      <div className="paper-card-tags">
                        {p.tags.slice(0, 5).map(t => <span key={t} className="paper-tag">{t}</span>)}
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
          </section>
        );
      })}
    </div>
  );
}
