/**
 * KeyNumber — an eye-catching inline stat with context.
 * For highlighting important numbers within prose without needing a full StatBar.
 */
export default function KeyNumber({ value, unit, context, color = 'var(--cyan)' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'baseline', gap: 4,
      padding: '3px 10px', borderRadius: 6,
      background: `color-mix(in srgb, ${color} 8%, transparent)`,
      border: `1px solid color-mix(in srgb, ${color} 15%, transparent)`,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontWeight: 800,
        fontSize: '1.1em', color,
      }}>
        {value}
      </span>
      {unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em', color, opacity: 0.7 }}>{unit}</span>}
      {context && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85em', color: 'var(--text-muted)', marginLeft: 2 }}>{context}</span>}
    </span>
  );
}
