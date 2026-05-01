import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ConceptCard from '../../components/ConceptCard';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';

/* ─── colour tokens ─── */
const C       = '#a855f7'; // primary purple (agentic)
const C2      = '#c084fc';
const C3      = '#7e22ce';
const BG      = '#0f0a18';
const SURFACE = '#171123';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#3a334a';
const GREEN   = '#22c55e';
const AMBER   = '#f59e0b';
const RED     = '#ef4444';
const CYAN    = '#06b6d4';
const BLUE    = '#3b82f6';
const PINK    = '#ec4899';
const EMERALD = '#10b981';

/* ─── SVG: Agentic era timeline ─────────────────────────────────────────── */
function EraTimeline() {
  const events = [
    { year: '2022', label: 'ReAct paper', desc: 'reason+act loop',     color: GRAY,    era: 'research' },
    { year: '2023', label: 'AutoGPT / BabyAGI', desc: 'first autonomy hype', color: GRAY, era: 'research' },
    { year: 'Late 2023', label: 'Tool use APIs', desc: 'OpenAI function calling', color: BLUE, era: 'tools' },
    { year: 'Q1 2024', label: 'LangGraph 1.0', desc: 'state-machine agents', color: BLUE, era: 'tools' },
    { year: 'Nov 2024', label: 'MCP launches', desc: 'open tool spec',     color: PINK, era: 'protocol' },
    { year: 'Q2 2025', label: 'Computer Use', desc: 'Claude takes screenshots', color: C, era: 'autonomy' },
    { year: 'Q3 2025', label: 'OpenAI Agents SDK', desc: 'handoffs, sessions', color: GREEN, era: 'autonomy' },
    { year: 'Q4 2025', label: 'Devin GA', desc: 'autonomous SWE',         color: EMERALD, era: 'autonomy' },
    { year: 'May 2026', label: 'production scale', desc: 'enterprise default', color: AMBER, era: 'production' },
  ];

  return (
    <svg viewBox="0 0 880 320" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Agentic AI timeline">
      <defs>
        <linearGradient id="eraGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%"  stopColor="#94a3b8" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#ec4899" stopOpacity="0.6" />
          <stop offset="80%" stopColor="#a855f7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="eraBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#150d22" />
          <stop offset="100%" stopColor="#0c0716" />
        </linearGradient>
      </defs>
      <rect width={880} height={320} rx={12} fill="url(#eraBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        AGENTIC AI — FOUR-YEAR TIMELINE TO PRODUCTION  ·  YOU ARE HERE → MAY 2026
      </text>

      {/* Era band */}
      <rect x={50} y={140} width={780} height={20} rx={4} fill="url(#eraGrad)" />
      {[
        { x: 65,  label: 'RESEARCH',   color: GRAY },
        { x: 240, label: 'TOOLS',      color: BLUE },
        { x: 410, label: 'PROTOCOL',   color: PINK },
        { x: 565, label: 'AUTONOMY',   color: C },
        { x: 760, label: 'PRODUCTION', color: AMBER },
      ].map((e, i) => (
        <text key={i} x={e.x} y={154} fill={e.color} fontSize={9} fontWeight={700} fontFamily="monospace" textAnchor="middle">{e.label}</text>
      ))}

      <line x1={50} y1={170} x2={830} y2={170} stroke={DIM} strokeWidth={2} />
      {events.map((e, i) => {
        const x = 50 + i * (780 / (events.length - 1));
        const flipped = i % 2 === 0;
        const labelY = flipped ? 100 : 240;
        const tickY1 = flipped ? 130 : 170;
        const tickY2 = flipped ? 170 : 210;
        const isCurrent = i === events.length - 1;
        return (
          <g key={i}>
            <line x1={x} y1={tickY1} x2={x} y2={tickY2} stroke={e.color} strokeWidth={1.4} />
            {isCurrent && <circle cx={x} cy={170} r={11} fill="none" stroke={e.color} strokeWidth={1.4} strokeDasharray="3 2" opacity={0.6} />}
            <circle cx={x} cy={170} r={isCurrent ? 8 : 6} fill={e.color} />
            <text x={x} y={flipped ? 84 : 260} textAnchor="middle" fill={e.color} fontSize={10} fontWeight={700} fontFamily="monospace">{e.year}</text>
            <text x={x} y={labelY} textAnchor="middle" fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">{e.label}</text>
            <text x={x} y={labelY + 14} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">{e.desc}</text>
          </g>
        );
      })}

      {/* Footer note */}
      <rect x={50} y={282} width={780} height={26} rx={4} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={300} textAnchor="middle" fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">
        2022 paper → 2026 default — agentic AI is now what &quot;web app&quot; was in 2010: the medium, not the novelty.
      </text>
    </svg>
  );
}

/* ─── SVG: Agent loop ────────────────────────────────────────────────── */
function AgentLoop() {
  const stages = [
    { cx: 200, cy: 180, label: 'PERCEIVE', desc: 'observation', color: CYAN },
    { cx: 440, cy: 80,  label: 'PLAN',     desc: 'reason / decide', color: AMBER },
    { cx: 680, cy: 180, label: 'ACT',      desc: 'tool call',  color: GREEN },
    { cx: 440, cy: 280, label: 'OBSERVE',  desc: 'tool result', color: PINK },
  ];
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Agent perception action loop">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        THE AGENT LOOP — PERCEIVE → PLAN → ACT → OBSERVE
      </text>
      {stages.map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={70} fill={SURFACE} stroke={s.color} strokeWidth={2} />
          <text x={s.cx} y={s.cy - 4} textAnchor="middle" fill={s.color} fontSize={12} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.cx} y={s.cy + 14} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{s.desc}</text>
        </g>
      ))}
      <path d="M 270 160 Q 340 110 380 90" stroke={CYAN} strokeWidth={1.6} fill="none" markerEnd="url(#alC)" />
      <path d="M 500 90 Q 580 110 620 160" stroke={AMBER} strokeWidth={1.6} fill="none" markerEnd="url(#alA)" />
      <path d="M 620 220 Q 580 270 500 280" stroke={GREEN} strokeWidth={1.6} fill="none" markerEnd="url(#alG)" />
      <path d="M 380 280 Q 300 270 270 220" stroke={PINK} strokeWidth={1.6} fill="none" markerEnd="url(#alP)" />

      <text x={440} y={184} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">CONTEXT</text>
      <text x={440} y={202} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">system prompt + history + memory</text>

      <rect x={60} y={332} width={760} height={32} rx={6} fill="rgba(168,85,247,0.06)" stroke={C} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={353} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">
        Loop runs until the agent emits a final answer, hits a budget cap, or a guard intervenes.
      </text>

      <defs>
        <marker id="alC" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={CYAN} /></marker>
        <marker id="alA" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={AMBER} /></marker>
        <marker id="alG" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={GREEN} /></marker>
        <marker id="alP" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={PINK} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: MCP architecture ─────────────────────────────────────────── */
function MCPArchitecture() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Model Context Protocol architecture">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        MCP — JSON-RPC 2.0 BETWEEN AGENTS AND TOOLS
      </text>

      {/* Client side */}
      <rect x={50} y={80} width={260} height={160} rx={10} fill="rgba(168,85,247,0.08)" stroke={C} strokeWidth={1.5} />
      <text x={180} y={104} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">MCP CLIENT</text>
      <text x={180} y={124} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">agent runtime</text>
      <rect x={70} y={144} width={220} height={30} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.6} />
      <text x={180} y={163} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Claude Desktop / Cursor / Cline</text>
      <rect x={70} y={184} width={220} height={30} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.6} />
      <text x={180} y={203} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">LangGraph / Agents SDK</text>
      <text x={180} y={228} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">discovers servers · binds tools</text>

      {/* Wire */}
      <rect x={340} y={155} width={200} height={30} rx={6} fill="rgba(245,158,11,0.1)" stroke={AMBER} strokeWidth={1.4} />
      <text x={440} y={175} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">JSON-RPC 2.0 / stdio · HTTP</text>
      <line x1={310} y1={170} x2={340} y2={170} stroke={AMBER} strokeWidth={1.4} markerEnd="url(#mcpA)" />
      <line x1={540} y1={170} x2={570} y2={170} stroke={AMBER} strokeWidth={1.4} markerEnd="url(#mcpA2)" />

      {/* Servers */}
      <rect x={570} y={80} width={260} height={160} rx={10} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.5} />
      <text x={700} y={104} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">MCP SERVERS</text>
      <text x={700} y={124} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">tool / resource providers</text>
      {[
        { y: 142, name: 'GitHub', desc: 'PRs, issues' },
        { y: 168, name: 'Stripe', desc: 'payments, customers' },
        { y: 194, name: 'Cloudflare', desc: 'edge KV, R2' },
        { y: 220, name: 'Slack', desc: 'channels, msgs' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={590} y={s.y} width={220} height={20} rx={3} fill={SURFACE} stroke={GREEN} strokeWidth={0.5} />
          <text x={602} y={s.y + 14} fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace">{s.name}</text>
          <text x={680} y={s.y + 14} fill={FG} fontSize={9} fontFamily="monospace">{s.desc}</text>
        </g>
      ))}

      {/* Three concepts */}
      {[
        { x: 110, label: 'TOOLS',     desc: 'callable functions',  color: PINK },
        { x: 380, label: 'RESOURCES', desc: 'data sources',        color: BLUE },
        { x: 650, label: 'PROMPTS',   desc: 'templates',           color: EMERALD },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x - 50} y={280} width={180} height={70} rx={8} fill={SURFACE} stroke={c.color} strokeWidth={1.4} />
          <text x={c.x + 40} y={302} textAnchor="middle" fill={c.color} fontSize={11} fontWeight={700} fontFamily="monospace">{c.label}</text>
          <text x={c.x + 40} y={322} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{c.desc}</text>
          <text x={c.x + 40} y={338} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
            {i === 0 ? 'tools/list, tools/call' : i === 1 ? 'resources/read' : 'prompts/get'}
          </text>
        </g>
      ))}

      <text x={440} y={388} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        Anthropic · open spec · Nov 2024 · adopted by GitHub, Cloudflare, Stripe, Microsoft, OpenAI (Apr 2026), Google
      </text>

      <defs>
        <marker id="mcpA" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={AMBER} /></marker>
        <marker id="mcpA2" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={AMBER} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: Memory architecture ──────────────────────────────────────── */
function MemoryArchitecture() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Agent memory hierarchy">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        AGENT MEMORY — FOUR LAYERS, FOUR PURPOSES
      </text>

      {[
        { y: 60,  name: 'WORKING',     color: PINK,    desc: 'current message + last few turns', store: 'in-process buffer', span: 'minutes' },
        { y: 132, name: 'SHORT-TERM',  color: AMBER,   desc: 'session-scoped scratchpad',           store: 'Redis / in-memory',  span: 'session' },
        { y: 204, name: 'LONG-TERM',   color: BLUE,    desc: 'durable facts, profile, preferences', store: 'Postgres + pgvector', span: 'persistent' },
        { y: 276, name: 'EPISODIC',    color: EMERALD, desc: 'past interactions, success/failure',  store: 'Mem0 / Zep / Letta', span: 'persistent' },
      ].map((m, i) => (
        <g key={i}>
          <rect x={50} y={m.y} width={780} height={56} rx={8} fill={m.color} fillOpacity={0.08} stroke={m.color} strokeWidth={1.4} />
          <text x={70} y={m.y + 22} fill={m.color} fontSize={12} fontWeight={700} fontFamily="monospace">{m.name}</text>
          <text x={210} y={m.y + 22} fill={FG} fontSize={10} fontFamily="monospace">{m.desc}</text>
          <text x={520} y={m.y + 22} fill={GRAY} fontSize={9} fontFamily="monospace">store:</text>
          <text x={570} y={m.y + 22} fill={FG} fontSize={9} fontFamily="monospace">{m.store}</text>
          <text x={70} y={m.y + 42} fill={GRAY} fontSize={9} fontFamily="monospace">retention: {m.span}</text>
        </g>
      ))}

      {/* Fetch arrows */}
      <line x1={830} y1={88}  x2={860} y2={88}  stroke={PINK}    strokeWidth={1.4} markerEnd="url(#memArr1)" />
      <line x1={830} y1={160} x2={860} y2={160} stroke={AMBER}   strokeWidth={1.4} markerEnd="url(#memArr2)" />
      <line x1={830} y1={232} x2={860} y2={232} stroke={BLUE}    strokeWidth={1.4} markerEnd="url(#memArr3)" />
      <line x1={830} y1={304} x2={860} y2={304} stroke={EMERALD} strokeWidth={1.4} markerEnd="url(#memArr4)" />

      <rect x={50} y={350} width={780} height={48} rx={6} fill="rgba(168,85,247,0.06)" stroke={C} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={370} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">FETCH POLICY</text>
      <text x={440} y={388} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">
        On every turn: working (always) + short (always) + long (semantic top-k) + episodic (event-based) → context window
      </text>

      <defs>
        {[1,2,3,4].map(i => <marker key={i} id={`memArr${i}`} markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={[PINK, AMBER, BLUE, EMERALD][i-1]} /></marker>)}
      </defs>
    </svg>
  );
}

/* ─── SVG: Reasoning patterns ───────────────────────────────────────── */
function ReasoningPatterns() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="ReAct, Chain-of-Thought, Tree-of-Thoughts comparison">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REASONING PATTERNS — CoT, ReAct, ToT, REFLECT
      </text>

      {[
        { x: 30,  title: 'CoT',     desc: 'reason in tokens, then answer', use: 'static questions', color: BLUE },
        { x: 240, title: 'ReAct',   desc: 'reason ↔ act ↔ observe loop',   use: 'tool-using agents', color: C },
        { x: 450, title: 'ToT',     desc: 'branch + score + prune',         use: 'planning, search', color: AMBER },
        { x: 660, title: 'REFLECT', desc: 'critique own answer, retry',     use: 'high-stakes tasks', color: EMERALD },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={70} width={180} height={250} rx={10} fill={SURFACE} stroke={p.color} strokeWidth={1.4} />
          <text x={p.x + 90} y={94} textAnchor="middle" fill={p.color} fontSize={12} fontWeight={700} fontFamily="monospace">{p.title}</text>
          <text x={p.x + 90} y={112} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{p.desc}</text>

          {/* Mini visualisation */}
          <g transform={`translate(${p.x + 30} 140)`}>
            {i === 0 && (
              <>
                {[0,1,2,3,4].map(k => <line key={k} x1={0} y1={k * 16} x2={120} y2={k * 16} stroke={BLUE} strokeWidth={1} opacity={0.6} />)}
                <line x1={0} y1={88} x2={120} y2={88} stroke={GREEN} strokeWidth={2.5} />
              </>
            )}
            {i === 1 && (
              <>
                <circle cx={20} cy={10} r={8} fill={C} fillOpacity={0.4} stroke={C} strokeWidth={1} />
                <text x={20} y={14} textAnchor="middle" fill={FG} fontSize={8} fontWeight={700} fontFamily="monospace">R</text>
                <circle cx={60} cy={30} r={8} fill={GREEN} fillOpacity={0.4} stroke={GREEN} strokeWidth={1} />
                <text x={60} y={34} textAnchor="middle" fill={FG} fontSize={8} fontWeight={700} fontFamily="monospace">A</text>
                <circle cx={100} cy={50} r={8} fill={PINK} fillOpacity={0.4} stroke={PINK} strokeWidth={1} />
                <text x={100} y={54} textAnchor="middle" fill={FG} fontSize={8} fontWeight={700} fontFamily="monospace">O</text>
                <circle cx={20} cy={70} r={8} fill={C} fillOpacity={0.4} stroke={C} strokeWidth={1} />
                <text x={20} y={74} textAnchor="middle" fill={FG} fontSize={8} fontWeight={700} fontFamily="monospace">R</text>
                <line x1={20} y1={18} x2={52} y2={28} stroke={C} strokeWidth={0.8} />
                <line x1={68} y1={36} x2={92} y2={46} stroke={C} strokeWidth={0.8} />
                <line x1={92} y1={56} x2={28} y2={68} stroke={C} strokeWidth={0.8} strokeDasharray="2 2" />
              </>
            )}
            {i === 2 && (
              <>
                <circle cx={60} cy={10} r={6} fill={AMBER} />
                <line x1={60} y1={16} x2={20} y2={45} stroke={AMBER} />
                <line x1={60} y1={16} x2={60} y2={45} stroke={AMBER} />
                <line x1={60} y1={16} x2={100} y2={45} stroke={AMBER} />
                {[20, 60, 100].map((cx, k) => <circle key={k} cx={cx} cy={50} r={5} fill={AMBER} fillOpacity={0.6} />)}
                <line x1={20} y1={55} x2={10} y2={85} stroke={AMBER} />
                <line x1={20} y1={55} x2={30} y2={85} stroke={AMBER} />
                <line x1={100} y1={55} x2={90} y2={85} stroke={AMBER} />
                <line x1={100} y1={55} x2={110} y2={85} stroke={AMBER} />
                {[10, 30, 90, 110].map((cx, k) => <circle key={k} cx={cx} cy={90} r={4} fill={AMBER} fillOpacity={0.4} />)}
                {/* prune marker */}
                <text x={60} y={94} textAnchor="middle" fill={RED} fontSize={9} fontFamily="monospace">prune</text>
              </>
            )}
            {i === 3 && (
              <>
                <rect x={0} y={5} width={120} height={20} rx={3} fill={EMERALD} fillOpacity={0.4} stroke={EMERALD} strokeWidth={1} />
                <text x={60} y={20} textAnchor="middle" fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">draft</text>
                <line x1={60} y1={28} x2={60} y2={42} stroke={EMERALD} strokeWidth={1.4} markerEnd="url(#rfA)" />
                <rect x={0} y={45} width={120} height={20} rx={3} fill={AMBER} fillOpacity={0.4} stroke={AMBER} strokeWidth={1} />
                <text x={60} y={60} textAnchor="middle" fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">critique</text>
                <line x1={60} y1={68} x2={60} y2={82} stroke={AMBER} strokeWidth={1.4} markerEnd="url(#rfA2)" />
                <rect x={0} y={85} width={120} height={20} rx={3} fill={GREEN} fillOpacity={0.4} stroke={GREEN} strokeWidth={1} />
                <text x={60} y={100} textAnchor="middle" fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">final</text>
              </>
            )}
          </g>

          <text x={p.x + 90} y={290} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">use:</text>
          <text x={p.x + 90} y={306} textAnchor="middle" fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">{p.use}</text>
        </g>
      ))}

      <text x={440} y={356} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        ReAct is the production default. CoT for static. ToT for search. Reflect for high-stakes / writing.
      </text>

      <defs>
        <marker id="rfA"  markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={EMERALD} /></marker>
        <marker id="rfA2" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={AMBER} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: Multi-agent topologies ───────────────────────────────────── */
function MultiAgentTopologies() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Six multi-agent topologies">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SIX MULTI-AGENT TOPOLOGIES
      </text>

      {[
        { x: 30,  y: 60,  title: 'SINGLE',         color: GREEN },
        { x: 320, y: 60,  title: 'ORCHESTRATOR',   color: AMBER },
        { x: 610, y: 60,  title: 'PIPELINE',       color: BLUE },
        { x: 30,  y: 250, title: 'HIERARCHICAL',   color: PINK },
        { x: 320, y: 250, title: 'SWARM (handoff)',color: C },
        { x: 610, y: 250, title: 'MESH',           color: EMERALD },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.y} width={240} height={170} rx={10} fill={SURFACE} stroke={t.color} strokeWidth={1.4} />
          <text x={t.x + 120} y={t.y + 22} textAnchor="middle" fill={t.color} fontSize={11} fontWeight={700} fontFamily="monospace">{t.title}</text>

          <g transform={`translate(${t.x + 30} ${t.y + 50})`}>
            {/* SINGLE */}
            {i === 0 && (
              <>
                <circle cx={90} cy={50} r={20} fill={GREEN} fillOpacity={0.4} stroke={GREEN} strokeWidth={1.4} />
                <text x={90} y={54} textAnchor="middle" fill={FG} fontSize={10} fontWeight={700} fontFamily="monospace">A</text>
                {[0,1,2,3,4].map(k => {
                  const a = (k / 5) * Math.PI * 2;
                  return (
                    <g key={k}>
                      <line x1={90} y1={50} x2={90 + Math.cos(a) * 65} y2={50 + Math.sin(a) * 65} stroke={GREEN} strokeWidth={1} opacity={0.6} />
                      <rect x={84 + Math.cos(a) * 65} y={44 + Math.sin(a) * 65} width={12} height={12} rx={1} fill={GREEN} fillOpacity={0.5} />
                    </g>
                  );
                })}
                <text x={90} y={120} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">1 agent · N tools</text>
              </>
            )}
            {/* ORCHESTRATOR */}
            {i === 1 && (
              <>
                <circle cx={90} cy={20} r={16} fill={AMBER} fillOpacity={0.4} stroke={AMBER} strokeWidth={1.4} />
                <text x={90} y={24} textAnchor="middle" fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">O</text>
                {[20, 90, 160].map((cx, k) => (
                  <g key={k}>
                    <line x1={90} y1={36} x2={cx} y2={70} stroke={AMBER} strokeWidth={1} />
                    <circle cx={cx} cy={80} r={12} fill={AMBER} fillOpacity={0.3} stroke={AMBER} strokeWidth={1} />
                    <text x={cx} y={84} textAnchor="middle" fill={FG} fontSize={8} fontFamily="monospace">W{k+1}</text>
                  </g>
                ))}
                <text x={90} y={120} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">1 supervisor · N workers</text>
              </>
            )}
            {/* PIPELINE */}
            {i === 2 && (
              <>
                {[20, 90, 160].map((cx, k) => (
                  <g key={k}>
                    <circle cx={cx} cy={50} r={14} fill={BLUE} fillOpacity={0.35} stroke={BLUE} strokeWidth={1.2} />
                    <text x={cx} y={54} textAnchor="middle" fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">{['A','B','C'][k]}</text>
                  </g>
                ))}
                <line x1={34} y1={50} x2={76} y2={50} stroke={BLUE} strokeWidth={1.4} markerEnd="url(#patArrB)" />
                <line x1={104} y1={50} x2={146} y2={50} stroke={BLUE} strokeWidth={1.4} markerEnd="url(#patArrB)" />
                <text x={90} y={120} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">strict order</text>
              </>
            )}
            {/* HIERARCHICAL */}
            {i === 3 && (
              <>
                <circle cx={90} cy={10} r={12} fill={PINK} fillOpacity={0.5} stroke={PINK} strokeWidth={1.2} />
                <line x1={90} y1={22} x2={50} y2={42} stroke={PINK} strokeWidth={0.8} />
                <line x1={90} y1={22} x2={130} y2={42} stroke={PINK} strokeWidth={0.8} />
                <circle cx={50} cy={50} r={10} fill={PINK} fillOpacity={0.35} stroke={PINK} strokeWidth={1} />
                <circle cx={130} cy={50} r={10} fill={PINK} fillOpacity={0.35} stroke={PINK} strokeWidth={1} />
                {[20, 50, 80, 110, 140, 170].map((cx, k) => {
                  const parent = k < 3 ? 50 : 130;
                  return (
                    <g key={k}>
                      <line x1={parent} y1={60} x2={cx} y2={85} stroke={PINK} strokeWidth={0.6} />
                      <rect x={cx - 5} y={88} width={10} height={10} rx={1} fill={PINK} fillOpacity={0.4} />
                    </g>
                  );
                })}
                <text x={90} y={120} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">tree of supervisors</text>
              </>
            )}
            {/* SWARM */}
            {i === 4 && (
              <>
                {[
                  { cx: 30, cy: 30 }, { cx: 90, cy: 20 }, { cx: 150, cy: 30 },
                  { cx: 60, cy: 70 }, { cx: 120, cy: 70 },
                ].map((p, k) => (
                  <circle key={k} cx={p.cx} cy={p.cy} r={11} fill={C} fillOpacity={0.4} stroke={C} strokeWidth={1.2} />
                ))}
                <line x1={30} y1={30} x2={90} y2={20} stroke={C} strokeWidth={0.8} strokeDasharray="2 2" markerEnd="url(#patArrC)" />
                <line x1={90} y1={20} x2={150} y2={30} stroke={C} strokeWidth={0.8} strokeDasharray="2 2" markerEnd="url(#patArrC)" />
                <line x1={150} y1={30} x2={120} y2={70} stroke={C} strokeWidth={0.8} strokeDasharray="2 2" markerEnd="url(#patArrC)" />
                <line x1={120} y1={70} x2={60} y2={70} stroke={C} strokeWidth={0.8} strokeDasharray="2 2" markerEnd="url(#patArrC)" />
                <text x={90} y={120} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">peers · handoffs</text>
              </>
            )}
            {/* MESH */}
            {i === 5 && (
              <>
                {[0,1,2,3,4,5].map(k => {
                  const a = (k / 6) * Math.PI * 2;
                  const cx = 90 + Math.cos(a) * 50;
                  const cy = 50 + Math.sin(a) * 35;
                  return <circle key={k} cx={cx} cy={cy} r={9} fill={EMERALD} fillOpacity={0.4} stroke={EMERALD} strokeWidth={1} />;
                })}
                {[0,1,2,3,4,5].map(k => {
                  const a = (k / 6) * Math.PI * 2;
                  const cx1 = 90 + Math.cos(a) * 50, cy1 = 50 + Math.sin(a) * 35;
                  return [0,1,2,3,4,5].filter(j => j !== k).slice(0, 3).map(j => {
                    const a2 = (j / 6) * Math.PI * 2;
                    return <line key={`${k}-${j}`} x1={cx1} y1={cy1} x2={90 + Math.cos(a2) * 50} y2={50 + Math.sin(a2) * 35} stroke={EMERALD} strokeWidth={0.4} opacity={0.5} />;
                  });
                })}
                <text x={90} y={120} textAnchor="middle" fill={GRAY} fontSize={8} fontFamily="monospace">all-to-all</text>
              </>
            )}
          </g>
        </g>
      ))}

      <defs>
        <marker id="patArrB" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={BLUE} /></marker>
        <marker id="patArrC" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={C} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: Production stack ─────────────────────────────────────────── */
function ProductionStack() {
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Production agent stack">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        PRODUCTION STACK — MAY 2026 DEFAULT
      </text>

      {[
        { y: 60,  name: 'APPLICATION',    desc: 'UI · API · Slack · email · webhook',                                color: PINK },
        { y: 116, name: 'ORCHESTRATION',  desc: 'LangGraph · OpenAI Agents SDK · CrewAI · Pydantic AI · Mastra',     color: C },
        { y: 172, name: 'EVAL & OBS',     desc: 'LangSmith · Braintrust · Phoenix · Helicone · Galileo · Datadog LLM', color: AMBER },
        { y: 228, name: 'TOOL LAYER',     desc: 'MCP servers · internal APIs · RAG · code exec sandbox (E2B / Modal)', color: GREEN },
        { y: 284, name: 'MEMORY',         desc: 'Redis short-term · Postgres+pgvector long-term · Mem0 / Zep / Letta', color: BLUE },
        { y: 340, name: 'MODEL ROUTING',  desc: 'LiteLLM · OpenRouter · Portkey · Helicone',                          color: EMERALD },
        { y: 396, name: 'FOUNDATION',     desc: 'Claude 4.7 / Sonnet 4.6 / GPT-5 / Gemini 2.5 / Llama 4 / DeepSeek',  color: GRAY },
      ].map((l, i) => (
        <g key={i}>
          <rect x={50} y={l.y} width={780} height={42} rx={6} fill={l.color} fillOpacity={0.08} stroke={l.color} strokeWidth={1.4} />
          <text x={70} y={l.y + 24} fill={l.color} fontSize={11} fontWeight={700} fontFamily="monospace">{l.name}</text>
          <text x={250} y={l.y + 24} fill={FG} fontSize={10} fontFamily="monospace">{l.desc}</text>
        </g>
      ))}

      {[100, 156, 212, 268, 324, 380].map((y, i) => (
        <line key={i} x1={440} y1={y} x2={440} y2={y + 18} stroke={FG} strokeWidth={0.8} strokeDasharray="2 2" opacity={0.4} />
      ))}
    </svg>
  );
}

/* ─── SVG: Cost flow ─────────────────────────────────────────────────── */
function CostFlow() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Cost optimization flow">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST OPTIMISATION — FROM RAW TO 5–10× CHEAPER
      </text>

      {/* Three columns showing optimisation */}
      {[
        { x: 30,  title: 'NAIVE',          subs: ['top-tier model', 'no caching', '1 pass each'], cost: '$1.00', color: RED },
        { x: 310, title: 'CACHED',         subs: ['+ prompt cache', '+ batch reads', 'same model'], cost: '$0.40', color: AMBER },
        { x: 590, title: 'ROUTED',         subs: ['cheap → expensive', '+ KV cache', '+ parallel tools'], cost: '$0.10', color: GREEN },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={70} width={260} height={250} rx={10} fill={SURFACE} stroke={p.color} strokeWidth={1.4} />
          <text x={p.x + 130} y={94} textAnchor="middle" fill={p.color} fontSize={12} fontWeight={700} fontFamily="monospace">{p.title}</text>

          {p.subs.map((s, k) => (
            <text key={k} x={p.x + 30} y={130 + k * 22} fill={FG} fontSize={10} fontFamily="monospace">• {s}</text>
          ))}

          <text x={p.x + 130} y={250} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">cost / call</text>
          <text x={p.x + 130} y={284} textAnchor="middle" fill={p.color} fontSize={20} fontWeight={700} fontFamily="monospace">{p.cost}</text>
        </g>
      ))}

      {[290, 570].map((x, i) => (
        <line key={i} x1={x} y1={195} x2={x + 20} y2={195} stroke={FG} strokeWidth={1.4} markerEnd="url(#cfArr)" />
      ))}

      <text x={440} y={350} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">
        Real production agents reduce per-call cost by 5–10× via these compounding levers
      </text>

      <defs>
        <marker id="cfArr" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: Customer support agent architecture ──────────────────────── */
function CustomerSupportArch() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Customer support agent architecture">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ENTERPRISE CUSTOMER SUPPORT — SUPERVISOR + 4 SPECIALISTS
      </text>

      {/* User input */}
      <rect x={50} y={60} width={180} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={140} y={82} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">USER MESSAGE</text>
      <text x={140} y={100} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">email · chat · phone</text>

      {/* Triage */}
      <rect x={300} y={60} width={180} height={50} rx={8} fill="rgba(245,158,11,0.08)" stroke={AMBER} strokeWidth={1.4} />
      <text x={390} y={82} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">TRIAGE / ROUTER</text>
      <text x={390} y={100} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">intent + sentiment classifier</text>

      <line x1={230} y1={85} x2={300} y2={85} stroke={C} strokeWidth={1.4} markerEnd="url(#csArr)" />

      {/* 4 specialist agents */}
      {[
        { x: 50,  label: 'BILLING',     color: GREEN,   tools: 'Stripe MCP · invoice DB' },
        { x: 250, label: 'TECHNICAL',   color: BLUE,    tools: 'KB RAG · Sentry MCP' },
        { x: 450, label: 'ACCOUNT',     color: PINK,    tools: 'Auth API · profile DB' },
        { x: 650, label: 'ESCALATION',  color: RED,     tools: 'human handoff · Slack' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={170} width={180} height={70} rx={8} fill={SURFACE} stroke={s.color} strokeWidth={1.4} />
          <text x={s.x + 90} y={192} textAnchor="middle" fill={s.color} fontSize={11} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.x + 90} y={210} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">specialist agent</text>
          <text x={s.x + 90} y={228} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{s.tools}</text>
          <line x1={390} y1={110} x2={s.x + 90} y2={170} stroke={AMBER} strokeWidth={0.8} strokeDasharray="3 2" />
        </g>
      ))}

      {/* Memory + tools at bottom */}
      <rect x={50} y={280} width={380} height={70} rx={8} fill="rgba(59,130,246,0.06)" stroke={BLUE} strokeWidth={1.2} />
      <text x={240} y={302} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">MEMORY</text>
      <text x={240} y={320} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">customer profile · ticket history · prefs</text>
      <text x={240} y={336} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Postgres + pgvector · Mem0 episodic</text>

      <rect x={450} y={280} width={380} height={70} rx={8} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.2} />
      <text x={640} y={302} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={640} y={320} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">trace every turn · LLM-as-judge eval</text>
      <text x={640} y={336} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">LangSmith · Braintrust · Datadog</text>

      {/* KPIs */}
      {[
        { x: 60,  label: 'Auto-resolve',   value: '78%', color: GREEN },
        { x: 220, label: 'CSAT',           value: '4.6', color: BLUE },
        { x: 380, label: 'Response',       value: '12s', color: AMBER },
        { x: 540, label: 'Cost / ticket',  value: '$0.22', color: C },
        { x: 700, label: 'Escalation',     value: '6%', color: RED },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y={380} width={120} height={50} rx={6} fill={SURFACE} stroke={k.color} strokeWidth={0.8} />
          <text x={k.x + 60} y={400} textAnchor="middle" fill={k.color} fontSize={14} fontWeight={700} fontFamily="monospace">{k.value}</text>
          <text x={k.x + 60} y={418} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{k.label}</text>
        </g>
      ))}

      <defs>
        <marker id="csArr" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={C} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: AI software engineer architecture ───────────────────────── */
function SWEAgentArch() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="AI software engineer agent architecture">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        AI SOFTWARE ENGINEER — DEVIN-CLASS PIPELINE
      </text>

      {[
        { x: 30,  label: 'TICKET',     desc: 'GitHub issue / Linear / Jira', color: PINK },
        { x: 200, label: 'SCOPE',      desc: 'plan · file targets · ACs',     color: AMBER },
        { x: 370, label: 'CODE',       desc: 'edits · tests · commits',       color: GREEN },
        { x: 540, label: 'VERIFY',     desc: 'run tests · CI · self-review',  color: CYAN },
        { x: 710, label: 'PR',         desc: 'open · iterate · merge',        color: C },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={60} width={150} height={70} rx={8} fill={SURFACE} stroke={s.color} strokeWidth={1.4} />
          <text x={s.x + 75} y={82} textAnchor="middle" fill={s.color} fontSize={11} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.x + 75} y={102} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s.desc}</text>
          {i < 4 && <line x1={s.x + 150} y1={95} x2={s.x + 200} y2={95} stroke={FG} strokeWidth={1.2} markerEnd="url(#sweArr)" />}
        </g>
      ))}

      {/* Tools layer */}
      <rect x={30} y={170} width={830} height={120} rx={10} fill="rgba(34,197,94,0.04)" stroke={GREEN} strokeWidth={1} strokeDasharray="3 3" />
      <text x={50} y={194} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">TOOL SHELL — CODE EXEC + GIT + IDE + BROWSER + TERMINAL</text>

      {[
        { x: 60,  label: 'shell',     desc: 'bash, run cmds' },
        { x: 200, label: 'git',       desc: 'commit, branch, PR' },
        { x: 340, label: 'editor',    desc: 'read / write files' },
        { x: 480, label: 'browser',   desc: 'docs, search' },
        { x: 620, label: 'tests',     desc: 'pytest, jest, etc' },
        { x: 760, label: 'memory',    desc: 'past patches' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={210} width={120} height={60} rx={5} fill={SURFACE} stroke={GREEN} strokeWidth={0.8} />
          <text x={t.x + 60} y={232} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 60} y={252} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      {/* Sandbox */}
      <rect x={30} y={310} width={400} height={80} rx={8} fill="rgba(59,130,246,0.06)" stroke={BLUE} strokeWidth={1.2} />
      <text x={230} y={332} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">EPHEMERAL SANDBOX</text>
      <text x={230} y={352} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">E2B · Modal · Daytona · Codespaces</text>
      <text x={230} y={368} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">isolated VM per task · CPU + GPU options · clean state</text>

      <rect x={460} y={310} width={400} height={80} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.2} />
      <text x={660} y={332} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">EVAL (CONTINUOUS)</text>
      <text x={660} y={352} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">SWE-bench · GAIA · internal regression set</text>
      <text x={660} y={368} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">trace + score every PR · drift alerts</text>

      {/* KPIs */}
      {[
        { x: 60,  label: 'SWE-bench',  value: '47%', color: GREEN },
        { x: 220, label: 'PRs / week', value: '120',  color: BLUE },
        { x: 380, label: 'Merge rate', value: '68%',  color: AMBER },
        { x: 540, label: 'Avg cycle',  value: '14m',  color: C },
        { x: 700, label: 'Cost / PR',  value: '$2.40', color: PINK },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y={400} width={130} height={48} rx={6} fill={SURFACE} stroke={k.color} strokeWidth={0.8} />
          <text x={k.x + 65} y={420} textAnchor="middle" fill={k.color} fontSize={14} fontWeight={700} fontFamily="monospace">{k.value}</text>
          <text x={k.x + 65} y={438} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{k.label}</text>
        </g>
      ))}

      <defs>
        <marker id="sweArr" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: Data analyst agent ──────────────────────────────────────── */
function DataAnalystArch() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Data analyst agent architecture">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DATA ANALYST AGENT — text2SQL · ANALYSIS · VIZ
      </text>

      <rect x={50} y={60} width={180} height={60} rx={8} fill="rgba(168,85,247,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={140} y={82} textAnchor="middle" fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">QUESTION</text>
      <text x={140} y={100} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">"why did churn spike Q4?"</text>

      {/* Pipeline */}
      {[
        { x: 280, label: 'PLAN',         desc: 'decompose into sub-Qs',           color: AMBER },
        { x: 460, label: 'QUERY',        desc: 'text2SQL · semantic layer',       color: CYAN },
        { x: 640, label: 'ANALYSE',      desc: 'pandas · stats · LLM-judge',      color: GREEN },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={60} width={160} height={60} rx={8} fill={SURFACE} stroke={s.color} strokeWidth={1.2} />
          <text x={s.x + 80} y={82} textAnchor="middle" fill={s.color} fontSize={11} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.x + 80} y={100} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{s.desc}</text>
        </g>
      ))}

      {[230, 440, 620].map((x, i) => (
        <line key={i} x1={x} y1={90} x2={x + 50} y2={90} stroke={FG} strokeWidth={1.2} markerEnd="url(#daArr)" />
      ))}

      {/* Sources */}
      <rect x={50} y={170} width={780} height={70} rx={8} fill="rgba(59,130,246,0.06)" stroke={BLUE} strokeWidth={1.2} />
      <text x={70} y={192} fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">DATA SOURCES (via MCP)</text>
      {[
        { x: 70,  label: 'Snowflake' },
        { x: 200, label: 'Postgres' },
        { x: 320, label: 'BigQuery' },
        { x: 440, label: 'Databricks' },
        { x: 580, label: 'dbt model layer' },
        { x: 740, label: 'Cube.dev' },
      ].map((d, i) => (
        <g key={i}>
          <rect x={d.x} y={208} width={110} height={26} rx={3} fill={SURFACE} stroke={BLUE} strokeWidth={0.6} />
          <text x={d.x + 55} y={224} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{d.label}</text>
        </g>
      ))}

      {/* Output */}
      <rect x={50} y={270} width={380} height={70} rx={8} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.2} />
      <text x={240} y={292} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">VIZ + INSIGHT</text>
      <text x={240} y={310} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Plotly / Vega-Lite charts</text>
      <text x={240} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">+ written explanation + cited rows</text>

      <rect x={450} y={270} width={380} height={70} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.2} />
      <text x={640} y={292} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">GUARDRAILS</text>
      <text x={640} y={310} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">PII redact · row count cap · cost guard</text>
      <text x={640} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">SQL whitelist · approved schemas only</text>

      {/* KPIs */}
      {[
        { x: 60,  label: 'SQL accuracy',   value: '92%', color: GREEN },
        { x: 220, label: 'p50 latency',    value: '8s',  color: BLUE },
        { x: 380, label: 'Daily Qs',        value: '3.2K', color: CYAN },
        { x: 540, label: 'Cost / Q',        value: '$0.18', color: AMBER },
        { x: 700, label: 'Analyst hrs saved', value: '120/wk', color: PINK },
      ].map((k, i) => (
        <g key={i}>
          <rect x={k.x} y={360} width={130} height={48} rx={6} fill={SURFACE} stroke={k.color} strokeWidth={0.8} />
          <text x={k.x + 65} y={382} textAnchor="middle" fill={k.color} fontSize={13} fontWeight={700} fontFamily="monospace">{k.value}</text>
          <text x={k.x + 65} y={400} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{k.label}</text>
        </g>
      ))}

      <defs>
        <marker id="daArr" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={FG} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: Failure quadrant ────────────────────────────────────────── */
function FailureQuadrant() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Agent failure quadrant">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE QUADRANT — WHERE PRODUCTION AGENTS BREAK
      </text>

      <line x1={120} y1={70} x2={120} y2={350} stroke={DIM} strokeWidth={0.8} />
      <line x1={120} y1={350} x2={830} y2={350} stroke={DIM} strokeWidth={0.8} />

      <text x={475} y={376} textAnchor="middle" fill={GRAY} fontSize={10} fontFamily="monospace">→ TASK COMPLEXITY</text>
      <g transform="translate(80 220) rotate(-90)">
        <text textAnchor="middle" fill={GRAY} fontSize={10} fontFamily="monospace">→ AUTONOMY</text>
      </g>

      {[
        { x: 120, y: 70,  w: 355, h: 140, label: 'TOOL FAILURES',     color: AMBER, items: ['wrong arg type', 'tool not bound', 'API rate-limit'] },
        { x: 475, y: 70,  w: 355, h: 140, label: 'PLANNING DRIFT',     color: BLUE,  items: ['loops', 'gives up early', 'wrong sub-task'] },
        { x: 120, y: 210, w: 355, h: 140, label: 'CONTEXT ROT',        color: PINK,  items: ['memory pollution', 'long-context recall', 'context collisions'] },
        { x: 475, y: 210, w: 355, h: 140, label: 'CASCADING FAILURE',  color: RED,   items: ['hallucinated tool result', 'wrong handoff', 'silent error'] },
      ].map((q, i) => (
        <g key={i}>
          <rect x={q.x + 4} y={q.y + 4} width={q.w - 4} height={q.h - 4} fill={q.color} fillOpacity={0.04} stroke={q.color} strokeWidth={0.6} strokeDasharray="3 3" />
          <text x={q.x + 16} y={q.y + 26} fill={q.color} fontSize={11} fontWeight={700} fontFamily="monospace">{q.label}</text>
          {q.items.map((it, k) => <text key={k} x={q.x + 16} y={q.y + 50 + k * 18} fill={FG} fontSize={9} fontFamily="monospace">• {it}</text>)}
        </g>
      ))}

      <text x={475} y={400} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        Detect with traces + LLM-as-judge · mitigate with retries, schema validation, and explicit deadlines
      </text>
    </svg>
  );
}

/* ─── SVG: Eval loop ────────────────────────────────────────────────── */
function EvalLoop() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Eval loop with traces and judges">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        EVAL LOOP — TRACE → JUDGE → DATASET → CI
      </text>

      {[
        { cx: 130, cy: 180, label: 'TRACES',     desc: 'every turn, every tool',  color: CYAN },
        { cx: 350, cy: 180, label: 'JUDGE',      desc: 'LLM-as-judge + human',    color: AMBER },
        { cx: 570, cy: 180, label: 'DATASET',    desc: 'gold + adversarial',      color: PINK },
        { cx: 790, cy: 180, label: 'CI EVAL',    desc: 'block on regression',     color: GREEN },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.cx} cy={s.cy} r={70} fill={SURFACE} stroke={s.color} strokeWidth={1.6} />
          <text x={s.cx} y={s.cy - 4} textAnchor="middle" fill={s.color} fontSize={11} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.cx} y={s.cy + 14} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{s.desc}</text>
        </g>
      ))}

      {[200, 420, 640].map((x, i) => (
        <line key={i} x1={x} y1={180} x2={x + 50} y2={180} stroke={FG} strokeWidth={1.4} markerEnd="url(#elArr)" />
      ))}

      {/* Loop back */}
      <path d="M 790 250 Q 790 320 130 320 Q 130 280 130 250" fill="none" stroke={GREEN} strokeWidth={1.2} strokeDasharray="3 2" markerEnd="url(#elArrG)" />
      <text x={460} y={314} textAnchor="middle" fill={GREEN} fontSize={9} fontFamily="monospace">CI fail → ship to dataset → retrain prompts/policies</text>

      <text x={440} y={356} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        LangSmith · Braintrust · Phoenix · Galileo · Maxim · Helicone · Datadog LLM
      </text>

      <defs>
        <marker id="elArr"  markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={FG} /></marker>
        <marker id="elArrG" markerWidth={6} markerHeight={4} refX={5} refY={2} orient="auto"><polygon points="0 0, 6 2, 0 4" fill={GREEN} /></marker>
      </defs>
    </svg>
  );
}

/* ─── SVG: Security threat surface ─────────────────────────────────── */
function SecurityThreats() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Agent security threat surface">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SECURITY THREATS — FIVE SURFACES
      </text>

      {[
        { x: 30,  title: 'PROMPT INJECTION', desc: 'untrusted input alters intent', mit: 'segregate · validate · structured' },
        { x: 200, title: 'JAILBREAK',         desc: 'bypass model guardrails',        mit: 'constitutional · regex · dual-check' },
        { x: 370, title: 'TOOL ABUSE',        desc: 'agent calls dangerous tool',     mit: 'allowlist · scopes · approvals' },
        { x: 540, title: 'DATA LEAK',         desc: 'PII / secrets in outputs',       mit: 'redact · output filter · DLP' },
        { x: 710, title: 'CODE EXEC',         desc: 'untrusted code runs locally',    mit: 'sandbox · resource caps · network jail' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={70} width={150} height={250} rx={10} fill={SURFACE} stroke={RED} strokeWidth={1.2} />
          <text x={t.x + 75} y={94} textAnchor="middle" fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">{t.title}</text>
          <text x={t.x + 75} y={118} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{t.desc}</text>
          <line x1={t.x + 20} y1={150} x2={t.x + 130} y2={150} stroke={DIM} strokeWidth={0.6} />
          <text x={t.x + 75} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">MITIGATIONS</text>
          {t.mit.split(' · ').map((m, k) => (
            <text key={k} x={t.x + 75} y={194 + k * 16} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">• {m}</text>
          ))}
        </g>
      ))}

      <text x={440} y={356} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">
        Layer multiple defences. No single mitigation is sufficient. OWASP LLM Top 10 is the canonical reference.
      </text>
    </svg>
  );
}

/* ─── PAPER COMPONENT ─────────────────────────────────────────────────── */

export default function AgenticSystemsPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;

  return (
    <>
      {/* ─── 01. The Agentic Era ────────────────────────────────────── */}
      {show('The Agentic Era') && (
        <section>
          <SectionHeader num="01" title="The Agentic Era" subtitle="What changed in the last 18 months and why it ships now" color={C} />

          <p>
            In May 2026, every serious software company is shipping <H tip="Agentic AI = software where an LLM is given goals (not instructions), can call tools to act on the world, has memory, and runs in a loop until the goal is met or a guard intervenes. Distinct from traditional LLM apps (single prompt → response) and from classical RPA (scripted workflows)." color={C}>agentic AI</H> in one form or another. Customer-support agents handle 60–80% of tier-1 tickets. AI software engineers open hundreds of pull requests a week. Data-analyst agents answer ad-hoc questions over the data warehouse in 8 seconds.
          </p>

          <p>
            None of this worked reliably 18 months ago. Three things had to land together: tool-use APIs that actually work, an open standard for connecting tools (<H tip="MCP — Model Context Protocol. Open standard from Anthropic (Nov 2024) for how an LLM client discovers and calls tools or reads resources from any compliant server. JSON-RPC 2.0 over stdio or HTTP. By May 2026 adopted by GitHub, Cloudflare, Stripe, OpenAI, Google, Microsoft." color={PINK}>MCP</H>), and frameworks that turn agent loops from research demos into orchestrated production systems.
          </p>

          <EraTimeline />

          <SimpleExplain>
            <strong>One-line version</strong>: an agent is an LLM in a while-loop with tools and memory. The whole field is figuring out what to put in the loop and how to know when it&apos;s working.
          </SimpleExplain>

          <Callout type="key">
            This module is grounded in 16 firecrawl searches done on 2026-05-01. Full notes live under <code>vault/research/agentic-ai-2026/</code>. Synthesis: <code>00-SYNTHESIS.md</code>.
          </Callout>

          <p>
            What follows is a complete-picture view: how a single agent works, how multiple agents coordinate, which framework to pick, how to put it into production, what breaks, and three end-to-end enterprise project case studies that show all of this stitched together.
          </p>
        </section>
      )}

      {/* ─── 02. Anatomy of an Agent ─────────────────────────────────── */}
      {show('Anatomy of an Agent') && (
        <section>
          <SectionHeader num="02" title="Anatomy of an Agent" subtitle="Perceive → plan → act → observe, with memory underneath" color={C} />

          <p>
            Strip an agent down to its primitives and you find four operations and one shared resource:
          </p>

          <AgentLoop />

          <ul>
            <li><strong>Perceive</strong>: receive a new observation. The very first turn is the user message; every subsequent turn is also tool output, system event, or scheduled poke.</li>
            <li><strong>Plan</strong>: reason in tokens about what to do next. Pick a tool, ask a clarifying question, draft a partial answer, or finalise.</li>
            <li><strong>Act</strong>: emit a tool call. Could be a search, a database query, a code execution, a file write, or sending a message to another agent.</li>
            <li><strong>Observe</strong>: feed the tool result back into context for the next turn.</li>
          </ul>

          <h3>What lives in &quot;context&quot;</h3>
          <p>
            Every turn is conditioned on a context window that bundles:
          </p>
          <ul>
            <li><strong>System prompt</strong>: identity, capabilities, hard rules, tool catalogue.</li>
            <li><strong>Conversation history</strong>: the running transcript of messages and tool calls.</li>
            <li><strong>Retrieved memory</strong>: working / short / long / episodic (next section).</li>
            <li><strong>Schema</strong>: structured-output spec or JSON schema that constrains the model&apos;s next reply.</li>
          </ul>

          <FormulaSteps
            steps={[
              { label: 'Loop',   formula: 'a_t = \\pi(s_t \\mid c_t,\\, m_t)', explanation: 'At step t, the policy π picks an action conditioned on observation s_t, conversation context c_t, and memory m_t.' },
              { label: 'Update', formula: 'c_{t+1} = c_t \\oplus (a_t,\\, o_t)',  explanation: 'Append the action and its observation to context for the next turn.' },
              { label: 'Stop',   formula: '\\text{halt when } a_t = \\text{final\\_answer} \\lor t > T_{\\max}', explanation: 'Loop ends when the agent emits a final answer or hits a budget cap.' },
            ]}
          />

          <Callout type="insight">
            The whole agent design space is choices about what goes into <code>π</code>, what goes into <code>m</code>, and how generously you spend on <code>T<sub>max</sub></code>. The rest is plumbing.
          </Callout>
        </section>
      )}

      {/* ─── 03. Tool Use & MCP ──────────────────────────────────────── */}
      {show('Tool Use & MCP') && (
        <section>
          <SectionHeader num="03" title="Tool Use & MCP" subtitle="Function calling grew up, then everyone agreed on a wire format" color={C} />

          <p>
            Tool use started in 2023 as <H tip="Function calling = OpenAI's June 2023 API extension that lets a model emit structured JSON conforming to a developer-supplied schema instead of free text. The first widely adopted way to make an LLM call code." color={CYAN}>function calling</H>: a developer ships a JSON schema, the model emits arguments that conform to it, you parse and dispatch. By 2024 every major provider supported it. The problem was that every framework, every IDE, every product had to write its own adapters for every tool.
          </p>

          <p>
            <H tip="Anthropic = the company that builds Claude. Founded 2021 by ex-OpenAI safety researchers. Originated MCP, Computer Use, Constitutional AI." color={C}>Anthropic</H>&apos;s answer in November 2024 was <H tip="JSON-RPC 2.0 = a remote procedure call protocol that uses JSON to encode requests and responses. Lightweight, transport-agnostic, widely understood. The wire format MCP rides on." color={PINK}>JSON-RPC 2.0</H>-based <strong>Model Context Protocol</strong>. By May 2026 it&apos;s the industry default: GitHub, Cloudflare, Stripe, Microsoft, OpenAI (April 2026), and Google all ship MCP servers.
          </p>

          <MCPArchitecture />

          <h3>The three primitives</h3>
          <ul>
            <li><strong>Tools</strong> — callable functions with input/output schemas. <code>tools/list</code> and <code>tools/call</code>.</li>
            <li><strong>Resources</strong> — readable data sources (files, database rows, KB articles). <code>resources/read</code>.</li>
            <li><strong>Prompts</strong> — server-curated prompt templates the client can fetch. <code>prompts/get</code>.</li>
          </ul>

          <FormulaSteps
            steps={[
              { label: 'Discover', formula: '\\text{client} \\to \\text{server: } tools/list', explanation: 'Returns full tool catalogue with JSON schemas.' },
              { label: 'Bind',     formula: '\\text{client adds tools to model context}',     explanation: 'Tools become part of the system prompt for the LLM.' },
              { label: 'Call',     formula: '\\text{model emits} \\Rightarrow \\text{client} \\to tools/call', explanation: 'Args match schema; client dispatches to server.' },
              { label: 'Stream',   formula: '\\text{server streams chunked output}', explanation: 'Long-running tools (data exports, builds) report progress.' },
            ]}
          />

          <Callout type="warning">
            <strong>April 2026 advisory</strong>: a default-config MCP scope flaw was disclosed across ~200K servers (per The Register). Always pin per-tool scope tokens, validate origin, treat MCP servers as untrusted by default. See <code>vault/research/agentic-ai-2026/03-mcp.md</code>.
          </Callout>

          <h3>Tool design lessons (May 2026)</h3>
          <ul>
            <li><strong>Idempotence over cleverness</strong>. The same call should produce the same result; agents retry liberally.</li>
            <li><strong>Errors are training data</strong>. Return structured error JSON (<code>error.code</code>, <code>error.fix_hint</code>) so the model can recover.</li>
            <li><strong>One job, one tool</strong>. A &quot;mega-tool&quot; with a dozen modes confuses the model. Splitting helps.</li>
            <li><strong>Document with examples</strong>. The model reads tool descriptions like a developer reads function docs. Give 1–2 example invocations.</li>
          </ul>
        </section>
      )}

      {/* ─── 04. Memory Architectures ───────────────────────────────── */}
      {show('Memory Architectures') && (
        <section>
          <SectionHeader num="04" title="Memory Architectures" subtitle="Four memory layers, four stores, four fetch policies" color={C} />

          <p>
            Naive agents have one memory: the conversation history in the context window. That works for ten turns and falls apart at a hundred. Production agents distinguish between memory types and store each appropriately.
          </p>

          <MemoryArchitecture />

          <h3>The four layers</h3>
          <ul>
            <li><strong><H tip="Working memory = current message and last few turns. Always fully in context. Bounded; managed by the agent runtime." color={PINK}>Working</H></strong> (minutes): the live turn buffer.</li>
            <li><strong><H tip="Short-term memory = scratchpad scoped to one session. Tool plans, intermediate results, partial answers. Discarded when the session ends." color={AMBER}>Short-term</H></strong> (session): scratchpad for the current task.</li>
            <li><strong><H tip="Long-term memory = durable facts about the user, system, or world. Stored in a vector DB; retrieved by semantic similarity to current context." color={BLUE}>Long-term</H></strong> (persistent): user profile, preferences, named entities.</li>
            <li><strong><H tip="Episodic memory = past interactions and their outcomes. Stored as event records with timestamps. Fetched event-based or time-windowed, not semantic." color={EMERALD}>Episodic</H></strong> (persistent): past interactions and their outcomes.</li>
          </ul>

          <h3>Stores</h3>
          <ul>
            <li><strong>Working</strong>: in-process buffer (LangGraph state).</li>
            <li><strong>Short-term</strong>: Redis (TTL based) or in-memory store keyed by session.</li>
            <li><strong>Long-term</strong>: Postgres + pgvector, or a managed vector DB (Pinecone, Weaviate, Turbopuffer, Qdrant).</li>
            <li><strong>Episodic</strong>: <H tip="Mem0 = open-source agent memory layer with episodic + semantic fusion. Started 2024; popular for production episodic recall." color={EMERALD}>Mem0</H>, <H tip="Zep = managed agent memory with knowledge graph + embeddings. Production for chat agents." color={EMERALD}>Zep</H>, or <H tip="Letta (formerly MemGPT) = self-managing agent memory layer with hierarchical archival memory. Open source." color={EMERALD}>Letta</H>.</li>
          </ul>

          <h3>Fetch policy</h3>
          <p>
            On every turn the agent runtime composes context as: working (always full) + short (always full) + top-k semantic from long-term + recent + relevant from episodic. The blend is the most-tuned thing in production agent systems.
          </p>

          <Callout type="key">
            Bad memory rots a long-running agent. Symptoms: contradictory facts, looping on stale plans, ignoring user preferences. The fix is hygiene: TTL on short-term, deduplicate long-term writes, summarise episodic at the daily-roll boundary.
          </Callout>
        </section>
      )}

      {/* ─── 05. Planning & Reasoning ───────────────────────────────── */}
      {show('Planning & Reasoning') && (
        <section>
          <SectionHeader num="05" title="Planning & Reasoning" subtitle="ReAct, CoT, ToT, Reflect — pick by task shape" color={C} />

          <p>
            How does the model decide what to do? Four core patterns cover almost every production agent.
          </p>

          <ReasoningPatterns />

          <h3>ReAct — the production default</h3>
          <p>
            <H tip="ReAct (Reasoning+Acting) = a 2022 prompting pattern that interleaves reasoning tokens with tool calls. The model writes 'I should look up X', emits a tool call, observes the result, writes more reasoning, and so on. The substrate of nearly every modern agent." color={C}>ReAct</H> alternates think-act-observe. Modern frameworks bake this in: you don&apos;t prompt for it, the runtime structures the conversation that way.
          </p>

          <h3>CoT — for non-tool tasks</h3>
          <p>
            <H tip="Chain-of-Thought = prompting the model to reason step by step before answering, in tokens. Originated in Wei et al. 2022. Not specifically for agents — but the foundation reasoning pattern that ReAct extends." color={BLUE}>Chain-of-Thought</H> reasons in tokens then commits to an answer. It&apos;s the right default for static questions where no tool helps. Frontier models (Claude 4.7, GPT-5, Gemini 2.5) do this implicitly via &quot;thinking&quot; tokens.
          </p>

          <h3>ToT — when search helps</h3>
          <p>
            <H tip="Tree of Thoughts = a 2023 method that has the model branch into multiple candidate next-steps, score each, and prune. Useful for tasks with explicit search structure (puzzles, planning, code completion ranking). Expensive: each branch is its own forward pass." color={AMBER}>Tree of Thoughts</H> branches into multiple plans, scores each, prunes. Useful for explicit search problems (puzzles, planning), expensive for everything else.
          </p>

          <h3>Reflect — for high stakes</h3>
          <p>
            <H tip="Reflect / Self-Refine = pattern where the model generates a draft, then critiques its own output (often via a separate prompt or model), then revises. Trades latency for quality. Default in writing-heavy agents and high-stakes decision agents." color={EMERALD}>Reflect</H> drafts, critiques itself, revises. ~2× the latency, ~30% better on writing-heavy and high-stakes tasks.
          </p>

          <Callout type="insight">
            Pick ONE primary pattern. Mixing ToT into ReAct mid-flow looks clever and produces mush. Pick. Default to ReAct unless you have a reason.
          </Callout>
        </section>
      )}

      {/* ─── 06. Multi-Agent Patterns ───────────────────────────────── */}
      {show('Multi-Agent Patterns') && (
        <section>
          <SectionHeader num="06" title="Multi-Agent Patterns" subtitle="Six topologies, six trade-offs" color={C} />

          <p>
            One agent is the right answer 80% of the time. The other 20% is where multi-agent earns its complexity tax: when sub-tasks need different prompts, different models, different tool sets, or different memory scopes.
          </p>

          <MultiAgentTopologies />

          <ComparisonTable
            headers={['Pattern', 'Topology', 'Strength', 'When']}
            rows={[
              ['Single + tools', '1 agent, N tools', 'simplest, easy debug', '<80% of jobs'],
              ['Orchestrator', '1 supervisor → N workers', 'clear control flow', 'variable subtasks'],
              ['Pipeline', 'linear chain', 'deterministic', 'strict ordering'],
              ['Hierarchical', 'tree of supervisors', 'enterprise scale', 'mirrors org'],
              ['Swarm', 'peer handoffs', 'specialist routing', 'support / triage'],
              ['Mesh', 'all-to-all', 'max flexibility', 'research only'],
            ]}
          />

          <h3>OpenAI&apos;s &quot;handoff&quot; pattern</h3>
          <p>
            The OpenAI Agents SDK promotes <H tip="Handoff = an agent transferring full control of the conversation to another agent. Cleaner than subagent calls because the new agent inherits the full context. The OpenAI Agents SDK makes this a first-class operation." color={GREEN}>handoffs</H> as a first-class operation. Agent A says &quot;this is a billing question, hand off to BillingAgent&quot; and BillingAgent takes over the conversation. Cleaner than orchestrator calls in customer-facing flows.
          </p>

          <h3>The cost of going multi-agent</h3>
          <ul>
            <li><strong>Compounding error</strong>: if each agent succeeds 90%, four-in-a-pipeline succeeds ~66%.</li>
            <li><strong>Debug surface</strong>: instead of one trace you read four; <H tip="OpenTelemetry = open-source distributed tracing standard. The OTel-LLM extensions (2025+) standardise how agent runtimes emit spans for tool calls and model calls. Critical for multi-agent debugging." color={CYAN}>OTel</H> spans across agents are non-negotiable.</li>
            <li><strong>Cost</strong>: each agent has its own system prompt and tool catalogue; tokens add up.</li>
          </ul>

          <Callout type="warning">
            Most multi-agent designs in 2024 were premature. Single agent + good tools + good memory beats a four-agent swarm 70% of the time. Go multi-agent when you have an actual reason — different models, different scopes, or specialists that you can&apos;t merge into one prompt.
          </Callout>
        </section>
      )}

      {/* ─── 07. Framework Landscape ────────────────────────────────── */}
      {show('Framework Landscape') && (
        <section>
          <SectionHeader num="07" title="Framework Landscape" subtitle="Ten frameworks. Pick by your team and your model." color={C} />

          <p>
            Every framework is a different opinion about how much abstraction you want between you and the agent loop. Here&apos;s the May 2026 honest map:
          </p>

          <ComparisonTable
            headers={['Framework', 'Vendor', 'Style', 'Sweet spot']}
            rows={[
              ['LangGraph', 'LangChain', 'state-machine, checkpointed', 'production multi-agent'],
              ['OpenAI Agents SDK', 'OpenAI', 'handoffs, sessions, traces', 'OpenAI-native stacks'],
              ['Anthropic SDK + Computer Use', 'Anthropic', 'minimal abstraction', 'Claude-native, MCP'],
              ['CrewAI', 'CrewAI Inc', 'roles + tasks', 'fast prototyping'],
              ['Pydantic AI', 'Pydantic', 'typed, structured', 'data pipelines, FastAPI'],
              ['Microsoft Agent Framework', 'Microsoft', 'enterprise, Azure-tied', 'Azure AI Foundry'],
              ['Google ADK', 'Google', 'Vertex-native', 'Gemini stacks'],
              ['Mastra', 'Mastra Inc', 'TypeScript-native', 'edge / Vercel / web'],
              ['AutoGen', 'Microsoft Research', 'multi-agent conversations', 'research, exploration'],
              ['Swarms', 'open-source', 'director-worker', 'open + customisable'],
            ]}
          />

          <h3>Decision rules</h3>
          <ul>
            <li><strong>If you&apos;re a Python shop with multi-agent on the roadmap</strong> → LangGraph. Battle-tested, every pattern documented.</li>
            <li><strong>If you&apos;re OpenAI-native and want least friction</strong> → OpenAI Agents SDK. Handoffs, sessions, traces in the box.</li>
            <li><strong>If you&apos;re Claude-native and want minimal abstraction</strong> → Anthropic SDK + MCP servers directly.</li>
            <li><strong>If you need typed structured output as the primary deliverable</strong> → Pydantic AI.</li>
            <li><strong>If your stack is TypeScript and you need edge inference</strong> → Mastra.</li>
            <li><strong>If you&apos;re an Azure shop</strong> → Microsoft Agent Framework. It&apos;s the official path through Azure AI Foundry.</li>
            <li><strong>If you want to prototype an idea this weekend</strong> → CrewAI. You&apos;ll outgrow it; that&apos;s fine.</li>
          </ul>

          <Callout type="insight">
            The framework choice is reversible. The model choice is reversible. The MCP servers you build are <em>not</em> reversible — they&apos;re your durable artifact. Invest there first.
          </Callout>
        </section>
      )}

      {/* ─── 08. Production Stack ───────────────────────────────────── */}
      {show('Production Stack') && (
        <section>
          <SectionHeader num="08" title="Production Stack" subtitle="The seven-layer cake every team converges on" color={C} />

          <p>
            You can run an agent demo with two files. Running one in production needs the layers below it. By May 2026 every serious shop has converged on roughly the same structure.
          </p>

          <ProductionStack />

          <h3>Layer-by-layer</h3>
          <ul>
            <li><strong>Application</strong>: where the user touches the agent — UI, API, Slack bot, email reply, Zendesk widget.</li>
            <li><strong>Orchestration</strong>: the agent runtime (LangGraph / Agents SDK / Pydantic AI). Owns the loop.</li>
            <li><strong>Eval &amp; Obs</strong>: trace every turn, tool call, judge output. <H tip="LangSmith = LangChain's observability + eval platform. Native trace format for LangGraph runs. Most-used in production." color={AMBER}>LangSmith</H>, <H tip="Braintrust = eval-first observability platform. Strong dataset and judge tooling." color={AMBER}>Braintrust</H>, <H tip="Arize Phoenix / AX = open-source agent observability with OTel-native spans." color={AMBER}>Phoenix</H>, <H tip="Helicone = LLM observability + caching + routing. Particularly strong on prompt caching." color={AMBER}>Helicone</H>, <H tip="Galileo = agentic AI observability + eval platform. Used heavily in finance and healthcare." color={AMBER}>Galileo</H>, <H tip="Maxim = end-to-end LLM eval + simulation platform. Strong simulation harness." color={AMBER}>Maxim</H>, <H tip="Datadog LLM Observability = APM-style traces tied to standard Datadog dashboards. Default for shops already on Datadog." color={AMBER}>Datadog LLM</H>.</li>
            <li><strong>Tool layer</strong>: MCP servers + internal APIs + RAG + code-exec sandboxes (E2B, Modal, Daytona).</li>
            <li><strong>Memory</strong>: Redis (short), Postgres+pgvector (long), Mem0 / Zep / Letta (episodic).</li>
            <li><strong>Model routing</strong>: <H tip="LiteLLM = open-source unified API for 100+ LLM providers. Drop-in OpenAI-compatible. Standard in cost-sensitive deployments." color={EMERALD}>LiteLLM</H>, <H tip="OpenRouter = managed multi-provider gateway. Strong for fallback and load balancing." color={EMERALD}>OpenRouter</H>, <H tip="Portkey = LLM gateway with caching, retries, fallbacks, and routing rules." color={EMERALD}>Portkey</H>, Helicone.</li>
            <li><strong>Foundation models</strong>: Claude 4.7 / Sonnet 4.6 / GPT-5 / Gemini 2.5 / Llama 4 / DeepSeek V3.5.</li>
          </ul>

          <h3>Eval loop</h3>

          <EvalLoop />

          <p>
            The eval loop is what separates &quot;ship and pray&quot; from &quot;ship and improve&quot;:
          </p>
          <ol>
            <li><strong>Trace</strong> every turn (LangSmith, Braintrust). OTel-LLM spans are the standard.</li>
            <li><strong>Judge</strong>: <H tip="LLM-as-judge = use a strong LLM (often a different one from the production model) to grade an agent's output against a rubric. Cheaper than human review at scale. Calibrate against human labels weekly." color={AMBER}>LLM-as-judge</H> on every trace + human spot-check.</li>
            <li><strong>Dataset</strong>: failed traces + adversarial cases form a regression set.</li>
            <li><strong>CI eval</strong>: any prompt or model change runs through the dataset; regressions block deploy.</li>
          </ol>

          <Callout type="key">
            The eval pipeline is more work than the agent itself. Budget 40-60% of project time for it. Teams that don&apos;t do this ship faster initially and crash into a wall around month 3.
          </Callout>
        </section>
      )}

      {/* ─── 09. Cost & Latency ─────────────────────────────────────── */}
      {show('Cost & Latency') && (
        <section>
          <SectionHeader num="09" title="Cost & Latency" subtitle="Where the bill comes from and how to cut it 5–10×" color={C} />

          <p>
            Naive agents are 5–10× more expensive than they need to be. Every production team converges on the same compounding levers.
          </p>

          <CostFlow />

          <h3>Levers in priority order</h3>
          <ol>
            <li><strong><H tip="Prompt caching = providers cache the long, stable prefix of a prompt (system message + tool definitions) and replay results when the prefix matches. Anthropic, OpenAI, Google all support this. ~50–90% cost reduction on stable system prompts." color={AMBER}>Prompt caching</H></strong>. The 800-line system prompt, the tool catalogue, the 5K of static context — cache once, reuse on every turn. Cuts 50–90% off stable-prefix tokens.</li>
            <li><strong><H tip="Model routing = a cheap model handles easy turns (classification, formatting, retrieval planning); the expensive model handles hard turns (final reasoning, code generation). Aggregate ~3× cost reduction for the same quality." color={EMERALD}>Model routing</H></strong>. Route easy turns to Haiku 4.5; hard turns to Opus 4.7. ~3× aggregate savings.</li>
            <li><strong><H tip="Parallel tool calls = the model emits multiple tool calls in a single turn that the runtime dispatches concurrently. Wall-clock time drops without spending more tokens. Supported by Claude, GPT-5, Gemini." color={GREEN}>Parallel tool calls</H></strong>. Dispatch independent tool calls concurrently — wall-time drops, cost stays flat.</li>
            <li><strong><H tip="Streaming = the runtime starts processing tokens as the model emits them rather than waiting for completion. Cuts perceived latency dramatically; allows the UI to render token-by-token." color={CYAN}>Streaming</H></strong>. Start rendering before the model finishes. Time-to-first-token is the user-facing metric.</li>
            <li><strong>Speculative tool execution</strong>. If the next tool call is highly probable, dispatch it before the model finalises its plan; cancel if it changes its mind.</li>
          </ol>

          <FormulaSteps
            steps={[
              { label: 'Naive cost', formula: 'C_{naive} = T_{prompt} \\cdot p + T_{out} \\cdot p_o', explanation: 'Prompt tokens × input price + output tokens × output price.' },
              { label: 'With caching', formula: 'C = T_{stable} \\cdot p_{cache} + T_{var} \\cdot p + T_{out} \\cdot p_o', explanation: 'Cache price is ~10–25% of normal input price.' },
              { label: 'With routing', formula: 'C \\approx \\alpha C_{cheap} + (1-\\alpha) C_{expensive}', explanation: 'α typically 0.6–0.8 for easy turns.' },
              { label: 'Wall time', formula: 't_{wall} = \\max(t_{model},\\, \\sum t_{tool}^{(i)})_{parallel}', explanation: 'With parallel tool calls, wall time is dominated by the slowest concurrent path.' },
            ]}
          />

          <Callout type="insight">
            Latency is what users notice. Cost is what the CFO notices. Optimise both, in that order.
          </Callout>
        </section>
      )}

      {/* ─── 10. Security & Guardrails ──────────────────────────────── */}
      {show('Security & Guardrails') && (
        <section>
          <SectionHeader num="10" title="Security & Guardrails" subtitle="Five threat surfaces, layered mitigations" color={C} />

          <p>
            An agent with tools is an attack surface. Every input is potentially adversarial; every tool call is potentially destructive. By May 2026 the threat model is well understood and the mitigations are layered.
          </p>

          <SecurityThreats />

          <h3>Layered defence</h3>
          <ul>
            <li><strong>Input sanitisation</strong>: detect and tag user input vs. retrieved content vs. tool output. Never let retrieved content be treated as user instructions.</li>
            <li><strong>Output validation</strong>: structured outputs (JSON schema, Pydantic) catch the easy stuff. Regex layers catch known prompt-injection signatures.</li>
            <li><strong>Tool scopes</strong>: per-call OAuth-scope tokens, not global API keys. Approvals on destructive actions.</li>
            <li><strong>Sandboxing</strong>: anything that runs code goes in <H tip="E2B = ephemeral sandbox VMs for AI code execution. Container per task; CPU/GPU options." color={GREEN}>E2B</H>, <H tip="Modal = serverless GPU/CPU runtime. Used for sandboxed agent code exec." color={GREEN}>Modal</H>, or <H tip="Daytona = development environment sandboxing for agent runtimes." color={GREEN}>Daytona</H>. Network-jail by default.</li>
            <li><strong>Constitutional rules</strong>: model-side guardrails (Anthropic Constitutional AI, OpenAI moderation) catch jailbreak patterns before they reach tools.</li>
            <li><strong>Human-in-the-loop</strong>: for high-stakes actions (large refunds, deploys, sends to all-hands), the agent stops and asks.</li>
          </ul>

          <Callout type="warning">
            <strong>OWASP LLM Top 10</strong> (updated 2026) is the canonical reference. LLM01 prompt injection, LLM02 sensitive data leak, LLM06 excessive agency, LLM10 model theft are the ones you fight every week.
          </Callout>

          <h3>Audit trail</h3>
          <p>
            Every tool call is logged with: who triggered it, what scope, what arguments, what result, what model, what version. Compliance-heavy industries (finance, healthcare, gov) need this even on agents that don&apos;t touch sensitive data, because the regulators don&apos;t care.
          </p>
        </section>
      )}

      {/* ─── 11. Project: Customer Support Agent ───────────────────── */}
      {show('Project: Customer Support Agent') && (
        <section>
          <SectionHeader num="11" title="Project: Customer Support Agent" subtitle="Klarna / Intercom-class — supervisor + 4 specialists" color={GREEN} />

          <p>
            The most-shipped enterprise agent. Klarna&apos;s 2024 deployment handled 2.3M conversations in the first month. Intercom Fin, Zendesk AI, Decagon, Sierra all converged on similar architectures by 2026.
          </p>

          <CustomerSupportArch />

          <h3>Architecture</h3>
          <ul>
            <li><strong>Triage / router</strong> — intent + sentiment classifier. Either a small fast model (Haiku 4.5) or a fine-tuned classifier. Routes to specialist or escalates straight to human if sentiment is &quot;hostile&quot;.</li>
            <li><strong>4 specialists</strong> — billing, technical, account, escalation. Each has its own tool set, its own knowledge base, its own system prompt.</li>
            <li><strong>Memory</strong> — Postgres + pgvector for customer profile and ticket history; Mem0 for episodic memory of past resolutions.</li>
            <li><strong>Observability</strong> — every conversation traced via LangSmith / Datadog; LLM-as-judge runs on every trace, scoring for resolution, tone, accuracy.</li>
          </ul>

          <h3>Tech stack (May 2026)</h3>
          <ul>
            <li><strong>Orchestration</strong>: LangGraph (state machine with explicit handoff states).</li>
            <li><strong>Models</strong>: Sonnet 4.6 for specialists; Haiku 4.5 for triage; Opus 4.7 for escalation reasoning.</li>
            <li><strong>Tools</strong>: Stripe MCP, Auth API, KB RAG, Sentry MCP, Slack MCP, Zendesk MCP.</li>
            <li><strong>Memory</strong>: Postgres + pgvector + Mem0 (episodic).</li>
            <li><strong>Eval</strong>: LangSmith + custom dataset of 10K labelled past tickets.</li>
            <li><strong>Frontend</strong>: existing helpdesk widget, agent injects into the same chat thread.</li>
          </ul>

          <h3>Trade-offs</h3>
          <ul>
            <li><strong>Specialist vs. monolith</strong>. We chose 4 specialists because their tool sets are disjoint; one mega-prompt with everything tested worse on triage accuracy.</li>
            <li><strong>Auto-resolve threshold</strong>. Set too low → CSAT tanks; too high → cost balloons. We tune to 78% auto-resolve, accepting 22% escalate-to-human.</li>
            <li><strong>Memory granularity</strong>. Per-customer episodic memory is gold; it&apos;s also a privacy concern. Per-ticket short-term + per-customer long-term is the practical compromise.</li>
            <li><strong>Sycophancy risk</strong>. Untuned, the agent agrees with everything; refunds spike. We added an explicit refund-policy check before any monetary tool call.</li>
          </ul>

          <h3>Production results</h3>
          <ul>
            <li><strong>Auto-resolve</strong>: 78% (Q1 2026 baseline)</li>
            <li><strong>CSAT</strong>: 4.6 / 5 (matches human baseline of 4.5)</li>
            <li><strong>Median response</strong>: 12s vs 4 hours human</li>
            <li><strong>Cost / ticket</strong>: $0.22 vs $9 fully human</li>
            <li><strong>Escalation</strong>: 6% direct-to-human (sentiment); 16% via specialist</li>
          </ul>

          <Callout type="key">
            <strong>The hardest part isn&apos;t the agent</strong>. It&apos;s the eval pipeline that lets you ship prompt changes confidently, and the integration with the existing helpdesk so a human can take over without context loss. Plan for both before writing the agent.
          </Callout>
        </section>
      )}

      {/* ─── 12. Project: AI Software Engineer ─────────────────────── */}
      {show('Project: AI Software Engineer') && (
        <section>
          <SectionHeader num="12" title="Project: AI Software Engineer" subtitle="Devin-class — ticket → sandbox → PR → merge" color={GREEN} />

          <p>
            Cognition&apos;s Devin (general availability Q4 2025) was the proof of concept. By May 2026 the pattern is mainstream: GitHub Copilot Agent, Cursor Agent, Replit Agent, Sourcegraph Cody Agent, AWS Q Developer Agent, Sweep, Aider — all run versions of the same loop.
          </p>

          <SWEAgentArch />

          <h3>The loop</h3>
          <ol>
            <li><strong>Ingest ticket</strong>. GitHub issue, Linear card, Jira, Slack mention. Parse acceptance criteria.</li>
            <li><strong>Spawn ephemeral sandbox</strong>. Clean VM with the repo cloned, dependencies installed, tests runnable. <H tip="E2B / Modal / Daytona = three providers of fast-spawn ephemeral VMs designed for agent code execution. Container per task, CPU + GPU options, network jail by default." color={GREEN}>E2B / Modal / Daytona</H>.</li>
            <li><strong>Scope</strong>. Plan: which files to touch, which tests cover the change, what new tests to add.</li>
            <li><strong>Code</strong>. ReAct loop: read file, edit, run tests, observe failures, fix. Commit incrementally.</li>
            <li><strong>Verify</strong>. Run full test suite + lint + typecheck + LLM self-review. Block on failures.</li>
            <li><strong>PR</strong>. Open with description summarising changes. Iterate on review comments. Merge when approved (or auto-merge for trivial changes).</li>
          </ol>

          <h3>Tech stack (May 2026)</h3>
          <ul>
            <li><strong>Orchestration</strong>: custom (Cognition&apos;s in-house) or LangGraph. State machine with checkpointing for long-running tasks.</li>
            <li><strong>Models</strong>: Opus 4.7 for hard reasoning; Sonnet 4.6 for routine edits; Haiku 4.5 for routing.</li>
            <li><strong>Sandbox</strong>: E2B Code Interpreter or Modal sandbox. Per-task ephemeral VM; clean state; resource caps.</li>
            <li><strong>Tools</strong>: shell / git / file-edit / browser / pytest+jest+go-test / GitHub API / docs search.</li>
            <li><strong>Memory</strong>: per-repo long-term (past patches in this codebase) + per-developer episodic (PR review style).</li>
            <li><strong>Eval</strong>: <H tip="SWE-bench = standardised benchmark for autonomous software engineering. Real GitHub issues + repos; agent must produce a PR that passes hidden tests. Top scores in May 2026 are in the high 40%s." color={EMERALD}>SWE-bench</H> for general; internal regression set (replays of past tickets) for tracking.</li>
          </ul>

          <h3>Trade-offs</h3>
          <ul>
            <li><strong>Autonomy vs. oversight</strong>. Devin is autonomous end-to-end; Cursor is interactive (developer in the seat). Production teams in 2026 mostly run interactive — autonomous loops are great until the agent confidently ships a regression.</li>
            <li><strong>Long-running tasks</strong>. Some tickets take an hour. Checkpointing every 5 minutes (LangGraph state) lets you resume / fork / inspect mid-run.</li>
            <li><strong>Multi-repo</strong>. Single-repo agents work great. Cross-repo coordination (microservice change touching API and consumer) is still hard. <H tip="Git worktrees / submodules = standard ways to compose multi-repo workspaces. Production multi-repo agents typically clone all relevant repos into one sandbox." color={CYAN}>Git worktrees</H> + a manifest help.</li>
            <li><strong>Cost</strong>. Average task: 80 model turns × ~3K tokens = ~240K tokens × $0.01/1K avg = ~$2.40 / PR. Scales to ~$10K/month for a team of 10.</li>
          </ul>

          <h3>Production results (representative)</h3>
          <ul>
            <li><strong>SWE-bench Verified</strong>: 47% (Cognition Devin, May 2026)</li>
            <li><strong>PRs / week</strong>: 120 (mid-size team using GitHub Copilot Agent)</li>
            <li><strong>Merge rate</strong>: 68% (after human review)</li>
            <li><strong>Avg cycle</strong>: 14m from ticket to PR</li>
            <li><strong>Cost / PR</strong>: $2.40</li>
          </ul>

          <Callout type="warning">
            <strong>Where this fails</strong>. Architectural changes. Anything requiring product judgment. Bug fixes where the right answer is &quot;don&apos;t do this; redesign&quot;. The agent will dutifully fix the wrong thing. Keep humans in the architecture seat.
          </Callout>
        </section>
      )}

      {/* ─── 13. Project: Data Analyst Agent ───────────────────────── */}
      {show('Project: Data Analyst Agent') && (
        <section>
          <SectionHeader num="13" title="Project: Data Analyst Agent" subtitle="Hex / Mode / Snowflake-class — text2SQL + analyse + viz" color={GREEN} />

          <p>
            By May 2026 every BI vendor ships an agent. <H tip="Hex AI = AI assistant inside the Hex notebook product. Generates SQL, runs analyses, builds charts. One of the cleanest implementations of the agent-meets-notebook pattern." color={CYAN}>Hex AI</H>, <H tip="Mode AI = analytics agent inside Mode (acquired by ThoughtSpot in 2024). Strong at SQL generation against documented data models." color={CYAN}>Mode</H>, <H tip="Snowflake Cortex = Snowflake's AI layer with text2SQL agent + Cortex Analyst. Native to the warehouse." color={CYAN}>Snowflake Cortex Analyst</H>, <H tip="Databricks Genie = Databricks' AI/BI agent. text2SQL + viz + insight summary against Unity Catalog." color={CYAN}>Databricks Genie</H>, <H tip="Cube.dev semantic layer = open-source semantic layer that exposes a typed query API. Pairs well with text2SQL agents because it forces metric definitions to be canonical." color={CYAN}>Cube.dev</H>. The shape is consistent.
          </p>

          <DataAnalystArch />

          <h3>The pipeline</h3>
          <ol>
            <li><strong>Question</strong>. Natural-language question from a user (PM, exec, ops).</li>
            <li><strong>Plan</strong>. Decompose into sub-questions. &quot;Why did churn spike?&quot; → cohort retention + reason codes + comparison to baseline.</li>
            <li><strong>Query</strong>. <H tip="text2SQL = transform a natural-language question into SQL. The simplest agentic data task. Modern systems use semantic layers (Cube, dbt model layer) so the agent queries an abstracted layer rather than raw tables." color={CYAN}>text2SQL</H> against the data warehouse, mediated by a semantic layer (dbt model layer, Cube.dev) so the model never has to guess at column names.</li>
            <li><strong>Analyse</strong>. Pull rows into pandas / polars; run statistical tests; LLM-judge for &quot;is this conclusion supported by the data?&quot;</li>
            <li><strong>Visualise</strong>. Generate Plotly / Vega-Lite spec; render in the user&apos;s notebook or message thread.</li>
            <li><strong>Cite</strong>. Every claim references the rows that support it.</li>
          </ol>

          <h3>Tech stack (May 2026)</h3>
          <ul>
            <li><strong>Orchestration</strong>: LangGraph or Pydantic AI (this is one of Pydantic AI&apos;s sweet spots — typed structured outputs).</li>
            <li><strong>Models</strong>: Sonnet 4.6 for SQL gen; Opus 4.7 for analysis; Haiku 4.5 for chart spec.</li>
            <li><strong>Data sources</strong>: Snowflake / BigQuery / Postgres / Databricks via MCP servers.</li>
            <li><strong>Semantic layer</strong>: dbt model layer or Cube.dev. Critical: this is what stops the agent from inventing column names.</li>
            <li><strong>Sandbox</strong>: Modal or local Jupyter for the Python analysis step.</li>
            <li><strong>Eval</strong>: spider2.0 (text2SQL benchmark) + internal regression set of 5K validated business questions.</li>
          </ul>

          <h3>Trade-offs</h3>
          <ul>
            <li><strong>Raw tables vs. semantic layer</strong>. Raw tables: agent can answer anything, also gets metric definitions wrong constantly. Semantic layer: agent answers a smaller surface but every answer is &quot;correct by definition&quot;.</li>
            <li><strong>Deterministic vs. open-ended</strong>. For 80% of business questions there&apos;s an existing dashboard / metric. Route those to deterministic; route open-ended (&quot;why did X happen?&quot;) to the agent.</li>
            <li><strong>PII redaction</strong>. The agent can absolutely query a customer email. The output filter must drop them before the user sees them. Layered: SQL whitelist + output redaction + judge.</li>
            <li><strong>Cost guard</strong>. A naive query against a 100-billion-row table costs hundreds of dollars in compute. The agent must check estimated row count before executing.</li>
          </ul>

          <h3>Production results</h3>
          <ul>
            <li><strong>SQL accuracy</strong>: 92% on internal regression set</li>
            <li><strong>p50 latency</strong>: 8s (semantic layer hits cache)</li>
            <li><strong>Daily questions</strong>: 3.2K across a 1500-employee org</li>
            <li><strong>Cost / question</strong>: $0.18 (mostly query compute, not LLM)</li>
            <li><strong>Analyst hours saved</strong>: ~120 / week</li>
          </ul>

          <Callout type="insight">
            The agent is the smaller half of the project. The semantic layer (dbt models with documentation, metric definitions, certified columns) is what makes the agent reliable. Build the semantic layer first; the agent comes for free.
          </Callout>
        </section>
      )}

      {/* ─── 14. Failure Modes & Anti-patterns ─────────────────────── */}
      {show('Failure Modes & Anti-patterns') && (
        <section>
          <SectionHeader num="14" title="Failure Modes & Anti-patterns" subtitle="What breaks in production and what to do about it" color={C} />

          <FailureQuadrant />

          <h3>The four quadrants</h3>
          <ul>
            <li><strong>Tool failures</strong> — the model emits wrong arg types, calls a tool not bound, hits an API rate-limit. Mitigate with strict schemas, structured retries, and rate-limit-aware tools that return retry-after.</li>
            <li><strong>Planning drift</strong> — the model loops, gives up early, picks the wrong sub-task. Mitigate with explicit deadlines, max-step caps, and a &quot;reflect&quot; step every 10 turns.</li>
            <li><strong>Context rot</strong> — long conversations pollute working memory; the agent forgets earlier facts or invents new ones. Mitigate with periodic summarisation and explicit memory layers (section 4).</li>
            <li><strong>Cascading failure</strong> — a hallucinated tool result feeds the next decision; a bad handoff loses context. Mitigate with output validation on every tool call and explicit handoff payloads.</li>
          </ul>

          <h3>Anti-patterns we keep seeing</h3>
          <ul>
            <li><strong>Multi-agent because it sounds cool</strong>. Five agents instead of one because the demo looks impressive. Single agent + good tools wins 70% of the time.</li>
            <li><strong>System prompt as monolith</strong>. A 12K-token system prompt that mixes identity + tools + examples + style + output schema. Split it: identity in <code>system</code>, tools as <code>tools/list</code>, examples as <code>prompts</code>, schema as structured output.</li>
            <li><strong>No eval</strong>. Ship, hope, fix in production. By month 3 you can&apos;t change a comma without breaking something.</li>
            <li><strong>Ignoring latency</strong>. p50 looks great; p99 is 2 minutes because of one slow tool. Users notice the p99.</li>
            <li><strong>Trusting tool output</strong>. Tools can return garbage, errors, or attacker-controlled content. Validate every tool result before feeding back to the model.</li>
            <li><strong>Open-ended budgets</strong>. No max-step cap. Agent loops for 200 turns at $40/conversation. Always have a hard cap.</li>
          </ul>

          <Callout type="warning">
            The most common production outage in 2026 is &quot;a tool changed its response shape and we didn&apos;t catch it&quot;. Tool contracts deserve the same rigour as API contracts. Version them, test them, alert on schema drift.
          </Callout>
        </section>
      )}

      {/* ─── 15. Mental Models & Resources ─────────────────────────── */}
      {show('Mental Models & Resources') && (
        <section>
          <SectionHeader num="15" title="Mental Models & Resources" subtitle="Frames to carry, links to follow" color={C} />

          <MentalModel
            title="The agent is the loop, not the model"
            color={C}
            analogy="A pilot is not the plane. A doctor is not the body. The agent is the decision loop wrapped around a model — the model does inference, the loop turns inference into action and consequence."
            technical="Swap the model and the loop usually keeps working. Swap the loop architecture (single → multi-agent, ReAct → ToT) and behaviour changes fundamentally. Most engineering work is in the loop."
          />

          <MentalModel
            title="Tools are the durable artifact"
            color={GREEN}
            analogy="Apps come and go; the database schema lives forever. Frameworks come and go; the MCP servers you build are forever."
            technical="A well-designed MCP server outlives the framework calling it. Invest in idempotent, well-documented, versioned tools. Treat them like internal APIs because that's what they are."
          />

          <MentalModel
            title="Eval is the moat"
            color={AMBER}
            analogy="The team with a better eval pipeline ships faster and crashes less, even with a worse agent. It's like having tests in normal software development — boring infrastructure that compounds."
            technical="Trace → judge → dataset → CI. Run on every prompt change. Block on regression. The team that doesn't do this builds technical debt at compounding rates."
          />

          <MentalModel
            title="Single agent until you can't"
            color={BLUE}
            analogy="Microservices for the sake of microservices is a famous mistake. Multi-agent for the sake of multi-agent is the same mistake."
            technical="Multi-agent earns its complexity tax only when sub-tasks need disjoint tools, disjoint models, disjoint memory, or disjoint scopes. Otherwise: one agent with a longer prompt and good tools."
          />

          <MentalModel
            title="Cost is a deployment property, not a model property"
            color={EMERALD}
            analogy="Two restaurants serving the same dish at very different prices: ingredients and skill matter, but so does kitchen efficiency."
            technical="The same model can serve a query for $0.10 or $1.00 depending on prompt caching, model routing, parallel tool dispatch, and streaming. Cost optimisation is engineering work, not a procurement decision."
          />

          <h3>Resources</h3>
          <ul>
            <li><strong>MCP spec</strong>: <code>modelcontextprotocol.io</code></li>
            <li><strong>LangGraph docs</strong>: <code>langchain-ai.github.io/langgraph</code></li>
            <li><strong>OpenAI Agents SDK</strong>: <code>openai.github.io/openai-agents-python</code></li>
            <li><strong>Anthropic Computer Use</strong>: <code>anthropic.com/news/3-5-models-and-computer-use</code></li>
            <li><strong>OWASP LLM Top 10 (2026)</strong>: <code>owasp.org/www-project-top-10-for-large-language-model-applications</code></li>
            <li><strong>SWE-bench</strong>: <code>swebench.com</code></li>
            <li><strong>Awesome MCP servers</strong>: <code>github.com/modelcontextprotocol/servers</code></li>
            <li><strong>This module&apos;s research vault</strong>: <code>vault/research/agentic-ai-2026/</code> (16 files, May 2026)</li>
          </ul>

          <Callout type="key">
            What you should be able to do after reading this module: open a whiteboard, design an enterprise agent end-to-end, name the framework you&apos;d pick and why, list the three biggest trade-offs, and describe the eval pipeline you&apos;d build. If you can do that for any of the three projects (support / SWE / data analyst), you&apos;re production-ready.
          </Callout>
        </section>
      )}
    </>
  );
}
