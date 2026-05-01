import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';

const C       = '#ef4444';
const C2      = '#b91c1c';
const BG      = '#180a0a';
const SURFACE = '#220e0e';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#3a1010';
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

/* ─── Functional + NFRs ──────────────────────────────────────────── */
function DevOpsReqs() {
  const must = [
    'Ingest alerts (Datadog · PagerDuty · Sentry · CW)',
    'Dedup + correlate · severity scoring',
    'Auto-investigate: logs · metrics · traces',
    'Match runbook · execute or propose',
    'Tiered mitigation with approval gates',
    'Postmortem draft within 5 min of resolution',
    'Bidirectional sync with on-call rotation',
    'Immutable audit log for every action',
  ];
  const nfr = [
    ['p50 alert → triage',  '< 30 s',     'P0'],
    ['Auto-mitigated rate', '≥ 40%',      'P0'],
    ['False positive rate', '< 5%',       'P0'],
    ['Postmortem drafted',  '< 5 min',    'P0'],
    ['Own uptime',          '99.99%',     'P0'],
    ['Cost / incident',     '< $4',       'P1'],
    ['Audit completeness',  '100%',       'P0'],
    ['SOC 2 Type II',       'compliant',  'P0'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="DevOps agent functional and NFRs">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS — MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(239,68,68,0.06)" stroke={C} strokeWidth={1.4} />
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
function DevOpsArch() {
  return (
    <svg viewBox="0 0 880 720" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="DevOps incident response agent architecture">
      <defs>
        <marker id="dvArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={FG} />
        </marker>
        <marker id="dvArrR" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={RED} />
        </marker>
        <linearGradient id="dvBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#220e0e" />
          <stop offset="100%" stopColor="#150707" />
        </linearGradient>
      </defs>
      <rect width={880} height={720} rx={12} fill="url(#dvBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — ALERT → TRIAGE → INVESTIGATE → RUNBOOK → MITIGATE → POSTMORTEM
      </text>

      {/* Alert sources */}
      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">ALERT SOURCES</text>
      {['Datadog', 'PagerDuty', 'Sentry', 'CloudWatch', 'Prometheus', 'Custom'].map((s, i) => (
        <g key={i}>
          <rect x={170 + i * 110} y={66} width={100} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={220 + i * 110} y={86} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#dvArr)" />

      {/* Ingest */}
      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        ALERT INGEST · normalize (CloudEvents) · dedup · correlate (service · time · sig)
      </text>
      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#dvArr)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#dvArr)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#dvArr)" />

      {/* Triage / Severity / On-call routing */}
      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">TRIAGE BRAIN</text>
      <text x={165} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Sonnet 4.6 · severity score</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">SEV1 / SEV2 / SEV3 / noise</text>

      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(239,68,68,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">CORRELATION</text>
      <text x={435} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">topology graph · related alerts</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">deploy + traffic + saturation joins</text>

      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">ON-CALL ROUTING</text>
      <text x={710} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">PagerDuty schedule lookup</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">attach incident channel · invite</text>

      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#dvArr)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#dvArr)" />
      <line x1={710} y1={258} x2={710} y2={290} stroke={FG} strokeWidth={1.4} markerEnd="url(#dvArr)" />

      {/* Investigation */}
      <rect x={40} y={290} width={800} height={120} rx={10} fill="rgba(34,211,238,0.06)" stroke={CYAN} strokeWidth={1.4} />
      <text x={60} y={310} fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">INVESTIGATION ENGINE  (parallel fan-out)</text>
      {[
        { x: 50,  label: 'LOGS',     desc: 'Datadog Logs · Splunk · ELK',   icon: 'log' },
        { x: 220, label: 'METRICS',  desc: 'Prometheus · Datadog · CW',     icon: 'met' },
        { x: 390, label: 'TRACES',   desc: 'APM · Tempo · Honeycomb',       icon: 'tr' },
        { x: 560, label: 'TOPOLOGY', desc: 'service mesh · dep graph',      icon: 'top' },
        { x: 730, label: 'DEPLOYS',  desc: 'last 60 min · k8s events',      icon: 'dep' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={326} width={140} height={70} rx={6} fill={SURFACE} stroke={CYAN} strokeWidth={1} />
          <text x={t.x + 80} y={348} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={368} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{t.desc}</text>
          <text x={t.x + 80} y={386} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">parallel · cached 5min</text>
        </g>
      ))}

      {/* Runbook + mitigation */}
      <rect x={40} y={428} width={400} height={70} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={60} y={448} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">RUNBOOK MATCHER</text>
      <text x={60} y={466} fill={FG} fontSize={9} fontFamily="monospace">vector search over runbook corpus · top-3 by similarity</text>
      <text x={60} y={482} fill={GRAY} fontSize={9} fontFamily="monospace">runbooks declarative (YAML) · executable in sandbox</text>

      <rect x={460} y={428} width={380} height={70} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.4} />
      <text x={480} y={448} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">APPROVAL GATE (tiered)</text>
      <text x={480} y={466} fill={FG} fontSize={9} fontFamily="monospace">T1 auto · T2 ack · T3 explicit human approve</text>
      <text x={480} y={482} fill={GRAY} fontSize={9} fontFamily="monospace">blast-radius scored at runbook match</text>

      <line x1={240} y1={498} x2={240} y2={520} stroke={GREEN} strokeWidth={1.4} markerEnd="url(#dvArr)" />
      <line x1={650} y1={498} x2={650} y2={520} stroke={AMBER} strokeWidth={1.4} markerEnd="url(#dvArr)" />

      {/* Mitigation actions */}
      <rect x={40} y={520} width={800} height={90} rx={10} fill="rgba(20,184,166,0.07)" stroke={TEAL} strokeWidth={1.4} />
      <text x={60} y={540} fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">MITIGATION LAYER</text>
      {[
        { x: 50,  label: 'k8s',       desc: 'restart · scale · drain' },
        { x: 200, label: 'deploy',    desc: 'rollback · canary · pin' },
        { x: 350, label: 'DNS / WAF', desc: 'failover · rate-limit' },
        { x: 500, label: 'feature',   desc: 'flag flip · LD/Statsig' },
        { x: 650, label: 'comms',     desc: 'statuspage · Slack' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={556} width={140} height={44} rx={5} fill={SURFACE} stroke={TEAL} strokeWidth={0.9} />
          <text x={t.x + 80} y={576} textAnchor="middle" fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={592} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      {/* Verifier */}
      <rect x={40} y={620} width={400} height={56} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.3} />
      <text x={60} y={640} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">VERIFIER</text>
      <text x={60} y={658} fill={FG} fontSize={9} fontFamily="monospace">SLO check post-mitigation · alert clear · canary metrics</text>
      <text x={60} y={672} fill={GRAY} fontSize={9} fontFamily="monospace">re-trigger if regressed</text>

      {/* Postmortem */}
      <rect x={460} y={620} width={380} height={56} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.3} />
      <text x={480} y={640} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">POSTMORTEM DRAFTER</text>
      <text x={480} y={658} fill={FG} fontSize={9} fontFamily="monospace">timeline · root cause · 5-whys · action items</text>
      <text x={480} y={672} fill={GRAY} fontSize={9} fontFamily="monospace">human reviews + ships</text>

      {/* Audit band */}
      <rect x={40} y={690} width={800} height={20} rx={4} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={440} y={704} textAnchor="middle" fill={AMBER} fontSize={9} fontFamily="monospace">
        AUDIT — every action signed · immutable · SOC 2 trail · CAB-reviewable change record
      </text>
    </svg>
  );
}

/* ─── Mitigation tiers ───────────────────────────────────────────── */
function MitigationTiers() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Mitigation tier hierarchy">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        MITIGATION TIERS — BLAST RADIUS DETERMINES AUTHORITY
      </text>

      {[
        { x: 30,  color: GREEN,  tier: 'T1 · AUTO',     blast: 'tiny',
          desc: 'cache flush · restart pod · scale out · clear CDN · re-run job',
          gate: 'no human · runbook flag autoExecute=true',
          rate: '~80% of incidents' },
        { x: 305, color: AMBER,  tier: 'T2 · ACK',      blast: 'medium',
          desc: 'rollback · drain node · DNS failover · rate-limit endpoint',
          gate: 'on-call ack within 60s · lazy-veto with /undo',
          rate: '~15% of incidents' },
        { x: 580, color: RED,    tier: 'T3 · EXPLICIT', blast: 'large',
          desc: 'feature flag flip · prod schema change · external DNS · region failover',
          gate: 'explicit human approve · CAB if outside change-window',
          rate: '~5% of incidents' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={60} width={270} height={350} rx={11} fill={SURFACE} stroke={t.color} strokeWidth={1.4} />
          <rect x={t.x} y={60} width={270} height={32} rx={11} fill={t.color} fillOpacity={0.18} />
          <text x={t.x + 135} y={82} textAnchor="middle" fill={t.color} fontSize={12} fontWeight={700} fontFamily="monospace">{t.tier}</text>
          <text x={t.x + 18} y={114} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">BLAST RADIUS</text>
          <text x={t.x + 18} y={132} fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">{t.blast}</text>

          <text x={t.x + 18} y={166} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">EXAMPLE ACTIONS</text>
          {t.desc.split(' · ').map((d, k) => (
            <text key={k} x={t.x + 18} y={186 + k * 16} fill={FG} fontSize={9} fontFamily="monospace">• {d}</text>
          ))}

          <text x={t.x + 18} y={290} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">GATE</text>
          <text x={t.x + 18} y={308} fill={FG} fontSize={9} fontFamily="monospace">{t.gate}</text>

          <text x={t.x + 18} y={350} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">FREQUENCY</text>
          <text x={t.x + 18} y={368} fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.rate}</text>
        </g>
      ))}

      <rect x={40} y={420} width={800} height={32} rx={6} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={440} y={440} textAnchor="middle" fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">
        Tier is decided at runbook-match time. Engineers sign tier classification. Auditor reviews quarterly.
      </text>
    </svg>
  );
}

/* ─── Sequence ───────────────────────────────────────────────────── */
function DevOpsSequence() {
  const lanes = [
    { x: 80,  label: 'Alert'     },
    { x: 220, label: 'Triage'    },
    { x: 360, label: 'Investig.' },
    { x: 500, label: 'Runbook'   },
    { x: 640, label: 'Mitigate'  },
    { x: 780, label: 'Postmtm'   },
  ];
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Incident response sequence">
      <defs>
        <marker id="dvSArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={600} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE — ONE INCIDENT (api 500s spike → rollback → resolve)
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={560} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 80,  to: 220, y: 110, label: '1. SEV1 fired · checkout-api 500s p95 spike',  color: PURPLE },
        { from: 220, to: 220, y: 138, label: '2. severity=SEV1 · dedup 4 alerts · same sig', color: AMBER, self: true },
        { from: 220, to: 360, y: 168, label: '3. open investigation · fan-out 5 sources',     color: CYAN },
        { from: 360, to: 360, y: 196, label: '4. logs: NPE · metrics: post-deploy · trace: db latency', color: CYAN, self: true },
        { from: 360, to: 220, y: 226, label: '5. likely cause: deploy v2.41.3 (15 min ago)',  color: CYAN, reverse: true },
        { from: 220, to: 500, y: 254, label: '6. match runbook · "deploy regression rollback"', color: GREEN },
        { from: 500, to: 500, y: 282, label: '7. blast=medium · tier=T2 · ack required',        color: AMBER, self: true },
        { from: 500, to: 640, y: 310, label: '8. propose: rollback to v2.41.2',                  color: AMBER },
        { from: 640, to: 220, y: 338, label: '9. notify on-call · 60s ack window',              color: PINK, reverse: true },
        { from: 220, to: 640, y: 366, label: '10. ack ✓ from on-call (Slack /ack)',             color: GREEN },
        { from: 640, to: 640, y: 394, label: '11. execute: kubectl rollout undo · drain canary', color: TEAL, self: true },
        { from: 640, to: 360, y: 422, label: '12. verifier: SLO recovering · 500s normal',      color: GREEN, reverse: true },
        { from: 640, to: 80,  y: 450, label: '13. statuspage · Slack · all-clear',             color: GREEN },
        { from: 640, to: 780, y: 478, label: '14. trigger postmortem draft',                    color: PURPLE },
        { from: 780, to: 780, y: 506, label: '15. timeline · root cause · 4 action items',    color: PURPLE, self: true },
        { from: 780, to: 220, y: 534, label: '16. postmortem PR opened · awaiting human review', color: PURPLE, reverse: true },
      ].map((m, i) => (
        <g key={i}>
          {m.self ? (
            <>
              <path d={`M ${m.from} ${m.y} q 30 -8 0 18`} fill="none" stroke={m.color} strokeWidth={1.4} markerEnd="url(#dvSArr)" />
              <text x={m.from + 38} y={m.y + 6} fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          ) : (
            <>
              <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#dvSArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
              <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          )}
        </g>
      ))}
      <rect x={40} y={566} width={800} height={26} rx={5} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={584} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        TTM (alert → resolved): ~6 min · auto-mitigated · postmortem drafted in 4 min · cost $2.10
      </text>
    </svg>
  );
}

/* ─── Topology graph ──────────────────────────────────────────────── */
function TopologyGraph() {
  const nodes = [
    { id: 'web',     x: 140, y: 130, label: 'web-frontend',    color: BLUE },
    { id: 'gw',      x: 320, y: 130, label: 'api-gateway',     color: BLUE },
    { id: 'checkout',x: 500, y: 80,  label: 'checkout-svc',    color: RED, alert: true },
    { id: 'auth',    x: 500, y: 180, label: 'auth-svc',        color: GREEN },
    { id: 'orders',  x: 680, y: 80,  label: 'orders-svc',      color: AMBER, related: true },
    { id: 'pay',     x: 680, y: 180, label: 'payments-svc',    color: GREEN },
    { id: 'db',      x: 820, y: 130, label: 'orders-db',       color: AMBER, related: true },
    { id: 'inv',     x: 500, y: 280, label: 'inventory-svc',   color: GREEN },
    { id: 'queue',   x: 320, y: 280, label: 'order-queue',     color: GREEN },
    { id: 'cache',   x: 140, y: 280, label: 'redis-cache',     color: GREEN },
  ];
  const edges = [
    ['web', 'gw'], ['gw', 'checkout'], ['gw', 'auth'], ['checkout', 'orders'],
    ['orders', 'db'], ['checkout', 'pay'], ['checkout', 'inv'], ['orders', 'queue'],
    ['queue', 'inv'], ['gw', 'cache'],
  ];
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Service topology with alert correlation">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        TOPOLOGY — ALERT BLAST CORRELATION
      </text>
      {edges.map(([a, b], i) => {
        const A = nodes.find(n => n.id === a);
        const B = nodes.find(n => n.id === b);
        return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={DIM} strokeWidth={1} />;
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.alert && <circle cx={n.x} cy={n.y} r={28} fill="none" stroke={RED} strokeWidth={1.4} strokeDasharray="3 2" opacity={0.7} />}
          {n.related && <circle cx={n.x} cy={n.y} r={26} fill="none" stroke={AMBER} strokeWidth={1.2} strokeDasharray="2 2" opacity={0.6} />}
          <circle cx={n.x} cy={n.y} r={20} fill={SURFACE} stroke={n.color} strokeWidth={1.6} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={n.color} fontSize={9} fontWeight={700} fontFamily="monospace">{n.label.slice(0, 8)}</text>
          <text x={n.x} y={n.y + 38} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">{n.label}</text>
        </g>
      ))}

      <rect x={40} y={350} width={800} height={94} rx={9} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1} />
      <text x={60} y={372} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">CORRELATION LOGIC</text>
      <text x={60} y={392} fill={FG} fontSize={9} fontFamily="monospace">• Alert epicentre = checkout-svc (RED dashed) · highest-severity in window</text>
      <text x={60} y={408} fill={FG} fontSize={9} fontFamily="monospace">• Related (AMBER dashed) = downstream services with elevated latency · likely cascaded</text>
      <text x={60} y={424} fill={FG} fontSize={9} fontFamily="monospace">• GREEN healthy = exclude from blast unless evidence emerges (saves runbook fan-out)</text>
      <text x={60} y={440} fill={GRAY} fontSize={9} fontFamily="monospace">Topology refreshed every 60s from service mesh + deploy events</text>
    </svg>
  );
}

/* ─── Cost ───────────────────────────────────────────────────────── */
function DevOpsCost() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="DevOps agent cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER INCIDENT — $2.10 BREAKDOWN
      </text>
      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {(() => {
        const items = [
          { name: 'Triage LLM',         cents: 30, color: AMBER },
          { name: 'Investigation LLM',  cents: 80, color: CYAN },
          { name: 'Runbook match',      cents: 15, color: GREEN },
          { name: 'Postmortem draft',   cents: 60, color: PURPLE },
          { name: 'Tool calls + infra', cents: 25, color: BLUE },
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
        { name: 'Triage LLM (Sonnet 4.6 · 1 call)',          cents: 30, color: AMBER },
        { name: 'Investigation (Sonnet · log/metric/trace)',  cents: 80, color: CYAN },
        { name: 'Runbook embedding search',                    cents: 15, color: GREEN },
        { name: 'Postmortem draft (Opus 4.7)',                 cents: 60, color: PURPLE },
        { name: 'Tool calls + infra (k8s · APIs)',             cents: 25, color: BLUE },
      ].map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 2) * 400} ${190 + Math.floor(i / 2) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={370} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">{it.cents}¢</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: $2.10 / INCIDENT</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">@ 50 incidents/day = $105/day · ~$3.2K/month</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">vs human SRE 30 min/incident × $80/hr = $40/incident</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">~20× cost reduction · 40% auto-mitigated</text>
    </svg>
  );
}

/* ─── Failures ───────────────────────────────────────────────────── */
function DevOpsFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="DevOps agent failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES &amp; MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'WRONG DIAGNOSIS', risk: 'agent blames wrong service', mit: 'topology graph · hypothesis ranking · cite evidence · human override' },
        { x: 240, title: 'CASCADE TRIGGER', risk: 'mitigation makes it worse',  mit: 'tier classification · canary-then-fleet · auto-rollback on SLO regress' },
        { x: 450, title: 'ALERT FLOOD',     risk: 'noise drowns real signal',   mit: 'dedup · correlation · severity threshold · maintenance windows' },
        { x: 660, title: 'AUDIT GAP',       risk: 'action untraceable',         mit: 'every action signed · CloudEvents log · immutable + queryable trail' },
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
function DevOpsTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="DevOps agent design trade-offs">
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
        ['Runbook format',   'Declarative YAML · executable',  'Free-form markdown',          'Reproducible · auditable'],
        ['Triage model',     'Sonnet 4.6',                      'Haiku 4.5',                   'Severity wrong = costly'],
        ['Postmortem model', 'Opus 4.7',                        'Sonnet 4.6',                  'Quality matters · low volume'],
        ['Mitigation gate',  'Tiered · blast-radius scored',    'Always-human OR always-auto', 'Best of both'],
        ['Investigation',    'Parallel fan-out',                'Sequential',                  'Latency budget'],
        ['Topology source',  'Service mesh (real-time)',        'Static config',               'Auto-tracks deploys'],
        ['Audit',            'Signed events · CloudEvents',     'Plain log lines',             'SOC 2 + integrity'],
        ['Approval UX',      'Slack + /ack lazy-veto',          'Web app login',               'Zero context-switch'],
        ['DR',               'Active-active multi-region',      'Warm standby',                'Cannot go down in incident'],
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

/* ─── Deployment ─────────────────────────────────────────────────── */
function DevOpsDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="DevOps agent deployment topology">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT — ACTIVE-ACTIVE · 99.99% OWN UPTIME · SOC 2
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare · WAF · OAuth (PagerDuty / Slack) · per-tenant rate · webhook HMAC · IP allowlist for CRM</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(239,68,68,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">REGION · us-east-1 + us-west-2 (active-active · global Anycast)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">STATELESS WORKERS</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">• ingest-api · 12 pods (HPA)</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">• triage-worker · 8 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">• investigation-worker · 16 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">• runbook-executor · 8 pods</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">graceful drain on rollout</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">STATEFUL</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Postgres (multi-region)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">• ClickHouse (events · TTL 2y)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">• Redis (incident lock · 1h TTL)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">• pgvector (runbook corpus)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PITR · sealed audit log</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">EXEC FABRIC</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">• per-tenant agent (k8s controller)</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">• signed kubectl · scoped RBAC</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">• Spinnaker / ArgoCD adapter</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">• AWS / GCP / Azure SDKs</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">break-glass disable per-action</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EXTERNAL (egress)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">• Datadog · PagerDuty · Sentry · Splunk · Honeycomb · Tempo · Prometheus</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">• Slack · Teams · GitHub · Jira</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">• Anthropic / OpenAI · prompt-cache · regional failover</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY (eat own dogfood)</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel · Datadog · ClickHouse SLO board · meta-alerts (alert if agent itself flaps)</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR (MUST stay up)</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">Active-active · global Postgres mesh · RPO 0 · RTO 0 · region cut-over transparent</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">In-flight incidents continue on the surviving region · idempotent runbooks tolerate retries</text>
    </svg>
  );
}

export default function ProjectDevOpsAgentPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Resolve / PagerDuty Copilot-class IR agent" color={C} />
          <p>
            Build an <H tip="AI incident-response agent = an agent that ingests alerts, decides what they mean, runs a triage + investigation loop using logs/metrics/traces/topology, then either auto-mitigates or proposes mitigation to a human. References: Resolve.ai, PagerDuty Copilot, Dagger AI, Edwin AI, Big Panda. The category is exploding through 2026 because production reliability is leverage." color={C}>incident response agent</H> for a 100-service mid-size SaaS company doing ~50 incidents/day across SEV1/2/3. Hard goals: alert→triage in &lt;30s, ≥40% incidents auto-mitigated (T1 actions only), &lt;5% false positives, postmortem drafted within 5 min of resolution, 99.99% own uptime (the agent cannot go down during a real incident).
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: a tireless on-call rookie that knows every runbook, can fan out 5 investigations in parallel, never gets paged-out tired, and writes postmortems while you sleep. The senior on-call is the one approving the dangerous fixes.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: capacity planning, perf optimization, migrations, security incidents (separate SOC agent). The agent handles operational reliability incidents only.
          </Callout>
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <DevOpsReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="Throughput · cost · SLO targets" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Alerts /day',      formula: 'A = 5{,}000', explanation: 'Most are noise · dedup yields ~50 incidents/day.' },
              { label: 'Incidents /day',   formula: 'I \\approx \\frac{A}{100} = 50', explanation: 'Industry rule-of-thumb after correlation.' },
              { label: 'Auto-mitigated',   formula: 'I \\times 0.4 = 20', explanation: 'T1 actions only (low blast radius).' },
              { label: 'Concurrent peak',  formula: 'C = 4 \\times \\frac{50}{86400} \\times 600\\,\\text{s} \\approx 1.4', explanation: 'Avg incident handled in 10 min.' },
              { label: 'Cost / incident',  formula: '\\$2.10', explanation: 'Triage + investigation + runbook + postmortem.' },
              { label: 'Org savings',      formula: '\\sim 250\\,\\text{SRE-hr/wk saved}', explanation: 'Vs. fully-human IR loop.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Alert → triage → investigate → runbook → mitigate → postmortem" color={C} />
          <DevOpsArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Alert ingest</strong>: webhook + pull adapters · normalize to <H tip="CloudEvents = CNCF spec for event metadata. Standard envelope: type, source, id, time, data. Lets multiple producers (Datadog, PagerDuty, Sentry) feed one consumer without bespoke parsers." color={C}>CloudEvents</H>.</li>
            <li><strong>Dedup + correlate</strong>: same-service · same-time-window · similar signature · service topology join.</li>
            <li><strong>Triage brain</strong>: Sonnet 4.6 · severity score (SEV1/2/3/noise) · attaches incident channel.</li>
            <li><strong>Investigation engine</strong>: parallel fan-out across logs · metrics · traces · topology · recent deploys. 5min cache.</li>
            <li><strong>Runbook matcher</strong>: pgvector over runbook corpus · top-3 by similarity · score blast radius.</li>
            <li><strong>Approval gate</strong>: tier-based (T1 auto · T2 ack · T3 explicit). Lazy-veto via Slack /ack /undo.</li>
            <li><strong>Mitigation layer</strong>: kubectl · deploy rollback · DNS/WAF · feature flags · comms.</li>
            <li><strong>Verifier</strong>: SLO check post-action · canary metrics · re-trigger if regressed.</li>
            <li><strong>Postmortem drafter</strong>: Opus 4.7 · timeline · root cause · 5-whys · action items · GitHub PR.</li>
          </ul>
        </section>
      )}

      {show('Mitigation Tiers') && (
        <section>
          <SectionHeader num="05" title="Mitigation Tiers" subtitle="Blast radius determines authority" color={C} />
          <MitigationTiers />
          <Callout type="warning">
            The single biggest mistake teams make is letting the agent execute T2 actions without ack. A bad rollback during a deploy issue can take prod down for an hour. Tier classification is signed by an engineer at runbook authoring time and reviewed quarterly.
          </Callout>
        </section>
      )}

      {show('Investigation Engine') && (
        <section>
          <SectionHeader num="06" title="Investigation Engine" subtitle="Parallel fan-out across signals · 5min cache" color={C} />
          <ul>
            <li><strong>Logs</strong>: Datadog Logs / Splunk / ELK adapter. Free-text + structured. Pull last 5min around alert time.</li>
            <li><strong>Metrics</strong>: Prometheus / Datadog / CloudWatch. Service-scoped + RED metrics + USE metrics + saturation.</li>
            <li><strong>Traces</strong>: Datadog APM / Tempo / Honeycomb. Sample failed traces only · construct dependency timeline.</li>
            <li><strong>Topology</strong>: service mesh (Istio/Linkerd) live graph · last-deploy events · canary state.</li>
            <li><strong>Recent deploys</strong>: GitHub deploy events + ArgoCD sync events · 60min window.</li>
          </ul>
          <p>
            Signals fan out in parallel. Each adapter has a 30s timeout. The brain receives a structured digest (not raw data) — the data extractors do statistical summarization (top-N error patterns, correlation coefficients, percentile shifts) before the LLM sees anything. This keeps token cost flat regardless of incident severity.
          </p>
        </section>
      )}

      {show('Topology Correlation') && (
        <section>
          <SectionHeader num="07" title="Topology Correlation" subtitle="Service graph beats per-alert reasoning" color={C} />
          <TopologyGraph />
          <p>
            Without topology, the agent treats every alert as independent. With topology, the agent sees that 5 alerts on 5 services are actually one incident at the upstream. This single feature accounts for ~30% of correlation accuracy. Investment in keeping the topology graph fresh (60s refresh from service mesh) pays back daily.
          </p>
        </section>
      )}

      {show('Sequence: One Incident') && (
        <section>
          <SectionHeader num="08" title="Sequence: One Incident" subtitle="Deploy regression → rollback → resolve · 6 min" color={C} />
          <DevOpsSequence />
        </section>
      )}

      {show('Runbook Library') && (
        <section>
          <SectionHeader num="09" title="Runbook Library" subtitle="Declarative · executable · versioned" color={C} />
          <h3>Why declarative YAML, not free-form markdown</h3>
          <p>
            Free-form markdown runbooks describe; declarative YAML runbooks <em>execute</em>. Each step is a typed action (kubectl, helm, http, query, sleep, gate) with parameters and a verification check. The matcher selects by similarity; the executor runs them deterministically. Audit gets a structured trail. Test gets a dry-run mode.
          </p>
          <ComparisonTable
            headers={['Field', 'Purpose']}
            rows={[
              ['name',         'Display name + search target'],
              ['triggers',     'Alert signature patterns that match this runbook'],
              ['blast_radius', 'tiny / medium / large → tier classification'],
              ['steps',        'Ordered list of actions with verification'],
              ['preconditions', 'Must-be-true checks before executing'],
              ['rollback',     'How to undo if a step fails'],
              ['owner',        'Engineer / team accountable'],
              ['version',      'Bumped on every change · diff in git'],
              ['tested_at',    'Last successful dry-run timestamp'],
            ]}
          />
        </section>
      )}

      {show('Postmortem Drafter') && (
        <section>
          <SectionHeader num="10" title="Postmortem Drafter" subtitle="From timeline to PR in 5 min" color={C} />
          <ul>
            <li><strong>Timeline reconstruction</strong>: from incident channel + audit log + investigation traces.</li>
            <li><strong>Root cause hypothesis</strong>: ranked candidates with evidence pointers.</li>
            <li><strong>5-whys</strong>: chained drill-down · stops on environmental factors.</li>
            <li><strong>Action items</strong>: extracted from chat + investigation + runbook gaps. Owners suggested by topology.</li>
            <li><strong>PR opened</strong>: GitHub PR in <code>postmortems/</code> repo · awaits human edit + merge.</li>
          </ul>
          <Callout type="key">
            The drafter doesn&apos;t replace human writing — it replaces the cold-start. A good engineer takes 90 min to write a postmortem from scratch; with a draft, they spend 20 min editing it. Net: 70 min/incident saved.
          </Callout>
        </section>
      )}

      {show('Compliance & Audit') && (
        <section>
          <SectionHeader num="11" title="Compliance & Audit" subtitle="SOC 2 Type II · CAB · regulated change control" color={C} />
          <ul>
            <li><strong>Immutable audit</strong>: every action emitted as a signed CloudEvent · indexed in ClickHouse · tamper-evident hash chain.</li>
            <li><strong>Change Advisory Board</strong>: T3 actions outside change-window route through CAB ticket auto-generation.</li>
            <li><strong>Separation of duties</strong>: agent service account ≠ deploy account ≠ secret rotator. Each action attestated.</li>
            <li><strong>Break-glass</strong>: per-action disable switch (LD flag) · org admin can kill a runbook tier in 1 click.</li>
            <li><strong>SOC 2</strong>: encryption-at-rest, access logs, vendor management, BCDR plan. ISO 27001 path optional.</li>
            <li><strong>Regulated industries</strong>: PCI · HIPAA · FedRAMP — runbook tier rules tightened per regime.</li>
          </ul>
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="12" title="API & Data Model" subtitle="REST + webhooks + Postgres + ClickHouse" color={C} />
          <ComparisonTable
            headers={['Method', 'Endpoint', 'Purpose']}
            rows={[
              ['POST', '/v1/alerts/inbound',         'webhook from observability tool'],
              ['GET',  '/v1/incidents/:id',         'incident detail + timeline + state'],
              ['POST', '/v1/incidents/:id/ack',      'on-call ack T2 action'],
              ['POST', '/v1/incidents/:id/undo',     'lazy-veto on T2 within window'],
              ['POST', '/v1/incidents/:id/approve',  'explicit T3 approval'],
              ['GET',  '/v1/runbooks',               'list + search runbooks'],
              ['POST', '/v1/runbooks/:id/dryrun',    'dry-run runbook against staging'],
              ['GET',  '/v1/audit?incident=&actor=','tamper-evident audit query'],
            ]}
          />
          <h3>Key tables</h3>
          <ul>
            <li><code>alerts</code>, <code>incidents</code>, <code>investigations</code>, <code>runbook_runs</code>, <code>actions</code>, <code>postmortems</code>, <code>audit_events</code>, <code>topology_snapshots</code>.</li>
            <li><code>actions</code> is signed and immutable. Append-only. Hash-chained for tamper detection.</li>
            <li>ClickHouse mirrors <code>actions</code> for low-latency audit queries · partition by month · TTL 7 years.</li>
          </ul>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="13" title="Deployment Topology" subtitle="Active-active · cannot go down during incident" color={C} />
          <DevOpsDeployment />
          <p>
            The single non-negotiable: this tool cannot fail during a customer incident. Active-active multi-region with global Postgres mesh, RPO 0, RTO 0. Region cut-over is transparent to in-flight investigations. Idempotent runbooks tolerate replays. Meta-alerts watch the agent itself; if the agent flaps, a separate fallback path pages humans directly.
          </p>
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="14" title="Cost Analysis" subtitle="Per-incident unit economics" color={C} />
          <DevOpsCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="15" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <DevOpsFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="16" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <DevOpsTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="17" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="Tier classification IS the safety system"
            color={C}
            analogy="Surgical kits sort by risk level — what a nurse can do, what a resident does, what an attending must approve."
            technical="Blast radius decides authority. Get this wrong and you have an autonomous robot doing surgery on prod. Get it right and you have a nurse triaging while the doctor sleeps."
          />
          <MentalModel
            title="Topology is non-negotiable context"
            color={GREEN}
            analogy="An ER without a chart of allergies is dangerous. The agent without service topology is the same."
            technical="Five alerts on five services are usually one incident upstream. Without topology, you fan out runbook execution and waste tokens. With it, you act once at the root."
          />
          <MentalModel
            title="The audit trail is the product"
            color={AMBER}
            analogy="A pilot's flight recorder is what makes the airline insurable."
            technical="Signed, immutable, hash-chained action logs are what let SecOps and CAB approve the system. Without that trail, no enterprise will deploy."
          />
          <MentalModel
            title="The agent must outlive the incident"
            color={RED}
            analogy="A fire alarm that goes silent during the fire is worse than no fire alarm."
            technical="99.99% own uptime is structural, not aspirational. Active-active multi-region. Idempotent runbooks. Meta-alerts watch the watcher."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="18" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>Resolve.ai engineering blog (autonomous incident loop)</li>
            <li>PagerDuty Copilot architecture posts</li>
            <li>Google SRE Book — chapter on postmortems</li>
            <li>CloudEvents spec (CNCF)</li>
            <li>SOC 2 Type II readiness checklist</li>
            <li>This module&apos;s research vault: <code>vault/research/project-devops/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design a Resolve-class IR agent on a whiteboard in 45 min, justify tier classification + topology + audit, and explain why &quot;the agent must not fail during the incident&quot; drives every other architectural decision.
          </Callout>
        </section>
      )}
    </>
  );
}
