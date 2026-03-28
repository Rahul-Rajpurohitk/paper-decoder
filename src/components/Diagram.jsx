export default function Diagram({ children, caption }) {
  return (
    <div className="diagram-container">
      <div style={{ padding: '24px' }}>
        {children}
      </div>
      {caption && (
        <div className="diagram-caption">{caption}</div>
      )}
    </div>
  );
}
