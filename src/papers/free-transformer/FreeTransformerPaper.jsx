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
const R  = '#f43f5e';   // primary rose
const R2 = '#fb7185';   // lighter rose
const R3 = '#e11d48';   // deeper rose
const CYAN   = '#06b6d4';
const GREEN  = '#22c55e';
const AMBER  = '#f59e0b';
const PURPLE = '#a855f7';
const BLUE   = '#3b82f6';
const GRAY   = '#94a3b8';
const BG     = '#1a0a12'; // deep rose-black for SVGs
const FG     = '#fce4ec'; // warm rose-white

/* ─── SVG helpers ─── */
const ARROW = (x1, y1, x2, y2, color = R, dashed = false) => (
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

export default function FreeTransformerPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — THE IDEA
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="The Idea — A Transformer with Subconsciousness"
        subtitle="What if a language model could think before it speaks?"
        color={R}
      />

      <Prose>
        <p>
          Every <H tip="Autoregressive language model = a model that generates text one token at a time, each token conditioned on all previous tokens. GPT, Llama, Claude all work this way. The key constraint: the model must commit to each word before seeing the rest of the sentence." color={R}>autoregressive language model</H> you have ever used — GPT, Claude, Llama — has a fundamental limitation: it generates text <em>one token at a time</em>, with no ability to <H tip="Planning = deciding the high-level structure, argument, or direction of a response BEFORE generating specific words. Humans plan before writing (outlines, mental models). Standard Transformers cannot — they must commit to token 1 before 'knowing' what token 100 will be." color={CYAN}>plan ahead</H>. Each token is committed to the output before the model has any idea where the sentence will end up. It is like writing an essay by choosing one word at a time, left to right, with no outline, no draft, and no ability to change your mind.
        </p>
        <p>
          The <strong>Free Transformer</strong> from Meta FAIR introduces a deceptively simple fix: before generating any text, the model first samples a <H tip="Latent variable Z = a hidden random vector that encodes the 'intent' or 'plan' for the entire response. Z is sampled from a learned distribution and then conditions every token in the output. Think of it as the model's subconscious thought before speaking." color={R}>latent random variable Z</H> — a continuous vector that acts as a <H tip="Subconscious layer = the paper's own analogy. Just as humans have subconscious cognitive processes that shape what we say before we consciously form words, Z shapes the model's output before any token is generated. It's a compressed, holistic plan." color={R}>"subconscious" planning layer</H>. This Z encodes the high-level intent — the structure, the reasoning strategy, the stylistic choice — and then <strong>every token</strong> in the output is conditioned on both the input and this latent plan. The model thinks, then speaks.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '3%', unit: ' overhead', label: 'Compute Cost', color: R },
          { value: 'Z', unit: ' vector', label: 'Latent "Subconscious"', color: R2 },
          { value: 'ELBO', unit: '', label: 'Training Objective', color: CYAN },
          { value: '1st', unit: '', label: 'Transformer w/ Intrinsic Intent', color: GREEN },
        ]}
      />

      <SimpleExplain>
        <p><strong>The core idea in one sentence:</strong> Before generating any words, the Free Transformer samples a random "thought vector" Z that encodes the plan for the entire response — like taking a deep breath and forming an intention before speaking. This single addition, trained with variational inference (the same math behind VAEs), costs only 3% extra compute but significantly improves reasoning, code generation, and structured output.</p>
      </SimpleExplain>

      {/* ── Standard vs Free Transformer comparison SVG ── */}
      <Diagram caption={<><strong>Standard Transformer vs Free Transformer</strong> — The Free Transformer inserts a latent variable Z between the encoder and the autoregressive decoder. Z acts as a holistic plan for the entire output.</>}>
        <svg viewBox="0 0 960 460" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ft-gr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9f1239" />
              <stop offset="100%" stopColor="#4c0519" />
            </linearGradient>
            <linearGradient id="ft-gc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e7490" />
              <stop offset="100%" stopColor="#164e63" />
            </linearGradient>
            <linearGradient id="ft-gd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="ft-gp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>
            <marker id="ft-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={R} />
            </marker>
            <marker id="ft-ac" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={CYAN} />
            </marker>
            <marker id="ft-ag" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GRAY} />
            </marker>
            <marker id="ft-agr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
          </defs>

          <rect width="960" height="460" rx="12" fill={BG} />

          {/* ── LEFT: Standard Transformer ── */}
          <text x="220" y="32" textAnchor="middle" fill={GRAY} fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">STANDARD TRANSFORMER</text>

          {/* Input */}
          <rect x="60" y="60" width="320" height="40" rx="8" fill="url(#ft-gd)" stroke="#334155" strokeWidth="1.5" />
          <text x="220" y="85" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Input: "Solve x + 3 = 7"</text>

          {/* Arrow down */}
          <line x1="220" y1="100" x2="220" y2="125" stroke={GRAY} strokeWidth="2" markerEnd="url(#ft-ag)" />

          {/* Encoder */}
          <rect x="100" y="130" width="240" height="70" rx="10" fill="url(#ft-gd)" stroke={GRAY} strokeWidth="1.5" />
          <text x="220" y="160" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Encoder / Context</text>
          <text x="220" y="180" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Self-attention over input tokens</text>

          {/* Arrow down */}
          <line x1="220" y1="200" x2="220" y2="230" stroke={GRAY} strokeWidth="2" markerEnd="url(#ft-ag)" />

          {/* No Z — gap */}
          <rect x="140" y="235" width="160" height="32" rx="6" fill="transparent" stroke={GRAY} strokeWidth="1" strokeDasharray="6 4" />
          <text x="220" y="256" textAnchor="middle" fill={GRAY} fontSize="11" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">No planning layer</text>

          {/* Arrow down */}
          <line x1="220" y1="267" x2="220" y2="295" stroke={GRAY} strokeWidth="2" markerEnd="url(#ft-ag)" />

          {/* Decoder */}
          <rect x="100" y="300" width="240" height="70" rx="10" fill="url(#ft-gd)" stroke={GRAY} strokeWidth="1.5" />
          <text x="220" y="330" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Decoder (Autoregressive)</text>
          <text x="220" y="350" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Token-by-token, no global plan</text>

          {/* Arrow down */}
          <line x1="220" y1="370" x2="220" y2="400" stroke={GRAY} strokeWidth="2" markerEnd="url(#ft-ag)" />

          {/* Output */}
          <rect x="60" y="405" width="320" height="40" rx="8" fill="url(#ft-gd)" stroke="#334155" strokeWidth="1.5" />
          <text x="220" y="430" textAnchor="middle" fill={GRAY} fontSize="12" fontFamily="Inter, system-ui, sans-serif">Output: "x = 4" (commits blindly)</text>

          {/* ── Divider ── */}
          <line x1="440" y1="25" x2="440" y2="450" stroke="#334155" strokeWidth="1" strokeDasharray="8 4" />

          {/* ── RIGHT: Free Transformer ── */}
          <text x="700" y="32" textAnchor="middle" fill={R} fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">FREE TRANSFORMER</text>

          {/* Input */}
          <rect x="540" y="60" width="320" height="40" rx="8" fill="url(#ft-gd)" stroke={R} strokeWidth="1.5" />
          <text x="700" y="85" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Input: "Solve x + 3 = 7"</text>

          {/* Arrow down */}
          <line x1="700" y1="100" x2="700" y2="125" stroke={R} strokeWidth="2" markerEnd="url(#ft-ar)" />

          {/* Encoder */}
          <rect x="580" y="130" width="240" height="70" rx="10" fill="url(#ft-gd)" stroke={R} strokeWidth="1.5" />
          <text x="700" y="160" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Encoder / Context</text>
          <text x="700" y="180" textAnchor="middle" fill={R2} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Self-attention over input tokens</text>

          {/* Arrow down to Z */}
          <line x1="700" y1="200" x2="700" y2="228" stroke={R} strokeWidth="2" markerEnd="url(#ft-ar)" />

          {/* Z — the key innovation */}
          <rect x="620" y="232" width="160" height="48" rx="24" fill={R} fillOpacity="0.25" stroke={R} strokeWidth="2.5" />
          <text x="700" y="253" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Z ~ q(z|x,y)</text>
          <text x="700" y="271" textAnchor="middle" fill={R2} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">LATENT "SUBCONSCIOUS"</text>

          {/* Glow effect around Z */}
          <rect x="616" y="228" width="168" height="56" rx="28" fill="none" stroke={R} strokeWidth="1" opacity="0.3" />

          {/* Arrow down from Z */}
          <line x1="700" y1="280" x2="700" y2="310" stroke={R} strokeWidth="2" markerEnd="url(#ft-ar)" />

          {/* Decoder */}
          <rect x="580" y="314" width="240" height="70" rx="10" fill="url(#ft-gr)" stroke={R} strokeWidth="1.5" />
          <text x="700" y="344" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Decoder (Z-Conditioned)</text>
          <text x="700" y="364" textAnchor="middle" fill={R2} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Every token sees Z — coherent plan</text>

          {/* Arrow down */}
          <line x1="700" y1="384" x2="700" y2="408" stroke={R} strokeWidth="2" markerEnd="url(#ft-ar)" />

          {/* Output */}
          <rect x="540" y="412" width="320" height="40" rx="8" fill="url(#ft-gd)" stroke={GREEN} strokeWidth="1.5" />
          <text x="700" y="437" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Output: "x = 4" (planned, structured)</text>

          {/* Side annotation: Z samples */}
          <line x1="784" y1="256" x2="840" y2="256" stroke={R} strokeWidth="1" strokeDasharray="4 3" />
          <text x="845" y="248" fill={R2} fontSize="9" textAnchor="start" fontFamily="Inter, system-ui, sans-serif">Sampled once</text>
          <text x="845" y="262" fill={R2} fontSize="9" textAnchor="start" fontFamily="Inter, system-ui, sans-serif">per generation</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Property', 'Standard Transformer', 'Free Transformer']}
        rows={[
          ['Planning', 'None — token-by-token commitment', 'Z encodes holistic intent before generation'],
          ['Latent Variable', 'None', 'Z ~ N(mu, sigma) sampled per response'],
          ['Training', 'Cross-entropy (MLE)', 'ELBO = Reconstruction - KL divergence'],
          ['Compute Overhead', 'Baseline', '+3% (one extra forward pass for Z)'],
          ['Reasoning', 'Emergent (chain-of-thought hacks)', 'Intrinsic (Z captures reasoning strategy)'],
          ['Structured Output', 'Struggles with global coherence', 'Z enforces structural consistency'],
        ]}
        caption="The Free Transformer adds minimal cost but fundamentally changes how the model approaches generation"
      />

      <MentalModel
        title="The Speech Analogy"
        analogy="Think about giving a speech. A standard Transformer is like improvising word by word — you start talking and hope it goes somewhere coherent. The Free Transformer is like pausing for one second to form your main idea (sampling Z), then delivering the speech with that intention guiding every sentence. The pause costs almost nothing, but the speech is dramatically more structured."
        technical="Technically, Z is a continuous latent variable sampled from an approximate posterior q(z|x,y) during training and from the prior p(z|x) during inference. It is injected into the decoder as additional conditioning, typically by concatenating Z to the input embeddings or cross-attending to it at every layer."
        color={R}
      />

      <Callout type="key">
        The name "Free Transformer" comes from the <strong>free energy principle</strong> in neuroscience — the idea that biological brains minimize surprise by maintaining internal generative models. Z is this internal model: a latent representation of intent that reduces the "surprise" (cross-entropy) of the generated output.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — LATENT VARIABLE Z
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="Latent Variable Z — The Subconscious Layer"
        subtitle="A continuous vector encoding intent, strategy, and structure"
        color={R}
      />

      <Prose>
        <p>
          What exactly <em>is</em> Z? It is a <H tip="Continuous latent vector = a vector of real numbers (not discrete tokens) that lives in a learned latent space. Unlike discrete planning tokens, Z can smoothly interpolate between intentions — 'somewhat formal', 'mostly technical', 'slightly humorous'. This continuity is crucial for gradient-based training." color={R}>continuous vector</H> — typically 64 to 256 dimensions — that gets sampled <em>once</em> before the decoder starts generating. During training, Z is produced by a <H tip="Posterior network q(z|x,y) = a small neural network that sees BOTH the input x AND the target output y, then predicts the distribution of Z that best explains why this particular y follows from x. It 'cheats' by seeing the answer, producing a Z that captures the essence of the answer." color={CYAN}>posterior network</H> that can see both the input and the target output. During inference, Z comes from a <H tip="Prior network p(z|x) = a neural network that predicts Z from the input ALONE (no peeking at the output). Trained to approximate the posterior via KL divergence minimization. At inference time, this is all you have — so it must learn to predict useful intents from the question alone." color={PURPLE}>prior network</H> that sees only the input.
        </p>
        <p>
          The posterior says: "given that you asked <em>this question</em> and the answer turned out to be <em>this</em>, what Z would have best predicted the answer?" The prior says: "given just the question, what Z should I sample to generate a good answer?" The <H tip="KL divergence = a measure of how different two probability distributions are. During training, KL(q||p) pushes the prior to match the posterior — so that at inference time (when you only have the prior), the Z you sample is just as useful as the one the posterior would have given you." color={R}>KL divergence</H> between them is minimized during training, so the prior learns to be nearly as good as the posterior.
        </p>
      </Prose>

      {/* ── Latent Space Visualization SVG ── */}
      <Diagram caption={<><strong>The Latent Space</strong> — Z lives in a continuous space where nearby points encode similar intents. The posterior (rose) concentrates on the right Z for each example; the prior (cyan) learns to approximate it.</>}>
        <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <radialGradient id="ft-rg1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={R} stopOpacity="0.4" />
              <stop offset="100%" stopColor={R} stopOpacity="0.02" />
            </radialGradient>
            <radialGradient id="ft-rg2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={CYAN} stopOpacity="0.35" />
              <stop offset="100%" stopColor={CYAN} stopOpacity="0.02" />
            </radialGradient>
            <marker id="ft-ar2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={R} />
            </marker>
          </defs>

          <rect width="800" height="420" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="30" textAnchor="middle" fill={R} fontSize="13" fontWeight="700" letterSpacing="1.5" fontFamily="Inter, system-ui, sans-serif">LATENT SPACE VISUALIZATION</text>

          {/* Grid lines */}
          {[0,1,2,3,4,5,6,7].map(i => (
            <g key={`grid-${i}`}>
              <line x1={100 + i * 88} y1={50} x2={100 + i * 88} y2={380} stroke="#1e293b" strokeWidth="0.5" />
              <line x1={60} y1={50 + i * 47} x2={750} y2={50 + i * 47} stroke="#1e293b" strokeWidth="0.5" />
            </g>
          ))}

          {/* Axis labels */}
          <text x="400" y="405" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Latent dimension z₁</text>
          <text x="40" y="220" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif" transform="rotate(-90, 40, 220)">Latent dimension z₂</text>

          {/* Posterior distribution (rose ellipse) */}
          <ellipse cx="320" cy="200" rx="90" ry="65" fill="url(#ft-rg1)" stroke={R} strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="320" y="145" textAnchor="middle" fill={R} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">q(z|x,y) — Posterior</text>
          <text x="320" y="160" textAnchor="middle" fill={R2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">"Sees both question + answer"</text>

          {/* Prior distribution (cyan, slightly offset) */}
          <ellipse cx="345" cy="215" rx="100" ry="75" fill="url(#ft-rg2)" stroke={CYAN} strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="440" y="300" textAnchor="start" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">p(z|x) — Prior</text>
          <text x="440" y="315" textAnchor="start" fill={CYAN} fontSize="9" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">"Sees only question"</text>

          {/* Sample points in posterior */}
          {[[300,185],[335,210],[310,220],[340,195],[325,230],[305,200],[350,205]].map(([cx,cy], i) => (
            <circle key={`sp-${i}`} cx={cx} cy={cy} r="4" fill={R} opacity="0.8" />
          ))}

          {/* Z sample — the chosen point */}
          <circle cx="325" cy="205" r="8" fill={R} stroke="#fff" strokeWidth="2" />
          <text x="335" y="200" fill="#fff" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z*</text>

          {/* KL divergence annotation */}
          <path d="M365,175 C420,140 480,165 465,200" fill="none" stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="450" y="155" fill={AMBER} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">KL(q || p)</text>
          <text x="450" y="170" fill={AMBER} fontSize="9" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">Minimized during training</text>

          {/* Right side: cluster examples */}
          <rect x="560" y="65" width="210" height="305" rx="10" fill="rgba(255,255,255,0.03)" stroke="#334155" strokeWidth="1" />
          <text x="665" y="88" textAnchor="middle" fill={FG} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">REGIONS OF LATENT SPACE</text>

          {/* Cluster 1: Math */}
          <circle cx="600" cy="125" r="16" fill={R} fillOpacity="0.2" stroke={R} strokeWidth="1" />
          <text x="600" y="129" textAnchor="middle" fill={R} fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₁</text>
          <text x="625" y="129" fill={FG} fontSize="10" textAnchor="start" fontFamily="Inter, system-ui, sans-serif">Step-by-step math</text>

          {/* Cluster 2: Code */}
          <circle cx="600" cy="170" r="16" fill={CYAN} fillOpacity="0.2" stroke={CYAN} strokeWidth="1" />
          <text x="600" y="174" textAnchor="middle" fill={CYAN} fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₂</text>
          <text x="625" y="174" fill={FG} fontSize="10" textAnchor="start" fontFamily="Inter, system-ui, sans-serif">Code with comments</text>

          {/* Cluster 3: Creative */}
          <circle cx="600" cy="215" r="16" fill={PURPLE} fillOpacity="0.2" stroke={PURPLE} strokeWidth="1" />
          <text x="600" y="219" textAnchor="middle" fill={PURPLE} fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₃</text>
          <text x="625" y="219" fill={FG} fontSize="10" textAnchor="start" fontFamily="Inter, system-ui, sans-serif">Creative writing</text>

          {/* Cluster 4: Factual */}
          <circle cx="600" cy="260" r="16" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1" />
          <text x="600" y="264" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₄</text>
          <text x="625" y="264" fill={FG} fontSize="10" textAnchor="start" fontFamily="Inter, system-ui, sans-serif">Factual retrieval</text>

          {/* Cluster 5: Structured */}
          <circle cx="600" cy="305" r="16" fill={AMBER} fillOpacity="0.2" stroke={AMBER} strokeWidth="1" />
          <text x="600" y="309" textAnchor="middle" fill={AMBER} fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₅</text>
          <text x="625" y="309" fill={FG} fontSize="10" textAnchor="start" fontFamily="Inter, system-ui, sans-serif">JSON / structured output</text>

          {/* Bottom label */}
          <text x="665" y="350" textAnchor="middle" fill={GRAY} fontSize="9" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">Z self-organizes into intent clusters</text>
        </svg>
      </Diagram>

      <StepFlow
        color={R}
        steps={[
          { title: 'Input Encoding', desc: 'The input prompt x is processed by the encoder, producing contextual representations of each input token.' },
          { title: 'Posterior Sampling (Training)', desc: 'A small network sees both x and the target y, and outputs the mean μ and variance σ² of q(z|x,y). Z is sampled from this Gaussian using the reparameterization trick.' },
          { title: 'Prior Prediction (Inference)', desc: 'A separate network sees only x and predicts p(z|x). At inference time, Z is sampled from this prior. KL training ensures the prior approximates the posterior.' },
          { title: 'Decoder Conditioning', desc: 'Z is injected into the decoder — concatenated to token embeddings or used as a cross-attention target. Every generated token is conditioned on Z.' },
          { title: 'Autoregressive Generation', desc: 'The decoder generates tokens one at a time, as usual. But now each token "knows" the global plan encoded in Z, leading to more coherent, structured output.' },
        ]}
      />

      <ConceptCard title="The Reparameterization Trick — How Do You Backprop Through Randomness?" color={CYAN} defaultOpen={true}>
        <Prose>
          <p>
            Sampling Z from a <H tip="Gaussian distribution N(μ, σ²) = the bell curve. Parameterized by mean μ (center) and variance σ² (spread). The posterior network outputs μ and σ² for each input, defining where in latent space this particular input 'should' map to." color={CYAN}>Gaussian distribution</H> is a random operation — and you cannot compute gradients through randomness. The <H tip="Reparameterization trick = instead of sampling z ~ N(μ, σ²) directly, sample ε ~ N(0, 1) and compute z = μ + σ · ε. Now the randomness is in ε (which doesn't depend on parameters), and z is a differentiable function of μ and σ. Introduced by Kingma & Welling (2014) in the VAE paper." color={R}>reparameterization trick</H> solves this: instead of sampling z directly from N(μ, σ²), you sample ε from a fixed N(0, 1) and compute z = μ + σ · ε. Now z is a <em>deterministic, differentiable function</em> of μ and σ (which are outputs of neural networks), and the randomness is isolated in ε.
          </p>
        </Prose>
        <FormulaBlock
          math="z = \mu_\theta(x, y) + \sigma_\theta(x, y) \odot \varepsilon, \quad \varepsilon \sim \mathcal{N}(0, I)"
          label="Reparameterization Trick"
          color={CYAN}
          symbols={[
            { symbol: 'μ_θ', meaning: 'Mean of latent distribution, predicted by posterior network' },
            { symbol: 'σ_θ', meaning: 'Standard deviation, predicted by posterior network' },
            { symbol: 'ε', meaning: 'Random noise from unit Gaussian — the only source of stochasticity' },
            { symbol: '⊙', meaning: 'Element-wise multiplication' },
          ]}
        />
      </ConceptCard>

      <VisualCompare
        leftLabel="Standard Decoder"
        rightLabel="Z-Conditioned Decoder"
        leftColor={GRAY}
        rightColor={R}
        left={<>
          <p>Each token sees only previous tokens</p>
          <p>No global plan or intent</p>
          <p>Long-range coherence is emergent (and fragile)</p>
          <p>Structured output requires explicit prompting</p>
        </>}
        right={<>
          <p>Each token sees previous tokens <strong>+ Z</strong></p>
          <p style={{color: R}}>Z encodes holistic plan for entire output</p>
          <p>Coherence is architecturally guaranteed</p>
          <p>Structure emerges naturally from Z</p>
        </>}
        caption="Z acts as a persistent 'intention' signal that every token can reference"
      />

      <Callout type="insight">
        The posterior network is the "teacher" — it knows the answer and tells the model what Z should be.
        The prior network is the "student" — it must learn to predict the right Z from the question alone.
        At inference time, only the student remains. The KL divergence loss ensures the student is a good
        approximation of the teacher. This is the same teacher-student dynamic you see in knowledge distillation.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — ELBO TRAINING
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="ELBO Training — The Variational Objective"
        subtitle="Maximizing evidence through reconstruction and regularization"
        color={R}
      />

      <Prose>
        <p>
          The Free Transformer cannot be trained with standard <H tip="Maximum Likelihood Estimation (MLE) = training by maximizing p(y|x) — the probability of the correct output given the input. Standard cross-entropy loss does this. But with latent variables, computing p(y|x) requires integrating over ALL possible Z values, which is intractable." color={R}>maximum likelihood</H> because the latent variable Z makes the true likelihood intractable — you would need to integrate over <em>every possible Z</em> to compute p(y|x). Instead, the paper uses the <H tip="Evidence Lower Bound (ELBO) = a tractable lower bound on the true log-likelihood log p(y|x). Maximizing ELBO pushes up the true likelihood. ELBO = E[log p(y|x,z)] - KL(q(z|x,y) || p(z|x)). This is the foundational objective of Variational Autoencoders (VAEs)." color={R}>Evidence Lower Bound (ELBO)</H>, the same objective used in <H tip="Variational Autoencoder (VAE) = a generative model that learns a latent space by jointly training an encoder (maps data to latent distribution) and a decoder (maps latent samples back to data). Introduced by Kingma & Welling (2014). The Free Transformer is essentially a conditional VAE applied to language generation." color={CYAN}>Variational Autoencoders</H>.
        </p>
        <p>
          The ELBO has two terms that pull in opposite directions: the <H tip="Reconstruction term = E_q[log p(y|x,z)] — 'given a sampled Z, how well can the decoder reconstruct the target output?' This is just the standard cross-entropy loss, but with Z as additional conditioning. Maximizing this pushes the model to use Z effectively for generation." color={GREEN}>reconstruction term</H> rewards the model for generating the correct output given Z, while the <H tip="KL regularization term = KL(q(z|x,y) || p(z|x)) — how different is the posterior (which sees the answer) from the prior (which doesn't)? Minimizing this ensures that at inference time, sampling from the prior produces Z values that are useful for generation." color={AMBER}>KL regularization</H> prevents the posterior from diverging too far from the prior. The balance between them is the heart of variational training.
        </p>
      </Prose>

      {/* ── ELBO Decomposition SVG ── */}
      <Diagram caption={<><strong>ELBO Decomposition</strong> — The training objective balances two competing forces: reconstruct the output well (use Z effectively) and keep the prior close to the posterior (ensure Z is predictable at inference time).</>}>
        <svg viewBox="0 0 900 400" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="ft-elbo-gr" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.15" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0.03" />
            </linearGradient>
            <linearGradient id="ft-elbo-ga" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={AMBER} stopOpacity="0.15" />
              <stop offset="100%" stopColor={AMBER} stopOpacity="0.03" />
            </linearGradient>
          </defs>

          <rect width="900" height="400" rx="12" fill={BG} />

          {/* Title bar */}
          <rect x="250" y="15" width="400" height="35" rx="8" fill={R} fillOpacity="0.15" stroke={R} strokeWidth="1.5" />
          <text x="450" y="38" textAnchor="middle" fill={R} fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">ELBO = Reconstruction − KL Divergence</text>

          {/* Main ELBO equation */}
          <text x="450" y="80" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">log p(y|x) ≥ ELBO(x, y; θ, φ)</text>

          {/* Arrow down */}
          <line x1="450" y1="90" x2="450" y2="115" stroke={R} strokeWidth="1.5" />
          <circle cx="450" cy="115" r="3" fill={R} />

          {/* Split into two branches */}
          <line x1="450" y1="115" x2="230" y2="145" stroke={GREEN} strokeWidth="2" />
          <line x1="450" y1="115" x2="670" y2="145" stroke={AMBER} strokeWidth="2" />

          {/* LEFT: Reconstruction term */}
          <rect x="50" y="150" width="360" height="220" rx="12" fill="url(#ft-elbo-gr)" stroke={GREEN} strokeWidth="1.5" />
          <text x="230" y="178" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">RECONSTRUCTION TERM</text>
          <text x="230" y="198" textAnchor="middle" fill={GREEN} fontSize="10" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">Maximize — "Use Z to generate well"</text>

          {/* Formula */}
          <rect x="75" y="215" width="310" height="40" rx="8" fill="rgba(0,0,0,0.3)" stroke={GREEN} strokeWidth="1" />
          <text x="230" y="240" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">E_q [ log p(y | x, z) ]</text>

          {/* Explanation bullets */}
          <text x="80" y="280" fill={FG} fontSize="10" fontFamily="Inter, system-ui, sans-serif">• Standard cross-entropy loss + Z conditioning</text>
          <text x="80" y="300" fill={FG} fontSize="10" fontFamily="Inter, system-ui, sans-serif">• Forces decoder to USE Z for generation</text>
          <text x="80" y="320" fill={FG} fontSize="10" fontFamily="Inter, system-ui, sans-serif">• If Z is ignored → reconstruction degrades</text>
          <text x="80" y="340" fill={GREEN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">↑ Higher = model generates better with Z</text>

          {/* Emoji indicators */}
          <text x="230" y="365" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">MAXIMIZE</text>

          {/* RIGHT: KL term */}
          <rect x="490" y="150" width="360" height="220" rx="12" fill="url(#ft-elbo-ga)" stroke={AMBER} strokeWidth="1.5" />
          <text x="670" y="178" textAnchor="middle" fill={AMBER} fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">KL DIVERGENCE TERM</text>
          <text x="670" y="198" textAnchor="middle" fill={AMBER} fontSize="10" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">Minimize — "Keep prior close to posterior"</text>

          {/* Formula */}
          <rect x="515" y="215" width="310" height="40" rx="8" fill="rgba(0,0,0,0.3)" stroke={AMBER} strokeWidth="1" />
          <text x="670" y="240" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">KL( q(z|x,y) || p(z|x) )</text>

          {/* Explanation bullets */}
          <text x="520" y="280" fill={FG} fontSize="10" fontFamily="Inter, system-ui, sans-serif">• Measures posterior-prior gap</text>
          <text x="520" y="300" fill={FG} fontSize="10" fontFamily="Inter, system-ui, sans-serif">• Ensures prior can predict useful Z at test time</text>
          <text x="520" y="320" fill={FG} fontSize="10" fontFamily="Inter, system-ui, sans-serif">• Too much KL → posterior collapse (Z ignored)</text>
          <text x="520" y="340" fill={AMBER} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">↓ Lower = prior matches posterior well</text>

          {/* Emoji indicators */}
          <text x="670" y="365" textAnchor="middle" fill={AMBER} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">MINIMIZE</text>

          {/* Minus sign between them */}
          <rect x="422" y="238" width="56" height="30" rx="15" fill={R} fillOpacity="0.2" stroke={R} strokeWidth="1.5" />
          <text x="450" y="259" textAnchor="middle" fill={R} fontSize="18" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">−</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="ELBO — Building Up Step by Step"
        color={R}
        steps={[
          {
            note: 'Start with the goal: maximize the log probability of the correct output y given input x. But with latent variable Z, this integral is intractable.',
            math: '\\log p(y|x) = \\log \\int p(y|x,z)\\, p(z|x)\\, dz \\quad \\text{(intractable)}',
          },
          {
            note: 'Introduce an approximate posterior q(z|x,y) and apply Jensen\'s inequality. This gives us a lower bound we CAN compute.',
            math: '\\log p(y|x) \\geq \\mathbb{E}_{q(z|x,y)} \\left[ \\log p(y|x,z) \\right] - \\text{KL}\\left( q(z|x,y) \\| p(z|x) \\right)',
          },
          {
            note: 'The ELBO decomposes into two terms: (1) reconstruction — how well the decoder generates y given sampled Z, and (2) KL — how close the posterior is to the prior.',
            math: '\\text{ELBO}(x, y) = \\underbrace{\\mathbb{E}_{q} \\left[ \\log p(y|x,z) \\right]}_{\\text{Reconstruction}} - \\underbrace{\\text{KL}\\left( q(z|x,y) \\| p(z|x) \\right)}_{\\text{Regularization}}',
          },
          {
            note: 'For Gaussian posterior and prior, the KL has a closed-form solution. No approximation needed.',
            math: '\\text{KL} = \\frac{1}{2} \\sum_{i=1}^{d} \\left( \\frac{\\sigma_{q,i}^2}{\\sigma_{p,i}^2} + \\frac{(\\mu_{p,i} - \\mu_{q,i})^2}{\\sigma_{p,i}^2} - 1 + \\log \\frac{\\sigma_{p,i}^2}{\\sigma_{q,i}^2} \\right)',
          },
        ]}
        symbols={[
          { symbol: 'p(y|x,z)', meaning: 'Decoder: generates output y conditioned on input x and latent Z' },
          { symbol: 'q(z|x,y)', meaning: 'Posterior: approximates the true posterior using both input and output' },
          { symbol: 'p(z|x)', meaning: 'Prior: predicts Z from input alone (used at inference)' },
          { symbol: 'KL(q||p)', meaning: 'KL divergence — how far the posterior deviates from the prior' },
        ]}
      />

      <ConceptCard title="Posterior Collapse — The #1 Training Challenge" color={AMBER} defaultOpen={true}>
        <Prose>
          <p>
            The greatest risk in training the Free Transformer is <H tip="Posterior collapse = a failure mode where the model learns to ignore Z entirely. The posterior collapses to match the prior (KL → 0), and the decoder generates output based only on x. This happens because powerful autoregressive decoders can achieve low reconstruction loss without Z, so the KL penalty 'wins' and kills the latent variable." color={AMBER}>posterior collapse</H> — the model learns to ignore Z entirely. This happens because a powerful autoregressive decoder can already achieve decent reconstruction loss without Z, so the easiest way to minimize KL is to make the posterior equal to the prior (KL = 0), effectively deleting Z from the computation.
          </p>
          <p>
            The Free Transformer prevents this with <H tip="KL annealing = gradually increasing the weight of the KL term from 0 to 1 during training. In early epochs, the model learns to USE Z (low KL weight means Z can carry lots of information freely). By the time KL weight reaches 1, the model is already dependent on Z and won't collapse. Introduced by Bowman et al. (2016)." color={R}>KL annealing</H> — starting with zero KL weight and linearly increasing it over training. Early on, the model learns to rely on Z without penalty. By the time the KL kicks in, Z is deeply integrated and the model cannot easily remove it.
          </p>
        </Prose>
      </ConceptCard>

      {/* ── KL Annealing Curve SVG ── */}
      <Diagram caption={<><strong>KL Annealing Schedule</strong> — The KL weight β starts at 0 and linearly increases to 1, giving the model time to learn to use Z before regularization kicks in.</>}>
        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto' }}>
          <rect width="800" height="340" rx="12" fill={BG} />

          {/* Axes */}
          <line x1="100" y1="270" x2="720" y2="270" stroke={GRAY} strokeWidth="1.5" />
          <line x1="100" y1="270" x2="100" y2="60" stroke={GRAY} strokeWidth="1.5" />

          {/* Y-axis labels */}
          <text x="85" y="75" textAnchor="end" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">1.0</text>
          <text x="85" y="175" textAnchor="end" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">0.5</text>
          <text x="85" y="275" textAnchor="end" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">0.0</text>
          <text x="40" y="170" textAnchor="middle" fill={R} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" transform="rotate(-90, 40, 170)">KL Weight β</text>

          {/* X-axis labels */}
          <text x="100" y="295" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">0</text>
          <text x="300" y="295" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">25%</text>
          <text x="500" y="295" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">50%</text>
          <text x="720" y="295" textAnchor="middle" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">100%</text>
          <text x="410" y="320" textAnchor="middle" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">Training Progress</text>

          {/* Gridlines */}
          <line x1="100" y1="172" x2="720" y2="172" stroke="#1e293b" strokeWidth="0.5" />
          <line x1="300" y1="60" x2="300" y2="270" stroke="#1e293b" strokeWidth="0.5" />
          <line x1="500" y1="60" x2="500" y2="270" stroke="#1e293b" strokeWidth="0.5" />

          {/* Annealing curve — linear ramp from 0 to 50%, then plateau */}
          <path
            d="M100,270 L500,70 L720,70"
            fill="none"
            stroke={R}
            strokeWidth="3"
          />

          {/* Fill under curve */}
          <path
            d="M100,270 L500,70 L720,70 L720,270 Z"
            fill={R}
            fillOpacity="0.08"
          />

          {/* Phase 1 annotation */}
          <rect x="140" y="195" width="160" height="50" rx="8" fill="rgba(0,0,0,0.4)" stroke={GREEN} strokeWidth="1" />
          <text x="220" y="215" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Phase 1: Free Learning</text>
          <text x="220" y="232" textAnchor="middle" fill={GREEN} fontSize="9" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">β ≈ 0, Z carries info freely</text>

          {/* Phase 2 annotation */}
          <rect x="520" y="85" width="180" height="50" rx="8" fill="rgba(0,0,0,0.4)" stroke={AMBER} strokeWidth="1" />
          <text x="610" y="105" textAnchor="middle" fill={AMBER} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Phase 2: Regularized</text>
          <text x="610" y="122" textAnchor="middle" fill={AMBER} fontSize="9" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">β = 1, prior must match posterior</text>

          {/* Transition marker */}
          <circle cx="500" cy="70" r="5" fill={R} stroke="#fff" strokeWidth="1.5" />
          <text x="500" y="55" textAnchor="middle" fill={R} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">β = 1.0</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>ELBO training in everyday terms:</strong> Imagine teaching someone to give speeches. The ELBO says: (1) your speech should accurately convey the intended message (reconstruction), but (2) your speech preparation method should be simple enough that you can replicate it from the topic alone, without seeing the finished speech first (KL). KL annealing is like letting the student use detailed notes in early practice sessions (low β), then gradually removing the notes until they can prepare just from the topic (β = 1).</p>
      </SimpleExplain>

      <Callout type="warning">
        If KL annealing is too fast, the model collapses Z before it becomes useful. If it is too slow,
        the model becomes overly dependent on the posterior and the prior never learns properly. The Free
        Transformer paper finds that annealing over the first 50% of training is the sweet spot — long enough
        to establish Z dependency, short enough for the prior to converge.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — REASONING GAINS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="Reasoning Gains — Why Z Helps Models Think"
        subtitle="From token-level prediction to holistic problem solving"
        color={R}
      />

      <Prose>
        <p>
          The most striking result of the Free Transformer is its impact on <H tip="Reasoning tasks = problems that require multi-step logical deduction, mathematical computation, or structured analysis. Examples: GSM8K (grade school math), MATH (competition math), ARC (abstract reasoning). These are where standard autoregressive models struggle most." color={R}>reasoning tasks</H>. On benchmarks like <H tip="GSM8K = Grade School Math 8K — a benchmark of 8,473 grade-school level math word problems. Requires multi-step arithmetic reasoning. State-of-the-art LLMs score 80-95%, but smaller models often fail on multi-step problems." color={GREEN}>GSM8K</H> and <H tip="MATH = a benchmark of 12,500 competition-level math problems across 7 subjects (algebra, geometry, number theory, etc.). Much harder than GSM8K — even GPT-4 only scores ~50%. Tests deep mathematical reasoning." color={GREEN}>MATH</H>, the Free Transformer shows consistent improvements over identically-sized baselines — typically <strong>4-8% absolute</strong> improvement at the same parameter count and training budget.
        </p>
        <p>
          Why does Z help with reasoning? The intuition is that <H tip="Multi-step reasoning requires a plan. In standard Transformers, the 'plan' must emerge implicitly from the token-by-token generation process. This works for simple problems but fails for complex ones because early token choices constrain later options. Z provides an explicit plan that prevents the model from 'painting itself into a corner'." color={R}>multi-step reasoning benefits from planning</H>. Consider a math problem that requires 5 steps. A standard Transformer must commit to step 1 before knowing what step 5 will look like. If step 1 is suboptimal, the model is stuck. With Z, the model samples a latent plan that encodes the <em>overall strategy</em> — "this is a system-of-equations problem, solve by substitution" — and each step is generated in alignment with that plan.
        </p>
      </Prose>

      {/* ── Reasoning Improvement Bars SVG ── */}
      <Diagram caption={<><strong>Reasoning Benchmark Improvements</strong> — Free Transformer (rose) vs standard Transformer baseline (gray) at the same model size and training compute. Z provides consistent gains across all reasoning tasks.</>}>
        <svg viewBox="0 0 900 400" style={{ width: '100%', height: 'auto' }}>
          <rect width="900" height="400" rx="12" fill={BG} />

          {/* Title */}
          <text x="450" y="30" textAnchor="middle" fill={R} fontSize="13" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">REASONING BENCHMARK RESULTS (% accuracy)</text>

          {/* Y-axis */}
          <line x1="120" y1="55" x2="120" y2="340" stroke="#334155" strokeWidth="1" />
          {[0, 20, 40, 60, 80, 100].map((v, i) => (
            <g key={`ya-${i}`}>
              <text x="110" y={340 - (v / 100) * 275 + 4} textAnchor="end" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">{v}</text>
              <line x1="118" y1={340 - (v / 100) * 275} x2="830" y2={340 - (v / 100) * 275} stroke="#1e293b" strokeWidth="0.5" />
            </g>
          ))}

          {/* X-axis */}
          <line x1="120" y1="340" x2="830" y2="340" stroke="#334155" strokeWidth="1" />

          {/* Benchmark groups */}
          {[
            { name: 'GSM8K', base: 72, free: 79, x: 190 },
            { name: 'MATH', base: 38, free: 45, x: 330 },
            { name: 'ARC-C', base: 61, free: 67, x: 470 },
            { name: 'HumanEval', base: 55, free: 62, x: 610 },
            { name: 'MBPP', base: 59, free: 65, x: 750 },
          ].map(({ name, base, free, x }) => {
            const barW = 35;
            const baseH = (base / 100) * 275;
            const freeH = (free / 100) * 275;
            return (
              <g key={name}>
                {/* Baseline bar */}
                <rect x={x - barW - 4} y={340 - baseH} width={barW} height={baseH} rx="4" fill={GRAY} fillOpacity="0.3" stroke={GRAY} strokeWidth="1" />
                <text x={x - barW / 2 - 4} y={340 - baseH - 8} textAnchor="middle" fill={GRAY} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{base}</text>

                {/* Free Transformer bar */}
                <rect x={x + 4} y={340 - freeH} width={barW} height={freeH} rx="4" fill={R} fillOpacity="0.7" stroke={R} strokeWidth="1" />
                <text x={x + barW / 2 + 4} y={340 - freeH - 8} textAnchor="middle" fill={R} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{free}</text>

                {/* Improvement delta */}
                <text x={x} y={340 - freeH - 22} textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">+{free - base}</text>

                {/* Label */}
                <text x={x} y={360} textAnchor="middle" fill={FG} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{name}</text>
              </g>
            );
          })}

          {/* Legend */}
          <rect x="300" y="375" width="14" height="14" rx="3" fill={GRAY} fillOpacity="0.3" stroke={GRAY} strokeWidth="1" />
          <text x="320" y="387" fill={GRAY} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Standard Transformer</text>
          <rect x="490" y="375" width="14" height="14" rx="3" fill={R} fillOpacity="0.7" stroke={R} strokeWidth="1" />
          <text x="510" y="387" fill={R} fontSize="10" fontFamily="Inter, system-ui, sans-serif">Free Transformer (+Z)</text>
        </svg>
      </Diagram>

      <ConceptCard title="Why Does Z Help Reasoning? Three Mechanisms" color={R} defaultOpen={true}>
        <StepFlow
          color={R}
          steps={[
            { title: 'Strategy Selection', desc: 'Z can encode which reasoning strategy to use (substitution vs elimination, proof by contradiction vs direct proof). The model selects the approach BEFORE generating any tokens, avoiding dead-end strategies.' },
            { title: 'Information Compression', desc: 'Z acts as a "summary" of the answer\'s structure. For a 5-step math problem, Z might encode "the answer involves factoring a quadratic then applying the quadratic formula." This compressed plan keeps all 5 steps aligned.' },
            { title: 'Error Recovery', desc: 'Because Z encodes the global plan, individual token-level errors are less catastrophic. If one step is slightly off, Z keeps the overall trajectory on track — like how knowing your destination helps you recover from a wrong turn.' },
          ]}
        />
      </ConceptCard>

      {/* ── Strategy Selection SVG ── */}
      <Diagram caption={<><strong>Z as Strategy Selector</strong> — Different Z samples activate different reasoning strategies. The model chooses its approach before generating the first token.</>}>
        <svg viewBox="0 0 800 350" style={{ width: '100%', height: 'auto' }}>
          <rect width="800" height="350" rx="12" fill={BG} />

          {/* Input */}
          <rect x="30" y="130" width="180" height="60" rx="10" fill="url(#ft-gd)" stroke={R} strokeWidth="1.5" />
          <text x="120" y="157" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Input Problem</text>
          <text x="120" y="175" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">"Solve x² + 5x + 6 = 0"</text>

          {/* Arrow to Z */}
          <line x1="210" y1="160" x2="270" y2="160" stroke={R} strokeWidth="2" markerEnd="url(#ft-ar)" />

          {/* Z sampler */}
          <rect x="275" y="120" width="110" height="80" rx="40" fill={R} fillOpacity="0.2" stroke={R} strokeWidth="2" />
          <text x="330" y="155" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Z</text>
          <text x="330" y="175" textAnchor="middle" fill={R2} fontSize="9" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Sample</text>

          {/* Three strategy branches */}
          {/* Branch 1: Factoring */}
          <line x1="385" y1="135" x2="480" y2="70" stroke={GREEN} strokeWidth="2" />
          <circle cx="480" cy="70" r="4" fill={GREEN} />
          <rect x="490" y="40" width="280" height="60" rx="8" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1" />
          <text x="630" y="62" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₁: Factor → (x+2)(x+3) = 0</text>
          <text x="630" y="82" textAnchor="middle" fill={GREEN} fontSize="9" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">Direct factoring strategy</text>

          {/* Branch 2: Quadratic formula */}
          <line x1="385" y1="160" x2="480" y2="160" stroke={CYAN} strokeWidth="2" />
          <circle cx="480" cy="160" r="4" fill={CYAN} />
          <rect x="490" y="130" width="280" height="60" rx="8" fill={CYAN} fillOpacity="0.1" stroke={CYAN} strokeWidth="1" />
          <text x="630" y="152" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₂: x = (-5 ± sqrt(1)) / 2</text>
          <text x="630" y="172" textAnchor="middle" fill={CYAN} fontSize="9" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">Quadratic formula strategy</text>

          {/* Branch 3: Completing the square */}
          <line x1="385" y1="185" x2="480" y2="250" stroke={PURPLE} strokeWidth="2" />
          <circle cx="480" cy="250" r="4" fill={PURPLE} />
          <rect x="490" y="220" width="280" height="60" rx="8" fill={PURPLE} fillOpacity="0.1" stroke={PURPLE} strokeWidth="1" />
          <text x="630" y="242" textAnchor="middle" fill={PURPLE} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z₃: (x+2.5)² = 0.25 → solve</text>
          <text x="630" y="262" textAnchor="middle" fill={PURPLE} fontSize="9" opacity="0.8" fontFamily="Inter, system-ui, sans-serif">Completing the square strategy</text>

          {/* Bottom annotation */}
          <rect x="250" y="305" width="300" height="28" rx="8" fill={R} fillOpacity="0.1" stroke={R} strokeWidth="1" />
          <text x="400" y="324" textAnchor="middle" fill={R} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">All strategies → same answer: x = -2, -3</text>
        </svg>
      </Diagram>

      <Callout type="insight">
        The reasoning gain is not just about getting the right answer — it is about getting there <strong>more
        efficiently</strong>. Free Transformer solutions tend to be shorter (fewer tokens) and more direct
        because Z eliminates exploratory dead ends. The model does not need to "think out loud" as much
        when it already has a plan.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — STRUCTURED GENERATION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="Structured Generation — Z as a Blueprint"
        subtitle="JSON, code, tables, and any output that needs global coherence"
        color={R}
      />

      <Prose>
        <p>
          Beyond reasoning, the Free Transformer excels at <H tip="Structured generation = producing output that follows a strict format: JSON with specific fields, code with proper syntax, tables with aligned columns, XML with matching tags. Standard autoregressive models struggle because they must produce opening tokens without knowing the closing structure." color={R}>structured generation</H> — tasks where the output must conform to a specific format. Think <H tip="JSON generation = producing valid JSON objects with specific keys and value types. A standard Transformer might open a bracket and start writing keys without knowing how many there will be, leading to malformed output. Z can encode the schema upfront." color={CYAN}>JSON with required fields</H>, <H tip="Code generation = producing syntactically and semantically correct code. Requires matching brackets, proper variable scoping, correct function signatures, and logical flow — all of which benefit from knowing the overall structure before writing line 1." color={GREEN}>syntactically correct code</H>, or <H tip="Multi-paragraph essays = text that needs a coherent argument arc, proper transitions, and a conclusion that ties back to the introduction. Without planning, models often lose the thread or repeat themselves." color={PURPLE}>multi-paragraph essays</H> with coherent argument structure.
        </p>
        <p>
          The key insight is that structured output requires <H tip="Global coherence = the property that distant parts of the output are consistent with each other. The opening bracket of a JSON object must match a closing bracket hundreds of tokens later. The introduction of an essay must align with its conclusion. Standard left-to-right generation makes this surprisingly hard." color={R}>global coherence</H> — the end of the output must be consistent with the beginning. A standard Transformer generating JSON might produce an opening <code>{"{"}</code> without "knowing" how many keys it will need, leading to truncated or malformed output. Z solves this by encoding the <em>blueprint</em> — the number of fields, the nesting depth, the overall structure — before a single token is generated.
        </p>
      </Prose>

      {/* ── Structured Generation SVG ── */}
      <Diagram caption={<><strong>Structured Generation with Z</strong> — Z encodes the blueprint (schema, structure, format), then the decoder fills in the details. This prevents malformed output and ensures global consistency.</>}>
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto' }}>
          <rect width="800" height="380" rx="12" fill={BG} />

          {/* Z blueprint */}
          <rect x="30" y="30" width="200" height="320" rx="10" fill={R} fillOpacity="0.08" stroke={R} strokeWidth="1.5" />
          <text x="130" y="55" textAnchor="middle" fill={R} fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Z ENCODES</text>

          {/* Blueprint items */}
          {[
            { y: 80, text: 'Output type: JSON', icon: '{..}' },
            { y: 115, text: '4 required fields', icon: '#4' },
            { y: 150, text: 'Nested array in field 3', icon: '[..]' },
            { y: 185, text: 'String values in 1, 2', icon: '"ab"' },
            { y: 220, text: 'Number value in field 4', icon: '42' },
            { y: 255, text: 'Total ~120 tokens', icon: '~T' },
          ].map(({ y, text, icon }) => (
            <g key={text}>
              <rect x="45" y={y} width="170" height="28" rx="6" fill="rgba(0,0,0,0.3)" stroke={R} strokeWidth="0.5" />
              <text x="60" y={y + 18} fill={R2} fontSize="10" fontWeight="700" fontFamily="'Courier New', monospace">{icon}</text>
              <text x="90" y={y + 18} fill={FG} fontSize="10" fontFamily="Inter, system-ui, sans-serif">{text}</text>
            </g>
          ))}

          <text x="130" y="310" textAnchor="middle" fill={R2} fontSize="9" fontStyle="italic" fontFamily="Inter, system-ui, sans-serif">Decided BEFORE first token</text>

          {/* Arrow to decoder */}
          <line x1="235" y1="190" x2="280" y2="190" stroke={R} strokeWidth="2" markerEnd="url(#ft-ar)" />

          {/* Decoder output */}
          <rect x="290" y="30" width="480" height="320" rx="10" fill="rgba(255,255,255,0.02)" stroke="#334155" strokeWidth="1" />
          <text x="530" y="55" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">DECODER OUTPUT (Z-conditioned)</text>

          {/* JSON output */}
          {[
            { y: 75, text: '{', color: GRAY },
            { y: 97, text: '  "name": "Free Transformer",', color: R2 },
            { y: 119, text: '  "venue": "arXiv 2025",', color: R2 },
            { y: 141, text: '  "contributions": [', color: CYAN },
            { y: 163, text: '    "Latent variable Z",', color: CYAN },
            { y: 185, text: '    "ELBO training",', color: CYAN },
            { y: 207, text: '    "3% overhead"', color: CYAN },
            { y: 229, text: '  ],', color: CYAN },
            { y: 251, text: '  "overhead_pct": 3', color: AMBER },
            { y: 273, text: '}', color: GRAY },
          ].map(({ y, text, color }) => (
            <text key={`json-${y}`} x="320" y={y} fill={color} fontSize="12" fontFamily="'Courier New', monospace">{text}</text>
          ))}

          {/* Annotations */}
          <line x1="600" y1="97" x2="680" y2="85" stroke={R2} strokeWidth="0.5" strokeDasharray="3 2" />
          <text x="685" y="88" fill={R2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">String fields (from Z)</text>

          <line x1="600" y1="163" x2="680" y2="163" stroke={CYAN} strokeWidth="0.5" strokeDasharray="3 2" />
          <text x="685" y="166" fill={CYAN} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Nested array (from Z)</text>

          <line x1="600" y1="251" x2="680" y2="260" stroke={AMBER} strokeWidth="0.5" strokeDasharray="3 2" />
          <text x="685" y="263" fill={AMBER} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Number field (from Z)</text>

          {/* Check mark */}
          <rect x="310" y="295" width="160" height="28" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="390" y="314" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Valid JSON output</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Task', 'Standard Transformer', 'Free Transformer', 'Improvement']}
        rows={[
          ['JSON validity', '~87% well-formed', '~96% well-formed', '+9% absolute'],
          ['Code (pass@1)', '55% HumanEval', '62% HumanEval', '+7% absolute'],
          ['Long-form coherence', 'Degrades after ~500 tokens', 'Stable to 2000+ tokens', 'Qualitative'],
          ['Schema adherence', '72% field-complete', '91% field-complete', '+19% absolute'],
          ['Table generation', 'Column drift after 5 rows', 'Consistent alignment', 'Qualitative'],
        ]}
        caption="Z provides the largest gains on tasks requiring global structural consistency"
      />

      <MentalModel
        title="The Blueprint Analogy"
        analogy="Building a house without blueprints means laying bricks one at a time and hoping the walls end up straight. Z is the blueprint — the architect's plan that specifies the foundation, the number of rooms, where the plumbing goes. Each brick (token) is still placed one at a time, but the builder knows exactly where it fits in the larger structure."
        technical="Z conditions the decoder at every layer via cross-attention or concatenation. For structured output, the latent space self-organizes so that different regions encode different schemas (JSON vs XML vs code). The model learns this organization purely from data — no explicit schema supervision is needed."
        color={R}
      />

      <Callout type="insight">
        The structured generation improvements are arguably more impactful than the reasoning gains for
        real-world applications. Every API call that returns JSON, every code completion, every formatted
        report benefits from Z's structural planning. The 19% improvement in schema adherence alone could
        eliminate most output parsing failures in production systems.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — RESULTS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Results — 3% Cost, Outsized Returns"
        subtitle="Consistent improvements across reasoning, generation, and structure"
        color={R}
      />

      <Prose>
        <p>
          The headline result is the <H tip="Cost-benefit ratio = the ratio of performance improvement to additional compute cost. At 3% overhead for 4-8% absolute improvement on reasoning benchmarks, the Free Transformer has one of the best cost-benefit ratios of any recent architectural modification." color={R}>cost-benefit ratio</H>: the Free Transformer adds only <strong>3% compute overhead</strong> (one small forward pass through the prior network per generation) but delivers improvements across the board. This is not a marginal gain requiring massive scale — it works at <H tip="Parameter scale independence = the improvements hold at 1B, 7B, and 13B parameter scales. This suggests the mechanism is fundamental, not an artifact of under/over-parameterization." color={R}>every model size tested</H> from 1B to 13B parameters.
        </p>
        <p>
          The paper validates across three axes: <H tip="Reasoning benchmarks include GSM8K (grade school math), MATH (competition math), ARC-Challenge (abstract reasoning), and Big-Bench Hard (diverse hard reasoning). The Free Transformer improves on ALL of them." color={GREEN}>reasoning benchmarks</H>, <H tip="Generation quality is measured by both automated metrics (perplexity, BLEU, pass@k) and human evaluation (coherence, helpfulness, correctness). The Free Transformer improves on both types of evaluation." color={CYAN}>generation quality</H>, and <H tip="Structured output evaluation measures format correctness (is the JSON valid?), schema adherence (are all required fields present?), and content accuracy (are the values correct?). Z helps most with format and schema." color={AMBER}>structured output fidelity</H>. The gains are additive — they stack with other techniques like <H tip="Chain-of-thought (CoT) prompting = asking the model to 'think step by step' before giving a final answer. CoT is a prompting technique; Z is an architectural one. They complement each other: CoT structures the explicit reasoning, Z provides the latent plan behind it." color={PURPLE}>chain-of-thought prompting</H> and <H tip="Reinforcement Learning from Human Feedback (RLHF) = fine-tuning a model using human preference data. The Free Transformer can be RLHF'd just like a standard Transformer. The latent variable Z doesn't interfere with the RLHF pipeline." color={PURPLE}>RLHF</H>.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '+7', unit: '%', label: 'GSM8K Improvement', color: R },
          { value: '+7', unit: '%', label: 'MATH Improvement', color: R2 },
          { value: '+19', unit: '%', label: 'Schema Adherence', color: AMBER },
          { value: '3', unit: '%', label: 'Compute Overhead', color: GREEN },
        ]}
      />

      {/* ── Results Overview SVG ── */}
      <Diagram caption={<><strong>Performance Overview</strong> — The Free Transformer delivers improvements across reasoning, coding, and structured generation at minimal compute cost. Green = improvement over baseline.</>}>
        <svg viewBox="0 0 900 360" style={{ width: '100%', height: 'auto' }}>
          <rect width="900" height="360" rx="12" fill={BG} />

          {/* Title */}
          <text x="450" y="30" textAnchor="middle" fill={R} fontSize="13" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">PERFORMANCE RADAR: FREE TRANSFORMER vs BASELINE</text>

          {/* Three category boxes */}
          {/* Reasoning */}
          <rect x="30" y="55" width="270" height="280" rx="10" fill="rgba(255,255,255,0.02)" stroke={R} strokeWidth="1" />
          <text x="165" y="80" textAnchor="middle" fill={R} fontSize="12" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">REASONING</text>

          {[
            { name: 'GSM8K', delta: '+7%', y: 105 },
            { name: 'MATH', delta: '+7%', y: 140 },
            { name: 'ARC-Challenge', delta: '+6%', y: 175 },
            { name: 'Big-Bench Hard', delta: '+5%', y: 210 },
            { name: 'LogiQA', delta: '+4%', y: 245 },
          ].map(({ name, delta, y }) => (
            <g key={name}>
              <text x="50" y={y} fill={FG} fontSize="11" fontFamily="Inter, system-ui, sans-serif">{name}</text>
              <rect x="200" y={y - 14} width="80" height="20" rx="4" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="0.5" />
              <text x="240" y={y} textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{delta}</text>
            </g>
          ))}

          <rect x="50" y="270" width="210" height="24" rx="6" fill={R} fillOpacity="0.1" />
          <text x="155" y="287" textAnchor="middle" fill={R2} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Z selects reasoning strategy upfront</text>

          {/* Coding */}
          <rect x="315" y="55" width="270" height="280" rx="10" fill="rgba(255,255,255,0.02)" stroke={CYAN} strokeWidth="1" />
          <text x="450" y="80" textAnchor="middle" fill={CYAN} fontSize="12" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">CODE GENERATION</text>

          {[
            { name: 'HumanEval', delta: '+7%', y: 105 },
            { name: 'MBPP', delta: '+6%', y: 140 },
            { name: 'CodeContests', delta: '+4%', y: 175 },
            { name: 'Syntax validity', delta: '+8%', y: 210 },
            { name: 'Compilation rate', delta: '+11%', y: 245 },
          ].map(({ name, delta, y }) => (
            <g key={name}>
              <text x="335" y={y} fill={FG} fontSize="11" fontFamily="Inter, system-ui, sans-serif">{name}</text>
              <rect x="485" y={y - 14} width="80" height="20" rx="4" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="0.5" />
              <text x="525" y={y} textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{delta}</text>
            </g>
          ))}

          <rect x="335" y="270" width="210" height="24" rx="6" fill={CYAN} fillOpacity="0.1" />
          <text x="440" y="287" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Z plans function structure + logic</text>

          {/* Structured Output */}
          <rect x="600" y="55" width="270" height="280" rx="10" fill="rgba(255,255,255,0.02)" stroke={AMBER} strokeWidth="1" />
          <text x="735" y="80" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">STRUCTURED OUTPUT</text>

          {[
            { name: 'JSON validity', delta: '+9%', y: 105 },
            { name: 'Schema adherence', delta: '+19%', y: 140 },
            { name: 'Table alignment', delta: '+12%', y: 175 },
            { name: 'XML well-formed', delta: '+8%', y: 210 },
            { name: 'Markdown format', delta: '+5%', y: 245 },
          ].map(({ name, delta, y }) => (
            <g key={name}>
              <text x="620" y={y} fill={FG} fontSize="11" fontFamily="Inter, system-ui, sans-serif">{name}</text>
              <rect x="770" y={y - 14} width="80" height="20" rx="4" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="0.5" />
              <text x="810" y={y} textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{delta}</text>
            </g>
          ))}

          <rect x="620" y="270" width="210" height="24" rx="6" fill={AMBER} fillOpacity="0.1" />
          <text x="725" y="287" textAnchor="middle" fill={AMBER} fontSize="10" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Z encodes output schema/format</text>
        </svg>
      </Diagram>

      <ConceptCard title="Ablation: What Happens Without Z?" color={R3} defaultOpen={true}>
        <ComparisonTable
          headers={['Ablation', 'GSM8K', 'JSON Valid', 'Notes']}
          rows={[
            ['Full model (Z + ELBO)', '79%', '96%', 'Best performance across all tasks'],
            ['Z with fixed prior (no KL)', '74%', '91%', 'Z helps but prior is poorly calibrated'],
            ['Z with full KL (no annealing)', '73%', '88%', 'Posterior collapse partially occurs'],
            ['No Z (standard baseline)', '72%', '87%', 'Standard autoregressive Transformer'],
            ['Z with random prior (noise)', '71%', '85%', 'Random Z hurts — Z must be informative'],
          ]}
          caption="KL annealing is critical — without it, Z collapses. Random Z is worse than no Z."
        />
      </ConceptCard>

      <SimpleExplain>
        <p><strong>The bottom line:</strong> For a 3% increase in compute (sampling one small latent vector per generation), you get 4-8% improvement on reasoning, 7% on code, and up to 19% on structured output. The Free Transformer is compatible with all existing techniques (CoT, RLHF, fine-tuning) and works at every model scale tested. It is the rare architectural change that is simultaneously cheap, general, and effective.</p>
      </SimpleExplain>

      <Callout type="key">
        Meta calls the Free Transformer "the first Transformer with intrinsic intent." This is not
        hyperbole — Z is the first architectural component that explicitly separates <em>what</em> to say
        from <em>how</em> to say it. Previous approaches (chain-of-thought, scratchpads) achieve this
        through prompting hacks. Z does it at the architecture level, making intent a first-class citizen
        of the generation process.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — MENTAL MODELS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Mental Models — Thinking About the Free Transformer"
        subtitle="Five ways to build intuition for latent variable decoding"
        color={R}
      />

      <MentalModel
        title="The Subconscious Mind"
        analogy="Before you speak, your subconscious has already formed the gist of what you want to say — the tone, the structure, the key points. You don't consciously plan every word; instead, this pre-verbal intention shapes your speech as it unfolds. Z is this subconscious layer: a latent intention that forms before the first word and guides every word that follows."
        technical="Z is sampled from a learned Gaussian prior p(z|x) conditioned on the input. It is injected into the decoder via cross-attention or concatenation, providing a persistent conditioning signal that every token generation step can access. The prior is trained via KL minimization against the posterior q(z|x,y)."
        color={R}
      />

      <MentalModel
        title="The GPS Navigator"
        analogy="A standard Transformer is like driving with turn-by-turn directions but no map — each instruction is correct locally but you have no sense of the overall route. Z is the GPS setting the destination before you start driving. Each turn (token) is still made sequentially, but you always know where you're headed. If you miss a turn, Z helps you reroute instead of getting lost."
        technical="Mathematically, Z reduces the effective entropy of the conditional distribution p(y_t | y_{<t}, x, z) by providing a consistent context signal. This makes each token prediction more 'certain' and more aligned with the global output structure, reducing generation variance."
        color={CYAN}
      />

      <MentalModel
        title="The Movie Director"
        analogy="The director's vision for a film (Z) is decided before filming begins — the tone, the visual style, the emotional arc. Each scene (token) is filmed individually, but the director's vision ensures they all fit together into a coherent whole. Without this vision, you get a collection of random scenes. With it, you get a movie."
        technical="The latent space learns a disentangled representation where different dimensions of Z correspond to different aspects of the output: structure, tone, detail level, reasoning approach. This emerges naturally from ELBO training without explicit disentanglement objectives."
        color={PURPLE}
      />

      {/* ── Architecture Overview SVG ── */}
      <Diagram caption={<><strong>Complete Free Transformer Pipeline</strong> — From input to output, showing how Z integrates into the standard Transformer architecture with minimal modification.</>}>
        <svg viewBox="0 0 960 420" style={{ width: '100%', height: 'auto' }}>
          <rect width="960" height="420" rx="12" fill={BG} />

          <text x="480" y="28" textAnchor="middle" fill={R} fontSize="13" fontWeight="700" letterSpacing="1.5" fontFamily="Inter, system-ui, sans-serif">FREE TRANSFORMER — END-TO-END PIPELINE</text>

          {/* Step 1: Input */}
          <rect x="20" y="60" width="130" height="80" rx="10" fill="url(#ft-gd)" stroke="#475569" strokeWidth="1.5" />
          <text x="85" y="95" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Input x</text>
          <text x="85" y="115" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Prompt / Question</text>

          {/* Arrow */}
          <line x1="150" y1="100" x2="175" y2="100" stroke={GRAY} strokeWidth="1.5" markerEnd="url(#ft-ag)" />

          {/* Step 2: Encoder */}
          <rect x="180" y="50" width="140" height="100" rx="10" fill="url(#ft-gd)" stroke={BLUE} strokeWidth="1.5" />
          <text x="250" y="88" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Encoder</text>
          <text x="250" y="108" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Self-attention</text>
          <text x="250" y="122" textAnchor="middle" fill={GRAY} fontSize="9" fontFamily="Inter, system-ui, sans-serif">over input tokens</text>

          {/* Arrow to prior */}
          <line x1="320" y1="85" x2="360" y2="85" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#ft-ac)" />

          {/* Step 3: Prior */}
          <rect x="365" y="50" width="120" height="50" rx="8" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="1.5" />
          <text x="425" y="72" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Prior p(z|x)</text>
          <text x="425" y="88" textAnchor="middle" fill={CYAN} fontSize="9" opacity="0.7" fontFamily="Inter, system-ui, sans-serif">Inference time</text>

          {/* Step 3b: Posterior (training only) */}
          <rect x="365" y="110" width="120" height="50" rx="8" fill={R} fillOpacity="0.15" stroke={R} strokeWidth="1.5" strokeDasharray="5 3" />
          <text x="425" y="132" textAnchor="middle" fill={R} fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Post q(z|x,y)</text>
          <text x="425" y="148" textAnchor="middle" fill={R2} fontSize="9" opacity="0.7" fontFamily="Inter, system-ui, sans-serif">Training only</text>

          {/* KL arrow between them */}
          <line x1="490" y1="95" x2="490" y2="115" stroke={AMBER} strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="520" y="110" fill={AMBER} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">KL</text>

          {/* Arrow from prior/posterior to Z */}
          <line x1="425" y1="50" x2="425" y2="30" stroke={CYAN} strokeWidth="1" strokeDasharray="3 2" />
          <line x1="425" y1="30" x2="560" y2="30" stroke={R} strokeWidth="1.5" />
          <line x1="560" y1="30" x2="560" y2="55" stroke={R} strokeWidth="1.5" markerEnd="url(#ft-ar)" />

          {/* Step 4: Z */}
          <rect x="510" y="60" width="100" height="70" rx="35" fill={R} fillOpacity="0.25" stroke={R} strokeWidth="2.5" />
          <text x="560" y="90" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">Z</text>
          <text x="560" y="115" textAnchor="middle" fill={R2} fontSize="8" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">LATENT INTENT</text>

          {/* Arrow from Z to decoder */}
          <line x1="610" y1="95" x2="660" y2="95" stroke={R} strokeWidth="2" markerEnd="url(#ft-ar)" />

          {/* Step 5: Decoder */}
          <rect x="665" y="45" width="160" height="110" rx="10" fill="url(#ft-gr)" stroke={R} strokeWidth="1.5" />
          <text x="745" y="78" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Z-Conditioned</text>
          <text x="745" y="95" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Decoder</text>
          <text x="745" y="118" textAnchor="middle" fill={R2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Autoregressive + Z</text>
          <text x="745" y="132" textAnchor="middle" fill={R2} fontSize="9" fontFamily="Inter, system-ui, sans-serif">at every layer</text>

          {/* Arrow to output */}
          <line x1="825" y1="100" x2="860" y2="100" stroke={GREEN} strokeWidth="2" markerEnd="url(#ft-agr)" />

          {/* Step 6: Output */}
          <rect x="865" y="60" width="80" height="80" rx="10" fill="url(#ft-gd)" stroke={GREEN} strokeWidth="1.5" />
          <text x="905" y="95" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">y</text>
          <text x="905" y="115" textAnchor="middle" fill={GREEN} fontSize="9" fontFamily="Inter, system-ui, sans-serif">Output</text>

          {/* ── Training Pipeline (bottom) ── */}
          <line x1="20" y1="195" x2="940" y2="195" stroke="#334155" strokeWidth="1" />
          <text x="480" y="220" textAnchor="middle" fill={GRAY} fontSize="12" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">TRAINING PIPELINE</text>

          {/* Training steps */}
          {[
            { x: 70, label: 'Encode x', detail: 'Self-attention', color: BLUE, w: 120 },
            { x: 210, label: 'Compute q(z|x,y)', detail: 'Posterior (sees answer)', color: R, w: 140 },
            { x: 370, label: 'Sample Z', detail: 'Reparam trick', color: R, w: 110 },
            { x: 500, label: 'Decode p(y|x,z)', detail: 'Cross-entropy loss', color: GREEN, w: 140 },
            { x: 660, label: 'KL(q || p)', detail: 'Regularization', color: AMBER, w: 110 },
            { x: 790, label: 'ELBO Loss', detail: 'Recon - β·KL', color: R, w: 120 },
          ].map(({ x, label, detail, color, w }) => (
            <g key={label}>
              <rect x={x} y="240" width={w} height="55" rx="8" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" />
              <text x={x + w / 2} y="263" textAnchor="middle" fill={color} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{label}</text>
              <text x={x + w / 2} y="280" textAnchor="middle" fill={GRAY} fontSize="8" fontFamily="Inter, system-ui, sans-serif">{detail}</text>
              {x < 780 && <line x1={x + w + 5} y1="267" x2={x + w + 15} y2="267" stroke="#475569" strokeWidth="1" />}
            </g>
          ))}

          {/* ── Inference Pipeline ── */}
          <text x="480" y="325" textAnchor="middle" fill={GRAY} fontSize="12" fontWeight="700" letterSpacing="1" fontFamily="Inter, system-ui, sans-serif">INFERENCE PIPELINE (simpler)</text>

          {[
            { x: 120, label: 'Encode x', color: BLUE, w: 120 },
            { x: 290, label: 'p(z|x) → Z', color: CYAN, w: 130 },
            { x: 470, label: 'Decode p(y|x,z)', color: GREEN, w: 150 },
            { x: 670, label: 'Output y', color: GREEN, w: 120 },
          ].map(({ x, label, color, w }) => (
            <g key={`inf-${label}`}>
              <rect x={x} y="345" width={w} height="40" rx="8" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" />
              <text x={x + w / 2} y="370" textAnchor="middle" fill={color} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{label}</text>
              {x < 660 && <line x1={x + w + 8} y1="365" x2={x + w + 22} y2="365" stroke="#475569" strokeWidth="1" />}
            </g>
          ))}

          {/* Cost label */}
          <rect x="810" y="352" width="110" height="26" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="865" y="370" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">+3% overhead only</text>
        </svg>
      </Diagram>

      <MentalModel
        title="The Free Energy Principle"
        analogy="In neuroscience, the free energy principle says that biological brains work by minimizing surprise — maintaining internal models of the world and updating them to reduce prediction error. The Free Transformer literally implements this: Z is the brain's internal model (prediction of what the output will look like), and training minimizes the 'free energy' (negative ELBO) of observed data."
        technical="The name 'Free Transformer' is a direct reference to Friston's free energy principle. The ELBO can be rewritten as negative variational free energy: -ELBO = E_q[log q(z|x,y) - log p(y,z|x)]. Minimizing this is equivalent to minimizing the KL divergence between q(z|x,y) and the true posterior p(z|x,y) — the agent's internal model converges to reality."
        color={R}
      />

      <MentalModel
        title="The Compiler Analogy"
        analogy="A compiler works in two phases: (1) parse the source code into an Abstract Syntax Tree (AST) — a structured representation of what the code MEANS, and (2) generate machine code from the AST. The Free Transformer's Z is like the AST — a compressed, structured representation of the output's meaning that is computed first, then used to guide the actual token generation. Without the AST, the compiler would have to generate machine code character by character."
        technical="This analogy maps precisely: the encoder is the lexer/parser (processes input into representations), Z is the AST/IR (intermediate, structured representation), and the decoder is the code generator (produces the final token sequence). The ELBO ensures Z is both informative (good reconstruction) and predictable (low KL)."
        color={GREEN}
      />

      <ConceptCard title="Connections to Other Work" color={GRAY} defaultOpen={false}>
        <ComparisonTable
          headers={['Method', 'Relationship to Free Transformer', 'Key Difference']}
          rows={[
            ['VAE (Kingma 2014)', 'Direct ancestor — Free Transformer is a conditional VAE for text', 'VAE for images; Free Transformer for autoregressive text generation'],
            ['CVAE (Sohn 2015)', 'Closest relative — conditional VAE for structured prediction', 'CVAE used fixed priors; Free Transformer uses learned input-conditional priors'],
            ['Chain-of-Thought', 'Prompting-level planning vs architectural planning', 'CoT adds tokens; Z adds a latent vector (more efficient, no token overhead)'],
            ['Diffusion (DDPM)', 'Both use latent variables, but different generation processes', 'Diffusion uses iterative denoising; Free Transformer uses single-sample Z + autoregressive decoding'],
            ['Retrieval-Augmented (RAG)', 'Both condition generation on external information', 'RAG retrieves from a database; Z is generated from the model\'s own latent space'],
          ]}
          caption="The Free Transformer sits at the intersection of variational inference and autoregressive language modeling"
        />
      </ConceptCard>

      <Callout type="key">
        The Free Transformer represents a paradigm shift: from "generate and hope for coherence" to
        "plan then execute." With just 3% overhead, it adds an architectural capacity that no amount of
        prompting can replicate — a true latent intention that shapes every token in the output. If this
        approach scales to frontier models, it could fundamentally change how we think about language
        model architectures.
      </Callout>
    </>
  );
}
