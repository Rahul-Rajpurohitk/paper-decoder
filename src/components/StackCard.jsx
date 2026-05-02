/**
 * StackCard — engineering trading card for an enterprise project.
 * Shows: tech stack choices, headline SLOs, scale numbers, cost.
 * One rich at-a-glance visual.
 *
 * Props:
 *   accent: hex color
 *   title: 'Voice Agent · Sierra/Decagon-class'
 *   subtitle: short positioning line
 *   slos: [{label, value, note}] 3-4 key SLOs
 *   stack: [{layer, choice, why}] 5-7 stack rows
 *   scale: [{label, value}] 3-4 scale numbers
 *   cost: { perUnit, unitLabel, perPeriod, periodLabel }
 *   moats: ['line', 'line', 'line', ...] — full lines, all rendered in bottom band
 */
export default function StackCard({ accent, title, subtitle, slos, stack, scale, cost, moats }) {
  const C = accent;
  const SURFACE = '#10101e';
  const FG = '#e2e8f0';
  const GRAY = '#94a3b8';
  const DIM = '#1e1e30';
  const AMBER = '#f59e0b';
  const GREEN = '#22c55e';
  const idSafe = C.replace('#', '');

  const rowCount = Math.min((stack || []).length, 8);
  const moatCount = Math.min((moats || []).length, 5);

  return (
    <svg
      viewBox="0 0 880 760"
      style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }}
      role="img"
      aria-label="Engineering stack card"
    >
      <defs>
        <linearGradient id={`scBg-${idSafe}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10101e" />
          <stop offset="100%" stopColor="#06060e" />
        </linearGradient>
        <linearGradient id={`scAcc-${idSafe}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={C} stopOpacity="0.18" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* outer card */}
      <rect width={880} height={760} rx={14} fill={`url(#scBg-${idSafe})`} stroke={C} strokeWidth={1.4} strokeOpacity={0.7} />

      {/* Header band */}
      <rect x={0} y={0} width={880} height={92} rx={14} fill={`url(#scAcc-${idSafe})`} />
      <text x={32} y={28} fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2.5} fontFamily="monospace">
        ENGINEERING STACK CARD
      </text>
      <text x={32} y={58} fill={C} fontSize={20} fontWeight={700} fontFamily="monospace">
        {title}
      </text>
      <text x={32} y={80} fill={FG} fontSize={12} fontFamily="monospace">
        {subtitle}
      </text>

      {/* SLO panel */}
      <rect x={20} y={108} width={840} height={132} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={36} y={130} fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        HEADLINE SLOs
      </text>
      {(slos || []).slice(0, 4).map((s, i) => (
        <g key={i} transform={`translate(${36 + (i * 205)}, 144)`}>
          <text x={0} y={20} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={0} y={58} fill={C} fontSize={26} fontWeight={700} fontFamily="monospace">{s.value}</text>
          {s.note && <text x={0} y={78} fill={GRAY} fontSize={10} fontFamily="monospace">{s.note}</text>}
        </g>
      ))}

      {/* Stack table — left, taller */}
      <rect x={20} y={252} width={550} height={336} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={36} y={274} fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        STACK CHOICES
      </text>
      <line x1={36} y1={284} x2={554} y2={284} stroke={DIM} strokeWidth={0.6} />
      <text x={36} y={300} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">LAYER</text>
      <text x={170} y={300} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">CHOICE</text>
      <text x={356} y={300} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">WHY</text>
      <line x1={36} y1={308} x2={554} y2={308} stroke={DIM} strokeWidth={0.6} />
      {(stack || []).slice(0, 8).map((row, i) => {
        const y = 326 + i * 32;
        return (
          <g key={i}>
            {i % 2 === 0 && <rect x={26} y={y - 16} width={538} height={28} rx={4} fill="rgba(255,255,255,0.025)" />}
            <text x={36} y={y} fill={FG} fontSize={10} fontWeight={700} fontFamily="monospace">{row.layer}</text>
            <text x={170} y={y} fill={C} fontSize={10} fontFamily="monospace">{row.choice}</text>
            <text x={356} y={y} fill={GRAY} fontSize={10} fontFamily="monospace">{row.why}</text>
          </g>
        );
      })}

      {/* Right column: SCALE */}
      <rect x={586} y={252} width={274} height={172} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={602} y={274} fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SCALE
      </text>
      {(scale || []).slice(0, 4).map((s, i) => (
        <g key={i}>
          <text x={602} y={304 + i * 30} fill={FG} fontSize={11} fontFamily="monospace">{s.label}</text>
          <text x={846} y={304 + i * 30} textAnchor="end" fill={C} fontSize={13} fontWeight={700} fontFamily="monospace">{s.value}</text>
        </g>
      ))}

      {/* Right column: UNIT ECONOMICS */}
      <rect x={586} y={436} width={274} height={152} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={602} y={458} fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        UNIT ECONOMICS
      </text>
      <text x={602} y={494} fill={GREEN} fontSize={26} fontWeight={700} fontFamily="monospace">{cost?.perUnit}</text>
      <text x={602} y={514} fill={GRAY} fontSize={10} fontFamily="monospace">{cost?.unitLabel}</text>
      <line x1={602} y1={528} x2={846} y2={528} stroke={DIM} strokeWidth={0.6} />
      <text x={602} y={552} fill={AMBER} fontSize={18} fontWeight={700} fontFamily="monospace">{cost?.perPeriod}</text>
      <text x={602} y={572} fill={GRAY} fontSize={10} fontFamily="monospace">{cost?.periodLabel}</text>

      {/* Bottom band: WHY THIS DESIGN WINS — full-width, holds all moats */}
      <rect x={20} y={604} width={840} height={140} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={36} y={626} fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        WHY THIS DESIGN WINS
      </text>
      <line x1={36} y1={636} x2={844} y2={636} stroke={DIM} strokeWidth={0.6} />
      {(moats || []).slice(0, 5).map((m, i) => (
        <g key={i}>
          <circle cx={42} cy={658 + i * 18} r={2} fill={C} />
          <text x={52} y={662 + i * 18} fill={FG} fontSize={11} fontFamily="monospace">{m}</text>
        </g>
      ))}
    </svg>
  );
}
