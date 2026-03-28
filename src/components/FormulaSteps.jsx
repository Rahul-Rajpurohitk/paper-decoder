import { useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

function KaTeX({ math, display = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, { displayMode: display, throwOnError: false, trust: true, strict: false });
      } catch {
        ref.current.textContent = math;
      }
    }
  }, [math, display]);
  return <span ref={ref} />;
}

/**
 * FormulaSteps — stepped build-up to a formula.
 *
 * @param {string}   label   — top label (e.g. "DINO Loss — CLS Cross-Entropy")
 * @param {string}   color   — accent color
 * @param {Array}    steps   — array of { note: "explanation", math: "LaTeX" }
 *                              Each step adds one piece to the formula.
 *                              The LAST step is the final full formula (highlighted).
 * @param {Array}    symbols — symbol glossary [{symbol, meaning}]
 */
export default function FormulaSteps({ label, color = 'var(--cyan)', steps = [], symbols = [] }) {
  return (
    <div className="formula-block" style={{ borderColor: `color-mix(in srgb, ${color} 20%, transparent)` }}>
      {label && (
        <div className="formula-label" style={{ color, background: `color-mix(in srgb, ${color} 8%, transparent)` }}>
          {label}
        </div>
      )}

      <div style={{ padding: '16px 24px 8px', background: 'rgba(0,0,0,0.2)' }}>
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div key={i} style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
              marginBottom: isLast ? 8 : 14,
              paddingBottom: isLast ? 0 : 14,
              borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
            }}>
              {/* Step number */}
              <div style={{
                minWidth: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isLast ? `color-mix(in srgb, ${color} 20%, transparent)` : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${isLast ? color : 'rgba(255,255,255,0.08)'}`,
                color: isLast ? color : '#64748b',
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                flexShrink: 0, marginTop: 2,
              }}>
                {isLast ? '✓' : i + 1}
              </div>

              <div style={{ flex: 1 }}>
                {/* Explanation */}
                <div style={{
                  fontSize: 13, lineHeight: 1.6, marginBottom: 8,
                  color: isLast ? '#e8edf5' : '#94a3b8',
                  fontFamily: 'var(--font-body)',
                  fontWeight: isLast ? 600 : 400,
                }}>
                  {step.note}
                </div>

                {/* Math */}
                <div style={{
                  padding: isLast ? '12px 16px' : '8px 14px',
                  background: isLast ? `color-mix(in srgb, ${color} 6%, rgba(0,0,0,0.3))` : 'rgba(255,255,255,0.02)',
                  borderRadius: 8,
                  border: isLast ? `1.5px solid color-mix(in srgb, ${color} 25%, transparent)` : '1px solid rgba(255,255,255,0.04)',
                  overflowX: 'auto',
                }}>
                  <KaTeX math={step.math} display={true} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {symbols.length > 0 && (
        <div className="formula-glossary">
          {symbols.map((s, i) => (
            <span key={i} className="formula-symbol">
              <span className="formula-symbol-key" style={{ color }}>{s.symbol}</span>
              <span className="formula-symbol-eq">=</span>
              <span className="formula-symbol-val">{s.meaning}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
