import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * HoverTerm — inline term with hover tooltip.
 * Uses portal + viewport clamping so tooltips never clip off screen edges.
 */
export default function HoverTerm({ children, tip, color = 'var(--cyan)' }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, arrowX: 0 });
  const ref = useRef(null);
  const tipRef = useRef(null);

  const updatePos = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const tipW = 340; // max-width of tooltip
    const pad = 12;

    // Center above the term
    let x = rect.left + rect.width / 2 - tipW / 2;
    let y = rect.top - 10;

    // Clamp to viewport horizontally
    if (x < pad) x = pad;
    if (x + tipW > window.innerWidth - pad) x = window.innerWidth - pad - tipW;

    // Arrow points to center of term
    const arrowX = Math.max(16, Math.min(tipW - 16, rect.left + rect.width / 2 - x));

    setPos({ x, y, arrowX });
  }, []);

  useEffect(() => {
    if (show) updatePos();
  }, [show, updatePos]);

  return (
    <span
      ref={ref}
      className="hover-term"
      style={{ '--ht-color': color }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow(s => !s)}
    >
      {children}
      {show && createPortal(
        <span
          ref={tipRef}
          className="hover-term-tip-portal"
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            transform: 'translateY(-100%)',
            width: 'max-content',
            maxWidth: 340,
            padding: '10px 14px',
            background: '#111827',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
            color: '#94a3b8',
            fontSize: '12.5px',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 400,
            lineHeight: 1.65,
            zIndex: 9999,
            pointerEvents: 'none',
            whiteSpace: 'normal',
            animation: 'tipFadeIn 0.15s ease',
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: -5,
              left: pos.arrowX,
              transform: 'translateX(-50%) rotate(45deg)',
              width: 8,
              height: 8,
              background: '#111827',
              borderRight: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
            }}
          />
          {tip}
        </span>,
        document.body
      )}
    </span>
  );
}
