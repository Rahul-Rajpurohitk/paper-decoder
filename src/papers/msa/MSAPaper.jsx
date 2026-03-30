import SectionHeader from '../../components/SectionHeader';
import FormulaBlock from '../../components/FormulaBlock';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import StatBar from '../../components/StatBar';
import ConceptCard from '../../components/ConceptCard';
import StepFlow from '../../components/StepFlow';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import Diagram from '../../components/Diagram';
import Prose from '../../components/Prose';
import H from '../../components/HoverTerm';

const CYAN = '#06b6d4';
const ORANGE = '#f97316';
const GREEN = '#22c55e';
const PURPLE = '#a855f7';

/* ─── SVG helper constants ────────────────────────────────────── */
const ARROW = (x1, y1, x2, y2, color = CYAN, dashed = false) => (
  <g key={`a-${x1}-${y1}-${x2}-${y2}`}>
    <defs>
      <marker
        id={`ah-${color.replace('#', '')}`}
        markerWidth="8"
        markerHeight="6"
        refX="8"
        refY="3"
        orient="auto"
      >
        <polygon points="0 0, 8 3, 0 6" fill={color} />
      </marker>
    </defs>
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth="2"
      strokeDasharray={dashed ? '6 4' : 'none'}
      markerEnd={`url(#ah-${color.replace('#', '')})`}
    />
  </g>
);

const BOX = (x, y, w, h, label, fill, textColor = '#fff', fontSize = 13, rx = 8) => (
  <g key={`b-${label}-${x}-${y}`}>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} opacity="0.9" />
    <text
      x={x + w / 2} y={y + h / 2 + fontSize * 0.35}
      textAnchor="middle"
      fill={textColor}
      fontSize={fontSize}
      fontWeight="600"
      fontFamily="Inter, system-ui, sans-serif"
    >
      {label}
    </text>
  </g>
);

const LABEL = (x, y, text, color = '#94a3b8', size = 11) => (
  <text
    key={`l-${text}-${x}-${y}`}
    x={x} y={y}
    textAnchor="middle"
    fill={color}
    fontSize={size}
    fontFamily="Inter, system-ui, sans-serif"
  >
    {text}
  </text>
);

export default function MSAPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — THE CORE PROBLEM
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="The Core Problem"
        subtitle="Why can't LLMs remember like humans?"
        color={CYAN}
      />

      <Prose>
        <p>
          Think about your own memory for a moment. Over a lifetime, you accumulate roughly
          <strong> 300 million <H tip="Token = the smallest unit of text a language model processes. Roughly 1 token ≈ 0.75 words in English. 'hamburger' might be split into 'ham' + 'burger' = 2 tokens." color={CYAN}>tokens</H></strong> of experience — conversations, books, observations,
          everything. You can recall a specific detail from years ago if the right cue triggers it.
          Your brain does not re-read every memory when answering a question; it <em>routes</em> to
          the relevant ones instantly.
        </p>
        <p>
          Now look at the best <H tip="Large Language Model — a neural network trained on massive text corpora to predict the next token. Examples: GPT-4, Claude, Llama. The 'context window' is the maximum number of tokens it can process at once." color={CYAN}>LLMs</H> available today. Even frontier models cap out around
          <strong> 1 million tokens</strong> of <H tip="Context window = the maximum number of tokens a model can 'see' at once. Think of it as the model's working memory — everything outside the window is invisible." color={CYAN}>context</H>. That is 0.3% of what a human can hold.
          And it gets worse: standard <H tip="Self-attention = the core operation in Transformers. Every token computes a weighted sum over all other tokens. The weight matrix is N×N (where N = sequence length), so memory and compute grow quadratically. This is why long contexts are so expensive." color={ORANGE}>self-attention</H> has <code>O(N²)</code> complexity, so
          doubling the context length quadruples the compute. At 100M tokens, <H tip="Dense attention = the standard approach where every token attends to every other token. No tokens are skipped. This gives perfect information flow but O(N²) cost. MSA replaces this with sparse attention — attending only to the most relevant chunks." color={ORANGE}>dense attention</H>{' '}
          would need <strong>10,000 times</strong> the compute of a 1M context — completely infeasible.
        </p>
        <p>
          Previous approaches each hit a wall:
        </p>
      </Prose>

      <ComparisonTable
        headers={['Approach', 'Storage', 'Complexity', 'Limitation']}
        rows={[
          ['Parameter-Based (fine-tuning)', 'In weights', 'O(1) inference', 'Catastrophic forgetting; can\'t add new memories without retraining'],
          ['External Storage (RAG)', 'Vector DB', 'O(L \u00d7 G)', 'Retriever is separate from the model \u2014 no end-to-end gradient flow'],
          ['Latent State (MemoryFormer)', 'Hidden state', 'O(N)', 'Compresses aggressively \u2014 loses fine-grained details'],
          ['MSA (this paper)', 'K/V cache', 'O(N/P \u00d7 k)', 'End-to-end attention with learned routing \u2014 scales to 100M tokens'],
        ]}
        caption="Four paradigms for giving LLMs long-term memory"
      />

      <StatBar
        stats={[
          { value: '~300M', unit: ' tok', label: 'Human lifetime memory', color: ORANGE },
          { value: '1M', unit: ' tok', label: 'Best LLM context (2025)', color: '#ef4444' },
          { value: '100M', unit: ' tok', label: 'MSA achieved context', color: CYAN },
          { value: '300×', unit: '', label: 'Gap closed vs dense', color: GREEN },
        ]}
      />

      <MentalModel
        title="The Library Analogy"
        analogy="Imagine a library with millions of books. Dense attention is like reading EVERY book cover-to-cover before answering a question. RAG is like hiring a separate librarian who uses an index card catalog — fast, but the librarian never actually reads the books, so they sometimes grab the wrong ones. MSA is like being a librarian who has personally read every book AND built a neural catalog in their own mind — they can instantly sense which shelf holds the answer, walk there, and read just those pages."
        technical="MSA achieves this by encoding all documents into KV caches (reading every book), building lightweight routing representations (the neural catalog), and then using learned sparse attention to select only the top-k relevant document chunks at inference time (walking to the right shelf)."
        color={CYAN}
      />

      <Callout type="key">
        The fundamental insight of MSA: you can have BOTH end-to-end attention quality AND
        sub-quadratic scaling — by learning <strong>which</strong> chunks of memory to attend to,
        rather than attending to everything. The routing itself is part of the attention mechanism,
        not a separate retrieval system.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="Architecture — Sparse Attention"
        subtitle="Dual projectors, chunk pooling, and doc-wise RoPE"
        color={CYAN}
      />

      <Prose>
        <p>
          The MSA architecture sits inside a standard <H tip="Transformer decoder = the autoregressive half of the Transformer architecture. It generates tokens one at a time, each attending only to previous tokens (causal masking). GPT, Llama, and most modern LLMs are decoder-only." color={CYAN}>Transformer decoder</H>. The key modification is
          that each attention layer has been upgraded with <strong>three innovations</strong>:
          (1) dual content/routing projectors, (2) chunk-level mean pooling for routing, and
          (3) document-wise <H tip="RoPE (Rotary Position Embedding) = a method for encoding token positions by rotating the query and key vectors. The rotation angle depends on position, so the dot product between Q and K naturally captures relative distance." color={PURPLE}>RoPE</H> to eliminate position-dependent extrapolation failure. Let us
          walk through each, starting with the full picture.
        </p>
      </Prose>

      {/* ── MSA Architecture Overview SVG ── */}
      <Diagram caption={<><strong>MSA Architecture</strong> — Full pipeline from document corpus to sparse attention output. Cyan = content path, Orange = routing path, Green = output path.</>}>
        <svg viewBox="0 0 960 600" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="g-cyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0e7490" /><stop offset="100%" stopColor="#164e63" /></linearGradient>
            <linearGradient id="g-orange" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c2410c" /><stop offset="100%" stopColor="#7c2d12" /></linearGradient>
            <linearGradient id="g-green" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#15803d" /><stop offset="100%" stopColor="#14532d" /></linearGradient>
            <linearGradient id="g-dark" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0f172a" /></linearGradient>
            <filter id="glow-c"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="glow-o"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <marker id="ah-c" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill={CYAN} /></marker>
            <marker id="ah-o" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill={ORANGE} /></marker>
            <marker id="ah-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill={GREEN} /></marker>
            <marker id="ah-gray" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6Z" fill="#64748b" /></marker>
          </defs>

          {/* ── ZONE 1: Document Store ── */}
          <rect x="15" y="15" width="170" height="570" rx="14" fill="url(#g-dark)" stroke="#334155" strokeWidth="1" />
          <text x="100" y="42" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">DOCUMENT STORE</text>

          {[['Doc 1', 60], ['Doc 2', 108], ['Doc 3', 156], ['...', 200], ['Doc N', 228]].map(([t, y]) => (
            <g key={t}>
              <rect x="32" y={y} width="136" height={t === '...' ? 20 : 38} rx="8" fill={t === '...' ? 'none' : '#0c4a6e'} stroke={t === '...' ? 'none' : '#155e75'} strokeWidth="1" />
              <text x="100" y={y + (t === '...' ? 14 : 24)} textAnchor="middle" fill={t === '...' ? '#475569' : '#7dd3fc'} fontSize={t === '...' ? 16 : 12} fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{t}</text>
            </g>
          ))}

          {/* Doc-wise RoPE badge */}
          <rect x="28" y="290" width="144" height="72" rx="10" fill="#0c4a6e" stroke={CYAN} strokeWidth="1" strokeDasharray="4 2" opacity="0.8" />
          <text x="100" y="312" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Doc-wise RoPE</text>
          <text x="100" y="330" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Each doc: position 0 → G</text>
          <text x="100" y="346" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="Inter, system-ui, sans-serif">No cross-doc leakage</text>

          {/* Flow arrow docs → projectors */}
          <line x1="185" y1="180" x2="220" y2="180" stroke={CYAN} strokeWidth="2" markerEnd="url(#ah-c)" />

          {/* ── ZONE 2: Dual Projectors ── */}
          <rect x="225" y="15" width="210" height="570" rx="14" fill="url(#g-dark)" stroke="#334155" strokeWidth="1" />
          <text x="330" y="42" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">DUAL PROJECTORS</text>

          {/* H_i */}
          <rect x="245" y="60" width="170" height="40" rx="8" fill="#374151" stroke="#4b5563" strokeWidth="1" />
          <text x="330" y="85" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">H_i (hidden states)</text>

          {/* Split arrows */}
          <line x1="295" y1="100" x2="295" y2="125" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ah-c)" />
          <line x1="375" y1="100" x2="375" y2="125" stroke={ORANGE} strokeWidth="1.5" markerEnd="url(#ah-o)" />

          {/* Content projectors */}
          <rect x="245" y="130" width="100" height="36" rx="8" fill="url(#g-cyan)" stroke="#0e7490" strokeWidth="1" />
          <text x="295" y="153" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">W_K (Key)</text>
          <rect x="245" y="178" width="100" height="36" rx="8" fill="url(#g-cyan)" stroke="#0e7490" strokeWidth="1" />
          <text x="295" y="201" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">W_V (Value)</text>
          <text x="295" y="232" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">CONTENT</text>

          {/* Routing projector */}
          <rect x="355" y="130" width="70" height="36" rx="8" fill="url(#g-orange)" stroke="#c2410c" strokeWidth="1" />
          <text x="390" y="153" textAnchor="middle" fill="#fed7aa" fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">W_KR</text>
          <text x="390" y="184" textAnchor="middle" fill={ORANGE} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">ROUTING</text>

          {/* Output vectors */}
          <line x1="295" y1="214" x2="295" y2="250" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ah-c)" />
          <rect x="250" y="255" width="90" height="36" rx="8" fill="#0e7490" stroke="#06b6d4" strokeWidth="1.5" filter="url(#glow-c)" />
          <text x="295" y="278" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">K_i , V_i</text>

          <line x1="390" y1="166" x2="390" y2="250" stroke={ORANGE} strokeWidth="1.5" markerEnd="url(#ah-o)" />
          <rect x="358" y="255" width="64" height="36" rx="8" fill="#c2410c" stroke="#fb923c" strokeWidth="1.5" filter="url(#glow-o)" />
          <text x="390" y="278" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">K^R_i</text>

          {/* Chunk Pooling */}
          <line x1="295" y1="291" x2="295" y2="320" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ah-c)" />
          <line x1="390" y1="291" x2="390" y2="320" stroke={ORANGE} strokeWidth="1.5" markerEnd="url(#ah-o)" />
          <rect x="250" y="325" width="175" height="44" rx="10" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" />
          <text x="337" y="347" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Chunk Mean Pool</text>
          <text x="337" y="363" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">P = 64 tokens per chunk</text>

          {/* Compressed KV */}
          <line x1="295" y1="369" x2="280" y2="400" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ah-c)" />
          <line x1="370" y1="369" x2="385" y2="400" stroke={ORANGE} strokeWidth="1.5" markerEnd="url(#ah-o)" />
          <rect x="245" y="405" width="80" height="34" rx="8" fill="#0e7490" stroke="#06b6d4" strokeWidth="1" />
          <text x="285" y="426" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">K̄_ij</text>
          <rect x="340" y="405" width="80" height="34" rx="8" fill="#c2410c" stroke="#fb923c" strokeWidth="1" />
          <text x="380" y="426" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">K̄^R_ij</text>

          <rect x="265" y="455" width="130" height="24" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="330" y="471" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">64× compression</text>

          {/* ── ZONE 3: Route & Select ── */}
          <rect x="450" y="15" width="210" height="570" rx="14" fill="url(#g-dark)" stroke="#334155" strokeWidth="1" />
          <text x="555" y="42" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">ROUTE & SELECT</text>

          {/* Query routing key */}
          <rect x="475" y="65" width="160" height="38" rx="8" fill="url(#g-orange)" stroke="#fb923c" strokeWidth="1.5" />
          <text x="555" y="89" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Q^R (routing query)</text>

          {/* Arrow down to scoring */}
          <line x1="555" y1="103" x2="555" y2="130" stroke={ORANGE} strokeWidth="1.5" markerEnd="url(#ah-o)" />

          {/* Relevance scoring */}
          <rect x="475" y="135" width="160" height="50" rx="10" fill="#431407" stroke="#fb923c" strokeWidth="1.5" />
          <text x="555" y="157" textAnchor="middle" fill="#fb923c" fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Relevance Score</text>
          <text x="555" y="176" textAnchor="middle" fill="#fdba74" fontSize="9" fontFamily="Inter, system-ui, sans-serif">cos(Q^R, K̄^R_ij) per chunk</text>

          {/* Routing key feed-in from zone 2 */}
          <path d="M420,422 C445,422 450,200 475,165" fill="none" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#ah-o)" />

          {/* Arrow to top-k */}
          <line x1="555" y1="185" x2="555" y2="215" stroke={ORANGE} strokeWidth="1.5" markerEnd="url(#ah-o)" />

          {/* Top-k selection */}
          <rect x="475" y="220" width="160" height="40" rx="8" fill="url(#g-orange)" stroke="#c2410c" strokeWidth="1" />
          <text x="555" y="245" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Top-k Selection</text>
          <text x="555" y="278" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Keep k=8 most relevant chunks</text>

          {/* Arrow to selected indices */}
          <line x1="555" y1="260" x2="555" y2="295" stroke={GREEN} strokeWidth="2" markerEnd="url(#ah-g)" />

          {/* Selected indices */}
          <rect x="480" y="300" width="150" height="38" rx="8" fill="url(#g-green)" stroke="#22c55e" strokeWidth="1.5" filter="url(#glow-c)" />
          <text x="555" y="324" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Selected Indices</text>

          {/* Fetch full KV from zone 2 */}
          <path d="M250,291 L250,530 L450,530 L450,418 L480,418" fill="none" stroke={CYAN} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#ah-c)" />
          <rect x="480" y="380" width="150" height="38" rx="8" fill="#164e63" stroke={CYAN} strokeWidth="1" />
          <text x="555" y="404" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Fetch Full K_i, V_i</text>
          <text x="555" y="436" textAnchor="middle" fill="#475569" fontSize="9" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">only selected chunks</text>

          {/* ── ZONE 4: Sparse Attention ── */}
          <rect x="680" y="15" width="265" height="570" rx="14" fill="url(#g-dark)" stroke="#334155" strokeWidth="1" />
          <text x="812" y="42" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">SPARSE ATTENTION</text>

          {/* Query content */}
          <rect x="710" y="65" width="205" height="38" rx="8" fill="url(#g-cyan)" stroke={CYAN} strokeWidth="1.5" />
          <text x="812" y="89" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Q (query content vectors)</text>

          {/* Feed selected KV into attention */}
          <line x1="630" y1="399" x2="710" y2="200" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ah-c)" />
          <line x1="812" y1="103" x2="812" y2="145" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ah-c)" />

          {/* Attention block */}
          <rect x="710" y="150" width="205" height="80" rx="12" fill="#0c4a6e" stroke="#06b6d4" strokeWidth="2" />
          <text x="812" y="178" textAnchor="middle" fill="#e0f2fe" fontSize="15" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Attention</text>
          <text x="812" y="198" textAnchor="middle" fill="#bae6fd" fontSize="11" fontFamily="Inter, system-ui, sans-serif">softmax(Q · Kᵀ / √d) · V</text>
          <text x="812" y="218" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="Inter, system-ui, sans-serif">over selected chunks only</text>

          {/* Output */}
          <line x1="812" y1="230" x2="812" y2="270" stroke={GREEN} strokeWidth="2" markerEnd="url(#ah-g)" />
          <rect x="735" y="275" width="155" height="50" rx="10" fill="url(#g-green)" stroke="#22c55e" strokeWidth="2" />
          <text x="812" y="305" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Output</text>

          {/* Complexity card */}
          <rect x="710" y="365" width="205" height="105" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="812" y="390" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Complexity</text>
          <line x1="730" y1="400" x2="895" y2="400" stroke="#1e293b" strokeWidth="1" />
          <text x="812" y="420" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Route:  O(N / P)</text>
          <text x="812" y="440" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Attend: O(k · P)</text>
          <text x="812" y="460" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">vs Dense: O(N²)</text>

          {/* ── Flow labels between zones ── */}
          <text x="206" y="172" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Inter, system-ui, sans-serif">encode</text>
          <text x="440" y="170" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Inter, system-ui, sans-serif" transform="rotate(-70, 440, 170)">K̄^R feed</text>
          <text x="665" y="290" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Inter, system-ui, sans-serif" transform="rotate(-60, 665, 290)">selected KV</text>
        </svg>
      </Diagram>

      {/* ── Dual Projectors ── */}
      <ConceptCard title="Dual Projectors: Content vs Routing" color={CYAN} defaultOpen={true}>
        <Prose>
          <p>
            Here is the central design question: why have <strong>two separate</strong> sets of
            <H tip="Projection = multiplying a vector by a learned weight matrix to transform it into a new representation optimized for a specific purpose." color={CYAN}> projections</H>?
            Why not just use the same K vectors for both routing and attention?
          </p>
          <p>
            Think of it like this: <H tip="Routing = deciding WHICH documents are relevant to the query. It's a coarse-grained selection problem — like choosing which books to pull off the shelf." color={ORANGE}>routing</H> asks <em>"Is this document about the right topic?"</em>{' '}
            while <H tip="Content attention = the fine-grained computation over selected tokens. Once you've pulled the right books, this is actually reading them word-by-word." color={CYAN}>content attention</H> asks <em>"What specific information does this token contain?"</em>{' '}
            These are fundamentally different questions. The routing projector needs to capture
            high-level <H tip="Semantic similarity = how close two pieces of text are in meaning, regardless of the exact words used. 'Happy' and 'joyful' are semantically similar even though they share no characters." color={ORANGE}>semantic similarity</H> — broad strokes about document relevance.
            The content projector needs <H tip="Token-level detail = information about individual words/subwords. While routing cares about 'this document is about biology', content attention cares about 'this specific token says the protein folds at position 42'." color={CYAN}>fine-grained token-level detail</H> for actual computation.
          </p>
          <p>
            If you forced a single set of K vectors to serve both purposes, you would get a
            compromise that does neither well. The paper shows this empirically: removing the
            dedicated routing projector drops performance significantly.
          </p>
        </Prose>
      </ConceptCard>

      <FormulaSteps
        label="Dual Projectors — Building Up Step by Step"
        color={CYAN}
        steps={[
          {
            note: 'Start with the hidden states H_i — the raw token representations for all tokens in document i, produced by the Transformer backbone. These contain rich information but are not specialized for any task.',
            math: 'H_i \\in \\mathbb{R}^{G \\times d} \\quad \\text{(G tokens per doc, d = model dimension)}',
          },
          {
            note: 'Project into Content space: multiply by learned matrices W_K and W_V to create Key and Value vectors. These are optimized for the final attention computation — they carry the actual information the model will read.',
            math: 'K_i = H_i \\cdot W_K, \\quad V_i = H_i \\cdot W_V \\quad \\text{(content branch)}',
          },
          {
            note: 'Separately project into Routing space: a different learned matrix W_KR creates routing keys. These are optimized ONLY for deciding which documents are relevant — they never participate in the final attention.',
            math: 'K^R_i = H_i \\cdot W_{KR} \\quad \\text{(routing branch — separate parameters)}',
          },
          {
            note: 'The query also gets a routing projection. When a new query arrives, its routing query Q^R is compared against all routing keys K^R to find relevant documents. Its content query Q is used only for the final attention over selected documents.',
            math: 'Q^R_q = H_q \\cdot W_{QR} \\quad \\text{(routing query)}, \\quad Q_q = H_q \\cdot W_Q \\quad \\text{(content query)}',
          },
        ]}
        symbols={[
          { symbol: 'H_i', meaning: 'Hidden states of document i — raw Transformer output for all G tokens' },
          { symbol: 'W_K, W_V', meaning: 'Content projection matrices — learned for fine-grained attention' },
          { symbol: 'W_KR, W_QR', meaning: 'Routing projection matrices — learned for document relevance scoring' },
          { symbol: 'K_i, V_i', meaning: 'Content Key/Value vectors — used in final sparse attention' },
          { symbol: 'K^R_i', meaning: 'Routing keys — used ONLY for relevance scoring, never in attention' },
          { symbol: 'G', meaning: 'Tokens per document (up to 64K in training)' },
          { symbol: 'd', meaning: 'Model dimension (embedding size)' },
        ]}
      />

      <Callout type="insight">
        Why does separation matter mathematically? The routing loss (L_aux) and the language modeling
        loss (L_LM) push weights in <strong>different directions</strong>. L_aux wants W_KR to learn
        coarse document-level features. L_LM wants W_K to learn fine token-level features. Sharing
        parameters would create a tug-of-war. Separation lets each optimize freely — and the paper shows
        this is the difference between 95% and 76% NIAH accuracy.
      </Callout>

      {/* ── Relevance Scoring ── */}
      <ConceptCard title="Relevance Scoring: How MSA Picks the Right Chunks" color={ORANGE} defaultOpen={true}>
        <Prose>
          <p>
            Once we have routing keys K^R for every chunk in memory and a routing query Q^R for
            the current input, we need to score how relevant each chunk is. The scoring formula is
            carefully designed to be both effective and cheap to compute.
          </p>
        </Prose>

        <FormulaSteps
          label="Relevance Scoring — Building Up Step by Step"
          color={ORANGE}
          steps={[
            {
              note: 'For each query token t and each stored chunk (j of document i), compute cosine similarity between the routing query and the chunk\'s mean-pooled routing key. This measures "does this query token care about this chunk?"',
              math: '\\text{sim}_{t,h,ij} = \\cos(Q^R_{t,h}, \\bar{K}^R_{ij,h})',
            },
            {
              note: 'Average across all attention heads h. This creates consensus — ALL heads must agree a chunk is relevant, preventing any single head from dominating the routing decision.',
              math: '\\text{HeadAvg}_{t,ij} = \\text{mean}_{h \\in \\text{heads}} \\; \\text{sim}_{t,h,ij}',
            },
            {
              note: 'Take the maximum across all query tokens t. The logic: if ANY single token in your query needs information from this chunk, it should be selected. This makes routing inclusive — you\'d rather fetch one extra chunk than miss a critical one.',
              math: '\\text{Score}_{ij} = \\max_{t \\in \\text{tokens}} \\; \\text{HeadAvg}_{t,ij}',
            },
            {
              note: 'Finally, rank all chunks by their scores and keep only the top-k (default k=8). These are the chunks that will be decompressed and used in the final attention computation.',
              math: 'I = \\text{Top-}k(\\{\\text{Score}_{ij}\\}_{i,j}, \\; k=8)',
            },
          ]}
          symbols={[
            { symbol: 'Q^R_t', meaning: 'Routing query vector at token position t — "what am I looking for?"' },
            { symbol: 'K̄^R_ij', meaning: 'Mean-pooled routing key for chunk j of document i — "what does this chunk contain?"' },
            { symbol: 'cos(·,·)', meaning: 'Cosine similarity — measures directional alignment, ignoring magnitude' },
            { symbol: 'mean_h', meaning: 'Average across heads = consensus (conservative — all heads must agree)' },
            { symbol: 'max_t', meaning: 'Maximum across tokens = inclusion (liberal — any token\'s need is enough)' },
            { symbol: 'k = 8', meaning: 'Number of chunks selected per layer — balances quality vs compute' },
          ]}
        />

        <Callout type="insight">
          The <strong>mean-then-max asymmetry</strong> is psychologically intuitive. Imagine you are assembling a team for a project.
          <strong> Mean across heads</strong> is like requiring consensus from multiple evaluators — reduces noise, prevents a single
          biased evaluator from including irrelevant candidates. <strong>Max across tokens</strong> is like saying "if any department
          needs this person, hire them" — you would rather have one extra team member than miss someone critical. The formula encodes
          this cautious-selection + generous-inclusion philosophy in pure math.
        </Callout>
      </ConceptCard>

      {/* ── Chunk Compression ── */}
      <ConceptCard title="Chunk Pooling: 64x Compression for Routing" color={CYAN} defaultOpen={true}>
        <Prose>
          <p>
            Here is the trick that makes routing over 100M tokens feasible. Instead of computing
            <H tip="Cosine similarity = dot product of two unit vectors. Measures how aligned they are in direction (1 = identical direction, 0 = orthogonal, -1 = opposite). Ignores magnitude, only cares about angle." color={CYAN}>cosine similarity</H> against every single token's routing key (which would be <H tip="O(N) means the computation scales linearly with N. For 100M tokens, that's 100M cosine similarity computations PER query token — about 10^8 operations." color={ORANGE}>O(N)</H> per
            query token), MSA groups tokens into <strong>chunks of P=64</strong> and <H tip="Mean-pooling = averaging a group of vectors into a single representative vector. Like summarizing a paragraph into one sentence — you lose detail but capture the gist." color={CYAN}>mean-pools</H> the routing keys within each chunk.
          </p>
          <p>
            This reduces the routing computation by <strong>64x</strong>. For 100M tokens, that
            means routing over ~1.56M <H tip="Each chunk representation is a single d-dimensional vector that summarizes the content of 64 consecutive tokens. Think of it as a zip code for a neighborhood — doesn't tell you every address, but tells you the general area." color={CYAN}>chunk representations</H> instead of 100M token representations.
            The content K and V vectors are <strong>NOT pooled</strong> — they are stored at full resolution and
            only fetched for the selected chunks.
          </p>
        </Prose>

        <FormulaSteps
          label="Chunk Compression — Building Up Step by Step"
          color={CYAN}
          steps={[
            {
              note: 'Take all routing key vectors K^R for document i and divide them into consecutive chunks of P=64 tokens each.',
              math: '\\text{Chunk}_j = \\{K^R_{i,(j-1)P+1}, \\; K^R_{i,(j-1)P+2}, \\; \\ldots, \\; K^R_{i,jP}\\} \\quad \\text{(64 vectors per chunk)}',
            },
            {
              note: 'Average the 64 routing keys within each chunk into a single representative vector. This is the "summary" of what that chunk of 64 tokens contains.',
              math: '\\bar{K}^R_{ij} = \\frac{1}{P} \\sum_{p=1}^{P} K^R_{i,(j-1)P+p}',
            },
            {
              note: 'Result: 100M tokens → ~1.56M chunk vectors. Routing now compares against 1.56M vectors instead of 100M — a 64x reduction that makes the entire system feasible.',
              math: '\\text{100M tokens} \\xrightarrow{\\div 64} \\text{1.56M chunks} \\quad \\text{(GPU-resident for fast routing)}',
            },
          ]}
          symbols={[
            { symbol: 'K̄^R_ij', meaning: 'Mean-pooled routing key for chunk j of document i — one vector per 64 tokens' },
            { symbol: 'P = 64', meaning: 'Chunk size — sweet spot between accuracy (smaller) and speed (larger)' },
            { symbol: '1.56M', meaning: '100M tokens / 64 tokens per chunk ≈ 1.56M chunk representations' },
          ]}
        />

        <Callout type="math">
          Why P=64 specifically? The paper ablates this: P=32 gives slightly better accuracy but
          2x more routing overhead. P=128 saves compute but loses fine-grained relevance
          discrimination. P=64 hits the sweet spot — routing overhead is under 2% of total
          inference cost while maintaining 99%+ recall on needle-in-a-haystack benchmarks.
        </Callout>
      </ConceptCard>

      {/* ── Doc-wise RoPE ── */}
      <ConceptCard title="Doc-wise RoPE: Breaking the Position Barrier" color={PURPLE} defaultOpen={true}>
        <Prose>
          <p>
            Standard RoPE (<H tip="Rotary Position Embedding — encodes token position by applying a rotation matrix to Q and K vectors. The rotation angle is proportional to position, so nearby tokens have similar rotations and distant tokens have different rotations." color={PURPLE}>Rotary Position Embedding</H>) assigns each token an absolute position
            within the full sequence. When you train with sequences up to 32K tokens but then try
            to stuff 100M tokens into the context, positions 32,001 through 100,000,000 have
            <strong>never been seen during training</strong>. The model <H tip="Extrapolation failure = when a model encounters input values outside its training distribution. For RoPE, this means position indices the model never learned rotations for — the attention patterns become incoherent." color="#ef4444">falls apart</H>.
          </p>
          <p>
            MSA's solution is elegant: <strong>reset the position counter at the start of each
            document</strong>. If each document is, say, 8K tokens, then positions only ever range
            from 0 to 8,191 — well within the training distribution. The model can extrapolate to
            unlimited documents because the <em>per-document</em> position range stays bounded.
          </p>
          <p>
            But wait — doesn't removing inter-document position information lose something? Yes,
            but it loses the <em>right</em> thing. When you're searching through memory, the
            order in which you read documents years ago doesn't help you find facts. What matters
            is <em>content</em> relevance, not <em>temporal</em> position. The routing mechanism
            handles relevance; positions handle within-document structure.
          </p>
        </Prose>

        <Callout type="insight">
          Think of it like zip codes. Every city has addresses starting at 1, 2, 3...
          independently. You don't need to know that Tokyo's address "123" came before New York's
          address "456" in some global ordering. Each city's internal numbering is self-contained.
          Doc-wise RoPE gives each document its own address space.
        </Callout>
      </ConceptCard>

      {/* ── Doc-wise RoPE Visual Comparison SVG ── */}
      <Diagram caption={<><strong>Standard RoPE vs Doc-wise RoPE</strong> — Standard RoPE assigns global positions that exceed training range. Doc-wise RoPE resets per document, keeping all positions within the trained distribution.</>}>
        <svg viewBox="0 0 920 360" style={{ width: '100%', height: 'auto' }}>
          <rect width="920" height="360" rx="12" fill="#0a0f1a" />

          {/* Title */}
          <text x="460" y="28" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">POSITION ENCODING COMPARISON</text>

          {/* ── Left: Standard RoPE ── */}
          <rect x="20" y="42" width="430" height="300" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
          <text x="235" y="66" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Standard RoPE (fails at scale)</text>

          {/* Global position axis */}
          <line x1="40" y1="200" x2="430" y2="200" stroke="#475569" strokeWidth="1.5" />
          <text x="235" y="218" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Global Position Index</text>

          {/* Doc A - positions 0-8K */}
          <rect x="45" y="100" width="80" height="85" rx="6" fill="#164e63" stroke={CYAN} strokeWidth="1" />
          <text x="85" y="120" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Doc A</text>
          <text x="85" y="138" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="Inter, system-ui, sans-serif">pos 0</text>
          <text x="85" y="153" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="Inter, system-ui, sans-serif">to 8K</text>
          <text x="85" y="173" textAnchor="middle" fill={GREEN} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">IN RANGE</text>

          {/* Doc B - positions 8K-16K */}
          <rect x="135" y="100" width="80" height="85" rx="6" fill="#164e63" stroke={CYAN} strokeWidth="1" />
          <text x="175" y="120" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Doc B</text>
          <text x="175" y="138" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="Inter, system-ui, sans-serif">pos 8K</text>
          <text x="175" y="153" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontFamily="Inter, system-ui, sans-serif">to 16K</text>
          <text x="175" y="173" textAnchor="middle" fill={GREEN} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">IN RANGE</text>

          {/* ... */}
          <text x="245" y="145" textAnchor="middle" fill="#475569" fontSize="16" fontFamily="Inter, system-ui, sans-serif">...</text>

          {/* Doc N - positions exceed training */}
          <rect x="280" y="100" width="80" height="85" rx="6" fill="#3b0d0d" stroke="#ef4444" strokeWidth="1.5" />
          <text x="320" y="120" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Doc N</text>
          <text x="320" y="138" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="Inter, system-ui, sans-serif">pos 90M</text>
          <text x="320" y="153" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="Inter, system-ui, sans-serif">to 100M</text>
          <text x="320" y="173" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">OUT OF RANGE!</text>

          {/* Training range bracket */}
          <line x1="45" y1="235" x2="215" y2="235" stroke={GREEN} strokeWidth="2" />
          <line x1="45" y1="230" x2="45" y2="240" stroke={GREEN} strokeWidth="2" />
          <line x1="215" y1="230" x2="215" y2="240" stroke={GREEN} strokeWidth="2" />
          <text x="130" y="252" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Trained range (0-32K)</text>

          {/* OOD bracket */}
          <line x1="225" y1="235" x2="430" y2="235" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
          <text x="327" y="252" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Never seen in training</text>

          {/* Failure X */}
          <text x="370" y="150" textAnchor="middle" fill="#ef4444" fontSize="28" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">X</text>
          <text x="235" y="290" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Attention degrades at unseen positions</text>
          <text x="235" y="306" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Model cannot extrapolate to 100M</text>

          {/* ── Right: Doc-wise RoPE ── */}
          <rect x="470" y="42" width="430" height="300" rx="10" fill="#1e293b" stroke={GREEN} strokeWidth="1.5" />
          <text x="685" y="66" textAnchor="middle" fill={GREEN} fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Doc-wise RoPE (scales to any N)</text>

          {/* Per-doc position axis */}
          <line x1="490" y1="200" x2="880" y2="200" stroke="#475569" strokeWidth="1.5" />
          <text x="685" y="218" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Per-Document Position (reset each doc)</text>

          {/* Doc A */}
          <rect x="495" y="100" width="80" height="85" rx="6" fill="#14532d" stroke={GREEN} strokeWidth="1" />
          <text x="535" y="120" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Doc A</text>
          <text x="535" y="138" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter, system-ui, sans-serif">pos 0</text>
          <text x="535" y="153" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter, system-ui, sans-serif">to 8K</text>
          <text x="535" y="173" textAnchor="middle" fill={GREEN} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">IN RANGE</text>

          {/* Doc B */}
          <rect x="585" y="100" width="80" height="85" rx="6" fill="#14532d" stroke={GREEN} strokeWidth="1" />
          <text x="625" y="120" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Doc B</text>
          <text x="625" y="138" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter, system-ui, sans-serif">pos 0</text>
          <text x="625" y="153" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter, system-ui, sans-serif">to 8K</text>
          <text x="625" y="173" textAnchor="middle" fill={GREEN} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">IN RANGE</text>

          {/* ... */}
          <text x="695" y="145" textAnchor="middle" fill="#475569" fontSize="16" fontFamily="Inter, system-ui, sans-serif">...</text>

          {/* Doc N */}
          <rect x="730" y="100" width="80" height="85" rx="6" fill="#14532d" stroke={GREEN} strokeWidth="1" />
          <text x="770" y="120" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Doc N</text>
          <text x="770" y="138" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter, system-ui, sans-serif">pos 0</text>
          <text x="770" y="153" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter, system-ui, sans-serif">to 8K</text>
          <text x="770" y="173" textAnchor="middle" fill={GREEN} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">IN RANGE</text>

          {/* Reset arrows */}
          <text x="560" y="96" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Inter, system-ui, sans-serif">reset</text>
          <text x="650" y="96" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Inter, system-ui, sans-serif">reset</text>
          <text x="750" y="96" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Inter, system-ui, sans-serif">reset</text>

          {/* All in-range bracket */}
          <line x1="495" y1="235" x2="810" y2="235" stroke={GREEN} strokeWidth="2" />
          <line x1="495" y1="230" x2="495" y2="240" stroke={GREEN} strokeWidth="2" />
          <line x1="810" y1="230" x2="810" y2="240" stroke={GREEN} strokeWidth="2" />
          <text x="652" y="252" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">ALL positions in trained range (0-8K)</text>

          {/* Checkmark */}
          <text x="840" y="150" textAnchor="middle" fill={GREEN} fontSize="24" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">OK</text>
          <text x="685" y="290" textAnchor="middle" fill={GREEN} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Every document uses same position range</text>
          <text x="685" y="306" textAnchor="middle" fill={GREEN} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Scales to unlimited documents</text>
        </svg>
      </Diagram>

      {/* ── Top-k Selection ── */}
      <ConceptCard title="Top-k Selection: Sparse but Sufficient" color={GREEN} defaultOpen={false}>
        <Prose>
          <p>
            After scoring all chunks, MSA selects the <strong><H tip="Top-k selection = keeping only the k highest-scored items and discarding the rest. A hard threshold that creates true sparsity — the model literally ignores all unchosen chunks, saving both compute and memory bandwidth." color={GREEN}>top-k</H> highest-scoring chunks</strong>
            and fetches their full-resolution <H tip="KV cache = stored Key and Value vectors from a previous forward pass. These represent the 'memory' of what the model has already processed. In MSA, KV caches are stored at full token-level resolution and fetched only for selected chunks." color={CYAN}>K and V vectors</H> for standard attention. The rest of
            memory is ignored for this query.
          </p>
          <p>
            The default k value is <strong>8 chunks per layer</strong> (512 tokens total at P=64).
            This means the model attends to only 512 tokens out of potentially 100 million — a
            <H tip="Sparsity ratio = the fraction of elements that are non-zero (or selected). 0.0005% means 99.9995% of memory is ignored per query. Extreme sparsity is what makes MSA efficient — but the learned routing ensures the right 0.0005% is always selected." color={GREEN}>sparsity ratio</H> of 0.0005%. Yet on benchmarks, this tiny window captures the relevant
            information with near-perfect accuracy.
          </p>
          <p>
            Different layers can select different chunks, which is crucial: lower layers might
            select chunks with lexical matches while higher layers select chunks with semantic
            relevance. The full model effectively attends to k chunks times the number of layers —
            a much richer coverage than any single selection.
          </p>
        </Prose>
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — TRAINING PIPELINE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="Training Pipeline"
        subtitle="A three-phase curriculum with auxiliary loss"
        color={CYAN}
      />

      <Prose>
        <p>
          You cannot simply take a <H tip="Pretrained = a model that has already been trained on a large corpus (often trillions of tokens) to learn general language patterns. Continued pretraining (CPT) adapts it further for a specific capability." color={CYAN}>pretrained</H> LLM, bolt on sparse attention layers, and expect it
          to work. The routing mechanism needs to learn which documents are relevant — and the
          model needs to learn to trust the routing. MSA uses a carefully staged <H tip="Training curriculum = a structured schedule that gradually increases task difficulty. Like teaching math: arithmetic before algebra before calculus. Here: short contexts before long, strong supervision before weak." color={ORANGE}>training
          curriculum</H>.
        </p>
      </Prose>

      <StepFlow
        color={CYAN}
        steps={[
          {
            title: 'Phase 1: Continued Pre-Training (CPT)',
            desc: 'Train on 10B tokens with memory contexts up to 256K tokens. The model learns the basic mechanics: how to encode documents into KV caches, how the routing projectors should behave, and how to use selected chunks. The auxiliary loss L_aux is weighted heavily (\u03BB=1.0) to bootstrap routing quality.',
          },
          {
            title: 'Phase 2: Main Training',
            desc: 'Scale to 100B tokens with contexts up to 4M tokens. The model refines its routing and attention patterns. L_aux weight is reduced (lambda=0.1) as the model increasingly learns from the primary language modeling loss itself. Memory size gradually increases during this phase.',
          },
          {
            title: 'Phase 3: Supervised Fine-Tuning (SFT)',
            desc: 'Fine-tune on instruction-following data with memory contexts. This teaches the model to use its memory capabilities in practical scenarios: question-answering, multi-document reasoning, summarization over large corpora. Memory interleave (Section 04) is enabled here.',
          },
        ]}
      />

      {/* ── Training Pipeline Timeline SVG ── */}
      <Diagram caption={<><strong>Three-Phase Training Pipeline</strong> — CPT bootstraps routing, main training refines it at scale, SFT teaches practical usage. Lambda (λ) controls how strongly routing is supervised.</>}>
        <svg viewBox="0 0 920 340" style={{ width: '100%', height: 'auto' }}>
          <rect width="920" height="340" rx="12" fill="#0a0f1a" />
          <defs>
            <linearGradient id="tp-cyan" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#164e63" /><stop offset="100%" stopColor="#0e7490" /></linearGradient>
            <linearGradient id="tp-orange" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7c2d12" /><stop offset="100%" stopColor="#c2410c" /></linearGradient>
            <linearGradient id="tp-green" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#14532d" /><stop offset="100%" stopColor="#15803d" /></linearGradient>
          </defs>

          {/* Title */}
          <text x="460" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">TRAINING TIMELINE</text>

          {/* Timeline axis */}
          <line x1="60" y1="160" x2="880" y2="160" stroke="#334155" strokeWidth="2" />
          <polygon points="880,155 895,160 880,165" fill="#334155" />

          {/* Phase 1: CPT */}
          <rect x="70" y="70" width="220" height="75" rx="10" fill="url(#tp-cyan)" stroke={CYAN} strokeWidth="2" />
          <text x="180" y="95" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Phase 1: CPT</text>
          <text x="180" y="113" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="Inter, system-ui, sans-serif">10B tokens | 256K context</text>
          <text x="180" y="130" textAnchor="middle" fill="#a5f3fc" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">lambda = 1.0 (heavy routing)</text>

          {/* Phase 1 marker */}
          <circle cx="180" cy="160" r="8" fill={CYAN} />
          <text x="180" y="163" textAnchor="middle" fill="#0a0f1a" fontSize="8" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">1</text>

          {/* Phase 1 details below */}
          <rect x="70" y="180" width="220" height="60" rx="8" fill="#0c4a6e" opacity="0.5" />
          <text x="180" y="200" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Bootstrap routing quality</text>
          <text x="180" y="216" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Strong L_aux supervision</text>
          <text x="180" y="232" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Model learns to trust routing</text>

          {/* Phase 2: Main Training */}
          <rect x="330" y="70" width="260" height="75" rx="10" fill="url(#tp-orange)" stroke={ORANGE} strokeWidth="2" />
          <text x="460" y="95" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Phase 2: Main Training</text>
          <text x="460" y="113" textAnchor="middle" fill="#fed7aa" fontSize="10" fontFamily="Inter, system-ui, sans-serif">100B tokens | 4M context</text>
          <text x="460" y="130" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">lambda = 0.1 (reduced routing)</text>

          {/* Phase 2 marker */}
          <circle cx="460" cy="160" r="8" fill={ORANGE} />
          <text x="460" y="163" textAnchor="middle" fill="#0a0f1a" fontSize="8" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">2</text>

          {/* Phase 2 details below */}
          <rect x="330" y="180" width="260" height="60" rx="8" fill="#431407" opacity="0.5" />
          <text x="460" y="200" textAnchor="middle" fill="#fdba74" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Refine at scale, grow context</text>
          <text x="460" y="216" textAnchor="middle" fill="#fdba74" fontSize="10" fontFamily="Inter, system-ui, sans-serif">L_LM takes over as primary signal</text>
          <text x="460" y="232" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Memory gradually scaled up</text>

          {/* Phase 3: SFT */}
          <rect x="630" y="70" width="240" height="75" rx="10" fill="url(#tp-green)" stroke={GREEN} strokeWidth="2" />
          <text x="750" y="95" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Phase 3: SFT</text>
          <text x="750" y="113" textAnchor="middle" fill="#bbf7d0" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Instruction-following data</text>
          <text x="750" y="130" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Memory Interleave enabled</text>

          {/* Phase 3 marker */}
          <circle cx="750" cy="160" r="8" fill={GREEN} />
          <text x="750" y="163" textAnchor="middle" fill="#0a0f1a" fontSize="8" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">3</text>

          {/* Phase 3 details below */}
          <rect x="630" y="180" width="240" height="60" rx="8" fill="#14532d" opacity="0.5" />
          <text x="750" y="200" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Inter, system-ui, sans-serif">QA, summarization, reasoning</text>
          <text x="750" y="216" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Multi-hop with interleave</text>
          <text x="750" y="232" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Practical task adaptation</text>

          {/* Connecting arrows between phases */}
          <line x1="290" y1="107" x2="330" y2="107" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
          <polygon points="326,103 336,107 326,111" fill="#475569" />
          <line x1="590" y1="107" x2="630" y2="107" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
          <polygon points="626,103 636,107 626,111" fill="#475569" />

          {/* Lambda curve label */}
          <text x="460" y="275" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, system-ui, sans-serif">lambda decay: 1.0 → 0.1 → fine-tune only</text>

          {/* Data volume bar */}
          <rect x="70" y="290" width="220" height="12" rx="4" fill={CYAN} opacity="0.4" />
          <rect x="330" y="290" width="260" height="12" rx="4" fill={ORANGE} opacity="0.4" />
          <rect x="630" y="290" width="240" height="12" rx="4" fill={GREEN} opacity="0.4" />
          <text x="180" y="318" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="Inter, system-ui, sans-serif">10B tokens</text>
          <text x="460" y="318" textAnchor="middle" fill="#fdba74" fontSize="9" fontFamily="Inter, system-ui, sans-serif">100B tokens</text>
          <text x="750" y="318" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Task-specific</text>
        </svg>
      </Diagram>

      <ConceptCard title="The Auxiliary Contrastive Loss (L_aux)" color={ORANGE} defaultOpen={true}>
        <Prose>
          <p>
            The primary training signal (<H tip="Next-token prediction = standard language model training. Given a sequence of tokens, predict the next one. The loss is cross-entropy between the predicted distribution and the actual next token." color={CYAN}>next-token prediction loss</H>) tells the model <em>what</em>{' '}
            to output but gives only indirect signal about <em>which chunks to select</em>. If the
            model selects a wrong chunk, it generates a bad token, but the <H tip="Gradient signal = the information flowing backward through the network during backpropagation. A 'diffuse' gradient means the signal is spread thinly across many parameters, making it hard for any single component to learn from it." color={ORANGE}>gradient signal</H> about
            which chunk <em>should</em> have been selected is very diffuse — it has to propagate
            back through the full attention computation.
          </p>
          <p>
            L_aux provides a direct, dense training signal for the routing mechanism. It is a
            <H tip="Contrastive loss = a loss function that pushes similar items closer and dissimilar items apart in the embedding space. Think of it like organizing a library: books on the same topic should be on nearby shelves, books on different topics should be far apart." color={ORANGE}> contrastive loss</H> that explicitly tells the routing projector: "this chunk's routing key
            should be similar to the query's routing key, and that chunk's routing key should be
            dissimilar." This is the same idea as <H tip="InfoNCE = Noise-Contrastive Estimation for information maximization. Originally from the CPC paper (van den Oord 2018). The denominator acts as a normalizing partition function, making this a softmax over positive/negative similarities." color={ORANGE}>InfoNCE</H> from contrastive learning.
          </p>
        </Prose>

        <FormulaSteps
          label="Auxiliary Contrastive Loss — Building Up Step by Step"
          color={ORANGE}
          steps={[
            {
              note: 'Compute the cosine similarity between the routing query Q^R and the routing key of the POSITIVE (relevant) chunk. This should be HIGH — the model should recognize relevant documents.',
              math: 's^+ = \\cos(Q^R, \\bar{K}^R_{+}) \\quad \\text{(similarity to the correct chunk)}',
            },
            {
              note: 'Also compute cosine similarity against ALL other chunks (the negatives). These should be LOW — the model should be able to distinguish relevant from irrelevant.',
              math: 's_j = \\cos(Q^R, \\bar{K}^R_{j}) \\quad \\forall j \\in \\text{all chunks}',
            },
            {
              note: 'Apply temperature scaling τ (typically 0.07) and softmax. Temperature controls "sharpness" — low τ makes the distribution peaked, forcing the model to be very confident about its selection.',
              math: 'p_j = \\frac{\\exp(s_j / \\tau)}{\\sum_k \\exp(s_k / \\tau)} \\quad \\text{(softmax over all chunks)}',
            },
            {
              note: 'The loss is the negative log-probability of the positive chunk. Minimizing this = maximizing the probability that the routing system ranks the correct chunk highest. It\'s InfoNCE — the gold standard of contrastive learning.',
              math: 'L_{\\text{aux}} = -\\log \\frac{\\exp(\\cos(Q^R, \\bar{K}^R_{+}) / \\tau)}{\\sum_{j} \\exp(\\cos(Q^R, \\bar{K}^R_{j}) / \\tau)}',
            },
          ]}
          symbols={[
            { symbol: 'Q^R', meaning: 'Routing query — what the current input is "looking for" in memory' },
            { symbol: 'K̄^R_+', meaning: 'Routing key of the positive chunk — the one that actually contains the answer' },
            { symbol: 'K̄^R_j', meaning: 'Routing keys of all chunks — both relevant and irrelevant' },
            { symbol: 'τ = 0.07', meaning: 'Temperature — lower = sharper distribution = model must be more confident' },
            { symbol: 'cos(·,·)', meaning: 'Cosine similarity — direction-only comparison in routing space' },
          ]}
        />

        <Callout type="math">
          This is essentially an InfoNCE loss, the same family used in CLIP and SimCLR. The
          "positive" chunk is identified by which chunk the model actually attended to most
          (measured by attention weight) during the forward pass. All other chunks serve as
          negatives. Temperature tau is set to 0.07.
        </Callout>
      </ConceptCard>

      <FormulaSteps
        label="Total Training Objective — Two Forces Pulling Together"
        color={CYAN}
        steps={[
          {
            note: 'The model needs to learn two skills simultaneously: (1) generate good text (language modeling), and (2) pick the right memory chunks (routing). These are trained by two separate losses.',
            math: 'L_{\\text{LM}} = \\text{next-token prediction loss} \\quad \\text{(standard autoregressive)}',
          },
          {
            note: 'The routing loss L_aux directly trains the routing projectors using contrastive learning (see the InfoNCE formula above). Without it, routing quality depends on very diffuse gradient signals from L_LM — too weak to learn from.',
            math: 'L_{\\text{aux}} = \\text{InfoNCE contrastive loss on routing keys}',
          },
          {
            note: 'Combine them with a balancing weight λ. The key insight: λ changes over training. Early on (CPT warmup), λ=1.0 — routing gets equal priority because the model must learn WHERE to look before it learns WHAT to say. Later (main training), λ=0.1 — language modeling dominates because routing is already decent.',
            math: 'L_{\\text{total}} = L_{\\text{LM}} + \\lambda \\cdot L_{\\text{aux}}',
          },
        ]}
        symbols={[
          { symbol: 'L_LM', meaning: 'Language modeling loss — "did the model predict the right next token?"' },
          { symbol: 'L_aux', meaning: 'Routing loss — "did the model select the right memory chunks?"' },
          { symbol: 'λ = 1.0 → 0.1', meaning: 'Priority shift: routing-first (warmup) → generation-first (main training)' },
        ]}
      />

      <ConceptCard title="Why CPT Matters: The Ablation" color="#ef4444" defaultOpen={false}>
        <Prose>
          <p>
            The paper provides a striking <H tip="Ablation study = an experiment where you remove or disable one component of a system to measure its individual contribution. Like removing one ingredient from a recipe to see what it adds." color="#ef4444">ablation</H>: removing the <H tip="CPT (Continued Pre-Training) = additional pretraining of an already-trained model on new data or with new architectural features. The model retains existing knowledge while learning new capabilities." color={CYAN}>CPT</H> phase entirely and going
            straight to main training causes a <strong>31.3% average drop</strong> across
            benchmarks. Why?
          </p>
          <p>
            Without CPT, the routing projectors start from <H tip="Random initialization = setting weights to small random values before training begins. For a new component like the routing projector, this means its outputs are essentially noise until training shapes them." color="#ef4444">random initialization</H>. During early
            main training, they route essentially at random, so the model learns to ignore the
            memory system entirely — it cannot trust it. Once the model has learned to ignore
            memory, it is very hard to unlearn that behavior even as routing improves later.
          </p>
          <p>
            CPT with high <H tip="Lambda (λ) = a hyperparameter that controls the weight of the auxiliary loss relative to the main language modeling loss. Higher λ means stronger routing supervision. Set to 1.0 during CPT warmup, then decayed to 0.1." color={ORANGE}>lambda</H> (strong routing supervision) bootstraps the routing quality
            before the model has a chance to learn to ignore it. Think of it like teaching a
            student to use the library catalog before assigning a research paper — otherwise
            they will just Google everything and never learn to use the library.
          </p>
        </Prose>

        <StatBar
          stats={[
            { value: '-31.3', unit: '%', label: 'Drop without CPT', color: '#ef4444' },
            { value: '1.0', unit: '', label: 'Lambda during CPT', color: ORANGE },
            { value: '0.1', unit: '', label: 'Lambda during main', color: CYAN },
            { value: '10B', unit: ' tok', label: 'CPT data volume', color: GREEN },
          ]}
        />
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — THREE-STAGE INFERENCE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="Three-Stage Inference"
        subtitle="Offline encoding, online routing, and memory interleave"
        color={CYAN}
      />

      <Prose>
        <p>
          MSA's <H tip="Inference = using a trained model to generate predictions/outputs. Unlike training (which updates weights), inference only runs the forward pass. The cost is dominated by the prefill phase (encoding the context) and the decode phase (generating tokens one by one)." color={GREEN}>inference</H> is split into three stages that cleanly separate the expensive one-time
          work from the cheap per-query work. This separation is what makes 100M-token memory
          practical in deployment — the bulk of computation happens <H tip="Offline encoding = processing documents ahead of time and caching the results. The KV caches are stored on disk or in CPU memory and fetched on demand. This amortizes the O(N·d·L) encoding cost across all future queries." color={CYAN}>offline</H>.
        </p>
      </Prose>

      {/* ── Three-Stage Inference SVG ── */}
      <Diagram caption="Three-stage inference pipeline: encode once, route cheaply, generate normally">
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto' }}>
          <rect x="5" y="5" width="850" height="370" rx="14" fill="#0f172a" opacity="0.5" />

          {/* ── S1: Offline Encode ── */}
          <rect x="20" y="25" width="250" height="330" rx="12" fill="#1e293b" stroke="#164e63" strokeWidth="1.5" />
          <rect x="20" y="25" width="250" height="40" rx="12" fill="#164e63" />
          <rect x="20" y="52" width="250" height="13" fill="#164e63" />
          <text x="145" y="50" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">S1: Offline Encode</text>
          <text x="145" y="82" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">One-time per document (can be batched)</text>

          {BOX(40, 100, 210, 32, 'Document text', '#374151', '#e2e8f0', 12)}
          {ARROW(145, 132, 145, 150, CYAN)}
          {BOX(40, 155, 210, 32, 'Forward pass (all layers)', '#0e7490', '#fff', 11)}
          {ARROW(145, 187, 145, 205, CYAN)}
          {BOX(40, 210, 100, 32, 'K_i, V_i cache', '#164e63', CYAN, 11)}
          {BOX(150, 210, 100, 32, 'K̄^R_ij pool', '#7c2d12', ORANGE, 11)}
          {ARROW(90, 242, 90, 265, CYAN)}
          {ARROW(200, 242, 200, 265, ORANGE)}
          {BOX(40, 270, 210, 40, 'Store to Memory', '#1e3a5f', '#7dd3fc', 12)}
          <text x="145" y="328" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Cost: O(N · d) per doc</text>
          <text x="145" y="344" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Done once, cached forever</text>

          {/* Arrow S1 → S2 */}
          {ARROW(270, 200, 305, 200, '#64748b')}
          <text x="288" y="220" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="Inter, system-ui, sans-serif">KV + K̄^R</text>

          {/* ── S2: Online Route ── */}
          <rect x="310" y="25" width="240" height="330" rx="12" fill="#1e293b" stroke="#7c2d12" strokeWidth="1.5" />
          <rect x="310" y="25" width="240" height="40" rx="12" fill="#7c2d12" />
          <rect x="310" y="52" width="240" height="13" fill="#7c2d12" />
          <text x="430" y="50" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">S2: Online Route</text>
          <text x="430" y="82" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Per query — fast!</text>

          {BOX(330, 100, 200, 32, 'User query', '#374151', '#e2e8f0', 12)}
          {ARROW(430, 132, 430, 150, ORANGE)}
          {BOX(330, 155, 200, 32, 'Compute Q^R', '#7c2d12', ORANGE, 12)}
          {ARROW(430, 187, 430, 210, ORANGE)}
          {BOX(330, 215, 200, 32, 'Score all K̄^R_ij chunks', '#431407', '#fb923c', 11)}
          {ARROW(430, 247, 430, 270, GREEN)}
          {BOX(330, 275, 200, 32, 'Top-k chunk indices', '#14532d', GREEN, 12)}
          <text x="430" y="328" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Cost: O(N/P) cosine sims</text>
          <text x="430" y="344" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, system-ui, sans-serif">~1.56M comparisons for 100M tokens</text>

          {/* Arrow S2 → S3 */}
          {ARROW(550, 290, 585, 290, '#64748b')}
          <text x="568" y="282" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter, system-ui, sans-serif">indices</text>

          {/* ── S3: Online Generate ── */}
          <rect x="590" y="25" width="250" height="330" rx="12" fill="#1e293b" stroke="#14532d" strokeWidth="1.5" />
          <rect x="590" y="25" width="250" height="40" rx="12" fill="#14532d" />
          <rect x="590" y="52" width="250" height="13" fill="#14532d" />
          <text x="715" y="50" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">S3: Online Generate</text>
          <text x="715" y="82" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Standard Transformer decode</text>

          {BOX(610, 100, 220, 32, 'Fetch selected K, V chunks', '#164e63', CYAN, 11)}
          {ARROW(715, 132, 715, 155, CYAN)}
          {BOX(610, 160, 220, 32, 'Standard attention (sparse)', '#0e7490', '#fff', 11)}
          {ARROW(715, 192, 715, 215, GREEN)}
          {BOX(610, 220, 220, 32, 'Generate next token', '#14532d', GREEN, 12)}
          {ARROW(715, 252, 715, 275, GREEN)}
          {BOX(610, 280, 220, 32, 'Output sequence', '#14532d', '#86efac', 13)}
          <text x="715" y="328" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Cost: O(k · P · d) per token</text>
          <text x="715" y="344" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Same as attending to ~512 tokens</text>
        </svg>
      </Diagram>

      <ConceptCard title="Stage Complexities — The Cost Analysis" color={CYAN} defaultOpen={true}>
        <FormulaSteps
          label="Three-Stage Cost — Why 100M Tokens is Feasible"
          color={CYAN}
          steps={[
            {
              note: 'Stage 1 (Offline): Encode every document through the full Transformer — expensive, but you only do this ONCE when adding a document to memory. Think of it like indexing a book in a library: slow, but you never redo it. In code: `for doc in corpus: kv_cache[doc] = model.encode(doc)`.',
              math: 'C_{S1} = O(N \\cdot d \\cdot L) \\quad \\text{per document, done once}',
            },
            {
              note: 'Stage 2 (Online Routing): Compare the query\'s routing key against ALL chunk representations — but they\'re 64× compressed! So 100M tokens = only 1.56M comparisons. This is a single matrix multiply: `scores = query_routing @ all_chunk_keys.T`. Fast enough for real-time.',
              math: 'C_{S2} = O\\!\\left(\\frac{N_{\\text{mem}}}{P} \\cdot d\\right) \\quad \\text{(1.56M cosine sims for 100M tokens)}',
            },
            {
              note: 'Stage 3 (Online Generation): Standard attention, but ONLY over the k=8 selected chunks (8 × 64 = 512 tokens). This is the same cost as a normal Transformer attending to 512 tokens — tiny! `output = attention(query, selected_keys, selected_values)`.',
              math: 'C_{S3} = O(k \\cdot P \\cdot d \\cdot L) \\quad \\text{(same as 512-token context)}',
            },
            {
              note: 'The punchline: dense attention over 100M tokens would cost O(10¹⁶). MSA costs O(10⁸) for routing + O(10⁶) for generation. That\'s 8 orders of magnitude cheaper. Memory: "Remember S-1-2-3 as Store-Search-Serve."',
              math: '\\underbrace{C_{\\text{dense}}}_{O(N^2)} \\gg \\underbrace{C_{S2} + C_{S3}}_{O(N/P + k \\cdot P)} \\quad \\text{(linear in N, not quadratic)}',
            },
          ]}
          symbols={[
            { symbol: 'N', meaning: 'Total tokens in the document being encoded' },
            { symbol: 'N_mem', meaning: 'Total tokens in ALL memory (up to 100M)' },
            { symbol: 'P = 64', meaning: 'Chunk size — routing compresses 64× by mean-pooling' },
            { symbol: 'k = 8', meaning: 'Chunks selected per layer — the "sparsity budget"' },
            { symbol: 'd', meaning: 'Model dimension (hidden size)' },
            { symbol: 'L', meaning: 'Number of Transformer layers' },
          ]}
        />

        <Callout type="key">
          <strong>Memory hook:</strong> Think "Store-Search-Serve." S1 <em>stores</em> documents (expensive, once).
          S2 <em>searches</em> compressed representations (cheap, per query). S3 <em>serves</em> selected
          chunks through standard attention (cheap, per token). The total cost is <strong>linear in memory size</strong>,
          not quadratic — this is what makes 100M tokens possible.
        </Callout>
      </ConceptCard>

      {/* ── Memory Interleave ── */}
      <ConceptCard title="Memory Interleave: Multi-Hop Reasoning" color={PURPLE} defaultOpen={true}>
        <Prose>
          <p>
            Many real questions require <strong><H tip="Multi-hop reasoning = answering a question that requires chaining facts from multiple sources. Each 'hop' uses information from one source to formulate a query for the next. RAG typically supports only 1 hop; MSA supports arbitrary depth." color={PURPLE}>multi-hop reasoning</H></strong> — you cannot find the
            answer in a single document. For example: "When was Erik Watts' father born?" requires
            first finding who Erik Watts is, then discovering his father is Bill Watts, then
            finding Bill Watts' birth year.
          </p>
          <p>
            Standard <H tip="Retrieve-then-generate = the RAG pattern where documents are retrieved ONCE before generation starts. The retriever and generator are separate systems with no shared gradient flow, limiting the model to a single retrieval pass." color={ORANGE}>retrieve-then-generate</H> pipelines fail at this because they do a single
            retrieval pass before generating. If the first retrieval finds Erik Watts but not
            Bill Watts, the model is stuck.
          </p>
          <p>
            MSA's <strong>Memory Interleave</strong> solves this by allowing the model to
            <em>re-route into memory mid-generation</em>. After generating a partial answer that
            reveals new information ("Erik Watts' father is Bill Watts"), the model can use that
            new information as a routing query to find the next relevant chunk ("Bill Watts was
            born in 1939").
          </p>
        </Prose>

        {/* ── Memory Interleave SVG ── */}
        <Diagram caption="Memory Interleave: multi-hop reasoning through iterative routing">
          <svg viewBox="0 0 820 340" style={{ width: '100%', height: 'auto' }}>
            <rect x="5" y="5" width="810" height="330" rx="14" fill="#0f172a" opacity="0.5" />

            {/* Memory bank */}
            <rect x="20" y="20" width="780" height="60" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            {LABEL(410, 38, 'MEMORY BANK (100M tokens across thousands of documents)', '#64748b', 11)}
            {BOX(30, 50, 90, 22, 'Doc: Erik W.', '#1e3a5f', CYAN, 9)}
            {BOX(130, 50, 90, 22, 'Doc: Bill W.', '#1e3a5f', PURPLE, 9)}
            {BOX(230, 50, 80, 22, 'Doc: WWE', '#1e3a5f', '#64748b', 9)}
            {BOX(320, 50, 80, 22, 'Doc: 1939', '#1e3a5f', '#64748b', 9)}
            {LABEL(470, 65, '... thousands more ...', '#475569', 9)}

            {/* Hop 1 */}
            <rect x="30" y="100" width="230" height="220" rx="10" fill="#1e293b" stroke="#164e63" strokeWidth="1.5" />
            <text x="145" y="122" textAnchor="middle" fill={CYAN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">HOP 1</text>

            {BOX(45, 135, 200, 28, 'Q: "Erik Watts\' father born?"', '#374151', '#e2e8f0', 10)}
            {ARROW(145, 163, 145, 178, ORANGE)}
            {BOX(45, 182, 200, 28, 'Route \u2192 find Doc: Erik W.', '#7c2d12', ORANGE, 10)}
            {ARROW(145, 210, 145, 225, CYAN)}
            {BOX(45, 228, 200, 28, 'Read: "father is Bill Watts"', '#164e63', CYAN, 10)}
            {ARROW(145, 256, 145, 273, GREEN)}
            {BOX(45, 276, 200, 28, 'New info: Bill Watts', '#14532d', GREEN, 10)}

            {/* Arrow from memory to Hop 1 */}
            {ARROW(75, 72, 75, 100, CYAN, true)}

            {/* Arrow between hops */}
            {ARROW(260, 290, 310, 290, PURPLE)}
            <text x="286" y="282" textAnchor="middle" fill={PURPLE} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">re-route</text>

            {/* Hop 2 */}
            <rect x="315" y="100" width="230" height="220" rx="10" fill="#1e293b" stroke="#7e22ce" strokeWidth="1.5" />
            <text x="430" y="122" textAnchor="middle" fill={PURPLE} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">HOP 2</text>

            {BOX(330, 135, 200, 28, 'Q: "Bill Watts born when?"', '#374151', '#e2e8f0', 10)}
            {ARROW(430, 163, 430, 178, ORANGE)}
            {BOX(330, 182, 200, 28, 'Route \u2192 find Doc: Bill W.', '#7c2d12', ORANGE, 10)}
            {ARROW(430, 210, 430, 225, CYAN)}
            {BOX(330, 228, 200, 28, 'Read: "born May 5, 1939"', '#164e63', CYAN, 10)}
            {ARROW(430, 256, 430, 273, GREEN)}
            {BOX(330, 276, 200, 28, 'Answer piece: 1939', '#14532d', GREEN, 10)}

            {/* Arrow from memory to Hop 2 */}
            {ARROW(175, 72, 375, 100, PURPLE, true)}

            {/* Arrow to final */}
            {ARROW(545, 240, 580, 240, GREEN)}

            {/* Final Answer */}
            <rect x="585" y="100" width="200" height="220" rx="10" fill="#1e293b" stroke="#14532d" strokeWidth="1.5" />
            <text x="685" y="122" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">FINAL ANSWER</text>

            {BOX(600, 150, 170, 35, '"Erik Watts\' father', '#14532d', '#86efac', 11)}
            {BOX(600, 195, 170, 35, 'was born in 1939."', '#14532d', '#86efac', 11)}

            <text x="685" y="260" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">2 hops, 2 docs read</text>
            <text x="685" y="278" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">out of millions in memory</text>
            <text x="685" y="296" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Impossible with single retrieval</text>
          </svg>
        </Diagram>

        <Callout type="insight">
          Memory Interleave is what separates MSA from RAG. In RAG, you get one shot at retrieval
          before generation starts. In MSA, the model can interleave generation and retrieval
          fluidly — the same attention mechanism that generates tokens also routes into memory.
          There is no separate "retriever" module; it is all one unified model.
        </Callout>

        <StepFlow
          color={PURPLE}
          steps={[
            { title: 'Query arrives', desc: 'The user asks a question requiring information scattered across multiple documents.' },
            { title: 'First routing pass', desc: 'MSA routes into memory using the query, finds the most relevant chunk. Reads it via attention.' },
            { title: 'Partial generation', desc: 'The model generates tokens that incorporate the first chunk\'s information. This may reveal new entities or facts.' },
            { title: 'Re-routing with new context', desc: 'The newly generated tokens become part of the query for the next routing pass. The model finds a DIFFERENT chunk that is relevant to the new information.' },
            { title: 'Continue until done', desc: 'This loop repeats as many times as needed. Each hop adds new information, potentially triggering further hops. The model decides when it has enough information to produce a final answer.' },
          ]}
        />
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — RESULTS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="Results"
        subtitle="4B parameters punching above 80B weight class"
        color={CYAN}
      />

      <StatBar
        stats={[
          { value: '100M', unit: ' tok', label: 'Maximum context', color: CYAN },
          { value: '4B', unit: ' params', label: 'Model size', color: GREEN },
          { value: '99.3', unit: '%', label: 'NIAH accuracy', color: PURPLE },
          { value: '55.1', unit: '', label: 'Avg benchmark score', color: ORANGE },
        ]}
      />

      <Prose>
        <p>
          The results are striking, especially considering MSA uses only a <strong>4 billion
          parameter</strong> model. Across <H tip="Long-context benchmarks = standardized tests that measure a model's ability to use information spread across very long inputs. Examples include NIAH (finding a fact in a haystack), multi-hop QA (chaining facts), and summarization over thousands of pages." color={CYAN}>long-context benchmarks</H>, MSA-4B consistently
          outperforms models that are 10-20x larger when those models are limited to their
          standard context windows.
        </p>
      </Prose>

      <ComparisonTable
        headers={['Method', 'Size', 'Max Context', 'Avg Score', 'NIAH', 'Multi-hop']}
        rows={[
          ['MSA (this paper)', '4B', '100M tokens', '55.1', '99.3%', '62.4'],
          ['Dense Attention', '4B', '128K tokens', '42.8', '95.1%', '38.2'],
          ['RAG (BM25)', '4B', 'Unlimited*', '48.3', '87.6%', '41.7'],
          ['RAG (Dense)', '4B', 'Unlimited*', '50.2', '91.2%', '44.9'],
          ['Qwen2.5', '72B', '128K tokens', '53.8', '98.1%', '56.3'],
          ['Llama 3.1', '70B', '128K tokens', '51.2', '96.8%', '52.1'],
          ['MemoryFormer', '4B', '10M tokens', '46.1', '82.4%', '39.8'],
        ]}
        caption="Comparison across methods. MSA-4B exceeds 70B+ dense models on long-context tasks while using 18x fewer parameters. *RAG has unlimited corpus but no end-to-end gradient."
      />

      {/* ── Results Comparison Bar Chart SVG ── */}
      <Diagram caption={<><strong>Benchmark Comparison</strong> — MSA-4B vs baselines across three key metrics. A 4B model outperforms 70B+ models on long-context tasks.</>}>
        <svg viewBox="0 0 920 520" style={{ width: '100%', height: 'auto' }}>
          <rect width="920" height="520" rx="12" fill="#0a0f1a" />

          {/* Title */}
          <text x="460" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">BENCHMARK RESULTS</text>

          {/* ── Average Score Section ── */}
          <text x="50" y="65" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Average Score</text>
          <line x1="50" y1="72" x2="880" y2="72" stroke="#1e293b" strokeWidth="1" />

          {/* MSA bar */}
          <rect x="200" y="82" width={55.1 * 11} height="24" rx="4" fill={CYAN} opacity="0.9" />
          <text x="190" y="99" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">MSA (4B)</text>
          <text x={200 + 55.1 * 11 + 8} y="99" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">55.1</text>

          {/* RAG Dense bar */}
          <rect x="200" y="112" width={50.2 * 11} height="24" rx="4" fill={ORANGE} opacity="0.7" />
          <text x="190" y="129" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">RAG Dense (4B)</text>
          <text x={200 + 50.2 * 11 + 8} y="129" fill={ORANGE} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">50.2</text>

          {/* Dense Attention bar */}
          <rect x="200" y="142" width={42.8 * 11} height="24" rx="4" fill="#64748b" opacity="0.7" />
          <text x="190" y="159" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Dense (4B)</text>
          <text x={200 + 42.8 * 11 + 8} y="159" fill="#94a3b8" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">42.8</text>

          {/* Qwen 72B bar */}
          <rect x="200" y="172" width={53.8 * 11} height="24" rx="4" fill={PURPLE} opacity="0.6" />
          <text x="190" y="189" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Qwen2.5 (72B)</text>
          <text x={200 + 53.8 * 11 + 8} y="189" fill={PURPLE} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">53.8</text>

          {/* ── NIAH Section ── */}
          <text x="50" y="225" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">NIAH Accuracy (%)</text>
          <line x1="50" y1="232" x2="880" y2="232" stroke="#1e293b" strokeWidth="1" />

          {/* MSA bar */}
          <rect x="200" y="242" width={99.3 / 100 * 660} height="24" rx="4" fill={CYAN} opacity="0.9" />
          <text x="190" y="259" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">MSA (4B)</text>
          <text x={200 + 99.3 / 100 * 660 + 8} y="259" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">99.3%</text>

          {/* Dense bar */}
          <rect x="200" y="272" width={95.1 / 100 * 660} height="24" rx="4" fill="#64748b" opacity="0.7" />
          <text x="190" y="289" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Dense (4B)</text>
          <text x={200 + 95.1 / 100 * 660 + 8} y="289" fill="#94a3b8" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">95.1%</text>

          {/* RAG Dense bar */}
          <rect x="200" y="302" width={91.2 / 100 * 660} height="24" rx="4" fill={ORANGE} opacity="0.7" />
          <text x="190" y="319" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">RAG Dense (4B)</text>
          <text x={200 + 91.2 / 100 * 660 + 8} y="319" fill={ORANGE} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">91.2%</text>

          {/* RAG BM25 bar */}
          <rect x="200" y="332" width={87.6 / 100 * 660} height="24" rx="4" fill="#ef4444" opacity="0.6" />
          <text x="190" y="349" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">RAG BM25 (4B)</text>
          <text x={200 + 87.6 / 100 * 660 + 8} y="349" fill="#ef4444" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">87.6%</text>

          {/* ── Multi-hop Section ── */}
          <text x="50" y="385" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Multi-Hop Reasoning</text>
          <line x1="50" y1="392" x2="880" y2="392" stroke="#1e293b" strokeWidth="1" />

          {/* MSA bar */}
          <rect x="200" y="402" width={62.4 / 100 * 660} height="24" rx="4" fill={CYAN} opacity="0.9" />
          <text x="190" y="419" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">MSA (4B)</text>
          <text x={200 + 62.4 / 100 * 660 + 8} y="419" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">62.4</text>

          {/* Qwen 72B bar */}
          <rect x="200" y="432" width={56.3 / 100 * 660} height="24" rx="4" fill={PURPLE} opacity="0.6" />
          <text x="190" y="449" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Qwen2.5 (72B)</text>
          <text x={200 + 56.3 / 100 * 660 + 8} y="449" fill={PURPLE} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">56.3</text>

          {/* RAG Dense bar */}
          <rect x="200" y="462" width={44.9 / 100 * 660} height="24" rx="4" fill={ORANGE} opacity="0.7" />
          <text x="190" y="479" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">RAG Dense (4B)</text>
          <text x={200 + 44.9 / 100 * 660 + 8} y="479" fill={ORANGE} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">44.9</text>

          {/* Dense bar */}
          <rect x="200" y="492" width={38.2 / 100 * 660} height="24" rx="4" fill="#64748b" opacity="0.7" />
          <text x="190" y="509" textAnchor="end" fill="#e2e8f0" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Dense (4B)</text>
          <text x={200 + 38.2 / 100 * 660 + 8} y="509" fill="#94a3b8" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">38.2</text>
        </svg>
      </Diagram>

      <ConceptCard title="Needle in a Haystack (NIAH)" color={PURPLE} defaultOpen={true}>
        <Prose>
          <p>
            <H tip="NIAH (Needle In A Haystack) = a benchmark where a single specific fact ('needle') is hidden at a random position in a massive body of irrelevant text ('haystack'). The model must locate and return the needle. Tests pure retrieval/attention ability at scale." color={PURPLE}>NIAH</H> is the gold standard for testing whether a model can find a specific piece of
            information buried in a massive context. A "needle" (a specific fact) is inserted at
            a random position within a "haystack" of irrelevant text. The model must find and
            return the needle.
          </p>
          <p>
            MSA achieves <strong>99.3% accuracy</strong> on NIAH at 100M tokens. This means the
            routing mechanism almost never misses the relevant chunk, even when it is one chunk
            out of ~1.56 million candidates. For comparison, RAG with <H tip="BM25 (Best Match 25) = a classic keyword-based retrieval algorithm. It scores documents by term frequency and inverse document frequency. Fast but brittle — fails when the query uses different words than the document (the 'vocabulary mismatch' problem)." color={ORANGE}>BM25</H> retrieval drops to
            87.6% — the keyword-based retriever fails on paraphrased or semantically similar
            queries.
          </p>
        </Prose>

        <StatBar
          stats={[
            { value: '99.3', unit: '%', label: 'MSA NIAH (100M tok)', color: CYAN },
            { value: '95.1', unit: '%', label: 'Dense NIAH (128K tok)', color: '#64748b' },
            { value: '91.2', unit: '%', label: 'RAG Dense NIAH', color: ORANGE },
            { value: '87.6', unit: '%', label: 'RAG BM25 NIAH', color: '#ef4444' },
          ]}
        />
      </ConceptCard>

      <ConceptCard title="Multi-Hop Reasoning" color={GREEN} defaultOpen={true}>
        <Prose>
          <p>
            Multi-hop reasoning is where MSA truly shines over RAG. Questions that require
            chaining information across 2-4 documents are common in real applications but
            devastating for single-retrieval systems.
          </p>
          <p>
            MSA's Memory Interleave enables it to score <strong>62.4</strong> on <H tip="Multi-hop QA benchmarks = datasets where answering each question requires finding and combining facts from 2+ separate documents. Examples: HotpotQA, MuSiQue, 2WikiMultiHopQA. Much harder than single-hop retrieval." color={GREEN}>multi-hop
            benchmarks</H> — beating RAG by 17+ points and even surpassing the 72B <H tip="Qwen2.5-72B = a 72 billion parameter LLM from Alibaba. One of the strongest open-weight models, used here as a high-bar baseline. MSA's 4B model beats it on long-context tasks despite being 18x smaller." color={PURPLE}>Qwen</H> model.
            The ability to re-route mid-generation gives the model something no retrieval-augmented
            system can match: <em>iterative, learned, <H tip="End-to-end gradient flow = gradients propagate from the final loss all the way back through attention, routing, and projectors in a single computation graph. This lets the routing learn directly from language modeling performance — unlike RAG where the retriever is trained separately." color={CYAN}>end-to-end</H> reasoning across documents</em>.
          </p>
        </Prose>
      </ConceptCard>

      <ConceptCard title="Efficiency Analysis" color={CYAN} defaultOpen={false}>
        <Prose>
          <p>
            Beyond accuracy, MSA is remarkably efficient. The <H tip="Per-query inference cost = the compute required to process a single user query. This is the latency-critical path — it determines how fast the model responds. MSA keeps this constant regardless of how much memory is stored." color={GREEN}>per-query inference cost</H> is dominated
            by S3 (generation), which attends to only ~512 tokens regardless of memory size.
            The <H tip="Routing overhead = the extra compute needed for the routing step (S2). At only ~2% of total inference time, it's nearly free — the bottleneck is still the attention computation over selected chunks." color={ORANGE}>routing overhead</H> (S2) is less than 2% of total inference time.
          </p>
        </Prose>

        <ComparisonTable
          headers={['Metric', 'Dense (128K)', 'RAG', 'MSA (100M)']}
          rows={[
            ['Encoding cost', 'O(N²)', 'Chunking + embedding', 'O(N·d) one-time'],
            ['Per-query routing', 'N/A (attend all)', 'Vector search', 'O(N/P) cosine sims'],
            ['Per-token generation', 'O(N·d)', 'O(k·d)', 'O(k·P·d)'],
            ['Memory footprint', 'O(N·d)', 'Embedding DB + LLM', 'KV cache + routing keys'],
            ['Gradient flow', 'End-to-end', 'Retriever separate', 'End-to-end'],
          ]}
          caption="MSA combines the quality of dense attention with the efficiency of retrieval"
        />
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — MENTAL MODELS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Mental Models"
        subtitle="Three ways to think about MSA"
        color={CYAN}
      />

      <Prose>
        <p>
          Complex systems are best understood through multiple lenses. Here are three complementary
          <H tip="Mental model = an internal representation that helps you reason about a system by analogy to something familiar. Good mental models capture the essential structure while hiding irrelevant details." color={CYAN}>mental models</H> for MSA — each highlights a different aspect of the system's design.
        </p>
      </Prose>

      <MentalModel
        title="The Library with a Neural Catalog"
        analogy="A massive library where the librarian has personally read every book and built a mental index — not based on titles or keywords, but on deep understanding of each book's content. When you ask a question, the librarian doesn't search the card catalog (that's RAG). Instead, they use their own neural sense of 'this question feels related to the content on shelf 47B, pages 200-263.' They walk directly there, pull just those pages, and read them carefully."
        technical="The library is the KV cache (full token-level storage). The neural catalog is the routing key space (K^R, compressed 64x). Walking to a shelf is top-k selection. Reading the pages is standard attention over selected K,V pairs. The librarian's training is the CPT + main training + L_aux curriculum."
        color={CYAN}
      />

      <MentalModel
        title="Independent Zip Codes (Doc-wise RoPE)"
        analogy="Every country has addresses starting from 1. Japan's '1 Chome' has no positional relationship to France's '1 Rue.' Each country's addressing system is completely independent. If you trained a mail carrier on addresses 1-8000 within any single country, they could deliver mail in ANY country — because the address ranges are always within their training distribution."
        technical="Each document is a 'country' with positions starting at 0. The model only ever sees positions 0 through max_doc_length during training. At inference, even with millions of documents, every token's position is within the trained range. This eliminates the RoPE extrapolation failure that plagues dense long-context models."
        color={PURPLE}
      />

      <MentalModel
        title="The Detective's Notebook (Memory Interleave)"
        analogy="A detective investigating a complex case doesn't gather ALL evidence first and THEN think. They follow leads: finding one clue leads them to a new location where they find another clue, which points to a witness, whose testimony reveals the final piece. Each discovery reshapes what they search for next. The detective's notebook accumulates context across hops."
        technical="Memory Interleave allows the model to generate partial outputs that become part of the routing query for the next memory access. Each hop adds new context to the model's state, which changes the routing scores for the next hop. This enables multi-hop reasoning chains of arbitrary depth — something impossible with single-pass retrieval (RAG) or fixed-window attention."
        color={GREEN}
      />

      <Callout type="key">
        MSA represents a paradigm shift in how we think about LLM memory. Instead of choosing
        between "expensive but accurate" (<H tip="Dense attention = standard O(N²) attention where every token attends to every other token. Gives perfect information flow but becomes computationally infeasible beyond ~1M tokens." color={ORANGE}>dense attention</H>) and "cheap but disconnected" (<H tip="RAG (Retrieval-Augmented Generation) = a two-stage approach where a separate retriever finds relevant documents, then a generator LLM reads them. The retriever has no gradient connection to the generator, limiting optimization." color={ORANGE}>RAG</H>),
        MSA achieves both: end-to-end attention quality with <H tip="Sub-quadratic scaling = growing slower than O(N²). MSA's routing is O(N/P) and attention is O(k·P), both linear or constant relative to total memory size. This is what makes 100M tokens feasible." color={GREEN}>sub-quadratic scaling</H>. The key
        enablers are: (1) dual projectors that separate routing from content, (2) chunk pooling
        for 64x routing compression, (3) doc-wise RoPE for unlimited position extrapolation, and
        (4) Memory Interleave for multi-hop reasoning. Together, these four innovations push the
        context frontier from 1M to 100M tokens — closing a 300x gap toward human-level memory.
      </Callout>
    </>
  );
}
