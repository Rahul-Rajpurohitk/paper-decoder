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
import VisualCompare from '../../components/VisualCompare';
import SimpleExplain from '../../components/SimpleExplain';

/* ─── colour tokens ─── */
const E  = '#10b981';   // emerald accent (primary)
const E2 = '#34d399';   // lighter emerald
const E3 = '#059669';   // darker emerald
const BG = '#0a1a14';   // deep green-black for SVGs
const FG = '#e2e8f0';   // light text in SVGs
const GRAY = '#94a3b8';
const BLUE = '#3b82f6';
const PURPLE = '#a855f7';
const RED = '#ef4444';
const AMBER = '#f59e0b';
const CYAN = '#06b6d4';

/* ─── SVG helpers ─── */
const ARROW = (x1, y1, x2, y2, color = E, dashed = false) => (
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

export default function DeepSeekR1Paper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHY DEEPSEEK-R1?
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="Why DeepSeek-R1? Reasoning Without a Teacher"
        subtitle="Pure reinforcement learning produces chain-of-thought — no human examples needed"
        color={E}
      />

      <Prose>
        <p>
          Before DeepSeek-R1, the recipe for building a reasoning model was well-established:
          collect thousands of <H tip="Chain-of-thought (CoT) examples = human-written step-by-step solutions that show how to break a complex problem into smaller steps. Example: 'First I need to find the area, so I multiply length by width, then...' These are expensive to write and hard to scale — expert annotators cost $50-200/hour for math and coding tasks." color={E}>chain-of-thought examples</H>,
          run <H tip="Supervised Fine-Tuning (SFT) = training a model to imitate human-written examples by minimizing the difference between model outputs and reference answers. The model learns to copy the format and reasoning style of the examples. Think of it as 'teaching by example' — effective but limited to what the examples demonstrate." color={BLUE}>supervised fine-tuning</H> to teach the model to mimic those patterns,
          then apply <H tip="Reinforcement Learning from Human Feedback (RLHF) = a training paradigm where human preferences (which answer is better?) are used to train a reward model, which then guides RL optimization. Used by ChatGPT, Claude, and most commercial LLMs. The reward model acts as a proxy for human judgment." color={PURPLE}>RLHF</H> to refine quality. This was the playbook behind
          OpenAI's <H tip="o1 = OpenAI's reasoning model (September 2024), the first commercial model to use extended chain-of-thought reasoning at inference time. It 'thinks' for longer on hard problems, achieving strong performance on math, coding, and science. The internal reasoning process is hidden from users." color={AMBER}>o1</H>,
          and it required <em>massive human annotation effort</em>.
        </p>
        <p>
          DeepSeek-R1 asked a radical question: <strong>what if we skip the human examples entirely?</strong> Their
          experimental model, <H tip="R1-Zero = DeepSeek's experimental model trained with ONLY reinforcement learning — no supervised fine-tuning, no human chain-of-thought examples. Starting from a raw base LLM (DeepSeek-V3-Base), it learned to reason purely from reward signals. Named 'Zero' because zero human demonstrations were used." color={E}>R1-Zero</H>,
          was trained <em>purely</em> with <H tip="Reinforcement Learning (RL) = a training paradigm where the model learns by trial and error. It generates outputs, receives a reward signal (correct/incorrect, high/low score), and adjusts its behavior to maximize future rewards. Unlike SFT which says 'copy this example,' RL says 'figure out what works.'" color={E}>reinforcement learning</H>,
          starting from a raw <H tip="Base LLM = a language model trained only with next-token prediction on massive text data. It can complete text but hasn't been taught to follow instructions, reason step-by-step, or be helpful. Think of it as a 'raw brain' with knowledge but no structured thinking skills." color={GRAY}>base LLM</H> with
          no reasoning demonstrations at all. The reward was simple: <em>did you get the right answer?</em>
        </p>
        <p>
          What happened next stunned the AI community. The model <strong>spontaneously developed</strong>{' '}
          step-by-step reasoning, <H tip="Self-verification = the model checking its own work by re-examining steps, testing edge cases, or trying alternative approaches. Example: 'Wait, let me verify this by plugging the answer back in...' R1-Zero developed this behavior without ever being shown examples of self-checking." color={E2}>self-verification</H>,
          <H tip="Reflection = the model recognizing errors in its own reasoning and correcting course. Example: 'Hmm, that doesn't seem right. Let me reconsider...' This metacognitive behavior emerged naturally from RL optimization — the model learned that catching and fixing errors leads to higher rewards." color={E2}>reflection</H>, and
          even <H tip="'Aha moments' = instances during training where R1-Zero spontaneously realized it could allocate more thinking time to harder problems. The model would output phrases like 'Wait, I should reconsider this' or 'Let me think about this differently' — not because it was trained to, but because this behavior earned higher rewards." color={AMBER}>"aha moments"</H> — all
          without a single human-written chain-of-thought example. Reasoning <em>emerged</em> from the
          optimization pressure of getting correct answers.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '79.8%', unit: '', label: 'AIME 2024 (pass@1)', color: E },
          { value: '97.3%', unit: '', label: 'MATH-500', color: E2 },
          { value: '2029', unit: '', label: 'Codeforces Rating', color: BLUE },
          { value: '0', unit: '', label: 'SFT examples for R1-Zero', color: AMBER },
        ]}
      />

      <SimpleExplain>
        <p><strong>What happened at a high level:</strong> Imagine trying to teach a child math. The traditional approach (SFT) is to show them hundreds of worked examples: "Here's how you solve quadratic equations, step 1, step 2, step 3..." DeepSeek's approach was radically different: give the child problems, tell them only whether their final answer is right or wrong, and let them figure out their OWN method. Remarkably, the child not only learned to solve problems — they independently invented step-by-step reasoning, double-checking, and self-correction. This is what R1-Zero did.</p>
      </SimpleExplain>

      <ConceptCard title="Why is this a breakthrough?" color={E} defaultOpen={true}>
        <Prose>
          <p>Three reasons this paper sent shockwaves through the AI community:</p>
          <p>
            <strong>1. Reasoning is emergent, not engineered.</strong> Before R1, the assumption was that
            chain-of-thought required careful <H tip="Prompt engineering = designing input prompts to elicit desired behavior from LLMs. 'Let's think step by step' is a famous prompt that improves reasoning. The concern was that without such scaffolding, models couldn't reason. R1-Zero showed reasoning emerges from RL alone." color={E}>prompt engineering</H> or
            supervised examples. R1-Zero proved that <H tip="Emergent behavior = capabilities that arise from training dynamics rather than being explicitly programmed. Like how birds flock without a leader — the pattern emerges from simple local rules. R1-Zero's reasoning emerged from the simple rule: 'maximize answer correctness.'" color={E}>reasoning emerges naturally</H> when
            the model is simply rewarded for being correct.
          </p>
          <p>
            <strong>2. Massive cost reduction.</strong> Collecting high-quality chain-of-thought data for
            math and coding requires expert annotators. <H tip="Expert annotation costs = hiring PhD-level mathematicians or experienced programmers to write step-by-step solutions. At $100-200/hour, generating thousands of high-quality CoT examples can cost millions of dollars. R1's approach replaces most of this with automated reward signals." color={RED}>This costs millions of dollars</H>. R1's
            approach replaces most human annotation with automated <H tip="Reward signals = automated feedback telling the model whether its answer is correct. For math: compare final answer to ground truth. For code: run unit tests. These are essentially free to generate at scale, unlike human annotations." color={E}>reward signals</H> — check the
            answer, run the code, verify the proof.
          </p>
          <p>
            <strong>3. Open weights.</strong> DeepSeek released the full model weights, including distilled
            versions from 1.5B to 70B parameters. This <H tip="Open weights = publicly releasing the trained model parameters so anyone can download, run, and build upon the model. DeepSeek-R1 was released under MIT license, making it one of the most capable open reasoning models available." color={E2}>democratized access</H> to
            frontier-level reasoning capabilities.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        DeepSeek-R1's core finding: reinforcement learning alone, with only correctness rewards, can
        produce sophisticated reasoning behaviors — including chain-of-thought, self-verification, and
        reflection — without any supervised fine-tuning on human-written reasoning traces.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — GRPO: THE RL ALGORITHM
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="GRPO — Group Relative Policy Optimization"
        subtitle="The RL algorithm at the heart of R1: no critic network, just group comparisons"
        color={E}
      />

      <Prose>
        <p>
          Standard <H tip="PPO (Proximal Policy Optimization) = the most widely used RL algorithm for LLM alignment (used by ChatGPT, Claude). It uses a separate 'critic' network to estimate the value of each state, which guides the policy update. The critic is as large as the policy model itself — doubling memory requirements." color={PURPLE}>PPO</H> requires
          a <H tip="Critic/Value network = a separate neural network that estimates 'how good is this state?' for each token position. In LLM-scale PPO, this is typically a copy of the policy model with a value head — meaning you need TWO full copies of a 671B model in memory. This is the main scalability bottleneck of PPO." color={RED}>critic network</H> as
          large as the policy model — for a 671B parameter model like <H tip="DeepSeek-V3 = DeepSeek's base model, a 671B parameter Mixture-of-Experts LLM. It activates only 37B parameters per token via its MoE architecture. This is the starting point for both R1-Zero (direct RL) and R1 (cold-start SFT + RL)." color={E}>DeepSeek-V3</H>,
          that means keeping <em>two</em> 671B models in memory simultaneously. DeepSeek solved this with
          <H tip="GRPO (Group Relative Policy Optimization) = DeepSeek's RL algorithm that eliminates the critic network entirely. Instead of estimating value functions, it generates a GROUP of outputs for each prompt and computes advantages by comparing outputs within the group. The best output in the group gets a positive advantage, the worst gets negative." color={E}>GRPO</H> —
          an algorithm that <strong>eliminates the critic entirely</strong> by computing advantages
          relative to a group of sampled outputs.
        </p>
        <p>
          The idea is elegant: for each question, generate <H tip="Group sampling = generating multiple (typically G=64) complete answers for the same question. Some will be correct, some wrong. By comparing them, the model learns what makes a good answer without needing an external value estimator. Think of it as a 'tournament' where the model's own outputs compete against each other." color={E}>a group of G outputs</H>,
          score each one with a <H tip="Reward model = a function that assigns a numerical score to each output. For math: check if the final answer matches the ground truth (binary reward). For code: run test cases. For general reasoning: a trained neural network that predicts human preferences. R1 uses rule-based rewards for math/code and a neural reward model for general tasks." color={E2}>reward model</H>,
          then compute each output's <H tip="Advantage = how much better (or worse) an output is compared to the group average. Positive advantage = 'this was better than average, do more of this.' Negative advantage = 'this was worse than average, do less of this.' GRPO computes advantages purely from within-group comparisons, no learned value function needed." color={AMBER}>advantage</H> as
          its deviation from the group mean. No critic, no value function, just
          <em> relative comparisons within the group</em>.
        </p>
      </Prose>

      {/* ── GRPO Training Loop SVG ── */}
      <Diagram caption={<><strong>GRPO Training Loop</strong> — For each prompt, generate G outputs, score them, compute group-relative advantages, update policy. No critic network needed.</>}>
        <svg viewBox="0 0 860 420" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="grpo-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={E} />
            </marker>
            <marker id="grpo-ar-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={BLUE} />
            </marker>
            <marker id="grpo-ar-a" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={AMBER} />
            </marker>
            <linearGradient id="grpo-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f18" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>

          <rect width="860" height="420" rx="12" fill="url(#grpo-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={E} fontSize="14" fontWeight="700" letterSpacing="1.5">GRPO TRAINING LOOP — NO CRITIC NETWORK</text>

          {/* Step 1: Question Prompt */}
          <rect x="30" y="60" width="140" height="55" rx="10" fill={E} fillOpacity="0.18" stroke={E} strokeWidth="1.5" />
          <text x="100" y="84" textAnchor="middle" fill={E2} fontSize="13" fontWeight="700">Question q</text>
          <text x="100" y="102" textAnchor="middle" fill={GRAY} fontSize="10">"Solve x^2 = 16"</text>

          {/* Arrow to Group Sampling */}
          <line x1="170" y1="87" x2="210" y2="87" stroke={E} strokeWidth="2" markerEnd="url(#grpo-ar)" />

          {/* Step 2: Group Sampling */}
          <rect x="215" y="45" width="165" height="85" rx="10" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="297" y="67" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700">Group Sampling</text>
          <text x="297" y="84" textAnchor="middle" fill={FG} fontSize="11">Generate G=64 outputs</text>
          {/* Mini output boxes */}
          {[0,1,2,3,4].map(i => (
            <rect key={`s-${i}`} x={228 + i * 28} y="95" width="24" height="20" rx="4" fill={i < 3 ? E : RED} fillOpacity="0.25" stroke={i < 3 ? E : RED} strokeWidth="1" />
          ))}
          <text x="265" y="108" textAnchor="middle" fill={E2} fontSize="8">o1</text>
          <text x="293" y="108" textAnchor="middle" fill={E2} fontSize="8">o2</text>
          <text x="321" y="108" textAnchor="middle" fill={E2} fontSize="8">...</text>
          <text x="349" y="108" textAnchor="middle" fill={RED} fontSize="8">oG</text>

          {/* Arrow to Reward */}
          <line x1="380" y1="87" x2="420" y2="87" stroke={BLUE} strokeWidth="2" markerEnd="url(#grpo-ar-b)" />

          {/* Step 3: Reward Scoring */}
          <rect x="425" y="50" width="150" height="75" rx="10" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1.5" />
          <text x="500" y="72" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="700">Reward Scoring</text>
          <text x="500" y="89" textAnchor="middle" fill={FG} fontSize="11">r_i = R(q, o_i)</text>
          <text x="500" y="106" textAnchor="middle" fill={GRAY} fontSize="10">Correct? Format OK?</text>

          {/* Arrow to Advantage */}
          <line x1="575" y1="87" x2="615" y2="87" stroke={AMBER} strokeWidth="2" markerEnd="url(#grpo-ar-a)" />

          {/* Step 4: Group-Relative Advantage */}
          <rect x="620" y="45" width="210" height="85" rx="10" fill={E} fillOpacity="0.18" stroke={E} strokeWidth="2" />
          <text x="725" y="67" textAnchor="middle" fill={E} fontSize="12" fontWeight="700">Group-Relative Advantage</text>
          <text x="725" y="87" textAnchor="middle" fill={FG} fontSize="11">A_i = (r_i - mean(r)) / std(r)</text>
          <text x="725" y="107" textAnchor="middle" fill={E2} fontSize="10">Better than group avg = positive</text>

          {/* Arrow down to Policy Update */}
          <line x1="725" y1="130" x2="725" y2="170" stroke={E} strokeWidth="2" markerEnd="url(#grpo-ar)" />

          {/* Step 5: Policy Update */}
          <rect x="540" y="175" width="370" height="80" rx="12" fill={E} fillOpacity="0.10" stroke={E} strokeWidth="2" />
          <text x="725" y="197" textAnchor="middle" fill={E} fontSize="13" fontWeight="700">Policy Update (Clipped Objective)</text>
          <text x="725" y="217" textAnchor="middle" fill={FG} fontSize="11">Increase prob of high-advantage outputs</text>
          <text x="725" y="237" textAnchor="middle" fill={FG} fontSize="11">Decrease prob of low-advantage outputs</text>

          {/* KL Penalty box */}
          <rect x="555" y="270" width="340" height="40" rx="8" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="1" />
          <text x="725" y="295" textAnchor="middle" fill={PURPLE} fontSize="11" fontWeight="600">+ KL Penalty: prevent drifting too far from reference policy</text>

          {/* Loop arrow back */}
          <path d="M 725 310 L 725 370 L 50 370 L 50 87 L 30 87" fill="none" stroke={E} strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#grpo-ar)" />
          <text x="400" y="388" textAnchor="middle" fill={E2} fontSize="11" fontWeight="600">Repeat for next batch of questions</text>

          {/* PPO vs GRPO comparison callout */}
          <rect x="30" y="160" width="480" height="100" rx="10" fill="#1a1a2e" stroke="#334155" strokeWidth="1" />
          <text x="270" y="182" textAnchor="middle" fill={FG} fontSize="12" fontWeight="700">Why not PPO?</text>
          <text x="270" y="200" textAnchor="middle" fill={RED} fontSize="11">PPO: needs critic network (another 671B model in memory)</text>
          <text x="270" y="218" textAnchor="middle" fill={E} fontSize="11">GRPO: no critic — advantages from group comparisons</text>
          <text x="270" y="236" textAnchor="middle" fill={GRAY} fontSize="10">Memory savings: ~50% vs PPO at 671B scale</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="GRPO Objective — Building Up Step by Step"
        color={E}
        steps={[
          {
            note: 'For each question q, sample a group of G complete outputs from the current policy (the old policy before this update step). Each output o_i is a full chain-of-thought + answer.',
            math: '\\{o_1, o_2, \\ldots, o_G\\} \\sim \\pi_{\\theta_{\\text{old}}}(\\cdot \\mid q)',
          },
          {
            note: 'Score each output with the reward model. For math problems this is binary (correct=1, wrong=0). For code, it runs test cases. The reward captures WHAT we want but not HOW to get there.',
            math: 'r_i = R(q, o_i) \\quad \\text{for } i = 1, \\ldots, G',
          },
          {
            note: 'Compute the advantage of each output relative to the group. This is the key GRPO innovation: instead of a learned value function, we normalize rewards within the group. An output above the group mean gets positive advantage.',
            math: '\\hat{A}_i = \\frac{r_i - \\text{mean}(\\{r_1, \\ldots, r_G\\})}{\\text{std}(\\{r_1, \\ldots, r_G\\})}',
          },
          {
            note: 'The full GRPO objective: maximize the clipped surrogate weighted by advantages, minus a KL penalty that prevents the policy from diverging too far from a reference policy. The clipping (epsilon) ensures stable updates.',
            math: '\\mathcal{J}_{\\text{GRPO}} = \\mathbb{E}_{q} \\left[ \\frac{1}{G} \\sum_{i=1}^{G} \\min\\!\\left( \\frac{\\pi_\\theta(o_i \\mid q)}{\\pi_{\\theta_{\\text{old}}}(o_i \\mid q)} \\hat{A}_i,\\; \\text{clip}(\\cdot, 1\\!-\\!\\epsilon, 1\\!+\\!\\epsilon)\\, \\hat{A}_i \\right) - \\beta\\, D_{\\text{KL}}(\\pi_\\theta \\| \\pi_{\\text{ref}}) \\right]',
          },
        ]}
        symbols={[
          { symbol: 'G = 64', meaning: 'Group size — number of outputs sampled per question' },
          { symbol: '\\hat{A}_i', meaning: 'Normalized advantage — how much better output i is vs the group average' },
          { symbol: '\\epsilon', meaning: 'Clipping parameter — limits how much the policy can change per step (stability)' },
          { symbol: '\\beta', meaning: 'KL penalty coefficient — controls deviation from reference policy' },
          { symbol: '\\pi_{\\text{ref}}', meaning: 'Reference policy — the initial model, prevents catastrophic drift' },
        ]}
      />

      <SimpleExplain>
        <p><strong>GRPO in everyday terms:</strong> Imagine a student taking 64 different approaches to the same exam question. Some approaches get the right answer, some don't. The teacher doesn't show the "correct" method — they just say "these 30 approaches worked, these 34 didn't." The student learns to do more of what worked and less of what didn't, discovering their OWN problem-solving strategies. The "group relative" part means the student judges quality by comparing approaches against each other, not against some external standard.</p>
      </SimpleExplain>

      <MentalModel
        title="Tournament Selection Without a Judge"
        analogy="PPO is like a boxing tournament with a panel of judges (the critic) who score each punch. GRPO is like a round-robin tournament where fighters are ranked by who beats whom — no judges needed. The 'advantage' is simply: did this fighter win more or fewer matches than average? This is cheaper (no judges to pay) and surprisingly effective, because relative rankings are often more reliable than absolute scores."
        technical="Formally, GRPO replaces the learned value baseline V(s) in the PPO advantage estimate A(s,a) = R - V(s) with the empirical group mean. This eliminates the need to train a critic network, saving ~50% memory and removing a source of approximation error. The tradeoff is higher variance in advantage estimates, which is mitigated by the large group size G=64."
        color={E}
      />

      <Callout type="math">
        The KL penalty term is crucial. Without it, RL can cause <em>reward hacking</em> — the model
        finds degenerate outputs that score high on the reward function but are actually nonsensical.
        By penalizing divergence from the reference policy, GRPO ensures the model stays "sane" while
        optimizing for correctness.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — R1-ZERO: RL FROM SCRATCH
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="R1-Zero — Pure RL, Zero Supervision"
        subtitle="Starting from a base LLM, reasoning emerges from reward alone"
        color={E}
      />

      <Prose>
        <p>
          R1-Zero is the most striking result in the paper. Take <H tip="DeepSeek-V3-Base = the pre-trained language model before any instruction tuning or alignment. It can predict the next token well but doesn't know how to follow instructions, reason step by step, or format answers. It's a 671B MoE model (37B active) trained on 14.8T tokens." color={E}>DeepSeek-V3-Base</H> — a
          model that has never seen a single chain-of-thought example — and train it <em>only</em> with
          GRPO. The reward is minimal: a <H tip="Rule-based reward = a simple programmatic check rather than a neural network. For math: parse the final answer and compare to ground truth (r=1 if correct, r=0 if wrong). For code: run test cases. No learned reward model needed for these domains. This makes the training signal essentially free." color={E}>rule-based reward</H> that
          checks whether the final answer is correct, plus a <H tip="Format reward = a small bonus for following a specific output structure. R1-Zero uses a template: reasoning goes inside <think>...</think> tags, final answer goes inside <answer>...</answer> tags. This mild formatting constraint helps separate the 'thinking' from the 'answering,' making outputs parseable." color={E2}>format reward</H> for
          structuring output with <code>&lt;think&gt;</code> and <code>&lt;answer&gt;</code> tags.
        </p>
        <p>
          No <H tip="Supervised fine-tuning warmup = a common practice where RL is preceded by SFT to give the model a 'head start' on the desired format and behavior. Without SFT, the model starts from random babbling and must discover structure entirely through RL. Most researchers assumed this was necessary for RL to work at all." color={RED}>SFT warmup</H>.
          No <H tip="Human demonstrations = expert-written examples of step-by-step problem solving. Example: a mathematician writing out their solution to a competition problem, showing each step and justification. These serve as 'gold standard' training targets for SFT." color={GRAY}>human demonstrations</H>.
          No <H tip="Reward model training on human preferences = the standard RLHF pipeline where humans compare model outputs and their preferences are used to train a neural reward model. This is expensive (requires thousands of comparisons) and introduces the reward model as a potential source of bias. R1-Zero uses NO learned reward model for math/code." color={GRAY}>learned reward model</H>.
          Just a base model, a correctness checker, and GRPO. What happened over the course of training
          was remarkable.
        </p>
      </Prose>

      {/* ── Emergence of Reasoning SVG ── */}
      <Diagram caption={<><strong>Reasoning Emerges from RL</strong> — Over training steps, R1-Zero spontaneously develops increasingly sophisticated reasoning behaviors. No human examples provided.</>}>
        <svg viewBox="0 0 860 440" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="emrg-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f18" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
            <linearGradient id="emrg-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={E3} />
              <stop offset="50%" stopColor={E} />
              <stop offset="100%" stopColor={E2} />
            </linearGradient>
            <marker id="emrg-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GRAY} />
            </marker>
          </defs>

          <rect width="860" height="440" rx="12" fill="url(#emrg-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={E} fontSize="14" fontWeight="700" letterSpacing="1.5">EMERGENCE OF REASONING — R1-ZERO TRAINING TIMELINE</text>

          {/* Axes */}
          <line x1="80" y1="350" x2="810" y2="350" stroke={GRAY} strokeWidth="1.5" markerEnd="url(#emrg-ar)" />
          <line x1="80" y1="350" x2="80" y2="50" stroke={GRAY} strokeWidth="1.5" markerEnd="url(#emrg-ar)" />
          <text x="445" y="390" textAnchor="middle" fill={GRAY} fontSize="11">Training Steps</text>
          <text x="40" y="200" textAnchor="middle" fill={GRAY} fontSize="11" transform="rotate(-90 40 200)">Reasoning Quality</text>

          {/* X-axis labels */}
          {['0', '1K', '5K', '10K', '20K', '50K'].map((label, i) => {
            const x = 80 + i * 146;
            return (
              <g key={`xl-${i}`}>
                <line x1={x} y1="350" x2={x} y2="355" stroke={GRAY} strokeWidth="1" />
                <text x={x} y="370" textAnchor="middle" fill={GRAY} fontSize="10">{label}</text>
              </g>
            );
          })}

          {/* Rising curve */}
          <path
            d="M 80 340 C 120 338 160 330 226 300 S 372 200 445 160 S 580 100 660 85 S 740 78 810 75"
            fill="none"
            stroke="url(#emrg-line)"
            strokeWidth="3"
          />

          {/* Milestone markers on curve */}
          {/* Phase 1: Babbling */}
          <circle cx="120" cy="336" r="6" fill={RED} stroke={RED} strokeWidth="2" />
          <rect x="105" y="260" width="130" height="48" rx="6" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="1" />
          <text x="170" y="278" textAnchor="middle" fill={RED} fontSize="10" fontWeight="700">Phase 1: Babbling</text>
          <text x="170" y="295" textAnchor="middle" fill={GRAY} fontSize="9">Random text, no structure</text>
          <line x1="120" y1="308" x2="120" y2="330" stroke={RED} strokeWidth="1" strokeDasharray="3 2" />

          {/* Phase 2: Basic CoT */}
          <circle cx="300" cy="268" r="6" fill={AMBER} stroke={AMBER} strokeWidth="2" />
          <rect x="255" y="195" width="140" height="48" rx="6" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="1" />
          <text x="325" y="213" textAnchor="middle" fill={AMBER} fontSize="10" fontWeight="700">Phase 2: Basic Steps</text>
          <text x="325" y="230" textAnchor="middle" fill={GRAY} fontSize="9">Simple step-by-step attempts</text>
          <line x1="300" y1="243" x2="300" y2="262" stroke={AMBER} strokeWidth="1" strokeDasharray="3 2" />

          {/* Phase 3: Self-Verification */}
          <circle cx="480" cy="148" r="6" fill={CYAN} stroke={CYAN} strokeWidth="2" />
          <rect x="405" y="58" width="150" height="62" rx="6" fill={CYAN} fillOpacity="0.12" stroke={CYAN} strokeWidth="1" />
          <text x="480" y="76" textAnchor="middle" fill={CYAN} fontSize="10" fontWeight="700">Phase 3: Self-Verify</text>
          <text x="480" y="92" textAnchor="middle" fill={GRAY} fontSize="9">"Let me check this..."</text>
          <text x="480" y="106" textAnchor="middle" fill={GRAY} fontSize="9">Re-examines own steps</text>
          <line x1="480" y1="120" x2="480" y2="142" stroke={CYAN} strokeWidth="1" strokeDasharray="3 2" />

          {/* Phase 4: Reflection + Aha Moments */}
          <circle cx="700" cy="80" r="6" fill={E2} stroke={E2} strokeWidth="2" />
          <rect x="615" y="100" width="170" height="62" rx="6" fill={E} fillOpacity="0.15" stroke={E} strokeWidth="1.5" />
          <text x="700" y="118" textAnchor="middle" fill={E2} fontSize="10" fontWeight="700">Phase 4: Reflection</text>
          <text x="700" y="134" textAnchor="middle" fill={GRAY} fontSize="9">"Wait, that's wrong..."</text>
          <text x="700" y="148" textAnchor="middle" fill={AMBER} fontSize="9" fontWeight="600">"Aha moments" emerge</text>
          <line x1="700" y1="100" x2="700" y2="86" stroke={E} strokeWidth="1" strokeDasharray="3 2" />

          {/* Response length annotation */}
          <rect x="580" y="350" width="230" height="48" rx="8" fill="#1a2e26" stroke={E3} strokeWidth="1" />
          <text x="695" y="368" textAnchor="middle" fill={E2} fontSize="10" fontWeight="700">Response length also grows</text>
          <text x="695" y="384" textAnchor="middle" fill={GRAY} fontSize="9">Model learns to "think longer" on harder problems</text>

          {/* Key insight box */}
          <rect x="80" y="405" width="730" height="28" rx="8" fill={E} fillOpacity="0.10" stroke={E} strokeWidth="1" />
          <text x="445" y="424" textAnchor="middle" fill={E2} fontSize="11" fontWeight="600">No human chain-of-thought examples were provided at any stage. All behaviors emerged from RL alone.</text>
        </svg>
      </Diagram>

      <StepFlow
        color={E}
        steps={[
          {
            title: 'Phase 1 — Incoherent Babbling',
            desc: 'The base model has no concept of structured reasoning. Early outputs are unstructured text that rarely produces correct answers. Reward signal is sparse (almost everything scores 0).',
          },
          {
            title: 'Phase 2 — Basic Chain-of-Thought',
            desc: 'The model discovers that breaking problems into steps increases accuracy. It starts writing "Step 1: ..., Step 2: ..." patterns — not because it was taught to, but because outputs with steps get rewarded more often.',
          },
          {
            title: 'Phase 3 — Self-Verification',
            desc: 'The model learns to check its own work. Outputs start containing phrases like "Let me verify this by substituting back..." This behavior doubles accuracy on multi-step math problems.',
          },
          {
            title: 'Phase 4 — Reflection & "Aha Moments"',
            desc: 'The model begins explicitly reconsidering approaches: "Wait, this can\'t be right because..." and "Hmm, I should try a different method." These metacognitive behaviors emerge entirely from RL pressure.',
          },
        ]}
      />

      <VisualCompare
        leftLabel="Early Training (Step 1K)"
        rightLabel="Late Training (Step 50K)"
        leftColor={RED}
        rightColor={E}
        left={
          <div>
            <p><strong>Q: What is 17 x 23?</strong></p>
            <p style={{fontFamily:'var(--font-mono)', fontSize:12, opacity:0.8}}>
              {'<think>'}17 times 23 is... 17 x 20 = 340, plus 17 x 3 = 51, so the answer is 401.{'</think>'}
            </p>
            <p style={{fontFamily:'var(--font-mono)', fontSize:12, opacity:0.8}}>
              {'<answer>'}401{'</answer>'}
            </p>
            <p style={{color:RED, fontSize:12, fontWeight:700}}>Incorrect (391). No self-check.</p>
          </div>
        }
        right={
          <div>
            <p><strong>Q: What is 17 x 23?</strong></p>
            <p style={{fontFamily:'var(--font-mono)', fontSize:12, opacity:0.8}}>
              {'<think>'}Let me break this down. 17 x 23 = 17 x 20 + 17 x 3 = 340 + 51 = 391. Let me verify: 23 x 17 = 23 x 10 + 23 x 7 = 230 + 161 = 391. Both match.{'</think>'}
            </p>
            <p style={{fontFamily:'var(--font-mono)', fontSize:12, opacity:0.8}}>
              {'<answer>'}391{'</answer>'}
            </p>
            <p style={{color:E, fontSize:12, fontWeight:700}}>Correct. Self-verification emerged.</p>
          </div>
        }
        caption="Actual R1-Zero behavior: self-verification and reflection emerge without being explicitly trained"
      />

      <Callout type="insight">
        The most famous finding from R1-Zero: <strong>"aha moments"</strong> appeared during training.
        The model would produce outputs like <em>"Wait wait wait. Let me reconsider. I think I made an
        error in step 3..."</em> — genuine self-correction that was never demonstrated in any training
        data. This suggests that the capacity for metacognition may be latent in base LLMs, waiting to
        be unlocked by the right optimization pressure.
      </Callout>

      <ConceptCard title="The R1-Zero Reward Function" color={E} defaultOpen={true}>
        <Prose>
          <p>
            R1-Zero's reward is strikingly simple — just two components:
          </p>
          <p>
            <strong>1. Accuracy Reward.</strong> For math: parse the final answer from the <code>&lt;answer&gt;</code> tag,
            compare to ground truth. <H tip="Binary reward = r=1 if correct, r=0 if wrong. No partial credit. This is the simplest possible reward signal, yet it's sufficient for R1-Zero to learn sophisticated reasoning. The 'coarseness' of the signal forces the model to discover its own intermediate evaluation strategies." color={E}>r = 1 if correct, 0 if wrong</H>.
            For code: run <H tip="Test case execution = running the model's generated code against predefined inputs and checking if outputs match expected values. Multiple test cases are used, and the reward is the fraction of tests passed. This provides a more granular signal than math (partial credit for partially correct code)." color={BLUE}>test cases</H>.
            No partial credit for math — the model must discover on its own that showing work increases
            its chance of arriving at the right answer.
          </p>
          <p>
            <strong>2. Format Reward.</strong> A small reward for using the <code>&lt;think&gt;...&lt;/think&gt;</code> and
            <code>&lt;answer&gt;...&lt;/answer&gt;</code> template. This is the <em>only</em> structural
            guidance — and it was added just to make outputs parseable, not to teach reasoning.
          </p>
        </Prose>

        <FormulaBlock
          math="R(q, o) = R_{\text{accuracy}}(q, o) + R_{\text{format}}(o)"
          label="R1-Zero Reward"
          color={E}
          symbols={[
            { symbol: 'R_{accuracy}', meaning: '1 if final answer matches ground truth, 0 otherwise (math); fraction of tests passed (code)' },
            { symbol: 'R_{format}', meaning: 'Small bonus for using <think>/<answer> tags correctly' },
          ]}
        />
      </ConceptCard>

      <MentalModel
        title="Learning to Think by Trial and Error"
        analogy="Imagine learning chess with no instruction books. Someone just tells you after each game: 'you won' or 'you lost.' Over thousands of games, you'd start developing opening strategies, learning to think several moves ahead, and eventually recognizing when a position is losing before it's too late. You'd essentially reinvent strategic thinking from scratch. That's R1-Zero: no chess book (SFT), just wins and losses (reward), and strategy (chain-of-thought) emerges."
        technical="The emergence of reasoning in R1-Zero suggests that chain-of-thought is a natural 'attractor' in the optimization landscape when the training signal rewards correctness. The base model's pre-training on text containing logical arguments and mathematical proofs provides latent capacity for structured reasoning — RL simply activates and reinforces this latent capacity."
        color={E}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — R1: ADDING STABILITY
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="From R1-Zero to R1 — Adding Stability"
        subtitle="Cold-start data and multi-stage training fix R1-Zero's rough edges"
        color={E}
      />

      <Prose>
        <p>
          R1-Zero was a stunning proof of concept, but it had practical issues. Its outputs suffered
          from <H tip="Language mixing = the model switching between languages mid-response (e.g., starting in English, then switching to Chinese or vice versa). This happens because the base model was trained on multilingual data and RL doesn't explicitly constrain language consistency." color={RED}>language mixing</H> (switching
          between Chinese and English mid-sentence), <H tip="Readability problems = poorly formatted reasoning with run-on sentences, inconsistent notation, and unclear step boundaries. While the reasoning was mathematically valid, it was hard for humans to follow. SFT data is needed to teach the model to present reasoning clearly." color={RED}>poor readability</H>, and
          occasional <H tip="Infinite repetition loops = the model getting stuck repeating the same phrase or reasoning step indefinitely. This is a known failure mode of RL-trained models — the policy finds a local optimum where repeating text maintains some reward signal without progressing toward an answer." color={RED}>repetition loops</H>.
          The <em>reasoning</em> was there, but the <em>presentation</em> was rough.
        </p>
        <p>
          DeepSeek-R1 addresses these issues with a carefully designed <H tip="Multi-stage training pipeline = training in multiple sequential phases, each building on the previous. R1 uses 4 stages: (1) cold-start SFT, (2) reasoning-focused RL, (3) rejection sampling + SFT on diverse data, (4) final RL for alignment. Each stage adds capabilities while preserving what previous stages taught." color={E}>multi-stage training pipeline</H>.
          The key innovation is <H tip="Cold-start data = a small, curated dataset of high-quality chain-of-thought examples used to initialize the model before RL. Unlike traditional SFT which uses thousands of examples, cold-start uses only a few thousand carefully designed examples. Purpose: teach basic format and readability, not reasoning itself." color={E2}>cold-start data</H> — a
          small set of carefully curated reasoning examples that teach the model <em>how to present</em>{' '}
          reasoning clearly, without constraining <em>what</em> reasoning strategies it develops.
        </p>
      </Prose>

      {/* ── R1 Multi-Stage Pipeline SVG ── */}
      <Diagram caption={<><strong>R1 Multi-Stage Training Pipeline</strong> — Four stages transform DeepSeek-V3-Base into R1, combining the best of SFT and RL.</>}>
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="pipe-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f18" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
            <marker id="pipe-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={E} />
            </marker>
            <marker id="pipe-ar-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={BLUE} />
            </marker>
            <marker id="pipe-ar-p" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={PURPLE} />
            </marker>
          </defs>

          <rect width="860" height="380" rx="12" fill="url(#pipe-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={E} fontSize="14" fontWeight="700" letterSpacing="1.5">R1 MULTI-STAGE TRAINING PIPELINE</text>

          {/* Stage 1: Cold-Start SFT */}
          <rect x="20" y="55" width="185" height="110" rx="10" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="2" />
          <text x="112" y="78" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700">Stage 1</text>
          <text x="112" y="96" textAnchor="middle" fill={FG} fontSize="11" fontWeight="600">Cold-Start SFT</text>
          <text x="112" y="115" textAnchor="middle" fill={GRAY} fontSize="9">~thousands of curated</text>
          <text x="112" y="128" textAnchor="middle" fill={GRAY} fontSize="9">CoT examples</text>
          <text x="112" y="148" textAnchor="middle" fill={BLUE} fontSize="9" fontWeight="600">Teaches: format & readability</text>

          {/* Arrow 1→2 */}
          <line x1="205" y1="110" x2="230" y2="110" stroke={E} strokeWidth="2" markerEnd="url(#pipe-ar)" />

          {/* Stage 2: Reasoning RL */}
          <rect x="235" y="55" width="185" height="110" rx="10" fill={E} fillOpacity="0.18" stroke={E} strokeWidth="2" />
          <text x="327" y="78" textAnchor="middle" fill={E} fontSize="12" fontWeight="700">Stage 2</text>
          <text x="327" y="96" textAnchor="middle" fill={FG} fontSize="11" fontWeight="600">Reasoning-Focused RL</text>
          <text x="327" y="115" textAnchor="middle" fill={GRAY} fontSize="9">GRPO on math, code,</text>
          <text x="327" y="128" textAnchor="middle" fill={GRAY} fontSize="9">science, logic</text>
          <text x="327" y="148" textAnchor="middle" fill={E2} fontSize="9" fontWeight="600">Teaches: actual reasoning</text>

          {/* Arrow 2→3 */}
          <line x1="420" y1="110" x2="445" y2="110" stroke={E} strokeWidth="2" markerEnd="url(#pipe-ar)" />

          {/* Stage 3: Rejection Sampling + SFT */}
          <rect x="450" y="55" width="185" height="110" rx="10" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="2" />
          <text x="542" y="78" textAnchor="middle" fill={PURPLE} fontSize="12" fontWeight="700">Stage 3</text>
          <text x="542" y="96" textAnchor="middle" fill={FG} fontSize="11" fontWeight="600">Rejection Sampling + SFT</text>
          <text x="542" y="115" textAnchor="middle" fill={GRAY} fontSize="9">~800K samples: reasoning</text>
          <text x="542" y="128" textAnchor="middle" fill={GRAY} fontSize="9">+ general data (writing, QA)</text>
          <text x="542" y="148" textAnchor="middle" fill={PURPLE} fontSize="9" fontWeight="600">Teaches: broad capabilities</text>

          {/* Arrow 3→4 */}
          <line x1="635" y1="110" x2="660" y2="110" stroke={E} strokeWidth="2" markerEnd="url(#pipe-ar)" />

          {/* Stage 4: Final RL */}
          <rect x="665" y="55" width="170" height="110" rx="10" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="2" />
          <text x="750" y="78" textAnchor="middle" fill={AMBER} fontSize="12" fontWeight="700">Stage 4</text>
          <text x="750" y="96" textAnchor="middle" fill={FG} fontSize="11" fontWeight="600">All-Scenario RL</text>
          <text x="750" y="115" textAnchor="middle" fill={GRAY} fontSize="9">Helpfulness + safety</text>
          <text x="750" y="128" textAnchor="middle" fill={GRAY} fontSize="9">rewards on all tasks</text>
          <text x="750" y="148" textAnchor="middle" fill={AMBER} fontSize="9" fontWeight="600">Teaches: alignment & safety</text>

          {/* What each stage fixes - bottom section */}
          <rect x="20" y="195" width="820" height="60" rx="10" fill="#0d1a14" stroke="#1a3a2a" strokeWidth="1" />
          <text x="430" y="215" textAnchor="middle" fill={FG} fontSize="12" fontWeight="700">What Each Stage Contributes</text>
          <text x="112" y="240" textAnchor="middle" fill={BLUE} fontSize="10">Stable format</text>
          <text x="327" y="240" textAnchor="middle" fill={E} fontSize="10">Deep reasoning</text>
          <text x="542" y="240" textAnchor="middle" fill={PURPLE} fontSize="10">General skills</text>
          <text x="750" y="240" textAnchor="middle" fill={AMBER} fontSize="10">Safety + helpfulness</text>

          {/* Comparison: R1-Zero vs R1 */}
          <rect x="20" y="275" width="400" height="90" rx="10" fill={RED} fillOpacity="0.06" stroke={RED} strokeWidth="1" />
          <text x="220" y="298" textAnchor="middle" fill={RED} fontSize="12" fontWeight="700">R1-Zero Issues (Pure RL)</text>
          <text x="220" y="318" textAnchor="middle" fill={GRAY} fontSize="10">Language mixing, repetition loops, poor readability</text>
          <text x="220" y="338" textAnchor="middle" fill={GRAY} fontSize="10">Works for math/code, but struggles with open-ended tasks</text>
          <text x="220" y="355" textAnchor="middle" fill={RED} fontSize="10" fontWeight="600">Brilliant reasoning, rough presentation</text>

          <rect x="440" y="275" width="400" height="90" rx="10" fill={E} fillOpacity="0.08" stroke={E} strokeWidth="1.5" />
          <text x="640" y="298" textAnchor="middle" fill={E} fontSize="12" fontWeight="700">R1 (Multi-Stage)</text>
          <text x="640" y="318" textAnchor="middle" fill={GRAY} fontSize="10">Clean formatting, consistent language, no repetition</text>
          <text x="640" y="338" textAnchor="middle" fill={GRAY} fontSize="10">Strong on reasoning + general tasks + safety</text>
          <text x="640" y="355" textAnchor="middle" fill={E2} fontSize="10" fontWeight="600">Best of both worlds: RL reasoning + SFT polish</text>
        </svg>
      </Diagram>

      <ConceptCard title="Cold-Start Data: Teaching Format, Not Reasoning" color={E2} defaultOpen={true}>
        <Prose>
          <p>
            The cold-start data is <em>not</em> a large-scale SFT dataset. It is a small, carefully
            curated collection (thousands, not millions) designed to teach one thing: <strong>how to
            present reasoning clearly</strong>. The data was collected by prompting a long-CoT model
            to solve problems and then having humans <H tip="Human refinement = expert annotators review and improve model-generated chain-of-thought reasoning. They fix formatting issues, add clearer step transitions, and remove irrelevant tangents — while preserving the logical structure. This teaches the model 'good form' without constraining reasoning strategies." color={E2}>refine the outputs</H> for
            readability.
          </p>
          <p>
            Key design principles for the cold-start data:
          </p>
          <p>
            <strong>1.</strong> Use <code>|special_token|</code> markers at the end of each reasoning step, allowing the
            model's reasoning process to be separated into human-readable segments.
          </p>
          <p>
            <strong>2.</strong> Include <H tip="Reflection and verification patterns = examples that show the model checking its work, reconsidering approaches, and recovering from errors. These are NOT teaching reasoning — they're teaching the model that it's OK (and useful) to say 'Wait, let me reconsider...' in its output format." color={E}>reflection and verification patterns</H> in
            the formatting, so the model learns that self-correction is a valid output pattern.
          </p>
          <p>
            <strong>3.</strong> Provide a <H tip="Readable summary = a concise restatement of the answer at the end of the reasoning chain. After a long chain-of-thought, the model summarizes the final answer clearly. This teaches the model to produce outputs that are useful for both parsing (by machines) and reading (by humans)." color={E}>readable summary</H> after
            the chain-of-thought reasoning, making outputs usable by both humans and automated parsers.
          </p>
        </Prose>
      </ConceptCard>

      <ConceptCard title="Rejection Sampling: Mining the Model's Own Best Work" color={PURPLE} defaultOpen={false}>
        <Prose>
          <p>
            Stage 3 uses a powerful technique: <H tip="Rejection sampling = generating many candidate outputs and keeping only the best ones. For math/code: generate 64 outputs, keep only the ones that get the right answer and have clear reasoning. For writing: use a reward model to score quality. This creates a high-quality training set from the model's own capabilities." color={PURPLE}>rejection sampling</H> from
            the Stage 2 checkpoint. The model generates many candidate answers for each question, and
            only the best outputs (correct answer + clear reasoning) are kept as SFT training data.
          </p>
          <p>
            This creates roughly <strong>800K high-quality samples</strong> covering both reasoning
            tasks (~600K: math, code, science, logic) and general tasks (~200K: writing, roleplay, QA,
            translation). The general tasks are included to prevent the model from losing broad
            capabilities while specializing in reasoning.
          </p>
        </Prose>
      </ConceptCard>

      <SimpleExplain>
        <p><strong>The four stages in everyday terms:</strong> Stage 1 is like teaching a child to write neatly — before they learn essay writing, they need legible handwriting. Stage 2 is the core education — math, science, logic — where they develop actual thinking skills through practice and feedback. Stage 3 is expanding the curriculum — adding English, history, art — so the child doesn't become a math savant who can't hold a conversation. Stage 4 is finishing school — teaching manners, ethics, and safety, so the child is not just smart but also helpful and responsible.</p>
      </SimpleExplain>

      <Callout type="key">
        The critical insight: cold-start SFT teaches <em>form</em>, RL teaches <em>substance</em>.
        R1-Zero proved that reasoning can emerge from RL alone. R1 adds just enough SFT to make the
        reasoning presentable, without constraining what reasoning strategies the model develops.
        The SFT data teaches "here's how to write a clear proof," not "here's how to solve this problem."
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — R1-ZERO vs R1 COMPARISON
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="R1-Zero vs R1 — Head-to-Head"
        subtitle="Pure RL vs multi-stage: when does each approach shine?"
        color={E}
      />

      {/* ── R1-Zero vs R1 Comparison SVG ── */}
      <Diagram caption={<><strong>R1-Zero vs R1</strong> — Performance comparison across benchmarks. R1's multi-stage pipeline consistently outperforms pure RL.</>}>
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="cmp-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f18" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>

          <rect width="860" height="380" rx="12" fill="url(#cmp-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={E} fontSize="14" fontWeight="700" letterSpacing="1.5">R1-ZERO VS R1 — BENCHMARK COMPARISON</text>

          {/* Benchmark bars */}
          {[
            { label: 'AIME 2024', zero: 71.0, r1: 79.8, max: 100 },
            { label: 'MATH-500', zero: 95.9, r1: 97.3, max: 100 },
            { label: 'Codeforces', zero: 1444, r1: 2029, max: 2500, unit: ' Elo' },
            { label: 'GPQA Diamond', zero: 58.7, r1: 71.5, max: 100 },
            { label: 'LiveCodeBench', zero: 52.1, r1: 65.9, max: 100 },
            { label: 'MMLU', zero: 84.8, r1: 90.8, max: 100 },
          ].map((b, i) => {
            const yBase = 55 + i * 52;
            const barWidth = 500;
            const zeroW = (b.zero / b.max) * barWidth;
            const r1W = (b.r1 / b.max) * barWidth;
            return (
              <g key={`bm-${i}`}>
                <text x="160" y={yBase + 16} textAnchor="end" fill={FG} fontSize="12" fontWeight="600">{b.label}</text>
                {/* R1-Zero bar */}
                <rect x="175" y={yBase} width={barWidth} height="14" rx="3" fill="#1a2e26" />
                <rect x="175" y={yBase} width={zeroW} height="14" rx="3" fill={AMBER} fillOpacity="0.6" />
                <text x={175 + zeroW + 6} y={yBase + 11} fill={AMBER} fontSize="10" fontWeight="700">{b.zero}{b.unit || '%'}</text>
                {/* R1 bar */}
                <rect x="175" y={yBase + 18} width={barWidth} height="14" rx="3" fill="#1a2e26" />
                <rect x="175" y={yBase + 18} width={r1W} height="14" rx="3" fill={E} fillOpacity="0.7" />
                <text x={175 + r1W + 6} y={yBase + 29} fill={E2} fontSize="10" fontWeight="700">{b.r1}{b.unit || '%'}</text>
              </g>
            );
          })}

          {/* Legend */}
          <rect x="580" y="340" width="260" height="30" rx="8" fill="#0d1a14" stroke="#1a3a2a" strokeWidth="1" />
          <rect x="600" y="350" width="30" height="10" rx="2" fill={AMBER} fillOpacity="0.6" />
          <text x="637" y="359" fill={AMBER} fontSize="10" fontWeight="600">R1-Zero (pure RL)</text>
          <rect x="730" y="350" width="30" height="10" rx="2" fill={E} fillOpacity="0.7" />
          <text x="767" y="359" fill={E2} fontSize="10" fontWeight="600">R1 (multi-stage)</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Aspect', 'R1-Zero', 'R1']}
        rows={[
          ['Training', 'Pure RL (GRPO only)', '4-stage: Cold-Start SFT + RL + Rejection SFT + RL'],
          ['SFT Data', 'None (zero examples)', '~thousands cold-start + ~800K rejection-sampled'],
          ['Reasoning', 'Emerges spontaneously', 'Emerges from RL + stabilized by SFT format'],
          ['AIME 2024', '71.0% (pass@1)', '79.8% (pass@1) — matches OpenAI o1'],
          ['Readability', 'Poor (language mixing, repetition)', 'Clean, well-formatted, consistent'],
          ['General Tasks', 'Weak (only trained on reasoning)', 'Strong (rejection sampling covers diverse tasks)'],
          ['Safety', 'Not aligned', 'Aligned via Stage 4 RL with safety rewards'],
          ['Key Insight', 'Reasoning CAN emerge from RL alone', 'RL + minimal SFT = practical frontier model'],
        ]}
        caption="R1-Zero is the scientific discovery; R1 is the engineering product that makes it practical"
      />

      <VisualCompare
        leftLabel="R1-Zero (Pure RL)"
        rightLabel="R1 (Multi-Stage)"
        leftColor={AMBER}
        rightColor={E}
        left={
          <div>
            <p><strong>Strengths:</strong> Proves reasoning emerges from RL alone. No human annotation needed. Remarkable "aha moments."</p>
            <p><strong>Weaknesses:</strong> Language mixing (EN/ZH), repetition loops, poor formatting. Struggles with non-reasoning tasks. Not safe for deployment.</p>
          </div>
        }
        right={
          <div>
            <p><strong>Strengths:</strong> Frontier-level reasoning + clean output. Handles reasoning AND general tasks. Safety-aligned. Open weights.</p>
            <p><strong>Weaknesses:</strong> Requires cold-start data curation (small cost). 4-stage pipeline is more complex to reproduce.</p>
          </div>
        }
        caption="R1-Zero is the proof of concept; R1 is what you actually deploy"
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — DISTILLATION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Distillation — From 671B to 1.5B"
        subtitle="Transferring reasoning capabilities to models anyone can run"
        color={E}
      />

      <Prose>
        <p>
          A 671B parameter model is impressive but impractical for most users. DeepSeek's answer:
          <H tip="Knowledge distillation = training a smaller 'student' model to mimic a larger 'teacher' model. The student learns from the teacher's outputs rather than from raw data. This transfers capabilities that might take the student much longer to develop independently. For R1, the student learns the teacher's reasoning PATTERNS, not just its answers." color={E}>distill</H> R1's
          reasoning capabilities into much smaller models. They fine-tuned open-source models ranging
          from <H tip="Qwen2.5 = Alibaba's open-source LLM series. R1 was distilled into Qwen2.5-1.5B, 7B, 14B, and 32B variants. These are dense (not MoE) models, making them simpler to deploy. The 1.5B variant can run on a phone." color={CYAN}>Qwen2.5</H> (1.5B
          to 32B) and <H tip="Llama 3 = Meta's open-source LLM. R1 was distilled into Llama-3.1-8B and Llama-3.3-70B variants. The 8B model achieves 52.5% on AIME — comparable to models 10x its size before R1's distillation technique." color={BLUE}>Llama 3</H> (8B to 70B) on
          approximately 800K samples of R1's chain-of-thought outputs.
        </p>
        <p>
          The key finding: <strong>distillation dramatically outperforms applying RL directly to small
          models</strong>. A Qwen2.5-7B model distilled from R1 achieves <H tip="AIME performance of distilled models: Qwen-7B distilled from R1 achieves 55.5% on AIME 2024, while Qwen-7B trained with RL directly achieves only ~25-30%. The teacher's reasoning traces provide a much richer learning signal than binary correctness rewards alone." color={E}>55.5% on AIME</H> — far
          better than the same 7B model trained with RL from scratch. The teacher's detailed reasoning
          traces provide a much richer <H tip="Learning signal = the information available to guide model improvement. Binary reward ('correct/incorrect') is a weak signal — the model must figure everything out on its own. Full chain-of-thought traces are a rich signal — the model sees exactly HOW to reason, step by step. This is why distillation is so effective." color={E2}>learning signal</H> than
          binary correctness rewards.
        </p>
      </Prose>

      {/* ── Distillation Pipeline SVG ── */}
      <Diagram caption={<><strong>R1 Distillation Pipeline</strong> — The 671B R1 teacher generates reasoning traces, which are used to fine-tune smaller student models across two model families.</>}>
        <svg viewBox="0 0 860 480" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="dist-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f18" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
            <linearGradient id="dist-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={E} stopOpacity="0.3" />
              <stop offset="100%" stopColor={E} stopOpacity="0.05" />
            </linearGradient>
            <filter id="dist-shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={E} floodOpacity="0.3" />
            </filter>
            <marker id="dist-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={E2} />
            </marker>
          </defs>

          <rect width="860" height="480" rx="12" fill="url(#dist-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={E} fontSize="14" fontWeight="700" letterSpacing="1.5">REASONING DISTILLATION — 671B TO 1.5B</text>

          {/* Teacher: R1 671B */}
          <rect x="310" y="50" width="240" height="70" rx="14" fill="url(#dist-glow)" stroke={E} strokeWidth="2.5" filter="url(#dist-shadow)" />
          <text x="430" y="78" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800">DeepSeek-R1 (671B)</text>
          <text x="430" y="98" textAnchor="middle" fill={E2} fontSize="11" fontWeight="600">MoE: 37B active | Teacher Model</text>
          <text x="430" y="112" textAnchor="middle" fill={E2} fontSize="10">100% reference performance</text>

          {/* Generates traces */}
          <line x1="430" y1="120" x2="430" y2="155" stroke={E2} strokeWidth="2" />
          <rect x="330" y="155" width="200" height="32" rx="6" fill={E} fillOpacity="0.15" stroke={E} strokeWidth="1" />
          <text x="430" y="176" textAnchor="middle" fill={E2} fontSize="11" fontWeight="600">~800K reasoning traces</text>

          {/* Distribution bar */}
          <line x1="430" y1="187" x2="430" y2="210" stroke={E2} strokeWidth="2" />
          <line x1="80" y1="210" x2="780" y2="210" stroke={E2} strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Qwen family (left) */}
          <text x="250" y="235" textAnchor="middle" fill={CYAN} fontSize="12" fontWeight="700" letterSpacing="1">QWEN 2.5 FAMILY</text>

          {/* Branch lines */}
          {[80, 200, 320, 440].map((x, i) => (
            <line key={`qb-${i}`} x1={x} y1="210" x2={x} y2="252" stroke={E2} strokeWidth="1.5" markerEnd="url(#dist-ar)" />
          ))}

          {/* Qwen models */}
          {[
            { x: 30, label: '1.5B', aime: '28.9%', perf: 0.36 },
            { x: 150, label: '7B', aime: '55.5%', perf: 0.69 },
            { x: 270, label: '14B', aime: '69.7%', perf: 0.87 },
            { x: 390, label: '32B', aime: '72.6%', perf: 0.91 },
          ].map((m, i) => (
            <g key={`qm-${i}`}>
              <rect x={m.x} y={255} width="100" height="50" rx="8" fill={CYAN} fillOpacity={0.08 + i * 0.04} stroke={CYAN} strokeWidth="1.5" />
              <text x={m.x + 50} y={275} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Qwen {m.label}</text>
              <text x={m.x + 50} y={293} textAnchor="middle" fill={GRAY} fontSize="10">AIME: {m.aime}</text>
              {/* Performance bar */}
              <rect x={m.x + 5} y={315} width="90" height="8" rx="4" fill="#1a2e26" />
              <rect x={m.x + 5} y={315} width={90 * m.perf} height="8" rx="4" fill={CYAN} />
            </g>
          ))}

          {/* Llama family (right) */}
          <text x="660" y="235" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700" letterSpacing="1">LLAMA 3 FAMILY</text>

          {[590, 730].map((x, i) => (
            <line key={`lb-${i}`} x1={x} y1="210" x2={x} y2="252" stroke={E2} strokeWidth="1.5" markerEnd="url(#dist-ar)" />
          ))}

          {[
            { x: 540, label: '8B', aime: '52.5%', perf: 0.66 },
            { x: 680, label: '70B', aime: '70.0%', perf: 0.88 },
          ].map((m, i) => (
            <g key={`lm-${i}`}>
              <rect x={m.x} y={255} width="100" height="50" rx="8" fill={BLUE} fillOpacity={0.08 + i * 0.06} stroke={BLUE} strokeWidth="1.5" />
              <text x={m.x + 50} y={275} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Llama {m.label}</text>
              <text x={m.x + 50} y={293} textAnchor="middle" fill={GRAY} fontSize="10">AIME: {m.aime}</text>
              <rect x={m.x + 5} y={315} width="90" height="8" rx="4" fill="#1a2e26" />
              <rect x={m.x + 5} y={315} width={90 * m.perf} height="8" rx="4" fill={BLUE} />
            </g>
          ))}

          {/* Key insight */}
          <rect x="80" y="350" width="700" height="50" rx="10" fill={E} fillOpacity="0.08" stroke={E} strokeWidth="1.5" />
          <text x="430" y="372" textAnchor="middle" fill={E2} fontSize="12" fontWeight="700">Key finding: Distillation beats RL on small models</text>
          <text x="430" y="390" textAnchor="middle" fill={GRAY} fontSize="10">Qwen-7B distilled from R1 outperforms Qwen-7B with direct RL by ~25% on AIME</text>

          {/* Size comparison */}
          <rect x="80" y="415" width="700" height="48" rx="10" fill="#1a1a2e" stroke="#334155" strokeWidth="1" />
          <text x="430" y="435" textAnchor="middle" fill={FG} fontSize="11" fontWeight="600">Compression: 671B → 32B (21x) → 14B (48x) → 7B (96x) → 1.5B (447x smaller)</text>
          <text x="430" y="453" textAnchor="middle" fill={GRAY} fontSize="10">1.5B model runs on a smartphone. 7B model runs on a single consumer GPU.</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Model', 'Size', 'AIME 2024', 'MATH-500', 'Key Takeaway']}
        rows={[
          ['DeepSeek-R1', '671B (37B active)', '79.8%', '97.3%', 'Full frontier reasoning model'],
          ['R1-Distill-Qwen-32B', '32B', '72.6%', '94.3%', 'Near-R1 quality, runs on 1 GPU'],
          ['R1-Distill-Qwen-14B', '14B', '69.7%', '93.9%', 'Beats many 70B models'],
          ['R1-Distill-Llama-70B', '70B', '70.0%', '94.5%', 'Best open-source Llama variant'],
          ['R1-Distill-Qwen-7B', '7B', '55.5%', '92.8%', 'Consumer GPU, strong reasoning'],
          ['R1-Distill-Llama-8B', '8B', '52.5%', '89.1%', 'Llama ecosystem compatibility'],
          ['R1-Distill-Qwen-1.5B', '1.5B', '28.9%', '83.9%', 'Runs on a phone'],
        ]}
        caption="The 32B distilled model retains ~91% of R1's AIME performance at 21x smaller size"
      />

      <SimpleExplain>
        <p><strong>Distillation in everyday terms:</strong> R1 is like a brilliant professor who writes out detailed solutions to thousands of problems. The distilled models are students who study the professor's solution notebooks. A PhD student (32B) learns almost everything. A college student (7B) learns the key techniques. Even a high schooler (1.5B) picks up useful problem-solving skills. Crucially, studying the professor's detailed work (distillation) is FAR more effective than trying to learn from scratch with just right/wrong feedback (RL on small models).</p>
      </SimpleExplain>

      <Callout type="insight">
        Why does distillation beat direct RL on small models? Small models lack the capacity to
        independently discover sophisticated reasoning strategies through trial and error. But they
        CAN learn to <em>imitate</em> those strategies when shown explicit examples. The teacher's
        chain-of-thought traces encode millions of implicit "tricks" — <H tip="Search strategy = the approach used to explore the solution space. R1 learned to try multiple approaches, backtrack from dead ends, and allocate more thought to harder sub-problems. These strategies are implicit in its output traces — the student model absorbs them through distillation." color={E}>search strategies</H>,
        <H tip="Error recovery patterns = the model recognizing and correcting its own mistakes mid-solution. R1's traces contain many instances of 'Wait, that's wrong because...' followed by a correction. Distilled models learn to recognize these patterns, even if they can't independently discover them." color={E}>error recovery patterns</H>,
        <H tip="Problem decomposition = breaking a complex problem into simpler sub-problems. R1 learned this through RL, but the distilled models learn it by seeing thousands of examples of how R1 decomposes problems. The pattern 'First, let's handle X. Then Y. Finally Z.' is absorbed through imitation." color={E2}>problem decomposition</H> —
        that would take a small model an impractical amount of RL to rediscover independently.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — BENCHMARKS & IMPACT
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Benchmarks & Impact"
        subtitle="R1 matches OpenAI o1 at a fraction of the cost — and it's open"
        color={E}
      />

      <Prose>
        <p>
          DeepSeek-R1 doesn't just match <H tip="OpenAI o1 = OpenAI's reasoning model, first released September 2024 and iterated as o1-1217 (December 2024). Before R1, it was the undisputed leader in reasoning benchmarks. Key difference: o1's training details are proprietary, R1's are published in detail." color={AMBER}>OpenAI o1</H> on
          <H tip="AIME (American Invitational Mathematics Examination) = a prestigious math competition for US high school students. Problems require creative mathematical reasoning, not just formula application. Only about 5% of AMC qualifiers score well on AIME. It has become a key benchmark for AI reasoning because it resists memorization and requires genuine problem-solving." color={E}>AIME</H> —
          it does so while being <strong>completely open</strong>. The model weights, the training
          methodology, the algorithm details — everything is published. This represents one of
          the most significant <H tip="Open-source AI milestone = a point where open models match or exceed proprietary ones. Before R1, there was a significant gap between open-source reasoning and o1. R1 closed that gap almost entirely, demonstrating that frontier reasoning doesn't require proprietary training pipelines." color={E2}>open-source AI milestones</H> in
          the field's history.
        </p>
      </Prose>

      {/* ── Benchmark vs o1 SVG ── */}
      <Diagram caption={<><strong>DeepSeek-R1 vs OpenAI o1</strong> — Head-to-head on major reasoning benchmarks. Green = R1 leads, Amber = o1 leads.</>}>
        <svg viewBox="0 0 860 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="vs-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f18" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
          </defs>

          <rect width="860" height="380" rx="12" fill="url(#vs-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={E} fontSize="14" fontWeight="700" letterSpacing="1.5">DEEPSEEK-R1 VS OPENAI O1-1217 — HEAD TO HEAD</text>

          {/* Benchmark comparison bars */}
          {[
            { label: 'AIME 2024', r1: 79.8, o1: 79.2, max: 100 },
            { label: 'MATH-500', r1: 97.3, o1: 96.4, max: 100 },
            { label: 'GPQA Diamond', r1: 71.5, o1: 75.7, max: 100 },
            { label: 'Codeforces', r1: 2029, o1: 2061, max: 2500, unit: '' },
            { label: 'SWE-bench Verified', r1: 49.2, o1: 48.9, max: 100 },
            { label: 'MMLU', r1: 90.8, o1: 91.8, max: 100 },
          ].map((b, i) => {
            const yBase = 55 + i * 52;
            const barWidth = 480;
            const r1W = (b.r1 / b.max) * barWidth;
            const o1W = (b.o1 / b.max) * barWidth;
            const r1Wins = b.r1 >= b.o1;
            return (
              <g key={`vs-${i}`}>
                <text x="170" y={yBase + 16} textAnchor="end" fill={FG} fontSize="12" fontWeight="600">{b.label}</text>
                {/* R1 bar */}
                <rect x="185" y={yBase} width={barWidth} height="14" rx="3" fill="#1a2e26" />
                <rect x="185" y={yBase} width={r1W} height="14" rx="3" fill={r1Wins ? E : E3} fillOpacity={r1Wins ? 0.7 : 0.4} />
                <text x={185 + r1W + 6} y={yBase + 11} fill={r1Wins ? E2 : E3} fontSize="10" fontWeight="700">{b.r1}{b.unit !== undefined ? b.unit : '%'}</text>
                {/* o1 bar */}
                <rect x="185" y={yBase + 18} width={barWidth} height="14" rx="3" fill="#1a2e26" />
                <rect x="185" y={yBase + 18} width={o1W} height="14" rx="3" fill={!r1Wins ? AMBER : '#92600b'} fillOpacity={!r1Wins ? 0.6 : 0.3} />
                <text x={185 + o1W + 6} y={yBase + 29} fill={!r1Wins ? AMBER : '#b8860b'} fontSize="10" fontWeight="700">{b.o1}{b.unit !== undefined ? b.unit : '%'}</text>
                {/* Winner indicator */}
                <text x="830" y={yBase + 20} textAnchor="middle" fill={r1Wins ? E : AMBER} fontSize="11" fontWeight="700">{r1Wins ? 'R1' : 'o1'}</text>
              </g>
            );
          })}

          {/* Legend */}
          <rect x="240" y="340" width="380" height="30" rx="8" fill="#0d1a14" stroke="#1a3a2a" strokeWidth="1" />
          <rect x="260" y="350" width="30" height="10" rx="2" fill={E} fillOpacity="0.7" />
          <text x="297" y="359" fill={E2} fontSize="10" fontWeight="600">DeepSeek-R1 (Open)</text>
          <rect x="430" y="350" width="30" height="10" rx="2" fill={AMBER} fillOpacity="0.6" />
          <text x="467" y="359" fill={AMBER} fontSize="10" fontWeight="600">OpenAI o1-1217 (Closed)</text>
        </svg>
      </Diagram>

      <StatBar
        stats={[
          { value: '79.8%', unit: '', label: 'AIME 2024 (vs o1: 79.2%)', color: E },
          { value: '97.3%', unit: '', label: 'MATH-500 (vs o1: 96.4%)', color: E2 },
          { value: '2029', unit: '', label: 'Codeforces (vs o1: 2061)', color: BLUE },
          { value: 'Open', unit: '', label: 'MIT License', color: AMBER },
        ]}
      />

      <ConceptCard title="Why R1 Matters Beyond Benchmarks" color={E} defaultOpen={true}>
        <Prose>
          <p>
            <strong>1. Scientific contribution.</strong> R1-Zero demonstrated that <H tip="Reasoning as emergent behavior = the finding that chain-of-thought, self-verification, and reflection arise spontaneously from RL optimization, rather than requiring explicit training. This changes our understanding of how reasoning develops in neural networks — it's not something that must be 'taught,' but something that can 'emerge.'" color={E}>reasoning is emergent</H>,
            not engineered. This reframes the fundamental question from "how do we teach models to reason?"
            to "what optimization pressures cause reasoning to emerge?" — a much more tractable research direction.
          </p>
          <p>
            <strong>2. Algorithmic contribution.</strong> <H tip="GRPO's practical impact = by eliminating the critic network, GRPO halves the memory requirements for RL training on large models. This makes RL feasible at scales (671B+) where PPO would be prohibitively expensive. The algorithm is simple enough to implement in ~100 lines of code." color={E}>GRPO</H> provides
            a memory-efficient alternative to PPO that scales to 671B+ parameter models. The community has
            already adopted it for training other models.
          </p>
          <p>
            <strong>3. Practical contribution.</strong> The <H tip="Distilled model family = the 6 open-weight models (1.5B to 70B) that bring R1's reasoning to consumer hardware. The 7B model runs on a single RTX 4070. The 1.5B model runs on a smartphone. These democratize frontier reasoning to millions of developers who don't have data center GPUs." color={E2}>distilled model family</H> makes
            frontier reasoning accessible on consumer hardware. A 14B model that beats many 70B models on
            math — running on a single GPU — is a practical game-changer.
          </p>
          <p>
            <strong>4. Openness.</strong> R1 is released under <H tip="MIT License = one of the most permissive open-source licenses. It allows commercial use, modification, distribution, and private use with no restrictions beyond including the license text. This means companies can build products on R1 without royalties or restrictions." color={E}>MIT license</H> with
            full model weights, detailed training methodology, and algorithm specifications. This level
            of transparency from a frontier lab is unprecedented for a model of this capability.
          </p>
        </Prose>
      </ConceptCard>

      {/* ── Impact Timeline SVG ── */}
      <Diagram caption={<><strong>The RL Reasoning Paradigm</strong> — R1 establishes a new recipe: base model + reward signal + GRPO = emergent reasoning. No human chain-of-thought needed.</>}>
        <svg viewBox="0 0 860 280" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="imp-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f1f18" />
              <stop offset="100%" stopColor={BG} />
            </linearGradient>
            <marker id="imp-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={E} />
            </marker>
          </defs>

          <rect width="860" height="280" rx="12" fill="url(#imp-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={E} fontSize="14" fontWeight="700" letterSpacing="1.5">THE NEW RECIPE: RL-DRIVEN REASONING</text>

          {/* Old recipe (crossed out) */}
          <rect x="30" y="55" width="380" height="80" rx="10" fill={RED} fillOpacity="0.06" stroke={RED} strokeWidth="1" />
          <text x="220" y="78" textAnchor="middle" fill={RED} fontSize="12" fontWeight="700">Old Recipe (Pre-R1)</text>
          <text x="220" y="98" textAnchor="middle" fill={GRAY} fontSize="11">Collect 100K+ human CoT examples ($$$)</text>
          <text x="220" y="115" textAnchor="middle" fill={GRAY} fontSize="11">SFT → RLHF → Deploy</text>
          <line x1="100" y1="78" x2="340" y2="78" stroke={RED} strokeWidth="1.5" opacity="0.5" />

          {/* New recipe */}
          <rect x="450" y="55" width="380" height="80" rx="10" fill={E} fillOpacity="0.10" stroke={E} strokeWidth="2" />
          <text x="640" y="78" textAnchor="middle" fill={E} fontSize="12" fontWeight="700">New Recipe (R1)</text>
          <text x="640" y="98" textAnchor="middle" fill={FG} fontSize="11">Base model + reward signal + GRPO</text>
          <text x="640" y="115" textAnchor="middle" fill={E2} fontSize="11" fontWeight="600">Reasoning emerges. Then distill down.</text>

          {/* Arrow between */}
          <line x1="410" y1="95" x2="450" y2="95" stroke={E} strokeWidth="2" markerEnd="url(#imp-ar)" />

          {/* Three pillars */}
          {[
            { x: 100, label: 'GRPO Algorithm', desc: 'RL without critic', color: E },
            { x: 360, label: 'Emergent Reasoning', desc: 'CoT from reward alone', color: E2 },
            { x: 620, label: 'Reasoning Distillation', desc: '671B → 1.5B', color: CYAN },
          ].map((p, i) => (
            <g key={`pillar-${i}`}>
              <rect x={p.x - 100} y={165} width="200" height="55" rx="10" fill={p.color} fillOpacity="0.12" stroke={p.color} strokeWidth="1.5" />
              <text x={p.x} y={187} textAnchor="middle" fill={p.color} fontSize="12" fontWeight="700">{p.label}</text>
              <text x={p.x} y={207} textAnchor="middle" fill={GRAY} fontSize="10">{p.desc}</text>
            </g>
          ))}

          {/* Bottom summary */}
          <rect x="130" y="240" width="600" height="28" rx="8" fill={E} fillOpacity="0.10" stroke={E} strokeWidth="1" />
          <text x="430" y="259" textAnchor="middle" fill={E2} fontSize="11" fontWeight="600">Published Jan 2025 (arXiv) | Accepted Nature Sep 2025 | MIT License | Open Weights</text>
        </svg>
      </Diagram>

      <MentalModel
        title="The 'Learning to Learn' Moment in AI"
        analogy="Before R1, teaching AI to reason was like teaching someone to cook by giving them recipe books (SFT) — they could make specific dishes but struggled to improvise. R1-Zero proved that if you simply tell someone 'this tastes good' or 'this tastes bad' (RL rewards), they can independently invent cooking techniques, develop taste, and even create new recipes. R1 then shows that once a master chef (671B) develops these skills, apprentices (distilled models) learn better by watching the chef than by getting taste-tested themselves."
        technical="R1 establishes a three-stage paradigm: (1) RL discovers reasoning strategies in a large model, (2) cold-start SFT stabilizes the output format without constraining reasoning, (3) distillation transfers reasoning to smaller models more efficiently than direct RL. This paradigm decouples capability discovery (RL) from capability transfer (distillation), which may be the most scalable path to broadly capable reasoning models."
        color={E}
      />

      <Callout type="key">
        DeepSeek-R1 is not just a model — it is a new <strong>paradigm</strong> for building reasoning
        systems. The finding that reasoning emerges from pure RL, that GRPO enables RL at 671B scale
        without a critic, and that distillation efficiently transfers reasoning to small models — these
        three contributions together establish a recipe that can be applied to any domain where automated
        reward signals exist: mathematics, code, formal verification, scientific reasoning, and beyond.
      </Callout>
    </>
  );
}
