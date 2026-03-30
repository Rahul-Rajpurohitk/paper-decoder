import { useState, useEffect } from 'react';

/**
 * TableOfContents — floating sticky nav showing paper sections.
 * Highlights the current section based on scroll position.
 */
export default function TableOfContents({ sections, color = 'var(--cyan)' }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const headers = document.querySelectorAll('.section-header');
    if (!headers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(headers).indexOf(entry.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    headers.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i) => {
    const headers = document.querySelectorAll('.section-header');
    if (headers[i]) {
      headers[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="toc-toggle"
        onClick={() => setExpanded(!expanded)}
        style={{ '--toc-color': color }}
        aria-label="Table of contents"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="2" width="6" height="1.5" rx="0.75" fill="currentColor" />
          <rect x="1" y="7" width="10" height="1.5" rx="0.75" fill="currentColor" />
          <rect x="1" y="12" width="8" height="1.5" rx="0.75" fill="currentColor" />
        </svg>
      </button>

      {/* TOC panel */}
      <nav className={`toc-panel ${expanded ? 'toc-open' : ''}`} style={{ '--toc-color': color }}>
        <div className="toc-label">Contents</div>
        {sections.map((s, i) => (
          <button
            key={i}
            className={`toc-item ${i === active ? 'toc-active' : ''}`}
            onClick={() => scrollTo(i)}
          >
            <span className="toc-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="toc-text">{s}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
