export default function StatBar({ stats }) {
  return (
    <div className="stat-bar">
      {stats.map((s, i) => (
        <div key={i} className="stat-item" style={{ borderColor: `color-mix(in srgb, ${s.color || 'var(--cyan)'} 15%, transparent)` }}>
          <div className="stat-value" style={{ color: s.color || 'var(--cyan)' }}>
            {s.value}<span className="stat-unit">{s.unit}</span>
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
