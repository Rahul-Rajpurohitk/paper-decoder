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
const V  = '#8b5cf6';   // primary violet
const V2 = '#a78bfa';   // lighter violet
const V3 = '#7c3aed';   // darker violet
const BG = '#0d0a1a';   // deep violet-black for SVGs
const FG = '#e2e8f0';   // light text in SVGs
const GRAY = '#94a3b8';
const GREEN = '#22c55e';
const RED = '#ef4444';
const AMBER = '#f59e0b';
const CYAN = '#06b6d4';
const BLUE = '#3b82f6';
const ROSE = '#f43f5e';
const EMERALD = '#10b981';

/* ─── SVG helpers ─── */
const ARROW = (x1, y1, x2, y2, color = V, dashed = false) => (
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

export default function RLVRPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHAT IS RLVR?
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="What Is RLVR? The Verifiable Reward Revolution"
        subtitle="Replacing human feedback with automated verification — and igniting AI's biggest debate"
        color={V}
      />

      <Prose>
        <p>
          The standard <H tip="RLHF (Reinforcement Learning from Human Feedback) = the dominant paradigm for aligning LLMs. Humans compare model outputs, a reward model learns those preferences, and RL optimizes the policy against that reward model. Used by ChatGPT, Claude, Gemini. Expensive, subjective, and hard to scale." color={AMBER}>RLHF</H> pipeline
          relies on humans to judge quality. Annotators compare outputs, a{' '}
          <H tip="Reward model = a neural network trained on human preference data to predict which output a human would prefer. It acts as a proxy for human judgment. Problem: reward models are imperfect — they can be 'hacked' by models that produce outputs that look good superficially but are actually wrong or harmful." color={AMBER}>reward model</H>{' '}
          learns their preferences, and <H tip="Policy optimization = the RL step where the language model (the 'policy') is updated to produce outputs that score higher on the reward function. Algorithms include PPO, DPO, and GRPO." color={V}>policy optimization</H> chases
          that learned signal. This works, but it has a fatal flaw: <em>the reward model can be wrong</em>.
          It can reward confident-sounding nonsense. It can be <H tip="Reward hacking = when the model finds outputs that exploit weaknesses in the reward model to score high without actually being correct or helpful. Example: a model might learn to write longer, more confident-sounding answers (which reward models tend to score higher) even when the content is wrong." color={RED}>hacked</H>.
          And training it requires expensive human annotation.
        </p>
        <p>
          <H tip="RLVR (Reinforcement Learning with Verifiable Rewards) = a training paradigm where RL rewards come from automated verification: running code against test cases, checking math against ground truth, validating logical proofs with solvers. The reward is objective and binary (correct/incorrect), not a learned approximation of human preference." color={V}>RLVR</H>{' '}
          takes a radically different path. Instead of asking "what would a human prefer?", it asks{' '}
          <strong>"is this answer provably correct?"</strong> For math problems, check the final answer.
          For code, run the <H tip="Unit tests = automated test cases that verify code correctness. Given a function, unit tests call it with known inputs and check that outputs match expected values. They provide a binary, objective reward signal: all tests pass (reward=1) or at least one fails (reward=0)." color={GREEN}>unit tests</H>.
          For logic, run a <H tip="Formal verifier / SAT solver = software that can mathematically prove whether a logical statement is true or false. Unlike a reward model that guesses, a formal verifier provides a ground-truth signal. Used for constraint satisfaction, theorem proving, and logical reasoning tasks." color={CYAN}>formal verifier</H>.
          The reward is <em>objective</em>, <em>binary</em>, and <em>free to compute at scale</em>.
        </p>
        <p>
          This is the engine behind <H tip="DeepSeek-R1 = DeepSeek's reasoning model (January 2025) that demonstrated emergent chain-of-thought reasoning from pure RL with verifiable rewards. Its experimental variant R1-Zero used only GRPO + correctness rewards, no supervised fine-tuning at all." color={V2}>DeepSeek-R1</H>,{' '}
          behind <H tip="Qwen-2.5-Math = Alibaba's math-specialized model, also trained with RLVR. Showed strong improvements on mathematical reasoning benchmarks from verifiable reward training." color={BLUE}>Qwen-2.5-Math</H>,
          and increasingly behind the reasoning capabilities of every frontier model. But RLVR has also
          ignited the <strong>hottest debate in AI</strong>: does it actually teach models to{' '}
          <em>reason</em>, or does it just make them better at <em>sampling</em> answers they already knew?
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '79.8%', unit: '', label: 'AIME 2024 (DeepSeek-R1)', color: V },
          { value: '97.3%', unit: '', label: 'MATH-500 (DeepSeek-R1)', color: V2 },
          { value: '$0', unit: '', label: 'Reward annotation cost', color: GREEN },
          { value: '100%', unit: '', label: 'Reward objectivity', color: CYAN },
        ]}
      />

      <SimpleExplain>
        <p><strong>The core idea:</strong> Instead of paying humans to judge AI outputs (expensive, subjective, gameable), use automated checkers that can verify correctness with certainty. Math has answer keys. Code has test suites. Logic has formal provers. RLVR trains the model with these free, objective signals. The open question is whether this makes the model genuinely smarter or just better at finding answers it could always produce.</p>
      </SimpleExplain>

      {/* ── Reward Types Comparison SVG ── */}
      <Diagram caption={<><strong>Reward Landscape</strong> — RLVR replaces learned reward models with objective verification, eliminating the subjectivity bottleneck</>}>
        <svg viewBox="0 0 860 360" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#110d20" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>
          <rect width="860" height="360" rx="12" fill="url(#rlvr-bg1)" />
          <text x="430" y="28" textAnchor="middle" fill={V} fontSize="14" fontWeight="700" letterSpacing="1.5">THREE REWARD PARADIGMS</text>

          {/* Column 1: Human Feedback */}
          <rect x="25" y="50" width="260" height="280" rx="10" fill={AMBER} fillOpacity="0.06" stroke={AMBER} strokeWidth="1" />
          <text x="155" y="75" textAnchor="middle" fill={AMBER} fontSize="13" fontWeight="700">HUMAN FEEDBACK (RLHF)</text>
          <rect x="55" y="95" width="200" height="36" rx="6" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1" />
          <text x="155" y="118" textAnchor="middle" fill={FG} fontSize="11">Human annotators compare A vs B</text>
          {ARROW(155, 131, 155, 148, AMBER)}
          <rect x="55" y="153" width="200" height="36" rx="6" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1" />
          <text x="155" y="176" textAnchor="middle" fill={FG} fontSize="11">Reward model learns preferences</text>
          {ARROW(155, 189, 155, 206, AMBER)}
          <rect x="55" y="211" width="200" height="36" rx="6" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1" />
          <text x="155" y="234" textAnchor="middle" fill={FG} fontSize="11">RL optimizes vs reward model</text>
          <text x="155" y="270" textAnchor="middle" fill={RED} fontSize="10" fontWeight="600">Subjective, expensive, hackable</text>
          <text x="155" y="288" textAnchor="middle" fill={GRAY} fontSize="10">$50-200/hr for expert annotation</text>
          <text x="155" y="306" textAnchor="middle" fill={GRAY} fontSize="10">Reward model is imperfect proxy</text>

          {/* Column 2: Learned Reward Model */}
          <rect x="300" y="50" width="260" height="280" rx="10" fill={BLUE} fillOpacity="0.06" stroke={BLUE} strokeWidth="1" />
          <text x="430" y="75" textAnchor="middle" fill={BLUE} fontSize="13" fontWeight="700">LEARNED ORM / PRM</text>
          <rect x="330" y="95" width="200" height="36" rx="6" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1" />
          <text x="430" y="118" textAnchor="middle" fill={FG} fontSize="11">Trained on correct/incorrect traces</text>
          {ARROW(430, 131, 430, 148, BLUE)}
          <rect x="330" y="153" width="200" height="36" rx="6" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1" />
          <text x="430" y="176" textAnchor="middle" fill={FG} fontSize="11">Scores each step or outcome</text>
          {ARROW(430, 189, 430, 206, BLUE)}
          <rect x="330" y="211" width="200" height="36" rx="6" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1" />
          <text x="430" y="234" textAnchor="middle" fill={FG} fontSize="11">Still a learned approximation</text>
          <text x="430" y="270" textAnchor="middle" fill={AMBER} fontSize="10" fontWeight="600">Better than RLHF, still imperfect</text>
          <text x="430" y="288" textAnchor="middle" fill={GRAY} fontSize="10">ORM = Outcome Reward Model</text>
          <text x="430" y="306" textAnchor="middle" fill={GRAY} fontSize="10">PRM = Process Reward Model</text>

          {/* Column 3: Verifiable Rewards */}
          <rect x="575" y="50" width="260" height="280" rx="10" fill={V} fillOpacity="0.10" stroke={V} strokeWidth="2" />
          <text x="705" y="75" textAnchor="middle" fill={V} fontSize="13" fontWeight="700">VERIFIABLE REWARDS (RLVR)</text>
          <rect x="605" y="95" width="200" height="36" rx="6" fill={V} fillOpacity="0.15" stroke={V} strokeWidth="1" />
          <text x="705" y="118" textAnchor="middle" fill={FG} fontSize="11">Unit tests / math checker / SAT</text>
          {ARROW(705, 131, 705, 148, V)}
          <rect x="605" y="153" width="200" height="36" rx="6" fill={V} fillOpacity="0.15" stroke={V} strokeWidth="1" />
          <text x="705" y="176" textAnchor="middle" fill={FG} fontSize="11">Binary: correct or incorrect</text>
          {ARROW(705, 189, 705, 206, V)}
          <rect x="605" y="211" width="200" height="36" rx="6" fill={V} fillOpacity="0.15" stroke={V} strokeWidth="1" />
          <text x="705" y="234" textAnchor="middle" fill={FG} fontSize="11">Ground-truth signal, no proxy</text>
          <text x="705" y="270" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600">Objective, free, unhackable</text>
          <text x="705" y="288" textAnchor="middle" fill={GRAY} fontSize="10">Limited to verifiable domains</text>
          <text x="705" y="306" textAnchor="middle" fill={GRAY} fontSize="10">Math, code, logic, formal proofs</text>
        </svg>
      </Diagram>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — THE RLVR PIPELINE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="The RLVR Pipeline — From Base Model to Reasoner"
        subtitle="GRPO + verifiable rewards = the complete RLVR training loop"
        color={V}
      />

      <Prose>
        <p>
          The RLVR pipeline combines <H tip="GRPO (Group Relative Policy Optimization) = the RL algorithm from DeepSeek that eliminates the critic network. For each prompt, sample G outputs, score them, compute advantages as deviations from the group mean, and update the policy. Covered in detail in our companion paper on RL for LLMs." color={V}>GRPO</H>{' '}
          with <H tip="Rule-based rewards = programmatic verification functions that check correctness without any neural network. For math: parse the answer, compare to ground truth. For code: execute against test cases. For logic: run a SAT solver. These are deterministic, objective, and essentially free to compute." color={GREEN}>rule-based rewards</H> into
          a clean training loop. The model generates <H tip="Chain-of-thought (CoT) = step-by-step reasoning produced by the model before giving a final answer. Example: 'First, I factor the quadratic: x^2 - 16 = (x-4)(x+4). Setting each factor to zero: x = 4 or x = -4.' CoT is the reasoning trace that emerges from RLVR training." color={V2}>chain-of-thought</H>{' '}
          solutions, verifiers check correctness, and the policy learns from group-relative comparisons.
          No human annotation. No learned reward model. Just automated verification at scale.
        </p>
        <p>
          The key design choice: the reward is <H tip="Outcome-based reward = rewarding only the final answer, not intermediate steps. The model gets reward=1 if the final answer is correct, reward=0 otherwise. This is intentional: it gives the model maximum freedom to develop its OWN reasoning strategies, rather than constraining it to follow a particular step-by-step format." color={V}>outcome-based</H>.
          The verifier checks only the <em>final answer</em>, not the reasoning steps. This is deliberate — it
          gives the model complete freedom to develop <em>whatever internal reasoning strategy works</em>.
          Some models develop long, detailed chains of thought. Others learn compressed reasoning.
          The reward does not care how you got there, only that you got there.
        </p>
      </Prose>

      {/* ── RLVR Pipeline SVG ── */}
      <Diagram caption={<><strong>The RLVR Training Pipeline</strong> — GRPO + verifiable rewards in a self-improving loop</>}>
        <svg viewBox="0 0 860 440" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120e22" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
            <marker id="rlvr-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={V} />
            </marker>
            <marker id="rlvr-ar-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <marker id="rlvr-ar-c" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={CYAN} />
            </marker>
          </defs>
          <rect width="860" height="440" rx="12" fill="url(#rlvr-bg2)" />
          <text x="430" y="28" textAnchor="middle" fill={V} fontSize="14" fontWeight="700" letterSpacing="1.5">RLVR TRAINING PIPELINE</text>

          {/* Step 1: Training Data */}
          <rect x="25" y="55" width="140" height="80" rx="10" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="1.5" />
          <text x="95" y="80" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700">Training Data</text>
          <text x="95" y="98" textAnchor="middle" fill={GRAY} fontSize="10">Math problems</text>
          <text x="95" y="112" textAnchor="middle" fill={GRAY} fontSize="10">Code challenges</text>
          <text x="95" y="126" textAnchor="middle" fill={GRAY} fontSize="10">Logic puzzles</text>

          {/* Arrow */}
          <line x1="165" y1="95" x2="195" y2="95" stroke={V} strokeWidth="2" markerEnd="url(#rlvr-ar)" />

          {/* Step 2: LLM Policy */}
          <rect x="200" y="50" width="165" height="90" rx="10" fill={V} fillOpacity="0.15" stroke={V} strokeWidth="2" />
          <text x="282" y="75" textAnchor="middle" fill={V} fontSize="12" fontWeight="700">LLM Policy</text>
          <text x="282" y="93" textAnchor="middle" fill={V2} fontSize="11">Generates G=64</text>
          <text x="282" y="108" textAnchor="middle" fill={V2} fontSize="11">CoT solutions</text>
          <text x="282" y="127" textAnchor="middle" fill={GRAY} fontSize="9">per question</text>

          {/* Arrow */}
          <line x1="365" y1="95" x2="405" y2="95" stroke={V} strokeWidth="2" markerEnd="url(#rlvr-ar)" />

          {/* Step 3: Solutions */}
          <rect x="410" y="45" width="175" height="100" rx="10" fill="#1a1a2e" stroke="#334155" strokeWidth="1" />
          <text x="497" y="68" textAnchor="middle" fill={FG} fontSize="12" fontWeight="700">G Solutions</text>
          {/* Mini solution blocks */}
          {[0,1,2,3,4,5].map(i => (
            <g key={`sol-${i}`}>
              <rect x={425 + i * 25} y="80" width="22" height="26" rx="4"
                fill={i < 4 ? GREEN : RED} fillOpacity="0.2"
                stroke={i < 4 ? GREEN : RED} strokeWidth="1" />
              <text x={436 + i * 25} y="97" textAnchor="middle" fill={i < 4 ? GREEN : RED} fontSize="8">
                {i < 4 ? '\u2713' : '\u2717'}
              </text>
            </g>
          ))}
          <text x="497" y="122" textAnchor="middle" fill={GRAY} fontSize="9">Some correct, some incorrect</text>
          <text x="497" y="136" textAnchor="middle" fill={GRAY} fontSize="9">Each includes full CoT trace</text>

          {/* Arrow down to verifier */}
          <line x1="497" y1="145" x2="497" y2="180" stroke={GREEN} strokeWidth="2" markerEnd="url(#rlvr-ar-g)" />

          {/* Step 4: Verifier */}
          <rect x="385" y="185" width="225" height="90" rx="10" fill={GREEN} fillOpacity="0.10" stroke={GREEN} strokeWidth="2" />
          <text x="497" y="210" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700">Verifiable Reward</text>
          <text x="497" y="228" textAnchor="middle" fill={FG} fontSize="11">Math: check final answer</text>
          <text x="497" y="244" textAnchor="middle" fill={FG} fontSize="11">Code: run unit tests</text>
          <text x="497" y="260" textAnchor="middle" fill={FG} fontSize="11">Logic: SAT solver / proof checker</text>

          {/* Arrow to GRPO */}
          <line x1="497" y1="275" x2="497" y2="310" stroke={V} strokeWidth="2" markerEnd="url(#rlvr-ar)" />

          {/* Step 5: GRPO Update */}
          <rect x="310" y="315" width="375" height="80" rx="12" fill={V} fillOpacity="0.12" stroke={V} strokeWidth="2" />
          <text x="497" y="340" textAnchor="middle" fill={V} fontSize="13" fontWeight="700">GRPO Policy Update</text>
          <text x="497" y="358" textAnchor="middle" fill={FG} fontSize="11">Advantage = (reward - group_mean) / group_std</text>
          <text x="497" y="376" textAnchor="middle" fill={V2} fontSize="10">Increase prob of correct solutions, decrease incorrect</text>

          {/* Loop arrow back to LLM */}
          <path d="M 310 355 L 200 355 L 200 290 L 140 290 L 140 140 L 282 140 L 282 140" fill="none" stroke={V} strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#rlvr-ar)" />
          <text x="130" y="225" textAnchor="middle" fill={V2} fontSize="10" fontWeight="600" transform="rotate(-90, 130, 225)">Next iteration</text>

          {/* Callout: No reward model */}
          <rect x="630" y="185" width="205" height="85" rx="8" fill={RED} fillOpacity="0.06" stroke={RED} strokeWidth="1" strokeDasharray="4 3" />
          <text x="732" y="208" textAnchor="middle" fill={RED} fontSize="11" fontWeight="700">What is NOT here</text>
          <text x="732" y="226" textAnchor="middle" fill={GRAY} fontSize="10">No reward model training</text>
          <text x="732" y="242" textAnchor="middle" fill={GRAY} fontSize="10">No human annotation</text>
          <text x="732" y="258" textAnchor="middle" fill={GRAY} fontSize="10">No preference data</text>

          {/* Key stat */}
          <rect x="630" y="315" width="205" height="80" rx="8" fill={CYAN} fillOpacity="0.06" stroke={CYAN} strokeWidth="1" />
          <text x="732" y="340" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="700">Training Cost Breakdown</text>
          <text x="732" y="358" textAnchor="middle" fill={GRAY} fontSize="10">Reward computation: ~0.001s / sample</text>
          <text x="732" y="374" textAnchor="middle" fill={GRAY} fontSize="10">vs RLHF: ~$2 / human comparison</text>
        </svg>
      </Diagram>

      <StepFlow
        color={V}
        steps={[
          { title: 'Sample questions from training set', desc: 'Draw a batch of math/code/logic problems with known ground-truth answers.' },
          { title: 'Generate G outputs per question', desc: 'The current policy samples G=64 complete chain-of-thought solutions for each question.' },
          { title: 'Verify each output', desc: 'Run the verifier: check final math answer, execute code against test suite, or validate with logic solver. Reward is binary: 1 (correct) or 0 (incorrect).' },
          { title: 'Compute group-relative advantages', desc: 'For each output, advantage = (reward - group_mean) / group_std. Correct outputs in a mostly-wrong group get very high advantage.' },
          { title: 'GRPO policy update', desc: 'Update the model to increase probability of high-advantage outputs and decrease low-advantage ones, with KL penalty to prevent drift.' },
          { title: 'Repeat', desc: 'The improved policy generates better solutions next round, creating a self-improving loop.' },
        ]}
      />

      <FormulaBlock
        math={"R(q, o) = \\begin{cases} 1 & \\text{if } \\texttt{verify}(\\text{extract\\_answer}(o), \\text{ground\\_truth}(q)) \\\\ 0 & \\text{otherwise} \\end{cases}"}
        label="RLVR Reward Function"
        color={V}
        symbols={[
          { symbol: 'R(q, o)', meaning: 'Reward for output o on question q' },
          { symbol: 'extract_answer', meaning: 'Parser that finds the final answer in the CoT' },
          { symbol: 'verify', meaning: 'Domain-specific checker (math, code tests, SAT solver)' },
        ]}
      />

      <Callout type="insight">
        The binary reward signal is surprisingly effective. You might think "correct / incorrect" is too
        coarse to teach complex reasoning. But when you sample 64 outputs and some are correct while
        others are wrong, the <em>relative comparison</em> provides a rich learning signal. The model
        learns what makes correct solutions different from incorrect ones, even though the reward itself
        is just 0 or 1.
      </Callout>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — THE DEBATE: NEW REASONING OR BETTER SAMPLING?
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="The Great Debate — New Reasoning or Better Sampling?"
        subtitle="Does RLVR teach genuinely new capabilities, or just sharpen what was already there?"
        color={V}
      />

      <Prose>
        <p>
          Here is the question that has split the AI research community: when you train a model with RLVR
          and its <H tip="Pass@1 = the probability of getting the correct answer in a single attempt. This is the standard metric for evaluating model capability on benchmarks. RLVR consistently improves Pass@1 — that is not in dispute." color={V}>Pass@1</H> score
          jumps from 30% to 70%, what actually happened inside the model? There are two camps, and the
          evidence supports <em>both</em>.
        </p>
      </Prose>

      {/* ── The Debate Visual SVG ── */}
      <Diagram caption={<><strong>The Two Camps</strong> — both sides have compelling evidence, and the truth likely lies somewhere in between</>}>
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120e22" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>
          <rect width="860" height="380" rx="12" fill="url(#rlvr-bg3)" />
          <text x="430" y="28" textAnchor="middle" fill={V} fontSize="14" fontWeight="700" letterSpacing="1.5">THE RLVR DEBATE</text>

          {/* Camp A: Just Sampling */}
          <rect x="25" y="50" width="390" height="300" rx="12" fill={ROSE} fillOpacity="0.06" stroke={ROSE} strokeWidth="1.5" />
          <text x="220" y="78" textAnchor="middle" fill={ROSE} fontSize="14" fontWeight="700">Camp A: "Just Better Sampling"</text>
          <text x="220" y="100" textAnchor="middle" fill={FG} fontSize="12" fontStyle="italic">"The base model already knows these answers"</text>

          <text x="45" y="130" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">Key claim: RLVR does NOT teach new reasoning</text>
          <text x="45" y="150" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">capabilities. It teaches the model to find</text>
          <text x="45" y="170" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">correct answers MORE EFFICIENTLY among the</text>
          <text x="45" y="190" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">answers it could already produce.</text>

          <rect x="45" y="210" width="350" height="28" rx="6" fill={ROSE} fillOpacity="0.10" stroke={ROSE} strokeWidth="1" />
          <text x="220" y="229" textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">Evidence: Pass@K curves converge at large K</text>

          <rect x="45" y="248" width="350" height="28" rx="6" fill={ROSE} fillOpacity="0.10" stroke={ROSE} strokeWidth="1" />
          <text x="220" y="267" textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">Evidence: CoT-Pass@K barely changes</text>

          <rect x="45" y="286" width="350" height="28" rx="6" fill={ROSE} fillOpacity="0.10" stroke={ROSE} strokeWidth="1" />
          <text x="220" y="305" textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">Evidence: No new reasoning patterns emerge</text>

          {/* Divider */}
          <line x1="430" y1="60" x2="430" y2="340" stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />
          <text x="430" y="365" textAnchor="middle" fill={GRAY} fontSize="12" fontWeight="600">The truth is probably in between</text>

          {/* Camp B: Genuine Learning */}
          <rect x="445" y="50" width="390" height="300" rx="12" fill={EMERALD} fillOpacity="0.06" stroke={EMERALD} strokeWidth="1.5" />
          <text x="640" y="78" textAnchor="middle" fill={EMERALD} fontSize="14" fontWeight="700">Camp B: "Genuine New Reasoning"</text>
          <text x="640" y="100" textAnchor="middle" fill={FG} fontSize="12" fontStyle="italic">"The model learns strategies it never had"</text>

          <text x="465" y="130" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">Key claim: RLVR teaches fundamentally new</text>
          <text x="465" y="150" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">problem-solving strategies. The model develops</text>
          <text x="465" y="170" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">capabilities it genuinely could not access</text>
          <text x="465" y="190" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">before training, even with infinite samples.</text>

          <rect x="465" y="210" width="350" height="28" rx="6" fill={EMERALD} fillOpacity="0.10" stroke={EMERALD} strokeWidth="1" />
          <text x="640" y="229" textAnchor="middle" fill={EMERALD} fontSize="11" fontWeight="600">Evidence: Pass@K curves cross at large K</text>

          <rect x="465" y="248" width="350" height="28" rx="6" fill={EMERALD} fillOpacity="0.10" stroke={EMERALD} strokeWidth="1" />
          <text x="640" y="267" textAnchor="middle" fill={EMERALD} fontSize="11" fontWeight="600">Evidence: New CoT patterns appear</text>

          <rect x="465" y="286" width="350" height="28" rx="6" fill={EMERALD} fillOpacity="0.10" stroke={EMERALD} strokeWidth="1" />
          <text x="640" y="305" textAnchor="middle" fill={EMERALD} fontSize="11" fontWeight="600">Evidence: Generalizes to unseen domains</text>
        </svg>
      </Diagram>

      <VisualCompare
        leftLabel="Camp A: Sampling Efficiency"
        rightLabel="Camp B: Genuine Learning"
        leftColor={ROSE}
        rightColor={EMERALD}
        left={
          <>
            <p style={{ marginBottom: 8 }}><strong>Core argument:</strong> The base model can already solve most problems RLVR "teaches" — it just needs many attempts. RLVR's Pass@1 improvement comes from learning to pick the right reasoning path on the first try, not from learning new reasoning.</p>
            <p style={{ marginBottom: 8 }}><strong>Analogy:</strong> A student who knows all the material but freezes on exams. RLVR is test-taking strategy, not new knowledge.</p>
            <p><strong>Proponents:</strong> Google DeepMind (Yue et al., 2025), several academic groups</p>
          </>
        }
        right={
          <>
            <p style={{ marginBottom: 8 }}><strong>Core argument:</strong> RLVR creates genuinely new reasoning paths the base model could never produce. At sufficiently large K, the RLVR model solves problems the base model cannot — evidence of new capability, not just better selection.</p>
            <p style={{ marginBottom: 8 }}><strong>Analogy:</strong> A student who learns a new problem-solving technique. RLVR teaches new methods, not just exam strategy.</p>
            <p><strong>Proponents:</strong> DeepSeek (R1 paper), Qwen team, some academic groups</p>
          </>
        }
        caption="Both camps agree that RLVR improves Pass@1. They disagree on WHY."
      />

      <Callout type="key">
        This is not a settled question. The evidence genuinely supports both sides, and the answer
        likely depends on the specific model, training data, and how far RLVR training is pushed.
        The key metric that distinguishes the camps is <strong>Pass@K at very large K</strong> — we
        will break this down next.
      </Callout>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — PASS@K AND COT-PASS@K
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="Pass@K and CoT-Pass@K — The Key Metrics"
        subtitle="How sampling many times reveals whether RLVR creates new reasoning or just optimizes selection"
        color={V}
      />

      <Prose>
        <p>
          <H tip="Pass@K = the probability that at least ONE out of K independently sampled solutions is correct. Pass@1 is the standard benchmark metric. Pass@64 means: if you let the model try 64 times, does it ever get it right? As K grows, Pass@K approaches the coverage limit — the fraction of problems the model can solve at all." color={V}>Pass@K</H>{' '}
          is the metric that separates the two camps. The idea is simple: instead of asking "can the model
          get this right on the first try?", ask "can the model <em>ever</em> get this right if we give
          it K attempts?" This probes the model's <em>underlying capability</em> rather than its{' '}
          <H tip="Sampling efficiency = how reliably the model finds a correct solution on any given attempt. A model with high Pass@64 but low Pass@1 knows how to solve the problem but has poor 'aim' — it needs many tries to hit the target. RLVR dramatically improves this efficiency." color={CYAN}>sampling efficiency</H>.
        </p>
        <p>
          The companion metric is <H tip="CoT-Pass@K = a stricter variant of Pass@K that requires the model to generate K DISTINCT chain-of-thought reasoning paths, then checks if at least one is correct. Unlike regular Pass@K which counts any correct output, CoT-Pass@K only counts outputs with genuinely different reasoning approaches. This measures diversity of reasoning strategies, not just the ability to produce one correct path repeatedly." color={V}>CoT-Pass@K</H>,
          which adds a critical constraint: the K solutions must use <em>distinct reasoning strategies</em>.
          Two solutions that reach the right answer through identical reasoning steps count as one.
          CoT-Pass@K measures the model's <em>repertoire</em> of reasoning approaches.
        </p>
      </Prose>

      <FormulaSteps
        label="Pass@K — Building the Metric"
        color={V}
        steps={[
          {
            note: 'Generate K independent solutions for question q. Each solution includes a full chain-of-thought trace plus a final answer.',
            math: '\\{o_1, o_2, \\ldots, o_K\\} \\sim \\pi_\\theta(\\cdot \\mid q)',
          },
          {
            note: 'Verify each solution using the domain-specific checker. Each v_i is binary: 1 if correct, 0 if not.',
            math: 'v_i = \\mathbb{1}[\\texttt{verify}(o_i, q)] \\quad \\text{for } i = 1, \\ldots, K',
          },
          {
            note: 'Pass@K = 1 if at least one of the K solutions is correct. Equivalently, it is 1 minus the probability that ALL K samples fail.',
            math: '\\text{Pass@}K = 1 - \\prod_{i=1}^{K}(1 - v_i) \\approx 1 - (1 - p)^K \\;\\text{where}\\; p = \\text{Pass@}1',
          },
        ]}
        symbols={[
          { symbol: 'K', meaning: 'Number of independent samples (typically 1, 16, 64, 256, or 1024)' },
          { symbol: 'p', meaning: 'Per-attempt success probability (Pass@1)' },
          { symbol: '(1-p)^K', meaning: 'Probability all K attempts fail — drops exponentially with K' },
        ]}
      />

      {/* ── Pass@K Curves SVG ── */}
      <Diagram caption={<><strong>Pass@K Curves: Base Model vs RLVR Model</strong> — the curves crossing at large K is the key evidence for Camp B (genuine learning)</>}>
        <svg viewBox="0 0 860 420" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120e22" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>
          <rect width="860" height="420" rx="12" fill="url(#rlvr-bg4)" />
          <text x="430" y="28" textAnchor="middle" fill={V} fontSize="14" fontWeight="700" letterSpacing="1.5">PASS@K — DO THE CURVES CROSS?</text>

          {/* Axes */}
          <line x1="100" y1="60" x2="100" y2="360" stroke="#334155" strokeWidth="1.5" />
          <line x1="100" y1="360" x2="800" y2="360" stroke="#334155" strokeWidth="1.5" />
          <text x="50" y="210" textAnchor="middle" fill={GRAY} fontSize="12" fontWeight="600" transform="rotate(-90, 50, 210)">Pass@K (%)</text>
          <text x="450" y="400" textAnchor="middle" fill={GRAY} fontSize="12" fontWeight="600">K (number of samples, log scale)</text>

          {/* Y-axis labels */}
          {[0, 20, 40, 60, 80, 100].map((val, i) => (
            <g key={`y-${val}`}>
              <text x="90" y={360 - i * 60 + 4} textAnchor="end" fill={GRAY} fontSize="10">{val}</text>
              <line x1="95" y1={360 - i * 60} x2="800" y2={360 - i * 60} stroke="#1e293b" strokeWidth="0.5" />
            </g>
          ))}

          {/* X-axis labels */}
          {['1', '4', '16', '64', '256', '1024'].map((val, i) => (
            <text key={`x-${val}`} x={130 + i * 125} y={380} textAnchor="middle" fill={GRAY} fontSize="10">{val}</text>
          ))}

          {/* Base model curve (orange) — starts lower but climbs to high Pass@K */}
          <polyline
            points="130,312 255,252 380,198 505,156 630,120 755,96"
            fill="none"
            stroke={AMBER}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Base model dots */}
          {[[130,312],[255,252],[380,198],[505,156],[630,120],[755,96]].map(([cx,cy], i) => (
            <circle key={`bd-${i}`} cx={cx} cy={cy} r="4" fill={AMBER} />
          ))}

          {/* RLVR model curve (violet) — starts much higher but plateaus */}
          <polyline
            points="130,192 255,144 380,114 505,96 630,84 755,78"
            fill="none"
            stroke={V}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* RLVR model dots */}
          {[[130,192],[255,144],[380,114],[505,96],[630,84],[755,78]].map(([cx,cy], i) => (
            <circle key={`vd-${i}`} cx={cx} cy={cy} r="4" fill={V} />
          ))}

          {/* Crossing zone highlight */}
          <rect x="620" y="68" width="150" height="68" rx="8" fill={V} fillOpacity="0.06" stroke={V} strokeWidth="1" strokeDasharray="4 3" />
          <text x="695" y="60" textAnchor="middle" fill={V2} fontSize="10" fontWeight="600">CROSSING ZONE</text>

          {/* Annotation: Camp A scenario */}
          <rect x="110" y="60" width="200" height="50" rx="6" fill={ROSE} fillOpacity="0.08" stroke={ROSE} strokeWidth="1" />
          <text x="210" y="78" textAnchor="middle" fill={ROSE} fontSize="10" fontWeight="600">Camp A: curves converge</text>
          <text x="210" y="94" textAnchor="middle" fill={GRAY} fontSize="9">Base catches up at large K</text>
          <text x="210" y="106" textAnchor="middle" fill={GRAY} fontSize="9">= same underlying capability</text>

          {/* Annotation: Camp B scenario */}
          <rect x="530" y="60" width="80" height="50" rx="6" fill={EMERALD} fillOpacity="0.08" stroke={EMERALD} strokeWidth="1" />
          <text x="570" y="78" textAnchor="middle" fill={EMERALD} fontSize="10" fontWeight="600">Camp B</text>
          <text x="570" y="94" textAnchor="middle" fill={GRAY} fontSize="9">Curves</text>
          <text x="570" y="106" textAnchor="middle" fill={GRAY} fontSize="9">cross!</text>

          {/* Legend */}
          <line x1="130" y1="410" x2="160" y2="410" stroke={AMBER} strokeWidth="2.5" />
          <text x="170" y="414" fill={AMBER} fontSize="11">Base Model</text>
          <line x1="300" y1="410" x2="330" y2="410" stroke={V} strokeWidth="2.5" />
          <text x="340" y="414" fill={V} fontSize="11">RLVR Model</text>

          {/* Gap annotations */}
          <line x1="130" y1="312" x2="130" y2="192" stroke={V2} strokeWidth="1" strokeDasharray="3 3" />
          <text x="148" y="255" fill={V2} fontSize="10" fontWeight="600">Pass@1 gap</text>
          <text x="148" y="268" fill={GRAY} fontSize="9">(big improvement)</text>
        </svg>
      </Diagram>

      <Prose>
        <p>
          The critical observation: if RLVR only teaches better sampling, then at very large K (say, K=1024),
          the base model should eventually <em>catch up</em> — because with enough attempts, it will find
          every solution the RLVR model can find. The curves should <H tip="Convergence = the two Pass@K curves approaching the same value at large K. If the base model at K=1024 reaches the same Pass@K as the RLVR model, this suggests the base model has the same underlying capability — RLVR just made it more efficient at finding correct answers." color={GRAY}>converge</H>.
        </p>
        <p>
          But if RLVR teaches <em>genuinely new</em> reasoning, the curves will <H tip="Crossing = the phenomenon where the base model's Pass@K curve actually EXCEEDS the RLVR model's curve at very large K. This seems paradoxical but can happen because RLVR reduces output diversity — the model becomes more focused on a narrower set of high-quality strategies, potentially losing some exotic but occasionally useful reasoning paths." color={EMERALD}>cross</H> — and
          potentially the RLVR model maintains a permanent gap at every K, or the base model actually
          <em> overtakes</em> at large K (because RLVR reduces diversity while improving quality). Both
          patterns have been observed in different experimental setups.
        </p>
      </Prose>

      {/* ── CoT-Pass@K Comparison SVG ── */}
      <Diagram caption={<><strong>CoT-Pass@K</strong> — Measuring diversity of reasoning strategies, not just correctness</>}>
        <svg viewBox="0 0 860 340" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120e22" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>
          <rect width="860" height="340" rx="12" fill="url(#rlvr-bg5)" />
          <text x="430" y="28" textAnchor="middle" fill={CYAN} fontSize="14" fontWeight="700" letterSpacing="1.5">COT-PASS@K — DISTINCT REASONING PATHS</text>

          {/* Left panel: Regular Pass@K */}
          <rect x="25" y="50" width="395" height="260" rx="10" fill={V} fillOpacity="0.05" stroke={V} strokeWidth="1" />
          <text x="222" y="75" textAnchor="middle" fill={V} fontSize="13" fontWeight="700">Regular Pass@K</text>
          <text x="222" y="95" textAnchor="middle" fill={GRAY} fontSize="11">Counts ANY correct output</text>

          {/* Three solution boxes — some duplicate reasoning */}
          <rect x="50" y="115" width="340" height="50" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="70" y="136" fill={GREEN} fontSize="10" fontWeight="600">Solution 1:</text>
          <text x="70" y="152" fill={GRAY} fontSize="10">{"Factor: x\u00B2 - 16 = (x-4)(x+4) \u2192 x = 4, -4"}</text>

          <rect x="50" y="175" width="340" height="50" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="70" y="196" fill={GREEN} fontSize="10" fontWeight="600">Solution 2:</text>
          <text x="70" y="212" fill={GRAY} fontSize="10">{"Factor: x\u00B2 - 16 = (x-4)(x+4) \u2192 x = 4, -4"}</text>

          <rect x="50" y="235" width="340" height="50" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="70" y="256" fill={GREEN} fontSize="10" fontWeight="600">Solution 3:</text>
          <text x="70" y="272" fill={GRAY} fontSize="10">Quadratic formula: x = (0 +/- sqrt(64)) / 2</text>

          <text x="222" y="300" textAnchor="middle" fill={V} fontSize="11" fontWeight="600">Pass@3 = 3/3 = 100%</text>

          {/* Right panel: CoT-Pass@K */}
          <rect x="440" y="50" width="395" height="260" rx="10" fill={CYAN} fillOpacity="0.05" stroke={CYAN} strokeWidth="1" />
          <text x="637" y="75" textAnchor="middle" fill={CYAN} fontSize="13" fontWeight="700">CoT-Pass@K</text>
          <text x="637" y="95" textAnchor="middle" fill={GRAY} fontSize="11">Counts only DISTINCT reasoning paths</text>

          <rect x="465" y="115" width="340" height="50" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="485" y="136" fill={GREEN} fontSize="10" fontWeight="600">Path A: Factoring</text>
          <text x="485" y="152" fill={GRAY} fontSize="10">{"x\u00B2 - 16 = (x-4)(x+4) \u2192 x = 4, -4"}</text>

          <rect x="465" y="175" width="340" height="50" rx="6" fill={GRAY} fillOpacity="0.08" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
          <text x="485" y="196" fill={GRAY} fontSize="10" fontWeight="600">Duplicate of Path A (skipped)</text>
          <text x="485" y="212" fill="#64748b" fontSize="10">Same factoring approach — not counted</text>

          <rect x="465" y="235" width="340" height="50" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="485" y="256" fill={GREEN} fontSize="10" fontWeight="600">Path B: Quadratic Formula</text>
          <text x="485" y="272" fill={GRAY} fontSize="10">x = (0 +/- sqrt(64)) / 2 — different approach</text>

          <text x="637" y="300" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="600">CoT-Pass@3 = 2 distinct paths</text>
        </svg>
      </Diagram>

      <ConceptCard title="Why CoT-Pass@K matters for the debate" color={V} defaultOpen={true}>
        <Prose>
          <p>
            If RLVR only improves <H tip="Sampling efficiency = the probability of finding a correct answer on any single attempt. Higher sampling efficiency = higher Pass@1. RLVR clearly improves this — the question is whether it does ONLY this." color={V}>sampling efficiency</H>,
            then CoT-Pass@K should be <em>nearly identical</em> for the base model and RLVR model. Both
            models have the same repertoire of reasoning strategies — RLVR just picks the right one more
            often. But if RLVR teaches new reasoning, CoT-Pass@K should <em>increase</em> because the
            model can access reasoning paths that did not exist before training.
          </p>
          <p>
            <strong>What the data shows:</strong> Results are mixed. On easier benchmarks (GSM8K, MATH),
            CoT-Pass@K barely changes — supporting Camp A. On harder benchmarks (AIME, competition math),
            some studies find genuinely new reasoning patterns emerging — supporting Camp B. The answer
            may depend on problem difficulty and how far the base model is from the{' '}
            <H tip="Capability frontier = the boundary of what a model can possibly solve, even with unlimited sampling attempts. If a problem is within the frontier, the model CAN solve it given enough tries. RLVR might expand this frontier (Camp B) or just make the model more efficient within its existing frontier (Camp A)." color={V2}>capability frontier</H>.
          </p>
        </Prose>
      </ConceptCard>

      <MentalModel
        title="The Archer Analogy"
        analogy="Think of the base model as an archer who can hit any point on the target — but fires randomly. Pass@K=1024 means giving the archer 1024 arrows. With enough arrows, they will eventually hit the bullseye. RLVR is like coaching: the archer learns to aim. Camp A says coaching only improves aim (sampling efficiency). Camp B says coaching also makes the archer's arm stronger, so they can reach targets that were previously out of range (new capability)."
        technical="Formally, if RLVR only changes the sampling distribution p(o|q) without expanding its support (the set of achievable outputs), then for any solution the RLVR model can produce, the base model can also produce it — just with lower probability. Pass@K at large K would converge. If RLVR expands the support, convergence would not happen."
        color={V}
      />


      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — THE EVIDENCE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="The Evidence — What Do the Experiments Actually Show?"
        subtitle="Key findings from DeepSeek, Google, and academic groups that support both sides"
        color={V}
      />

      <Prose>
        <p>
          Multiple research groups have attacked this question from different angles. The evidence
          falls into three categories: <H tip="Scaling experiments = varying the number of samples K and comparing Pass@K between base and RLVR models across different K values. The shape of the curves and whether they converge/cross is the key diagnostic." color={V}>scaling experiments</H>{' '}
          (how Pass@K behaves as K grows), <H tip="Behavioral analysis = examining the actual chain-of-thought outputs to identify whether RLVR models use reasoning patterns that never appear in base model outputs, even after thousands of samples." color={CYAN}>behavioral analysis</H>{' '}
          (do new reasoning patterns appear?), and{' '}
          <H tip="Transfer experiments = testing whether improvements from RLVR on math problems also improve performance on completely different domains like science, logic, or reading comprehension. Strong transfer suggests genuine reasoning improvement, not just domain-specific optimization." color={GREEN}>transfer experiments</H>{' '}
          (does RLVR generalize beyond its training domain?).
        </p>
      </Prose>

      <ComparisonTable
        headers={['Finding', 'Supports', 'Study', 'Significance']}
        rows={[
          ['Pass@K converges at K=256 on GSM8K', 'Camp A', 'Yue et al., 2025', 'Base model already covers these solutions'],
          ['Pass@K curves cross on AIME', 'Camp B', 'DeepSeek R1 team', 'RLVR model finds solutions base cannot'],
          ['CoT-Pass@K unchanged on easy tasks', 'Camp A', 'Multiple groups', 'No new reasoning strategies for easy problems'],
          ['New self-verification patterns emerge', 'Camp B', 'DeepSeek R1-Zero', 'Never seen in base model outputs'],
          ['Math RLVR improves code performance', 'Camp B', 'Qwen team', 'Cross-domain transfer = general reasoning'],
          ['Longer CoT does not help base model', 'Camp B', 'Multiple groups', 'More tokens =/= better reasoning for base'],
          ['RLVR reduces output diversity', 'Camp A', 'Yue et al., 2025', 'Model collapses to fewer strategies'],
          ['Emergent "aha moments" in training', 'Camp B', 'DeepSeek R1-Zero', 'Metacognitive behavior appears spontaneously'],
        ]}
        caption="Key experimental findings from RLVR research, with the camp each finding supports"
      />

      {/* ── Evidence Summary SVG ── */}
      <Diagram caption={<><strong>Evidence Map</strong> — findings from multiple research groups, color-coded by which camp they support</>}>
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120e22" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>
          <rect width="860" height="380" rx="12" fill="url(#rlvr-bg6)" />
          <text x="430" y="28" textAnchor="middle" fill={V} fontSize="14" fontWeight="700" letterSpacing="1.5">EVIDENCE MAP — THE FULL PICTURE</text>

          {/* Spectrum bar */}
          <defs>
            <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={ROSE} />
              <stop offset="50%" stopColor={V} />
              <stop offset="100%" stopColor={EMERALD} />
            </linearGradient>
          </defs>
          <rect x="80" y="48" width="700" height="10" rx="5" fill="url(#spectrum)" opacity="0.4" />
          <text x="80" y="72" textAnchor="start" fill={ROSE} fontSize="10" fontWeight="600">JUST SAMPLING</text>
          <text x="430" y="72" textAnchor="middle" fill={V2} fontSize="10" fontWeight="600">MIXED</text>
          <text x="780" y="72" textAnchor="end" fill={EMERALD} fontSize="10" fontWeight="600">GENUINE LEARNING</text>

          {/* Evidence nodes */}
          {/* Camp A evidence (left side) */}
          <rect x="50" y="90" width="230" height="55" rx="8" fill={ROSE} fillOpacity="0.08" stroke={ROSE} strokeWidth="1" />
          <text x="165" y="110" textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">Pass@K Converges (GSM8K)</text>
          <text x="165" y="128" textAnchor="middle" fill={GRAY} fontSize="9">Base catches up with enough samples</text>

          <rect x="50" y="155" width="230" height="55" rx="8" fill={ROSE} fillOpacity="0.08" stroke={ROSE} strokeWidth="1" />
          <text x="165" y="175" textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">CoT diversity decreases</text>
          <text x="165" y="193" textAnchor="middle" fill={GRAY} fontSize="9">RLVR narrows reasoning strategies</text>

          <rect x="50" y="220" width="230" height="55" rx="8" fill={ROSE} fillOpacity="0.08" stroke={ROSE} strokeWidth="1" />
          <text x="165" y="240" textAnchor="middle" fill={ROSE} fontSize="11" fontWeight="600">Easy tasks: no new patterns</text>
          <text x="165" y="258" textAnchor="middle" fill={GRAY} fontSize="9">Same strategies, better selection</text>

          {/* Mixed evidence (center) */}
          <rect x="315" y="90" width="230" height="55" rx="8" fill={V} fillOpacity="0.08" stroke={V} strokeWidth="1" />
          <text x="430" y="110" textAnchor="middle" fill={V} fontSize="11" fontWeight="600">Difficulty-dependent effect</text>
          <text x="430" y="128" textAnchor="middle" fill={GRAY} fontSize="9">Easy=sampling, Hard=learning?</text>

          <rect x="315" y="155" width="230" height="55" rx="8" fill={V} fillOpacity="0.08" stroke={V} strokeWidth="1" />
          <text x="430" y="175" textAnchor="middle" fill={V} fontSize="11" fontWeight="600">Training duration matters</text>
          <text x="430" y="193" textAnchor="middle" fill={GRAY} fontSize="9">Short RLVR = sampling, Long RLVR = learning?</text>

          {/* Camp B evidence (right side) */}
          <rect x="580" y="90" width="255" height="55" rx="8" fill={EMERALD} fillOpacity="0.08" stroke={EMERALD} strokeWidth="1" />
          <text x="707" y="110" textAnchor="middle" fill={EMERALD} fontSize="11" fontWeight="600">Pass@K curves cross (AIME)</text>
          <text x="707" y="128" textAnchor="middle" fill={GRAY} fontSize="9">RLVR exceeds base at ALL K values</text>

          <rect x="580" y="155" width="255" height="55" rx="8" fill={EMERALD} fillOpacity="0.08" stroke={EMERALD} strokeWidth="1" />
          <text x="707" y="175" textAnchor="middle" fill={EMERALD} fontSize="11" fontWeight="600">Emergent self-verification</text>
          <text x="707" y="193" textAnchor="middle" fill={GRAY} fontSize="9">"Wait, let me check..." never seen in base</text>

          <rect x="580" y="220" width="255" height="55" rx="8" fill={EMERALD} fillOpacity="0.08" stroke={EMERALD} strokeWidth="1" />
          <text x="707" y="240" textAnchor="middle" fill={EMERALD} fontSize="11" fontWeight="600">Cross-domain transfer</text>
          <text x="707" y="258" textAnchor="middle" fill={GRAY} fontSize="9">Math RLVR improves code reasoning</text>

          <rect x="580" y="285" width="255" height="55" rx="8" fill={EMERALD} fillOpacity="0.08" stroke={EMERALD} strokeWidth="1" />
          <text x="707" y="305" textAnchor="middle" fill={EMERALD} fontSize="11" fontWeight="600">"Aha moments" in training</text>
          <text x="707" y="323" textAnchor="middle" fill={GRAY} fontSize="9">Metacognition emerges from RL alone</text>

          {/* Bottom verdict */}
          <rect x="180" y="345" width="500" height="28" rx="8" fill={V} fillOpacity="0.10" stroke={V} strokeWidth="1" />
          <text x="430" y="364" textAnchor="middle" fill={V2} fontSize="11" fontWeight="600">Verdict: likely BOTH — sampling for easy tasks, genuine learning for hard ones</text>
        </svg>
      </Diagram>

      <Callout type="insight">
        A nuanced reading of the evidence suggests a <strong>difficulty-dependent</strong> answer: for
        problems within the base model's capability frontier (it can already solve them, just unreliably),
        RLVR primarily improves sampling efficiency. For problems near or beyond the frontier, RLVR may
        genuinely expand what the model can do. The frontier is not a fixed line — it depends on the
        model, the domain, and how you measure it.
      </Callout>

      <SimpleExplain>
        <p><strong>The punchline:</strong> Imagine you can solve basic algebra but struggle with calculus. Coaching (RLVR) does two things: (1) makes you faster and more reliable at algebra you already know (sampling efficiency), and (2) pushes you to actually learn some calculus techniques you never had before (genuine learning). The first effect dominates on easy problems, the second on hard ones. Both are real.</p>
      </SimpleExplain>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — TIMELINE AND REWARD TYPES
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="The RL Methods Timeline — From RLHF to RLVR"
        subtitle="How the field evolved from human feedback to verifiable rewards"
        color={V}
      />

      <Prose>
        <p>
          RLVR did not emerge in a vacuum. It sits at the end of a progression from{' '}
          <H tip="RLHF = Reinforcement Learning from Human Feedback. The original paradigm (InstructGPT, 2022): humans compare outputs, a reward model learns their preferences, PPO optimizes against it. Expensive, subjective, but general-purpose." color={AMBER}>RLHF</H>{' '}
          through <H tip="DPO = Direct Preference Optimization (Rafailov et al., 2023). Eliminates the explicit reward model by treating the LLM itself as an implicit reward function. Simpler and more stable than PPO, but still requires human preference data." color={BLUE}>DPO</H>{' '}
          to <H tip="GRPO = Group Relative Policy Optimization (DeepSeek, 2024). Eliminates the critic network from PPO by computing advantages from group comparisons. Combined with verifiable rewards, it enables RLVR." color={V}>GRPO</H>,
          each step removing a component that was expensive, unstable, or both. RLVR removes the
          last human-dependent bottleneck: the reward signal itself.
        </p>
      </Prose>

      {/* ── Timeline SVG ── */}
      <Diagram caption={<><strong>Evolution of RL for LLMs</strong> — each generation removes a bottleneck, from human annotation to automated verification</>}>
        <svg viewBox="0 0 860 350" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg7" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120e22" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>
          <rect width="860" height="350" rx="12" fill="url(#rlvr-bg7)" />
          <text x="430" y="28" textAnchor="middle" fill={V} fontSize="14" fontWeight="700" letterSpacing="1.5">EVOLUTION OF RL FOR LANGUAGE MODELS</text>

          {/* Timeline line */}
          <line x1="60" y1="85" x2="800" y2="85" stroke="#334155" strokeWidth="2" />

          {/* Era 1: RLHF (2022) */}
          <circle cx="120" cy="85" r="8" fill={AMBER} />
          <text x="120" y="68" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="700">2022</text>
          <rect x="45" y="105" width="150" height="120" rx="8" fill={AMBER} fillOpacity="0.08" stroke={AMBER} strokeWidth="1" />
          <text x="120" y="125" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="700">RLHF + PPO</text>
          <text x="120" y="145" textAnchor="middle" fill={GRAY} fontSize="10">Human comparisons</text>
          <text x="120" y="160" textAnchor="middle" fill={GRAY} fontSize="10">Learned reward model</text>
          <text x="120" y="175" textAnchor="middle" fill={GRAY} fontSize="10">Critic network (2x mem)</text>
          <text x="120" y="195" textAnchor="middle" fill={RED} fontSize="9" fontWeight="600">Expensive + unstable</text>

          {/* Era 2: DPO (2023) */}
          <circle cx="310" cy="85" r="8" fill={BLUE} />
          <text x="310" y="68" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700">2023</text>
          <rect x="235" y="105" width="150" height="120" rx="8" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="1" />
          <text x="310" y="125" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700">DPO</text>
          <text x="310" y="145" textAnchor="middle" fill={GRAY} fontSize="10">Human comparisons</text>
          <text x="310" y="160" textAnchor="middle" fill={GREEN} fontSize="10">No reward model</text>
          <text x="310" y="175" textAnchor="middle" fill={GREEN} fontSize="10">No critic network</text>
          <text x="310" y="195" textAnchor="middle" fill={AMBER} fontSize="9" fontWeight="600">Simpler, still needs humans</text>

          {/* Era 3: GRPO (2024) */}
          <circle cx="500" cy="85" r="8" fill={CYAN} />
          <text x="500" y="68" textAnchor="middle" fill={CYAN} fontSize="12" fontWeight="700">2024</text>
          <rect x="425" y="105" width="150" height="120" rx="8" fill={CYAN} fillOpacity="0.08" stroke={CYAN} strokeWidth="1" />
          <text x="500" y="125" textAnchor="middle" fill={CYAN} fontSize="12" fontWeight="700">GRPO</text>
          <text x="500" y="145" textAnchor="middle" fill={GRAY} fontSize="10">Group comparisons</text>
          <text x="500" y="160" textAnchor="middle" fill={GREEN} fontSize="10">No critic network</text>
          <text x="500" y="175" textAnchor="middle" fill={GRAY} fontSize="10">Any reward signal</text>
          <text x="500" y="195" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="600">Scalable to 671B</text>

          {/* Era 4: RLVR (2025) */}
          <circle cx="690" cy="85" r="8" fill={V} stroke={V2} strokeWidth="2" />
          <text x="690" y="68" textAnchor="middle" fill={V} fontSize="12" fontWeight="700">2025</text>
          <rect x="615" y="105" width="150" height="120" rx="8" fill={V} fillOpacity="0.12" stroke={V} strokeWidth="2" />
          <text x="690" y="125" textAnchor="middle" fill={V} fontSize="12" fontWeight="700">RLVR</text>
          <text x="690" y="145" textAnchor="middle" fill={GREEN} fontSize="10">No human feedback</text>
          <text x="690" y="160" textAnchor="middle" fill={GREEN} fontSize="10">No reward model</text>
          <text x="690" y="175" textAnchor="middle" fill={GREEN} fontSize="10">Verifiable rewards only</text>
          <text x="690" y="195" textAnchor="middle" fill={V2} fontSize="9" fontWeight="600">Free, objective, scalable</text>

          {/* Bottom: what was removed at each step */}
          <text x="215" y="255" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600">Removed:</text>
          <text x="215" y="272" textAnchor="middle" fill={GREEN} fontSize="10">Reward model</text>
          <text x="215" y="287" textAnchor="middle" fill={GREEN} fontSize="10">Critic network</text>

          <text x="405" y="255" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600">Removed:</text>
          <text x="405" y="272" textAnchor="middle" fill={GREEN} fontSize="10">PPO instability</text>

          <text x="595" y="255" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600">Removed:</text>
          <text x="595" y="272" textAnchor="middle" fill={GREEN} fontSize="10">Human annotation</text>
          <text x="595" y="287" textAnchor="middle" fill={GREEN} fontSize="10">Learned reward model</text>

          {/* Arrow annotations */}
          {ARROW(195, 242, 215, 242, GREEN)}
          {ARROW(385, 242, 405, 242, GREEN)}
          {ARROW(575, 242, 595, 242, GREEN)}

          {/* Bottom bar: cost trajectory */}
          <rect x="60" y="310" width="740" height="28" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          <text x="430" y="329" textAnchor="middle" fill={GRAY} fontSize="10">{"Cost per training run: $10M+ (RLHF) \u2192 $1M (DPO) \u2192 $500K (GRPO) \u2192 ~$100K (RLVR)"}</text>
        </svg>
      </Diagram>

      <ConceptCard title="The Verifiable Reward Zoo" color={V} defaultOpen={true}>
        <ComparisonTable
          headers={['Reward Type', 'Domain', 'How It Works', 'Objectivity']}
          rows={[
            ['Answer matching', 'Math', 'Compare final answer to ground truth', '100% objective'],
            ['Unit test execution', 'Code', 'Run code against test suite', '100% objective'],
            ['SAT/SMT solver', 'Logic', 'Formal verification of logical claims', '100% objective'],
            ['Proof checker', 'Formal math', 'Verify proof steps with Lean/Coq', '100% objective'],
            ['Compiler check', 'Code generation', 'Does the code compile without errors?', '100% objective'],
            ['Format compliance', 'All', 'Does output follow required structure?', '100% objective'],
          ]}
          caption="All verifiable rewards share one property: no learned component, no subjectivity"
        />
      </ConceptCard>

      <Callout type="warning">
        RLVR has a fundamental limitation: it only works for domains with verifiable answers.
        Creative writing, open-ended reasoning, ethical judgment, and nuanced communication{' '}
        <em>cannot</em> be verified automatically. For these domains, RLHF or DPO remain
        necessary. The frontier models use <strong>both</strong> — RLVR for verifiable domains,
        RLHF for everything else.
      </Callout>


      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — OPEN QUESTIONS AND IMPLICATIONS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Open Questions and What Comes Next"
        subtitle="The unanswered questions that will shape the next generation of reasoning models"
        color={V}
      />

      <Prose>
        <p>
          RLVR has proven its value — no serious researcher disputes that it works. The debate is
          about <em>how</em> it works and <em>what its limits are</em>. Several open questions will
          shape the next generation of <H tip="Reasoning models = LLMs specifically optimized for step-by-step problem solving, including DeepSeek-R1, OpenAI o1/o3, and upcoming models from Google and Anthropic. These models spend more compute at inference time 'thinking' through problems." color={V}>reasoning models</H>.
        </p>
      </Prose>

      {/* ── Open Questions SVG ── */}
      <Diagram caption={<><strong>The Research Frontier</strong> — open questions that the community is actively investigating</>}>
        <svg viewBox="0 0 860 400" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="rlvr-bg8" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#120e22" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>
          <rect width="860" height="400" rx="12" fill="url(#rlvr-bg8)" />
          <text x="430" y="28" textAnchor="middle" fill={V} fontSize="14" fontWeight="700" letterSpacing="1.5">OPEN RESEARCH QUESTIONS</text>

          {/* Question 1 */}
          <rect x="25" y="50" width="395" height="100" rx="10" fill={V} fillOpacity="0.08" stroke={V} strokeWidth="1.5" />
          <text x="45" y="72" fill={V} fontSize="13" fontWeight="700">Q1: Where is the boundary?</text>
          <text x="45" y="92" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">At what difficulty level does RLVR transition</text>
          <text x="45" y="108" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">from sampling optimization to genuine learning?</text>
          <text x="45" y="128" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">Can we predict this boundary in advance?</text>
          <text x="45" y="144" fill={V2} fontSize="10" fontWeight="600">Impact: determines RLVR's true ceiling</text>

          {/* Question 2 */}
          <rect x="440" y="50" width="395" height="100" rx="10" fill={CYAN} fillOpacity="0.08" stroke={CYAN} strokeWidth="1.5" />
          <text x="460" y="72" fill={CYAN} fontSize="13" fontWeight="700">Q2: Can we extend verification?</text>
          <text x="460" y="92" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">Can LLMs act as verifiers for domains</text>
          <text x="460" y="108" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">where no ground truth exists? "RLVF" —</text>
          <text x="460" y="128" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">RL with verifier feedback from LLM judges?</text>
          <text x="460" y="144" fill={CYAN} fontSize="10" fontWeight="600">Impact: could replace RLHF entirely</text>

          {/* Question 3 */}
          <rect x="25" y="165" width="395" height="100" rx="10" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1.5" />
          <text x="45" y="187" fill={GREEN} fontSize="13" fontWeight="700">Q3: Process rewards vs outcome rewards?</text>
          <text x="45" y="207" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">Should we reward each reasoning step, not just</text>
          <text x="45" y="223" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">the final answer? Process rewards (PRM) are</text>
          <text x="45" y="239" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">harder to automate but richer in signal.</text>
          <text x="45" y="259" fill={GREEN} fontSize="10" fontWeight="600">Impact: could unlock deeper reasoning</text>

          {/* Question 4 */}
          <rect x="440" y="165" width="395" height="100" rx="10" fill={AMBER} fillOpacity="0.08" stroke={AMBER} strokeWidth="1.5" />
          <text x="460" y="187" fill={AMBER} fontSize="13" fontWeight="700">Q4: Scaling laws for RLVR?</text>
          <text x="460" y="207" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">How does RLVR benefit scale with model size,</text>
          <text x="460" y="223" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">data quantity, and training compute? Are there</text>
          <text x="460" y="239" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">diminishing returns or phase transitions?</text>
          <text x="460" y="259" fill={AMBER} fontSize="10" fontWeight="600">Impact: guides compute allocation</text>

          {/* Question 5 */}
          <rect x="25" y="280" width="395" height="100" rx="10" fill={ROSE} fillOpacity="0.08" stroke={ROSE} strokeWidth="1.5" />
          <text x="45" y="302" fill={ROSE} fontSize="13" fontWeight="700">Q5: Diversity collapse?</text>
          <text x="45" y="322" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">RLVR reduces output diversity. Does this hurt</text>
          <text x="45" y="338" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">long-term capability? Can we train for both</text>
          <text x="45" y="354" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">efficiency AND diversity simultaneously?</text>
          <text x="45" y="374" fill={ROSE} fontSize="10" fontWeight="600">Impact: fundamental efficiency-diversity tradeoff</text>

          {/* Question 6 */}
          <rect x="440" y="280" width="395" height="100" rx="10" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="1.5" />
          <text x="460" y="302" fill={BLUE} fontSize="13" fontWeight="700">Q6: Base model quality matters how much?</text>
          <text x="460" y="322" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">If the base model determines RLVR's ceiling,</text>
          <text x="460" y="338" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">should we invest more in pre-training? How does</text>
          <text x="460" y="354" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">the interaction between pre-training and RLVR work?</text>
          <text x="460" y="374" fill={BLUE} fontSize="10" fontWeight="600">Impact: optimal compute split between PT and RL</text>
        </svg>
      </Diagram>

      <ConceptCard title="The Bigger Picture: What RLVR Means for AI" color={V} defaultOpen={true}>
        <Prose>
          <p>
            Regardless of whether RLVR teaches "genuine" reasoning, it has proven three things that
            reshape how we think about AI development:
          </p>
          <p>
            <strong>1. Human annotation is not always necessary.</strong> For domains with{' '}
            <H tip="Objective verification = any domain where correctness can be checked algorithmically. Includes math (answer checking), code (test suites), logic (SAT solvers), chemistry (simulation), physics (equation verification), and increasingly natural language via LLM-as-judge. The frontier of what is 'verifiable' is expanding." color={GREEN}>objective verification</H>,
            automated rewards match or exceed the quality of human feedback — at a fraction of the cost.
          </p>
          <p>
            <strong>2. Emergent behaviors are real.</strong> R1-Zero's spontaneous development of{' '}
            <H tip="Self-verification = the model independently developing the behavior of checking its own work, without ever being trained on examples of self-verification. This is the strongest evidence for genuine learning — it is a capability that emerged purely from optimization pressure." color={V}>self-verification</H>,{' '}
            <H tip="Backtracking = the model recognizing a dead-end reasoning path and returning to an earlier step to try a different approach. Example: 'This factoring approach is getting complicated. Let me try completing the square instead.' This planning-like behavior emerged from reward-only training." color={V2}>backtracking</H>,
            and reflection demonstrates that RL optimization pressure can produce{' '}
            <H tip="Metacognitive behaviors = reasoning about one's own reasoning. Includes self-monitoring ('Am I on the right track?'), strategy selection ('Which method should I use?'), and effort allocation ('This is hard, I should think more carefully'). These appeared in R1-Zero without any explicit training signal for metacognition." color={CYAN}>metacognitive behaviors</H>{' '}
            that no one explicitly programmed.
          </p>
          <p>
            <strong>3. The sampling-vs-learning debate matters practically.</strong> If RLVR primarily
            improves sampling, then{' '}
            <H tip="Test-time compute scaling = spending more compute at inference time by generating multiple solutions and selecting the best one (e.g., Best-of-N sampling). If RLVR only improves sampling efficiency, then test-time compute scaling on a base model could achieve the same results — making RLVR training unnecessary for users willing to pay for inference." color={AMBER}>test-time compute scaling</H>{' '}
            on a strong base model could achieve similar results without RLVR training. If it teaches
            genuine reasoning, RLVR training is irreplaceable.
          </p>
        </Prose>
      </ConceptCard>

      <MentalModel
        title="The Map and the Territory"
        analogy="Think of the base model's knowledge as a vast territory it has explored during pre-training. RLHF gives it a hand-drawn map (subjective, possibly wrong). RLVR gives it a compass that always points to correct answers (objective, but only works where there IS a correct answer). Camp A says the compass only helps navigate territory the model has already explored. Camp B says the compass actually reveals new territory. The truth: the compass both helps navigation AND sometimes leads to genuinely new ground — but only where the compass works."
        technical="The formal question is whether RLVR changes only the policy's distribution over existing high-probability outputs (mode-seeking), or whether it also shifts probability mass to outputs that had near-zero probability under the base model (support expansion). Current evidence suggests both occur, with the relative magnitude depending on task difficulty and training duration."
        color={V}
      />

      <Callout type="key">
        <strong>The bottom line:</strong> RLVR represents a genuine paradigm shift — from expensive,
        subjective human feedback to cheap, objective automated verification. Whether it creates
        "new" reasoning or "just" improves sampling is an important scientific question, but either
        way, RLVR models are dramatically more capable at the tasks that matter. The next frontier is
        extending verification to more domains, understanding the scaling laws of RLVR, and finding the
        optimal balance between pre-training investment and RL fine-tuning.
      </Callout>

      <StatBar
        stats={[
          { value: '7', unit: '+', label: 'Verifiable reward types', color: V },
          { value: '2', unit: '', label: 'Camps in the debate', color: ROSE },
          { value: '100%', unit: '', label: 'Agree RLVR works', color: GREEN },
          { value: '0%', unit: '', label: 'Consensus on WHY', color: AMBER },
        ]}
      />

      <SimpleExplain>
        <p><strong>Where this leaves us:</strong> RLVR is not just a technical improvement — it is a philosophical test for what it means for a model to "reason." If a model that was trained purely by being told "right" or "wrong" develops the ability to check its own work, backtrack when stuck, and try new approaches, is that reasoning? The RLVR debate forces us to confront what we actually mean when we say a machine "thinks." For now, the practical answer is clear: RLVR produces better models, faster, cheaper. The theoretical answer is still being written.</p>
      </SimpleExplain>
    </>
  );
}
