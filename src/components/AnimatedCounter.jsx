import { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter — number that counts up when scrolled into view.
 * Works with StatBar for eye-catching hero stats.
 */
export default function AnimatedCounter({ value, duration = 1200 }) {
  const [display, setDisplay] = useState('0');
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    // Parse the target value
    const str = String(value);
    const numMatch = str.match(/[\d.]+/);
    if (!numMatch) { setDisplay(str); return; }

    const target = parseFloat(numMatch[0]);
    const prefix = str.slice(0, numMatch.index);
    const suffix = str.slice(numMatch.index + numMatch[0].length);
    const hasDecimal = numMatch[0].includes('.');
    const decimals = hasDecimal ? numMatch[0].split('.')[1].length : 0;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplay(`${prefix}${decimals > 0 ? current.toFixed(decimals) : Math.round(current)}${suffix}`);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value, duration]);

  return <span ref={ref}>{display}</span>;
}
