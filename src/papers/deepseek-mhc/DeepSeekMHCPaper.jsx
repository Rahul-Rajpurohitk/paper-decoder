import SectionHeader from '../../components/SectionHeader';
import FormulaBlock from '../../components/FormulaBlock';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import StatBar from '../../components/StatBar';
import ConceptCard from '../../components/ConceptCard';
import StepFlow from '../../components/StepFlow';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import VisualCompare from '../../components/VisualCompare';
import Diagram from '../../components/Diagram';
import Prose from '../../components/Prose';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';

/* ─── colour tokens ─── */
const SKY = '#0ea5e9';   // primary sky-blue accent
const SKY2 = '#38bdf8';  // lighter sky
const SKY3 = '#7dd3fc';  // lightest sky
const CYAN = '#06b6d4';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const RED = '#ef4444';
const PURPLE = '#a855f7';
const GRAY = '#94a3b8';
const BG = '#0a1628';    // deep navy for SVGs
const FG = '#e2e8f0';

/* ─── SVG helper functions ─── */
const ARROW = (x1, y1, x2, y2, color = SKY, dashed = false) => (
  <g key={`a-${x1}-${y1}-${x2}-${y2}-${color}`}>
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
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} opacity="0.92" />
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

const LABEL = (x, y, text, color = GRAY, size = 11) => (
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

export default function DeepSeekMHCPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHY mHC? THE RESIDUAL CONNECTION PROBLEM
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="Why mHC? The Residual Connection Bottleneck"
        subtitle="Residual streams are the backbone of deep networks — but they have a hidden width constraint"
        color={SKY}
      />

      <Prose>
        <p>
          Every modern <H tip="Transformer = the dominant neural network architecture since 2017 ('Attention Is All You Need'). Uses self-attention to let every token in a sequence interact with every other token. Powers GPT, Claude, Llama, DeepSeek, and essentially all frontier AI models." color={SKY}>Transformer</H> relies on a deceptively simple idea:
          the <H tip="Residual connection = the 'skip connection' that adds the input of a layer directly to its output: h = h + f(h). Introduced in ResNet (2015). Without it, gradients vanish in deep networks because each layer's contribution gets multiplied through dozens of nonlinear transformations. With it, gradients flow cleanly through the addition." color={SKY}>residual connection</H>. After each layer computes something, the original input is
          <em> added back</em>: <code>h = h + f(h)</code>. This is why you can train networks with
          hundreds of layers — the residual stream acts as an <H tip="Information highway = the residual stream carries the cumulative representation through all layers. Each layer reads from this stream and writes its contribution back via addition. At initialization, the identity mapping (adding zero) means the highway passes information through unchanged." color={SKY}>information highway</H>, letting
          gradients flow cleanly from the loss back to the first layer.
        </p>
        <p>
          But there is a problem hiding in plain sight: the residual stream has a <strong>fixed width</strong>.
          In a model with <H tip="Hidden dimension = the width of the residual stream, i.e., the dimensionality of the token representation vector at each layer. For DeepSeek-V3 this is 7168. Every layer reads and writes vectors of exactly this size. Increasing it makes the model more expressive but quadratically increases parameter count." color={SKY}>hidden dimension</H> d = 7168, every layer must compress its output
          into the same 7168-dimensional vector. The <H tip="Multi-Head Attention (MHA) = the core mechanism where Q, K, V projections create multiple parallel attention 'heads,' each attending to different aspects of the sequence. With 128 heads in DeepSeek-V3, each head operates on a 56-dimensional slice. The outputs are concatenated and projected back to the hidden dimension." color={CYAN}>attention mechanism</H> internally
          works in much higher dimensions — with 128 heads each doing their own computation — but
          the result must be squeezed back into a single d-dimensional vector before joining the
          residual stream. This is a <H tip="Bottleneck = an architectural constraint where information must pass through a narrower channel than what the computation naturally produces. Like forcing a 128-lane highway into a single-lane tunnel. Information is lost at the merge point." color={RED}>bottleneck</H>.
        </p>
        <p>
          <H tip="Hyper-Connections (HC) = a technique from Wang et al. (2025) that widens the residual stream by a factor of n (typically 2-4). Instead of a single hidden vector per token, the model maintains n parallel copies. Layers receive a mixture of these copies and write back a mixture. This dramatically increases the stream's information capacity." color={SKY}>Hyper-Connections (HC)</H> — the predecessor to mHC — tried to fix this by expanding the
          residual stream width by a factor of <strong>n</strong>. Instead of one d-dimensional vector,
          the stream carries <strong>n</strong> copies, mixed via learnable <H tip="Mixing matrix = a learnable n×n matrix that controls how the n sub-streams combine before entering a layer and how the layer's output is distributed back into the n sub-streams. The 'input mixing matrix' α blends sub-streams before the layer processes them, and the 'output mixing matrix' β blends the layer output back." color={AMBER}>mixing matrices</H>.
          This worked — models trained faster and converged to lower loss. But HC had a fatal flaw.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '6-7%', unit: ' overhead', label: 'mHC Compute Cost', color: SKY },
          { value: '27B', unit: ' params', label: 'Largest Validated Scale', color: SKY2 },
          { value: 'n×d', unit: '', label: 'Expanded Stream Width', color: GREEN },
          { value: '0', unit: '', label: 'Identity Mapping Violations', color: AMBER },
        ]}
      />

      <SimpleExplain>
        <p><strong>What is happening at a high level:</strong> Deep neural networks pass information through a &ldquo;stream&rdquo; that is the same width at every layer. This is like trying to run a city&apos;s entire water supply through a single pipe — it works, but you are leaving capacity on the table. Hyper-Connections (HC) made the pipe wider, which helped. But the way HC blended the wider streams broke a critical property called &ldquo;identity mapping&rdquo; — the network could no longer easily learn &ldquo;do nothing&rdquo; at initialization. mHC fixes this by constraining how the blending works, using elegant math from a branch of combinatorics.</p>
      </SimpleExplain>

      <ConceptCard title="The Fatal Flaw of Vanilla Hyper-Connections" color={RED} defaultOpen={true}>
        <Prose>
          <p>
            HC replaces the standard <code>h = h + f(h)</code> with a system where n parallel sub-streams
            are mixed before and after each layer using learnable <H tip="Mixing matrices α and β = the n×n matrices that control blending. α (input mixing) combines sub-streams into a single input for the layer. β (output mixing) distributes the layer's output plus the original sub-streams into updated sub-streams. In vanilla HC, these matrices are unconstrained — they can take any real values." color={RED}>mixing matrices α and β</H>.
            At initialization, you want the network to behave like a standard residual network — the
            <H tip="Identity mapping = the property that at initialization (before training), the network acts as if each layer is a no-op. With standard residual connections, this happens naturally: if f(h) ≈ 0 at init, then h + f(h) ≈ h. This makes deep networks trainable because early in training, the model is approximately the identity function." color={RED}>identity mapping property</H>.
          </p>
          <p>
            The problem: HC&apos;s mixing matrices are <strong>unconstrained</strong>. During training, they can
            evolve into matrices that <em>amplify</em> some sub-streams and <em>suppress</em> others
            in ways that violate the identity mapping. When a mixing matrix has columns that don&apos;t sum
            to 1, or rows that don&apos;t sum to 1, the total information flowing through the stream can
            grow or shrink — destroying the carefully maintained <H tip="Signal magnitude = the typical size (norm) of the hidden state vectors. If mixing matrices cause magnitudes to grow exponentially across layers, you get exploding activations. If they shrink, you get vanishing representations. Both break training." color={RED}>signal magnitude</H>.
          </p>
          <p>
            In practice, this manifests as <strong>training instability</strong> at scale. Small models
            (1-3B) survive because the mixing matrices don&apos;t drift far enough to cause problems. But at
            <strong> 27B parameters</strong>, the instabilities compound across layers and the training
            diverges.
          </p>
        </Prose>
      </ConceptCard>

      <MentalModel
        title="The Orchestra Analogy"
        analogy="Think of the residual stream as an orchestra performing a symphony. In a standard Transformer, all musicians share one score (single width d). With HC, you give them n copies of the score — much richer. But the mixing matrices are like a conductor waving their arms freely. Without constraints, the conductor might accidentally tell the violins to play at 10× volume and the cellos to go silent. The symphony collapses into noise. mHC constrains the conductor: they must keep the total volume constant. Every instrument can still be mixed creatively, but the overall balance is preserved."
        technical="Technically, mHC constrains the mixing matrices to lie on the Birkhoff Polytope — the set of doubly stochastic matrices (non-negative entries, rows and columns sum to 1). This guarantees that the total 'weight' flowing through the stream is conserved at every layer, preserving the identity mapping at initialization and preventing signal explosion/collapse during training."
        color={SKY}
      />

      <Callout type="key">
        The core insight of mHC: Hyper-Connections are powerful but break the identity mapping property.
        The fix is to constrain the mixing matrices to be <strong>doubly stochastic</strong> — entries
        are non-negative, every row sums to 1, every column sums to 1. This is the <strong>Birkhoff
        Polytope</strong>, and the Sinkhorn-Knopp algorithm projects any matrix onto it efficiently.
        The result: all the expressiveness of HC with none of the instability.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — STANDARD RESIDUAL vs HC vs mHC
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="Three Generations of Residual Connections"
        subtitle="Standard → Hyper-Connections → Manifold-Constrained Hyper-Connections"
        color={SKY}
      />

      <Diagram caption="Evolution of residual connections: Standard (single stream), HC (multi-stream, unconstrained mixing), mHC (multi-stream, Birkhoff-constrained mixing)">
        <svg viewBox="0 0 960 520" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="mhc-a-sky" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={SKY} />
            </marker>
            <marker id="mhc-a-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <marker id="mhc-a-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={AMBER} />
            </marker>
            <marker id="mhc-a-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={RED} />
            </marker>
            <marker id="mhc-a-gray" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GRAY} />
            </marker>
            <linearGradient id="mhc-g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SKY} stopOpacity="0.15" />
              <stop offset="100%" stopColor={SKY} stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <rect width="960" height="520" rx="12" fill={BG} />

          {/* ── Column 1: Standard Residual ── */}
          <text x="160" y="30" textAnchor="middle" fill={GRAY} fontSize="14" fontWeight="700">STANDARD RESIDUAL</text>
          <text x="160" y="48" textAnchor="middle" fill={GRAY} fontSize="10" opacity="0.7">h = h + f(h)</text>

          {/* Single stream */}
          <rect x="130" y="70" width="60" height="30" rx="6" fill={SKY} fillOpacity="0.2" stroke={SKY} strokeWidth="1.5" />
          <text x="160" y="90" textAnchor="middle" fill={SKY} fontSize="11" fontWeight="600">h (d)</text>

          <line x1="160" y1="100" x2="160" y2="135" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-a-sky)" />

          {/* Layer block */}
          <rect x="110" y="140" width="100" height="45" rx="8" fill={SKY} fillOpacity="0.12" stroke={SKY} strokeWidth="1.5" />
          <text x="160" y="160" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">f(h)</text>
          <text x="160" y="175" textAnchor="middle" fill={GRAY} fontSize="9">Attn / FFN</text>

          {/* Plus node */}
          <line x1="160" y1="185" x2="160" y2="215" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-a-sky)" />
          <circle cx="160" cy="230" r="14" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="160" y="235" textAnchor="middle" fill={GREEN} fontSize="16" fontWeight="700">+</text>

          {/* Skip connection */}
          <path d="M80,85 C65,85 65,230 80,230" fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="80" y1="230" x2="146" y2="230" stroke={GREEN} strokeWidth="1.5" />

          {/* Output */}
          <line x1="160" y1="244" x2="160" y2="275" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-a-sky)" />
          <rect x="130" y="280" width="60" height="30" rx="6" fill={SKY} fillOpacity="0.2" stroke={SKY} strokeWidth="1.5" />
          <text x="160" y="300" textAnchor="middle" fill={SKY} fontSize="11" fontWeight="600">h&apos; (d)</text>

          {/* Verdict */}
          <rect x="95" y="330" width="130" height="40" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="160" y="348" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600">Identity: h + 0 = h</text>
          <text x="160" y="362" textAnchor="middle" fill={GRAY} fontSize="9">Width: d (fixed)</text>

          {/* ── Column 2: Hyper-Connections (HC) ── */}
          <text x="480" y="30" textAnchor="middle" fill={AMBER} fontSize="14" fontWeight="700">HYPER-CONNECTIONS (HC)</text>
          <text x="480" y="48" textAnchor="middle" fill={AMBER} fontSize="10" opacity="0.7">Multi-stream, unconstrained mixing</text>

          {/* n sub-streams */}
          {[0, 1, 2].map((i) => (
            <g key={`hc-in-${i}`}>
              <rect x={400 + i * 60} y={70} width="50" height="30" rx="6" fill={AMBER} fillOpacity={0.15 + i * 0.05} stroke={AMBER} strokeWidth="1" />
              <text x={425 + i * 60} y={90} textAnchor="middle" fill={AMBER} fontSize="10" fontWeight="600">{`s${i + 1}`}</text>
            </g>
          ))}
          <text x="480" y="118" textAnchor="middle" fill={GRAY} fontSize="9">n×d total width</text>

          {/* Input mixing matrix */}
          <rect x="415" y="130" width="130" height="35" rx="6" fill={AMBER} fillOpacity="0.1" stroke={AMBER} strokeWidth="1.5" />
          <text x="480" y="153" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="700">Mix α (n×n)</text>
          <line x1="480" y1="100" x2="480" y2="130" stroke={AMBER} strokeWidth="1.5" markerEnd="url(#mhc-a-amber)" />

          {/* Layer */}
          <line x1="480" y1="165" x2="480" y2="190" stroke={AMBER} strokeWidth="1.5" markerEnd="url(#mhc-a-amber)" />
          <rect x="430" y="195" width="100" height="45" rx="8" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1.5" />
          <text x="480" y="215" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">f(·)</text>
          <text x="480" y="230" textAnchor="middle" fill={GRAY} fontSize="9">Attn / FFN</text>

          {/* Output mixing matrix */}
          <line x1="480" y1="240" x2="480" y2="265" stroke={AMBER} strokeWidth="1.5" markerEnd="url(#mhc-a-amber)" />
          <rect x="415" y="270" width="130" height="35" rx="6" fill={AMBER} fillOpacity="0.1" stroke={AMBER} strokeWidth="1.5" />
          <text x="480" y="293" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="700">Mix β (n×n)</text>

          {/* Output sub-streams */}
          <line x1="480" y1="305" x2="480" y2="330" stroke={AMBER} strokeWidth="1.5" markerEnd="url(#mhc-a-amber)" />
          {[0, 1, 2].map((i) => (
            <g key={`hc-out-${i}`}>
              <rect x={400 + i * 60} y={335} width="50" height="30" rx="6" fill={AMBER} fillOpacity={0.15 + i * 0.05} stroke={AMBER} strokeWidth="1" />
              <text x={425 + i * 60} y={355} textAnchor="middle" fill={AMBER} fontSize="10" fontWeight="600">{`s${i + 1}'`}</text>
            </g>
          ))}

          {/* Verdict — PROBLEM */}
          <rect x="400" y="385" width="160" height="50" rx="8" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="1.5" />
          <text x="480" y="403" textAnchor="middle" fill={RED} fontSize="10" fontWeight="700">Identity BROKEN</text>
          <text x="480" y="417" textAnchor="middle" fill={GRAY} fontSize="9">α, β can have arbitrary sums</text>
          <text x="480" y="429" textAnchor="middle" fill={GRAY} fontSize="9">Signal explodes/collapses</text>

          {/* ── Column 3: mHC ── */}
          <text x="800" y="30" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="700">mHC (THIS PAPER)</text>
          <text x="800" y="48" textAnchor="middle" fill={SKY} fontSize="10" opacity="0.7">Multi-stream, Birkhoff-constrained mixing</text>

          {/* n sub-streams */}
          {[0, 1, 2].map((i) => (
            <g key={`mhc-in-${i}`}>
              <rect x={720 + i * 60} y={70} width="50" height="30" rx="6" fill={SKY} fillOpacity={0.15 + i * 0.05} stroke={SKY} strokeWidth="1" />
              <text x={745 + i * 60} y={90} textAnchor="middle" fill={SKY} fontSize="10" fontWeight="600">{`s${i + 1}`}</text>
            </g>
          ))}
          <text x="800" y="118" textAnchor="middle" fill={GRAY} fontSize="9">n×d total width</text>

          {/* Input mixing — Birkhoff constrained */}
          <rect x="720" y="130" width="160" height="35" rx="6" fill={SKY} fillOpacity="0.15" stroke={SKY} strokeWidth="2" />
          <text x="800" y="148" textAnchor="middle" fill={SKY3} fontSize="10" fontWeight="700">Sinkhorn(α) ∈ Birkhoff</text>
          <text x="800" y="160" textAnchor="middle" fill={GRAY} fontSize="8">rows & cols sum to 1</text>
          <line x1="800" y1="100" x2="800" y2="130" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-a-sky)" />

          {/* Layer */}
          <line x1="800" y1="165" x2="800" y2="190" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-a-sky)" />
          <rect x="750" y="195" width="100" height="45" rx="8" fill={SKY} fillOpacity="0.12" stroke={SKY} strokeWidth="1.5" />
          <text x="800" y="215" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">f(·)</text>
          <text x="800" y="230" textAnchor="middle" fill={GRAY} fontSize="9">Attn / FFN</text>

          {/* Output mixing — Birkhoff constrained */}
          <line x1="800" y1="240" x2="800" y2="265" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-a-sky)" />
          <rect x="720" y="270" width="160" height="35" rx="6" fill={SKY} fillOpacity="0.15" stroke={SKY} strokeWidth="2" />
          <text x="800" y="288" textAnchor="middle" fill={SKY3} fontSize="10" fontWeight="700">Sinkhorn(β) ∈ Birkhoff</text>
          <text x="800" y="300" textAnchor="middle" fill={GRAY} fontSize="8">rows & cols sum to 1</text>

          {/* Output sub-streams */}
          <line x1="800" y1="305" x2="800" y2="330" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-a-sky)" />
          {[0, 1, 2].map((i) => (
            <g key={`mhc-out-${i}`}>
              <rect x={720 + i * 60} y={335} width="50" height="30" rx="6" fill={SKY} fillOpacity={0.15 + i * 0.05} stroke={SKY} strokeWidth="1" />
              <text x={745 + i * 60} y={355} textAnchor="middle" fill={SKY} fontSize="10" fontWeight="600">{`s${i + 1}'`}</text>
            </g>
          ))}

          {/* Verdict — FIXED */}
          <rect x="720" y="385" width="160" height="50" rx="8" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1.5" />
          <text x="800" y="403" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="700">Identity PRESERVED</text>
          <text x="800" y="417" textAnchor="middle" fill={GRAY} fontSize="9">Doubly stochastic = weight</text>
          <text x="800" y="429" textAnchor="middle" fill={GRAY} fontSize="9">conservation guaranteed</text>

          {/* Bottom legend */}
          <rect x="200" y="470" width="560" height="36" rx="8" fill={BG} stroke="#1e3a5f" strokeWidth="1" />
          <circle cx="240" cy="488" r="5" fill={GRAY} />
          <text x="260" y="492" fill={GRAY} fontSize="10">Standard</text>
          <circle cx="360" cy="488" r="5" fill={AMBER} />
          <text x="380" y="492" fill={AMBER} fontSize="10">HC (broken identity)</text>
          <circle cx="530" cy="488" r="5" fill={SKY} />
          <text x="550" y="492" fill={SKY} fontSize="10">mHC (fixed identity)</text>
          <circle cx="700" cy="488" r="5" fill={GREEN} />
          <text x="720" y="492" fill={GREEN} fontSize="10">Preserved</text>
        </svg>
      </Diagram>

      <VisualCompare
        leftLabel="Standard Residual"
        rightLabel="mHC"
        leftColor={GRAY}
        rightColor={SKY}
        left={<>
          <p>Single stream of width d</p>
          <p style={{fontFamily:'var(--font-mono)'}}>h = h + f(h)</p>
          <p>Identity mapping at init: trivially yes</p>
          <p style={{color:RED}}>Bottleneck: all info squeezed into d dims</p>
        </>}
        right={<>
          <p>n parallel streams of width d (total: n*d)</p>
          <p style={{fontFamily:'var(--font-mono)'}}>Sinkhorn-constrained mixing</p>
          <p style={{color:GREEN}}>Identity mapping preserved by construction</p>
          <p style={{color:GREEN}}>6-7% overhead, scales to 27B</p>
        </>}
        caption="mHC gets the best of both worlds: wider streams AND stable training"
      />

      <ComparisonTable
        headers={['Property', 'Standard Residual', 'HC', 'mHC (This Paper)']}
        rows={[
          ['Stream width', 'd', 'n × d', 'n × d'],
          ['Mixing matrices', 'None (add)', 'Unconstrained α, β', 'Birkhoff-constrained α, β'],
          ['Identity mapping', 'Yes (trivial)', 'No (broken at scale)', 'Yes (by construction)'],
          ['Training stability', 'Stable', 'Unstable at 27B+', 'Stable at 27B+'],
          ['Extra compute', '0%', '~6%', '~6-7%'],
          ['Constraint method', 'N/A', 'N/A', 'Sinkhorn-Knopp algorithm'],
        ]}
        caption="mHC inherits HC's capacity while fixing its instability via the Birkhoff Polytope constraint"
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — THE MATH: BIRKHOFF POLYTOPE & DOUBLY STOCHASTIC MATRICES
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="The Birkhoff Polytope — The Geometry of Fairness"
        subtitle="Why doubly stochastic matrices are the perfect constraint for mixing"
        color={SKY}
      />

      <Prose>
        <p>
          The key mathematical object in mHC is the <H tip="Birkhoff Polytope B_n = the set of all n×n doubly stochastic matrices. It is a convex polytope in n²-dimensional space. Its vertices are the n! permutation matrices (Birkhoff-von Neumann theorem). Any doubly stochastic matrix is a convex combination of permutation matrices." color={SKY}>Birkhoff Polytope</H>.
          This is the set of all <H tip="Doubly stochastic matrix = a square matrix where every entry is non-negative, every row sums to 1, and every column sums to 1. The identity matrix is doubly stochastic. Permutation matrices are doubly stochastic. The uniform matrix (all entries 1/n) is doubly stochastic. They form a convex set." color={SKY}>doubly stochastic matrices</H> — square matrices
          where every entry is non-negative, every row sums to 1, and every column sums to 1. If you think
          of a mixing matrix as describing &ldquo;how much weight flows from sub-stream i to sub-stream j,&rdquo;
          then doubly stochastic means: <em>every sub-stream gives away exactly 1 unit of weight, and
          every sub-stream receives exactly 1 unit of weight</em>. No amplification, no suppression.
        </p>
        <p>
          The <H tip="Birkhoff-von Neumann theorem = states that the vertices (extreme points) of the Birkhoff Polytope are exactly the n! permutation matrices. Any doubly stochastic matrix can be written as a convex combination of permutation matrices. This means the Birkhoff Polytope is the convex hull of all permutations." color={PURPLE}>Birkhoff-von Neumann theorem</H> tells us that the extreme points
          (vertices) of this polytope are <H tip="Permutation matrix = a square binary matrix with exactly one 1 in each row and each column, all other entries 0. It represents a reordering (permutation) of the sub-streams. The identity matrix is the 'do nothing' permutation." color={PURPLE}>permutation matrices</H>. So the set of valid mixing
          matrices includes the identity (do nothing), all permutations (reorder streams), and all
          weighted averages in between. This is exactly the right level of expressiveness — you can
          learn any convex mixture of permutations, but you cannot blow up or shrink the signal.
        </p>
        <p>
          But how do you <em>enforce</em> this constraint during training? You cannot just clip the
          matrix — that would break <H tip="Gradient flow = the backpropagation of loss gradients through the computation graph. If a constraint is enforced by hard clipping (projecting the parameter after each gradient step), the gradients don't 'know' about the constraint, leading to oscillation and slow convergence. Differentiable constraints are vastly preferred." color={AMBER}>gradient flow</H>. You need a
          <strong>differentiable</strong> projection from arbitrary matrices onto the Birkhoff Polytope.
          Enter the <H tip="Sinkhorn-Knopp algorithm = an iterative procedure that projects any matrix with positive entries onto the set of doubly stochastic matrices. Each iteration alternates: (1) normalize all rows to sum to 1, (2) normalize all columns to sum to 1. Convergence is guaranteed and exponentially fast. Made differentiable by unrolling the iterations through the computation graph." color={SKY}>Sinkhorn-Knopp algorithm</H>.
        </p>
      </Prose>

      <Diagram caption="The Birkhoff Polytope B₃: the set of all 3×3 doubly stochastic matrices. Vertices are the 6 permutation matrices. The identity matrix I is a vertex. The uniform matrix J = 1/3 is the centroid.">
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="400" rx="12" fill={BG} />

          <text x="400" y="30" textAnchor="middle" fill={SKY} fontSize="15" fontWeight="700">BIRKHOFF POLYTOPE B₃</text>
          <text x="400" y="48" textAnchor="middle" fill={GRAY} fontSize="11">Set of all 3×3 doubly stochastic matrices</text>

          {/* Polytope shape — a hexagon representing the 6 permutation vertices */}
          {/* Center at 300, 220 */}
          <polygon
            points="300,100 430,155 430,285 300,340 170,285 170,155"
            fill={SKY} fillOpacity="0.06" stroke={SKY} strokeWidth="1.5"
          />

          {/* Vertices — permutation matrices */}
          {[
            { x: 300, y: 100, label: 'I', desc: '(1,0,0 / 0,1,0 / 0,0,1)' },
            { x: 430, y: 155, label: 'P₁₂', desc: '(0,1,0 / 1,0,0 / 0,0,1)' },
            { x: 430, y: 285, label: 'P₁₂₃', desc: '(0,1,0 / 0,0,1 / 1,0,0)' },
            { x: 300, y: 340, label: 'P₁₃', desc: '(0,0,1 / 0,1,0 / 1,0,0)' },
            { x: 170, y: 285, label: 'P₁₃₂', desc: '(0,0,1 / 1,0,0 / 0,1,0)' },
            { x: 170, y: 155, label: 'P₂₃', desc: '(1,0,0 / 0,0,1 / 0,1,0)' },
          ].map(({ x, y, label, desc }, i) => (
            <g key={`v-${i}`}>
              <circle cx={x} cy={y} r="8" fill={PURPLE} stroke={PURPLE} strokeWidth="2" />
              <text x={x + (x > 300 ? 15 : x < 300 ? -15 : 0)} y={y + (y < 200 ? -12 : y > 300 ? 18 : 5)} textAnchor={x > 300 ? 'start' : x < 300 ? 'end' : 'middle'} fill={PURPLE} fontSize="12" fontWeight="700">{label}</text>
              <text x={x + (x > 300 ? 15 : x < 300 ? -15 : 0)} y={y + (y < 200 ? -1 : y > 300 ? 30 : 17)} textAnchor={x > 300 ? 'start' : x < 300 ? 'end' : 'middle'} fill={GRAY} fontSize="8">{desc}</text>
            </g>
          ))}

          {/* Centroid = uniform matrix */}
          <circle cx="300" cy="220" r="6" fill={GREEN} />
          <text x="310" y="216" fill={GREEN} fontSize="11" fontWeight="700">J = 1/3</text>
          <text x="310" y="230" fill={GRAY} fontSize="8">Uniform matrix (centroid)</text>

          {/* mHC mixing matrix — somewhere inside */}
          <circle cx="340" cy="180" r="5" fill={SKY} />
          <text x="350" y="177" fill={SKY} fontSize="10" fontWeight="600">α*</text>
          <text x="350" y="190" fill={GRAY} fontSize="8">Learned mixing</text>

          {/* Right side: Properties */}
          <rect x="520" y="80" width="250" height="260" rx="10" fill={BG} stroke="#1e3a5f" strokeWidth="1" />
          <text x="645" y="105" textAnchor="middle" fill={SKY} fontSize="13" fontWeight="700">KEY PROPERTIES</text>

          <text x="540" y="135" fill={FG} fontSize="11" fontWeight="600">Doubly stochastic:</text>
          <text x="540" y="152" fill={GRAY} fontSize="10">Every row sums to 1</text>
          <text x="540" y="167" fill={GRAY} fontSize="10">Every column sums to 1</text>
          <text x="540" y="182" fill={GRAY} fontSize="10">All entries non-negative</text>

          <line x1="540" y1="195" x2="750" y2="195" stroke="#1e3a5f" strokeWidth="1" />

          <text x="540" y="215" fill={FG} fontSize="11" fontWeight="600">Why it works for mHC:</text>
          <text x="540" y="232" fill={GREEN} fontSize="10">Row sum = 1 → each output gets</text>
          <text x="540" y="247" fill={GREEN} fontSize="10">exactly 1 unit of total weight</text>
          <text x="540" y="267" fill={SKY3} fontSize="10">Col sum = 1 → each input contributes</text>
          <text x="540" y="282" fill={SKY3} fontSize="10">exactly 1 unit of total weight</text>
          <text x="540" y="302" fill={AMBER} fontSize="10">Non-negative → no sign flips,</text>
          <text x="540" y="317" fill={AMBER} fontSize="10">no cancellations, stable gradients</text>

          {/* Bottom: Birkhoff-von Neumann */}
          <rect x="100" y="365" width="600" height="28" rx="6" fill={PURPLE} fillOpacity="0.08" stroke={PURPLE} strokeWidth="1" />
          <text x="400" y="384" textAnchor="middle" fill={PURPLE} fontSize="11" fontWeight="600">Birkhoff-von Neumann Theorem: vertices of Bₙ = all n! permutation matrices</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="Doubly Stochastic Constraint — Definition"
        color={SKY}
        steps={[
          {
            note: 'Start with what we want to constrain: the n×n mixing matrix M that blends sub-streams. We need every entry to be non-negative (no negative weights).',
            math: 'M \\in \\mathbb{R}^{n \\times n}, \\quad M_{ij} \\geq 0 \\;\\; \\forall \\, i,j',
          },
          {
            note: 'First constraint: every row sums to 1. This means each output sub-stream receives a total weight of exactly 1 — it is a weighted average of inputs, not an amplification.',
            math: '\\sum_{j=1}^{n} M_{ij} = 1 \\quad \\forall \\, i \\quad \\text{(row stochastic)}',
          },
          {
            note: 'Second constraint: every column sums to 1. This means each input sub-stream contributes a total weight of exactly 1 across all outputs — no sub-stream is amplified or suppressed.',
            math: '\\sum_{i=1}^{n} M_{ij} = 1 \\quad \\forall \\, j \\quad \\text{(column stochastic)}',
          },
          {
            note: 'Together: M is doubly stochastic, living in the Birkhoff Polytope Bₙ. The identity matrix I ∈ Bₙ (trivially), so the "do nothing" mixing is always reachable. This guarantees the identity mapping property at initialization.',
            math: 'M \\in \\mathcal{B}_n = \\left\\{\\, M \\in \\mathbb{R}_{\\geq 0}^{n \\times n} \\;:\\; M \\mathbf{1} = \\mathbf{1}, \\; M^\\top \\mathbf{1} = \\mathbf{1} \\,\\right\\}',
          },
        ]}
        symbols={[
          { symbol: 'M', meaning: 'Mixing matrix (either α for input mixing or β for output mixing)' },
          { symbol: 'n', meaning: 'Number of sub-streams (width expansion factor, typically 2-4)' },
          { symbol: 'Bₙ', meaning: 'The Birkhoff Polytope — set of all n×n doubly stochastic matrices' },
          { symbol: '1', meaning: 'The all-ones vector of length n' },
          { symbol: 'M1 = 1', meaning: 'Row sums equal 1 (row stochastic)' },
          { symbol: 'Mᵀ1 = 1', meaning: 'Column sums equal 1 (column stochastic)' },
        ]}
      />

      <SimpleExplain>
        <p><strong>What the Birkhoff constraint really means:</strong> Imagine you have 3 water tanks (sub-streams) each containing exactly 1 gallon. The mixing matrix describes how you redistribute water between them. &ldquo;Doubly stochastic&rdquo; means: after mixing, every tank still has exactly 1 gallon. No water is created or destroyed. The tanks can exchange water in any pattern, but the total in each tank is always 1. This is why the identity mapping is preserved — at initialization, each tank just keeps its own water.</p>
      </SimpleExplain>

      <Callout type="insight">
        The Birkhoff Polytope is the <strong>largest</strong> set of mixing matrices that preserves the
        identity mapping. Any larger set would include matrices that amplify or suppress sub-streams.
        Any smaller set would unnecessarily limit expressiveness. This is why mHC uses it — it is the
        <H tip="Maximal constraint = the loosest constraint that still guarantees the desired property. If you constrain too little, you lose the property. If you constrain too much, you lose expressiveness. The Birkhoff Polytope is the Goldilocks zone for mixing matrices." color={SKY}>maximal constraint</H> that preserves identity mapping.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — SINKHORN-KNOPP: THE DIFFERENTIABLE PROJECTION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="The Sinkhorn-Knopp Algorithm — Differentiable Projection"
        subtitle="How to enforce doubly stochastic constraints while keeping gradients flowing"
        color={SKY}
      />

      <Prose>
        <p>
          The model&apos;s learnable parameters are <strong>unconstrained</strong> matrices — regular n×n
          matrices of real numbers. During the forward pass, we need to project these onto the Birkhoff
          Polytope. The <H tip="Sinkhorn-Knopp algorithm = discovered independently by Sinkhorn (1964) and Knopp (1967). It alternates row normalization and column normalization of a matrix with positive entries. Each iteration brings the matrix closer to doubly stochastic. Convergence is exponentially fast — typically 5-10 iterations suffice." color={SKY}>Sinkhorn-Knopp algorithm</H> does exactly this:
        </p>
        <p>
          <strong>Step 1:</strong> Exponentiate every entry to make them positive: <H tip="Entry-wise exponentiation = applying exp() to each element of the matrix independently. This maps any real number to a positive number, which is required for Sinkhorn-Knopp to work. The raw parameters can be any real value; exp() ensures positivity." color={SKY}>A = exp(M)</H>.
        </p>
        <p>
          <strong>Step 2:</strong> Alternate between normalizing rows (divide each row by its sum) and
          normalizing columns (divide each column by its sum). Repeat for <H tip="T iterations = the number of alternating row/column normalizations. More iterations = closer to exactly doubly stochastic. In practice, T = 5-10 is sufficient because convergence is exponentially fast. The entire process is differentiable, so gradients flow through all T iterations via backpropagation." color={SKY}>T iterations</H>.
        </p>
        <p>
          After T iterations, the result is a matrix that is <em>approximately</em> doubly stochastic
          (and exactly so in the limit). Because every operation — exp, division, summation — is
          differentiable, gradients flow through the entire Sinkhorn process. The learnable parameters
          get gradients that respect the constraint, without any explicit projection step.
        </p>
      </Prose>

      <FormulaSteps
        label="Sinkhorn-Knopp Algorithm — Step by Step"
        color={SKY}
        steps={[
          {
            note: 'Start with the raw learnable parameter matrix M (unconstrained, any real values). Exponentiate entry-wise to get a matrix of positive values. This is the "soft" version of the constraint — gradients flow smoothly through exp().',
            math: 'A^{(0)} = \\exp(M), \\quad M \\in \\mathbb{R}^{n \\times n}',
          },
          {
            note: 'Row normalization: divide each row by its sum. After this step, rows sum to 1 (row stochastic), but columns generally do not sum to 1 yet.',
            math: 'A^{(t+\\frac{1}{2})}_{ij} = \\frac{A^{(t)}_{ij}}{\\sum_{k=1}^{n} A^{(t)}_{ik}}',
          },
          {
            note: 'Column normalization: divide each column by its sum. After this step, columns sum to 1, but rows may no longer sum to exactly 1 (they did after the previous step but column normalization perturbs them).',
            math: 'A^{(t+1)}_{ij} = \\frac{A^{(t+\\frac{1}{2})}_{ij}}{\\sum_{k=1}^{n} A^{(t+\\frac{1}{2})}_{kj}}',
          },
          {
            note: 'Repeat for T iterations. Each iteration brings both row sums and column sums exponentially closer to 1. After T=5-10 iterations, the matrix is doubly stochastic to machine precision. The final result is the mixing matrix used in the forward pass.',
            math: '\\hat{M} = \\text{Sinkhorn}(M, T) = A^{(T)} \\;\\in\\; \\mathcal{B}_n \\quad \\text{(approximately doubly stochastic)}',
          },
        ]}
        symbols={[
          { symbol: 'M', meaning: 'Raw learnable parameter matrix (unconstrained)' },
          { symbol: 'A^(0)', meaning: 'Entry-wise exp of M — guaranteed all-positive' },
          { symbol: 'A^(t)', meaning: 'Matrix after t full Sinkhorn iterations' },
          { symbol: 'T', meaning: 'Number of Sinkhorn iterations (typically 5-10)' },
          { symbol: 'M_hat', meaning: 'Final doubly stochastic mixing matrix used in forward pass' },
          { symbol: 'B_n', meaning: 'Birkhoff Polytope — the target constraint set' },
        ]}
      />

      <Diagram caption="Sinkhorn-Knopp convergence: starting from an arbitrary positive matrix, alternating row and column normalization rapidly converges to a doubly stochastic matrix">
        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="mhc-sk-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={SKY} />
            </marker>
          </defs>
          <rect width="800" height="340" rx="12" fill={BG} />

          <text x="400" y="28" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="700">SINKHORN-KNOPP ITERATION</text>

          {/* Iteration 0: Raw exp(M) */}
          <rect x="20" y="55" width="140" height="90" rx="8" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="1.5" />
          <text x="90" y="75" textAnchor="middle" fill={RED} fontSize="11" fontWeight="700">exp(M)</text>
          <text x="90" y="92" textAnchor="middle" fill={GRAY} fontSize="9">Row sums: 2.3, 1.8, 3.1</text>
          <text x="90" y="105" textAnchor="middle" fill={GRAY} fontSize="9">Col sums: 2.7, 1.2, 3.3</text>
          <text x="90" y="135" textAnchor="middle" fill={RED} fontSize="9" fontWeight="600">NOT doubly stochastic</text>

          {/* Arrow */}
          <line x1="165" y1="100" x2="195" y2="100" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-sk-arr)" />
          <text x="180" y="88" textAnchor="middle" fill={SKY} fontSize="8">Row norm</text>

          {/* Iteration 0.5: After row normalization */}
          <rect x="200" y="55" width="140" height="90" rx="8" fill={AMBER} fillOpacity="0.08" stroke={AMBER} strokeWidth="1.5" />
          <text x="270" y="75" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="700">After rows</text>
          <text x="270" y="92" textAnchor="middle" fill={GREEN} fontSize="9">Row sums: 1.0, 1.0, 1.0</text>
          <text x="270" y="105" textAnchor="middle" fill={RED} fontSize="9">Col sums: 0.8, 1.1, 1.1</text>
          <text x="270" y="135" textAnchor="middle" fill={AMBER} fontSize="9" fontWeight="600">Row stochastic only</text>

          {/* Arrow */}
          <line x1="345" y1="100" x2="375" y2="100" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-sk-arr)" />
          <text x="360" y="88" textAnchor="middle" fill={SKY} fontSize="8">Col norm</text>

          {/* Iteration 1: After column normalization */}
          <rect x="380" y="55" width="140" height="90" rx="8" fill={AMBER} fillOpacity="0.08" stroke={AMBER} strokeWidth="1.5" />
          <text x="450" y="75" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="700">After cols</text>
          <text x="450" y="92" textAnchor="middle" fill={AMBER} fontSize="9">Row sums: 1.02, 0.99, 0.99</text>
          <text x="450" y="105" textAnchor="middle" fill={GREEN} fontSize="9">Col sums: 1.0, 1.0, 1.0</text>
          <text x="450" y="135" textAnchor="middle" fill={AMBER} fontSize="9" fontWeight="600">Nearly there (t=1)</text>

          {/* Arrow */}
          <line x1="525" y1="100" x2="555" y2="100" stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-sk-arr)" />
          <text x="540" y="88" textAnchor="middle" fill={SKY} fontSize="8">...</text>

          {/* Iteration T: Converged */}
          <rect x="560" y="55" width="160" height="90" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="2" />
          <text x="640" y="75" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700">After T=5 iters</text>
          <text x="640" y="92" textAnchor="middle" fill={GREEN} fontSize="9">Row sums: 1.000, 1.000, 1.000</text>
          <text x="640" y="105" textAnchor="middle" fill={GREEN} fontSize="9">Col sums: 1.000, 1.000, 1.000</text>
          <text x="640" y="135" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="700">DOUBLY STOCHASTIC</text>

          {/* Convergence curve below */}
          <text x="400" y="185" textAnchor="middle" fill={SKY} fontSize="13" fontWeight="700">CONVERGENCE RATE</text>

          {/* X axis */}
          <line x1="100" y1="300" x2="700" y2="300" stroke={GRAY} strokeWidth="1" />
          <text x="400" y="328" textAnchor="middle" fill={GRAY} fontSize="10">Sinkhorn iterations (t)</text>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <g key={`tick-${i}`}>
              <line x1={100 + i * 120} y1="300" x2={100 + i * 120} y2="305" stroke={GRAY} strokeWidth="1" />
              <text x={100 + i * 120} y="316" textAnchor="middle" fill={GRAY} fontSize="9">{i}</text>
            </g>
          ))}

          {/* Y axis */}
          <line x1="100" y1="200" x2="100" y2="300" stroke={GRAY} strokeWidth="1" />
          <text x="55" y="250" textAnchor="middle" fill={GRAY} fontSize="9" transform="rotate(-90, 55, 250)">||row sum - 1||</text>

          {/* Error curve — exponential decay */}
          <polyline
            points="100,205 220,250 340,280 460,293 580,298 700,299"
            fill="none" stroke={SKY} strokeWidth="2.5"
          />
          {[
            { x: 100, y: 205, label: '1.3' },
            { x: 220, y: 250, label: '0.3' },
            { x: 340, y: 280, label: '0.05' },
            { x: 460, y: 293, label: '0.007' },
            { x: 580, y: 298, label: '0.001' },
            { x: 700, y: 299, label: '~0' },
          ].map(({ x, y, label }, i) => (
            <g key={`pt-${i}`}>
              <circle cx={x} cy={y} r="4" fill={SKY} />
              <text x={x} y={y - 10} textAnchor="middle" fill={SKY3} fontSize="9">{label}</text>
            </g>
          ))}

          {/* Exponential rate label */}
          <rect x="500" y="235" width="190" height="22" rx="5" fill={SKY} fillOpacity="0.1" stroke={SKY} strokeWidth="1" />
          <text x="595" y="250" textAnchor="middle" fill={SKY} fontSize="10" fontWeight="600">Exponentially fast convergence</text>
        </svg>
      </Diagram>

      <StepFlow
        color={SKY}
        steps={[
          {
            title: 'Parameterize',
            desc: 'Store raw unconstrained matrices M_α, M_β as learnable parameters. These are just regular n×n matrices of real numbers that the optimizer (Adam) updates freely.',
          },
          {
            title: 'Exponentiate',
            desc: 'Compute A = exp(M) entry-wise. This guarantees all entries are strictly positive, which is required for Sinkhorn-Knopp convergence. The exp function is smooth, so gradients flow.',
          },
          {
            title: 'Sinkhorn Iterate',
            desc: 'Alternate T times between row normalization (A_ij / Σ_k A_ik) and column normalization (A_ij / Σ_k A_kj). Each iteration doubles the number of correct digits. T=5-10 suffices.',
          },
          {
            title: 'Use as Mixing Matrix',
            desc: 'The output M_hat is approximately doubly stochastic. Use it as the mixing matrix for the forward pass. Gradients backpropagate through all T Sinkhorn iterations to the raw parameters M.',
          },
        ]}
      />

      <SimpleExplain>
        <p><strong>The Sinkhorn trick in everyday terms:</strong> Imagine you have a spreadsheet where the numbers are all over the place. You want every row to add up to exactly 1 and every column to add up to exactly 1. Sinkhorn says: just keep doing two things — (1) divide each row by its total, (2) divide each column by its total. Repeat. Within 5-10 rounds, every row and column will sum to exactly 1. It is like balancing a seesaw by alternating which end you push down — it stabilizes incredibly fast.</p>
      </SimpleExplain>

      <Callout type="math">
        <strong>Why Sinkhorn-Knopp is differentiable:</strong> Each iteration consists of two operations —
        row division and column division. Both are compositions of sums and divisions, which are smooth
        (differentiable) functions. The <H tip="Autograd = the automatic differentiation engine in PyTorch/JAX that records all operations in a computational graph and computes gradients via the chain rule. If every operation in the forward pass is differentiable, autograd can compute exact gradients for all parameters." color={SKY}>autograd</H> engine
        simply unrolls the T iterations as a deep computation graph and backpropagates through all of them.
        The gradient of the final doubly stochastic matrix with respect to the raw parameters M captures
        both the &ldquo;which direction improves the loss&rdquo; signal AND the &ldquo;stay on the Birkhoff Polytope&rdquo; constraint.
        This is a <H tip="Riemannian optimization = optimizing over a constrained manifold (here, the Birkhoff Polytope) by projecting gradients onto the tangent space of the manifold. Sinkhorn-Knopp provides an efficient differentiable parameterization that achieves a similar effect without explicit manifold computations." color={PURPLE}>manifold-constrained optimization</H> — hence the name &ldquo;manifold-constrained&rdquo; Hyper-Connections.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — THE FULL mHC ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="The Full mHC Forward Pass"
        subtitle="How sub-streams, mixing matrices, and layers work together"
        color={SKY}
      />

      <Prose>
        <p>
          Now let us put all the pieces together. In mHC with expansion factor <H tip="Expansion factor n = the number of parallel sub-streams in the widened residual stream. n=2 means double width, n=4 means quadruple width. The paper finds n=2 gives the best speed-quality tradeoff, with n=4 providing diminishing returns." color={SKY}>n</H>,
          the <H tip="Residual stream = the main data pathway through the network. In a standard Transformer, it carries one d-dimensional vector per token per layer. In mHC, it carries n such vectors, for a total width of n×d per token." color={SKY}>residual stream</H> carries <strong>n sub-streams</strong>, each of dimension d.
          At each layer, the following happens:
        </p>
        <p>
          First, the <H tip="Input mixing = the process of combining n sub-streams into a single d-dimensional vector that the layer (attention or FFN) will process. Controlled by the input mixing matrix α, which is constrained to be doubly stochastic via Sinkhorn-Knopp. Each row of α specifies the weights for combining sub-streams." color={SKY}>input mixing matrix α</H> (Sinkhorn-projected to be doubly stochastic) creates
          a weighted combination of the n sub-streams to feed into the layer. Then the layer
          (<H tip="Attention layer = the multi-head self-attention mechanism that lets tokens exchange information. In mHC, the attention layer receives a single d-dimensional vector per token (after input mixing) and outputs a single d-dimensional vector. The layer itself is unchanged — only the residual connection around it is modified." color={CYAN}>attention</H> or <H tip="Feed-forward network (FFN) = the two-layer MLP applied independently to each token after attention. In DeepSeek-V3, this uses SwiGLU activation with hidden dimension 18432 (2.57× the model dimension 7168). In MoE layers, multiple expert FFNs are used." color={CYAN}>FFN</H>) processes this combined input as usual. Finally, the
          <H tip="Output mixing matrix β = the second doubly stochastic matrix that distributes the layer's output back into the n sub-streams. It also incorporates the residual connection — the original sub-streams are mixed with the layer output according to β. This is where the 'hyper' in Hyper-Connections comes from." color={SKY}>output mixing matrix β</H> distributes the layer&apos;s output (combined with the residual)
          back into the n sub-streams.
        </p>
        <p>
          The key property: because both α and β are doubly stochastic, the <H tip="Signal norm = the L2 norm (magnitude) of the hidden state vectors. If mixing matrices preserve the weighted sum structure (doubly stochastic), then the signal norm remains bounded — it cannot grow exponentially across layers (exploding) or shrink to zero (vanishing)." color={GREEN}>signal norm</H> is
          preserved through each layer. At initialization (where layer outputs are near zero), the entire
          system reduces to the identity: each sub-stream passes through unchanged. As training progresses,
          the mixing matrices learn to blend sub-streams in increasingly complex ways — but always within
          the Birkhoff Polytope, so the identity mapping property holds throughout.
        </p>
      </Prose>

      <Diagram caption="Full mHC forward pass for one layer with n=3 sub-streams. Input mixing (α) combines streams, the layer processes them, output mixing (β) redistributes. Both α and β are doubly stochastic via Sinkhorn.">
        <svg viewBox="0 0 900 500" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="mhc-fw-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={SKY} />
            </marker>
            <marker id="mhc-fw-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <linearGradient id="mhc-layer-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
          </defs>
          <rect width="900" height="500" rx="12" fill={BG} />

          <text x="450" y="28" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="700">mHC FORWARD PASS (one layer, n=3)</text>

          {/* Input sub-streams (left) */}
          <text x="70" y="65" textAnchor="middle" fill={GRAY} fontSize="10" fontWeight="600">INPUT</text>
          {[0, 1, 2].map(i => (
            <g key={`in-${i}`}>
              <rect x="30" y={85 + i * 55} width="80" height="40" rx="8" fill={SKY} fillOpacity={0.12 + i * 0.06} stroke={SKY} strokeWidth="1.5" />
              <text x="70" y={110 + i * 55} textAnchor="middle" fill={SKY} fontSize="12" fontWeight="600">{`s${i + 1}`}</text>
              <text x="70" y={122 + i * 55} textAnchor="middle" fill={GRAY} fontSize="8">(d={7168})</text>
            </g>
          ))}

          {/* Arrows from sub-streams to α */}
          {[0, 1, 2].map(i => (
            <line key={`arr-in-${i}`} x1="115" y1={105 + i * 55} x2="165" y2={105 + i * 55} stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-fw-arr)" />
          ))}

          {/* Input mixing matrix α */}
          <rect x="170" y="70" width="130" height="130" rx="10" fill={SKY} fillOpacity="0.1" stroke={SKY} strokeWidth="2" />
          <text x="235" y="92" textAnchor="middle" fill={SKY3} fontSize="13" fontWeight="700">α (3×3)</text>
          <text x="235" y="110" textAnchor="middle" fill={GRAY} fontSize="9">Sinkhorn-projected</text>
          <text x="235" y="125" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="600">doubly stochastic</text>

          {/* Example matrix values */}
          <text x="200" y="152" fill={FG} fontSize="9" fontFamily="monospace">0.7 0.2 0.1</text>
          <text x="200" y="164" fill={FG} fontSize="9" fontFamily="monospace">0.1 0.6 0.3</text>
          <text x="200" y="176" fill={FG} fontSize="9" fontFamily="monospace">0.2 0.2 0.6</text>

          <text x="235" y="192" textAnchor="middle" fill={GREEN} fontSize="8">rows & cols sum = 1</text>

          {/* Arrow from α to layer */}
          <line x1="305" y1="135" x2="355" y2="135" stroke={SKY} strokeWidth="2" markerEnd="url(#mhc-fw-arr)" />
          <text x="330" y="125" textAnchor="middle" fill={GRAY} fontSize="8">h = α · [s₁;s₂;s₃]</text>

          {/* Layer block */}
          <rect x="360" y="60" width="180" height="150" rx="12" fill="url(#mhc-layer-g)" stroke={SKY} strokeWidth="2" />
          <text x="450" y="90" textAnchor="middle" fill={SKY} fontSize="12" fontWeight="800" letterSpacing="1">TRANSFORMER</text>
          <text x="450" y="108" textAnchor="middle" fill={SKY} fontSize="12" fontWeight="800" letterSpacing="1">LAYER</text>

          <rect x="385" y="120" width="130" height="30" rx="6" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="1" />
          <text x="450" y="140" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="600">Attention / FFN</text>

          <text x="450" y="170" textAnchor="middle" fill={GRAY} fontSize="9">Processes single d-dim</text>
          <text x="450" y="183" textAnchor="middle" fill={GRAY} fontSize="9">vector (unchanged)</text>
          <text x="450" y="200" textAnchor="middle" fill={FG} fontSize="10" fontWeight="600">f(h)</text>

          {/* Arrow from layer to β */}
          <line x1="545" y1="135" x2="595" y2="135" stroke={SKY} strokeWidth="2" markerEnd="url(#mhc-fw-arr)" />

          {/* Output mixing matrix β */}
          <rect x="600" y="70" width="130" height="130" rx="10" fill={SKY} fillOpacity="0.1" stroke={SKY} strokeWidth="2" />
          <text x="665" y="92" textAnchor="middle" fill={SKY3} fontSize="13" fontWeight="700">β (3×3)</text>
          <text x="665" y="110" textAnchor="middle" fill={GRAY} fontSize="9">Sinkhorn-projected</text>
          <text x="665" y="125" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="600">doubly stochastic</text>

          {/* Example matrix values */}
          <text x="630" y="152" fill={FG} fontSize="9" fontFamily="monospace">0.5 0.3 0.2</text>
          <text x="630" y="164" fill={FG} fontSize="9" fontFamily="monospace">0.3 0.4 0.3</text>
          <text x="630" y="176" fill={FG} fontSize="9" fontFamily="monospace">0.2 0.3 0.5</text>

          <text x="665" y="192" textAnchor="middle" fill={GREEN} fontSize="8">rows & cols sum = 1</text>

          {/* Arrows from β to output sub-streams */}
          {[0, 1, 2].map(i => (
            <line key={`arr-out-${i}`} x1="735" y1={105 + i * 55} x2="785" y2={105 + i * 55} stroke={SKY} strokeWidth="1.5" markerEnd="url(#mhc-fw-arr)" />
          ))}

          {/* Output sub-streams (right) */}
          <text x="830" y="65" textAnchor="middle" fill={GRAY} fontSize="10" fontWeight="600">OUTPUT</text>
          {[0, 1, 2].map(i => (
            <g key={`out-${i}`}>
              <rect x="790" y={85 + i * 55} width="80" height="40" rx="8" fill={SKY} fillOpacity={0.12 + i * 0.06} stroke={SKY} strokeWidth="1.5" />
              <text x="830" y={110 + i * 55} textAnchor="middle" fill={SKY} fontSize="12" fontWeight="600">{`s${i + 1}'`}</text>
            </g>
          ))}

          {/* Residual skip connections shown as dashed curves at bottom */}
          <text x="450" y="260" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700">RESIDUAL CONNECTIONS (skip paths)</text>
          <path d="M70,250 C70,320 830,320 830,250" fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="450" y="310" textAnchor="middle" fill={GRAY} fontSize="9">Original sub-streams blended into output via β</text>

          {/* Bottom: Identity mapping guarantee */}
          <rect x="150" y="340" width="600" height="75" rx="10" fill={GREEN} fillOpacity="0.05" stroke={GREEN} strokeWidth="1.5" />
          <text x="450" y="362" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700">IDENTITY MAPPING GUARANTEE</text>
          <text x="450" y="380" textAnchor="middle" fill={FG} fontSize="10">At initialization: f(h) ≈ 0 and α = β = I (identity)</text>
          <text x="450" y="395" textAnchor="middle" fill={FG} fontSize="10">→ each sub-stream passes through unchanged: s&apos; = s</text>
          <text x="450" y="410" textAnchor="middle" fill={GRAY} fontSize="9">During training: α, β evolve within Birkhoff Polytope → mixing happens but total weight is conserved</text>

          {/* Parameter cost annotation */}
          <rect x="260" y="435" width="380" height="50" rx="8" fill={SKY} fillOpacity="0.05" stroke={SKY} strokeWidth="1" strokeDasharray="4 3" />
          <text x="450" y="455" textAnchor="middle" fill={SKY} fontSize="10" fontWeight="600">Extra parameters per layer: 2 × n² (one α, one β)</text>
          <text x="450" y="472" textAnchor="middle" fill={GRAY} fontSize="9">For n=2: 8 extra params per layer. For 60 layers: 480 params total. Negligible.</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="mHC Forward Pass — Complete Formulation"
        color={SKY}
        steps={[
          {
            note: 'The residual stream carries n sub-streams, each of dimension d. Stack them into a single (n×d)-dimensional vector S.',
            math: 'S^{(l)} = \\bigl[s_1^{(l)},\\, s_2^{(l)},\\, \\ldots,\\, s_n^{(l)}\\bigr] \\in \\mathbb{R}^{n \\times d}',
          },
          {
            note: 'Input mixing: apply the doubly stochastic matrix α to blend sub-streams into a single d-dimensional input for the layer. Each sub-stream contributes according to the learned (but constrained) weights.',
            math: 'h^{(l)} = \\hat{\\alpha}^{(l)}\\, S^{(l)}, \\quad \\hat{\\alpha}^{(l)} = \\text{Sinkhorn}\\bigl(\\alpha^{(l)},\\, T\\bigr) \\in \\mathcal{B}_n',
          },
          {
            note: 'Layer computation: the layer (attention or FFN) processes the mixed input exactly as in a standard Transformer. This is key — the layer itself is unchanged, only the residual connection around it is modified.',
            math: 'y^{(l)} = f^{(l)}\\bigl(h^{(l)}\\bigr)',
          },
          {
            note: 'Output mixing: the doubly stochastic matrix β distributes the layer output back into n sub-streams, blended with the original sub-streams (residual). The result is the updated residual stream for the next layer.',
            math: 'S^{(l+1)} = \\hat{\\beta}^{(l)} \\cdot \\bigl[S^{(l)};\\, y^{(l)}\\bigr], \\quad \\hat{\\beta}^{(l)} = \\text{Sinkhorn}\\bigl(\\beta^{(l)},\\, T\\bigr) \\in \\mathcal{B}_n',
          },
        ]}
        symbols={[
          { symbol: 'S^(l)', meaning: 'Stack of n sub-streams at layer l, each d-dimensional' },
          { symbol: 'h^(l)', meaning: 'Mixed input to layer l (single d-dim vector)' },
          { symbol: 'alpha^(l)', meaning: 'Raw input mixing parameters for layer l (n×n)' },
          { symbol: 'alpha_hat', meaning: 'Sinkhorn-projected input mixing matrix (doubly stochastic)' },
          { symbol: 'f^(l)', meaning: 'Layer computation (attention or FFN) at layer l' },
          { symbol: 'y^(l)', meaning: 'Output of layer l (d-dimensional)' },
          { symbol: 'beta^(l)', meaning: 'Raw output mixing parameters for layer l' },
          { symbol: 'n', meaning: 'Number of sub-streams (expansion factor)' },
          { symbol: 'd', meaning: 'Model hidden dimension (e.g., 7168 in DeepSeek-V3)' },
        ]}
      />

      <FormulaBlock
        math="S^{(l+1)} = \hat{\beta}^{(l)} \cdot \bigl[S^{(l)};\, f^{(l)}\bigl(\hat{\alpha}^{(l)} S^{(l)}\bigr)\bigr], \quad \hat{\alpha}, \hat{\beta} \in \mathcal{B}_n"
        label="mHC — Core Update Rule"
        color={SKY}
        symbols={[
          { symbol: 'B_n', meaning: 'Birkhoff Polytope (set of doubly stochastic matrices)' },
          { symbol: 'S', meaning: 'Stacked sub-streams' },
          { symbol: '[·;·]', meaning: 'Concatenation of original sub-streams and layer output' },
        ]}
      />

      <ConceptCard title="Why the Layer Itself is Unchanged" color={CYAN} defaultOpen={true}>
        <Prose>
          <p>
            A beautiful aspect of mHC: the <H tip="Attention mechanism = the core computation Q·Kᵀ/√d → softmax → ·V. This is unchanged in mHC — the attention layer receives a d-dimensional input and produces a d-dimensional output. Only the residual connection wrapping it is modified." color={CYAN}>attention</H> and <H tip="FFN layers = the position-wise feed-forward networks. In standard Transformers: FFN(x) = W₂·σ(W₁·x + b₁) + b₂. In DeepSeek-V3 with SwiGLU: FFN(x) = (Swish(W₁·x) ⊙ V·x)·W₂. These are completely unchanged in mHC." color={CYAN}>FFN layers</H> themselves
            do not change at all. They still receive a d-dimensional input and produce a d-dimensional
            output. Only the <em>plumbing around them</em> — how inputs are assembled from the residual
            stream and how outputs are written back — is modified. This means:
          </p>
          <p>
            <strong>1.</strong> Existing <H tip="Attention kernel = optimized GPU code (like FlashAttention) that computes multi-head attention efficiently. These kernels are carefully tuned for specific dimensions and memory access patterns. mHC does not change the attention computation, so all existing kernels work unchanged." color={CYAN}>attention kernels</H> (FlashAttention, etc.) work unchanged.
          </p>
          <p>
            <strong>2.</strong> <H tip="Pre-trained weights = the parameters learned during initial training. Since mHC only adds small mixing matrices (n² per layer), existing pre-trained attention and FFN weights can be directly reused. The mixing matrices are initialized to identity (no mixing), so the model starts identical to the original." color={GREEN}>Pre-trained weights</H> can be directly loaded — just initialize α and β to identity.
          </p>
          <p>
            <strong>3.</strong> The overhead is minimal: 2n² extra parameters per layer (the mixing
            matrices), plus n× memory for the widened residual stream. For n=2 and d=7168, the mixing
            matrices add 8 parameters per layer — literally nothing. The memory overhead is the extra
            sub-stream copies, which accounts for the 6-7% total overhead.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        mHC is a <strong>surgical modification</strong>: it only changes the residual connections, not the
        layers. The attention mechanism, the FFN, the normalization — all unchanged. This makes mHC a
        drop-in upgrade for any existing Transformer architecture. Initialize mixing matrices to identity,
        and the model starts as if mHC were not there. Then training discovers the optimal mixing pattern.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — EXPERIMENTS AND RESULTS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Experiments — Does the Math Actually Work?"
        subtitle="Training curves, scaling laws, and the 27B frontier"
        color={SKY}
      />

      <Prose>
        <p>
          The paper validates mHC across multiple model scales, from <H tip="Small-scale experiments = models in the 1-3B parameter range used for rapid iteration and ablation studies. At this scale, training takes hours-to-days instead of weeks-to-months, allowing systematic comparison of design choices." color={SKY}>small-scale ablations</H> (1-3B)
          to a full <strong>27B parameter</strong> model. The experiments answer three critical questions:
          (1) Does mHC actually improve over standard residual connections? (2) Does it fix HC&apos;s instability?
          (3) What is the real-world overhead?
        </p>
      </Prose>

      <Diagram caption="Training loss curves: Standard residual vs HC (unstable) vs mHC (stable and lower). HC diverges at large scale while mHC maintains stable convergence throughout.">
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="380" rx="12" fill={BG} />

          <text x="400" y="28" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="700">TRAINING LOSS COMPARISON (27B scale)</text>

          {/* Axes */}
          <line x1="80" y1="50" x2="80" y2="310" stroke={GRAY} strokeWidth="1" />
          <line x1="80" y1="310" x2="740" y2="310" stroke={GRAY} strokeWidth="1" />
          <text x="40" y="180" textAnchor="middle" fill={GRAY} fontSize="10" transform="rotate(-90, 40, 180)">Training Loss</text>
          <text x="410" y="340" textAnchor="middle" fill={GRAY} fontSize="10">Training Steps (thousands)</text>

          {/* Y-axis ticks */}
          {[
            { y: 70, label: '3.0' },
            { y: 130, label: '2.5' },
            { y: 190, label: '2.0' },
            { y: 250, label: '1.5' },
            { y: 310, label: '1.0' },
          ].map(({ y, label }) => (
            <g key={`y-${label}`}>
              <line x1="75" y1={y} x2="80" y2={y} stroke={GRAY} strokeWidth="1" />
              <text x="70" y={y + 4} textAnchor="end" fill={GRAY} fontSize="9">{label}</text>
            </g>
          ))}

          {/* X-axis ticks */}
          {[0, 50, 100, 150, 200, 250].map((v, i) => (
            <g key={`x-${v}`}>
              <line x1={80 + i * 132} y1="310" x2={80 + i * 132} y2="315" stroke={GRAY} strokeWidth="1" />
              <text x={80 + i * 132} y="328" textAnchor="middle" fill={GRAY} fontSize="9">{v}k</text>
            </g>
          ))}

          {/* Standard residual curve (gray) — steady, moderate */}
          <polyline
            points="80,75 146,120 212,155 278,180 344,198 410,212 476,222 542,230 608,236 674,240 740,243"
            fill="none" stroke={GRAY} strokeWidth="2.5" strokeDasharray="6 4"
          />

          {/* HC curve (red/amber) — starts good then diverges */}
          <polyline
            points="80,75 146,115 212,145 278,165 344,178 410,175 476,180 542,195 608,220 674,250 740,290"
            fill="none" stroke={RED} strokeWidth="2.5"
          />
          {/* Instability spike */}
          <text x="680" y="260" fill={RED} fontSize="10" fontWeight="600">Diverges!</text>

          {/* mHC curve (sky blue) — stable and lower */}
          <polyline
            points="80,75 146,110 212,140 278,162 344,178 410,190 476,198 542,204 608,208 674,211 740,213"
            fill="none" stroke={SKY} strokeWidth="3"
          />

          {/* Legend */}
          <rect x="440" y="60" width="280" height="85" rx="8" fill={BG} stroke="#1e3a5f" strokeWidth="1" />
          <line x1="460" y1="82" x2="500" y2="82" stroke={GRAY} strokeWidth="2.5" strokeDasharray="6 4" />
          <text x="510" y="86" fill={GRAY} fontSize="10">Standard Residual</text>

          <line x1="460" y1="102" x2="500" y2="102" stroke={RED} strokeWidth="2.5" />
          <text x="510" y="106" fill={RED} fontSize="10">HC (unconstrained mixing)</text>

          <line x1="460" y1="122" x2="500" y2="122" stroke={SKY} strokeWidth="3" />
          <text x="510" y="126" fill={SKY} fontSize="10" fontWeight="600">mHC (Birkhoff-constrained)</text>

          {/* Annotation: gap */}
          <line x1="745" y1="213" x2="760" y2="213" stroke={SKY} strokeWidth="1" />
          <line x1="745" y1="243" x2="760" y2="243" stroke={GRAY} strokeWidth="1" />
          <line x1="760" y1="213" x2="760" y2="243" stroke={GREEN} strokeWidth="1.5" />
          <text x="770" y="232" fill={GREEN} fontSize="9" fontWeight="600">Gap</text>

          {/* Bottom annotation */}
          <rect x="150" y="352" width="500" height="22" rx="5" fill={SKY} fillOpacity="0.08" stroke={SKY} strokeWidth="1" />
          <text x="400" y="367" textAnchor="middle" fill={SKY} fontSize="10" fontWeight="600">mHC achieves lower final loss than standard residual, with stable training throughout</text>
        </svg>
      </Diagram>

      <StatBar
        stats={[
          { value: '1.5%', unit: '', label: 'Loss Improvement (1B)', color: SKY },
          { value: '2.3%', unit: '', label: 'Loss Improvement (7B)', color: SKY2 },
          { value: '3.1%', unit: '', label: 'Loss Improvement (27B)', color: GREEN },
          { value: '6-7%', unit: '', label: 'Compute Overhead', color: AMBER },
        ]}
      />

      <ConceptCard title="Ablation: Expansion Factor n" color={SKY} defaultOpen={true}>
        <Prose>
          <p>
            The <H tip="Expansion factor n = how many sub-streams the residual stream is split into. n=1 means no expansion (standard residual). n=2 doubles the width. n=4 quadruples it. Higher n = more capacity but more memory." color={SKY}>expansion factor n</H> controls the tradeoff between capacity and cost. The paper
            finds that <strong>n=2</strong> gives the best bang for the buck — doubling the stream width
            captures most of the benefit with minimal overhead. Going to n=4 provides diminishing returns
            while doubling the memory cost again.
          </p>
        </Prose>
        <ComparisonTable
          headers={['Expansion n', 'Stream Width', 'Extra Params/Layer', 'Loss Improvement', 'Overhead']}
          rows={[
            ['1 (standard)', 'd', '0', 'Baseline', '0%'],
            ['2 (recommended)', '2d', '8', '~2-3%', '~6%'],
            ['3', '3d', '18', '~3-4%', '~12%'],
            ['4', '4d', '32', '~3.5-4%', '~20%'],
          ]}
          caption="n=2 is the sweet spot: significant improvement with minimal overhead"
        />
      </ConceptCard>

      <ConceptCard title="Ablation: Sinkhorn Iterations T" color={SKY} defaultOpen={false}>
        <Prose>
          <p>
            How many <H tip="Sinkhorn iterations = the number of alternating row/column normalization steps. More iterations = closer to exactly doubly stochastic. The question is: how many do we need before the approximation is good enough?" color={SKY}>Sinkhorn iterations</H> are needed?
            The paper finds that <strong>T=5</strong> is sufficient — the approximation error is below
            machine precision, and there is no measurable difference between T=5 and T=20 in downstream
            performance. Since each iteration is just two matrix operations (row norm + col norm), the
            compute cost is negligible.
          </p>
        </Prose>
        <ComparisonTable
          headers={['Iterations T', 'Max Row Sum Error', 'Max Col Sum Error', 'Final Loss', 'Extra Time']}
          rows={[
            ['1', '0.05', '0.08', '2.31', '+0.1%'],
            ['3', '0.002', '0.003', '2.28', '+0.3%'],
            ['5 (default)', '< 1e-6', '< 1e-6', '2.27', '+0.5%'],
            ['10', '< 1e-12', '< 1e-12', '2.27', '+1.0%'],
          ]}
          caption="T=5 achieves machine-precision doubly stochastic matrices with negligible overhead"
        />
      </ConceptCard>

      <Diagram caption="Scaling behavior: mHC's improvement over standard residual INCREASES with model size. The larger the model, the more the wider residual stream helps.">
        <svg viewBox="0 0 800 320" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="320" rx="12" fill={BG} />

          <text x="400" y="28" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="700">mHC IMPROVEMENT SCALES WITH MODEL SIZE</text>

          {/* Axes */}
          <line x1="120" y1="50" x2="120" y2="260" stroke={GRAY} strokeWidth="1" />
          <line x1="120" y1="260" x2="720" y2="260" stroke={GRAY} strokeWidth="1" />
          <text x="50" y="155" textAnchor="middle" fill={GRAY} fontSize="10" transform="rotate(-90, 50, 155)">Loss Improvement (%)</text>
          <text x="420" y="290" textAnchor="middle" fill={GRAY} fontSize="10">Model Size (parameters)</text>

          {/* Y-axis ticks */}
          {[
            { y: 80, label: '4%' },
            { y: 140, label: '2.5%' },
            { y: 200, label: '1%' },
            { y: 260, label: '0%' },
          ].map(({ y, label }) => (
            <g key={`ys-${label}`}>
              <line x1="115" y1={y} x2="120" y2={y} stroke={GRAY} strokeWidth="1" />
              <text x="108" y={y + 4} textAnchor="end" fill={GRAY} fontSize="9">{label}</text>
            </g>
          ))}

          {/* Bars for different model sizes */}
          {[
            { x: 200, size: '1B', pct: 1.5, h: 54, color: SKY },
            { x: 340, size: '3B', pct: 1.9, h: 68, color: SKY },
            { x: 480, size: '7B', pct: 2.3, h: 83, color: SKY2 },
            { x: 620, size: '27B', pct: 3.1, h: 112, color: GREEN },
          ].map(({ x, size, pct, h, color: c }) => (
            <g key={`bar-${size}`}>
              <rect x={x - 30} y={260 - h} width="60" height={h} rx="6" fill={c} fillOpacity="0.25" stroke={c} strokeWidth="1.5" />
              <text x={x} y={260 - h - 10} textAnchor="middle" fill={c} fontSize="13" fontWeight="700">{pct}%</text>
              <text x={x} y={278} textAnchor="middle" fill={FG} fontSize="11" fontWeight="600">{size}</text>
            </g>
          ))}

          {/* Trend line */}
          <polyline
            points="200,206 340,192 480,177 620,148"
            fill="none" stroke={SKY} strokeWidth="2" strokeDasharray="6 4"
          />

          {/* Bottom insight */}
          <rect x="200" y="298" width="400" height="18" rx="4" fill={GREEN} fillOpacity="0.08" />
          <text x="400" y="312" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600">Larger models benefit MORE from wider residual streams</text>
        </svg>
      </Diagram>

      <VisualCompare
        leftLabel="HC at 27B"
        rightLabel="mHC at 27B"
        leftColor={RED}
        rightColor={SKY}
        left={<>
          <p style={{color:RED}}>Training diverges after ~150K steps</p>
          <p>Mixing matrices develop extreme eigenvalues</p>
          <p>Signal norm grows exponentially across layers</p>
          <p>Requires learning rate reduction (kills convergence speed)</p>
        </>}
        right={<>
          <p style={{color:GREEN}}>Training remains stable for 250K+ steps</p>
          <p>Mixing matrices stay on Birkhoff Polytope</p>
          <p>Signal norm bounded by doubly stochastic constraint</p>
          <p style={{color:GREEN}}>Full learning rate maintained throughout</p>
        </>}
        caption="At 27B scale, the Birkhoff constraint is the difference between success and failure"
      />

      <Callout type="insight">
        The scaling trend is the most important result: mHC&apos;s advantage <em>grows</em> with model size.
        At 1B the improvement is modest (1.5%). At 27B it is significant (3.1%). This suggests that
        as models continue to scale to 100B+ and beyond, the <H tip="Residual bottleneck = the fundamental constraint that all information must pass through a fixed-width stream. As models get deeper and wider, this bottleneck becomes more severe — there is simply too much information to fit into d dimensions. mHC alleviates this by expanding to n×d." color={SKY}>residual bottleneck</H> becomes
        increasingly severe, and mHC&apos;s wider streams become increasingly valuable. The 6-7% overhead
        pays for itself many times over.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — WHY THIS MATTERS & BROADER IMPLICATIONS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Why This Matters — The Bigger Picture"
        subtitle="From residual connections to the geometry of deep learning optimization"
        color={SKY}
      />

      <Prose>
        <p>
          mHC is not just a better residual connection — it represents a broader principle:
          <strong> constrained parameterization</strong>. Instead of adding a component and hoping the
          <H tip="Optimizer (Adam, AdamW) = the algorithm that updates neural network parameters to minimize the loss. Adam maintains per-parameter running averages of gradients and squared gradients, adapting the learning rate for each parameter independently. It does not 'know' about constraints like doubly stochastic — it just follows gradients." color={SKY}>optimizer</H> finds good parameters, you <em>mathematically guarantee</em> that the
          parameters live in a space where bad things cannot happen. The Birkhoff Polytope is the
          &ldquo;safe zone&rdquo; for mixing matrices — inside it, identity mapping holds, signal norms are
          bounded, and training is stable.
        </p>
        <p>
          This idea generalizes. Any time you add learnable matrices to a neural network — <H tip="Attention weights = the softmax(QKᵀ/√d) matrix in self-attention. These are already constrained to be row-stochastic (each row sums to 1 via softmax). mHC applies a similar but stronger constraint (doubly stochastic) to mixing matrices." color={CYAN}>routing
          matrices in MoE</H>, <H tip="Gating mechanisms = learnable functions that control information flow. Examples: the gate in LSTM cells, the router in Mixture-of-Experts, the mixing matrices in HC. When these gates are unconstrained, they can amplify or suppress signals, causing instability." color={CYAN}>gating mechanisms</H>, <H tip="Adapter matrices = small learnable matrices added during fine-tuning (LoRA, etc.). These modify the pre-trained model's behavior with minimal parameters. mHC's principle applies: constraining these matrices to preserve signal norms could improve fine-tuning stability." color={CYAN}>adapter matrices</H> in fine-tuning — the
          question &ldquo;what is the right constraint set?&rdquo; is central. mHC&apos;s answer for residual stream
          mixing is the Birkhoff Polytope, enforced via Sinkhorn-Knopp. Other components may benefit
          from other <H tip="Manifold constraint = restricting parameters to lie on a specific geometric surface (manifold) rather than in unconstrained Euclidean space. Examples: orthogonal matrices (Stiefel manifold), doubly stochastic matrices (Birkhoff Polytope), unit vectors (hypersphere). Each preserves different properties." color={PURPLE}>manifold constraints</H>.
        </p>
        <p>
          The practical impact is immediate. DeepSeek uses mHC in production models. The technique
          applies to <em>any</em> Transformer — language models, vision models, multimodal models.
          It requires no changes to the core attention or FFN computation, no specialized hardware,
          and adds only 6-7% overhead. For frontier models where every percentage point of loss
          improvement translates to measurably better capabilities, this is a significant win.
        </p>
      </Prose>

      <Diagram caption="The broader principle: unconstrained learnable components cause instability at scale. Manifold constraints (like the Birkhoff Polytope) bound the parameter space to a 'safe zone' where the desired properties are guaranteed.">
        <svg viewBox="0 0 800 360" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="360" rx="12" fill={BG} />

          <text x="400" y="28" textAnchor="middle" fill={SKY} fontSize="14" fontWeight="700">CONSTRAINED OPTIMIZATION PRINCIPLE</text>

          {/* Unconstrained space — large gray region */}
          <ellipse cx="280" cy="190" rx="200" ry="140" fill={RED} fillOpacity="0.04" stroke={RED} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="280" y="55" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600">Unconstrained Parameter Space</text>
          <text x="280" y="70" textAnchor="middle" fill={GRAY} fontSize="9">Identity mapping can break here</text>

          {/* Danger zones */}
          <text x="140" y="130" fill={RED} fontSize="9" opacity="0.6">Signal explosion</text>
          <text x="380" y="100" fill={RED} fontSize="9" opacity="0.6">Gradient vanishing</text>
          <text x="120" y="280" fill={RED} fontSize="9" opacity="0.6">Rank collapse</text>

          {/* Birkhoff Polytope — safe zone inside */}
          <polygon
            points="280,110 360,145 370,220 320,280 230,280 190,220 200,145"
            fill={SKY} fillOpacity="0.1" stroke={SKY} strokeWidth="2.5"
          />
          <text x="280" y="175" textAnchor="middle" fill={SKY} fontSize="12" fontWeight="700">Birkhoff</text>
          <text x="280" y="190" textAnchor="middle" fill={SKY} fontSize="12" fontWeight="700">Polytope</text>

          {/* Identity point */}
          <circle cx="280" cy="220" r="5" fill={GREEN} />
          <text x="295" y="218" fill={GREEN} fontSize="9" fontWeight="600">I (identity)</text>

          {/* mHC learned point */}
          <circle cx="310" cy="180" r="4" fill={SKY3} />
          <text x="325" y="177" fill={SKY3} fontSize="9" fontWeight="600">α* (learned)</text>

          {/* HC unconstrained point — outside */}
          <circle cx="400" cy="120" r="4" fill={RED} />
          <text x="415" y="117" fill={RED} fontSize="9" fontWeight="600">HC α (unconstrained)</text>
          <line x1="400" y1="125" x2="370" y2="145" stroke={RED} strokeWidth="1" strokeDasharray="3 2" />

          {/* Right side: principle */}
          <rect x="510" y="70" width="270" height="260" rx="10" fill={BG} stroke="#1e3a5f" strokeWidth="1" />
          <text x="645" y="95" textAnchor="middle" fill={SKY} fontSize="13" fontWeight="700">THE PRINCIPLE</text>

          <text x="530" y="125" fill={FG} fontSize="11" fontWeight="600">1. Identify the property you need</text>
          <text x="540" y="142" fill={GRAY} fontSize="9">→ Identity mapping preservation</text>

          <text x="530" y="170" fill={FG} fontSize="11" fontWeight="600">2. Find the manifold that guarantees it</text>
          <text x="540" y="187" fill={GRAY} fontSize="9">→ Birkhoff Polytope (doubly stochastic)</text>

          <text x="530" y="215" fill={FG} fontSize="11" fontWeight="600">3. Use a differentiable projection</text>
          <text x="540" y="232" fill={GRAY} fontSize="9">→ Sinkhorn-Knopp algorithm</text>

          <text x="530" y="260" fill={FG} fontSize="11" fontWeight="600">4. Train freely within the constraint</text>
          <text x="540" y="277" fill={GRAY} fontSize="9">→ Optimizer explores only safe region</text>

          <rect x="525" y="295" width="240" height="24" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="645" y="312" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600">Stability by construction, not by hope</text>
        </svg>
      </Diagram>

      <StepFlow
        color={SKY}
        steps={[
          {
            title: 'Problem: Fixed-width residual stream',
            desc: 'Standard Transformers force all information through a d-dimensional bottleneck. Each layer must compress its output into the same width, regardless of how much information the computation produces.',
          },
          {
            title: 'Attempt: Hyper-Connections (HC)',
            desc: 'Expand the stream to n×d using n parallel sub-streams mixed via learnable matrices. This works at small scale but the unconstrained mixing matrices break identity mapping at 27B+, causing training instability.',
          },
          {
            title: 'Insight: Birkhoff Polytope',
            desc: 'Doubly stochastic matrices (rows and columns sum to 1) are the maximal constraint set that preserves identity mapping. The identity matrix is always reachable, and no mixing can amplify or suppress total signal.',
          },
          {
            title: 'Solution: Sinkhorn-Knopp projection',
            desc: 'Apply the Sinkhorn-Knopp algorithm (exp + alternating row/col normalization) to project raw learnable parameters onto the Birkhoff Polytope. Fully differentiable, ~0.5% compute cost, T=5 iterations suffice.',
          },
          {
            title: 'Result: mHC',
            desc: 'Stable training at 27B+ scale, 6-7% total overhead, 2-3% loss improvement that scales with model size. Drop-in replacement for any Transformer\'s residual connections. Used in production at DeepSeek.',
          },
        ]}
      />

      <MentalModel
        title="The Guard Rails Analogy"
        analogy="Imagine training a neural network is like driving a car on a mountain road. Standard residual connections are a well-paved straight road — safe but limiting. HC adds extra lanes (wider road) but removes the guard rails — at high speed (large scale), you can fly off the cliff. mHC adds the extra lanes AND installs mathematical guard rails (the Birkhoff constraint). You can drive faster on a wider road, and the guard rails guarantee you can never go over the edge."
        technical="The Birkhoff Polytope constrains the spectral properties of the mixing matrices. Because all doubly stochastic matrices have spectral radius exactly 1, the composition of mixing matrices across L layers has bounded norm (≤ 1 per composition). This prevents the exponential growth or decay of signal norms that plagues unconstrained HC."
        color={SKY}
      />

      <ComparisonTable
        headers={['What', 'Standard', 'HC', 'mHC']}
        rows={[
          ['Stream width', 'd = 7168', '2d = 14336', '2d = 14336'],
          ['Mixing constraint', 'None (addition)', 'None (free matrices)', 'Birkhoff Polytope'],
          ['Identity at init', 'Trivially yes', 'Not guaranteed', 'Guaranteed by construction'],
          ['27B stability', 'Stable', 'Diverges', 'Stable'],
          ['Loss vs standard', 'Baseline', 'N/A (unstable)', '-2.3% (7B) to -3.1% (27B)'],
          ['Overhead', '0%', '~6%', '~6-7%'],
          ['Constraint method', 'N/A', 'N/A', 'Sinkhorn-Knopp (T=5)'],
          ['Extra params/layer', '0', '2n²', '2n² (same)'],
          ['Production ready', 'Yes', 'No', 'Yes (DeepSeek)'],
        ]}
        caption="Summary comparison: mHC gets HC's benefits without its instability"
      />

      <Callout type="key">
        The story of mHC is a story of <strong>mathematical elegance meeting engineering pragmatism</strong>.
        The Birkhoff Polytope has been studied in combinatorics for over a century. The Sinkhorn-Knopp
        algorithm dates to the 1960s. Hyper-Connections are from 2025. mHC connects these ideas to solve
        a practical problem — training instability at scale — with a solution that adds negligible overhead,
        requires no changes to existing infrastructure, and provides provable guarantees. This is how the
        best systems research works: old math, new application, real impact.
      </Callout>
    </>
  );
}
