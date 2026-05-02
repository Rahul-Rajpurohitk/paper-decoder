/**
 * StackCard — engineering trading card for an enterprise project.
 * Shows: tech stack choices, headline SLOs, scale numbers, cost.
 * One rich at-a-glance visual.
 *
 * Props:
 *   accent: hex color
 *   title: 'Voice Agent · Sierra/Decagon-class'
 *   subtitle: short positioning line
 *   slos: [{label, value}] 3-4 key SLOs
 *   stack: [{layer, choice, why}] 5-7 stack rows
 *   scale: [{label, value}] 3-4 scale numbers
 *   cost: { perUnit, unitLabel, perPeriod, periodLabel }
 *   moats: ['line', 'line', 'line']
 */
export default function StackCard({ accent, title, subtitle, slos, stack, scale, cost, moats }) {
  const C = accent;
  const BG = '#0a0a14';
  const SURFACE = '#10101e';
  const FG = '#e2e8f0';
  const GRAY = '#94a3b8';
  const DIM = '#1e1e30';
  const AMBER = '#f59e0b';
  const GREEN = '#22c55e';
  const PURPLE = '#a855f7';
  const RED = '#ef4444';

  return (
    <svg
      viewBox="0 0 880 700"
      style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }}
      role="img"
      aria-label="Engineering stack card"
    >
      <defs>
        <linearGradient id={`scBg-${C.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10101e" />
          <stop offset="100%" stopColor="#06060e" />
        </linearGradient>
        <linearGradient id={`scAcc-${C.replace('#', '')}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={C} stopOpacity="0.14" />
          <stop offset="100%" stopColor={C} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={880} height={700} rx={14} fill={`url(#scBg-${C.replace('#', '')})`} stroke={C} strokeWidth={1.4} strokeOpacity={0.6} />

      {/* Header band */}
      <rect x={0} y={0} width={880} height={86} rx={14} fill={`url(#scAcc-${C.replace('#', '')})`} />
      <text x={32} y={26} fill={GRAY} fontSize={10} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ENGINEERING STACK CARD
      </text>
      <text x={32} y={54} fill={C} fontSize={20} fontWeight={700} fontFamily="monospace">
        {title}
      </text>
      <text x={32} y={74} fill={FG} fontSize={11} fontFamily="monospace">
        {subtitle}
      </text>

      {/* Top row: SLO panel */}
      <rect x={20} y={104} width={840} height={120} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={36} y={124} fill={GRAY} fontSize={10} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        HEADLINE SLOs
      </text>
      {slos.slice(0, 4).map((s, i) => (
        <g key={i} transform={`translate(${36 + (i * 205)}, 138)`}>
          <text x={0} y={20} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={0} y={56} fill={C} fontSize={26} fontWeight={700} fontFamily="monospace">{s.value}</text>
          {s.note && <text x={0} y={74} fill={GRAY} fontSize={9} fontFamily="monospace">{s.note}</text>}
        </g>
      ))}

      {/* Middle: Stack table */}
      <rect x={20} y={236} width={550} height={326} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={36} y={256} fill={GRAY} fontSize={10} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        STACK CHOICES
      </text>
      <line x1={36} y1={266} x2={554} y2={266} stroke={DIM} strokeWidth={0.6} />
      <text x={36} y={282} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">LAYER</text>
      <text x={170} y={282} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">CHOICE</text>
      <text x={350} y={282} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">WHY</text>
      <line x1={36} y1={290} x2={554} y2={290} stroke={DIM} strokeWidth={0.6} />
      {stack.slice(0, 8).map((row, i) => {
        const y = 308 + i * 32;
        return (
          <g key={i}>
            {i % 2 === 0 && <rect x={26} y={y - 16} width={538} height={28} rx={4} fill="rgba(255,255,255,0.02)" />}
            <text x={36} y={y} fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">{row.layer}</text>
            <text x={170} y={y} fill={C} fontSize={9} fontFamily="monospace">{row.choice}</text>
            <text x={350} y={y} fill={GRAY} fontSize={9} fontFamily="monospace">{row.why}</text>
          </g>
        );
      })}

      {/* Right column: Scale + Cost + Moats */}
      <rect x={586} y={236} width={274} height={156} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={602} y={256} fill={GRAY} fontSize={10} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SCALE
      </text>
      {scale.slice(0, 4).map((s, i) => (
        <g key={i}>
          <text x={602} y={282 + i * 24} fill={FG} fontSize={9} fontFamily="monospace">{s.label}</text>
          <text x={846} y={282 + i * 24} textAnchor="end" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">{s.value}</text>
        </g>
      ))}

      <rect x={586} y={404} width={274} height={86} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={602} y={424} fill={GRAY} fontSize={10} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        UNIT ECONOMICS
      </text>
      <text x={602} y={448} fill={GREEN} fontSize={20} fontWeight={700} fontFamily="monospace">{cost.perUnit}</text>
      <text x={602} y={464} fill={GRAY} fontSize={9} fontFamily="monospace">{cost.unitLabel}</text>
      <text x={846} y={448} textAnchor="end" fill={AMBER} fontSize={14} fontWeight={700} fontFamily="monospace">{cost.perPeriod}</text>
      <text x={846} y={464} textAnchor="end" fill={GRAY} fontSize={9} fontFamily="monospace">{cost.periodLabel}</text>

      <rect x={586} y={502} width={274} height={60} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={602} y={522} fill={GRAY} fontSize={10} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEFENSIBILITY
      </text>
      {moats.slice(0, 2).map((m, i) => (
        <text key={i} x={602} y={540 + i * 14} fill={FG} fontSize={9} fontFamily="monospace">• {m}</text>
      ))}

      {/* Bottom band: tagline */}
      <rect x={20} y={576} width={840} height={104} rx={10} fill={SURFACE} stroke={DIM} strokeWidth={1} />
      <text x={36} y={596} fill={GRAY} fontSize={10} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        WHY THIS DESIGN WINS
      </text>
      {moats.slice(2).map((m, i) => (
        <text key={i} x={36} y={620 + i * 18} fill={FG} fontSize={10} fontFamily="monospace">• {m}</text>
      ))}
    </svg>
  );
}
