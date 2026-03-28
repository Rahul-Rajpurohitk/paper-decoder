const TYPES = {
  insight: { label: 'Insight', className: 'callout-insight' },
  key:     { label: 'Key Takeaway', className: 'callout-key' },
  warning: { label: 'Watch Out', className: 'callout-warning' },
  math:    { label: 'Math Detail', className: 'callout-math' },
};

export default function Callout({ type = 'insight', children }) {
  const t = TYPES[type] || TYPES.insight;
  return (
    <div className={`callout ${t.className}`}>
      <div className="callout-label">{t.label}</div>
      <div>{children}</div>
    </div>
  );
}
