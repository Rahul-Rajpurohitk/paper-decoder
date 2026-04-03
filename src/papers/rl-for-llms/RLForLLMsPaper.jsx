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
const A  = '#f59e0b';   // amber accent (primary)
const A2 = '#fbbf24';   // lighter amber
const A3 = '#d97706';   // darker amber
const BG = '#1a1308';   // deep amber-black for SVGs
const FG = '#e2e8f0';   // light text in SVGs
const GRAY = '#94a3b8';
const BLUE = '#3b82f6';
const PURPLE = '#a855f7';
const RED = '#ef4444';
const GREEN = '#22c55e';
const CYAN = '#06b6d4';
const TEAL = '#14b8a6';

/* ─── SVG helpers ─── */
const ARROW = (x1, y1, x2, y2, color = A, dashed = false) => (
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

export default function RLForLLMsPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHAT IS REINFORCEMENT LEARNING?
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="What is Reinforcement Learning?"
        subtitle="Starting from absolute zero — the learning paradigm behind ChatGPT, Claude, and DeepSeek"
        color={A}
      />

      <Prose>
        <p>
          Forget everything you know about how machines learn for a moment. In most AI you have
          heard about, someone shows the model millions of examples with correct answers:
          "this image is a cat," "this sentence translates to French as..." The model copies the
          patterns. That is <H tip="Supervised Learning = the model gets input-output pairs (x, y) and learns to predict y from x. Every training example has the 'right answer' attached. Like a student studying from a textbook with answer keys." color={BLUE}>supervised learning</H>.
        </p>
        <p>
          <H tip="Reinforcement Learning (RL) = a paradigm where an agent learns by interacting with an environment. It takes actions, observes outcomes, and receives rewards. No one tells it what the 'correct' action is — it must discover good strategies through trial and error." color={A}>Reinforcement learning</H> is
          fundamentally different. There is no answer key. Instead, an <H tip="Agent = the learner and decision-maker in RL. In the context of LLMs, the agent is the language model itself — it 'decides' which tokens to generate next." color={A}>agent</H> interacts
          with an <H tip="Environment = everything the agent interacts with. For a game-playing agent, it is the game. For an LLM, the environment is the conversation context, the user prompt, and ultimately the human (or reward model) evaluating the response." color={TEAL}>environment</H>,
          takes <H tip="Action = a choice made by the agent at each step. For a robot, it might be 'move left.' For an LLM, each action is generating the next token. A full response is a sequence of hundreds of actions." color={GREEN}>actions</H>, and
          receives <H tip="Reward = a numerical signal telling the agent how good or bad its action was. Can be sparse (only at the end, like winning/losing a game) or dense (at every step). For LLMs, the reward often comes only after the full response is generated." color={A}>rewards</H>.
          Nobody tells it <em>what</em> to do. It figures it out by trying things and observing what
          gets rewarded.
        </p>
        <p>
          A dog learns to sit because it gets a treat. A child learns not to touch the stove because
          it hurts. A chess engine learns to sacrifice a queen because it eventually leads to
          checkmate. <strong>That is reinforcement learning.</strong>
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '1992', unit: '', label: 'REINFORCE algorithm (Williams)', color: A },
          { value: '2013', unit: '', label: 'Atari DQN (DeepMind)', color: BLUE },
          { value: '2017', unit: '', label: 'PPO (OpenAI)', color: GREEN },
          { value: '2022', unit: '', label: 'RLHF in ChatGPT', color: PURPLE },
        ]}
      />

      {/* ── The RL Loop SVG ── */}
      <Diagram caption={<><strong>The Reinforcement Learning Loop</strong> — The agent observes the world, takes an action, receives a reward, and updates its strategy. This cycle repeats millions of times.</>}>
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="rl-loop-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={A} />
            </marker>
            <marker id="rl-loop-ar-t" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={TEAL} />
            </marker>
            <marker id="rl-loop-ar-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <linearGradient id="rl-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1308" />
              <stop offset="100%" stopColor="#0f0d08" />
            </linearGradient>
          </defs>

          <rect width="800" height="380" rx="12" fill="url(#rl-bg)" />
          <text x="400" y="30" textAnchor="middle" fill={A} fontSize="14" fontWeight="700" letterSpacing="1.5">THE REINFORCEMENT LEARNING LOOP</text>

          {/* Agent box */}
          <rect x="280" y="60" width="240" height="70" rx="14" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="2" />
          <text x="400" y="90" textAnchor="middle" fill={A2} fontSize="18" fontWeight="700">AGENT</text>
          <text x="400" y="112" textAnchor="middle" fill={GRAY} fontSize="12">Learns a policy: state → action</text>

          {/* Environment box */}
          <rect x="280" y="250" width="240" height="70" rx="14" fill={TEAL} fillOpacity="0.15" stroke={TEAL} strokeWidth="2" />
          <text x="400" y="280" textAnchor="middle" fill={TEAL} fontSize="18" fontWeight="700">ENVIRONMENT</text>
          <text x="400" y="302" textAnchor="middle" fill={GRAY} fontSize="12">The world the agent acts in</text>

          {/* Action arrow (Agent → Environment, right side) */}
          <path d="M 520 105 L 620 105 L 620 280 L 520 280" fill="none" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#rl-loop-ar-g)" />
          <rect x="585" y="165" width="80" height="34" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="625" y="187" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="700">Action</text>

          {/* State + Reward arrow (Environment → Agent, left side) */}
          <path d="M 280 280 L 180 280 L 180 105 L 280 105" fill="none" stroke={A} strokeWidth="2.5" markerEnd="url(#rl-loop-ar)" />
          <rect x="115" y="155" width="80" height="34" rx="8" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1" />
          <text x="155" y="175" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">Reward</text>
          <rect x="115" y="200" width="80" height="34" rx="8" fill={TEAL} fillOpacity="0.15" stroke={TEAL} strokeWidth="1" />
          <text x="155" y="222" textAnchor="middle" fill={TEAL} fontSize="13" fontWeight="700">State</text>

          {/* Labels */}
          <text x="400" y="360" textAnchor="middle" fill={GRAY} fontSize="11" fontStyle="italic">This loop repeats for every step. One full loop = one timestep. Thousands of timesteps = one episode.</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>RL in 60 seconds:</strong> Think of training a dog. You say "sit." The dog tries something random — maybe it lies down. No treat. It tries again — it sits! Treat! Over many repetitions, the dog learns: "when I hear 'sit,' the action 'sit' gets me a reward." It never saw an instruction manual. It learned from trial, error, and rewards. That is reinforcement learning in its entirety.</p>
      </SimpleExplain>

      {/* ── Dog Analogy SVG ── */}
      <Diagram caption={<><strong>The Dog Analogy</strong> — RL in everyday life. Command = state, action = what the dog tries, treat = reward, learned behavior = policy.</>}>
        <svg viewBox="0 0 800 200" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="200" rx="12" fill="#0f0d08" />

          {/* Step 1: Command */}
          <rect x="30" y="55" width="130" height="90" rx="12" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="95" y="85" textAnchor="middle" fill={BLUE} fontSize="24">🗣️</text>
          <text x="95" y="108" textAnchor="middle" fill={BLUE} fontSize="13" fontWeight="700">"Sit!"</text>
          <text x="95" y="125" textAnchor="middle" fill={GRAY} fontSize="10">(State / Command)</text>

          {/* Arrow */}
          <line x1="165" y1="100" x2="200" y2="100" stroke={A} strokeWidth="2" markerEnd="url(#rl-loop-ar)" />

          {/* Step 2: Dog tries */}
          <rect x="205" y="55" width="130" height="90" rx="12" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="270" y="85" textAnchor="middle" fill={A} fontSize="24">🐕</text>
          <text x="270" y="108" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">Dog sits</text>
          <text x="270" y="125" textAnchor="middle" fill={GRAY} fontSize="10">(Action)</text>

          {/* Arrow */}
          <line x1="340" y1="100" x2="375" y2="100" stroke={A} strokeWidth="2" markerEnd="url(#rl-loop-ar)" />

          {/* Step 3: Treat */}
          <rect x="380" y="55" width="130" height="90" rx="12" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1.5" />
          <text x="445" y="85" textAnchor="middle" fill={GREEN} fontSize="24">🦴</text>
          <text x="445" y="108" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="700">Treat!</text>
          <text x="445" y="125" textAnchor="middle" fill={GRAY} fontSize="10">(Reward = +1)</text>

          {/* Arrow */}
          <line x1="515" y1="100" x2="550" y2="100" stroke={A} strokeWidth="2" markerEnd="url(#rl-loop-ar)" />

          {/* Step 4: Learned */}
          <rect x="555" y="55" width="210" height="90" rx="12" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="1.5" />
          <text x="660" y="85" textAnchor="middle" fill={PURPLE} fontSize="24">🧠</text>
          <text x="660" y="108" textAnchor="middle" fill={PURPLE} fontSize="13" fontWeight="700">Learned: "sit" → sit</text>
          <text x="660" y="125" textAnchor="middle" fill={GRAY} fontSize="10">(Updated Policy)</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Paradigm', 'Training Signal', 'Analogy', 'Knows Correct Answer?', 'Example']}
        rows={[
          ['Supervised Learning', 'Labeled input→output pairs', 'Teacher gives you the answer key', 'Yes — every example has the label', 'Image classification, translation'],
          ['Reinforcement Learning', 'Reward signal (good/bad)', 'Coach says "good job" or "try again"', 'No — only knows if result was good', 'Game-playing, RLHF, robotics'],
          ['Unsupervised Learning', 'No signal (find structure)', 'Exploring a library with no guide', 'No labels at all', 'Clustering, pre-training, autoencoders'],
        ]}
        caption="Three paradigms of machine learning — RL is unique because it learns from consequences, not examples"
      />

      <SimpleExplain>
        <p><strong>The key difference:</strong> Supervised learning = a teacher gives you the answer. RL = a teacher only says "good" or "bad" after you try. Unsupervised learning = no teacher at all, find patterns on your own. RL is harder than supervised learning because you must explore — try many things to discover what works.</p>
      </SimpleExplain>

      <ConceptCard title="The Seven Key Terms of RL" color={A} defaultOpen={true}>
        <Prose>
          <p>
            <strong><H tip="Agent = the entity that makes decisions and learns. In RL for LLMs, the agent is the language model. It observes the conversation so far (state), picks the next token (action), and gets feedback (reward)." color={A}>Agent</H>:</strong> The learner. For LLMs, the model itself is the agent.
          </p>
          <p>
            <strong><H tip="Environment = everything outside the agent that it interacts with. For a game agent, the game board. For an LLM, the prompt, the user, the reward model. The environment transitions to a new state after each action." color={TEAL}>Environment</H>:</strong> The world the agent acts in. For LLMs, this includes the prompt and the reward model.
          </p>
          <p>
            <strong><H tip="State (s) = the current situation as observed by the agent. In chess, the board position. In LLMs, the tokens generated so far plus the original prompt. The state encodes everything the agent needs to make a decision." color={BLUE}>State (s)</H>:</strong> The current situation. For an LLM generating text, the state is all tokens produced so far.
          </p>
          <p>
            <strong><H tip="Action (a) = a choice the agent makes. In LLMs, each action is choosing the next token from the vocabulary (~128K possible tokens). A full response is a sequence of actions." color={GREEN}>Action (a)</H>:</strong> What the agent does. For LLMs, each action is picking the next token.
          </p>
          <p>
            <strong><H tip="Reward (r) = a scalar number that tells the agent how good its action was. +1 for correct math answers, -1 for harmful content, 0.73 from a reward model rating helpfulness. The agent's goal is to maximize cumulative reward." color={A}>Reward (r)</H>:</strong> The feedback signal. A number saying "that was good" (+) or "that was bad" (-).
          </p>
          <p>
            <strong><H tip="Policy (π) = the agent's strategy. Formally, a function π(a|s) that maps states to a probability distribution over actions. A good policy assigns high probability to actions that lead to high rewards. Training = finding the best policy." color={PURPLE}>Policy (π)</H>:</strong> The agent's strategy — given a state, what should I do? This is what gets trained.
          </p>
          <p>
            <strong><H tip="Episode = one complete interaction from start to finish. In a game, one full game from first move to game over. For an LLM, one complete prompt→response cycle. Training runs thousands of episodes." color={GRAY}>Episode</H>:</strong> One complete interaction. For an LLM, generating one full response to one prompt.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        Everything in RL reduces to one sentence: the agent learns a <em>policy</em> that maps states to
        actions in order to maximize cumulative reward. Every algorithm you will see in this paper — PPO,
        RLHF, DPO, GRPO — is a different strategy for finding that optimal policy.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — POLICY, REWARD, AND VALUE
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="Policy, Reward, and Value — The Three Pillars"
        subtitle="The mathematical foundations that make RL work — built up from first principles"
        color={A}
      />

      <Prose>
        <p>
          Now that you have the intuition, let us build the math. Every RL system rests on three
          pillars: the <H tip="Policy π(a|s) = a probability distribution over actions given the current state. 'Given I see THIS board position, what is the probability I play each possible move?' Training adjusts these probabilities so high-reward actions become more likely." color={PURPLE}>policy</H>,
          the <H tip="Reward function R(s, a) = a function that assigns a numerical score to each state-action pair. It encodes what we WANT the agent to do. Designing a good reward function is arguably the hardest part of RL — get it wrong and the agent optimizes for the wrong thing." color={A}>reward</H>,
          and the <H tip="Value function V(s) = the expected total future reward starting from state s and following the current policy. It answers: 'how promising is my current position?' A state with high value is one where the agent expects lots of future reward." color={GREEN}>value function</H>.
          Understanding these three concepts is the key to understanding everything that follows.
        </p>
      </Prose>

      <StepFlow
        color={A}
        steps={[
          {
            title: 'Policy π(a|s) — Your Strategy',
            desc: 'Given a state, the policy outputs a probability distribution over all possible actions. For an LLM, this is literally the next-token probability distribution — the softmax output over the vocabulary. A "good" policy assigns high probability to tokens that lead to helpful, correct responses.',
          },
          {
            title: 'Reward r — The Score',
            desc: 'After the agent takes an action (or completes a full response), it receives a reward. For LLMs, this might be: +1 for a correct math answer, a 0-1 score from a reward model judging helpfulness, or -1 for producing harmful content. The reward is the SIGNAL that drives learning.',
          },
          {
            title: 'Value V(s) — Future Potential',
            desc: 'The value of a state is not just the immediate reward — it is the total expected reward from NOW until the end of the episode. A chess position might look bad right now (you just lost a pawn) but have high value because it sets up a checkmate in 3 moves. Value looks ahead.',
          },
        ]}
      />

      <FormulaSteps
        label="Building Up to the Policy Gradient — Step by Step"
        color={A}
        steps={[
          {
            note: 'Start with the simplest idea: the immediate reward for taking action a in state s. This tells you how good THIS moment is, but nothing about the future.',
            math: 'r_t = R(s_t, a_t)',
          },
          {
            note: 'But we care about the TOTAL reward over time, not just right now. The return G is the sum of all future rewards, discounted by gamma (because a reward now is worth more than a reward later). Gamma = 0.99 means we mostly care about the future; gamma = 0.5 means we are short-sighted.',
            math: 'G_t = r_t + \\gamma\\, r_{t+1} + \\gamma^2\\, r_{t+2} + \\cdots = \\sum_{k=0}^{\\infty} \\gamma^k\\, r_{t+k}',
          },
          {
            note: 'The value function V(s) is the EXPECTED return from state s. Since RL is stochastic (random actions, random environments), we take the average over all possible futures.',
            math: 'V^\\pi(s) = \\mathbb{E}_{\\pi} \\left[ G_t \\mid s_t = s \\right] = \\mathbb{E}_{\\pi} \\left[ \\sum_{k=0}^{\\infty} \\gamma^k\\, r_{t+k} \\mid s_t = s \\right]',
          },
          {
            note: 'The advantage A(s,a) tells us how much BETTER action a is compared to the average action from state s. Positive advantage = better than average. Negative = worse. This is what drives the policy update — increase probability of above-average actions.',
            math: 'A^\\pi(s, a) = Q^\\pi(s, a) - V^\\pi(s)',
          },
          {
            note: 'The Policy Gradient Theorem (the foundation of modern RL for LLMs): to improve the policy, adjust the probability of each action proportionally to its advantage. Actions that are better than average get reinforced; worse actions get suppressed.',
            math: '\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\pi_\\theta} \\left[ \\nabla_\\theta \\log \\pi_\\theta(a_t \\mid s_t) \\cdot A^{\\pi_\\theta}(s_t, a_t) \\right]',
          },
        ]}
        symbols={[
          { symbol: '\\gamma', meaning: 'Discount factor (0-1) — how much to value future vs immediate rewards' },
          { symbol: 'G_t', meaning: 'Return — total discounted reward from time t onward' },
          { symbol: 'V^\\pi(s)', meaning: 'Value function — expected return from state s under policy pi' },
          { symbol: 'Q^\\pi(s,a)', meaning: 'Action-value — expected return from state s, taking action a, then following pi' },
          { symbol: 'A^\\pi(s,a)', meaning: 'Advantage — how much better action a is vs the average from state s' },
          { symbol: '\\nabla_\\theta J', meaning: 'Policy gradient — the direction to update parameters to increase expected reward' },
        ]}
      />

      {/* ── Value Landscape SVG ── */}
      <Diagram caption={<><strong>The Value Landscape</strong> — States with high value (hills) are promising positions. The agent learns to climb toward peaks. The policy gradient pushes the agent uphill.</>}>
        <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="val-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1308" />
              <stop offset="100%" stopColor="#0f0d08" />
            </linearGradient>
            <linearGradient id="hill-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={A} stopOpacity="0.4" />
              <stop offset="100%" stopColor={A} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect width="800" height="300" rx="12" fill="url(#val-bg)" />
          <text x="400" y="28" textAnchor="middle" fill={A} fontSize="13" fontWeight="700" letterSpacing="1.5">VALUE LANDSCAPE — HILLS = GOOD STATES, VALLEYS = BAD STATES</text>

          {/* Value landscape curve */}
          <path d="M 40 220 Q 120 200 180 180 Q 230 160 260 100 Q 290 50 320 80 Q 350 110 380 200 Q 410 240 450 230 Q 500 210 540 120 Q 570 60 600 50 Q 630 40 660 70 Q 690 100 720 180 Q 750 220 780 220" fill="url(#hill-grad)" stroke={A} strokeWidth="2.5" />

          {/* Baseline */}
          <line x1="40" y1="240" x2="780" y2="240" stroke={GRAY} strokeWidth="1" strokeDasharray="4 4" />
          <text x="790" y="244" textAnchor="end" fill={GRAY} fontSize="10">V = 0</text>

          {/* Peak labels */}
          <circle cx="290" cy="60" r="5" fill={GREEN} />
          <text x="290" y="48" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600">High V(s)</text>
          <text x="290" y="80" textAnchor="middle" fill={GRAY} fontSize="9">promising</text>

          <circle cx="600" cy="48" r="5" fill={GREEN} />
          <text x="600" y="36" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600">Highest V(s)</text>
          <text x="600" y="68" textAnchor="middle" fill={GRAY} fontSize="9">optimal zone</text>

          {/* Valley label */}
          <circle cx="400" cy="210" r="5" fill={RED} />
          <text x="400" y="255" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600">Low V(s)</text>
          <text x="400" y="268" textAnchor="middle" fill={GRAY} fontSize="9">bad position</text>

          {/* Agent climbing */}
          <circle cx="500" cy="215" r="8" fill={A} stroke={A2} strokeWidth="2" />
          <text x="500" y="219" textAnchor="middle" fill="#000" fontSize="10" fontWeight="800">A</text>
          {/* Arrow showing gradient direction */}
          <line x1="508" y1="210" x2="545" y2="155" stroke={A2} strokeWidth="2" markerEnd="url(#rl-loop-ar)" />
          <text x="548" y="145" textAnchor="start" fill={A2} fontSize="10" fontWeight="600">policy gradient</text>
          <text x="548" y="158" textAnchor="start" fill={GRAY} fontSize="9">pushes uphill</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>The three pillars in plain English:</strong> Policy = your strategy ("when I see this, I do that"). Reward = the score you get right now. Value = how promising your current position is for FUTURE scoring. A chess grandmaster does not just look at the current board (reward) — they evaluate how strong their position is for the next 20 moves (value). RL trains the policy by pushing the agent toward high-value states.</p>
      </SimpleExplain>

      <MentalModel
        title="Chess: The Perfect RL Analogy"
        analogy="Policy = which move to make from this board position. Reward = you only get +1 (win) or -1 (loss) at the END of the game. Value = how strong your current board position is — an experienced player 'feels' whether they are winning or losing long before checkmate. The advantage says: 'this specific move is better than what I would normally play from here.'"
        technical="Formally, the policy pi(a|s) maps board states to move distributions, the reward r is sparse (+1/-1 at game end), and V(s) estimates the expected game outcome from position s. The advantage A(s,a) = Q(s,a) - V(s) measures the marginal benefit of move a over the average move. This is exactly the signal used to update LLM policies in PPO and GRPO."
        color={A}
      />

      <Callout type="math">
        The Policy Gradient Theorem is the single most important equation in this paper. Every
        algorithm from PPO to DPO to GRPO is ultimately a different way to <em>estimate and apply</em> this
        gradient. The idea is simple: increase the probability of actions with positive advantage
        (better than average) and decrease the probability of actions with negative advantage (worse than average).
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — PPO: PROXIMAL POLICY OPTIMIZATION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="PPO — Proximal Policy Optimization"
        subtitle="The algorithm that trained ChatGPT: stable RL through clipped updates"
        color={A}
      />

      <Prose>
        <p>
          The policy gradient from Section 02 has a problem: it is <em>unstable</em>. If the advantage
          estimate is noisy (and it always is), a single bad gradient step can destroy the policy.
          Imagine driving a car: the basic policy gradient is like jerking the steering wheel hard
          every time you drift — you overcorrect and crash. What we need is <em>gentle, bounded corrections</em>.
        </p>
        <p>
          This is exactly what <H tip="PPO (Proximal Policy Optimization) = an RL algorithm by Schulman et al. (OpenAI, 2017) that limits how much the policy can change in a single update step. 'Proximal' means 'nearby' — each update stays close to the current policy. This is the algorithm used to train ChatGPT, Claude, and most RLHF systems." color={A}>Proximal Policy Optimization (PPO)</H> does.
          Published by John Schulman at OpenAI in 2017, PPO became the <em>de facto</em> algorithm for
          training LLMs with reinforcement learning. It is the engine behind
          <H tip="ChatGPT = OpenAI's conversational AI (November 2022), one of the first models to use RLHF with PPO at scale. The three-stage pipeline (pre-train → SFT → RLHF with PPO) became the industry standard for aligning language models to human preferences." color={BLUE}>ChatGPT</H>,
          <H tip="Claude = Anthropic's conversational AI. Also trained with RLHF using PPO variants, with additional techniques like Constitutional AI (RLAIF). Anthropic was founded by former OpenAI researchers specifically to focus on AI safety and alignment." color={PURPLE}>Claude</H>,
          and most commercial LLMs you have used.
        </p>
        <p>
          The core idea: limit how much the policy can change in a single step. PPO introduces a
          <H tip="Clipping = the mathematical trick at the heart of PPO. The probability ratio r(theta) = pi_new / pi_old measures how much the policy changed. PPO clips this ratio to the range [1-epsilon, 1+epsilon], preventing any single update from making too large a change. Typical epsilon = 0.2 (allowing at most 20% change)." color={A}>clipping mechanism</H> that
          prevents catastrophic updates. If the policy tries to change too much, the gradient is
          simply cut off. Small, stable steps toward better performance.
        </p>
      </Prose>

      <FormulaSteps
        label="PPO Loss — From Basic Policy Gradient to Clipped Objective"
        color={A}
        steps={[
          {
            note: 'Start with the basic policy gradient objective: adjust action probabilities proportional to their advantages. This is the REINFORCE algorithm — simple but high variance and unstable.',
            math: 'J(\\theta) = \\mathbb{E}\\left[ \\log \\pi_\\theta(a_t \\mid s_t) \\cdot A_t \\right]',
          },
          {
            note: 'Introduce importance sampling: instead of collecting new data every update, reuse data from the old policy by weighting with the probability ratio r(theta). This is more sample-efficient but can explode when the ratio is too large.',
            math: 'r_t(\\theta) = \\frac{\\pi_\\theta(a_t \\mid s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t \\mid s_t)}',
          },
          {
            note: 'The unclipped surrogate objective: weight each advantage by the probability ratio. If the new policy is twice as likely to take action a (r=2), the advantage counts double. Problem: r can be 100x or more, causing instability.',
            math: 'L^{\\text{CPI}}(\\theta) = \\mathbb{E}\\left[ r_t(\\theta) \\cdot A_t \\right]',
          },
          {
            note: 'THE PPO TRICK: take the minimum of the unclipped objective and a clipped version. The clip function limits r to [1-epsilon, 1+epsilon]. This creates a "trust region" — the policy CANNOT change by more than epsilon in a single step. This is the key to stability.',
            math: 'L^{\\text{PPO}}(\\theta) = \\mathbb{E}\\left[ \\min\\!\\left( r_t(\\theta) \\cdot A_t,\\; \\text{clip}\\big(r_t(\\theta),\\, 1\\!-\\!\\varepsilon,\\, 1\\!+\\!\\varepsilon\\big) \\cdot A_t \\right) \\right]',
          },
        ]}
        symbols={[
          { symbol: 'r_t(\\theta)', meaning: 'Probability ratio — how much more/less likely the new policy takes action a than the old policy' },
          { symbol: 'A_t', meaning: 'Advantage estimate — how much better this action is vs average' },
          { symbol: '\\varepsilon', meaning: 'Clipping parameter, typically 0.2 — max allowed policy change per step' },
          { symbol: '\\text{clip}(x, a, b)', meaning: 'Clamp x to the range [a, b] — if x > b return b, if x < a return a' },
        ]}
      />

      {/* ── PPO Clipping Visualization SVG ── */}
      <Diagram caption={<><strong>PPO Clipping</strong> — The objective function (orange) is clipped to a flat "trust region" (gray zone). When the policy tries to change too much, the gradient becomes zero, preventing destabilizing updates.</>}>
        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="ppo-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1308" />
              <stop offset="100%" stopColor="#0f0d08" />
            </linearGradient>
          </defs>

          <rect width="800" height="340" rx="12" fill="url(#ppo-bg)" />
          <text x="400" y="28" textAnchor="middle" fill={A} fontSize="13" fontWeight="700" letterSpacing="1.5">PPO CLIPPING — POSITIVE ADVANTAGE CASE (A &gt; 0)</text>

          {/* Axes */}
          <line x1="100" y1="280" x2="720" y2="280" stroke={GRAY} strokeWidth="1.5" />
          <line x1="100" y1="280" x2="100" y2="55" stroke={GRAY} strokeWidth="1.5" />
          <text x="410" y="310" textAnchor="middle" fill={GRAY} fontSize="12">r(θ) = π_new / π_old</text>
          <text x="60" y="165" textAnchor="middle" fill={GRAY} fontSize="12" transform="rotate(-90 60 165)">Objective</text>

          {/* Trust region background */}
          <rect x="260" y="55" width="200" height="225" fill={A} fillOpacity="0.05" />
          <text x="360" y="72" textAnchor="middle" fill={A} fontSize="10" fontWeight="600" opacity="0.6">Trust Region</text>

          {/* 1-epsilon and 1+epsilon labels */}
          <line x1="260" y1="55" x2="260" y2="285" stroke={A} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <line x1="460" y1="55" x2="460" y2="285" stroke={A} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <text x="260" y="298" textAnchor="middle" fill={A2} fontSize="11">1 - ε</text>
          <text x="460" y="298" textAnchor="middle" fill={A2} fontSize="11">1 + ε</text>
          <text x="360" y="298" textAnchor="middle" fill={FG} fontSize="11">1.0</text>

          {/* Unclipped objective (straight line going up, positive advantage) */}
          <line x1="120" y1="240" x2="680" y2="90" stroke={BLUE} strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
          <text x="690" y="85" textAnchor="start" fill={BLUE} fontSize="10" opacity="0.7">Unclipped</text>

          {/* Clipped PPO objective: flat-sloped-flat */}
          <line x1="120" y1="170" x2="260" y2="170" stroke={A} strokeWidth="3" />
          <line x1="260" y1="170" x2="460" y2="130" stroke={A} strokeWidth="3" />
          <line x1="460" y1="130" x2="680" y2="130" stroke={A} strokeWidth="3" />

          {/* Clipping points */}
          <circle cx="260" cy="170" r="5" fill={A} />
          <circle cx="460" cy="130" r="5" fill={A} />

          {/* Labels */}
          <text x="175" y="160" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600">Clipped: flat</text>
          <text x="175" y="175" textAnchor="middle" fill={GRAY} fontSize="9">gradient = 0</text>
          <text x="360" y="118" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600">Active: learning</text>
          <text x="360" y="133" textAnchor="middle" fill={GRAY} fontSize="9">gradient flows</text>
          <text x="585" y="120" textAnchor="middle" fill={RED} fontSize="11" fontWeight="600">Clipped: flat</text>
          <text x="585" y="135" textAnchor="middle" fill={GRAY} fontSize="9">gradient = 0</text>

          {/* Legend */}
          <line x1="120" y1="325" x2="145" y2="325" stroke={A} strokeWidth="3" />
          <text x="150" y="329" textAnchor="start" fill={FG} fontSize="11">PPO clipped objective</text>
          <line x1="320" y1="325" x2="345" y2="325" stroke={BLUE} strokeWidth="2" strokeDasharray="6 4" />
          <text x="350" y="329" textAnchor="start" fill={FG} fontSize="11">Unclipped (unstable)</text>
        </svg>
      </Diagram>

      {/* ── PPO Training Loop SVG ── */}
      <Diagram caption={<><strong>PPO Training Loop</strong> — Collect rollouts, compute advantages, update policy with clipping, repeat. The loop runs for thousands of iterations.</>}>
        <svg viewBox="0 0 800 240" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="240" rx="12" fill="#0f0d08" />
          <text x="400" y="28" textAnchor="middle" fill={A} fontSize="13" fontWeight="700" letterSpacing="1.5">PPO TRAINING LOOP</text>

          {/* Step boxes */}
          <rect x="30" y="60" width="150" height="70" rx="10" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="105" y="85" textAnchor="middle" fill={BLUE} fontSize="12" fontWeight="700">1. Collect Rollouts</text>
          <text x="105" y="102" textAnchor="middle" fill={GRAY} fontSize="10">Generate responses</text>
          <text x="105" y="116" textAnchor="middle" fill={GRAY} fontSize="10">using current policy</text>

          <line x1="185" y1="95" x2="215" y2="95" stroke={A} strokeWidth="2" markerEnd="url(#rl-loop-ar)" />

          <rect x="220" y="60" width="150" height="70" rx="10" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1.5" />
          <text x="295" y="85" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700">2. Score Responses</text>
          <text x="295" y="102" textAnchor="middle" fill={GRAY} fontSize="10">Reward model rates</text>
          <text x="295" y="116" textAnchor="middle" fill={GRAY} fontSize="10">each response</text>

          <line x1="375" y1="95" x2="405" y2="95" stroke={A} strokeWidth="2" markerEnd="url(#rl-loop-ar)" />

          <rect x="410" y="60" width="150" height="70" rx="10" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="1.5" />
          <text x="485" y="85" textAnchor="middle" fill={PURPLE} fontSize="12" fontWeight="700">3. Compute Advantages</text>
          <text x="485" y="102" textAnchor="middle" fill={GRAY} fontSize="10">A = reward - baseline</text>
          <text x="485" y="116" textAnchor="middle" fill={GRAY} fontSize="10">(via critic network)</text>

          <line x1="565" y1="95" x2="595" y2="95" stroke={A} strokeWidth="2" markerEnd="url(#rl-loop-ar)" />

          <rect x="600" y="60" width="170" height="70" rx="10" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="2" />
          <text x="685" y="85" textAnchor="middle" fill={A2} fontSize="12" fontWeight="700">4. Clipped PPO Update</text>
          <text x="685" y="102" textAnchor="middle" fill={GRAY} fontSize="10">Update policy params</text>
          <text x="685" y="116" textAnchor="middle" fill={GRAY} fontSize="10">within trust region</text>

          {/* Loop arrow */}
          <path d="M 685 135 L 685 190 L 105 190 L 105 135" fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#rl-loop-ar)" />
          <text x="400" y="210" textAnchor="middle" fill={A2} fontSize="11" fontWeight="600">Repeat thousands of times</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>PPO in one sentence:</strong> Improve your policy, but not TOO MUCH in one step. Like turning a steering wheel — small, steady corrections keep you on the road. Jerking the wheel causes a crash. The clipping mechanism is the "steering limiter" that prevents catastrophic updates.</p>
      </SimpleExplain>

      <VisualCompare
        leftLabel="Vanilla Policy Gradient"
        rightLabel="PPO (Clipped)"
        leftColor={RED}
        rightColor={GREEN}
        left={
          <div>
            <p><strong>No update limits</strong></p>
            <p>Single bad sample can destroy the policy. Training loss oscillates wildly. Often diverges after thousands of stable steps. Requires tiny learning rates to compensate, making training slow.</p>
            <p style={{color: RED, fontWeight: 600, marginTop: 8}}>High variance, unstable, fragile</p>
          </div>
        }
        right={
          <div>
            <p><strong>Clipped probability ratio</strong></p>
            <p>Each update is bounded to the trust region. Training loss decreases smoothly. Robust to noisy advantage estimates. Allows larger learning rates because updates are bounded.</p>
            <p style={{color: GREEN, fontWeight: 600, marginTop: 8}}>Low variance, stable, robust</p>
          </div>
        }
        caption="PPO's clipping is the key innovation: it turns an unstable optimization into a reliable training loop"
      />

      <Callout type="insight">
        PPO requires a <strong>critic network</strong> (also called a value network) to estimate V(s) for
        computing advantages. For a 70B parameter LLM, the critic is <em>another</em> 70B model. This
        means PPO needs two full models in memory — the policy and the critic. This memory cost is
        the main motivation for GRPO (Section 06), which eliminates the critic entirely.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — RLHF: REINFORCEMENT LEARNING FROM HUMAN FEEDBACK
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="RLHF — Reinforcement Learning from Human Feedback"
        subtitle="The three-stage pipeline that turned raw LLMs into helpful, harmless assistants"
        color={A}
      />

      <Prose>
        <p>
          Here is the fundamental problem of aligning language models: <strong>how do you define "good"
          for language?</strong> For math, you can check the answer. For code, you can run tests. But for
          "write a helpful email" or "explain quantum physics to a 10-year-old" — what is the reward?
          There is no formula for "helpful" or "harmless."
        </p>
        <p>
          <H tip="RLHF (Reinforcement Learning from Human Feedback) = a training paradigm where human preferences (which response is better?) are used to train a reward model, which then guides PPO optimization. First applied to LLMs at scale by OpenAI (InstructGPT, 2022). The reward model acts as a learned proxy for human judgment." color={A}>RLHF</H> solves
          this by training a <H tip="Reward Model (RM) = a neural network trained on human preference data to predict which of two responses a human would prefer. Given a prompt and two responses (A, B), it learns to assign a higher score to the preferred one. Typically initialized from the same LLM being aligned." color={A}>reward model</H> from
          human preferences. Humans do not need to <em>write</em> perfect responses — they just need to
          <em>rank</em> them. "Response A is better than Response B." This is much easier for humans to do,
          and the reward model learns to generalize these preferences to new situations.
        </p>
        <p>
          The full pipeline has three stages, each building on the previous one. This is the recipe
          that produced <H tip="InstructGPT = OpenAI's paper (March 2022) that first demonstrated RLHF at scale for LLMs. A 1.3B model trained with RLHF outperformed a 175B model trained with SFT alone. This paper launched the RLHF revolution and directly led to ChatGPT." color={BLUE}>InstructGPT</H>,
          <H tip="ChatGPT = OpenAI's conversational AI (November 2022), which applied the InstructGPT RLHF pipeline to GPT-3.5. The RLHF stage was critical — GPT-3.5 without RLHF was much less helpful and often produced harmful or unhelpful outputs." color={BLUE}>ChatGPT</H>,
          and the first versions of <H tip="Claude = Anthropic's conversational AI, which extended RLHF with Constitutional AI (CAI), where an AI model provides some of the feedback instead of humans. This scales the feedback process while maintaining quality. Anthropic published an 80-page constitution defining what 'good' behavior means." color={PURPLE}>Claude</H>.
        </p>
      </Prose>

      <StepFlow
        color={A}
        steps={[
          {
            title: 'Stage 1: Supervised Fine-Tuning (SFT)',
            desc: 'Start with a pre-trained LLM and fine-tune it on high-quality instruction-response pairs written by human experts. This teaches the model the FORMAT of helpful responses — how to follow instructions, maintain conversation structure, and produce coherent answers. Think of it as "teaching the model to talk like a helpful assistant."',
          },
          {
            title: 'Stage 2: Reward Model Training',
            desc: 'Generate multiple responses to each prompt using the SFT model. Human annotators rank these responses from best to worst. Train a separate neural network (the reward model) to predict these human preferences. The reward model learns to assign higher scores to responses humans prefer. This is the "learned judge."',
          },
          {
            title: 'Stage 3: PPO Optimization',
            desc: 'Use the reward model as the reward function in PPO. The LLM generates responses, the reward model scores them, and PPO updates the LLM to produce higher-scoring responses. A KL penalty prevents the LLM from drifting too far from the SFT model (which prevents reward hacking and maintains coherence).',
          },
        ]}
      />

      {/* ── RLHF Pipeline SVG ── */}
      <Diagram caption={<><strong>The Complete RLHF Pipeline</strong> — Three stages: SFT teaches format, reward model learns human preferences, PPO optimizes the LLM against the reward model while a KL penalty prevents drift.</>}>
        <svg viewBox="0 0 860 500" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="rlhf-ar" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={A} />
            </marker>
            <marker id="rlhf-ar-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={BLUE} />
            </marker>
            <marker id="rlhf-ar-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={GREEN} />
            </marker>
            <marker id="rlhf-ar-p" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={PURPLE} />
            </marker>
            <linearGradient id="rlhf-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1308" />
              <stop offset="100%" stopColor="#0f0d08" />
            </linearGradient>
          </defs>

          <rect width="860" height="500" rx="12" fill="url(#rlhf-bg)" />

          {/* Stage 1: SFT */}
          <rect x="20" y="40" width="260" height="130" rx="12" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="1.5" />
          <text x="150" y="64" textAnchor="middle" fill={BLUE} fontSize="13" fontWeight="700">STAGE 1: SUPERVISED FINE-TUNING</text>

          {BOX(40, 80, 100, 40, 'Base LLM', '#1e3a5f', BLUE, 12)}
          <line x1="145" y1="100" x2="165" y2="100" stroke={BLUE} strokeWidth="2" markerEnd="url(#rlhf-ar-b)" />
          <text x="185" y="88" textAnchor="middle" fill={GRAY} fontSize="10">+ Human</text>
          <text x="185" y="102" textAnchor="middle" fill={GRAY} fontSize="10">examples</text>
          <line x1="205" y1="100" x2="220" y2="100" stroke={BLUE} strokeWidth="2" markerEnd="url(#rlhf-ar-b)" />
          <text x="255" y="105" textAnchor="middle" fill={BLUE} fontSize="11" fontWeight="600">SFT Model</text>
          <rect x="225" y="88" width="60" height="24" rx="6" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1" />
          <text x="150" y="155" textAnchor="middle" fill={GRAY} fontSize="10" fontStyle="italic">Learns to follow instructions</text>

          {/* Stage 2: Reward Model */}
          <rect x="300" y="40" width="260" height="130" rx="12" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1.5" />
          <text x="430" y="64" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="700">STAGE 2: REWARD MODEL</text>

          {BOX(320, 80, 90, 40, 'SFT Model', '#1a3d2e', GREEN, 11)}
          <text x="365" y="134" textAnchor="middle" fill={GRAY} fontSize="10">Generates</text>
          <line x1="415" y1="100" x2="430" y2="100" stroke={GREEN} strokeWidth="2" markerEnd="url(#rlhf-ar-g)" />
          <text x="460" y="88" textAnchor="middle" fill={FG} fontSize="10">Response A</text>
          <text x="460" y="102" textAnchor="middle" fill={FG} fontSize="10">Response B</text>
          <line x1="490" y1="100" x2="505" y2="100" stroke={GREEN} strokeWidth="2" markerEnd="url(#rlhf-ar-g)" />
          <text x="530" y="95" textAnchor="middle" fill={GREEN} fontSize="10">Human</text>
          <text x="530" y="109" textAnchor="middle" fill={GREEN} fontSize="10">ranks</text>
          <text x="430" y="155" textAnchor="middle" fill={GRAY} fontSize="10" fontStyle="italic">Learns what humans prefer</text>

          {/* Stage 3: PPO */}
          <rect x="580" y="40" width="260" height="130" rx="12" fill={A} fillOpacity="0.10" stroke={A} strokeWidth="2" />
          <text x="710" y="64" textAnchor="middle" fill={A} fontSize="13" fontWeight="700">STAGE 3: PPO OPTIMIZATION</text>

          {BOX(600, 82, 80, 36, 'LLM', A3, '#fff', 12)}
          <line x1="685" y1="100" x2="705" y2="100" stroke={A} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          <text x="730" y="88" textAnchor="middle" fill={FG} fontSize="10">Response</text>
          <line x1="755" y1="100" x2="775" y2="100" stroke={A} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          <text x="805" y="95" textAnchor="middle" fill={A2} fontSize="10">Reward</text>
          <text x="805" y="109" textAnchor="middle" fill={A2} fontSize="10">Model</text>
          <text x="710" y="155" textAnchor="middle" fill={GRAY} fontSize="10" fontStyle="italic">Optimizes LLM using reward scores</text>

          {/* Arrows between stages */}
          <line x1="280" y1="105" x2="300" y2="105" stroke={A} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          <line x1="560" y1="105" x2="580" y2="105" stroke={A} strokeWidth="2" markerEnd="url(#rlhf-ar)" />

          {/* Detailed PPO loop below */}
          <rect x="30" y="200" width="800" height="280" rx="12" fill={A} fillOpacity="0.04" stroke={A} strokeWidth="1" strokeDasharray="6 4" />
          <text x="430" y="225" textAnchor="middle" fill={A} fontSize="14" fontWeight="700" letterSpacing="1">STAGE 3 DETAIL — THE PPO LOOP</text>

          {/* Prompt */}
          {BOX(50, 255, 120, 50, 'Prompt', '#2a2008', A2, 13)}

          <line x1="175" y1="280" x2="210" y2="280" stroke={A} strokeWidth="2" markerEnd="url(#rlhf-ar)" />

          {/* Policy LLM */}
          <rect x="215" y="250" width="130" height="60" rx="10" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="2" />
          <text x="280" y="275" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">Policy LLM</text>
          <text x="280" y="295" textAnchor="middle" fill={GRAY} fontSize="10">(being trained)</text>

          <line x1="350" y1="280" x2="385" y2="280" stroke={A} strokeWidth="2" markerEnd="url(#rlhf-ar)" />

          {/* Response */}
          {BOX(390, 255, 120, 50, 'Response y', '#1e2a14', GREEN, 12)}

          <line x1="515" y1="280" x2="550" y2="280" stroke={GREEN} strokeWidth="2" markerEnd="url(#rlhf-ar-g)" />

          {/* Reward Model */}
          <rect x="555" y="250" width="130" height="60" rx="10" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1.5" />
          <text x="620" y="275" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700">Reward Model</text>
          <text x="620" y="295" textAnchor="middle" fill={GRAY} fontSize="10">(frozen)</text>

          <line x1="690" y1="280" x2="715" y2="280" stroke={GREEN} strokeWidth="2" markerEnd="url(#rlhf-ar-g)" />

          {/* Reward Score */}
          <rect x="720" y="260" width="90" height="40" rx="8" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="765" y="284" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">r = 0.85</text>

          {/* KL Penalty */}
          <rect x="215" y="340" width="320" height="45" rx="8" fill={PURPLE} fillOpacity="0.08" stroke={PURPLE} strokeWidth="1" />
          <text x="375" y="358" textAnchor="middle" fill={PURPLE} fontSize="11" fontWeight="600">KL Penalty: D_KL(π_θ || π_SFT)</text>
          <text x="375" y="374" textAnchor="middle" fill={GRAY} fontSize="10">Prevents policy from drifting too far from SFT model</text>

          {/* PPO Update */}
          <rect x="560" y="340" width="250" height="45" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="685" y="358" textAnchor="middle" fill={A} fontSize="11" fontWeight="600">PPO Update: r * A - β * KL</text>
          <text x="685" y="374" textAnchor="middle" fill={GRAY} fontSize="10">Clipped update → improved policy</text>

          {/* Arrow from reward to PPO update */}
          <line x1="765" y1="305" x2="765" y2="340" stroke={A} strokeWidth="1.5" markerEnd="url(#rlhf-ar)" />
          <line x1="535" y1="362" x2="560" y2="362" stroke={PURPLE} strokeWidth="1.5" markerEnd="url(#rlhf-ar-p)" />

          {/* Loop back */}
          <path d="M 685 390 L 685 455 L 280 455 L 280 315" fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="6 4" markerEnd="url(#rlhf-ar)" />
          <text x="480" y="470" textAnchor="middle" fill={A2} fontSize="11" fontWeight="600">Updated policy generates better responses next iteration</text>
        </svg>
      </Diagram>

      <FormulaSteps
        label="RLHF Math — Reward Model Loss and PPO Objective"
        color={A}
        steps={[
          {
            note: 'The reward model learns from human preference pairs. Given a prompt x, a preferred response y_w (winner), and a rejected response y_l (loser), the Bradley-Terry model says the probability of the human preference is a sigmoid of the score difference.',
            math: 'L_{\\text{RM}} = -\\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma\\!\\left( r_\\phi(x, y_w) - r_\\phi(x, y_l) \\right) \\right]',
          },
          {
            note: 'The PPO objective for RLHF: maximize the reward model score while staying close to the SFT model via KL divergence. Beta controls the trade-off — too low and the model reward-hacks, too high and it never improves beyond SFT.',
            math: '\\max_{\\pi_\\theta}\\; \\mathbb{E}_{x \\sim D,\\, y \\sim \\pi_\\theta(\\cdot|x)} \\left[ r_\\phi(x, y) - \\beta\\, D_{\\text{KL}}\\!\\left( \\pi_\\theta(\\cdot|x) \\,\\|\\, \\pi_{\\text{SFT}}(\\cdot|x) \\right) \\right]',
          },
        ]}
        symbols={[
          { symbol: 'r_\\phi', meaning: 'Reward model — learned function that scores response quality' },
          { symbol: '\\sigma', meaning: 'Sigmoid function — maps score difference to probability [0,1]' },
          { symbol: 'y_w, y_l', meaning: 'Winner and loser responses (from human ranking)' },
          { symbol: '\\beta', meaning: 'KL penalty coefficient — typically 0.01 to 0.1' },
          { symbol: 'D_{\\text{KL}}', meaning: 'KL divergence — measures how far the policy has drifted from SFT' },
        ]}
      />

      <SimpleExplain>
        <p><strong>RLHF in three sentences:</strong> Step 1: Teach the model to talk like a helpful assistant (SFT). Step 2: Teach a separate judge what "good" means by showing it thousands of human preferences — "this response is better than that one" (reward model). Step 3: Let the model practice generating responses while the judge scores them, and use PPO to improve (RL optimization). The model gets better because it learns what the judge likes, and the judge was trained on what HUMANS like.</p>
      </SimpleExplain>

      <ComparisonTable
        headers={['Aspect', 'SFT Alone', 'SFT + RLHF']}
        rows={[
          ['Follows instructions', 'Good', 'Excellent'],
          ['Refuses harmful requests', 'Inconsistent', 'Reliable'],
          ['Admits uncertainty', 'Rarely — hallucinates confidently', 'More often — "I\'m not sure"'],
          ['Helpfulness ranking', 'Good for format, weak on substance', 'Strong on both'],
          ['Human preference win rate', 'Baseline', '70-85% preferred over SFT alone'],
          ['Cost', 'Low (just labeled data)', 'High (reward model + PPO infra)'],
        ]}
        caption="InstructGPT showed that a 1.3B RLHF model was preferred over a 175B SFT model — alignment > scale"
      />

      <Callout type="key">
        The reward model is the secret weapon of RLHF — and its biggest vulnerability. A bad reward
        model means a model that is good at <em>gaming metrics</em> but bad at being <em>actually helpful</em>.
        This is called <strong>reward hacking</strong>. It is why Anthropic published an 80-page
        constitution for Claude — to ensure the reward model captures what humans truly value,
        not just what is easy to measure.
      </Callout>

      <MentalModel
        title="The Teacher, the Judge, and the Student"
        analogy="Stage 1 (SFT) = a teacher shows the student how to write good essays by giving examples. Stage 2 (Reward Model) = training an essay judge by showing them thousands of essay pairs and asking 'which is better?' Stage 3 (PPO) = the student writes essays, the judge grades them, and the student improves based on the grades. The judge never writes essays themselves — they just know good from bad."
        technical="The reward model is trained as a binary classifier on preference pairs using the Bradley-Terry model. The PPO objective then maximizes E[r(x,y)] - beta * KL(pi || pi_SFT). The KL term prevents 'reward hacking' — the model finding degenerate outputs that score high on the learned reward but are actually low quality. Typical beta values are 0.01-0.1."
        color={A}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — DPO: DIRECT PREFERENCE OPTIMIZATION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="DPO — Direct Preference Optimization"
        subtitle="The elegant simplification: skip the reward model, train directly on preferences"
        color={A}
      />

      <Prose>
        <p>
          RLHF works, but it is <em>complex</em>. You need to train a reward model, run PPO with a critic
          network, manage instability, and tune multiple hyperparameters. In 2023,
          <H tip="Rafailov et al. = researchers at Stanford who published DPO (Direct Preference Optimization) in 2023. The key insight was that the RLHF objective can be analytically rearranged into a simple classification loss, eliminating the need for a separate reward model and PPO entirely." color={A}>Rafailov et al. at Stanford</H> asked
          a brilliant question: <strong>what if you do not need a separate reward model at all?</strong>
        </p>
        <p>
          Their insight was mathematical: the <H tip="Optimal policy in RLHF = the closed-form solution to the RLHF objective. It turns out that if you solve the KL-constrained reward maximization analytically, the optimal policy has a specific relationship to the reward model. This means you can express the reward model in terms of the policy — eliminating the need to train it separately." color={A}>optimal RLHF policy</H> has
          a specific closed-form relationship to the reward model. You can rearrange the math so that
          the reward model disappears entirely, replaced by a simple comparison between the current
          policy and a reference policy. The result: <H tip="DPO (Direct Preference Optimization) = a training algorithm that achieves the same goal as RLHF (optimizing human preferences) but with a single-stage supervised loss instead of a complex RL pipeline. No reward model, no PPO, no critic — just one loss function applied directly to preference pairs." color={A}>DPO</H> — a
          single supervised loss function that achieves the same goal as RLHF without any reinforcement
          learning at all.
        </p>
        <p>
          Where RLHF needs three stages and two extra models (reward model + critic), DPO needs
          <strong> one stage and zero extra models</strong>. It is a classification loss applied directly
          to preference pairs: "make the model more likely to produce the preferred response and less
          likely to produce the rejected one."
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '3→1', unit: ' stages', label: 'Pipeline simplification', color: A },
          { value: '0', unit: '', label: 'Extra models needed', color: GREEN },
          { value: '45%', unit: '', label: 'Adoption increase in 2025', color: BLUE },
          { value: '1', unit: ' loss', label: 'Simple cross-entropy', color: PURPLE },
        ]}
      />

      <FormulaSteps
        label="DPO Derivation — From RLHF to a Single Loss"
        color={A}
        steps={[
          {
            note: 'Start with the RLHF objective: maximize reward minus KL penalty. This is the same objective from Section 04.',
            math: '\\max_{\\pi}\\; \\mathbb{E}_{x, y \\sim \\pi} \\left[ r(x, y) - \\beta\\, D_{\\text{KL}}(\\pi \\| \\pi_{\\text{ref}}) \\right]',
          },
          {
            note: 'The optimal solution to this constrained optimization has a closed form. The optimal policy pi* is proportional to the reference policy weighted by the exponentiated reward. Z is a normalizing constant.',
            math: '\\pi^*(y \\mid x) = \\frac{1}{Z(x)} \\pi_{\\text{ref}}(y \\mid x) \\cdot \\exp\\!\\left( \\frac{r(x, y)}{\\beta} \\right)',
          },
          {
            note: 'KEY INSIGHT: rearrange to express the reward in terms of the policy. This means the reward model is IMPLICIT in the policy — you do not need to train it separately!',
            math: 'r(x, y) = \\beta \\log \\frac{\\pi^*(y \\mid x)}{\\pi_{\\text{ref}}(y \\mid x)} + \\beta \\log Z(x)',
          },
          {
            note: 'Substitute this implicit reward into the Bradley-Terry preference model. The Z(x) terms cancel (they are the same for both responses to the same prompt). What remains is the DPO loss — a simple classification objective on preference pairs.',
            math: 'L_{\\text{DPO}}(\\theta) = -\\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma\\!\\left( \\beta \\log \\frac{\\pi_\\theta(y_w \\mid x)}{\\pi_{\\text{ref}}(y_w \\mid x)} - \\beta \\log \\frac{\\pi_\\theta(y_l \\mid x)}{\\pi_{\\text{ref}}(y_l \\mid x)} \\right) \\right]',
          },
        ]}
        symbols={[
          { symbol: '\\pi_{\\text{ref}}', meaning: 'Reference policy — the SFT model (frozen, used as anchor)' },
          { symbol: 'y_w, y_l', meaning: 'Preferred (winner) and rejected (loser) responses' },
          { symbol: '\\beta', meaning: 'Temperature — controls how far the policy can drift from reference' },
          { symbol: '\\sigma', meaning: 'Sigmoid function — turns the log-ratio difference into a probability' },
          { symbol: 'Z(x)', meaning: 'Partition function — cancels out in the loss (key mathematical insight)' },
        ]}
      />

      <FormulaBlock
        math="L_{\text{DPO}} = -\log \sigma\!\left( \beta \left[ \log \frac{\pi_\theta(y_w | x)}{\pi_{\text{ref}}(y_w | x)} - \log \frac{\pi_\theta(y_l | x)}{\pi_{\text{ref}}(y_l | x)} \right] \right)"
        label="The DPO Loss — One Line That Replaces RLHF"
        color={A}
        symbols={[
          { symbol: 'Intuition', meaning: 'Increase the relative probability of the preferred response vs the rejected one, measured against a reference policy' },
        ]}
      />

      {/* ── RLHF vs DPO Pipeline SVG ── */}
      <Diagram caption={<><strong>RLHF vs DPO</strong> — RLHF needs three stages, a reward model, PPO, and a critic. DPO collapses everything into a single supervised training stage.</>}>
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="dpo-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1308" />
              <stop offset="100%" stopColor="#0f0d08" />
            </linearGradient>
          </defs>

          <rect width="800" height="380" rx="12" fill="url(#dpo-bg)" />

          {/* RLHF Pipeline (top) */}
          <text x="400" y="28" textAnchor="middle" fill={RED} fontSize="13" fontWeight="700" letterSpacing="1.5">RLHF — THREE STAGES, COMPLEX</text>

          {BOX(30, 50, 110, 45, 'Pre-trained', '#2d1a1a', RED, 11)}
          <line x1="145" y1="72" x2="165" y2="72" stroke={RED} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          {BOX(170, 50, 90, 45, 'SFT', '#2d1a1a', RED, 12)}
          <line x1="265" y1="72" x2="285" y2="72" stroke={RED} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          {BOX(290, 50, 120, 45, 'Train RM', '#2d1a1a', RED, 12)}
          <line x1="415" y1="72" x2="435" y2="72" stroke={RED} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          {BOX(440, 50, 100, 45, 'PPO', '#2d1a1a', RED, 12)}
          <line x1="545" y1="72" x2="565" y2="72" stroke={RED} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          {BOX(570, 50, 100, 45, 'Critic', '#2d1a1a', RED, 12)}
          <line x1="675" y1="72" x2="695" y2="72" stroke={RED} strokeWidth="2" markerEnd="url(#rlhf-ar)" />
          {BOX(700, 50, 80, 45, 'Aligned', '#2d2d08', A3, 11)}

          <text x="400" y="118" textAnchor="middle" fill={RED} fontSize="11">3 stages, 2 extra models (RM + critic), many hyperparameters, unstable training</text>

          {/* Divider */}
          <line x1="50" y1="145" x2="750" y2="145" stroke={GRAY} strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <text x="400" y="160" textAnchor="middle" fill={GRAY} fontSize="10" fontStyle="italic">vs</text>

          {/* DPO Pipeline (bottom) */}
          <text x="400" y="190" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="700" letterSpacing="1.5">DPO — ONE STAGE, SIMPLE</text>

          {BOX(100, 210, 130, 50, 'SFT Model', '#1a2d1a', GREEN, 13)}
          <line x1="235" y1="235" x2="280" y2="235" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#rlhf-ar-g)" />

          <rect x="285" y="205" width="230" height="60" rx="12" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2" />
          <text x="400" y="230" textAnchor="middle" fill={GREEN} fontSize="14" fontWeight="700">DPO Loss</text>
          <text x="400" y="250" textAnchor="middle" fill={GRAY} fontSize="11">On preference pairs (y_w, y_l)</text>

          <line x1="520" y1="235" x2="565" y2="235" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#rlhf-ar-g)" />
          {BOX(570, 210, 130, 50, 'Aligned', '#1a2d1a', GREEN, 13)}

          <text x="400" y="290" textAnchor="middle" fill={GREEN} fontSize="11">1 stage, 0 extra models, 1 hyperparameter (β), stable supervised training</text>

          {/* Comparison box */}
          <rect x="120" y="310" width="560" height="55" rx="10" fill="#1a1a2e" stroke="#334155" strokeWidth="1" />
          <text x="400" y="332" textAnchor="middle" fill={FG} fontSize="12" fontWeight="700">Why does this work?</text>
          <text x="400" y="350" textAnchor="middle" fill={GRAY} fontSize="11">The reward model is IMPLICIT in the policy. DPO extracts it mathematically — no need to train it separately.</text>
        </svg>
      </Diagram>

      <VisualCompare
        leftLabel="RLHF"
        rightLabel="DPO"
        leftColor={RED}
        rightColor={GREEN}
        left={
          <div>
            <p><strong>Three-stage pipeline</strong></p>
            <p>Requires reward model (extra model to train and store). Requires PPO with critic (yet another model). Sensitive to hyperparameters. Training can be unstable — reward hacking, mode collapse. Needs careful KL tuning.</p>
            <p style={{marginTop: 8}}><strong>Models in memory:</strong> 3-4 (policy + reference + RM + critic)</p>
          </div>
        }
        right={
          <div>
            <p><strong>Single-stage supervised loss</strong></p>
            <p>No reward model needed. No PPO or critic. Just one cross-entropy loss on preference pairs. Training is as stable as supervised learning. One hyperparameter (beta).</p>
            <p style={{marginTop: 8}}><strong>Models in memory:</strong> 2 (policy + reference)</p>
          </div>
        }
        caption="DPO dramatically simplifies the alignment pipeline while achieving comparable quality on many benchmarks"
      />

      <SimpleExplain>
        <p><strong>DPO in everyday terms:</strong> RLHF says: "first train a judge, then train the student based on the judge's scores." DPO says: "skip the judge entirely — just show the student pairs of good and bad answers and let it figure out the pattern directly." It turns out this works because the student can IMPLICITLY learn what the judge would have scored, without ever building the judge.</p>
      </SimpleExplain>

      <Callout type="insight">
        DPO adoption increased 45% in 2025 — it is now the default for many open-source models
        (Llama, Mistral, Zephyr). But frontier labs like OpenAI and Anthropic still use RLHF for
        their most capable models. Why? DPO has a ceiling: it can only optimize preferences as
        well as the preference data covers. RLHF with online PPO can <em>explore</em> new behaviors
        the data never showed. For the hardest alignment challenges, exploration matters.
      </Callout>

      <ConceptCard title="When to Use DPO vs RLHF" color={A} defaultOpen={false}>
        <Prose>
          <p>
            <strong>Use DPO when:</strong> You have good preference data, want simple training, do not need
            the model to discover novel behaviors, and are fine-tuning an already capable base model.
            Most open-source alignment projects use DPO because it is easy to implement and stable.
          </p>
          <p>
            <strong>Use RLHF when:</strong> You are training a frontier model, need the model to explore
            beyond the preference data, have the infrastructure for PPO, and are willing to invest in
            reward model quality. The ability to generate new responses and score them online gives
            RLHF an edge on the hardest problems.
          </p>
        </Prose>
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — GRPO: GROUP RELATIVE POLICY OPTIMIZATION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="GRPO — Group Relative Policy Optimization"
        subtitle="DeepSeek's innovation: eliminate the critic, use group comparisons instead"
        color={A}
      />

      <Prose>
        <p>
          PPO requires a <H tip="Critic / value network = a separate neural network V(s) that estimates the expected future reward from each state. Used to compute advantages: A(s,a) = reward - V(s). For a 70B LLM, the critic is another 70B model — doubling memory requirements. For DeepSeek-V3 at 671B parameters, keeping two copies is extremely expensive." color={RED}>critic network</H> — a
          second model as large as the policy itself — just to compute advantages. For DeepSeek-V3 at
          671 billion parameters, that means keeping <em>two</em> 671B models in memory simultaneously.
          This is not just expensive — it is a fundamental scalability bottleneck.
        </p>
        <p>
          <H tip="GRPO (Group Relative Policy Optimization) = an RL algorithm by DeepSeek that completely eliminates the critic network. Instead of using a learned value function to estimate baselines, GRPO samples a GROUP of G responses to the same prompt, scores all of them, and uses the group statistics (mean and standard deviation) as the baseline. The advantage of each response is its normalized deviation from the group mean." color={A}>GRPO (Group Relative Policy Optimization)</H> eliminates
          the critic entirely with an elegant trick: for each prompt, generate <strong>G responses</strong> (typically
          G=8 to 64), score all of them, and compute advantages by comparing each response to the
          <em> group average</em>. No learned value function, no critic network — just simple statistics
          within the group.
        </p>
        <p>
          The intuition: if you generate 8 answers to the same math problem, and 3 are correct while
          5 are wrong, you do not need a critic to tell you which ones are good. The correct ones are
          above average, the wrong ones are below. <strong>The group IS the baseline.</strong>
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '~50%', unit: '', label: 'Memory saved vs PPO', color: GREEN },
          { value: '0', unit: '', label: 'Critic parameters needed', color: A },
          { value: 'G=64', unit: '', label: 'Typical group size', color: BLUE },
          { value: '671B', unit: '', label: 'Trained DeepSeek-R1', color: PURPLE },
        ]}
      />

      <FormulaSteps
        label="GRPO — From PPO Advantage to Group Baseline"
        color={A}
        steps={[
          {
            note: 'PPO computes advantages using a learned critic: A = reward - V(s). This requires training and storing a separate value network V(s) of the same size as the policy.',
            math: 'A^{\\text{PPO}}_t = r_t - V_\\phi(s_t) \\quad \\text{(requires critic } V_\\phi \\text{)}',
          },
          {
            note: 'GRPO generates a group of G complete responses for the same prompt q. Each response o_i gets a reward r_i. No critic needed for this step — just a reward function.',
            math: '\\{o_1, \\ldots, o_G\\} \\sim \\pi_{\\theta_{\\text{old}}}(\\cdot \\mid q), \\quad r_i = R(q, o_i)',
          },
          {
            note: 'THE GRPO TRICK: compute each response\'s advantage as its z-score within the group. The group mean replaces the critic. Responses above average get positive advantage (reinforced), below average get negative (suppressed).',
            math: '\\hat{A}_i = \\frac{r_i - \\text{mean}(r_1, \\ldots, r_G)}{\\text{std}(r_1, \\ldots, r_G)}',
          },
          {
            note: 'The full GRPO objective: clipped surrogate (like PPO) weighted by group-relative advantages, minus KL penalty to prevent drift from the reference policy.',
            math: '\\mathcal{J}_{\\text{GRPO}} = \\mathbb{E}_q \\left[ \\frac{1}{G} \\sum_{i=1}^{G} \\min\\!\\left( \\frac{\\pi_\\theta(o_i|q)}{\\pi_{\\theta_{\\text{old}}}(o_i|q)} \\hat{A}_i,\\; \\text{clip}(\\cdot, 1\\!-\\!\\varepsilon, 1\\!+\\!\\varepsilon)\\hat{A}_i \\right) - \\beta D_{\\text{KL}}(\\pi_\\theta \\| \\pi_{\\text{ref}}) \\right]',
          },
        ]}
        symbols={[
          { symbol: 'G', meaning: 'Group size — typically 8-64 responses per prompt' },
          { symbol: '\\hat{A}_i', meaning: 'Group-relative advantage — z-score of reward within the group' },
          { symbol: '\\varepsilon', meaning: 'Clipping parameter (same as PPO) — stability guard' },
          { symbol: '\\beta', meaning: 'KL penalty weight — prevents catastrophic drift' },
        ]}
      />

      {/* ── GRPO Visual SVG ── */}
      <Diagram caption={<><strong>GRPO in Action</strong> — One prompt generates 8 responses. Each is scored. The group average becomes the baseline. Better-than-average responses are reinforced; worse ones are suppressed.</>}>
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="grpo2-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1308" />
              <stop offset="100%" stopColor="#0f0d08" />
            </linearGradient>
          </defs>

          <rect width="800" height="400" rx="12" fill="url(#grpo2-bg)" />
          <text x="400" y="28" textAnchor="middle" fill={A} fontSize="13" fontWeight="700" letterSpacing="1.5">GRPO — GROUP RELATIVE POLICY OPTIMIZATION</text>

          {/* Prompt */}
          <rect x="30" y="50" width="160" height="55" rx="10" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="2" />
          <text x="110" y="72" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">Prompt q</text>
          <text x="110" y="90" textAnchor="middle" fill={GRAY} fontSize="10">"Solve: 3x + 7 = 22"</text>

          {/* Arrow to group */}
          <line x1="195" y1="77" x2="230" y2="77" stroke={A} strokeWidth="2" markerEnd="url(#rlhf-ar)" />

          {/* 8 Response boxes */}
          {[0,1,2,3,4,5,6,7].map(i => {
            const correct = [0, 2, 4].includes(i);
            const y = 45 + i * 42;
            const col = correct ? GREEN : RED;
            const score = correct ? '1.0' : '0.0';
            return (
              <g key={`resp-${i}`}>
                <rect x="240" y={y} width="120" height="34" rx="7" fill={col} fillOpacity="0.08" stroke={col} strokeWidth="1" />
                <text x="300" y={y + 21} textAnchor="middle" fill={col} fontSize="11" fontWeight="600">
                  {`o${i + 1}: ${correct ? 'x = 5 ✓' : 'x = 3 ✗'}`}
                </text>
                {/* Score */}
                <text x="380" y={y + 21} textAnchor="start" fill={col} fontSize="10">r = {score}</text>
              </g>
            );
          })}

          {/* Group stats */}
          <rect x="430" y="100" width="170" height="80" rx="10" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="1.5" />
          <text x="515" y="122" textAnchor="middle" fill={A} fontSize="12" fontWeight="700">Group Statistics</text>
          <text x="515" y="142" textAnchor="middle" fill={FG} fontSize="11">mean(r) = 0.375</text>
          <text x="515" y="160" textAnchor="middle" fill={FG} fontSize="11">std(r) = 0.484</text>
          <text x="515" y="176" textAnchor="middle" fill={GRAY} fontSize="9">Replaces the critic network!</text>

          {/* Advantage computation */}
          <rect x="430" y="200" width="170" height="120" rx="10" fill={GREEN} fillOpacity="0.06" stroke={GREEN} strokeWidth="1" />
          <text x="515" y="222" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700">Advantages</text>
          <text x="515" y="244" textAnchor="middle" fill={GREEN} fontSize="11">Correct: A = +1.29</text>
          <text x="515" y="262" textAnchor="middle" fill={GRAY} fontSize="10">(above average → reinforce)</text>
          <text x="515" y="284" textAnchor="middle" fill={RED} fontSize="11">Wrong: A = -0.77</text>
          <text x="515" y="302" textAnchor="middle" fill={GRAY} fontSize="10">(below average → suppress)</text>

          {/* Policy update */}
          <rect x="640" y="130" width="140" height="100" rx="12" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="2" />
          <text x="710" y="158" textAnchor="middle" fill={A} fontSize="13" fontWeight="700">Policy Update</text>
          <text x="710" y="178" textAnchor="middle" fill={GREEN} fontSize="11">↑ P(correct answers)</text>
          <text x="710" y="198" textAnchor="middle" fill={RED} fontSize="11">↓ P(wrong answers)</text>
          <text x="710" y="218" textAnchor="middle" fill={GRAY} fontSize="9">Clipped, like PPO</text>

          {/* Arrows */}
          <line x1="605" y1="140" x2="640" y2="170" stroke={A} strokeWidth="1.5" markerEnd="url(#rlhf-ar)" />
          <line x1="605" y1="260" x2="640" y2="200" stroke={A} strokeWidth="1.5" markerEnd="url(#rlhf-ar)" />

          {/* Bottom insight */}
          <rect x="100" y="350" width="600" height="35" rx="8" fill="#1a1a2e" stroke="#334155" strokeWidth="1" />
          <text x="400" y="372" textAnchor="middle" fill={A2} fontSize="12" fontWeight="600">No critic network needed — the group of responses IS the baseline. 50% memory savings.</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>GRPO in everyday terms:</strong> Imagine 8 students all answer the same exam question. Instead of hiring a teacher to grade them (critic network), they grade each other relatively — "yours is better than average, yours is worse than average." The best answers get reinforced, the worst get discouraged. No teacher salary needed, and the relative ranking is often more reliable than an absolute grade anyway.</p>
      </SimpleExplain>

      <ComparisonTable
        headers={['Property', 'PPO', 'DPO', 'GRPO']}
        rows={[
          ['Extra models needed', 'Critic + Reward Model', 'Reference only', 'Reference only'],
          ['Memory overhead', 'High (2x policy size)', 'Low (1x reference)', 'Low (1x reference)'],
          ['Compute cost', 'High (critic training)', 'Low (supervised loss)', 'Medium (G forward passes)'],
          ['Training stability', 'Moderate (many hyperparams)', 'High (supervised)', 'High (simple statistics)'],
          ['Exploration ability', 'Strong (online generation)', 'Weak (offline data only)', 'Strong (online generation)'],
          ['Best for', 'Frontier alignment', 'Quick alignment, open models', 'Reasoning, math, code'],
          ['Used by', 'ChatGPT, Claude', 'Llama, Mistral, Zephyr', 'DeepSeek-R1, DeepSeek-V3'],
        ]}
        caption="Each algorithm makes different trade-offs. There is no universally 'best' choice — it depends on your constraints."
      />

      <MentalModel
        title="The Tournament Without Judges"
        analogy="PPO is like a boxing tournament with a panel of expert judges (the critic) who score each round. Expensive — you need to hire, train, and pay the judges. GRPO is like a round-robin tournament where fighters are ranked by their win/loss record against each other — no judges needed. The 'advantage' is simply: did you win more or fewer bouts than the average fighter? Cheaper, faster, and the relative rankings are surprisingly accurate."
        technical="GRPO replaces the learned value baseline V(s) in PPO with the empirical group mean E[r_i]. This eliminates O(N) critic parameters and their training compute. The variance of the group-mean baseline is O(1/G), so larger groups give more stable training. DeepSeek found G=64 provides a good trade-off between compute and stability."
        color={A}
      />

      <Callout type="key">
        GRPO is what made DeepSeek-R1 possible. Training a critic for reasoning tasks is nearly
        impossible — how do you estimate the "value" of a partial chain-of-thought? Is "Let me
        think about this differently..." a high-value state or a low-value one? You cannot know
        until the reasoning is complete. GRPO sidesteps this entirely by only using complete
        response rewards.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — RLVR & THE FRONTIER
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="RLVR and Beyond — The Frontier (2025-2026)"
        subtitle="Verifiable rewards, the reasoning debate, and what comes next for RL + LLMs"
        color={A}
      />

      <Prose>
        <p>
          Every method we have seen so far relies on some form of <em>subjective</em> feedback — human
          preferences, reward models, or group comparisons. But for math, code, and logic, there is
          an obvious alternative: just check if the answer is correct.
          <H tip="RLVR (Reinforcement Learning with Verifiable Rewards) = using automatically verifiable signals (unit tests, math solvers, logic checkers, formal proofs) as the reward function in RL. No human feedback, no learned reward model — just 'is the answer correct?' Binary reward (0 or 1), but infinitely scalable." color={A}>RLVR (Reinforcement Learning with Verifiable Rewards)</H> does
          exactly this: the reward is not a human preference or a learned model — it is a
          <H tip="Verifiable reward = a reward that can be computed automatically and objectively. For math: parse the final answer and check against ground truth. For code: run the function against test cases. For logic: check if the proof is valid. These rewards are essentially free to generate at scale." color={GREEN}>verifiable ground truth</H>.
          Run the code. Check the math. Verify the proof.
        </p>
        <p>
          No human feedback needed. No reward model needed. Just "is the answer right?" This makes
          RLVR the cheapest and most scalable form of RL for LLMs — and it is the primary training
          signal behind <H tip="DeepSeek-R1 = DeepSeek's reasoning model that used GRPO with verifiable rewards (math correctness, code test cases) to develop chain-of-thought reasoning from scratch. R1-Zero used purely verifiable rewards; the full R1 added a small amount of SFT data for format." color={A}>DeepSeek-R1</H>'s
          mathematical and coding capabilities.
        </p>
      </Prose>

      <StepFlow
        color={A}
        steps={[
          {
            title: 'Math Problems',
            desc: 'The model generates a chain-of-thought solution. The final numerical answer is extracted and compared to the ground truth. Reward = 1 if correct, 0 if wrong. No human judgment needed — just string matching on the final answer.',
          },
          {
            title: 'Code Generation',
            desc: 'The model writes a function. The function is executed against a suite of unit tests. Reward = fraction of tests passed. Fully automatic — the test suite IS the reward function.',
          },
          {
            title: 'Formal Logic / Proofs',
            desc: 'The model generates a proof in a formal language (Lean, Isabelle). A theorem prover checks if the proof is valid. Binary reward: valid proof = 1, invalid = 0. Absolute certainty — no ambiguity.',
          },
        ]}
      />

      <ConceptCard title="The Great Debate: Does RLVR Actually Teach Reasoning?" color={A} defaultOpen={true}>
        <Prose>
          <p>
            This is the most controversial question in the field right now. There are two camps:
          </p>
          <p>
            <strong>Camp 1: "Yes, RL teaches genuine reasoning."</strong> Evidence: R1-Zero spontaneously
            developed chain-of-thought, self-verification, and reflection — behaviors never present in
            the base model. The model did not just memorize answers; it learned <em>strategies</em> for
            finding answers. Pass@1 accuracy increases smoothly with training, suggesting the model is
            learning generalizable skills.
          </p>
          <p>
            <strong>Camp 2: "No, RL just optimizes sampling."</strong> Evidence: some studies show that
            RLVR primarily teaches the model to <em>allocate compute better</em> — generating more tokens
            for harder problems — rather than learning new reasoning capabilities. The base model
            already "knows" how to solve these problems; RLVR just makes it more likely to
            activate that knowledge by encouraging longer, more careful outputs.
          </p>
          <p>
            The truth is likely somewhere in between: RLVR both <em>surfaces existing capabilities</em> and
            <em>composes them in novel ways</em>, creating emergent strategies that the base model could
            not reliably produce on its own.
          </p>
        </Prose>
      </ConceptCard>

      {/* ── Evolution Timeline SVG ── */}
      <Diagram caption={<><strong>The RL Alignment Evolution</strong> — From RLHF in 2022 to RLVR in 2025, each method simplifies or extends the previous one. The trend: less human involvement, more scalable rewards.</>}>
        <svg viewBox="0 0 860 320" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="timeline-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1308" />
              <stop offset="100%" stopColor="#0f0d08" />
            </linearGradient>
          </defs>

          <rect width="860" height="320" rx="12" fill="url(#timeline-bg)" />
          <text x="430" y="28" textAnchor="middle" fill={A} fontSize="13" fontWeight="700" letterSpacing="1.5">THE RL FOR LLMS EVOLUTION — 2022 TO 2026</text>

          {/* Timeline line */}
          <line x1="60" y1="100" x2="810" y2="100" stroke={A} strokeWidth="2" opacity="0.4" />

          {/* 2022: RLHF */}
          <circle cx="120" cy="100" r="8" fill={A} />
          <text x="120" y="80" textAnchor="middle" fill={A2} fontSize="12" fontWeight="700">2022</text>
          <rect x="60" y="120" width="120" height="75" rx="8" fill={BLUE} fillOpacity="0.10" stroke={BLUE} strokeWidth="1" />
          <text x="120" y="140" textAnchor="middle" fill={BLUE} fontSize="13" fontWeight="700">RLHF</text>
          <text x="120" y="158" textAnchor="middle" fill={GRAY} fontSize="10">Human prefs +</text>
          <text x="120" y="172" textAnchor="middle" fill={GRAY} fontSize="10">Reward Model + PPO</text>
          <text x="120" y="188" textAnchor="middle" fill={BLUE} fontSize="9">InstructGPT, ChatGPT</text>

          {/* 2023: DPO */}
          <circle cx="290" cy="100" r="8" fill={A} />
          <text x="290" y="80" textAnchor="middle" fill={A2} fontSize="12" fontWeight="700">2023</text>
          <rect x="230" y="120" width="120" height="75" rx="8" fill={GREEN} fillOpacity="0.10" stroke={GREEN} strokeWidth="1" />
          <text x="290" y="140" textAnchor="middle" fill={GREEN} fontSize="13" fontWeight="700">DPO</text>
          <text x="290" y="158" textAnchor="middle" fill={GRAY} fontSize="10">No RM, no PPO</text>
          <text x="290" y="172" textAnchor="middle" fill={GRAY} fontSize="10">Direct supervised loss</text>
          <text x="290" y="188" textAnchor="middle" fill={GREEN} fontSize="9">Llama, Mistral, Zephyr</text>

          {/* 2024: GRPO */}
          <circle cx="460" cy="100" r="8" fill={A} />
          <text x="460" y="80" textAnchor="middle" fill={A2} fontSize="12" fontWeight="700">2024</text>
          <rect x="400" y="120" width="120" height="75" rx="8" fill={PURPLE} fillOpacity="0.10" stroke={PURPLE} strokeWidth="1" />
          <text x="460" y="140" textAnchor="middle" fill={PURPLE} fontSize="13" fontWeight="700">GRPO</text>
          <text x="460" y="158" textAnchor="middle" fill={GRAY} fontSize="10">No critic network</text>
          <text x="460" y="172" textAnchor="middle" fill={GRAY} fontSize="10">Group baseline</text>
          <text x="460" y="188" textAnchor="middle" fill={PURPLE} fontSize="9">DeepSeek-R1</text>

          {/* 2025: RLVR */}
          <circle cx="630" cy="100" r="8" fill={A} />
          <text x="630" y="80" textAnchor="middle" fill={A2} fontSize="12" fontWeight="700">2025</text>
          <rect x="570" y="120" width="120" height="75" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="630" y="140" textAnchor="middle" fill={A} fontSize="13" fontWeight="700">RLVR</text>
          <text x="630" y="158" textAnchor="middle" fill={GRAY} fontSize="10">Verifiable rewards</text>
          <text x="630" y="172" textAnchor="middle" fill={GRAY} fontSize="10">No humans at all</text>
          <text x="630" y="188" textAnchor="middle" fill={A} fontSize="9">Math, Code, Logic</text>

          {/* 2026: Future */}
          <circle cx="790" cy="100" r="8" fill={GRAY} stroke={A} strokeWidth="1" strokeDasharray="3 3" />
          <text x="790" y="80" textAnchor="middle" fill={GRAY} fontSize="12" fontWeight="700">2026+</text>
          <rect x="730" y="120" width="120" height="75" rx="8" fill={GRAY} fillOpacity="0.05" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" />
          <text x="790" y="140" textAnchor="middle" fill={GRAY} fontSize="13" fontWeight="700">???</text>
          <text x="790" y="158" textAnchor="middle" fill={GRAY} fontSize="10">Process rewards?</text>
          <text x="790" y="172" textAnchor="middle" fill={GRAY} fontSize="10">RLAIF? Tree search?</text>
          <text x="790" y="188" textAnchor="middle" fill={GRAY} fontSize="9">The frontier</text>

          {/* Trend arrow */}
          <text x="430" y="230" textAnchor="middle" fill={A2} fontSize="12" fontWeight="600">THE TREND</text>
          <line x1="130" y1="250" x2="780" y2="250" stroke={A} strokeWidth="1.5" markerEnd="url(#rlhf-ar)" opacity="0.6" />
          <text x="200" y="270" textAnchor="middle" fill={GRAY} fontSize="10">More human involvement</text>
          <text x="660" y="270" textAnchor="middle" fill={A2} fontSize="10">Less human involvement</text>

          <line x1="130" y1="285" x2="780" y2="285" stroke={GREEN} strokeWidth="1.5" markerEnd="url(#rlhf-ar-g)" opacity="0.6" />
          <text x="200" y="305" textAnchor="middle" fill={GRAY} fontSize="10">Less scalable</text>
          <text x="660" y="305" textAnchor="middle" fill={GREEN} fontSize="10">More scalable</text>
        </svg>
      </Diagram>

      <Prose>
        <p>
          <strong>What is coming next?</strong> Several directions are being explored at the frontier:
        </p>
        <p>
          <H tip="Constitutional AI (CAI) / RLAIF = Anthropic's approach where an AI model (not a human) provides feedback based on a written constitution of principles. The AI reads the constitution ('be helpful, be harmless, be honest') and judges responses accordingly. Scales human oversight by encoding values into rules that an AI can apply." color={PURPLE}>Constitutional AI / RLAIF</H> —
          replace human feedback with AI feedback guided by a written constitution of values.
          Anthropic's Claude uses this extensively. The AI reads principles like "be helpful, be harmless,
          be honest" and provides feedback — scaling human values without scaling human labor.
        </p>
        <p>
          <H tip="Process Reward Models (PRM) = reward models that score each STEP of reasoning, not just the final answer. Instead of 'was the answer correct?' (outcome reward), a PRM says 'was step 3 of your reasoning valid?' This provides much denser feedback and can catch reasoning errors even when the final answer happens to be correct." color={GREEN}>Process Reward Models (PRMs)</H> —
          instead of scoring only the final answer, score each <em>step</em> of reasoning. "Step 1 was
          correct, step 2 had an error, step 3 recovered." This provides much denser feedback than
          outcome-only rewards and can catch "right answer, wrong reasoning" scenarios.
        </p>
        <p>
          <H tip="Test-time compute scaling = allocating more computation during INFERENCE (not training) to improve quality. Instead of generating one response, generate many and select the best (best-of-N), or use tree search to explore reasoning paths. OpenAI's o1 and o3 use this approach — they 'think longer' on harder problems." color={CYAN}>Test-time compute scaling</H> —
          the insight that you can get better results by spending more compute at inference time, not
          just training time. Generate multiple responses, use a verifier to pick the best one, or
          use tree search to explore reasoning paths. This is the approach behind OpenAI's o1 and o3.
        </p>
      </Prose>

      <MentalModel
        title="The Evolution of Education"
        analogy="The evolution of RL for LLMs mirrors the evolution of education: Lectures (SFT) = a teacher shows you examples. Exams with tutors (RLHF) = you take tests, a tutor scores them, you improve. Self-study with answer keys (DPO) = you check your own answers against a key. Group study sessions (GRPO) = students compare answers with each other. Standardized testing (RLVR) = automatic grading, infinitely scalable. Each step reduces human involvement and increases scalability."
        technical="The mathematical progression: SFT minimizes cross-entropy against demonstrations. RLHF maximizes E[r(x,y)] - beta*KL via PPO with a learned reward model. DPO collapses RLHF into a supervised loss using the analytic optimum. GRPO replaces PPO's critic with group statistics. RLVR replaces learned rewards with verifiable ones. Each step removes one component while maintaining or improving quality."
        color={A}
      />

      <ConceptCard title="The Open Questions" color={A} defaultOpen={false}>
        <Prose>
          <p>
            <strong>Can RLVR extend beyond math and code?</strong> Verifiable rewards work beautifully for
            problems with objective answers. But what about creative writing, ethical reasoning,
            nuanced advice? The "verifiable" paradigm has a hard ceiling at subjectivity.
          </p>
          <p>
            <strong>Does RL discover new knowledge or just surface existing knowledge?</strong> If a base
            model already "knows" how to solve a problem (it gets it right 5% of the time via sampling),
            does RLVR teach it something new, or just make it more reliable? This question is critical
            for understanding the limits of RL-based training.
          </p>
          <p>
            <strong>Will process rewards replace outcome rewards?</strong> Scoring each reasoning step
            (not just the final answer) could unlock much more efficient training. But creating
            step-level training data is expensive, and automatically generating it is an open research
            problem.
          </p>
          <p>
            <strong>How far can RLAIF go?</strong> If an AI can provide feedback as good as a human,
            do we need humans in the loop at all? And what happens when the AI providing feedback
            is weaker than the model being trained? This "weak-to-strong" generalization is one of
            the deepest open questions in alignment.
          </p>
        </Prose>
      </ConceptCard>

      <ComparisonTable
        headers={['Method', 'Feedback Source', 'Scalability', 'Quality Ceiling', 'Year']}
        rows={[
          ['RLHF', 'Human preferences', 'Low (humans are expensive)', 'High (human judgment)', '2022'],
          ['DPO', 'Offline preference data', 'Medium (one-time collection)', 'Medium (limited by data)', '2023'],
          ['RLAIF / CAI', 'AI feedback + constitution', 'High (AI is cheap)', 'Medium-High (AI judgment)', '2023'],
          ['GRPO', 'Any reward + group baseline', 'High (no critic)', 'High (online exploration)', '2024'],
          ['RLVR', 'Verifiable ground truth', 'Very High (fully automatic)', 'Very High for verifiable tasks', '2025'],
          ['Process RM', 'Step-level rewards', 'Medium (step data needed)', 'Potentially highest', '2025+'],
        ]}
        caption="The field is moving toward more scalable, less human-dependent feedback — but the hardest alignment problems still need human judgment"
      />

      <Callout type="key">
        The complete journey of RL for LLMs: we started with no RL (just SFT), added human feedback
        (RLHF), simplified the pipeline (DPO), eliminated the critic (GRPO), and replaced human
        feedback with verification (RLVR). Each step made alignment more scalable and less dependent
        on human labor. The next frontier — process rewards, Constitutional AI, and test-time compute
        scaling — will push this even further. But the fundamental question remains: <strong>can machines
        learn human values from reward signals alone?</strong>
      </Callout>

      <SimpleExplain>
        <p><strong>The big picture:</strong> Training AI started with "show it examples" (supervised learning). Then we added "tell it what's good" (RLHF). Then we simplified to "show it better vs worse" (DPO). Then we made it self-grading within groups (GRPO). Now we are letting it grade itself with answer keys (RLVR). Each step removes one more human from the loop. The question for the next decade: how far can we push this before we need humans back in the loop for the hardest, most subjective, most consequential decisions?</p>
      </SimpleExplain>
    </>
  );
}
