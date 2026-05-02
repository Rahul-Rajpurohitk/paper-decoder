import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';

const C       = '#f43f5e';
const C2      = '#be123c';
const BG      = '#1a0710';
const SURFACE = '#220a16';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#3a1024';
const PURPLE  = '#a855f7';
const AMBER   = '#f59e0b';
const RED     = '#ef4444';
const GREEN   = '#22c55e';
const BLUE    = '#3b82f6';
const PINK    = '#ec4899';
const EMERALD = '#10b981';
const TEAL    = '#14b8a6';
const ORANGE  = '#fb923c';
const CYAN    = '#06b6d4';

function RecReqs() {
  const must = [
    'Generate ranked recommendations on demand',
    'Multi-objective (engage + retain + revenue)',
    'Real-time signals (last 5 min)',
    'Cold-start (new user · new item)',
    'Diversity / freshness / serendipity',
    'Bandit explore/exploit on candidates',
    'Online A/B everything · stat-sig gates',
    'LLM rerank for semantic relevance',
  ];
  const nfr = [
    ['p99 serve latency',  '< 100 ms',     'P0'],
    ['QPS peak',           '~50K',          'P0'],
    ['Feature freshness',  '< 60 s',        'P0'],
    ['Cold-start NDCG',    '>= 0.65',       'P0'],
    ['Click lift vs base', '+8-15%',        'P0'],
    ['Cost / 1K rec',      '< $0.40',       'P1'],
    ['Bandit regret',      'sub-linear',    'P1'],
    ['Drift detection',    '< 24 h',        'P0'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Recsys functional and NFRs">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS - MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(244,63,94,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={240} y={86} textAnchor="middle" fill={C} fontSize={12} fontWeight={700} fontFamily="monospace">FUNCTIONAL (P0)</text>
      {must.map((m, i) => (
        <g key={i}>
          <text x={64} y={120 + i * 42} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">YES</text>
          <text x={104} y={120 + i * 42} fill={FG} fontSize={10} fontFamily="monospace">{m}</text>
        </g>
      ))}
      <rect x={460} y={60} width={380} height={400} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={650} y={86} textAnchor="middle" fill={AMBER} fontSize={12} fontWeight={700} fontFamily="monospace">NFR - SLO</text>
      {nfr.map((r, i) => {
        const y = 116 + i * 40;
        return (
          <g key={i}>
            <text x={476} y={y} fill={FG} fontSize={10} fontFamily="monospace">{r[0]}</text>
            <text x={680} y={y} fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{r[1]}</text>
            <text x={800} y={y} fill={r[2] === 'P0' ? RED : AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">{r[2]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function RecArch() {
  return (
    <svg viewBox="0 0 880 720" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Recsys architecture">
      <defs>
        <marker id="reArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
        <linearGradient id="reBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#220a16" />
          <stop offset="100%" stopColor="#15050d" />
        </linearGradient>
      </defs>
      <rect width={880} height={720} rx={12} fill="url(#reBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE - EVENT TO FEATURE TO CANDIDATE TO RANK TO RERANK TO SERVE
      </text>

      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">EVENT INGEST</text>
      {['SDK click', 'play', 'pause', 'skip', 'like', 'share', 'dwell'].map((s, i) => (
        <g key={i}>
          <rect x={170 + i * 95} y={66} width={85} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={213 + i * 95} y={86} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />

      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        KAFKA - 1B events/day - sessionization - dedupe - schema-validated
      </text>
      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />

      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(20,184,166,0.07)" stroke={TEAL} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">FEATURE STORE</text>
      <text x={165} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Tecton / Feast - online + offline</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">user · item · context · 60s fresh</text>

      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EMBEDDINGS</text>
      <text x={435} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">user-tower + item-tower</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">retrained nightly · refreshed live</text>

      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">CANDIDATE GEN</text>
      <text x={710} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">multi-tower retrieval - ANN</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">5K candidates - ~5ms p50</text>

      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />
      <line x1={710} y1={258} x2={710} y2={290} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />

      <rect x={40} y={290} width={800} height={84} rx={10} fill="rgba(244,63,94,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={60} y={312} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">FILTERS  (business rules + safety)</text>
      {[
        { x: 50,  label: 'SEEN',     desc: 'last 30d cooldown' },
        { x: 220, label: 'INVENT',   desc: 'in-stock - in-region' },
        { x: 390, label: 'POLICY',   desc: 'safety - age - locale' },
        { x: 560, label: 'BLOCKED',  desc: 'user mute / report' },
        { x: 730, label: 'COLDSTART',desc: 'fallback by content' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={324} width={140} height={42} rx={5} fill={SURFACE} stroke={C} strokeWidth={0.9} />
          <text x={t.x + 80} y={342} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={358} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      <line x1={440} y1={374} x2={440} y2={392} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />

      <rect x={40} y={392} width={800} height={70} rx={10} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.5} />
      <text x={60} y={412} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">RANKER  (multi-objective)</text>
      <text x={60} y={432} fill={FG} fontSize={10} fontFamily="monospace">DLRM / Wide+Deep / TwoTower head - features × candidates · ~15ms p50</text>
      <text x={60} y={450} fill={GRAY} fontSize={9} fontFamily="monospace">objective: weighted CTR + dwell + retention + revenue (gradient-balanced)</text>

      <line x1={440} y1={462} x2={440} y2={482} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />

      <rect x={40} y={482} width={800} height={70} rx={10} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={60} y={502} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">LLM RERANKER  (top-100 to top-30)</text>
      <text x={60} y={522} fill={FG} fontSize={10} fontFamily="monospace">Haiku 4.5 + structured-out · semantic relevance · explanation tokens</text>
      <text x={60} y={538} fill={GRAY} fontSize={9} fontFamily="monospace">~30ms p50 · cached per user × content-cluster · only when budget allows</text>

      <line x1={440} y1={552} x2={440} y2={572} stroke={FG} strokeWidth={1.4} markerEnd="url(#reArr)" />

      <rect x={40} y={572} width={800} height={70} rx={10} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={60} y={592} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">DIVERSIFY + BANDIT</text>
      <text x={60} y={612} fill={FG} fontSize={10} fontFamily="monospace">MMR diversity · Thompson sampling 5% explore · contextual</text>
      <text x={60} y={628} fill={GRAY} fontSize={9} fontFamily="monospace">prevents monotone slates · cold-start surfaces · novelty bonus</text>

      <rect x={40} y={656} width={800} height={36} rx={6} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={440} y={678} textAnchor="middle" fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">
        OBSERVABILITY - online metrics (CTR, dwell, retention) - feature drift - bandit regret - bias audit
      </text>
    </svg>
  );
}

function CandidateGen() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Candidate generation strategy">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        CANDIDATE GENERATION - PARALLEL TOWERS - FUSE - DEDUPE
      </text>
      {[
        { x: 30,  color: BLUE,    label: 'COLLAB FILTER',
          how: 'matrix factor / two-tower',
          when: 'warm users - rich history',
          k: 'k=2000' },
        { x: 240, color: TEAL,    label: 'CONTENT-BASED',
          how: 'item embeddings - cosine',
          when: 'cold-start items - long-tail',
          k: 'k=1000' },
        { x: 450, color: PURPLE,  label: 'SEMANTIC LLM',
          how: 'user-intent embed - vector ANN',
          when: 'natural-language queries',
          k: 'k=500' },
        { x: 660, color: GREEN,   label: 'POPULAR / TREND',
          how: 'trending in segment',
          when: 'cold users - serendipity',
          k: 'k=500' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={70} width={200} height={310} rx={11} fill={SURFACE} stroke={t.color} strokeWidth={1.4} />
          <rect x={t.x} y={70} width={200} height={32} rx={11} fill={t.color} fillOpacity={0.18} />
          <text x={t.x + 100} y={92} textAnchor="middle" fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 18} y={130} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">HOW</text>
          <text x={t.x + 18} y={148} fill={FG} fontSize={9} fontFamily="monospace">{t.how}</text>
          <line x1={t.x + 30} y1={170} x2={t.x + 170} y2={170} stroke={DIM} strokeWidth={0.6} />
          <text x={t.x + 18} y={192} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">WHEN</text>
          <text x={t.x + 18} y={210} fill={FG} fontSize={9} fontFamily="monospace">{t.when}</text>
          <line x1={t.x + 30} y1={232} x2={t.x + 170} y2={232} stroke={DIM} strokeWidth={0.6} />
          <text x={t.x + 18} y={254} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">SIZE</text>
          <text x={t.x + 18} y={272} fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.k}</text>
          <text x={t.x + 18} y={310} fill={GRAY} fontSize={9} fontFamily="monospace">~5ms p50</text>
          <text x={t.x + 18} y={328} fill={GRAY} fontSize={9} fontFamily="monospace">parallel fan-out</text>
        </g>
      ))}
      <rect x={40} y={400} width={800} height={42} rx={6} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={440} y={420} textAnchor="middle" fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">FUSION: dedupe across towers - keep ~5K unique candidates - feed to ranker</text>
      <text x={440} y={436} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Tower weights tuned per segment via offline replay against held-out interactions</text>
    </svg>
  );
}

function MultiObjective() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Multi-objective ranking">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        MULTI-OBJECTIVE - WHY RAW CTR IS A TRAP
      </text>
      <rect x={40} y={56} width={800} height={50} rx={8} fill="rgba(239,68,68,0.06)" stroke={RED} strokeWidth={1.2} />
      <text x={60} y={78} fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">CTR-ONLY OPTIMIZATION = CLICKBAIT SPIRAL</text>
      <text x={60} y={96} fill={FG} fontSize={9} fontFamily="monospace">High CTR but low dwell, low retention, high regret. Engagement fades, app trust erodes.</text>
      <rect x={40} y={124} width={800} height={300} rx={10} fill="rgba(244,63,94,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={146} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">JOINT OBJECTIVE  (gradient-balanced)</text>
      {[
        { y: 170, name: 'CTR (click prob)',          weight: '0.25', color: BLUE },
        { y: 200, name: 'Dwell time',                 weight: '0.30', color: TEAL },
        { y: 230, name: 'Completion rate',            weight: '0.15', color: GREEN },
        { y: 260, name: '7d retention contribution',   weight: '0.20', color: PURPLE },
        { y: 290, name: 'Revenue (ad / sub)',         weight: '0.07', color: AMBER },
        { y: 320, name: 'Diversity bonus',            weight: '0.03', color: PINK },
      ].map((o, i) => (
        <g key={i}>
          <rect x={60} y={o.y - 14} width={20} height={20} rx={3} fill={o.color} fillOpacity={0.4} stroke={o.color} strokeWidth={1} />
          <text x={88} y={o.y + 1} fill={FG} fontSize={10} fontFamily="monospace">{o.name}</text>
          <rect x={400} y={o.y - 10} width={parseFloat(o.weight) * 400} height={14} rx={3} fill={o.color} fillOpacity={0.5} stroke={o.color} strokeWidth={0.8} />
          <text x={810} y={o.y + 1} textAnchor="end" fill={o.color} fontSize={10} fontWeight={700} fontFamily="monospace">{o.weight}</text>
        </g>
      ))}
      <text x={60} y={360} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">JOINT LOSS</text>
      <text x={60} y={378} fill={FG} fontSize={10} fontFamily="monospace">L = 0.25 * BCE_click + 0.30 * Huber_dwell + 0.15 * BCE_complete + 0.20 * BCE_ret7d + ...</text>
      <text x={60} y={396} fill={GRAY} fontSize={9} fontFamily="monospace">Gradients balanced via GradNorm; weights re-tuned monthly via offline grid + online A/B confirmation.</text>
      <text x={60} y={414} fill={GRAY} fontSize={9} fontFamily="monospace">Held-out segment validates that no single objective dominates and that retention stays positive.</text>
    </svg>
  );
}

function RecSequence() {
  const lanes = [
    { x: 70,  label: 'Client'  },
    { x: 200, label: 'Edge'    },
    { x: 330, label: 'Feat St' },
    { x: 460, label: 'CandGen' },
    { x: 600, label: 'Ranker'  },
    { x: 740, label: 'LLM Rerank'},
  ];
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Recsys serving sequence">
      <defs>
        <marker id="reSArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={600} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE - ONE SERVE (sub-100ms p99)
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={560} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 70,  to: 200, y: 110, label: '1. GET /v1/feed - user_id - ctx',     color: PURPLE },
        { from: 200, to: 200, y: 138, label: '2. authn - cohort - feature flags',    color: BLUE, self: true },
        { from: 200, to: 330, y: 168, label: '3. fetch features (batch 100)',         color: TEAL },
        { from: 330, to: 200, y: 196, label: '4. user + item-pop + ctx features',     color: TEAL, reverse: true },
        { from: 200, to: 460, y: 226, label: '5. candidate gen (4 towers parallel)',  color: GREEN },
        { from: 460, to: 460, y: 254, label: '6. dedupe + filters - 800 cand',        color: GREEN, self: true },
        { from: 460, to: 600, y: 282, label: '7. score with ranker',                   color: AMBER },
        { from: 600, to: 600, y: 310, label: '8. multi-obj head - top-100',           color: AMBER, self: true },
        { from: 600, to: 740, y: 338, label: '9. rerank top-100 - LLM (cached)',     color: PURPLE },
        { from: 740, to: 600, y: 366, label: '10. top-30 with rationale',             color: PURPLE, reverse: true },
        { from: 600, to: 600, y: 394, label: '11. MMR diversify - bandit explore',   color: PINK, self: true },
        { from: 600, to: 200, y: 422, label: '12. final 30 IDs + reasons',            color: GREEN, reverse: true },
        { from: 200, to: 70,  y: 450, label: '13. response - hydrate items',          color: GREEN, reverse: true },
        { from: 70,  to: 200, y: 478, label: '14. impressions logged async',          color: BLUE },
        { from: 200, to: 460, y: 506, label: '15. (later) clicks/dwell to Kafka',     color: BLUE },
        { from: 460, to: 600, y: 534, label: '16. features re-aggregated &lt;60s',      color: TEAL },
      ].map((m, i) => (
        <g key={i}>
          {m.self ? (
            <>
              <path d={`M ${m.from} ${m.y} q 30 -8 0 18`} fill="none" stroke={m.color} strokeWidth={1.4} markerEnd="url(#reSArr)" />
              <text x={m.from + 38} y={m.y + 6} fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          ) : (
            <>
              <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#reSArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
              <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          )}
        </g>
      ))}
      <rect x={40} y={566} width={800} height={26} rx={5} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={584} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        Total: ~80ms p50 / ~95ms p99 - rerank cached per user x content-cluster (90% hit) - $0.0004/serve
      </text>
    </svg>
  );
}

function RecCost() {
  const items = [
    { name: 'Feature fetch',         cents: 0.05, color: TEAL },
    { name: 'Candidate gen',          cents: 0.08, color: GREEN },
    { name: 'Ranker (CPU)',           cents: 0.12, color: AMBER },
    { name: 'LLM rerank (cached)',    cents: 0.10, color: PURPLE },
    { name: 'Diversify + bandit',     cents: 0.02, color: PINK },
    { name: 'Logging + replay',        cents: 0.03, color: BLUE },
  ];
  const total = items.reduce((s, x) => s + x.cents, 0);
  let acc = 0;
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Recsys cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER 1000 SERVES - $0.40 BREAKDOWN
      </text>
      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {items.map((it, i) => {
        const w = (it.cents / total) * 780;
        const x = 50 + acc;
        acc += w;
        return (
          <g key={i}>
            <rect x={x} y={90} width={w} height={60} fill={it.color} fillOpacity={0.45} stroke={it.color} strokeWidth={1} />
            <text x={x + w / 2} y={126} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">{it.cents}c</text>
          </g>
        );
      })}
      {items.map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 2) * 400} ${190 + Math.floor(i / 2) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={370} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">{it.cents}c</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: ~$0.40 / 1K SERVES</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">@ 50K QPS = ~$1700/day = ~$50K/month at peak utilization</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">LLM rerank cached at 90%; cold cost is 5x</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">+8-15% engagement vs no-LLM-rerank baseline drives the ROI</text>
    </svg>
  );
}

function RecFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Recsys failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES + MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'FILTER BUBBLE',    risk: 'monotone slate kills retention',  mit: 'MMR diversify / explore bandit / serendipity bonus' },
        { x: 240, title: 'COLD START',        risk: 'new user / new item gets nothing',mit: 'content-based fallback / popularity / explicit onboarding' },
        { x: 450, title: 'FEATURE DRIFT',     risk: 'training-serving skew',           mit: 'point-in-time joins / drift monitor / nightly retrain' },
        { x: 660, title: 'BIAS / FAIRNESS',   risk: 'pop-bias / demographic skew',     mit: 'audit board / counterfactual eval / re-weighted loss' },
      ].map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={70} width={200} height={310} rx={10} fill={SURFACE} stroke={RED} strokeWidth={1.2} />
          <text x={f.x + 100} y={94} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">{f.title}</text>
          <text x={f.x + 100} y={130} textAnchor="middle" fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">RISK</text>
          <text x={f.x + 100} y={150} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{f.risk}</text>
          <line x1={f.x + 30} y1={210} x2={f.x + 170} y2={210} stroke={DIM} strokeWidth={0.6} />
          <text x={f.x + 100} y={232} textAnchor="middle" fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace">MITIGATIONS</text>
          {f.mit.split(' / ').map((m, k) => (
            <text key={k} x={f.x + 100} y={252 + k * 16} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">- {m}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function RecTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Recsys trade-offs">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DESIGN TRADE-OFFS
      </text>
      <line x1={20} y1={70} x2={860} y2={70} stroke={DIM} strokeWidth={0.5} />
      <text x={40}  y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">DECISION</text>
      <text x={300} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">CHOSE</text>
      <text x={520} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">REJECTED</text>
      <text x={740} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">REASON</text>
      {[
        ['Candidate gen',     '4 parallel towers',                'Single tower',                 'Coverage + cold-start'],
        ['Ranker',            'DLRM (CPU)',                        'GPU NN',                      'Latency budget at scale'],
        ['LLM rerank',        'Top-100 only · cached',             'All candidates',              'Cost vs lift'],
        ['Objective',         'Multi-obj weighted',                'CTR-only',                     'Avoid clickbait spiral'],
        ['Bandit',            'Thompson sampling',                 'Greedy',                       'Sub-linear regret'],
        ['Feature store',     'Tecton (online + offline)',         'Custom Redis',                 'Skew-free serving'],
        ['Embeddings',        'Two-tower retrained nightly',       'Static',                       'Capture new content'],
        ['Cold-start',        'Content + popularity blend',        'Random',                       'NDCG @ K=10 floor'],
        ['Diversity',         'MMR + tag re-spread',                'None',                         'Long-term retention'],
      ].map((r, i) => {
        const y = 100 + i * 32;
        return (
          <g key={i}>
            {i % 2 === 0 && <rect x={20} y={y - 18} width={840} height={28} rx={4} fill="rgba(255,255,255,0.02)" />}
            <text x={40} y={y} fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">{r[0]}</text>
            <text x={300} y={y} fill={C} fontSize={9} fontFamily="monospace">{r[1]}</text>
            <text x={520} y={y} fill={GRAY} fontSize={9} fontFamily="monospace">{r[2]}</text>
            <text x={740} y={y} fill={GRAY} fontSize={9} fontFamily="monospace">{r[3]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function RecDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Recsys deployment">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT - LOW-LATENCY EDGE - GLOBAL FAN-OUT
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare / Fastly - per-region cache - circuit breakers - bot mitigation</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(244,63,94,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">REGION (one of 6 - active-active globally)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">SERVING TIER</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">- feed-api - 60 pods (HPA)</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">- ranker-svc (CPU) - 80 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">- candgen-svc - 30 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">- llm-rerank-edge - 20 pods</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">SLO: p99 less than 100ms</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">DATA TIER</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">- Tecton (feature store)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">- Redis (online features)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">- ScaNN / FAISS (ANN)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">- Cassandra (item meta)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">replicated cross-region</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">TRAINING TIER (offline)</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">- nightly retrain (Spark/Ray)</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">- A/B harness</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">- offline replay - NDCG check</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">- model registry (MLflow)</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">canary 1% then 100%</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EVENT PIPELINE</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">- Kafka (1B events/day) - schema registry - DLQ</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">- Flink (windowed aggregations) - feature materialization</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">- BigQuery / Snowflake (offline analytics)</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel - feature drift dashboard - bandit regret - bias audit board - online metrics (CTR/dwell/retention)</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">Active-active 6 regions - graceful fallback to popular-only on region loss - RTO 0</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">Stale features for &lt;5min are acceptable; total outage is not</text>
    </svg>
  );
}

export default function ProjectRecsysPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Netflix / Spotify / TikTok-class with LLM augmentation" color={C} />
          <p>
            Build a <H tip="Modern recommendation system = a real-time multi-objective ML serving stack that picks the right item to surface to a user, sub-100ms p99, with billions of events/day informing it. References: Netflix two-tower / DLRM, Spotify HelloFresh, TikTok ByteDance Monolith, YouTube ranking, Pinterest PinSage. The 2026 twist: LLM rerankers add semantic relevance and explainability layered on top of classical ML." color={C}>recommendation system</H> for a 50M-DAU consumer app (video / music / commerce / news — pick one). Hard goals: p99 serve latency &lt;100ms, +8-15% engagement vs baseline, 60s feature freshness, sub-linear bandit regret, 50K peak QPS, $&lt;0.40 per 1K serves all-in.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: it&apos;s the engine that decides what shows up next. Most of the magic isn&apos;t the LLM — it&apos;s the feature store, candidate towers, and ranker. The LLM rerank is the 2026 cherry on top.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: content moderation, ad targeting, full personalization (user settings, profile mgmt). The system picks; humans (and other systems) decide what&apos;s eligible.
          </Callout>
          <StackCard
            accent={C}
            title="AI Recommendation System · Netflix/TikTok-class"
            subtitle="Event → feature → candidate → rank → LLM rerank → diversify → serve. p99 < 100ms."
            slos={[
              { label: 'p99 SERVE',    value: '< 100 ms', note: 'sub-second feel' },
              { label: 'QPS PEAK',      value: '~50 K',    note: 'prime time' },
              { label: 'CLICK LIFT',   value: '+8-15%',   note: 'vs baseline' },
              { label: 'FEATURE FRESH',value: '< 60 s',    note: 'real-time' },
            ]}
            stack={[
              { layer: 'Events',       choice: 'Kafka (1B/day) + schema reg',         why: 'Sessionize · dedupe' },
              { layer: 'Feature store',choice: 'Tecton (online + offline)',           why: 'Skew-free serving' },
              { layer: 'Candidates',   choice: '4 towers (collab/content/sem/pop)',    why: 'Coverage + cold-start' },
              { layer: 'Ranker',       choice: 'DLRM (CPU) · multi-obj loss',         why: 'Latency budget' },
              { layer: 'LLM rerank',   choice: 'Haiku 4.5 · cached per (u × cluster)', why: '+5-10% on natural Q' },
              { layer: 'Diversify',    choice: 'MMR + Thompson sampling (5%)',          why: 'No filter bubble' },
              { layer: 'Eval',         choice: 'A/B harness + offline replay',          why: 'Stat-sig gates' },
            ]}
            scale={[
              { label: 'DAU',              value: '50 M' },
              { label: 'Events / day',      value: '~1 B' },
              { label: 'Serves / day',      value: '~500 M' },
              { label: 'Annual infra',      value: '$5-7 M' },
            ]}
            cost={{
              perUnit: '$0.40',
              unitLabel: 'per 1K serves',
              perPeriod: '~$50 K',
              periodLabel: 'per month',
            }}
            moats={[
              'Multi-objective beats CTR-only · prevents clickbait spiral',
              'LLM rerank LAYERS on classical · doesn\'t replace',
              'Tecton point-in-time joins kill train-serve skew',
              'NDCG@10 ≥ 0.65 cold-start floor · product gate',
            ]}
          />
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <RecReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="DAU · events · QPS · cost" color={C} />
          <FormulaSteps
            steps={[
              { label: 'DAU',             formula: 'D = 50\\,M', explanation: 'Mid-large consumer scale.' },
              { label: 'Events / day',    formula: 'E \\approx 1\\,B', explanation: '~20 events per DAU per day.' },
              { label: 'Serves / day',    formula: 'S \\approx 500\\,M', explanation: '~10 feed loads per DAU.' },
              { label: 'Peak QPS',        formula: 'qps_{peak} \\approx \\frac{S}{86400} \\times 8 \\approx 50K', explanation: '8× burst on prime time.' },
              { label: 'Cost / 1K serves',formula: '\\$0.40', explanation: 'Mostly ranker CPU + LLM rerank.' },
              { label: 'Annual infra',    formula: '\\sim \\$5-7\\,M / year', explanation: 'GPU training + serving + storage.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Event → feature → candidate → rank → rerank → serve" color={C} />
          <RecArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Event ingest</strong>: SDK fires impressions/clicks/dwell/skip/like/share/etc. → Kafka.</li>
            <li><strong>Feature store</strong>: Tecton or Feast · online + offline · point-in-time consistent.</li>
            <li><strong>Embeddings</strong>: user-tower + item-tower · trained nightly · refreshed live for new items.</li>
            <li><strong>Candidate gen</strong>: 4 parallel towers (collab, content, semantic-LLM, popular) → ~5K candidates.</li>
            <li><strong>Filters</strong>: seen-cooldown · inventory · policy · blocked · cold-start fallback.</li>
            <li><strong>Ranker</strong>: DLRM / Wide+Deep / two-tower head · multi-objective loss · ~15ms p50.</li>
            <li><strong>LLM reranker</strong>: Haiku 4.5 reorders top-100 by semantic relevance · cached per user × cluster.</li>
            <li><strong>Diversify + bandit</strong>: MMR diversify · 5% Thompson explore · serendipity bonus.</li>
          </ul>
        </section>
      )}

      {show('Candidate Generation') && (
        <section>
          <SectionHeader num="05" title="Candidate Generation" subtitle="4 parallel towers · why each exists" color={C} />
          <CandidateGen />
          <p>
            One tower never works at scale. Collab is great for warm users with rich history but useless cold-start. Content covers cold-start items but misses preference signals. Semantic-LLM catches natural-language intent (&quot;something funny but short&quot;) but is slow. Popular is the safety net. Fused, deduped, capped at ~5K candidates → ranker. Tower weights are tuned per segment via offline replay.
          </p>
        </section>
      )}

      {show('Multi-Objective Ranking') && (
        <section>
          <SectionHeader num="06" title="Multi-Objective Ranking" subtitle="CTR-only is a trap · joint loss + GradNorm" color={C} />
          <MultiObjective />
          <Callout type="warning">
            Optimizing CTR alone makes the slate clickbaity over weeks. Dwell, completion, and 7-day retention are the real targets. Re-tune objective weights monthly via offline grid + online A/B confirmation. Always keep a held-out fairness segment.
          </Callout>
        </section>
      )}

      {show('LLM Reranker') && (
        <section>
          <SectionHeader num="07" title="LLM Reranker" subtitle="Top-100 → top-30 with semantic + explanations" color={C} />
          <h3>Why it exists</h3>
          <p>
            Classical rankers optimize learned features. LLM reranker optimizes semantic relevance — &quot;is this what the user actually meant?&quot;. It adds 5-10% engagement lift on natural-language-intent slates (search-feed hybrid, voice queries), and produces an explanation token (&quot;because you watched X&quot;) that lifts trust and feedback quality.
          </p>
          <h3>How we afford it</h3>
          <ul>
            <li><strong>Cached per (user × content-cluster)</strong>: 90% hit rate · 10× cheaper than uncached.</li>
            <li><strong>Top-100 only</strong>: ranker already pre-narrowed; LLM reorders.</li>
            <li><strong>Haiku 4.5</strong>: latency-optimized · structured-output · ~30ms p50.</li>
            <li><strong>Bandit-gated</strong>: skip rerank for low-value slates (cost guard).</li>
          </ul>
        </section>
      )}

      {show('Sequence: One Serve') && (
        <section>
          <SectionHeader num="08" title="Sequence: One Serve" subtitle="Sub-100ms p99 - all 16 hops" color={C} />
          <RecSequence />
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="09" title="API & Data Model" subtitle="REST · WS push · event ingestion" color={C} />
          <ComparisonTable
            headers={['Method', 'Endpoint', 'Purpose']}
            rows={[
              ['GET',  '/v1/feed?user=&ctx=',         'serve feed - 30 items'],
              ['POST', '/v1/events',                   'log impression / click / dwell'],
              ['GET',  '/v1/items/:id/related',        'item-page recommendations'],
              ['POST', '/v1/feedback',                  'thumbs / report / not-interested'],
              ['GET',  '/v1/explain/:rec_id',          'why this rec (LLM rationale)'],
              ['POST', '/v1/admin/objective_weights',  'rebalance multi-obj weights'],
              ['GET',  '/v1/metrics?cohort=&exp=',     'A/B and segment metrics'],
            ]}
          />
          <h3>Key tables</h3>
          <ul>
            <li><code>users</code>, <code>items</code>, <code>events</code>, <code>features_online</code>, <code>features_offline</code>, <code>embeddings</code>, <code>experiments</code>, <code>impressions</code>.</li>
            <li><code>events</code> is the firehose — partition by hour, TTL hot 30d / archive 2y.</li>
            <li><code>features_online</code> is Redis-backed; <code>features_offline</code> is parquet on S3 for training.</li>
          </ul>
        </section>
      )}

      {show('Cold Start') && (
        <section>
          <SectionHeader num="10" title="Cold Start" subtitle="New user · new item · new market" color={C} />
          <ul>
            <li><strong>New user</strong>: explicit onboarding (interests) + popular-by-segment + content-based bootstrap. Switch to collab tower after ~50 interactions.</li>
            <li><strong>New item</strong>: content embedding from metadata + image + text. Blend with collab as engagement accumulates.</li>
            <li><strong>New market</strong>: transfer popular slate from similar markets · slow rollout · bandit explore aggressively.</li>
            <li><strong>NDCG@10 floor</strong>: ≥ 0.65 in cold-start cohort or we don&apos;t ship.</li>
          </ul>
        </section>
      )}

      {show('Bandit & Exploration') && (
        <section>
          <SectionHeader num="11" title="Bandit & Exploration" subtitle="Explore enough · exploit smartly" color={C} />
          <p>
            Pure greedy ranking creates filter bubbles and starves new content. Pure random kills engagement. <H tip="Thompson sampling = a Bayesian bandit strategy that samples from posterior estimates of arm values, then plays the sample-max arm. Provides natural exploration that decreases as confidence grows." color={C}>Thompson sampling</H> over the top-N candidates gives sub-linear regret with natural exploration. Contextual bandits add user/item features to the bandit — different exploration rate for different user types. Production target: 5% explore, 95% exploit, with re-allocation by cohort.
          </p>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="12" title="Deployment Topology" subtitle="Low-latency edge · global fan-out" color={C} />
          <RecDeployment />
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="13" title="Cost Analysis" subtitle="Per-1K-serve economics" color={C} />
          <RecCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="14" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <RecFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="15" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <RecTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="16" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="Latency budget is a constraint, not a goal"
            color={C}
            analogy="A grocery checkout has 60 seconds; that's the math, not the aspiration."
            technical="100ms p99 forces serving choices: CPU ranker, cached LLM rerank, ANN over exact NN. Every component is graded on contribution."
          />
          <MentalModel
            title="Multi-objective beats CTR"
            color={GREEN}
            analogy="A restaurant optimizing only foot traffic ends up serving cheap food; the long-term play is better margins per customer."
            technical="Joint loss with weighted CTR + dwell + completion + retention prevents clickbait and grows long-term engagement."
          />
          <MentalModel
            title="LLM rerank is a 2026 layer, not a replacement"
            color={PURPLE}
            analogy="A sommelier picks from the wine list; they don't make the wine."
            technical="Classical ranker generates the list. LLM reranks the top-100 for semantic relevance. Don't swap; layer."
          />
          <MentalModel
            title="Cold-start NDCG floor is a product gate"
            color={AMBER}
            analogy="A restaurant whose first impression is cold tea loses the customer."
            technical="A new user's first session quality predicts their retention more than any other signal. NDCG@10 ≥ 0.65 in cold cohort or we don't ship."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="17" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>Netflix recommendation engineering posts (1B-DAU scale)</li>
            <li>YouTube DNN papers (deep ranking, multi-task)</li>
            <li>TikTok / ByteDance Monolith paper</li>
            <li>Pinterest PinSage paper</li>
            <li>Tecton + Feast docs (feature store patterns)</li>
            <li>This module&apos;s research vault: <code>vault/research/project-recsys/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design a Netflix-class recsys on a whiteboard in 45 min, justify multi-tower candidate gen + multi-objective ranking + LLM rerank layering, and explain why latency + cold-start drive every other decision.
          </Callout>
        </section>
      )}
    </>
  );
}
