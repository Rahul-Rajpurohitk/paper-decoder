import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';

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
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="SWE agent architecture">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — TICKET INGEST → SANDBOX → AGENT → PR
      </text>

      <rect x={40} y={60} width={800} height={50} rx={6} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={82} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">TICKET SOURCES</text>
      {['GitHub Issues', 'Linear', 'Jira', 'Slack mention', 'Manual cmd'].map((s, i) => (
        <g key={i}>
          <rect x={200 + i * 120} y={70} width={100} height={30} rx={3} fill={SURFACE} stroke={PURPLE} strokeWidth={0.6} />
          <text x={250 + i * 120} y={90} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}

      <rect x={40} y={130} width={800} height={40} rx={6} fill="rgba(59,130,246,0.06)" stroke={C} strokeWidth={1.2} />
      <text x={440} y={155} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">
        WEBHOOK INGEST · NORMALISE · ENQUEUE (NATS / SQS)
      </text>

      <rect x={40} y={190} width={250} height={60} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={165} y={212} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">SCOPE / PLANNER</text>
      <text x={165} y={230} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Opus 4.7</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">files · tests · ACs</text>

      <rect x={310} y={190} width={250} height={60} rx={8} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.4} />
      <text x={435} y={212} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SANDBOX MANAGER</text>
      <text x={435} y={230} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">E2B / Modal / Daytona</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">spawn ephemeral VM, clone repo</text>

      <rect x={580} y={190} width={260} height={60} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={710} y={212} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">AGENT LOOP</text>
      <text x={710} y={230} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Sonnet 4.6 + ReAct + checkpoints</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">code · test · lint · iterate</text>

      <rect x={40} y={290} width={800} height={120} rx={10} fill="rgba(34,197,94,0.04)" stroke={GREEN} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={314} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">TOOL SHELL (inside sandbox)</text>
      {[
        { x: 60,  label: 'shell',    desc: 'bash, run cmds' },
        { x: 200, label: 'git',      desc: 'commit · branch · PR' },
        { x: 340, label: 'editor',   desc: 'read · write files' },
        { x: 480, label: 'tests',    desc: 'pytest · jest · go test' },
        { x: 620, label: 'browser',  desc: 'docs · search' },
        { x: 760, label: 'memory',   desc: 'past patches' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={330} width={120} height={60} rx={5} fill={SURFACE} stroke={GREEN} strokeWidth={0.8} />
          <text x={t.x + 60} y={352} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 60} y={372} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      <rect x={40} y={430} width={400} height={50} rx={8} fill="rgba(6,182,212,0.06)" stroke={CYAN} strokeWidth={1.2} />
      <text x={240} y={452} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">VERIFY</text>
      <text x={240} y={470} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">tests · lint · typecheck · LLM-judge</text>

      <rect x={460} y={430} width={380} height={50} rx={8} fill="rgba(236,72,153,0.06)" stroke={PINK} strokeWidth={1.2} />
      <text x={650} y={452} textAnchor="middle" fill={PINK} fontSize={11} fontWeight={700} fontFamily="monospace">PR + REVIEW LOOP</text>
      <text x={650} y={470} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">GitHub API · response to comments · merge</text>

      <rect x={40} y={500} width={800} height={30} rx={5} fill="rgba(245,158,11,0.04)" stroke={AMBER} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={440} y={520} textAnchor="middle" fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">
        OBS &amp; EVAL — LangSmith · SWE-bench replay nightly · Datadog · OTel-LLM
      </text>
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

      {show('Sandbox Internals') && (
        <section>
          <SectionHeader num="05" title="Sandbox Internals" subtitle="Isolation is non-negotiable" color={C} />
          <SandboxInternals />
          <Callout type="warning">
            Code-execution sandboxes are a real attack surface. Never pull deps from arbitrary registries — pre-cache mirrors. Never enable inbound networking. Never trust the agent&apos;s outbound list — use a curated allowlist. Audit egress.
          </Callout>
        </section>
      )}

      {show('Agent Loop Deep Dive') && (
        <section>
          <SectionHeader num="06" title="Agent Loop Deep Dive" subtitle="State machine with hard caps" color={C} />
          <AgentLoopDeep />
          <h3>Why a state machine, not a free-form ReAct</h3>
          <p>
            Free-form ReAct works for short tasks. SWE work runs 30+ turns. Without a state machine you get: agents that loop on a failing test, agents that drift into refactoring the world, agents that &quot;decide&quot; the work is done before tests pass. The state machine encodes guardrails: you can&apos;t open a PR without passing tests; you can&apos;t enter EDIT without a plan; you can&apos;t merge without review.
          </p>
        </section>
      )}

      {show('Tool Shell') && (
        <section>
          <SectionHeader num="07" title="Tool Shell" subtitle="What the agent can and can&apos;t touch" color={C} />
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

      {show('Eval & SWE-bench') && (
        <section>
          <SectionHeader num="08" title="Eval & SWE-bench" subtitle="Public + private benchmarks side-by-side" color={C} />
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
          <SectionHeader num="09" title="Cost Analysis" subtitle="Where every dollar goes" color={C} />
          <SWECost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="10" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <SWEFailures />
        </section>
      )}

      {show('Security') && (
        <section>
          <SectionHeader num="11" title="Security" subtitle="Code-exec agents are an attack surface" color={C} />
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
          <SectionHeader num="12" title="Trade-offs" subtitle="What we picked, what we didn&apos;t" color={C} />
          <SWETradeOffs />
          <p>
            The autonomous-vs-interactive choice matters most. Devin proves end-to-end autonomy is possible; in practice, most production teams in 2026 run interactive (developer in the seat, agent suggests/proposes). Autonomous mode gets enabled per-repo as trust accrues.
          </p>
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="13" title="Mental Models" subtitle="What to carry" color={C} />
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
          <SectionHeader num="14" title="Resources" subtitle="Reading + tooling" color={C} />
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
