export default function SectionHeader({ num, title, subtitle, color }) {
  return (
    <div className="section-header">
      <div className="section-header-row">
        <span className="section-num" style={color ? { color } : undefined}>{num}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
