/**
 * VisualCompare — side-by-side before/after or A vs B visual comparison.
 * Creates eye-catching inline visuals without needing full SVG diagrams.
 */
export default function VisualCompare({ left, right, leftLabel, rightLabel, leftColor = 'var(--red)', rightColor = 'var(--green)', caption }) {
  return (
    <div style={{ margin: 'var(--space-lg) 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0,
        borderRadius: 14, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Left */}
        <div style={{
          padding: '20px 24px',
          background: `color-mix(in srgb, ${leftColor} 5%, rgba(10,15,26,0.95))`,
          borderRight: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 2,
            color: leftColor, marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: leftColor, flexShrink: 0,
            }} />
            {leftLabel}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--text-secondary)',
          }}>
            {left}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.02)',
          fontSize: 16, color: 'var(--text-faint)',
        }}>
          vs
        </div>

        {/* Right */}
        <div style={{
          padding: '20px 24px',
          background: `color-mix(in srgb, ${rightColor} 5%, rgba(10,15,26,0.95))`,
          borderLeft: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 2,
            color: rightColor, marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: rightColor, flexShrink: 0,
            }} />
            {rightLabel}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.7,
            color: 'var(--text-secondary)',
          }}>
            {right}
          </div>
        </div>
      </div>
      {caption && (
        <div style={{
          marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--text-faint)', textAlign: 'center',
        }}>
          {caption}
        </div>
      )}
    </div>
  );
}
