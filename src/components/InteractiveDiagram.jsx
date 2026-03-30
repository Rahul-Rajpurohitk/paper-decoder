import { useState } from 'react';

/**
 * InteractiveDiagram — SVG diagram with clickable/hoverable regions that show explanations.
 *
 * @param {ReactNode} children — the SVG
 * @param {string} caption — diagram caption
 * @param {Array} hotspots — [{id, label, explanation, x, y, w, h}] — clickable regions overlaid on the SVG
 * @param {string} color — accent color
 */
export default function InteractiveDiagram({ children, caption, hotspots = [], color = 'var(--cyan)' }) {
  const [activeSpot, setActiveSpot] = useState(null);
  const active = hotspots.find(h => h.id === activeSpot);

  return (
    <div className="diagram-container" style={{ position: 'relative' }}>
      <div style={{ padding: '24px', position: 'relative' }}>
        {children}

        {/* Clickable hotspot overlays */}
        {hotspots.map(h => (
          <button
            key={h.id}
            onClick={() => setActiveSpot(activeSpot === h.id ? null : h.id)}
            style={{
              position: 'absolute',
              left: `${h.x}%`, top: `${h.y}%`,
              width: `${h.w}%`, height: `${h.h}%`,
              background: activeSpot === h.id ? `color-mix(in srgb, ${color} 15%, transparent)` : 'transparent',
              border: activeSpot === h.id ? `2px solid ${color}` : '2px solid transparent',
              borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
              padding: 0, margin: 0,
            }}
            title={h.label}
          />
        ))}
      </div>

      {/* Active explanation panel */}
      {active && (
        <div style={{
          padding: '14px 20px',
          background: `color-mix(in srgb, ${color} 5%, rgba(0,0,0,0.4))`,
          borderTop: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
          animation: 'fadeIn 0.2s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            color, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase',
          }}>
            {active.label}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.7,
            color: 'var(--text-secondary)',
          }}>
            {active.explanation}
          </div>
        </div>
      )}

      {caption && <div className="diagram-caption">{caption}</div>}
    </div>
  );
}
