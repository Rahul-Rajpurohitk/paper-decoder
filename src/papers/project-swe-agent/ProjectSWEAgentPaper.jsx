import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';

const C       = '#3b82f6';
const C2      = '#1d4ed8';
const BG      = '#0a1424';
const SURFACE = '#0d1c33';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#1e3a5f';
const PURPLE  = '#a855f7';
const AMBER   = '#f59e0b';
const RED     = '#ef4444';
const GREEN   = '#22c55e';
const CYAN    = '#06b6d4';
const PINK    = '#ec4899';
const EMERALD = '#10b981';
const BLUE    = '#60a5fa';
const ORANGE  = '#fb923c';
const TEAL    = '#14b8a6';

/* ─── Functional / NFR overview ──────────────────────────────────── */
function SWEReqs() {
  const must = [
    'Read GitHub issue / Linear / Jira ticket',
    'Clone target repo into ephemeral sandbox',
    'Plan: file targets, test strategy, ACs',
    'Edit code · run tests · iterate until green',
    'Open PR with description + linked issue',
    'Respond to review comments (iterate to merge)',
    'Block on test failure + lint failure',
  ];
  const nfr = [
    ['p50 cycle (ticket → PR)', '< 15 min',  'P0'],
    ['SWE-bench Verified',      '≥ 45%',     'P0'],
    ['Merge rate after review', '≥ 65%',     'P0'],
    ['Sandbox spawn',           '< 30 s',    'P0'],
    ['Cost / PR',               '< $5',      'P1'],
    ['Concurrent sandboxes',    '~500',      'P0'],
    ['Availability',            '99.9%',     'P0'],
    ['Code-exec containment',   'no escape', 'P0'],
  ];

  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent functional and non-functional requirements">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS — MUST HAVE + SLO TABLE
      </text>

      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(59,130,246,0.06)" stroke={C} strokeWidth={1.4} />
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

/* ─── Architecture ───────────────────────────────────────────────── */
function SWEArch() {
  return (
    <svg viewBox="0 0 880 580" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent architecture">
      <defs>
        <marker id="aArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={FG} />
        </marker>
        <marker id="aArrCyan" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={CYAN} />
        </marker>
        <linearGradient id="aBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0e1c33" />
          <stop offset="100%" stopColor="#081326" />
        </linearGradient>
      </defs>
      <rect width={880} height={580} rx={12} fill="url(#aBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — TICKET → PLAN → SANDBOX → LOOP → VERIFY → PR
      </text>

      {/* Source channels */}
      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">TICKET SOURCES</text>
      {['GitHub Issues', 'Linear', 'Jira', 'Slack', 'Manual cmd'].map((s, i) => (
        <g key={i}>
          <rect x={195 + i * 125} y={66} width={110} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={250 + i * 125} y={86} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#aArr)" />

      {/* Ingest */}
      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        WEBHOOK INGEST · NORMALISE · DEDUP · ENQUEUE  (NATS / SQS)
      </text>
      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#aArr)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#aArr)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#aArr)" />

      {/* Three-column orchestration */}
      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">SCOPE / PLANNER</text>
      <text x={165} y={226} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Opus 4.7 · plans files / ACs</text>
      <text x={165} y={242} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">writes plan.json + diff bound</text>

      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SANDBOX MANAGER</text>
      <text x={435} y={226} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">E2B / Modal / Daytona</text>
      <text x={435} y={242} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">microVM · clone · cached deps</text>

      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">AGENT LOOP</text>
      <text x={710} y={226} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Sonnet 4.6 + LangGraph SM</text>
      <text x={710} y={242} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">edit · test · lint · review</text>

      {/* Connector arrows between three columns */}
      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#aArr)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#aArr)" />

      {/* Tool shell band */}
      <rect x={40} y={290} width={800} height={130} rx={11} fill="rgba(34,197,94,0.04)" stroke={GREEN} strokeWidth={1} strokeDasharray="4 3" />
      <text x={60} y={312} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">TOOL SHELL (inside sandbox · curated allowlist)</text>
      {[
        { x: 60,  label: 'shell',    desc: 'bash exec',      icon: '$' },
        { x: 200, label: 'git',      desc: 'branch · push',  icon: '◇' },
        { x: 340, label: 'editor',   desc: 'r/w files',      icon: '✎' },
        { x: 480, label: 'tests',    desc: 'pytest/jest',    icon: '✓' },
        { x: 620, label: 'browser',  desc: 'docs / search',  icon: '⌖' },
        { x: 760, label: 'memory',   desc: 'past patches',   icon: '◷' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={330} width={120} height={70} rx={6} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
          <text x={t.x + 16} y={355} fill={GREEN} fontSize={14} fontWeight={700} fontFamily="monospace">{t.icon}</text>
          <text x={t.x + 60} y={355} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 60} y={376} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      {/* Down arrows from agent to verify and PR */}
      <line x1={710} y1={258} x2={710} y2={290} stroke={PURPLE} strokeWidth={1.4} markerEnd="url(#aArr)" />
      <line x1={440} y1={420} x2={240} y2={448} stroke={CYAN} strokeWidth={1.4} markerEnd="url(#aArrCyan)" />
      <line x1={440} y1={420} x2={650} y2={448} stroke={PINK} strokeWidth={1.4} markerEnd="url(#aArr)" />

      {/* Verify */}
      <rect x={40} y={448} width={400} height={56} rx={9} fill="rgba(6,182,212,0.07)" stroke={CYAN} strokeWidth={1.4} />
      <text x={240} y={470} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">VERIFY</text>
      <text x={240} y={490} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">tests · lint · typecheck · LLM-judge · diff scope check</text>

      {/* PR loop */}
      <rect x={460} y={448} width={380} height={56} rx={9} fill="rgba(236,72,153,0.07)" stroke={PINK} strokeWidth={1.4} />
      <text x={650} y={470} textAnchor="middle" fill={PINK} fontSize={11} fontWeight={700} fontFamily="monospace">PR + REVIEW LOOP</text>
      <text x={650} y={490} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">GitHub API · respond to comments · iterate to merge</text>

      {/* Cross flow verify ↔ PR */}
      <line x1={440} y1={476} x2={460} y2={476} stroke={FG} strokeWidth={1.4} markerEnd="url(#aArr)" />

      {/* Obs band */}
      <rect x={40} y={520} width={800} height={42} rx={6} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={0.9} strokeDasharray="3 3" />
      <text x={440} y={538} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">
        OBSERVABILITY &amp; EVAL
      </text>
      <text x={440} y={554} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">
        LangSmith traces · SWE-bench Verified replay (nightly) · Datadog · OTel-LLM · per-PR cost rollup
      </text>
    </svg>
  );
}

/* ─── Sequence: One Ticket ───────────────────────────────────────── */
function SWESequence() {
  const lanes = [
    { x: 70,  label: 'Ticket'    },
    { x: 210, label: 'Planner'   },
    { x: 360, label: 'Sandbox'   },
    { x: 510, label: 'Agent'     },
    { x: 660, label: 'Verify'    },
    { x: 800, label: 'GitHub'    },
  ];
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent sequence diagram">
      <defs>
        <marker id="sArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={600} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE — ONE TICKET, END-TO-END (~14 min p50)
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={560} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 70,  to: 210, y: 110, label: '1. webhook · "fix flaky test in auth"', color: PURPLE },
        { from: 210, to: 210, y: 138, label: '2. plan: files=auth/* · ACs · tests',    color: AMBER, self: true },
        { from: 210, to: 360, y: 168, label: '3. claim · spawn microVM',               color: GREEN },
        { from: 360, to: 360, y: 196, label: '4. clone · cached deps · ready (~25s)',  color: GREEN, self: true },
        { from: 360, to: 510, y: 226, label: '5. boot agent loop',                     color: PURPLE },
        { from: 510, to: 510, y: 254, label: '6. EDIT files (Sonnet 4.6)',             color: BLUE,   self: true },
        { from: 510, to: 660, y: 282, label: '7. run tests',                           color: CYAN },
        { from: 660, to: 510, y: 310, label: '8. ✗ fail · stack trace',                color: RED, reverse: true },
        { from: 510, to: 510, y: 338, label: '9. DEBUG · re-edit',                     color: RED, self: true },
        { from: 510, to: 660, y: 366, label: '10. tests · lint · typecheck',           color: CYAN },
        { from: 660, to: 510, y: 394, label: '11. ✓ pass · diff scope OK',             color: GREEN, reverse: true },
        { from: 510, to: 510, y: 422, label: '12. self-review (Opus 4.7)',             color: PURPLE, self: true },
        { from: 510, to: 800, y: 450, label: '13. open PR · link issue',               color: PINK },
        { from: 800, to: 510, y: 478, label: '14. review comments',                    color: PINK, reverse: true },
        { from: 510, to: 800, y: 506, label: '15. iterate · push · merge',             color: GREEN },
        { from: 800, to: 70,  y: 534, label: '16. notify · close ticket',              color: PURPLE, reverse: true },
      ].map((m, i) => (
        <g key={i}>
          {m.self ? (
            <>
              <path d={`M ${m.from} ${m.y} q 30 -8 0 18`} fill="none" stroke={m.color} strokeWidth={1.4} markerEnd="url(#sArr)" />
              <text x={m.from + 38} y={m.y + 6} fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          ) : (
            <>
              <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#sArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
              <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          )}
        </g>
      ))}
      <rect x={40} y={566} width={800} height={26} rx={5} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={584} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        Hard caps: 80 turns · 5 debug attempts · 30 min wall-time · 3 review cycles
      </text>
    </svg>
  );
}

/* ─── API & Data Model ───────────────────────────────────────────── */
function SWEAPIDesign() {
  const apis = [
    ['POST', '/v1/tickets/ingest',          'webhook from GitHub/Linear/Jira',          '202'],
    ['GET',  '/v1/runs/:id',                'run status + plan + current state',         '200'],
    ['GET',  '/v1/runs/:id/timeline',       'agent steps · tool calls · model tokens',   '200'],
    ['GET',  '/v1/runs/:id/diff',           'unified diff at any checkpoint',            '200'],
    ['POST', '/v1/runs/:id/cancel',         'kill sandbox · revert claim',               '200'],
    ['POST', '/v1/runs/:id/escalate',       'route to human · attaches context',         '200'],
    ['GET',  '/v1/runs?repo=&user=&status', 'paginated list with filters',               '200'],
    ['GET',  '/v1/eval/swebench',           'last nightly eval rollup',                  '200'],
  ];
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent API surface">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        API SURFACE — REST + WEBHOOKS
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
      <text x={60} y={384} fill={FG} fontSize={9} fontFamily="monospace">• OAuth (GitHub App) for repo-level scopes · short-lived JIT tokens for sandbox commits</text>
      <text x={60} y={402} fill={FG} fontSize={9} fontFamily="monospace">• Per-user quota: 20 runs/day · 200 PR comments/day (anti-flood)</text>
      <text x={60} y={420} fill={FG} fontSize={9} fontFamily="monospace">• Per-repo budget: $50/day default · soft-cap warns · hard-cap blocks new claims</text>
    </svg>
  );
}

function SWEDataModel() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent data model">
      <defs>
        <marker id="erArr" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={GRAY} /></marker>
      </defs>
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DATA MODEL — TICKETS · RUNS · STEPS · PRS
      </text>
      {[
        { x: 30,  y: 60, w: 200, h: 130, color: PURPLE, title: 'tickets',
          rows: ['id (uuid) PK', 'source (enum)', 'external_id', 'title', 'body', 'user_id', 'created_at'] },
        { x: 250, y: 60, w: 200, h: 170, color: AMBER, title: 'runs',
          rows: ['id (uuid) PK', 'ticket_id FK →', 'plan (jsonb)', 'sandbox_id', 'state (enum)', 'cost_cents', 'started_at', 'ended_at', 'pr_url'] },
        { x: 470, y: 60, w: 200, h: 170, color: GREEN, title: 'agent_steps',
          rows: ['id (uuid) PK', 'run_id FK →', 'step_no (int)', 'state (enum)', 'tool_call (jsonb)', 'tokens_in/out', 'latency_ms', 'created_at'] },
        { x: 690, y: 60, w: 170, h: 130, color: PINK, title: 'prs',
          rows: ['id (uuid) PK', 'run_id FK →', 'github_url', 'state', 'reviews (jsonb)', 'merged_at'] },

        { x: 30,  y: 230, w: 200, h: 130, color: CYAN, title: 'sandbox_lifecycle',
          rows: ['id', 'run_id FK →', 'provider (enum)', 'spawn_ms', 'destroy_ms', 'cpu_used', 'mem_used'] },
        { x: 250, y: 250, w: 200, h: 130, color: BLUE, title: 'eval_results',
          rows: ['id', 'suite (swebench/internal)', 'run_id (nullable)', 'pass_rate', 'cost_cents', 'sha', 'created_at'] },
        { x: 470, y: 250, w: 200, h: 130, color: RED, title: 'secrets_audit',
          rows: ['id', 'run_id FK →', 'finding_type', 'severity', 'blocked', 'created_at'] },
        { x: 690, y: 230, w: 170, h: 130, color: ORANGE, title: 'tool_calls',
          rows: ['id', 'step_id FK →', 'tool', 'args (jsonb)', 'result (jsonb)', 'duration_ms'] },
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
      {/* FK arrows */}
      <line x1={250} y1={120} x2={230} y2={120} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#erArr)" />
      <line x1={470} y1={130} x2={450} y2={130} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#erArr)" />
      <line x1={690} y1={130} x2={670} y2={130} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#erArr)" />
      <line x1={250} y1={300} x2={230} y2={290} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#erArr)" />
      <line x1={690} y1={290} x2={670} y2={290} stroke={GRAY} strokeWidth={0.8} markerEnd="url(#erArr)" />
      <text x={440} y={420} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        Postgres · partitioned by month on agent_steps + tool_calls (high-volume) · TTL on sandbox_lifecycle (90d)
      </text>
    </svg>
  );
}

/* ─── Deployment Topology ────────────────────────────────────────── */
function SWEDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent deployment topology">
      <defs>
        <marker id="dArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT — REGION-PINNED · EPHEMERAL SANDBOX FLEET
      </text>

      {/* Edge */}
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60}  y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60}  y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare · WAF · OAuth (GitHub App) · per-user rate limit · idempotency keys</text>

      {/* Region us-east-1 */}
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(59,130,246,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">REGION · us-east-1 (primary · multi-AZ)</text>

      {/* Stateless */}
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">STATELESS</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">• ingest-api  (FastAPI · k8s · 6 pods)</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">• orchestrator (LangGraph workers · 12 pods)</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">• verifier · 4 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">• webhook-router · 2 pods</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">HPA on tickets-queue depth</text>

      {/* Stateful */}
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">STATEFUL</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Postgres (Aurora · multi-AZ)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">• NATS / SQS  (queue · DLQ)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">• S3 (artefacts · diff snapshots · logs)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">• Redis (claim locks · rate limits)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PITR enabled · 30d backups</text>

      {/* Sandbox fleet */}
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">SANDBOX FLEET</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">• E2B (default) · ~500 concurrent</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">• Modal (GPU tasks)</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">• Daytona (self-host overflow)</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">• Pre-warmed pool (50)  ↓ cold-start</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">Auto-destroy after 30 min wall</text>

      {/* External deps */}
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EXTERNAL DEPENDENCIES (egress)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">• Anthropic / OpenAI / Google API · per-region failover · 2× retry budget</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">• GitHub API · GitHub Apps · webhook secret rotation 30d</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">• Datadog · LangSmith · Sentry · LogRocket (PR review playback)</text>

      {/* Observability */}
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel traces (LLM spans · tool spans) · structured logs · cost rolled to per-PR · SLO board (5/15/30 min p50/p95/p99)</text>

      {/* DR */}
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">us-west-2 warm standby · RPO 5 min · RTO 30 min · runbook in pagerduty</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">Sandboxes are stateless — region cut-over only loses in-flight runs (~5min retry window)</text>
    </svg>
  );
}

/* ─── Sandbox internals ─────────────────────────────────────────── */
function SandboxInternals() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sandbox internals and isolation">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        EPHEMERAL SANDBOX — ISOLATION + LIFECYCLE
      </text>

      {/* Lifecycle */}
      {[
        { x: 30,  label: 'SPAWN',   desc: 'firecracker microVM',  time: '~10s' },
        { x: 200, label: 'CLONE',   desc: 'shallow git clone',     time: '~3s' },
        { x: 370, label: 'INSTALL', desc: 'cached deps · uv/pnpm', time: '~15s' },
        { x: 540, label: 'RUN',     desc: 'agent loop',            time: '5-30 min' },
        { x: 710, label: 'DESTROY', desc: 'snapshot · scrub',      time: '~2s' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={70} width={140} height={70} rx={8} fill={SURFACE} stroke={C} strokeWidth={1.2} />
          <text x={s.x + 70} y={92} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.x + 70} y={112} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s.desc}</text>
          <text x={s.x + 70} y={128} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{s.time}</text>
          {i < 4 && <line x1={s.x + 140} y1={105} x2={s.x + 200} y2={105} stroke={FG} strokeWidth={1} markerEnd="url(#sbA)" />}
        </g>
      ))}

      <rect x={40} y={170} width={800} height={140} rx={10} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={192} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">ISOLATION LAYERS</text>
      {[
        { y: 210, label: 'Hardware virt', desc: 'firecracker / KVM · ~125ms boot · separate kernel' },
        { y: 232, label: 'Network jail',  desc: 'no inbound · curated outbound (npm, pypi, github, docs)' },
        { y: 254, label: 'Filesystem',    desc: 'ephemeral overlay · scrubbed on destroy · no host mounts' },
        { y: 276, label: 'Resource caps', desc: '4 vCPU · 8 GB RAM · 20 GB disk · 30 min wall-time hard limit' },
        { y: 298, label: 'Egress audit',  desc: 'every outbound logged · alerts on novel domains' },
      ].map((l, i) => (
        <g key={i}>
          <text x={60} y={l.y} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <text x={220} y={l.y} fill={FG} fontSize={9} fontFamily="monospace">{l.desc}</text>
        </g>
      ))}

      <rect x={40} y={330} width={800} height={110} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.2} />
      <text x={60} y={352} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">PROVIDER COMPARISON</text>
      <line x1={50} y1={362} x2={830} y2={362} stroke={DIM} strokeWidth={0.4} />
      {[
        { name: 'E2B',     boot: '~2s',  cost: '$',    note: 'best DX, agent-first API' },
        { name: 'Modal',   boot: '~3s',  cost: '$$',   note: 'GPU-friendly, serverless billing' },
        { name: 'Daytona', boot: '~4s',  cost: '$',    note: 'self-host friendly, IDE-like' },
        { name: 'Codespaces', boot: '~30s', cost: '$$',  note: 'GitHub-native, persistent option' },
      ].map((p, i) => {
        const x = 60 + (i * 195);
        return (
          <g key={i}>
            <text x={x} y={384} fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{p.name}</text>
            <text x={x} y={400} fill={FG} fontSize={9} fontFamily="monospace">boot: {p.boot}</text>
            <text x={x} y={416} fill={FG} fontSize={9} fontFamily="monospace">cost: {p.cost}</text>
            <text x={x} y={432} fill={GRAY} fontSize={9} fontFamily="monospace">{p.note}</text>
          </g>
        );
      })}

      <defs>
        <marker id="sbA" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── Agent loop deep ────────────────────────────────────────────── */
function AgentLoopDeep() {
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent loop in detail">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        AGENT LOOP — STATE MACHINE WITH CHECKPOINTS
      </text>

      {[
        { cx: 130, cy: 130, label: 'INGEST',   desc: 'parse ticket', color: PURPLE },
        { cx: 300, cy: 130, label: 'PLAN',     desc: 'files · ACs',  color: AMBER },
        { cx: 470, cy: 130, label: 'EDIT',     desc: 'modify files', color: C },
        { cx: 640, cy: 130, label: 'TEST',     desc: 'run suite',    color: GREEN },
        { cx: 130, cy: 290, label: 'DEBUG',    desc: 'fix failure',  color: RED },
        { cx: 300, cy: 290, label: 'LINT',     desc: 'autoformat',   color: AMBER },
        { cx: 470, cy: 290, label: 'REVIEW',   desc: 'self-judge',   color: PURPLE },
        { cx: 640, cy: 290, label: 'PR',       desc: 'open + msg',   color: PINK },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.cx - 60} y={s.cy - 24} width={120} height={48} rx={6} fill={SURFACE} stroke={s.color} strokeWidth={1.4} />
          <text x={s.cx} y={s.cy - 4} textAnchor="middle" fill={s.color} fontSize={10} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.cx} y={s.cy + 12} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{s.desc}</text>
        </g>
      ))}

      <line x1={190} y1={130} x2={240} y2={130} stroke={FG} strokeWidth={1.2} markerEnd="url(#alA)" />
      <line x1={360} y1={130} x2={410} y2={130} stroke={FG} strokeWidth={1.2} markerEnd="url(#alA)" />
      <line x1={530} y1={130} x2={580} y2={130} stroke={FG} strokeWidth={1.2} markerEnd="url(#alA)" />
      <path d="M 640 154 Q 640 200 130 230 Q 130 260 130 266" fill="none" stroke={RED} strokeWidth={1} strokeDasharray="3 2" markerEnd="url(#alA)" />
      <text x={400} y={210} textAnchor="middle" fill={RED} fontSize={9} fontFamily="monospace">test fail → debug</text>

      <line x1={190} y1={290} x2={240} y2={290} stroke={FG} strokeWidth={1.2} markerEnd="url(#alA)" />
      <line x1={360} y1={290} x2={410} y2={290} stroke={FG} strokeWidth={1.2} markerEnd="url(#alA)" />
      <line x1={530} y1={290} x2={580} y2={290} stroke={FG} strokeWidth={1.2} markerEnd="url(#alA)" />

      <path d="M 130 314 Q 130 350 470 350" fill="none" stroke={GREEN} strokeWidth={1} strokeDasharray="3 2" markerEnd="url(#alA)" />
      <text x={300} y={342} textAnchor="middle" fill={GREEN} fontSize={9} fontFamily="monospace">debug fixed → re-test</text>

      <rect x={40} y={380} width={800} height={80} rx={6} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={402} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">CHECKPOINTING</text>
      <text x={440} y={420} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">
        LangGraph state checkpoint after every transition · resume on failure · fork for what-if probing
      </text>
      <text x={440} y={438} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        max-step cap: 80 turns · max-debug cap: 5 attempts · bail to escalation if exceeded
      </text>

      <defs>
        <marker id="alA" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── Eval pipeline (SWE specific) ──────────────────────────────── */
function SWEEval() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE eval against SWE-bench and internal tests">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        EVAL — SWE-BENCH + INTERNAL REGRESSION
      </text>

      <rect x={40} y={70} width={400} height={280} rx={10} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.4} />
      <text x={240} y={94} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SWE-BENCH VERIFIED (public)</text>
      <text x={64} y={124} fill={FG} fontSize={9} fontFamily="monospace">Real GitHub issues + repos · agent emits PR</text>
      <text x={64} y={142} fill={FG} fontSize={9} fontFamily="monospace">PR runs hidden tests; pass = success</text>
      <text x={64} y={160} fill={GRAY} fontSize={9} fontFamily="monospace">2294 issues · 12 popular Python repos</text>

      <text x={64} y={196} fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">May 2026 leaderboard:</text>
      {[
        ['1.', 'Cognition Devin',     '47%'],
        ['2.', 'Anthropic Claude',    '45%'],
        ['3.', 'OpenAI GPT-5',        '42%'],
        ['4.', 'Cursor + Sonnet',     '40%'],
        ['5.', 'Cody Agent',          '36%'],
      ].map((r, i) => (
        <g key={i}>
          <text x={64} y={216 + i * 18} fill={GRAY} fontSize={9} fontFamily="monospace">{r[0]}</text>
          <text x={86} y={216 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{r[1]}</text>
          <text x={400} y={216 + i * 18} textAnchor="end" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{r[2]}</text>
        </g>
      ))}

      <text x={240} y={328} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Run nightly · catches drift early</text>

      <rect x={460} y={70} width={380} height={280} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={650} y={94} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">INTERNAL REGRESSION (private)</text>
      <text x={476} y={124} fill={FG} fontSize={9} fontFamily="monospace">~1500 anonymised past tickets from prod</text>
      <text x={476} y={142} fill={FG} fontSize={9} fontFamily="monospace">Replay against new prompt / model</text>
      <text x={476} y={160} fill={GRAY} fontSize={9} fontFamily="monospace">Stratified by repo · language · difficulty</text>

      <text x={476} y={196} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">Metrics</text>
      {[
        ['Test pass rate',      '94%'],
        ['Merge after review',  '68%'],
        ['Avg cycle time',      '14 min'],
        ['Token cost / PR',     '$2.40'],
        ['Loop count avg',      '36 turns'],
      ].map((r, i) => (
        <g key={i}>
          <text x={476} y={216 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{r[0]}</text>
          <text x={820} y={216 + i * 18} textAnchor="end" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">{r[1]}</text>
        </g>
      ))}

      <text x={650} y={328} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">CI-blocking on regression {'>'} 2%</text>
    </svg>
  );
}

/* ─── Cost breakdown ─────────────────────────────────────────────── */
function SWECost() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE cost breakdown per PR">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER PR — $2.40 BREAKDOWN
      </text>

      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {(() => {
        const items = [
          { name: 'Plan (Opus)',         cents: 25, color: AMBER },
          { name: 'Edit/test loop (Sonnet)', cents: 140, color: BLUE },
          { name: 'Self-review (Opus)',  cents: 30, color: PURPLE },
          { name: 'Sandbox compute',     cents: 30, color: GREEN },
          { name: 'Tool calls',          cents: 5,  color: PINK },
          { name: 'Eval runs',           cents: 5,  color: CYAN },
          { name: 'Infra',               cents: 5,  color: EMERALD },
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
              <text x={x + w / 2} y={126} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">${(it.cents / 100).toFixed(2)}</text>
            </g>
          );
        });
      })()}

      {[
        { name: 'Plan (Opus)', cents: 25, color: AMBER },
        { name: 'Edit/test (Sonnet)', cents: 140, color: BLUE },
        { name: 'Review (Opus)', cents: 30, color: PURPLE },
        { name: 'Sandbox', cents: 30, color: GREEN },
        { name: 'Tools', cents: 5, color: PINK },
        { name: 'Eval', cents: 5, color: CYAN },
        { name: 'Infra', cents: 5, color: EMERALD },
      ].map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 4) * 200} ${190 + Math.floor(i / 4) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={170} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">${(it.cents / 100).toFixed(2)}</text>
        </g>
      ))}

      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: $2.40 / PR</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">@ 120 PRs/week = $288/week per team</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">vs 4 hr senior dev × $150/hr = $600/PR human equivalent</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">~250× cost reduction</text>
    </svg>
  );
}

/* ─── Failure modes ──────────────────────────────────────────────── */
function SWEFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES &amp; MITIGATIONS
      </text>

      {[
        { x: 30,  title: 'WRONG SCOPE',       risk: 'edits files outside ticket scope', mit: 'plan stage requires file allowlist · strict diff review' },
        { x: 240, title: 'INFINITE LOOP',     risk: 'same edit · same test fail · repeat', mit: 'max-step cap · debug attempt cap · diff signature dedup' },
        { x: 450, title: 'SECURITY EXFIL',    risk: 'pulls API keys from .env into PR', mit: 'pre-commit secret scanner · sandbox network jail · per-PR audit' },
        { x: 660, title: 'BREAKING REFACTOR', risk: 'changes public API to fix bug', mit: 'test bound · architecture-detector judge · human review on schema diff' },
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
function SWETradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent design trade-offs">
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
        ['Autonomy',          'Interactive (dev in seat)',     'Fully autonomous (Devin)',     'Lower risk, faster review'],
        ['Sandbox',           'E2B for default',                'Shared dev container',         'Isolation + per-task scrub'],
        ['Plan model',        'Opus 4.7',                       'Sonnet 4.6',                   'Plan quality dominates'],
        ['Edit model',        'Sonnet 4.6',                     'Opus 4.7',                     'Cost; Sonnet enough'],
        ['Review model',      'Opus 4.7 (separate prompt)',    'Same as edit',                 'Independent eyes'],
        ['Test trigger',      'Run on every commit',           'Run on final',                  'Fail fast'],
        ['Tool exposure',     'Per-task allowlist',             'Full shell',                   'Reduce blast radius'],
        ['Memory',            'Per-repo + per-developer',       'Global',                       'Privacy + relevance'],
        ['Long-running',      'LangGraph checkpointing',        'No resume',                    'Recovers from crashes'],
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

export default function ProjectSWEAgentPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Devin/Cursor-class autonomous code agent" color={C} />
          <p>
            Build a <H tip="Autonomous SWE agent = a system that takes a ticket (issue, bug, feature request) and produces a code change merged into the codebase, with minimal human intervention. Cognition Devin (GA Q4 2025) was the proof of concept. By May 2026 the pattern is mainstream." color={C}>autonomous SWE agent</H> for an engineering org of ~200 developers, ~50 active services, mixed Python/TypeScript/Go. Target: agent handles routine tickets (bugs, dependency upgrades, simple features, refactors) end-to-end. Senior devs review and merge. Hard goals: SWE-bench Verified ≥ 45%, p50 ticket→PR &lt; 15 min, cost &lt; $5/PR, no security incidents.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: a fast, scoped, well-isolated junior engineer that never sleeps. The system design is what makes &quot;junior&quot; actually trustworthy.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: greenfield architecture, security-sensitive changes (auth/billing logic), changes touching {'>'}10 files. These go to humans. Knowing what NOT to take on is half the design.
          </Callout>
          <StackCard
            accent={C}
            title="AI Software Engineer · Devin/Cursor-class"
            subtitle="Ticket → plan → sandbox → loop → verify → PR. ~14 min p50, $2.40/PR."
            slos={[
              { label: 'SWE-BENCH',     value: '≥ 45%',  note: 'Verified subset' },
              { label: 'p50 CYCLE',     value: '< 15 m', note: 'ticket → PR' },
              { label: 'MERGE RATE',    value: '≥ 65%',  note: 'after review' },
              { label: 'CONCURRENT',    value: '~500',    note: 'sandboxes' },
            ]}
            stack={[
              { layer: 'Planner',      choice: 'Opus 4.7',                       why: 'Plan quality dominates' },
              { layer: 'Edit/Test',    choice: 'Sonnet 4.6 + LangGraph',         why: 'Cost vs quality balance' },
              { layer: 'Sandbox',      choice: 'E2B / Modal / Daytona',          why: 'Firecracker microVM · ~10s spawn' },
              { layer: 'Tools',        choice: 'shell · git · editor · tests',   why: 'Per-task allowlist · audited' },
              { layer: 'Self-review',  choice: 'Opus 4.7 (separate prompt)',     why: 'Independent eyes' },
              { layer: 'Eval',         choice: 'SWE-bench replay (nightly)',     why: 'CI-blocks regressions' },
              { layer: 'Memory',       choice: 'Per-repo + per-developer',       why: 'Privacy + relevance' },
            ]}
            scale={[
              { label: 'Tickets / week',  value: '120 / team' },
              { label: 'PRs / day',        value: '~17 / team' },
              { label: 'Sandbox spawns',  value: '~100 / day' },
              { label: 'Token spend',     value: '$288 / week' },
            ]}
            cost={{
              perUnit: '$2.40',
              unitLabel: 'per merged PR',
              perPeriod: '~$5 K',
              periodLabel: 'org / week',
            }}
            moats={[
              'Sandbox is the product — isolation budget pays back daily',
              'Internal regression set + SWE-bench Verified compounds',
              'State machine beats free-form ReAct at 30+ turns',
              '~250× cheaper than 4-hr senior dev on equivalent ticket',
            ]}
          />
        </section>
      )}

      {show('Functional Requirements') && (
        <section>
          <SectionHeader num="02" title="Functional Requirements" subtitle="P0 capabilities + SLO targets" color={C} />
          <SWEReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="What scale we&apos;re sizing for" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Tickets/week',  formula: 'T = 200\\,\\text{devs} \\times 0.6\\,\\text{tix/dev/wk} = 120', explanation: 'Eligible auto-pilot tickets per week.' },
              { label: 'Concurrent runs', formula: 'C = \\frac{T}{T_{\\text{cycle}}} \\times \\text{burst} \\approx 12\\,\\text{at peak}', explanation: 'Avg 14-min cycle; 5x burst for releases.' },
              { label: 'Sandboxes/day',   formula: '\\sim 25 \\text{ active } \\Rightarrow \\sim 100\\,\\text{spawns/day}', explanation: 'Most live for 5-30 minutes; spawns/destroys constant.' },
              { label: 'Token spend/wk',  formula: 'T \\times \\$2.40 = \\$288', explanation: 'Per team. Org-wide ~$5K/week.' },
              { label: 'Storage',         formula: '\\sim 50\\,\\text{GB cached deps} + 5\\,\\text{GB traces/wk}', explanation: 'Layer cached aggressively.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Ticket ingest → sandbox → agent → PR" color={C} />
          <SWEArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Ingest</strong>: webhook from GitHub/Linear/Jira; normalises ticket payload; writes to durable queue (NATS or AWS SQS).</li>
            <li><strong>Scope/Planner</strong>: Opus 4.7 reads the ticket + repo README + recent commits. Outputs a plan: file targets, test strategy, ACs.</li>
            <li><strong>Sandbox Manager</strong>: pulls from queue, requests an ephemeral VM from E2B/Modal, clones the repo, installs cached deps.</li>
            <li><strong>Agent Loop</strong>: Sonnet 4.6 + LangGraph state machine. Runs inside the sandbox, talks to the model API outbound.</li>
            <li><strong>Verify</strong>: tests + lint + typecheck inside sandbox; LLM-judge on diff for &quot;does this match the ticket?&quot;</li>
            <li><strong>PR + Review Loop</strong>: opens PR via GitHub API; subscribes to review comments; iterates until merge (or escalates to human after 3 review cycles).</li>
          </ul>
        </section>
      )}

      {show('Sequence: One Ticket') && (
        <section>
          <SectionHeader num="05" title="Sequence: One Ticket" subtitle="Ticket → plan → sandbox → loop → PR (~14 min p50)" color={C} />
          <SWESequence />
          <p>
            The sequence is the system in motion. Each downward arrow is an HTTP call or queue handoff; each self-loop is internal work. Rough timing budget: ingest+plan ~30s, sandbox spawn+clone ~25s, agent loop 5–25 min (most of the wall-clock), verify 30s, PR open + review iterations 1–3 cycles. The hard caps (80 turns / 5 debug attempts / 30 min wall) bound the worst case so a stuck run never burns the budget.
          </p>
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="06" title="API & Data Model" subtitle="REST surface + Postgres tables" color={C} />
          <SWEAPIDesign />
          <SWEDataModel />
          <h3>Why these tables</h3>
          <ul>
            <li><strong>tickets / runs / agent_steps</strong>: the operational triangle. One ticket → one run → many steps. Steps are partitioned by month — they are the high-volume table (~50 rows per run × 120 runs/week per team).</li>
            <li><strong>tool_calls</strong>: separate from steps because tool I/O can be large (file diffs, test output) and we want to TTL it independently.</li>
            <li><strong>sandbox_lifecycle</strong>: pure ops table — feeds capacity dashboards, spawn-time SLO alerts, provider failover decisions.</li>
            <li><strong>eval_results</strong>: every nightly SWE-bench run + every internal regression replay. Keyed by SHA so we can answer &quot;did THIS commit drop accuracy?&quot;</li>
            <li><strong>secrets_audit</strong>: separate audit-only table; immutable; queried by SecOps. Survives even if a run is purged.</li>
          </ul>
        </section>
      )}

      {show('Sandbox Internals') && (
        <section>
          <SectionHeader num="07" title="Sandbox Internals" subtitle="Isolation is non-negotiable" color={C} />
          <SandboxInternals />
          <Callout type="warning">
            Code-execution sandboxes are a real attack surface. Never pull deps from arbitrary registries — pre-cache mirrors. Never enable inbound networking. Never trust the agent&apos;s outbound list — use a curated allowlist. Audit egress.
          </Callout>
        </section>
      )}

      {show('Agent Loop Deep Dive') && (
        <section>
          <SectionHeader num="08" title="Agent Loop Deep Dive" subtitle="State machine with hard caps" color={C} />
          <AgentLoopDeep />
          <h3>Why a state machine, not a free-form ReAct</h3>
          <p>
            Free-form ReAct works for short tasks. SWE work runs 30+ turns. Without a state machine you get: agents that loop on a failing test, agents that drift into refactoring the world, agents that &quot;decide&quot; the work is done before tests pass. The state machine encodes guardrails: you can&apos;t open a PR without passing tests; you can&apos;t enter EDIT without a plan; you can&apos;t merge without review.
          </p>
        </section>
      )}

      {show('Tool Shell') && (
        <section>
          <SectionHeader num="09" title="Tool Shell" subtitle="What the agent can and can&apos;t touch" color={C} />
          <ComparisonTable
            headers={['Tool', 'Operation', 'Scope', 'Audit']}
            rows={[
              ['shell',     'bash exec',           'sandbox only · curated PATH', 'every cmd logged'],
              ['git',       'commit/branch/push',  'task branch only',            'commit signing required'],
              ['editor',    'read/write files',    'in-scope dirs from plan',     'diff captured'],
              ['tests',     'pytest/jest/etc',     'sandbox only',                'pass/fail logged'],
              ['browser',   'fetch URL',           'allowlisted docs',            'every URL logged'],
              ['memory',    'recall past patches', 'this repo · this developer',  'access logged'],
              ['github',    'open PR · comment',   'task branch · target repo',   'every API call logged'],
            ]}
          />
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="10" title="Deployment Topology" subtitle="Region-pinned · ephemeral sandbox fleet" color={C} />
          <SWEDeployment />
          <p>
            Stateless tier scales horizontally on queue depth (HPA). Stateful tier is the boring, valuable part — Aurora multi-AZ, Redis for claim locks, NATS/SQS with DLQ. The sandbox fleet is intentionally separate: it&apos;s the only tier that runs untrusted code, so it&apos;s isolated from the control plane (different VPC, different IAM, different egress posture).
          </p>
        </section>
      )}

      {show('Eval & SWE-bench') && (
        <section>
          <SectionHeader num="11" title="Eval & SWE-bench" subtitle="Public + private benchmarks side-by-side" color={C} />
          <SWEEval />
          <h3>What we run nightly</h3>
          <ul>
            <li><H tip="SWE-bench Verified = the human-verified subset of SWE-bench, with 500 issues confirmed to have correct hidden tests. The standard benchmark for autonomous SWE agents in 2026." color={GREEN}>SWE-bench Verified</H> — 500 hand-vetted issues. Catches public-benchmark drift.</li>
            <li>Internal regression set — anonymised tickets from prod, replayed against any prompt/model change.</li>
            <li>Adversarial set — known &quot;agent-fooling&quot; tickets (ambiguous ACs, conflicting tests, hidden race conditions).</li>
          </ul>
          <Callout type="key">
            CI blocks PRs that drop SWE-bench by &gt;1pt or internal pass-rate by &gt;2pt. The team that disabled this once spent a quarter cleaning up.
          </Callout>
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="12" title="Cost Analysis" subtitle="Where every dollar goes" color={C} />
          <SWECost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="13" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <SWEFailures />
        </section>
      )}

      {show('Security') && (
        <section>
          <SectionHeader num="14" title="Security" subtitle="Code-exec agents are an attack surface" color={C} />
          <ul>
            <li><strong>Sandbox containment</strong>: firecracker microVMs · curated network egress · ephemeral storage · scrubbed on destroy.</li>
            <li><strong>Secret management</strong>: secrets never in sandbox env; scoped tokens delivered just-in-time via attested service account.</li>
            <li><strong>Pre-commit secret scanner</strong>: every commit runs <code>trufflehog</code> + custom rules; PR blocks on findings.</li>
            <li><strong>Egress audit</strong>: every outbound request logged with destination + payload size; alerts on novel domains.</li>
            <li><strong>Per-PR signing</strong>: all commits signed by the agent service account; verifiable provenance.</li>
            <li><strong>Supply-chain hygiene</strong>: deps pinned · lockfile diffs reviewed · Sigstore verification.</li>
          </ul>
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="15" title="Trade-offs" subtitle="What we picked, what we didn&apos;t" color={C} />
          <SWETradeOffs />
          <p>
            The autonomous-vs-interactive choice matters most. Devin proves end-to-end autonomy is possible; in practice, most production teams in 2026 run interactive (developer in the seat, agent suggests/proposes). Autonomous mode gets enabled per-repo as trust accrues.
          </p>
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="16" title="Mental Models" subtitle="What to carry" color={C} />
          <MentalModel
            title="The sandbox is the product"
            color={GREEN}
            analogy="A surgeon's OR is what makes the surgery safe; the surgeon is the lesser part of the system."
            technical="The sandbox is what makes agentic SWE viable. Investment in spawn time, isolation, and resource caps pays back daily; investment in prompt tuning compounds slower."
          />
          <MentalModel
            title="State machine beats free-form"
            color={C}
            analogy="A pilot follows a checklist. The agent follows a state machine."
            technical="LangGraph state + checkpoints + max-step caps make long-running agents recoverable and debuggable. Free-form ReAct works for 5-turn tasks; falls apart at 50 turns."
          />
          <MentalModel
            title="Eval is the moat"
            color={AMBER}
            analogy="The team with the better regression dataset ships safer, even with a worse model."
            technical="Public benchmarks (SWE-bench) catch drift; private replay sets catch domain-specific regressions. Both run on every PR."
          />
          <MentalModel
            title="Plan once, edit many"
            color={PURPLE}
            analogy="A junior engineer who writes the design doc first ships better PRs than one who jumps to coding."
            technical="A frontier model on the plan stage (Opus 4.7) and a cheaper model in the edit loop (Sonnet 4.6) gets you 90% of the quality at 30% of the cost."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="17" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>SWE-bench: <code>swebench.com</code></li>
            <li>Cognition Devin engineering blog</li>
            <li>E2B docs / Modal docs / Daytona docs</li>
            <li>Cursor / Claude Code / GitHub Copilot Agent (commercial references)</li>
            <li>This module&apos;s research vault: <code>vault/research/project-swe/</code> (4 files)</li>
          </ul>
        </section>
      )}
    </>
  );
}
