import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';

const C       = '#d946ef';
const C2      = '#a21caf';
const BG      = '#160a18';
const SURFACE = '#1e0e22';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#3a1844';
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

function DIReqs() {
  const must = [
    'Ingest PDF / DOCX / image / scan / email',
    'Layout-aware OCR (multi-column, tables)',
    'Table extraction (merged cells, nested)',
    'Chart + figure extraction (data points)',
    'Form field extraction (key/value/sig)',
    'Schema-driven typed extraction (JSON-out)',
    'Quality scoring (low-conf to human review)',
    'Streaming + batch APIs (per-doc + bulk)',
  ];
  const nfr = [
    ['Page accuracy',       '>= 0.97',    'P0'],
    ['Table cell F1',       '>= 0.92',    'P0'],
    ['p50 / 50-page doc',   '< 30 s',     'P0'],
    ['p95 / 50-page doc',   '< 90 s',     'P0'],
    ['Throughput',          '~10K pg/min','P0'],
    ['Cost / page',         '< $0.012',   'P1'],
    ['SOC 2 + HIPAA',       'compliant',  'P0'],
    ['Zero data retention', 'configurable','P0'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Doc intel functional and NFRs">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS - MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(217,70,239,0.06)" stroke={C} strokeWidth={1.4} />
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

function DIArch() {
  return (
    <svg viewBox="0 0 880 700" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Document intelligence architecture">
      <defs>
        <marker id="diArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
        <linearGradient id="diBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1e0e22" />
          <stop offset="100%" stopColor="#120816" />
        </linearGradient>
      </defs>
      <rect width={880} height={700} rx={12} fill="url(#diBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE - INGEST TO LAYOUT TO TYPED EXTRACTION TO QUALITY ROUTE
      </text>

      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">INGEST CHANNELS</text>
      {['REST API', 'Webhook', 'S3 batch', 'Email-in', 'SDK', 'No-code UI'].map((s, i) => (
        <g key={i}>
          <rect x={170 + i * 110} y={66} width={100} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={220 + i * 110} y={86} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />

      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        FORMAT ROUTER - PDF / DOCX / image / scan / spreadsheet / HTML / email
      </text>

      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />

      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(20,184,166,0.07)" stroke={TEAL} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">PDF FAST PATH</text>
      <text x={165} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">embedded text? skip OCR</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">~5x cheaper than OCR</text>

      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(217,70,239,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">OCR ENGINE</text>
      <text x={435} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Mistral OCR / Reducto</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">multilingual - ~150ms/page</text>

      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">LAYOUT ANALYZER</text>
      <text x={710} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">DocLayout-YOLO / LayoutLMv4</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">reading order - regions</text>

      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />

      <rect x={40} y={290} width={800} height={120} rx={10} fill="rgba(34,211,238,0.05)" stroke={CYAN} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={312} fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">SPECIALIZED EXTRACTORS (parallel)</text>
      {[
        { x: 50,  label: 'TABLES',    desc: 'TableMaster / Reducto', icon: 'tbl' },
        { x: 220, label: 'FORMS',     desc: 'k/v/sig/checkbox',      icon: 'frm' },
        { x: 390, label: 'CHARTS',    desc: 'data points + axis',    icon: 'cht' },
        { x: 560, label: 'FIGURES',   desc: 'caption + ref',         icon: 'fig' },
        { x: 730, label: 'HEADERS',   desc: 'TOC + sections',        icon: 'hdr' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={326} width={140} height={70} rx={6} fill={SURFACE} stroke={CYAN} strokeWidth={1} />
          <text x={t.x + 80} y={348} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={368} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{t.desc}</text>
          <text x={t.x + 80} y={386} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">parallel - cached</text>
        </g>
      ))}

      <line x1={440} y1={410} x2={440} y2={428} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />

      <rect x={40} y={428} width={800} height={70} rx={10} fill="rgba(132,204,22,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={60} y={450} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SCHEMA-DRIVEN EXTRACTOR</text>
      <text x={60} y={470} fill={FG} fontSize={10} fontFamily="monospace">Sonnet 4.6 + Pydantic schema - structured-output JSON - field-level confidence</text>
      <text x={60} y={486} fill={GRAY} fontSize={9} fontFamily="monospace">customer brings JSON Schema; we return matching JSON with citations to spans</text>

      <line x1={240} y1={498} x2={240} y2={520} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />
      <line x1={650} y1={498} x2={650} y2={520} stroke={FG} strokeWidth={1.4} markerEnd="url(#diArr)" />

      <rect x={40} y={520} width={400} height={70} rx={10} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={60} y={542} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">CONFIDENCE ROUTING</text>
      <text x={60} y={562} fill={FG} fontSize={10} fontFamily="monospace">HIGH (auto-deliver) - MEDIUM (flag) - LOW (queue for HITL review)</text>
      <text x={60} y={578} fill={GRAY} fontSize={9} fontFamily="monospace">tunable per customer - cost vs accuracy</text>

      <rect x={460} y={520} width={380} height={70} rx={10} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={480} y={542} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">HUMAN-IN-LOOP REVIEW</text>
      <text x={480} y={562} fill={FG} fontSize={10} fontFamily="monospace">side-by-side viewer - low-conf field highlight - 1-click correction</text>
      <text x={480} y={578} fill={GRAY} fontSize={9} fontFamily="monospace">corrections feed back as labeled training data</text>

      <rect x={40} y={606} width={800} height={42} rx={6} fill="rgba(96,165,250,0.06)" stroke={BLUE} strokeWidth={1} />
      <text x={60} y={626} fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">DELIVERY</text>
      <text x={60} y={642} fill={FG} fontSize={9} fontFamily="monospace">JSON / CSV / DOCX / Markdown / webhook callback - raw + structured both retained per ZDR setting</text>

      <rect x={40} y={656} width={800} height={36} rx={6} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={440} y={678} textAnchor="middle" fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">
        OBSERVABILITY - per-doc latency - confidence histograms - drift detection on customer schema
      </text>
    </svg>
  );
}

function ExtractorPipeline() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Specialized extractors">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SPECIALIZED EXTRACTORS - WHY EACH NEEDS ITS OWN MODEL
      </text>
      {[
        { x: 30,  color: TEAL,    label: 'TABLE EXTRACTOR',
          why: 'merged cells - multi-page - rotated text - nested',
          model: 'TableMaster + LayoutLM',
          metric: 'cell-F1 0.92' },
        { x: 240, color: PURPLE,  label: 'FORM EXTRACTOR',
          why: 'k/v pairs - signatures - checkboxes - radios',
          model: 'LayoutLMv4 + Donut',
          metric: 'field-F1 0.94' },
        { x: 450, color: ORANGE,  label: 'CHART EXTRACTOR',
          why: 'bars - lines - pies - axes - data points',
          model: 'ChartGemma + numeric verifier',
          metric: 'value-MAE 2.1%' },
        { x: 660, color: GREEN,   label: 'SCHEMA EXTRACTOR',
          why: 'customer JSON schema - typed output',
          model: 'Sonnet 4.6 + Pydantic',
          metric: 'schema-F1 0.96' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={70} width={200} height={310} rx={11} fill={SURFACE} stroke={t.color} strokeWidth={1.4} />
          <rect x={t.x} y={70} width={200} height={32} rx={11} fill={t.color} fillOpacity={0.18} />
          <text x={t.x + 100} y={92} textAnchor="middle" fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 18} y={130} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">WHY HARD</text>
          {t.why.split(' - ').map((w, k) => (
            <text key={k} x={t.x + 18} y={148 + k * 16} fill={FG} fontSize={9} fontFamily="monospace">- {w}</text>
          ))}
          <line x1={t.x + 30} y1={230} x2={t.x + 170} y2={230} stroke={DIM} strokeWidth={0.6} />
          <text x={t.x + 18} y={252} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">MODEL</text>
          <text x={t.x + 18} y={270} fill={FG} fontSize={9} fontFamily="monospace">{t.model}</text>
          <text x={t.x + 18} y={310} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">METRIC</text>
          <text x={t.x + 18} y={328} fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.metric}</text>
        </g>
      ))}
      <rect x={40} y={400} width={800} height={42} rx={6} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={440} y={420} textAnchor="middle" fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">Generic vision-LLM is &quot;good&quot;; specialized extractors are &quot;production&quot;.</text>
      <text x={440} y={436} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Cell-F1 0.92 vs ~0.78 for general LLMs on tables drives the entire enterprise sale.</text>
    </svg>
  );
}

function DISequence() {
  const lanes = [
    { x: 70,  label: 'Customer' },
    { x: 200, label: 'API'      },
    { x: 330, label: 'Router'   },
    { x: 460, label: 'OCR/Layout'},
    { x: 600, label: 'Extract'  },
    { x: 740, label: 'Quality'  },
  ];
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Doc intel sequence">
      <defs>
        <marker id="diSArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={600} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE - 80-PAGE INVOICE BUNDLE TO STRUCTURED JSON
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={560} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 70,  to: 200, y: 110, label: '1. POST /v1/extract - schema attached', color: PURPLE },
        { from: 200, to: 200, y: 138, label: '2. authn - quota check - presigned URL', color: BLUE, self: true },
        { from: 200, to: 330, y: 168, label: '3. enqueue job - 80 pages',                color: BLUE },
        { from: 330, to: 330, y: 196, label: '4. detect format - PDF embedded text yes', color: AMBER, self: true },
        { from: 330, to: 460, y: 226, label: '5. fast path (no OCR) - extract layout',    color: TEAL },
        { from: 460, to: 460, y: 254, label: '6. layout regions - 80 pages parallel',     color: TEAL, self: true },
        { from: 460, to: 600, y: 282, label: '7. fan-out: tables - forms - schema',       color: CYAN },
        { from: 600, to: 600, y: 310, label: '8. parallel extractors - 6s wall',          color: CYAN, self: true },
        { from: 600, to: 740, y: 338, label: '9. confidence per field',                    color: GREEN },
        { from: 740, to: 740, y: 366, label: '10. route: 76 HIGH - 3 MED - 1 LOW',       color: GREEN, self: true },
        { from: 740, to: 200, y: 394, label: '11. results JSON delivered',                color: GREEN, reverse: true },
        { from: 200, to: 70,  y: 422, label: '12. webhook callback to customer',          color: PURPLE, reverse: true },
        { from: 70,  to: 200, y: 450, label: '13. (optional) review LOW pages in UI',     color: PINK },
        { from: 200, to: 740, y: 478, label: '14. corrections fed to training pipeline',  color: PINK },
        { from: 740, to: 200, y: 506, label: '15. updated model deployed (weekly)',       color: AMBER, reverse: true },
        { from: 200, to: 70,  y: 534, label: '16. metrics: 80pg in 28s - $0.96',          color: GREEN, reverse: true },
      ].map((m, i) => (
        <g key={i}>
          {m.self ? (
            <>
              <path d={`M ${m.from} ${m.y} q 30 -8 0 18`} fill="none" stroke={m.color} strokeWidth={1.4} markerEnd="url(#diSArr)" />
              <text x={m.from + 38} y={m.y + 6} fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          ) : (
            <>
              <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#diSArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
              <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          )}
        </g>
      ))}
      <rect x={40} y={566} width={800} height={26} rx={5} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={584} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        80 pages - 28s wall - $0.96 - 95% auto-delivered - 4% flagged - 1% reviewed
      </text>
    </svg>
  );
}

function DICost() {
  const items = [
    { name: 'OCR (Mistral - 80pg)',         cents: 40,  color: C },
    { name: 'Layout analyzer',                cents: 12,  color: PURPLE },
    { name: 'Table extractor',                 cents: 20,  color: TEAL },
    { name: 'Schema extractor (Sonnet)',      cents: 18,  color: GREEN },
    { name: 'Storage + delivery',              cents: 6,   color: BLUE },
  ];
  const total = items.reduce((s, x) => s + x.cents, 0);
  let acc = 0;
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Doc intel cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER 80-PAGE DOC - $0.96 BREAKDOWN ($0.012/pg)
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
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: $0.96 / 80-pg DOC ($0.012/pg)</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Reducto pricing $0.01-0.02/pg = ~50% gross margin at scale</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Manual data entry vendor (BPO) ~$1.50/page</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">~125x cheaper than human entry - drives the entire BPO replacement TAM</text>
    </svg>
  );
}

function DIFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Doc intel failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES + MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'TABLE MERGED CELLS', risk: 'misaligned columns - wrong totals', mit: 'TableMaster + cell verify / numeric reconcile / HITL on low-conf' },
        { x: 240, title: 'ROTATED PAGE',         risk: 'OCR garbles 90deg pages',         mit: 'auto-rotate detection / re-OCR / fallback to vision-LLM' },
        { x: 450, title: 'SCHEMA DRIFT',         risk: 'customer field rename breaks job',mit: 'schema versioning / canary run on customer / drift dashboard' },
        { x: 660, title: 'PII OVER-EXPOSURE',    risk: 'extracts SSN customer not auth\'d',mit: 'PII classifier / configurable redaction / per-tenant policy' },
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

function DITradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Doc intel trade-offs">
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
        ['OCR engine',         'Mistral OCR + Reducto',           'Textract',                   'Layout + multilingual'],
        ['Table extractor',    'Specialized model',                'Vision-LLM only',           '0.92 vs 0.78 cell F1'],
        ['Schema interface',   'JSON Schema + Pydantic',           'Free-text prompts',         'Type safety / validation'],
        ['Confidence routing', '3 tiers (auto/flag/HITL)',         'Always auto',               'Cost vs accuracy knob'],
        ['Storage',            'Configurable retention',           'Always store',              'ZDR for regulated tenants'],
        ['Format strategy',    'Fast path on text PDFs',           'OCR everything',            '~5x cheaper'],
        ['HITL UI',            'Built-in review interface',        'External tool',             'Closes the loop'],
        ['Training loop',      'Corrections labeled - retrain',    'Manual labeling',            'Compounding moat'],
        ['Compliance',         'SOC 2 + HIPAA + ZDR',              'SOC 2 only',                'Healthcare/finance TAM'],
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

function DIDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Doc intel deployment topology">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT - GPU-FIRST - ZDR-CAPABLE - BATCH + STREAM
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare - WAF - API key auth - per-tenant rate limit - presigned upload URLs</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(217,70,239,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">REGION (multi-region available - data residency option)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">CONTROL PLANE</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">- ingest-api - 8 pods</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">- format-router - 4 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">- job-orchestrator - 4 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">- delivery + webhook</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">stateless - HPA on queue</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">GPU FLEET</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">- OCR (Mistral) - L40S pool</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">- Layout (DocLayout-YOLO)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">- Table (TableMaster)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">- Chart (ChartGemma)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">A100 / L40S spot + on-demand</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">STORAGE / QUEUE</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">- S3 (raw + deriv) - CMK</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">- Postgres (jobs - audit)</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">- Redis (job state)</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">- NATS / SQS (queues)</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">ZDR mode: TTL 1hr</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EXTERNAL (egress)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">- Mistral OCR (regional - in-region peering)</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">- Anthropic (Sonnet 4.6 schema extractor) - prompt-cache - zero retention</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">- Customer webhooks (TLS - mTLS option)</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel - Datadog - per-tenant accuracy board - GPU utilization - cost per page rollup</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">us-east-1 + us-west-2 + eu-west - active-active job queue - RPO 5min - RTO 15min</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">Customers can pin region - HIPAA tenants get single-region with BAA</text>
    </svg>
  );
}

export default function ProjectDocIntelPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Reducto / Unstructured / Hebbia-class doc AI" color={C} />
          <p>
            Build a <H tip="Document intelligence platform = the foundation layer that converts any document (PDF, image, scan, slides, email) into structured, queryable data. References: Reducto.ai, Unstructured.io, Hebbia, Mathpix, Mistral OCR, AWS Textract. Every other doc-AI product (legal review, invoice processing, claims processing, RAG) sits on top of one of these." color={C}>document intelligence platform</H> for an enterprise customer base ranging from insurance (claims, policies), finance (10-Ks, contracts), legal (discovery, briefs), healthcare (charts, lab reports), to procurement (invoices, POs). Goal: any document in → typed, structured JSON out, with cited spans, in &lt;30s for 50 pages, $&lt;0.012/page, &gt;0.97 page accuracy and &gt;0.92 table cell F1.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: it&apos;s a universal &quot;PDF to spreadsheet&quot; service. Customers send any document; we return clean JSON shaped however they ask.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: domain reasoning (legal advice, medical diagnosis), summarization, generation. The platform extracts; it doesn&apos;t opine.
          </Callout>
          <StackCard
            accent={C}
            title="Document Intelligence · Reducto/Unstructured-class"
            subtitle="Any doc → OCR → layout → typed JSON. 30s / 50pg, $0.012/pg."
            slos={[
              { label: 'PAGE ACCURACY', value: '≥ 0.97',  note: 'baseline' },
              { label: 'TABLE F1',       value: '≥ 0.92',  note: 'cell-level' },
              { label: 'p50 / 50pg',     value: '< 30 s',   note: 'wall' },
              { label: 'COST / pg',      value: '< 1.2 ¢',  note: 'baked in' },
            ]}
            stack={[
              { layer: 'Format router',  choice: 'PDF / DOCX / scan / email',          why: 'Fast path · skip OCR' },
              { layer: 'OCR',            choice: 'Mistral OCR',                         why: 'Layout · multilingual' },
              { layer: 'Layout',          choice: 'DocLayout-YOLO + LayoutLMv4',        why: 'Reading order · regions' },
              { layer: 'Tables',          choice: 'TableMaster (specialized)',          why: '0.92 vs 0.78 vision-LLM' },
              { layer: 'Schema',          choice: 'Sonnet 4.6 + Pydantic (typed)',       why: 'Customer pipeline-ready' },
              { layer: 'Confidence',      choice: '3-tier (HIGH/MED/LOW HITL)',         why: 'Cost vs accuracy knob' },
              { layer: 'Compliance',      choice: 'SOC 2 + HIPAA + ZDR',                 why: 'Healthcare/finance TAM' },
            ]}
            scale={[
              { label: 'Pages / day',     value: '5 M' },
              { label: 'Peak pages/sec',  value: '~230' },
              { label: 'GPU need',         value: '~30 A100s' },
              { label: 'Storage',          value: '~6 TB / day' },
            ]}
            cost={{
              perUnit: '$0.012',
              unitLabel: 'per page',
              perPeriod: '~$1.8 M',
              periodLabel: 'per month',
            }}
            moats={[
              'Specialized table extractor beats vision-LLM by 14pts F1',
              'JSON Schema interface = customers drop-in compatible',
              'Corrections feed labels · accuracy compounds quarterly',
              'vs human BPO ~$1.50/page — ~125× cheaper at scale',
            ]}
          />
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <DIReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="Throughput · GPU sizing · cost" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Pages / day',     formula: 'P = 5\\,M', explanation: 'Across all customers · enterprise scale.' },
              { label: 'Peak pages/sec',  formula: 'P_{peak} = 5\\,K \\times 4 \\times \\frac{P}{86400} \\approx 230', explanation: '4× burst on business hours.' },
              { label: 'GPU need',        formula: '\\sim 30 \\text{ A100s OCR + 10 layout + 6 table}', explanation: '~150ms/page on A100.' },
              { label: 'Storage',         formula: 'P \\times 1.2\\,MB \\approx 6\\,TB / day', explanation: 'Raw + derivatives; ZDR tenants get 1hr TTL.' },
              { label: 'Cost / page',     formula: '\\$0.012', explanation: 'OCR + layout + extractors + delivery.' },
              { label: 'Revenue / page',  formula: '\\$0.018', explanation: 'Reducto pricing band; ~33% gross margin at scale.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Ingest → format → OCR → layout → extractors → quality route" color={C} />
          <DIArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Ingest channels</strong>: REST · webhook · S3 batch · email-in · SDK · no-code UI.</li>
            <li><strong>Format router</strong>: PDF (text vs scanned) · DOCX · image · spreadsheet · HTML · email.</li>
            <li><strong>Fast path</strong>: text-PDFs skip OCR (~5× cheaper) · scanned PDFs hit OCR.</li>
            <li><strong>OCR engine</strong>: Mistral OCR or Reducto (multilingual · ~150ms/page on A100).</li>
            <li><strong>Layout analyzer</strong>: DocLayout-YOLO + LayoutLMv4 · regions · reading order.</li>
            <li><strong>Specialized extractors</strong> (parallel): tables · forms · charts · figures · headers.</li>
            <li><strong>Schema extractor</strong>: Sonnet 4.6 + Pydantic · customer JSON schema → typed JSON.</li>
            <li><strong>Confidence routing</strong>: HIGH (auto) · MEDIUM (flag) · LOW (HITL queue).</li>
            <li><strong>HITL review</strong>: built-in side-by-side · 1-click correction · feeds back as labels.</li>
          </ul>
        </section>
      )}

      {show('Specialized Extractors') && (
        <section>
          <SectionHeader num="05" title="Specialized Extractors" subtitle="Why each domain needs its own model" color={C} />
          <ExtractorPipeline />
          <p>
            A single vision-LLM does everything &quot;okay&quot;. Specialized extractors do their domain &quot;production-grade&quot;. The cell-F1 gap (0.92 specialized vs 0.78 vision-LLM) is what drives enterprise procurement — at scale, even 5pt of accuracy is millions of dollars in error remediation. The platform routes pages to the right extractor based on layout-analyzer hints.
          </p>
        </section>
      )}

      {show('Schema-Driven Extraction') && (
        <section>
          <SectionHeader num="06" title="Schema-Driven Extraction" subtitle="JSON Schema in · typed JSON out" color={C} />
          <h3>The customer interface</h3>
          <p>
            Customers don&apos;t want free-text answers. They want JSON that fits their pipeline. The schema is uploaded once per pipeline (e.g. &quot;invoice&quot; with fields: vendor, total, line_items[], tax, etc.), versioned, and applied per-doc. Output is validated against the schema before delivery — invalid extractions hit HITL.
          </p>
          <ComparisonTable
            headers={['Schema feature', 'Behavior']}
            rows={[
              ['Required fields',     'Missing → routed to HITL'],
              ['Type constraints',    'String coerced to number? Validation fails'],
              ['Enum values',          'Out-of-enum → flagged'],
              ['Field-level conf',     'Per-field score in output (0-1)'],
              ['Source citation',      'Page+bbox per field for verification'],
              ['Multi-document',       'Schema applies across pages of same logical doc'],
              ['Versioned',            "Schema_v2 doesn't break v1 jobs in flight"],
            ]}
          />
        </section>
      )}

      {show('Sequence: One Doc') && (
        <section>
          <SectionHeader num="07" title="Sequence: One Doc" subtitle="80-page invoice bundle to JSON" color={C} />
          <DISequence />
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="08" title="API & Data Model" subtitle="REST + webhook + batch" color={C} />
          <ComparisonTable
            headers={['Method', 'Endpoint', 'Purpose']}
            rows={[
              ['POST', '/v1/extract',                'sync extract for under 5 pages'],
              ['POST', '/v1/extract/async',          'async job for any size · webhook callback'],
              ['POST', '/v1/extract/batch',          'bulk · S3 manifest · webhook on done'],
              ['GET',  '/v1/jobs/:id',               'job status + progress'],
              ['GET',  '/v1/jobs/:id/result',        'fetch JSON + citations'],
              ['POST', '/v1/jobs/:id/review',        'mark fields corrected (HITL)'],
              ['POST', '/v1/schemas',                'register schema (versioned)'],
              ['GET',  '/v1/schemas/:id/runs',       'rolling accuracy by schema'],
              ['POST', '/v1/admin/zdr',              'enable zero-data-retention mode'],
            ]}
          />
          <h3>Key tables</h3>
          <ul>
            <li><code>jobs</code>, <code>pages</code>, <code>regions</code>, <code>extractions</code>, <code>citations</code>, <code>schemas</code>, <code>schema_versions</code>, <code>review_queue</code>, <code>corrections</code>, <code>customer_models</code>.</li>
            <li><code>pages</code> partitioned by month · <code>extractions</code> partitioned by schema_id.</li>
            <li><code>corrections</code> is the high-leverage feedback loop — labels become training data for next quarter&apos;s model.</li>
          </ul>
        </section>
      )}

      {show('Quality & HITL') && (
        <section>
          <SectionHeader num="09" title="Quality & HITL" subtitle="Confidence routing + human-in-loop review" color={C} />
          <h3>Three tiers</h3>
          <ul>
            <li><strong>HIGH (auto-deliver)</strong>: field confidence &gt; 0.92 · ~85-90% of fields.</li>
            <li><strong>MEDIUM (flag, deliver)</strong>: 0.75 &lt; conf ≤ 0.92 · sent with warning · customer chooses to use or review.</li>
            <li><strong>LOW (HITL queue)</strong>: conf ≤ 0.75 · queued for human review (built-in or customer-side).</li>
          </ul>
          <Callout type="key">
            The corrections loop is the moat. Each correction becomes a labeled training example. Within 90 days of onboarding a customer, accuracy on their schema typically lifts 3-5 pts vs cold start.
          </Callout>
        </section>
      )}

      {show('Compliance') && (
        <section>
          <SectionHeader num="10" title="Compliance" subtitle="SOC 2 + HIPAA + ZDR + residency" color={C} />
          <ul>
            <li><strong>SOC 2 Type II</strong>: standard for enterprise tier.</li>
            <li><strong>HIPAA</strong>: with BAA · ePHI segregated · audit log · single-region option.</li>
            <li><strong>Zero data retention</strong>: per-tenant flag · raw and derived purged after 1hr · only metrics retained.</li>
            <li><strong>Data residency</strong>: customer pins us-east, eu-west, or ap-southeast · contractually enforced.</li>
            <li><strong>Customer-side encryption</strong>: BYOK · KMS-encrypted in S3 · keys never leave customer AWS for top tier.</li>
            <li><strong>Audit log</strong>: every job · every field correction · every API call · 7y retention default.</li>
          </ul>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="11" title="Deployment Topology" subtitle="GPU-first · ZDR-capable · multi-region" color={C} />
          <DIDeployment />
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="12" title="Cost Analysis" subtitle="Per-page economics" color={C} />
          <DICost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="13" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <DIFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="14" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <DITradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="15" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="Specialized beats generalist on production"
            color={C}
            analogy="A factory line with specialized stations beats a single all-purpose worker."
            technical="Tables, forms, charts — each gets its own model. Vision-LLM is the fallback, not the default. The 14pt accuracy gap is the whole sale."
          />
          <MentalModel
            title="The schema is the contract"
            color={GREEN}
            analogy="A pre-printed form is faster to fill than a blank page."
            technical="JSON Schema in → typed JSON out. Validated. Versioned. Customers don&apos;t want creativity; they want determinism."
          />
          <MentalModel
            title="Confidence routing is the cost knob"
            color={AMBER}
            analogy="A bank with mixed-tier service: routine checks instant, big checks need verification."
            technical="Auto-deliver high-conf, queue low-conf. Customer dials the threshold based on their cost-vs-accuracy preference."
          />
          <MentalModel
            title="Corrections compound"
            color={PURPLE}
            analogy="A doctor who reviews every X-ray and notes errors trains the next radiologist."
            technical="Every HITL correction becomes a labeled example. After 90 days on a schema, accuracy lifts 3-5pts. The moat compounds."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="16" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>Reducto.ai engineering blog (table extraction)</li>
            <li>Mistral OCR launch posts (May 2025+)</li>
            <li>Unstructured.io open-source partition library</li>
            <li>Hebbia &quot;Matrix&quot; product walkthrough</li>
            <li>LayoutLMv4 / DocLayout-YOLO papers</li>
            <li>This module&apos;s research vault: <code>vault/research/project-doc-intel/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design a Reducto-class doc-AI platform on a whiteboard in 45 min, justify specialized vs generalist extractors + JSON-schema interface + HITL feedback loop.
          </Callout>
        </section>
      )}
    </>
  );
}
