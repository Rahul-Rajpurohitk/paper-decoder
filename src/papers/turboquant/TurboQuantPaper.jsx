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
import KeyNumber from '../../components/KeyNumber';

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
          Imagine you have a billion <H tip="Vector = an ordered list of numbers. In ML, vectors represent 'embeddings' — compressed representations of data (images, words, documents). A 128-dimensional vector is a point in 128-dimensional space." color={A}>vectors</H>, each with 128 <H tip="Dimensions = the number of numbers in a vector. Higher dimensions can capture more nuance but use more memory. A 128-d vector uses 512 bytes at 32-bit precision." color={A}>dimensions</H>, stored as <H tip="32-bit float = standard precision for neural network computations. Each number uses 4 bytes. Quantization aims to reduce this to 1-4 bits per number (0.125-0.5 bytes) — a 8-32× compression." color={BLUE}>32-bit floats</H>.
          That is <strong>512 GB</strong> of raw data. Now imagine you need to search through all of them
          in milliseconds to find the <H tip="Nearest neighbor = the stored vector most similar to your query. Used in RAG (retrieval-augmented generation), recommendation systems, and similarity search. The challenge: doing this fast when you have billions of vectors." color={GREEN}>nearest neighbor</H> to a query. Or imagine those vectors are the
          <H tip="Key-Value cache (KV cache) = the memory that Transformers build up during generation. For each token generated, every layer stores a Key vector and a Value vector. With long sequences and many layers, this dominates GPU memory." color={A}>key-value cache</H> of a large language model serving thousands of concurrent users, and your <H tip="GPU memory (VRAM) = the high-bandwidth memory on graphics cards. H100 has 80GB. KV caches for long-context LLMs can easily exceed this, requiring compression or offloading to slower CPU memory." color={A}>GPU memory</H> is the bottleneck. This is the <strong>vector quantization</strong> problem: how do
          you compress high-dimensional vectors into compact codes while preserving the <H tip="Geometric relationships = the distances and angles between vectors. In ML, these encode meaning: similar items have nearby vectors (small distance), related items have aligned vectors (high inner product). Quantization must preserve these or downstream tasks break." color={A}>geometric relationships</H> (distances, <H tip="Inner product = the dot product ⟨x,y⟩ = Σ x_i·y_i. In attention mechanisms, the Query-Key inner product determines how much one token 'attends' to another. If quantization distorts inner products, attention scores become wrong and the model produces garbage." color={RED}>inner products</H>) that downstream tasks rely on?
        </p>
        <p>
          TurboQuant attacks this problem with a beautifully simple idea: <em>randomly rotate your
          vectors, then <H tip="Scalar quantization = compressing each number independently to fewer bits. Like rounding 3.14159 to 3.14 or even just 3. TurboQuant's insight: after random rotation, optimal scalar quantization achieves near-optimal VECTOR quantization." color={A}>quantize each coordinate independently</H></em>. The result is an algorithm that
          is near-optimal in the <H tip="Information-theoretic sense = compared to the absolute mathematical limit (Shannon bound) on how well ANY quantizer can do, regardless of complexity. TurboQuant is within 2.7× of this limit — remarkably close to perfect." color={A}>information-theoretic sense</H>, requires zero indexing time, and works
          as a <H tip="Drop-in replacement = you can swap it in without changing the rest of your system. TurboQuant replaces the quantization step in existing KV cache or vector search pipelines without requiring retraining, new data structures, or architectural changes." color={GREEN}>drop-in replacement</H> for existing KV cache compression and <H tip="Nearest-neighbor search = finding the most similar vectors in a database. Critical for RAG, recommendation engines, and vector databases (Pinecone, Weaviate, Qdrant). Speed vs accuracy is the core tradeoff." color={GREEN}>nearest-neighbor search</H>{' '}
          pipelines.
        </p>
      </Prose>

      <StatBar
        stats={[
          { value: '≈2.7×', unit: '', label: 'Of info-theoretic bound', color: A },
          { value: '3.5', unit: ' bits', label: 'Quality-neutral KV cache', color: A2 },
          { value: '0', unit: ' sec', label: 'Indexing time', color: GREEN },
          { value: '128d', unit: '', label: 'Typical vector dim', color: BLUE },
        ]}
      />

      <ConceptCard title="Why does this matter RIGHT NOW?" color={A} defaultOpen={true}>
        <Prose>
          <p>Three converging trends make fast, high-quality vector quantization critical:</p>
          <p>
            <strong>1. KV Cache Compression.</strong> Every token a <H tip="Transformer = the dominant neural network architecture since 2017. Uses self-attention to let every element in a sequence interact with every other. Powers GPT, Claude, Llama, Gemini, and essentially all modern AI." color={A}>Transformer</H> generates stores a
            key and a value vector in the <H tip="KV cache = the accumulated Key and Value vectors from all previous tokens. During autoregressive generation, each new token needs to attend to ALL previous keys/values. This grows linearly with sequence length × layers × heads." color={A}>KV cache</H>. For a model like Llama-3-70B serving 128K-context
            requests, the KV cache alone can consume <strong>40+ GB per user</strong>. Quantizing
            these vectors from <H tip="16 bits (FP16/BF16) = the standard precision for inference. Each number uses 2 bytes. Going to 3-4 bits = 0.375-0.5 bytes per number — a 4-5× memory reduction." color={BLUE}>16 bits</H> to 3-4 bits per dimension can cut memory by 4-5× with
            negligible quality loss.
          </p>
          <p>
            <strong>2. Nearest-Neighbor Search.</strong> <H tip="Vector databases = specialized databases for storing and searching high-dimensional vectors. Used in RAG pipelines, recommendation engines, image search. Examples: Pinecone, Weaviate, Milvus, Qdrant, Chroma." color={GREEN}>Vector databases</H> (Pinecone, Weaviate, Milvus)
            store billions of <H tip="Embeddings = dense vector representations of data (text, images, audio). Models like CLIP, BERT, and OpenAI's text-embedding produce these. Similar items have nearby embeddings in the vector space." color={GREEN}>embeddings</H>. <H tip="Product Quantization (PQ) = the classic approach to vector compression. Splits each vector into subvectors, quantizes each subvector independently using a learned codebook. Requires expensive offline training (k-means clustering) on the data distribution." color={RED}>Product Quantization (PQ)</H> has been the workhorse for
            decades, but it requires expensive <H tip="Codebook = a lookup table mapping quantized indices to reconstruction vectors. PQ learns this codebook via k-means clustering on training data. TurboQuant needs no codebook — it uses precomputed optimal quantizers for the Beta distribution." color={RED}>codebook training</H> and is suboptimal for skewed
            distributions. TurboQuant needs no training at all.
          </p>
          <p>
            <strong>3. Model Weight Quantization.</strong> Compressing the weights of a 70B-parameter
            model from <H tip="FP16 = 16-bit floating point. Each weight uses 2 bytes. A 70B model in FP16 needs ~140 GB — too large for a single consumer GPU (24GB). Quantizing to 4-bit reduces this to ~35 GB, fitting on one RTX 4090." color={BLUE}>FP16</H> to 4-bit enables inference on consumer GPUs. The <H tip="Distortion-rate tradeoff = the fundamental tension: fewer bits per number → more compression but more error. Rate-distortion theory (Shannon) defines the mathematical limit of this tradeoff for any quantizer." color={A}>distortion-rate tradeoff</H>{' '}
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
        title="The Core Insight — Random Rotation"
        subtitle="Turning vector quantization into independent scalar quantization"
      />

      <Prose>
        <p>
          The fundamental challenge of <H tip="Vector quantization = mapping continuous high-dimensional vectors to a finite set of discrete codes. Unlike scalar quantization (which compresses one number at a time), vector quantization considers all dimensions jointly — which is optimal but exponentially complex." color={A}>vector quantization</H> is that coordinates of a real-world vector
          are typically <H tip="Correlated = knowing one coordinate tells you something about other coordinates. In word embeddings, the 'gender' dimension often correlates with the 'royalty' dimension (king↔queen). This structure makes naive per-coordinate compression suboptimal." color={A}>correlated</H>. <H tip="Word embeddings = dense vector representations of words (Word2Vec, GloVe, GPT embeddings). 'King' and 'Queen' are nearby, 'King'-'Man'+'Woman' ≈ 'Queen'. These vectors have rich internal structure that makes them hard to compress naively." color={BLUE}>Word embeddings</H>, <H tip="Attention keys = the Key vectors in Transformer self-attention. Each token projects its representation into K, Q, V vectors. Keys are what get matched against queries to compute attention weights. In long-context models, storing billions of key vectors is the memory bottleneck." color={BLUE}>attention keys</H>, image features — they
          all have structure that means some directions carry more information than others. Designing
          an optimal quantizer for <H tip="Correlated data is hard because the optimal quantizer depends on the joint distribution of ALL coordinates. For d=128 dimensions with b=4 bits each, the search space has 2^512 possible codewords — more than atoms in the universe. This is why vector quantization is NP-hard." color={RED}>correlated data is NP-hard</H> in general.
        </p>
        <p>
          TurboQuant sidesteps this entirely with one elegant move: <strong>multiply the vector by a
          <H tip="Random rotation matrix = an orthogonal matrix Π sampled uniformly from O(d). 'Random' means each rotation is equally likely. 'Rotation' means it preserves lengths and angles — no information is lost, just redistributed across coordinates. Implemented via random Hadamard transforms for O(d log d) speed." color={A}>random rotation matrix</H></strong>. After rotation, every coordinate has the same <H tip="Marginal distribution = the probability distribution of a single coordinate, ignoring all others. Before rotation, some coordinates might be Gaussian while others are bimodal. After random rotation, ALL coordinates follow the same scaled Beta distribution — a remarkable property of uniform rotations." color={A}>marginal distribution</H>, and they become nearly <H tip="Independent in high dimensions = a consequence of measure concentration. For d≥64, the coordinates of a randomly rotated unit vector behave almost exactly like independent Gaussians with variance 1/d. The correlation between any two coordinates is O(1/d), which vanishes as d grows." color={GREEN}>independent in high dimensions</H>. This means you can
          quantize each coordinate separately using the same <H tip="Scalar quantizer = a function that maps one real number to one of 2^b discrete levels (b bits). The optimal scalar quantizer for a known distribution is called the Lloyd-Max quantizer — it minimizes MSE by placing reconstruction points at the centroids of equal-probability regions." color={A}>scalar quantizer</H> — the optimal one for
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
          <text x="340" y="163" fill={A} fontSize="12" fontWeight="700" textAnchor="middle">{'Π · x'}</text>
          <text x="340" y="135" fill={FG} fontSize="10" textAnchor="middle" opacity="0.6">Random rotation</text>

          {/* RIGHT: After rotation */}
          <text x="560" y="32" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">AFTER ROTATION</text>

          {/* Unit sphere */}
          <circle cx="560" cy="170" r="100" fill="url(#tq-grad-sphere)" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="560" y="290" fill={GRAY} fontSize="11" textAnchor="middle">Still on S^(d-1)</text>

          {/* Rotated vector -- more spread */}
          <line x1="560" y1="170" x2="630" y2="105" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#tq-arrow-amber)" />
          <text x="637" y="100" fill={GREEN} fontSize="12" fontWeight="600">{'Πx'}</text>

          {/* Coordinate bars (uniform-ish) */}
          <text x="470" y="322" fill={GRAY} fontSize="10">Coordinates:</text>
          {[0.41, 0.38, 0.42, 0.39, 0.40, 0.37].map((v, i) => (
            <g key={i}>
              <rect x={535 + i * 22} y={320 - v * 40} width="16" height={v * 40} rx="2" fill={GREEN} opacity="0.7" />
              <text x={543 + i * 22} y={335} fill={GRAY} fontSize="8" textAnchor="middle">y{i + 1}</text>
            </g>
          ))}
          <text x="560" y="360" fill={FG} fontSize="10" textAnchor="middle" opacity="0.7">Energy spread uniformly</text>

          {/* Bottom insight — centered below both charts */}
          <rect x="270" y="348" width="260" height="26" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1" />
          <text x="400" y="366" fill={A} fontSize="11" fontWeight="700" textAnchor="middle">Each y_i ~ Beta(½, (d-1)/2)</text>
        </svg>
      </Diagram>

      <ConceptCard title="Lemma 1: Coordinate Distribution on the Hypersphere" color={A} defaultOpen={true}>
        <Prose>
          <p>
            Here is the key mathematical fact that makes TurboQuant work. If you take a unit vector
            on the d-dimensional <H tip="Hypersphere = the generalization of a circle (1-sphere) and sphere (2-sphere) to higher dimensions. The unit hypersphere S^(d-1) is the set of all d-dimensional vectors with norm exactly 1. In 128 dimensions, it is a 127-dimensional surface embedded in 128-dimensional space." color={A}>hypersphere</H> and apply a random rotation (sampled uniformly from the
            <H tip="Orthogonal group O(d) = the group of all d×d matrices that preserve lengths and angles (orthogonal matrices). Sampling uniformly from O(d) gives a Haar-random rotation — the unique 'fair' way to pick a random rotation where no direction is preferred." color={A}>orthogonal group</H>), then <em>each coordinate</em> of the rotated vector follows a known
            distribution: a scaled <H tip="Beta distribution = a continuous probability distribution on [0,1] parameterized by two shape parameters α, β. Beta(1/2, (d-1)/2) is U-shaped for small d and becomes sharply peaked near 0 as d grows, reflecting how each coordinate of a high-dimensional unit vector carries very little energy." color={A}>Beta distribution</H>.
          </p>
          <p>
            More precisely, if <code>y = Π · x</code> where Π is a random rotation and x is on the
            unit sphere, then the squared coordinate <code>y_i^2</code> follows a
            <strong> Beta(1/2, (d-1)/2)</strong> distribution. As the dimension d grows, this
            converges to a Gaussian with mean 0 and variance 1/d.
          </p>
        </Prose>
        <FormulaSteps
          label="Lemma 1 — Coordinate Distribution"
          color={A}
          steps={[
            {
              note: 'Start with what we have: a unit vector x on the sphere, and we hit it with a random rotation. What does a single coordinate of the result look like?',
              math: 'y = \\Pi \\cdot x, \\quad \\|x\\| = 1, \\quad \\Pi \\sim \\text{Uniform}\\bigl(O(d)\\bigr)',
            },
            {
              note: 'Think of squaring a coordinate as measuring how much energy it carries. On a d-dimensional sphere, each squared coordinate follows a Beta distribution — this is the "energy sharing" pattern from random geometry.',
              math: 'y_i^2 \\;\\sim\\; \\text{Beta}\\!\\left(\\tfrac{1}{2},\\, \\tfrac{d-1}{2}\\right)',
            },
            {
              note: 'Predict before reveal: if total energy ||x||²=1 is split among d coordinates, each should carry roughly 1/d. The math confirms — as d grows, the Beta concentrates into a Gaussian with variance exactly 1/d.',
              math: 'y_i^2 \\;\\sim\\; \\text{Beta}\\!\\left(\\tfrac{1}{2},\\, \\tfrac{d-1}{2}\\right) \\quad \\xrightarrow{d \\to \\infty} \\quad y_i \\;\\approx\\; \\mathcal{N}\\!\\left(0,\\, \\tfrac{1}{d}\\right)',
            },
            {
              note: 'Remember: "Rotate, then every coordinate looks the same." The formula just says that formally. In code: y = random_orthogonal_matrix @ (x / np.linalg.norm(x)), then each y[i] is drawn from the same known distribution.',
              math: 'y_i^2 \\sim \\text{Beta}\\!\\left(\\tfrac{1}{2},\\, \\tfrac{d-1}{2}\\right) \\quad \\Longrightarrow \\quad y_i \\approx \\mathcal{N}\\!\\left(0,\\, \\tfrac{1}{d}\\right) \\text{ as } d \\to \\infty',
            },
          ]}
          symbols={[
            { symbol: 'y_i', meaning: 'i-th coordinate of the rotated vector Π · x' },
            { symbol: 'd', meaning: 'Ambient dimension of the vectors' },
            { symbol: 'Beta(a,b)', meaning: 'Beta distribution with shape parameters a, b' },
            { symbol: 'N(0, 1/d)', meaning: 'Gaussian with zero mean and variance 1/d' },
            { symbol: 'Π', meaning: 'Random rotation matrix (uniform over orthogonal group O(d))' },
          ]}
        />
      </ConceptCard>

      <Callout type="insight">
        This is genuinely beautiful: a random rotation &ldquo;democratizes&rdquo; the energy of any vector across
        all coordinates. No matter how lopsided the original vector was, after rotation every
        coordinate carries roughly 1/d of the total energy — a consequence of <H tip="Concentration of measure = a phenomenon in high-dimensional probability: most of the mass of a distribution is concentrated in a thin shell around its mean. For a random point on S^(d-1), each coordinate is ≈ 1/√d with very small variance. The higher d is, the more 'concentrated' each coordinate becomes." color={A}>concentration of measure</H>. Since we know the exact distribution, we
        can design the optimal scalar quantizer for it -- the classical <H tip="Lloyd-Max quantizer = the MSE-optimal scalar quantizer for a known distribution. Named after Stuart Lloyd (1957, Bell Labs) and Joel Max (1960). It iteratively finds thresholds and centroids that minimize expected squared error. For a known distribution like Beta(1/2, (d-1)/2), it can be precomputed exactly." color={A}>Lloyd-Max quantizer</H>.
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
            distribution. The <H tip="Lloyd-Max algorithm = an iterative procedure: (1) fix centroids, find optimal thresholds (midpoints between adjacent centroids); (2) fix thresholds, find optimal centroids (conditional means within each interval). Repeat until convergence. Guaranteed to converge to a local minimum of MSE." color={A2}>Lloyd-Max algorithm</H> (1957/1960) finds the partition thresholds and
            reconstruction points that minimize <H tip="Mean squared error (MSE) = E[||x - x̂||²], the average squared difference between the original and reconstructed vectors. MSE is the standard distortion metric because it decomposes per-coordinate: total MSE = sum of per-coordinate MSEs, making it natural for scalar quantization." color={A2}>mean squared error</H> for a given number of bits.
          </p>
          <p>
            For b bits per coordinate, the Lloyd-Max quantizer divides the support into 2^b intervals
            with thresholds <code>{'t_0 < t_1 < ... < t_{2^b}'}</code> and <H tip="Centroids (reconstruction points) = the values used to represent each quantization interval. Placed at the conditional mean of the distribution within each interval. Together with thresholds, they form a Voronoi tessellation of the real line — each point maps to the region whose centroid is closest." color={A2}>reconstruction
            points</H> <code>{'r_1, ..., r_{2^b}'}</code>. Each coordinate value is mapped to the index of
            its interval (a <H tip="Voronoi tessellation = a partition of space where each region contains all points closest to a particular centroid. In 1D scalar quantization, Voronoi regions are intervals bounded by midpoints between adjacent centroids. In higher-dimensional vector quantization, they become complex polytopes." color={A2}>Voronoi region</H>), and during dequantization, replaced by the corresponding reconstruction
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
        title="Algorithm 1 — TurboQuant_mse"
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
          <text x="370" y="92" fill={GRAY} fontSize="10" textAnchor="middle">{'y = Π · (x/||x||)'}</text>

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
          <text x="710" y="92" fill={GRAY} fontSize="10" textAnchor="middle">{'d indices + ||x|| = b·d+32 bits'}</text>

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
          <text x="370" y="212" fill={GRAY} fontSize="10" textAnchor="middle">{'Πᵀ · ŷ'}</text>

          <line x1="305" y1="200" x2="275" y2="200" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Rescale */}
          <rect x="160" y="175" width="110" height="50" rx="8" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="215" y="196" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Rescale</text>
          <text x="215" y="212" fill={GRAY} fontSize="10" textAnchor="middle">{'||x|| · ŷ'}</text>

          <line x1="155" y1="200" x2="125" y2="200" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Output */}
          <rect x="20" y="175" width="100" height="50" rx="8" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="2" />
          <text x="70" y="196" fill="#60a5fa" fontSize="13" fontWeight="700" textAnchor="middle">{'\u0078\u0302'}</text>
          <text x="70" y="212" fill={GRAY} fontSize="10" textAnchor="middle">Reconstructed</text>

          {/* Bottom note */}
          <rect x="100" y="265" width="600" height="55" rx="10" fill={A} fillOpacity="0.06" stroke={A} strokeWidth="1" strokeDasharray="4 3" />
          <text x="400" y="285" fill={FG} fontSize="12" textAnchor="middle">
            Key property: the random rotation matrix Π is shared (seeded), not stored per-vector.
          </text>
          <text x="400" y="305" fill={GRAY} fontSize="11" textAnchor="middle">
            {'Total storage per vector: b · d bits (indices) + 32 bits (norm) = b · d + 32 bits'}
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
            desc: 'Multiply the unit vector by a random orthogonal matrix Π, sampled once (via a shared seed) and reused for all vectors. This spreads energy uniformly across coordinates. In practice, Π is implemented as a product of random Hadamard transforms for O(d log d) speed.',
          },
          {
            title: 'Scalar Quantization',
            desc: 'Each coordinate of the rotated vector y = Π · (x/||x||) is independently quantized using a precomputed Lloyd-Max quantizer for the Beta(1/2, (d-1)/2) distribution. Each coordinate maps to a b-bit index.',
          },
          {
            title: 'Store',
            desc: 'The compressed representation is: d indices of b bits each, plus the 32-bit norm. Total: b*d + 32 bits per vector. For d=128 and b=4, that is 544 bits = 68 bytes (vs 512 bytes uncompressed).',
          },
        ]}
      />

      <FormulaSteps
        label="Theorem 1 — MSE Distortion Bound"
        color={A}
        steps={[
          {
            note: 'We want to measure how much information we lose. The distortion is the expected squared difference between the original vector and its reconstruction after quantize-then-dequantize.',
            math: 'D_{\\text{mse}}(b, d) \\;=\\; \\mathbb{E}\\!\\left[\\, \\left\\| x - \\hat{x} \\right\\|^2 \\,\\right]',
          },
          {
            note: 'This is the "separate magnitude from direction" trick — you will see it everywhere in quantization. Store ||x|| exactly (32 bits, cheap), then only quantize the unit-sphere direction. The squared norm factors out cleanly.',
            math: 'D_{\\text{mse}}(b, d) \\;=\\; \\|x\\|^2 \\cdot \\mathbb{E}\\!\\left[\\, \\left\\| \\hat{u} - u \\right\\|^2 \\,\\right], \\quad u = x / \\|x\\|',
          },
          {
            note: 'After random rotation, each of the d coordinates is independent with the same distribution. So the total error is d times the per-coordinate error. The per-coordinate error of the Lloyd-Max quantizer is a known constant alpha_b divided by d.',
            math: 'D_{\\text{mse}}(b, d) \\;=\\; \\|x\\|^2 \\cdot \\sum_{i=1}^{d} \\mathbb{E}\\!\\left[(u_i - \\hat{u}_i)^2\\right] \\;=\\; \\|x\\|^2 \\cdot d \\cdot \\frac{\\alpha_b}{d^2}',
          },
          {
            note: 'The d\'s simplify beautifully. In code, this becomes: mse = np.linalg.norm(x)**2 / d * ALPHA[b], where ALPHA is a precomputed lookup table. That is it — one multiply per vector.',
            math: 'D_{\\text{mse}}(b, d) \\;=\\; \\mathbb{E}\\!\\left[\\, \\left\\| x - \\hat{x} \\right\\|^2 \\,\\right] \\;\\leq\\; \\frac{\\|x\\|^2}{d} \\cdot \\alpha_b',
          },
        ]}
        symbols={[
          { symbol: 'D_{mse}(b,d)', meaning: 'Expected mean squared error of reconstruction' },
          { symbol: 'x', meaning: 'Original d-dimensional vector' },
          { symbol: 'x_hat', meaning: 'Reconstructed vector after quantize + dequantize' },
          { symbol: '||x||^2', meaning: 'Squared Euclidean norm of the original vector. Stored exactly (32 bits) while the direction is quantized.' },
          { symbol: 'd', meaning: 'Dimension of the vector' },
          { symbol: 'alpha_b', meaning: 'Distortion coefficient of b-bit Lloyd-Max quantizer for Beta(1/2,(d-1)/2) distribution' },
          { symbol: 'b', meaning: 'Number of bits per coordinate' },
        ]}
      />

      <ConceptCard title="Concrete Numbers: What does α_b look like?" color={A} defaultOpen={true}>
        <ComparisonTable
          headers={['Bits (b)', 'α_b (approx)', 'Compression ratio', 'Relative MSE']}
          rows={[
            ['1', '0.3634', '32x', '36.3% of ||x||\u00b2/d'],
            ['2', '0.1175', '16x', '11.8% of ||x||\u00b2/d'],
            ['3', '0.03454', '10.7x', '3.5% of ||x||\u00b2/d'],
            ['4', '0.009497', '8x', '0.95% of ||x||\u00b2/d'],
          ]}
        />
        <Prose>
          <p>
            Notice the dramatic drop: going from 1 bit to 4 bits reduces <H tip="Distortion = the error introduced by quantization, measured as MSE between original and reconstructed vectors. Lower distortion means higher fidelity. The distortion coefficient α_b captures how much error per unit of energy the b-bit quantizer introduces." color={A}>distortion</H> by
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
        from the fact that quantization shrinks magnitudes toward <H tip="Reconstruction points (centroids) = the discrete values used to represent each quantized interval. In Lloyd-Max, each centroid is the conditional mean of the distribution within its Voronoi region. When you dequantize, each b-bit index maps to its centroid." color={A}>reconstruction points</H>. For MSE
        minimization this shrinkage is optimal, but for inner-product estimation it introduces
        systematic error. This motivates Algorithm 2.
      </Callout>

      <Callout type="math">
        <strong>Why exactly does MSE-optimal quantization create biased inner products?</strong> This is a subtle but crucial point. When you quantize a value x to its nearest centroid c, the reconstruction error is (x - c). For MSE, this error averages to zero — the centroid IS the conditional mean. But when you compute the inner product of two quantized vectors, you get ⟨ĉ_x, ĉ_y⟩ instead of ⟨x, y⟩. The error terms (x - c_x) and (y - c_y) are independent, so their cross-product vanishes in expectation. But the squared terms DON'T vanish: ⟨ĉ_x, ĉ_y⟩ = ⟨x, y⟩ - ⟨x, e_y⟩ - ⟨e_x, y⟩ + ⟨e_x, e_y⟩. The last term ⟨e_x, e_y⟩ ≈ 0 by independence, but the middle terms create a systematic downward bias because quantization always shrinks toward centroids. This is why attention scores computed from MSE-quantized KV caches are systematically underestimated — and why TurboQuant_prod exists.
      </Callout>

      <VisualCompare
        leftLabel="Naive Quantization"
        rightLabel="TurboQuant"
        leftColor="#ef4444"
        rightColor="#f59e0b"
        left={<>
          <p>Quantize each coordinate directly</p>
          <p>Coordinates are correlated → suboptimal</p>
          <p>No theoretical guarantees</p>
          <p style={{color:'#ef4444'}}>Distortion depends on data distribution</p>
        </>}
        right={<>
          <p>Random rotate first, THEN quantize</p>
          <p>Coordinates become independent → optimal scalar quantization</p>
          <p style={{fontFamily:'var(--font-mono)',color:'#f59e0b'}}>Within 2.7× of Shannon bound</p>
          <p style={{color:'#22c55e'}}>Works for ANY data — no training needed</p>
        </>}
        caption="Random rotation is the key: it turns a hard vector problem into easy scalar problems"
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04 — ALGORITHM 2: TurboQuant_prod
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="04"
        title="Algorithm 2 — TurboQuant_prod"
        subtitle="Unbiased inner-product estimation via residual correction with QJL"
      />

      <Prose>
        <p>
          Many applications do not care about reconstructing the vector itself -- they care about
          <em>inner products</em> between vectors. Nearest-neighbor search ranks by inner product
          (or equivalently, distance). Attention scores in Transformers are inner products between
          queries and keys. For these applications, we need an <H tip="Unbiased estimator = a random variable whose expected value equals the true quantity being estimated. If E[estimate] = true_value, the estimator is unbiased. This is crucial for ranking: biased estimates can swap the order of similar items, ruining search results." color={PURPLE}>unbiased estimator</H> of
          the inner product, not just a low-MSE reconstruction.
        </p>
        <p>
          TurboQuant_prod achieves this with a clever two-stage approach: use (b-1) bits for
          MSE-optimal quantization, then spend the last 1 bit on a <H tip="QJL (Quantized Johnson-Lindenstrauss) = a technique that combines random projection with 1-bit quantization (sign). Named after the Johnson-Lindenstrauss lemma which proves random projections preserve distances. QJL extends this to show that even after quantizing the projection to 1 bit, inner products remain estimable." color={GREEN}>QJL (Quantized
          Johnson-Lindenstrauss)</H> correction of the <H tip="Residual = the difference r = y - ŷ between the original rotated coordinate and its (b-1)-bit quantized reconstruction. The residual captures what the coarse quantizer missed. Its norm is bounded by the quantizer's distortion, making it small enough for 1-bit sketching." color={GREEN}>residual</H>. The result is an unbiased
          inner-product estimator with variance that shrinks as 1/d -- meaning high dimensions
          actually <em>help</em>.
        </p>
      </Prose>

      <ConceptCard title="The Bias Problem — Why MSE-optimal is not Product-optimal" color={RED} defaultOpen={true}>
        <Prose>
          <p>
            Consider two unit vectors x and y with true inner product 0.8. When you quantize
            both with TurboQuant_mse at b bits, the reconstructed inner product
            <code>{' <\u0078\u0302, ŷ>'}</code> will systematically underestimate the true value.
            Why? Because quantization &ldquo;rounds&rdquo; each coordinate to the nearest reconstruction
            point, and this rounding shrinks the effective magnitude. It is like measuring two
            objects with a slightly short ruler -- both measurements are too small, and their
            product is even more wrong.
          </p>
          <p>
            Formally, if <code>\u0072\u0302</code> is the quantized version of a coordinate r, then
            <code>{'E[\u0072\u0302] \u2260 r'}</code> in general. The Lloyd-Max quantizer minimizes
            <code>{'E[(r - \u0072\u0302)\u00b2]'}</code>, which does NOT guarantee <code>{'E[\u0072\u0302] = r'}</code>.
            This means <code>{'E[<\u0078\u0302, ŷ>] \u2260 <x, y>'}</code>.
          </p>
        </Prose>
      </ConceptCard>

      <VisualCompare
        leftLabel="TurboQuant_mse"
        rightLabel="TurboQuant_prod"
        leftColor="#f59e0b"
        rightColor="#06b6d4"
        left={<>
          <p>Optimizes for reconstruction quality (MSE)</p>
          <p>Best for: weight compression, nearest-neighbor</p>
          <p style={{color:'#ef4444'}}>BIASED for inner products</p>
          <p>Attention scores systematically underestimated</p>
        </>}
        right={<>
          <p>Optimizes for inner product estimation</p>
          <p>Best for: KV cache, attention, ranking</p>
          <p style={{color:'#22c55e'}}>UNBIASED — mathematically guaranteed</p>
          <p>Uses QJL residual correction trick</p>
        </>}
        caption="Choose based on your use case: reconstruction (MSE) vs similarity (prod)"
      />

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
          <text x="200" y="146" fill={A3} fontSize="12" fontWeight="600" textAnchor="middle">{'Rotate: y = Π · (x/||x||)'}</text>

          <line x1="200" y1="162" x2="200" y2="180" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />

          <rect x="105" y="182" width="190" height="38" rx="7" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1.5" />
          <text x="200" y="206" fill={A3} fontSize="12" fontWeight="600" textAnchor="middle">Lloyd-Max b-bit per coord</text>

          <line x1="200" y1="222" x2="200" y2="240" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />

          <rect x="115" y="242" width="170" height="38" rx="7" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="2" />
          <text x="200" y="266" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">{'b·d bit code'}</text>

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
          <text x="600" y="146" fill="#c084fc" fontSize="12" fontWeight="600" textAnchor="middle">{'Rotate: y = Π · (x/||x||)'}</text>

          {/* Split into two paths */}
          <line x1="600" y1="162" x2="600" y2="175" stroke={PURPLE} strokeWidth="1.2" />

          {/* Left branch: (b-1) bit MSE */}
          <line x1="600" y1="175" x2="540" y2="190" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-a3)" />
          <rect x="465" y="192" width="150" height="38" rx="7" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.2" />
          <text x="540" y="216" fill={A3} fontSize="11" fontWeight="600" textAnchor="middle">(b-1)-bit Lloyd-Max</text>

          {/* Right branch: residual -> QJL 1-bit */}
          <line x1="600" y1="175" x2="660" y2="190" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a3-g)" />
          <rect x="625" y="192" width="150" height="38" rx="7" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1.2" />
          <text x="700" y="210" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">{'Residual r = y - ŷ'}</text>
          <text x="700" y="224" fill={GRAY} fontSize="10" textAnchor="middle">{'1-bit QJL: sign(S·r)'}</text>

          {/* Merge */}
          <line x1="540" y1="232" x2="600" y2="260" stroke={PURPLE} strokeWidth="1.2" />
          <line x1="700" y1="232" x2="600" y2="260" stroke={PURPLE} strokeWidth="1.2" />

          <rect x="515" y="262" width="170" height="38" rx="7" fill={PURPLE} fillOpacity="0.2" stroke={PURPLE} strokeWidth="2" />
          <text x="600" y="286" fill="#c084fc" fontSize="13" fontWeight="700" textAnchor="middle">{'b·d bit code'}</text>

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
            comes from the <H tip="Johnson-Lindenstrauss lemma (1984) = a foundational result in dimensionality reduction. It states that n points in high-dimensional space can be projected to O(log n / ε²) dimensions while preserving all pairwise distances within a (1±ε) factor. The projection is simply multiplication by a random matrix." color={GREEN}>Johnson-Lindenstrauss lemma</H>: random projections approximately preserve
            inner products. QJL takes this one step further by <em>quantizing</em> the projection
            to a single bit (just the sign).
          </p>
          <p>
            Here is how it works. Given a residual vector r (the difference between the original
            coordinate and its (b-1)-bit quantization), QJL projects r using a random matrix S,
            then takes the sign of each component. To estimate the inner product of two residuals,
            it uses <H tip="Asymmetric estimation = a technique where the query vector keeps full-precision projections while the database vector uses 1-bit quantized projections. This asymmetry is key: the query is computed online (cheap to keep full precision) while database vectors are stored (need compression). The cross-product of full × quantized is still unbiased." color={GREEN}>asymmetric estimation</H>: one side is quantized (1-bit signs),
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
            <text x="200" y="55" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">Key k (stored — quantized)</text>

            <rect x="55" y="70" width="100" height="35" rx="6" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1.2" />
            <text x="105" y="92" fill={FG} fontSize="11" textAnchor="middle">key k</text>

            <line x1="160" y1="87" x2="188" y2="87" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a4)" />

            <rect x="192" y="70" width="120" height="35" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
            <text x="252" y="92" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">{'S · k (project)'}</text>

            <line x1="316" y1="87" x2="344" y2="87" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a4)" />

            <rect x="348" y="70" width="100" height="35" rx="6" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2" />
            <text x="398" y="92" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">{'sign(S·k)'}</text>

            <line x1="452" y1="87" x2="480" y2="87" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a4)" />

            <rect x="484" y="70" width="130" height="35" rx="6" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1" strokeDasharray="3 3" />
            <text x="549" y="86" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">1-bit codes</text>
            <text x="549" y="100" fill={GRAY} fontSize="9" textAnchor="middle">d bits total</text>

            {/* QUERY side (unquantized) */}
            <text x="200" y="150" fill={BLUE} fontSize="13" fontWeight="700" textAnchor="middle">Query q (online — full precision)</text>

            <rect x="55" y="165" width="100" height="35" rx="6" fill={BLUE} fillOpacity="0.1" stroke={BLUE} strokeWidth="1.2" />
            <text x="105" y="187" fill={FG} fontSize="11" textAnchor="middle">query q</text>

            <line x1="160" y1="182" x2="188" y2="182" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-a4b)" />

            <rect x="192" y="165" width="120" height="35" rx="6" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="1.5" />
            <text x="252" y="187" fill={BLUE} fontSize="11" fontWeight="600" textAnchor="middle">{'S · q (project)'}</text>

            <line x1="316" y1="182" x2="344" y2="182" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-a4b)" />

            <rect x="348" y="165" width="100" height="35" rx="6" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="1.5" />
            <text x="398" y="187" fill={BLUE} fontSize="11" fontWeight="600" textAnchor="middle">{'Keep full S·q'}</text>

            {/* Merge for estimation */}
            <line x1="549" y1="108" x2="549" y2="230" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="398" y1="202" x2="398" y2="230" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />
            <line x1="398" y1="230" x2="549" y2="230" stroke={GRAY} strokeWidth="1" strokeDasharray="4 3" />

            <rect x="395" y="240" width="230" height="45" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
            <text x="510" y="258" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">{'Estimate: (S·q) · sign(S·k) / d'}</text>
            <text x="510" y="274" fill={GRAY} fontSize="10" textAnchor="middle">{'Unbiased: E[est] = <q, k> · √(2/πd)'}</text>

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
            desc: 'Same as TurboQuant_mse: compute ||x||, normalize, apply random rotation Π to get y = Π · (x/||x||).',
          },
          {
            title: 'Quantize at (b-1) bits',
            desc: 'Apply the Lloyd-Max quantizer with (b-1) bits per coordinate to get ŷ. This uses one fewer bit than the total budget.',
          },
          {
            title: 'Compute Residual',
            desc: 'The residual r = y - ŷ captures what the (b-1)-bit quantizer missed. This residual has small norm (bounded by the quantizer distortion).',
          },
          {
            title: 'QJL on Residual',
            desc: 'Apply a random projection S to the residual, take the sign: c = sign(S · r). This gives a 1-bit code per coordinate — exactly the remaining 1 bit from our budget.',
          },
          {
            title: 'Combine',
            desc: 'Store: (b-1)*d bits from Lloyd-Max + d bits from QJL signs = b*d bits total. Same budget as TurboQuant_mse, but now inner products are unbiased.',
          },
        ]}
      />

      <FormulaSteps
        label="Theorem 2 — Unbiased Inner Product Estimator"
        color={PURPLE}
        steps={[
          {
            note: 'The problem: we want to estimate the true inner product <x, y> from compressed representations. Think of this as recovering a thermometer reading from a blurry photo — we need to correct for the blur.',
            math: '\\text{Goal: estimate } \\langle x, y \\rangle \\text{ from b-bit codes of } x \\text{ and } y',
          },
          {
            note: 'First, factor out the norms (stored exactly at 32 bits each). Now we only need to estimate the inner product of unit vectors on the sphere. This is the "separate magnitude" trick again.',
            math: '\\langle x, y \\rangle \\;=\\; \\|x\\|\\,\\|y\\| \\cdot \\langle u, v \\rangle, \\quad u = x/\\|x\\|,\\; v = y/\\|y\\|',
          },
          {
            note: 'Use (b-1) bits for Lloyd-Max: that gives us coarse reconstructions u_hat and v_hat. Their inner product is biased — it systematically underestimates. The residuals r_u = u - u_hat capture what the coarse quantizer missed.',
            math: '\\langle u, v \\rangle \\;=\\; \\langle \\hat{u}, \\hat{v}\\rangle \\;+\\; \\underbrace{\\langle r_u, \\hat{v}\\rangle + \\langle \\hat{u}, r_v\\rangle + \\langle r_u, r_v\\rangle}_{\\text{bias correction needed}}',
          },
          {
            note: 'This is the QJL trick — you will see it everywhere in sketching algorithms. Project the residual with random matrix S, keep only the sign (1 bit!). The cross-product of full-precision projection with 1-bit signs is an unbiased estimator of the residual inner product. The sqrt(pi/2d) is the debiasing constant from sign quantization.',
            math: '\\langle r_u, r_v \\rangle \\;\\approx\\; \\sqrt{\\tfrac{\\pi}{2d}}\\,\\langle r_u,\\, \\text{sign}(S\\, r_v)\\rangle',
          },
          {
            note: 'Putting it all together: norms times (coarse estimate + QJL correction). In code: est = norm_x * norm_y * (u_hat @ v_hat + sqrt(pi/(2*d)) * r_u @ np.sign(S @ r_v)). Total cost: b*d bits per vector, same as TurboQuant_mse.',
            math: '\\widehat{\\langle x, y \\rangle}_{\\text{prod}} \\;=\\; \\|x\\|\\,\\|y\\|\\!\\left(\\langle \\hat{u}, \\hat{v}\\rangle + \\sqrt{\\tfrac{\\pi}{2d}}\\,\\langle r_u,\\, \\text{sign}(S\\, r_v)\\rangle\\right)',
          },
        ]}
        symbols={[
          { symbol: 'x, y', meaning: 'Original d-dimensional vectors' },
          { symbol: '||x||, ||y||', meaning: 'Stored norms (32-bit each)' },
          { symbol: 'u_hat, v_hat', meaning: '(b-1)-bit Lloyd-Max reconstructions of the rotated unit vectors' },
          { symbol: 'r_u, r_v', meaning: 'Residual vectors: r_u = Pi·(x/||x||) - u_hat, etc.' },
          { symbol: 'S', meaning: 'Random sign matrix for QJL projection (shared, seeded)' },
          { symbol: 'sign(S·r_v)', meaning: '1-bit QJL codes of the residual' },
          { symbol: 'sqrt(pi/2d)', meaning: 'Scaling factor from QJL theory (the debiasing constant)' },
          { symbol: 'd', meaning: 'Vector dimension' },
        ]}
      />

      <Callout type="math">
        <strong>The 1/d factor is magic.</strong> The variance of the inner-product estimator
        scales as O(1/d). This means that in high dimensions (d = 128, 256, ...), the estimator
        becomes very concentrated around the true value. High dimensions are usually a curse, but
        here they are a blessing -- more coordinates means more independent random variables, which
        means better averaging. This is the <H tip="Concentration of measure phenomenon = in high dimensions, random variables that are sums/averages of many weakly-dependent terms become very predictable. The standard deviation shrinks as 1/√d relative to the mean. For TurboQuant, this means the inner-product estimate has relative error ≈ 1/√d, vanishing in high dimensions." color={A}>concentration of measure</H> phenomenon at work.
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
          Every compression scheme has a fundamental limit: <H tip="Rate-distortion theory = a branch of information theory founded by Claude Shannon (1948, 1959). It characterizes the fundamental tradeoff: at a given bit rate R, what is the minimum distortion D(R) achievable by ANY encoder/decoder pair? The rate-distortion function D(R) is computed from the source distribution via a mutual information minimization." color={A}>Shannon&apos;s rate-distortion
          theory</H>. Given a source distribution and a target bit rate, there is a minimum
          achievable distortion that no encoder can beat. TurboQuant&apos;s authors derive this bound
          for the specific case of vectors on the unit sphere, and then show their algorithm
          nearly matches it.
        </p>
        <p>
          This is what elevates TurboQuant from &ldquo;a clever trick&rdquo; to &ldquo;a theoretically near-optimal
          algorithm.&rdquo; Let us walk through the bounds.
        </p>
      </Prose>

      <FormulaSteps
        label="Lemma 2 — Shannon Lower Bound"
        color={A}
        steps={[
          {
            note: 'What is the absolute best ANY quantizer could do? Shannon\'s rate-distortion theory gives the answer. For a Gaussian source with variance sigma^2 at rate R bits, the minimum distortion is:',
            math: 'D_{\\text{Gaussian}}(R) \\;=\\; \\sigma^2 \\cdot 2^{-2R}',
          },
          {
            note: 'After random rotation, each coordinate is approximately Gaussian with variance 1/d (the energy is split equally among d coordinates). Plug sigma^2 = 1/d and R = b bits into Shannon\'s formula.',
            math: 'D^{\\star}_{\\text{per-coord}}(b) \\;\\geq\\; \\frac{1}{d} \\cdot 2^{-2b}',
          },
          {
            note: 'The extra 1/(2*pi*e) factor accounts for the gap between continuous and discrete quantization — this is the "quantization penalty" from information theory. The constant 2*pi*e is about 17.08, so the bound is ~17x tighter than the naive version.',
            math: 'D^{\\star}(b) \\;\\geq\\; \\frac{1}{d} \\cdot \\frac{1}{2\\pi e} \\cdot 2^{-2b}',
          },
          {
            note: 'Remember: "Each extra bit cuts distortion by 4x." The formula just says that formally. No matter how clever your quantizer — PQ, lattice, deep-learned codebook — it cannot beat this bound. In code: shannon_bound = (1/d) * (1/(2*math.pi*math.e)) * 2**(-2*b).',
            math: 'D^{\\star}(b) \\;\\geq\\; \\frac{1}{d} \\cdot \\frac{1}{2\\pi e} \\cdot 2^{-2b} \\quad \\text{(no quantizer can beat this)}',
          },
        ]}
        symbols={[
          { symbol: 'D*(b)', meaning: 'Minimum achievable MSE distortion at b bits per coordinate' },
          { symbol: 'd', meaning: 'Vector dimension' },
          { symbol: 'b', meaning: 'Bits per coordinate (rate)' },
          { symbol: '2*pi*e', meaning: 'Constant from Gaussian rate-distortion theory (about 17.08)' },
          { symbol: '2^(-2b)', meaning: 'Exponential decay: each extra bit halves the distortion twice' },
        ]}
      />

      <ConceptCard title="Where does this bound come from?" color={A} defaultOpen={false}>
        <Prose>
          <p>
            The derivation goes roughly like this. After random rotation, each coordinate is
            approximately Gaussian with variance 1/d. For a <H tip="Gaussian source = a random variable drawn from a normal distribution. The Gaussian is the 'hardest' distribution to compress in a precise information-theoretic sense: it has the maximum entropy for a given variance, meaning it contains the most 'surprise' per sample." color={A}>Gaussian source</H> with variance \u03C3\u00b2,
            Shannon&apos;s <H tip="Rate-distortion function D(R) = the minimum distortion achievable at rate R bits. Computed by minimizing mutual information I(X; X̂) over all conditional distributions p(x̂|x) subject to E[d(X,X̂)] ≤ D. For Gaussian sources with MSE distortion: D(R) = σ² · 2^(-2R)." color={A}>rate-distortion function</H> says the minimum distortion at rate R bits is:
          </p>
          <p>
            <code>{'D(R) = \u03C3\u00b2 · 2^(-2R)'}</code>
          </p>
          <p>
            With \u03C3\u00b2 = 1/d and R = b bits per coordinate, this gives
            <code>{'D(b) = (1/d) · 2^(-2b)'}</code>. The extra factor of 1/(2πe) comes from the
            fact that we are quantizing to a discrete set (not a continuous one), which introduces
            an additional overhead.
          </p>
          <p>
            Crucially, this bound applies to <em>any</em> randomized quantizer, not just
            coordinate-wise ones. It is a fundamental limit of <H tip="Information theory = the mathematical framework for quantifying information, compression, and communication, founded by Claude Shannon in 1948. Its core quantities — entropy (H), mutual information (I), and channel capacity — provide absolute limits on what is achievable." color={A}>information theory</H>. No matter how
            clever your vector quantization scheme is -- whether you use product quantization,
            <H tip="Lattice quantization = quantizing vectors to the nearest point in a regular lattice (like a grid, but optimized for the geometry). Examples: hexagonal lattice (2D), E8 lattice (8D). Theoretically optimal for Gaussian sources but exponentially complex in high dimensions." color={A}>lattice quantization</H>, or deep-learned codebooks -- you cannot beat this bound.
          </p>
        </Prose>
      </ConceptCard>

      <FormulaSteps
        label="Theorem 3 — TurboQuant is within 2.7x of the Shannon bound"
        color={A}
        steps={[
          {
            note: 'From Theorem 1, we know TurboQuant\'s distortion is bounded by the Lloyd-Max coefficient alpha_b divided by the dimension. This is what the algorithm actually achieves.',
            math: 'D_{\\text{mse}}^{\\text{TQ}}(b) \\;\\leq\\; \\frac{\\alpha_b}{d}',
          },
          {
            note: 'From Lemma 2, Shannon says no quantizer can do better than 1/(2*pi*e) * 2^(-2b) / d. Now the key question: how does alpha_b compare to 1/(2*pi*e) * 2^(-2b)?',
            math: '\\frac{\\alpha_b}{d} \\quad \\text{vs} \\quad \\frac{1}{2\\pi e} \\cdot \\frac{2^{-2b}}{d}',
          },
          {
            note: 'This is the punchline: by numerically computing alpha_b for all b, the authors verify that the ratio never exceeds 2.7. Name the pattern: this is a "constant-factor optimality" result — the holy grail of algorithm design.',
            math: '\\frac{\\alpha_b}{\\frac{1}{2\\pi e} \\cdot 2^{-2b}} \\;\\leq\\; 2.7 \\quad \\text{for all } b',
          },
          {
            note: 'Chaining inequalities: TurboQuant achieves <= alpha_b/d <= 2.7 times the Shannon bound. The gap is constant — it does not grow with d or b. In code: assert turboquant_mse <= 2.7 * shannon_bound for any bit rate, any dimension, any input vector.',
            math: 'D_{\\text{mse}}^{\\text{TQ}}(b) \\;\\leq\\; \\frac{\\alpha_b}{d} \\;\\leq\\; \\frac{2.7}{2\\pi e} \\cdot \\frac{2^{-2b}}{d} \\;=\\; 2.7 \\cdot D^{\\star}(b)',
          },
        ]}
        symbols={[
          { symbol: 'D_{mse}^{TQ}(b)', meaning: 'TurboQuant MSE distortion at b bits per coordinate' },
          { symbol: 'alpha_b', meaning: 'Lloyd-Max distortion coefficient (precomputed per b)' },
          { symbol: 'D*(b)', meaning: 'Shannon lower bound (information-theoretic minimum)' },
          { symbol: '2.7', meaning: 'Multiplicative gap — worst-case over all b values' },
          { symbol: 'd', meaning: 'Vector dimension (cancels in the ratio)' },
        ]}
      />

      <Callout type="insight">
        The gap of 2.7x is <em>constant</em> -- it does not grow with dimension d or the number
        of bits b. This means TurboQuant is proportionally just as good at 1 bit as at 8 bits,
        and just as good in 64 dimensions as in 1024 dimensions. This kind of <H tip="Universal guarantee = a bound that holds for ALL input distributions and ALL dimensions, not just specific datasets. Most quantization methods only have empirical results on benchmarks. TurboQuant's 2.7× bound is a mathematical theorem — it cannot be violated." color={A}>universal guarantee</H>
        is rare in quantization.
      </Callout>

      <ConceptCard title="Why might the 2.7x gap be irreducible?" color={A2} defaultOpen={false}>
        <Prose>
          <p>
            The <H tip="Shannon bound = the information-theoretic lower limit on distortion. Named after Claude Shannon, who proved that any source can be compressed to within arbitrarily close to R(D) bits per symbol, but not fewer, where R(D) is the rate-distortion function." color={A2}>Shannon bound</H> is achievable only in the limit of infinite block length -- i.e.,
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

      <Diagram caption={<><strong>Shannon Bound Gap</strong> — TurboQuant distortion vs the information-theoretic minimum at each bit rate</>}>
        <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="tq-shannon-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={A} stopOpacity="0.25" />
              <stop offset="100%" stopColor={A} stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="tq-gap-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={RED} stopOpacity="0.18" />
              <stop offset="100%" stopColor={RED} stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <rect width="800" height="420" rx="12" fill="#0a0f1a" />

          {/* Title */}
          <text x="400" y="30" fill={A} fontSize="15" fontWeight="700" textAnchor="middle">
            DISTORTION GAP: TurboQuant vs Shannon Lower Bound
          </text>
          <text x="400" y="48" fill={GRAY} fontSize="11" textAnchor="middle">
            Horizontal bars show MSE distortion (log scale, ×1/d) — shorter is better
          </text>

          {/* Legend */}
          <rect x="240" y="60" width="14" height="14" rx="3" fill={A} />
          <text x="260" y="72" fill={FG} fontSize="11">TurboQuant (achieved)</text>
          <rect x="400" y="60" width="14" height="14" rx="3" fill={GREEN} />
          <text x="420" y="72" fill={FG} fontSize="11">Shannon bound (theoretical min)</text>

          {/* Chart area */}
          {/* Axis labels */}
          <text x="120" y="100" fill={GRAY} fontSize="11" textAnchor="end">MSE × d</text>

          {/* b=1 row */}
          <text x="60" y="140" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">b = 1</text>
          <text x="60" y="155" fill={GRAY} fontSize="10" textAnchor="middle">32× compress</text>
          {/* Shannon bound bar */}
          <rect x="120" y="124" width={0.1175 / 0.3634 * 520} height="16" rx="4" fill={GREEN} fillOpacity="0.7" />
          <text x={120 + 0.1175 / 0.3634 * 520 + 6} y="137" fill={GREEN} fontSize="11" fontWeight="600">0.1175</text>
          {/* TurboQuant bar */}
          <rect x="120" y="144" width="520" height="16" rx="4" fill={A} fillOpacity="0.7" />
          <text x="646" y="157" fill={A} fontSize="11" fontWeight="600">0.3634</text>
          {/* Gap annotation */}
          <rect x="650" y="127" width="55" height="22" rx="6" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1" />
          <text x="677" y="142" fill={RED} fontSize="11" fontWeight="700" textAnchor="middle">3.09×</text>

          {/* b=2 row */}
          <text x="60" y="205" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">b = 2</text>
          <text x="60" y="220" fill={GRAY} fontSize="10" textAnchor="middle">16× compress</text>
          {/* Shannon bound bar */}
          <rect x="120" y="189" width={0.0448 / 0.3634 * 520} height="16" rx="4" fill={GREEN} fillOpacity="0.7" />
          <text x={120 + 0.0448 / 0.3634 * 520 + 6} y="202" fill={GREEN} fontSize="11" fontWeight="600">0.0448</text>
          {/* TurboQuant bar */}
          <rect x="120" y="209" width={0.1175 / 0.3634 * 520} height="16" rx="4" fill={A} fillOpacity="0.7" />
          <text x={120 + 0.1175 / 0.3634 * 520 + 6} y="222" fill={A} fontSize="11" fontWeight="600">0.1175</text>
          {/* Gap annotation */}
          <rect x={120 + 0.1175 / 0.3634 * 520 + 50} y="192" width="55" height="22" rx="6" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1" />
          <text x={120 + 0.1175 / 0.3634 * 520 + 77} y="207" fill={RED} fontSize="11" fontWeight="700" textAnchor="middle">2.62×</text>

          {/* b=3 row */}
          <text x="60" y="270" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">b = 3</text>
          <text x="60" y="285" fill={GRAY} fontSize="10" textAnchor="middle">10.7× compress</text>
          {/* Shannon bound bar - very small */}
          <rect x="120" y="254" width={Math.max(0.01305 / 0.3634 * 520, 12)} height="16" rx="4" fill={GREEN} fillOpacity="0.7" />
          <text x={120 + 0.01305 / 0.3634 * 520 + 10} y="267" fill={GREEN} fontSize="11" fontWeight="600">0.0131</text>
          {/* TurboQuant bar */}
          <rect x="120" y="274" width={0.03454 / 0.3634 * 520} height="16" rx="4" fill={A} fillOpacity="0.7" />
          <text x={120 + 0.03454 / 0.3634 * 520 + 6} y="287" fill={A} fontSize="11" fontWeight="600">0.0345</text>
          {/* Gap annotation */}
          <rect x={120 + 0.03454 / 0.3634 * 520 + 50} y="257" width="55" height="22" rx="6" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1" />
          <text x={120 + 0.03454 / 0.3634 * 520 + 77} y="272" fill={RED} fontSize="11" fontWeight="700" textAnchor="middle">2.65×</text>

          {/* b=4 row */}
          <text x="60" y="335" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">b = 4</text>
          <text x="60" y="350" fill={GRAY} fontSize="10" textAnchor="middle">8× compress</text>
          {/* Shannon bound bar */}
          <rect x="120" y="319" width={Math.max(0.003575 / 0.3634 * 520, 8)} height="16" rx="4" fill={GREEN} fillOpacity="0.7" />
          <text x={120 + 0.003575 / 0.3634 * 520 + 10} y="332" fill={GREEN} fontSize="11" fontWeight="600">0.0036</text>
          {/* TurboQuant bar */}
          <rect x="120" y="339" width={Math.max(0.009497 / 0.3634 * 520, 12)} height="16" rx="4" fill={A} fillOpacity="0.7" />
          <text x={120 + 0.009497 / 0.3634 * 520 + 6} y="352" fill={A} fontSize="11" fontWeight="600">0.0095</text>
          {/* Gap annotation */}
          <rect x={120 + 0.009497 / 0.3634 * 520 + 50} y="322" width="55" height="22" rx="6" fill={RED} fillOpacity="0.15" stroke={RED} strokeWidth="1" />
          <text x={120 + 0.009497 / 0.3634 * 520 + 77} y="337" fill={RED} fontSize="11" fontWeight="700" textAnchor="middle">2.66×</text>

          {/* Bottom insight box */}
          <rect x="140" y="375" width="520" height="36" rx="10" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1.2" />
          <text x="400" y="393" fill={FG} fontSize="12" textAnchor="middle">
            Worst-case gap ≤ 2.7× — constant across all bit rates and dimensions
          </text>
          <text x="400" y="407" fill={GRAY} fontSize="10" textAnchor="middle">
            No practical quantizer can beat the Shannon bound; TurboQuant is remarkably close
          </text>
        </svg>
      </Diagram>

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
          LLM <H tip="Perplexity = a standard metric for language model quality. It measures how 'surprised' the model is by a text. Lower is better. Perplexity of P means the model is as uncertain as choosing uniformly among P options at each step. FP16 Llama-3-8B achieves 6.14 on WikiText-2; adding quantization error raises this." color={A}>perplexity</H> benchmarks. The results are impressive across the board.
        </p>
      </Prose>

      <ConceptCard title="KV Cache Compression" color={A} defaultOpen={true}>
        <Prose>
          <p>
            <strong>Setup:</strong> Llama-3-8B model on the <H tip="Needle-In-A-Haystack (NIAH) = a benchmark that inserts a specific fact ('needle') at a random position in a very long context ('haystack') and tests whether the model can retrieve it. Scores range from 0 to 1. It is the gold standard for evaluating long-context KV cache quality because it requires precise attention across the entire sequence." color={A}>Needle-In-A-Haystack (NIAH)</H> benchmark.
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
            1M-10M vectors. Metric: <H tip="Recall@1 = the fraction of queries for which the true nearest neighbor is returned as the top result. Recall@1 of 0.965 means 96.5% of queries find the correct nearest neighbor. It is the strictest retrieval metric — getting the top-1 right is harder than top-10." color={BLUE}>Recall@1</H> at various compression ratios.
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
            PQ and <H tip="OPQ (Optimized Product Quantization) = an extension of PQ that learns an orthogonal rotation to minimize quantization error before applying PQ. Ironically similar in spirit to TurboQuant's random rotation, but OPQ learns the rotation from data (expensive) while TurboQuant uses a random one (free)." color={BLUE}>OPQ</H> require training codebooks on representative data, which takes seconds to
            minutes and requires storing the codebooks. TurboQuant is <H tip="Codebook-free = no lookup table mapping quantized indices to learned reconstruction vectors. TurboQuant's reconstruction points come from the Lloyd-Max quantizer for the known Beta distribution — precomputed analytically, not learned from data. This eliminates the codebook storage overhead and training step." color={BLUE}>codebook-free</H>: you can quantize
            vectors as they arrive with no preprocessing step.
          </p>
        </Prose>
      </ConceptCard>

      <ConceptCard title="LLM Perplexity Benchmarks" color={PURPLE} defaultOpen={false}>
        <Prose>
          <p>
            <strong>Setup:</strong> Llama-3-8B and Llama-3-70B on <H tip="WikiText-2 = a standard language modeling benchmark derived from Wikipedia 'Good' and 'Featured' articles. Contains ~2M tokens of clean, well-written text. Perplexity on WikiText-2 is the de facto metric for evaluating LLM compression techniques because it directly measures generation quality degradation." color={PURPLE}>WikiText-2</H> perplexity evaluation
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
            At 3 bits, TurboQuant has a clear edge over <H tip="KIVI = a state-of-the-art KV cache quantization method that uses per-channel (Key) and per-token (Value) quantization with separate calibration strategies. Unlike TurboQuant, KIVI uses simple round-to-nearest without theoretical optimality guarantees." color={PURPLE}>KIVI</H> (6.35 vs 6.52 on Llama-3-8B). This
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

      <Diagram caption={<><strong>KV Cache Memory Savings</strong> — Llama-3-70B at 128K context length: full precision vs TurboQuant compression</>}>
        <svg viewBox="0 0 800 440" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
          <rect width="800" height="440" rx="12" fill="#0a0f1a" />

          {/* Title */}
          <text x="400" y="30" fill={A} fontSize="15" fontWeight="700" textAnchor="middle">
            KV CACHE MEMORY: Llama-3-70B @ 128K Context
          </text>
          <text x="400" y="48" fill={GRAY} fontSize="11" textAnchor="middle">
            Per-user GPU memory for Key-Value cache across quantization levels
          </text>

          {/* Model info box */}
          <rect x="30" y="62" width="740" height="30" rx="6" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="0.8" />
          <text x="400" y="82" fill={GRAY} fontSize="10" textAnchor="middle">
            80 layers × 8 KV heads × 128 head_dim × 128K tokens × 2 (K+V) = ~20.97B elements per user
          </text>

          {/* Bar chart */}
          {/* 32-bit (FP32) */}
          <text x="130" y="128" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">FP32 (32-bit)</text>
          <text x="130" y="143" fill={GRAY} fontSize="10" textAnchor="end">Full precision</text>
          <rect x="145" y="116" width="560" height="32" rx="6" fill={RED} fillOpacity="0.6" />
          <text x="715" y="137" fill={FG} fontSize="13" fontWeight="700" textAnchor="start">78.0 GB</text>

          {/* 16-bit (FP16/BF16) - typical baseline */}
          <text x="130" y="178" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">FP16 (16-bit)</text>
          <text x="130" y="193" fill={GRAY} fontSize="10" textAnchor="end">Standard inference</text>
          <rect x="145" y="166" width="280" height="32" rx="6" fill="#f97316" fillOpacity="0.6" />
          <text x="435" y="187" fill={FG} fontSize="13" fontWeight="700" textAnchor="start">39.0 GB</text>

          {/* TurboQuant 4-bit */}
          <text x="130" y="228" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">TQ 4-bit</text>
          <text x="130" y="243" fill={GRAY} fontSize="10" textAnchor="end">PPL: 2.88 (↑0.02)</text>
          <rect x="145" y="216" width="70" height="32" rx="6" fill={A} fillOpacity="0.7" />
          <text x="225" y="237" fill={A3} fontSize="13" fontWeight="700" textAnchor="start">9.75 GB</text>
          {/* Savings badge */}
          <rect x="310" y="221" width="60" height="22" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="340" y="236" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">4× ↓</text>

          {/* TurboQuant 3-bit */}
          <text x="130" y="278" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">TQ 3-bit</text>
          <text x="130" y="293" fill={GRAY} fontSize="10" textAnchor="end">PPL: 2.94 (↑0.08)</text>
          <rect x="145" y="266" width="53" height="32" rx="6" fill={A} fillOpacity="0.8" />
          <text x="208" y="287" fill={A3} fontSize="13" fontWeight="700" textAnchor="start">7.3 GB</text>
          {/* Savings badge */}
          <rect x="280" y="271" width="68" height="22" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="314" y="286" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">5.3× ↓</text>

          {/* TurboQuant 2-bit */}
          <text x="130" y="328" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">TQ 2-bit</text>
          <text x="130" y="343" fill={GRAY} fontSize="10" textAnchor="end">NIAH: 0.91</text>
          <rect x="145" y="316" width="35" height="32" rx="6" fill={A2} fillOpacity="0.8" />
          <text x="190" y="337" fill={A3} fontSize="13" fontWeight="700" textAnchor="start">4.9 GB</text>
          {/* Savings badge */}
          <rect x="255" y="321" width="60" height="22" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="285" y="336" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">8× ↓</text>

          {/* GPU capacity line */}
          <line x1="717" y1="110" x2="717" y2="355" stroke={RED} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="717" y="365" fill={RED} fontSize="10" fontWeight="600" textAnchor="middle">H100</text>
          <text x="717" y="377" fill={RED} fontSize="10" textAnchor="middle">80 GB</text>

          {/* A100 capacity line */}
          <line x1={145 + (40 / 78) * 560} y1="110" x2={145 + (40 / 78) * 560} y2="355" stroke="#f97316" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x={145 + (40 / 78) * 560} y="365" fill="#f97316" fontSize="10" fontWeight="600" textAnchor="middle">A100</text>
          <text x={145 + (40 / 78) * 560} y="377" fill="#f97316" fontSize="10" textAnchor="middle">40 GB</text>

          {/* Insight boxes */}
          <rect x="40" y="392" width="350" height="38" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="215" y="408" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">
            At 3-bit: fits on a single A100 (40 GB)
          </text>
          <text x="215" y="422" fill={GRAY} fontSize="10" textAnchor="middle">
            FP16 requires 2× A100s or 1× H100 just for KV cache
          </text>

          <rect x="410" y="392" width="360" height="38" rx="8" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="1" />
          <text x="590" y="408" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">
            At 4-bit: serve 4× more concurrent users
          </text>
          <text x="590" y="422" fill={GRAY} fontSize="10" textAnchor="middle">
            Or extend context to 512K on the same hardware
          </text>
        </svg>
      </Diagram>

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
        simplest approach -- <H tip="Random rotation = multiplying by a Haar-random orthogonal matrix. Implemented efficiently as a product of random Hadamard transforms: y = D·H·D·H·...·x, where H is the Hadamard matrix and D is a random diagonal sign matrix. Cost: O(d log d) instead of O(d²) for a full matrix multiply." color={A}>random rotation</H> followed by independent <H tip="Scalar quantization = mapping each real number to the nearest element of a finite set of reconstruction points. The simplest form of quantization — no cross-coordinate dependencies. TurboQuant proves this is near-optimal after rotation, which is surprising because it ignores the vector structure." color={A}>scalar quantization</H> -- is
        provably near-optimal. It achieves within 2.7x of the <H tip="Information-theoretic limit = Shannon's rate-distortion bound, the absolute minimum distortion achievable at a given bit rate by ANY compressor, no matter how complex or computationally expensive. Being within 2.7× of this limit with a simple algorithm is remarkable." color={A}>information-theoretic limit</H>, works
        in streaming/online settings with zero training, and matches or beats complex learned
        quantizers on real benchmarks. The key insight is that random rotations &ldquo;democratize&rdquo;
        vector energy across coordinates, turning a hard <H tip="Vector quantization problem = given a continuous d-dimensional vector, find the best discrete representation using a fixed number of bits. Optimal vector quantization requires searching over 2^(b·d) possible codewords — exponential in dimension. TurboQuant reduces this to d independent scalar problems." color={A}>vector problem</H> into d easy scalar problems.
      </Callout>

      <ConceptCard title="What TurboQuant does NOT do (limitations)" color={GRAY} defaultOpen={false}>
        <Prose>
          <p>
            <strong>1. Non-Euclidean metrics.</strong> TurboQuant is designed for <H tip="L2 distance (Euclidean distance) = ||x - y|| = √(Σ(x_i - y_i)²). The standard distance metric in vector spaces. TurboQuant's MSE guarantee directly translates to L2 distance preservation. Cosine similarity also works because it equals the inner product of unit vectors." color={GRAY}>L2 distance</H> and
            inner products. If your application uses <H tip="Cosine similarity = cos(θ) = ⟨x,y⟩ / (||x|| · ||y||). Measures the angle between two vectors, ignoring magnitude. Since TurboQuant normalizes vectors to the unit sphere before quantization, cosine similarity reduces to inner product, which TurboQuant_prod estimates without bias." color={GRAY}>cosine similarity</H> (which normalizes to unit
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
            are <H tip="Sparse vectors = vectors where most entries are zero or near-zero. If you know the sparsity pattern, you can compress by only storing the non-zero entries (run-length encoding, CSR format). Random rotation destroys sparsity by spreading energy across ALL coordinates, which is wasteful when the vector was sparse to begin with." color={GRAY}>sparse in a known basis</H>), exploiting that structure can beat TurboQuant. The random
            rotation deliberately destroys structure, which is optimal for arbitrary vectors but
            suboptimal for structured ones.
          </p>
          <p>
            <strong>4. The rotation cost.</strong> Applying the random rotation matrix costs O(d^2)
            per vector (or O(d log d) with <H tip="Randomized Hadamard Transform (RHT) = an efficient implementation of approximate random rotation. Uses the Walsh-Hadamard matrix (which can be applied in O(d log d) via the butterfly algorithm) multiplied by random sign flips. Three rounds of RHT closely approximate a true Haar-random rotation." color={GRAY}>structured rotations like randomized Hadamard</H>). For very
            high throughput applications, this cost may matter.
          </p>
        </Prose>
      </ConceptCard>
    </>
  );
}
