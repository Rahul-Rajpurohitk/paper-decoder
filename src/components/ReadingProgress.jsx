import { useState, useEffect } from 'react';

/**
 * ReadingProgress — sticky progress bar at the top showing scroll position.
 */
export default function ReadingProgress({ color = 'var(--cyan)' }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 9999,
      background: 'rgba(0,0,0,0.3)',
    }}>
      <div style={{
        height: '100%', width: `${progress}%`,
        background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, #fff))`,
        transition: 'width 0.1s linear',
        boxShadow: `0 0 8px ${color}`,
      }} />
    </div>
  );
}
