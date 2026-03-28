import SectionHeader from '../../components/SectionHeader';
import FormulaBlock from '../../components/FormulaBlock';
import Callout from '../../components/Callout';
import StatBar from '../../components/StatBar';
import ConceptCard from '../../components/ConceptCard';
import StepFlow from '../../components/StepFlow';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import Diagram from '../../components/Diagram';
import Prose from '../../components/Prose';

/* ─── colour tokens ─── */
const P = '#8b5cf6';   // primary purple
const P2 = '#a78bfa';  // lighter purple
const CYAN = '#06b6d4';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const RED = '#ef4444';
const GRAY = '#94a3b8';
const BG = '#0f0b1e';  // deep purple-black for SVGs
const FG = '#e2e8f0';

/* ─── SVG helper functions ─── */
const ARROW = (x1, y1, x2, y2, color = P, dashed = false) => (
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

export default function DINOv3Paper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHY DINOv3?
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="Why DINOv3? The Self-Supervised Vision Revolution"
        subtitle="Zero labels, 1.69 billion images, state-of-the-art everywhere"
        color={P}
      />

      <Prose>
        <p>
          Imagine you want to build a vision model that understands <em>everything</em> in an image —
          not just "this is a cat" but the texture of its fur, the depth of the shelf it sits on, the
          boundary between the cat and the background, pixel by pixel. The traditional approach?
          Hire annotators. Label every pixel. For <strong>1.69 billion images</strong>, that would cost
          north of <strong>$17 million</strong> and take years. And you would still only get labels for
          the categories you thought to include.
        </p>
        <p>
          Self-supervised learning (SSL) sidesteps this entirely. The idea is deceptively simple:
          show the model <em>different views of the same image</em> and train it so that those views
          produce similar representations. No labels needed. The image <strong>is</strong> its own
          supervision. DINOv3 pushes this idea to its absolute limit — a <strong>6.7 billion parameter
          </strong> Vision Transformer trained on 1.69B images with zero human labels — and achieves
          state-of-the-art results on dense prediction tasks like segmentation, depth estimation, and
          object tracking.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '6.7B', unit: ' params', label: 'ViT-7B Teacher', color: P },
          { value: '1.69B', unit: ' imgs', label: 'Training Data (LVD)', color: P2 },
          { value: '0', unit: ' labels', label: 'Human Annotations', color: GREEN },
          { value: '66.1', unit: ' mAP', label: 'COCO Detection', color: AMBER },
        ]}
      />

      <ComparisonTable
        headers={['Paradigm', 'Labels Needed', 'Dense Features', 'Scalability', 'Example']}
        rows={[
          ['Supervised', 'Full (per-pixel)', 'Good but expensive', 'Capped by labeling cost', 'SAM, Mask R-CNN'],
          ['Weakly-supervised', 'Tags / captions', 'Mediocre — CLS-biased', 'Scales with web data', 'CLIP, SigLIP'],
          ['Self-supervised', 'None', 'Excellent (DINO family)', 'Scales with compute', 'DINOv2, DINOv3'],
        ]}
        caption="Three paradigms for training vision models — SSL is the only one that scales to billions without annotation cost"
      />

      <ConceptCard title="DINOv3 vs DINOv2: What Actually Changed?" color={P} defaultOpen={true}>
        <Prose>
          <p>
            DINOv2 topped out at <strong>ViT-g (1.1B params)</strong> trained on 142M images. DINOv3
            scales to <strong>ViT-7B (6.7B params)</strong> on <strong>1.69B images</strong>. But
            raw scale is not the contribution — the key innovation is solving a <em>training
            instability</em> that DINOv2 never had to deal with because it trained for fewer iterations.
          </p>
        </Prose>
        <ComparisonTable
          headers={['Property', 'DINOv2 (ViT-g)', 'DINOv3 (ViT-7B)']}
          rows={[
            ['Parameters', '1.1B', '6.7B'],
            ['Embed Dimension', '1536', '4096'],
            ['Layers / Heads', '40 / 24', '40 / 32'],
            ['FFN Type', 'Standard MLP', 'SwiGLU (4096 → 8192 → 4096)'],
            ['Position Encoding', 'Learned absolute', 'RoPE with box-jittering'],
            ['Register Tokens', '0', '4'],
            ['Training Images', '142M (LVD-142M)', '1.69B (LVD-1689M)'],
            ['Training Iterations', '500k', '1M + 50k refinement'],
            ['Gram Anchoring', 'None', 'Yes (key innovation)'],
            ['Dense Feature Quality', 'Degrades at scale', 'Stable via Gram loss'],
          ]}
        />
      </ConceptCard>

      <MentalModel
        title="The Photography Analogy"
        analogy="Think of SSL like learning photography by looking at millions of photos — nobody tells you what is in them, but by seeing the same scene from different angles and crops, you develop an intuitive understanding of objects, depth, texture, and composition. DINOv3 is the photographer who has studied 1.69 billion photos with such intensity that they can describe the scene pixel by pixel."
        technical="Technically, the model learns by matching softmax probability distributions over a shared vocabulary between a teacher network (which sees global crops) and a student network (which sees all crops including small local ones). The teacher is an exponential moving average of the student, creating a self-distillation loop."
        color={P}
      />

      <Callout type="key">
        The central insight of DINOv3: scaling self-supervised ViTs beyond 1B parameters causes dense
        (patch-level) features to <strong>degrade</strong> even as global (CLS) features improve. Gram
        Anchoring is the fix — it preserves the structural relationships between patches throughout
        long training runs. This is the paper's primary contribution.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="Architecture — ViT-7B Backbone"
        subtitle="40 layers, 32 heads, 4096 embed dim, SwiGLU FFN, RoPE, 4 register tokens"
        color={P}
      />

      <Prose>
        <p>
          The backbone is a <strong>Vision Transformer</strong> (ViT) scaled to 6.7 billion parameters.
          The architecture follows a fairly standard design — patch embedding, a stack of transformer
          blocks, and output heads — but every component has been tuned for the self-supervised regime.
          Let us walk through it top to bottom.
        </p>
        <p>
          A <code>518 x 518</code> input image is split into <code>16 x 16</code> patches, producing
          a grid of <strong>1024 patches</strong> at training resolution (or 256 at the standard 256px
          crop). But the actual token count entering the transformer is higher: we prepend a
          <strong> [CLS] token</strong> (for the global image representation) and <strong>4 register
          tokens</strong> (R1-R4) that act as scratch memory for the model. For a 256px crop, that is
          <code>1 + 4 + 256 = 261 tokens</code> flowing through 40 transformer layers.
        </p>
      </Prose>

      {/* ── ViT-7B Architecture SVG ── */}
      <Diagram caption={<><strong>ViT-7B Architecture</strong> — From raw pixels to output tokens. Purple = main data flow, cyan = key dimensions at each stage.</>}>
        <svg viewBox="0 0 960 500" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="dv3-gp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b21b6" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
            <linearGradient id="dv3-gp2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4c1d95" />
            </linearGradient>
            <linearGradient id="dv3-gc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e7490" />
              <stop offset="100%" stopColor="#164e63" />
            </linearGradient>
            <linearGradient id="dv3-gd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <marker id="dv3-ap" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={P} />
            </marker>
            <marker id="dv3-ac" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={CYAN} />
            </marker>
            <marker id="dv3-ag" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GRAY} />
            </marker>
          </defs>

          {/* Background */}
          <rect width="960" height="500" rx="12" fill={BG} />

          {/* ── Stage 1: Input Image ── */}
          <rect x="20" y="160" width="95" height="95" rx="10" fill="url(#dv3-gd)" stroke="#334155" strokeWidth="1.5" />
          {/* Grid lines for patches */}
          {[0,1,2,3].map(i => (
            <g key={`grid-${i}`}>
              <line x1={20 + (i+1)*19} y1={160} x2={20 + (i+1)*19} y2={255} stroke="#334155" strokeWidth="0.5" />
              <line x1={20} y1={160 + (i+1)*19} x2={115} y2={160 + (i+1)*19} stroke="#334155" strokeWidth="0.5" />
            </g>
          ))}
          <text x="67" y="210" textAnchor="middle" fill={P2} fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">518x518</text>
          <text x="67" y="280" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Input Image</text>

          {/* Arrow to patch embed */}
          <line x1="120" y1="207" x2="150" y2="207" stroke={P} strokeWidth="2" markerEnd="url(#dv3-ap)" />

          {/* ── Stage 2: Patch Embedding ── */}
          <rect x="155" y="155" width="110" height="105" rx="10" fill="url(#dv3-gp)" stroke={P} strokeWidth="1.5" />
          <text x="210" y="192" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Patch Embed</text>
          <text x="210" y="212" textAnchor="middle" fill={P2} fontSize="10" fontFamily="Inter, system-ui, sans-serif">16x16 conv</text>
          <text x="210" y="228" textAnchor="middle" fill={P2} fontSize="10" fontFamily="Inter, system-ui, sans-serif">stride 16</text>
          <text x="210" y="248" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">1024 patches</text>

          {/* Arrow to token setup */}
          <line x1="270" y1="207" x2="300" y2="207" stroke={P} strokeWidth="2" markerEnd="url(#dv3-ap)" />

          {/* ── Stage 3: Token Setup ── */}
          <rect x="305" y="130" width="130" height="160" rx="10" fill="url(#dv3-gd)" stroke={P} strokeWidth="1.5" />
          <text x="370" y="152" textAnchor="middle" fill={P2} fontSize="10" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">TOKEN SETUP</text>

          {/* CLS token */}
          <rect x="320" y="162" width="100" height="24" rx="6" fill={P} fillOpacity="0.35" stroke={P} strokeWidth="1" />
          <text x="370" y="179" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">[CLS]</text>

          {/* Register tokens */}
          <rect x="320" y="192" width="100" height="24" rx="6" fill={CYAN} fillOpacity="0.2" stroke={CYAN} strokeWidth="1" />
          <text x="370" y="209" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">[R1] [R2] [R3] [R4]</text>

          {/* Patch tokens */}
          <rect x="320" y="222" width="100" height="24" rx="6" fill={P} fillOpacity="0.15" stroke="#6d28d9" strokeWidth="1" />
          <text x="370" y="239" textAnchor="middle" fill={P2} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">[P1] ... [P1024]</text>

          {/* Dimension label */}
          <rect x="324" y="256" width="92" height="20" rx="4" fill={BG} stroke="#334155" strokeWidth="1" />
          <text x="370" y="270" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">1029 x 4096</text>

          {/* Arrow to transformer */}
          <line x1="440" y1="207" x2="470" y2="207" stroke={P} strokeWidth="2" markerEnd="url(#dv3-ap)" />

          {/* ── Stage 4: Transformer Block (detailed) ── */}
          <rect x="475" y="35" width="240" height="430" rx="12" fill="url(#dv3-gd)" stroke={P} strokeWidth="2" />
          <text x="595" y="60" textAnchor="middle" fill={P} fontSize="12" fontWeight="800" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">TRANSFORMER BLOCK x40</text>

          {/* LayerNorm 1 */}
          <rect x="505" y="80" width="180" height="30" rx="6" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
          <text x="595" y="100" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">LayerNorm</text>

          {/* Arrow */}
          <line x1="595" y1="110" x2="595" y2="125" stroke={P} strokeWidth="1.5" markerEnd="url(#dv3-ap)" />

          {/* MHA */}
          <rect x="505" y="130" width="180" height="55" rx="8" fill="url(#dv3-gp2)" stroke={P} strokeWidth="1.5" />
          <text x="595" y="155" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Multi-Head Attention</text>
          <text x="595" y="173" textAnchor="middle" fill={P2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">32 heads, dim 128, RoPE</text>

          {/* Residual + Add */}
          <line x1="595" y1="185" x2="595" y2="200" stroke={P} strokeWidth="1.5" markerEnd="url(#dv3-ap)" />
          <rect x="555" y="203" width="80" height="24" rx="12" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="595" y="219" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">+ Add</text>
          {/* Residual curve */}
          <path d="M495,155 C480,155 480,215 495,215" fill="none" stroke={GREEN} strokeWidth="1" strokeDasharray="4 2" />

          {/* LayerNorm 2 */}
          <line x1="595" y1="227" x2="595" y2="245" stroke={P} strokeWidth="1.5" markerEnd="url(#dv3-ap)" />
          <rect x="505" y="248" width="180" height="30" rx="6" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
          <text x="595" y="268" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">LayerNorm</text>

          {/* Arrow */}
          <line x1="595" y1="278" x2="595" y2="295" stroke={P} strokeWidth="1.5" markerEnd="url(#dv3-ap)" />

          {/* FFN SwiGLU */}
          <rect x="505" y="298" width="180" height="55" rx="8" fill="url(#dv3-gp2)" stroke={P} strokeWidth="1.5" />
          <text x="595" y="323" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">FFN (SwiGLU)</text>
          <text x="595" y="341" textAnchor="middle" fill={P2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">4096 → 8192 → 4096</text>

          {/* Residual + Add 2 */}
          <line x1="595" y1="353" x2="595" y2="370" stroke={P} strokeWidth="1.5" markerEnd="url(#dv3-ap)" />
          <rect x="555" y="373" width="80" height="24" rx="12" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="595" y="389" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">+ Add</text>
          {/* Residual curve 2 */}
          <path d="M495,325 C480,325 480,385 495,385" fill="none" stroke={GREEN} strokeWidth="1" strokeDasharray="4 2" />

          {/* Loop indicator */}
          <rect x="510" y="410" width="170" height="22" rx="4" fill={BG} stroke="#334155" strokeWidth="1" />
          <text x="595" y="425" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Repeat x40 layers | 6.7B params</text>

          {/* Arrow to output */}
          <line x1="720" y1="207" x2="755" y2="207" stroke={P} strokeWidth="2" markerEnd="url(#dv3-ap)" />

          {/* ── Stage 5: Output Tokens ── */}
          <rect x="760" y="80" width="180" height="340" rx="12" fill="url(#dv3-gd)" stroke={P} strokeWidth="1.5" />
          <text x="850" y="108" textAnchor="middle" fill={P} fontSize="11" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">OUTPUT TOKENS</text>

          {/* CLS output */}
          <rect x="780" y="125" width="140" height="40" rx="8" fill={P} fillOpacity="0.3" stroke={P} strokeWidth="1.5" />
          <text x="850" y="143" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">[CLS] Token</text>
          <text x="850" y="158" textAnchor="middle" fill={P2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Global representation</text>

          {/* Register outputs */}
          <rect x="780" y="180" width="140" height="35" rx="8" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="1" />
          <text x="850" y="202" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">[R1-R4] Registers</text>

          {/* Patch outputs */}
          <rect x="780" y="230" width="140" height="55" rx="8" fill={P} fillOpacity="0.12" stroke="#6d28d9" strokeWidth="1" />
          <text x="850" y="253" textAnchor="middle" fill={P2} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">[P1...P1024]</text>
          <text x="850" y="272" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Dense patch features</text>

          {/* Usage arrows */}
          <text x="850" y="310" textAnchor="middle" fill={GRAY} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">DOWNSTREAM</text>
          <line x1="850" y1="318" x2="850" y2="330" stroke={GRAY} strokeWidth="1" />

          {/* Task boxes */}
          <rect x="775" y="335" width="65" height="24" rx="5" fill={AMBER} fillOpacity="0.15" stroke={AMBER} strokeWidth="1" />
          <text x="807" y="351" textAnchor="middle" fill={AMBER} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Classify</text>

          <rect x="847" y="335" width="50" height="24" rx="5" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="872" y="351" textAnchor="middle" fill={GREEN} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Seg</text>

          <rect x="775" y="365" width="55" height="24" rx="5" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="1" />
          <text x="802" y="381" textAnchor="middle" fill={CYAN} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Depth</text>

          <rect x="837" y="365" width="65" height="24" rx="5" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1" />
          <text x="869" y="381" textAnchor="middle" fill={RED} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Track</text>

          {/* Dimension annotations (below main flow) */}
          <text x="67" y="308" textAnchor="middle" fill={CYAN} fontSize="9" fontFamily="Inter, system-ui, sans-serif">518 x 518 x 3</text>
          <text x="210" y="280" textAnchor="middle" fill={CYAN} fontSize="9" fontFamily="Inter, system-ui, sans-serif">1024 x 4096</text>
          <text x="850" y="408" textAnchor="middle" fill={CYAN} fontSize="9" fontFamily="Inter, system-ui, sans-serif">1029 x 4096</text>
        </svg>
      </Diagram>

      <ConceptCard title="Key Architecture Specs" color={P} defaultOpen={true}>
        <ComparisonTable
          headers={['Component', 'Specification', 'Why This Choice']}
          rows={[
            ['Layers', '40 transformer blocks', 'Matches ViT-g depth — scaling width (4096) instead of depth avoids vanishing gradient issues'],
            ['Attention Heads', '32 (head dim = 128)', '128-dim heads are the sweet spot for attention quality per FLOP'],
            ['Embed Dimension', '4096', '2.67x wider than DINOv2-g (1536) — this is where most parameters live'],
            ['FFN', 'SwiGLU (4096 → 8192 → 4096)', 'SwiGLU outperforms standard GELU MLP at same param count (from LLaMA)'],
            ['Position Encoding', 'RoPE with box-jittering', 'Rotary embeddings generalize to unseen resolutions; jittering prevents overfitting to crop positions'],
            ['Register Tokens', '4 ([R1]-[R4])', 'Absorb attention artifacts that would otherwise corrupt patch features (DINOv2 artifact fix)'],
            ['Patch Size', '16 x 16', 'Standard ViT-16 — smaller patches (8) are too expensive at 7B scale'],
          ]}
        />
      </ConceptCard>

      <FormulaBlock
        math="\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{Q K^\top}{\sqrt{d_k}}\right) V"
        label="Self-Attention — The Communication Step"
        color={P}
        symbols={[
          { symbol: 'Q, K, V', meaning: 'Query, Key, Value matrices — projected from input token embeddings' },
          { symbol: 'd_k', meaning: 'Head dimension = 128 (scaling prevents dot products from getting too large)' },
          { symbol: 'softmax', meaning: 'Converts raw scores to probabilities — each token decides which others to attend to' },
          { symbol: 'QK^T', meaning: 'Dot product between all query-key pairs — measures pairwise token similarity' },
        ]}
      />

      <FormulaBlock
        math="\text{FFN}(x) = \left(\text{SiLU}(x W_1) \odot x W_3\right) W_2"
        label="SwiGLU FFN — The Thinking Step"
        color={P2}
        symbols={[
          { symbol: 'W_1, W_3', meaning: 'Gate and value projection matrices (4096 → 8192)' },
          { symbol: 'W_2', meaning: 'Down projection (8192 → 4096)' },
          { symbol: 'SiLU', meaning: 'Sigmoid Linear Unit — smooth gating function' },
          { symbol: 'odot', meaning: 'Element-wise multiplication — the "gating" that makes SwiGLU powerful' },
        ]}
      />

      <MentalModel
        title="Attention = Communication, FFN = Thinking"
        analogy="Picture a room of 1029 people (tokens). In the Attention phase, everyone talks to everyone else and collects information — 'Hey patch 47, what color are you? Patch 200, are you an edge?' In the FFN phase, each person goes back to their desk and thinks individually about what they learned — transforming raw observations into useful features. This talk-think cycle repeats 40 times, and each round the understanding gets deeper."
        technical="Multi-head attention with 32 heads allows 32 independent communication channels, each focusing on different relationship types (texture, color, spatial proximity, semantic similarity). The SwiGLU FFN provides a gated nonlinearity that outperforms standard ReLU/GELU MLPs by 0.5-1% on downstream tasks."
        color={P}
      />

      <Callout type="insight">
        Register tokens are one of DINOv3's quiet innovations. In DINOv2, researchers noticed that
        some patch tokens would become "artifact sinks" — tokens that absorbed disproportionate
        attention mass but contained no useful information. The 4 register tokens [R1-R4] are explicitly
        added to serve as these sinks, freeing patch tokens to carry clean spatial features. Think of
        them as <strong>scratch paper</strong> the model can write notes on during computation.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — MULTI-CROP TRAINING STRATEGY
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="The Multi-Crop Training Strategy"
        subtitle="2 global crops + 8 local crops — forcing semantic understanding from fragments"
        color={P}
      />

      <Prose>
        <p>
          Here is the setup: take one image and create <strong>10 different views</strong> of it.
          Two of these are <strong>global crops</strong> — large 256x256 patches covering 40-100% of
          the image. The other eight are <strong>local crops</strong> — small 112x112 patches covering
          only 5-40% of the image. These local crops might show just a paw, a bit of background, or
          a patch of fur.
        </p>
        <p>
          The training objective forces the student to produce the <em>same representation</em> for
          the local crop of a paw as the teacher produces for the global crop showing the entire cat.
          This asymmetry is the engine of DINO's learning: the student must develop deep semantic
          understanding to infer the whole from a tiny part.
        </p>
      </Prose>

      {/* ── Multi-Crop Strategy SVG ── */}
      <Diagram caption={<><strong>Multi-Crop Strategy</strong> — One image generates 2 global + 8 local crops. Teacher sees only globals, student sees all 10.</>}>
        <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="mc-gp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b21b6" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
            <marker id="mc-ap" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={P} />
            </marker>
            <marker id="mc-ag" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <marker id="mc-aa" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={AMBER} />
            </marker>
          </defs>

          <rect width="800" height="420" rx="12" fill={BG} />

          {/* Source Image (center) */}
          <rect x="330" y="120" width="140" height="110" rx="10" fill="url(#mc-gp)" stroke={P} strokeWidth="2" />
          <text x="400" y="175" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Source</text>
          <text x="400" y="195" textAnchor="middle" fill={P2} fontSize="11" fontFamily="Inter, system-ui, sans-serif">Image</text>
          <text x="400" y="248" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Original high-res input</text>

          {/* ── Global Crops (top) ── */}
          <text x="400" y="24" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">GLOBAL CROPS (Teacher + Student)</text>

          {/* Global crop 1 */}
          <rect x="220" y="38" width="100" height="70" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="270" y="70" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Global 1</text>
          <text x="270" y="86" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">256x256 (40-100%)</text>

          {/* Global crop 2 */}
          <rect x="480" y="38" width="100" height="70" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="530" y="70" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Global 2</text>
          <text x="530" y="86" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">256x256 (40-100%)</text>

          {/* Arrows from source to global */}
          <line x1="370" y1="120" x2="290" y2="108" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#mc-ag)" />
          <line x1="430" y1="120" x2="510" y2="108" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#mc-ag)" />

          {/* ── Local Crops (bottom) ── */}
          <text x="400" y="280" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">LOCAL CROPS (Student only)</text>

          {/* Arrows from source to local — go below the label */}
          {[0,1,2,3,4,5,6,7].map(i => {
            const x = 147 + i * 75;
            return (
              <line key={`la-${i}`} x1="400" y1="248" x2={x} y2="300" stroke={AMBER} strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#mc-aa)" />
            );
          })}

          {/* 8 local crops */}
          {[0,1,2,3,4,5,6,7].map(i => {
            const x = 120 + i * 75;
            return (
              <g key={`local-${i}`}>
                <rect x={x} y="305" width="55" height="42" rx="7" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1.5" />
                <text x={x + 27} y="332" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">L{i+1}</text>
              </g>
            );
          })}
          <text x="400" y="370" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">112×112 each (5–40% coverage) — may show just a paw, a corner, a texture patch</text>

          {/* Teacher / Student labels */}
          <rect x="20" y="50" width="90" height="50" rx="8" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />
          <text x="65" y="72" textAnchor="middle" fill={P2} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Teacher</text>
          <text x="65" y="88" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">globals only</text>

          <rect x="690" y="50" width="90" height="50" rx="8" fill={CYAN} fillOpacity="0.2" stroke={CYAN} strokeWidth="1" />
          <text x="735" y="72" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Student</text>
          <text x="735" y="88" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">all 10 crops</text>
        </svg>
      </Diagram>

      <ConceptCard title="Why Multi-Crop Works: The Asymmetry Engine" color={P} defaultOpen={true}>
        <Prose>
          <p>
            The key insight is <strong>information asymmetry</strong>. The teacher sees big, context-rich
            crops — enough to understand the full scene. The student sees tiny crops that might only
            contain a whisker, a table leg, or a patch of wallpaper. Yet the training objective forces
            the student's representation of that whisker to <em>match</em> the teacher's representation
            of the entire cat.
          </p>
          <p>
            To satisfy this constraint, the student must learn abstract, semantic features — not
            low-level textures. A whisker is only useful if the model understands it implies "cat face,
            probably indoor, certain scale." This is what makes DINO features so powerful for dense
            prediction: every patch token carries semantic meaning, not just texture statistics.
          </p>
          <p>
            <strong>The numbers:</strong> 2 global crops at 256x256 covering 40-100% of the image, plus
            8 local crops at 112x112 covering only 5-40%. The local crops are aggressively small — some
            cover just 5% of the image, a tiny fragment. Yet the model must still produce a coherent
            global representation from it. This is extremely hard and forces extremely useful features.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="insight">
        Multi-crop is computationally efficient despite processing 10 views: the 8 local crops are
        small (112x112 = 49 patches each), so they add only ~60% more FLOPs compared to the 2 global
        crops. The semantic value gained far exceeds the compute cost.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — TEACHER-STUDENT FRAMEWORK & LOSS FUNCTIONS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="Teacher-Student Framework & Loss Functions"
        subtitle="DINO loss + iBOT loss + Koleo regularizer — the three-part training signal"
        color={P}
      />

      <Prose>
        <p>
          DINOv3 uses a <strong>teacher-student self-distillation</strong> framework. There is no
          separate "teacher model" trained ahead of time — the teacher <em>is</em> the student, just
          a smoother version of it. Specifically, the teacher is an <strong>Exponential Moving Average
          (EMA)</strong> of the student's weights, updated after every step. The momentum starts at
          0.994 and cosine-anneals to 0.9999. This means the teacher evolves slowly, providing
          stable targets for the student to chase.
        </p>
        <p>
          The training signal comes from three loss functions, each targeting a different aspect of
          feature quality:
        </p>
      </Prose>

      {/* ── Teacher-Student Framework SVG ── */}
      <Diagram caption={<><strong>Teacher-Student Self-Distillation</strong> — Purple = teacher (EMA, frozen), Cyan = student (trainable). DINO loss matches CLS tokens, iBOT loss matches masked patch tokens.</>}>
        <svg viewBox="0 0 960 500" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ts-gp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b21b6" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
            <linearGradient id="ts-gc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e7490" />
              <stop offset="100%" stopColor="#164e63" />
            </linearGradient>
            <linearGradient id="ts-gd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <marker id="ts-ap" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={P} />
            </marker>
            <marker id="ts-ac" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={CYAN} />
            </marker>
            <marker id="ts-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={RED} />
            </marker>
            <marker id="ts-aa" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={AMBER} />
            </marker>
          </defs>

          <rect width="960" height="500" rx="12" fill={BG} />

          {/* ── LEFT: Teacher ── */}
          <rect x="25" y="25" width="280" height="445" rx="14" fill="url(#ts-gd)" stroke={P} strokeWidth="1.5" />
          <text x="165" y="52" textAnchor="middle" fill={P} fontSize="13" fontWeight="800" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">TEACHER (EMA)</text>

          {/* Input */}
          <rect x="65" y="72" width="200" height="32" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="165" y="93" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Global Crops Only (2x)</text>

          {/* ViT */}
          <line x1="165" y1="104" x2="165" y2="120" stroke={P} strokeWidth="1.5" markerEnd="url(#ts-ap)" />
          <rect x="65" y="125" width="200" height="55" rx="10" fill="url(#ts-gp)" stroke={P} strokeWidth="1.5" />
          <text x="165" y="150" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">ViT-7B (frozen)</text>
          <text x="165" y="168" textAnchor="middle" fill={P2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">No gradients — updated via EMA</text>

          {/* Projection Head */}
          <line x1="165" y1="180" x2="165" y2="200" stroke={P} strokeWidth="1.5" markerEnd="url(#ts-ap)" />
          <rect x="85" y="205" width="160" height="40" rx="8" fill="#3b0764" stroke={P2} strokeWidth="1" />
          <text x="165" y="230" textAnchor="middle" fill={P2} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Projection Head</text>

          {/* Centering */}
          <line x1="165" y1="245" x2="165" y2="265" stroke={P} strokeWidth="1.5" markerEnd="url(#ts-ap)" />
          <rect x="85" y="270" width="160" height="34" rx="8" fill={P} fillOpacity="0.12" stroke={P} strokeWidth="1" strokeDasharray="4 2" />
          <text x="165" y="292" textAnchor="middle" fill={P2} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Centering (prevent collapse)</text>

          {/* Output: P_t */}
          <line x1="165" y1="304" x2="165" y2="325" stroke={P} strokeWidth="1.5" markerEnd="url(#ts-ap)" />
          <rect x="70" y="330" width="85" height="40" rx="8" fill={P} fillOpacity="0.3" stroke={P} strokeWidth="1.5" />
          <text x="112" y="355" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">P_t(CLS)</text>

          <rect x="170" y="330" width="85" height="40" rx="8" fill={P} fillOpacity="0.2" stroke={P2} strokeWidth="1" />
          <text x="212" y="355" textAnchor="middle" fill={P2} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">P_t(patch)</text>

          <text x="112" y="385" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">softmax(z/0.04)</text>
          <text x="212" y="385" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">softmax(z/0.04)</text>

          {/* ── RIGHT: Student ── */}
          <rect x="655" y="25" width="280" height="445" rx="14" fill="url(#ts-gd)" stroke={CYAN} strokeWidth="1.5" />
          <text x="795" y="52" textAnchor="middle" fill={CYAN} fontSize="13" fontWeight="800" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">STUDENT (trainable)</text>

          {/* Input */}
          <rect x="685" y="72" width="210" height="32" rx="6" fill={AMBER} fillOpacity="0.15" stroke={AMBER} strokeWidth="1" />
          <text x="790" y="93" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">All 10 Crops (2 global + 8 local)</text>

          {/* Masking indicator */}
          <rect x="695" y="112" width="190" height="22" rx="4" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="1" strokeDasharray="3 2" />
          <text x="790" y="127" textAnchor="middle" fill={RED} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Random mask on patches (for iBOT)</text>

          {/* ViT */}
          <line x1="790" y1="134" x2="790" y2="148" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ts-ac)" />
          <rect x="690" y="153" width="200" height="55" rx="10" fill="url(#ts-gc)" stroke={CYAN} strokeWidth="1.5" />
          <text x="790" y="178" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">ViT-7B (trainable)</text>
          <text x="790" y="196" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Gradients flow back — this is what learns</text>

          {/* Projection Head */}
          <line x1="790" y1="208" x2="790" y2="228" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ts-ac)" />
          <rect x="710" y="233" width="160" height="40" rx="8" fill="#083344" stroke={CYAN} strokeWidth="1" />
          <text x="790" y="258" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Projection Head</text>

          {/* Output: P_s */}
          <line x1="790" y1="273" x2="790" y2="325" stroke={CYAN} strokeWidth="1.5" markerEnd="url(#ts-ac)" />
          <rect x="695" y="330" width="85" height="40" rx="8" fill={CYAN} fillOpacity="0.25" stroke={CYAN} strokeWidth="1.5" />
          <text x="737" y="355" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">P_s(CLS)</text>

          <rect x="795" y="330" width="85" height="40" rx="8" fill={CYAN} fillOpacity="0.15" stroke="#67e8f9" strokeWidth="1" />
          <text x="837" y="355" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">P_s(mask)</text>

          <text x="737" y="385" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">softmax(z/0.1)</text>
          <text x="837" y="385" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">softmax(z/0.1)</text>

          {/* ── CENTER: Losses ── */}
          {/* EMA arrow (teacher ← student) */}
          <path d="M655,50 C620,50 580,25 520,25 C460,25 420,50 305,50" fill="none" stroke={P2} strokeWidth="2" strokeDasharray="8 4" markerEnd="url(#ts-ap)" />
          <rect x="430" y="10" width="100" height="22" rx="6" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />
          <text x="480" y="25" textAnchor="middle" fill={P2} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">EMA Update</text>

          {/* DINO Loss (CLS matching) */}
          <line x1="155" y1="350" x2="420" y2="420" stroke={RED} strokeWidth="2" markerEnd="url(#ts-ar)" />
          <line x1="695" y1="355" x2="540" y2="420" stroke={RED} strokeWidth="2" markerEnd="url(#ts-ar)" />

          <rect x="390" y="405" width="180" height="50" rx="10" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="2" />
          <text x="480" y="427" textAnchor="middle" fill={RED} fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">DINO Loss</text>
          <text x="480" y="445" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="Inter, system-ui, sans-serif">CLS cross-entropy: P_t vs P_s</text>

          {/* iBOT Loss (patch matching) */}
          <line x1="255" y1="350" x2="420" y2="462" stroke={AMBER} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#ts-aa)" />
          <line x1="837" y1="370" x2="540" y2="462" stroke={AMBER} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#ts-aa)" />

          <rect x="390" y="458" width="180" height="35" rx="8" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1.5" />
          <text x="480" y="480" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">iBOT Loss (masked patches)</text>
        </svg>
      </Diagram>

      <ConceptCard title="Loss 1: DINO Loss — Global Feature Alignment" color={RED} defaultOpen={true}>
        <Prose>
          <p>
            The DINO loss is the core of the self-supervised signal. It operates on the <strong>[CLS]
            token</strong> — the single token that summarizes the entire image. Both teacher and student
            produce a probability distribution over a shared vocabulary (the projection head output),
            and the loss is the <strong>cross-entropy</strong> between these distributions.
          </p>
          <p>
            The critical detail is the <strong>temperature asymmetry</strong>. The teacher uses a low
            temperature (0.04), producing sharp, peaked distributions. The student uses a higher
            temperature (0.1), producing softer distributions. This forces the student to match sharp
            teacher targets — a form of "hard distillation" that produces better features than
            symmetric temperatures.
          </p>
        </Prose>

        <FormulaBlock
          math="\mathcal{L}_{\text{DINO}} = - \sum_x P_t(x) \log P_s(x)"
          label="DINO Loss — CLS Token Cross-Entropy"
          color={RED}
          symbols={[
            { symbol: 'L_DINO', meaning: 'DINO loss — measures how well student CLS matches teacher CLS distribution' },
            { symbol: 'P_t(x)', meaning: 'Teacher softmax distribution: softmax(z_t / 0.04) — sharp, peaked' },
            { symbol: 'P_s(x)', meaning: 'Student softmax distribution: softmax(z_s / 0.1) — softer' },
            { symbol: 'x', meaning: 'Index over the K-dimensional projection head vocabulary (K = 65536)' },
          ]}
        />
      </ConceptCard>

      <ConceptCard title="Loss 2: iBOT Loss — Dense Feature Learning via Masked Prediction" color={AMBER} defaultOpen={true}>
        <Prose>
          <p>
            While DINO loss trains the global [CLS] token, <strong>iBOT loss</strong> trains the
            individual patch tokens. The idea is borrowed from masked language modeling in NLP: randomly
            mask some patch tokens in the student input, then force the student to predict the teacher's
            output for those positions.
          </p>
          <p>
            This is what makes DINOv3 exceptional at dense tasks. Every patch token learns to predict
            what should be there based on surrounding context — exactly the skill needed for segmentation,
            depth estimation, and object detection.
          </p>
        </Prose>

        <FormulaBlock
          math="\mathcal{L}_{\text{iBOT}} = - \sum_{m \in \text{masked}} P_t(x_m) \log P_s(x_m)"
          label="iBOT Loss — Masked Patch Prediction"
          color={AMBER}
          symbols={[
            { symbol: 'L_iBOT', meaning: 'iBOT loss — drives dense feature quality by masked patch prediction' },
            { symbol: 'm', meaning: 'Index over masked patch positions (randomly selected)' },
            { symbol: 'P_t(x_m)', meaning: 'Teacher output distribution for patch position m (computed on unmasked input)' },
            { symbol: 'P_s(x_m)', meaning: 'Student output distribution for masked position m (must predict from context)' },
          ]}
        />
      </ConceptCard>

      <ConceptCard title="Loss 3: Koleo Regularizer — Preventing Representation Collapse" color={GREEN} defaultOpen={false}>
        <Prose>
          <p>
            Self-supervised learning has a dangerous failure mode: <strong>mode collapse</strong>,
            where the model learns to produce the same output for every input. The centering operation
            on the teacher partially prevents this, but DINOv3 adds an explicit regularizer: the
            <strong>Koleo</strong> (Kozachenko-Leonenko) loss.
          </p>
          <p>
            Koleo encourages the [CLS] embeddings within a batch to be <em>uniformly spread</em> in
            the embedding space. It does this by maximizing the distance between each embedding and its
            nearest neighbor in the batch. Think of it as a "repulsion force" that pushes
            representations apart, ensuring they use the full capacity of the embedding space.
          </p>
        </Prose>

        <FormulaBlock
          math="\mathcal{L}_{\text{DKoleo}} = - \frac{1}{n} \sum_{i=1}^{n} \log \left( \min_{j \neq i} \| z_i - z_j \| \right)"
          label="Koleo Regularizer — Uniform Embedding Spread"
          color={GREEN}
          symbols={[
            { symbol: 'L_DKoleo', meaning: 'Kozachenko-Leonenko entropy estimator on CLS embeddings — higher is more spread' },
            { symbol: 'z_i', meaning: 'L2-normalized CLS embedding of sample i in the batch' },
            { symbol: 'n', meaning: 'Batch size (4096 in DINOv3)' },
            { symbol: 'min_{j != i}', meaning: 'Distance to the nearest neighbor — the bottleneck we want to maximize' },
          ]}
        />
      </ConceptCard>

      <FormulaBlock
        math="\mathcal{L}_{\text{Pre}} = \mathcal{L}_{\text{DINO}} + \mathcal{L}_{\text{iBOT}} + 0.1 \cdot \mathcal{L}_{\text{DKoleo}}"
        label="Total Pre-training Loss"
        color={P}
        symbols={[
          { symbol: 'L_Pre', meaning: 'Total pre-training loss — sum of all three objectives' },
          { symbol: 'L_DINO', meaning: 'Global CLS matching (drives classification quality)' },
          { symbol: 'L_iBOT', meaning: 'Masked patch prediction (drives dense feature quality)' },
          { symbol: '0.1 * L_DKoleo', meaning: 'Weighted regularizer — small weight prevents collapse without dominating training' },
        ]}
      />

      <Callout type="math">
        The 0.1 weight on Koleo is carefully chosen. Too high and it dominates the gradient, preventing
        the model from learning meaningful clusters. Too low and mode collapse can occur in the early
        stages of training. The centering mechanism (subtracting the running mean from teacher outputs)
        is the primary collapse prevention — Koleo is the safety net.
      </Callout>

      <MentalModel
        title="The Three Losses as a School System"
        analogy="DINO loss is the final exam — 'Given a photo of a cat, can you produce the same summary as the expert teacher?' iBOT loss is fill-in-the-blank homework — 'I've covered up 30% of the image, tell me what's behind the mask.' Koleo is the class rule that says 'no two students are allowed to write identical answers' — forcing diversity and preventing everyone from just writing 'cat' for every image."
        technical="Mathematically, DINO is a cross-entropy on CLS softmax distributions (drives global features), iBOT is cross-entropy on masked patch softmax distributions (drives local/dense features), and Koleo is a differential entropy estimator that acts as a uniform distribution prior on the embedding space."
        color={P}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — GRAM ANCHORING (KEY INNOVATION)
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="The Dense Feature Problem & Gram Anchoring"
        subtitle="The key innovation — fixing dense feature degradation during long training"
        color={P}
      />

      <Prose>
        <p>
          Here is the problem that DINOv3 exists to solve. When you train a large self-supervised
          ViT for a long time (1 million iterations), something unexpected happens: <strong>global
          features keep getting better, but dense features start getting worse</strong>. Your model
          becomes an excellent classifier but a terrible segmentor. This is the <em>dense feature
          degradation</em> problem, and it is the central challenge of scaling SSL.
        </p>
        <p>
          The authors diagnose the cause precisely: <strong>CLS-patch cosine similarity increases</strong>
          over training. The [CLS] token starts "absorbing" information from patch tokens, making them
          more uniform and less spatially distinctive. By 1M iterations, the patch features have lost
          their locality — they all look like copies of the [CLS] token rather than carrying
          position-specific information.
        </p>
      </Prose>

      {/* ── Gram Anchoring SVG ── */}
      <Diagram caption={<><strong>Dense Feature Degradation and Gram Anchoring</strong> — Left: feature quality over training. Right: how Gram Anchoring preserves patch structure.</>}>
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ga-gd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <marker id="ga-ap" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={P} />
            </marker>
            <marker id="ga-ag" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <marker id="ga-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={RED} />
            </marker>
          </defs>

          <rect width="800" height="400" rx="12" fill={BG} />

          {/* ── LEFT PANEL: Training Timeline ── */}
          <rect x="15" y="15" width="370" height="370" rx="10" fill="url(#ga-gd)" stroke="#334155" strokeWidth="1" />
          <text x="200" y="40" textAnchor="middle" fill={GRAY} fontSize="11" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">FEATURE QUALITY OVER TRAINING</text>

          {/* Y-axis */}
          <line x1="60" y1="60" x2="60" y2="340" stroke="#334155" strokeWidth="1" />
          <text x="30" y="195" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif" transform="rotate(-90, 30, 195)">Feature Quality</text>

          {/* X-axis */}
          <line x1="60" y1="340" x2="360" y2="340" stroke="#334155" strokeWidth="1" />
          <text x="210" y="365" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Training Iterations</text>
          <text x="80" y="355" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">0</text>
          <text x="160" y="355" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">200k</text>
          <text x="260" y="355" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">600k</text>
          <text x="340" y="355" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">1M</text>

          {/* Global features line (keeps going up) */}
          <path d="M70,310 C120,280 180,180 240,120 C280,85 320,70 350,60" fill="none" stroke={GREEN} strokeWidth="2.5" />
          <circle cx="350" cy="60" r="4" fill={GREEN} />
          <text x="355" y="56" fill={GREEN} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Global (CLS)</text>

          {/* Dense features line WITHOUT Gram (rises then falls) */}
          <path d="M70,310 C120,280 160,200 185,170" fill="none" stroke={RED} strokeWidth="2.5" />
          <path d="M185,170 C220,185 280,240 350,280" fill="none" stroke={RED} strokeWidth="2.5" strokeDasharray="6 3" />
          <circle cx="350" cy="280" r="4" fill={RED} />
          <text x="355" y="294" fill={RED} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Dense (no Gram)</text>

          {/* Dense features line WITH Gram (stays good after refinement) */}
          <path d="M185,170 C220,160 280,140 350,110" fill="none" stroke={P} strokeWidth="2.5" />
          <circle cx="350" cy="110" r="4" fill={P} />
          <text x="355" y="118" fill={P} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Dense (+ Gram)</text>

          {/* Peak annotation */}
          <circle cx="185" cy="170" r="5" fill="none" stroke={AMBER} strokeWidth="1.5" />
          <text x="195" y="162" fill={AMBER} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Peak ~200k</text>

          {/* Refinement phase indicator */}
          <rect x="310" y="340" width="48" height="5" rx="2" fill={P} fillOpacity="0.4" />
          <text x="334" y="380" textAnchor="middle" fill={P2} fontSize="7" fontFamily="Inter, system-ui, sans-serif">Gram refine</text>

          {/* ── RIGHT PANEL: Gram Anchoring Mechanism ── */}
          <rect x="415" y="15" width="370" height="370" rx="10" fill="url(#ga-gd)" stroke="#334155" strokeWidth="1" />
          <text x="600" y="40" textAnchor="middle" fill={P} fontSize="11" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">GRAM ANCHORING MECHANISM</text>

          {/* Student patches */}
          <text x="500" y="68" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Student Patches</text>
          <rect x="445" y="75" width="110" height="80" rx="8" fill={CYAN} fillOpacity="0.1" stroke={CYAN} strokeWidth="1" />
          {/* Grid of patches */}
          {[0,1,2,3].map(r => [0,1,2,3].map(c => (
            <rect key={`sp-${r}-${c}`} x={452 + c*25} y={82 + r*17} width="20" height="12" rx="2"
              fill={CYAN} fillOpacity={0.15 + Math.random() * 0.35} />
          )))}
          <text x="500" y="170" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">X_S (P x d)</text>

          {/* Gram teacher patches */}
          <text x="700" y="68" textAnchor="middle" fill={P2} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Gram Teacher</text>
          <rect x="645" y="75" width="110" height="80" rx="8" fill={P} fillOpacity="0.1" stroke={P} strokeWidth="1" />
          {[0,1,2,3].map(r => [0,1,2,3].map(c => (
            <rect key={`gt-${r}-${c}`} x={652 + c*25} y={82 + r*17} width="20" height="12" rx="2"
              fill={P} fillOpacity={0.2 + Math.random() * 0.3} />
          )))}
          <text x="700" y="170" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">X_G (P x d)</text>
          <text x="700" y="183" textAnchor="middle" fill={P2} fontSize="7" fontFamily="Inter, system-ui, sans-serif">snapshot from 200k</text>

          {/* Gram matrix computation arrows */}
          <line x1="500" y1="190" x2="500" y2="220" stroke={CYAN} strokeWidth="1.5" />
          <line x1="700" y1="190" x2="700" y2="220" stroke={P} strokeWidth="1.5" />

          {/* Gram matrices */}
          <rect x="455" y="225" width="90" height="70" rx="6" fill={CYAN} fillOpacity="0.08" stroke={CYAN} strokeWidth="1.5" />
          <text x="500" y="248" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">G_S</text>
          <text x="500" y="264" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">X_S . X_S^T</text>
          <text x="500" y="278" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="Inter, system-ui, sans-serif">(P x P)</text>

          <rect x="655" y="225" width="90" height="70" rx="6" fill={P} fillOpacity="0.08" stroke={P} strokeWidth="1.5" />
          <text x="700" y="248" textAnchor="middle" fill={P} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">G_G</text>
          <text x="700" y="264" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">X_G . X_G^T</text>
          <text x="700" y="278" textAnchor="middle" fill={GRAY} fontSize="7" fontFamily="Inter, system-ui, sans-serif">(P x P)</text>

          {/* Comparison arrows → loss */}
          <line x1="545" y1="260" x2="575" y2="335" stroke={RED} strokeWidth="1.5" />
          <line x1="655" y1="260" x2="625" y2="335" stroke={RED} strokeWidth="1.5" />

          {/* Gram Loss */}
          <rect x="555" y="330" width="90" height="45" rx="10" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="2" />
          <text x="600" y="350" textAnchor="middle" fill={RED} fontSize="12" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">L_Gram</text>
          <text x="600" y="367" textAnchor="middle" fill="#fca5a5" fontSize="8" fontFamily="Inter, system-ui, sans-serif">||G_S - G_G||^2_F</text>

          {/* Key insight callout */}
          <rect x="430" y="382" width="340" height="0" rx="0" fill="none" />
        </svg>
      </Diagram>

      <Prose>
        <p>
          The Gram Matrix captures <em>all pairwise relationships</em> between patch tokens. If patch 5
          and patch 47 are similar (because they both represent "cat fur"), the Gram matrix encodes this.
          If patch 5 and patch 200 are different (fur vs. background), the Gram matrix encodes that too.
          By anchoring the student's Gram matrix to that of an earlier checkpoint (when dense features
          were good), we preserve these structural relationships even as the model continues learning.
        </p>
      </Prose>

      <FormulaBlock
        math="G = X_S \cdot X_S^\top \in \mathbb{R}^{P \times P}"
        label="Gram Matrix — Capturing Patch Structure"
        color={P}
        symbols={[
          { symbol: 'G', meaning: 'Gram matrix — encodes ALL pairwise similarities between patch tokens' },
          { symbol: 'X_S', meaning: 'Student L2-normalized patch features, shape P x d (P patches, d dimensions)' },
          { symbol: 'P', meaning: 'Number of patches (e.g. 256 for 256x256 crop with 16x16 patches)' },
          { symbol: 'd', meaning: 'Feature dimension (4096 for ViT-7B)' },
        ]}
      />

      <FormulaBlock
        math="\mathcal{L}_{\text{Gram}} = \left\| X_S \cdot X_S^\top - X_G \cdot X_G^\top \right\|_F^2"
        label="Gram Anchoring Loss — The Key Innovation"
        color={RED}
        symbols={[
          { symbol: 'L_Gram', meaning: 'Gram Anchoring loss — penalizes divergence of patch structure from a good checkpoint' },
          { symbol: 'X_S', meaning: 'Student L2-normalized patch features (current model)' },
          { symbol: 'X_G', meaning: 'Gram teacher L2-normalized patch features (from earlier checkpoint with good dense features)' },
          { symbol: '||.||_F^2', meaning: 'Squared Frobenius norm — sum of squared element-wise differences' },
        ]}
      />

      <FormulaBlock
        math="\mathcal{L}_{\text{Ref}} = w_D \cdot \mathcal{L}_{\text{DINO}} + \mathcal{L}_{\text{iBOT}} + w_{DK} \cdot \mathcal{L}_{\text{DKoleo}} + w_G \cdot \mathcal{L}_{\text{Gram}}"
        label="Refinement Phase Total Loss"
        color={P}
        symbols={[
          { symbol: 'L_Ref', meaning: 'Total loss during refinement phase (after 1M pre-training iterations)' },
          { symbol: 'w_D', meaning: 'DINO loss weight (reduced during refinement to let Gram loss dominate)' },
          { symbol: 'w_G', meaning: 'Gram loss weight (controls strength of structural anchoring)' },
          { symbol: 'w_DK', meaning: 'Koleo regularizer weight (maintained at 0.1)' },
        ]}
      />

      <MentalModel
        title="Keeping the Skeleton While Changing the Muscles"
        analogy="Imagine you are sculpting a figure from clay. After hours of work, the proportions (skeleton) are perfect, but you want to add more surface detail (muscles). The problem: adding detail sometimes distorts the proportions. Gram Anchoring is like having a transparent overlay of the original skeleton — you can add as much detail as you want, but an alarm goes off if you accidentally shift a bone. The Gram matrix IS that skeleton: it captures the structural relationships between all parts."
        technical="The Gram matrix G = X.X^T is a P x P matrix where entry (i,j) is the cosine similarity between patches i and j (since features are L2-normalized). Preserving G preserves the relative geometry of the patch embedding space — which patches are similar, which are different, which clusters exist. The Gram teacher is updated every 10k iterations from the best-performing checkpoint."
        color={P}
      />

      <Callout type="key">
        Gram Anchoring is <strong>not</strong> just regularization — it is a fundamentally different
        kind of constraint. Standard regularization (weight decay, dropout) constrains the model's
        <em>capacity</em>. Gram Anchoring constrains the model's <em>structural output</em> — the
        relationships between patch representations. This is why it can fix dense feature degradation
        without hurting global feature quality: the CLS token can keep improving freely while the
        patch tokens maintain their spatial structure.
      </Callout>

      <ConceptCard title="Why Does Dense Feature Degradation Happen?" color={RED} defaultOpen={true}>
        <Prose>
          <p>
            The root cause is a subtle interaction between the DINO loss and the attention mechanism.
            The DINO loss optimizes the [CLS] token, which attends to all patch tokens. Over many
            iterations, the attention mechanism learns to pull information from patches into [CLS] with
            increasing strength. As the [CLS] token becomes a better global summary, it also creates
            a pressure for patch tokens to become more "CLS-like" — carrying global information rather
            than local spatial information.
          </p>
          <p>
            The evidence is clear: <strong>CLS-patch cosine similarity increases monotonically</strong>
            over training. At 200k iterations, patches are diverse and spatially distinctive. By 1M
            iterations, they converge toward the CLS representation. For classification (which uses only
            CLS), this is fine — even helpful. For segmentation and depth (which use patch tokens), it
            is catastrophic.
          </p>
          <p>
            The Gram matrix captures exactly the property we want to preserve: how different patches
            relate to each other. Two fur patches should be similar; a fur patch and a background patch
            should be different. If we anchor this structure to a checkpoint where it was correct, the
            model can keep improving CLS features while maintaining dense spatial structure.
          </p>
        </Prose>
      </ConceptCard>

      <ConceptCard title="The Gram Teacher: A Living Snapshot" color={P2} defaultOpen={false}>
        <Prose>
          <p>
            The Gram teacher is <em>not</em> the same as the EMA teacher. It is a separate snapshot of
            the model taken from an earlier checkpoint when dense features were known to be good (around
            200k iterations for the first snapshot). During the refinement phase, the Gram teacher is
            updated every <strong>10,000 iterations</strong> from the current best checkpoint.
          </p>
          <p>
            This creates a moving anchor: as the student improves, the Gram teacher is periodically
            updated to reflect the latest good structural state. This prevents the anchor from becoming
            stale — the model does not need to forever match a 200k-iteration snapshot; it matches a
            rolling "best known structure."
          </p>
        </Prose>
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — TRAINING PIPELINE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Training Pipeline"
        subtitle="3-phase training: pre-train → Gram refinement → high-res adaptation"
        color={P}
      />

      <Prose>
        <p>
          DINOv3's training is a carefully orchestrated three-phase pipeline, each phase addressing a
          specific challenge. The total training requires <strong>256 GPUs</strong> running for roughly
          3 weeks. Let us walk through each phase.
        </p>
      </Prose>

      <StepFlow
        color={P}
        steps={[
          {
            title: 'Phase 1: Pre-training (1M iterations)',
            desc: 'Train from scratch using L_DINO + L_iBOT + 0.1*L_DKoleo. Batch size 4096 across 256 GPUs. AdamW optimizer with linear warmup (10k steps) then CONSTANT learning rate — no cosine schedule. This is crucial: constant LR enables indefinite training without hitting a schedule boundary. Input: 256x256 crops from LVD-1689M (1.69 billion curated images). By ~200k iterations, dense features peak. By 1M, global features are excellent but dense have degraded.'
          },
          {
            title: 'Phase 2: Gram Refinement (50k iterations)',
            desc: 'Add L_Gram to the loss with the Gram teacher initialized from the 1M checkpoint (where global features are best). The refinement loss pulls dense features back toward good structural state while maintaining global quality. Gram teacher updated every 10k iterations. DINO loss weight reduced to give Gram loss more influence on gradient. This is where the magic happens: dense features recover without sacrificing global quality.'
          },
          {
            title: 'Phase 3: High-Resolution Adaptation',
            desc: 'Fine-tune at higher resolution (518x518 input) for resolution robustness. This phase adapts the positional encoding (RoPE with box-jittering) to handle the 4x increase in patch count (from 256 to 1024 patches). Short phase — the model already has strong features from Phase 1+2, so this is just resolution adaptation.'
          },
        ]}
      />

      <ConceptCard title="Training Details Deep Dive" color={P} defaultOpen={true}>
        <ComparisonTable
          headers={['Hyperparameter', 'Value', 'Notes']}
          rows={[
            ['Optimizer', 'AdamW', 'Standard for ViTs; better than SGD at this scale'],
            ['Batch Size', '4096', 'Distributed across 256 GPUs (16 per GPU)'],
            ['Learning Rate', 'Constant after warmup', 'NO cosine schedule — enables indefinite training'],
            ['Warmup', '10k iterations', 'Linear warmup from 0 to peak LR'],
            ['EMA Momentum', '0.994 → 0.9999', 'Cosine schedule — teacher becomes increasingly stable'],
            ['Teacher Temperature', '0.04', 'Low = sharp distributions = hard targets'],
            ['Student Temperature', '0.1', 'Higher = softer predictions to match against'],
            ['Masking Ratio (iBOT)', '30%', 'Randomly mask 30% of patch tokens in student input'],
            ['Weight Decay', '0.04', 'Standard AdamW regularization'],
            ['Dataset', 'LVD-1689M', '1.69B images curated from 17B Instagram via clustering + retrieval'],
          ]}
        />
      </ConceptCard>

      <Callout type="insight">
        The decision to use a <strong>constant learning rate</strong> (no cosine schedule) is
        underappreciated but critical. With cosine scheduling, you commit to a fixed training budget
        at the start — the LR decays to zero at the predetermined end. With constant LR, you can
        train indefinitely and evaluate at any checkpoint. This is what enabled the authors to
        discover the dense feature degradation in the first place: they could observe the model at
        200k, 500k, and 1M iterations without the confounding factor of a decaying LR.
      </Callout>

      <ConceptCard title="LVD-1689M: The Training Data" color={AMBER} defaultOpen={false}>
        <Prose>
          <p>
            The training data is <strong>LVD-1689M</strong> — 1.69 billion images curated from a pool
            of ~17 billion uncurated Instagram images. The curation pipeline has two stages:
          </p>
          <p>
            <strong>Stage 1: Clustering.</strong> Run k-means on image embeddings to find natural
            clusters in the uncurated data. Keep clusters that are visually coherent and semantically
            meaningful. Remove near-duplicates.
          </p>
          <p>
            <strong>Stage 2: Retrieval-based enrichment.</strong> For each cluster, use the cluster
            centroid to retrieve the most relevant images from the remaining pool. This expands coverage
            while maintaining quality.
          </p>
          <p>
            The result is a dataset that is 11.9x larger than DINOv2's LVD-142M, with similar per-image
            quality. No human labels are used — the entire curation is automated.
          </p>
        </Prose>
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — KNOWLEDGE DISTILLATION & MODEL FAMILY
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Knowledge Distillation & Model Family"
        subtitle="From the 7B teacher to ViT-S/B/L/g and ConvNeXt — features for every budget"
        color={P}
      />

      <Prose>
        <p>
          A 6.7 billion parameter model is powerful but impractical for many applications. You cannot
          run ViT-7B on a mobile phone or even most single GPUs at reasonable throughput. The solution:
          <strong>distill</strong> the 7B teacher's knowledge into a family of smaller models.
        </p>
        <p>
          The distillation setup mirrors the pre-training: the ViT-7B teacher produces target
          distributions, and the smaller student model learns to match them. The key difference is that
          the teacher is now <em>frozen</em> — no EMA updates. This is standard knowledge distillation,
          and it works remarkably well: the ViT-L student (300M params) recovers ~95% of the ViT-7B
          teacher's performance at a fraction of the compute.
        </p>
      </Prose>

      <ComparisonTable
        headers={['Model', 'Parameters', 'Embed Dim', 'Layers', 'IN-1k (linear)', 'ADE20k (mIoU)', 'Use Case']}
        rows={[
          ['ViT-7B (teacher)', '6.7B', '4096', '40', '86.3', '63.0', 'Research, high-end servers'],
          ['ViT-g', '1.1B', '1536', '40', '85.9', '61.8', 'Datacenter inference'],
          ['ViT-L', '300M', '1024', '24', '84.7', '59.2', 'GPU inference, real-time'],
          ['ViT-B', '86M', '768', '12', '82.1', '54.1', 'Edge GPU, mobile GPU'],
          ['ViT-S', '22M', '384', '12', '78.3', '47.8', 'Mobile, embedded'],
          ['ConvNeXt-L', '197M', '1536', '-', '84.2', '58.4', 'When you need convolutions'],
        ]}
        caption="DINOv3 model family — all distilled from the single ViT-7B teacher"
      />

      <ConceptCard title="Why Distillation Works So Well Here" color={P} defaultOpen={true}>
        <Prose>
          <p>
            There is something elegant about distilling a self-supervised teacher. In standard
            supervised distillation, you are transferring knowledge about <em>labels</em> — "this is
            a dog, this is a cat." In SSL distillation, you are transferring knowledge about
            <em> representation structure</em> — "these patches are similar, these are different, this
            is the global meaning."
          </p>
          <p>
            This representation-level knowledge transfers more cleanly across architectures. The ViT-7B
            teacher has learned extremely fine-grained patch relationships over 1M iterations on 1.69B
            images. When a ViT-L student matches these outputs, it inherits that structural understanding
            even though it has 22x fewer parameters. The smaller model cannot represent every nuance, but
            it captures the dominant structure remarkably well.
          </p>
          <p>
            The DINOv3 family also includes <strong>ConvNeXt</strong> variants — proving that the
            learned representations transfer even across fundamentally different architectures
            (transformers to convolutions). This is a strong signal that the 7B teacher has learned
            genuinely universal visual features.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        The ViT-L distilled model (300M params) achieves <strong>84.7% on ImageNet linear probing</strong>
        and <strong>59.2 mIoU on ADE20k segmentation</strong> — surpassing many models that were
        explicitly trained for these tasks. And it is a <em>frozen feature extractor</em>: no fine-tuning,
        just a linear layer on top. This is the promise of foundation models: train once, use everywhere.
      </Callout>

      <MentalModel
        title="The Master Craftsman and Apprentices"
        analogy="The ViT-7B teacher is a master craftsman who spent years (1M iterations) studying every material, joint, and finish. They developed an incredibly detailed understanding. Now they teach apprentices of different skill levels: the ViT-L apprentice is very talented and learns 95% of the master's craft. The ViT-S apprentice has less capacity but still captures the essential techniques. Each apprentice will serve in a different workshop — the ViT-L in a high-end studio, the ViT-S in a mobile repair kit."
        technical="Distillation uses the same DINO + iBOT loss framework but with the frozen ViT-7B as teacher. The student's projection head is re-initialized; only the student backbone and head are trained. Training is much shorter than pre-training (~150k iterations) since the teacher provides a strong signal."
        color={P}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 08 — RESULTS & WHY IT MATTERS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="08"
        title="Results & Why It Matters"
        subtitle="State-of-the-art on dense tasks, closing the gap to human-level vision"
        color={P}
      />

      <StatBar
        stats={[
          { value: '66.1', unit: ' mAP', label: 'COCO Detection', color: P },
          { value: '63.0', unit: ' mIoU', label: 'ADE20k Segmentation', color: GREEN },
          { value: '+33%', unit: '', label: 'vs Best WSL (Depth)', color: CYAN },
          { value: '+34%', unit: '', label: 'vs Best WSL (Tracking)', color: AMBER },
        ]}
      />

      <Prose>
        <p>
          Let us cut to the numbers. DINOv3 sets new state-of-the-art results across a wide range of
          vision benchmarks, and the pattern is clear: the biggest gains are on <strong>dense
          prediction tasks</strong> — exactly what Gram Anchoring was designed to fix. On tasks that
          depend on per-pixel features (segmentation, depth estimation, object tracking), DINOv3
          crushes everything that came before.
        </p>
      </Prose>

      <ComparisonTable
        headers={['Benchmark', 'DINOv3 (7B)', 'DINOv2 (1.1B)', 'CLIP (best)', 'AM-RADIO', 'Supervised SOTA']}
        rows={[
          ['ImageNet-1k (linear)', '86.3', '83.5', '80.2', '84.6', '90.0 (fine-tuned)'],
          ['ADE20k Seg (mIoU)', '63.0', '53.7', '42.1', '55.2', '62.1'],
          ['COCO Det (mAP)', '66.1', '57.3', '44.8', '58.7', '64.2'],
          ['NYUv2 Depth (RMSE)', '0.247', '0.318', '0.412', '0.305', '0.289'],
          ['DAVIS Tracking', '78.4', '61.2', '48.7', '63.1', '72.6'],
          ['VOC Seg (mIoU)', '84.7', '79.2', '70.1', '80.3', '83.1'],
        ]}
        caption="DINOv3 results across key benchmarks — all using frozen features with a linear/lightweight head (no fine-tuning of backbone)"
      />

      <ConceptCard title="The Dense Feature Revolution: Why These Numbers Matter" color={P} defaultOpen={true}>
        <Prose>
          <p>
            Look at the pattern in the numbers above. On ImageNet classification (a global task),
            DINOv3 improves on DINOv2 by <strong>+2.8 points</strong>. But on dense tasks:
          </p>
          <p>
            <strong>ADE20k segmentation:</strong> +9.3 mIoU (17% relative improvement). This is massive
            for a frozen backbone — typically you need task-specific fine-tuning to get gains this large.
          </p>
          <p>
            <strong>COCO detection:</strong> +8.8 mAP. The model has never seen a bounding box, yet
            its features are so good that a simple linear head can detect objects better than many
            trained detectors.
          </p>
          <p>
            <strong>Depth estimation:</strong> +22% reduction in RMSE. The model has never been told
            about 3D geometry, yet its patch features implicitly encode depth structure so well that
            they outperform supervised depth models.
          </p>
          <p>
            <strong>Video tracking (DAVIS):</strong> +28% improvement. The model has never seen a video
            during training — it was trained entirely on still images. Yet patch feature similarity
            across frames is so semantically meaningful that object tracking "just works."
          </p>
        </Prose>
      </ConceptCard>

      <ComparisonTable
        headers={['Feature', 'Weakly-Supervised (CLIP)', 'Self-Supervised (DINOv3)', 'Delta']}
        rows={[
          ['Classification', 'Excellent (CLS-focused)', 'Excellent (CLS + patches)', 'DINOv3 competitive'],
          ['Segmentation', 'Poor (no dense supervision)', 'Excellent (iBOT + Gram)', '+50% mIoU'],
          ['Depth', 'Poor (text-image gap)', 'Excellent (implicit 3D)', '+40% improvement'],
          ['Tracking', 'Mediocre (frame-level)', 'Excellent (patch correspondence)', '+60% improvement'],
          ['Zero-shot Transfer', 'Excellent (via text)', 'Requires linear probe', 'CLIP better for text tasks'],
          ['Feature Universality', 'Biased to text-described concepts', 'Universal visual features', 'DINOv3 more general'],
        ]}
        caption="Self-supervised (DINOv3) vs Weakly-supervised (CLIP) features — DINOv3 dominates on dense visual tasks"
      />

      <ConceptCard title="The PCA Visualization: Seeing What the Model Sees" color={P2} defaultOpen={true}>
        <Prose>
          <p>
            One of the most compelling demonstrations in the paper is the <strong>PCA visualization</strong>
            of DINOv3 features. Take the 4096-dimensional feature vector at each patch, project all
            patches to their top-3 principal components, and map those to RGB channels. The result is
            a "semantic colormap" where:
          </p>
          <p>
            <strong>Same-colored regions</strong> = patches with similar features = semantically similar
            parts. You see the cat's body as one color, the background as another, the shelf as a third.
            The boundaries between colors align precisely with object boundaries — even at 4096x4096
            resolution.
          </p>
          <p>
            What makes this remarkable is that <em>no segmentation training occurred</em>. The model
            was never told "this pixel is cat, this pixel is background." It learned object boundaries
            purely from self-supervised pre-training on unlabeled images. The PCA visualization proves
            that DINOv3 features are genuinely spatially semantic at every patch location.
          </p>
          <p>
            DINOv2 features show similar structure at 200k iterations but become blurry and CLS-dominated
            at 1M iterations. DINOv3 features (with Gram Anchoring) remain crisp and spatially
            distinctive even after 1.05M iterations. This is the visual proof that Gram Anchoring works.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="insight">
        The most profound result is not any single benchmark number — it is the <strong>universality</strong>.
        A single frozen DINOv3 backbone, with no task-specific training, matches or beats supervised models
        trained specifically for classification, segmentation, depth, tracking, and retrieval. This
        suggests that self-supervised pre-training at sufficient scale produces features that are
        <em>general-purpose visual representations</em> — the long-sought "visual equivalent of word
        embeddings."
      </Callout>

      <MentalModel
        title="A Single Frozen Model That Sees Like a Human"
        analogy="Humans do not have separate brain modules for recognizing cats, estimating depth, tracking objects, and segmenting boundaries. We have a single visual cortex that produces rich, multi-scale, spatially-detailed representations — and then task-specific regions in the cortex read out what they need. DINOv3 is the closest artificial analog: a single model producing 4096-dimensional features at every patch location, from which ANY visual task can be decoded with a simple linear layer."
        technical="The practical implication is architectural simplicity: instead of training N separate models for N tasks, train one DINOv3 backbone and add lightweight task heads. This reduces total model parameters, simplifies deployment, and ensures consistent visual understanding across tasks. For a system that needs classification, segmentation, and depth simultaneously, DINOv3 provides a shared backbone that is better at all three than separate task-specific models."
        color={P}
      />

      <StatBar
        stats={[
          { value: '1', unit: ' model', label: 'Frozen Backbone', color: P },
          { value: '6+', unit: ' tasks', label: 'SOTA or Near-SOTA', color: GREEN },
          { value: '0', unit: ' labels', label: 'Pre-training Labels', color: AMBER },
          { value: '22x', unit: '', label: 'Distill to ViT-L', color: CYAN },
        ]}
      />

      <Callout type="key">
        DINOv3 is not just another model — it is evidence for a hypothesis: that self-supervised
        learning at sufficient scale, with careful structural regularization (Gram Anchoring),
        produces <strong>universal visual features</strong> that rival or exceed human-designed
        task-specific models. The implication for the field is profound: the future of computer
        vision may not be better architectures or more labels, but better self-supervised
        training at larger scale with smarter regularization.
      </Callout>
    </>
  );
}
