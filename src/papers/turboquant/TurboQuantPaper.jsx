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
const A = '#f59e0b';   // amber accent
const A2 = '#d97706';  // darker amber
const A3 = '#fbbf24';  // lighter amber
const BG = '#1e1b16';  // warm dark bg for SVGs
const FG = '#fef3c7';  // warm light text in SVGs
const GRAY = '#78716c'; // muted gray
const GREEN = '#22c55e';
const BLUE = '#3b82f6';
const PURPLE = '#a855f7';
const RED = '#ef4444';

export default function TurboQuantPaper() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 01 — THE CORE PROBLEM
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="01"
        title="The Core Problem"
        subtitle="Compressing high-dimensional vectors while preserving their geometry"
      />

      <Prose>
        <p>
          Imagine you have a billion vectors, each with 128 dimensions, stored as 32-bit floats.
          That is <strong>512 GB</strong> of raw data. Now imagine you need to search through all of them
          in milliseconds to find the nearest neighbor to a query. Or imagine those vectors are the
          key-value cache of a large language model serving thousands of concurrent users, and your GPU
          memory is the bottleneck. This is the <strong>vector quantization</strong> problem: how do
          you compress high-dimensional vectors into compact codes while preserving the geometric
          relationships (distances, inner products) that downstream tasks rely on?
        </p>
        <p>
          TurboQuant attacks this problem with a beautifully simple idea: <em>randomly rotate your
          vectors, then quantize each coordinate independently</em>. The result is an algorithm that
          is near-optimal in the information-theoretic sense, requires zero indexing time, and works
          as a drop-in replacement for existing KV cache compression and nearest-neighbor search
          pipelines.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '\u22482.7\u00d7', unit: '', label: 'Of info-theoretic bound', color: A },
          { value: '3.5', unit: ' bits', label: 'Quality-neutral KV cache', color: A2 },
          { value: '0', unit: ' sec', label: 'Indexing time', color: GREEN },
          { value: '128d', unit: '', label: 'Typical vector dim', color: BLUE },
        ]}
      />

      <ConceptCard title="Why does this matter RIGHT NOW?" color={A} defaultOpen={true}>
        <Prose>
          <p>Three converging trends make fast, high-quality vector quantization critical:</p>
          <p>
            <strong>1. KV Cache Compression.</strong> Every token a Transformer generates stores a
            key and a value vector in the KV cache. For a model like Llama-3-70B serving 128K-context
            requests, the KV cache alone can consume <strong>40+ GB per user</strong>. Quantizing
            these vectors from 16 bits to 3-4 bits per dimension can cut memory by 4-5x with
            negligible quality loss.
          </p>
          <p>
            <strong>2. Nearest-Neighbor Search.</strong> Vector databases (Pinecone, Weaviate, Milvus)
            store billions of embeddings. Product Quantization (PQ) has been the workhorse for
            decades, but it requires expensive codebook training and is suboptimal for skewed
            distributions. TurboQuant needs no training at all.
          </p>
          <p>
            <strong>3. Model Weight Quantization.</strong> Compressing the weights of a 70B-parameter
            model from FP16 to 4-bit enables inference on consumer GPUs. The distortion-rate tradeoff
            of the quantizer directly determines model quality degradation.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="key">
        TurboQuant is the first practical quantizer that comes with a provable guarantee: its
        distortion is within a constant factor (about 2.7x) of the information-theoretic minimum
        for ANY randomized quantizer. No training, no codebooks, no iterative optimization.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02 — THE CORE INSIGHT: RANDOM ROTATION
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="02"
        title="The Core Insight \u2014 Random Rotation"
        subtitle="Turning vector quantization into independent scalar quantization"
      />

      <Prose>
        <p>
          The fundamental challenge of vector quantization is that coordinates of a real-world vector
          are typically <em>correlated</em>. Word embeddings, attention keys, image features -- they
          all have structure that means some directions carry more information than others. Designing
          an optimal quantizer for correlated data is NP-hard in general.
        </p>
        <p>
          TurboQuant sidesteps this entirely with one elegant move: <strong>multiply the vector by a
          random rotation matrix</strong>. After rotation, every coordinate has the same marginal
          distribution, and they become nearly independent in high dimensions. This means you can
          quantize each coordinate separately using the same scalar quantizer -- the optimal one for
          that known distribution.
        </p>
      </Prose>

      <Diagram caption="Random Rotation Insight: arbitrary vector on the sphere becomes uniformly spread across coordinates after random rotation">
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-arrow-amber" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <linearGradient id="tq-grad-sphere" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={A} stopOpacity="0.3" />
              <stop offset="100%" stopColor={A} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="800" height="380" rx="12" fill={BG} />

          {/* LEFT: Before rotation */}
          <text x="140" y="32" fill={A} fontSize="14" fontWeight="700" textAnchor="middle">BEFORE ROTATION</text>

          {/* Unit sphere */}
          <circle cx="140" cy="170" r="100" fill="url(#tq-grad-sphere)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="140" y="290" fill={GRAY} fontSize="11" textAnchor="middle">Unit sphere S^(d-1)</text>

          {/* Arbitrary vector -- clustered energy */}
          <line x1="140" y1="170" x2="215" y2="95" stroke={A3} strokeWidth="2.5" markerEnd="url(#tq-arrow-amber)" />
          <text x="222" y="88" fill={A3} fontSize="12" fontWeight="600">x</text>

          {/* Coordinate bars (skewed) */}
          <text x="50" y="322" fill={GRAY} fontSize="10">Coordinates:</text>
          {[0.82, 0.55, 0.12, 0.04, 0.01, 0.01].map((v, i) => (
            <g key={i}>
              <rect x={115 + i * 22} y={320 - v * 40} width="16" height={v * 40} rx="2" fill={A} opacity={0.5 + v * 0.5} />
              <text x={123 + i * 22} y={335} fill={GRAY} fontSize="8" textAnchor="middle">x{i + 1}</text>
            </g>
          ))}
          <text x="140" y="360" fill={FG} fontSize="10" textAnchor="middle" opacity="0.7">Energy concentrated</text>

          {/* Arrow: rotation */}
          <line x1="290" y1="170" x2="390" y2="170" stroke={A} strokeWidth="2" markerEnd="url(#tq-arrow-amber)" />
          <rect x="305" y="147" width="70" height="24" rx="6" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1" />
          <text x="340" y="163" fill={A} fontSize="12" fontWeight="700" textAnchor="middle">{'\u03A0 \u00b7 x'}</text>
          <text x="340" y="135" fill={FG} fontSize="10" textAnchor="middle" opacity="0.6">Random rotation</text>

          {/* RIGHT: After rotation */}
          <text x="560" y="32" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">AFTER ROTATION</text>

          {/* Unit sphere */}
          <circle cx="560" cy="170" r="100" fill="url(#tq-grad-sphere)" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="560" y="290" fill={GRAY} fontSize="11" textAnchor="middle">Still on S^(d-1)</text>

          {/* Rotated vector -- more spread */}
          <line x1="560" y1="170" x2="630" y2="105" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#tq-arrow-amber)" />
          <text x="637" y="100" fill={GREEN} fontSize="12" fontWeight="600">{'\u03A0x'}</text>

          {/* Coordinate bars (uniform-ish) */}
          <text x="470" y="322" fill={GRAY} fontSize="10">Coordinates:</text>
          {[0.41, 0.38, 0.42, 0.39, 0.40, 0.37].map((v, i) => (
            <g key={i}>
              <rect x={535 + i * 22} y={320 - v * 40} width="16" height={v * 40} rx="2" fill={GREEN} opacity="0.7" />
              <text x={543 + i * 22} y={335} fill={GRAY} fontSize="8" textAnchor="middle">y{i + 1}</text>
            </g>
          ))}
          <text x="560" y="360" fill={FG} fontSize="10" textAnchor="middle" opacity="0.7">Energy spread uniformly</text>

          {/* Bottom insight */}
          <rect x="200" y="300" width="200" height="30" rx="8" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1" />
          <text x="300" y="320" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">{'Each y_i ~ Beta(\u00bd, (d-1)/2)'}</text>
        </svg>
      </Diagram>

      <ConceptCard title="Lemma 1: Coordinate Distribution on the Hypersphere" color={A} defaultOpen={true}>
        <Prose>
          <p>
            Here is the key mathematical fact that makes TurboQuant work. If you take a unit vector
            on the d-dimensional sphere and apply a random rotation (sampled uniformly from the
            orthogonal group), then <em>each coordinate</em> of the rotated vector follows a known
            distribution: a scaled Beta distribution.
          </p>
          <p>
            More precisely, if <code>y = \u03A0 \u00b7 x</code> where \u03A0 is a random rotation and x is on the
            unit sphere, then the squared coordinate <code>y_i^2</code> follows a
            <strong> Beta(1/2, (d-1)/2)</strong> distribution. As the dimension d grows, this
            converges to a Gaussian with mean 0 and variance 1/d.
          </p>
        </Prose>
        <FormulaBlock
          math="y_i^2 \sim \text{Beta}\\!\left(\\tfrac{1}{2},\\, \\tfrac{d-1}{2}\right) \quad \\Longrightarrow \quad y_i \approx \mathcal{N}\\!\left(0,\\, \\tfrac{1}{d}\right) \text{ as } d \to \infty"
          label="Lemma 1 \u2014 Coordinate Distribution"
          color={A}
          symbols={[
            { symbol: 'y_i', meaning: 'i-th coordinate of the rotated vector \u03A0 \u00b7 x' },
            { symbol: 'd', meaning: 'Ambient dimension of the vectors' },
            { symbol: 'Beta(a,b)', meaning: 'Beta distribution with shape parameters a, b' },
            { symbol: '\u2115(0, 1/d)', meaning: 'Gaussian with zero mean and variance 1/d' },
            { symbol: '\u03A0', meaning: 'Random rotation matrix (uniform over orthogonal group O(d))' },
          ]}
        />
      </ConceptCard>

      <Callout type="insight">
        This is genuinely beautiful: a random rotation &ldquo;democratizes&rdquo; the energy of any vector across
        all coordinates. No matter how lopsided the original vector was, after rotation every
        coordinate carries roughly 1/d of the total energy. Since we know the exact distribution, we
        can design the optimal scalar quantizer for it -- the classical Lloyd-Max quantizer.
      </Callout>

      <MentalModel
        title="Shuffling a Deck of Cards"
        analogy="Imagine your vector's energy is distributed like a sorted deck of cards -- all the aces on top, all the twos next, etc. The random rotation is like a perfect riffle shuffle: after enough shuffles, every position in the deck is equally likely to hold any card. You've destroyed the structure (correlations) and made every position statistically identical."
        technical="Formally, a Haar-random rotation is the unique measure on O(d) that is invariant under left and right multiplication. This invariance guarantees that the marginal distribution of each coordinate depends only on the norm of the vector, not its direction."
        color={A}
      />

      <ConceptCard title="From Beta Distribution to Lloyd-Max Quantizer" color={A2} defaultOpen={false}>
        <Prose>
          <p>
            Once we know each coordinate follows <code>Beta(1/2, (d-1)/2)</code> scaled to
            [-1, +1], we can precompute the <strong>optimal scalar quantizer</strong> for this
            distribution. The Lloyd-Max algorithm (1957/1960) finds the partition thresholds and
            reconstruction points that minimize mean squared error for a given number of bits.
          </p>
          <p>
            For b bits per coordinate, the Lloyd-Max quantizer divides the support into 2^b intervals
            with thresholds <code>{'t_0 < t_1 < ... < t_{2^b}'}</code> and reconstruction
            points <code>{'r_1, ..., r_{2^b}'}</code>. Each coordinate value is mapped to the index of
            its interval, and during dequantization, replaced by the corresponding reconstruction
            point. This is <em>the</em> MSE-optimal scalar quantizer.
          </p>
          <p>
            The key point: these thresholds and reconstruction points can be precomputed once and
            stored in a small lookup table. At runtime, quantization is just a binary search over
            the thresholds -- O(b) per coordinate, O(bd) per vector.
          </p>
        </Prose>
      </ConceptCard>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — ALGORITHM 1: TurboQuant_mse
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="03"
        title="Algorithm 1 \u2014 TurboQuant_mse"
        subtitle="The simplest version: rotate, quantize each coordinate, done"
      />

      <Diagram caption="TurboQuant Pipeline: from input vector to compressed code and back">
        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-arr2" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <marker id="tq-arr2-blue" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={BLUE} />
            </marker>
          </defs>
          <rect width="800" height="340" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="28" fill={A} fontSize="14" fontWeight="700" textAnchor="middle">QUANTIZATION (Encode)</text>

          {/* Step boxes -- encode path */}
          {/* Input x */}
          <rect x="20" y="55" width="100" height="50" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="70" y="76" fill={FG} fontSize="13" fontWeight="600" textAnchor="middle">Input x</text>
          <text x="70" y="92" fill={GRAY} fontSize="10" textAnchor="middle">d-dim vector</text>

          {/* Arrow */}
          <line x1="125" y1="80" x2="155" y2="80" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Normalize */}
          <rect x="160" y="55" width="110" height="50" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="215" y="76" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Normalize</text>
          <text x="215" y="92" fill={GRAY} fontSize="10" textAnchor="middle">{'x/||x|| + store ||x||'}</text>

          {/* Arrow */}
          <line x1="275" y1="80" x2="305" y2="80" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Random rotation */}
          <rect x="310" y="55" width="120" height="50" rx="8" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="2" />
          <text x="370" y="76" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle">Random Rotate</text>
          <text x="370" y="92" fill={GRAY} fontSize="10" textAnchor="middle">{'y = \u03A0 \u00b7 (x/||x||)'}</text>

          {/* Arrow */}
          <line x1="435" y1="80" x2="465" y2="80" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Scalar quantize */}
          <rect x="470" y="55" width="130" height="50" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="535" y="76" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Scalar Quantize</text>
          <text x="535" y="92" fill={GRAY} fontSize="10" textAnchor="middle">Lloyd-Max per coord</text>

          {/* Arrow */}
          <line x1="605" y1="80" x2="635" y2="80" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Output code */}
          <rect x="640" y="55" width="140" height="50" rx="8" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="2" />
          <text x="710" y="76" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">b-bit indices</text>
          <text x="710" y="92" fill={GRAY} fontSize="10" textAnchor="middle">{'d indices + ||x|| = b\u00b7d+32 bits'}</text>

          {/* DEQUANTIZATION path */}
          <text x="400" y="155" fill={BLUE} fontSize="14" fontWeight="700" textAnchor="middle">DEQUANTIZATION (Decode)</text>

          {/* Code */}
          <rect x="640" y="175" width="140" height="50" rx="8" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="710" y="196" fill={FG} fontSize="13" fontWeight="600" textAnchor="middle">b-bit indices</text>
          <text x="710" y="212" fill={GRAY} fontSize="10" textAnchor="middle">{'+ stored ||x||'}</text>

          {/* Arrow left */}
          <line x1="635" y1="200" x2="605" y2="200" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Lookup */}
          <rect x="470" y="175" width="130" height="50" rx="8" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="535" y="196" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Lookup r_i</text>
          <text x="535" y="212" fill={GRAY} fontSize="10" textAnchor="middle">Reconstruction points</text>

          <line x1="465" y1="200" x2="435" y2="200" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Inverse rotation */}
          <rect x="310" y="175" width="120" height="50" rx="8" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2" />
          <text x="370" y="196" fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="middle">Inverse Rotate</text>
          <text x="370" y="212" fill={GRAY} fontSize="10" textAnchor="middle">{'\u03A0\u1d40 \u00b7 \u0177'}</text>

          <line x1="305" y1="200" x2="275" y2="200" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Rescale */}
          <rect x="160" y="175" width="110" height="50" rx="8" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="215" y="196" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Rescale</text>
          <text x="215" y="212" fill={GRAY} fontSize="10" textAnchor="middle">{'||x|| \u00b7 \u0177'}</text>

          <line x1="155" y1="200" x2="125" y2="200" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Output */}
          <rect x="20" y="175" width="100" height="50" rx="8" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="2" />
          <text x="70" y="196" fill="#60a5fa" fontSize="13" fontWeight="700" textAnchor="middle">{'\u0078\u0302'}</text>
          <text x="70" y="212" fill={GRAY} fontSize="10" textAnchor="middle">Reconstructed</text>

          {/* Bottom note */}
          <rect x="100" y="265" width="600" height="55" rx="10" fill={A} fillOpacity="0.06" stroke={A} strokeWidth="1" strokeDasharray="4 3" />
          <text x="400" y="285" fill={FG} fontSize="12" textAnchor="middle">
            Key property: the random rotation matrix \u03A0 is shared (seeded), not stored per-vector.
          </text>
          <text x="400" y="305" fill={GRAY} fontSize="11" textAnchor="middle">
            {'Total storage per vector: b \u00b7 d bits (indices) + 32 bits (norm) = b \u00b7 d + 32 bits'}
          </text>
        </svg>
      </Diagram>

      <StepFlow
        color={A}
        steps={[
          {
            title: 'Normalize',
            desc: 'Compute the norm ||x|| and store it as a 32-bit float. Divide x by ||x|| to get a unit vector on the sphere S^(d-1). This separates the magnitude (easy to store) from the direction (hard to quantize).',
          },
          {
            title: 'Random Rotation',
            desc: 'Multiply the unit vector by a random orthogonal matrix \u03A0, sampled once (via a shared seed) and reused for all vectors. This spreads energy uniformly across coordinates. In practice, \u03A0 is implemented as a product of random Hadamard transforms for O(d log d) speed.',
          },
          {
            title: 'Scalar Quantization',
            desc: 'Each coordinate of the rotated vector y = \u03A0 \u00b7 (x/||x||) is independently quantized using a precomputed Lloyd-Max quantizer for the Beta(1/2, (d-1)/2) distribution. Each coordinate maps to a b-bit index.',
          },
          {
            title: 'Store',
            desc: 'The compressed representation is: d indices of b bits each, plus the 32-bit norm. Total: b*d + 32 bits per vector. For d=128 and b=4, that is 544 bits = 68 bytes (vs 512 bytes uncompressed).',
          },
        ]}
      />

      <FormulaBlock
        math="D_{\text{mse}}(b, d) \\;=\\; \mathbb{E}\\!\left[\\, \left\\| x - \\hat{x} \right\\|^2 \\,\right] \\;\leq\\; \frac{\\|x\\|^2}{d} \cdot \alpha_b"
        label="Theorem 1 \u2014 MSE Distortion Bound"
        color={A}
        symbols={[
          { symbol: 'D_{mse}(b,d)', meaning: 'Expected mean squared error of reconstruction' },
          { symbol: 'x', meaning: 'Original d-dimensional vector' },
          { symbol: '\\hat{x}', meaning: 'Reconstructed vector after quantize + dequantize' },
          { symbol: '||x||\u00b2', meaning: 'Squared Euclidean norm of the original vector' },
          { symbol: 'd', meaning: 'Dimension of the vector' },
          { symbol: '\alpha_b', meaning: 'Distortion coefficient of b-bit Lloyd-Max quantizer for Beta(1/2,(d-1)/2) distribution' },
          { symbol: 'b', meaning: 'Number of bits per coordinate' },
        ]}
      />

      <ConceptCard title="Concrete Numbers: What does \u03B1_b look like?" color={A} defaultOpen={true}>
        <ComparisonTable
          headers={['Bits (b)', '\u03B1_b (approx)', 'Compression ratio', 'Relative MSE']}
          rows={[
            ['1', '0.3634', '32x', '36.3% of ||x||\u00b2/d'],
            ['2', '0.1175', '16x', '11.8% of ||x||\u00b2/d'],
            ['3', '0.03454', '10.7x', '3.5% of ||x||\u00b2/d'],
            ['4', '0.009497', '8x', '0.95% of ||x||\u00b2/d'],
          ]}
        />
        <Prose>
          <p>
            Notice the dramatic drop: going from 1 bit to 4 bits reduces distortion by
            <strong> 38x</strong>. At 4 bits, the reconstruction error is less than 1% of the
            per-coordinate energy. This is why 3-4 bits is the sweet spot for KV cache compression:
            the error is negligible for downstream tasks.
          </p>
        </Prose>
      </ConceptCard>

      <Callout type="warning">
        <strong>The MSE-optimal quantizer is BIASED for inner products.</strong> If you quantize
        vectors x and y using TurboQuant_mse and then compute the inner product of their
        reconstructions, the result is a biased estimate of the true inner product. The bias comes
        from the fact that quantization shrinks magnitudes toward reconstruction points. For MSE
        minimization this shrinkage is optimal, but for inner-product estimation it introduces
        systematic error. This motivates Algorithm 2.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — ALGORITHM 2: TurboQuant_prod
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="04"
        title="Algorithm 2 \u2014 TurboQuant_prod"
        subtitle="Unbiased inner-product estimation via residual correction with QJL"
      />

      <Prose>
        <p>
          Many applications do not care about reconstructing the vector itself -- they care about
          <em>inner products</em> between vectors. Nearest-neighbor search ranks by inner product
          (or equivalently, distance). Attention scores in Transformers are inner products between
          queries and keys. For these applications, we need an <strong>unbiased estimator</strong> of
          the inner product, not just a low-MSE reconstruction.
        </p>
        <p>
          TurboQuant_prod achieves this with a clever two-stage approach: use (b-1) bits for
          MSE-optimal quantization, then spend the last 1 bit on a <strong>QJL (Quantized
          Johnson-Lindenstrauss)</strong> correction of the residual. The result is an unbiased
          inner-product estimator with variance that shrinks as 1/d -- meaning high dimensions
          actually <em>help</em>.
        </p>
      </Prose>

      <ConceptCard title="The Bias Problem \u2014 Why MSE-optimal is not Product-optimal" color={RED} defaultOpen={true}>
        <Prose>
          <p>
            Consider two unit vectors x and y with true inner product 0.8. When you quantize
            both with TurboQuant_mse at b bits, the reconstructed inner product
            <code>{' <\u0078\u0302, \u0177>'}</code> will systematically underestimate the true value.
            Why? Because quantization &ldquo;rounds&rdquo; each coordinate to the nearest reconstruction
            point, and this rounding shrinks the effective magnitude. It is like measuring two
            objects with a slightly short ruler -- both measurements are too small, and their
            product is even more wrong.
          </p>
          <p>
            Formally, if <code>\u0072\u0302</code> is the quantized version of a coordinate r, then
            <code>{'E[\u0072\u0302] \u2260 r'}</code> in general. The Lloyd-Max quantizer minimizes
            <code>{'E[(r - \u0072\u0302)\u00b2]'}</code>, which does NOT guarantee <code>{'E[\u0072\u0302] = r'}</code>.
            This means <code>{'E[<\u0078\u0302, \u0177>] \u2260 <x, y>'}</code>.
          </p>
        </Prose>
      </ConceptCard>

      <Diagram caption="Two Algorithms Comparison: TurboQuant_mse (direct) vs TurboQuant_prod (with QJL residual correction)">
        <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-a3" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <marker id="tq-a3-p" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={PURPLE} />
            </marker>
            <marker id="tq-a3-g" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
            </marker>
          </defs>
          <rect width="800" height="420" rx="12" fill={BG} />

          {/* LEFT SIDE: TurboQuant_mse */}
          <text x="200" y="28" fill={A} fontSize="15" fontWeight="700" textAnchor="middle">TurboQuant_mse</text>
          <text x="200" y="46" fill={GRAY} fontSize="11" textAnchor="middle">All b bits for MSE quantization</text>

          {/* Flow boxes */}
          <rect x="105" y="62" width="190" height="38" rx="7" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1.2" />
          <text x="200" y="86" fill={FG} fontSize="12" textAnchor="middle">x/||x|| on sphere</text>

          <line x1="200" y1="102" x2="200" y2="120" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />

          <rect x="105" y="122" width="190" height="38" rx="7" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1.5" />
          <text x="200" y="146" fill={A3} fontSize="12" fontWeight="600" textAnchor="middle">{'Rotate: y = \u03A0 \u00b7 (x/||x||)'}</text>

          <line x1="200" y1="162" x2="200" y2="180" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />

          <rect x="105" y="182" width="190" height="38" rx="7" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1.5" />
          <text x="200" y="206" fill={A3} fontSize="12" fontWeight="600" textAnchor="middle">Lloyd-Max b-bit per coord</text>

          <line x1="200" y1="222" x2="200" y2="240" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />

          <rect x="115" y="242" width="170" height="38" rx="7" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="2" />
          <text x="200" y="266" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">{'b\u00b7d bit code'}</text>

          <line x1="200" y1="282" x2="200" y2="300" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />

          <rect x="105" y="302" width="190" height="50" rx="7" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="1" strokeDasharray="4 3" />
          <text x="200" y="322" fill={GRAY} fontSize="11" textAnchor="middle">Low MSE reconstruction</text>
          <text x="200" y="340" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle">BUT: biased inner products</text>

          {/* Divider */}
          <line x1="400" y1="20" x2="400" y2="400" stroke={GRAY} strokeWidth="1" strokeDasharray="6 4" />

          {/* RIGHT SIDE: TurboQuant_prod */}
          <text x="600" y="28" fill={PURPLE} fontSize="15" fontWeight="700" textAnchor="middle">TurboQuant_prod</text>
          <text x="600" y="46" fill={GRAY} fontSize="11" textAnchor="middle">(b-1) bits MSE + 1 bit QJL correction</text>

          <rect x="505" y="62" width="190" height="38" rx="7" fill={PURPLE} fillOpacity="0.1" stroke={PURPLE} strokeWidth="1.2" />
          <text x="600" y="86" fill={FG} fontSize="12" textAnchor="middle">x/||x|| on sphere</text>

          <line x1="600" y1="102" x2="600" y2="120" stroke={PURPLE} strokeWidth="1.2" markerEnd="url(#tq-a3-p)" />

          <rect x="505" y="122" width="190" height="38" rx="7" fill={PURPLE} fillOpacity="0.15" stroke={PURPLE} strokeWidth="1.5" />
          <text x="600" y="146" fill="#c084fc" fontSize="12" fontWeight="600" textAnchor="middle">{'Rotate: y = \u03A0 \u00b7 (x/||x||)'}</text>

          {/* Split into two paths */}
          <line x1="600" y1="162" x2="600" y2="175" stroke={PURPLE} strokeWidth="1.2" />

          {/* Left branch: (b-1) bit MSE */}
          <line x1="600" y1="175" x2="540" y2="190" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />
          <rect x="465" y="192" width="150" height="38" rx="7" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.2" />
          <text x="540" y="216" fill={A3} fontSize="11" fontWeight="600" textAnchor="middle">(b-1)-bit Lloyd-Max</text>

          {/* Right branch: residual -> QJL 1-bit */}
          <line x1="600" y1="175" x2="660" y2="190" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a3-g)" />
          <rect x="625" y="192" width="150" height="38" rx="7" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1.2" />
          <text x="700" y="210" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">{'Residual r = y - \u0177'}</text>
          <text x="700" y="224" fill={GRAY} fontSize="10" textAnchor="middle">{'1-bit QJL: sign(S\u00b7r)'}</text>

          {/* Merge */}
          <line x1="540" y1="232" x2="600" y2="260" stroke={PURPLE} strokeWidth="1.2" />
          <line x1="700" y1="232" x2="600" y2="260" stroke={PURPLE} strokeWidth="1.2" />

          <rect x="515" y="262" width="170" height="38" rx="7" fill={PURPLE} fillOpacity="0.2" stroke={PURPLE} strokeWidth="2" />
          <text x="600" y="286" fill="#c084fc" fontSize="13" fontWeight="700" textAnchor="middle">{'b\u00b7d bit code'}</text>

          <line x1="600" y1="302" x2="600" y2="318" stroke={PURPLE} strokeWidth="1.2" markerEnd="url(#tq-a3-p)" />

          <rect x="505" y="320" width="190" height="50" rx="7" fill={PURPLE} fillOpacity="0.08" stroke={PURPLE} strokeWidth="1" strokeDasharray="4 3" />
          <text x="600" y="340" fill={GRAY} fontSize="11" textAnchor="middle">Slightly higher MSE</text>
          <text x="600" y="358" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">BUT: UNBIASED inner products</text>

          {/* Bottom labels */}
          <text x="200" y="400" fill={GRAY} fontSize="10" textAnchor="middle">Best for: reconstruction, perplexity</text>
          <text x="600" y="400" fill={GRAY} fontSize="10" textAnchor="middle">Best for: attention, NN search, ranking</text>
        </svg>
      </Diagram>

      <ConceptCard title="QJL: Quantized Johnson-Lindenstrauss Transform" color={GREEN} defaultOpen={true}>
        <Prose>
          <p>
            QJL is a sub-algorithm used inside TurboQuant_prod to handle the residual. The idea
            comes from the Johnson-Lindenstrauss lemma: random projections approximately preserve
            inner products. QJL takes this one step further by <em>quantizing</em> the projection
            to a single bit (just the sign).
          </p>
          <p>
            Here is how it works. Given a residual vector r (the difference between the original
            coordinate and its (b-1)-bit quantization), QJL projects r using a random matrix S,
            then takes the sign of each component. To estimate the inner product of two residuals,
            it uses <strong>asymmetric estimation</strong>: one side is quantized (1-bit signs),
            the other side keeps the full projection. This gives an unbiased estimator with
            controlled variance.
          </p>
        </Prose>

        <Diagram caption="QJL (Quantized Johnson-Lindenstrauss): 1-bit sketching for inner-product estimation">
          <svg viewBox="0 0 780 300" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
            <defs>
              <marker id="tq-a4" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
              </marker>
              <marker id="tq-a4b" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                <polygon points="0 0, 10 3.5, 0 7" fill={BLUE} />
              </marker>
            </defs>
            <rect width="780" height="300" rx="12" fill={BG} />

            {/* Title */}
            <text x="390" y="24" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">QJL: Asymmetric Inner Product Estimation</text>

            {/* KEY side (quantized) */}
            <text x="200" y="55" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">Key k (stored \u2014 quantized)</text>

            <rect x="55" y="70" width="100" height="35" rx="6" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1.2" />
            <text x="105" y="92" fill={FG} fontSize="11" textAnchor="middle">key k</text>

            <line x1="160" y1="87" x2="188" y2="87" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a4)" />

            <rect x="192" y="70" width="120" height="35" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
            <text x="252" y="92" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">{'S \u00b7 k (project)'}</text>

            <line x1="316" y1="87" x2="344" y2="87" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a4)" />

            <rect x="348" y="70" width="100" height="35" rx="6" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
            <text x="398" y="92" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">{'sign(S\u00b7k)'}</text>

            <line x1="452" y1="87" x2="480" y2="87" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a4)" />

            <rect x="484" y="70" width="130" height="35" rx="6" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1" strokeDasharray="3 3" />
            <text x="549" y="86" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">1-bit codes</text>
            <text x="549" y="100" fill={GRAY} fontSize="9" textAnchor="middle">d bits total</text>

            {/* QUERY side (unquantized) */}
            <text x="200" y="150" fill={BLUE} fontSize="13" fontWeight="700" textAnchor="middle">Query q (online \u2014 full precision)</text>

            <rect x="55" y="165" width="100" height="35" rx="6" fill={BLUE} fillOpacity="0.1" stroke={BLUE} strokeWidth="1.2" />
            <text x="105" y="187" fill={FG} fontSize="11" textAnchor="middle">query q</text>

            <line x1="160" y1="182" x2="188" y2="182" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-a4b)" />

            <rect x="192" y="165" width="120" height="35" rx="6" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="1.5" />
            <text x="252" y="187" fill={BLUE} fontSize="11" fontWeight="600" textAnchor="middle">{'S \u00b7 q (project)'}</text>

            <line x1="316" y1="182" x2="344" y2="182" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-a4b)" />

            <rect x="348" y="165" width="100" height="35" rx="6" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="1.5" />
            <text x="398" y="187" fill={BLUE} fontSize="11" fontWeight="600" textAnchor="middle">{'Keep full S\u00b7q'}</text>

            {/* Merge for estimation */}
            <line x1="549" y1="108" x2="549" y2="230" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="398" y1="202" x2="398" y2="230" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="398" y1="230" x2="549" y2="230" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />

            <rect x="395" y="240" width="230" height="45" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
            <text x="510" y="258" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">{'Estimate: (S\u00b7q) \u00b7 sign(S\u00b7k) / d'}</text>
            <text x="510" y="274" fill={GRAY} fontSize="10" textAnchor="middle">{'Unbiased: E[est] = <q, k> \u00b7 \u221a(2/\u03c0d)'}</text>

            {/* Asymmetric label */}
            <rect x="30" y="240" width="180" height="45" rx="8" fill={PURPLE} fillOpacity="0.08" stroke={PURPLE} strokeWidth="1" />
            <text x="120" y="258" fill={PURPLE} fontSize="11" fontWeight="600" textAnchor="middle">ASYMMETRIC</text>
            <text x="120" y="274" fill={GRAY} fontSize="10" textAnchor="middle">key=1bit, query=full precision</text>
          </svg>
        </Diagram>
      </ConceptCard>

      <StepFlow
        color={PURPLE}
        steps={[
          {
            title: 'Normalize & Rotate',
            desc: 'Same as TurboQuant_mse: compute ||x||, normalize, apply random rotation \u03A0 to get y = \u03A0 \u00b7 (x/||x||).',
          },
          {
            title: 'Quantize at (b-1) bits',
            desc: 'Apply the Lloyd-Max quantizer with (b-1) bits per coordinate to get \u0177. This uses one fewer bit than the total budget.',
          },
          {
            title: 'Compute Residual',
            desc: 'The residual r = y - \u0177 captures what the (b-1)-bit quantizer missed. This residual has small norm (bounded by the quantizer distortion).',
          },
          {
            title: 'QJL on Residual',
            desc: 'Apply a random projection S to the residual, take the sign: c = sign(S \u00b7 r). This gives a 1-bit code per coordinate \u2014 exactly the remaining 1 bit from our budget.',
          },
          {
            title: 'Combine',
            desc: 'Store: (b-1)*d bits from Lloyd-Max + d bits from QJL signs = b*d bits total. Same budget as TurboQuant_mse, but now inner products are unbiased.',
          },
        ]}
      />

      <FormulaBlock
        math="\\widehat{\\langle x, y \\rangle}_{\text{prod}} \\;=\\; \\|x\\|\\,\\|y\\|\\!\left(\\langle \\hat{u}, \\hat{v}\\rangle + \sqrt{\\tfrac{\pi}{2d}}\\,\\langle r_u,\\, \text{sign}(S\\, r_v)\\rangle\right)"
        label="Theorem 2 \u2014 Unbiased Inner Product Estimator"
        color={PURPLE}
        symbols={[
          { symbol: 'x, y', meaning: 'Original d-dimensional vectors' },
          { symbol: '||x||, ||y||', meaning: 'Stored norms (32-bit each)' },
          { symbol: '\\hat{u}, \\hat{v}', meaning: '(b-1)-bit Lloyd-Max reconstructions of the rotated unit vectors' },
          { symbol: 'r_u, r_v', meaning: 'Residual vectors: r_u = \u03A0\u00b7(x/||x||) - \u00fb, etc.' },
          { symbol: 'S', meaning: 'Random sign matrix for QJL projection (shared, seeded)' },
          { symbol: 'sign(S\u00b7r_v)', meaning: '1-bit QJL codes of the residual' },
          { symbol: '\sqrt{\pi/(2d)}', meaning: 'Scaling factor from QJL theory (the \u221a(\u03c0/2d) correction)' },
          { symbol: 'd', meaning: 'Vector dimension' },
        ]}
      />

      <Callout type="math">
        <strong>The 1/d factor is magic.</strong> The variance of the inner-product estimator
        scales as O(1/d). This means that in high dimensions (d = 128, 256, ...), the estimator
        becomes very concentrated around the true value. High dimensions are usually a curse, but
        here they are a blessing -- more coordinates means more independent random variables, which
        means better averaging. This is the concentration of measure phenomenon at work.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05 — INFORMATION-THEORETIC LOWER BOUNDS
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="05"
        title="Information-Theoretic Lower Bounds"
        subtitle="How close to the fundamental limit is TurboQuant?"
      />

      <Prose>
        <p>
          Every compression scheme has a fundamental limit: <strong>Shannon&apos;s rate-distortion
          theory</strong>. Given a source distribution and a target bit rate, there is a minimum
          achievable distortion that no encoder can beat. TurboQuant&apos;s authors derive this bound
          for the specific case of vectors on the unit sphere, and then show their algorithm
          nearly matches it.
        </p>
        <p>
          This is what elevates TurboQuant from &ldquo;a clever trick&rdquo; to &ldquo;a theoretically near-optimal
          algorithm.&rdquo; Let us walk through the bounds.
        </p>
      </Prose>

      <FormulaBlock
        math="D^{\\star}(b) \\;\geq\\; \frac{1}{d} \cdot \frac{1}{2\pi e} \cdot 2^{-2b}"
        label="Lemma 2 \u2014 Shannon Lower Bound"
        color={A}
        symbols={[
          { symbol: 'D^\\star(b)', meaning: 'Minimum achievable MSE distortion at b bits per coordinate' },
          { symbol: 'd', meaning: 'Vector dimension' },
          { symbol: 'b', meaning: 'Bits per coordinate (rate)' },
          { symbol: '2\pi e', meaning: 'Constant from Gaussian rate-distortion theory (about 17.08)' },
          { symbol: '2^{-2b}', meaning: 'Exponential decay: each extra bit halves the distortion twice' },
        ]}
      />

      <ConceptCard title="Where does this bound come from?" color={A} defaultOpen={false}>
        <Prose>
          <p>
            The derivation goes roughly like this. After random rotation, each coordinate is
            approximately Gaussian with variance 1/d. For a Gaussian source with variance \u03C3\u00b2,
            Shannon&apos;s rate-distortion function says the minimum distortion at rate R bits is:
          </p>
          <p>
            <code>{'D(R) = \u03C3\u00b2 \u00b7 2^(-2R)'}</code>
          </p>
          <p>
            With \u03C3\u00b2 = 1/d and R = b bits per coordinate, this gives
            <code>{'D(b) = (1/d) \u00b7 2^(-2b)'}</code>. The extra factor of 1/(2\u03c0e) comes from the
            fact that we are quantizing to a discrete set (not a continuous one), which introduces
            an additional overhead.
          </p>
          <p>
            Crucially, this bound applies to <em>any</em> randomized quantizer, not just
            coordinate-wise ones. It is a fundamental limit of information theory. No matter how
            clever your vector quantization scheme is -- whether you use product quantization,
            lattice quantization, or deep-learned codebooks -- you cannot beat this bound.
          </p>
        </Prose>
      </ConceptCard>

      <FormulaBlock
        math="D_{\text{mse}}^{\text{TQ}}(b) \\;\leq\\; \frac{\alpha_b}{d} \\;\leq\\; \frac{2.7}{2\pi e} \cdot \frac{2^{-2b}}{d} \\;=\\; 2.7 \cdot D^{\\star}(b)"
        label="Theorem 3 \u2014 TurboQuant is within 2.7x of the Shannon bound"
        color={A}
        symbols={[
          { symbol: 'D_{mse}^{TQ}(b)', meaning: 'TurboQuant MSE distortion at b bits per coordinate' },
          { symbol: '\alpha_b', meaning: 'Lloyd-Max distortion coefficient (precomputed per b)' },
          { symbol: 'D^\\star(b)', meaning: 'Shannon lower bound (information-theoretic minimum)' },
          { symbol: '2.7', meaning: 'Multiplicative gap \u2014 worst-case over all b values' },
          { symbol: 'd', meaning: 'Vector dimension (cancels in the ratio)' },
        ]}
      />

      <Callout type="insight">
        The gap of 2.7x is <em>constant</em> -- it does not grow with dimension d or the number
        of bits b. This means TurboQuant is proportionally just as good at 1 bit as at 8 bits,
        and just as good in 64 dimensions as in 1024 dimensions. This kind of universal guarantee
        is rare in quantization.
      </Callout>

      <ConceptCard title="Why might the 2.7x gap be irreducible?" color={A2} defaultOpen={false}>
        <Prose>
          <p>
            The Shannon bound is achievable only in the limit of infinite block length -- i.e.,
            you would need to jointly encode infinitely many vectors to reach it. TurboQuant
            encodes each vector independently (online, streaming), which inherently incurs some
            overhead.
          </p>
          <p>
            Additionally, the bound assumes a perfectly Gaussian source, while the actual
            coordinate distribution is Beta (which only approaches Gaussian as d grows). For
            finite d, there is a small gap from this approximation.
          </p>
          <p>
            The authors conjecture that for coordinate-wise quantizers, the 2.7x gap is close
            to tight. Beating it would likely require joint vector quantization (like PQ), which
            loses the zero-indexing-time property.
          </p>
        </Prose>
      </ConceptCard>

      <ComparisonTable
        headers={['Bits (b)', 'TurboQuant MSE', 'Shannon Bound', 'Ratio']}
        rows={[
          ['1', '0.3634 / d', '0.1175 / d', '3.09x'],
          ['2', '0.1175 / d', '0.0448 / d', '2.62x'],
          ['3', '0.03454 / d', '0.01305 / d', '2.65x'],
          ['4', '0.009497 / d', '0.003575 / d', '2.66x'],
        ]}
        caption="TurboQuant MSE vs Shannon lower bound at different bit rates. The ratio is consistently around 2.6-3.1x."
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06 — EXPERIMENTAL RESULTS
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="06"
        title="Experimental Results"
        subtitle="KV cache compression, nearest-neighbor search, and LLM benchmarks"
      />

      <Prose>
        <p>
          Theory is wonderful, but does TurboQuant actually work in practice? The authors evaluate
          on three fronts: KV cache compression for LLMs, approximate nearest-neighbor search, and
          LLM perplexity benchmarks. The results are impressive across the board.
        </p>
      </Prose>

      <ConceptCard title="KV Cache Compression" color={A} defaultOpen={true}>
        <Prose>
          <p>
            <strong>Setup:</strong> Llama-3-8B model on the Needle-In-A-Haystack (NIAH) benchmark.
            This test hides a specific fact in a long context and asks the model to retrieve it.
            It is extremely sensitive to KV cache quality because the model must attend to the
            exact location of the needle.
          </p>
          <p>
            <strong>Result:</strong> TurboQuant at 3.5 bits achieves NIAH accuracy of
            <strong> 0.997</strong> -- essentially identical to full-precision (1.0). At 3 bits,
            accuracy is still 0.98. Even at 2 bits, the model retains 0.91 accuracy.
          </p>
          <p>
            For comparison, KIVI (a state-of-the-art KV cache quantizer) achieves 0.99 at 4 bits
            but degrades to 0.85 at 2 bits. TurboQuant matches or beats KIVI at every bit rate
            while requiring zero training or calibration data.
          </p>
        </Prose>

        <StatBar
          stats={[
            { value: '0.997', unit: '', label: 'NIAH @ 3.5 bits', color: GREEN },
            { value: '0.98', unit: '', label: 'NIAH @ 3 bits', color: A },
            { value: '0.91', unit: '', label: 'NIAH @ 2 bits', color: A2 },
            { value: '0', unit: '', label: 'Training needed', color: BLUE },
          ]}
        />
      </ConceptCard>

      <ConceptCard title="Nearest-Neighbor Search" color={BLUE} defaultOpen={true}>
        <Prose>
          <p>
            <strong>Setup:</strong> Standard ANN benchmarks (GloVe-100, SIFT-128, Deep-96) with
            1M-10M vectors. Metric: Recall@1 at various compression ratios.
          </p>
          <p>
            <strong>Result:</strong> TurboQuant consistently outperforms Product Quantization (PQ)
            and matches or beats RabitQ (a recent random-rotation-based quantizer). At 4 bits per
            coordinate on GloVe-100:
          </p>
        </Prose>
        <ComparisonTable
          headers={['Method', 'Recall@1 (GloVe)', 'Recall@1 (SIFT)', 'Index Time', 'Training Data']}
          rows={[
            ['TurboQuant_prod', '0.965', '0.982', '0 sec', 'None'],
            ['RabitQ', '0.960', '0.978', '~1 sec', 'None'],
            ['PQ (IVF-PQ)', '0.942', '0.967', '~30 sec', '10K+ vectors'],
            ['OPQ', '0.951', '0.971', '~60 sec', '10K+ vectors'],
          ]}
        />
        <Prose>
          <p>
            The key advantage is not just recall -- it is the <strong>zero indexing time</strong>.
            PQ and OPQ require training codebooks on representative data, which takes seconds to
            minutes and requires storing the codebooks. TurboQuant needs nothing: you can quantize
            vectors as they arrive with no preprocessing step.
          </p>
        </Prose>
      </ConceptCard>

      <ConceptCard title="LLM Perplexity Benchmarks" color={PURPLE} defaultOpen={false}>
        <Prose>
          <p>
            <strong>Setup:</strong> Llama-3-8B and Llama-3-70B on WikiText-2 perplexity evaluation
            with quantized KV cache.
          </p>
          <p>
            <strong>Result:</strong> At 4 bits, TurboQuant achieves perplexity within 0.1 of
            full-precision (FP16). The table below shows the comparison:
          </p>
        </Prose>
        <ComparisonTable
          headers={['Method', 'Bits', 'Llama-3-8B PPL', 'Llama-3-70B PPL']}
          rows={[
            ['Full Precision', '16', '6.14', '2.86'],
            ['TurboQuant_mse', '4', '6.19', '2.88'],
            ['TurboQuant_mse', '3', '6.35', '2.94'],
            ['KIVI', '4', '6.21', '2.89'],
            ['KIVI', '3', '6.52', '3.01'],
            ['SnapKV', '4', '6.24', '2.91'],
            ['PyramidKV', '4', '6.28', '2.93'],
          ]}
        />
        <Prose>
          <p>
            At 3 bits, TurboQuant has a clear edge over KIVI (6.35 vs 6.52 on Llama-3-8B). This
            matters because 3-bit quantization gives ~5.3x memory reduction over FP16, enabling
            significantly longer contexts or more concurrent users on the same hardware.
          </p>
        </Prose>
      </ConceptCard>

      <ComparisonTable
        headers={['Feature', 'TurboQuant', 'KIVI', 'SnapKV', 'PyramidKV', 'PQ']}
        rows={[
          ['Training needed', 'No', 'No*', 'No', 'No', 'Yes'],
          ['Indexing time', '0', '0', 'N/A', 'N/A', 'Seconds-minutes'],
          ['Theoretical guarantee', 'Yes (2.7x)', 'No', 'No', 'No', 'No'],
          ['Best at (bits)', '2-4', '4+', '4+', '4+', '4-8'],
          ['Inner-product unbiased', 'Yes (prod)', 'No', 'No', 'No', 'No'],
          ['KV cache support', 'Yes', 'Yes', 'Yes', 'Yes', 'No'],
          ['ANN search support', 'Yes', 'No', 'No', 'No', 'Yes'],
          ['Online (streaming)', 'Yes', 'Yes', 'Partial', 'Partial', 'No'],
        ]}
        caption="* KIVI uses simple round-to-nearest quantization, which requires no training but also has no optimality guarantees."
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07 — MENTAL MODELS
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="07"
        title="Mental Models"
        subtitle="Three ways to build intuition for TurboQuant"
      />

      <MentalModel
        title="Color Quantization in Images"
        analogy="Think of reducing a 24-bit color image (16 million colors) to a 256-color palette. A naive approach quantizes R, G, B channels independently -- but this wastes bits because natural images have correlated color channels (sky is blue, grass is green). Median-cut and k-means find better palettes by considering correlations. TurboQuant's insight is: if you randomly rotate the RGB space first, the correlations vanish, and independent per-channel quantization becomes near-optimal. You don't need to find a clever palette -- just scramble the colors and use uniform bins."
        technical="In the color analogy, the random rotation transforms correlated RGB into decorrelated coordinates. The Lloyd-Max quantizer then acts like optimal per-channel binning. The total distortion is the sum of per-channel distortions, which is minimized when all channels have the same marginal distribution -- exactly what the rotation achieves."
        color={A}
      />

      <MentalModel
        title="Compression via Random Scrambling"
        analogy="Imagine you have a bookshelf organized by topic -- all math books together, all novels together. If someone asks you to describe the shelf, you would say 'math section takes up 40%, novels 35%...' which is very compressed. Now imagine you randomly shuffle all the books. The shelf looks uniform -- every position is equally likely to hold any book. Paradoxically, this HELPS compression: because every position has the same statistical properties, you can use the same compression code for every position. You have traded structure for uniformity, and uniformity enables simple, universal compression."
        technical="The random rotation is the shuffling step. It destroys the input's directional structure (which would require an adaptive, data-dependent quantizer to exploit) and replaces it with a known, universal distribution (Beta on the sphere). This universality is what enables zero-training, zero-indexing compression."
        color={A2}
      />

      <MentalModel
        title="The Bias-Correction Trick (Weather Forecasting)"
        analogy="A weather station's thermometer reads 2 degrees too low on average. If you just report its readings (MSE-optimal relative to the true temperature, given the sensor's noise), you'll consistently underpredict. The fix: measure the bias (the systematic 2-degree offset) and correct for it. TurboQuant_prod does exactly this for inner products: the (b-1)-bit quantizer has a systematic bias in inner-product estimation, and the 1-bit QJL residual acts like the bias correction. The result is unbiased, just like calibrating the thermometer."
        technical="The MSE-optimal quantizer minimizes E[||x - x_hat||^2] but introduces bias in E[<x_hat, y_hat>] vs <x, y>. TurboQuant_prod uses (b-1) bits for MSE and 1 bit for a QJL sketch of the residual (r = x - x_hat). The QJL term provides an unbiased correction: E[correction] = <r_x, r_y>, which exactly cancels the bias."
        color={PURPLE}
      />

      <Callout type="key">
        <strong>The takeaway:</strong> TurboQuant shows that for high-dimensional vectors, the
        simplest approach -- random rotation followed by independent scalar quantization -- is
        provably near-optimal. It achieves within 2.7x of the information-theoretic limit, works
        in streaming/online settings with zero training, and matches or beats complex learned
        quantizers on real benchmarks. The key insight is that random rotations &ldquo;democratize&rdquo;
        vector energy across coordinates, turning a hard vector problem into d easy scalar problems.
      </Callout>

      <ConceptCard title="What TurboQuant does NOT do (limitations)" color={GRAY} defaultOpen={false}>
        <Prose>
          <p>
            <strong>1. Non-Euclidean metrics.</strong> TurboQuant is designed for L2 distance and
            inner products. If your application uses cosine similarity (which normalizes to unit
            vectors first), it works perfectly. But for other metrics like L1, Hamming, or
            edit distance, the theory does not apply.
          </p>
          <p>
            <strong>2. Very low dimensions (d &lt; 16).</strong> The Beta-to-Gaussian convergence
            is slow in low dimensions, so the Lloyd-Max quantizer is less well-matched. For d &lt;
            16, data-dependent methods like PQ may be better.
          </p>
          <p>
            <strong>3. Structured sparsity.</strong> If vectors have known structure (e.g., they
            are sparse in a known basis), exploiting that structure can beat TurboQuant. The random
            rotation deliberately destroys structure, which is optimal for arbitrary vectors but
            suboptimal for structured ones.
          </p>
          <p>
            <strong>4. The rotation cost.</strong> Applying the random rotation matrix costs O(d^2)
            per vector (or O(d log d) with structured rotations like randomized Hadamard). For very
            high throughput applications, this cost may matter.
          </p>
        </Prose>
      </ConceptCard>
    </>
  );
}
