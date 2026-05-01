import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';

const C       = '#84cc16';
const C2      = '#65a30d';
const BG      = '#0e1605';
const SURFACE = '#13200a';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#283d10';
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
const LIME    = '#84cc16';

/* ─── Functional + NFRs ──────────────────────────────────────────── */
function LegalReqs() {
  const must = [
    'Ingest PDF · DOCX · scans (OCR)',
    'Segment into clauses · sections',
    'Extract typed clauses (40+ types)',
    'Match each clause to firm playbook',
    'Risk score · redline suggestion',
    'Draft replacement language (alternatives)',
    'Cite every claim to source page+line',
    'Review UI · annotations · diff export',
  ];
  const nfr = [
    ['Clause F1',          '≥ 0.93',     'P0'],
    ['Risk classification F1', '≥ 0.85', 'P0'],
    ['Time / 50-page contract','< 60 s',  'P0'],
    ['Citation accuracy',  '> 99%',      'P0'],
    ['Cost / contract',    '< $5',       'P1'],
    ['Hallucination rate', '< 0.5%',     'P0'],
    ['Privilege containment', 'no leak', 'P0'],
    ['SOC 2 + ISO 27001',  'compliant',  'P0'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Legal agent functional and NFRs">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS — MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(132,204,22,0.06)" stroke={C} strokeWidth={1.4} />
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
function LegalArch() {
  return (
    <svg viewBox="0 0 880 720" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Legal doc review architecture">
      <defs>
        <marker id="lgArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={FG} />
        </marker>
        <linearGradient id="lgBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#13200a" />
          <stop offset="100%" stopColor="#0a1304" />
        </linearGradient>
      </defs>
      <rect width={880} height={720} rx={12} fill="url(#lgBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — INGEST → OCR → SEGMENT → EXTRACT → MATCH → RISK → DRAFT → REVIEW
      </text>

      {/* Ingest */}
      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">INGEST CHANNELS</text>
      {['Web upload', 'Email', 'iManage', 'NetDocs', 'SharePoint', 'API'].map((s, i) => (
        <g key={i}>
          <rect x={170 + i * 110} y={66} width={100} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={220 + i * 110} y={86} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#lgArr)" />

      {/* Doc processor */}
      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        DOC PROCESSOR · Mistral OCR · layout · table extract · header/footer strip · TOC
      </text>
      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#lgArr)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#lgArr)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#lgArr)" />

      {/* Segment / Extract / Playbook */}
      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(20,184,166,0.07)" stroke={TEAL} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">SEGMENTER</text>
      <text x={165} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">section · clause · footnote</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">heading-aware · numbered detect</text>

      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(132,204,22,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">CLAUSE EXTRACTOR</text>
      <text x={435} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Sonnet 4.6 · structured output</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">40+ typed clauses · with citation</text>

      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">PLAYBOOK MATCHER</text>
      <text x={710} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">firm-specific positions</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">prefer · accept · reject thresholds</text>

      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#lgArr)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#lgArr)" />
      <line x1={710} y1={258} x2={710} y2={290} stroke={FG} strokeWidth={1.4} markerEnd="url(#lgArr)" />

      {/* Risk + Drafter */}
      <rect x={40} y={290} width={400} height={80} rx={10} fill="rgba(239,68,68,0.07)" stroke={RED} strokeWidth={1.5} />
      <text x={60} y={310} fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">RISK FLAGGER</text>
      <text x={60} y={330} fill={FG} fontSize={10} fontFamily="monospace">RED / YELLOW / GREEN per clause</text>
      <text x={60} y={348} fill={FG} fontSize={9} fontFamily="monospace">classifier head + LLM rationale</text>
      <text x={60} y={364} fill={GRAY} fontSize={9} fontFamily="monospace">tuned per practice area (M&amp;A · employment · IP · GC)</text>

      <rect x={460} y={290} width={380} height={80} rx={10} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={480} y={310} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">DRAFTER</text>
      <text x={480} y={330} fill={FG} fontSize={10} fontFamily="monospace">Opus 4.7 · 3 alternatives per RED clause</text>
      <text x={480} y={348} fill={FG} fontSize={9} fontFamily="monospace">grounded in playbook + comparable precedent</text>
      <text x={480} y={364} fill={GRAY} fontSize={9} fontFamily="monospace">always offers a fallback acceptable position</text>

      {/* Citation + Knowledge */}
      <rect x={40} y={388} width={800} height={84} rx={10} fill="rgba(34,211,238,0.05)" stroke={CYAN} strokeWidth={1.1} strokeDasharray="3 3" />
      <text x={60} y={408} fill={CYAN} fontSize={10} fontWeight={700} fontFamily="monospace">CITATION ENGINE  (every claim → source span)</text>
      {[
        { x: 50,  label: 'PAGE+LINE', desc: 'OCR coords' },
        { x: 200, label: 'PRECEDENT', desc: 'firm corpus' },
        { x: 350, label: 'CASE LAW',  desc: 'Casetext / fastcase' },
        { x: 500, label: 'PLAYBOOK',  desc: 'firm positions' },
        { x: 650, label: 'STATUTES',  desc: 'jurisdiction-tagged' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={420} width={140} height={42} rx={5} fill={SURFACE} stroke={CYAN} strokeWidth={0.9} />
          <text x={t.x + 80} y={438} textAnchor="middle" fill={CYAN} fontSize={10} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={454} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      {/* Knowledge bases */}
      <rect x={40} y={488} width={800} height={70} rx={10} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.3} />
      <text x={60} y={508} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">KNOWLEDGE BASES (per-tenant isolated)</text>
      <text x={60} y={528} fill={FG} fontSize={9} fontFamily="monospace">• Firm corpus (past contracts · briefs · memos · model docs)</text>
      <text x={60} y={544} fill={FG} fontSize={9} fontFamily="monospace">• Public corpora (Casetext · LexisNexis · Bloomberg Law) · jurisdiction-tagged · cited by version</text>

      {/* Review UI */}
      <rect x={40} y={576} width={800} height={70} rx={10} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.4} />
      <text x={60} y={596} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">REVIEW UI (Hebbia / Harvey-style)</text>
      <text x={60} y={616} fill={FG} fontSize={10} fontFamily="monospace">side-by-side · inline annotations · accept/reject per redline · diff export to Word + PDF</text>
      <text x={60} y={632} fill={GRAY} fontSize={9} fontFamily="monospace">attorney is always in the loop · &quot;final word&quot; lock prevents auto-finalization</text>

      {/* Compliance band */}
      <rect x={40} y={656} width={800} height={56} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={676} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">COMPLIANCE BOUNDARY</text>
      <text x={60} y={694} fill={FG} fontSize={9} fontFamily="monospace">privilege containment · conflict-check on intake · bar-rule scope (no UPL) · per-tenant isolation · audit trail</text>
      <text x={60} y={708} fill={GRAY} fontSize={9} fontFamily="monospace">SOC 2 Type II + ISO 27001 + (HIPAA where healthcare) + zero training on tenant data (signed)</text>
    </svg>
  );
}

/* ─── Clause taxonomy ────────────────────────────────────────────── */
function ClauseTaxonomy() {
  const taxonomy = [
    { cat: 'COMMERCIAL',   color: GREEN,   list: ['Term', 'Renewal', 'Pricing', 'Payment', 'Discount'] },
    { cat: 'IP',           color: PURPLE,  list: ['IP Ownership', 'License Grant', 'Work-for-Hire', 'IP Indemnity', 'Open Source'] },
    { cat: 'LIABILITY',    color: RED,     list: ['Limit Liab', 'Indemnity', 'Insurance', 'Cap', 'Carve-out'] },
    { cat: 'TERMINATION',  color: AMBER,   list: ['For Cause', 'For Convenience', 'Notice Period', 'Survival', 'Wind-Down'] },
    { cat: 'GOVERN/JURIS', color: BLUE,    list: ['Governing Law', 'Forum', 'Arbitration', 'Class Waiver', 'Service of Process'] },
    { cat: 'DATA/PRIVACY', color: CYAN,    list: ['DPA', 'Sub-processor', 'Breach Notice', 'Data Loc', 'Retention'] },
    { cat: 'COMPLIANCE',   color: PINK,    list: ['Anti-Corruption', 'Sanctions', 'Export Ctrl', 'Modern Slavery', 'Audit Right'] },
    { cat: 'BOILERPLATE',  color: TEAL,    list: ['Notices', 'Assignment', 'Force Maj', 'Severability', 'Entire Agreement'] },
  ];
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Clause type taxonomy">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        CLAUSE TAXONOMY — 40+ TYPES · 8 CATEGORIES · TYPED EXTRACTION
      </text>
      {taxonomy.map((cat, i) => {
        const x = 30 + (i % 4) * 215;
        const y = 60 + Math.floor(i / 4) * 220;
        return (
          <g key={i}>
            <rect x={x} y={y} width={195} height={200} rx={9} fill={SURFACE} stroke={cat.color} strokeWidth={1.4} />
            <rect x={x} y={y} width={195} height={28} rx={9} fill={cat.color} fillOpacity={0.18} />
            <text x={x + 97} y={y + 19} textAnchor="middle" fill={cat.color} fontSize={11} fontWeight={700} fontFamily="monospace">{cat.cat}</text>
            {cat.list.map((c, k) => (
              <text key={k} x={x + 14} y={y + 50 + k * 28} fill={FG} fontSize={10} fontFamily="monospace">• {c}</text>
            ))}
          </g>
        );
      })}
      <rect x={40} y={500} width={800} height={32} rx={6} fill="rgba(132,204,22,0.06)" stroke={C} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={440} y={520} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">
        Each clause is typed-extracted with structured fields · attorney never types a query — they pick a clause and see findings.
      </text>
    </svg>
  );
}

/* ─── Playbook flow ──────────────────────────────────────────────── */
function PlaybookFlow() {
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Playbook matching flow">
      <defs>
        <marker id="pbArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        PLAYBOOK FLOW — EACH CLAUSE THROUGH 4 GATES
      </text>
      <rect x={40} y={56} width={200} height={50} rx={8} fill="rgba(132,204,22,0.07)" stroke={C} strokeWidth={1.3} />
      <text x={140} y={86} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">EXTRACTED CLAUSE</text>
      <line x1={240} y1={81} x2={290} y2={81} stroke={FG} strokeWidth={1.4} markerEnd="url(#pbArr)" />
      {[
        { x: 290, y: 56, color: AMBER, label: 'GATE 1 · TYPE',
          desc: 'is this a known type? · embeddings + classifier' },
        { x: 290, y: 130, color: BLUE, label: 'GATE 2 · POSITION',
          desc: 'compare to playbook ideal · diff in semantics' },
        { x: 290, y: 204, color: PURPLE, label: 'GATE 3 · RISK',
          desc: 'classifier head · jurisdiction-aware' },
        { x: 290, y: 278, color: GREEN, label: 'GATE 4 · DRAFT',
          desc: 'if RED · generate 3 alts · cite playbook' },
      ].map((g, i) => (
        <g key={i}>
          <rect x={g.x} y={g.y} width={550} height={52} rx={8} fill={SURFACE} stroke={g.color} strokeWidth={1.3} />
          <text x={g.x + 14} y={g.y + 22} fill={g.color} fontSize={10} fontWeight={700} fontFamily="monospace">{g.label}</text>
          <text x={g.x + 14} y={g.y + 40} fill={FG} fontSize={9} fontFamily="monospace">{g.desc}</text>
          {i < 3 && <line x1={g.x + 275} y1={g.y + 52} x2={g.x + 275} y2={g.y + 78} stroke={FG} strokeWidth={1.2} markerEnd="url(#pbArr)" />}
        </g>
      ))}
      <rect x={40} y={350} width={800} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.3} />
      <text x={60} y={372} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">PLAYBOOK STORE (per tenant · versioned)</text>
      <text x={60} y={392} fill={FG} fontSize={9} fontFamily="monospace">• ideal language per clause type · acceptable variants · firm red lines</text>
      <text x={60} y={408} fill={GRAY} fontSize={9} fontFamily="monospace">authored by senior attorneys · diff-tracked in git-like store · approved before activation</text>
      <rect x={40} y={430} width={800} height={40} rx={6} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={440} y={454} textAnchor="middle" fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">
        Each gate carries a citation. The attorney sees WHY a clause is RED — &quot;diverges from playbook position X (page 12)&quot;.
      </text>
    </svg>
  );
}

/* ─── Citation engine ────────────────────────────────────────────── */
function CitationEngine() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Citation grounding engine">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        CITATION ENGINE — EVERY CLAIM → SOURCE SPAN
      </text>
      <rect x={40} y={60} width={250} height={130} rx={9} fill="rgba(132,204,22,0.07)" stroke={C} strokeWidth={1.4} />
      <text x={165} y={82} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">CLAIM</text>
      <text x={56} y={106} fill={FG} fontSize={9} fontFamily="monospace">"Liability cap is $500K"</text>
      <text x={56} y={126} fill={FG} fontSize={9} fontFamily="monospace">"Auto-renews for 12 months"</text>
      <text x={56} y={146} fill={FG} fontSize={9} fontFamily="monospace">"Governing law is Delaware"</text>
      <text x={56} y={172} fill={GRAY} fontSize={9} fontFamily="monospace">extracted by Sonnet 4.6</text>

      <rect x={310} y={60} width={260} height={130} rx={9} fill="rgba(34,211,238,0.07)" stroke={CYAN} strokeWidth={1.4} />
      <text x={440} y={82} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">CITATION</text>
      <text x={326} y={106} fill={FG} fontSize={9} fontFamily="monospace">{'page=12 · line=4-7'}</text>
      <text x={326} y={126} fill={FG} fontSize={9} fontFamily="monospace">{'span_hash=a3f9c2'}</text>
      <text x={326} y={146} fill={FG} fontSize={9} fontFamily="monospace">{'tokens=[2104..2128]'}</text>
      <text x={326} y={172} fill={GRAY} fontSize={9} fontFamily="monospace">grounded · traceable</text>

      <rect x={590} y={60} width={250} height={130} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={715} y={82} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">VERIFY</text>
      <text x={606} y={106} fill={FG} fontSize={9} fontFamily="monospace">2nd LLM checks claim ↔ span</text>
      <text x={606} y={126} fill={FG} fontSize={9} fontFamily="monospace">low-confidence → flag</text>
      <text x={606} y={146} fill={FG} fontSize={9} fontFamily="monospace">numeric mismatch → reject</text>
      <text x={606} y={172} fill={GRAY} fontSize={9} fontFamily="monospace">guardrail before UI surface</text>

      <rect x={40} y={210} width={800} height={150} rx={10} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.3} />
      <text x={60} y={232} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">WHY THIS MATTERS — &quot;NO HALLUCINATION&quot; IS A COMPLIANCE REQUIREMENT</text>
      <text x={60} y={258} fill={FG} fontSize={10} fontFamily="monospace">• A bar-rule violation if an attorney files a brief citing a non-existent case (see ChatGPT cases 2023-24).</text>
      <text x={60} y={276} fill={FG} fontSize={10} fontFamily="monospace">• Every claim ships with a clickable span; the attorney verifies in 2 seconds.</text>
      <text x={60} y={294} fill={FG} fontSize={10} fontFamily="monospace">• The classifier rejects un-cited claims at the LLM output gate.</text>
      <text x={60} y={312} fill={FG} fontSize={10} fontFamily="monospace">• Public-corpus citations versioned (case law changes) — diff alert if cited case is overruled.</text>
      <text x={60} y={336} fill={GRAY} fontSize={9} fontFamily="monospace">Hebbia&apos;s &quot;Matrix&quot; pioneered this; Harvey followed; the entire 2026 legal-AI stack normalizes around it.</text>
      <rect x={40} y={376} width={800} height={66} rx={8} fill="rgba(239,68,68,0.06)" stroke={RED} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={60} y={398} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">FAIL-CLOSED RULES</text>
      <text x={60} y={416} fill={FG} fontSize={9} fontFamily="monospace">• Hallucination rate &gt; 0.5% triggers tenant pause + on-call</text>
      <text x={60} y={434} fill={FG} fontSize={9} fontFamily="monospace">• Citation accuracy &lt; 99% on rolling 1K-doc window → block ship</text>
    </svg>
  );
}

/* ─── Cost ───────────────────────────────────────────────────────── */
function LegalCost() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Legal agent cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER CONTRACT — $4.20 BREAKDOWN (50-pg avg)
      </text>
      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {(() => {
        const items = [
          { name: 'OCR + layout',       cents: 50, color: BLUE },
          { name: 'Clause extract',     cents: 120, color: TEAL },
          { name: 'Playbook match',     cents: 60, color: PURPLE },
          { name: 'Risk classify',      cents: 30, color: AMBER },
          { name: 'Drafter (Opus)',     cents: 130, color: GREEN },
          { name: 'Citation verify',    cents: 30, color: CYAN },
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
        { name: 'OCR + layout (Mistral)',        cents: 50, color: BLUE },
        { name: 'Clause extract (Sonnet 4.6)',  cents: 120, color: TEAL },
        { name: 'Playbook match (embed + LLM)', cents: 60, color: PURPLE },
        { name: 'Risk classify',                  cents: 30, color: AMBER },
        { name: 'Drafter (Opus 4.7)',             cents: 130, color: GREEN },
        { name: 'Citation verify (2nd LLM)',     cents: 30, color: CYAN },
      ].map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 2) * 400} ${190 + Math.floor(i / 2) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={370} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">{it.cents}¢</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: $4.20 / CONTRACT</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Junior associate review: $300-600/contract @ $400/hr × 1-2 hr</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Senior partner review (post-AI): 15 min @ $1200/hr = $300/contract</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">~70× direct LLM cost reduction · attorney time → 5× leverage</text>
    </svg>
  );
}

/* ─── Failures ───────────────────────────────────────────────────── */
function LegalFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Legal agent failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES &amp; MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'HALLUCINATED CLAUSE',risk: 'invented liability cap',         mit: 'citation engine · 2nd-LLM verify · regex on numeric · fail-closed' },
        { x: 240, title: 'PRIVILEGE LEAK',     risk: 'tenant data into shared model',  mit: 'per-tenant isolation · zero-training contract · scoped retrieval' },
        { x: 450, title: 'WRONG JURISDICTION', risk: 'cites overruled case',           mit: 'jurisdiction tags · case-law freshness · diff alert on overrule' },
        { x: 660, title: 'OVERCONFIDENT DRAFT',risk: 'AI drafts UPL territory',       mit: 'attorney-in-loop lock · "final word" UI · scope guard prompts' },
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
function LegalTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Legal agent design trade-offs">
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
        ['OCR provider',     'Mistral OCR',                      'Textract',                    'Better layout · privacy'],
        ['Extraction model', 'Sonnet 4.6 + structured out',       'Custom NER',                  'Schema flex · accuracy'],
        ['Drafter model',    'Opus 4.7',                          'Sonnet 4.6',                  'Quality dominates legal'],
        ['Risk classifier',  'Per-practice-area heads',           'One-size-fits-all',           'Domain accuracy'],
        ['Citation',         'Span-level · verified',             'Page-level',                  'Bar-rule grade evidence'],
        ['Per-tenant',       'Hard isolation · own embeddings',   'Shared corpus',               'Privilege containment'],
        ['Training data',    'Zero-train on tenant data',         'Opt-in',                      'Default-safe contract'],
        ['Review UX',        'Side-by-side · accept/reject',      'Auto-finalize',               'Attorney-in-loop'],
        ['Knowledge fresh',  'Daily case-law sync · diff alerts', 'Quarterly batch',             'Overrule risk'],
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
function LegalDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Legal agent deployment topology">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT — TENANT-ISOLATED · PRIVATE-CLOUD-FRIENDLY · BYO-LLM OPTION
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare · WAF · OAuth (SSO via Okta) · per-tenant subdomain · IP allowlist · MFA enforced</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(132,204,22,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">TENANT-ISOLATED REGION  (one VPC per top-tier customer)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">STATELESS WORKERS</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">• ingest-api · 4 pods</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">• processor-worker · 8 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">• extractor-worker · 8 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">• drafter-worker · 4 pods</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">job-queue HPA</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">STATEFUL (per tenant)</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Postgres (single-tenant DB)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">• pgvector (firm corpus)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">• S3 (encrypted · CMK)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">• Redis (job state)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PITR · BYOK · KMS rotation</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">LLM ROUTING</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Anthropic Bedrock (default)</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">• Azure OpenAI (alt)</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">• BYO-LLM (on-prem option)</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">• zero-training contracts</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">prompt-cache per tenant</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EXTERNAL (egress)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">• iManage · NetDocs · SharePoint · Box · Google Drive (DMS adapters)</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">• Casetext · LexisNexis · Bloomberg Law · fastcase (case-law APIs · jurisdiction-tagged)</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">• Mistral OCR · per-region · TLS · no data retained</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY (privilege-aware)</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel · LangSmith · NO PII in logs · privilege-tagged spans · per-tenant audit export</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR + DATA RESIDENCY</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">EU tenants stay in eu-west · UK in eu-west-2 · DR pair within same legal jurisdiction · RPO 5min</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">Some tenants opt for VPC-deployed installation (private cloud) — same code, customer&apos;s AWS</text>
    </svg>
  );
}

export default function ProjectLegalAgentPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Harvey / Hebbia / Casetext-class document review" color={C} />
          <p>
            Build a <H tip="Legal AI doc-review agent = ingests contracts (PDFs, Word, scans), segments them into clauses, extracts typed fields, compares against a firm playbook, flags risks, drafts redline alternatives, and surfaces findings with verifiable citations. Harvey ($5B valuation 2025), Hebbia, EvenUp, Casetext (acquired by Thomson Reuters 2023), Spellbook, Lexion are the references." color={C}>legal AI doc-review agent</H> for a 200-attorney firm doing M&amp;A, employment, and IP work — ~5K contracts/month across 8 practice areas. Hard goals: 60-second turnaround on a 50-page contract, &gt; 0.93 clause F1, &gt; 99% citation accuracy (every claim traceable to source span), zero hallucination tolerance, hard privilege containment, SOC 2 + ISO 27001.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: an associate-grade reviewer that finishes a contract in a minute, marks every risk with a clickable source citation, and proposes redline alternatives that match firm style — so the partner spends 15 minutes editing instead of 2 hours from scratch.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: court filings, legal research from scratch (separate research agent), client communications. The agent is a contract review co-pilot, not a lawyer.
          </Callout>
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <LegalReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="Throughput · cost · SLO targets" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Contracts /day',   formula: 'C = 200', explanation: 'Across firm · varies by practice; M&A is heaviest.' },
              { label: 'Pages /contract',  formula: '\\overline{p} = 50', explanation: 'Avg; M&A 80+ · employment 15.' },
              { label: 'Clauses /contract', formula: '\\overline{q} = 120', explanation: 'After segmentation; some are boilerplate.' },
              { label: 'Concurrency peak', formula: 'C_{peak} = 8', explanation: 'Mornings + late-afternoon spikes.' },
              { label: 'Cost / contract',  formula: '\\$4.20', explanation: 'OCR + extract + match + risk + draft + verify.' },
              { label: 'Time saved',       formula: '\\sim 1.5\\,\\text{hr/contract} \\times 200 = 300\\,\\text{attorney-hr/day}', explanation: 'Routed to higher-leverage work.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Ingest → OCR → segment → extract → match → risk → draft → review" color={C} />
          <LegalArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Ingest</strong>: web upload · email · DMS adapters (iManage, NetDocs, SharePoint, Box).</li>
            <li><strong>Doc processor</strong>: Mistral OCR · layout analysis · table extraction · header/footer strip · TOC reconstruction.</li>
            <li><strong>Segmenter</strong>: section · clause · footnote splitting · heading-aware · numbered-detect.</li>
            <li><strong>Clause extractor</strong>: Sonnet 4.6 · structured output · 40+ typed clauses with citations.</li>
            <li><strong>Playbook matcher</strong>: 4-gate flow · firm positions · diff against ideal language.</li>
            <li><strong>Risk flagger</strong>: per-practice classifier head · jurisdiction-aware · RED/YELLOW/GREEN.</li>
            <li><strong>Drafter</strong>: Opus 4.7 · 3 alternatives per RED clause · grounded in playbook + precedent.</li>
            <li><strong>Citation engine</strong>: every claim → page+line span · verified by 2nd LLM.</li>
            <li><strong>Review UI</strong>: Hebbia/Harvey-style side-by-side · accept/reject per redline · diff export to Word.</li>
          </ul>
        </section>
      )}

      {show('Clause Taxonomy') && (
        <section>
          <SectionHeader num="05" title="Clause Taxonomy" subtitle="40+ types · 8 categories · typed extraction" color={C} />
          <ClauseTaxonomy />
          <p>
            Typed extraction beats free-text Q&amp;A for legal review. The attorney clicks &quot;Limitation of Liability&quot; and sees the cap, carve-outs, and how it differs from playbook — without typing a query. Same UX as Excel pivot tables but for contracts.
          </p>
        </section>
      )}

      {show('Playbook Matching') && (
        <section>
          <SectionHeader num="06" title="Playbook Matching" subtitle="4 gates · firm positions · diff to ideal" color={C} />
          <PlaybookFlow />
          <Callout type="warning">
            The playbook is owned by the firm&apos;s senior attorneys, not the engineering team. Treat it like infrastructure-as-code — versioned, peer-reviewed, deployed via PR. A bad playbook update can flip 1000 contracts to false-RED overnight.
          </Callout>
        </section>
      )}

      {show('Citation Engine') && (
        <section>
          <SectionHeader num="07" title="Citation Engine" subtitle="Every claim → source span · verified" color={C} />
          <CitationEngine />
        </section>
      )}

      {show('Knowledge Bases') && (
        <section>
          <SectionHeader num="08" title="Knowledge Bases" subtitle="Firm corpus + public corpora · jurisdiction-tagged" color={C} />
          <h3>What we index</h3>
          <ul>
            <li><strong>Firm corpus</strong> (per-tenant, isolated): past contracts · briefs · memos · model docs · markup history.</li>
            <li><strong>Public case law</strong>: Casetext / LexisNexis / Bloomberg Law / fastcase via licensed APIs · jurisdiction + date tagged.</li>
            <li><strong>Statutes &amp; regs</strong>: jurisdiction-tagged · cited by version (state, federal, regulatory body).</li>
            <li><strong>Bar-rule corpora</strong>: ABA Model Rules + state-specific (CA, NY, TX, etc.) · scope-of-practice constraints.</li>
            <li><strong>Standards bodies</strong>: NIST, ISO, GDPR for compliance clauses.</li>
          </ul>
          <h3>Retrieval</h3>
          <p>
            Hybrid (BM25 + dense) → cross-encoder reranker. Top-K injected into draft prompts. Crucially, public corpora are versioned — when a case is overruled or a statute amended, every contract that cited it gets a diff alert.
          </p>
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="09" title="API & Data Model" subtitle="REST + webhook · Postgres per-tenant" color={C} />
          <ComparisonTable
            headers={['Method', 'Endpoint', 'Purpose']}
            rows={[
              ['POST', '/v1/contracts/upload',         'multipart upload · signed URL · async job'],
              ['GET',  '/v1/contracts/:id',            'contract metadata + processing state'],
              ['GET',  '/v1/contracts/:id/clauses',    'extracted clauses with citations'],
              ['GET',  '/v1/contracts/:id/risks',      'risk-flagged clauses with rationale'],
              ['GET',  '/v1/contracts/:id/redlines',   'drafter-proposed redlines · 3 alts each'],
              ['POST', '/v1/contracts/:id/accept',     'accept a redline · update doc'],
              ['POST', '/v1/contracts/:id/export',     'export DOCX/PDF with redlines'],
              ['POST', '/v1/playbook/clauses',         'admin: upsert playbook clause (versioned)'],
              ['GET',  '/v1/audit?tenant=&user=',      'privilege-aware audit query'],
            ]}
          />
          <h3>Key tables (per-tenant DB)</h3>
          <ul>
            <li><code>contracts</code>, <code>clauses</code>, <code>citations</code>, <code>risks</code>, <code>redlines</code>, <code>playbook_clauses</code>, <code>review_actions</code>, <code>audit_events</code>, <code>knowledge_versions</code>.</li>
            <li><code>clauses</code> is partitioned by <code>contract_id</code> · OCR coords stored as JSONB for span-citation rendering.</li>
            <li><code>knowledge_versions</code> tracks public-corpus snapshots — each citation pins to a version for reproducibility.</li>
          </ul>
        </section>
      )}

      {show('Compliance & Privilege') && (
        <section>
          <SectionHeader num="10" title="Compliance & Privilege" subtitle="The boundary that decides if you ship" color={C} />
          <ul>
            <li><strong>Per-tenant isolation</strong>: separate VPC, separate Postgres, separate embeddings. No shared corpus.</li>
            <li><strong>Zero-training contract</strong>: tenant data is never used to train any shared model. Signed in MSA. Auditable via LLM provider attestation.</li>
            <li><strong>Privilege containment</strong>: privilege-tagged spans propagate through every system; logs/observability strip privileged content.</li>
            <li><strong>Conflict-check on intake</strong>: cross-reference parties against the firm&apos;s conflicts DB before processing.</li>
            <li><strong>Bar-rule scope</strong>: prompts include explicit &quot;not legal advice&quot; framing · UI includes attorney-in-loop lock that prevents auto-finalization without human sign-off.</li>
            <li><strong>BYOK + BYOL</strong>: customer-managed keys; some tenants run BYO-LLM (on-prem inference) — same codepath, different routing.</li>
            <li><strong>Data residency</strong>: EU tenants stay in eu-west; UK in eu-west-2; DR pair within same jurisdiction.</li>
            <li><strong>SOC 2 Type II + ISO 27001</strong>: standard. HIPAA path for healthcare-vertical tenants.</li>
          </ul>
          <Callout type="warning">
            The single biggest market-acceptance issue in legal AI is privilege. A leak from one tenant&apos;s corpus into another&apos;s output kills the entire commercial relationship — and possibly the firm&apos;s license. Shared-tenancy is technically cheaper and operationally cheaper. Don&apos;t do it.
          </Callout>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="11" title="Deployment Topology" subtitle="Tenant-isolated · BYO-LLM option · jurisdictional DR" color={C} />
          <LegalDeployment />
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="12" title="Cost Analysis" subtitle="Per-contract economics" color={C} />
          <LegalCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="13" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <LegalFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="14" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <LegalTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="15" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="Citations are the trust layer"
            color={C}
            analogy="A medical reference without page numbers is a rumor. Add the page number and it&apos;s a citation."
            technical="Every claim ships with a span. Without it, the system fails the bar-rule grade and no firm will deploy. With it, the lawyer scans answers in seconds."
          />
          <MentalModel
            title="Privilege isolation is structural"
            color={RED}
            analogy="Patient charts can never cross hospital boundaries — even if the same nurse worked at both."
            technical="One tenant&apos;s data must never reach another&apos;s output. Per-tenant VPC, DB, embeddings, LLM key. The cost premium is the entire moat against competitors who chose multi-tenant."
          />
          <MentalModel
            title="The playbook is the product"
            color={PURPLE}
            analogy="A great chef without a tested menu serves chaos."
            technical="The drafter is downstream of the playbook. A firm that invests in playbook quality gets compounding returns from the AI. Generic LLM = generic answers."
          />
          <MentalModel
            title="Attorney-in-loop is the liability wrapper"
            color={GREEN}
            analogy="A pilot who lets autopilot fly still signs the manifest."
            technical="The UI&apos;s &quot;final word&quot; lock isn&apos;t cosmetic — it&apos;s the boundary between &quot;tool used by attorney&quot; (insurable) and &quot;unauthorized practice of law&quot; (not insurable, possibly illegal)."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="16" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>Harvey AI engineering blog (architecture posts 2024-26)</li>
            <li>Hebbia Matrix — paper + product walkthrough</li>
            <li>Mistral OCR + Document AI launch posts</li>
            <li>ABA Model Rules of Professional Conduct (esp. 5.5 — UPL)</li>
            <li>SOC 2 Type II + ISO 27001 readiness checklists</li>
            <li>Casetext / Westlaw / LexisNexis API docs</li>
            <li>This module&apos;s research vault: <code>vault/research/project-legal/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design a Harvey/Hebbia clone on a whiteboard in 45 min, justify the playbook architecture + citation engine + privilege boundary, and explain why per-tenant isolation is non-negotiable for enterprise legal.
          </Callout>
        </section>
      )}
    </>
  );
}
