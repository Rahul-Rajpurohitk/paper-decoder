import { useState, useRef } from 'react';

/**
 * HoverTerm — inline term with hover tooltip explanation.
 * Renders as highlighted text that shows a tooltip on hover.
 *
 * @param {string} children — the visible term text
 * @param {string} tip — the explanation shown on hover
 * @param {string} color — accent color for the term
 */
export default function HoverTerm({ children, tip, color = 'var(--cyan)' }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  return (
    <span
      ref={ref}
      className="hover-term"
      style={{ '--ht-color': color }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow(!show)}
    >
      {children}
      {show && (
        <span className="hover-term-tip">
          <span className="hover-term-tip-arrow" />
          {tip}
        </span>
      )}
    </span>
  );
}
