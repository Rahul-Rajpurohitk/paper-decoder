export default function StatBar({ stats }) {
  return (
    <div className="stat-bar">
      {stats.map((s, i) => {
        const c = s.color || 'var(--cyan)';
        return (
          <div key={i} className="stat-item" style={{
            borderColor: `color-mix(in srgb, ${c} 12%, transparent)`,
            '--accent': c,
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${c}, transparent)`,
              opacity: 0.5, borderRadius: '2px 2px 0 0',
            }} />
            <div className="stat-value" style={{ color: c }}>
              {s.value}<span className="stat-unit">{s.unit}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
