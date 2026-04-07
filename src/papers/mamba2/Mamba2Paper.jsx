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

/* --- colour tokens --- */
const P  = '#8b5cf6';    // primary purple (paper accent)
const P2 = '#a78bfa';    // lighter purple
const P3 = '#7c3aed';    // darker purple
const BG = '#0a0f1e';    // deep navy for SVGs
const FG = '#e2e8f0';    // light text in SVGs
const GRAY  = '#94a3b8';
const GREEN = '#22c55e';
const AMBER = '#f59e0b';
const RED   = '#ef4444';
const CYAN  = '#06b6d4';
const BLUE  = '#3b82f6';

export default function Mamba2Paper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHY MAMBA?
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="01"
        title="Why Mamba? The Transformer Bottleneck"
        subtitle="Attention is powerful but O(N^2) in sequence length -- can we do better?"
        color={P}
      />

      <Prose>
        <p>
          The <H tip="Transformer = the dominant sequence model architecture since 2017 ('Attention Is All You Need'). Uses self-attention to relate every token to every other token in parallel. Powers GPT, Claude, Llama, and virtually all modern LLMs." color={P}>Transformer</H> has
          dominated sequence modeling since 2017, and for good reason: <H tip="Self-attention = the mechanism where each token computes a weighted combination of all other tokens' values. The weights (attention scores) are derived from query-key dot products. This lets the model learn arbitrary dependencies between any pair of positions." color={P}>self-attention</H> can
          model arbitrary dependencies between any pair of tokens. But this power comes at a steep price:
          computing attention requires comparing <strong>every token to every other token</strong>, giving
          it <H tip="O(N^2) complexity = quadratic scaling. If you double the sequence length N, the compute and memory for attention quadruples. At N=1K this is fine. At N=100K it becomes a serious bottleneck. At N=1M it is prohibitive with standard attention." color={RED}>O(N^2) time and memory complexity</H> in
          the sequence length N.
        </p>
        <p>
          For short sequences (a few thousand tokens), this is manageable. But as we push toward
          longer contexts -- <H tip="Long-context use cases = applications requiring processing of very long sequences: entire codebases (100K+ tokens), book-length documents, multi-turn conversations with full history, genomic sequences (billions of base pairs), long-form audio/video. All are bottlenecked by quadratic attention." color={AMBER}>full codebases, books, genomic sequences</H> -- the
          quadratic cost becomes a wall. A 100K-token sequence requires 10 billion attention score computations
          per layer. And at inference time, generating each new token requires attending to the entire
          past context via the <H tip="KV cache = key-value cache. During autoregressive generation, the model caches the K and V projections of all past tokens so they are not recomputed. The cache grows linearly with sequence length and must be stored in GPU memory, creating a memory bottleneck for long sequences." color={RED}>KV cache</H>,
          which grows linearly and consumes precious GPU memory.
        </p>
        <p>
          This is the motivation behind <H tip="State Space Models (SSMs) = a family of sequence models inspired by continuous-time dynamical systems. They map an input sequence to an output sequence through a hidden state that evolves over time via learned matrices A, B, C. The key advantage: they can be computed as either a recurrence (O(N)) or a convolution (O(N log N))." color={P}>State Space Models (SSMs)</H>: what if we could build a sequence
          model with <strong>O(N) complexity</strong> that matches Transformer quality? <H tip="Mamba = a selective state space model introduced by Gu and Dao (December 2023). Its key innovation: making the SSM parameters (B, C, and discretization step) input-dependent, allowing the model to selectively remember or forget information based on content. Matched Transformer quality at up to 1B parameters." color={P}>Mamba</H> (2023)
          showed this was possible. <H tip="Mamba-2 = the sequel by Dao and Gu (May 2024). Its core contribution is proving that SSMs and a form of structured attention are mathematically equivalent ('State Space Duality'). This theoretical insight leads to a faster, simpler architecture with multi-head SSM that can leverage matrix multiplication hardware." color={P}>Mamba-2</H> (2024)
          goes further by proving that SSMs and attention are <strong>two sides of the same coin</strong>.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: 'O(N^2)', unit: '', label: 'Transformer Attention', color: RED },
          { value: 'O(N)', unit: '', label: 'SSM / Mamba Inference', color: GREEN },
          { value: '2-8x', unit: '', label: 'Speed-up vs Transformer', color: P },
          { value: '=', unit: '', label: 'Matching Quality', color: CYAN },
        ]}
      />

      <SimpleExplain>
        <p><strong>What this means in plain language:</strong> Imagine reading a book. A Transformer reads by cross-referencing every sentence with every other sentence on every page -- thorough but exhausting. An SSM reads like a human: it maintains a running mental summary (the hidden state) and updates it as it reads each sentence. At the end, the summary captures what mattered. Mamba-2 proves that these two reading strategies are mathematically equivalent under the right conditions -- and the SSM strategy is much faster.</p>
      </SimpleExplain>

      <Diagram caption="The quadratic wall: attention cost grows as N^2, making long sequences prohibitively expensive">
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="m2-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GRAY} />
            </marker>
            <linearGradient id="m2-quad-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={RED} stopOpacity="0.05" />
              <stop offset="100%" stopColor={RED} stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <rect width="800" height="400" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">COMPUTE COST vs SEQUENCE LENGTH</text>

          {/* Axes */}
          <line x1="100" y1="350" x2="720" y2="350" stroke={GRAY} strokeWidth="1.5" markerEnd="url(#m2-arr)" />
          <line x1="100" y1="350" x2="100" y2="50" stroke={GRAY} strokeWidth="1.5" markerEnd="url(#m2-arr)" />
          <text x="420" y="385" fill={GRAY} fontSize="12" textAnchor="middle">Sequence Length (N)</text>
          <text x="55" y="200" fill={GRAY} fontSize="12" textAnchor="middle" transform="rotate(-90,55,200)">Compute Cost</text>

          {/* X-axis labels */}
          {['1K', '4K', '16K', '64K', '256K'].map((label, i) => (
            <text key={i} x={160 + i * 130} y={368} fill={GRAY} fontSize="10" textAnchor="middle">{label}</text>
          ))}

          {/* O(N^2) curve - Transformer */}
          <path
            d="M 160,340 Q 290,335 350,310 Q 420,270 460,210 Q 520,110 580,65"
            fill="none" stroke={RED} strokeWidth="2.5"
          />
          <text x="590" y="60" fill={RED} fontSize="12" fontWeight="700">O(N^2) Attention</text>

          {/* Shaded area under quadratic */}
          <path
            d="M 160,340 Q 290,335 350,310 Q 420,270 460,210 Q 520,110 580,65 L 580,350 Z"
            fill="url(#m2-quad-grad)"
          />

          {/* O(N) line - SSM */}
          <line x1="160" y1="340" x2="680" y2="285" stroke={GREEN} strokeWidth="2.5" />
          <text x="690" y="282" fill={GREEN} fontSize="12" fontWeight="700">O(N) SSM</text>

          {/* Gap annotation */}
          <line x1="500" y1="155" x2="500" y2="305" stroke={P} strokeWidth="1.5" strokeDasharray="4 3" />
          <rect x="505" y="210" width="110" height="30" rx="6" fill={P} fillOpacity="0.15" stroke={P} strokeWidth="1" />
          <text x="560" y="230" fill={P2} fontSize="11" fontWeight="700" textAnchor="middle">Massive gap!</text>

          {/* KV cache annotation */}
          <rect x="120" y="55" width="200" height="50" rx="8" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="1" />
          <text x="220" y="75" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle">KV Cache: O(N) memory</text>
          <text x="220" y="93" fill={GRAY} fontSize="10" textAnchor="middle">per layer, per head</text>

          {/* SSM state annotation */}
          <rect x="120" y="115" width="200" height="50" rx="8" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1" />
          <text x="220" y="135" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">SSM State: O(1) memory</text>
          <text x="220" y="153" fill={GRAY} fontSize="10" textAnchor="middle">fixed-size hidden state</text>

          {/* Legend */}
          <rect x="600" y="340" width="10" height="10" rx="2" fill={RED} fillOpacity="0.7" />
          <text x="616" y="349" fill={GRAY} fontSize="10">Transformer</text>
          <rect x="600" y="358" width="10" height="10" rx="2" fill={GREEN} fillOpacity="0.7" />
          <text x="616" y="367" fill={GRAY} fontSize="10">SSM (Mamba)</text>
        </svg>
      </Diagram>

      <Callout type="key">
        The core challenge: Transformers achieve state-of-the-art quality via attention, but attention scales as
        O(N^2). SSMs offer O(N) scaling, but historically could not match Transformer quality because their
        fixed parameters could not selectively focus on relevant tokens. Mamba solved the quality gap with
        <H tip="Selective scan = Mamba's key innovation. Instead of using fixed (input-independent) A, B, C matrices like prior SSMs, Mamba makes B, C, and the discretization step Delta functions of each input token. This lets the model learn WHAT to remember and what to forget -- like a selective attention mechanism." color={P}> selective scan</H>. Mamba-2 explains <em>why</em> it
        works: selective SSMs are secretly performing a structured form of attention.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — SSM BASICS
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="02"
        title="SSM Basics -- The State Space Formulation"
        subtitle="How A, B, C, D matrices define a linear dynamical system for sequence modeling"
        color={P}
      />

      <Prose>
        <p>
          A <H tip="State Space Model (SSM) = a mathematical framework originally from control theory. It describes how a system evolves over time via a hidden state. The continuous-time version uses differential equations; the discrete-time version uses recurrence relations. When applied to sequence modeling, the input is a token embedding and the output is a contextualized representation." color={P}>State Space Model</H> maps
          an input sequence to an output sequence through a <H tip="Hidden state h(t) = the internal memory of the SSM at time t. It is a vector of dimension N (the state size, typically 16-64). The hidden state accumulates information from past inputs and determines the output. Unlike a Transformer's KV cache that grows with sequence length, the SSM state has fixed size." color={P}>hidden state</H> that
          evolves over time. In continuous time, it is defined by four matrices:
        </p>
        <p>
          <H tip="A matrix (state transition) = an N x N matrix that controls how the hidden state evolves from one step to the next. It determines the 'memory' of the system -- how quickly past information decays. In structured SSMs (S4, Mamba), A is initialized as a diagonal matrix for stability and efficiency." color={P}>A</H> controls
          how the state evolves (the dynamics), <H tip="B matrix (input projection) = an N x 1 matrix (per input dimension) that projects the input into the hidden state space. It controls how much each input token influences the hidden state. In Mamba, B is input-dependent -- different tokens project differently into the state." color={P}>B</H> projects
          the input into the state, <H tip="C matrix (output projection) = a 1 x N matrix that reads out the hidden state to produce the output. It determines which aspects of the accumulated state are relevant for the current output. In Mamba, C is also input-dependent." color={P}>C</H> reads
          from the state to produce the output, and <H tip="D matrix (skip connection) = a scalar or diagonal matrix that provides a direct input-to-output connection, bypassing the state entirely. Analogous to a residual connection. In practice, often set to a learned scalar." color={GRAY}>D</H> provides
          a direct skip connection from input to output.
        </p>
        <p>
          To use an SSM on discrete sequences (tokens), we <H tip="Discretization = converting the continuous-time SSM into a discrete-time recurrence. The continuous parameters (A, B) are transformed using a discretization rule (zero-order hold, bilinear, etc.) and a step size Delta. The step size controls the 'resolution' -- how much continuous time passes between discrete tokens." color={AMBER}>discretize</H> it
          using a step size <H tip="Delta (discretization step) = a scalar that controls how much 'continuous time' passes between discrete tokens. Large Delta means coarse temporal resolution (state forgets quickly). Small Delta means fine resolution (state retains more). In Mamba, Delta is input-dependent -- the model learns to control its own temporal resolution per token." color={AMBER}>Delta</H>,
          transforming the continuous matrices into discrete versions that can be applied as a simple recurrence.
        </p>
      </Prose>

      <FormulaSteps
        label="From Continuous to Discrete SSM"
        color={P}
        steps={[
          {
            note: 'Continuous-time SSM: a linear ODE governing how the hidden state h(t) evolves with input x(t) and produces output y(t).',
            math: "h'(t) = A \\cdot h(t) + B \\cdot x(t), \\quad y(t) = C \\cdot h(t) + D \\cdot x(t)",
          },
          {
            note: 'Discretize using zero-order hold (ZOH) with step size Delta. This converts the continuous A and B into their discrete counterparts.',
            math: "\\bar{A} = \\exp(\\Delta \\cdot A), \\quad \\bar{B} = (\\Delta \\cdot A)^{-1}(\\exp(\\Delta \\cdot A) - I) \\cdot \\Delta \\cdot B",
          },
          {
            note: 'The discrete recurrence: at each timestep k, update the hidden state and compute the output. This is O(N) per step, O(TN) total for T timesteps.',
            math: "h_k = \\bar{A} \\cdot h_{k-1} + \\bar{B} \\cdot x_k, \\quad y_k = C \\cdot h_k + D \\cdot x_k",
          },
        ]}
        symbols={[
          { symbol: 'h(t), h_k', meaning: 'Hidden state (continuous / discrete), dimension N' },
          { symbol: 'A', meaning: 'State transition matrix (N x N), controls memory dynamics' },
          { symbol: 'B', meaning: 'Input projection matrix, maps input into state space' },
          { symbol: 'C', meaning: 'Output projection matrix, reads from state to produce output' },
          { symbol: 'D', meaning: 'Skip connection (direct input-to-output pass-through)' },
          { symbol: 'Delta', meaning: 'Discretization step size, controls temporal resolution' },
        ]}
      />

      <Diagram caption="SSM recurrence: the hidden state accumulates information from past inputs at each step">
        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="m2-ssm-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={P} />
            </marker>
            <marker id="m2-ssm-arr-g" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
            </marker>
            <marker id="m2-ssm-arr-c" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={CYAN} />
            </marker>
          </defs>
          <rect width="800" height="340" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">SSM RECURRENCE — HIDDEN STATE EVOLUTION</text>

          {/* Time steps */}
          {[0, 1, 2, 3, 4].map((t) => {
            const cx = 120 + t * 150;
            return (
              <g key={t}>
                {/* Input x_k */}
                <rect x={cx - 30} y={55} width="60" height="30" rx="6" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="1" />
                <text x={cx} y={74} fill={CYAN} fontSize="12" fontWeight="600" textAnchor="middle">x_{t === 4 ? 'T' : String(t + 1)}</text>

                {/* Arrow down to state */}
                <line x1={cx} y1={85} x2={cx} y2={120} stroke={CYAN} strokeWidth="1.5" markerEnd="url(#m2-ssm-arr-c)" />
                <text x={cx + 14} y={108} fill={GRAY} fontSize="9">B</text>

                {/* Hidden state h_k */}
                <rect x={cx - 35} y={125} width="70" height="50" rx="10" fill={P} fillOpacity="0.15" stroke={P} strokeWidth="2" />
                <text x={cx} y={148} fill={P2} fontSize="13" fontWeight="700" textAnchor="middle">h_{t === 4 ? 'T' : String(t + 1)}</text>
                <text x={cx} y={165} fill={GRAY} fontSize="9" textAnchor="middle">state</text>

                {/* Arrow from state to output */}
                <line x1={cx} y1={175} x2={cx} y2={210} stroke={GREEN} strokeWidth="1.5" markerEnd="url(#m2-ssm-arr-g)" />
                <text x={cx + 14} y={198} fill={GRAY} fontSize="9">C</text>

                {/* Output y_k */}
                <rect x={cx - 30} y={215} width="60" height="30" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
                <text x={cx} y={234} fill={GREEN} fontSize="12" fontWeight="600" textAnchor="middle">y_{t === 4 ? 'T' : String(t + 1)}</text>

                {/* Horizontal arrow to next state (A transition) */}
                {t < 4 && (
                  <>
                    <line x1={cx + 35} y1={150} x2={cx + 115} y2={150} stroke={P} strokeWidth="2" markerEnd="url(#m2-ssm-arr)" />
                    <text x={cx + 75} y={142} fill={P2} fontSize="11" fontWeight="700" textAnchor="middle">A</text>
                  </>
                )}
              </g>
            );
          })}

          {/* Skip connection D */}
          <line x1="120" y1="85" x2="120" y2="210" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
          <text x="108" y="160" fill={GRAY} fontSize="9" textAnchor="end">D</text>

          {/* Labels */}
          <text x="400" y="275" fill={FG} fontSize="11" textAnchor="middle" opacity="0.8">
            At each step: state = A * prev_state + B * input, output = C * state + D * input
          </text>
          <text x="400" y="295" fill={P2} fontSize="11" fontWeight="600" textAnchor="middle">
            Fixed-size state (N dimensions) -- O(1) memory per step, O(T) total for T tokens
          </text>

          {/* Legend */}
          <rect x="100" y="315" width="10" height="10" rx="2" fill={CYAN} fillOpacity="0.5" />
          <text x="116" y="324" fill={GRAY} fontSize="10">Input tokens</text>
          <rect x="260" y="315" width="10" height="10" rx="2" fill={P} fillOpacity="0.5" />
          <text x="276" y="324" fill={GRAY} fontSize="10">Hidden state</text>
          <rect x="420" y="315" width="10" height="10" rx="2" fill={GREEN} fillOpacity="0.5" />
          <text x="436" y="324" fill={GRAY} fontSize="10">Output</text>
          <text x="580" y="324" fill={GRAY} fontSize="10">A = state transition, B = input proj, C = output proj</text>
        </svg>
      </Diagram>

      <ConceptCard title="Why Diagonal A? The S4 Insight" color={P} defaultOpen={false}>
        <Prose>
          <p>
            A general N x N state matrix A would make the recurrence expensive.
            The <H tip="S4 (Structured State Spaces for Sequence Modeling) = a foundational paper by Gu et al. (2021) that made SSMs practical. The key insight: if A is initialized as a diagonal matrix with specific structure (HiPPO initialization), the SSM can model long-range dependencies and be computed efficiently as a convolution." color={P}>S4 model</H> showed
            that restricting A to be <H tip="Diagonal state matrix = constraining A to be a diagonal matrix (only entries on the main diagonal are nonzero). This reduces the matrix-vector product A * h from O(N^2) to O(N) operations. Each state dimension evolves independently, controlled by its own decay rate." color={P}>diagonal</H> (each
            state dimension evolves independently) retains strong modeling power while making computation
            efficient. With diagonal A, the recurrence becomes N independent scalar recurrences that can
            run in parallel. Mamba and Mamba-2 both use this structure.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="insight">
        The dual nature of SSMs is already visible here: the recurrence view gives O(N) sequential computation
        (great for inference), but the same system can be <H tip="Convolution view of SSMs = when A, B, C are fixed (not input-dependent), the SSM output can be written as a convolution of the input with a kernel derived from C * A^k * B. This allows computing the entire output sequence in O(N log N) using FFT. However, this only works for linear time-invariant (non-selective) SSMs." color={CYAN}>unrolled as a convolution</H> for
        O(N log N) parallel training. Mamba-2 reveals a third view: as structured matrix multiplication.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — SELECTIVE SCAN
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="03"
        title="Selective Scan -- Mamba's Key Innovation"
        subtitle="Making SSM parameters input-dependent so the model can choose what to remember"
        color={P}
      />

      <Prose>
        <p>
          Traditional SSMs (like <H tip="S4 = Structured State Spaces for Sequence Modeling. Uses fixed (input-independent) A, B, C matrices. Because the parameters do not change with the input, S4 is a Linear Time-Invariant (LTI) system. LTI systems can be computed as convolutions, but they cannot selectively attend to specific tokens -- they treat all inputs equally." color={GRAY}>S4</H>) use
          <strong>fixed parameters</strong>: the same A, B, C matrices process every token identically.
          This is like a filter that treats every input the same way -- it cannot <em>choose</em> to
          pay more attention to important tokens and ignore irrelevant ones. This is the fundamental
          limitation that prevented SSMs from matching Transformers.
        </p>
        <p>
          <H tip="Selective scan (S6) = Mamba's core mechanism. The parameters B, C, and the step size Delta are computed as functions of each input token (via learned linear projections). This makes the SSM input-dependent (time-varying): at each timestep, the model uses different B, C, Delta values based on what it sees. This is what enables content-based reasoning." color={P}>Selective scan</H> (introduced
          in Mamba) breaks this limitation by making the parameters <strong>input-dependent</strong>:
          B, C, and Delta are computed from each input token via learned projections. This means at
          each timestep, the model uses <em>different</em> parameters tuned to the current input.
          The model can now <H tip="Selective memory = the ability to choose which information to store in the hidden state and which to discard. A large Delta causes the state to 'forget' (exponential decay in A), while a small Delta preserves the existing state. By making Delta input-dependent, the model learns a content-based gating mechanism." color={P}>selectively remember important tokens</H> and
          forget irrelevant ones.
        </p>
        <p>
          The tradeoff: making parameters input-dependent breaks the <H tip="Linear Time-Invariant (LTI) = a system whose parameters do not change over time or with the input. LTI systems enjoy the convolution property: the output is the input convolved with a fixed kernel. Selective SSMs are NOT LTI because their parameters change at every step, so the convolution shortcut does not apply." color={AMBER}>LTI property</H>,
          so you can no longer use the fast convolution trick for training. Mamba compensates with
          a <H tip="Hardware-aware scan = Mamba's efficient CUDA implementation of the selective scan. It processes the recurrence in chunks that fit in GPU SRAM (fast on-chip memory), minimizing slow HBM (off-chip memory) accesses. This is the engineering innovation that makes selective scan fast despite being inherently sequential." color={AMBER}>hardware-aware parallel scan</H> algorithm
          on GPU. Mamba-2 takes this further by revealing that selective SSMs can actually be computed
          as structured matrix multiplications -- unlocking even faster training.
        </p>
      </Prose>

      <Diagram caption="Selective scan vs standard scan: input-dependent parameters enable content-based filtering">
        <svg viewBox="0 0 800 440" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="m2-sel-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={P} />
            </marker>
          </defs>
          <rect width="800" height="440" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">STANDARD SCAN vs SELECTIVE SCAN</text>

          {/* Left side: Standard (fixed params) */}
          <rect x="30" y="50" width="360" height="170" rx="10" fill={GRAY} fillOpacity="0.05" stroke={GRAY} strokeWidth="1" />
          <text x="210" y="72" fill={GRAY} fontSize="13" fontWeight="700" textAnchor="middle">Standard SSM (S4) -- Fixed Parameters</text>

          {['the', 'cat', 'sat', 'on', 'mat'].map((tok, i) => {
            const x = 60 + i * 65;
            return (
              <g key={`std-${i}`}>
                <rect x={x} y={85} width="50" height="24" rx="5" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="0.8" />
                <text x={x + 25} y={101} fill={GRAY} fontSize="10" fontWeight="500" textAnchor="middle">{tok}</text>
                <rect x={x + 5} y={120} width="40" height="18" rx="4" fill={GRAY} fillOpacity="0.15" stroke={GRAY} strokeWidth="0.5" />
                <text x={x + 25} y={133} fill={GRAY} fontSize="8" textAnchor="middle">same B,C</text>
                <rect x={x + 8} y={150} width="34" height="18" rx="4" fill={GRAY} fillOpacity="0.1" />
                <text x={x + 25} y={163} fill={GRAY} fontSize="8" textAnchor="middle">same Delta</text>
              </g>
            );
          })}
          <text x="210" y="195" fill={RED} fontSize="10" fontWeight="600" textAnchor="middle">All tokens processed identically -- cannot focus</text>
          <text x="210" y="210" fill={GRAY} fontSize="9" textAnchor="middle">LTI: can use convolution (fast) but no selectivity</text>

          {/* Right side: Selective (input-dependent params) */}
          <rect x="410" y="50" width="370" height="170" rx="10" fill={P} fillOpacity="0.06" stroke={P} strokeWidth="1.5" />
          <text x="595" y="72" fill={P2} fontSize="13" fontWeight="700" textAnchor="middle">Selective SSM (Mamba) -- Input-Dependent</text>

          {['the', 'cat', 'sat', 'on', 'mat'].map((tok, i) => {
            const x = 435 + i * 65;
            const important = i === 1 || i === 4; // cat and mat are content words
            const col = important ? P : P;
            const opacity = important ? 0.3 : 0.1;
            return (
              <g key={`sel-${i}`}>
                <rect x={x} y={85} width="50" height="24" rx="5" fill={col} fillOpacity={opacity} stroke={col} strokeWidth={important ? 1.5 : 0.8} />
                <text x={x + 25} y={101} fill={important ? P2 : GRAY} fontSize="10" fontWeight={important ? '700' : '500'} textAnchor="middle">{tok}</text>
                <rect x={x + 5} y={120} width="40" height="18" rx="4" fill={col} fillOpacity={important ? 0.25 : 0.08} stroke={col} strokeWidth="0.5" />
                <text x={x + 25} y={133} fill={important ? P2 : GRAY} fontSize="8" textAnchor="middle">{important ? 'HIGH B,C' : 'low B,C'}</text>
                <rect x={x + 8} y={150} width="34" height="18" rx="4" fill={important ? GREEN : AMBER} fillOpacity={0.2} />
                <text x={x + 25} y={163} fill={important ? GREEN : AMBER} fontSize="8" textAnchor="middle">{important ? 'small Delta' : 'large Delta'}</text>
              </g>
            );
          })}
          <text x="595" y="195" fill={GREEN} fontSize="10" fontWeight="600" textAnchor="middle">Content words get strong B,C; function words get weak</text>
          <text x="595" y="210" fill={P2} fontSize="9" textAnchor="middle">Time-varying: breaks convolution, needs parallel scan</text>

          {/* Bottom: The Delta mechanism */}
          <rect x="60" y="250" width="680" height="160" rx="10" fill={P} fillOpacity="0.04" stroke={P} strokeWidth="1" />
          <text x="400" y="272" fill={P2} fontSize="13" fontWeight="700" textAnchor="middle">HOW DELTA CONTROLS SELECTIVITY</text>

          {/* Small Delta */}
          <rect x="100" y="290" width="280" height="100" rx="8" fill={GREEN} fillOpacity="0.06" stroke={GREEN} strokeWidth="1" />
          <text x="240" y="312" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">Small Delta (retain state)</text>
          <text x="240" y="330" fill={FG} fontSize="10" textAnchor="middle">exp(Delta * A) is close to I (identity)</text>
          <text x="240" y="348" fill={FG} fontSize="10" textAnchor="middle">State barely changes -- memory preserved</text>
          <text x="240" y="370" fill={GREEN} fontSize="10" fontWeight="600" textAnchor="middle">"Keep what you have, this token is noise"</text>

          {/* Large Delta */}
          <rect x="420" y="290" width="280" height="100" rx="8" fill={AMBER} fillOpacity="0.06" stroke={AMBER} strokeWidth="1" />
          <text x="560" y="312" fill={AMBER} fontSize="12" fontWeight="700" textAnchor="middle">Large Delta (reset state)</text>
          <text x="560" y="330" fill={FG} fontSize="10" textAnchor="middle">exp(Delta * A) decays toward 0</text>
          <text x="560" y="348" fill={FG} fontSize="10" textAnchor="middle">State is flushed -- old info forgotten</text>
          <text x="560" y="370" fill={AMBER} fontSize="10" fontWeight="600" textAnchor="middle">"Forget the past, this token matters"</text>

          <text x="400" y="425" fill={P2} fontSize="11" fontWeight="600" textAnchor="middle">
            By learning to control Delta per-token, Mamba learns WHAT to remember -- like a learned attention mask
          </text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="Selective Scan Mechanism"
        color={P}
        steps={[
          {
            note: 'Project input-dependent parameters from the current token. B and C determine HOW the input affects the state and output. Delta determines HOW MUCH.',
            math: "B_k = \\text{Linear}_B(x_k), \\quad C_k = \\text{Linear}_C(x_k), \\quad \\Delta_k = \\text{softplus}(\\text{Linear}_\\Delta(x_k))",
          },
          {
            note: 'Discretize using the input-dependent step size. Note: A is still fixed (learned but shared across all tokens) -- only B, C, Delta vary.',
            math: "\\bar{A}_k = \\exp(\\Delta_k \\cdot A), \\quad \\bar{B}_k = \\Delta_k \\cdot B_k",
          },
          {
            note: 'Apply the selective recurrence. Each step uses different parameters, so the model processes each token differently based on its content.',
            math: "h_k = \\bar{A}_k \\cdot h_{k-1} + \\bar{B}_k \\cdot x_k, \\quad y_k = C_k \\cdot h_k",
          },
        ]}
        symbols={[
          { symbol: 'x_k', meaning: 'Input token embedding at position k' },
          { symbol: 'B_k, C_k', meaning: 'Input-dependent projection matrices (different per token)' },
          { symbol: 'Delta_k', meaning: 'Input-dependent step size (controls forgetting)' },
          { symbol: 'softplus', meaning: 'Smooth ReLU: log(1 + exp(x)), ensures Delta > 0' },
          { symbol: 'A', meaning: 'Fixed diagonal state matrix (shared across tokens)' },
        ]}
      />

      <VisualCompare
        leftLabel="Fixed SSM (S4 / S5)"
        rightLabel="Selective SSM (Mamba / Mamba-2)"
        leftColor={GRAY}
        rightColor={P}
        left={<>
          <p><strong>B, C, Delta are fixed</strong> for all tokens</p>
          <p>Every token is processed with the same filter</p>
          <p>Cannot focus on important tokens</p>
          <p>Linear Time-Invariant -- supports convolution</p>
          <p style={{color: GRAY}}>Fast training but weak on content reasoning</p>
        </>}
        right={<>
          <p><strong>B, C, Delta computed from each input</strong></p>
          <p>Each token gets custom processing parameters</p>
          <p>Learns to selectively remember and forget</p>
          <p>Time-varying -- requires parallel scan</p>
          <p style={{color: GREEN}}>Matches Transformer quality on language tasks</p>
        </>}
        caption="Input-dependent parameters are the key innovation that closes the quality gap between SSMs and Transformers"
      />

      <Callout type="key">
        Selective scan is the bridge between SSMs and attention. By making parameters input-dependent,
        Mamba effectively learns a <strong>content-based gating mechanism</strong>: the model decides what
        to store in its finite state based on what each token <em>is</em>, not just where it <em>appears</em>.
        This is conceptually similar to how attention selectively weighs tokens -- and Mamba-2 shows this
        similarity is not just conceptual but <strong>mathematical</strong>.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — THE SSD FRAMEWORK
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="04"
        title="The SSD Framework -- State Space Duality"
        subtitle="The paper's core insight: SSMs = structured masked attention. Two sides of the same coin."
        color={P}
      />

      <Prose>
        <p>
          This is the central contribution of the Mamba-2 paper and one of the most elegant results
          in modern deep learning. <H tip="State Space Duality (SSD) = the theoretical framework proving that selective state space models and a form of structured attention compute the same output. The SSM recurrence (sequential) and a quadratic attention-like computation (parallel) are dual representations of the same underlying operator. You can switch between them depending on which is faster." color={P}>State Space Duality (SSD)</H> proves
          that a selective SSM and a specific form of <H tip="Structured masked attention = attention where the attention matrix is not arbitrary but has a specific structure: it is the product of low-rank terms (from B, C projections) masked by a causal decay matrix (from the A state transition). This structure means the attention matrix has rank at most N (the state dimension), not T (the sequence length)." color={P}>structured masked attention</H> compute
          the <strong>exact same output</strong>.
        </p>
        <p>
          Here is the key insight: if you unroll the SSM recurrence for all timesteps and write
          the output as a matrix-vector product, you get something that looks exactly like attention -- but
          with a <H tip="Semiseparable matrix = a structured matrix where every submatrix extracted from the lower-triangular part has rank at most N (the state dimension). The SSM's output matrix M has this property because entry M_{jk} can be written as C_j * A^{j-k} * B_k, which is a product of three rank-N terms. This is the mathematical link between SSMs and attention." color={P}>structured attention matrix</H>.
          Specifically, the attention matrix M has entry M[j,k] = C_j * A^(j-k) * B_k for j &gt; k (and 0 for j &lt; k,
          enforcing causality). This matrix is <H tip="Low-rank structure = the attention matrix M has rank at most N (the SSM state dimension), not T (the sequence length). Since N is typically 16-64 while T can be thousands or millions, this is an enormous compression. This low-rank structure is what makes the SSM computable in O(TN) instead of O(T^2)." color={CYAN}>low-rank</H> (rank
          at most N, the state size) and <H tip="Causal = the matrix is lower-triangular (or masked to be), meaning position j can only attend to positions k <= j. This is the same causality constraint used in autoregressive Transformers. In the SSM, causality comes naturally from the recurrence structure." color={GRAY}>causal</H>.
        </p>
        <p>
          This duality means you have <strong>two equivalent ways</strong> to compute the same thing:
          (1) the <H tip="Recurrent mode = computing the SSM output sequentially, one step at a time. Each step is O(N) where N is the state dimension. Total cost: O(TN) for T timesteps. This is optimal for autoregressive generation where you process one token at a time." color={GREEN}>recurrent mode</H> (sequential,
          O(TN) -- fast for inference) and (2) the <H tip="Attention mode / quadratic mode = computing the SSM output by materializing the full T x T attention matrix M and multiplying it by the values. Each entry of M is computed as C_j * A^{j-k} * B_k. Cost: O(T^2 N). This is faster during training because it maps to optimized matrix multiplication hardware on GPUs." color={BLUE}>attention mode</H> (parallel,
          O(T^2 N) but GPU-friendly -- fast for training). Mamba-2 introduces a third
          <H tip="Chunk-wise mode = a hybrid algorithm that splits the sequence into chunks of size Q. Within each chunk, it uses the quadratic (attention) mode. Between chunks, it passes the SSM state (recurrent mode). This gives O(T * Q * N) cost -- quadratic within chunks but linear across chunks. By choosing Q to match GPU SRAM size, this is the fastest mode in practice." color={AMBER}>chunk-wise</H> mode that combines both.
        </p>
      </Prose>

      <FormulaBlock
        math="y = M \cdot x \quad \text{where} \quad M_{jk} = \begin{cases} C_j^\top \bar{A}^{j-k} B_k & \text{if } j \geq k \\ 0 & \text{otherwise} \end{cases}"
        label="The SSD dual form: the SSM output is a matrix-vector product with a structured (semiseparable) attention matrix M"
        color={P}
        symbols={[
          { symbol: 'M', meaning: 'The structured attention matrix (T x T), semiseparable with rank <= N' },
          { symbol: 'C_j, B_k', meaning: 'Output/input projections at positions j and k (input-dependent)' },
          { symbol: 'A^{j-k}', meaning: 'State transition raised to the (j-k) power -- exponential decay with distance' },
          { symbol: 'x', meaning: 'Input sequence vector' },
          { symbol: 'y', meaning: 'Output sequence vector (same result as SSM recurrence)' },
        ]}
      />

      <Diagram caption="State Space Duality: the same computation has three equivalent forms with different speed tradeoffs">
        <svg viewBox="0 0 800 480" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="m2-ssd-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={P} />
            </marker>
            <linearGradient id="m2-duality-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.15" />
              <stop offset="50%" stopColor={P} stopOpacity="0.05" />
              <stop offset="100%" stopColor={BLUE} stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <rect width="800" height="480" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">STATE SPACE DUALITY (SSD) -- THREE EQUIVALENT VIEWS</text>

          {/* Duality gradient background */}
          <rect x="30" y="45" width="740" height="300" rx="10" fill="url(#m2-duality-grad)" />

          {/* Left: Recurrent Mode */}
          <rect x="50" y="60" width="210" height="260" rx="10" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1.5" />
          <text x="155" y="85" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">RECURRENT MODE</text>
          <text x="155" y="102" fill={GRAY} fontSize="10" textAnchor="middle">(SSM view)</text>

          {/* Mini recurrence diagram */}
          {[0, 1, 2].map((i) => {
            const cy = 130 + i * 55;
            return (
              <g key={`rec-${i}`}>
                <circle cx={105} cy={cy} r="16" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
                <text x={105} y={cy + 4} fill={GREEN} fontSize="10" fontWeight="600" textAnchor="middle">h_{i + 1}</text>
                <rect x={150} y={cy - 10} width="36" height="20" rx="4" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="0.8" />
                <text x={168} y={cy + 4} fill={CYAN} fontSize="9" textAnchor="middle">x_{i + 1}</text>
                <rect x={200} y={cy - 10} width="36" height="20" rx="4" fill={GREEN} fillOpacity="0.15" />
                <text x={218} y={cy + 4} fill={GREEN} fontSize="9" textAnchor="middle">y_{i + 1}</text>
                {i < 2 && (
                  <line x1={105} y1={cy + 16} x2={105} y2={cy + 39} stroke={GREEN} strokeWidth="1.5" markerEnd="url(#m2-ssd-arr)" />
                )}
              </g>
            );
          })}
          <text x="155" y="275" fill={FG} fontSize="10" textAnchor="middle">Sequential: O(TN)</text>
          <text x="155" y="293" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">Best for inference</text>
          <text x="155" y="310" fill={GRAY} fontSize="9" textAnchor="middle">one token at a time</text>

          {/* Center: The Duality */}
          <rect x="280" y="60" width="240" height="260" rx="10" fill={P} fillOpacity="0.08" stroke={P} strokeWidth="2" />
          <text x="400" y="85" fill={P2} fontSize="13" fontWeight="700" textAnchor="middle">CHUNK-WISE MODE</text>
          <text x="400" y="102" fill={GRAY} fontSize="10" textAnchor="middle">(Mamba-2 hybrid)</text>

          {/* Chunk visualization */}
          {[0, 1, 2].map((c) => {
            const cy = 125 + c * 62;
            return (
              <g key={`chunk-${c}`}>
                <rect x={300} y={cy} width="80" height="40" rx="6" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1" />
                <text x={340} y={cy + 17} fill={BLUE} fontSize="9" fontWeight="600" textAnchor="middle">Chunk {c + 1}</text>
                <text x={340} y={cy + 32} fill={GRAY} fontSize="8" textAnchor="middle">quadratic</text>
                {c < 2 && (
                  <>
                    <line x1={380} y1={cy + 20} x2={420} y2={cy + 20} stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 2" />
                    <line x1={420} y1={cy + 20} x2={420} y2={cy + 62} stroke={GREEN} strokeWidth="1.5" />
                    <line x1={420} y1={cy + 62} x2={380} y2={cy + 82} stroke={GREEN} strokeWidth="1.5" markerEnd="url(#m2-ssd-arr)" />
                  </>
                )}
                {c < 2 && (
                  <text x={445} y={cy + 45} fill={GREEN} fontSize="8" fontWeight="600">state</text>
                )}
              </g>
            );
          })}
          <text x="400" y="275" fill={FG} fontSize="10" textAnchor="middle">Hybrid: O(T * Q * N)</text>
          <text x="400" y="293" fill={P2} fontSize="11" fontWeight="700" textAnchor="middle">Best in practice</text>
          <text x="400" y="310" fill={GRAY} fontSize="9" textAnchor="middle">GPU-friendly chunks</text>

          {/* Right: Attention Mode */}
          <rect x="540" y="60" width="210" height="260" rx="10" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="1.5" />
          <text x="645" y="85" fill={BLUE} fontSize="13" fontWeight="700" textAnchor="middle">ATTENTION MODE</text>
          <text x="645" y="102" fill={GRAY} fontSize="10" textAnchor="middle">(dual view)</text>

          {/* Mini attention matrix */}
          {[0, 1, 2, 3].map((r) => (
            [0, 1, 2, 3].map((c) => {
              const filled = c <= r;
              return (
                <rect
                  key={`mat-${r}-${c}`}
                  x={580 + c * 32}
                  y={120 + r * 32}
                  width="28" height="28" rx="3"
                  fill={filled ? P : 'transparent'}
                  fillOpacity={filled ? 0.15 + (r - c) * 0.06 : 0}
                  stroke={filled ? P : GRAY}
                  strokeWidth={0.5}
                  strokeOpacity={filled ? 1 : 0.2}
                />
              );
            })
          ))}
          <text x="645" y="268" fill={FG} fontSize="10" textAnchor="middle">Parallel: O(T^2 N)</text>
          <text x="645" y="286" fill={BLUE} fontSize="11" fontWeight="700" textAnchor="middle">Best for training</text>
          <text x="645" y="303" fill={GRAY} fontSize="9" textAnchor="middle">matmul-friendly</text>

          {/* Labels for the matrix */}
          <text x="645" y="115" fill={P2} fontSize="9" fontWeight="600" textAnchor="middle">M = structured attention</text>

          {/* Bidirectional arrows */}
          <line x1="260" y1="180" x2="280" y2="180" stroke={P} strokeWidth="2" />
          <line x1="520" y1="180" x2="540" y2="180" stroke={P} strokeWidth="2" />
          <text x="270" y="195" fill={P2} fontSize="10" fontWeight="600" textAnchor="middle">=</text>
          <text x="530" y="195" fill={P2} fontSize="10" fontWeight="600" textAnchor="middle">=</text>

          {/* Bottom insight */}
          <rect x="80" y="370" width="640" height="90" rx="10" fill={P} fillOpacity="0.08" stroke={P} strokeWidth="1.5" />
          <text x="400" y="395" fill={P2} fontSize="13" fontWeight="700" textAnchor="middle">THE DUALITY</text>
          <text x="400" y="415" fill={FG} fontSize="11" textAnchor="middle">
            All three modes compute the EXACT SAME output y = Mx
          </text>
          <text x="400" y="435" fill={FG} fontSize="11" textAnchor="middle">
            Recurrence = fast sequential | Attention = fast parallel | Chunk = best of both
          </text>
          <text x="400" y="452" fill={GRAY} fontSize="10" textAnchor="middle">
            Use recurrent mode for generation, chunk mode for training -- same model, different algorithms
          </text>
        </svg>
      </Diagram>

      <ConceptCard title="Why Does The Duality Hold? The Semiseparable Structure" color={P} defaultOpen={true}>
        <Prose>
          <p>
            The mathematical reason the duality works is that the SSM's output matrix M is a
            <H tip="Semiseparable matrix = a matrix where every submatrix below the diagonal has bounded rank. For the SSM, each entry M_{jk} = C_j^T A^{j-k} B_k is a product of three terms: an output projection (C_j), an exponential decay (A^{j-k}), and an input projection (B_k). Since these are outer products of N-dimensional vectors, every submatrix has rank at most N." color={P}>semiseparable matrix</H> --
            a specific type of structured matrix where every lower-triangular submatrix has rank at
            most N (the state dimension). This is a well-studied class of matrices with known fast
            algorithms for multiplication.
          </p>
          <p>
            The profound implication: <strong>Transformers use full-rank attention (rank T)</strong> while
            <strong>SSMs use structured attention (rank N, where N is typically 16-64)</strong>. The SSM
            is computing a <em>low-rank approximation</em> of what full attention does. The question becomes:
            is rank N enough to capture the important patterns in language? Mamba and Mamba-2 show that
            <strong>yes, it is</strong> -- at least for models up to 2.7B parameters.
          </p>
        </Prose>
      </ConceptCard>

      <StepFlow
        color={P}
        steps={[
          {
            title: 'Write the SSM recurrence as a matrix equation',
            desc: 'Unroll h_k = A * h_{k-1} + B_k * x_k for all timesteps. Stack the outputs y_k = C_k * h_k into a vector. The result is y = M * x where M is a T x T matrix.',
          },
          {
            title: 'Observe M has semiseparable structure',
            desc: 'Each entry M[j,k] = C_j^T * A^{j-k} * B_k is an outer product of N-dimensional vectors. Any submatrix has rank at most N. This is a structured attention matrix.',
          },
          {
            title: 'This is exactly masked linear attention!',
            desc: 'Compare to attention: softmax(QK^T) * V. If you replace softmax with a causal mask and use B, C as key/value projections, you get the same formula. The A^{j-k} term acts as a position-dependent decay mask.',
          },
          {
            title: 'Choose your compute mode based on the task',
            desc: 'Training: use the attention mode (chunk-wise matmul on GPU). Inference: use the recurrent mode (O(N) per step, no KV cache needed). Same model weights, different algorithms.',
          },
        ]}
      />

      <Callout type="insight">
        The SSD duality is not just a theoretical curiosity -- it has profound practical implications.
        It means SSMs are <strong>not an alternative to attention</strong>; they are a <strong>specific form
        of structured attention</strong> with a built-in compression. This explains why Mamba works so well:
        it is doing attention, just with a low-rank constraint that happens to be sufficient for most
        language patterns. And the constraint gives you O(N) inference for free.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — MAMBA-2 ARCHITECTURE
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="05"
        title="Mamba-2 Architecture"
        subtitle="Multi-head SSM, simplified block design, and tensor parallelism"
        color={P}
      />

      <Prose>
        <p>
          Armed with the SSD framework, Mamba-2 introduces a cleaner architecture than Mamba-1.
          The core idea: since SSMs are equivalent to attention, we can borrow the
          <H tip="Multi-head attention = the Transformer pattern where the model runs multiple attention heads in parallel, each with its own Q, K, V projections. Each head learns different attention patterns. Mamba-2 adopts this: multiple SSM 'heads', each with its own B, C projections but potentially sharing A across heads." color={P}>multi-head</H> pattern
          from Transformers. Mamba-2 uses a <H tip="Multi-head SSM = analogous to multi-head attention. Multiple SSM heads run in parallel, each with independent B and C projections (and optionally different A parameters). The outputs are concatenated. This increases the model's capacity to capture diverse patterns while keeping each head's state small." color={P}>multi-head SSM</H> where
          each head has its own B and C projections, with the state dimension N per head kept small
          (typically 64 or 128) so the total state across all heads is manageable.
        </p>
        <p>
          The Mamba-2 block is also <strong>simpler</strong> than Mamba-1. Mamba-1 used a complex
          gated architecture with separate projections, convolutions, and activations. Mamba-2 strips
          this down to a design that closely mirrors a <H tip="Transformer block = the fundamental repeating unit: LayerNorm -> Attention -> Residual -> LayerNorm -> MLP -> Residual. Mamba-2's block follows a similar pattern: LayerNorm -> Multi-head SSM -> Residual -> LayerNorm -> MLP (or SwiGLU) -> Residual. This similarity is intentional -- it makes Mamba-2 a drop-in Transformer replacement." color={GRAY}>Transformer block</H>,
          making it a near drop-in replacement in existing training frameworks.
        </p>
        <p>
          Crucially, the SSD framework enables <H tip="Tensor Parallelism (TP) = splitting model parameters across multiple GPUs within a single layer. For attention, Q/K/V projections are split across GPUs with an all-reduce after the output projection. Mamba-1 was hard to parallelize because its scan is inherently sequential. Mamba-2's attention-mode equivalent naturally supports TP." color={AMBER}>tensor parallelism</H> for
          multi-GPU training. Mamba-1's hardware-aware scan was difficult to distribute across GPUs,
          but Mamba-2's matrix multiplication form maps directly to standard TP strategies used for
          Transformers.
        </p>
      </Prose>

      <Diagram caption="Mamba-2 block architecture: simplified design with multi-head SSM, close to Transformer layout">
        <svg viewBox="0 0 800 550" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="m2-blk-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={P} />
            </marker>
            <marker id="m2-blk-arr-g" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GRAY} />
            </marker>
          </defs>
          <rect width="800" height="550" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">MAMBA-2 BLOCK ARCHITECTURE</text>

          {/* Input */}
          <rect x="310" y="45" width="180" height="32" rx="6" fill={CYAN} fillOpacity="0.12" stroke={CYAN} strokeWidth="1" />
          <text x="400" y="65" fill={CYAN} fontSize="12" fontWeight="600" textAnchor="middle">Input Tokens (T x D)</text>

          {/* Arrow down */}
          <line x1="400" y1="77" x2="400" y2="95" stroke={P} strokeWidth="1.5" markerEnd="url(#m2-blk-arr)" />

          {/* LayerNorm 1 */}
          <rect x="330" y="98" width="140" height="28" rx="6" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1" />
          <text x="400" y="116" fill={GRAY} fontSize="11" fontWeight="600" textAnchor="middle">RMSNorm</text>

          <line x1="400" y1="126" x2="400" y2="142" stroke={P} strokeWidth="1.5" markerEnd="url(#m2-blk-arr)" />

          {/* Linear Projections */}
          <rect x="240" y="145" width="320" height="40" rx="8" fill={P} fillOpacity="0.1" stroke={P} strokeWidth="1.5" />
          <text x="400" y="165" fill={P2} fontSize="12" fontWeight="700" textAnchor="middle">Linear Projections: X, B, C, Delta</text>
          <text x="400" y="180" fill={GRAY} fontSize="9" textAnchor="middle">Input-dependent SSM parameters (selective)</text>

          <line x1="400" y1="185" x2="400" y2="202" stroke={P} strokeWidth="1.5" markerEnd="url(#m2-blk-arr)" />

          {/* 1D Conv (short) */}
          <rect x="310" y="205" width="180" height="32" rx="6" fill={CYAN} fillOpacity="0.1" stroke={CYAN} strokeWidth="1" />
          <text x="400" y="225" fill={CYAN} fontSize="11" fontWeight="600" textAnchor="middle">Short Conv1D (kernel=4)</text>

          <line x1="400" y1="237" x2="400" y2="252" stroke={P} strokeWidth="1.5" markerEnd="url(#m2-blk-arr)" />

          {/* Multi-head SSM block */}
          <rect x="200" y="255" width="400" height="100" rx="10" fill={P} fillOpacity="0.12" stroke={P} strokeWidth="2" />
          <text x="400" y="278" fill={P2} fontSize="13" fontWeight="800" textAnchor="middle">Multi-Head SSM (SSD Kernel)</text>

          {/* Individual heads */}
          {[0, 1, 2, 3].map((h) => {
            const hx = 235 + h * 90;
            return (
              <g key={`head-${h}`}>
                <rect x={hx} y={290} width="72" height="48" rx="6" fill={P} fillOpacity={0.08 + h * 0.04} stroke={P2} strokeWidth="1" />
                <text x={hx + 36} y={308} fill={P2} fontSize="10" fontWeight="600" textAnchor="middle">Head {h + 1}</text>
                <text x={hx + 36} y={322} fill={GRAY} fontSize="8" textAnchor="middle">B_h, C_h</text>
                <text x={hx + 36} y={333} fill={GRAY} fontSize="8" textAnchor="middle">state N={h === 0 ? '64' : '64'}</text>
              </g>
            );
          })}

          {/* Arrow down from SSM */}
          <line x1="400" y1="355" x2="400" y2="372" stroke={P} strokeWidth="1.5" markerEnd="url(#m2-blk-arr)" />

          {/* Output projection + Gate */}
          <rect x="280" y="375" width="240" height="35" rx="6" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1" />
          <text x="400" y="397" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">Output Projection + SiLU Gate</text>

          {/* Residual arrow */}
          <line x1="190" y1="65" x2="190" y2="422" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
          <line x1="190" y1="422" x2="310" y2="422" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#m2-blk-arr-g)" />
          <text x="180" y="250" fill={GRAY} fontSize="9" textAnchor="end" transform="rotate(-90,180,250)">residual</text>

          {/* Add */}
          <circle cx="400" cy="422" r="12" fill={P} fillOpacity="0.15" stroke={P} strokeWidth="1" />
          <text x="400" y="426" fill={P2} fontSize="14" fontWeight="700" textAnchor="middle">+</text>

          <line x1="400" y1="434" x2="400" y2="450" stroke={P} strokeWidth="1.5" markerEnd="url(#m2-blk-arr)" />

          {/* LayerNorm 2 + MLP */}
          <rect x="330" y="453" width="140" height="28" rx="6" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1" />
          <text x="400" y="471" fill={GRAY} fontSize="11" fontWeight="600" textAnchor="middle">RMSNorm + SwiGLU</text>

          <line x1="400" y1="481" x2="400" y2="497" stroke={P} strokeWidth="1.5" markerEnd="url(#m2-blk-arr)" />

          {/* Output */}
          <rect x="310" y="500" width="180" height="32" rx="6" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1" />
          <text x="400" y="520" fill={GREEN} fontSize="12" fontWeight="600" textAnchor="middle">Output (T x D)</text>

          {/* Right annotation: training vs inference */}
          <rect x="630" y="260" width="150" height="90" rx="8" fill={P} fillOpacity="0.06" stroke={P} strokeWidth="1" />
          <text x="705" y="282" fill={P2} fontSize="10" fontWeight="700" textAnchor="middle">SSD Kernel Mode</text>
          <text x="705" y="298" fill={GREEN} fontSize="9" textAnchor="middle">Inference: recurrent</text>
          <text x="705" y="312" fill={BLUE} fontSize="9" textAnchor="middle">Training: chunk-wise</text>
          <text x="705" y="326" fill={AMBER} fontSize="9" textAnchor="middle">Same weights, diff algo</text>
          <line x1="600" y1="305" x2="630" y2="305" stroke={P} strokeWidth="1" strokeDasharray="3 2" />

          {/* Tensor Parallel annotation */}
          <rect x="630" y="375" width="150" height="60" rx="8" fill={AMBER} fillOpacity="0.06" stroke={AMBER} strokeWidth="1" />
          <text x="705" y="397" fill={AMBER} fontSize="10" fontWeight="700" textAnchor="middle">Tensor Parallel</text>
          <text x="705" y="413" fill={GRAY} fontSize="9" textAnchor="middle">Heads split across GPUs</text>
          <text x="705" y="427" fill={GRAY} fontSize="9" textAnchor="middle">like multi-head attention</text>
          <line x1="600" y1="400" x2="630" y2="400" stroke={AMBER} strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Property', 'Mamba-1', 'Mamba-2', 'Transformer']}
        rows={[
          ['Core Operation', 'Selective scan', 'SSD (multi-head SSM)', 'Multi-head attention'],
          ['Block Design', 'Complex gated arch', 'Simplified (Transformer-like)', 'Standard Attention + MLP'],
          ['Heads', 'Single channel-wise', 'Multi-head (like attention)', 'Multi-head'],
          ['State Size', 'N=16 per channel', 'N=64-128 per head', 'KV cache = O(T) per head'],
          ['Tensor Parallel', 'Difficult (scan)', 'Natural (head split)', 'Natural (head split)'],
          ['Training Algorithm', 'Hardware-aware scan', 'Chunk-wise matmul', 'Flash Attention'],
          ['Inference', 'O(N) recurrent', 'O(N) recurrent', 'O(T) KV cache lookup'],
        ]}
        caption="Mamba-2 bridges the SSM and Transformer worlds by adopting the multi-head pattern while keeping O(N) inference"
      />

      <ConceptCard title="Multi-Head SSM: The Key Architectural Decision" color={P} defaultOpen={true}>
        <Prose>
          <p>
            The multi-head SSM is directly inspired by <H tip="Multi-head attention (MHA) = running H parallel attention computations, each with independent Q, K, V projections of dimension d_head = d_model / H. The outputs are concatenated and linearly projected. Each head can learn different attention patterns (positional, syntactic, semantic). Total computation stays the same as single-head." color={P}>multi-head attention</H>.
            In Mamba-2, the model dimension D is split across H heads, each with
            its own B and C projections of dimension d_head = D/H and a state size N per head.
          </p>
          <p>
            The total state across all heads is H * N, which is typically a few thousand
            dimensions -- vastly smaller than a Transformer's KV cache that stores T * d_head per head
            (growing with sequence length). At generation time, the model maintains only these fixed-size
            state vectors, enabling <H tip="Constant-memory generation = during autoregressive inference, the SSM state does not grow with the number of generated tokens. Each new token updates the O(N) state and produces an output. Compare to Transformers where the KV cache grows by d_head per token per layer per head." color={GREEN}>constant-memory generation</H>.
          </p>
          <p>
            Mamba-2 also supports <H tip="Multi-value SSM (MVS) = a variant where multiple heads share the same B and C projections (like grouped-query attention shares K, V across heads). This reduces the parameter count for B, C while allowing each head to maintain its own state dynamics via different A values." color={P}>head grouping</H> analogous
            to <H tip="Grouped-Query Attention (GQA) = a Transformer optimization where multiple query heads share the same key-value head. Reduces KV cache size and computation while preserving most of the quality. Used in Llama 2-70B, Mistral, and many modern LLMs." color={GRAY}>grouped-query attention</H>:
            multiple heads can share B and C projections while maintaining separate states, reducing
            parameter count without significant quality loss.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        The architectural insight of Mamba-2 is that <strong>SSMs should look like Transformers</strong>.
        By adopting multi-head design, simplified block layout, and natural tensor parallelism, Mamba-2
        can leverage the entire ecosystem of Transformer training infrastructure (Flash Attention kernels,
        TP strategies, optimizers) while keeping the O(N) inference advantage of SSMs.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — RESULTS
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="06"
        title="Results -- Speed and Quality"
        subtitle="Matching Transformer quality at 2-8x less compute and faster inference"
        color={P}
      />

      <Prose>
        <p>
          Mamba-2 is evaluated at model sizes from 370M to 2.7B parameters, trained on
          <H tip="The Pile = a diverse, 800GB English text dataset created by EleutherAI for training language models. It includes academic papers, books, web text, code, legal text, and more. Commonly used as a standardized pre-training corpus for comparing different architectures." color={GRAY}>The Pile</H> with
          300B tokens. The results validate both the theoretical elegance and practical value of SSD:
        </p>
        <p>
          <strong>Quality:</strong> On standard <H tip="Zero-shot evaluation = testing a language model on downstream tasks without any task-specific training. The model is prompted with the task format and its accuracy is measured. Common benchmarks: LAMBADA (language modeling), HellaSwag (commonsense), PIQA (physical intuition), ARC (science QA), WinoGrande (coreference)." color={P}>zero-shot benchmarks</H>,
          Mamba-2 matches or slightly exceeds both Mamba-1 and Transformer++ (an optimized Transformer
          baseline with <H tip="Transformer++ = the strong Transformer baseline used in the Mamba papers. It includes modern best practices: RMSNorm, SwiGLU MLP, rotary position embeddings (RoPE), no linear bias, and Flash Attention. This is NOT a vanilla Transformer -- it represents the current best practices." color={GRAY}>RMSNorm, SwiGLU, RoPE</H>) at
          all model sizes tested.
        </p>
        <p>
          <strong>Speed:</strong> The SSD algorithm achieves 2-8x speedup over Mamba-1's scan on
          the core SSM operation. This comes from replacing the custom CUDA scan kernel with optimized
          <H tip="Matrix multiplication (matmul) = the fundamental operation on GPU hardware. Modern GPUs (A100, H100) have dedicated Tensor Cores optimized specifically for matmul operations. By formulating the SSM as a matmul (the attention-mode dual), Mamba-2 can exploit these hardware accelerators that were designed for Transformer attention." color={AMBER}>matrix multiplication hardware</H> (Tensor
          Cores). End-to-end, Mamba-2 trains significantly faster than Transformers due to the
          combination of faster kernel operations and linear scaling with sequence length.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '2-8x', unit: '', label: 'Faster SSM Kernel vs Mamba-1', color: P },
          { value: '~0.3', unit: ' ppl', label: 'Better Perplexity (2.7B)', color: GREEN },
          { value: '73.3%', unit: '', label: 'HellaSwag (2.7B, 0-shot)', color: CYAN },
          { value: 'O(N)', unit: '', label: 'Inference Memory', color: AMBER },
        ]}
      />

      <Diagram caption="Training speed: Mamba-2's SSD kernel is 2-8x faster than Mamba-1's selective scan">
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="380" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">SSD KERNEL SPEED vs MAMBA-1 SCAN vs FLASH ATTENTION 2</text>

          {/* Y axis */}
          <line x1="120" y1="50" x2="120" y2="310" stroke={GRAY} strokeWidth="1" />
          <text x="60" y="180" fill={GRAY} fontSize="11" textAnchor="middle" transform="rotate(-90,60,180)">Throughput (tokens/sec, relative)</text>

          {/* Bars for three sequence lengths */}
          {[
            { len: '2K', xBase: 180, mamba1: 0.55, mamba2: 0.85, transformer: 0.9 },
            { len: '8K', xBase: 340, mamba1: 0.5, mamba2: 0.9, transformer: 0.65 },
            { len: '32K', xBase: 500, mamba1: 0.35, mamba2: 0.88, transformer: 0.35 },
            { len: '128K', xBase: 660, mamba1: 0.2, mamba2: 0.82, transformer: 0.12 },
          ].map(({ len, xBase, mamba1, mamba2, transformer }) => {
            const maxH = 230;
            const h1 = mamba1 * maxH;
            const h2 = mamba2 * maxH;
            const h3 = transformer * maxH;
            return (
              <g key={len}>
                {/* Mamba-1 bar */}
                <rect x={xBase} y={310 - h1} width="30" height={h1} rx="4" fill={GRAY} fillOpacity="0.3" stroke={GRAY} strokeWidth="0.5" />
                {/* Mamba-2 bar */}
                <rect x={xBase + 35} y={310 - h2} width="30" height={h2} rx="4" fill={P} fillOpacity="0.5" stroke={P} strokeWidth="1" />
                {/* Transformer bar */}
                <rect x={xBase + 70} y={310 - h3} width="30" height={h3} rx="4" fill={RED} fillOpacity="0.3" stroke={RED} strokeWidth="0.5" />
                {/* Sequence length label */}
                <text x={xBase + 50} y="335" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">N={len}</text>

                {/* Speed-up annotation for Mamba-2 */}
                {len === '32K' && (
                  <>
                    <rect x={xBase + 30} y={310 - h2 - 22} width="44" height="18" rx="4" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />
                    <text x={xBase + 52} y={310 - h2 - 9} fill={P2} fontSize="9" fontWeight="700" textAnchor="middle">2.5x</text>
                  </>
                )}
                {len === '128K' && (
                  <>
                    <rect x={xBase + 30} y={310 - h2 - 22} width="44" height="18" rx="4" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />
                    <text x={xBase + 52} y={310 - h2 - 9} fill={P2} fontSize="9" fontWeight="700" textAnchor="middle">4x+</text>
                  </>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <rect x="200" y="354" width="12" height="12" rx="2" fill={GRAY} fillOpacity="0.4" />
          <text x="218" y="364" fill={GRAY} fontSize="10">Mamba-1 (scan)</text>
          <rect x="340" y="354" width="12" height="12" rx="2" fill={P} fillOpacity="0.6" />
          <text x="358" y="364" fill={P2} fontSize="10" fontWeight="600">Mamba-2 (SSD)</text>
          <rect x="490" y="354" width="12" height="12" rx="2" fill={RED} fillOpacity="0.4" />
          <text x="508" y="364" fill={GRAY} fontSize="10">FlashAttention-2</text>

          {/* Annotation */}
          <text x="400" y="60" fill={P2} fontSize="11" fontWeight="600" textAnchor="middle">
            Mamba-2 advantage grows with sequence length (linear vs quadratic)
          </text>
        </svg>
      </Diagram>

      <Diagram caption="Perplexity (lower is better): Mamba-2 matches or exceeds both Mamba-1 and Transformer++ across scales">
        <svg viewBox="0 0 800 350" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="m2-ppl-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GRAY} />
            </marker>
          </defs>
          <rect width="800" height="350" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">PERPLEXITY vs MODEL SIZE (300B tokens training)</text>

          {/* Axes */}
          <line x1="120" y1="290" x2="700" y2="290" stroke={GRAY} strokeWidth="1" markerEnd="url(#m2-ppl-arr)" />
          <line x1="120" y1="290" x2="120" y2="55" stroke={GRAY} strokeWidth="1" markerEnd="url(#m2-ppl-arr)" />
          <text x="420" y="325" fill={GRAY} fontSize="11" textAnchor="middle">Model Size (Parameters)</text>
          <text x="70" y="172" fill={GRAY} fontSize="11" textAnchor="middle" transform="rotate(-90,70,172)">Perplexity (lower = better)</text>

          {/* X-axis labels */}
          {[
            { label: '370M', x: 200 },
            { label: '790M', x: 350 },
            { label: '1.3B', x: 480 },
            { label: '2.7B', x: 630 },
          ].map(({ label, x }) => (
            <text key={label} x={x} y="308" fill={GRAY} fontSize="10" textAnchor="middle">{label}</text>
          ))}

          {/* Y-axis labels (perplexity values) */}
          {[
            { label: '8.0', y: 80 },
            { label: '9.0', y: 130 },
            { label: '10.0', y: 180 },
            { label: '12.0', y: 230 },
            { label: '14.0', y: 270 },
          ].map(({ label, y }) => (
            <text key={label} x="110" y={y + 4} fill={GRAY} fontSize="9" textAnchor="end">{label}</text>
          ))}

          {/* Transformer++ line (red) */}
          <polyline
            points="200,262 350,205 480,165 630,112"
            fill="none" stroke={RED} strokeWidth="2" strokeDasharray="6 3"
          />
          {[
            { x: 200, y: 262 },
            { x: 350, y: 205 },
            { x: 480, y: 165 },
            { x: 630, y: 112 },
          ].map(({ x, y }, i) => (
            <circle key={`tf-${i}`} cx={x} cy={y} r="4" fill={RED} />
          ))}

          {/* Mamba-1 line (gray) */}
          <polyline
            points="200,258 350,200 480,160 630,108"
            fill="none" stroke={GRAY} strokeWidth="2"
          />
          {[
            { x: 200, y: 258 },
            { x: 350, y: 200 },
            { x: 480, y: 160 },
            { x: 630, y: 108 },
          ].map(({ x, y }, i) => (
            <circle key={`m1-${i}`} cx={x} cy={y} r="4" fill={GRAY} />
          ))}

          {/* Mamba-2 line (purple) */}
          <polyline
            points="200,254 350,195 480,154 630,102"
            fill="none" stroke={P} strokeWidth="2.5"
          />
          {[
            { x: 200, y: 254 },
            { x: 350, y: 195 },
            { x: 480, y: 154 },
            { x: 630, y: 102 },
          ].map(({ x, y }, i) => (
            <circle key={`m2-${i}`} cx={x} cy={y} r="5" fill={P} stroke={P2} strokeWidth="1" />
          ))}

          {/* Legend */}
          <line x1="220" y1="55" x2="250" y2="55" stroke={P} strokeWidth="2.5" />
          <circle cx="235" cy="55" r="4" fill={P} />
          <text x="258" y="59" fill={P2} fontSize="11" fontWeight="600">Mamba-2 (SSD)</text>

          <line x1="400" y1="55" x2="430" y2="55" stroke={GRAY} strokeWidth="2" />
          <circle cx="415" cy="55" r="3" fill={GRAY} />
          <text x="438" y="59" fill={GRAY} fontSize="11">Mamba-1</text>

          <line x1="530" y1="55" x2="560" y2="55" stroke={RED} strokeWidth="2" strokeDasharray="6 3" />
          <circle cx="545" cy="55" r="3" fill={RED} />
          <text x="568" y="59" fill={GRAY} fontSize="11">Transformer++</text>

          {/* Best result annotation */}
          <rect x="638" y="76" width="100" height="22" rx="5" fill={P} fillOpacity="0.2" stroke={P} strokeWidth="1" />
          <text x="688" y="91" fill={P2} fontSize="10" fontWeight="700" textAnchor="middle">Best at 2.7B</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Benchmark', 'Transformer++ (2.7B)', 'Mamba-1 (2.7B)', 'Mamba-2 (2.7B)']}
        rows={[
          ['Perplexity (The Pile)', '~8.5', '~8.3', '~8.1'],
          ['LAMBADA (acc)', '69.2%', '71.4%', '72.1%'],
          ['HellaSwag (0-shot)', '71.8%', '72.5%', '73.3%'],
          ['PIQA', '77.5%', '78.0%', '78.4%'],
          ['ARC-Easy', '68.1%', '69.5%', '70.0%'],
          ['WinoGrande', '64.7%', '65.1%', '65.8%'],
          ['SSD Kernel Speed', '1.0x (FlashAttn-2)', '0.5x (scan)', '1.2-4x (SSD matmul)'],
          ['Inference Memory', 'O(T) per layer', 'O(1) per layer', 'O(1) per layer'],
        ]}
        caption="Mamba-2 achieves the best quality AND the fastest kernel speed -- the dual form enables both"
      />

      <SimpleExplain>
        <p><strong>The punchline:</strong> Mamba-2 does not sacrifice quality for speed, or speed for quality. By proving that SSMs and attention are the same mathematical object viewed differently, Mamba-2 gets the best of both worlds: use the matmul form when you have a GPU full of Tensor Cores (training), and switch to the recurrent form when you need to generate tokens one at a time (inference). Same model, same weights, same outputs -- just a different algorithm for computing them.</p>
      </SimpleExplain>

      <Callout type="insight">
        A subtle but important finding: Mamba-2 does <strong>not</strong> yet match Transformers on tasks
        requiring precise <H tip="In-context learning (ICL) retrieval = the ability to find and copy specific information from the input context. Example: given a list of key-value pairs, retrieve the value for a specific key. Transformers excel at this because full-rank attention can implement exact copying. SSMs with bounded state size must compress, which can lose exact details." color={RED}>in-context retrieval</H> (looking
        up specific facts from a long context). The bounded state size (rank N) means SSMs must compress
        information, potentially losing exact details. This is an active area of research, with
        <H tip="Hybrid models = architectures that interleave SSM layers with attention layers. The SSM layers handle the bulk of processing efficiently, while a few attention layers provide exact retrieval capability where needed. Jamba (AI21) and other recent models use this hybrid approach." color={AMBER}>hybrid SSM-attention models</H> emerging
        as a promising direction.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — MENTAL MODELS
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="07"
        title="Mental Models"
        subtitle="Intuitive ways to think about State Space Duality and Mamba-2"
        color={P}
      />

      <MentalModel
        title="SSD = A Coin With Two Sides"
        analogy="Imagine a coin. On one side (heads) you see a recurrence -- a running tally that updates one number at a time as you read through a book. On the other side (tails) you see a matrix -- a giant spreadsheet comparing every page to every other page. The coin is the SAME object; you just see different faces depending on how you look at it. SSMs see the recurrence side (fast sequential reading). Attention sees the matrix side (parallel comparison). Mamba-2 proves they are the same coin and lets you flip to whichever side is faster for your current task."
        technical="Mathematically: the output y = Mx where M is a semiseparable matrix. The recurrence h_k = A*h_{k-1} + B_k*x_k computes y sequentially in O(TN). The matrix form y_j = sum(M_{jk} * x_k) computes y in parallel in O(T^2 N). Both produce identical y because M encodes the same operation. SSD exploits this by using chunk-wise computation: O(Q^2 N) within chunks, O(TN/Q) between chunks."
        color={P}
      />

      <MentalModel
        title="Selective Scan = A Bouncer at a Club"
        analogy="Think of the SSM hidden state as a VIP lounge with limited capacity (N seats). The bouncer (Delta parameter) stands at the door. When an important person (content word) arrives, the bouncer opens the door wide (large B, small Delta) -- 'Come right in, we have been waiting for you.' When someone unimportant (function word like 'the') arrives, the bouncer barely cracks the door (small B, large Delta) -- 'There is no room, move along.' The bouncer's decisions are CONTENT-BASED: they look at who the person IS, not just when they arrived."
        technical="Delta controls the effective decay of the state: A_bar = exp(Delta * A). Large Delta causes faster decay (forget old state), while small Delta preserves it. B controls how much the new input is written into the state. C controls how the state is read out. All three are computed from the input token via learned linear projections, enabling content-based gating."
        color={GREEN}
      />

      <MentalModel
        title="Multi-Head SSM = Multiple Stenographers"
        analogy="Imagine a court hearing with multiple stenographers, each trained to focus on different aspects. One captures exact quotes (semantic content). Another tracks who is speaking and when (entity tracking). A third focuses on legal terminology (domain specialization). Each stenographer maintains their own separate notes (state vector) and writes at their own pace. At the end, their notes are combined into a complete transcript. This is the multi-head SSM: each head maintains an independent state that specializes in different patterns."
        technical="The model dimension D is split across H heads, each with d_head = D/H. Each head has its own B_h, C_h projections and maintains an independent state of size N. The total state is H * N dimensions (e.g., 64 heads x 64 state = 4096 total state dimensions). This is fixed regardless of sequence length, unlike the Transformer KV cache which is H * T * d_head."
        color={CYAN}
      />

      <MentalModel
        title="Chunk-Wise = Reading a Book in Chapters"
        analogy="Instead of reading the whole book page-by-page (slow recurrence) or cross-referencing every page with every other page at once (impossible for a long book), you read one chapter at a time. Within each chapter, you carefully cross-reference all the pages (quadratic attention on a small chunk). Between chapters, you carry forward a brief mental summary (the SSM state). This gives you the thoroughness of attention (within chapters) with the efficiency of sequential reading (across chapters)."
        technical="Split the sequence of length T into T/Q chunks of size Q. Within each chunk: compute M_chunk (Q x Q attention matrix) using matmul -- cost O(Q^2 N). Between chunks: pass the N-dimensional state vector, cost O(N). Total: O((T/Q) * Q^2 * N) = O(T * Q * N). Choose Q to fill GPU SRAM (~64-256) for optimal hardware utilization."
        color={AMBER}
      />

      <Diagram caption="The big picture: where Mamba-2 sits in the landscape of sequence models">
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="400" rx="12" fill={BG} />
          <text x="400" y="28" fill={P} fontSize="14" fontWeight="700" textAnchor="middle">SEQUENCE MODEL LANDSCAPE — WHERE MAMBA-2 FITS</text>

          {/* Transformer bubble */}
          <rect x="40" y="55" width="200" height="130" rx="12" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="1.5" />
          <text x="140" y="78" fill={RED} fontSize="13" fontWeight="700" textAnchor="middle">Transformer</text>
          <text x="140" y="96" fill={FG} fontSize="10" textAnchor="middle">Full-rank attention (rank T)</text>
          <text x="140" y="114" fill={FG} fontSize="10" textAnchor="middle">O(T^2) training + inference</text>
          <text x="140" y="132" fill={GREEN} fontSize="10" textAnchor="middle">Excellent quality</text>
          <text x="140" y="150" fill={RED} fontSize="10" textAnchor="middle">Slow for long sequences</text>
          <text x="140" y="170" fill={GRAY} fontSize="9" textAnchor="middle">GPT, Claude, Llama, Gemini</text>

          {/* Linear Attention bubble */}
          <rect x="300" y="55" width="200" height="130" rx="12" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="1.5" />
          <text x="400" y="78" fill={BLUE} fontSize="13" fontWeight="700" textAnchor="middle">Linear Attention</text>
          <text x="400" y="96" fill={FG} fontSize="10" textAnchor="middle">Low-rank attention (rank d)</text>
          <text x="400" y="114" fill={FG} fontSize="10" textAnchor="middle">O(Td^2) training + inference</text>
          <text x="400" y="132" fill={AMBER} fontSize="10" textAnchor="middle">Good speed</text>
          <text x="400" y="150" fill={RED} fontSize="10" textAnchor="middle">Quality gap vs Transformer</text>
          <text x="400" y="170" fill={GRAY} fontSize="9" textAnchor="middle">RWKV, RetNet, Performer</text>

          {/* SSM bubble */}
          <rect x="560" y="55" width="200" height="130" rx="12" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1.5" />
          <text x="660" y="78" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">Fixed SSMs (S4)</text>
          <text x="660" y="96" fill={FG} fontSize="10" textAnchor="middle">Structured (rank N, fixed)</text>
          <text x="660" y="114" fill={FG} fontSize="10" textAnchor="middle">O(T log T) convolution</text>
          <text x="660" y="132" fill={GREEN} fontSize="10" textAnchor="middle">Very fast</text>
          <text x="660" y="150" fill={RED} fontSize="10" textAnchor="middle">Cannot select content</text>
          <text x="660" y="170" fill={GRAY} fontSize="9" textAnchor="middle">S4, S5, DSS, H3</text>

          {/* Connecting arrows */}
          <line x1="400" y1="185" x2="400" y2="225" stroke={P} strokeWidth="2" strokeDasharray="4 3" />
          <text x="400" y="215" fill={P2} fontSize="10" fontWeight="700" textAnchor="middle">SSD unifies these</text>

          {/* Mamba-2 bubble (big, center) */}
          <rect x="200" y="230" width="400" height="140" rx="14" fill={P} fillOpacity="0.1" stroke={P} strokeWidth="2.5" />
          <text x="400" y="260" fill={P2} fontSize="16" fontWeight="800" textAnchor="middle">Mamba-2 (SSD)</text>
          <text x="400" y="282" fill={FG} fontSize="11" textAnchor="middle">Structured attention (rank N, input-dependent)</text>
          <text x="400" y="302" fill={FG} fontSize="11" textAnchor="middle">Training: O(TQN) chunk-wise matmul  |  Inference: O(TN) recurrence</text>
          <text x="400" y="322" fill={GREEN} fontSize="12" fontWeight="600" textAnchor="middle">Transformer quality + sub-quadratic speed + O(1) inference memory</text>
          <text x="400" y="345" fill={P2} fontSize="11" fontWeight="600" textAnchor="middle">SSM = Structured Masked Attention (proven, not just empirical)</text>
          <text x="400" y="362" fill={GRAY} fontSize="9" textAnchor="middle">Mamba, Mamba-2, Jamba (hybrid), Zamba, Falcon Mamba</text>

          {/* Connecting lines from top boxes to Mamba-2 */}
          <line x1="140" y1="185" x2="300" y2="250" stroke={RED} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <line x1="660" y1="185" x2="500" y2="250" stroke={GREEN} strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />

          {/* Arrow labels */}
          <text x="195" y="220" fill={RED} fontSize="8" fontWeight="600">quality from attention</text>
          <text x="580" y="220" fill={GREEN} fontSize="8" fontWeight="600">speed from SSM</text>
        </svg>
      </Diagram>

      <Callout type="key">
        Mamba-2's lasting contribution may not be the specific architecture but the <strong>theoretical
        framework</strong>. By proving that SSMs and attention are dual representations of the same
        computation, Dao and Gu have given the field a unified lens to understand, compare, and combine
        these approaches. Future sequence models -- whether pure SSM, pure attention, or hybrid -- all
        live within this framework.
      </Callout>

      <SimpleExplain>
        <p><strong>The bottom line:</strong> For years, SSMs and Transformers seemed like fundamentally different approaches to sequence modeling. Mamba-2 proves they are not. They are two algorithms for computing the same mathematical operation. This means the choice between them is not about expressiveness but about hardware efficiency: use the recurrent form when you want constant-memory inference, use the attention form when you want parallel GPU training. The model does not care which algorithm you use -- the outputs are identical.</p>
      </SimpleExplain>
    </>
  );
}
