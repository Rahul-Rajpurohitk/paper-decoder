/**
 * SimpleExplain — "In Simple Terms" psychological explanation block.
 * Sits below technical content to provide a parallel plain-English understanding.
 * Uses a brain emoji + distinct visual style so readers can toggle between
 * technical and intuitive understanding.
 */
export default function SimpleExplain({ children }) {
  return (
    <div className="simple-explain">
      <div className="simple-explain-header">
        <span className="simple-explain-icon">🧠</span>
        <span className="simple-explain-label">In Simple Terms</span>
      </div>
      <div className="simple-explain-body">
        {children}
      </div>
    </div>
  );
}
