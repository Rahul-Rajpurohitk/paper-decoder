import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';

const C       = '#22d3ee';
const C2      = '#0e7490';
const BG      = '#08171b';
const SURFACE = '#0c2128';
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
const TEAL    = '#14b8a6';
const ORANGE  = '#fb923c';
const CYAN    = '#06b6d4';

/* ─── Functional + NFRs ──────────────────────────────────────────── */
function SalesReqs() {
  const must = [
    'Ingest leads from CRM + intent providers',
    'Score ICP fit · explain rationale',
    'Auto-research persona + account',
    'Generate personalized first-touch email',
    'Multi-step sequence (email · LinkedIn · phone)',
    'Detect & classify replies (5 buckets)',
    'Book meetings via Calendly / Chili Piper',
    'Bidirectional CRM sync (Salesforce/HubSpot)',
  ];
  const nfr = [
    ['Email deliverability',  '> 95%',     'P0'],
    ['Reply rate',            '≥ 3%',      'P0'],
    ['Meetings booked rate',  '≥ 0.5%',    'P0'],
    ['Personalization F1',    '≥ 0.85',    'P0'],
    ['Cost / meeting booked', '< $50',     'P1'],
    ['Outbound throughput',   '50K /day',  'P1'],
    ['GDPR / CAN-SPAM',       '100%',      'P0'],
    ['Spam complaint rate',   '< 0.1%',    'P0'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sales agent functional and non-functional requirements">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS — MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(34,211,238,0.06)" stroke={C} strokeWidth={1.4} />
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
function SalesArch() {
  return (
    <svg viewBox="0 0 880 700" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sales agent architecture">
      <defs>
        <marker id="sArrG" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={FG} />
        </marker>
        <linearGradient id="sBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0c2128" />
          <stop offset="100%" stopColor="#06141a" />
        </linearGradient>
      </defs>
      <rect width={880} height={700} rx={12} fill="url(#sBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — LEAD → SCORE → RESEARCH → SEQUENCE → REPLY → MEETING
      </text>

      {/* Lead sources */}
      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">LEAD SOURCES</text>
      {['Salesforce', 'HubSpot', 'Apollo', 'ZoomInfo', '6sense (intent)', 'G2 (signals)'].map((s, i) => (
        <g key={i}>
          <rect x={170 + i * 110} y={66} width={100} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={220 + i * 110} y={86} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#sArrG)" />

      {/* Lead intake */}
      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        LEAD INTAKE · normalize · dedupe (fuzzy email/domain) · enrich (Clearbit · Crunchbase) · queue
      </text>
      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#sArrG)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#sArrG)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#sArrG)" />

      {/* ICP / Research / Planner */}
      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">ICP SCORER</text>
      <text x={165} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">XGBoost + LLM rationale</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">firmographic + intent</text>

      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(34,211,238,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">RESEARCH AGENT</text>
      <text x={435} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">company news · job posts · funding</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Sonnet 4.6 + browser tool</text>

      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">SEQUENCE PLANNER</text>
      <text x={710} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">7 touches over 21 days</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">channel mix · timing · A/B variant</text>

      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#sArrG)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#sArrG)" />
      <line x1={710} y1={258} x2={710} y2={290} stroke={FG} strokeWidth={1.4} markerEnd="url(#sArrG)" />

      {/* Drafter */}
      <rect x={40} y={290} width={800} height={70} rx={10} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={60} y={312} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">DRAFTER  (per-touch · per-channel)</text>
      <text x={60} y={332} fill={FG} fontSize={10} fontFamily="monospace">Sonnet 4.6 · injects research + persona + offer · self-reviews against playbook · spam-score check</text>
      <text x={60} y={348} fill={GRAY} fontSize={9} fontFamily="monospace">3 variants generated · best by est-reply-prob model · Opus 4.7 fallback for high-ICP accounts</text>

      {/* Channel adapters */}
      <rect x={40} y={376} width={800} height={120} rx={10} fill="rgba(20,184,166,0.05)" stroke={TEAL} strokeWidth={1.1} strokeDasharray="3 3" />
      <text x={60} y={396} fill={TEAL} fontSize={10} fontWeight={700} fontFamily="monospace">CHANNEL ADAPTERS</text>
      {[
        { x: 50,  label: 'EMAIL',     desc: 'SES + warm-up pool',   color: BLUE },
        { x: 220, label: 'LINKEDIN',  desc: 'persona stack · safe', color: PURPLE },
        { x: 390, label: 'PHONE',     desc: 'AI voice agent',       color: ORANGE },
        { x: 560, label: 'SMS',       desc: 'Twilio · TCPA gated',  color: CYAN },
        { x: 730, label: 'AD RETARG', desc: 'LinkedIn / Google',    color: PINK },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={410} width={140} height={70} rx={6} fill={SURFACE} stroke={t.color} strokeWidth={1.1} />
          <text x={t.x + 80} y={432} textAnchor="middle" fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={452} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{t.desc}</text>
          <text x={t.x + 80} y={468} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">throughput cap</text>
        </g>
      ))}

      {/* Deliverability */}
      <rect x={40} y={508} width={400} height={56} rx={9} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={60} y={528} fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">DELIVERABILITY INFRA</text>
      <text x={60} y={546} fill={FG} fontSize={9} fontFamily="monospace">DKIM · SPF · DMARC · BIMI · warm-up · domain rotation</text>
      <text x={60} y={560} fill={GRAY} fontSize={9} fontFamily="monospace">Smartlead / Instantly · per-mailbox throttle · spam test</text>

      {/* Reply handler */}
      <rect x={460} y={508} width={380} height={56} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.3} />
      <text x={480} y={528} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">REPLY HANDLER</text>
      <text x={480} y={546} fill={FG} fontSize={9} fontFamily="monospace">classify (interested · not now · OOO · wrong · unsub)</text>
      <text x={480} y={560} fill={GRAY} fontSize={9} fontFamily="monospace">draft response · route OOO to date-aware bump</text>

      {/* Meeting flow */}
      <rect x={40} y={580} width={800} height={56} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.3} />
      <text x={60} y={600} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">MEETING SCHEDULER</text>
      <text x={60} y={618} fill={FG} fontSize={9} fontFamily="monospace">Calendly · Chili Piper · routing rules (rep ↔ ICP segment) · prep brief auto-generated</text>
      <text x={60} y={632} fill={GRAY} fontSize={9} fontFamily="monospace">post-meeting CRM update · disposition logged</text>

      {/* Compliance + obs */}
      <rect x={40} y={648} width={800} height={42} rx={6} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={668} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">COMPLIANCE</text>
      <text x={60} y={684} fill={FG} fontSize={9} fontFamily="monospace">GDPR · CAN-SPAM · TCPA · DNC list sync · per-region consent rules · unsubscribe in every touch</text>
    </svg>
  );
}

/* ─── ICP scoring ────────────────────────────────────────────────── */
function ICPScoring() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="ICP scoring pipeline">
      <defs>
        <marker id="iArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ICP SCORING — FEATURES → MODEL → CALIBRATED PROBABILITY → RATIONALE
      </text>
      <rect x={40} y={56} width={250} height={310} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={165} y={78} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">FEATURES</text>
      {[
        '• Industry · sub-industry',
        '• Employee count · revenue',
        '• Tech stack signals (BuiltWith)',
        '• Funding stage · last raise',
        '• Hiring (job posts · velocity)',
        '• Intent (G2 / 6sense / Bombora)',
        '• Past engagement · email opens',
        '• Persona role · seniority · dept',
        '• Region · timezone',
        '• Closed-won lookalikes',
      ].map((f, i) => (
        <text key={i} x={56} y={106 + i * 24} fill={FG} fontSize={9} fontFamily="monospace">{f}</text>
      ))}
      <line x1={290} y1={210} x2={310} y2={210} stroke={FG} strokeWidth={1.4} markerEnd="url(#iArr)" />
      <rect x={310} y={56} width={260} height={310} rx={9} fill="rgba(34,211,238,0.07)" stroke={C} strokeWidth={1.4} />
      <text x={440} y={78} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">MODEL</text>
      <text x={326} y={106} fill={FG} fontSize={10} fontWeight={700} fontFamily="monospace">XGBoost (calibrated)</text>
      <text x={326} y={124} fill={GRAY} fontSize={9} fontFamily="monospace">trained on 2 years of CRM</text>
      <text x={326} y={142} fill={GRAY} fontSize={9} fontFamily="monospace">target = closed-won OR meeting</text>
      <text x={326} y={166} fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">Output</text>
      <text x={326} y={186} fill={FG} fontSize={9} fontFamily="monospace">P(meeting) · isotonic-cal</text>
      <text x={326} y={204} fill={FG} fontSize={9} fontFamily="monospace">SHAP top-5 features</text>
      <text x={326} y={222} fill={FG} fontSize={9} fontFamily="monospace">A/B vs control segment</text>
      <text x={326} y={250} fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">Why XGBoost not LLM</text>
      <text x={326} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">10K leads/day = $ blow</text>
      <text x={326} y={286} fill={GRAY} fontSize={9} fontFamily="monospace">XGBoost 100µs vs LLM 800ms</text>
      <text x={326} y={304} fill={GRAY} fontSize={9} fontFamily="monospace">tabular features = sweet spot</text>
      <text x={326} y={332} fill={GRAY} fontSize={9} fontFamily="monospace">re-trained weekly · drift monitor</text>
      <line x1={570} y1={210} x2={590} y2={210} stroke={FG} strokeWidth={1.4} markerEnd="url(#iArr)" />
      <rect x={590} y={56} width={250} height={310} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={715} y={78} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">RATIONALE GEN</text>
      <text x={606} y={106} fill={FG} fontSize={10} fontWeight={700} fontFamily="monospace">LLM (Sonnet)</text>
      <text x={606} y={124} fill={GRAY} fontSize={9} fontFamily="monospace">input: SHAP top-5 + persona</text>
      <text x={606} y={142} fill={GRAY} fontSize={9} fontFamily="monospace">output: 1-line "why this lead"</text>
      <text x={606} y={170} fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">Example</text>
      <text x={606} y={190} fill={FG} fontSize={9} fontFamily="monospace">"Series-B, 50 → 200 ENG hires</text>
      <text x={606} y={206} fill={FG} fontSize={9} fontFamily="monospace">last 90d, no obs vendor in</text>
      <text x={606} y={222} fill={FG} fontSize={9} fontFamily="monospace">stack — fits closed-won pattern."</text>
      <text x={606} y={250} fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">Used in</text>
      <text x={606} y={270} fill={GRAY} fontSize={9} fontFamily="monospace">• rep prep brief</text>
      <text x={606} y={286} fill={GRAY} fontSize={9} fontFamily="monospace">• personalization tokens</text>
      <text x={606} y={302} fill={GRAY} fontSize={9} fontFamily="monospace">• CRM annotation</text>
      <rect x={40} y={380} width={800} height={62} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={402} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">SEGMENTATION</text>
      <text x={60} y={420} fill={FG} fontSize={9} fontFamily="monospace">A (top 10% · enroll in heavy sequence) · B (60% · standard) · C (30% · drip + nurture only · cheaper drafter)</text>
      <text x={60} y={436} fill={GRAY} fontSize={9} fontFamily="monospace">Tier-A also routes to human SDR for hand-off after Touch 3 if reply</text>
    </svg>
  );
}

/* ─── Sequence ───────────────────────────────────────────────────── */
function SalesSequence() {
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sales agent multi-touch sequence">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE — 7 TOUCHES OVER 21 DAYS (Tier-A example)
      </text>

      <line x1={50} y1={120} x2={830} y2={120} stroke={DIM} strokeWidth={1.2} />
      {[
        { day: 0,  ch: 'EMAIL',    color: BLUE,    label: 'T1 · pers + value · 80 words', x: 80 },
        { day: 2,  ch: 'LINKEDIN', color: PURPLE,  label: 'T2 · connect · no pitch',       x: 200 },
        { day: 4,  ch: 'EMAIL',    color: BLUE,    label: 'T3 · case study · 1-pager',     x: 290 },
        { day: 7,  ch: 'PHONE',    color: ORANGE,  label: 'T4 · AI voice cold call',       x: 410 },
        { day: 10, ch: 'EMAIL',    color: BLUE,    label: 'T5 · breakup-style · 30 words', x: 540 },
        { day: 14, ch: 'LINKEDIN', color: PURPLE,  label: 'T6 · DM with link',             x: 650 },
        { day: 21, ch: 'EMAIL',    color: BLUE,    label: 'T7 · closing bump',             x: 780 },
      ].map((s, i) => (
        <g key={i}>
          <line x1={s.x} y1={120} x2={s.x} y2={140} stroke={s.color} strokeWidth={1.6} />
          <circle cx={s.x} cy={120} r={6} fill={s.color} />
          <rect x={s.x - 56} y={150} width={112} height={70} rx={6} fill={SURFACE} stroke={s.color} strokeWidth={1} />
          <text x={s.x} y={170} textAnchor="middle" fill={s.color} fontSize={9} fontWeight={700} fontFamily="monospace">DAY {s.day}</text>
          <text x={s.x} y={188} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s.ch}</text>
          <text x={s.x} y={206} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">{s.label.split(' · ')[0]}</text>
        </g>
      ))}

      <rect x={40} y={250} width={800} height={64} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={272} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">REPLY → BRANCH</text>
      <text x={60} y={290} fill={FG} fontSize={9} fontFamily="monospace">interested → meeting flow · not now → 90-day nurture · OOO → date-aware bump</text>
      <text x={60} y={306} fill={GRAY} fontSize={9} fontFamily="monospace">wrong contact → re-route to right persona at same account · unsub → DNC + log</text>

      <rect x={40} y={328} width={800} height={64} rx={8} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={350} fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">PERSONALIZATION TOKENS</text>
      <text x={60} y={368} fill={FG} fontSize={9} fontFamily="monospace">{`{first_name}, {company_news_recent}, {persona_pain}, {social_proof_in_industry}, {tech_stack_gap}`}</text>
      <text x={60} y={384} fill={GRAY} fontSize={9} fontFamily="monospace">tokens generated by research agent · expanded at draft time · A/B per token</text>

      <rect x={40} y={406} width={800} height={56} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={426} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">A/B INFRA</text>
      <text x={60} y={444} fill={FG} fontSize={9} fontFamily="monospace">3 subject-line variants · 2 body variants · per-touch · MAB allocates traffic by reply-rate</text>
      <text x={60} y={458} fill={GRAY} fontSize={9} fontFamily="monospace">significance gated by sample size; weekly winner promoted to default</text>
    </svg>
  );
}

/* ─── Deliverability ─────────────────────────────────────────────── */
function Deliverability() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Email deliverability infrastructure">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DELIVERABILITY — DOMAINS · MAILBOXES · WARM-UP · SPAM AVOIDANCE
      </text>
      <rect x={40} y={56} width={800} height={84} rx={9} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={60} y={78} fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">DNS &amp; AUTH</text>
      <text x={60} y={98} fill={FG} fontSize={9} fontFamily="monospace">SPF · DKIM · DMARC (p=quarantine then reject) · BIMI · MTA-STS · TLS-RPT</text>
      <text x={60} y={114} fill={FG} fontSize={9} fontFamily="monospace">Per-domain reverse DNS · dedicated IP rotation pool</text>
      <text x={60} y={130} fill={GRAY} fontSize={9} fontFamily="monospace">Skipping any one of these halves your inbox rate.</text>
      <rect x={40} y={156} width={400} height={130} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.3} />
      <text x={60} y={176} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">DOMAIN STRATEGY</text>
      <text x={56} y={198} fill={FG} fontSize={9} fontFamily="monospace">• Primary domain (transactional · never cold)</text>
      <text x={56} y={214} fill={FG} fontSize={9} fontFamily="monospace">• 3-5 cold domains (new TLDs ok)</text>
      <text x={56} y={230} fill={FG} fontSize={9} fontFamily="monospace">• 5-10 mailboxes per domain</text>
      <text x={56} y={246} fill={FG} fontSize={9} fontFamily="monospace">• Rotate when reputation dips</text>
      <text x={56} y={262} fill={GRAY} fontSize={9} fontFamily="monospace">isolation: bad mailbox doesn&apos;t kill primary</text>
      <rect x={460} y={156} width={380} height={130} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.3} />
      <text x={480} y={176} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">WARM-UP</text>
      <text x={476} y={198} fill={FG} fontSize={9} fontFamily="monospace">• Smartlead / Instantly automated peer-to-peer</text>
      <text x={476} y={214} fill={FG} fontSize={9} fontFamily="monospace">• Day 1: 5 sends · Day 14: 30 sends · Day 30: 80</text>
      <text x={476} y={230} fill={FG} fontSize={9} fontFamily="monospace">• Reply-back rate &gt; 30% during warm-up</text>
      <text x={476} y={246} fill={FG} fontSize={9} fontFamily="monospace">• Continuous low-rate during prod (10/day)</text>
      <text x={476} y={262} fill={GRAY} fontSize={9} fontFamily="monospace">cold-domain → ramp 30d before any prod sending</text>
      <rect x={40} y={302} width={800} height={64} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.3} />
      <text x={60} y={322} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">SPAM-AVOIDANCE</text>
      <text x={60} y={342} fill={FG} fontSize={9} fontFamily="monospace">• Spam-trigger lexicon scanner · Mailtester pre-flight · plain-text alt · short sigs · no link-shorteners</text>
      <text x={60} y={358} fill={FG} fontSize={9} fontFamily="monospace">• Drop subject-line spam-words · per-mailbox throttle (40/day cold · 200/day warm)</text>
      <rect x={40} y={382} width={800} height={64} rx={9} fill="rgba(239,68,68,0.06)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={402} fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">KILL SWITCHES</text>
      <text x={60} y={420} fill={FG} fontSize={9} fontFamily="monospace">• Bounce rate &gt; 3% on a domain → pause that domain · auto-route via others</text>
      <text x={60} y={436} fill={FG} fontSize={9} fontFamily="monospace">• Spam complaint &gt; 0.1% → kill mailbox · alert ops · rotate</text>
    </svg>
  );
}

/* ─── Reply handling ─────────────────────────────────────────────── */
function ReplyHandler() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Reply classification and handling">
      <defs>
        <marker id="rArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REPLY HANDLER — CLASSIFY → BRANCH → DRAFT → OBS
      </text>
      <rect x={40} y={60} width={200} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.3} />
      <text x={140} y={82} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">CLASSIFIER</text>
      <text x={140} y={102} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Haiku 4.5 + few-shot</text>
      <text x={140} y={118} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">5 buckets · &lt;100ms</text>
      <line x1={240} y1={95} x2={290} y2={95} stroke={FG} strokeWidth={1.4} markerEnd="url(#rArr)" />
      {[
        { x: 290, y: 60,  color: GREEN,  label: 'INTERESTED', desc: '→ scheduler · loop in rep' },
        { x: 290, y: 130, color: AMBER,  label: 'NOT NOW',     desc: '→ 90-day nurture' },
        { x: 540, y: 60,  color: BLUE,   label: 'OOO',         desc: '→ date-aware bump' },
        { x: 540, y: 130, color: PINK,   label: 'WRONG PERSON',desc: '→ re-route to right persona' },
        { x: 290, y: 200, color: RED,    label: 'UNSUB',       desc: '→ DNC + suppression list' },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={250} height={56} rx={6} fill={SURFACE} stroke={b.color} strokeWidth={1.1} />
          <text x={b.x + 125} y={b.y + 22} textAnchor="middle" fill={b.color} fontSize={11} fontWeight={700} fontFamily="monospace">{b.label}</text>
          <text x={b.x + 125} y={b.y + 42} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{b.desc}</text>
        </g>
      ))}
      <rect x={40} y={290} width={800} height={70} rx={9} fill="rgba(34,211,238,0.07)" stroke={C} strokeWidth={1.3} />
      <text x={60} y={310} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">DRAFT REPLY (interested · not-now · OOO branches)</text>
      <text x={60} y={330} fill={FG} fontSize={9} fontFamily="monospace">Sonnet 4.6 · pulls thread · echoes the user&apos;s actual concern · proposes 2 meeting slots · short</text>
      <text x={60} y={346} fill={GRAY} fontSize={9} fontFamily="monospace">Auto-send in &lt; 5 min (responsiveness drives conversion) · safe-rules check before send</text>
    </svg>
  );
}

/* ─── Cost ───────────────────────────────────────────────────────── */
function SalesCost() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sales agent cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER MEETING BOOKED — $32 BREAKDOWN
      </text>
      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {(() => {
        const items = [
          { name: 'Research',         cents: 800,  color: AMBER },
          { name: 'Drafting (LLM)',    cents: 1400, color: GREEN },
          { name: 'Email infra',       cents: 200,  color: BLUE },
          { name: 'AI voice cold',     cents: 600,  color: ORANGE },
          { name: 'Enrichment',        cents: 200,  color: PURPLE },
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
              <text x={x + w / 2} y={126} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">${(it.cents / 100).toFixed(0)}</text>
            </g>
          );
        });
      })()}
      {[
        { name: 'Research (Sonnet · 200 leads/meeting)', cents: 800,  color: AMBER },
        { name: 'Drafting LLM (7 touches/lead × 200)',    cents: 1400, color: GREEN },
        { name: 'Email infra (SES · domains · warm-up)',  cents: 200,  color: BLUE },
        { name: 'AI voice cold (Tier-A only)',            cents: 600,  color: ORANGE },
        { name: 'Enrichment (Apollo · ZoomInfo)',         cents: 200,  color: PURPLE },
      ].map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 2) * 400} ${190 + Math.floor(i / 2) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={370} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">${(it.cents / 100).toFixed(0)}</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: ~$32 / MEETING BOOKED</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Industry avg: $250-500/meeting via human SDR</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">~10x leverage on routine prospecting · reps focus on closing</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">Meetings/$ is the metric — not raw outbound volume.</text>
    </svg>
  );
}

/* ─── Failures ───────────────────────────────────────────────────── */
function SalesFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sales agent failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES &amp; MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'GENERIC SLOP',     risk: 'emails sound AI-written',         mit: 'research depth · persona · 3-variant select · spam-word scrubber' },
        { x: 240, title: 'DOMAIN BLACKLIST', risk: 'one mailbox kills primary',       mit: 'isolated cold domains · MAB rotates · bounce-rate kill switch' },
        { x: 450, title: 'COMPLIANCE BREACH',risk: 'GDPR / CAN-SPAM / DNC violation', mit: 'consent matrix · DNC sync · per-region rules · unsub in every send' },
        { x: 660, title: 'CRM BACKFLOW',     risk: 'CRM out of sync with reality',    mit: 'idempotent updates · conflict resolution · audit trail' },
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
function SalesTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sales agent design trade-offs">
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
        ['ICP scoring',     'XGBoost + LLM rationale',    'LLM only',                    '100µs vs 800ms / lead'],
        ['Drafter model',   'Sonnet 4.6 default',          'Haiku 4.5',                   'Quality dominates reply rate'],
        ['Personalization', 'Research → tokens',           'Per-touch generate',          'Caches research · saves cost'],
        ['Domain strategy', '3-5 cold + isolated',         'Single primary',              'Reputation isolation'],
        ['Voice channel',   'Tier-A only',                 'All tiers',                   'Cost-per-meeting math'],
        ['CRM integration', 'Bidirectional event-driven',  'Nightly batch',               'Reps see live updates'],
        ['A/B framework',   'MAB allocation',              'Fixed split',                 'Faster winner detection'],
        ['Reply autoreply', 'Auto-send in under 5 min',      'Queue for human',             'Responsiveness drives conv'],
        ['Compliance',      'Per-region consent matrix',   'One-size-fits-all',           'GDPR ≠ CAN-SPAM ≠ TCPA'],
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
function SalesDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Sales agent deployment topology">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT — MULTI-REGION · DOMAIN POOL · CRM EVENT-DRIVEN
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare · WAF · OAuth (CRM) · per-tenant rate limits · webhook verification</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(34,211,238,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">REGION · us-east-1 (multi-AZ · primary)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">STATELESS WORKERS</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">• ingest-api · 6 pods</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">• research-worker · 8 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">• drafter-worker · 12 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">• reply-classifier · 4 pods</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">HPA on queue depth · Karpenter</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">STATEFUL</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Postgres (Aurora · multi-AZ)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">• ClickHouse (event analytics)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">• Redis (rate limits · MAB)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">• S3 (research artefacts)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PITR · 90d backups</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">SEND TIER</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">• mail-sender · 4 pods</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">• linkedin-bot (Browserless)</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">• voice-dialer · Twilio</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">• warm-up service</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">Per-domain throttles enforced</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EXTERNAL (egress)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">• Anthropic / OpenAI · LLM gateway with prompt-cache</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">• Apollo · ZoomInfo · Clearbit · 6sense · BuiltWith</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">• Salesforce · HubSpot (event-driven via Kafka Connect)</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel · LangSmith · ClickHouse for funnel · Datadog · per-domain reputation board</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">us-west-2 warm standby · async replication · RPO 5min · RTO 15min</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">Sequence engine pauses cleanly during cut-over; nothing loss · resumes from checkpoint</text>
    </svg>
  );
}

export default function ProjectSalesAgentPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Outreach AI / 11x / Apollo-class autonomous SDR" color={C} />
          <p>
            Build an <H tip="AI SDR agent = an agent that handles the full outbound prospecting pipeline — from ICP scoring through multi-touch sequence to meeting booked — without a human SDR in the loop. 11x.ai (Alice/Mike), Apollo AI, Outreach AI, Lavender, Smartwriter are the references. This is the largest enterprise-AI category by ARR in 2026." color={C}>autonomous SDR agent</H> for a Series-C SaaS company with a 30-rep AE team and no SDR org. Goal: 200 qualified meetings/month at &lt; $50/meeting all-in. The agent ingests leads from CRM + intent providers, scores ICP fit, researches the persona, runs a 7-touch sequence (email + LinkedIn + AI voice + SMS), classifies replies, and books meetings.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: replace the SDR org. The agent does the boring 80% — research, drafting, follow-ups, scheduling — and only loops a human in when there&apos;s a live opportunity.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: AE work (closing, demos, contract negotiation), brand/marketing content, ABM strategy. The agent runs the prospecting funnel up to first meeting.
          </Callout>
          <StackCard
            accent={C}
            title="AI Sales / SDR Agent · Outreach/11x/Apollo-class"
            subtitle="Lead → ICP → research → 7-touch sequence → reply → meeting. $32/meeting."
            slos={[
              { label: 'DELIVERABILITY', value: '> 95%',   note: 'inbox rate' },
              { label: 'REPLY RATE',     value: '≥ 3%',    note: 'industry +200%' },
              { label: 'BOOKED RATE',    value: '≥ 0.5%',  note: 'meeting / lead' },
              { label: 'SPAM RATE',      value: '< 0.1%',   note: 'kill switch' },
            ]}
            stack={[
              { layer: 'ICP Scoring',     choice: 'XGBoost + LLM rationale',         why: '100µs vs LLM 800ms' },
              { layer: 'Research',        choice: 'Sonnet 4.6 + browser tool',       why: 'Persona + account context' },
              { layer: 'Drafter',         choice: 'Sonnet 4.6 (3 variants)',          why: 'Quality drives reply rate' },
              { layer: 'Email infra',     choice: 'SES + Smartlead warm-up',          why: 'Domain reputation moat' },
              { layer: 'Reply handler',   choice: 'Haiku 4.5 (5-bucket)',             why: '5-min response SLA' },
              { layer: 'Voice cold',      choice: 'AI voice agent (Tier-A only)',     why: 'Cost vs lift trade' },
              { layer: 'CRM sync',        choice: 'Kafka Connect → SF/HubSpot',       why: 'Live updates · idempotent' },
            ]}
            scale={[
              { label: 'Outbound / day',    value: '50 K' },
              { label: 'Replies / day',      value: '~1 500' },
              { label: 'Meetings / day',    value: '~250' },
              { label: 'Domain pool',        value: '3-5 cold' },
            ]}
            cost={{
              perUnit: '$32',
              unitLabel: 'per meeting booked',
              perPeriod: '~$240 K',
              periodLabel: 'per month',
            }}
            moats={[
              'Domain reputation isolation · bad mailbox kills 1, not 1000',
              'MAB across variants · weekly winner promoted · compounds',
              'Held-meeting (not booked) is the metric that pays',
              'vs human SDR ~$250-500/meeting — ~10× leverage',
            ]}
          />
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <SalesReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="Throughput · cost · funnel math" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Outbound /day',    formula: 'O = 50{,}000', explanation: 'Across all channels — email dominates volume, voice dominates cost.' },
              { label: 'Reply rate',       formula: 'r \\approx 3\\%', explanation: 'Tier-A 5% · Tier-B 2.5% · Tier-C 1%.' },
              { label: 'Meeting rate',     formula: 'm \\approx 0.5\\%', explanation: 'Of contacted; ~17% of replies become meetings.' },
              { label: 'Meetings /day',    formula: '50{,}000 \\times 0.005 = 250', explanation: '~5K/month · 60K/year.' },
              { label: 'Cost / meeting',   formula: '\\$32', explanation: 'Research + drafting + voice + infra; vs $250-500 human SDR.' },
              { label: 'Funnel',           formula: '50K \\to 1500\\,\\text{replies} \\to 250\\,\\text{meetings} \\to 15\\,\\text{deals}', explanation: 'Industry avg 6% close on AI-sourced meetings.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Lead → score → research → sequence → reply → meeting" color={C} />
          <SalesArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Lead Intake</strong>: webhook + batch from CRM + intent providers; normalize, dedupe (fuzzy email/domain), enrich.</li>
            <li><strong>ICP Scorer</strong>: XGBoost on enrichment features → P(meeting). LLM generates rationale (top-5 SHAP features).</li>
            <li><strong>Research Agent</strong>: Sonnet 4.6 + browser tool · pulls company news, job posts, funding, tech stack.</li>
            <li><strong>Sequence Planner</strong>: builds 7-touch sequence per tier · channel mix · timing · A/B variants.</li>
            <li><strong>Drafter</strong>: per-touch · per-channel · injects research tokens · self-review against playbook · spam-score check.</li>
            <li><strong>Channel Adapters</strong>: email (SES + warm-up pool), LinkedIn (persona stack), AI voice (cold), SMS (TCPA-gated), retargeting.</li>
            <li><strong>Deliverability Infra</strong>: domain pool, mailbox warm-up, DKIM/SPF/DMARC, throttles, reputation monitor.</li>
            <li><strong>Reply Handler</strong>: classify (5 buckets) · branch · auto-draft response · 5-min responsiveness SLA.</li>
            <li><strong>Meeting Scheduler</strong>: Calendly/Chili Piper · routing rules · prep brief auto-generated.</li>
            <li><strong>CRM Sync</strong>: bidirectional event-driven via Kafka Connect.</li>
          </ul>
        </section>
      )}

      {show('ICP Scoring') && (
        <section>
          <SectionHeader num="05" title="ICP Scoring" subtitle="Why XGBoost beats LLM here" color={C} />
          <ICPScoring />
          <p>
            ICP is a perfect tabular ML problem: 30-50 firmographic + intent features, clear binary target (booked meeting), 2 years of CRM history. <H tip="XGBoost = gradient-boosted decision trees. Industry workhorse for tabular classification. Fast (sub-millisecond), explainable (SHAP), regularized, robust to mixed data types." color={C}>XGBoost</H> at 100µs/lead beats Sonnet at 800ms — and the LLM only adds rationale, not classification. Scoring 10K leads/day with an LLM would cost $400 to score what XGBoost scores for $2.
          </p>
        </section>
      )}

      {show('Multi-touch Sequence') && (
        <section>
          <SectionHeader num="06" title="Multi-touch Sequence" subtitle="7 touches over 21 days · channel mix · A/B" color={C} />
          <SalesSequence />
        </section>
      )}

      {show('Deliverability Infra') && (
        <section>
          <SectionHeader num="07" title="Deliverability Infra" subtitle="The boring part that makes the smart part work" color={C} />
          <Deliverability />
          <Callout type="warning">
            The most common failure mode for AI sales agents in 2026 is shipping a brilliant drafter on a cold domain. A perfectly-written email lands in spam if the domain has no reputation. Domain pool + warm-up + auth records account for ~70% of inbox rate; copy quality is the other 30%.
          </Callout>
        </section>
      )}

      {show('Reply Handler') && (
        <section>
          <SectionHeader num="08" title="Reply Handler" subtitle="Classify → branch → respond in 5 minutes" color={C} />
          <ReplyHandler />
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="09" title="API & Data Model" subtitle="REST + webhook surface · event-driven CRM sync" color={C} />
          <ComparisonTable
            headers={['Method', 'Endpoint', 'Purpose']}
            rows={[
              ['POST', '/v1/leads/batch',           'bulk lead ingest from CRM/intent'],
              ['GET',  '/v1/leads/:id',             'lead detail + score + sequence state'],
              ['POST', '/v1/leads/:id/sequence',    'enroll into a named sequence'],
              ['POST', '/v1/leads/:id/pause',       'pause / DNC / unsubscribe'],
              ['POST', '/v1/replies/inbound',       'inbound email/SMS webhook'],
              ['GET',  '/v1/sequences',             'list sequences + perf metrics'],
              ['POST', '/v1/sequences/:id/clone',   'clone sequence + variant test'],
              ['GET',  '/v1/funnel?cohort=&tier=',  'funnel rollup with filters'],
              ['POST', '/v1/admin/domains',         'register cold domain · start warm-up'],
            ]}
          />
          <h3>Key tables</h3>
          <ul>
            <li><code>leads</code>, <code>accounts</code>, <code>sequences</code>, <code>sequence_steps</code>, <code>touches</code>, <code>replies</code>, <code>meetings</code>, <code>domains</code>, <code>mailboxes</code>, <code>warmup_state</code>, <code>variants</code>, <code>events</code>.</li>
            <li><code>events</code> is the high-volume table — partition by day, TTL 90d hot / 2y archive.</li>
            <li><code>variants</code> + a <code>mab_state</code> sidecar table drive arm allocation in real-time.</li>
          </ul>
        </section>
      )}

      {show('Eval & Funnel Metrics') && (
        <section>
          <SectionHeader num="10" title="Eval & Funnel Metrics" subtitle="Reply rate · meeting rate · cost / meeting" color={C} />
          <h3>Three layers</h3>
          <ul>
            <li><strong>Offline copy eval</strong>: human-graded sample of 200 first-touch emails per week (1-5 scale on personalization, clarity, ask). Target ≥ 4.0.</li>
            <li><strong>A/B in prod</strong>: MAB across 6 active variants per touch. Weekly winner promoted; significance gated by sample size.</li>
            <li><strong>Funnel rollup</strong>: outbound → opens → replies → meetings → meetings-held → opps → closed-won. Daily dashboard, weekly retro.</li>
          </ul>
          <Callout type="key">
            The metric that matters is <strong>cost per meeting held</strong> (not booked). No-shows are real and worsen with cold sequences. A 60% hold rate is realistic; lift it with a confirmation SMS day-of and prep brief sent ahead.
          </Callout>
        </section>
      )}

      {show('Compliance') && (
        <section>
          <SectionHeader num="11" title="Compliance" subtitle="GDPR · CAN-SPAM · TCPA · DNC" color={C} />
          <ul>
            <li><strong>CAN-SPAM</strong>: physical mailing address in every email · functioning unsubscribe · honor within 10 days · honest subject lines.</li>
            <li><strong>GDPR</strong>: lawful basis (legitimate interest for B2B; consent for B2C) · data subject rights · 72h breach notification.</li>
            <li><strong>TCPA</strong>: prior express written consent for any phone/SMS · time-of-day rules · DNC list cross-check.</li>
            <li><strong>State laws</strong>: CCPA/CPRA, Quebec Law 25, Brazil LGPD — auto-route by region · per-region consent matrix.</li>
            <li><strong>DNC sync</strong>: federal DNC list nightly · internal suppression list · honor immediately on receipt.</li>
            <li><strong>Recording disclosure</strong>: AI voice flow plays disclosure on every call (recording + AI nature).</li>
          </ul>
          <Callout type="warning">
            Compliance is not optional and not a feature flag. One CAN-SPAM lawsuit costs more than a quarter of pipeline. Pre-launch: hire a privacy counsel · do a real DPIA · don&apos;t ship until the legal opinion is signed.
          </Callout>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="12" title="Deployment Topology" subtitle="Multi-region · domain pool · CRM event-driven" color={C} />
          <SalesDeployment />
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="13" title="Cost Analysis" subtitle="Per-meeting unit economics" color={C} />
          <SalesCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="14" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <SalesFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="15" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <SalesTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="16" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="Domain reputation is the moat"
            color={C}
            analogy="A clean credit score is worth more than a brilliant pitch."
            technical="Inbox rate &gt; 95% is the lowest layer. Without it, every other component is decorative."
          />
          <MentalModel
            title="Personalization is research, not generation"
            color={GREEN}
            analogy="A handwritten birthday card from someone who knows you beats a typeset one from someone who doesn't — even if the typeset one is prettier."
            technical="The drafter is downstream of the researcher. Spend tokens on research; the draft writes itself when the inputs are good."
          />
          <MentalModel
            title="Cost per meeting held is the only metric"
            color={AMBER}
            analogy="A trail with footprints leading nowhere proves nothing — measure the destination."
            technical="Open rates and reply rates are vanity above a floor. Held meetings → opps → revenue. Optimize the funnel that actually pays."
          />
          <MentalModel
            title="Compliance is the architecture"
            color={RED}
            analogy="Building a bridge that fails inspection wastes the whole bridge."
            technical="Consent matrix, DNC list, region-aware sending — these aren&apos;t add-ons. They&apos;re structural. Bake them in or rebuild."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="17" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>11x.ai engineering blog (Alice / Mike architecture)</li>
            <li>Outreach engineering posts on Kafka + Salesforce sync</li>
            <li>Smartlead / Instantly warm-up infrastructure</li>
            <li>Apollo / ZoomInfo enrichment APIs</li>
            <li>CAN-SPAM Act + GDPR + TCPA quick refs</li>
            <li>This module&apos;s research vault: <code>vault/research/project-sales/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design an Outreach AI / 11x clone on a whiteboard in 45 min, justify domain strategy + ICP model + sequence design, and walk through the funnel math from outbound → revenue.
          </Callout>
        </section>
      )}
    </>
  );
}
