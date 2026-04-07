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
const C  = '#06b6d4';   // cyan accent (primary)
const C2 = '#22d3ee';   // lighter cyan
const C3 = '#0891b2';   // darker cyan
const BG = '#0a1218';   // deep cyan-black for SVGs
const FG = '#e2e8f0';   // light text in SVGs
const GRAY = '#94a3b8';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const RED = '#ef4444';
const PURPLE = '#a855f7';
const BLUE = '#3b82f6';
const EMERALD = '#10b981';

/* ─── SVG helpers ─── */
const ARROW = (x1, y1, x2, y2, color = C, dashed = false) => (
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

export default function DeepSeekV3Paper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHY DEEPSEEK-V3?
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="Why DeepSeek-V3? The $6M Model That Shook the Industry"
        subtitle="671 billion parameters, frontier-level quality, trained for a fraction of the cost"
        color={C}
      />

      <Prose>
        <p>
          In December 2024, DeepSeek quietly released a paper that sent shockwaves through the AI industry.
          Their new model, <H tip="DeepSeek-V3 = a 671 billion parameter Mixture-of-Experts (MoE) language model that activates only 37B parameters per token. It matches or exceeds GPT-4o and Claude 3.5 Sonnet on most benchmarks while costing roughly $5.576 million to train — about 1/10th to 1/20th what competitors spent." color={C}>DeepSeek-V3</H>,
          matched or exceeded <H tip="GPT-4o = OpenAI's flagship multimodal model (May 2024). Widely considered a frontier model, trained at an estimated cost of $100M+. DeepSeek-V3 achieves comparable performance at roughly 1/20th the training cost." color={GRAY}>GPT-4o</H> and{' '}
          <H tip="Claude 3.5 Sonnet = Anthropic's flagship model (June 2024). Top performer on coding and reasoning benchmarks. DeepSeek-V3 matches it on most coding tasks and exceeds it on mathematical reasoning." color={GRAY}>Claude 3.5 Sonnet</H> on
          major benchmarks — but here is the jaw-dropping part: <strong>it cost only $5.576 million to train</strong>.
          For context, GPT-4 reportedly cost over $100 million, and Llama 3.1 405B cost around $60 million.
        </p>
        <p>
          How? Through a combination of four architectural innovations that work in concert:
          a <H tip="Mixture of Experts (MoE) = an architecture where most parameters sit in 'expert' sub-networks, but only a small subset activates per token. This decouples total knowledge capacity (671B params) from per-token compute cost (37B active). You get a huge model's knowledge at a fraction of the compute." color={C}>Mixture of Experts</H> architecture
          with 256 routed experts, <H tip="Multi-Head Latent Attention (MLA) = DeepSeek's attention mechanism that compresses the KV cache by 93% using low-rank projection. Instead of caching full key-value pairs for every head, MLA caches a single compressed latent vector and reconstructs K/V on-the-fly during inference." color={C}>Multi-Head Latent Attention</H> that
          slashes memory by 93%, <H tip="Multi-Token Prediction (MTP) = a training objective where the model predicts the next 2 tokens simultaneously instead of just 1. This creates richer gradient signals and enables speculative decoding at inference. Each additional prediction head shares the main model's representations." color={C}>Multi-Token Prediction</H> for
          richer training signals, and <H tip="FP8 training = training neural networks using 8-bit floating-point arithmetic instead of the standard 16-bit (FP16/BF16). This halves memory for activations and nearly doubles compute throughput on supported hardware. DeepSeek-V3 was one of the first models to train at this scale entirely in FP8." color={C}>FP8 mixed-precision training</H> from
          scratch.
        </p>
        <p>
          The result was not just a cheaper model — it was a paradigm shift. DeepSeek proved that
          frontier-level AI does not require frontier-level budgets, and that{' '}
          <H tip="Algorithmic efficiency = achieving the same (or better) model quality with less compute, through better architectures, training techniques, and engineering. DeepSeek-V3 demonstrates that clever engineering can substitute for brute-force scaling — a 10-20x cost reduction with no quality loss." color={EMERALD}>algorithmic efficiency</H>{' '}
          can substitute for raw compute spending.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '671B', unit: ' total', label: 'Total Parameters', color: C },
          { value: '37B', unit: ' active', label: 'Active Per Token', color: C2 },
          { value: '$5.6M', unit: '', label: 'Training Cost', color: GREEN },
          { value: '14.8T', unit: ' tokens', label: 'Training Data', color: AMBER },
        ]}
      />

      <SimpleExplain>
        <p><strong>What this means in plain terms:</strong> Imagine two car companies. Company A spends $100 million building a sports car that goes 200 mph. Company B spends $5.5 million and builds a car that also goes 200 mph — by using a smarter engine design, lighter materials, and better aerodynamics. DeepSeek-V3 is Company B. They did not just build a cheaper model — they proved that the industry was massively overspending by relying on brute-force scaling when smarter architecture could achieve the same results.</p>
      </SimpleExplain>

      {/* ── Cost Comparison SVG ── */}
      <Diagram caption={<><strong>Training Cost Comparison</strong> — DeepSeek-V3 achieves frontier performance at a fraction of the cost</>}>
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="v3-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1a20" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>

          <rect width="860" height="380" rx="12" fill="url(#v3-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={C} fontSize="14" fontWeight="700" letterSpacing="1.5">ESTIMATED TRAINING COST — FRONTIER MODELS</text>

          {/* Bar chart */}
          {[
            { name: 'GPT-4', cost: 100, w: 620, color: RED },
            { name: 'Llama 3.1 405B', cost: 60, w: 372, color: BLUE },
            { name: 'Claude 3.5', cost: 50, w: 310, color: PURPLE },
            { name: 'Gemini Ultra', cost: 80, w: 496, color: AMBER },
            { name: 'DeepSeek-V3', cost: 5.6, w: 35, color: C },
          ].map(({ name, cost, w, color }, i) => {
            const y = 60 + i * 60;
            return (
              <g key={name}>
                <text x="155" y={y + 22} textAnchor="end" fill={FG} fontSize="13" fontWeight="600">{name}</text>
                <rect x="165" y={y + 4} width={w} height="28" rx="6" fill={color} fillOpacity="0.7" />
                <text x={175 + w} y={y + 23} fill={FG} fontSize="12" fontWeight="700">
                  {cost >= 10 ? `~$${cost}M` : `$${cost}M`}
                </text>
                {name === 'DeepSeek-V3' && (
                  <>
                    <rect x={175 + w + 60} y={y + 2} width="135" height="30" rx="6" fill={C} fillOpacity="0.15" stroke={C} strokeWidth="1.5" />
                    <text x={175 + w + 127} y={y + 22} textAnchor="middle" fill={C2} fontSize="11" fontWeight="700">~18x CHEAPER</text>
                  </>
                )}
              </g>
            );
          })}

          {/* Annotation */}
          <rect x="165" y="365" width="530" height="1" fill={GRAY} opacity="0.3" />

          {/* How they did it — key innovations */}
          <text x="430" y="350" textAnchor="middle" fill={C2} fontSize="12" fontWeight="700">HOW?</text>
          {[
            { label: 'MoE Sparsity', x: 200 },
            { label: 'MLA Cache Reduction', x: 370 },
            { label: 'FP8 Training', x: 555 },
            { label: 'DualPipe Overlap', x: 720 },
          ].map(({ label, x }) => (
            <g key={label}>
              <rect x={x - 65} y="356" width="130" height="20" rx="4" fill={C} fillOpacity="0.1" stroke={C} strokeWidth="0.8" />
              <text x={x} y="370" textAnchor="middle" fill={C} fontSize="9" fontWeight="600">{label}</text>
            </g>
          ))}
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Benchmark', 'DeepSeek-V3', 'GPT-4o', 'Claude 3.5 Sonnet', 'Llama 3.1 405B']}
        rows={[
          ['MMLU', '88.5%', '87.2%', '88.3%', '88.6%'],
          ['MATH-500', '90.2%', '74.6%', '78.3%', '73.8%'],
          ['HumanEval', '82.6%', '90.2%', '92.0%', '61.0%'],
          ['Codeforces', '51.6%', '23.6%', '20.3%', '25.3%'],
          ['GPQA Diamond', '59.1%', '53.6%', '65.0%', '49.0%'],
          ['Training Cost', '~$5.6M', '~$100M+', '~$50M+', '~$60M'],
        ]}
        caption="DeepSeek-V3 matches or exceeds frontier models on most benchmarks at a fraction of the training cost"
      />

      <Callout type="key">
        DeepSeek-V3 is not just a cheaper model — it demonstrates that the relationship between training
        budget and model quality is not linear. Architectural innovations (MoE, MLA, MTP, FP8) can
        substitute for 10-20x more compute spending. This changes the economics of the entire AI industry.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — MoE ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="MoE Architecture — 256 Experts, 37B Active"
        subtitle="A massive Mixture of Experts with auxiliary-loss-free load balancing"
        color={C}
      />

      <Prose>
        <p>
          The backbone of DeepSeek-V3 is a <H tip="Mixture of Experts (MoE) = replaces the single feed-forward network (FFN) in each Transformer layer with multiple parallel 'expert' FFNs plus a gating router. Only a few experts activate per token, so total parameter count (capacity) and per-token compute (cost) are decoupled." color={C}>Mixture of Experts</H> Transformer
          with <strong>61 layers</strong>, each containing an attention block followed by an MoE feed-forward block.
          The MoE block contains <H tip="256 routed experts = specialized feed-forward sub-networks. For each token, the router selects only 8 out of 256 to activate. Each expert has its own weights (~800M parameters) and learns to specialize in different types of patterns — code syntax, mathematical reasoning, factual recall, etc." color={C}>256 routed experts</H> plus{' '}
          <H tip="Shared expert = a single expert FFN that processes EVERY token unconditionally, regardless of routing. It captures universal patterns (like basic grammar and syntax) that all tokens need. This ensures a quality floor — even if the router makes a poor selection, the shared expert provides baseline competence." color={GREEN}>1 shared expert</H>.
          For each token, the <H tip="Router/gating network = a small learned linear layer that maps each token's hidden state to a score over all 256 experts. The top-8 scoring experts are selected. The router is trained end-to-end with the rest of the model, learning which experts specialize in which types of inputs." color={AMBER}>router</H> selects the{' '}
          <H tip="Top-8 routing = each token is sent to the 8 highest-scoring experts out of 256. Combined with the shared expert, that's 9 expert FFN computations per token. This provides a good balance between specialization (each expert sees fewer tokens) and coverage (8 experts give diverse perspectives)." color={C}>top-8</H> highest-scoring
          experts to process that token.
        </p>
        <p>
          This means that out of 671 billion total parameters, only about{' '}
          <H tip="37B active parameters = the parameters that actually compute for any given token. This includes: attention parameters (~8B across all heads) + 8 routed expert FFNs (~800M each = ~6.4B) + 1 shared expert (~800M) + embedding/output layers (~21B). The rest of the 671B sits idle for that particular token." color={C2}>37 billion activate per token</H> — about
          5.5% of the total. The remaining 94.5% of parameters are sleeping experts that handle other types of
          inputs. This extreme sparsity is what makes DeepSeek-V3 so efficient: you get the knowledge capacity of a
          671B model at the compute cost of a 37B model.
        </p>
      </Prose>

      {/* ── MoE Routing Diagram ── */}
      <Diagram caption={<><strong>DeepSeek-V3 MoE Routing</strong> — Token hidden state is scored against 256 experts, top-8 are selected, outputs combined with the shared expert</>}>
        <svg viewBox="0 0 860 520" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="v3-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={C} />
            </marker>
            <marker id="v3-ar-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <marker id="v3-ar-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={AMBER} />
            </marker>
            <linearGradient id="v3-expert-pool" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={C} stopOpacity="0.2" />
              <stop offset="100%" stopColor={C} stopOpacity="0.03" />
            </linearGradient>
          </defs>

          <rect width="860" height="520" rx="12" fill={BG} />
          <text x="430" y="28" textAnchor="middle" fill={C} fontSize="14" fontWeight="700" letterSpacing="1.5">DEEPSEEK-V3 MOE LAYER — 256 ROUTED + 1 SHARED EXPERT</text>

          {/* Input token */}
          <rect x="355" y="45" width="150" height="36" rx="8" fill={C} fillOpacity="0.15" stroke={C} strokeWidth="1.5" />
          <text x="430" y="68" textAnchor="middle" fill={FG} fontSize="13" fontWeight="600">Token hidden state h</text>

          {/* Arrow to router */}
          <line x1="430" y1="81" x2="430" y2="105" stroke={AMBER} strokeWidth="2" markerEnd="url(#v3-ar-a)" />

          {/* Router */}
          <rect x="300" y="108" width="260" height="42" rx="10" fill={AMBER} fillOpacity="0.15" stroke={AMBER} strokeWidth="1.5" />
          <text x="430" y="127" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="700">Router: softmax(W_g · h) → top-8</text>
          <text x="430" y="143" textAnchor="middle" fill={GRAY} fontSize="10">Score all 256 experts, select 8 highest</text>

          {/* Arrow from router to shared */}
          <line x1="300" y1="129" x2="100" y2="200" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#v3-ar-g)" />
          <text x="180" y="168" fill={GREEN} fontSize="10" fontWeight="600">always active</text>

          {/* Shared expert */}
          <rect x="30" y="200" width="150" height="60" rx="10" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="2" />
          <text x="105" y="225" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="700">Shared Expert</text>
          <text x="105" y="245" textAnchor="middle" fill={GRAY} fontSize="10">All tokens, always</text>

          {/* Arrow from router to expert pool */}
          <line x1="430" y1="150" x2="430" y2="188" stroke={C} strokeWidth="2" markerEnd="url(#v3-ar)" />
          <text x="460" y="175" fill={C2} fontSize="10" fontWeight="600">top-8</text>

          {/* Expert pool background */}
          <rect x="210" y="190" width="620" height="180" rx="12" fill="url(#v3-expert-pool)" stroke={C} strokeWidth="1" strokeDasharray="4 3" />
          <text x="520" y="210" textAnchor="middle" fill={C2} fontSize="12" fontWeight="700">256 Routed Expert Pool</text>

          {/* Expert grid — 16 visible experts */}
          {Array.from({ length: 16 }, (_, i) => {
            const col = i % 8;
            const row = Math.floor(i / 8);
            const x = 228 + col * 72;
            const y = 222 + row * 55;
            const selected = [0, 2, 4, 7, 9, 11, 13, 15].includes(i);
            return (
              <g key={`exp-${i}`}>
                <rect
                  x={x} y={y} width="56" height="40" rx="6"
                  fill={selected ? C : C}
                  fillOpacity={selected ? 0.3 : 0.06}
                  stroke={selected ? C2 : C}
                  strokeWidth={selected ? 2 : 0.6}
                />
                <text
                  x={x + 28} y={y + 22}
                  textAnchor="middle"
                  fill={selected ? '#fff' : GRAY}
                  fontSize="10"
                  fontWeight={selected ? '700' : '400'}
                >
                  E{i + 1}
                </text>
                {selected && (
                  <text x={x + 28} y={y + 35} textAnchor="middle" fill={C2} fontSize="7" fontWeight="700">ACTIVE</text>
                )}
              </g>
            );
          })}
          {/* Ellipsis for remaining 240 experts */}
          <text x="520" y="350" textAnchor="middle" fill={GRAY} fontSize="13">... + 240 more experts (256 total, 8 selected per token)</text>

          {/* Combine box */}
          <rect x="220" y="390" width="420" height="44" rx="10" fill={C} fillOpacity="0.12" stroke={C} strokeWidth="1.5" />
          <text x="430" y="416" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">output = shared(h) + sum( g_i * expert_i(h) ) for top-8 experts</text>

          {/* Arrows down to combine */}
          <line x1="105" y1="260" x2="300" y2="390" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#v3-ar-g)" />
          <line x1="430" y1="370" x2="430" y2="390" stroke={C} strokeWidth="1.5" markerEnd="url(#v3-ar)" />

          {/* Output */}
          <rect x="330" y="455" width="200" height="36" rx="8" fill={C} fillOpacity="0.2" stroke={C} strokeWidth="2" />
          <text x="430" y="478" textAnchor="middle" fill={C2} fontSize="13" fontWeight="700">h + MoE(h) → next layer</text>
          <line x1="430" y1="434" x2="430" y2="455" stroke={C} strokeWidth="1.5" markerEnd="url(#v3-ar)" />

          {/* Legend */}
          <rect x="690" y="420" width="10" height="10" rx="2" fill={GREEN} fillOpacity="0.5" />
          <text x="706" y="429" fill={GRAY} fontSize="10">Shared (all tokens)</text>
          <rect x="690" y="438" width="10" height="10" rx="2" fill={C} fillOpacity="0.5" />
          <text x="706" y="447" fill={GRAY} fontSize="10">Top-8 routed (selected)</text>
          <rect x="690" y="456" width="10" height="10" rx="2" fill={AMBER} fillOpacity="0.5" />
          <text x="706" y="465" fill={GRAY} fontSize="10">Router network</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="MoE Layer Forward Pass — DeepSeek-V3"
        color={C}
        steps={[
          {
            note: 'The router computes a score for each of the 256 experts using a linear projection followed by softmax. Each token gets a probability distribution over experts.',
            math: 'g_i = \\text{Softmax}_i(W_g \\cdot h) \\quad \\text{for each expert } i \\in \\{1, \\ldots, 256\\}',
          },
          {
            note: 'Select the 8 experts with the highest router scores. Only these 8 (plus the shared expert) will compute for this token.',
            math: '\\text{TopK} = \\text{argtop}_8(g_1, g_2, \\ldots, g_{256})',
          },
          {
            note: 'Each selected expert processes the token independently. The outputs are weighted by their router scores and summed together with the shared expert output. The shared expert ensures a quality baseline.',
            math: '\\text{MoE}(h) = \\text{FFN}_{\\text{shared}}(h) + \\sum_{i \\in \\text{TopK}} g_i \\cdot \\text{FFN}_i(h)',
          },
          {
            note: 'The final output adds a residual connection, so information can flow directly if the MoE layer has nothing useful to add.',
            math: 'h^{\\prime} = h + \\text{MoE}(h)',
          },
        ]}
        symbols={[
          { symbol: 'h', meaning: 'Token hidden state (dimension d = 7168)' },
          { symbol: 'W_g', meaning: 'Router weight matrix mapping h to 256 expert scores' },
          { symbol: 'g_i', meaning: 'Gating weight for expert i after softmax' },
          { symbol: '\\text{FFN}_{\\text{shared}}', meaning: 'Shared expert FFN (always active)' },
          { symbol: '\\text{FFN}_i', meaning: 'i-th routed expert FFN (conditionally active)' },
        ]}
      />

      <ConceptCard title="Auxiliary-Loss-Free Load Balancing" color={AMBER} defaultOpen={true}>
        <Prose>
          <p>
            The biggest practical challenge with MoE is <H tip="Load imbalance = when some experts receive far more tokens than others. In the extreme case ('expert collapse'), nearly all tokens route to 1-2 experts while the other 254 sit idle. This wastes capacity and creates compute bottlenecks, since the overloaded experts become the throughput bottleneck." color={RED}>load imbalance</H> — if
            most tokens route to a few popular experts, you waste the capacity of the unused ones.
            Previous MoE models added an <H tip="Auxiliary load balancing loss = an extra term added to the training loss that penalizes uneven expert utilization. Models like Switch Transformer and Mixtral use this. The problem: it fights against the main training objective. Making experts equally utilized is not the same as making them useful. The auxiliary loss can degrade model quality by 1-2% on benchmarks." color={RED}>auxiliary loss</H> to
            the training objective that penalizes uneven utilization. But this has a nasty side effect: the
            auxiliary loss <em>competes</em> with the main training loss, degrading model quality.
          </p>
          <p>
            DeepSeek-V3 introduces an elegant solution: <H tip="Bias-based load balancing = instead of adding a loss term, add a learnable bias to each expert's router score. Overloaded experts get their bias decreased (making them less likely to be selected); underutilized experts get their bias increased. The bias is updated during training but does NOT affect gradients — it changes routing decisions without degrading the training objective." color={C}>auxiliary-loss-free load balancing</H> using
            <H tip="Bias terms (b_i) = a small scalar added to each expert's router score before top-K selection. These are NOT trained by gradient descent — they are updated by a separate monitoring process that tracks expert utilization. If expert i is overloaded, b_i is decreased. If underutilized, b_i is increased. This is purely a routing adjustment, invisible to the training loss." color={C2}>bias terms</H>.
            Each expert gets a small bias added to its router score. Overloaded experts have their bias
            decreased; underutilized experts have their bias increased. Crucially, these biases are
            <strong> not part of the gradient computation</strong> — they steer routing without affecting the
            training objective.
          </p>
        </Prose>

        <FormulaBlock
          math="g_i^{\prime} = g_i + b_i \quad \text{(for routing only; gradients ignore } b_i\text{)}"
          label="Bias-adjusted routing score"
          color={C}
          symbols={[
            { symbol: 'g_i', meaning: 'Original router score for expert i' },
            { symbol: 'b_i', meaning: 'Learned bias term — adjusted based on utilization, not gradient descent' },
            { symbol: "g_i^{\\prime}", meaning: 'Adjusted score used for top-K selection (bias excluded from loss gradients)' },
          ]}
        />

        <VisualCompare
          leftLabel="Traditional (Auxiliary Loss)"
          rightLabel="DeepSeek-V3 (Bias Terms)"
          leftColor={RED}
          rightColor={C}
          left={<>
            <p><strong>Add penalty term</strong> to training loss</p>
            <p>Encourages equal utilization across experts</p>
            <p>But penalty <em>fights</em> the main objective</p>
            <p>Expert quality degrades by 1-2%</p>
            <p style={{color: RED}}>Tradeoff: balance vs quality</p>
          </>}
          right={<>
            <p><strong>Add bias to router scores</strong> (not to loss)</p>
            <p>Overloaded experts get lower bias, underused get higher</p>
            <p>Bias is invisible to gradient computation</p>
            <p>Main training loss is completely unaffected</p>
            <p style={{color: C}}>No tradeoff: balance AND quality</p>
          </>}
        />
      </ConceptCard>

      <Callout type="insight">
        The auxiliary-loss-free approach is a theme throughout DeepSeek-V3: find ways to get the engineering
        benefit (load balancing, precision savings, training acceleration) without paying a tax on model
        quality. Every innovation preserves the purity of the training objective.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — MULTI-HEAD LATENT ATTENTION (MLA)
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="Multi-Head Latent Attention — 93% KV Cache Compression"
        subtitle="Low-rank projection compresses KV pairs into a tiny latent vector"
        color={C}
      />

      <Prose>
        <p>
          Standard <H tip="Multi-Head Attention (MHA) = the standard attention mechanism used in most Transformers. Each of h attention heads independently computes Q, K, V projections, runs attention, and produces an output. The problem: during inference, all K and V vectors for all past tokens must be cached in memory. For a 7168-dim model with 128 heads, this means caching 7168 floats per layer per token — twice (for K and V)." color={GRAY}>Multi-Head Attention</H> has
          a brutal memory problem during inference: every past token requires caching its{' '}
          <H tip="KV cache = the stored key and value tensors from all previously generated tokens. During autoregressive generation, each new token must attend to all past tokens. Rather than recomputing K and V for every past token at every step, they are cached in GPU memory. For a 128-head model with dimension 7168, this is 2 x 7168 = 14,336 floats per layer per token." color={RED}>key and value vectors</H> for
          every layer. For a model with hidden dimension 7168 and 128 attention heads, that is{' '}
          <strong>14,336 floats per layer per token</strong>. At 61 layers, a single 4K-token
          sequence eats over 3.4 GB of KV cache memory. Scale to thousands of concurrent users and you
          need entire GPU clusters just for cache memory.
        </p>
        <p>
          DeepSeek-V3 solves this with <H tip="Multi-Head Latent Attention (MLA) = an attention mechanism that compresses the KV cache from 14,336 floats to just 512 floats per layer per token — a 93.4% reduction. Instead of caching separate K and V for each head, MLA caches a single low-rank 'latent' vector and reconstructs K/V on-the-fly during inference using lightweight up-projection matrices." color={C}>Multi-Head Latent Attention</H> (MLA),
          first introduced in <H tip="DeepSeek-V2 (May 2024) = DeepSeek's previous generation model that first introduced MLA. It demonstrated that low-rank KV compression could match full MHA quality while reducing KV cache by over 90%. V3 inherits and refines this mechanism." color={GRAY}>DeepSeek-V2</H>. The core idea: instead
          of caching the full K and V vectors, <H tip="Down-projection = compressing a high-dimensional vector into a lower-dimensional 'latent' representation using a learned matrix multiplication. Think of it as creating a summary. The 7168-dim hidden state is compressed to a 512-dim latent. This 14x compression is possible because K and V contain massive redundancy across heads." color={C}>compress them</H> into
          a low-dimensional <H tip="Latent vector (c_t) = a compact 512-dimensional representation that encodes ALL the information needed to reconstruct the full K and V vectors for ALL attention heads at position t. This is what gets cached during inference — just 512 floats instead of 14,336." color={C2}>latent vector</H> of
          just 512 dimensions. During inference, only this tiny latent is cached; when attention is computed,
          the full K and V are <H tip="Up-projection = reconstructing the full high-dimensional K and V vectors from the compressed latent representation using learned matrices. This happens on-the-fly during the attention computation. The compute cost of up-projection is small compared to the memory savings from not caching full KV." color={C}>reconstructed on-the-fly</H> using
          lightweight up-projection matrices.
        </p>
      </Prose>

      {/* ── MLA Compression Pipeline SVG ── */}
      <Diagram caption={<><strong>MLA Compression Pipeline</strong> — Down-project to latent, cache the latent, up-project back to full K/V during attention</>}>
        <svg viewBox="0 0 860 460" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="mla-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={C} />
            </marker>
            <marker id="mla-ar-r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={RED} />
            </marker>
            <marker id="mla-ar-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
          </defs>

          <rect width="860" height="460" rx="12" fill={BG} />
          <text x="430" y="28" textAnchor="middle" fill={C} fontSize="14" fontWeight="700" letterSpacing="1.5">MULTI-HEAD LATENT ATTENTION (MLA) — KV COMPRESSION</text>

          {/* Standard MHA path (top, crossed out) */}
          <rect x="40" y="55" width="370" height="100" rx="10" fill={RED} fillOpacity="0.06" stroke={RED} strokeWidth="1" strokeDasharray="4 3" />
          <text x="225" y="75" textAnchor="middle" fill={RED} fontSize="12" fontWeight="700">Standard MHA (what V3 replaces)</text>

          <rect x="60" y="88" width="130" height="35" rx="6" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1" />
          <text x="125" y="110" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600">K: 7168-dim</text>

          <rect x="210" y="88" width="130" height="35" rx="6" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1" />
          <text x="275" y="110" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600">V: 7168-dim</text>

          <text x="225" y="145" textAnchor="middle" fill={RED} fontSize="10">Cache: 14,336 floats/layer/token</text>
          {/* Strike-through */}
          <line x1="50" y1="105" x2="400" y2="105" stroke={RED} strokeWidth="2" opacity="0.5" />

          {/* MLA path */}
          <rect x="450" y="55" width="380" height="100" rx="10" fill={C} fillOpacity="0.1" stroke={C} strokeWidth="1.5" />
          <text x="640" y="75" textAnchor="middle" fill={C} fontSize="12" fontWeight="700">MLA (DeepSeek-V3)</text>

          <rect x="530" y="88" width="200" height="35" rx="6" fill={C} fillOpacity="0.2" stroke={C} strokeWidth="1.5" />
          <text x="630" y="110" textAnchor="middle" fill={C2} fontSize="12" fontWeight="700">Latent c: 512-dim</text>

          <text x="640" y="145" textAnchor="middle" fill={C2} fontSize="10">Cache: 512 floats/layer/token (93.4% smaller)</text>

          {/* Detailed MLA pipeline */}
          <text x="430" y="190" textAnchor="middle" fill={C} fontSize="13" fontWeight="700">MLA PIPELINE — STEP BY STEP</text>

          {/* Step 1: Hidden state */}
          <rect x="340" y="210" width="180" height="36" rx="8" fill={GRAY} fillOpacity="0.15" stroke={GRAY} strokeWidth="1" />
          <text x="430" y="233" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">h (7168-dim)</text>

          {/* Step 2: Down-project */}
          <line x1="430" y1="246" x2="430" y2="270" stroke={C} strokeWidth="2" markerEnd="url(#mla-ar)" />
          <text x="500" y="262" fill={C} fontSize="10" fontWeight="600">Down-project (W_DKV)</text>

          <rect x="345" y="275" width="170" height="40" rx="8" fill={C} fillOpacity="0.2" stroke={C} strokeWidth="2" />
          <text x="430" y="291" textAnchor="middle" fill={C2} fontSize="13" fontWeight="700">Latent c (512-dim)</text>
          <text x="430" y="307" textAnchor="middle" fill={GRAY} fontSize="9">This is what gets CACHED</text>

          {/* Branch to K and V */}
          <line x1="380" y1="315" x2="200" y2="365" stroke={C} strokeWidth="1.5" markerEnd="url(#mla-ar)" />
          <line x1="480" y1="315" x2="660" y2="365" stroke={C} strokeWidth="1.5" markerEnd="url(#mla-ar)" />

          <text x="270" y="345" fill={C} fontSize="10" fontWeight="600">Up-project (W_UK)</text>
          <text x="590" y="345" fill={C} fontSize="10" fontWeight="600">Up-project (W_UV)</text>

          {/* Reconstructed K */}
          <rect x="100" y="370" width="200" height="40" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="200" y="395" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="600">K (7168-dim, reconstructed)</text>

          {/* Reconstructed V */}
          <rect x="560" y="370" width="200" height="40" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="660" y="395" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="600">V (7168-dim, reconstructed)</text>

          {/* Q path (separate) */}
          <rect x="340" y="370" width="120" height="40" rx="8" fill={PURPLE} fillOpacity="0.15" stroke={PURPLE} strokeWidth="1.5" />
          <text x="400" y="395" textAnchor="middle" fill={PURPLE} fontSize="12" fontWeight="600">Q (query)</text>

          {/* Attention output */}
          <line x1="200" y1="410" x2="400" y2="435" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#mla-ar-g)" />
          <line x1="400" y1="410" x2="400" y2="435" stroke={PURPLE} strokeWidth="1.5" />
          <line x1="660" y1="410" x2="460" y2="435" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#mla-ar-g)" />

          <rect x="330" y="435" width="200" height="24" rx="6" fill={C} fillOpacity="0.15" stroke={C} strokeWidth="1" />
          <text x="430" y="452" textAnchor="middle" fill={C2} fontSize="11" fontWeight="600">Attention(Q, K, V) → output</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="MLA — Compressing KV Cache"
        color={C}
        steps={[
          {
            note: 'First, compress the hidden state into a low-rank latent vector. This is the ONLY thing cached during inference. The compression matrix W_DKV maps from 7168 dimensions to just 512.',
            math: 'c_t = W_{\\text{DKV}} \\cdot h_t \\quad \\text{where } c_t \\in \\mathbb{R}^{512}, \\; h_t \\in \\mathbb{R}^{7168}',
          },
          {
            note: 'When computing attention, reconstruct the full K and V from the cached latent. These up-projection matrices are small and the computation is cheap compared to the memory savings.',
            math: 'K_t = W_{\\text{UK}} \\cdot c_t, \\quad V_t = W_{\\text{UV}} \\cdot c_t',
          },
          {
            note: 'Queries are computed separately (they do not need to be cached, since only the current token needs Q). MLA also adds a RoPE component for position encoding.',
            math: 'Q_t = W_Q \\cdot h_t, \\quad Q_t^{\\text{rope}} = \\text{RoPE}(W_{Q_R} \\cdot h_t)',
          },
          {
            note: 'Attention proceeds normally with the reconstructed K, V and the computed Q. The output is mathematically equivalent to standard MHA — only the caching strategy differs.',
            math: '\\text{Attn}(Q, K, V) = \\text{softmax}\\!\\left(\\frac{Q K^\\top}{\\sqrt{d_h}}\\right) V',
          },
        ]}
        symbols={[
          { symbol: 'c_t', meaning: 'Compressed latent vector (512-dim) — the only thing cached per token' },
          { symbol: 'W_{\\text{DKV}}', meaning: 'Down-projection matrix: 7168 → 512 (compression)' },
          { symbol: 'W_{\\text{UK}}, W_{\\text{UV}}', meaning: 'Up-projection matrices: 512 → 7168 (reconstruction)' },
          { symbol: 'd_h', meaning: 'Per-head dimension = 7168 / 128 = 56' },
        ]}
      />

      <SimpleExplain>
        <p><strong>MLA in everyday terms:</strong> Imagine you are a librarian who needs to keep notes about every book checked out. Standard MHA writes a full 2-page summary for each book (expensive, takes lots of shelf space). MLA instead writes a tiny 3-line summary (the latent), and when someone asks about a book, you expand those 3 lines back into the full 2-page summary using a formula. The expansion takes a moment, but you save 93% of shelf space. For a library with millions of books (tokens), this is the difference between needing a warehouse and needing a single bookshelf.</p>
      </SimpleExplain>

      <StatBar
        stats={[
          { value: '14,336', unit: '', label: 'Standard KV Cache (per layer/token)', color: RED },
          { value: '512', unit: '', label: 'MLA Latent Size', color: C },
          { value: '93.4%', unit: '', label: 'Cache Reduction', color: GREEN },
          { value: '0%', unit: '', label: 'Quality Loss', color: EMERALD },
        ]}
      />

      <Callout type="math">
        The key insight: across all 128 attention heads, the K and V vectors are highly redundant. There
        is a low-rank structure where 512 dimensions capture 99%+ of the information in the full 7168-dim
        K/V space. MLA exploits this redundancy — it is lossless compression of attention's memory.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — MULTI-TOKEN PREDICTION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="Multi-Token Prediction — Training with a Wider Lens"
        subtitle="Predicting 2 tokens ahead for richer gradients and speculative decoding"
        color={C}
      />

      <Prose>
        <p>
          Standard language model training predicts <em>one</em> token at a time: given tokens 1 through t,
          predict token t+1. This is the <H tip="Next-token prediction = the standard language modeling objective. Given a sequence of tokens x_1, ..., x_t, predict x_{t+1}. The loss is the cross-entropy between the predicted probability distribution and the actual next token. This has been the dominant training objective since GPT-1." color={GRAY}>next-token prediction</H> objective
          that has driven every major language model from GPT-1 to GPT-4. But this gives the model a{' '}
          <H tip="Myopic training signal = the model only receives gradient feedback about the immediately next token. It never directly learns 'if I choose this word, what will the second-next or third-next word need to be?' This means the model's internal representations are optimized for 1-step lookahead, when in reality, good language generation requires multi-step planning." color={AMBER}>myopic training signal</H> — it
          learns to look one step ahead, never further.
        </p>
        <p>
          DeepSeek-V3 uses <H tip="Multi-Token Prediction (MTP) = training the model to predict the next D tokens simultaneously instead of just 1. DeepSeek-V3 uses D=2 (predict next 2 tokens). Each additional prediction uses a separate prediction head that operates on the main model's representations. The extra prediction heads are discarded at inference (unless used for speculative decoding)." color={C}>Multi-Token Prediction</H> (MTP)
          with depth D=2 — the model predicts both the next token AND the token after that, simultaneously.
          The second prediction head shares the main model's <H tip="Shared representations = the MTP heads do not have their own separate models. They share the main Transformer's hidden representations and add a lightweight projection head on top. This means the extra training signal (from predicting the 2nd token) flows back into the main model's representations, making them richer." color={C2}>representations</H> but
          adds its own lightweight projection. This creates a richer gradient signal: the model's hidden states must
          now encode information useful for predicting not just the immediate next token, but also what comes after.
        </p>
        <p>
          At inference time, MTP enables <H tip="Speculative decoding = a technique where the model generates multiple candidate tokens in a single forward pass, then verifies them in a subsequent step. If the speculative predictions are correct (which they often are), you get 1.5-2x inference speedup because you generate 2 tokens per step instead of 1." color={C}>speculative decoding</H>:
          the second prediction head proposes a candidate for the next-next token, and if the main model agrees
          in the verification step, you effectively generate 2 tokens per forward pass, boosting throughput by
          up to 1.8x.
        </p>
      </Prose>

      {/* ── MTP Architecture SVG ── */}
      <Diagram caption={<><strong>Multi-Token Prediction Architecture</strong> — The main model and MTP head share representations; the MTP head predicts the second-next token</>}>
        <svg viewBox="0 0 860 420" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="mtp-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={C} />
            </marker>
            <marker id="mtp-ar-p" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={PURPLE} />
            </marker>
            <linearGradient id="mtp-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1a20" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>

          <rect width="860" height="420" rx="12" fill="url(#mtp-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={C} fontSize="14" fontWeight="700" letterSpacing="1.5">MULTI-TOKEN PREDICTION (MTP) — D=2</text>

          {/* Input tokens */}
          {['The', 'cat', 'sat', 'on', 'the'].map((tok, i) => (
            <g key={tok + i}>
              <rect x={60 + i * 140} y={50} width="80" height="32" rx="6" fill={C} fillOpacity="0.12" stroke={C} strokeWidth="1" />
              <text x={100 + i * 140} y={70} textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">{tok}</text>
            </g>
          ))}
          <text x="430" y="102" textAnchor="middle" fill={GRAY} fontSize="11">Input sequence</text>

          {/* Main Transformer */}
          <rect x="80" y="115" width="700" height="75" rx="12" fill={C} fillOpacity="0.08" stroke={C} strokeWidth="1.5" />
          <text x="430" y="140" textAnchor="middle" fill={C} fontSize="14" fontWeight="700">Main Transformer (61 layers, MoE + MLA)</text>
          <text x="430" y="158" textAnchor="middle" fill={GRAY} fontSize="11">Produces hidden representations h_1, h_2, ..., h_t</text>
          {/* Arrow down from tokens */}
          <line x1="430" y1="102" x2="430" y2="115" stroke={C} strokeWidth="1.5" markerEnd="url(#mtp-ar)" />

          {/* Shared hidden states */}
          {[0, 1, 2, 3, 4].map(i => (
            <g key={`h-${i}`}>
              <rect x={85 + i * 140} y={200} width="70" height="28" rx="5" fill={C} fillOpacity="0.2" stroke={C} strokeWidth="1" />
              <text x={120 + i * 140} y={218} textAnchor="middle" fill={C2} fontSize="11" fontWeight="600">h_{i + 1}</text>
            </g>
          ))}
          <line x1="430" y1="190" x2="430" y2="200" stroke={C} strokeWidth="1.5" markerEnd="url(#mtp-ar)" />

          {/* Two prediction paths */}
          {/* Path 1: Main head (next token) */}
          <rect x="60" y="260" width="340" height="65" rx="10" fill={C} fillOpacity="0.1" stroke={C} strokeWidth="1.5" />
          <text x="230" y="282" textAnchor="middle" fill={C} fontSize="12" fontWeight="700">Main Prediction Head (token t+1)</text>
          <text x="230" y="300" textAnchor="middle" fill={FG} fontSize="11">Standard LM head: h_t → vocab logits</text>
          <text x="230" y="316" textAnchor="middle" fill={GRAY} fontSize="10">Loss: cross-entropy on next token</text>
          <line x1="230" y1="228" x2="230" y2="260" stroke={C} strokeWidth="1.5" markerEnd="url(#mtp-ar)" />

          {/* Path 2: MTP head (token t+2) */}
          <rect x="460" y="260" width="340" height="65" rx="10" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="1.5" />
          <text x="630" y="282" textAnchor="middle" fill={PURPLE} fontSize="12" fontWeight="700">MTP Head (token t+2)</text>
          <text x="630" y="300" textAnchor="middle" fill={FG} fontSize="11">Lightweight projection: h_t → second-next logits</text>
          <text x="630" y="316" textAnchor="middle" fill={GRAY} fontSize="10">Loss: cross-entropy on token after next</text>
          <line x1="630" y1="228" x2="630" y2="260" stroke={PURPLE} strokeWidth="1.5" markerEnd="url(#mtp-ar-p)" />

          {/* Predicted tokens */}
          <rect x="170" y="345" width="120" height="32" rx="6" fill={C} fillOpacity="0.25" stroke={C} strokeWidth="2" />
          <text x="230" y="365" textAnchor="middle" fill={C2} fontSize="13" fontWeight="700">mat</text>
          <text x="230" y="390" textAnchor="middle" fill={C} fontSize="10">prediction t+1</text>
          <line x1="230" y1="325" x2="230" y2="345" stroke={C} strokeWidth="1.5" markerEnd="url(#mtp-ar)" />

          <rect x="570" y="345" width="120" height="32" rx="6" fill={PURPLE} fillOpacity="0.25" stroke={PURPLE} strokeWidth="2" />
          <text x="630" y="365" textAnchor="middle" fill={PURPLE} fontSize="13" fontWeight="700">(period)</text>
          <text x="630" y="390" textAnchor="middle" fill={PURPLE} fontSize="10">prediction t+2</text>
          <line x1="630" y1="325" x2="630" y2="345" stroke={PURPLE} strokeWidth="1.5" markerEnd="url(#mtp-ar-p)" />

          {/* Shared representations annotation */}
          <rect x="280" y="395" width="300" height="22" rx="4" fill={AMBER} fillOpacity="0.1" stroke={AMBER} strokeWidth="0.8" />
          <text x="430" y="410" textAnchor="middle" fill={AMBER} fontSize="10" fontWeight="600">Both heads share main model representations → richer gradients flow back</text>
        </svg>
      </Diagram>

      <FormulaBlock
        math="L_{\text{total}} = L_{\text{next}} + \lambda \cdot L_{\text{MTP}}"
        label="Combined MTP Training Loss"
        color={C}
        symbols={[
          { symbol: 'L_{\\text{next}}', meaning: 'Standard next-token prediction loss (cross-entropy)' },
          { symbol: 'L_{\\text{MTP}}', meaning: 'Multi-token prediction loss (cross-entropy on second-next token)' },
          { symbol: '\\lambda', meaning: 'MTP loss weight (balances the two objectives)' },
        ]}
      />

      <ConceptCard title="Why Does Predicting 2 Tokens Help?" color={PURPLE} defaultOpen={true}>
        <Prose>
          <p>
            The benefit is subtle but powerful. When the model must predict <em>two</em> tokens ahead, its
            internal representations are forced to encode <H tip="Longer-range planning = by predicting t+2, the model's hidden states at position t must encode information about what comes TWO steps later. This creates richer, more 'forward-looking' representations that improve even the next-token prediction, because good 2-step lookahead subsumes good 1-step lookahead." color={PURPLE}>longer-range information</H>.
            Consider the sentence: "The capital of France is ___". To predict "Paris" (t+1), the model just needs
            to know the answer. But to also predict "." (t+2), the model must additionally represent that
            this is a statement (not a question), that it should end here, and what punctuation is appropriate.
            This extra signal makes the representations at every position <em>richer</em>.
          </p>
          <p>
            Additionally, MTP provides a <H tip="Speculative decoding benefit = at inference time, the MTP head proposes a candidate for the next-next token in the same forward pass. A lightweight verification step checks if this candidate is what the model would have generated anyway. If yes (which happens ~60-80% of the time), you get 2 tokens for the price of 1 forward pass, roughly doubling throughput." color={C}>practical inference speedup</H>:
            the second head's prediction can be verified cheaply, generating 2 tokens per step instead of 1.
            DeepSeek reports up to <strong>1.8x</strong> inference speedup from speculative decoding with MTP.
          </p>
        </Prose>
      </ConceptCard>

      <StepFlow
        color={C}
        steps={[
          {
            title: 'Step 1 — Standard Forward Pass',
            desc: 'Input tokens pass through all 61 Transformer layers (MoE + MLA), producing hidden representations h_1 through h_t. This is identical to a normal forward pass.',
          },
          {
            title: 'Step 2 — Main Head Predicts t+1',
            desc: 'The standard LM head projects h_t to vocabulary logits and predicts the next token. Cross-entropy loss is computed against the true next token.',
          },
          {
            title: 'Step 3 — MTP Head Predicts t+2',
            desc: 'A separate lightweight projection head takes the same h_t and predicts the SECOND-next token. Its cross-entropy loss is weighted by lambda and added to the main loss.',
          },
          {
            title: 'Step 4 — Combined Gradients Flow Back',
            desc: 'Both losses contribute gradients to the shared Transformer. The MTP gradient signal enriches representations, making them encode longer-range dependencies.',
          },
          {
            title: 'Step 5 — Inference Speedup (Optional)',
            desc: 'At inference, the MTP head proposes a second token candidate. If verified correct, 2 tokens are generated per step, yielding up to 1.8x throughput improvement.',
          },
        ]}
      />

      <Callout type="insight">
        MTP is lightweight — the extra prediction head adds less than 1% parameter overhead. But the
        training signal it provides is disproportionately valuable: representations trained with MTP
        outperform standard next-token training across all benchmarks, even when MTP is disabled at inference.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — FP8 TRAINING
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="FP8 Training — Half the Bits, Full the Quality"
        subtitle="Mixed-precision training at 8-bit scale for massive compute and memory savings"
        color={C}
      />

      <Prose>
        <p>
          Most large language models train in <H tip="BF16 (Brain Float 16) = a 16-bit floating-point format with 8 bits for the exponent and 7 for the mantissa. It has the same range as FP32 but less precision. BF16 has become the standard for LLM training because it rarely causes overflow/underflow issues. But it uses 2 bytes per number." color={GRAY}>BF16</H> (16-bit
          floating point), which uses 2 bytes per number. DeepSeek-V3 goes further, training with{' '}
          <H tip="FP8 (8-bit floating point) = a floating-point format using only 1 byte per number — half the memory of FP16/BF16. Two variants exist: E4M3 (4 exponent bits, 3 mantissa bits — more precision, less range) and E5M2 (5 exponent bits, 2 mantissa bits — more range, less precision). DeepSeek uses E4M3 for forward pass and E5M2 for gradients." color={C}>FP8</H>{' '}
          mixed precision from the very start of training. This is not post-training quantization — the model
          was <em>born</em> in FP8.
        </p>
        <p>
          The challenge is that 8-bit floats have very limited <H tip="Dynamic range = the ratio between the largest and smallest representable numbers. FP8 E4M3 can represent numbers from ~0.001 to 448, while BF16 can represent from ~1e-38 to ~3e38. This much smaller range means FP8 is more susceptible to overflow (numbers too large) and underflow (numbers too small)." color={RED}>dynamic range</H> and{' '}
          <H tip="Precision = how many distinct values can be represented in a given numerical range. FP8 E4M3 has only 3 mantissa bits, giving ~8 distinct values per power-of-2 interval. BF16 has 7 mantissa bits, giving ~128 distinct values. Less precision means more rounding error, which can accumulate over billions of operations and degrade training." color={RED}>precision</H>.
          Naive FP8 training would accumulate rounding errors and diverge. DeepSeek solved this with a{' '}
          <H tip="Fine-grained quantization = applying different scaling factors to different tiles (sub-blocks) of a matrix rather than one scaling factor per tensor. DeepSeek-V3 uses tile-wise scaling with 128-element tiles. Each tile gets its own scale, so the FP8 representation adapts to local value distributions. This dramatically reduces quantization error." color={C}>fine-grained quantization</H>{' '}
          strategy: instead of one scale per tensor, they compute separate <H tip="Per-tile scaling = dividing each matrix into small tiles (128 elements each) and computing an independent scaling factor for each tile. Tile i's values are divided by max(|tile_i|) before FP8 conversion. This means each tile uses the full FP8 range optimally, even if different tiles have very different value magnitudes." color={C2}>scaling factors</H> for
          small tiles of each matrix.
        </p>
      </Prose>

      {/* ── FP8 vs FP16 Precision Comparison SVG ── */}
      <Diagram caption={<><strong>FP8 vs BF16 Precision</strong> — FP8 uses half the bits but fine-grained scaling preserves training quality</>}>
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="fp8-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1a20" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>

          <rect width="860" height="380" rx="12" fill="url(#fp8-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={C} fontSize="14" fontWeight="700" letterSpacing="1.5">FP8 VS BF16 — PRECISION COMPARISON</text>

          {/* BF16 bit layout */}
          <text x="200" y="60" textAnchor="middle" fill={RED} fontSize="12" fontWeight="700">BF16 (16 bits)</text>
          <rect x="40" y="70" width="30" height="28" rx="4" fill={RED} fillOpacity="0.3" stroke={RED} strokeWidth="1" />
          <text x="55" y="88" textAnchor="middle" fill={FG} fontSize="9">S</text>
          {Array.from({ length: 8 }, (_, i) => (
            <g key={`bf16e-${i}`}>
              <rect x={75 + i * 25} y={70} width="22" height="28" rx="3" fill={AMBER} fillOpacity="0.25" stroke={AMBER} strokeWidth="0.8" />
              <text x={86 + i * 25} y={88} textAnchor="middle" fill={AMBER} fontSize="8">E</text>
            </g>
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <g key={`bf16m-${i}`}>
              <rect x={280 + i * 25} y={70} width="22" height="28" rx="3" fill={BLUE} fillOpacity="0.25" stroke={BLUE} strokeWidth="0.8" />
              <text x={291 + i * 25} y={88} textAnchor="middle" fill={BLUE} fontSize="8">M</text>
            </g>
          ))}
          <text x="475" y="88" fill={GRAY} fontSize="10">8 exp + 7 mantissa = 2 bytes</text>

          {/* FP8 E4M3 bit layout */}
          <text x="200" y="130" textAnchor="middle" fill={C} fontSize="12" fontWeight="700">FP8 E4M3 (8 bits — forward pass)</text>
          <rect x="40" y="140" width="30" height="28" rx="4" fill={RED} fillOpacity="0.3" stroke={RED} strokeWidth="1" />
          <text x="55" y="158" textAnchor="middle" fill={FG} fontSize="9">S</text>
          {Array.from({ length: 4 }, (_, i) => (
            <g key={`fp8e-${i}`}>
              <rect x={75 + i * 30} y={140} width="26" height="28" rx="3" fill={AMBER} fillOpacity="0.25" stroke={AMBER} strokeWidth="0.8" />
              <text x={88 + i * 30} y={158} textAnchor="middle" fill={AMBER} fontSize="8">E</text>
            </g>
          ))}
          {Array.from({ length: 3 }, (_, i) => (
            <g key={`fp8m-${i}`}>
              <rect x={200 + i * 30} y={140} width="26" height="28" rx="3" fill={C} fillOpacity="0.25" stroke={C} strokeWidth="0.8" />
              <text x={213 + i * 30} y={158} textAnchor="middle" fill={C} fontSize="8">M</text>
            </g>
          ))}
          <text x="475" y="158" fill={GRAY} fontSize="10">4 exp + 3 mantissa = 1 byte (50% less memory)</text>

          {/* Fine-grained quantization illustration */}
          <text x="430" y="210" textAnchor="middle" fill={C} fontSize="13" fontWeight="700">FINE-GRAINED QUANTIZATION — PER-TILE SCALING</text>

          {/* Matrix with tiles */}
          <rect x="110" y="225" width="280" height="120" rx="6" fill={GRAY} fillOpacity="0.05" stroke={GRAY} strokeWidth="1" />
          <text x="250" y="245" textAnchor="middle" fill={FG} fontSize="11" fontWeight="600">Weight Matrix W</text>

          {/* Tiles */}
          {[
            { x: 120, y: 255, label: 'Tile 1', scale: 's=2.1', color: C },
            { x: 220, y: 255, label: 'Tile 2', scale: 's=0.4', color: C2 },
            { x: 310, y: 255, label: 'Tile 3', scale: 's=8.7', color: BLUE },
            { x: 120, y: 305, label: 'Tile 4', scale: 's=1.3', color: GREEN },
            { x: 220, y: 305, label: 'Tile 5', scale: 's=5.0', color: AMBER },
            { x: 310, y: 305, label: 'Tile 6', scale: 's=0.9', color: PURPLE },
          ].map(({ x, y, label, scale, color }) => (
            <g key={label}>
              <rect x={x} y={y} width="70" height="38" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
              <text x={x + 35} y={y + 17} textAnchor="middle" fill={FG} fontSize="9" fontWeight="600">{label}</text>
              <text x={x + 35} y={y + 31} textAnchor="middle" fill={color} fontSize="8">{scale}</text>
            </g>
          ))}

          {/* Arrow to FP8 */}
          <line x1="400" y1="290" x2="460" y2="290" stroke={C} strokeWidth="2" markerEnd="url(#mtp-ar)" />
          <text x="430" y="283" textAnchor="middle" fill={C} fontSize="9">quantize</text>

          {/* Result: FP8 tiles with separate scales */}
          <rect x="470" y="225" width="350" height="120" rx="6" fill={C} fillOpacity="0.05" stroke={C} strokeWidth="1" />
          <text x="645" y="245" textAnchor="middle" fill={C2} fontSize="11" fontWeight="600">FP8 Matrix + Scale Factors</text>

          <rect x="480" y="255" width="160" height="38" rx="4" fill={C} fillOpacity="0.15" stroke={C} strokeWidth="1" />
          <text x="560" y="278" textAnchor="middle" fill={FG} fontSize="10">FP8 values (1 byte each)</text>

          <rect x="660" y="255" width="140" height="38" rx="4" fill={AMBER} fillOpacity="0.15" stroke={AMBER} strokeWidth="1" />
          <text x="730" y="278" textAnchor="middle" fill={AMBER} fontSize="10">Scale per tile (FP32)</text>

          <text x="645" y="315" textAnchor="middle" fill={C} fontSize="10">Each tile of 128 elements gets its own scale</text>
          <text x="645" y="332" textAnchor="middle" fill={GRAY} fontSize="10">Adapts to local value distributions → minimal quantization error</text>

          {/* Bottom summary */}
          <rect x="160" y="355" width="540" height="22" rx="4" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="0.8" />
          <text x="430" y="370" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600">Result: ~2x memory savings, ~1.5x compute speedup, no quality degradation</text>
        </svg>
      </Diagram>

      <VisualCompare
        leftLabel="Standard BF16 Training"
        rightLabel="DeepSeek-V3 FP8 Training"
        leftColor={RED}
        rightColor={C}
        left={<>
          <p><strong>16 bits per number</strong> (2 bytes)</p>
          <p>High precision: 7 mantissa bits</p>
          <p>One scale factor per entire tensor</p>
          <p>Standard on H100/A100 GPUs</p>
          <p style={{color: RED}}>2x memory cost vs FP8</p>
        </>}
        right={<>
          <p><strong>8 bits per number</strong> (1 byte)</p>
          <p>Lower precision: 3 mantissa bits (E4M3)</p>
          <p>Fine-grained: separate scale per 128-element tile</p>
          <p>Requires H100 FP8 Tensor Cores</p>
          <p style={{color: C}}>50% memory savings, 1.5x throughput</p>
        </>}
      />

      <ConceptCard title="Why Not Just Use FP8 for Everything?" color={RED} defaultOpen={false}>
        <Prose>
          <p>
            DeepSeek-V3 uses a <H tip="Mixed precision = using different numerical formats for different parts of the computation. FP8 for GEMM (matrix multiply) operations where the bulk of compute happens. FP32 for accumulation (summing products) where precision matters for avoiding rounding drift. BF16/FP32 for optimizer states and master weights." color={C}>mixed precision</H> strategy,
            not pure FP8. The <H tip="GEMM (General Matrix Multiply) = the core operation in neural networks — multiplying weight matrices by activation vectors/matrices. GEMMs consume 90%+ of training compute. Running these in FP8 gives the biggest bang for the buck: half the memory, nearly double the throughput on H100 FP8 Tensor Cores." color={C}>GEMM operations</H> (matrix
            multiplies) run in FP8, but <H tip="Accumulation = summing the products in a matrix multiply. When you multiply two FP8 numbers, you get an approximate result. Summing thousands of these approximate results in FP8 would accumulate catastrophic rounding error. Instead, the products are summed in FP32, preserving precision where it matters most." color={AMBER}>accumulation</H> happens
            in FP32. <H tip="Optimizer states = the running averages maintained by Adam/AdamW: first moment (mean of gradients) and second moment (mean of squared gradients). These must be stored in FP32 because they accumulate information across thousands of training steps. FP8 optimizer states would lose too much information." color={GRAY}>Optimizer states</H> and{' '}
            <H tip="Master weights = a full-precision (FP32) copy of all model parameters. During each training step, the master weights are quantized to FP8 for the forward/backward pass, then the FP32 gradient update is applied to the full-precision master weights. This prevents slow drift from FP8 rounding." color={GRAY}>master weights</H> stay
            in FP32 to prevent slow drift. The key insight: put FP8 where the compute is (GEMMs), keep FP32
            where precision matters (accumulation, optimizer states).
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        FP8 training was critical to DeepSeek-V3's cost efficiency. Training a 671B model in BF16 would
        require roughly 2x the GPU memory for activations, meaning 2x the GPUs and 2x the cost. Combined
        with H100's native FP8 Tensor Cores, FP8 contributed significantly to the $5.6M training budget.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — RESULTS & BENCHMARKS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Results — Frontier Quality at 1/10th the Cost"
        subtitle="DeepSeek-V3 matches GPT-4o across math, code, and general reasoning"
        color={C}
      />

      <Prose>
        <p>
          The results tell a remarkable story. DeepSeek-V3 achieves <H tip="Frontier-level = performing at or near the level of the best models in the world (GPT-4o, Claude 3.5, Gemini 1.5 Pro). For a model trained at 1/10th to 1/20th the cost, matching frontier quality represents a dramatic improvement in efficiency." color={C}>frontier-level performance</H> across
          virtually every major benchmark category. On <H tip="MATH-500 = a curated benchmark of 500 challenging math problems from competitions and advanced courses. Tests multi-step mathematical reasoning. DeepSeek-V3 scores 90.2%, dramatically outperforming GPT-4o (74.6%) and Claude 3.5 (78.3%)." color={AMBER}>mathematical reasoning</H>,
          it dramatically outperforms both GPT-4o and Claude 3.5 Sonnet. On <H tip="Codeforces = a competitive programming platform used as an AI benchmark. Problems require algorithmic thinking, not just code generation. DeepSeek-V3's Codeforces rating of 51.6% is more than double GPT-4o's 23.6%, indicating much stronger algorithmic reasoning." color={C}>competitive programming</H>,
          its Codeforces score of 51.6% is more than double GPT-4o's 23.6%.
        </p>
        <p>
          On <H tip="MMLU (Massive Multitask Language Understanding) = a benchmark testing knowledge across 57 subjects from STEM to humanities. DeepSeek-V3's 88.5% is neck-and-neck with all frontier models, showing its massive parameter count captures broad knowledge despite the efficient training." color={GRAY}>general knowledge (MMLU)</H>,
          all frontier models cluster in the 87-89% range — DeepSeek-V3 is right there at 88.5%.
          The most striking result is on <H tip="GPQA Diamond = a benchmark of graduate-level science questions designed to be difficult even for domain experts. Tests deep scientific reasoning rather than memorization. This is where Claude 3.5 leads at 65%, but DeepSeek-V3's 59.1% still beats GPT-4o's 53.6%." color={PURPLE}>GPQA Diamond</H> — graduate-level
          science questions where DeepSeek-V3 scores 59.1%, beating GPT-4o (53.6%) though trailing Claude 3.5 (65.0%).
        </p>
        <p>
          The model was trained on <H tip="2048 H100 GPUs = NVIDIA's flagship data center GPU, optimized for AI training. Each H100 has 80GB of HBM3 memory and specialized Tensor Cores that support FP8 operations. 2048 of them working together for ~2 months consumed about 2.664 million H100 GPU-hours." color={C}>2048 NVIDIA H100 GPUs</H> over
          approximately 2 months, consuming about <H tip="2.664 million H100 GPU-hours = the total compute used for training. At typical cloud rental rates of $2-3 per H100 GPU-hour, this comes to roughly $5.3-8.0 million. DeepSeek's quoted $5.576M likely reflects their actual hardware amortization cost." color={GREEN}>2.664 million GPU-hours</H>.
          At cloud rental rates, this translates to the headline-grabbing $5.576 million training cost.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '90.2%', unit: '', label: 'MATH-500 (best among all)', color: C },
          { value: '88.5%', unit: '', label: 'MMLU', color: C2 },
          { value: '51.6%', unit: '', label: 'Codeforces', color: AMBER },
          { value: '2048', unit: ' H100s', label: 'Training GPUs', color: GREEN },
        ]}
      />

      {/* ── Full Architecture Overview SVG ── */}
      <Diagram caption={<><strong>DeepSeek-V3 Full Architecture Overview</strong> — 61 layers of MoE + MLA, with MTP training head</>}>
        <svg viewBox="0 0 860 550" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="arch-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d1a20" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
            <marker id="arch-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={C} />
            </marker>
            <marker id="arch-ar-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
          </defs>

          <rect width="860" height="550" rx="12" fill="url(#arch-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={C} fontSize="14" fontWeight="700" letterSpacing="1.5">DEEPSEEK-V3 FULL ARCHITECTURE — 671B MOE</text>

          {/* Input embedding */}
          <rect x="330" y="50" width="200" height="36" rx="8" fill={GRAY} fillOpacity="0.15" stroke={GRAY} strokeWidth="1" />
          <text x="430" y="73" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">Token Embedding (d=7168)</text>

          {/* Arrow */}
          <line x1="430" y1="86" x2="430" y2="105" stroke={C} strokeWidth="1.5" markerEnd="url(#arch-ar)" />

          {/* Layer block x3 */}
          {[
            { y: 108, label: 'Layer 1' },
            { y: 230, label: 'Layer 2' },
            { y: 352, label: '... Layer 61' },
          ].map(({ y, label }, idx) => (
            <g key={label}>
              <rect x="120" y={y} width="620" height="105" rx="10" fill={C} fillOpacity="0.04" stroke={C} strokeWidth="1" strokeDasharray={idx === 2 ? '4 3' : 'none'} />
              <text x="135" y={y + 18} fill={C2} fontSize="10" fontWeight="700">{label}</text>

              {/* MLA block */}
              <rect x="140" y={y + 25} width="240" height="65" rx="8" fill={PURPLE} fillOpacity="0.1" stroke={PURPLE} strokeWidth="1" />
              <text x="260" y={y + 48} textAnchor="middle" fill={PURPLE} fontSize="11" fontWeight="700">Multi-Head Latent Attention</text>
              <text x="260" y={y + 65} textAnchor="middle" fill={GRAY} fontSize="9">KV latent: 512-dim | 128 heads</text>
              <text x="260" y={y + 78} textAnchor="middle" fill={GRAY} fontSize="9">93.4% cache reduction</text>

              {/* Arrow between */}
              <line x1="385" y1={y + 57} x2="415" y2={y + 57} stroke={C} strokeWidth="1.5" markerEnd="url(#arch-ar)" />

              {/* MoE block */}
              <rect x="420" y={y + 25} width="300" height="65" rx="8" fill={C} fillOpacity="0.1" stroke={C} strokeWidth="1" />
              <text x="570" y={y + 48} textAnchor="middle" fill={C} fontSize="11" fontWeight="700">MoE FFN (256 experts + 1 shared)</text>
              <text x="570" y={y + 65} textAnchor="middle" fill={GRAY} fontSize="9">Top-8 routing | Bias-based balancing</text>
              <text x="570" y={y + 78} textAnchor="middle" fill={GRAY} fontSize="9">37B active / 671B total</text>

              {/* Arrow to next layer */}
              {idx < 2 && (
                <line x1="430" y1={y + 105} x2="430" y2={y + 122} stroke={C} strokeWidth="1.5" markerEnd="url(#arch-ar)" />
              )}
            </g>
          ))}

          {/* Arrow from last layer */}
          <line x1="430" y1="457" x2="430" y2="472" stroke={C} strokeWidth="1.5" markerEnd="url(#arch-ar)" />

          {/* Output heads */}
          <rect x="170" y="475" width="220" height="40" rx="8" fill={C} fillOpacity="0.15" stroke={C} strokeWidth="1.5" />
          <text x="280" y="499" textAnchor="middle" fill={C2} fontSize="12" fontWeight="700">Main LM Head (t+1)</text>

          <rect x="470" y="475" width="220" height="40" rx="8" fill={PURPLE} fillOpacity="0.15" stroke={PURPLE} strokeWidth="1.5" />
          <text x="580" y="499" textAnchor="middle" fill={PURPLE} fontSize="12" fontWeight="700">MTP Head (t+2)</text>

          {/* Key stats at bottom */}
          <text x="430" y="535" textAnchor="middle" fill={GRAY} fontSize="10">61 layers | 7168 hidden dim | 128 attn heads | 256 MoE experts | 37B active / 671B total | FP8 training</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Innovation', 'What It Does', 'Savings']}
        rows={[
          ['MoE (256 experts, top-8)', 'Activates 37B of 671B params per token', '~18x compute reduction vs dense'],
          ['MLA (latent attention)', 'Compresses KV cache from 14K to 512 dims', '93.4% memory reduction'],
          ['MTP (2-token prediction)', 'Richer training signal + speculative decode', '1.8x inference speedup'],
          ['FP8 mixed precision', 'Half-precision training from scratch', '~50% memory, ~1.5x throughput'],
          ['Auxiliary-loss-free balancing', 'Bias-based expert load balancing', 'No quality degradation'],
          ['DualPipe parallelism', 'Overlaps compute and communication', '~60% pipeline bubble reduction'],
        ]}
        caption="Six innovations working together produce the $5.6M training cost"
      />

      <Callout type="key">
        No single innovation explains DeepSeek-V3's efficiency. It is the <em>combination</em> of MoE
        sparsity, MLA compression, FP8 precision, MTP training, loss-free balancing, and DualPipe
        parallelism that produces the 10-20x cost advantage. Each technique compounds on the others.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — MENTAL MODELS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Mental Models"
        subtitle="Intuitive ways to think about DeepSeek-V3's key innovations"
        color={C}
      />

      <MentalModel
        title="MoE = A University with 256 Departments"
        analogy="A dense 671B model is like a single professor who has memorized every subject — brilliant but impossibly slow. DeepSeek-V3 is a university with 256 specialized departments. When a student (token) arrives with a question, the admissions office (router) sends them to the 8 most relevant departments, plus the general studies department (shared expert) that every student attends. The university holds the collective knowledge of all 256 departments, but each student only consults 9 of them. This is how you get 671B parameters of knowledge at 37B parameters of cost."
        technical="The MoE layer replaces the single FFN in each Transformer block with N=256 expert FFNs + 1 shared FFN + a router. Router: g = softmax(W_g · h), TopK = argtop_8(g). Output: MoE(h) = FFN_shared(h) + sum_{i in TopK} g_i · FFN_i(h). Active params per token: ~37B out of 671B (5.5% utilization). This extreme sparsity enables frontier quality at a fraction of the compute."
        color={C}
      />

      <MentalModel
        title="MLA = Zip Compression for Attention Memory"
        analogy="Standard attention is like saving every email as a full Word document — detailed but wasteful when you have millions. MLA is like zipping each email into a tiny compressed file and unzipping it on demand. The KV cache is compressed from 14,336 floats to just 512 (a 28x compression), and when you need the original, you decompress using a learned formula. You save 93% of storage with no information loss, because the 'emails' (KV vectors across heads) are highly redundant — most of the 14,336 dimensions say the same thing in slightly different ways."
        technical="MLA factorizes the KV projection: c_t = W_DKV · h_t (7168 → 512), then K_t = W_UK · c_t and V_t = W_UV · c_t (512 → 7168). Only c_t is cached during inference. This is a low-rank approximation: the full KV matrix has rank ≤ 512, which experiments show captures >99% of the useful information. The decompression cost (two small matmuls) is negligible compared to the memory savings."
        color={C}
      />

      <MentalModel
        title="MTP = Chess Players Who Think 2 Moves Ahead"
        analogy="A standard language model is like a chess player who only thinks about the next move. Multi-Token Prediction trains the model to think 2 moves ahead. By forcing it to predict both the next token AND the one after, every internal representation becomes richer — it must encode not just what is immediately next, but what comes after that. The 2-move-ahead thinking makes the 1-move-ahead decisions better too, because good short-term moves naturally emerge from good long-term planning."
        technical="MTP adds a secondary prediction head that shares the main Transformer's representations. Loss = L_next + lambda * L_MTP. The MTP gradient flows through the shared representations, creating a richer training signal that improves all downstream tasks. At inference, the MTP head enables speculative decoding: propose t+2, verify cheaply, generate 2 tokens per step (up to 1.8x speedup)."
        color={PURPLE}
      />

      <MentalModel
        title="FP8 = Sketching Instead of Oil Painting"
        analogy="BF16 training is like painting every brushstroke in rich oil paint — beautiful but slow and expensive. FP8 training is like sketching with pencil — less detail per stroke, but you work twice as fast and use half the canvas. The trick is that DeepSeek uses a different pencil pressure (scaling factor) for each small section of the drawing, so no section loses too much detail. The final sketch is indistinguishable from the oil painting, but it took half the time and materials."
        technical="FP8 E4M3 has only 3 mantissa bits (vs 7 in BF16), but fine-grained quantization with 128-element tiles ensures each tile's values are optimally scaled. GEMMs run in FP8 (where compute cost dominates), accumulation in FP32 (where precision matters), optimizer states in FP32 (where drift would accumulate). Net result: ~50% activation memory savings, ~1.5x compute throughput, with no measurable quality degradation."
        color={C}
      />

      <MentalModel
        title="The $6M Question: Why Could They Do It?"
        analogy="Building a frontier AI model used to be like building a skyscraper — only the richest companies could afford the steel, the land, and the labor. DeepSeek showed it is more like architecture: a brilliant architect can design a building that is just as tall using 90% less steel, by understanding which beams are load-bearing and which are redundant. MoE removes redundant computation. MLA removes redundant memory. FP8 removes redundant precision. MTP removes redundant training steps. Together, these architectural insights replace raw spending with engineering intelligence."
        technical="The compounding effect: MoE gives ~18x compute reduction (37B/671B). MLA saves 93% of KV cache memory. FP8 halves activation memory and accelerates GEMMs by ~1.5x. MTP improves sample efficiency. DualPipe reduces pipeline bubble overhead by ~60%. Multiplicatively, these enable training a 671B model for what a 70B dense model would cost — while achieving 671B-quality performance."
        color={GREEN}
      />

      <Callout type="key">
        DeepSeek-V3 is not just a model — it is a manifesto. It argues that the AI industry's fixation
        on scaling compute budgets is misguided. Architectural innovation, training efficiency, and
        engineering craftsmanship can achieve the same results at a fraction of the cost. The $5.6 million
        price tag is the proof.
      </Callout>
    </>
  );
}
