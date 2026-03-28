export default function StepFlow({ steps, color = 'var(--cyan)' }) {
  return (
    <div className="step-flow">
      {steps.map((s, i) => (
        <div key={i} className="step-item">
          <div className="step-track">
            <div className="step-dot" style={{ borderColor: color, color, background: `color-mix(in srgb, ${color} 10%, transparent)` }}>
              {i + 1}
            </div>
            {i < steps.length - 1 && <div className="step-line" style={{ background: color }} />}
          </div>
          <div className="step-content">
            {s.title && <div className="step-title" style={{ color }}>{s.title}</div>}
            <div className="step-desc">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
