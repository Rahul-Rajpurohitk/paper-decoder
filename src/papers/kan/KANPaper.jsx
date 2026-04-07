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
const A  = '#f59e0b';   // primary amber
const A2 = '#d97706';   // darker amber
const A3 = '#fbbf24';   // lighter amber
const CYAN   = '#06b6d4';
const GREEN  = '#22c55e';
const PURPLE = '#a855f7';
const BLUE   = '#3b82f6';
const RED    = '#ef4444';
const GRAY   = '#94a3b8';
const BG     = '#1a1508'; // warm dark bg for SVGs
const FG     = '#fef3c7'; // warm light text in SVGs

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

export default function KANPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — WHY KAN?
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="01"
        title="Why KAN? The Limitations of MLPs"
        subtitle="Fixed activations on nodes vs learnable functions on edges"
        color={A}
      />

      <Prose>
        <p>
          Every <H tip="Multi-Layer Perceptron (MLP) = the most basic neural network architecture. Layers of neurons where each neuron computes a weighted sum of inputs, then applies a fixed nonlinear function (ReLU, GELU, etc.). Every modern deep learning model contains MLPs as building blocks." color={A}>multi-layer perceptron</H> you have ever used follows the same recipe invented in the 1980s:
          take inputs, multiply by <H tip="Learnable weights = the parameters that a neural network adjusts during training. In an MLP, weights are scalar numbers on the edges connecting neurons. The key insight of KAN: what if edges carried entire functions instead of single numbers?" color={CYAN}>learnable weights</H> (the edges), sum them up at each node, then push the result through a <H tip="Fixed activation function = a nonlinear function applied to the weighted sum at each node. ReLU(x) = max(0,x), GELU, Sigmoid, Tanh are common choices. 'Fixed' means the shape of the function never changes during training — only the weights that feed into it change." color={A}>fixed activation function</H> like <H tip="ReLU (Rectified Linear Unit) = max(0, x). The most common activation in modern deep learning. Simple, fast, but completely fixed — it cannot learn a sinusoidal pattern or a polynomial. The network must approximate these by combining many ReLU-activated neurons." color={RED}>ReLU</H> or <H tip="GELU (Gaussian Error Linear Unit) = x * Phi(x), where Phi is the standard Gaussian CDF. Used in GPT, BERT, and most modern Transformers. Smoother than ReLU but still a fixed shape — every neuron in the network applies the exact same nonlinearity." color={RED}>GELU</H>. The weights are learnable but the activations are frozen. This means the network can only control <em>how much</em> signal flows along each edge, never <em>what transformation</em> happens along it.
        </p>
        <p>
          <H tip="KAN (Kolmogorov-Arnold Network) = a fundamentally different neural network where learnable activation functions (B-splines) live on edges instead of fixed activations on nodes. Nodes simply sum their inputs. Inspired by the Kolmogorov-Arnold representation theorem from 1957." color={A}>Kolmogorov-Arnold Networks (KANs)</H> flip this design completely. In a KAN, the nodes do nothing — they just sum. The edges carry the complexity: each edge has its own <H tip="Learnable activation function = a function whose shape changes during training. In KAN, each edge has a B-spline activation that can morph from a straight line to a sine wave to a step function — whatever the data requires. This is fundamentally more expressive than a fixed ReLU." color={A}>learnable activation function</H>, parameterized as a <H tip="B-spline = a smooth piecewise polynomial curve defined by control points and a knot vector. B-splines can approximate any continuous function to arbitrary accuracy by adding more control points (grid refinement). They are numerically stable and have local support — changing one control point only affects a small region of the curve." color={CYAN}>B-spline</H>. Each edge can independently learn to be a polynomial, a sinusoidal, an exponential, or any smooth curve the data demands. The result: KANs match or beat MLPs with <strong>10-100x fewer parameters</strong> on scientific and mathematical tasks.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '10-100x', unit: '', label: 'Fewer Parameters', color: A },
          { value: 'B-spline', unit: '', label: 'Learnable Edges', color: A2 },
          { value: '1957', unit: '', label: 'Theorem Origin', color: CYAN },
          { value: '2L+1', unit: ' fns', label: 'Inner Layer Width', color: GREEN },
        ]}
      />

      <SimpleExplain>
        <p><strong>The core idea:</strong> In a standard neural network, the connections between neurons are just numbers (weights), and every neuron applies the same fixed squishing function (like ReLU). KAN says: what if the connections themselves were flexible curves that can learn any shape? Instead of multiplying by a weight and then applying a rigid function, each connection morphs into whatever function best fits the data. This is like replacing rigid pipes with flexible hoses that can reshape themselves.</p>
      </SimpleExplain>

      {/* ── MLP vs KAN Architecture Comparison SVG ── */}
      <Diagram caption="MLP vs KAN — MLPs have fixed activations (blue circles) on nodes and learnable weights (gray lines) on edges. KANs flip this: nodes are simple summation (gray) and edges carry learnable B-spline functions (amber curves).">
        <svg viewBox="0 0 900 420" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="900" height="420" rx="12" fill={BG} />

          {/* ── LEFT: MLP ── */}
          <text x="210" y="32" textAnchor="middle" fill={GRAY} fontSize="15" fontWeight="700">MULTI-LAYER PERCEPTRON (MLP)</text>
          <text x="210" y="52" textAnchor="middle" fill={GRAY} fontSize="11" opacity="0.7">Fixed activations on nodes, scalar weights on edges</text>

          {/* MLP Input layer */}
          {[100, 180, 260].map((y, i) => (
            <g key={`mlp-in-${i}`}>
              <circle cx="80" cy={y} r="18" fill="none" stroke={GRAY} strokeWidth="1.5" />
              <text x="80" y={y + 4} textAnchor="middle" fill={GRAY} fontSize="11">{'x' + (i + 1)}</text>
            </g>
          ))}
          {LABEL(80, 300, 'Input', GRAY, 10)}

          {/* MLP Hidden layer */}
          {[110, 170, 230, 290].map((y, i) => (
            <g key={`mlp-h-${i}`}>
              {/* Edges from inputs to hidden */}
              {[100, 180, 260].map((iy, j) => (
                <line key={`mlp-e1-${i}-${j}`} x1="98" y1={iy} x2="182" y2={y} stroke={GRAY} strokeWidth="1" opacity="0.3" />
              ))}
              <circle cx="200" cy={y} r="18" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.5" />
              <text x="200" y={y + 4} textAnchor="middle" fill={BLUE} fontSize="9" fontWeight="600">ReLU</text>
            </g>
          ))}
          {LABEL(200, 335, 'Hidden (fixed act.)', BLUE, 10)}

          {/* MLP Output layer */}
          {[150, 220].map((y, i) => (
            <g key={`mlp-out-${i}`}>
              {[110, 170, 230, 290].map((hy, j) => (
                <line key={`mlp-e2-${i}-${j}`} x1="218" y1={hy} x2="322" y2={y} stroke={GRAY} strokeWidth="1" opacity="0.3" />
              ))}
              <circle cx="340" cy={y} r="18" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.5" />
              <text x="340" y={y + 4} textAnchor="middle" fill={BLUE} fontSize="9" fontWeight="600">ReLU</text>
            </g>
          ))}
          {LABEL(340, 335, 'Output', BLUE, 10)}

          {/* MLP labels */}
          <text x="140" y="380" textAnchor="middle" fill={GRAY} fontSize="10">w (scalar)</text>
          <line x1="100" y1="375" x2="180" y2="375" stroke={GRAY} strokeWidth="1" opacity="0.5" />
          <text x="270" y="395" textAnchor="middle" fill={BLUE} fontSize="10">Nodes: fixed activation</text>
          <circle cx="230" cy="392" r="6" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1" />
          <text x="270" y="410" textAnchor="middle" fill={GRAY} fontSize="10">Edges: learnable scalar weight</text>

          {/* ── Divider ── */}
          <line x1="435" y1="20" x2="435" y2="415" stroke="#334155" strokeWidth="1" strokeDasharray="8 4" />
          <text x="450" y="210" textAnchor="middle" fill={A} fontSize="14" fontWeight="700" transform="rotate(-90, 450, 210)">vs</text>

          {/* ── RIGHT: KAN ── */}
          <text x="680" y="32" textAnchor="middle" fill={A} fontSize="15" fontWeight="700">KOLMOGOROV-ARNOLD NETWORK (KAN)</text>
          <text x="680" y="52" textAnchor="middle" fill={A} fontSize="11" opacity="0.7">Learnable B-spline activations on edges, sum on nodes</text>

          {/* KAN Input layer */}
          {[100, 180, 260].map((y, i) => (
            <g key={`kan-in-${i}`}>
              <circle cx="530" cy={y} r="18" fill="none" stroke={GRAY} strokeWidth="1.5" />
              <text x="530" y={y + 4} textAnchor="middle" fill={GRAY} fontSize="11">{'x' + (i + 1)}</text>
            </g>
          ))}
          {LABEL(530, 300, 'Input', GRAY, 10)}

          {/* KAN Hidden layer — B-spline edges */}
          {[110, 170, 230, 290].map((y, i) => (
            <g key={`kan-h-${i}`}>
              {/* B-spline edges from inputs to hidden */}
              {[100, 180, 260].map((iy, j) => {
                const mx = 615;
                const my = (iy + y) / 2 + (j - 1) * 8;
                return (
                  <g key={`kan-e1-${i}-${j}`}>
                    <path
                      d={`M548,${iy} Q${mx},${my} ${652},${y}`}
                      fill="none"
                      stroke={A}
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    {/* Small spline wave on edge */}
                    <path
                      d={`M${mx - 12},${my - 4} q4,-8 8,0 t8,0 t8,0`}
                      fill="none"
                      stroke={A3}
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                  </g>
                );
              })}
              {/* Sum node */}
              <circle cx="670" cy={y} r="18" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1.5" />
              <text x="670" y={y + 5} textAnchor="middle" fill={GRAY} fontSize="13" fontWeight="600">+</text>
            </g>
          ))}
          {LABEL(670, 335, 'Hidden (just sum)', GRAY, 10)}

          {/* KAN Output layer */}
          {[150, 220].map((y, i) => (
            <g key={`kan-out-${i}`}>
              {[110, 170, 230, 290].map((hy, j) => {
                const mx = 745;
                const my = (hy + y) / 2 + (j - 1.5) * 6;
                return (
                  <g key={`kan-e2-${i}-${j}`}>
                    <path
                      d={`M688,${hy} Q${mx},${my} ${792},${y}`}
                      fill="none"
                      stroke={A}
                      strokeWidth="2"
                      opacity="0.7"
                    />
                    <path
                      d={`M${mx - 10},${my - 3} q3,-6 6,0 t6,0 t6,0`}
                      fill="none"
                      stroke={A3}
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                  </g>
                );
              })}
              <circle cx="810" cy={y} r="18" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1.5" />
              <text x="810" y={y + 5} textAnchor="middle" fill={GRAY} fontSize="13" fontWeight="600">+</text>
            </g>
          ))}
          {LABEL(810, 335, 'Output (sum)', GRAY, 10)}

          {/* KAN labels */}
          <text x="610" y="380" textAnchor="middle" fill={A} fontSize="10">Edges: learnable B-spline</text>
          <path d="M560,377 q6,-8 12,0 t12,0" fill="none" stroke={A3} strokeWidth="1.5" />
          <text x="740" y="395" textAnchor="middle" fill={GRAY} fontSize="10">Nodes: simple summation (+)</text>
          <circle cx="700" cy="392" r="6" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1" />
          <text x="740" y="410" textAnchor="middle" fill={A} fontSize="10">Each edge = independent learnable function</text>
        </svg>
      </Diagram>

      <VisualCompare
        leftLabel="MLP (Traditional)"
        rightLabel="KAN (Kolmogorov-Arnold)"
        leftColor={BLUE}
        rightColor={A}
        left={<>
          <p>Fixed activation functions on nodes (ReLU, GELU)</p>
          <p>Edges carry scalar weights only</p>
          <p>Inspired by universal approximation theorem (1989)</p>
          <p>Need wide/deep networks for complex functions</p>
          <p>Poor interpretability of learned representations</p>
        </>}
        right={<>
          <p style={{color: A}}>Learnable activation functions on edges (B-splines)</p>
          <p>Nodes just sum their inputs</p>
          <p>Inspired by Kolmogorov-Arnold theorem (1957)</p>
          <p style={{color: GREEN}}>10-100x fewer parameters for scientific tasks</p>
          <p style={{color: GREEN}}>Can extract symbolic formulas from trained networks</p>
        </>}
        caption="KAN moves all expressiveness from nodes to edges, yielding dramatically more parameter-efficient networks"
      />

      <Callout type="key">
        The fundamental insight of KAN: traditional MLPs use learnable <em>scalars</em> (weights) on edges
        and fixed <em>functions</em> (activations) on nodes. KANs do the exact opposite: fixed <em>identity</em> (summation)
        on nodes and learnable <em>functions</em> (B-splines) on edges. This is not just a tweak but a complete
        architectural inversion inspired by a 67-year-old theorem from pure mathematics.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — KOLMOGOROV-ARNOLD THEOREM
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="02"
        title="The Kolmogorov-Arnold Representation Theorem"
        subtitle="Any multivariate continuous function = compositions of univariate functions"
        color={CYAN}
      />

      <Prose>
        <p>
          In 1957, <H tip="Andrey Kolmogorov = one of the greatest mathematicians of the 20th century (1903-1987). Founded modern probability theory. In 1957, he proved that any continuous function of n variables can be represented as sums and compositions of continuous functions of one variable, resolving Hilbert's 13th problem." color={CYAN}>Andrey Kolmogorov</H> and his student <H tip="Vladimir Arnold = Soviet/Russian mathematician (1937-2010). Kolmogorov's most famous student. Refined Kolmogorov's original construction into the precise form used today. Also known for KAM theory (Kolmogorov-Arnold-Moser) in classical mechanics." color={CYAN}>Vladimir Arnold</H> proved something remarkable: <strong>any</strong> continuous function of multiple variables can be written as a sum of compositions of continuous functions of a <em>single</em> variable.
          This resolved <H tip="Hilbert's 13th problem = one of 23 problems posed by David Hilbert in 1900 as the most important challenges for 20th century mathematics. Problem 13 asked whether certain functions of multiple variables could be expressed using functions of fewer variables. Kolmogorov's theorem answered YES in 1957." color={PURPLE}>Hilbert's 13th problem</H> and stunned the mathematical world.
        </p>
        <p>
          In plain language: no matter how complicated a function of multiple inputs is, you can always decompose it into a network of simple one-dimensional functions chained together. A function of 100 variables can be broken down into functions that each only deal with one variable at a time.
          The original theorem uses exactly <H tip="2n+1 inner functions = for an n-variable input, the Kolmogorov-Arnold theorem requires exactly 2n+1 functions in the inner layer. For n=2, that is 5 inner functions. This is the minimum width needed for exact representation." color={CYAN}>2n+1</H> inner functions for an n-variable input, though the functions can be highly non-smooth. KAN relaxes this
          to allow smoother <H tip="B-spline = a basis spline, a piecewise polynomial curve defined by control points and a knot vector. B-splines are smooth (differentiable), have local support (each control point only affects a local region), and are numerically stable. They can approximate any continuous function to arbitrary accuracy by adding more control points." color={A}>B-spline</H> functions with adjustable width and depth.
        </p>
      </Prose>

      <FormulaSteps
        label="Kolmogorov-Arnold Representation Theorem"
        color={CYAN}
        steps={[
          {
            note: 'Start with any continuous function f of n variables defined on the unit cube [0,1]^n.',
            math: 'f(x_1, x_2, \\ldots, x_n) : [0,1]^n \\to \\mathbb{R}',
          },
          {
            note: 'The theorem says: f can always be decomposed into an outer sum of 2n+1 terms, where each term is an outer function applied to a sum of inner univariate functions.',
            math: 'f(x_1, \\ldots, x_n) = \\sum_{q=0}^{2n} \\Phi_q \\!\\left( \\sum_{p=1}^{n} \\phi_{q,p}(x_p) \\right)',
          },
          {
            note: 'Each inner function phi_{q,p} maps one input variable to a real number. The outer functions Phi_q are also univariate. The entire multivariate function is built from (2n+1)(n+1) one-dimensional functions.',
            math: 'f(\\mathbf{x}) = \\sum_{q=0}^{2n} \\Phi_q \\!\\left( \\sum_{p=1}^{n} \\phi_{q,p}(x_p) \\right) \\quad \\text{where } \\phi_{q,p}: [0,1] \\to \\mathbb{R}, \\;\\; \\Phi_q: \\mathbb{R} \\to \\mathbb{R}',
          },
        ]}
        symbols={[
          { symbol: 'f', meaning: 'Any continuous multivariate function' },
          { symbol: 'n', meaning: 'Number of input variables' },
          { symbol: 'phi_{q,p}', meaning: 'Inner univariate functions (one per input per term)' },
          { symbol: 'Phi_q', meaning: 'Outer univariate functions (2n+1 total)' },
        ]}
      />

      {/* ── Kolmogorov-Arnold decomposition visual ── */}
      <Diagram caption="Kolmogorov-Arnold decomposition for f(x1, x2): 2 inputs decomposed through 5 inner functions, summed, then through 5 outer functions, and summed to produce the output">
        <svg viewBox="0 0 900 360" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="900" height="360" rx="12" fill={BG} />

          {/* Title */}
          <text x="450" y="30" textAnchor="middle" fill={CYAN} fontSize="13" fontWeight="700">KOLMOGOROV-ARNOLD DECOMPOSITION (n=2, so 2n+1 = 5 terms)</text>

          {/* Inputs */}
          {BOX(30, 120, 70, 36, 'x\u2081', CYAN, '#fff', 14)}
          {BOX(30, 200, 70, 36, 'x\u2082', CYAN, '#fff', 14)}

          {/* Inner functions phi_{q,p} */}
          {[70, 120, 170, 220, 270].map((y, q) => (
            <g key={`inner-${q}`}>
              {/* phi_{q,1} from x1 */}
              <rect x="160" y={y} width="70" height="28" rx="6" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1" />
              <text x="195" y={y + 18} textAnchor="middle" fill={A} fontSize="10" fontWeight="600">{'\u03C6' + (q + 1) + ',1'}</text>
              {/* phi_{q,2} from x2 */}
              <rect x="260" y={y} width="70" height="28" rx="6" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1" />
              <text x="295" y={y + 18} textAnchor="middle" fill={A} fontSize="10" fontWeight="600">{'\u03C6' + (q + 1) + ',2'}</text>

              {/* Lines from inputs to inner fns */}
              <line x1="100" y1="138" x2="160" y2={y + 14} stroke={CYAN} strokeWidth="1" opacity="0.4" />
              <line x1="100" y1="218" x2="260" y2={y + 14} stroke={CYAN} strokeWidth="1" opacity="0.4" />

              {/* Sum node */}
              <circle cx="380" cy={y + 14} r="14" fill={GRAY} fillOpacity="0.15" stroke={GRAY} strokeWidth="1.5" />
              <text x="380" y={y + 18} textAnchor="middle" fill={GRAY} fontSize="14" fontWeight="600">+</text>
              <line x1="230" y1={y + 14} x2="366" y2={y + 14} stroke={GRAY} strokeWidth="1" opacity="0.3" />
              <line x1="330" y1={y + 14} x2="366" y2={y + 14} stroke={GRAY} strokeWidth="1" opacity="0.3" />

              {/* Outer function Phi_q */}
              <rect x="430" y={y} width="70" height="28" rx="6" fill={PURPLE} fillOpacity="0.2" stroke={PURPLE} strokeWidth="1" />
              <text x="465" y={y + 18} textAnchor="middle" fill={PURPLE} fontSize="10" fontWeight="600">{'\u03A6' + (q + 1)}</text>
              <line x1="394" y1={y + 14} x2="430" y2={y + 14} stroke={GRAY} strokeWidth="1" opacity="0.4" />

              {/* Line to final sum */}
              <line x1="500" y1={y + 14} x2="560" y2="184" stroke={PURPLE} strokeWidth="1" opacity="0.4" />
            </g>
          ))}

          {/* Final sum */}
          <circle cx="580" cy="184" r="18" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="2" />
          <text x="580" y="189" textAnchor="middle" fill={GREEN} fontSize="16" fontWeight="700">{'\u03A3'}</text>

          {/* Output */}
          {BOX(630, 166, 90, 36, 'f(x\u2081, x\u2082)', GREEN, '#fff', 13)}
          <line x1="598" y1="184" x2="630" y2="184" stroke={GREEN} strokeWidth="2" />

          {/* Legend */}
          <rect x="750" y="70" width="130" height="120" rx="8" fill="rgba(255,255,255,0.03)" stroke={GRAY} strokeWidth="0.5" />
          <text x="815" y="92" textAnchor="middle" fill={FG} fontSize="10" fontWeight="700">LEGEND</text>
          <rect x="762" y="102" width="14" height="10" rx="3" fill={A} fillOpacity="0.3" stroke={A} strokeWidth="0.5" />
          <text x="782" y="111" fill={A} fontSize="9">Inner fn (1D)</text>
          <rect x="762" y="122" width="14" height="10" rx="3" fill={PURPLE} fillOpacity="0.3" stroke={PURPLE} strokeWidth="0.5" />
          <text x="782" y="131" fill={PURPLE} fontSize="9">Outer fn (1D)</text>
          <circle cx="769" cy="150" r="5" fill={GRAY} fillOpacity="0.15" stroke={GRAY} strokeWidth="1" />
          <text x="782" y="153" fill={GRAY} fontSize="9">Sum node</text>
          <circle cx="769" cy="170" r="5" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="782" y="173" fill={GREEN} fontSize="9">Final output</text>

          {/* Bottom note */}
          <rect x="150" y="316" width="600" height="30" rx="8" fill={CYAN} fillOpacity="0.08" stroke={CYAN} strokeWidth="0.5" />
          <text x="450" y="336" textAnchor="middle" fill={CYAN} fontSize="11" fontWeight="600">Every multivariate function = sums of 1D functions composed together</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>What this theorem really says:</strong> Suppose you have a function that takes in 5 numbers and produces 1 number. The theorem guarantees you can always rewrite it as: take each input separately through its own 1D transformation, add the results together, then pass each sum through another 1D transformation, and add those final results. You never need to do anything "truly multidimensional." All the complexity is captured by the 1D functions.</p>
      </SimpleExplain>

      <Callout type="insight">
        The Kolmogorov-Arnold theorem was originally considered a <em>theoretical curiosity</em> rather than a
        practical tool, because the inner functions can be extremely non-smooth (fractal-like). The breakthrough
        of KAN is replacing these pathological functions with smooth, learnable <H tip="B-splines are smooth piecewise polynomials. Unlike the fractal functions in the original theorem, B-splines are infinitely differentiable (for high enough degree) and can be refined by adding more control points. This makes them practical for gradient-based optimization." color={A}>B-splines</H> and allowing
        the network to be deeper than the original two-layer construction. This trades mathematical exactness
        for practical learnability.
      </Callout>

      <MentalModel
        title="The Translation Bureau"
        analogy="Imagine a translation bureau that can translate any document from any combination of 5 languages. The Kolmogorov-Arnold theorem says you do NOT need translators who understand multiple languages simultaneously. Instead, you can always decompose the job: each input goes to a specialist who only reads one language and outputs a number. Those numbers are added up and passed to a second round of specialists who each take one number and produce the final result. Surprisingly, you only need 11 specialists total (2*5+1), not one for every possible language pair."
        technical="Formally, the theorem states that any f in C([0,1]^n) can be written as f(x) = sum_{q=0}^{2n} Phi_q(sum_{p=1}^{n} phi_{q,p}(x_p)) where phi_{q,p} and Phi_q are continuous univariate functions. KAN generalizes this to arbitrary depth and width, using B-splines as the univariate function class."
        color={CYAN}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — LEARNABLE ACTIVATIONS (B-SPLINES ON EDGES)
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="03"
        title="Learnable Activations — B-Splines on Edges"
        subtitle="Replacing fixed ReLU/GELU with flexible, trainable curves"
        color={A}
      />

      <Prose>
        <p>
          The key engineering decision in KAN is <em>how</em> to parameterize the learnable activation functions on each edge. The authors choose <H tip="B-splines (Basis splines) = piecewise polynomial curves built from a set of basis functions. Each basis function is nonzero only over a local interval (local support). The curve is a weighted sum of these basis functions, where the weights are the control points. Key advantage: adjusting one control point only changes the curve locally." color={A}>B-splines</H> — and this choice is critical. B-splines are piecewise polynomial curves defined by a set of <H tip="Control points = the learnable parameters of a B-spline. Each control point has a weight (coefficient) that determines the height of the curve in its local region. During training, gradient descent adjusts these coefficients to shape the activation function. More control points = finer approximation." color={A}>control points</H> (the learnable parameters) and a <H tip="Knot vector = a non-decreasing sequence of values that define where the polynomial pieces of a B-spline connect. Uniform knots give equally-spaced pieces. The knot vector determines the 'grid' on which the spline is defined." color={CYAN}>knot vector</H> (the grid structure).
        </p>
        <p>
          Each activation function in KAN is actually a <H tip="Residual connection in KAN = each edge's activation is phi(x) = silu(x) + spline(x). The SiLU (swish) provides a good starting point, and the B-spline learns the residual (difference from SiLU). This is analogous to residual connections in ResNets — learning the deviation from an identity-like function is easier than learning the full function from scratch." color={GREEN}>residual activation</H>: a fixed <H tip="SiLU (Sigmoid Linear Unit) = x * sigmoid(x), also called 'Swish'. A smooth activation function used as the base component in KAN's residual formulation. Provides a reasonable default behavior while the B-spline learns corrections on top." color={GREEN}>SiLU (Swish)</H> base function plus a learnable B-spline correction. This means the network starts with reasonable behavior (similar to an MLP with SiLU activations) and the B-spline gradually sculpts each edge into whatever function is needed. The number of parameters per edge equals the number of <H tip="Grid points (G) = the number of intervals in the B-spline's knot vector. More grid points = finer resolution = the function can capture more detail. KAN typically starts with G=3 (coarse) and refines to G=10 or higher. Total parameters per edge = G + k, where k is the spline order." color={A}>grid points</H> plus the spline order.
        </p>
      </Prose>

      <FormulaBlock
        math="\phi(x) = w_b \cdot \text{silu}(x) + w_s \cdot \text{spline}(x)"
        label="KAN Edge Activation = Base + Spline"
        color={A}
        symbols={[
          { symbol: 'silu(x)', meaning: 'x * sigmoid(x), the fixed base function' },
          { symbol: 'spline(x)', meaning: 'B-spline with learnable control point coefficients' },
          { symbol: 'w_b, w_s', meaning: 'Learnable scaling weights for base and spline' },
        ]}
      />

      <FormulaSteps
        label="B-Spline Expansion"
        color={A}
        steps={[
          {
            note: 'A B-spline of order k with G grid intervals is a weighted sum of (G+k) basis functions. Each basis function B_i is a piecewise polynomial that is nonzero only over a local region.',
            math: '\\text{spline}(x) = \\sum_{i=0}^{G+k-1} c_i \\, B_{i,k}(x)',
          },
          {
            note: 'The basis functions B_{i,k} are defined recursively via the Cox-de Boor formula. Order 0 basis functions are simple indicator functions. Higher orders are built by blending adjacent lower-order ones.',
            math: 'B_{i,0}(x) = \\begin{cases} 1 & t_i \\le x < t_{i+1} \\\\ 0 & \\text{otherwise} \\end{cases} \\qquad B_{i,k}(x) = \\frac{x - t_i}{t_{i+k} - t_i} B_{i,k-1}(x) + \\frac{t_{i+k+1} - x}{t_{i+k+1} - t_{i+1}} B_{i+1,k-1}(x)',
          },
          {
            note: 'The trainable parameters are the control point coefficients c_i. Each c_i only affects the curve locally (local support), making gradients well-behaved. Total params per edge = G + k.',
            math: '\\text{params per edge} = G + k \\quad \\text{(typically } G=3\\text{-}10,\\; k=3\\text{)}',
          },
        ]}
        symbols={[
          { symbol: 'c_i', meaning: 'Learnable control point coefficients (the parameters)' },
          { symbol: 'B_{i,k}', meaning: 'B-spline basis function of order k at position i' },
          { symbol: 't_i', meaning: 'Knot values defining the grid (non-decreasing sequence)' },
          { symbol: 'G', meaning: 'Number of grid intervals (controls resolution)' },
          { symbol: 'k', meaning: 'Spline order (typically k=3, cubic splines)' },
        ]}
      />

      {/* ── B-spline curve with control points SVG ── */}
      <Diagram caption="A B-spline activation on a single KAN edge: the smooth amber curve is the weighted sum of basis functions (gray dashed). Control points (orange dots) are the learnable parameters adjusted by gradient descent.">
        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="340" rx="12" fill={BG} />

          {/* Axes */}
          <line x1="80" y1="280" x2="720" y2="280" stroke={GRAY} strokeWidth="1.5" />
          <line x1="80" y1="280" x2="80" y2="40" stroke={GRAY} strokeWidth="1.5" />
          {LABEL(400, 310, 'Input x', GRAY, 11)}
          <text x="35" y="160" fill={GRAY} fontSize="11" textAnchor="middle" transform="rotate(-90, 35, 160)">{'\u03C6(x)'}</text>

          {/* Grid lines (knot positions) */}
          {[160, 240, 320, 400, 480, 560, 640].map((gx, i) => (
            <g key={`grid-${i}`}>
              <line x1={gx} y1="275" x2={gx} y2="285" stroke={GRAY} strokeWidth="1" />
              <text x={gx} y="298" textAnchor="middle" fill={GRAY} fontSize="9">{'t' + (i + 1)}</text>
            </g>
          ))}

          {/* Basis functions (faint dashed) */}
          <path d="M120,280 Q200,120 280,280" fill="none" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <path d="M200,280 Q280,100 360,280" fill="none" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <path d="M280,280 Q360,140 440,280" fill="none" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <path d="M360,280 Q440,90 520,280" fill="none" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <path d="M440,280 Q520,160 600,280" fill="none" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <path d="M520,280 Q600,110 680,280" fill="none" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

          {/* Weighted sum = final B-spline curve (thick amber) */}
          <path
            d="M100,240 C140,230 170,180 220,150 S300,100 360,120 S430,180 480,140 S560,80 620,110 S680,200 700,220"
            fill="none"
            stroke={A}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* SiLU base (dashed green) */}
          <path
            d="M100,260 C200,255 300,240 400,200 S550,160 700,180"
            fill="none"
            stroke={GREEN}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.6"
          />

          {/* Control points */}
          {[
            [160, 200], [240, 150], [320, 110], [400, 130],
            [480, 150], [560, 90], [640, 130],
          ].map(([cx, cy], i) => (
            <g key={`cp-${i}`}>
              <line x1={cx} y1={cy} x2={cx} y2="280" stroke={A} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
              <circle cx={cx} cy={cy} r="6" fill={A} stroke="#fff" strokeWidth="1.5" />
              <text x={cx} y={cy - 12} textAnchor="middle" fill={A3} fontSize="9" fontWeight="600">{'c' + (i + 1)}</text>
            </g>
          ))}

          {/* Legend */}
          <rect x="82" y="44" width="200" height="75" rx="6" fill="rgba(0,0,0,0.5)" />
          <line x1="94" y1="62" x2="124" y2="62" stroke={A} strokeWidth="3" />
          <text x="130" y="66" fill={A} fontSize="10">Final activation (B-spline)</text>
          <line x1="94" y1="80" x2="124" y2="80" stroke={GREEN} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="130" y="84" fill={GREEN} fontSize="10" opacity="0.7">SiLU base function</text>
          <line x1="94" y1="98" x2="124" y2="98" stroke={GRAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <text x="130" y="102" fill={GRAY} fontSize="10">Basis functions B_i</text>
          <circle cx="109" cy="113" r="4" fill={A} stroke="#fff" strokeWidth="1" />
          <text x="130" y="117" fill={A3} fontSize="10">Control points (learnable)</text>
        </svg>
      </Diagram>

      <ConceptCard title="Why B-Splines? A Comparison of Function Representations" color={A} defaultOpen={true}>
        <ComparisonTable
          headers={['Representation', 'Local Support', 'Smooth', 'Refine-able', 'Gradient Friendly', 'Used in KAN?']}
          rows={[
            ['Fourier series', 'No (global)', 'Yes', 'Add frequencies', 'Yes', 'No — poor local control'],
            ['Polynomials', 'No (global)', 'Yes', 'Raise degree', 'Oscillates (Runge)', 'No — unstable'],
            ['RBF network', 'Yes (Gaussian)', 'Yes', 'Add centers', 'Yes', 'Considered, not chosen'],
            ['B-splines', 'Yes (k+1 spans)', 'Yes (C^{k-1})', 'Add knots', 'Excellent', 'Yes'],
          ]}
          caption="B-splines combine local support (each parameter only affects a small region), smoothness, and the ability to add resolution without retraining"
        />
        <Prose>
          <p>
            The killer feature of B-splines for KAN is <H tip="Grid refinement = adding more knot points to a B-spline without changing the function it represents. The existing curve is preserved exactly, and the new knots enable finer detail. This lets KAN train at low resolution first (fast) and then refine (accurate) — a form of curriculum learning." color={A}>grid refinement</H>: you can insert new knot points into an existing B-spline
            <em>without changing the function</em>. The existing curve is preserved exactly, and the new knots
            simply allow finer adjustments. This enables a train-coarse-then-refine strategy that no other
            function representation supports so cleanly.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="math">
        The total parameter count for a KAN layer connecting n_in inputs to n_out outputs with
        grid size G and spline order k is: n_in * n_out * (G + k + 1). For a [2, 5, 1] KAN with
        G=3, k=3: 2*5*(3+3+1) + 5*1*(3+3+1) = 70 + 35 = 105 parameters. An MLP with similar
        capacity would need thousands.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — B-SPLINE PARAMETERIZATION
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="04"
        title="B-Spline Parameterization and Grid Refinement"
        subtitle="Control points, knot vectors, and the train-coarse-then-refine strategy"
        color={A2}
      />

      <Prose>
        <p>
          A <H tip="B-spline of order k with G grid intervals = a piecewise polynomial of degree k, with G polynomial segments connected smoothly at the knot points. For k=3 (cubic), each segment is a cubic polynomial, and adjacent segments share matching values and first two derivatives at their knot points." color={A2}>B-spline of order k</H> on a grid with G intervals is defined by G+k <H tip="Control points in B-splines = sometimes called 'de Boor points.' Unlike Bezier control points, B-spline control points do not generally lie on the curve. Instead, they define the shape through a weighted combination of basis functions. Each control point coefficient c_i is a scalar weight." color={A2}>control point coefficients</H> and a knot vector of G+2k+1 values. The key parameters are:
        </p>
      </Prose>

      <StepFlow
        color={A2}
        steps={[
          {
            title: 'Knot Vector',
            desc: 'A non-decreasing sequence of values t_0, t_1, ..., t_{G+2k} that defines where the polynomial pieces connect. Uniform knots (equally spaced) are the default. The knot vector determines the "grid" of the spline — where the function is allowed to change behavior.',
          },
          {
            title: 'Control Point Coefficients',
            desc: 'The learnable parameters c_0, c_1, ..., c_{G+k-1}. Each c_i scales the corresponding basis function B_{i,k}. These are what gradient descent optimizes. More control points = finer approximation.',
          },
          {
            title: 'Spline Order k',
            desc: 'Determines smoothness. k=3 (cubic) is the default — the resulting spline has continuous first and second derivatives (C^2 smooth). Higher k gives smoother curves but more computation per evaluation.',
          },
          {
            title: 'Grid Size G',
            desc: 'The number of intervals. G=3 is coarse (3 polynomial segments), G=10 is fine (10 segments). Grid refinement = increasing G during training.',
          },
        ]}
      />

      {/* ── Grid refinement progression SVG ── */}
      <Diagram caption="Grid refinement: starting coarse (G=3) and progressively adding knot points. The function becomes more detailed without losing what was already learned.">
        <svg viewBox="0 0 900 300" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="900" height="300" rx="12" fill={BG} />

          {/* G=3 */}
          <text x="150" y="30" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">G = 3 (coarse)</text>
          <rect x="30" y="40" width="240" height="160" rx="8" fill="rgba(255,255,255,0.02)" stroke={GRAY} strokeWidth="0.5" />
          <line x1="50" y1="180" x2="250" y2="180" stroke={GRAY} strokeWidth="1" />
          <line x1="50" y1="180" x2="50" y2="50" stroke={GRAY} strokeWidth="1" />
          {/* 3 intervals = 4 knot lines */}
          {[50, 117, 183, 250].map((gx, i) => (
            <line key={`g3-k-${i}`} x1={gx} y1="175" x2={gx} y2="185" stroke={A2} strokeWidth="1.5" />
          ))}
          {/* Smooth coarse curve */}
          <path d="M50,160 C100,140 140,80 200,100 S240,140 250,130" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
          {/* Control points */}
          {[[80, 150], [140, 85], [200, 105], [235, 135]].map(([cx, cy], i) => (
            <circle key={`g3-cp-${i}`} cx={cx} cy={cy} r="4" fill={A} stroke="#fff" strokeWidth="1" />
          ))}
          <text x="150" y="210" textAnchor="middle" fill={GRAY} fontSize="10">6 params (G+k = 3+3)</text>

          {/* Arrow */}
          {ARROW(285, 130, 330, 130, A2)}
          <text x="308" y="120" textAnchor="middle" fill={A2} fontSize="10" fontWeight="600">refine</text>

          {/* G=5 */}
          <text x="460" y="30" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">G = 5 (medium)</text>
          <rect x="340" y="40" width="240" height="160" rx="8" fill="rgba(255,255,255,0.02)" stroke={GRAY} strokeWidth="0.5" />
          <line x1="360" y1="180" x2="560" y2="180" stroke={GRAY} strokeWidth="1" />
          <line x1="360" y1="180" x2="360" y2="50" stroke={GRAY} strokeWidth="1" />
          {[360, 400, 440, 480, 520, 560].map((gx, i) => (
            <line key={`g5-k-${i}`} x1={gx} y1="175" x2={gx} y2="185" stroke={A2} strokeWidth="1.5" />
          ))}
          <path d="M360,160 C390,145 410,90 440,80 S470,110 500,100 S530,75 545,100 S555,130 560,130" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
          {[[385, 148], [415, 88], [440, 82], [475, 105], [510, 92], [540, 85], [555, 118]].map(([cx, cy], i) => (
            <circle key={`g5-cp-${i}`} cx={cx} cy={cy} r="4" fill={A} stroke="#fff" strokeWidth="1" />
          ))}
          <text x="460" y="210" textAnchor="middle" fill={GRAY} fontSize="10">8 params (G+k = 5+3)</text>

          {/* Arrow */}
          {ARROW(595, 130, 640, 130, A2)}
          <text x="618" y="120" textAnchor="middle" fill={A2} fontSize="10" fontWeight="600">refine</text>

          {/* G=10 */}
          <text x="770" y="30" textAnchor="middle" fill={A2} fontSize="13" fontWeight="700">G = 10 (fine)</text>
          <rect x="650" y="40" width="240" height="160" rx="8" fill="rgba(255,255,255,0.02)" stroke={GRAY} strokeWidth="0.5" />
          <line x1="670" y1="180" x2="870" y2="180" stroke={GRAY} strokeWidth="1" />
          <line x1="670" y1="180" x2="670" y2="50" stroke={GRAY} strokeWidth="1" />
          {Array.from({ length: 11 }, (_, i) => 670 + i * 20).map((gx, i) => (
            <line key={`g10-k-${i}`} x1={gx} y1="175" x2={gx} y2="185" stroke={A2} strokeWidth="1" />
          ))}
          <path d="M670,155 C685,150 695,100 710,85 S725,68 740,75 S755,95 770,80 S785,60 800,70 S815,90 830,75 S845,55 855,80 S862,110 870,120" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
          {[[690, 120], [710, 87], [730, 72], [750, 82], [770, 78], [790, 65], [810, 82], [830, 72], [850, 62], [860, 88]].map(([cx, cy], i) => (
            <circle key={`g10-cp-${i}`} cx={cx} cy={cy} r="3" fill={A} stroke="#fff" strokeWidth="1" />
          ))}
          <text x="770" y="210" textAnchor="middle" fill={GRAY} fontSize="10">13 params (G+k = 10+3)</text>

          {/* Bottom note */}
          <rect x="200" y="240" width="500" height="40" rx="8" fill={A2} fillOpacity="0.08" stroke={A2} strokeWidth="0.5" />
          <text x="450" y="255" textAnchor="middle" fill={A2} fontSize="11" fontWeight="600">Grid refinement preserves the learned function exactly</text>
          <text x="450" y="270" textAnchor="middle" fill={FG} fontSize="10" opacity="0.7">New knots add capacity without destroying existing knowledge</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>Grid refinement in everyday terms:</strong> Imagine you are sculpting a face in clay. You start with a rough shape using your fists (G=3, coarse). Then you use your fingers to add detail to the nose and eyes (G=5, medium). Finally, you use a fine tool for eyelashes and pores (G=10, fine). At each step, you keep everything you built before and just add finer detail. This is exactly what grid refinement does to B-splines in KAN.</p>
      </SimpleExplain>

      <ConceptCard title="Grid Refinement: The Key Training Strategy" color={A2} defaultOpen={true}>
        <Prose>
          <p>
            The authors propose a <H tip="Coarse-to-fine training = a curriculum learning strategy where the model first learns a rough approximation with few parameters, then progressively adds capacity through grid refinement. This avoids overfitting early in training and focuses the model on the most important structure first." color={A2}>coarse-to-fine training</H> strategy:
          </p>
        </Prose>
        <StepFlow
          color={A2}
          steps={[
            {
              title: 'Phase 1: Train with G=3',
              desc: 'Start with very few parameters per edge. The network learns the broad structure of the function — the general shape without fine detail. Training is fast because there are so few parameters.',
            },
            {
              title: 'Phase 2: Refine to G=5 or G=10',
              desc: 'Insert new knots into each B-spline. The mathematical guarantee: the refined spline represents EXACTLY the same function as before refinement. The new parameters enable finer adjustments without losing what was learned.',
            },
            {
              title: 'Phase 3: Continue training',
              desc: 'The optimizer now has more parameters to work with and can capture fine details. This is like adding more pixels to an image — the broad structure stays, but details emerge.',
            },
          ]}
        />
        <Callout type="insight">
          Grid refinement is why KAN can achieve high accuracy with few parameters: it does not waste capacity
          on coarse structure during fine-grained learning. This is fundamentally different from simply making
          an MLP wider, which adds parameters everywhere regardless of where they are needed.
        </Callout>
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — TRAINING, PRUNING & INTERPRETABILITY
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="05"
        title="Training, Pruning, and Interpretability"
        subtitle="From overparameterized networks to symbolic formulas"
        color={GREEN}
      />

      <Prose>
        <p>
          One of the most striking claims of the KAN paper is that trained KANs can be <H tip="Interpretable = you can look at the learned network and understand WHAT function it has learned, not just that it produces correct outputs. In KAN, each edge is a 1D function that can be plotted and inspected. If the network learns f(x,y) = sin(x) + y^2, you can literally see the sine wave and parabola on individual edges." color={GREEN}>interpreted</H> — you can extract the actual mathematical formula the network has learned.
          This is possible because each edge is a one-dimensional function that can be <em>visualized</em> and, crucially,
          <H tip="Symbolic regression = fitting a symbolic mathematical expression (like x^2 + sin(x)) to data, rather than a black-box numerical model. KAN enables this by first training a numerical network, then replacing each learned B-spline with the symbolic function it most closely resembles." color={GREEN}>symbolically identified</H>. The pipeline from raw data to interpretable formula has three stages:
          <H tip="Sparsification = encouraging the network to zero out unnecessary edges. KAN uses L1 regularization on the activation functions, pushing unimportant edges toward zero. After sparsification, the network has a clean, minimal structure that is easier to interpret." color={PURPLE}>sparsification</H>, <H tip="Pruning = removing edges whose activation functions are close to zero (after sparsification). This simplifies the network architecture. In KAN, pruning is especially clean because each edge is an independent function — removing it does not affect other edges." color={PURPLE}>pruning</H>, and <H tip="Symbolification = the final step where each remaining B-spline activation is replaced with its closest symbolic function (sin, cos, exp, log, x^n, etc.). The authors provide a library of candidate functions and use least-squares fitting to find the best match." color={GREEN}>symbolification</H>.
        </p>
      </Prose>

      <StepFlow
        color={GREEN}
        steps={[
          {
            title: 'Step 1: Train the full network',
            desc: 'Start with a larger-than-needed KAN (more edges than required). Train on data with standard gradient descent plus L1 regularization on the spline activation magnitudes.',
          },
          {
            title: 'Step 2: Sparsification',
            desc: 'The L1 penalty pushes unimportant activations toward zero. Apply the L1 entropy regularization: penalize |phi|_1 for each edge activation. This encourages the network to concentrate its computation on a few important edges.',
          },
          {
            title: 'Step 3: Prune near-zero edges',
            desc: 'Remove edges whose activation magnitude falls below a threshold. This simplifies the network topology, often dramatically — a [4,8,8,1] network might simplify to [4,2,1,1].',
          },
          {
            title: 'Step 4: Symbolic fitting',
            desc: 'For each remaining edge, compare the learned B-spline to a library of symbolic candidates (sin, cos, exp, log, x^n, etc.). Replace each spline with the best-matching symbolic function via least-squares.',
          },
          {
            title: 'Step 5: Fine-tune symbolic coefficients',
            desc: 'With the symbolic structure locked in, optimize the remaining linear coefficients (scaling, shifting). The result: a closed-form mathematical expression extracted from a neural network.',
          },
        ]}
      />

      {/* ── Pruning visualization SVG ── */}
      <Diagram caption="Pruning pipeline: a fully-connected KAN is trained, then sparsified (L1 regularization), then pruned to reveal the minimal structure. Each surviving edge is a meaningful learned function.">
        <svg viewBox="0 0 900 320" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="900" height="320" rx="12" fill={BG} />

          {/* Stage 1: Full network */}
          <text x="140" y="30" textAnchor="middle" fill={GRAY} fontSize="12" fontWeight="700">FULL KAN [2,4,1]</text>
          {/* Input nodes */}
          {[100, 170].map((y, i) => (
            <circle key={`full-in-${i}`} cx="60" cy={y} r="14" fill="none" stroke={GRAY} strokeWidth="1.5" />
          ))}
          {/* Hidden nodes */}
          {[70, 120, 170, 220].map((y, i) => (
            <circle key={`full-h-${i}`} cx="160" cy={y} r="14" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1" />
          ))}
          {/* Output node */}
          <circle cx="260" cy="145" r="14" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1" />
          {/* All edges (dense) */}
          {[100, 170].map((iy, i) =>
            [70, 120, 170, 220].map((hy, j) => (
              <path key={`full-e1-${i}-${j}`} d={`M74,${iy} Q110,${(iy + hy) / 2} 146,${hy}`} fill="none" stroke={A} strokeWidth="1.5" opacity="0.6" />
            ))
          )}
          {[70, 120, 170, 220].map((hy, j) => (
            <path key={`full-e2-${j}`} d={`M174,${hy} Q210,${(hy + 145) / 2} 246,145`} fill="none" stroke={A} strokeWidth="1.5" opacity="0.6" />
          ))}
          <text x="140" y="260" textAnchor="middle" fill={GRAY} fontSize="10">8 + 4 = 12 edges</text>
          <text x="140" y="275" textAnchor="middle" fill={GRAY} fontSize="9" opacity="0.6">84 parameters (G=3, k=3)</text>

          {/* Arrow */}
          {ARROW(290, 145, 340, 145, PURPLE)}
          <text x="315" y="135" textAnchor="middle" fill={PURPLE} fontSize="10" fontWeight="600">L1 + prune</text>

          {/* Stage 2: Sparsified */}
          <text x="470" y="30" textAnchor="middle" fill={PURPLE} fontSize="12" fontWeight="700">AFTER PRUNING</text>
          {[100, 170].map((y, i) => (
            <circle key={`sparse-in-${i}`} cx="380" cy={y} r="14" fill="none" stroke={GRAY} strokeWidth="1.5" />
          ))}
          {/* Only 2 hidden nodes survive */}
          {[110, 170].map((y, i) => (
            <circle key={`sparse-h-${i}`} cx="480" cy={y} r="14" fill={PURPLE} fillOpacity="0.15" stroke={PURPLE} strokeWidth="1.5" />
          ))}
          <circle cx="580" cy="140" r="14" fill={PURPLE} fillOpacity="0.15" stroke={PURPLE} strokeWidth="1.5" />
          {/* Surviving edges */}
          <path d="M394,100 Q430,105 466,110" fill="none" stroke={A} strokeWidth="2.5" />
          <path d="M394,170 Q430,170 466,170" fill="none" stroke={A} strokeWidth="2.5" />
          <path d="M394,100 Q430,140 466,170" fill="none" stroke={A} strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />
          <path d="M494,110 Q530,125 566,140" fill="none" stroke={A} strokeWidth="2.5" />
          <path d="M494,170 Q530,155 566,140" fill="none" stroke={A} strokeWidth="2.5" />
          {/* Pruned edges (faint X) */}
          <text x="440" y="82" fill={RED} fontSize="10" opacity="0.5">x</text>
          <text x="440" y="205" fill={RED} fontSize="10" opacity="0.5">x</text>
          <text x="470" y="255" textAnchor="middle" fill={GRAY} fontSize="10">4 edges survive</text>
          <text x="470" y="270" textAnchor="middle" fill={GRAY} fontSize="9" opacity="0.6">28 parameters</text>

          {/* Arrow */}
          {ARROW(610, 140, 660, 140, GREEN)}
          <text x="635" y="130" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600">symbolify</text>

          {/* Stage 3: Symbolic */}
          <text x="780" y="30" textAnchor="middle" fill={GREEN} fontSize="12" fontWeight="700">SYMBOLIC FORMULA</text>
          <rect x="680" y="60" width="200" height="170" rx="10" fill={GREEN} fillOpacity="0.06" stroke={GREEN} strokeWidth="1" />
          {/* Show symbolic edges */}
          <text x="780" y="90" textAnchor="middle" fill={FG} fontSize="12" fontWeight="600">Extracted formula:</text>
          <text x="780" y="120" textAnchor="middle" fill={A} fontSize="14" fontFamily="'Courier New', monospace" fontWeight="700">f(x,y) =</text>
          <text x="780" y="148" textAnchor="middle" fill={A3} fontSize="16" fontFamily="'Courier New', monospace" fontWeight="700">sin(x) + y^2</text>
          <text x="780" y="180" textAnchor="middle" fill={GRAY} fontSize="10">Each edge became a named function</text>
          <text x="780" y="200" textAnchor="middle" fill={GREEN} fontSize="10" fontWeight="600">Exact symbolic match</text>
          <text x="780" y="220" textAnchor="middle" fill={GRAY} fontSize="9" opacity="0.6">0 free parameters</text>

          {/* Bottom note */}
          <rect x="200" y="288" width="500" height="26" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="0.5" />
          <text x="450" y="306" textAnchor="middle" fill={GREEN} fontSize="11" fontWeight="600">From 84 parameters to a closed-form formula in 3 steps</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>The interpretability story in plain English:</strong> Imagine you train a KAN on data generated by f(x,y) = sin(x) + y squared, but you do not tell the network the formula. After training, you can literally look at each edge: one edge from x learned to draw a sine wave, one edge from y learned to draw a parabola, and the output node just adds them. You look at the network and read off the formula. With a traditional MLP, you would see hundreds of ReLU neurons and no way to extract the formula.</p>
      </SimpleExplain>

      <ConceptCard title="Sparsification: L1 Regularization on Activations" color={PURPLE} defaultOpen={false}>
        <Prose>
          <p>
            KAN uses an <H tip="L1 regularization = adding a penalty proportional to the absolute value of parameters. Unlike L2 (which shrinks parameters toward zero), L1 actually drives parameters to exactly zero, creating sparsity. In KAN, L1 is applied to the magnitude of each edge's activation function, not to individual control points." color={PURPLE}>L1 entropy regularization</H> that penalizes the overall magnitude of each edge's
            activation function. For each layer, the regularization computes the average absolute activation
            across input samples, then penalizes the entropy of these magnitudes. This encourages the network
            to concentrate its computation on a few edges with large activations while driving the rest to zero.
          </p>
        </Prose>
        <FormulaBlock
          math="\mathcal{L}_{\text{reg}} = \sum_{\text{layers}} \left( \mu_1 \sum_{i,j} |\phi_{i,j}|_1 + \mu_2 \, H\!\left(\frac{|\phi_{i,j}|_1}{\sum_{i,j} |\phi_{i,j}|_1}\right) \right)"
          label="KAN Sparsification Loss"
          color={PURPLE}
          symbols={[
            { symbol: '|phi|_1', meaning: 'Average absolute activation magnitude on edge (i,j)' },
            { symbol: 'H', meaning: 'Entropy function, encourages sparse activation distribution' },
            { symbol: 'mu_1, mu_2', meaning: 'Regularization strength hyperparameters' },
          ]}
        />
      </ConceptCard>

      <Callout type="key">
        The interpretability pipeline (train, sparsify, prune, symbolify) is what distinguishes KAN
        from being "just another architecture." For scientific discovery — finding the equations of
        physics, chemistry, or biology from data — extracting a symbolic formula is worth more than
        any improvement in test loss. KAN has successfully rediscovered known formulas for <H tip="Knot invariants = mathematical objects that distinguish different types of knots. The Jones polynomial, for example, assigns a polynomial to each knot type. KAN was used to rediscover relationships between different knot invariants from data." color={GREEN}>knot invariants</H> and <H tip="Anderson localization = a quantum physics phenomenon where waves (electrons, photons) become trapped in disordered media instead of propagating. The critical parameters governing localization follow mathematical laws that KAN can discover from simulation data." color={GREEN}>Anderson localization</H>{' '}
        transitions in condensed matter physics.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — RESULTS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="06"
        title="Results — Accuracy vs. Parameter Efficiency"
        subtitle="10-100x fewer parameters on scientific and mathematical tasks"
        color={A}
      />

      <Prose>
        <p>
          The headline results of KAN are about <H tip="Parameter efficiency = achieving a given level of accuracy with fewer learnable parameters. A more parameter-efficient model needs less memory, trains faster, and generalizes better (less overfitting risk). KAN achieves dramatically better parameter efficiency than MLPs on tasks with underlying mathematical structure." color={A}>parameter efficiency</H>, not raw speed.
          On tasks where the underlying function has clean mathematical structure — regression, differential
          equations, physics simulations — KANs achieve the same accuracy as MLPs with <strong>10-100x fewer parameters</strong>.
          The authors demonstrate this on five categories of benchmarks, with KAN consistently matching or beating
          MLPs at a fraction of the model size.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '100x', unit: '', label: 'Fewer Params (regression)', color: A },
          { value: '3x', unit: '', label: 'Better Scaling Exponent', color: A2 },
          { value: 'G=3 to 20', unit: '', label: 'Grid Refinement Range', color: CYAN },
          { value: '5', unit: ' tasks', label: 'Benchmark Categories', color: GREEN },
        ]}
      />

      {/* ── Accuracy vs Parameters chart ── */}
      <Diagram caption="Accuracy (RMSE) vs parameters: KAN (amber) achieves lower error with far fewer parameters than MLP (blue) on function fitting tasks. Lower and further left is better.">
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="380" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="28" textAnchor="middle" fill={FG} fontSize="13" fontWeight="700">PARAMETER EFFICIENCY: KAN vs MLP</text>

          {/* Axes */}
          <line x1="100" y1="310" x2="720" y2="310" stroke={GRAY} strokeWidth="1.5" />
          <line x1="100" y1="310" x2="100" y2="50" stroke={GRAY} strokeWidth="1.5" />
          {LABEL(400, 350, 'Number of Parameters (log scale)', GRAY, 11)}
          <text x="40" y="180" fill={GRAY} fontSize="11" textAnchor="middle" transform="rotate(-90, 40, 180)">Test RMSE (log scale)</text>

          {/* X-axis labels */}
          {[
            [130, '10'], [230, '100'], [330, '1K'], [430, '10K'], [530, '100K'], [630, '1M'],
          ].map(([x, label]) => (
            <g key={`xa-${label}`}>
              <line x1={x} y1="310" x2={x} y2="315" stroke={GRAY} strokeWidth="1" />
              <text x={x} y="328" textAnchor="middle" fill={GRAY} fontSize="10">{label}</text>
            </g>
          ))}

          {/* Y-axis labels */}
          {[
            [280, '10^-1'], [220, '10^-3'], [160, '10^-5'], [100, '10^-7'],
          ].map(([y, label]) => (
            <g key={`ya-${label}`}>
              <line x1="95" y1={y} x2="100" y2={y} stroke={GRAY} strokeWidth="1" />
              <text x="88" y={Number(y) + 4} textAnchor="end" fill={GRAY} fontSize="9">{label}</text>
              <line x1="100" y1={y} x2="720" y2={y} stroke={GRAY} strokeWidth="0.5" opacity="0.15" />
            </g>
          ))}

          {/* MLP curve (blue) — needs many more params */}
          <path d="M230,290 L330,260 L430,220 L530,180 L630,150" fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
          {[[230, 290], [330, 260], [430, 220], [530, 180], [630, 150]].map(([cx, cy], i) => (
            <g key={`mlp-pt-${i}`}>
              <circle cx={cx} cy={cy} r="5" fill={BLUE} stroke="#fff" strokeWidth="1.5" />
            </g>
          ))}
          <text x="650" y="145" fill={BLUE} fontSize="11" fontWeight="600">MLP</text>

          {/* KAN curve (amber) — much fewer params for same accuracy */}
          <path d="M130,285 L200,240 L270,185 L350,140 L430,100" fill="none" stroke={A} strokeWidth="2.5" strokeLinecap="round" />
          {[[130, 285], [200, 240], [270, 185], [350, 140], [430, 100]].map(([cx, cy], i) => (
            <g key={`kan-pt-${i}`}>
              <circle cx={cx} cy={cy} r="6" fill={A} stroke="#fff" strokeWidth="1.5" />
              {/* Grid refinement labels */}
              {i < 4 && <text x={cx + 12} y={cy - 8} fill={A3} fontSize="8" fontWeight="600">{['G=3', 'G=5', 'G=10', 'G=20'][i]}</text>}
            </g>
          ))}
          <text x="450" y="95" fill={A} fontSize="11" fontWeight="600">KAN</text>

          {/* Horizontal comparison line */}
          <line x1="270" y1="185" x2="530" y2="185" stroke={RED} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
          <text x="400" y="178" textAnchor="middle" fill={RED} fontSize="9" fontWeight="600">Same accuracy</text>
          <text x="400" y="200" textAnchor="middle" fill={FG} fontSize="9" opacity="0.7">KAN: ~300 params vs MLP: ~100K params</text>

          {/* Arrow showing the gap */}
          <line x1="280" y1="210" x2="520" y2="210" stroke={RED} strokeWidth="1.5" markerEnd="url(#ah-ef4444)" />
          <line x1="520" y1="210" x2="280" y2="210" stroke={RED} strokeWidth="1.5" markerEnd="url(#ah-ef4444)" />
          <text x="400" y="225" textAnchor="middle" fill={RED} fontSize="10" fontWeight="600">~300x fewer parameters</text>

          {/* Legend */}
          <rect x="580" y="55" width="130" height="65" rx="6" fill="rgba(0,0,0,0.4)" />
          <line x1="592" y1="72" x2="622" y2="72" stroke={A} strokeWidth="2.5" />
          <circle cx="607" cy="72" r="4" fill={A} stroke="#fff" strokeWidth="1" />
          <text x="628" y="76" fill={A} fontSize="10">KAN</text>
          <line x1="592" y1="92" x2="622" y2="92" stroke={BLUE} strokeWidth="2.5" />
          <circle cx="607" cy="92" r="4" fill={BLUE} stroke="#fff" strokeWidth="1" />
          <text x="628" y="96" fill={BLUE} fontSize="10">MLP</text>
          <text x="635" y="112" textAnchor="middle" fill={GRAY} fontSize="8">Lower left = better</text>
        </svg>
      </Diagram>

      <ComparisonTable
        headers={['Task Domain', 'KAN Configuration', 'MLP Equivalent', 'Param Ratio', 'KAN Advantage']}
        rows={[
          ['Function fitting', '[2, 5, 1] G=10', '4-layer, 128 wide', '~100x fewer', 'Exact symbolic recovery'],
          ['PDE solving', '[2, 5, 5, 1] G=5', '6-layer, 64 wide', '~50x fewer', 'Better generalization'],
          ['Knot invariants', '[4, 2, 1, 1] symbolic', 'Standard MLP', '~100x fewer', 'Rediscovered known formulas'],
          ['Continual learning', 'Grid refinement', 'Re-training', 'N/A', 'No catastrophic forgetting'],
          ['Special functions', '[1, 5, 1] G=20', '2-layer, 256 wide', '~30x fewer', 'Higher precision'],
        ]}
        caption="KAN consistently achieves better parameter efficiency, with the largest gains on tasks with clean mathematical structure"
      />

      <ConceptCard title="Scaling Laws: KAN Has a Steeper Exponent" color={A} defaultOpen={false}>
        <Prose>
          <p>
            Both KAN and MLP obey <H tip="Neural scaling laws = empirical observation that test loss L scales as a power law with the number of parameters N: L ~ N^(-alpha). Larger alpha means faster improvement per parameter added. KAN achieves alpha ~ 3-4 while MLP gets alpha ~ 1-2 on the same tasks." color={A}>neural scaling laws</H>: test loss decreases as a power law with parameters.
            But KAN has a steeper <H tip="Scaling exponent alpha = the exponent in the power law L ~ N^(-alpha). Alpha = 2 means doubling parameters cuts loss by a factor of 4. Alpha = 4 means doubling parameters cuts loss by 16x. KAN's higher alpha means it benefits much more from each additional parameter." color={A}>scaling exponent</H>. For function fitting tasks:
          </p>
          <p>
            <strong>MLP:</strong> RMSE scales as N^(-alpha) with alpha around 1-2.
          </p>
          <p>
            <strong>KAN:</strong> RMSE scales as N^(-alpha) with alpha around 3-4.
          </p>
          <p>
            This means adding parameters to a KAN yields <em>exponentially</em> more benefit than adding them to an MLP.
            The authors attribute this to the <H tip="Curse of dimensionality in MLPs = MLPs approximate functions by partitioning the input space into hyperrectangles. As dimension grows, the number of hyperrectangles needed grows exponentially. KAN avoids this by decomposing into 1D functions, which only need to partition 1D intervals." color={RED}>curse of dimensionality</H>: MLPs partition high-dimensional space, while KANs
            decompose into one-dimensional problems (thanks to the KA theorem) and only need to partition 1D intervals.
          </p>
        </Prose>
      </ConceptCard>

      <VisualCompare
        leftLabel="Where KAN Excels"
        rightLabel="Where MLPs Still Win"
        leftColor={A}
        rightColor={BLUE}
        left={<>
          <p style={{color: GREEN}}>Scientific function fitting (10-100x fewer params)</p>
          <p style={{color: GREEN}}>PDE solving and physics simulation</p>
          <p style={{color: GREEN}}>Symbolic regression / formula discovery</p>
          <p style={{color: GREEN}}>Interpretability-critical applications</p>
          <p>Continual learning (grid refinement, no forgetting)</p>
        </>}
        right={<>
          <p style={{color: BLUE}}>Large-scale language modeling (speed matters)</p>
          <p style={{color: BLUE}}>Computer vision at scale (ResNets, ViTs)</p>
          <p>High-throughput inference (B-splines are slower per FLOP)</p>
          <p>Tasks without clean mathematical structure</p>
          <p>GPU-optimized matrix multiplication pipelines</p>
        </>}
        caption="KAN is not a universal MLP replacement — it shines where parameter efficiency and interpretability matter most"
      />

      <Callout type="warning">
        Honest assessment: KAN is <strong>slower per parameter</strong> than MLP because B-spline evaluation
        involves table lookups and interpolation rather than simple matrix multiplications that GPUs are optimized
        for. A KAN with 100 parameters may outperform an MLP with 10,000 parameters in accuracy, but the MLP
        will train and infer faster on modern hardware. KAN trades <H tip="FLOPs (floating point operations per second) = the standard measure of computational cost. MLPs are dominated by dense matrix multiplications, which GPUs execute at near-peak FLOPS. B-spline evaluation is memory-bound (table lookups), which underutilizes GPU compute. This is KAN's main practical weakness." color={RED}>computational efficiency</H> for parameter efficiency.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — MENTAL MODELS
          ═══════════════════════════════════════════════════════════ */}

      <SectionHeader
        num="07"
        title="Mental Models for KAN"
        subtitle="Intuitive frameworks for understanding Kolmogorov-Arnold Networks"
        color={PURPLE}
      />

      <MentalModel
        title="The Orchestra Analogy"
        analogy="In an MLP, every musician (node) plays through the same instrument (ReLU/GELU) — they can only control volume (weights). In a KAN, every cable between musicians (edge) IS the instrument — each one is a unique instrument that can produce any sound. The musicians themselves just listen and add up what they hear. The music comes from the cables, not the performers."
        technical="Formally, MLP computes each layer as sigma(Wx + b) where sigma is a fixed nonlinearity. KAN computes each layer as sum_i phi_i(x_i) where each phi_i is an independent learnable B-spline. The activation function has moved from the node to the edge and become learnable."
        color={A}
      />

      <MentalModel
        title="The Photography vs Painting Analogy"
        analogy="An MLP is like a digital photograph: it stores the image as millions of fixed-brightness pixels (ReLU neurons with learned weights). To capture more detail, you need more pixels. A KAN is like a vector illustration: it stores the image as a few mathematical curves (B-splines) that can be infinitely rescaled. A vector logo with 100 control points can look sharper than a 10,000-pixel photo because curves are more expressive than pixels for structured data."
        technical="This analogy maps to the scaling law difference: MLPs approximate functions by piecewise-linear partitioning of the input space (like pixels), while KANs approximate via compositions of smooth 1D functions (like curves). For smooth target functions, the curve representation has exponentially better approximation rates — O(k^(-4)) for cubic splines vs O(N^(-2/d)) for piecewise-linear in d dimensions."
        color={CYAN}
      />

      <MentalModel
        title="The Swiss Army Knife vs Custom Tool"
        analogy="A ReLU neuron is a Swiss Army knife: it works for everything but is optimal for nothing. A KAN edge is a custom-forged tool: during training, each edge reshapes itself into exactly the tool needed for its job. One edge might become a screwdriver (linear function), another a saw (periodic function), another a hammer (threshold function). When you inspect the toolbox afterward, each tool tells you what job it learned to do."
        technical="The key insight is that B-splines form a universal approximation class for C^k functions, so each edge can approximate any smooth function to arbitrary precision via grid refinement. The residual formulation phi(x) = w_b*silu(x) + w_s*spline(x) ensures stable initialization while allowing the spline to eventually dominate."
        color={GREEN}
      />

      {/* ── KAN in the bigger picture SVG ── */}
      <Diagram caption="KAN in the landscape of neural network design: positioning KANs relative to MLPs, attention networks, and other architectures along the axes of interpretability and parameter efficiency">
        <svg viewBox="0 0 800 360" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <rect width="800" height="360" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="28" textAnchor="middle" fill={FG} fontSize="13" fontWeight="700">WHERE KAN FITS IN THE LANDSCAPE</text>

          {/* Axes */}
          <line x1="100" y1="300" x2="720" y2="300" stroke={GRAY} strokeWidth="1.5" />
          <line x1="100" y1="300" x2="100" y2="50" stroke={GRAY} strokeWidth="1.5" />
          {ARROW(720, 300, 740, 300, GRAY)}
          {ARROW(100, 50, 100, 35, GRAY)}
          {LABEL(420, 340, 'Parameter Efficiency', GRAY, 11)}
          <text x="45" y="170" fill={GRAY} fontSize="11" textAnchor="middle" transform="rotate(-90, 45, 170)">Interpretability</text>

          {/* Quadrant labels */}
          <text x="200" y="70" fill={GRAY} fontSize="9" opacity="0.4">Low Efficiency, High Interpretability</text>
          <text x="520" y="70" fill={GREEN} fontSize="9" opacity="0.6">High Efficiency, High Interpretability</text>
          <text x="200" y="290" fill={GRAY} fontSize="9" opacity="0.4">Low Efficiency, Low Interpretability</text>
          <text x="520" y="290" fill={GRAY} fontSize="9" opacity="0.4">High Efficiency, Low Interpretability</text>

          {/* Architectures as points */}
          {/* Standard MLP */}
          <circle cx="250" cy="240" r="18" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.5" />
          <text x="250" y="244" textAnchor="middle" fill={BLUE} fontSize="10" fontWeight="600">MLP</text>

          {/* Transformer */}
          <circle cx="200" cy="260" r="18" fill={PURPLE} fillOpacity="0.2" stroke={PURPLE} strokeWidth="1.5" />
          <text x="200" y="264" textAnchor="middle" fill={PURPLE} fontSize="9" fontWeight="600">Transf.</text>

          {/* Linear Regression */}
          <circle cx="300" cy="100" r="18" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="300" y="104" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="600">LinReg</text>

          {/* Decision Tree */}
          <circle cx="350" cy="130" r="18" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="350" y="134" textAnchor="middle" fill={GREEN} fontSize="9" fontWeight="600">DTree</text>

          {/* Sparse MLP */}
          <circle cx="400" cy="200" r="18" fill={CYAN} fillOpacity="0.15" stroke={CYAN} strokeWidth="1.5" />
          <text x="400" y="204" textAnchor="middle" fill={CYAN} fontSize="9" fontWeight="600">Sparse</text>

          {/* KAN */}
          <circle cx="580" cy="100" r="28" fill={A} fillOpacity="0.25" stroke={A} strokeWidth="2.5" />
          <text x="580" y="96" textAnchor="middle" fill={A} fontSize="14" fontWeight="800">KAN</text>
          <text x="580" y="112" textAnchor="middle" fill={A3} fontSize="8">B-spline edges</text>

          {/* Arrow from MLP to KAN */}
          <path d="M268,230 Q420,150 555,110" fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
          <text x="420" y="158" fill={A} fontSize="9" fontWeight="600" opacity="0.7">KAN innovation</text>

          {/* Symbolic Regression */}
          <circle cx="620" cy="70" r="16" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="620" y="74" textAnchor="middle" fill={GREEN} fontSize="8" fontWeight="600">SymReg</text>

          {/* Bottom note */}
          <rect x="150" y="315" width="500" height="26" rx="8" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="0.5" />
          <text x="400" y="333" textAnchor="middle" fill={A} fontSize="11" fontWeight="600">KAN uniquely combines high parameter efficiency with high interpretability</text>
        </svg>
      </Diagram>

      <ConceptCard title="Key Limitations and Open Questions" color={RED} defaultOpen={false}>
        <Prose>
          <p>
            <strong>Computational cost.</strong> B-spline evaluation is inherently sequential and
            memory-bound, making KANs <H tip="Slower in wall-clock time = while KAN needs fewer parameters and fewer total FLOPs for a given accuracy, each FLOP is slower because B-spline evaluation involves memory lookups rather than the dense matrix multiplications that GPUs are optimized for. This gap may close with custom CUDA kernels." color={RED}>3-10x slower per FLOP</H> than
            equivalent MLPs on GPUs. Custom CUDA kernels could close this gap, but they do not exist yet.
          </p>
          <p>
            <strong>Scaling to large models.</strong> KAN has been demonstrated on networks with thousands to
            millions of parameters. Whether the advantages persist at the <H tip="Billion-parameter scale = the scale of modern LLMs (GPT-4, Claude, Llama). At this scale, the engineering challenges of KAN (custom kernels, distributed training, memory management for millions of B-spline edges) are open problems." color={RED}>billion-parameter scale</H> of modern LLMs is an open question.
          </p>
          <p>
            <strong>Unstructured data.</strong> KAN excels on data with underlying mathematical structure
            (physics, chemistry, pure math). On <H tip="Unstructured data = data without clean mathematical patterns, like natural images, audio, or free-form text. The advantage of B-splines over ReLU is less clear when the target function is highly irregular or when the data is high-dimensional without low-dimensional structure." color={RED}>unstructured data</H> like natural language or natural images, the advantages are less clear
            and MLPs/Transformers remain dominant.
          </p>
          <p>
            <strong>Combination with attention.</strong> Can KAN layers replace the <H tip="Feed-forward network (FFN) = the MLP component inside each Transformer block. It processes each token independently through two linear projections with an activation in between. Replacing this with a KAN layer is a promising but unexplored direction." color={A}>FFN layers inside Transformers</H>?
            This is an exciting research direction that could bring KAN's parameter efficiency to large language models.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        KAN represents a genuine paradigm shift for scientific machine learning: moving learnable
        expressiveness from nodes to edges, grounded in a 67-year-old theorem from pure mathematics.
        For tasks where interpretability and parameter efficiency matter more than raw throughput —
        physics discovery, symbolic regression, mathematical modeling — KANs are already the state of
        the art. The open question is whether this architectural philosophy can be scaled and accelerated
        to compete with MLPs on the tasks where brute-force compute currently dominates.
      </Callout>

      <MentalModel
        title="The Final Picture"
        analogy="MLPs are like learning to paint with a fixed set of primary colors (ReLU/GELU) and adjustable amounts of each (weights). You can mix any color, but you always start from the same primaries. KANs are like learning to paint where each brush can morph into any color it needs — the brush IS the creative medium. Fewer brushes, but each one is infinitely more versatile."
        technical="The Kolmogorov-Arnold representation theorem guarantees that this approach is theoretically complete: any continuous function can be decomposed into compositions of univariate functions. KAN makes this practical through B-spline parameterization, residual formulation, grid refinement, and the sparsification-to-symbolification pipeline. The result is the first neural architecture where you can reliably extract the formula the network has learned."
        color={A}
      />
    </>
  );
}
