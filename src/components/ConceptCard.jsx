import { useState } from 'react';

export default function ConceptCard({ title, color = 'var(--cyan)', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="concept-card" style={{ borderColor: open ? `color-mix(in srgb, ${color} 20%, transparent)` : undefined }}>
      <div className="concept-card-title" style={{ color }} onClick={() => setOpen(!open)}>
        <span className={`concept-card-toggle ${open ? 'open' : ''}`}>&#9654;</span>
        {title}
      </div>
      {open && <div className="concept-card-body">{children}</div>}
    </div>
  );
}
