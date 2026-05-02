import Callout from './Callout';

/**
 * ProdReality — battle-tested production lessons.
 * Renders a "Lessons from running this in production" block with N callouts.
 *
 * Props:
 *   accent: hex
 *   lessons: [{ type: 'warning'|'key'|'tip', tag: string, body: string|JSX }]
 */
export default function ProdReality({ accent, lessons }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          color: accent,
          marginBottom: 10,
        }}
      >
        ─── LESSONS FROM PRODUCTION
      </div>
      {(lessons || []).map((l, i) => (
        <Callout key={i} type={l.type || 'warning'}>
          <strong>{l.tag}:</strong> {l.body}
        </Callout>
      ))}
    </div>
  );
}
