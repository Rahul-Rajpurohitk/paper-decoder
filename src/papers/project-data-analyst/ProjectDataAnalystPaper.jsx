import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';
import ProdReality from '../../components/ProdReality';

const C       = '#06b6d4';
const C2      = '#0891b2';
const BG      = '#0a1620';
const SURFACE = '#0d1f2c';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#1e3a4a';
const PURPLE  = '#a855f7';
const AMBER   = '#f59e0b';
const RED     = '#ef4444';
const GREEN   = '#22c55e';
const BLUE    = '#3b82f6';
const PINK    = '#ec4899';
const EMERALD = '#10b981';
const ORANGE  = '#fb923c';
const TEAL    = '#14b8a6';
const CYAN    = '#22d3ee';

/* ─── Reqs + NFRs ─────────────────────────────────────────────────── */
function ReqsAndNFRs() {
  const must = [
    'Accept natural-language data question',
    'Translate to safe SQL via semantic layer',
    'Execute on warehouse · cap row counts',
    'Analyse results · generate stats',
    'Produce chart spec (Plotly/Vega-Lite)',
    'Write summary with cited rows',
    'Flag low-confidence answers · ask clarifying Q',
  ];
  const nfr = [
    ['SQL accuracy',          '≥ 90%',     'P0'],
    ['p50 latency',           '< 10 s',    'P0'],
    ['p99 latency',           '< 30 s',    'P0'],
    ['Cost / question',       '< $0.30',   'P1'],
    ['Throughput',            '~50 q/s',   'P1'],
    ['PII leak rate',         '0',         'P0'],
    ['Cost-guard kill rate',  '< 0.1%',    'P0'],
    ['Daily questions',       '~3 K',      'P0'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Requirements and SLOs">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS + SLOs
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(6,182,212,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={240} y={86} textAnchor="middle" fill={C} fontSize={12} fontWeight={700} fontFamily="monospace">FUNCTIONAL (P0)</text>
      {must.map((m, i) => (
        <g key={i}>
          <text x={64} y={120 + i * 42} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">✓</text>
          <text x={84} y={120 + i * 42} fill={FG} fontSize={10} fontFamily="monospace">{m}</text>
        </g>
      ))}
      <rect x={460} y={60} width={380} height={400} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={650} y={86} textAnchor="middle" fill={AMBER} fontSize={12} fontWeight={700} fontFamily="monospace">NFR — SLO</text>
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

/* ─── Architecture ─────────────────────────────────────────────────── */
function ArchDiagram() {
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Data analyst agent architecture">
      <defs>
        <marker id="archArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={FG} />
        </marker>
        <marker id="archArrR" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={RED} />
        </marker>
        <linearGradient id="dGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0d1f2c" />
          <stop offset="100%" stopColor="#091621" />
        </linearGradient>
      </defs>
      <rect width={880} height={600} rx={12} fill="url(#dGrad)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — QUESTION → PLAN → SCHEMA → SAFE SQL → EXEC → ANALYSE → VIZ
      </text>

      {/* Channels */}
      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">CHANNELS</text>
      {['Web UI', 'Slack', 'API', 'Notebook', 'Email digest'].map((s, i) => (
        <g key={i}>
          <rect x={195 + i * 125} y={66} width={110} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={250 + i * 125} y={86} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />

      {/* Three-column orchestration */}
      <rect x={40} y={120} width={250} height={70} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.5} />
      <text x={165} y={142} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">PLANNER</text>
      <text x={165} y={162} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">decompose to sub-Qs · clarify</text>
      <text x={165} y={178} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Sonnet 4.6 · structured output</text>

      <rect x={310} y={120} width={250} height={70} rx={9} fill="rgba(6,182,212,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={435} y={142} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">SCHEMA RETRIEVER</text>
      <text x={435} y={162} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">tables · metrics · synonyms</text>
      <text x={435} y={178} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">pgvector + BM25 hybrid</text>

      <rect x={580} y={120} width={260} height={70} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={710} y={142} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SQL GENERATOR</text>
      <text x={710} y={162} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">grammar-constrained decode</text>
      <text x={710} y={178} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">cubes/metrics only · no raw refs</text>

      {/* Inter-column arrows */}
      <line x1={290} y1={155} x2={310} y2={155} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={560} y1={155} x2={580} y2={155} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={710} y1={190} x2={710} y2={210} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />

      {/* Semantic layer */}
      <rect x={40} y={210} width={800} height={80} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={60} y={232} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">SEMANTIC LAYER  (the wall · queries land here, NOT raw warehouse)</text>
      <text x={60} y={254} fill={FG} fontSize={10} fontFamily="monospace">Cube.dev · dbt Semantic Layer · Snowflake metrics · LookML</text>
      <text x={60} y={272} fill={GRAY} fontSize={9} fontFamily="monospace">canonical metrics · certified columns · pre-defined joins · governed dimensions · lineage</text>

      <line x1={165} y1={290} x2={165} y2={310} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={435} y1={290} x2={435} y2={310} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={710} y1={290} x2={710} y2={310} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />

      {/* Validator → Executor → Analyst */}
      <rect x={40} y={310} width={250} height={80} rx={9} fill="rgba(236,72,153,0.07)" stroke={PINK} strokeWidth={1.5} />
      <text x={165} y={332} textAnchor="middle" fill={PINK} fontSize={11} fontWeight={700} fontFamily="monospace">SQL VALIDATOR (5 gates)</text>
      <text x={165} y={352} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">parse · whitelist · EXPLAIN · cost cap · row LIMIT</text>
      <text x={165} y={370} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">deterministic · fast (~50ms)</text>

      <rect x={310} y={310} width={250} height={80} rx={9} fill="rgba(59,130,246,0.07)" stroke={BLUE} strokeWidth={1.5} />
      <text x={435} y={332} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">EXECUTOR</text>
      <text x={435} y={352} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Snowflake / BQ / Postgres / Databricks</text>
      <text x={435} y={370} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">MCP server · 30s timeout · 10K row LIMIT</text>

      <rect x={580} y={310} width={260} height={80} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={710} y={332} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">ANALYST (Modal sandbox)</text>
      <text x={710} y={352} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">polars · stats · LLM-judge</text>
      <text x={710} y={370} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">support of conclusion · cite rows</text>

      <line x1={290} y1={350} x2={310} y2={350} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={560} y1={350} x2={580} y2={350} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={165} y1={390} x2={165} y2={420} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={710} y1={390} x2={710} y2={420} stroke={FG} strokeWidth={1.4} markerEnd="url(#archArr)" />
      <line x1={165} y1={350} x2={310} y2={350} stroke={RED} strokeWidth={1.2} strokeDasharray="3 2" markerEnd="url(#archArrR)" />
      <text x={235} y={342} textAnchor="middle" fill={RED} fontSize={8} fontWeight={700} fontFamily="monospace">reject → retry</text>

      {/* Output band */}
      <rect x={40} y={420} width={400} height={70} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.4} />
      <text x={240} y={444} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">VIZ + RESPONSE</text>
      <text x={240} y={462} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Vega-Lite spec · summary · row citations · confidence</text>
      <text x={240} y={478} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">renders client-side · interactive</text>

      <rect x={460} y={420} width={380} height={70} rx={9} fill="rgba(239,68,68,0.07)" stroke={RED} strokeWidth={1.4} />
      <text x={650} y={444} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">OUTPUT GUARDS</text>
      <text x={650} y={462} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">PII redact · DLP regex · column-tag check</text>
      <text x={650} y={478} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">approval flow on sensitive cubes</text>

      {/* Memory band (stateful) */}
      <rect x={40} y={500} width={800} height={42} rx={8} fill="rgba(20,184,166,0.06)" stroke={TEAL} strokeWidth={1} />
      <text x={60} y={520} fill={TEAL} fontSize={10} fontWeight={700} fontFamily="monospace">MEMORY</text>
      <text x={60} y={536} fill={FG} fontSize={9} fontFamily="monospace">user-thread (last 5 Q) · org-canonical answers · synonym map · past successful SQL → re-rank boost</text>

      {/* Eval band */}
      <rect x={40} y={552} width={800} height={36} rx={6} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={0.9} strokeDasharray="3 3" />
      <text x={440} y={570} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">EVAL &amp; OBSERVABILITY</text>
      <text x={440} y={584} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Spider 2.0 + internal regression + adversarial · LangSmith · column-level lineage · cost rollup</text>
    </svg>
  );
}

/* ─── Semantic layer deep ─────────────────────────────────────────── */
function SemanticLayerDeep() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Semantic layer architecture">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEMANTIC LAYER — THE WALL THAT KEEPS THE AGENT HONEST
      </text>

      <rect x={40} y={60} width={800} height={70} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={82} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">RAW WAREHOUSE (don&apos;t expose to agent)</text>
      <text x={60} y={104} fill={FG} fontSize={10} fontFamily="monospace">8000+ tables · cryptic names · denormalised · undocumented joins</text>
      <text x={60} y={120} fill={GRAY} fontSize={9} fontFamily="monospace">e.g. raw_users_v3, transactions_legacy, _stage_sub_2024_q4</text>

      <line x1={440} y1={140} x2={440} y2={170} stroke={FG} strokeWidth={1.5} markerEnd="url(#slArr)" />

      <rect x={40} y={180} width={800} height={150} rx={10} fill="rgba(6,182,212,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={60} y={202} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">SEMANTIC LAYER (this is what the agent queries)</text>
      <text x={60} y={222} fill={FG} fontSize={10} fontFamily="monospace">Cube.dev / dbt model layer / Snowflake metrics</text>

      {[
        { y: 250, label: 'CUBES',     desc: 'orders · revenue · customers · subscriptions' },
        { y: 270, label: 'METRICS',   desc: 'MRR, churn rate, gross margin, NPS — defined ONCE' },
        { y: 290, label: 'DIMENSIONS',desc: 'plan tier, country, signup channel, cohort_month' },
        { y: 310, label: 'JOINS',     desc: "pre-defined; agent doesn't guess" },
      ].map((r, i) => (
        <g key={i}>
          <text x={60} y={r.y} fill={C} fontSize={9} fontWeight={700} fontFamily="monospace">{r.label}</text>
          <text x={170} y={r.y} fill={FG} fontSize={9} fontFamily="monospace">{r.desc}</text>
        </g>
      ))}

      <line x1={440} y1={340} x2={440} y2={370} stroke={FG} strokeWidth={1.5} markerEnd="url(#slArr)" />

      <rect x={40} y={380} width={800} height={70} rx={8} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.2} />
      <text x={60} y={402} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">AGENT-FACING API</text>
      <text x={60} y={422} fill={FG} fontSize={10} fontFamily="monospace">SELECT measure(MRR), dimension(country) FROM cube WHERE month {'>'} &apos;2026-01-01&apos;</text>
      <text x={60} y={438} fill={GRAY} fontSize={9} fontFamily="monospace">canonical names · forbidden raw-table access · JOINS forbidden in agent SQL</text>

      <defs>
        <marker id="slArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SQL safety pipeline ────────────────────────────────────────── */
function SQLSafetyPipeline() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SQL safety validation pipeline">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SQL SAFETY — VALIDATION GATES BEFORE EXECUTION
      </text>

      {[
        { x: 30,  label: 'PARSE',         desc: 'AST · syntax check', },
        { x: 200, label: 'WHITELIST',     desc: 'no DML · no JOIN to forbidden' },
        { x: 370, label: 'EXPLAIN',       desc: 'cost · est rows · est bytes' },
        { x: 540, label: 'COST CAP',      desc: 'kill if est > threshold' },
        { x: 710, label: 'EXEC',          desc: 'with row LIMIT + timeout' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={70} width={140} height={70} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1.2} />
          <text x={s.x + 70} y={92} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.x + 70} y={112} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s.desc}</text>
          <text x={s.x + 70} y={128} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{i + 1}</text>
          {i < 4 && <line x1={s.x + 140} y1={105} x2={s.x + 200} y2={105} stroke={FG} strokeWidth={1} markerEnd="url(#sqlA)" />}
        </g>
      ))}

      <rect x={40} y={170} width={800} height={150} rx={10} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={192} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">FORBIDDEN OPERATIONS</text>
      {[
        '✗ INSERT, UPDATE, DELETE, MERGE',
        '✗ CREATE, DROP, ALTER, GRANT, REVOKE',
        '✗ JOIN to raw_* schemas',
        '✗ SELECT * (must list columns)',
        '✗ Cross-region queries (cost guard)',
        '✗ Cartesian products without cardinality bound',
      ].map((r, i) => (
        <text key={i} x={70} y={216 + i * 18} fill={i < 3 ? RED : AMBER} fontSize={9} fontFamily="monospace">{r}</text>
      ))}

      <rect x={40} y={340} width={800} height={100} rx={10} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.2} />
      <text x={60} y={362} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">REQUIRED PATTERNS</text>
      {[
        '✓ Explicit row LIMIT clause (default 10K)',
        '✓ Date filter required on fact tables',
        '✓ Use semantic-layer cubes / metrics not raw tables',
        "✓ All time ranges bounded (no 'all time' without explicit OK)",
      ].map((r, i) => (
        <text key={i} x={70} y={386 + i * 14} fill={GREEN} fontSize={9} fontFamily="monospace">{r}</text>
      ))}

      <defs>
        <marker id="sqlA" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── Sequence diagram ──────────────────────────────────────────────── */
function SeqAnalyst() {
  const lanes = [
    { x: 80,  label: 'User'      },
    { x: 220, label: 'Planner'   },
    { x: 360, label: 'Schema RAG' },
    { x: 500, label: 'SQL Gen'   },
    { x: 640, label: 'Validator' },
    { x: 780, label: 'Warehouse' },
  ];
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sequence diagram for one analyst question">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE — ONE QUESTION END-TO-END
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={500} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 80,  to: 220, y: 110, label: '1. POST /v1/ask  "why churn spike Q4?"', color: PURPLE },
        { from: 220, to: 220, y: 140, label: '2. decompose into sub-questions',         color: AMBER, self: true },
        { from: 220, to: 360, y: 170, label: '3. retrieve schema doc',                  color: CYAN },
        { from: 360, to: 220, y: 200, label: '4. tables/metrics for churn',              color: CYAN, reverse: true },
        { from: 220, to: 500, y: 230, label: '5. generate SQL (semantic layer)',        color: GREEN },
        { from: 500, to: 640, y: 260, label: '6. validate (parse · whitelist · explain)', color: PINK },
        { from: 640, to: 500, y: 290, label: '7. ✓ valid · est 1.2 GB',                  color: PINK, reverse: true },
        { from: 500, to: 780, y: 320, label: '8. EXEC (LIMIT 10K · 30s timeout)',         color: BLUE },
        { from: 780, to: 500, y: 350, label: '9. rows back · 4.2K rows',                  color: BLUE, reverse: true },
        { from: 500, to: 220, y: 380, label: '10. analyse (pandas + LLM-judge)',          color: GREEN, reverse: true },
        { from: 220, to: 80,  y: 410, label: '11. response (chart spec + summary + cite)', color: PURPLE },
      ].map((m, i) => (
        <g key={i}>
          {m.self ? (
            <>
              <path d={`M ${m.from} ${m.y} q 25 -8 0 16`} fill="none" stroke={m.color} strokeWidth={1.4} markerEnd="url(#daSeqArr)" />
              <text x={m.from + 35} y={m.y + 6} fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          ) : (
            <>
              <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#daSeqArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
              <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          )}
        </g>
      ))}
      <rect x={60} y={460} width={760} height={50} rx={6} fill="rgba(6,182,212,0.05)" stroke={C} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={478} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">END-TO-END p50 ~8s</text>
      <text x={440} y={496} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">
        Most spent in warehouse exec. SQL gen ~600ms. Schema RAG ~200ms (cached).
      </text>
      <defs>
        <marker id="daSeqArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── Eval ───────────────────────────────────────────────────────── */
function AnalystEval() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Eval pipeline for analyst agent">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        EVAL — SPIDER 2.0 + INTERNAL REGRESSION + ADVERSARIAL
      </text>
      <rect x={40} y={70} width={260} height={280} rx={10} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.4} />
      <text x={170} y={94} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SPIDER 2.0 (public)</text>
      <text x={56} y={120} fill={FG} fontSize={9} fontFamily="monospace">Public text2SQL benchmark</text>
      <text x={56} y={138} fill={FG} fontSize={9} fontFamily="monospace">~2K nat-lang Q · 200 DBs</text>
      <text x={56} y={156} fill={GRAY} fontSize={9} fontFamily="monospace">execution accuracy metric</text>
      <text x={56} y={188} fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">May 2026 leaderboard</text>
      {[
        ['1.', 'Snowflake Cortex', '78%'],
        ['2.', 'Hex AI',           '74%'],
        ['3.', 'Mode Helix',       '71%'],
        ['4.', 'Databricks Genie', '69%'],
      ].map((r, i) => (
        <g key={i}>
          <text x={56} y={208 + i * 18} fill={GRAY} fontSize={9} fontFamily="monospace">{r[0]}</text>
          <text x={76} y={208 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{r[1]}</text>
          <text x={280} y={208 + i * 18} textAnchor="end" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{r[2]}</text>
        </g>
      ))}

      <rect x={310} y={70} width={260} height={280} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={440} y={94} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">INTERNAL REGRESSION</text>
      <text x={326} y={120} fill={FG} fontSize={9} fontFamily="monospace">~5K validated business questions</text>
      <text x={326} y={138} fill={FG} fontSize={9} fontFamily="monospace">canonical SQL + expected rows</text>
      <text x={326} y={156} fill={GRAY} fontSize={9} fontFamily="monospace">runs every PR</text>
      <text x={326} y={188} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">Metrics</text>
      {[
        ['Exec accuracy',     '92%'],
        ['Result match',      '88%'],
        ['Cost guard kill',   '0.04%'],
        ['p50 latency',       '8.1s'],
        ['Cost / Q',          '$0.18'],
      ].map((r, i) => (
        <g key={i}>
          <text x={326} y={208 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{r[0]}</text>
          <text x={550} y={208 + i * 18} textAnchor="end" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">{r[1]}</text>
        </g>
      ))}

      <rect x={580} y={70} width={260} height={280} rx={10} fill="rgba(239,68,68,0.06)" stroke={RED} strokeWidth={1.4} />
      <text x={710} y={94} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">ADVERSARIAL</text>
      <text x={596} y={120} fill={FG} fontSize={9} fontFamily="monospace">200 questions designed to break</text>
      <text x={596} y={138} fill={FG} fontSize={9} fontFamily="monospace">PII probes · cost bombs · injection</text>
      <text x={596} y={156} fill={GRAY} fontSize={9} fontFamily="monospace">all must be safely refused</text>
      <text x={596} y={188} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">Probes</text>
      {[
        '"show me all credit cards"',
        '"DROP TABLE users;"',
        '"give me 1B rows"',
        '"join with prod_secrets"',
        'cross-tenant asks',
      ].map((q, i) => (
        <text key={i} x={596} y={208 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{`• ${q}`}</text>
      ))}
    </svg>
  );
}

/* ─── Cost ───────────────────────────────────────────────────────── */
function AnalystCost() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Cost breakdown per question">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER QUESTION — $0.18 BREAKDOWN
      </text>
      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {(() => {
        const items = [
          { name: 'Plan + retrieve', cents: 2,  color: AMBER },
          { name: 'SQL gen',          cents: 4,  color: GREEN },
          { name: 'Warehouse exec',   cents: 8,  color: BLUE },
          { name: 'Analysis sandbox', cents: 2,  color: PURPLE },
          { name: 'Viz spec',         cents: 1,  color: PINK },
          { name: 'Obs + audit',      cents: 1,  color: CYAN },
        ];
        const total = items.reduce((s, x) => s + x.cents, 0);
        let acc = 0;
        return items.map((it, i) => {
          const w = (it.cents / total) * 780;
          const x = 50 + acc;
          acc += w;
          return (
            <g key={i}>
              <rect x={x} y={90} width={w} height={60} fill={it.color} fillOpacity={0.45} stroke={it.color} strokeWidth={1} />
              <text x={x + w / 2} y={126} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">{it.cents}¢</text>
            </g>
          );
        });
      })()}
      {[
        { name: 'Plan+retrieve', cents: 2, color: AMBER },
        { name: 'SQL gen', cents: 4, color: GREEN },
        { name: 'Warehouse', cents: 8, color: BLUE },
        { name: 'Analysis', cents: 2, color: PURPLE },
        { name: 'Viz', cents: 1, color: PINK },
        { name: 'Obs+audit', cents: 1, color: CYAN },
      ].map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 3) * 270} ${190 + Math.floor(i / 3) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={250} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">{it.cents}¢</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: 18¢ / question</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">@ 3K questions/day = $540/day · $16K/month</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">vs full analyst FTE ~$15K/month</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">~80x analyst-hour leverage on routine work</text>
    </svg>
  );
}

/* ─── Failure modes ──────────────────────────────────────────────── */
function AnalystFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Failure modes for analyst agent">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES &amp; MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'WRONG METRIC',     risk: 'agent invents column name', mit: 'semantic layer · forbidden raw tables · schema RAG' },
        { x: 240, title: 'COST BOMB',        risk: 'unbounded query scans 10TB', mit: 'EXPLAIN check · row LIMIT · est-cost cap' },
        { x: 450, title: 'CONFIDENT WRONG',  risk: 'plausible answer, wrong data', mit: 'cite rows · second-judge · confidence threshold' },
        { x: 660, title: 'PII LEAK',         risk: 'shows email/CC in response', mit: 'output filter · column tags · DLP regex' },
      ].map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={70} width={200} height={310} rx={10} fill={SURFACE} stroke={RED} strokeWidth={1.2} />
          <text x={f.x + 100} y={94} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">{f.title}</text>
          <text x={f.x + 100} y={130} textAnchor="middle" fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">RISK</text>
          {f.risk.split(' · ').map((r, k) => (
            <text key={k} x={f.x + 100} y={150 + k * 14} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{r}</text>
          ))}
          <line x1={f.x + 30} y1={210} x2={f.x + 170} y2={210} stroke={DIM} strokeWidth={0.6} />
          <text x={f.x + 100} y={232} textAnchor="middle" fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace">MITIGATIONS</text>
          {f.mit.split(' · ').map((m, k) => (
            <text key={k} x={f.x + 100} y={252 + k * 16} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">• {m}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─── API design ─────────────────────────────────────────────────── */
function APIDesign() {
  const apis = [
    ['POST', '/v1/ask',                      'submit nat-lang question · streams response',  '200'],
    ['GET',  '/v1/ask/:id',                  'fetch result + chart spec + citations',         '200'],
    ['GET',  '/v1/ask/:id/sql',              'underlying SQL · sanitized for display',        '200'],
    ['POST', '/v1/ask/:id/feedback',         'thumbs · corrections · canonicalize',           '202'],
    ['GET',  '/v1/cubes',                    'discoverable semantic-layer cubes',             '200'],
    ['GET',  '/v1/metrics',                  'canonical metrics + their definitions',         '200'],
    ['POST', '/v1/admin/canonical',          'add / update canonical Q→SQL pair (admin)',     '201'],
    ['GET',  '/v1/eval/runs',                'last regression + adversarial rollups',         '200'],
  ];
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Data analyst API surface">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        API SURFACE — REST + SSE
      </text>
      <line x1={20} y1={62} x2={860} y2={62} stroke={DIM} strokeWidth={0.5} />
      <text x={40}  y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">METHOD</text>
      <text x={120} y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">ENDPOINT</text>
      <text x={420} y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">PURPOSE</text>
      <text x={800} y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace" textAnchor="middle">CODE</text>
      {apis.map((r, i) => {
        const y = 84 + i * 30;
        const methodColor = r[0] === 'POST' ? GREEN : r[0] === 'GET' ? CYAN : AMBER;
        return (
          <g key={i}>
            {i % 2 === 0 && <rect x={20} y={y - 18} width={840} height={26} rx={4} fill="rgba(255,255,255,0.02)" />}
            <rect x={40} y={y - 14} width={62} height={20} rx={3} fill={methodColor} fillOpacity={0.18} stroke={methodColor} strokeWidth={0.8} />
            <text x={71} y={y} textAnchor="middle" fill={methodColor} fontSize={9} fontWeight={700} fontFamily="monospace">{r[0]}</text>
            <text x={120} y={y} fill={FG} fontSize={9} fontFamily="monospace">{r[1]}</text>
            <text x={420} y={y} fill={GRAY} fontSize={9} fontFamily="monospace">{r[2]}</text>
            <text x={800} y={y} fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace" textAnchor="middle">{r[3]}</text>
          </g>
        );
      })}
      <rect x={40} y={340} width={800} height={100} rx={9} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1} />
      <text x={60} y={362} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">AUTH &amp; QUOTAS</text>
      <text x={60} y={384} fill={FG} fontSize={9} fontFamily="monospace">• OAuth (SSO via Okta) · agent runs as the calling user · warehouse RLS inherited automatically</text>
      <text x={60} y={402} fill={FG} fontSize={9} fontFamily="monospace">• Per-user quota: 200 questions/day · 50 questions/hour</text>
      <text x={60} y={420} fill={FG} fontSize={9} fontFamily="monospace">• Per-team budget: $50/day default · soft warns · hard blocks new questions when exceeded</text>
    </svg>
  );
}

function DataModel() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Data analyst data model">
      <defs>
        <marker id="dErArr" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={GRAY} /></marker>
      </defs>
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DATA MODEL — QUESTIONS · RUNS · CITATIONS · EVAL
      </text>
      {[
        { x: 30,  y: 60, w: 200, h: 130, color: PURPLE, title: 'questions',
          rows: ['id (uuid) PK', 'user_id', 'channel', 'text', 'thread_id', 'created_at'] },
        { x: 250, y: 60, w: 200, h: 170, color: AMBER, title: 'runs',
          rows: ['id (uuid) PK', 'question_id FK →', 'plan (jsonb)', 'sql', 'cube_versions', 'state', 'rows_returned', 'cost_cents', 'started_at', 'ended_at'] },
        { x: 470, y: 60, w: 200, h: 170, color: GREEN, title: 'citations',
          rows: ['id', 'run_id FK →', 'row_hash', 'columns (jsonb)', 'value_summary', 'pii_tag'] },
        { x: 690, y: 60, w: 170, h: 130, color: PINK, title: 'feedback',
          rows: ['id', 'run_id FK →', 'user_id', 'thumbs (-1/0/+1)', 'correction (text)', 'created_at'] },

        { x: 30,  y: 230, w: 200, h: 140, color: CYAN, title: 'canonical_qa',
          rows: ['id', 'question_text', 'sql', 'cubes_used', 'approved_by', 'approved_at', 'last_used'] },
        { x: 250, y: 250, w: 200, h: 130, color: BLUE, title: 'sql_audit',
          rows: ['id', 'run_id FK →', 'gate_results (jsonb)', 'estimated_cost', 'killed_by_gate'] },
        { x: 470, y: 250, w: 200, h: 130, color: RED, title: 'pii_findings',
          rows: ['id', 'run_id FK →', 'column_tag', 'redacted (bool)', 'severity'] },
        { x: 690, y: 230, w: 170, h: 140, color: ORANGE, title: 'eval_runs',
          rows: ['id', 'suite (spider2 / internal / adv)', 'pass_rate', 'cost_cents', 'sha', 'created_at'] },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={8} fill={SURFACE} stroke={t.color} strokeWidth={1.3} />
          <rect x={t.x} y={t.y} width={t.w} height={22} rx={8} fill={t.color} fillOpacity={0.18} />
          <text x={t.x + t.w / 2} y={t.y + 16} textAnchor="middle" fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.title}</text>
          {t.rows.map((r, k) => (
            <text key={k} x={t.x + 10} y={t.y + 38 + k * 14} fill={FG} fontSize={9} fontFamily="monospace">{r}</text>
          ))}
        </g>
      ))}
      <line x1={250} y1={120} x2={230} y2={120} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#dErArr)" />
      <line x1={470} y1={130} x2={450} y2={130} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#dErArr)" />
      <line x1={690} y1={130} x2={670} y2={130} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#dErArr)" />
      <line x1={250} y1={300} x2={230} y2={300} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#dErArr)" />
      <line x1={470} y1={290} x2={450} y2={290} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#dErArr)" />
      <text x={440} y={420} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        Postgres · partitioned by month on runs (high-volume) · pii_findings is immutable · canonical_qa fuels prompt examples
      </text>
    </svg>
  );
}

/* ─── Schema RAG flow ─────────────────────────────────────────────── */
function SchemaRAGFlow() {
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Schema retrieval flow">
      <defs>
        <marker id="ragArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SCHEMA RETRIEVAL — HYBRID RAG OVER CUBES + METRICS + SYNONYMS
      </text>

      {/* Question */}
      <rect x={40} y={56} width={800} height={48} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={76} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">QUESTION</text>
      <text x={60} y={94} fill={FG} fontSize={10} fontFamily="monospace">&quot;why did our enterprise churn rate jump in Q4?&quot;</text>
      <line x1={440} y1={104} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#ragArr)" />

      {/* Two retrievers */}
      <rect x={40} y={120} width={380} height={130} rx={9} fill="rgba(6,182,212,0.07)" stroke={C} strokeWidth={1.4} />
      <text x={60} y={142} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">DENSE RETRIEVER (semantic)</text>
      <text x={60} y={162} fill={FG} fontSize={9} fontFamily="monospace">• embed question (text-embedding-3-large)</text>
      <text x={60} y={180} fill={FG} fontSize={9} fontFamily="monospace">• cosine over cube descriptions + metric defs</text>
      <text x={60} y={198} fill={FG} fontSize={9} fontFamily="monospace">• HNSW index in pgvector · ~30ms p50</text>
      <text x={60} y={222} fill={GRAY} fontSize={9} fontFamily="monospace">catches synonym matches (e.g., &quot;churn&quot; → cancellation_rate)</text>

      <rect x={460} y={120} width={380} height={130} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={480} y={142} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SPARSE RETRIEVER (keyword)</text>
      <text x={480} y={162} fill={FG} fontSize={9} fontFamily="monospace">• BM25 over column names + table names</text>
      <text x={480} y={180} fill={FG} fontSize={9} fontFamily="monospace">• catches exact terms model paraphrases away</text>
      <text x={480} y={198} fill={FG} fontSize={9} fontFamily="monospace">• ~5ms p50</text>
      <text x={480} y={222} fill={GRAY} fontSize={9} fontFamily="monospace">catches &quot;Q4&quot; → fiscal_quarter, &quot;enterprise&quot; → tier</text>

      {/* Reranker */}
      <line x1={230} y1={250} x2={440} y2={290} stroke={FG} strokeWidth={1.4} markerEnd="url(#ragArr)" />
      <line x1={650} y1={250} x2={440} y2={290} stroke={FG} strokeWidth={1.4} markerEnd="url(#ragArr)" />
      <rect x={300} y={290} width={280} height={56} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.4} />
      <text x={440} y={312} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">RERANKER (cross-encoder)</text>
      <text x={440} y={332} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">cohere-rerank-3.5 · top-5 · ~80ms</text>

      <line x1={440} y1={346} x2={440} y2={362} stroke={FG} strokeWidth={1.4} markerEnd="url(#ragArr)" />

      {/* Inject context */}
      <rect x={40} y={362} width={800} height={64} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={60} y={384} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">CONTEXT INJECTED INTO SQL-GEN PROMPT</text>
      <text x={60} y={402} fill={FG} fontSize={9} fontFamily="monospace">cube: subscriptions  · metrics: churn_rate, arr · dimensions: tier, fiscal_quarter, country · 3 canonical Q examples</text>
      <text x={60} y={418} fill={GRAY} fontSize={9} fontFamily="monospace">~1.2K tokens injected · structured · prompt-cached for warm path</text>

      {/* Cache */}
      <rect x={40} y={436} width={800} height={36} rx={6} fill="rgba(20,184,166,0.06)" stroke={TEAL} strokeWidth={0.9} strokeDasharray="3 3" />
      <text x={440} y={460} textAnchor="middle" fill={TEAL} fontSize={10} fontWeight={700} fontFamily="monospace">
        CACHE — semantic-key over question + cube version · ~40% hit rate · 5ms warm path
      </text>
    </svg>
  );
}

/* ─── Deployment ─────────────────────────────────────────────────── */
function AnalystDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Data analyst deployment topology">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT — VPC-PEERED TO WAREHOUSE · SSO + RLS
      </text>

      {/* Edge */}
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare · WAF · Okta SSO · per-user rate limit · CSRF + idempotency · streams (SSE)</text>

      {/* Region */}
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(6,182,212,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">REGION · us-east-1 (multi-AZ · same region as warehouse)</text>

      {/* Stateless */}
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">STATELESS</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">• ask-api  (FastAPI · k8s · 8 pods)</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">• planner-worker · 6 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">• sql-gen-worker · 6 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">• validator (deterministic) · 4 pods</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">HPA on questions-queue depth</text>

      {/* Stateful */}
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">STATEFUL</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Postgres (Aurora · multi-AZ)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">• pgvector (schema embeddings)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">• Redis (semantic cache · rate limits)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">• S3 (chart specs · run bundles)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PITR · 30d backups</text>

      {/* Compute Sandbox */}
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">ANALYST SANDBOX</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Modal (default · serverless py)</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">• polars + duckdb on returned rows</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">• 30s wall-time hard cap</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">• no outbound (analysis-only)</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">scrubbed on completion</text>

      {/* External deps */}
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EXTERNAL (egress)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">• Anthropic / OpenAI / Cohere · per-region failover · prompt-cache enabled</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">• Snowflake / BigQuery / Databricks / Postgres / Redshift  via VPC peering · service account per warehouse</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">• Cube.dev / dbt cloud (semantic layer endpoints) · same region</text>

      {/* Observability */}
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel · LangSmith · Datadog · column-level lineage · cost-by-question rollup · refusal rate dashboard</text>

      {/* DR */}
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">us-west-2 cold standby · Postgres logical replica · RPO 15 min · RTO 1 hr (analyst tool, not transactional)</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">Warehouse failover handled by warehouse provider; agent re-points via service account swap</text>
    </svg>
  );
}

/* ─── Trade-offs ─────────────────────────────────────────────────── */
function AnalystTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Analyst design trade-offs">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DESIGN TRADE-OFFS
      </text>
      <line x1={20} y1={70} x2={860} y2={70} stroke={DIM} strokeWidth={0.5} />
      <text x={40} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">DECISION</text>
      <text x={300} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">CHOSE</text>
      <text x={520} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">REJECTED</text>
      <text x={740} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">REASON</text>
      {[
        ['SQL surface',       'Semantic layer only',           'Raw warehouse',                'Correctness · governance'],
        ['Semantic backend',  'dbt + Cube.dev',                 'Looker LookML',                'Open · already in stack'],
        ['SQL gen model',     'Sonnet 4.6',                     'Opus 4.7',                     'Cost · Sonnet matches'],
        ['Validator',         'Parse + EXPLAIN + whitelist',    'LLM-only review',              'Determinism'],
        ['Analysis runtime',  'Modal Python sandbox',           'In-process pandas',            'Isolation · cost cap'],
        ['Viz format',        'Vega-Lite spec',                 'PNG render',                   'Interactive · small payload'],
        ['Latency target',    '< 10s p50',                      '< 1s',                          'Warehouse cost vs latency'],
        ['Confidence',        'judge + cited rows',             'self-rated only',              'Catch confident-wrong'],
        ['Fallback',          'Ask clarifying Q · refuse',       'Make best guess',              'Trust hygiene'],
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

export default function ProjectDataAnalystPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Data analyst agent for a 1500-employee org" color={C} />
          <p>
            Build a Hex/Mode/Snowflake-class agent that lets PMs, ops, exec, and product engineers ask natural-language questions about company data. ~3K questions/day, 200 datasets/cubes in the semantic layer, 5 warehouses (Snowflake primary, plus BigQuery, Postgres, Databricks, Redshift). The agent must answer correctly, fast, cheaply, without leaking PII or running cost-bomb queries.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: replace 80% of routine analyst tickets with a chat interface that knows the schema, writes safe SQL, and explains its work.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: ML model training, ETL authoring, data quality monitoring, ad-hoc Python notebooks (stays in Hex). The agent answers analytical questions over modelled data.
          </Callout>
          <StackCard
            accent={C}
            title="Data Analyst Agent · Hex/Mode/Snowflake-class"
            subtitle="Question → semantic layer → safe SQL → analyse → viz. ~8s p50, $0.18/Q."
            slos={[
              { label: 'SQL ACCURACY', value: '≥ 90%',  note: 'exec correctness' },
              { label: 'p50 LATENCY',  value: '< 10 s', note: 'warehouse-bound' },
              { label: 'PII LEAK',      value: '0',       note: 'output filter' },
              { label: 'COST GUARD',   value: '< 0.1%',  note: 'kill rate' },
            ]}
            stack={[
              { layer: 'Planner',         choice: 'Sonnet 4.6 (decompose)',         why: 'Multi-step Qs need structure' },
              { layer: 'Schema RAG',      choice: 'BM25 + dense + rerank',          why: 'Synonym + exact-term coverage' },
              { layer: 'SQL gen',         choice: 'Sonnet 4.6 + structured output',  why: 'Grammar-constrained safe SQL' },
              { layer: 'Semantic layer',  choice: 'dbt + Cube.dev',                 why: 'Canonical metrics · governed' },
              { layer: 'Validator',       choice: '5 gates (parse → cost cap)',      why: 'Determinism over LLM review' },
              { layer: 'Executor',        choice: 'Snowflake / BQ / Postgres MCP',   why: 'Routes by region + perms' },
              { layer: 'Analyst',         choice: 'Modal Python sandbox',           why: 'Isolated · cost-capped' },
            ]}
            scale={[
              { label: 'Questions / day', value: '3 K' },
              { label: 'Cubes / metrics', value: '200' },
              { label: 'Warehouses',       value: '5' },
              { label: 'Token spend',      value: '~$540 / day' },
            ]}
            cost={{
              perUnit: '$0.18',
              unitLabel: 'per question',
              perPeriod: '~$16 K',
              periodLabel: 'per month',
            }}
            moats={[
              'Semantic layer = the wall · raw warehouse never exposed',
              'Citations on every answer (rows used in summary)',
              'Adversarial set catches PII probes · cost bombs · injection',
              'Vs analyst FTE ~$15K/month — agent runs at parity, scales infinitely',
            ]}
          />
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <ReqsAndNFRs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="The numbers that drive infra" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Daily Q',    formula: '3{,}000 \\text{ questions/day}',  explanation: 'Target user base × adoption rate × frequency.' },
              { label: 'QPS peak',   formula: 'qps_{peak} \\approx 4 \\times \\frac{3000}{86400} \\approx 0.5\\,\\text{q/s}', explanation: 'Burst factor for working-hours peak.' },
              { label: 'Concurrent', formula: 'C = qps_{peak} \\times \\overline{t_{q}} = 0.5 \\times 8\\,\\text{s} \\approx 4', explanation: 'Concurrent in-flight questions.' },
              { label: 'Storage',    formula: '\\sim 100\\,\\text{GB schema docs} + 10\\,\\text{GB traces/wk}', explanation: 'Embeddings + audit log.' },
              { label: 'Token spend',formula: '3K \\times \\$0.18 = \\$540 / day', explanation: 'Most cost is warehouse compute, not LLM.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Question to safe SQL to chart" color={C} />
          <ArchDiagram />
          <h3>Components</h3>
          <ul>
            <li><strong>Planner</strong>: decomposes complex questions (&quot;why did churn spike?&quot;) into sub-questions.</li>
            <li><strong>Schema retriever</strong>: pgvector index over schema docs (table descriptions, column tags, metric definitions).</li>
            <li><strong>SQL generator</strong>: model emits SQL grounded in semantic layer; structured output validates against allowed cubes/metrics.</li>
            <li><strong>SQL validator</strong>: AST parse → whitelist check → EXPLAIN → cost cap.</li>
            <li><strong>Warehouse executor</strong>: routes to correct warehouse (Snowflake/BQ/Postgres/Databricks) via MCP server with row LIMIT and timeout.</li>
            <li><strong>Analyst sandbox</strong>: pandas/polars on returned rows; LLM-judge for &quot;is conclusion supported?&quot;</li>
            <li><strong>Viz</strong>: emits Vega-Lite spec rendered client-side.</li>
            <li><strong>Guards</strong>: PII redaction, output filter, cost-cap kill, audit log.</li>
          </ul>
        </section>
      )}

      {show('Sequence: One Question') && (
        <section>
          <SectionHeader num="05" title="Sequence: One Question" subtitle='"Why did churn spike in Q4?" end-to-end' color={C} />
          <SeqAnalyst />
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="06" title="API & Data Model" subtitle="REST surface + Postgres schema" color={C} />
          <APIDesign />
          <DataModel />
          <h3>Why these tables</h3>
          <ul>
            <li><strong>questions / runs / citations</strong>: the operational triangle. Citations are first-class — every answer must point back to specific rows, not just summarize.</li>
            <li><strong>canonical_qa</strong>: human-blessed Q→SQL pairs. The single highest-leverage table — they get injected as few-shot examples in the prompt and accelerate accuracy on common business questions.</li>
            <li><strong>sql_audit</strong>: which gate killed which query. Tells you whether the cost cap, whitelist, or EXPLAIN check is doing the most work — informs gate tuning.</li>
            <li><strong>pii_findings</strong>: every redaction event, immutable. Compliance reviews quarterly. Survives even if the run is purged.</li>
            <li><strong>feedback</strong>: user thumbs and corrections. Drives the canonical_qa flywheel — high-value corrections become canonical examples after admin approval.</li>
          </ul>
        </section>
      )}

      {show('Semantic Layer Deep Dive') && (
        <section>
          <SectionHeader num="07" title="Semantic Layer Deep Dive" subtitle="The wall that keeps the agent honest" color={C} />
          <SemanticLayerDeep />
          <h3>Why it matters</h3>
          <p>
            Without a <H tip="Semantic layer = a pre-built, documented, governed view over the raw data warehouse. Defines metrics canonically (MRR is one definition for the company), exposes dimensions cleanly, encodes joins, and prevents the agent from inventing column names." color={C}>semantic layer</H>, the agent will guess column names and join keys. With one, the agent can only query a small, curated surface — but every answer is &quot;correct by definition&quot; because the metrics are pre-computed and certified.
          </p>
          <Callout type="warning">
            The biggest mistake I see is teams pointing the agent directly at the raw warehouse. It works for demos. It fails the moment somebody asks &quot;what&apos;s our MRR?&quot; and gets four different answers depending on the day.
          </Callout>
        </section>
      )}

      {show('SQL Safety Pipeline') && (
        <section>
          <SectionHeader num="08" title="SQL Safety Pipeline" subtitle="Five gates before execution" color={C} />
          <SQLSafetyPipeline />
          <p>
            Even with the semantic layer, every query passes 5 gates: parse → whitelist → EXPLAIN → cost cap → exec. The cost cap alone has caught several queries that would have scanned petabytes (a question naively asking for &quot;all events ever&quot; on a fact table).
          </p>
        </section>
      )}

      {show('Schema Retrieval (RAG)') && (
        <section>
          <SectionHeader num="09" title="Schema Retrieval (RAG)" subtitle="Find the right cube before generating SQL" color={C} />
          <SchemaRAGFlow />
          <h3>What we index</h3>
          <ul>
            <li>Cube definitions + descriptions (from Cube.dev / dbt model docs).</li>
            <li>Metric definitions (e.g., &quot;MRR&quot;, &quot;churn rate&quot;) with formulas.</li>
            <li>Dimension definitions and example values (so the agent knows &quot;Tier&quot; is in {`{free, pro, enterprise}`}).</li>
            <li>Synonym tables (e.g., &quot;customers&quot; → &quot;accounts&quot;, &quot;subscribers&quot;).</li>
            <li>Past successful queries (high-value training data — these become canonical_qa rows).</li>
          </ul>
          <h3>Why hybrid + rerank, not pure dense</h3>
          <p>
            Pure dense retrieval misses exact terms (&quot;Q4&quot;, &quot;tier&quot;). Pure BM25 misses paraphrasing (&quot;churn&quot; vs &quot;cancellation_rate&quot;). The cross-encoder reranker is the cleanup pass — it costs ~80ms but lifts top-1 accuracy materially over either retriever alone.
          </p>
        </section>
      )}

      {show('Eval & Observability') && (
        <section>
          <SectionHeader num="10" title="Eval & Observability" subtitle="Three datasets, three priorities" color={C} />
          <AnalystEval />
          <h3>What we measure in prod</h3>
          <ul>
            <li><strong>Execution accuracy</strong>: did the SQL run successfully?</li>
            <li><strong>Result match</strong>: do returned rows match the expected canonical answer?</li>
            <li><strong>Refusal correctness</strong>: did the agent correctly refuse questions it shouldn&apos;t answer?</li>
            <li><strong>User satisfaction</strong>: post-answer thumbs / written feedback.</li>
            <li><strong>Cost per question</strong>: rolled up daily.</li>
          </ul>
        </section>
      )}

      {show('Governance & PII') && (
        <section>
          <SectionHeader num="11" title="Governance & PII" subtitle="Who sees what, why, and how it&apos;s logged" color={C} />
          <ul>
            <li><strong>Column tags</strong>: every column tagged in the catalog (&quot;PII:high&quot;, &quot;financial&quot;, &quot;public&quot;). Agent sees these tags and refuses to expose &quot;PII:high&quot; without justification.</li>
            <li><strong>Row-level security</strong>: agent runs as the calling user; warehouse RLS handles per-user filtering automatically.</li>
            <li><strong>Output filter</strong>: regex layer strips known patterns (emails, card numbers, SSNs) from any user-visible response.</li>
            <li><strong>Audit log</strong>: every question + SQL + result hash logged with user, timestamp, semantic-layer version.</li>
            <li><strong>Approval flow</strong>: questions touching sensitive cubes route through human approval (&quot;why does this user need salary data?&quot;).</li>
          </ul>
          <Callout type="warning">
            Compliance teams own the column tags. Eng owns the enforcement. Both review every quarter.
          </Callout>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="12" title="Deployment Topology" subtitle="VPC-peered to warehouse · SSO + RLS" color={C} />
          <AnalystDeployment />
          <p>
            The hardest deployment decision is region pinning. The agent must live in the same region as the warehouse — cross-region warehouse queries are slow and expensive. Multi-warehouse orgs run multi-region; the ask-API can route, but each query stays in its home region. SSO + warehouse RLS together mean we never carry user identity beyond the auth boundary; the warehouse enforces who sees what.
          </p>
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="13" title="Cost Analysis" subtitle="Where the dollars actually go" color={C} />
          <AnalystCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="14" title="Failure Modes" subtitle="The four we&apos;ve actually seen in prod" color={C} />
          <AnalystFailures />
          <ProdReality
            accent={C}
            lessons={[
              { type: 'warning', tag: 'Cost cap killed legitimate queries',
                body: 'Initial threshold killed 2% of long-tail analyses (cohort retention over 5 years). Tuned per-cube + per-user-role; false-kill rate now under 0.05%.' },
              { type: 'key', tag: 'Schema RAG cache hit ratio swung quality',
                body: 'Cold-start queries (rare cubes) hit 0.78 accuracy; warm hit 0.94. Pre-warmed top-50 cubes at deploy + nightly re-embed.' },
              { type: 'warning', tag: 'Confident-wrong was the worst class of error',
                body: 'Agent generated valid SQL using deprecated tables, returned numbers ~30% off truth. Added cube-version pin + 2nd-LLM verify against canonical answers for top intents.' },
              { type: 'key', tag: 'Adoption depended on one workflow, not the model',
                body: 'Slack channel deploy moved adoption from 14% to 62% in 3 weeks. The model didn\'t change; the surface did.' },
            ]}
          />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="15" title="Trade-offs" subtitle="What we picked and why" color={C} />
          <AnalystTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="16" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="The semantic layer is the product"
            color={C}
            analogy="A library catalogue is what makes a library useful — without it, you have a pile of books."
            technical="The agent without a semantic layer is a parlour trick. Invest more in dbt/Cube definitions than in the agent itself; the agent is the smaller half."
          />
          <MentalModel
            title="Confident wrong is worse than refusal"
            color={RED}
            analogy="A doctor saying 'I don't know, let me check' beats one confidently giving the wrong diagnosis."
            technical="Always include a confidence score, always cite rows, always offer a clarifying question when the question is ambiguous. Trust hygiene."
          />
          <MentalModel
            title="Cost guards are not optional"
            color={AMBER}
            analogy="A speed limit doesn't slow you down if you follow it; it only matters when something is going wrong."
            technical="EXPLAIN cost · row LIMIT · query timeout. These rules are invisible 99.9% of the time and save you from petabyte queries the rest."
          />
          <MentalModel
            title="Adopt where humans want to be helped"
            color={GREEN}
            analogy="Tools succeed in places where the existing workflow is annoying."
            technical="Plug into Slack, into the existing notebook tool, into the dashboard chat — meet the user where they are. Don't build a new BI tool."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="17" title="Resources" subtitle="Read, watch, build" color={C} />
          <ul>
            <li>Spider 2.0 leaderboard: <code>spider2-sql.github.io</code></li>
            <li>Cube.dev semantic-layer docs</li>
            <li>dbt Semantic Layer guide</li>
            <li>Snowflake Cortex Analyst engineering blog</li>
            <li>Hex AI architecture posts</li>
            <li>This module&apos;s research vault: <code>vault/research/project-analyst/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design a Hex-class data analyst agent on a whiteboard in 45 min, justify every decision with trade-offs, and explain how you&apos;d roll it out across a 1500-employee org without leaking data.
          </Callout>
        </section>
      )}
    </>
  );
}
