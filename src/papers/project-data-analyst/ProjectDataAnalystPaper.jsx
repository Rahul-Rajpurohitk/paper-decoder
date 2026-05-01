import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';

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
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Data analyst agent architecture">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — QUESTION → SAFE SQL → ANALYSIS → VIZ
      </text>

      <rect x={40} y={60} width={800} height={50} rx={6} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={82} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">CHANNELS</text>
      {['Web UI', 'Slack', 'API', 'Notebook', 'Email digest'].map((s, i) => (
        <g key={i}>
          <rect x={200 + i * 120} y={70} width={100} height={30} rx={3} fill={SURFACE} stroke={PURPLE} strokeWidth={0.6} />
          <text x={250 + i * 120} y={90} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}

      <rect x={40} y={130} width={250} height={60} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={165} y={152} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">PLANNER</text>
      <text x={165} y={172} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">decompose into sub-Qs</text>
      <text x={165} y={186} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Sonnet 4.6</text>

      <rect x={310} y={130} width={250} height={60} rx={8} fill="rgba(6,182,212,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={435} y={152} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">SCHEMA RETRIEVER</text>
      <text x={435} y={172} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">retrieve relevant tables/metrics</text>
      <text x={435} y={186} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">pgvector over schema docs</text>

      <rect x={580} y={130} width={260} height={60} rx={8} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.4} />
      <text x={710} y={152} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SQL GENERATOR</text>
      <text x={710} y={172} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Sonnet 4.6 + structured out</text>
      <text x={710} y={186} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">SQL grounded in semantic layer</text>

      <rect x={40} y={210} width={800} height={70} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={60} y={232} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">SEMANTIC LAYER (the safety net)</text>
      <text x={60} y={252} fill={FG} fontSize={10} fontFamily="monospace">dbt model layer · Cube.dev · Snowflake metrics layer · Looker LookML</text>
      <text x={60} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">canonical metrics · certified columns · documented joins · lineage</text>

      <rect x={40} y={300} width={250} height={70} rx={8} fill="rgba(236,72,153,0.06)" stroke={PINK} strokeWidth={1.4} />
      <text x={165} y={322} textAnchor="middle" fill={PINK} fontSize={11} fontWeight={700} fontFamily="monospace">SQL VALIDATOR</text>
      <text x={165} y={342} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">EXPLAIN · cost estimate · row cap</text>
      <text x={165} y={358} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">SQL whitelist · forbidden ops</text>

      <rect x={310} y={300} width={250} height={70} rx={8} fill="rgba(59,130,246,0.06)" stroke={BLUE} strokeWidth={1.4} />
      <text x={435} y={322} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">EXECUTOR</text>
      <text x={435} y={342} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Snowflake / BQ / Postgres / Databricks</text>
      <text x={435} y={358} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">MCP server · query timeout · row cap</text>

      <rect x={580} y={300} width={260} height={70} rx={8} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.4} />
      <text x={710} y={322} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">ANALYST (sandbox)</text>
      <text x={710} y={342} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">pandas/polars · stats · LLM-judge</text>
      <text x={710} y={358} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Modal / E2B Python sandbox</text>

      <rect x={40} y={390} width={400} height={60} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={240} y={412} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">VIZ + RESPONSE</text>
      <text x={240} y={430} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Vega-Lite spec · summary · row citations</text>
      <text x={240} y={444} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">render in client</text>

      <rect x={460} y={390} width={380} height={60} rx={8} fill="rgba(239,68,68,0.06)" stroke={RED} strokeWidth={1.4} />
      <text x={650} y={412} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">GUARDS</text>
      <text x={650} y={430} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">PII redact · cost cap · whitelist · approval</text>
      <text x={650} y={444} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">runs on output before user sees</text>

      <rect x={40} y={470} width={800} height={50} rx={8} fill="rgba(245,158,11,0.04)" stroke={AMBER} strokeWidth={1} strokeDasharray="3 3" />
      <text x={440} y={492} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">EVAL &amp; OBSERVABILITY</text>
      <text x={440} y={510} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">spider2 + internal regression · LangSmith traces · column-level lineage</text>
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
        { y: 310, label: 'JOINS',     desc: 'pre-defined; agent doesn&apos;t guess' },
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
        { x: 540, label: 'COST CAP',      desc: 'kill if est cost {'>'} threshold' },
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
        '✓ All time ranges bounded (no &apos;all time&apos; without explicit OK)',
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

      {show('Semantic Layer Deep Dive') && (
        <section>
          <SectionHeader num="06" title="Semantic Layer Deep Dive" subtitle="The wall that keeps the agent honest" color={C} />
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
          <SectionHeader num="07" title="SQL Safety Pipeline" subtitle="Five gates before execution" color={C} />
          <SQLSafetyPipeline />
          <p>
            Even with the semantic layer, every query passes 5 gates: parse → whitelist → EXPLAIN → cost cap → exec. The cost cap alone has caught several queries that would have scanned petabytes (a question naively asking for &quot;all events ever&quot; on a fact table).
          </p>
        </section>
      )}

      {show('Schema Retrieval (RAG)') && (
        <section>
          <SectionHeader num="08" title="Schema Retrieval (RAG)" subtitle="Find the right cube before generating SQL" color={C} />
          <h3>What we index</h3>
          <ul>
            <li>Cube definitions + descriptions (from Cube.dev / dbt model docs).</li>
            <li>Metric definitions (e.g., &quot;MRR&quot;, &quot;churn rate&quot;) with formulas.</li>
            <li>Dimension definitions and example values (so the agent knows &quot;Tier&quot; is in {`{free, pro, enterprise}`}).</li>
            <li>Synonym tables (e.g., &quot;customers&quot; → &quot;accounts&quot;, &quot;subscribers&quot;).</li>
            <li>Past successful queries (high-value training data).</li>
          </ul>
          <h3>Retrieval</h3>
          <p>
            Hybrid: BM25 (keyword) + dense (embedding) → reranker. Top-5 results injected into the SQL gen prompt. ~200ms p50 because everything is cached in pgvector with HNSW.
          </p>
        </section>
      )}

      {show('Eval & Observability') && (
        <section>
          <SectionHeader num="09" title="Eval & Observability" subtitle="Three datasets, three priorities" color={C} />
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
          <SectionHeader num="10" title="Governance & PII" subtitle="Who sees what, why, and how it&apos;s logged" color={C} />
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

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="11" title="Cost Analysis" subtitle="Where the dollars actually go" color={C} />
          <AnalystCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="12" title="Failure Modes" subtitle="The four we&apos;ve actually seen in prod" color={C} />
          <AnalystFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="13" title="Trade-offs" subtitle="What we picked and why" color={C} />
          <AnalystTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="14" title="Mental Models" subtitle="Frames" color={C} />
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
          <SectionHeader num="15" title="Resources" subtitle="Read, watch, build" color={C} />
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
