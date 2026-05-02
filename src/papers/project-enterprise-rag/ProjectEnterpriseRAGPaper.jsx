import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';

const C       = '#6366f1';
const C2      = '#4338ca';
const BG      = '#0a0a1a';
const SURFACE = '#10102a';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#1e1e44';
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

function RAGReqs() {
  const must = [
    'Connect 50+ SaaS sources (OAuth)',
    'Incremental sync · CDC · webhook hybrid',
    'Permission-aware retrieval (mirror source ACLs)',
    'Hybrid search (BM25 + dense + KG)',
    'LLM synthesis with cited spans',
    'Personalization (role · team · recency)',
    'Federation: Web · Slack · Chrome ext · API',
    'eDiscovery + audit + DLP',
  ];
  const nfr = [
    ['p50 query latency',  '< 800 ms',    'P0'],
    ['p99 query latency',  '< 2.5 s',     'P0'],
    ['Retrieval recall@10','>= 0.92',     'P0'],
    ['Answer faithfulness','>= 0.95',     'P0'],
    ['Permission leak',    '0',           'P0'],
    ['Index freshness',    '< 5 min',     'P0'],
    ['QPS peak',           '~100',        'P0'],
    ['Cost / query',       '< $0.04',     'P1'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Enterprise RAG functional and NFRs">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS - MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(99,102,241,0.06)" stroke={C} strokeWidth={1.4} />
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

function RAGArch() {
  return (
    <svg viewBox="0 0 880 720" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Enterprise RAG architecture">
      <defs>
        <marker id="rgArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={FG} />
        </marker>
        <linearGradient id="rgBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10102a" />
          <stop offset="100%" stopColor="#080818" />
        </linearGradient>
      </defs>
      <rect width={880} height={720} rx={12} fill="url(#rgBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE - 50 SOURCES TO INDEX TO PERMISSION-AWARE QUERY TO SYNTHESIZE
      </text>
      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">SOURCES (50+ via OAuth)</text>
      {['Slack', 'GDrive', 'Confluence', 'Notion', 'GitHub', 'Salesforce', 'Zendesk', 'JIRA', 'Workday'].map((s, i) => (
        <g key={i}>
          <rect x={150 + i * 78} y={66} width={70} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={185 + i * 78} y={86} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        CONNECTOR FRAMEWORK - OAuth - webhook + CDC + cursor sync - per-source rate limit
      </text>
      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(20,184,166,0.07)" stroke={TEAL} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">INGESTION PIPELINE</text>
      <text x={165} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">parse - chunk - dedupe - lang</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">async - sharded - idempotent</text>
      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(239,68,68,0.07)" stroke={RED} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">PERMISSION SVC</text>
      <text x={435} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">mirror source ACLs - groups</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">SCIM sync - effective perms</text>
      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">KNOWLEDGE GRAPH</text>
      <text x={710} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">people - teams - projects</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">entity resolution - edges</text>
      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <rect x={40} y={290} width={800} height={84} rx={10} fill="rgba(99,102,241,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={60} y={310} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">UNIFIED INDEX</text>
      {[
        { x: 50,  label: 'INVERTED', desc: 'BM25 - postings' },
        { x: 220, label: 'VECTOR',   desc: 'pgvector - HNSW' },
        { x: 390, label: 'KG',       desc: 'Postgres adjacency' },
        { x: 560, label: 'PERMS',    desc: 'Zanzibar-like ACL' },
        { x: 730, label: 'BLOB',     desc: 'S3 raw + thumbs' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={324} width={140} height={42} rx={5} fill={SURFACE} stroke={C} strokeWidth={0.9} />
          <text x={t.x + 80} y={342} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={358} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}
      <rect x={40} y={390} width={800} height={42} rx={6} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.3} />
      <text x={440} y={416} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">
        QUERY UNDERSTANDING - intent - entities - time scope - authn / SCIM resolve
      </text>
      <line x1={165} y1={432} x2={165} y2={454} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={435} y1={432} x2={435} y2={454} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={710} y1={432} x2={710} y2={454} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <rect x={40} y={456} width={250} height={70} rx={9} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.4} />
      <text x={165} y={478} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">SPARSE</text>
      <text x={165} y={498} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">BM25 - field weighting</text>
      <text x={165} y={514} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">~10ms p50</text>
      <rect x={310} y={456} width={250} height={70} rx={9} fill="rgba(34,211,238,0.07)" stroke={CYAN} strokeWidth={1.4} />
      <text x={435} y={478} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">DENSE</text>
      <text x={435} y={498} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">bge-large - HNSW</text>
      <text x={435} y={514} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">~30ms p50</text>
      <rect x={580} y={456} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={710} y={478} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">KG TRAVERSAL</text>
      <text x={710} y={498} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">entity expand - 1-hop</text>
      <text x={710} y={514} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">~5ms p50</text>
      <line x1={165} y1={526} x2={165} y2={550} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={435} y1={526} x2={435} y2={550} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={710} y1={526} x2={710} y2={550} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <rect x={40} y={552} width={400} height={56} rx={9} fill="rgba(239,68,68,0.07)" stroke={RED} strokeWidth={1.4} />
      <text x={240} y={572} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">PERMISSION FILTER (post-retrieve)</text>
      <text x={240} y={590} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">drop docs user cannot see - audit drops</text>
      <text x={240} y={604} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">re-evaluated every query - no ACL caching</text>
      <rect x={460} y={552} width={380} height={56} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.4} />
      <text x={650} y={572} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">RERANKER (cross-encoder)</text>
      <text x={650} y={590} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">cohere-rerank-3.5 - personalize boost</text>
      <text x={650} y={604} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">~80ms p50 - top-10 to LLM</text>
      <line x1={240} y1={608} x2={240} y2={632} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <line x1={650} y1={608} x2={650} y2={632} stroke={FG} strokeWidth={1.4} markerEnd="url(#rgArr)" />
      <rect x={40} y={632} width={800} height={70} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={60} y={652} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">SYNTHESIS  (cite-or-refuse)</text>
      <text x={60} y={672} fill={FG} fontSize={9} fontFamily="monospace">Sonnet 4.6 - streamed - structured citations - refusal if no high-conf grounding</text>
      <text x={60} y={688} fill={GRAY} fontSize={9} fontFamily="monospace">followup-aware (conversation memory) - feedback signals to reranker</text>
    </svg>
  );
}

function PermissionModel() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Permission model">
      <defs>
        <marker id="pmArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        PERMISSION MODEL - ZANZIBAR-LIKE - ENFORCED AT QUERY TIME
      </text>
      <rect x={40} y={56} width={250} height={130} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={165} y={78} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">SOURCE ACLs</text>
      <text x={56} y={102} fill={FG} fontSize={9} fontFamily="monospace">Drive: file owner + sharing</text>
      <text x={56} y={118} fill={FG} fontSize={9} fontFamily="monospace">Slack: channel members</text>
      <text x={56} y={134} fill={FG} fontSize={9} fontFamily="monospace">Confluence: space perms</text>
      <text x={56} y={150} fill={FG} fontSize={9} fontFamily="monospace">Notion: page-level</text>
      <text x={56} y={166} fill={GRAY} fontSize={9} fontFamily="monospace">incremental sync via webhook</text>
      <line x1={290} y1={120} x2={320} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#pmArr)" />
      <rect x={320} y={56} width={250} height={130} rx={9} fill="rgba(99,102,241,0.07)" stroke={C} strokeWidth={1.4} />
      <text x={445} y={78} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">UNIFIED ACL STORE</text>
      <text x={336} y={102} fill={FG} fontSize={9} fontFamily="monospace">subject:user / group / role</text>
      <text x={336} y={118} fill={FG} fontSize={9} fontFamily="monospace">object:doc / channel / space</text>
      <text x={336} y={134} fill={FG} fontSize={9} fontFamily="monospace">relation:viewer / editor / owner</text>
      <text x={336} y={150} fill={FG} fontSize={9} fontFamily="monospace">tuple-store - hot/cold</text>
      <text x={336} y={166} fill={GRAY} fontSize={9} fontFamily="monospace">SpiceDB or self-built</text>
      <line x1={570} y1={120} x2={600} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#pmArr)" />
      <rect x={600} y={56} width={240} height={130} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={720} y={78} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">CHECK API</text>
      <text x={616} y={102} fill={FG} fontSize={9} fontFamily="monospace">canRead(user, doc) ?</text>
      <text x={616} y={118} fill={FG} fontSize={9} fontFamily="monospace">batch - 1000s/query</text>
      <text x={616} y={134} fill={FG} fontSize={9} fontFamily="monospace">~5ms p50 - cached 60s</text>
      <text x={616} y={150} fill={FG} fontSize={9} fontFamily="monospace">audited every drop</text>
      <text x={616} y={166} fill={GRAY} fontSize={9} fontFamily="monospace">consistent under writes</text>
      <rect x={40} y={210} width={800} height={150} rx={10} fill="rgba(239,68,68,0.06)" stroke={RED} strokeWidth={1.3} />
      <text x={60} y={232} fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">WHY POST-RETRIEVAL FILTER (NOT INDEX-TIME)</text>
      <text x={60} y={258} fill={FG} fontSize={10} fontFamily="monospace">ACLs change constantly (joins/leaves, share toggles, role changes)</text>
      <text x={60} y={278} fill={FG} fontSize={10} fontFamily="monospace">Index-time filtering creates per-user shards (combinatorial explosion)</text>
      <text x={60} y={298} fill={FG} fontSize={10} fontFamily="monospace">Post-filter trades ~5ms latency for correctness - stale ACL = data leak</text>
      <text x={60} y={318} fill={FG} fontSize={10} fontFamily="monospace">Over-fetch (e.g., k=200 candidates, filter to 10 visible, rerank top-10)</text>
      <text x={60} y={342} fill={GRAY} fontSize={9} fontFamily="monospace">Glean publishes 5-10ms p50 ACL-check overhead at this scale; we target the same.</text>
      <rect x={40} y={376} width={800} height={68} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={398} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">SYNTHESIS-TIME FILTER</text>
      <text x={60} y={418} fill={FG} fontSize={9} fontFamily="monospace">LLM gets only the docs the user can see. Prompt explicitly forbids quoting unsourced facts.</text>
      <text x={60} y={434} fill={GRAY} fontSize={9} fontFamily="monospace">Prevents the model from leaking memorized content from training data into a permission-guarded answer.</text>
    </svg>
  );
}

function HybridRetrieval() {
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Hybrid retrieval flow">
      <defs>
        <marker id="hrArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        HYBRID RETRIEVAL - FAN OUT - FUSE - FILTER - RERANK
      </text>
      <rect x={40} y={56} width={800} height={48} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={76} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">QUERY UNDERSTANDING</text>
      <text x={60} y={94} fill={FG} fontSize={10} fontFamily="monospace">"what did sarah ship in Q4 on the billing project?"</text>
      <line x1={170} y1={104} x2={170} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <line x1={440} y1={104} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <line x1={710} y1={104} x2={710} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <rect x={40} y={120} width={250} height={70} rx={9} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={165} y={140} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">SPARSE (BM25)</text>
      <text x={165} y={160} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">"sarah" "billing" "Q4" terms</text>
      <text x={165} y={176} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">k=50 - ~10ms</text>
      <rect x={310} y={120} width={250} height={70} rx={9} fill="rgba(34,211,238,0.07)" stroke={CYAN} strokeWidth={1.3} />
      <text x={435} y={140} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">DENSE (HNSW)</text>
      <text x={435} y={160} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">cosine over chunk embeds</text>
      <text x={435} y={176} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">k=50 - ~30ms</text>
      <rect x={580} y={120} width={260} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.3} />
      <text x={710} y={140} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">KG TRAVERSAL</text>
      <text x={710} y={160} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">resolve "sarah" to user</text>
      <text x={710} y={176} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">1-hop "billing" project</text>
      <line x1={165} y1={190} x2={300} y2={230} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <line x1={435} y1={190} x2={435} y2={230} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <line x1={710} y1={190} x2={580} y2={230} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <rect x={290} y={230} width={300} height={56} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.3} />
      <text x={440} y={252} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">RANK FUSION (RRF)</text>
      <text x={440} y={272} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">reciprocal-rank-fusion - 200 candidates</text>
      <line x1={440} y1={286} x2={440} y2={306} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <rect x={290} y={306} width={300} height={56} rx={9} fill="rgba(239,68,68,0.07)" stroke={RED} strokeWidth={1.3} />
      <text x={440} y={328} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">PERMISSION FILTER</text>
      <text x={440} y={348} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">drop unauthorized - keep ~20-50</text>
      <line x1={440} y1={362} x2={440} y2={382} stroke={FG} strokeWidth={1.4} markerEnd="url(#hrArr)" />
      <rect x={290} y={382} width={300} height={56} rx={9} fill="rgba(99,102,241,0.07)" stroke={C} strokeWidth={1.3} />
      <text x={440} y={404} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">CROSS-ENCODER RERANK</text>
      <text x={440} y={424} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">cohere-rerank-3.5 - top-10 to LLM</text>
      <rect x={40} y={446} width={800} height={26} rx={5} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={440} y={464} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        End-to-end retrieval: ~140ms p50 - contributes to less than 800ms total query budget
      </text>
    </svg>
  );
}

function RAGSequence() {
  const lanes = [
    { x: 70,  label: 'User'      },
    { x: 200, label: 'API'       },
    { x: 330, label: 'Q-Underst' },
    { x: 460, label: 'Retrieve'  },
    { x: 600, label: 'Perms'     },
    { x: 740, label: 'Synth'     },
  ];
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="RAG query sequence">
      <defs>
        <marker id="rgsArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={600} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE - ONE QUERY (cross-source - permission-aware - cited)
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={560} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 70,  to: 200, y: 110, label: '1. POST /v1/ask - Slack ext',  color: PURPLE },
        { from: 200, to: 200, y: 138, label: '2. authn (SSO) - resolve user', color: BLUE, self: true },
        { from: 200, to: 330, y: 168, label: '3. forward query',              color: BLUE },
        { from: 330, to: 330, y: 196, label: '4. parse intent + entities',    color: AMBER, self: true },
        { from: 330, to: 460, y: 226, label: '5. fan out (BM25 + dense + KG)',color: BLUE },
        { from: 460, to: 460, y: 254, label: '6. RRF fusion - 200 cand',      color: BLUE, self: true },
        { from: 460, to: 600, y: 282, label: '7. checkBatch(user, [doc...])', color: RED },
        { from: 600, to: 460, y: 310, label: '8. drop 175 - keep 25',         color: RED, reverse: true },
        { from: 460, to: 460, y: 338, label: '9. rerank cross-encoder',       color: AMBER, self: true },
        { from: 460, to: 740, y: 366, label: '10. top-10 with snippets',       color: GREEN },
        { from: 740, to: 740, y: 394, label: '11. synth (Sonnet) - cite',      color: GREEN, self: true },
        { from: 740, to: 200, y: 422, label: '12. streamed answer + citations',color: GREEN, reverse: true },
        { from: 200, to: 70,  y: 450, label: '13. SSE - Slack render',         color: PURPLE, reverse: true },
        { from: 70,  to: 200, y: 478, label: '14. user clicks citation',       color: CYAN },
        { from: 200, to: 70,  y: 506, label: '15. open source doc (deep link)',color: CYAN, reverse: true },
        { from: 70,  to: 740, y: 534, label: '16. user feedback to reranker',  color: PINK },
      ].map((m, i) => (
        <g key={i}>
          {m.self ? (
            <>
              <path d={`M ${m.from} ${m.y} q 30 -8 0 18`} fill="none" stroke={m.color} strokeWidth={1.4} markerEnd="url(#rgsArr)" />
              <text x={m.from + 38} y={m.y + 6} fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          ) : (
            <>
              <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#rgsArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
              <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          )}
        </g>
      ))}
      <rect x={40} y={566} width={800} height={26} rx={5} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={584} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        E2E p50: ~720ms - first token at ~480ms - cost ~$0.03 (cache hit) / $0.06 (cold)
      </text>
    </svg>
  );
}

function RAGCost() {
  const items = [
    { name: 'Retrieve infra (vec + BM25)', cents: 0.5,  color: BLUE },
    { name: 'Permission check (Zanzibar)', cents: 0.3,  color: RED },
    { name: 'Reranker (cohere-rerank)',     cents: 0.6,  color: AMBER },
    { name: 'Synth LLM (Sonnet 4.6)',       cents: 1.5,  color: GREEN },
    { name: 'Embed (only on cold query)',   cents: 0.1,  color: CYAN },
  ];
  const total = items.reduce((s, x) => s + x.cents, 0);
  let acc = 0;
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Enterprise RAG cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER QUERY - $0.03 BREAKDOWN (cache hit) / $0.06 (cold)
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
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: ~3c / QUERY</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">@ 100 QPS = ~$260K/month at full org adoption</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Indexing: 5K-doc/day churn x $0.001 embed = ~$5/day - negligible at this scale</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">Glean pricing $40-100/seat/yr - 70-90% margin at scale</text>
    </svg>
  );
}

function RAGFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="RAG failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES + MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'PERMISSION LEAK',   risk: 'shows doc user should not see',     mit: 'every-query check / audit drops / stale-ACL alert / fail-closed' },
        { x: 240, title: 'STALE INDEX',       risk: 'returns deleted/edited content',     mit: 'webhook + cursor sync / 5min target / drift dashboards' },
        { x: 450, title: 'CITATION MISMATCH', risk: 'claim does not match citation',     mit: 'span-grounded gen / 2nd-LLM verify / low-conf abstain' },
        { x: 660, title: 'CONNECTOR DRIFT',   risk: 'API breakage on source provider',    mit: 'contract tests per source / canary indexing / grace fallback' },
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

function RAGTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="RAG design trade-offs">
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
        ['Permission model',  'Post-retrieval filter',          'Index-time per-user',          'ACL churn / combinatorics'],
        ['Embedding',         'bge-large-en-v1.5',              'text-embedding-3-large',       'Self-host / cost / privacy'],
        ['Vector store',      'pgvector + Vespa',                'Pinecone',                    'Co-located / multi-tenant'],
        ['Sync model',        'Webhook + cursor + CDC',          'Periodic poll',                'Freshness budget'],
        ['Synth model',       'Sonnet 4.6',                      'Opus 4.7',                    'Cost / latency'],
        ['Reranker',          'cohere-rerank-3.5',               'In-house cross-encoder',       'Quality / vendor speed'],
        ['Knowledge graph',   'Postgres adjacency',              'Neo4j',                       'Op simplicity at our scale'],
        ['Federation',        'Web + Slack + Chrome ext',        'Web only',                    'Meet user where they are'],
        ['Personalization',   'Recency + role + team',           'None',                         'Glean baseline lift ~12%'],
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

function RAGDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="RAG deployment topology">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT - PER-TENANT VPC - BYO-LLM - DATA RESIDENCY
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare - WAF - SSO via Okta - per-tenant subdomain - MFA - IP allowlist</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(99,102,241,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">TENANT REGION (single-tenant for &gt; 5K seat customers)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">QUERY TIER (stateless)</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">- ask-api - 12 pods (HPA)</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">- retriever - 8 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">- reranker-edge - 6 pods</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">- synth-streamer - 8 pods</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">SLO: p95 less than 1.5s</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">INDEX TIER</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">- Vespa cluster (vec + BM25)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">- Postgres (KG + ACL)</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">- SpiceDB (Zanzibar)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">- S3 (raw blobs - CMK)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PITR - daily snapshots</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">SYNC TIER</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">- connector-workers - 30+</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">- webhook-router - 4 pods</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">- embedder-batch - GPU pool</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">- ACL-sync - 2 pods</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">SLO: 5min sync freshness</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">EXTERNAL (egress - per-tenant scoped)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">50+ SaaS source APIs (Slack - Drive - Confluence - Notion - Salesforce - ...)</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">Anthropic / Azure OpenAI - prompt-cache - zero-training contract</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">Cohere rerank - in-region - zero-retention</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel - Datadog - LangSmith - faithfulness check (sample 1%) - perm-leak alarm - staleness board</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR + RESIDENCY</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">EU stays in eu - UK in eu-west-2 - APAC in ap-southeast-2 - RPO 5min - RTO 30min</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">Top customers run BYOC (own AWS) - same code - CMK-encrypted across tenant boundary</text>
    </svg>
  );
}

export default function ProjectEnterpriseRAGPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Glean / Perplexity Enterprise / Microsoft Copilot-class" color={C} />
          <p>
            Build a <H tip="Enterprise RAG / knowledge platform = a system that crawls every internal SaaS source (Slack, GDrive, Confluence, Notion, GitHub, Salesforce, etc.), keeps a permission-aware unified index fresh, and answers any employee question with cited spans across all of it. Glean ($4.6B 2025), Perplexity Enterprise, Microsoft Copilot Enterprise, Atlassian Rovo, Notion Q&A. The single largest enterprise-AI category by 2026 ARR." color={C}>enterprise knowledge platform</H> for a 10K-employee org. Goal: any employee asks any question and gets a permission-correct, cited answer from across 50+ SaaS sources in &lt;800ms. Hard constraints: zero permission leakage, &lt;5min index freshness, &gt;=0.92 retrieval recall@10, &gt;=0.95 answer faithfulness, $&lt;0.04/query.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: it&apos;s Google-for-your-company-but-with-AI-summaries. The hard part isn&apos;t the LLM &mdash; it&apos;s keeping permissions correct as everyone joins, leaves, and re-shares 1000s of docs daily.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: agentic actions (creating tickets, posting to Slack, etc.) &mdash; separate agent layer. The platform retrieves and synthesizes; doesn&apos;t act.
          </Callout>
          <StackCard
            accent={C}
            title="Enterprise RAG / Knowledge · Glean-class"
            subtitle="50 sources → unified index → permission-aware query → cited synth. ~720ms p50."
            slos={[
              { label: 'p50 LATENCY',  value: '< 800 ms', note: '50K daily' },
              { label: 'RECALL@10',    value: '≥ 0.92',   note: 'hybrid + KG' },
              { label: 'FAITHFULNESS', value: '≥ 0.95',   note: 'cite-or-refuse' },
              { label: 'PERM LEAK',    value: '0',         note: 'fail-closed' },
            ]}
            stack={[
              { layer: 'Connectors',     choice: '50+ OAuth (webhook + cursor + CDC)', why: 'Freshness budget' },
              { layer: 'Permission',     choice: 'Zanzibar-like (SpiceDB)',            why: 'Post-retrieval filter' },
              { layer: 'Vector',          choice: 'Vespa / pgvector + HNSW',            why: 'Co-located w BM25' },
              { layer: 'Knowledge graph', choice: 'Postgres adjacency',                  why: 'Entity-centric Qs' },
              { layer: 'Reranker',        choice: 'cohere-rerank-3.5',                   why: 'Top-10 quality' },
              { layer: 'Synth',           choice: 'Sonnet 4.6 (streamed)',                why: 'Cost · latency balance' },
              { layer: 'Federation',      choice: 'Web + Slack + Chrome ext',             why: 'Meet user where they are' },
            ]}
            scale={[
              { label: 'Org size',          value: '10 K employees' },
              { label: 'Total docs',         value: '50 M' },
              { label: 'Daily churn',        value: '~100 K' },
              { label: 'QPS peak',           value: '~100' },
            ]}
            cost={{
              perUnit: '$0.03',
              unitLabel: 'per query',
              perPeriod: '~$260 K',
              periodLabel: 'per month',
            }}
            moats={[
              'Permission-correct search across 50 sources is 40% of eng',
              'Webhook-first sync · 5min freshness across the stack',
              'Hybrid retrieval (BM25 + dense + KG) lifts to 0.92 recall',
              'Glean prices $40-100/seat/yr · 70-90% gross margin at scale',
            ]}
          />
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <RAGReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="Throughput · index size · churn" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Org size',        formula: 'U = 10{,}000\\,\\text{employees}', explanation: 'Mid-size enterprise.' },
              { label: 'Total docs',      formula: 'D = 50\\,M\\,\\text{across 50 sources}', explanation: 'Slack alone is half of this.' },
              { label: 'Daily churn',     formula: '\\Delta D = 100\\,K/\\text{day}\\,(\\sim 0.2\\%)', explanation: 'Edits + adds + deletes.' },
              { label: 'Queries /day',    formula: 'Q = 50{,}000', explanation: '5 queries per active user per day.' },
              { label: 'QPS peak',        formula: 'qps_{peak} \\approx 100', explanation: '4× burst on working-hours peak.' },
              { label: 'Index size',      formula: '\\sim 4\\,TB\\,\\text{vec} + 2\\,TB\\,\\text{BM25} + 0.5\\,TB\\,\\text{KG}', explanation: 'After dedup and compression.' },
              { label: 'Cost / query',    formula: '\\$0.03', explanation: 'Synth dominates - retrieve cheap.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="50 sources to unified index to permission-aware query" color={C} />
          <RAGArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Connector framework</strong>: ~50 source-specific adapters · OAuth + OAuth-DCR · webhook + cursor + CDC hybrid sync.</li>
            <li><strong>Ingestion pipeline</strong>: parse → chunk (tokens or semantic) → dedupe (MinHash) → language detect → tag.</li>
            <li><strong>Permission svc</strong>: mirror source ACLs into a unified store · SCIM-synced groups · effective-perms cache.</li>
            <li><strong>Knowledge graph</strong>: people · teams · projects · accounts · activity edges (authored, edited, viewed).</li>
            <li><strong>Unified index</strong>: BM25 + vector + KG + ACL set · co-located in Vespa or pgvector + Postgres.</li>
            <li><strong>Query understanding</strong>: intent · entities · time scope · auth resolve.</li>
            <li><strong>Hybrid retrieval</strong>: 3-way fan-out → RRF fusion → permission filter → cross-encoder rerank.</li>
            <li><strong>Synthesis</strong>: Sonnet 4.6 · streamed · structured citations · refusal on low-confidence.</li>
            <li><strong>Federation</strong>: Web app · Slack bot · Chrome extension · IDE plugin · API.</li>
          </ul>
        </section>
      )}

      {show('Permission Model') && (
        <section>
          <SectionHeader num="05" title="Permission Model" subtitle="Zanzibar-style · enforced at query time" color={C} />
          <PermissionModel />
          <Callout type="warning">
            Permission leak is the single highest-stakes failure. One leaked answer kills the commercial relationship. ACLs change constantly; the only safe approach is post-retrieval check on every query, with stale-ACL alerting and fail-closed defaults.
          </Callout>
        </section>
      )}

      {show('Hybrid Retrieval') && (
        <section>
          <SectionHeader num="06" title="Hybrid Retrieval" subtitle="Sparse + dense + KG · fuse · filter · rerank" color={C} />
          <HybridRetrieval />
          <p>
            Pure dense misses keyword-rare entities (&quot;OAuth-DCR&quot;, project codenames, acronyms). Pure sparse misses paraphrasing (&quot;monthly recurring revenue&quot; vs &quot;MRR&quot;). KG traversal alone catches relationships dense+sparse miss (&quot;what did sarah work on&quot; → resolve sarah → her docs). All three fused, then permission-filtered, then reranked. Each adds ~5-10% recall lift; together they hit 0.92+ recall@10.
          </p>
        </section>
      )}

      {show('Connector Framework') && (
        <section>
          <SectionHeader num="07" title="Connector Framework" subtitle="50+ sources · OAuth · sync hybrid" color={C} />
          <h3>Sync strategies (per source)</h3>
          <ul>
            <li><strong>Webhook (preferred)</strong>: Slack, Notion, GitHub, Linear push events · &lt;30s latency.</li>
            <li><strong>Cursor (incremental)</strong>: GDrive, Confluence return changed-since-token · ~5min poll.</li>
            <li><strong>CDC (databases)</strong>: Salesforce, Workday via change-data-capture · 5min freshness.</li>
            <li><strong>Periodic poll</strong>: legacy / no-webhook sources · hourly · last-ditch.</li>
          </ul>
          <h3>Per-source contract</h3>
          <p>
            Every connector implements the same contract: <code>list_changes(cursor) → events</code>, <code>fetch(id) → doc</code>, <code>list_acls(doc_id) → perms</code>, <code>resolve_user(external_id) → internal_id</code>. Conformance tested daily against fixtures; canary indexing catches API-drift before prod.
          </p>
        </section>
      )}

      {show('Knowledge Graph') && (
        <section>
          <SectionHeader num="08" title="Knowledge Graph" subtitle="People · projects · accounts as first-class" color={C} />
          <h3>Why a graph and not just docs</h3>
          <p>
            Most enterprise questions are entity-centric: &quot;what did sarah ship?&quot;, &quot;status of project apollo&quot;, &quot;who owns the billing infra?&quot;. Without entity resolution, &quot;sarah&quot; is just a token with low BM25 weight. With a KG, &quot;sarah&quot; resolves to <code>user:sarah-12345</code> and we 1-hop expand to docs she authored, channels she&apos;s in, projects she&apos;s tagged on. Recall lifts ~8-15% on entity-heavy queries.
          </p>
          <ComparisonTable
            headers={['Entity', 'Sources', 'Signals']}
            rows={[
              ['User',     'SCIM · Slack · Email',   'authored · edited · viewed · commented'],
              ['Team',     'SCIM groups · org chart', 'membership · org-chart hierarchy'],
              ['Project',  'JIRA · Linear · Notion', 'tagged · referenced · tickets'],
              ['Account',  'Salesforce · Hubspot',   'opportunity · ticket · email'],
              ['Product',  'Internal catalog',        'docs · tickets · slack channels'],
              ['Document', 'Drive · Confluence',      'permissions · references · backlinks'],
            ]}
          />
        </section>
      )}

      {show('Sequence: One Query') && (
        <section>
          <SectionHeader num="09" title="Sequence: One Query" subtitle="Cross-source · permission-aware · cited" color={C} />
          <RAGSequence />
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="10" title="API & Data Model" subtitle="REST + SSE + webhooks" color={C} />
          <ComparisonTable
            headers={['Method', 'Endpoint', 'Purpose']}
            rows={[
              ['POST', '/v1/ask',                   'submit query · streamed (SSE)'],
              ['GET',  '/v1/ask/:id',               'fetch full result + citations'],
              ['POST', '/v1/ask/:id/feedback',      'thumbs · which citation helped'],
              ['GET',  '/v1/search',                'classic ranked results (no synth)'],
              ['GET',  '/v1/entities/:id',          'KG entity detail + activity'],
              ['POST', '/v1/connectors/:type/install','OAuth flow start for source'],
              ['GET',  '/v1/connectors/:id/health',  'sync state + last cursor'],
              ['GET',  '/v1/audit?user=&time=',     'eDiscovery audit query'],
            ]}
          />
          <h3>Key tables</h3>
          <ul>
            <li><code>documents</code>, <code>chunks</code>, <code>embeddings</code>, <code>acl_tuples</code>, <code>kg_nodes</code>, <code>kg_edges</code>, <code>connectors</code>, <code>sync_state</code>, <code>queries</code>, <code>feedback</code>, <code>audit</code>.</li>
            <li><code>chunks</code> is the high-volume table — partition by source + date · TTL on volatile sources (Slack messages 6 months).</li>
            <li><code>acl_tuples</code> uses Zanzibar-style <code>(subject, relation, object)</code> · backed by SpiceDB or self-built · cached 60s.</li>
          </ul>
        </section>
      )}

      {show('Quality & Faithfulness') && (
        <section>
          <SectionHeader num="11" title="Quality & Faithfulness" subtitle="Recall · faithfulness · perm-leak · refusal" color={C} />
          <h3>4 datasets</h3>
          <ul>
            <li><strong>Internal regression set</strong>: 5K human-graded Q+A pairs from real users. Recall@10 + faithfulness graded.</li>
            <li><strong>Adversarial set</strong>: 500 queries designed to leak (reference docs the asking user can&apos;t see). Must refuse 100%.</li>
            <li><strong>Stale-ACL set</strong>: 200 docs whose ACLs flipped recently. Must update within 5min · alert on drift.</li>
            <li><strong>Public benchmarks</strong>: BEIR · MS MARCO · custom multi-source benchmark for tracking.</li>
          </ul>
          <Callout type="key">
            Faithfulness is measured by an independent LLM-as-judge that sees only the answer + the citations. Score &lt; 0.95 → block ship. We log every low-confidence refusal too — refusing well is part of the product.
          </Callout>
        </section>
      )}

      {show('Compliance') && (
        <section>
          <SectionHeader num="12" title="Compliance" subtitle="eDiscovery · DLP · audit · residency" color={C} />
          <ul>
            <li><strong>eDiscovery</strong>: search across all indexed sources by user · time-bound · legal-hold preserves snapshots.</li>
            <li><strong>DLP</strong>: regex + ML classifier strips PII / financial / health terms from answers (configurable).</li>
            <li><strong>Audit log</strong>: every query + result + citations + dropped-by-perms · 7-year retention · tamper-evident.</li>
            <li><strong>Data residency</strong>: EU stays in EU; UK in UK; APAC in APAC; per-tenant region pinning.</li>
            <li><strong>Zero-training</strong>: tenant data never trains shared models · contractually + technically enforced.</li>
            <li><strong>SOC 2 + ISO 27001 + HIPAA</strong>: standard for enterprise tier.</li>
          </ul>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="13" title="Deployment Topology" subtitle="Per-tenant · BYO-LLM · residency-pinned" color={C} />
          <RAGDeployment />
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="14" title="Cost Analysis" subtitle="Per-query economics" color={C} />
          <RAGCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="15" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <RAGFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="16" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <RAGTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="17" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="Permissions are the moat"
            color={C}
            analogy="A library card determines what books you can read, not which books exist."
            technical="Anyone can build search; few can build permission-correct search across 50 sources. The permission layer accounts for ~40% of engineering effort and 100% of competitive defensibility."
          />
          <MentalModel
            title="Freshness is a UX feature"
            color={GREEN}
            analogy="A weather app showing yesterday's weather is wrong, even if accurate yesterday."
            technical="5-minute freshness across 50 sources isn't easy. Webhook-first per source · cursor fallback · CDC for DBs · canary detects API drift."
          />
          <MentalModel
            title="Hybrid retrieval beats either alone"
            color={AMBER}
            analogy="A doctor doesn't pick between symptoms-or-history-or-tests; they fuse all three."
            technical="BM25 + dense + KG fused via RRF, then reranked, gets 0.92+ recall@10. Any single retriever caps at ~0.78."
          />
          <MentalModel
            title="Citations are the synth contract"
            color={PINK}
            analogy="A scientist who can't show their data isn't a scientist."
            technical="Every claim must trace to a span the user can click. Without that, faithfulness is unmeasurable and the product fails enterprise procurement."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="18" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>Glean engineering blog (2024-26 architecture posts)</li>
            <li>Google Zanzibar paper (consistent global authorization)</li>
            <li>SpiceDB · Authzed · OPA (auth tooling)</li>
            <li>Vespa · Pinecone · pgvector · Weaviate (vector backends)</li>
            <li>Cohere rerank-3.5 · BGE-large · text-embedding-3-large</li>
            <li>This module&apos;s research vault: <code>vault/research/project-rag/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design a Glean-class enterprise knowledge platform on a whiteboard in 45 min, justify the permission model + hybrid retrieval + connector framework, and explain why per-tenant isolation pays for itself in enterprise procurement.
          </Callout>
        </section>
      )}
    </>
  );
}
