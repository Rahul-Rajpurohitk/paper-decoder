export default function MentalModel({ title, analogy, technical, color = 'var(--cyan)' }) {
  return (
    <div className="mental-model">
      <div className="mental-model-title" style={{ color }}>{title}</div>
      <div className="mental-model-analogy" style={{ borderColor: color, background: `color-mix(in srgb, ${color} 5%, transparent)` }}>
        {analogy}
      </div>
      {technical && (
        <div className="mental-model-technical">{technical}</div>
      )}
    </div>
  );
}
