import { useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function FormulaBlock({ math, label, color = 'var(--cyan)', symbols = [] }) {
  const mathRef = useRef(null);

  useEffect(() => {
    if (mathRef.current) {
      try {
        katex.render(math, mathRef.current, {
          displayMode: true,
          throwOnError: false,
          trust: true,
          strict: false,
        });
      } catch {
        mathRef.current.textContent = math;
      }
    }
  }, [math]);

  return (
    <div className="formula-block" style={{ borderColor: `color-mix(in srgb, ${color} 20%, transparent)` }}>
      {label && (
        <div className="formula-label" style={{ color, background: `color-mix(in srgb, ${color} 8%, transparent)` }}>
          {label}
        </div>
      )}
      <div className="formula-math" ref={mathRef} />
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
