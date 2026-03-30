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

const PK = '#ec4899';
const PK2 = '#f472b6';
const CYAN = '#06b6d4';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const RED = '#ef4444';
const PURPLE = '#a78bfa';
const BG = '#0a0f1a';
const GRAY = '#64748b';

/* ─── SVG helper functions ──────────────────────────────────── */
const ARROW = (x1, y1, x2, y2, color = PK, dashed = false) => (
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

export default function AttnResPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — THE PROBLEM: WHY STANDARD RESIDUALS FAIL AT SCALE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="The Problem — Why Standard Residuals Fail at Scale"
        subtitle="Fixed accumulation dilutes every layer's contribution"
        color={PK}
      />

      <Prose>
        <p>
          Every modern <H tip="Transformer = the dominant neural network architecture for language models. Invented in 2017 ('Attention Is All You Need'). Uses self-attention to process sequences in parallel rather than sequentially." color={PK}>Transformer</H> relies on{' '}
          <H tip="Residual connection = a 'skip connection' that adds a layer's input directly to its output: h_l = h_{l-1} + f(h_{l-1}). Introduced in ResNet (2015) to enable training very deep networks by letting gradients flow through the shortcut path." color={PK}>residual connections</H> to
          train deep networks. The idea is simple: each layer adds its contribution on top of
          everything that came before. Formally, the update at layer <em>l</em> is:
        </p>
      </Prose>

      <FormulaBlock
        math="h_l = h_{l-1} + f_l(h_{l-1})"
        label="Standard Residual Connection"
        color={PK}
        symbols={[
          { symbol: 'h_l', meaning: 'hidden state after layer l' },
          { symbol: 'f_l', meaning: 'layer l transformation (attention + FFN)' },
          { symbol: 'h_{l-1}', meaning: 'hidden state from previous layer' },
        ]}
      />

      <Prose>
        <p>
          This works beautifully for shallow networks. But as models get deeper — 80, 120, even
          200+ layers — a fundamental problem emerges. Each layer adds a term of roughly equal
          magnitude, so the <H tip="Hidden state = the internal vector representation that a neural network maintains as it processes input. Think of it as the model's 'working memory' at each layer — a high-dimensional vector that encodes the model's current understanding." color={PK}>hidden state</H>{' '}
          grows like a <H tip="Random walk = a mathematical process where each step adds a random displacement. After L steps, the magnitude grows as sqrt(L), not L, because the steps partially cancel each other. The hidden state in Transformers follows a similar pattern." color={AMBER}>random walk</H>:
          its magnitude scales as <code>O(sqrt(L))</code> where <em>L</em> is the number of layers.
        </p>
        <p>
          The consequence is devastating for deep networks: each individual layer's contribution
          gets <strong>diluted</strong>. If you have 100 layers, each one contributes roughly
          1/100th of the total signal. Early layers — which often capture fundamental features like
          syntax and entity recognition — become nearly invisible by the time the signal reaches
          the output.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: 'O(sqrt(L))', unit: '', label: 'Hidden state magnitude growth', color: RED },
          { value: 'O(1/L)', unit: '', label: 'Each layer\'s relative contribution', color: AMBER },
          { value: '100%', unit: '', label: 'Layers with equal weight (wasteful)', color: GRAY },
          { value: '<2%', unit: '', label: 'AttnRes latency overhead', color: GREEN },
        ]}
      />

      <ConceptCard title="PreNorm Dilution — The Deep Network Killer" color={PK} defaultOpen={true}>
        <Prose>
          <p>
            The problem is especially severe in{' '}
            <H tip="PreNorm = a Transformer variant where layer normalization is applied BEFORE the attention/FFN block, not after. Formula: h_l = h_{l-1} + f(LayerNorm(h_{l-1})). Almost all modern LLMs use PreNorm because it stabilizes training, but it causes dilution at depth." color={PK}>PreNorm</H>{' '}
            architectures (which is what virtually all modern LLMs use). Here is why:
          </p>
          <p>
            In PreNorm, the <H tip="Layer Normalization = normalizes the hidden state to have zero mean and unit variance across the feature dimension. This stabilizes training but also constrains the magnitude of each layer's output — each f_l output has roughly the same norm." color={CYAN}>LayerNorm</H>{' '}
            is applied <em>before</em> the transformation, meaning each <code>f_l</code> produces
            output of roughly unit norm. Meanwhile, the accumulated{' '}
            <H tip="Skip connection path = the 'highway' that carries the original input past the transformation. In h_l = h_{l-1} + f(h_{l-1}), the h_{l-1} term is the skip path. It preserves information but also causes the growing-magnitude problem." color={AMBER}>skip connection</H>{' '}
            path carries a hidden state whose magnitude grows with depth. So the ratio of
            "new information from layer l" to "accumulated state" shrinks as <code>1/sqrt(l)</code>.
          </p>
          <p>
            This is <strong>PreNorm dilution</strong>: the deeper you go, the less each layer can
            actually influence the final representation. Layers 1-10 in a 128-layer model have their
            contributions diluted by a factor of roughly 11x compared to a shallower network.
          </p>
        </Prose>

        <FormulaSteps
          label="PreNorm Dilution — Mathematical View"
          color={PK}
          steps={[
            {
              note: 'Standard PreNorm update rule:',
              math: 'h_l = h_{l-1} + f_l(\\text{LayerNorm}(h_{l-1}))',
            },
            {
              note: 'Each f_l output has roughly unit norm due to normalization:',
              math: '\\|f_l(\\text{LayerNorm}(h_{l-1}))\\| \\approx O(1)',
            },
            {
              note: 'But the accumulated state grows with each addition:',
              math: '\\|h_l\\| \\approx O(\\sqrt{l}) \\quad \\text{(random walk growth)}',
            },
            {
              note: 'So each layer\'s relative contribution shrinks:',
              math: '\\frac{\\|f_l\\|}{\\|h_l\\|} \\approx \\frac{O(1)}{O(\\sqrt{l})} = O\\left(\\frac{1}{\\sqrt{l}}\\right)',
            },
          ]}
          symbols={[
            { symbol: '||x||', meaning: 'magnitude (L2 norm) of vector x' },
            { symbol: 'f_l', meaning: 'layer l transformation output' },
            { symbol: 'l', meaning: 'layer index (depth)' },
          ]}
        />
      </ConceptCard>

      {/* ── PreNorm Dilution SVG Diagram ── */}
      <Diagram caption={<><strong>PreNorm Dilution</strong> — As depth increases, each layer's contribution (colored slice) becomes a smaller fraction of the total hidden state. Early layers are effectively drowned out.</>}>
        <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ar-g-pk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#be185d" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="ar-g-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Title */}
          <text x="400" y="28" textAnchor="middle" fill={PK} fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            Hidden State Growth vs Layer Contribution
          </text>

          {/* Draw stacked bars for layers 1 through 6 */}
          {[
            { l: 1, totalW: 80,  slices: [{ w: 80, c: '#ec4899' }] },
            { l: 2, totalW: 113, slices: [{ w: 56, c: '#f472b6' }, { w: 57, c: '#ec4899' }] },
            { l: 3, totalW: 138, slices: [{ w: 38, c: '#fb7185' }, { w: 50, c: '#f472b6' }, { w: 50, c: '#ec4899' }] },
            { l: 4, totalW: 160, slices: [{ w: 28, c: '#fda4af' }, { w: 35, c: '#fb7185' }, { w: 44, c: '#f472b6' }, { w: 53, c: '#ec4899' }] },
            { l: 6, totalW: 196, slices: [{ w: 18, c: '#fecdd3' }, { w: 22, c: '#fda4af' }, { w: 28, c: '#fb7185' }, { w: 35, c: '#f472b6' }, { w: 44, c: '#f472b6' }, { w: 49, c: '#ec4899' }] },
            { l: 8, totalW: 226, slices: [{ w: 12, c: '#fee2e2' }, { w: 14, c: '#fecdd3' }, { w: 18, c: '#fda4af' }, { w: 22, c: '#fb7185' }, { w: 28, c: '#fb7185' }, { w: 33, c: '#f472b6' }, { w: 42, c: '#f472b6' }, { w: 57, c: '#ec4899' }] },
          ].map((row, ri) => {
            const y = 50 + ri * 40;
            const barX = 120;
            let cx = barX;
            return (
              <g key={ri}>
                {/* Layer label */}
                <text x="18" y={y + 18} fill="#94a3b8" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
                  L = {row.l}
                </text>

                {/* Stacked colored bar */}
                <rect x={barX} y={y} width={row.totalW} height="28" rx="6" fill="none" stroke="#334155" strokeWidth="1" />
                {row.slices.map((s, si) => {
                  const sx = cx;
                  cx += s.w;
                  return (
                    <rect
                      key={si}
                      x={sx}
                      y={y + 1}
                      width={s.w - 1}
                      height="26"
                      rx={si === 0 ? 5 : 0}
                      fill={s.c}
                      opacity={0.7 + si * 0.04}
                    />
                  );
                })}

                {/* Magnitude label */}
                <text x={barX + row.totalW + 12} y={y + 18} fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">
                  ||h|| ~ sqrt({row.l})
                </text>
              </g>
            );
          })}

          {/* Annotation arrows */}
          {/* Arrow pointing to early layer shrinkage */}
          <line x1="520" y1="260" x2="145" y2="260" stroke={RED} strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ah-ef4444)" />
          <text x="530" y="264" fill={RED} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            Early layers diluted
          </text>
          {ARROW(0, 0, 0, 0, RED)}

          {/* Legend */}
          <rect x="560" y="55" width="220" height="70" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x="670" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            EACH COLORED SLICE
          </text>
          <text x="670" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="Inter, system-ui, sans-serif">
            = one layer's contribution
          </text>
          <text x="670" y="110" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            Slices get thinner with depth!
          </text>
        </svg>
      </Diagram>

      <Callout type="key">
        The fundamental flaw: standard residual connections treat all layers equally. Layer 1 and layer 100
        both get a weight of exactly 1. But not all layers are equally useful for every input.
        Some layers specialize in syntax, others in factual recall, others in reasoning — and their
        relevance varies per input. A fixed, uniform scheme wastes capacity.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — THE SOLUTION: ATTENTION RESIDUALS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="Attention Residuals"
        subtitle="Learned, input-dependent mixing across depth"
        color={PK}
      />

      <Prose>
        <p>
          The core idea of <H tip="Attention Residuals (AttnRes) = a replacement for standard residual connections that uses softmax attention to compute input-dependent weights for combining outputs from ALL preceding layers, rather than just adding the immediately previous layer." color={PK}>Attention Residuals</H>{' '}
          is elegant: instead of blindly accumulating every layer's output with equal weight,
          let the model <em>learn</em> how much each preceding layer should contribute — and make
          that decision <H tip="Input-dependent = the weights change based on what the model is currently processing. A math problem might up-weight reasoning layers, while a factual question might up-weight knowledge layers. This is the key advantage over fixed weights." color={CYAN}>depend on the input</H>.
        </p>
        <p>
          How? By using the same mechanism that Transformers already excel at:{' '}
          <H tip="Softmax attention = the core Transformer operation: compute similarity scores between a query and a set of keys, normalize with softmax to get weights, then compute a weighted sum of values. Here, it's applied across DEPTH (layers) rather than across SEQUENCE positions." color={PK}>attention</H>.
          But instead of attention across token positions, AttnRes applies attention across{' '}
          <strong>depth</strong> — across the outputs of all preceding layers.
        </p>
      </Prose>

      <FormulaSteps
        label="Building Up to Attention Residuals"
        color={PK}
        steps={[
          {
            note: 'Start with the standard residual — uniform accumulation:',
            math: 'h_{l+1} = h_l + f_l(h_l) = h_0 + \\sum_{i=0}^{l} f_i(h_i)',
          },
          {
            note: 'Introduce learnable weights — but still input-independent:',
            math: 'h_{l+1} = \\sum_{i=0}^{l} w_i \\cdot f_i(h_i) \\quad \\text{(fixed per layer)}',
          },
          {
            note: 'Make the weights input-dependent via a query-key mechanism:',
            math: '\\alpha_i^{(l)} = \\text{softmax}\\left(\\frac{q_l^\\top k_i}{\\sqrt{d}}\\right) \\quad \\text{for } i = 0, \\ldots, l',
          },
          {
            note: 'Keys and values come from preceding layer outputs:',
            math: 'k_i = W_K \\cdot [h_i; f_i(h_i)], \\quad v_i = W_V \\cdot [h_i; f_i(h_i)]',
          },
          {
            note: 'Final AttnRes update — weighted combination of ALL preceding layers:',
            math: '\\boxed{h_{l+1} = \\sum_{i=0}^{l} \\alpha_i^{(l)} \\cdot v_i}',
          },
        ]}
        symbols={[
          { symbol: 'alpha_i^(l)', meaning: 'attention weight of layer i at depth l (sums to 1)' },
          { symbol: 'q_l', meaning: 'learnable query vector for layer l' },
          { symbol: 'k_i', meaning: 'key derived from layer i output' },
          { symbol: 'v_i', meaning: 'value derived from layer i output' },
          { symbol: 'd', meaning: 'dimension of the query/key space' },
        ]}
      />

      <Prose>
        <p>
          Notice something crucial: the <H tip="Softmax = a function that converts a vector of real numbers into a probability distribution. Each output is positive and all outputs sum to 1. It emphasizes the largest values and suppresses the smallest, creating a 'soft' version of max." color={CYAN}>softmax</H>{' '}
          normalization ensures the weights <code>alpha_i</code> always sum to 1. This
          means the hidden state magnitude stays <strong>bounded</strong> regardless of depth — no more
          uncontrolled growth. The model can also <em>ignore</em> irrelevant layers by assigning
          them near-zero weight.
        </p>
        <p>
          Each layer has its own <H tip="Query vector (q_l) = a learnable parameter vector specific to layer l. It encodes 'what information does this layer need from preceding layers?' During training, the model learns different query vectors for different layers, specializing their information requests." color={PK}>query vector</H>{' '}
          <code>q_l</code> that encodes "what does this layer need?" The keys and values are
          derived from the <H tip="Concatenation [h_i; f_i(h_i)] = combining the input AND output of layer i into a single vector. This gives the key/value projections access to both what the layer received and what it computed, providing richer information for the attention mechanism." color={AMBER}>concatenated</H>{' '}
          input-output of each preceding layer. The attention mechanism then selects which
          preceding layers are most relevant for the current computation.
        </p>
      </Prose>

      <ConceptCard title="Standard Residual as a Special Case" color={CYAN} defaultOpen={true}>
        <Prose>
          <p>
            An elegant property: standard residual connections are a <strong>special case</strong> of
            AttnRes where all attention weights are uniform: <code>alpha_i = 1/(l+1)</code> for all
            preceding layers. AttnRes <em>generalizes</em> residual connections by allowing the
            model to deviate from uniform weighting when it is beneficial.
          </p>
          <p>
            This means AttnRes can never be <em>worse</em> than standard residuals in terms of
            expressivity — it includes the standard case as one point in its solution space. The
            question is purely about whether the model can learn to use the extra freedom effectively,
            and the empirical results say: yes, especially on reasoning tasks.
          </p>
        </Prose>

        <FormulaBlock
          math="\\alpha_i = \\frac{1}{l+1} \\; \\forall \\; i \\implies h_{l+1} = \\frac{1}{l+1}\\sum_{i=0}^{l} v_i \\quad \\text{(standard residual)}"
          label="Standard Residual = Uniform AttnRes"
          color={CYAN}
          symbols={[
            { symbol: '1/(l+1)', meaning: 'uniform weight across all l+1 preceding layers' },
          ]}
        />
      </ConceptCard>

      {/* ── AttnRes Mechanism SVG Diagram ── */}
      <Diagram caption={<><strong>AttnRes Mechanism</strong> — Layer l attends to all preceding layers with learned, input-dependent weights. Some layers get high attention (thick arrows, e.g. alpha=0.35), others are nearly ignored (thin arrows, e.g. alpha=0.02). The query q_l determines the weighting.</>}>
        <svg viewBox="0 0 900 400" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ar-gp1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="100%" stopColor="#500724" />
            </linearGradient>
            <linearGradient id="ar-gp2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e7490" />
              <stop offset="100%" stopColor="#164e63" />
            </linearGradient>
            <linearGradient id="ar-gp3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <marker id="ar-ah-pk" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6Z" fill={PK} />
            </marker>
            <marker id="ar-ah-cy" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6Z" fill={CYAN} />
            </marker>
          </defs>

          {/* Background zones */}
          <rect x="10" y="10" width="250" height="380" rx="14" fill="url(#ar-gp3)" stroke="#334155" strokeWidth="1" />
          <text x="135" y="36" textAnchor="middle" fill={GRAY} fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">PRECEDING LAYERS</text>

          <rect x="320" y="10" width="250" height="380" rx="14" fill="url(#ar-gp3)" stroke="#334155" strokeWidth="1" />
          <text x="445" y="36" textAnchor="middle" fill={GRAY} fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">ATTENTION WEIGHTS</text>

          <rect x="630" y="10" width="260" height="380" rx="14" fill="url(#ar-gp3)" stroke="#334155" strokeWidth="1" />
          <text x="760" y="36" textAnchor="middle" fill={GRAY} fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">OUTPUT</text>

          {/* Preceding layer boxes */}
          {[
            { label: 'h_0 (embed)', y: 55, alpha: 0.08 },
            { label: 'f_1(h_1)', y: 110, alpha: 0.35 },
            { label: 'f_2(h_2)', y: 165, alpha: 0.05 },
            { label: 'f_3(h_3)', y: 220, alpha: 0.30 },
            { label: '...', y: 270, alpha: null },
            { label: 'f_{l-1}(h_{l-1})', y: 310, alpha: 0.22 },
          ].map((layer, i) => {
            if (layer.label === '...') {
              return (
                <text key={i} x="135" y={layer.y + 12} textAnchor="middle" fill="#475569" fontSize="18" fontFamily="Inter, system-ui, sans-serif">
                  ...
                </text>
              );
            }
            const barWidth = layer.alpha ? Math.max(20, layer.alpha * 400) : 0;
            const opacity = layer.alpha ? Math.max(0.3, layer.alpha * 2) : 0;
            return (
              <g key={i}>
                {/* Layer box */}
                <rect x="30" y={layer.y} width="210" height="38" rx="8" fill={i === 1 || i === 3 ? 'url(#ar-gp1)' : '#1e293b'} stroke={i === 1 || i === 3 ? PK : '#334155'} strokeWidth={i === 1 || i === 3 ? 1.5 : 1} />
                <text x="135" y={layer.y + 24} textAnchor="middle" fill={i === 1 || i === 3 ? '#fce7f3' : '#94a3b8'} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
                  {layer.label}
                </text>

                {/* Attention arrow — width proportional to alpha */}
                <line
                  x1="240" y1={layer.y + 19}
                  x2="340" y2={layer.y + 19}
                  stroke={PK}
                  strokeWidth={Math.max(1, layer.alpha * 8)}
                  opacity={opacity}
                  markerEnd="url(#ar-ah-pk)"
                />

                {/* Alpha label */}
                <rect x="345" y={layer.y + 2} width={barWidth} height="32" rx="6" fill={PK} opacity={opacity * 0.3} />
                <text x="355" y={layer.y + 23} fill={PK2} fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                  alpha = {layer.alpha.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Query vector */}
          <rect x="650" y="55" width="220" height="44" rx="10" fill="url(#ar-gp1)" stroke={PK} strokeWidth="2" />
          <text x="760" y="75" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            q_l (query for layer l)
          </text>
          <text x="760" y="92" textAnchor="middle" fill={PK2} fontSize="10" fontFamily="Inter, system-ui, sans-serif">
            learnable parameter
          </text>

          {/* Arrow from query to attention */}
          <line x1="650" y1="77" x2="575" y2="120" stroke={PK} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#ar-ah-pk)" />
          <text x="600" y="88" fill={PK2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">softmax(q . k / sqrt(d))</text>

          {/* Weighted sum output */}
          <rect x="660" y="160" width="200" height="80" rx="12" fill="#831843" stroke={PK} strokeWidth="2" />
          <text x="760" y="190" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
            Weighted Sum
          </text>
          <text x="760" y="210" textAnchor="middle" fill={PK2} fontSize="11" fontFamily="Inter, system-ui, sans-serif">
            h_(l+1) = Sum alpha_i . v_i
          </text>
          <text x="760" y="230" textAnchor="middle" fill="#fce7f3" fontSize="10" fontFamily="Inter, system-ui, sans-serif">
            bounded magnitude!
          </text>

          {/* Arrow from attention zone to output */}
          <line x1="570" y1="200" x2="660" y2="200" stroke={PK} strokeWidth="2" markerEnd="url(#ar-ah-pk)" />

          {/* Key insight callout */}
          <rect x="660" y="280" width="200" height="80" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="760" y="302" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">KEY INSIGHT</text>
          <text x="760" y="320" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Inter, system-ui, sans-serif">High-alpha layers = relevant</text>
          <text x="760" y="338" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="Inter, system-ui, sans-serif">Low-alpha layers = ignored</text>
          <text x="760" y="356" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter, system-ui, sans-serif">Different per input!</text>
        </svg>
      </Diagram>

      <Callout type="insight">
        Think of it this way: standard residuals are <strong>democracy</strong> — every layer gets
        an equal vote. AttnRes is <strong>meritocracy</strong> — layers that have something
        relevant to say for <em>this particular input</em> get a louder voice. The model learns
        which layers to trust, and that decision changes with every new input.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — BLOCK ATTNRES: MAKING IT PRACTICAL
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="Block AttnRes — Making It Practical"
        subtitle="Group layers into blocks to slash memory from O(L^2) to O(B^2)"
        color={PK}
      />

      <Prose>
        <p>
          The full AttnRes formulation has a problem:{' '}
          <H tip="Memory complexity O(L^2) = each of L layers must store key/value representations for all preceding layers. With L=128 layers, that's 128x128 = 16,384 key-value pairs to maintain — a significant memory overhead on top of the already large model weights." color={RED}>O(L^2) memory</H>.
          Each layer must attend to all preceding layers, which means storing keys and values for
          every layer. For a 128-layer model, that is 16,384 attention interactions — feasible but
          expensive, especially during training where memory is at a premium.
        </p>
        <p>
          The solution is <H tip="Block AttnRes = a practical variant that groups consecutive layers into blocks (typically ~8 blocks total). Attention is computed between blocks rather than individual layers, reducing memory from O(L^2) to O(B^2) where B << L." color={PK}>Block AttnRes</H>:
          partition the network's layers into <strong>B blocks</strong> of consecutive layers, and
          apply the attention-based mixing at the <em>block</em> level rather than the individual
          layer level.
        </p>
      </Prose>

      <StepFlow
        color={PK}
        steps={[
          {
            title: 'Partition Layers into Blocks',
            desc: <>Divide L layers into B blocks (e.g., 128 layers into 8 blocks of 16). Within each block, layers use <H tip="Intra-block residuals = standard h_l = h_{l-1} + f(h_{l-1}) connections used inside each block. These are fast, local, and memory-efficient." color={CYAN}>standard residual connections</H>.</>,
          },
          {
            title: 'Block-Level Key-Value Generation',
            desc: <>At the end of each block, compute a <H tip="Block representation = a summary vector for the entire block's computation. This is what gets stored as a key/value pair for the inter-block attention mechanism." color={PK}>block representation</H> from the final hidden state. Project it into key and value vectors for the cross-block attention.</>,
          },
          {
            title: 'Inter-Block Attention',
            desc: <>When entering block b, use its <H tip="Block query = analogous to q_l in full AttnRes, but now one query per block rather than one per layer. This query determines which preceding blocks are most relevant for the current block's computation." color={PK}>block query</H> to attend over all preceding block representations. Compute attention weights and weighted sum.</>,
          },
          {
            title: 'Cache-Based Pipeline Communication',
            desc: <>Block representations are stored in a lightweight <H tip="Block cache = a small buffer holding the key/value pairs for each completed block. Since there are only B blocks (not L layers), this cache is tiny — O(B) entries rather than O(L)." color={GREEN}>block cache</H>. During inference with pipeline parallelism, only the cache (not full activations) needs to be communicated between pipeline stages.</>,
          },
        ]}
      />

      <FormulaSteps
        label="Block AttnRes — Memory Reduction"
        color={PK}
        steps={[
          {
            note: 'Full AttnRes: each layer attends to all preceding layers:',
            math: '\\text{Memory} = O(L^2) \\quad \\text{(128 layers } \\to \\text{16,384 pairs)}',
          },
          {
            note: 'Block AttnRes: group into B blocks, attend at block level:',
            math: '\\text{Memory} = O(B^2) \\quad \\text{(8 blocks } \\to \\text{64 pairs)}',
          },
          {
            note: 'Reduction factor — dramatic savings:',
            math: '\\boxed{\\frac{L^2}{B^2} = \\frac{128^2}{8^2} = 256\\times \\text{ memory reduction}}',
          },
        ]}
        symbols={[
          { symbol: 'L', meaning: 'total number of layers (e.g. 128)' },
          { symbol: 'B', meaning: 'number of blocks (e.g. 8)' },
        ]}
      />

      {/* ── Block AttnRes SVG Diagram ── */}
      <Diagram caption={<><strong>Block AttnRes</strong> — Layers are grouped into blocks. Attention operates between blocks (pink arrows), not individual layers. Within each block, standard residual connections are used. Memory cost drops from O(L^2) to O(B^2).</>}>
        <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ar-blk1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="100%" stopColor="#500724" />
            </linearGradient>
            <linearGradient id="ar-blk2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#164e63" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>
            <marker id="ar-bah" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6Z" fill={PK} />
            </marker>
          </defs>

          <text x="400" y="24" textAnchor="middle" fill={PK} fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            Block-Level Attention (B = 8 blocks)
          </text>

          {/* 8 blocks */}
          {['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'].map((name, i) => {
            const x = 30 + i * 95;
            const y = 45;
            const isHighlight = i === 0 || i === 2 || i === 4;
            return (
              <g key={name}>
                {/* Block container */}
                <rect x={x} y={y} width="80" height="130" rx="10"
                  fill={isHighlight ? 'url(#ar-blk1)' : 'url(#ar-blk2)'}
                  stroke={isHighlight ? PK : CYAN}
                  strokeWidth={isHighlight ? 2 : 1}
                />
                <text x={x + 40} y={y + 20} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                  {name}
                </text>

                {/* Mini-layers inside block */}
                {[0, 1, 2, 3].map(j => (
                  <rect key={j} x={x + 8} y={y + 32 + j * 22} width="64" height="16" rx="4"
                    fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
                  />
                ))}
                <text x={x + 40} y={y + 122} textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">
                  16 layers
                </text>
              </g>
            );
          })}

          {/* Inter-block attention arrows (showing B5 attending to B1, B3, B5) */}
          {/* B1 → B5 */}
          <path d="M 70,175 C 70,210 410,210 410,175" fill="none" stroke={PK} strokeWidth="3" opacity="0.8" markerEnd="url(#ar-bah)" />
          <text x="240" y="225" textAnchor="middle" fill={PK2} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">alpha = 0.35</text>

          {/* B3 → B5 */}
          <path d="M 260,175 C 260,200 410,200 410,175" fill="none" stroke={PK} strokeWidth="2" opacity="0.5" markerEnd="url(#ar-bah)" />
          <text x="340" y="207" textAnchor="middle" fill={PK2} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">0.25</text>

          {/* B4 → B5 */}
          <path d="M 355,175 C 355,190 410,190 410,175" fill="none" stroke={PK} strokeWidth="1" opacity="0.3" markerEnd="url(#ar-bah)" />
          <text x="385" y="195" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">0.05</text>

          {/* Memory comparison box */}
          <rect x="50" y="240" width="300" height="50" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="200" y="260" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            Full AttnRes: O(L^2) = O(128^2) = 16,384
          </text>
          <text x="200" y="280" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
            Block AttnRes: O(B^2) = O(8^2) = 64
          </text>

          {/* Pipeline badge */}
          <rect x="480" y="240" width="290" height="50" rx="10" fill="#0f172a" stroke={PK} strokeWidth="1" strokeDasharray="4 2" />
          <text x="625" y="260" textAnchor="middle" fill={PK} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            Pipeline Communication
          </text>
          <text x="625" y="278" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter, system-ui, sans-serif">
            Only block cache (not full activations) transferred
          </text>
        </svg>
      </Diagram>

      <ConceptCard title="Two-Phase Computation Strategy" color={CYAN} defaultOpen={false}>
        <Prose>
          <p>
            Block AttnRes uses a clever two-phase approach within each block:
          </p>
          <p>
            <strong>Phase 1 — Intra-block:</strong> Process all layers within the current block using
            standard residual connections. This is fast, requires no extra memory, and handles the
            fine-grained local computations.
          </p>
          <p>
            <strong>Phase 2 — Inter-block:</strong> At the block boundary, compute the block's key/value
            representation, then use AttnRes to mix information from <em>all preceding blocks</em>.
            This is where the <H tip="Dynamic skip connections = connections that change their strength based on the input, unlike fixed residual connections that always have weight 1. AttnRes implements dynamic skip connections at the block level." color={PK}>dynamic skip connections</H> happen.
          </p>
          <p>
            This hybrid approach gets most of the benefit of full AttnRes (the model can still
            route information from any depth) while keeping memory costs manageable. The block
            boundaries act as information "checkpoints" where the model decides what to carry forward.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        Block AttnRes is a <strong>256x memory reduction</strong> over full AttnRes (for 128 layers, 8 blocks)
        while retaining the core benefit: learned, input-dependent mixing across depth. The within-block
        residuals handle local computation; the between-block attention handles long-range depth routing.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — WHY IT WORKS: GRADIENT AND REPRESENTATION ANALYSIS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="Why It Works — Gradient and Representation Analysis"
        subtitle="Better gradients, more uniform representations, and the stability-expressivity tradeoff"
        color={PK}
      />

      <Prose>
        <p>
          AttnRes does not just change the <H tip="Forward pass = the computation that runs input through the network to produce output. In the forward pass, data flows from input layer to output layer. AttnRes changes HOW layers combine in this forward flow." color={CYAN}>forward pass</H> —
          it fundamentally changes the <H tip="Backward pass (backpropagation) = the computation that flows gradients from the loss function back through the network to update weights. The gradient at each layer determines how much that layer's parameters change during training." color={CYAN}>gradient flow</H>{' '}
          through the network. And this is arguably the more important effect.
        </p>
      </Prose>

      <FormulaSteps
        label="Gradient Flow Comparison"
        color={PK}
        steps={[
          {
            note: 'Standard residual — gradient from loss to layer i passes through all layers:',
            math: '\\frac{\\partial \\mathcal{L}}{\\partial h_i} = \\frac{\\partial \\mathcal{L}}{\\partial h_L} \\cdot \\prod_{j=i+1}^{L} \\left(I + \\frac{\\partial f_j}{\\partial h_j}\\right)',
          },
          {
            note: 'This product can explode or vanish over many layers:',
            math: '\\prod_{j=i+1}^{L} \\left(I + \\frac{\\partial f_j}{\\partial h_j}\\right) \\to \\begin{cases} \\infty & \\text{(exploding)} \\\\ 0 & \\text{(vanishing)} \\end{cases}',
          },
          {
            note: 'AttnRes — gradient has a DIRECT path via attention weights:',
            math: '\\frac{\\partial \\mathcal{L}}{\\partial v_i} = \\frac{\\partial \\mathcal{L}}{\\partial h_{l+1}} \\cdot \\alpha_i^{(l)} \\quad \\text{(direct, no product chain!)}',
          },
          {
            note: 'The attention weight alpha provides a gradient highway:',
            math: '\\boxed{\\text{Gradient}_{\\text{AttnRes}} = \\alpha_i \\cdot \\nabla_{h_{l+1}} \\mathcal{L} \\quad \\text{(bounded, direct)}}',
          },
        ]}
        symbols={[
          { symbol: 'L (script)', meaning: 'loss function' },
          { symbol: 'I', meaning: 'identity matrix' },
          { symbol: 'nabla', meaning: 'gradient operator' },
          { symbol: 'alpha_i', meaning: 'attention weight (bounded 0-1)' },
        ]}
      />

      <Prose>
        <p>
          The key difference: in standard residuals, the gradient must flow through a{' '}
          <H tip="Product chain = multiplying together many Jacobian matrices, one per layer. If each Jacobian has spectral norm > 1, the product explodes exponentially. If < 1, it vanishes. Maintaining exactly 1 across all layers is extremely difficult." color={RED}>product chain</H>{' '}
          of Jacobian matrices — one per layer. This is the classic{' '}
          <H tip="Vanishing gradient problem = when gradients become exponentially small as they propagate backward through many layers. Early layers receive near-zero gradients and barely update, making deep networks hard to train. This was the original motivation for residual connections." color={RED}>vanishing/exploding gradient</H>{' '}
          problem. Residual connections help by adding an identity term, but the problem persists at scale.
        </p>
        <p>
          AttnRes creates a <strong>direct gradient path</strong> from the output to any preceding
          layer, weighted by <code>alpha_i</code>. This is similar to how attention in the sequence
          dimension creates direct paths between any two tokens — here, it creates direct paths
          across <em>depth</em>.
        </p>
      </Prose>

      <ComparisonTable
        headers={['Property', 'Standard Residual', 'AttnRes']}
        rows={[
          ['Gradient path', 'Product chain through all layers', 'Direct via attention weights'],
          ['Hidden state magnitude', 'Grows as O(sqrt(L))', 'Bounded (softmax normalization)'],
          ['Layer contribution', 'Fixed, equal weight', 'Dynamic, input-dependent'],
          ['Representation diversity', 'Layers converge with depth', 'Maintained by selective attention'],
          ['Deep layer utility', 'Diminished (dilution)', 'Preserved (can up-weight early layers)'],
        ]}
        caption="Structural comparison of gradient and representation properties"
      />

      <ConceptCard title="The Stability-Expressivity Tradeoff" color={AMBER} defaultOpen={true}>
        <Prose>
          <p>
            The paper identifies a subtle and important tradeoff. AttnRes excels at tasks requiring{' '}
            <H tip="Structured reasoning = tasks where the model must follow logical chains, apply rules, or build multi-step arguments. Examples: mathematical proofs, code generation, scientific reasoning. These benefit from selective layer attention because different reasoning steps need different types of processing." color={GREEN}>structured reasoning</H>{' '}
            (GPQA-Diamond +7.5, Math +3.6), where the model benefits from selectively routing
            information across depth.
          </p>
          <p>
            However, standard residuals can sometimes win on pure{' '}
            <H tip="Memorization tasks = tasks where success depends on having stored and recalling specific facts, rather than reasoning about them. Think trivia questions or rare factual knowledge. These may benefit from the 'accumulate everything' strategy of standard residuals." color={AMBER}>memorization tasks</H>,
            where the brute-force accumulation of all layer outputs actually helps capture
            low-frequency information that might be lost if the model "decides" to ignore certain layers.
          </p>
          <p>
            This is the <strong>stability-expressivity tradeoff</strong>: AttnRes is more
            expressive (it can learn complex routing patterns) but slightly less stable in the sense
            that it can learn to over-prune information. The Block AttnRes variant with ~8 blocks
            hits a sweet spot, providing enough routing flexibility for reasoning while maintaining
            enough information flow for knowledge tasks.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="math">
        The bounded magnitude property is crucial for training stability. With softmax normalization,
        <code> ||h_(l+1)|| &lt;= max_i ||v_i||</code> — the output can never be larger than the
        largest value vector. Compare this to standard residuals where{' '}
        <code>||h_L|| ~ O(sqrt(L))</code> and grows without bound as you add layers.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — RESULTS: THE NUMBERS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="Results — The Numbers"
        subtitle="Consistent gains, especially on reasoning benchmarks"
        color={PK}
      />

      <Prose>
        <p>
          The authors evaluate AttnRes on{' '}
          <H tip="Kimi Linear 48B/3B = a Mixture-of-Experts (MoE) language model with 48 billion total parameters but only 3 billion activated per token. This means only a fraction of the network fires for each input, making it efficient despite its large size." color={PK}>Kimi Linear 48B/3B</H>,
          a production-scale <H tip="Mixture of Experts (MoE) = an architecture where the model has many 'expert' sub-networks but only activates a small subset for each input. This allows scaling to very large total parameter counts while keeping per-token compute manageable." color={CYAN}>MoE</H> model
          trained on <strong>1.4 trillion tokens</strong>. The results are compelling: AttnRes
          improves on 8 out of 8 benchmarks, with the largest gains on tasks requiring{' '}
          <H tip="Multi-step reasoning = problems that require chaining together multiple logical steps. GPQA-Diamond tests PhD-level science reasoning; Math benchmarks test multi-step mathematical problem solving. Both require the model to 'plan' across layers." color={GREEN}>multi-step reasoning</H>.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '+7.5', unit: '', label: 'GPQA-Diamond (biggest win)', color: PK },
          { value: '+3.6', unit: '', label: 'Math improvement', color: GREEN },
          { value: '1.25x', unit: '', label: 'Compute efficiency match', color: CYAN },
          { value: '<2%', unit: '', label: 'Latency overhead', color: AMBER },
        ]}
      />

      <ComparisonTable
        headers={['Benchmark', 'Standard', 'AttnRes', 'Delta', 'Category']}
        rows={[
          ['MMLU', '73.5', '74.6', '+1.1', 'Knowledge'],
          ['GPQA-Diamond', '36.9', '44.4', '+7.5', 'Reasoning'],
          ['BBH', '76.3', '78.0', '+1.7', 'Reasoning'],
          ['Math', '53.5', '57.1', '+3.6', 'Reasoning'],
          ['HumanEval', '59.1', '62.2', '+3.1', 'Code'],
          ['MBPP', '72.0', '73.9', '+1.9', 'Code'],
          ['CMMLU', '82.0', '82.9', '+0.9', 'Knowledge (Chinese)'],
          ['C-Eval', '79.6', '82.5', '+2.9', 'Knowledge (Chinese)'],
        ]}
        caption="Full benchmark results: Kimi Linear 48B/3B with standard residuals vs AttnRes (1.4T tokens)"
      />

      <Prose>
        <p>
          The pattern is clear: the biggest improvements come on{' '}
          <H tip="GPQA-Diamond = 'Graduate-Level Google-Proof Q&A' — a benchmark of extremely difficult science questions designed to be unsolvable by simple web search. Questions are validated by domain experts (PhDs) and require genuine reasoning, not just recall." color={PK}>GPQA-Diamond</H>{' '}
          (+7.5 points) and <H tip="Math benchmark = a collection of competition-level mathematics problems requiring multi-step algebraic manipulation, proof strategies, and numerical reasoning. Performance on this benchmark is strongly correlated with a model's ability to chain logical steps." color={GREEN}>Math</H>{' '}
          (+3.6 points) — tasks that demand the model route information selectively across its
          depth. Knowledge benchmarks like <H tip="MMLU = Massive Multitask Language Understanding. Tests knowledge across 57 subjects from STEM to humanities. Performance correlates with the model's ability to store and recall factual information." color={CYAN}>MMLU</H>{' '}
          still improve but more modestly (+1.1).
        </p>
        <p>
          Perhaps the most remarkable finding: AttnRes with the same compute budget matches the
          performance of a model trained with <strong>1.25x more compute</strong> using standard
          residuals. You get 25% more effective training for essentially free.
        </p>
      </Prose>

      {/* ── Results Bar Chart SVG ── */}
      <Diagram caption={<><strong>Benchmark Comparison</strong> — Standard (gray) vs AttnRes (pink). Delta values shown. Largest gains on reasoning tasks (GPQA-Diamond, Math).</>}>
        <svg viewBox="0 0 800 320" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ar-bar-std" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="ar-bar-pk" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#831843" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          <text x="400" y="22" textAnchor="middle" fill={PK} fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            Standard vs AttnRes — 8 Benchmarks
          </text>

          {[
            { name: 'MMLU', std: 73.5, ar: 74.6, delta: '+1.1' },
            { name: 'GPQA-D', std: 36.9, ar: 44.4, delta: '+7.5' },
            { name: 'BBH', std: 76.3, ar: 78.0, delta: '+1.7' },
            { name: 'Math', std: 53.5, ar: 57.1, delta: '+3.6' },
            { name: 'HumanEval', std: 59.1, ar: 62.2, delta: '+3.1' },
            { name: 'MBPP', std: 72.0, ar: 73.9, delta: '+1.9' },
            { name: 'CMMLU', std: 82.0, ar: 82.9, delta: '+0.9' },
            { name: 'C-Eval', std: 79.6, ar: 82.5, delta: '+2.9' },
          ].map((b, i) => {
            const y = 38 + i * 34;
            const scale = 6.5;
            const stdW = b.std * scale;
            const arW = b.ar * scale;
            const barX = 105;
            const isReasoning = b.name === 'GPQA-D' || b.name === 'Math';
            return (
              <g key={i}>
                {/* Benchmark label */}
                <text x="100" y={y + 12} textAnchor="end" fill={isReasoning ? PK2 : '#94a3b8'} fontSize="11" fontWeight={isReasoning ? '700' : '500'} fontFamily="Inter, system-ui, sans-serif">
                  {b.name}
                </text>

                {/* Standard bar */}
                <rect x={barX} y={y} width={stdW} height="12" rx="3" fill="url(#ar-bar-std)" />
                <text x={barX + stdW + 4} y={y + 10} fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">
                  {b.std}
                </text>

                {/* AttnRes bar */}
                <rect x={barX} y={y + 15} width={arW} height="12" rx="3" fill="url(#ar-bar-pk)" />
                <text x={barX + arW + 4} y={y + 25} fill={PK2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">
                  {b.ar}
                </text>

                {/* Delta badge */}
                <rect x="720" y={y + 4} width="55" height="20" rx="6"
                  fill={isReasoning ? 'rgba(236,72,153,0.15)' : 'rgba(255,255,255,0.04)'}
                  stroke={isReasoning ? PK : '#334155'} strokeWidth="1"
                />
                <text x="747" y={y + 18} textAnchor="middle"
                  fill={isReasoning ? PK : '#94a3b8'}
                  fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif"
                >
                  {b.delta}
                </text>
              </g>
            );
          })}

          {/* Legend */}
          <rect x="130" y="312" width="10" height="10" rx="2" fill="url(#ar-bar-std)" />
          <text x="145" y="321" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Standard</text>
          <rect x="220" y="312" width="10" height="10" rx="2" fill="url(#ar-bar-pk)" />
          <text x="235" y="321" fill={PK2} fontSize="10" fontFamily="Inter, system-ui, sans-serif">AttnRes</text>
          <text x="350" y="321" fill={GRAY} fontSize="9" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">
            Highlighted = reasoning benchmarks (biggest AttnRes wins)
          </text>
        </svg>
      </Diagram>

      <Callout type="key">
        AttnRes achieves its largest gains on reasoning-heavy benchmarks: <strong>+7.5 on GPQA-Diamond</strong> and
        <strong> +3.6 on Math</strong>. These are exactly the tasks where selective routing across depth
        matters most — the model needs to dynamically combine different types of processing (syntax parsing,
        fact retrieval, logical chaining) in an input-specific way.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — TRAINING & ARCHITECTURE DETAILS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Training & Architecture Details"
        subtitle="Kimi Linear 48B/3B — making AttnRes work at scale"
        color={PK}
      />

      <Prose>
        <p>
          The paper validates AttnRes on <H tip="Kimi Linear = a production-grade LLM developed by Moonshot AI (the company behind the Kimi chatbot). The '48B/3B' designation means 48B total parameters with only 3B activated per token, following the Mixture-of-Experts paradigm." color={PK}>Kimi Linear 48B/3B</H>,
          a serious production-scale model. Here are the key architectural details:
        </p>
      </Prose>

      <StepFlow
        color={PK}
        steps={[
          {
            title: 'Model Architecture — MoE',
            desc: <>48 billion total parameters, 3 billion <H tip="Activated parameters = the subset of parameters that actually compute for any given token. In MoE, most parameters sit idle for most inputs — only the selected 'expert' sub-networks fire. This allows massive model capacity without proportional compute cost." color={CYAN}>activated parameters</H> per token. This MoE design means the model has enormous capacity but efficient per-token compute.</>,
          },
          {
            title: 'Training Scale — 1.4T Tokens',
            desc: <>Trained on 1.4 trillion tokens — enough data to fully exercise the AttnRes routing patterns. The attention weights over depth evolve throughout training as the model discovers which layers specialize in what.</>,
          },
          {
            title: 'Block Configuration — ~8 Blocks',
            desc: <>The network is partitioned into approximately 8 blocks for Block AttnRes. This was chosen as a balance point: enough blocks to capture diverse routing patterns, few enough to keep the inter-block attention lightweight.</>,
          },
          {
            title: 'Latency Overhead — Under 2%',
            desc: <>The additional computation for block-level attention adds less than 2% to <H tip="Inference latency = the wall-clock time to generate one token during serving. This is the critical metric for deployed LLMs since it directly affects user experience. AttnRes adds minimal overhead because the block attention is tiny compared to the per-layer self-attention." color={GREEN}>inference latency</H>. The block cache is small (only B key-value pairs), and the softmax computation over 8 entries is negligible.</>,
          },
        ]}
      />

      <ConceptCard title="Scaling Law Experiments" color={CYAN} defaultOpen={true}>
        <Prose>
          <p>
            A crucial validation: the paper does not just test at one model size. They run{' '}
            <H tip="Scaling laws = empirical relationships between model size, data size, compute budget, and performance. By fitting these laws, researchers can predict how performance will change when scaling up, enabling efficient resource planning." color={CYAN}>scaling law</H>{' '}
            experiments across multiple model sizes and find that AttnRes improvements are{' '}
            <strong>consistent and growing</strong> with scale.
          </p>
          <p>
            This is important because many architectural innovations that work on small models
            fail to transfer to large ones. AttnRes shows the opposite pattern: the deeper and
            larger the model, the more it benefits from learned depth-wise routing. This makes
            intuitive sense — a 200-layer model has far more potential for layer specialization
            than a 12-layer model.
          </p>
        </Prose>
      </ConceptCard>

      <ConceptCard title="Implementation with Pipeline Parallelism" color={AMBER} defaultOpen={false}>
        <Prose>
          <p>
            Modern large models are trained across many GPUs using{' '}
            <H tip="Pipeline parallelism = a training strategy where different layers of the model are placed on different GPUs. Data flows through the 'pipeline' of GPUs, with each GPU computing its assigned layers. The challenge is minimizing idle time ('pipeline bubbles')." color={AMBER}>pipeline parallelism</H>.
            Block AttnRes is specifically designed to be pipeline-friendly:
          </p>
          <p>
            When a pipeline stage completes processing a block, it writes the block's key-value
            representation to the block cache. The next stage reads from this cache when computing
            its inter-block attention. This communication pattern is{' '}
            <H tip="Asynchronous communication = data transfer that doesn't require the sender to wait for the receiver. The block cache acts as a shared buffer — one stage writes to it while another stage reads from a previously written entry. This overlaps communication with computation." color={AMBER}>asynchronous</H>{' '}
            — stages can overlap computation with cache updates, minimizing pipeline stalls.
          </p>
          <p>
            The cache itself is tiny: with 8 blocks and a typical hidden dimension of 4096, the
            total cache is only 8 x 4096 x 2 (key + value) = ~65K parameters — negligible compared
            to the model weights.
          </p>
        </Prose>
      </ConceptCard>

      <StatBar
        stats={[
          { value: '48B', unit: '', label: 'Total parameters', color: PK },
          { value: '3B', unit: '', label: 'Activated per token', color: CYAN },
          { value: '1.4T', unit: '', label: 'Training tokens', color: GREEN },
          { value: '~8', unit: '', label: 'AttnRes blocks', color: AMBER },
        ]}
      />

      <Callout type="insight">
        AttnRes is not just a theoretical improvement — it is <strong>production-ready</strong>. The
        Moonshot AI team deployed it in Kimi Linear, their flagship model. The under-2% latency
        overhead means it can be adopted in serving infrastructure without re-engineering the
        inference pipeline. The cache-based communication design means it works seamlessly with
        existing pipeline parallelism frameworks.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — MENTAL MODELS & IMPLICATIONS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Mental Models & Implications"
        subtitle="How to think about learned depth routing"
        color={PK}
      />

      <MentalModel
        title="The Orchestra Conductor"
        analogy="A standard Transformer with residual connections is like an orchestra where every instrument plays at exactly the same volume for every piece. The violins, brass, woodwinds, and percussion all contribute equally — even if the piece is a soft string quartet. Attention Residuals add a conductor who dynamically adjusts each section's volume based on the specific piece being played. For a math problem, the conductor turns up the 'logical reasoning' layers and turns down the 'surface-level pattern matching' layers. For a factual recall question, the balance shifts differently."
        technical="The query vector q_l acts as the conductor's baton for layer l — it encodes what information this layer needs. The attention weights alpha_i are the volume knobs for each preceding 'instrument' (layer). The softmax constraint ensures the total volume stays bounded, preventing the sonic blast of accumulated residuals."
        color={PK}
      />

      <MentalModel
        title="Stack of Specialists"
        analogy="Imagine a consulting firm with 128 specialists, each an expert in a different aspect of a problem. A standard residual connection is like requiring every specialist to contribute to every report, regardless of relevance. The tax specialist writes a paragraph for the technology report, the marketing expert weighs in on the legal review. Attention Residuals are like a smart project manager who, for each specific client request, selects the 5-10 most relevant specialists and ignores the rest. The key insight: the selection changes for every client."
        technical="Each block's output is like a specialist's contribution. The block query determines 'what kind of expertise do I need right now?' The attention mechanism matches this query against each specialist's key (their competency profile) and produces weights that select the most relevant ones. The input-dependence means a math problem pulls from different specialists than a coding task."
        color={CYAN}
      />

      <ConceptCard title="Broader Implications for Future Architectures" color={PURPLE} defaultOpen={true}>
        <Prose>
          <p>
            AttnRes opens several important directions for future work:
          </p>
          <p>
            <strong>1. Depth as a routing dimension:</strong> We already have attention across
            sequence positions (standard self-attention) and across{' '}
            <H tip="Expert routing = the mechanism in MoE models that decides which expert sub-networks handle each token. This is routing across 'width' — different experts at the same depth. AttnRes adds routing across 'depth' — different layers at different depths." color={PURPLE}>expert width</H> (MoE routing).
            AttnRes adds attention across <em>depth</em>. This suggests a unified view where routing
            happens along all three dimensions: position, width, and depth.
          </p>
          <p>
            <strong>2. Adaptive computation:</strong> AttnRes is a step toward models that can{' '}
            <H tip="Adaptive computation = the idea that a model should spend more compute on harder inputs and less on easy ones. AttnRes is a soft version of this: by assigning very low attention weights to some layers, it effectively 'skips' them for certain inputs." color={GREEN}>adaptively</H>{' '}
            adjust their depth on a per-input basis. If the model learns to assign near-zero weight
            to the last 50 layers for simple inputs, it has effectively learned to use fewer layers
            when they are not needed.
          </p>
          <p>
            <strong>3. Understanding Transformer internals:</strong> The attention weight patterns
            over depth provide a new interpretability tool. By examining which layers get high
            weights for different input types, researchers can better understand layer specialization
            in deep Transformers.
          </p>
        </Prose>
      </ConceptCard>

      <ConceptCard title="Limitations and Open Questions" color={AMBER} defaultOpen={false}>
        <Prose>
          <p>
            <strong>Stability-expressivity gap:</strong> As discussed, AttnRes can sometimes
            underperform on memorization-heavy tasks. Finding the right block granularity to balance
            routing flexibility with information preservation remains an open problem.
          </p>
          <p>
            <strong>Training dynamics:</strong> The attention patterns over depth are learned from
            scratch during training. It is unclear how quickly these patterns converge and whether
            curriculum learning strategies could accelerate this process.
          </p>
          <p>
            <strong>Interaction with other techniques:</strong> How AttnRes interacts with other
            recent innovations like{' '}
            <H tip="Mixture of Depths = a technique where the model dynamically decides how many layers to apply per token, skipping layers entirely for easy tokens. This is complementary to AttnRes, which adjusts layer WEIGHTS rather than skipping layers." color={PURPLE}>Mixture of Depths</H>,
            conditional computation, or{' '}
            <H tip="Linear attention = approximations to softmax attention that reduce the quadratic cost to linear. These are increasingly used in efficient Transformers. Whether AttnRes's depth attention should also be linearized for very deep models is an open question." color={CYAN}>linear attention</H>{' '}
            variants is largely unexplored.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        The core takeaway: <strong>residual connections have been a fixed, uniform design choice since
        ResNet in 2015</strong>. AttnRes shows that making this connection <em>learned and
        input-dependent</em> yields substantial improvements, especially on reasoning tasks — all for
        under 2% latency overhead. As models get deeper and more specialized, the importance of
        intelligent depth routing will only grow.
      </Callout>
    </>
  );
}
