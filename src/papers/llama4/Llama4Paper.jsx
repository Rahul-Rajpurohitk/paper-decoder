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
const B = '#3b82f6';    // primary blue
const B2 = '#60a5fa';   // lighter blue
const B3 = '#2563eb';   // darker blue
const BG = '#0a0f1e';   // deep navy for SVGs
const FG = '#e2e8f0';   // light text in SVGs
const GRAY = '#94a3b8';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const RED = '#ef4444';
const PURPLE = '#a855f7';
const CYAN = '#06b6d4';

export default function Llama4Paper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHY LLAMA 4?
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="01"
        title="Why Llama 4? Open-Source Goes Frontier"
        subtitle="MoE architecture, 10M token context, and native multimodality — all open-weight"
        color={B}
      />

      <Prose>
        <p>
          For three generations, Meta's <H tip="Llama (Large Language Model Meta AI) = Meta's family of open-weight language models. Llama 1 (Feb 2023) proved open models can match proprietary ones. Llama 2 (Jul 2023) added chat fine-tuning. Llama 3 (Apr 2024) scaled to 405B dense parameters. Each generation moved the open-source frontier forward." color={B}>Llama</H> models
          have been the backbone of the open-source AI ecosystem. But Llama 3 hit a wall: its largest model was
          a <H tip="Dense model = every token activates every parameter in every layer. A 405B dense model means 405 billion parameters fire for each input token. This is simple but expensive — doubling the model size doubles the compute cost per token." color={GRAY}>405B dense model</H> — powerful but
          enormously expensive to run. Every token required all 405 billion parameters to activate, making
          inference slow and costly.
        </p>
        <p>
          Llama 4 changes the game with a <H tip="Mixture of Experts (MoE) = an architecture where most parameters exist in 'expert' sub-networks, but only a few experts activate per token. This decouples total parameter count (knowledge capacity) from per-token compute (inference cost). You get the knowledge of a huge model at the cost of a small one." color={B}>Mixture of Experts (MoE)</H> architecture. The
          flagship <H tip="Maverick = Llama 4's flagship open-weight model. 400B total parameters but only 17B active per token (4.25% utilization). Uses 128 routed experts + 1 shared expert per MoE layer. Competitive with GPT-4o and Gemini 2.0 Flash on benchmarks while being far cheaper to serve." color={B}>Maverick</H> model packs <strong>400 billion total parameters</strong> but activates
          only <strong>17 billion per token</strong> — giving you the knowledge capacity of a massive model with
          the inference cost of a small one. Combined with a <H tip="10M token context = Llama 4 can process inputs up to 10 million tokens long. For reference, the entire Harry Potter series is ~1.1M tokens. This is achieved through iRoPE (interleaved RoPE), which alternates between position-aware and position-free attention layers." color={GREEN}>10 million token context window</H> and
          <H tip="Early fusion multimodality = integrating vision tokens directly into the text token stream from the very first layer, rather than treating images as a separate input that gets projected into the text model later. This allows the model to reason jointly about text and images from the start." color={AMBER}>native multimodal understanding</H>, Llama 4 represents the biggest architectural leap
          in the series.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '400B', unit: ' total', label: 'Maverick Parameters', color: B },
          { value: '17B', unit: ' active', label: 'Per-Token Compute', color: B2 },
          { value: '10M', unit: ' tokens', label: 'Context Window', color: GREEN },
          { value: '128', unit: ' experts', label: 'Routed Experts (Maverick)', color: AMBER },
        ]}
      />

      <SimpleExplain>
        <p><strong>What this means in plain language:</strong> Imagine a massive hospital with 128 specialist doctors. When a patient (token) arrives, instead of consulting every doctor (expensive!), a smart receptionist routes them to just 1 specialist who is most relevant, plus 1 general practitioner who sees everyone. The hospital has the collective knowledge of all 128 doctors, but each patient only waits for 2. That is Mixture of Experts — and it is how Llama 4 can be both enormous (400B parameters of knowledge) and fast (only 17B parameters compute per token).</p>
      </SimpleExplain>

      <ComparisonTable
        headers={['Property', 'Llama 3.1 (405B)', 'Llama 4 Scout', 'Llama 4 Maverick']}
        rows={[
          ['Architecture', 'Dense Transformer', 'MoE (16 experts)', 'MoE (128 experts)'],
          ['Total Parameters', '405B', '109B', '400B'],
          ['Active Parameters', '405B (100%)', '17B (15.6%)', '17B (4.25%)'],
          ['Context Length', '128K tokens', '10M tokens', '1M tokens'],
          ['Multimodal', 'Text only', 'Text + Vision', 'Text + Vision'],
          ['Expert Routing', 'N/A', '1 shared + 1 routed', '1 shared + 1 routed'],
        ]}
        caption="Llama 4 moves from dense to MoE, gaining capacity while reducing per-token compute by ~24x"
      />

      <Callout type="key">
        The fundamental shift: Llama 3 scaled by making every layer bigger (dense scaling). Llama 4 scales
        by adding more <H tip="Experts = specialized feed-forward networks within an MoE layer. Each expert has its own weights and can learn to specialize in different types of input patterns (e.g., code syntax, mathematical reasoning, factual recall). The router decides which expert handles each token." color={B}>experts</H> (sparse scaling). Same knowledge capacity, fraction of the compute. This is why Maverick
        can rival GPT-4o while being dramatically cheaper to serve.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — MoE ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="02"
        title="MoE Architecture — How Tokens Find Their Expert"
        subtitle="Alternating dense and MoE layers with top-1 routing + shared expert"
        color={B}
      />

      <Prose>
        <p>
          Llama 4's Transformer stack alternates between two types of layers: <H tip="Dense layer = a standard Transformer layer where the feed-forward network (FFN) is a single large network that processes every token. In Llama 4, these layers are interleaved with MoE layers — providing a shared computation backbone that every token passes through." color={GRAY}>dense layers</H> (standard
          FFN — every token processes through the same network) and <H tip="MoE layer = a Transformer layer where the feed-forward network is replaced by multiple parallel expert networks plus a router. The attention mechanism is identical to a dense layer — only the FFN is different. This is where the sparsity and capacity gains come from." color={B}>MoE layers</H> (multiple expert FFNs with a
          learned router). The attention mechanism is identical in both — the key difference is in the <H tip="Feed-forward network (FFN) = the second sub-layer in each Transformer block. In a dense model, it is a single MLP (typically two linear layers with an activation function). In an MoE model, this single FFN is replaced by N parallel expert FFNs plus a routing mechanism." color={B}>feed-forward sub-layer</H>.
        </p>
        <p>
          In each MoE layer, every token is processed by <strong>two experts</strong>: one <H tip="Shared expert = an expert that processes EVERY token, regardless of routing. It acts as a 'general practitioner' that captures common patterns needed by all inputs. This ensures a baseline quality floor — even if the routed expert is suboptimal, the shared expert provides a safety net." color={GREEN}>shared expert</H> (same
          for all tokens — captures universal patterns) and one <H tip="Routed expert = an expert selected specifically for this token by the router network. Out of 128 available experts in Maverick, the router picks exactly 1 for each token. This expert specializes in the particular type of pattern the token represents." color={B}>routed expert</H> (selected from the pool by a
          learned <H tip="Router = a small neural network (typically a single linear layer + softmax) that takes the token's hidden state and produces a probability distribution over all experts. The expert with the highest probability is selected. The router is trained end-to-end with the rest of the model." color={AMBER}>router</H>). Maverick uses <H tip="Top-1 routing = each token is routed to exactly 1 expert (the one with the highest router score). Some MoE models use top-2 (e.g., Switch Transformer routes to 1, GShard to 2, Mixtral to 2). Llama 4 uses top-1 routed + 1 shared = 2 experts total per token." color={B}>top-1 routing</H>: the
          router scores all 128 experts with a <H tip="Sigmoid function = σ(x) = 1/(1+e^(-x)). Maps any real number to [0,1]. Used here instead of softmax so that each expert's score is independent — a token can have high affinity with multiple experts without them competing. Only the top-1 is selected, but the scores are not forced to sum to 1." color={GRAY}>sigmoid activation</H> and selects the single highest-scoring expert.
        </p>
      </Prose>

      <Diagram caption="MoE Layer Architecture: each token activates 1 shared expert + 1 routed expert (out of 128)">
        <svg viewBox="0 0 800 480" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="ll4-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={B} />
            </marker>
            <marker id="ll4-arr-g" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
            </marker>
            <marker id="ll4-arr-a" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={AMBER} />
            </marker>
            <linearGradient id="ll4-expert-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={B} stopOpacity="0.25" />
              <stop offset="100%" stopColor={B} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect width="800" height="480" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="28" fill={B} fontSize="14" fontWeight="700" textAnchor="middle">MOE LAYER — TOKEN ROUTING</text>

          {/* Input tokens */}
          {['The', 'model', 'learns', 'to'].map((tok, i) => (
            <g key={i}>
              <rect x={80 + i * 170} y={50} width="80" height="32" rx="6" fill={B} fillOpacity="0.15" stroke={B} strokeWidth="1" />
              <text x={120 + i * 170} y={70} fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">{tok}</text>
            </g>
          ))}
          <text x="400" y="102" fill={GRAY} fontSize="11" textAnchor="middle">Input token hidden states h</text>

          {/* Router */}
          <rect x="300" y="115" width="200" height="38" rx="8" fill={AMBER} fillOpacity="0.15" stroke={AMBER} strokeWidth="1.5" />
          <text x="400" y="139" fill={AMBER} fontSize="13" fontWeight="700" textAnchor="middle">Router: W_r · h → sigmoid → top-1</text>

          {/* Arrow down from tokens to router */}
          <line x1="400" y1="102" x2="400" y2="115" stroke={AMBER} strokeWidth="1.5" markerEnd="url(#ll4-arr-a)" />

          {/* Shared expert — left */}
          <rect x="40" y="185" width="160" height="55" rx="10" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="2" />
          <text x="120" y="210" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">Shared Expert</text>
          <text x="120" y="228" fill={GRAY} fontSize="10" textAnchor="middle">Processes ALL tokens</text>

          {/* Arrow from router to shared */}
          <line x1="300" y1="134" x2="200" y2="185" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#ll4-arr-g)" />
          <text x="235" y="162" fill={GREEN} fontSize="10" fontWeight="600">always</text>

          {/* Routed experts pool — right side */}
          <rect x="280" y="175" width="480" height="130" rx="12" fill="url(#ll4-expert-grad)" stroke={B} strokeWidth="1" strokeDasharray="4 3" />
          <text x="520" y="195" fill={B2} fontSize="12" fontWeight="700" textAnchor="middle">128 Routed Expert Pool</text>

          {/* Expert boxes */}
          {[0, 1, 2, 3, 4, 5, 6].map((e, i) => {
            const selected = i === 2; // Expert 3 highlighted as selected
            return (
              <g key={i}>
                <rect
                  x={298 + i * 62}
                  y={210}
                  width="52"
                  height="42"
                  rx="6"
                  fill={selected ? B : B}
                  fillOpacity={selected ? 0.35 : 0.08}
                  stroke={selected ? B2 : B}
                  strokeWidth={selected ? 2.5 : 0.8}
                />
                <text
                  x={324 + i * 62}
                  y={228}
                  fill={selected ? '#fff' : GRAY}
                  fontSize="11"
                  fontWeight={selected ? '700' : '400'}
                  textAnchor="middle"
                >
                  E{i + 1}
                </text>
                {selected && (
                  <text x={324 + i * 62} y={246} fill={B2} fontSize="8" fontWeight="700" textAnchor="middle">SELECTED</text>
                )}
              </g>
            );
          })}
          {/* Ellipsis */}
          <text x="740" y="236" fill={GRAY} fontSize="16" textAnchor="middle">…128</text>

          {/* Arrow from router to expert pool */}
          <line x1="500" y1="153" x2="520" y2="175" stroke={B} strokeWidth="1.5" markerEnd="url(#ll4-arr)" />
          <text x="530" y="167" fill={B2} fontSize="10" fontWeight="600">top-1</text>

          {/* Combine outputs */}
          <rect x="240" y="340" width="320" height="42" rx="10" fill={B} fillOpacity="0.12" stroke={B} strokeWidth="1.5" />
          <text x="400" y="365" fill={FG} fontSize="13" fontWeight="600" textAnchor="middle">output = shared(h) + router_weight · routed(h)</text>

          {/* Arrows down to combine */}
          <line x1="120" y1="240" x2="320" y2="340" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#ll4-arr-g)" />
          <line x1="440" y1="305" x2="440" y2="340" stroke={B} strokeWidth="1.5" markerEnd="url(#ll4-arr)" />

          {/* Residual + output */}
          <rect x="300" y="410" width="200" height="36" rx="8" fill={B} fillOpacity="0.2" stroke={B} strokeWidth="2" />
          <text x="400" y="433" fill={B2} fontSize="13" fontWeight="700" textAnchor="middle">h + MoE(h) → next layer</text>
          <line x1="400" y1="382" x2="400" y2="410" stroke={B} strokeWidth="1.5" markerEnd="url(#ll4-arr)" />

          {/* Residual bypass arrow */}
          <line x1="70" y1="82" x2="70" y2="428" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
          <line x1="70" y1="428" x2="300" y2="428" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#ll4-arr)" />
          <text x="60" y="260" fill={GRAY} fontSize="9" textAnchor="end" transform="rotate(-90,60,260)">residual</text>

          {/* Legend */}
          <rect x="600" y="420" width="10" height="10" rx="2" fill={GREEN} fillOpacity="0.5" />
          <text x="616" y="429" fill={GRAY} fontSize="10">Shared (all tokens)</text>
          <rect x="600" y="440" width="10" height="10" rx="2" fill={B} fillOpacity="0.5" />
          <text x="616" y="449" fill={GRAY} fontSize="10">Routed (top-1 selected)</text>
          <rect x="600" y="460" width="10" height="10" rx="2" fill={AMBER} fillOpacity="0.5" />
          <text x="616" y="469" fill={GRAY} fontSize="10">Router network</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="MoE Layer Forward Pass"
        color={B}
        steps={[
          {
            note: 'The router is a linear layer that takes the token hidden state and scores each expert. Sigmoid is used (not softmax) so scores are independent.',
            math: 'g_i = \\sigma(W_r \\cdot h)_i \\quad \\text{for each expert } i \\in \\{1, \\ldots, 128\\}',
          },
          {
            note: 'Select the expert with the highest score. This is top-1 routing — only 1 of the 128 routed experts fires per token.',
            math: 'e^* = \\arg\\max_i \\; g_i, \\quad w = g_{e^*}',
          },
          {
            note: 'The final output combines the shared expert (always active) with the selected routed expert, weighted by the router score. The shared expert provides a stable baseline; the routed expert provides specialization.',
            math: '\\text{MoE}(h) = \\text{FFN}_{\\text{shared}}(h) \\;+\\; w \\cdot \\text{FFN}_{e^*}(h)',
          },
        ]}
        symbols={[
          { symbol: 'h', meaning: 'Token hidden state (input to the MoE layer)' },
          { symbol: 'W_r', meaning: 'Router weight matrix, maps h → expert scores' },
          { symbol: 'σ', meaning: 'Sigmoid activation (independent scores per expert)' },
          { symbol: 'e*', meaning: 'Index of the selected routed expert' },
          { symbol: 'w', meaning: 'Router weight for the selected expert (gating)' },
        ]}
      />

      <ConceptCard title="Alternating Dense + MoE Layers" color={B} defaultOpen={true}>
        <Prose>
          <p>
            Not every layer is MoE. Llama 4 uses <H tip="Alternating layers = interleaving dense Transformer layers (standard FFN) with MoE layers (expert FFN + router). This pattern provides a shared computation backbone (dense layers see all tokens equally) while MoE layers specialize. The ratio varies by model — Scout uses more MoE layers than dense." color={B}>alternating dense and MoE layers</H>.
            Dense layers provide a <em>shared computation backbone</em> that processes every token identically,
            while MoE layers add <H tip="Conditional computation = the idea that not every part of the network needs to activate for every input. MoE is a form of conditional computation — the router decides which expert sub-networks to activate based on the input. This allows scaling model capacity without proportionally scaling compute." color={B}>conditional computation</H> where different tokens
            take different paths. This hybrid design helps with <H tip="Training stability = MoE models are notoriously harder to train than dense models. Expert collapse (all tokens routing to a few experts), load imbalance, and gradient scaling issues can destabilize training. Alternating with dense layers provides stable gradient flow paths." color={RED}>training stability</H> — pure MoE stacks
            can suffer from <H tip="Expert collapse = a failure mode where the router learns to send all tokens to just 1-2 experts, leaving the rest unused. This wastes capacity and defeats the purpose of MoE. Llama 4 prevents this with load balancing losses and careful initialization." color={RED}>expert collapse</H>, but interleaving dense layers provides
            reliable gradient flow.
          </p>
        </Prose>

        <Diagram caption="Alternating Dense / MoE layer pattern in a Llama 4 stack">
          <svg viewBox="0 0 800 220" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <rect width="800" height="220" rx="12" fill={BG} />
            <text x="400" y="26" fill={B} fontSize="13" fontWeight="700" textAnchor="middle">LLAMA 4 LAYER STACK (simplified)</text>

            {/* Layer blocks */}
            {[
              { label: 'Dense', type: 'd', i: 0 },
              { label: 'MoE', type: 'm', i: 1 },
              { label: 'Dense', type: 'd', i: 2 },
              { label: 'MoE', type: 'm', i: 3 },
              { label: 'Dense', type: 'd', i: 4 },
              { label: 'MoE', type: 'm', i: 5 },
              { label: '…', type: 'e', i: 6 },
              { label: 'MoE', type: 'm', i: 7 },
            ].map(({ label, type, i }) => {
              const x = 55 + i * 90;
              const isDense = type === 'd';
              const isEllipsis = type === 'e';
              const color = isDense ? GRAY : B;
              return (
                <g key={i}>
                  {!isEllipsis ? (
                    <>
                      <rect x={x} y={50} width="72" height="110" rx="8"
                        fill={isDense ? 'rgba(148,163,184,0.08)' : B}
                        fillOpacity={isDense ? 1 : 0.12}
                        stroke={color} strokeWidth={isDense ? 1 : 1.5}
                      />
                      <text x={x + 36} y={85} fill={color} fontSize="12" fontWeight="700" textAnchor="middle">{label}</text>
                      <text x={x + 36} y={105} fill={GRAY} fontSize="9" textAnchor="middle">{isDense ? 'Attn + FFN' : 'Attn + Router'}</text>
                      <text x={x + 36} y={120} fill={GRAY} fontSize="9" textAnchor="middle">{isDense ? '(all params)' : '+ Experts'}</text>
                      {isDense && <text x={x + 36} y={145} fill={GRAY} fontSize="10" textAnchor="middle">L{i + 1}</text>}
                      {!isDense && <text x={x + 36} y={145} fill={B2} fontSize="10" textAnchor="middle">L{i + 1}</text>}
                    </>
                  ) : (
                    <text x={x + 36} y={110} fill={GRAY} fontSize="20" textAnchor="middle">…</text>
                  )}
                  {i < 7 && !isEllipsis && (
                    <line x1={x + 72} y1={105} x2={x + 90} y2={105} stroke={GRAY} strokeWidth="1" strokeDasharray="3 2" />
                  )}
                </g>
              );
            })}

            {/* Bottom labels */}
            <text x="400" y="190" fill={FG} fontSize="11" textAnchor="middle" opacity="0.8">
              Dense layers: shared backbone | MoE layers: specialized expert routing
            </text>
            <text x="400" y="210" fill={GRAY} fontSize="10" textAnchor="middle">
              Scout: 48 layers | Maverick: 48 layers | Behemoth: 96 layers (planned)
            </text>
          </svg>
        </Diagram>
      </ConceptCard>

      <ConceptCard title="Why Shared + Routed Instead of Just Top-2?" color={AMBER} defaultOpen={false}>
        <Prose>
          <p>
            Earlier MoE models like <H tip="Mixtral 8x7B = Mistral AI's MoE model (Dec 2023). Uses 8 experts per layer with top-2 routing — each token goes to 2 out of 8 experts. Total 46.7B params, 12.9B active. Llama 4 goes further: 128 experts with top-1 routing + shared expert = much higher specialization potential." color={GRAY}>Mixtral</H> used <strong>top-2 routing</strong>: each
            token goes to 2 out of 8 experts. Llama 4 takes a different approach — <strong>1 shared expert + 1 routed
            expert</strong>. The shared expert guarantees that every token gets a baseline computation
            (preventing information loss), while the routed expert provides <H tip="Specialization = the phenomenon where different experts learn to handle different types of inputs. In practice, experts often specialize by language (English vs code), domain (math vs creative writing), or linguistic function (syntax vs semantics). This emergent specialization is what makes MoE efficient." color={AMBER}>specialization</H>.
            This design was pioneered by <H tip="DeepSeek-V2 (May 2024) = an open-source MoE model that introduced the shared expert + routed expert design pattern. It showed that 1 shared + top-k routed experts outperforms (k+1) routed experts because the shared expert provides stable gradient flow and captures universal patterns." color={GRAY}>DeepSeek-V2</H> and adopted by Llama 4.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="insight">
        Maverick has 128 experts but each token only uses <strong>2 of them</strong> (1 shared + 1 routed) — that is just
        1.56% of the expert parameters per token. This extreme sparsity means you can pack enormous knowledge
        into the model without paying for it at inference time. The router learns to match tokens to their
        ideal specialist, making the model both a generalist (via shared expert) and a specialist (via routed expert).
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — iRoPE & 10M CONTEXT
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="03"
        title="iRoPE & 10M Token Context"
        subtitle="Interleaved position encodings that extrapolate to extreme sequence lengths"
        color={B}
      />

      <Prose>
        <p>
          Standard Transformers use <H tip="Rotary Position Embedding (RoPE) = a position encoding method that encodes relative positions by rotating the query and key vectors. Introduced by Su et al. (2021). It naturally captures relative distances between tokens and is used in Llama 2/3, Mistral, Qwen, and most modern LLMs." color={B}>RoPE</H> (Rotary
          Position Embedding) in every attention layer, which works well up to the training context length.
          But RoPE does not extrapolate gracefully — when you try to use a model at sequence lengths far beyond
          its training length, the rotary frequencies produce unseen angle combinations and attention patterns
          break down. This is why <H tip="Context length extrapolation = the ability to use a model at sequence lengths much longer than it was trained on. Most models trained on 8K tokens fail dramatically at 32K+. Achieving reliable extrapolation to 10M tokens requires fundamental architectural changes, not just longer training." color={RED}>context length extrapolation</H> has been
          such a hard problem.
        </p>
        <p>
          Llama 4 introduces <H tip="iRoPE (Interleaved RoPE) = Llama 4's position encoding strategy. Instead of using RoPE in every layer, it alternates between RoPE layers (position-aware) and NoPE layers (no position encoding). NoPE layers use pure content-based attention, which naturally handles any sequence length since it doesn't depend on position signals." color={B}>iRoPE</H> — <strong>Interleaved Rotary Position Embedding</strong>. The
          idea is elegantly simple: instead of applying RoPE to every layer, alternate between <H tip="RoPE layer = an attention layer where query and key vectors are rotated by position-dependent angles (standard RoPE). These layers encode WHERE tokens are relative to each other. They provide the positional signal that language models need for tasks like 'the word before X' or 'the 3rd item in this list'." color={B}>RoPE layers</H>{' '}
          (position-aware) and <H tip="NoPE layer (No Position Embedding) = an attention layer with NO position encoding at all. Queries and keys attend purely based on content similarity — like asking 'what is semantically related?' without caring about 'what is nearby?' These layers are position-agnostic and naturally generalize to any sequence length." color={GREEN}>NoPE layers</H> (no position encoding at all).
          NoPE layers use pure content-based attention — they do not know or care about token positions.
          Since they have no positional signal, they naturally generalize to any sequence length.
        </p>
      </Prose>

      <Diagram caption="iRoPE: alternating RoPE (position-aware) and NoPE (position-free) attention layers">
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="ll4-rope-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={FG} />
            </marker>
          </defs>
          <rect width="800" height="380" rx="12" fill={BG} />
          <text x="400" y="28" fill={B} fontSize="14" fontWeight="700" textAnchor="middle">iRoPE — INTERLEAVED POSITION ENCODING</text>

          {/* Layer stack visualization */}
          {[
            { label: 'Layer 1', type: 'rope', y: 50 },
            { label: 'Layer 2', type: 'nope', y: 90 },
            { label: 'Layer 3', type: 'rope', y: 130 },
            { label: 'Layer 4', type: 'nope', y: 170 },
            { label: 'Layer 5', type: 'rope', y: 210 },
            { label: 'Layer 6', type: 'nope', y: 250 },
          ].map(({ label, type, y }, i) => {
            const isRoPE = type === 'rope';
            const col = isRoPE ? B : GREEN;
            return (
              <g key={i}>
                {/* Layer bar */}
                <rect x={60} y={y} width="300" height="32" rx="6"
                  fill={col} fillOpacity={0.12} stroke={col} strokeWidth={1.5}
                />
                <text x={80} y={y + 20} fill={FG} fontSize="12" fontWeight="600">{label}</text>
                <text x={340} y={y + 20} fill={col} fontSize="11" fontWeight="700" textAnchor="end">
                  {isRoPE ? 'RoPE Attention' : 'NoPE Attention'}
                </text>

                {/* Description on right */}
                <text x={390} y={y + 14} fill={GRAY} fontSize="10">
                  {isRoPE ? 'Q, K rotated by position → "where are you?"' : 'No position signal → "what are you?"'}
                </text>
                <text x={390} y={y + 28} fill={isRoPE ? B2 : GREEN} fontSize="9" fontWeight="600">
                  {isRoPE ? 'Sensitive to position, limited extrapolation' : 'Content-only, infinite extrapolation'}
                </text>

                {/* Connecting arrows */}
                {i < 5 && (
                  <line x1={210} y1={y + 32} x2={210} y2={y + 40} stroke={GRAY} strokeWidth="1" strokeDasharray="2 2" />
                )}
              </g>
            );
          })}

          {/* Key insight box */}
          <rect x={60} y={300} width="680" height="60" rx="10" fill={B} fillOpacity="0.08" stroke={B} strokeWidth="1" />
          <text x={400} y={322} fill={B2} fontSize="12" fontWeight="700" textAnchor="middle">
            KEY INSIGHT: NoPE layers have zero position dependency → they extrapolate perfectly
          </text>
          <text x={400} y={342} fill={FG} fontSize="11" textAnchor="middle" opacity="0.8">
            RoPE layers handle local structure (nearby context) | NoPE layers handle global content matching (any distance)
          </text>
        </svg>
      </Diagram>

      <FormulaBlock
        math="Q_{\text{RoPE}} = R_\theta(m) \cdot W_Q h, \quad K_{\text{RoPE}} = R_\theta(m) \cdot W_K h \quad \text{vs} \quad Q_{\text{NoPE}} = W_Q h, \quad K_{\text{NoPE}} = W_K h"
        label="RoPE vs NoPE Attention: the only difference is whether position rotation R_θ(m) is applied"
        color={B}
        symbols={[
          { symbol: 'R_θ(m)', meaning: 'RoPE rotation matrix at position m' },
          { symbol: 'W_Q, W_K', meaning: 'Query and Key projection weights' },
          { symbol: 'h', meaning: 'Token hidden state' },
          { symbol: 'm', meaning: 'Token position index in the sequence' },
        ]}
      />

      <StepFlow
        color={B}
        steps={[
          {
            title: 'Train at 256K context with standard RoPE base frequency',
            desc: 'The model is initially trained with a moderate context window. RoPE layers learn positional awareness, NoPE layers learn content matching.',
          },
          {
            title: 'Increase RoPE base frequency (temperature scaling)',
            desc: 'For longer contexts, the RoPE frequency base θ is increased. This stretches the rotary wavelengths so that positions further apart still produce reasonable angle differences. NoPE layers need no modification.',
          },
          {
            title: 'Continued pre-training on progressively longer sequences',
            desc: 'The model is gradually exposed to longer documents (512K → 1M → 10M). NoPE layers generalize immediately; RoPE layers adapt via fine-tuning on the new frequencies.',
          },
          {
            title: 'At 10M tokens: RoPE provides local structure, NoPE provides global recall',
            desc: 'The division of labor emerges: RoPE layers handle nearby context patterns (syntax, local coherence) while NoPE layers handle long-range content retrieval (finding relevant facts from millions of tokens away).',
          },
        ]}
      />

      <SimpleExplain>
        <p><strong>Why does this work?</strong> Think of it like having two types of librarians. "Position librarians" (RoPE) know exactly where books are on the shelf — great for finding nearby books, but they get confused in a library with 10 million shelves. "Content librarians" (NoPE) do not know shelf positions at all — they find books purely by topic, regardless of location. By alternating both types, you get precise local retrieval AND unlimited long-range recall.</p>
      </SimpleExplain>

      <ConceptCard title="Temperature Scaling for Context Extrapolation" color={GREEN} defaultOpen={false}>
        <Prose>
          <p>
            The <H tip="RoPE base frequency (θ) = the base value used to compute rotary frequencies for each dimension pair. Default is 10,000. Higher values stretch the frequency spectrum, allowing the model to distinguish positions further apart without encountering unseen angle combinations. Llama 4 uses much higher θ for long context." color={GREEN}>RoPE base frequency</H> determines how far apart positions
            can be before the rotary embeddings start repeating. By increasing this base (a technique called
            <H tip="Temperature scaling = increasing the RoPE base frequency θ to extend the effective context length. Named by analogy with thermodynamics: higher temperature → longer wavelengths → positions further apart remain distinguishable. First introduced in the context of NTK-aware scaling." color={GREEN}>temperature scaling</H>), the model can handle longer sequences
            without seeing repeated positional patterns. Combined with NoPE layers that handle position-free
            attention, iRoPE achieves reliable performance at <strong>10 million tokens</strong> for Scout —
            roughly <strong>78x beyond</strong> Llama 3.1's 128K context.
          </p>
        </Prose>
      </ConceptCard>

      <VisualCompare
        leftLabel="Standard RoPE (All Layers)"
        rightLabel="iRoPE (Interleaved)"
        leftColor={RED}
        rightColor={GREEN}
        left={<>
          <p><strong>Every layer</strong> uses position-dependent attention</p>
          <p>At 10M tokens: rotary angles wrap around, positions collide</p>
          <p>Attention scores degrade beyond training length</p>
          <p style={{color: RED}}>Hard ceiling on useful context</p>
        </>}
        right={<>
          <p><strong>Half the layers</strong> are position-free (NoPE)</p>
          <p>At 10M tokens: NoPE layers see pure content — no length limit</p>
          <p>RoPE layers handle local; NoPE handles global</p>
          <p style={{color: GREEN}}>Graceful extrapolation to extreme lengths</p>
        </>}
        caption="iRoPE's key advantage: NoPE layers have zero positional dependency, so they extrapolate perfectly to any length"
      />

      <Callout type="key">
        Scout achieves a <strong>10 million token context</strong> — equivalent to processing the entire
        Harry Potter series 9 times in a single prompt. This is not just a theoretical number: Meta reports
        strong needle-in-a-haystack retrieval performance across the full 10M context on benchmarks.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — EARLY FUSION MULTIMODAL
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="04"
        title="Early Fusion — Native Multimodal Understanding"
        subtitle="Vision tokens interleaved with text tokens from the very first layer"
        color={B}
      />

      <Prose>
        <p>
          Most multimodal LLMs treat vision as an afterthought: train a text-only LLM, then bolt on a <H tip="Vision encoder = a separate neural network (typically a ViT) that converts an image into a sequence of feature vectors. In late-fusion models, these vectors are projected into the LLM's embedding space and prepended to the text tokens. The LLM only 'sees' the image through this bottleneck." color={GRAY}>vision encoder</H>{' '}
          and a <H tip="Projection layer = a linear transformation that maps vision encoder features into the text model's embedding space. It is the bridge between the vision world and the language world. Its expressiveness limits how much visual information reaches the language model." color={GRAY}>projection layer</H>. This <H tip="Late fusion = integrating different modalities (text, image, audio) at a later stage, typically by projecting their representations into a shared space and then feeding them to a pre-trained text model. The text model was not designed for multimodal input — it is retrofitted." color={RED}>late fusion</H> approach has a fundamental
          limitation: the text Transformer was never designed to process visual information. It learns to
          interpret projected vision features post-hoc, through the narrow bottleneck of a projection layer.
        </p>
        <p>
          Llama 4 uses <H tip="Early fusion = training the model from scratch on interleaved text and image tokens. Vision tokens are not projected through a bottleneck — they are embedded and fed directly into the Transformer alongside text tokens from layer 1. Every layer of every attention head can jointly attend to both text and image tokens." color={B}>early fusion</H>: during pre-training, image
          tokens are <H tip="Interleaved tokens = mixing image tokens directly into the text token sequence at their natural positions. If a document contains 'A photo of [IMAGE] shows a cat', the image tokens replace the [IMAGE] placeholder and are processed alongside text tokens at every layer." color={B}>interleaved directly</H> into the text token sequence from the
          very first layer. A <H tip="MetaCLIP vision encoder = Meta's CLIP-based vision encoder that converts images into patch tokens. Each image is split into patches (e.g., 16x16 pixels), each patch becomes a token that enters the token stream alongside text tokens. Meta's version is trained on their curated image-text dataset." color={AMBER}>vision encoder</H> (based on MetaCLIP) converts images
          into patch tokens, and these patch tokens enter the Transformer alongside text tokens. Every attention
          layer — from the first to the last — can jointly attend to both text and image tokens.
        </p>
      </Prose>

      <Diagram caption="Early Fusion: vision tokens interleaved with text tokens processed jointly from layer 1">
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="ll4-ef-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={B} />
            </marker>
            <marker id="ll4-ef-arr-a" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={AMBER} />
            </marker>
          </defs>
          <rect width="800" height="400" rx="12" fill={BG} />
          <text x="400" y="28" fill={B} fontSize="14" fontWeight="700" textAnchor="middle">EARLY FUSION MULTIMODAL PIPELINE</text>

          {/* Image input */}
          <rect x="40" y="50" width="90" height="70" rx="8" fill={AMBER} fillOpacity="0.15" stroke={AMBER} strokeWidth="1.5" />
          <text x="85" y="75" fill={AMBER} fontSize="10" fontWeight="700" textAnchor="middle">IMAGE</text>
          <rect x="52" y="85" width="66" height="26" rx="4" fill={AMBER} fillOpacity="0.08" />
          <text x="85" y="103" fill={GRAY} fontSize="9" textAnchor="middle">512×512 px</text>

          {/* Vision encoder */}
          <line x1="130" y1="85" x2="160" y2="85" stroke={AMBER} strokeWidth="1.5" markerEnd="url(#ll4-ef-arr-a)" />
          <rect x="165" y="55" width="120" height="60" rx="8" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1.5" />
          <text x="225" y="78" fill={AMBER} fontSize="11" fontWeight="700" textAnchor="middle">Vision Encoder</text>
          <text x="225" y="95" fill={GRAY} fontSize="9" textAnchor="middle">(MetaCLIP ViT)</text>

          {/* Text input */}
          <rect x="40" y="150" width="90" height="50" rx="8" fill={B} fillOpacity="0.15" stroke={B} strokeWidth="1.5" />
          <text x="85" y="180" fill={B2} fontSize="10" fontWeight="700" textAnchor="middle">TEXT TOKENS</text>

          {/* Text embeddings */}
          <line x1="130" y1="175" x2="160" y2="175" stroke={B} strokeWidth="1.5" markerEnd="url(#ll4-ef-arr)" />
          <rect x="165" y="145" width="120" height="60" rx="8" fill={B} fillOpacity="0.12" stroke={B} strokeWidth="1.5" />
          <text x="225" y="172" fill={B2} fontSize="11" fontWeight="700" textAnchor="middle">Text Embedding</text>
          <text x="225" y="189" fill={GRAY} fontSize="9" textAnchor="middle">(Token + position)</text>

          {/* Interleaved token stream */}
          <line x1="285" y1="85" x2="345" y2="140" stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="285" y1="175" x2="345" y2="155" stroke={B} strokeWidth="1.5" strokeDasharray="4 3" />

          <rect x="350" y="125" width="300" height="50" rx="8" fill={B} fillOpacity="0.06" stroke={B} strokeWidth="1" />
          <text x="500" y="142" fill={FG} fontSize="10" fontWeight="600" textAnchor="middle">INTERLEAVED TOKEN SEQUENCE</text>

          {/* Token sequence visualization */}
          {[
            { t: 'A', c: B, x: 370 },
            { t: 'cat', c: B, x: 400 },
            { t: '📷', c: AMBER, x: 435 },
            { t: '📷', c: AMBER, x: 462 },
            { t: '📷', c: AMBER, x: 489 },
            { t: 'sits', c: B, x: 522 },
            { t: 'on', c: B, x: 555 },
            { t: '📷', c: AMBER, x: 585 },
            { t: 'a', c: B, x: 614 },
          ].map(({ t, c, x }, i) => (
            <g key={i}>
              <rect x={x - 13} y={152} width="26" height="18" rx="3" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="0.8" />
              <text x={x} y={165} fill={c === AMBER ? AMBER : FG} fontSize="8" fontWeight="600" textAnchor="middle">{t}</text>
            </g>
          ))}

          {/* Transformer stack */}
          <line x1="500" y1="175" x2="500" y2="200" stroke={B} strokeWidth="1.5" markerEnd="url(#ll4-ef-arr)" />

          <rect x="330" y="205" width="340" height="120" rx="10" fill={B} fillOpacity="0.08" stroke={B} strokeWidth="1.5" />
          <text x="500" y="228" fill={B2} fontSize="12" fontWeight="700" textAnchor="middle">Llama 4 Transformer Stack</text>

          {['Layer 1: Joint text+vision attention', 'Layer 2: MoE routes vision & text tokens', '...', 'Layer N: Full cross-modal reasoning'].map((l, i) => (
            <text key={i} x={500} y={248 + i * 18} fill={i === 2 ? GRAY : FG} fontSize="10" textAnchor="middle" opacity={0.8}>{l}</text>
          ))}

          {/* Output */}
          <line x1="500" y1="325" x2="500" y2="348" stroke={B} strokeWidth="1.5" markerEnd="url(#ll4-ef-arr)" />
          <rect x="370" y="350" width="260" height="36" rx="8" fill={B} fillOpacity="0.15" stroke={B} strokeWidth="2" />
          <text x="500" y="373" fill={B2} fontSize="12" fontWeight="700" textAnchor="middle">Multimodal Output Tokens</text>

          {/* Key difference callout */}
          <rect x="40" y="240" width="260" height="80" rx="8" fill={GREEN} fillOpacity="0.06" stroke={GREEN} strokeWidth="1" />
          <text x="170" y="262" fill={GREEN} fontSize="10" fontWeight="700" textAnchor="middle">EARLY FUSION ADVANTAGE</text>
          <text x="170" y="280" fill={FG} fontSize="9" textAnchor="middle" opacity="0.8">Vision tokens attend to text tokens</text>
          <text x="170" y="295" fill={FG} fontSize="9" textAnchor="middle" opacity="0.8">AND text tokens attend to vision</text>
          <text x="170" y="310" fill={GREEN} fontSize="9" fontWeight="600" textAnchor="middle">at EVERY layer from the start</text>
        </svg>
      </Diagram>

      <VisualCompare
        leftLabel="Late Fusion"
        rightLabel="Early Fusion (Llama 4)"
        leftColor={RED}
        rightColor={GREEN}
        left={<>
          <p><strong>Train text-only LLM first</strong></p>
          <p>Bolt on vision encoder + projection layer afterward</p>
          <p>Image features pass through a narrow bottleneck</p>
          <p>Text layers never learned to process visual info</p>
          <p style={{color: RED}}>Cross-modal reasoning is limited</p>
        </>}
        right={<>
          <p><strong>Train on text + images from the start</strong></p>
          <p>Vision tokens interleaved directly in token stream</p>
          <p>No bottleneck — every attention head sees image tokens</p>
          <p>All layers jointly attend to both modalities</p>
          <p style={{color: GREEN}}>Deep cross-modal understanding</p>
        </>}
        caption="Early fusion enables richer multimodal reasoning because every layer processes both modalities jointly"
      />

      <SimpleExplain>
        <p><strong>In everyday terms:</strong> Late fusion is like learning to read first, then being shown pictures later and trying to connect them to what you already know about language. Early fusion is like growing up in a world where you always see pictures alongside words — you naturally learn that "cat" relates to furry four-legged things because you have always seen them together. Llama 4 was raised multimodal from birth.</p>
      </SimpleExplain>

      <Callout type="insight">
        Early fusion pays a cost: you cannot just fine-tune a text-only model — you must pre-train the entire
        model on interleaved text-image data from scratch. This is computationally expensive but produces
        fundamentally better multimodal understanding. Meta trained Llama 4 on a <H tip="Multimodal pre-training corpus = Meta's training data includes both text-only data (web text, code, books) and interleaved text-image data (web pages with images, image-caption pairs, documents with figures). The exact composition is proprietary, but the diversity ensures the model learns both modalities jointly." color={B}>massive multimodal corpus</H>{' '}
        specifically curated for joint text-image learning.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — TRAINING AT SCALE
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="05"
        title="Training at Scale"
        subtitle="Pre-training, mid-training, and post-training: how you build a frontier MoE model"
        color={B}
      />

      <Prose>
        <p>
          Training a <H tip="Frontier MoE model = a model at or near the state-of-the-art that uses Mixture of Experts architecture. The combination of MoE sparsity (for capacity) with massive scale (400B+ parameters) and multimodal data makes training extremely challenging — requiring thousands of GPUs for months." color={B}>frontier MoE model</H> like Llama 4 is a multi-stage
          process. Meta uses a three-phase approach: <H tip="Pre-training = the first and longest phase of training. The model learns general language/multimodal understanding from trillions of tokens of diverse data. This is where the bulk of the knowledge is acquired. For Llama 4, this involved ~30T tokens on massive GPU clusters." color={B}>pre-training</H> on
          trillions of tokens to build general knowledge, <H tip="Mid-training = an intermediate phase between pre-training and fine-tuning. The model is trained on higher-quality, curated data (textbooks, high-quality web content, code) with adjusted learning rates. This phase sharpens capabilities that pre-training only roughly established." color={B}>mid-training</H> on curated high-quality data
          to sharpen capabilities, and <H tip="Post-training = the final phase where the model is aligned with human preferences. Includes supervised fine-tuning (SFT) on instruction-response pairs and reinforcement learning from human feedback (RLHF) or direct preference optimization (DPO). This is what turns a base model into a helpful assistant." color={B}>post-training</H> for
          alignment and instruction following.
        </p>
        <p>
          A critical challenge for MoE models is <H tip="Load balancing = ensuring that all experts receive a roughly equal share of tokens during training. Without it, a few 'popular' experts get overloaded while others sit idle — wasting capacity and causing compute bottlenecks. Llama 4 uses auxiliary losses to encourage balanced routing." color={RED}>load balancing</H>: if the
          router sends most tokens to a few experts, the rest become dead weight. Llama 4 uses auxiliary
          <H tip="Load balancing loss = an extra term added to the training loss that penalizes uneven expert utilization. It encourages the router to spread tokens across experts more evenly. Too strong a penalty forces uniform routing (defeating specialization); too weak allows collapse. Finding the right weight is crucial." color={RED}>load balancing losses</H> to encourage the router
          to distribute tokens evenly, while still allowing natural <H tip="Expert specialization = the phenomenon where different experts learn to process different types of inputs. Some experts may specialize in code, others in math, others in creative text. This emergent property is what gives MoE models their efficiency — each expert becomes a focused sub-model." color={AMBER}>specialization</H> to emerge.
        </p>
      </Prose>

      <Diagram caption="Llama 4 Three-Phase Training Pipeline">
        <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="ll4-tp-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={B} />
            </marker>
          </defs>
          <rect width="800" height="300" rx="12" fill={BG} />
          <text x="400" y="28" fill={B} fontSize="14" fontWeight="700" textAnchor="middle">THREE-PHASE TRAINING PIPELINE</text>

          {/* Phase 1: Pre-training */}
          <rect x="30" y="55" width="220" height="160" rx="10" fill={B} fillOpacity="0.1" stroke={B} strokeWidth="1.5" />
          <text x="140" y="80" fill={B2} fontSize="13" fontWeight="700" textAnchor="middle">Phase 1: Pre-training</text>
          <line x1="60" y1="90" x2="220" y2="90" stroke={B} strokeWidth="0.5" opacity="0.3" />
          <text x="140" y="110" fill={FG} fontSize="10" textAnchor="middle">~30T tokens</text>
          <text x="140" y="128" fill={FG} fontSize="10" textAnchor="middle">Text + Image interleaved</text>
          <text x="140" y="146" fill={FG} fontSize="10" textAnchor="middle">Standard next-token loss</text>
          <text x="140" y="164" fill={FG} fontSize="10" textAnchor="middle">+ Load balancing loss</text>
          <text x="140" y="186" fill={GRAY} fontSize="9" textAnchor="middle">~months on GPU clusters</text>
          <text x="140" y="202" fill={B2} fontSize="10" fontWeight="600" textAnchor="middle">256K initial context</text>

          {/* Arrow */}
          <line x1="255" y1="135" x2="285" y2="135" stroke={B} strokeWidth="2" markerEnd="url(#ll4-tp-arr)" />

          {/* Phase 2: Mid-training */}
          <rect x="290" y="55" width="220" height="160" rx="10" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1.5" />
          <text x="400" y="80" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">Phase 2: Mid-training</text>
          <line x1="320" y1="90" x2="480" y2="90" stroke={GREEN} strokeWidth="0.5" opacity="0.3" />
          <text x="400" y="110" fill={FG} fontSize="10" textAnchor="middle">High-quality curated data</text>
          <text x="400" y="128" fill={FG} fontSize="10" textAnchor="middle">Annealed learning rate</text>
          <text x="400" y="146" fill={FG} fontSize="10" textAnchor="middle">Context extension training</text>
          <text x="400" y="164" fill={FG} fontSize="10" textAnchor="middle">iRoPE frequency scaling</text>
          <text x="400" y="186" fill={GRAY} fontSize="9" textAnchor="middle">Extends to 1M-10M context</text>
          <text x="400" y="202" fill={GREEN} fontSize="10" fontWeight="600" textAnchor="middle">Knowledge sharpening</text>

          {/* Arrow */}
          <line x1="515" y1="135" x2="545" y2="135" stroke={B} strokeWidth="2" markerEnd="url(#ll4-tp-arr)" />

          {/* Phase 3: Post-training */}
          <rect x="550" y="55" width="220" height="160" rx="10" fill={PURPLE} fillOpacity="0.08" stroke={PURPLE} strokeWidth="1.5" />
          <text x="660" y="80" fill={PURPLE} fontSize="13" fontWeight="700" textAnchor="middle">Phase 3: Post-training</text>
          <line x1="580" y1="90" x2="740" y2="90" stroke={PURPLE} strokeWidth="0.5" opacity="0.3" />
          <text x="660" y="110" fill={FG} fontSize="10" textAnchor="middle">SFT on instruction data</text>
          <text x="660" y="128" fill={FG} fontSize="10" textAnchor="middle">RLHF / DPO alignment</text>
          <text x="660" y="146" fill={FG} fontSize="10" textAnchor="middle">Safety training</text>
          <text x="660" y="164" fill={FG} fontSize="10" textAnchor="middle">Multimodal instruction tuning</text>
          <text x="660" y="186" fill={GRAY} fontSize="9" textAnchor="middle">Produces chat-ready model</text>
          <text x="660" y="202" fill={PURPLE} fontSize="10" fontWeight="600" textAnchor="middle">Llama 4 Scout / Maverick</text>

          {/* Bottom: key numbers */}
          <rect x="60" y="240" width="680" height="42" rx="8" fill={B} fillOpacity="0.06" stroke={B} strokeWidth="0.8" />
          <text x="400" y="260" fill={FG} fontSize="11" textAnchor="middle" fontWeight="600">
            Hardware: ~32K H100 GPUs | Data: ~30T tokens text + billions of images | Training: several months
          </text>
          <text x="400" y="276" fill={GRAY} fontSize="10" textAnchor="middle">
            MoE training requires careful expert load balancing to prevent capacity waste
          </text>
        </svg>
      </Diagram>

      <ConceptCard title="Expert Load Balancing: The Hidden Challenge" color={RED} defaultOpen={true}>
        <Prose>
          <p>
            The Achilles' heel of MoE training is <H tip="Unbalanced routing = when the router learns to send a disproportionate number of tokens to a small subset of experts. This creates a vicious cycle: popular experts get more training signal → become better → attract more tokens → other experts stagnate. Left unchecked, this leads to expert collapse." color={RED}>unbalanced routing</H>. If
            expert #47 happens to be slightly better early in training, the router sends more tokens
            to it, it gets more gradient updates, it improves further, attracting even more tokens — a
            <H tip="Rich-get-richer dynamics = a positive feedback loop where initial advantages compound over time. In MoE, if one expert gets slightly more traffic, it gets more training, becomes better, gets more traffic. This is the same mechanism behind wealth inequality and preferential attachment in networks." color={RED}>rich-get-richer</H> spiral that can leave
            most experts untrained. Llama 4 combats this with:
          </p>
          <p>
            <strong>1. Auxiliary load balancing loss.</strong> An extra loss term penalizes uneven token distribution across
            experts. If expert utilization deviates from uniform (1/N per expert), the penalty increases.
          </p>
          <p>
            <strong>2. Expert capacity limits.</strong> Each expert has a maximum number of tokens it can process per batch. Overflow tokens are either dropped or redirected to other experts, preventing any single expert from dominating.
          </p>
          <p>
            <strong>3. Careful initialization.</strong> Router weights and expert weights are initialized to produce approximately
            uniform routing at the start, giving all experts equal opportunity to specialize.
          </p>
        </Prose>
      </ConceptCard>

      <FormulaBlock
        math="\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{LM}} + \alpha \cdot \mathcal{L}_{\text{balance}} \quad \text{where} \quad \mathcal{L}_{\text{balance}} = N \sum_{i=1}^{N} f_i \cdot p_i"
        label="Training Loss: language modeling loss + load balancing auxiliary loss"
        color={B}
        symbols={[
          { symbol: 'L_LM', meaning: 'Standard next-token prediction (cross-entropy) loss' },
          { symbol: 'L_balance', meaning: 'Auxiliary loss penalizing uneven expert utilization' },
          { symbol: 'α', meaning: 'Balancing coefficient (small, e.g., 0.01)' },
          { symbol: 'f_i', meaning: 'Fraction of tokens routed to expert i in this batch' },
          { symbol: 'p_i', meaning: 'Average router probability for expert i in this batch' },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — MODEL FAMILY
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="06"
        title="The Llama 4 Model Family"
        subtitle="Scout, Maverick, and the upcoming Behemoth — three tiers of capability"
        color={B}
      />

      <Prose>
        <p>
          Llama 4 is not a single model but a <H tip="Model family = a set of models sharing the same architecture design but at different scales. Like how a car manufacturer makes sedan, SUV, and truck variants from the same platform. Llama 4's family spans from 109B to 2T total parameters — each with 17B active per token." color={B}>family of three models</H>, each
          designed for different deployment scenarios:
        </p>
        <p>
          <strong><H tip="Scout = the efficiency-optimized member of the Llama 4 family. 109B total parameters with 16 routed experts. Its standout feature is a 10M token context window — the longest of any open model. Designed for tasks requiring massive context: full codebase understanding, book-length document analysis, long-form retrieval." color={B}>Scout</H></strong> (109B total, 16 experts) is the efficiency champion with an
          extraordinary 10M token context. <strong><H tip="Maverick = the flagship of the Llama 4 family. 400B total parameters with 128 routed experts — a massive knowledge capacity while keeping per-token compute at 17B. Targets the quality tier of GPT-4o and Gemini 2.0 Flash. Context window of 1M tokens." color={B}>Maverick</H></strong> (400B total, 128 experts) is the
          quality flagship, competing with GPT-4o. And the upcoming <strong><H tip="Behemoth = the planned largest member of the Llama 4 family. Expected to have ~2 trillion total parameters with 288B active per token. 96 layers instead of 48. If it reaches its quality targets, it would be the largest open-weight model ever released." color={PURPLE}>Behemoth</H></strong> (~2T total, 288B active) aims to push the frontier of open-source AI to a new scale entirely.
        </p>
      </Prose>

      <Diagram caption="Llama 4 Model Family: three scales sharing the same MoE architecture with iRoPE">
        <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="420" rx="12" fill={BG} />
          <text x="400" y="28" fill={B} fontSize="14" fontWeight="700" textAnchor="middle">LLAMA 4 MODEL FAMILY</text>

          {/* Scout */}
          <rect x="40" y="55" width="220" height="280" rx="12" fill={CYAN} fillOpacity="0.06" stroke={CYAN} strokeWidth="1.5" />
          <text x="150" y="82" fill={CYAN} fontSize="16" fontWeight="800" textAnchor="middle">Scout</text>
          <text x="150" y="100" fill={GRAY} fontSize="10" textAnchor="middle">Efficiency + Long Context</text>
          <line x1="65" y1="110" x2="235" y2="110" stroke={CYAN} strokeWidth="0.5" opacity="0.3" />

          {[
            ['Total Params', '109B'],
            ['Active Params', '17B'],
            ['Experts', '16 routed + 1 shared'],
            ['Layers', '48'],
            ['Context', '10M tokens'],
            ['Modality', 'Text + Vision'],
            ['Hidden Dim', '5,120'],
            ['Heads', '40'],
          ].map(([k, v], i) => (
            <g key={i}>
              <text x={60} y={132 + i * 22} fill={GRAY} fontSize="10">{k}</text>
              <text x={240} y={132 + i * 22} fill={FG} fontSize="10" fontWeight="600" textAnchor="end">{v}</text>
            </g>
          ))}

          <rect x={65} y={315} width="170" height="8" rx="4" fill={CYAN} fillOpacity="0.2" />
          <rect x={65} y={315} width="30" height="8" rx="4" fill={CYAN} />
          <text x="150" y="340" fill={CYAN} fontSize="9" textAnchor="middle">15.6% active (17B/109B)</text>

          {/* Maverick */}
          <rect x="290" y="55" width="220" height="280" rx="12" fill={B} fillOpacity="0.08" stroke={B} strokeWidth="2" />
          <rect x="290" y="55" width="220" height="35" rx="12" fill={B} fillOpacity="0.15" />
          <text x="400" y="78" fill={B2} fontSize="16" fontWeight="800" textAnchor="middle">Maverick</text>
          <text x="400" y="100" fill={GRAY} fontSize="10" textAnchor="middle">Flagship Quality</text>
          <line x1="315" y1="110" x2="485" y2="110" stroke={B} strokeWidth="0.5" opacity="0.3" />

          {[
            ['Total Params', '400B'],
            ['Active Params', '17B'],
            ['Experts', '128 routed + 1 shared'],
            ['Layers', '48'],
            ['Context', '1M tokens'],
            ['Modality', 'Text + Vision'],
            ['Hidden Dim', '5,120'],
            ['Heads', '40'],
          ].map(([k, v], i) => (
            <g key={i}>
              <text x={310} y={132 + i * 22} fill={GRAY} fontSize="10">{k}</text>
              <text x={490} y={132 + i * 22} fill={FG} fontSize="10" fontWeight="600" textAnchor="end">{v}</text>
            </g>
          ))}

          <rect x={315} y={315} width="170" height="8" rx="4" fill={B} fillOpacity="0.2" />
          <rect x={315} y={315} width="7" height="8" rx="4" fill={B} />
          <text x="400" y="340" fill={B2} fontSize="9" textAnchor="middle">4.25% active (17B/400B)</text>

          {/* Behemoth */}
          <rect x="540" y="55" width="220" height="280" rx="12" fill={PURPLE} fillOpacity="0.06" stroke={PURPLE} strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="650" y="82" fill={PURPLE} fontSize="16" fontWeight="800" textAnchor="middle">Behemoth</text>
          <text x="650" y="100" fill={GRAY} fontSize="10" textAnchor="middle">Frontier Scale (upcoming)</text>
          <line x1="565" y1="110" x2="735" y2="110" stroke={PURPLE} strokeWidth="0.5" opacity="0.3" />

          {[
            ['Total Params', '~2T (est.)'],
            ['Active Params', '288B'],
            ['Experts', 'TBA'],
            ['Layers', '96'],
            ['Context', 'TBA'],
            ['Modality', 'Text + Vision'],
            ['Hidden Dim', 'TBA'],
            ['Heads', 'TBA'],
          ].map(([k, v], i) => (
            <g key={i}>
              <text x={560} y={132 + i * 22} fill={GRAY} fontSize="10">{k}</text>
              <text x={740} y={132 + i * 22} fill={v.includes('TBA') ? GRAY : FG} fontSize="10" fontWeight="600" textAnchor="end" opacity={v.includes('TBA') ? 0.5 : 1}>{v}</text>
            </g>
          ))}

          <rect x={565} y={315} width="170" height="8" rx="4" fill={PURPLE} fillOpacity="0.2" />
          <rect x={565} y={315} width="24" height="8" rx="4" fill={PURPLE} />
          <text x="650" y="340" fill={PURPLE} fontSize="9" textAnchor="middle">~14.4% active (288B/2T)</text>

          {/* Bottom comparison */}
          <rect x="100" y="365" width="600" height="38" rx="8" fill={B} fillOpacity="0.06" stroke={B} strokeWidth="0.8" />
          <text x="400" y="383" fill={FG} fontSize="11" textAnchor="middle" fontWeight="600">
            All three share: MoE + iRoPE + Early Fusion + Shared Expert architecture
          </text>
          <text x="400" y="398" fill={GRAY} fontSize="10" textAnchor="middle">
            Scout = long context specialist | Maverick = quality flagship | Behemoth = frontier push
          </text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Benchmark', 'Llama 3.1 405B', 'Llama 4 Scout', 'Llama 4 Maverick', 'GPT-4o', 'Gemini 2.0 Flash']}
        rows={[
          ['MMLU', '87.3', '79.6', '85.5', '87.2', '85.2'],
          ['GPQA Diamond', '51.1', '57.2', '69.8', '53.6', '61.7'],
          ['LiveCodeBench', '34.3', '32.8', '43.4', '38.5', '34.5'],
          ['Multimodal (MMMU)', '—', '69.4', '73.4', '69.1', '73.4'],
          ['Active Params/Token', '405B', '17B', '17B', '~200B (est.)', '~50B (est.)'],
        ]}
        caption="Maverick matches GPT-4o quality with ~17B active parameters per token — dramatically cheaper to serve"
      />

      <ConceptCard title="Scout: The 10M Context Specialist" color={CYAN} defaultOpen={false}>
        <Prose>
          <p>
            Scout is a unique model in the landscape. With only 16 experts (vs Maverick's 128),
            it has fewer total parameters (109B) but extends its context window to a staggering
            <strong> 10 million tokens</strong>. This makes it ideal for:
          </p>
          <p>
            <strong><H tip="Repository-scale code understanding = loading an entire codebase (hundreds of files, tens of thousands of lines) into a single context window and reasoning about it holistically. At 10M tokens, Scout can process codebases that would require multiple calls for any other model." color={CYAN}>Full codebase analysis</H></strong> — load
            an entire repository into context. <strong><H tip="Book-length document analysis = processing entire books (100K-500K tokens each) or multiple books simultaneously. At 10M tokens, you could analyze ~20 average-length books in a single prompt." color={CYAN}>Book-length documents</H></strong> — analyze
            entire textbooks or legal filings. <strong><H tip="Long-form retrieval = finding specific information within millions of tokens of context, like finding a specific needle in a massive haystack. Scout's iRoPE architecture with NoPE layers enables this through content-based (not position-based) attention." color={CYAN}>Needle-in-a-haystack retrieval</H></strong> — find
            specific facts within millions of tokens of context.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        The efficiency of MoE is staggering: Maverick activates only <strong>4.25% of its parameters</strong> per token.
        It has 23.5× more total parameters than active parameters. This means you get the <em>knowledge capacity</em> of
        a 400B model with the <em>inference cost</em> of a 17B model. When you combine this with Meta&apos;s open-weight
        release strategy, Llama 4 democratizes access to frontier-quality AI in a way closed models cannot.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — MENTAL MODELS
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="07"
        title="Mental Models"
        subtitle="Intuitive ways to think about Llama 4's key innovations"
        color={B}
      />

      <MentalModel
        title="MoE = A Hospital of Specialists"
        analogy="A dense model is like a single doctor who sees every patient — comprehensive but slow. An MoE model is a hospital with 128 specialist doctors. When a patient arrives, a triage nurse (router) sends them to the 1 most relevant specialist, plus a general practitioner who sees everyone (shared expert). The hospital has the collective expertise of all 128 doctors, but each patient only needs 2. This is how Llama 4 achieves 400B knowledge with 17B per-token compute."
        technical="The router is a learned linear layer: g = σ(W_r · h). Top-1 selection picks the highest-scoring expert. The shared expert adds a fixed capacity floor. Total active parameters per token = shared_expert_params + 1 × routed_expert_params + attention_params ≈ 17B."
        color={B}
      />

      <MentalModel
        title="iRoPE = Two Types of Librarians"
        analogy="Position librarians (RoPE layers) know exactly where every book is on the shelf — ask for 'the book 3 shelves to the left' and they find it instantly. But in a library with 10 million shelves, they get confused because their shelf-numbering system wraps around. Content librarians (NoPE layers) don't know shelf positions at all — they find books by topic, no matter where they are. By alternating both types, you get precise local retrieval (from RoPE) and unlimited global recall (from NoPE)."
        technical="RoPE layers apply rotation R_θ(m) to Q and K, encoding relative position. NoPE layers skip the rotation entirely — attention is purely based on content dot-product Q·K^T. The mix allows extrapolation because NoPE layers contribute position-independent attention that generalizes to any length."
        color={GREEN}
      />

      <MentalModel
        title="Early Fusion = Growing Up Bilingual"
        analogy="Late fusion is like learning English perfectly, then studying French at age 30 through a phrasebook (projection layer). You can translate, but you think in English and convert. Early fusion is like growing up in a bilingual household — you think natively in both languages and can mix them fluidly mid-sentence. Llama 4 grew up seeing text and images together from birth (layer 1), so it reasons about both modalities natively."
        technical="Vision tokens from MetaCLIP are embedded and interleaved directly into the text token sequence. Every Transformer layer — attention and FFN — jointly processes text and image tokens. Cross-modal attention happens at every layer, not just through a projection bottleneck."
        color={AMBER}
      />

      <MentalModel
        title="Shared Expert = A Safety Net"
        analogy="Think of the shared expert as the bass player in a band. The lead guitarist (routed expert) changes based on the song — a blues expert for blues, a jazz expert for jazz. But the bassist (shared expert) plays on every song, providing the rhythmic foundation that holds everything together. Even if the wrong guitarist shows up, the bassist keeps the music from falling apart."
        technical="The shared expert processes every token unconditionally. Its output is added to the routed expert's output. This ensures a minimum quality floor: MoE(h) = FFN_shared(h) + w · FFN_routed(h). Even if the router makes a poor selection (w · FFN_routed is suboptimal), FFN_shared provides baseline quality."
        color={GREEN}
      />

      <Diagram caption="Key Innovations Summary: how MoE, iRoPE, and Early Fusion work together">
        <svg viewBox="0 0 800 320" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="320" rx="12" fill={BG} />
          <text x="400" y="28" fill={B} fontSize="14" fontWeight="700" textAnchor="middle">LLAMA 4 — THREE PILLARS OF INNOVATION</text>

          {/* Pillar 1: MoE */}
          <rect x="35" y="55" width="230" height="200" rx="10" fill={B} fillOpacity="0.08" stroke={B} strokeWidth="1.5" />
          <text x="150" y="80" fill={B2} fontSize="14" fontWeight="800" textAnchor="middle">MoE Architecture</text>
          <line x1="55" y1="90" x2="245" y2="90" stroke={B} strokeWidth="0.5" opacity="0.3" />

          {/* Expert circles */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((e, i) => (
            <circle key={i} cx={65 + i * 26} cy={115} r="10"
              fill={i === 0 ? GREEN : B}
              fillOpacity={i === 3 ? 0.6 : 0.15}
              stroke={i === 0 ? GREEN : (i === 3 ? B2 : B)}
              strokeWidth={i === 3 ? 2 : 0.8}
            />
          ))}
          <text x="65" y="140" fill={GREEN} fontSize="8">shared</text>
          <text x="143" y="140" fill={B2} fontSize="8">selected</text>

          <text x="150" y="162" fill={FG} fontSize="10" textAnchor="middle">128 experts, 1 shared + 1 routed</text>
          <text x="150" y="178" fill={FG} fontSize="10" textAnchor="middle">400B total, 17B active/token</text>
          <text x="150" y="198" fill={FG} fontSize="10" textAnchor="middle" opacity="0.7">Knowledge of a giant,</text>
          <text x="150" y="212" fill={FG} fontSize="10" textAnchor="middle" opacity="0.7">cost of a small model</text>
          <text x="150" y="240" fill={B2} fontSize="11" fontWeight="700" textAnchor="middle">EFFICIENCY</text>

          {/* Pillar 2: iRoPE */}
          <rect x="285" y="55" width="230" height="200" rx="10" fill={GREEN} fillOpacity="0.06" stroke={GREEN} strokeWidth="1.5" />
          <text x="400" y="80" fill={GREEN} fontSize="14" fontWeight="800" textAnchor="middle">iRoPE</text>
          <line x1="305" y1="90" x2="495" y2="90" stroke={GREEN} strokeWidth="0.5" opacity="0.3" />

          {/* Alternating bars */}
          {[0, 1, 2, 3, 4, 5].map((l, i) => (
            <g key={i}>
              <rect x={310} y={105 + i * 16} width="200" height="12" rx="3"
                fill={i % 2 === 0 ? B : GREEN}
                fillOpacity={0.2}
                stroke={i % 2 === 0 ? B : GREEN}
                strokeWidth="0.5"
              />
              <text x={315} y={114 + i * 16} fill={i % 2 === 0 ? B2 : GREEN} fontSize="7" fontWeight="600">
                {i % 2 === 0 ? 'RoPE' : 'NoPE'}
              </text>
            </g>
          ))}

          <text x="400" y="210" fill={FG} fontSize="10" textAnchor="middle">Alternating position-aware /</text>
          <text x="400" y="224" fill={FG} fontSize="10" textAnchor="middle">position-free attention</text>
          <text x="400" y="240" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">10M CONTEXT</text>

          {/* Pillar 3: Early Fusion */}
          <rect x="535" y="55" width="230" height="200" rx="10" fill={AMBER} fillOpacity="0.06" stroke={AMBER} strokeWidth="1.5" />
          <text x="650" y="80" fill={AMBER} fontSize="14" fontWeight="800" textAnchor="middle">Early Fusion</text>
          <line x1="555" y1="90" x2="745" y2="90" stroke={AMBER} strokeWidth="0.5" opacity="0.3" />

          {/* Interleaved tokens */}
          {[
            { t: 'txt', c: B, x: 570 },
            { t: 'img', c: AMBER, x: 600 },
            { t: 'txt', c: B, x: 630 },
            { t: 'txt', c: B, x: 660 },
            { t: 'img', c: AMBER, x: 690 },
            { t: 'txt', c: B, x: 720 },
          ].map(({ t, c, x }, i) => (
            <rect key={i} x={x - 12} y={105} width="24" height="14" rx="3" fill={c} fillOpacity="0.3" stroke={c} strokeWidth="0.5" />
          ))}
          {[
            { t: 'txt', c: B, x: 570 },
            { t: 'img', c: AMBER, x: 600 },
            { t: 'txt', c: B, x: 630 },
            { t: 'txt', c: B, x: 660 },
            { t: 'img', c: AMBER, x: 690 },
            { t: 'txt', c: B, x: 720 },
          ].map(({ t, c, x }, i) => (
            <text key={`l-${i}`} x={x} y={115} fill={c} fontSize="7" fontWeight="600" textAnchor="middle">{t}</text>
          ))}

          <text x="650" y="142" fill={FG} fontSize="10" textAnchor="middle">Image + text tokens mixed</text>
          <text x="650" y="158" fill={FG} fontSize="10" textAnchor="middle">in the same sequence</text>
          <text x="650" y="178" fill={FG} fontSize="10" textAnchor="middle">Joint attention at every layer</text>
          <text x="650" y="198" fill={FG} fontSize="10" textAnchor="middle" opacity="0.7">Native multimodal</text>
          <text x="650" y="212" fill={FG} fontSize="10" textAnchor="middle" opacity="0.7">understanding from layer 1</text>
          <text x="650" y="240" fill={AMBER} fontSize="11" fontWeight="700" textAnchor="middle">MULTIMODAL</text>

          {/* Bottom summary */}
          <rect x="100" y="275" width="600" height="32" rx="8" fill={B} fillOpacity="0.1" stroke={B} strokeWidth="1" />
          <text x="400" y="296" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">
            Together: massive capacity + extreme context + native vision — all open-weight
          </text>
        </svg>
      </Diagram>

      <Callout type="insight">
        Llama 4 represents a paradigm shift for open-source AI. Previous Llama models proved that open weights
        could be competitive. Llama 4 proves that the most advanced architectures — MoE, extreme-length context,
        native multimodality — do not have to remain exclusive to closed providers. The architectural innovations
        (iRoPE, shared experts, early fusion) are as important as the scale, because they can be adopted by
        the entire open-source ecosystem.
      </Callout>

      <SimpleExplain>
        <p><strong>The big picture:</strong> Llama 4 combines three innovations that each solve a different bottleneck. MoE solves the cost bottleneck (big model, small compute). iRoPE solves the context bottleneck (10M tokens without quality collapse). Early fusion solves the multimodal bottleneck (native vision, not bolted-on). Together, they produce an open-weight model family that competes with the best closed models while being dramatically more accessible.</p>
      </SimpleExplain>
    </>
  );
}
