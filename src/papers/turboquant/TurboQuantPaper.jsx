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
import SimpleExplain from '../../components/SimpleExplain';

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

      {/* SVG 1: The Compression Problem */}
      <Diagram caption="The Compression Problem: a 128-d vector compressed from full precision to 4-bit quantized codes">
        <svg viewBox="0 0 800 360" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-cp-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="10" markerHeight="8" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
          </defs>
          <rect width="800" height="360" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="30" fill={FG} fontSize="15" fontWeight="700" textAnchor="middle">128-DIMENSIONAL VECTOR COMPRESSION</text>

          {/* LEFT: BEFORE */}
          <text x="175" y="58" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">BEFORE</text>
          <text x="175" y="76" fill={A3} fontSize="11" fontWeight="500" textAnchor="middle">Full Precision (FP32)</text>
          <rect x="30" y="86" width="290" height="138" rx="8" fill={A} fillOpacity="0.06" stroke={A} strokeWidth="0.8" strokeOpacity="0.3" />

          {/* BEFORE grid: 128 cells, each a UNIQUE color — looks chaotic */}
          {(() => {
            const hues = [];
            for (let i = 0; i < 128; i++) hues.push(Math.round((i * 137.5 + i * i * 0.3) % 360));
            return hues.map((h, i) => {
              const col = Math.floor(i % 16);
              const row = Math.floor(i / 16);
              return <rect key={`fp-${i}`} x={36 + col * 17.5} y={92 + row * 16} width="15" height="13" rx="2" fill={`hsl(${h}, 70%, 55%)`} opacity={0.9} />;
            });
          })()}
          <text x="175" y="240" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">128 unique float32 values</text>

          {/* ARROW */}
          <rect x="345" y="130" width="80" height="30" rx="8" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="385" y="150" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">TurboQ</text>
          <line x1="330" y1="160" x2="345" y2="160" stroke={A} strokeWidth="2.5" />
          <line x1="425" y1="160" x2="450" y2="160" stroke={A} strokeWidth="2.5" markerEnd="url(#tq-cp-arrow)" />
          <text x="385" y="175" fill={GRAY} fontSize="11" textAnchor="middle">4-bit quantize</text>

          {/* RIGHT: AFTER */}
          <text x="610" y="58" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">AFTER</text>
          <text x="610" y="76" fill={GREEN} fontSize="11" fontWeight="500" textAnchor="middle">Quantized (4-bit = 16 levels)</text>
          <rect x="465" y="86" width="290" height="138" rx="8" fill={GREEN} fillOpacity="0.05" stroke={GREEN} strokeWidth="0.8" strokeOpacity="0.3" />

          {/* AFTER grid: 128 cells, ONLY 16 colors — sorted in color bands so it's visually OBVIOUS */}
          {/* Row 1: all red shades (level 0). Row 2: orange→yellow. Row 3: greens. etc. CLEAR BANDING. */}
          {(() => {
            const q16 = ['#dc2626','#ea580c','#d97706','#ca8a04','#65a30d','#16a34a','#0d9488','#0891b2',
                         '#2563eb','#4f46e5','#7c3aed','#9333ea','#c026d3','#db2777','#e11d48','#71717a'];
            /* 128 cells, each assigned to one of 16 levels — sorted so same colors cluster together */
            /* 8 cells per level on average (128/16=8). Lay them out so each color appears in a visible block */
            const sorted = [];
            for (let lvl = 0; lvl < 16; lvl++) {
              for (let k = 0; k < 8; k++) sorted.push(lvl);
            }
            return sorted.map((lvl, i) => {
              const col = i % 16;
              const row = Math.floor(i / 16);
              return <rect key={`q-${i}`} x={471 + col * 17.5} y={92 + row * 16} width="15" height="13" rx="2" fill={q16[lvl]} opacity={0.9} />;
            });
          })()}
          <text x="610" y="240" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">Only 16 distinct levels</text>

          {/* Storage comparison */}
          <rect x="50" y="260" width="700" height="88" rx="8" fill={A} fillOpacity="0.04" stroke={A} strokeWidth="0.5" strokeOpacity="0.2" />
          <text x="400" y="280" fill={FG} fontSize="13" fontWeight="600" textAnchor="middle">STORAGE PER VECTOR</text>

          {/* Full precision bar — wide */}
          <rect x="70" y="292" width="440" height="16" rx="4" fill={RED} fillOpacity="0.55" />
          <text x="70" y="322" fill={RED} fontSize="11" fontWeight="600" fontFamily="'JetBrains Mono', monospace">512 bytes (128 dims x 4 bytes each)</text>

          {/* Quantized bar — proportionally shorter */}
          <rect x="70" y="336" width={Math.round(440 * 68 / 512)} height="16" rx="4" fill={GREEN} fillOpacity="0.7" />
          <text x={76 + Math.round(440 * 68 / 512)} y="349" fill={GREEN} fontSize="11" fontWeight="600" fontFamily="'JetBrains Mono', monospace">68 bytes</text>

          {/* 7.5x badge */}
          <rect x="620" y="310" width="110" height="32" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="675" y="331" fill={GREEN} fontSize="15" fontWeight="800" textAnchor="middle">7.5x smaller</text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>What's happening at a high level:</strong> AI models store information as lists of numbers (vectors). A single number in a list normally takes 32 bits of storage. TurboQuant squishes each number down to just 3-4 bits — like compressing a detailed photograph into a tiny thumbnail that still looks almost identical. The magic: it does this with provable quality guarantees, zero preparation time, and near-perfect accuracy.</p>
      </SimpleExplain>

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

      {/* SVG 2: Why Vectors Are Hard */}
      <Diagram caption="Why Vectors Are Hard: real data has correlated coordinates — random rotation decorrelates them">
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-wv-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="9" markerHeight="7" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <marker id="tq-wv-arr-g" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="9" markerHeight="7" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
            </marker>
          </defs>
          <rect width="800" height="380" rx="12" fill={BG} />

          {/* LEFT: Correlated 2D scatter */}
          <text x="195" y="28" fill={RED} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">CORRELATED</text>
          <text x="195" y="46" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">Before rotation</text>

          {/* Axis lines — left plot */}
          <line x1="50" y1="290" x2="340" y2="290" stroke={GRAY} strokeWidth="1" strokeOpacity="0.4" />
          <line x1="50" y1="290" x2="50" y2="60" stroke={GRAY} strokeWidth="1" strokeOpacity="0.4" />
          <text x="195" y="310" fill={GRAY} fontSize="11" textAnchor="middle">x&#x2081;</text>
          <text x="34" y="178" fill={GRAY} fontSize="11" textAnchor="middle">x&#x2082;</text>

          {/* Tilted ellipse cloud of data points */}
          {(() => {
            // Simulated correlated 2D data forming a tilted ellipse — shifted down
            const pts = [
              [95,255],[105,245],[120,235],[130,225],[115,240],[140,218],[150,210],[155,202],
              [165,195],[175,188],[185,180],[195,175],[200,168],[210,160],[215,155],[225,150],
              [230,145],[240,138],[250,132],[255,128],[260,122],[270,118],[275,112],[285,108],
              [100,250],[110,238],[125,230],[135,220],[145,212],[160,198],[170,190],[180,182],
              [190,172],[205,165],[220,152],[235,140],[245,135],[265,120],[280,110],[290,105],
              [108,248],[122,232],[138,222],[152,208],[168,192],[178,185],[188,178],[198,170],
              [208,162],[218,158],[228,148],[238,142],[248,130],[258,125],[268,115],[288,102],
            ];
            return pts.map((p, i) => (
              <circle key={`cp-${i}`} cx={p[0]} cy={p[1]} r="3.5" fill={A} opacity={0.6 + (i % 3) * 0.1} />
            ));
          })()}

          {/* Principal axis line */}
          <line x1="80" y1="263" x2="295" y2="97" stroke={RED} strokeWidth="1.5" strokeDasharray="6 3" strokeOpacity="0.7" />
          <text x="305" y="93" fill={RED} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">principal axis</text>

          {/* Correlation coefficient */}
          <rect x="65" y="320" width="100" height="24" rx="6" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="0.8" />
          <text x="115" y="337" fill={RED} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">r = 0.85</text>

          {/* Label */}
          <rect x="50" y="350" width="290" height="24" rx="6" fill={RED} fillOpacity="0.08" />
          <text x="195" y="367" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">Correlated -- naive quantization wastes bits</text>

          {/* Arrow: rotation transform */}
          <line x1="365" y1="178" x2="435" y2="178" stroke={A} strokeWidth="2.5" markerEnd="url(#tq-wv-arr)" />
          <rect x="370" y="152" width="58" height="22" rx="6" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1" />
          <text x="399" y="168" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">{'Π ·'}</text>
          <text x="399" y="198" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">rotate</text>

          {/* RIGHT: Decorrelated circular scatter */}
          <text x="605" y="28" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">DECORRELATED</text>
          <text x="605" y="46" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">After rotation</text>

          {/* Axis lines — right plot */}
          <line x1="460" y1="290" x2="750" y2="290" stroke={GRAY} strokeWidth="1" strokeOpacity="0.4" />
          <line x1="460" y1="290" x2="460" y2="60" stroke={GRAY} strokeWidth="1" strokeOpacity="0.4" />
          <text x="605" y="310" fill={GRAY} fontSize="11" textAnchor="middle">y&#x2081;</text>
          <text x="445" y="178" fill={GRAY} fontSize="11" textAnchor="middle">y&#x2082;</text>

          {/* Circular cloud of data points */}
          {(() => {
            const pts2 = [
              [580,145],[620,155],[640,170],[590,185],[610,135],[570,165],[650,165],[600,195],
              [560,175],[630,195],[620,125],[580,205],[640,140],[560,155],[650,185],[570,195],
              [610,200],[590,125],[630,145],[600,170],[580,180],[620,185],[640,155],[560,170],
              [650,175],[570,140],[590,160],[610,165],[630,180],[600,150],[580,135],[640,195],
              [570,185],[620,170],[590,175],[610,155],[560,165],[650,155],[600,185],[580,165],
              [630,165],[590,145],[620,180],[640,180],[570,160],[610,190],[560,180],[650,145],
            ];
            return pts2.map((p, i) => (
              <circle key={`dc-${i}`} cx={p[0]} cy={p[1]} r="3.5" fill={GREEN} opacity={0.55 + (i % 4) * 0.1} />
            ));
          })()}

          {/* Correlation coefficient */}
          <rect x="548" y="320" width="114" height="24" rx="6" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="0.8" />
          <text x="605" y="337" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{`r \u2248 0`}</text>

          {/* Label */}
          <rect x="460" y="350" width="290" height="24" rx="6" fill={GREEN} fillOpacity="0.08" />
          <text x="605" y="367" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">Independent -- scalar quantization is near-optimal</text>
        </svg>
      </Diagram>

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
        <svg viewBox="0 0 800 440" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
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
          <rect width="800" height="440" rx="12" fill={BG} />

          {/* LEFT: Before rotation */}
          <text x="140" y="32" fill={A} fontSize="14" fontWeight="700" textAnchor="middle">BEFORE ROTATION</text>

          {/* Unit sphere */}
          <circle cx="140" cy="170" r="100" fill="url(#tq-grad-sphere)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="140" y="290" fill={GRAY} fontSize="11" textAnchor="middle">Unit sphere S^(d-1)</text>

          {/* Arbitrary vector -- clustered energy */}
          <line x1="140" y1="170" x2="215" y2="95" stroke={A3} strokeWidth="2.5" markerEnd="url(#tq-arrow-amber)" />
          <text x="222" y="88" fill={A3} fontSize="12" fontWeight="600">x</text>

          {/* Coordinate bars (skewed) */}
          <text x="50" y="322" fill={GRAY} fontSize="11">Coordinates:</text>
          {[0.82, 0.55, 0.12, 0.04, 0.01, 0.01].map((v, i) => (
            <g key={i}>
              <rect x={115 + i * 24} y={320 - v * 45} width="18" height={v * 45} rx="2" fill={A} opacity={0.5 + v * 0.5} />
              <text x={124 + i * 24} y={340} fill={GRAY} fontSize="11" textAnchor="middle">x{i + 1}</text>
            </g>
          ))}
          <text x="140" y="368" fill={FG} fontSize="11" textAnchor="middle" opacity="0.7">Energy concentrated</text>

          {/* Arrow: rotation */}
          <line x1="290" y1="170" x2="390" y2="170" stroke={A} strokeWidth="2" markerEnd="url(#tq-arrow-amber)" />
          <rect x="305" y="147" width="70" height="24" rx="6" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1" />
          <text x="340" y="163" fill={A} fontSize="12" fontWeight="700" textAnchor="middle">{'Π · x'}</text>
          <text x="340" y="135" fill={FG} fontSize="11" textAnchor="middle" opacity="0.6">Random rotation</text>

          {/* RIGHT: After rotation */}
          <text x="560" y="32" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">AFTER ROTATION</text>

          {/* Unit sphere */}
          <circle cx="560" cy="170" r="100" fill="url(#tq-grad-sphere)" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="560" y="290" fill={GRAY} fontSize="11" textAnchor="middle">Still on S^(d-1)</text>

          {/* Rotated vector -- more spread */}
          <line x1="560" y1="170" x2="630" y2="105" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#tq-arrow-amber)" />
          <text x="637" y="100" fill={GREEN} fontSize="12" fontWeight="600">{'Πx'}</text>

          {/* Coordinate bars (uniform-ish) */}
          <text x="470" y="322" fill={GRAY} fontSize="11">Coordinates:</text>
          {[0.41, 0.38, 0.42, 0.39, 0.40, 0.37].map((v, i) => (
            <g key={i}>
              <rect x={535 + i * 24} y={320 - v * 45} width="18" height={v * 45} rx="2" fill={GREEN} opacity="0.7" />
              <text x={544 + i * 24} y={340} fill={GRAY} fontSize="11" textAnchor="middle">y{i + 1}</text>
            </g>
          ))}
          <text x="560" y="368" fill={FG} fontSize="11" textAnchor="middle" opacity="0.7">Energy spread uniformly</text>

          {/* Bottom insight — centered below both charts */}
          <rect x="230" y="392" width="340" height="34" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.2" />
          <text x="400" y="414" fill={A} fontSize="13" fontWeight="700" textAnchor="middle">Each y_i ~ Beta(1/2, (d-1)/2)</text>
        </svg>
      </Diagram>

      {/* SVG 3: The Random Rotation — Step by Step */}
      <Diagram caption="The Random Rotation — Step by Step: direction changes but length (information) is perfectly preserved">
        <svg viewBox="0 0 800 340" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-rr-vec" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A3} />
            </marker>
            <marker id="tq-rr-vec2" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
            </marker>
            <marker id="tq-rr-step" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <linearGradient id="tq-rr-circle-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor={A} stopOpacity="0.08" />
              <stop offset="100%" stopColor={A} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <rect width="800" height="340" rx="12" fill={BG} />

          {/* STEP 1 */}
          <circle cx="48" cy="30" r="16" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="48" y="36" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">1</text>
          <text x="74" y="36" fill={FG} fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Original Vector</text>

          {/* Circle representing unit sphere */}
          <circle cx="140" cy="155" r="85" fill="none" stroke={A} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.3" />
          {/* Vector arrow pointing up-right */}
          <line x1="140" y1="155" x2="210" y2="85" stroke={A3} strokeWidth="2.5" markerEnd="url(#tq-rr-vec)" />
          <text x="218" y="80" fill={A3} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">x</text>
          {/* Projections on axes */}
          <line x1="210" y1="85" x2="210" y2="155" stroke={A} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.4" />
          <line x1="210" y1="85" x2="140" y2="85" stroke={A} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.4" />
          <text x="212" y="170" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">x&#x2081;=0.82</text>
          <text x="100" y="80" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">x&#x2082;=0.57</text>

          {/* LENGTH annotation */}
          <rect x="80" y="192" width="120" height="22" rx="6" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="0.8" />
          <text x="140" y="208" fill={PURPLE} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">LENGTH = 1.0</text>

          {/* Step arrow */}
          <line x1="248" y1="145" x2="288" y2="145" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-rr-step)" />

          {/* STEP 2 */}
          <circle cx="318" cy="30" r="16" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="318" y="36" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">2</text>
          <text x="344" y="36" fill={FG} fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Apply Rotation {'Π'}</text>

          {/* Same circle */}
          <circle cx="410" cy="155" r="85" fill="none" stroke={A} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.3" />
          {/* Original vector (ghost) */}
          <line x1="410" y1="155" x2="480" y2="85" stroke={A3} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.25" />
          {/* Rotation arc */}
          <path d="M 475 90 A 80 80 0 0 1 490 143" fill="none" stroke={A} strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="498" y="115" fill={A} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{'Π'}</text>
          {/* New rotated vector */}
          <line x1="410" y1="155" x2="490" y2="140" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#tq-rr-vec2)" />
          <text x="498" y="137" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{'Πx'}</text>
          {/* Same radius highlight */}
          <text x="445" y="115" fill={GRAY} fontSize="11" fontFamily="Inter, system-ui, sans-serif">same ||x||</text>

          {/* Step arrow */}
          <line x1="518" y1="145" x2="538" y2="145" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-rr-step)" />

          {/* STEP 3 */}
          <circle cx="548" cy="30" r="16" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="548" y="36" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">3</text>
          <text x="574" y="36" fill={FG} fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">New Coordinates</text>

          {/* Same circle */}
          <circle cx="640" cy="155" r="85" fill="none" stroke={GREEN} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.3" />
          {/* Rotated vector */}
          <line x1="640" y1="155" x2="720" y2="140" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#tq-rr-vec2)" />
          <text x="728" y="137" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">y</text>
          {/* New projections on axes — more balanced */}
          <line x1="720" y1="140" x2="720" y2="155" stroke={GREEN} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />
          <line x1="720" y1="140" x2="640" y2="140" stroke={GREEN} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />
          <text x="722" y="170" fill={GREEN} fontSize="11" fontFamily="'JetBrains Mono', monospace">y&#x2081;=0.98</text>
          <text x="656" y="135" fill={GREEN} fontSize="11" fontFamily="'JetBrains Mono', monospace">y&#x2082;=0.15</text>

          {/* LENGTH annotation for step 3 */}
          <rect x="580" y="192" width="120" height="22" rx="6" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="0.8" />
          <text x="640" y="208" fill={PURPLE} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">LENGTH = 1.0</text>

          {/* KEY INSIGHT box */}
          <rect x="200" y="250" width="400" height="36" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.2" />
          <text x="400" y="273" fill={FG} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">
            {'Same length, different direction -- that is the whole trick'}
          </text>

          {/* Bottom formula bar */}
          <rect x="80" y="300" width="640" height="28" rx="8" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="0.8" />
          <text x="400" y="320" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">
            {'||x|| = ||Πx|| — length preserved exactly. Only the DIRECTION is randomized.'}
          </text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>The random rotation trick in everyday terms:</strong> Imagine you have a suitcase packed unevenly — heavy books on one side, light clothes on the other. Compressing it naively means some parts get crushed (the heavy side) while others waste space (the light side). TurboQuant's insight: shake the suitcase randomly first so the weight spreads evenly. Now you can compress every section by the same amount with the same quality. The "shaking" is mathematically precise — it's a random rotation that spreads the vector's energy uniformly across all dimensions.</p>
      </SimpleExplain>

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

        <SimpleExplain>
          <p><strong>What the formula really says:</strong> After the random shake, every number in your list follows the exact same pattern (a Beta distribution). In high dimensions (128+), this pattern is basically a bell curve centered at zero with a very specific width (1/√d). Since we KNOW the pattern, we can design the mathematically perfect compressor for it — like having the cheat sheet for an exam. This is why TurboQuant is near-optimal: it's not guessing, it's using the known answer.</p>
        </SimpleExplain>
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


      {/* SVG 10: The Hypersphere Intuition */}
      <Diagram caption="The Hypersphere Intuition: a point on the sphere keeps its length after rotation, but coordinate projections redistribute uniformly">
        <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <defs>
            <marker id="tq-hyp-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <radialGradient id="tq-sph-L" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor={A} stopOpacity="0.25" />
              <stop offset="50%" stopColor={A} stopOpacity="0.08" />
              <stop offset="100%" stopColor={A} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tq-sph-R" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.25" />
              <stop offset="50%" stopColor={GREEN} stopOpacity="0.08" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="420" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="24" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">The Hypersphere Intuition</text>
          <text x="400" y="40" fill={GRAY} fontSize="11" textAnchor="middle">Random rotation preserves sphere radius but redistributes coordinate projections</text>

          {/* === LEFT: Before rotation === */}
          <text x="175" y="62" fill={A} fontSize="12" fontWeight="700" textAnchor="middle">BEFORE ROTATION</text>
          <ellipse cx="175" cy="178" rx="95" ry="95" fill="url(#tq-sph-L)" stroke={A} strokeWidth="1.5" strokeDasharray="4 3" />
          <ellipse cx="175" cy="178" rx="95" ry="28" fill="none" stroke={A} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
          <ellipse cx="175" cy="178" rx="28" ry="95" fill="none" stroke={A} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />

          {/* Axes — further from sphere */}
          <line x1="175" y1="178" x2="290" y2="178" stroke={GRAY} strokeWidth="0.7" strokeDasharray="3 2" />
          <text x="298" y="182" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">x</text>
          <line x1="175" y1="178" x2="175" y2="70" stroke={GRAY} strokeWidth="0.7" strokeDasharray="3 2" />
          <text x="175" y="62" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">y</text>
          <line x1="175" y1="178" x2="115" y2="238" stroke={GRAY} strokeWidth="0.7" strokeDasharray="3 2" />
          <text x="106" y="248" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">z</text>

          {/* Point on sphere (concentrated: large x, small y, z) */}
          <line x1="175" y1="178" x2="260" y2="118" stroke={A3} strokeWidth="2" />
          <circle cx="260" cy="118" r="5" fill={A3} />
          <text x="268" y="112" fill={A3} fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace">p</text>
          <line x1="260" y1="118" x2="260" y2="178" stroke={A} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
          <line x1="260" y1="118" x2="175" y2="118" stroke={A} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />

          {/* Projection bars */}
          <text x="108" y="298" fill={GRAY} fontSize="11">Projections:</text>
          <rect x="108" y="304" width="55" height="10" rx="2" fill={A} opacity="0.9" />
          <text x="135" y="330" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">x=.85</text>
          <rect x="175" y="307" width="18" height="7" rx="2" fill={A} opacity="0.6" />
          <text x="184" y="330" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">y=.28</text>
          <rect x="230" y="308" width="10" height="6" rx="1" fill={A} opacity="0.4" />
          <text x="235" y="330" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">z=.10</text>

          {/* Arrow between spheres */}
          <line x1="310" y1="178" x2="390" y2="178" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-hyp-arr)" />
          <rect x="322" y="160" width="56" height="20" rx="6" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="0.8" />
          <text x="350" y="174" fill={A} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'\u03A0·p'}</text>
          <text x="350" y="148" fill={GRAY} fontSize="11" textAnchor="middle">Random rotate</text>

          {/* === RIGHT: After rotation === */}
          <text x="575" y="62" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">AFTER ROTATION</text>
          <ellipse cx="575" cy="178" rx="95" ry="95" fill="url(#tq-sph-R)" stroke={GREEN} strokeWidth="1.5" strokeDasharray="4 3" />
          <ellipse cx="575" cy="178" rx="95" ry="28" fill="none" stroke={GREEN} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
          <ellipse cx="575" cy="178" rx="28" ry="95" fill="none" stroke={GREEN} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.3" />

          {/* Axes — further from sphere */}
          <line x1="575" y1="178" x2="690" y2="178" stroke={GRAY} strokeWidth="0.7" strokeDasharray="3 2" />
          <text x="698" y="182" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">x</text>
          <line x1="575" y1="178" x2="575" y2="70" stroke={GRAY} strokeWidth="0.7" strokeDasharray="3 2" />
          <text x="575" y="62" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">y</text>
          <line x1="575" y1="178" x2="515" y2="238" stroke={GRAY} strokeWidth="0.7" strokeDasharray="3 2" />
          <text x="506" y="248" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">z</text>

          {/* Rotated point (spread evenly) */}
          <line x1="575" y1="178" x2="628" y2="110" stroke={GREEN} strokeWidth="2" />
          <circle cx="628" cy="110" r="5" fill={GREEN} />
          <text x="636" y="104" fill={GREEN} fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace">{"p'"}</text>
          <line x1="628" y1="110" x2="628" y2="178" stroke={GREEN} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
          <line x1="628" y1="110" x2="575" y2="110" stroke={GREEN} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />

          {/* Projection bars (uniform) */}
          <text x="508" y="298" fill={GRAY} fontSize="11">Projections:</text>
          <rect x="508" y="304" width="33" height="9" rx="2" fill={GREEN} opacity="0.8" />
          <text x="525" y="330" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">x=.55</text>
          <rect x="570" y="305" width="30" height="8" rx="2" fill={GREEN} opacity="0.8" />
          <text x="585" y="330" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">y=.51</text>
          <rect x="632" y="305" width="28" height="8" rx="2" fill={GREEN} opacity="0.8" />
          <text x="646" y="330" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">z=.47</text>

          {/* Radius preserved */}
          <rect x="316" y="196" width="120" height="30" rx="8" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="1" />
          <text x="376" y="212" fill={PURPLE} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{"||p||=||p'||=1"}</text>
          <text x="376" y="224" fill={GRAY} fontSize="11" textAnchor="middle">length preserved</text>

          {/* KEY INSIGHT box */}
          <rect x="100" y="350" width="600" height="54" rx="10" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1.2" />
          <text x="400" y="368" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle">KEY INSIGHT</text>
          <text x="400" y="390" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">{'On a high-d sphere, all coordinate projections \u2248 Gaussian(0, 1/d) -- the Beta distribution in action'}</text>
        </svg>
      </Diagram>
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

      {/* SVG 4: Beta Distribution → Quantization Levels */}
      <Diagram caption="Beta Distribution to Quantization Levels: density-aware placement puts more levels where data concentrates">
        <svg viewBox="0 0 800 520" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="tq-beta-fill" x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopColor={A} stopOpacity="0.0" />
              <stop offset="50%" stopColor={A} stopOpacity="0.2" />
              <stop offset="100%" stopColor={A} stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <rect width="800" height="520" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="24" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">BETA DISTRIBUTION AND OPTIMAL QUANTIZATION LEVELS</text>
          <text x="400" y="42" fill={GRAY} fontSize="11" textAnchor="middle">Beta(64, 64) for d=128 -- levels placed at equal-probability region centroids</text>

          {/* === MAIN CURVE === */}
          <text x="400" y="62" fill={A} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">Beta(64, 64)</text>

          {/* Bell curve with gradient fill */}
          <path d={`M 80 195
            C 80 195, 120 193, 160 186
            C 200 178, 240 148, 280 112
            C 320 86, 360 74, 400 71
            C 440 74, 480 86, 520 112
            C 560 148, 600 178, 640 186
            C 680 193, 720 195, 720 195
            L 720 195 L 80 195 Z`}
            fill="url(#tq-beta-fill)" stroke={A3} strokeWidth="2.5" />

          {/* Axis */}
          <line x1="80" y1="195" x2="720" y2="195" stroke={GRAY} strokeWidth="1" strokeOpacity="0.5" />
          <text x="80" y="212" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">-1</text>
          <text x="400" y="212" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">0</text>
          <text x="720" y="212" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="end">+1</text>

          {/* 16 quantization thresholds as LABELED vertical lines */}
          {(() => {
            const thresholds = [95, 140, 175, 210, 245, 275, 305, 335, 365, 395, 425, 455, 490, 525, 565, 610, 700];
            const heights = [5, 12, 24, 42, 60, 74, 84, 88, 88, 84, 74, 60, 42, 24, 12, 5, 5];
            return thresholds.map((x, i) => (
              <line key={`th-${i}`} x1={x} y1={195 - Math.max(heights[i] || 3, 3) * 1.4} x2={x} y2={198} stroke={GRAY} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />
            ));
          })()}

          {/* Label: thresholds */}
          <text x="106" y="84" fill={GRAY} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{'<-- SPARSE (wide intervals)'}</text>
          <text x="580" y="84" fill={GRAY} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{'SPARSE (wide intervals) -->'}</text>
          <text x="400" y="68" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">DENSE (narrow intervals)</text>

          {/* === RECONSTRUCTION POINTS ROW === */}
          <text x="400" y="234" fill={FG} fontSize="12" fontWeight="700" textAnchor="middle">16 RECONSTRUCTION POINTS (centroids)</text>

          {(() => {
            const centroids = [118, 158, 193, 228, 260, 290, 320, 350, 380, 410, 440, 473, 508, 545, 588, 655];
            const vals = ['-0.88','-0.75','-0.61','-0.46','-0.31','-0.17','-0.05','0.05','0.14','0.23','0.34','0.46','0.59','0.72','0.86','0.95'];
            const colors = [BLUE, BLUE, PURPLE, PURPLE, A, A, GREEN, GREEN, GREEN, GREEN, A, A, PURPLE, PURPLE, BLUE, BLUE];
            const labelIndices = [0, 3, 7, 11, 15]; // Show labels for points 1, 4, 8, 12, 16 only
            return centroids.map((x, i) => (
              <g key={`rc-${i}`}>
                <circle cx={x} cy={250} r="5" fill={colors[i]} opacity="0.9" />
                {labelIndices.includes(i) && (
                  <text x={x} y={272} fill={colors[i]} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{vals[i]}</text>
                )}
              </g>
            ));
          })()}
          <line x1="80" y1="250" x2="720" y2="250" stroke={GRAY} strokeWidth="0.6" strokeOpacity="0.3" />

          {/* Spacing annotations */}
          <line x1="320" y1="280" x2="380" y2="280" stroke={GREEN} strokeWidth="2" />
          <text x="350" y="294" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">narrow</text>
          <line x1="95" y1="280" x2="158" y2="280" stroke={BLUE} strokeWidth="2" />
          <text x="127" y="294" fill={BLUE} fontSize="11" fontWeight="700" textAnchor="middle">wide</text>

          {/* === ZOOMED INSET: Center vs Tail === */}
          <rect x="50" y="310" width="330" height="110" rx="8" fill={GREEN} fillOpacity="0.05" stroke={GREEN} strokeWidth="1" />
          <text x="215" y="328" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">CENTER (dense region)</text>
          {/* Dense reconstruction points zoomed */}
          {[90, 130, 170, 210, 250, 290, 330].map((x, i) => (
            <g key={`zc-${i}`}>
              <circle cx={x} cy={360} r="6" fill={GREEN} opacity="0.8" />
              <line x1={x} y1={340} x2={x} y2={354} stroke={GREEN} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            </g>
          ))}
          <line x1="70" y1="360" x2="350" y2="360" stroke={GRAY} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="215" y="390" fill={GREEN} fontSize="11" textAnchor="middle">7 levels in center 40% of range</text>
          <text x="215" y="406" fill={GRAY} fontSize="11" textAnchor="middle">Small spacing = small error</text>

          <rect x="420" y="310" width="330" height="110" rx="8" fill={BLUE} fillOpacity="0.05" stroke={BLUE} strokeWidth="1" />
          <text x="585" y="328" fill={BLUE} fontSize="12" fontWeight="700" textAnchor="middle">TAILS (sparse region)</text>
          {/* Sparse reconstruction points zoomed */}
          {[470, 570, 700].map((x, i) => (
            <g key={`zt-${i}`}>
              <circle cx={x} cy={360} r="6" fill={BLUE} opacity="0.8" />
              <line x1={x} y1={340} x2={x} y2={354} stroke={BLUE} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            </g>
          ))}
          <line x1="440" y1="360" x2="720" y2="360" stroke={GRAY} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="585" y="390" fill={BLUE} fontSize="11" textAnchor="middle">3 levels in outer 40% of range</text>
          <text x="585" y="406" fill={GRAY} fontSize="11" textAnchor="middle">Wide spacing = OK (rare data here)</text>

          {/* === KEY INSIGHT BOX === */}
          <rect x="60" y="440" width="680" height="60" rx="10" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="400" y="462" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">WHY UNEVEN SPACING?</text>
          <text x="400" y="484" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">More data in the middle = more quantization levels there = less error where it matters</text>
        </svg>
      </Diagram>

      {/* SVG A: Rotation = Shuffling Information */}
      <Diagram caption="Rotation = Shuffling Information: a random rotation redistributes which coordinate carries which piece of energy, like shuffling a sorted deck of cards">
        <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-shuf-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
          </defs>
          <rect width="800" height="300" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="26" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">Rotation = Shuffling Information Across Coordinates</text>
          <text x="400" y="46" fill={GRAY} fontSize="11" textAnchor="middle">Before: energy clustered (correlated). After: energy spread evenly (independent).</text>

          {/* LEFT: Before — sorted cards */}
          <text x="170" y="72" fill={RED} fontSize="13" fontWeight="700" textAnchor="middle">BEFORE ROTATION</text>
          <text x="170" y="90" fill={GRAY} fontSize="11" textAnchor="middle">Cards sorted by suit (correlated)</text>

          {/* 8 cards — sorted by color group */}
          {[
            { x: 42, label: 'x\u2081', val: '0.82', color: A, h: 60 },
            { x: 82, label: 'x\u2082', val: '0.71', color: A, h: 52 },
            { x: 122, label: 'x\u2083', val: '0.55', color: A2, h: 40 },
            { x: 162, label: 'x\u2084', val: '0.38', color: A2, h: 28 },
            { x: 202, label: 'x\u2085', val: '0.12', color: GRAY, h: 9 },
            { x: 242, label: 'x\u2086', val: '0.04', color: GRAY, h: 3 },
            { x: 282, label: 'x\u2087', val: '0.02', color: GRAY, h: 2 },
            { x: 312, label: 'x\u2088', val: '0.01', color: GRAY, h: 1 },
          ].map((c, i) => (
            <g key={`bcard-${i}`}>
              <rect x={c.x} y={108} width="32" height="70" rx="5" fill={c.color} fillOpacity="0.15" stroke={c.color} strokeWidth="1.2" />
              <text x={c.x + 16} y="128" fill={c.color} fontSize="12" fontWeight="700" textAnchor="middle">{c.label}</text>
              <text x={c.x + 16} y="146" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">{c.val}</text>
              <rect x={c.x + 6} y={178 - c.h} width="20" height={c.h} rx="3" fill={c.color} fillOpacity="0.6" />
            </g>
          ))}

          {/* Bracket: "high energy" group */}
          <line x1="42" y1="186" x2="195" y2="186" stroke={A} strokeWidth="1.5" />
          <text x="118" y="202" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">High energy</text>

          {/* Bracket: "near zero" group */}
          <line x1="202" y1="186" x2="344" y2="186" stroke={GRAY} strokeWidth="1" />
          <text x="273" y="202" fill={GRAY} fontSize="11" textAnchor="middle">Near zero</text>

          {/* Arrow: shuffle */}
          <line x1="358" y1="148" x2="426" y2="148" stroke={A} strokeWidth="2" markerEnd="url(#tq-shuf-arr)" />
          <rect x="362" y="122" width="56" height="22" rx="6" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1" />
          <text x="390" y="137" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle">{'\u03A0 \u00b7'}</text>
          <text x="390" y="168" fill={GRAY} fontSize="11" textAnchor="middle">Shuffle!</text>

          {/* RIGHT: After — randomly mixed cards */}
          <text x="610" y="72" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">AFTER ROTATION</text>
          <text x="610" y="90" fill={GRAY} fontSize="11" textAnchor="middle">Cards randomly mixed (independent)</text>

          {/* 8 cards — shuffled, roughly equal values */}
          {[
            { x: 440, label: 'y\u2081', val: '0.37' },
            { x: 480, label: 'y\u2082', val: '0.34' },
            { x: 520, label: 'y\u2083', val: '0.40' },
            { x: 560, label: 'y\u2084', val: '0.36' },
            { x: 600, label: 'y\u2085', val: '0.33' },
            { x: 640, label: 'y\u2086', val: '0.39' },
            { x: 680, label: 'y\u2087', val: '0.35' },
            { x: 720, label: 'y\u2088', val: '0.38' },
          ].map((c, i) => {
            const h = 24 + (i % 3) * 2;
            return (
            <g key={`acard-${i}`}>
              <rect x={c.x} y={108} width="32" height="70" rx="5" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.2" />
              <text x={c.x + 16} y="128" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">{c.label}</text>
              <text x={c.x + 16} y="146" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">{c.val}</text>
              <rect x={c.x + 6} y={178 - h} width="20" height={h} rx="3" fill={GREEN} fillOpacity="0.6" />
            </g>
            );
          })}

          {/* Bracket: "all ~ equal" */}
          <line x1="440" y1="186" x2="752" y2="186" stroke={GREEN} strokeWidth="1.5" />
          <text x="596" y="202" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">{'All \u2248 equal energy (each \u2248 1/\u221Ad)'}</text>

          {/* Bottom insight */}
          <rect x="80" y="222" width="640" height="26" rx="8" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1" />
          <text x="400" y="240" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">{'\u2016x\u2016 = \u2016\u03A0x\u2016 \u2014 same total energy, just redistributed uniformly'}</text>

          {/* Key takeaway */}
          <rect x="140" y="258" width="520" height="30" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="400" y="278" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">Uniform energy = every coordinate quantizes the same way = EASY</text>
        </svg>
      </Diagram>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03 — ALGORITHM 1: TurboQuant_mse
          ═══════════════════════════════════════════════════════════ */}
      <SectionHeader
        num="03"
        title="Algorithm 1 — TurboQuant_mse"
        subtitle="The simplest version: rotate, quantize each coordinate, done"
      />

      <Diagram caption="TurboQuant Pipeline: from input vector to compressed code and back">
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-arr2" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <marker id="tq-arr2-blue" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={BLUE} />
            </marker>
          </defs>
          <rect width="800" height="400" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="28" fill={A} fontSize="14" fontWeight="700" textAnchor="middle">QUANTIZATION (Encode)</text>

          {/* Step boxes -- encode path — more spacing */}
          {/* Input x */}
          <rect x="15" y="55" width="108" height="55" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="69" y="78" fill={FG} fontSize="13" fontWeight="600" textAnchor="middle">Input x</text>
          <text x="69" y="96" fill={GRAY} fontSize="11" textAnchor="middle">d-dim vector</text>

          {/* Arrow */}
          <line x1="128" y1="82" x2="158" y2="82" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Normalize */}
          <rect x="163" y="55" width="115" height="55" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="220" y="78" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Normalize</text>
          <text x="220" y="96" fill={GRAY} fontSize="11" textAnchor="middle">{'x/||x|| + store ||x||'}</text>

          {/* Arrow */}
          <line x1="283" y1="82" x2="313" y2="82" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Random rotation */}
          <rect x="318" y="55" width="125" height="55" rx="8" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="2" />
          <text x="380" y="78" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle">Random Rotate</text>
          <text x="380" y="96" fill={GRAY} fontSize="11" textAnchor="middle">{'y = Π · (x/||x||)'}</text>

          {/* Arrow */}
          <line x1="448" y1="82" x2="478" y2="82" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Scalar quantize */}
          <rect x="483" y="55" width="130" height="55" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.5" />
          <text x="548" y="78" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Scalar Quantize</text>
          <text x="548" y="96" fill={GRAY} fontSize="11" textAnchor="middle">Lloyd-Max per coord</text>

          {/* Arrow */}
          <line x1="618" y1="82" x2="648" y2="82" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-arr2)" />

          {/* Output code */}
          <rect x="653" y="55" width="130" height="55" rx="8" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="2" />
          <text x="718" y="78" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">b-bit indices</text>
          <text x="718" y="96" fill={GRAY} fontSize="11" textAnchor="middle">{'d indices + ||x|| = b·d+32 bits'}</text>

          {/* DEQUANTIZATION path — shifted down for breathing room */}
          <text x="400" y="165" fill={BLUE} fontSize="14" fontWeight="700" textAnchor="middle">DEQUANTIZATION (Decode)</text>

          {/* Code */}
          <rect x="653" y="185" width="130" height="55" rx="8" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="718" y="208" fill={FG} fontSize="13" fontWeight="600" textAnchor="middle">b-bit indices</text>
          <text x="718" y="226" fill={GRAY} fontSize="11" textAnchor="middle">{'+ stored ||x||'}</text>

          {/* Arrow left */}
          <line x1="648" y1="212" x2="618" y2="212" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Lookup */}
          <rect x="483" y="185" width="130" height="55" rx="8" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="548" y="208" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Lookup r_i</text>
          <text x="548" y="226" fill={GRAY} fontSize="11" textAnchor="middle">Reconstruction points</text>

          <line x1="478" y1="212" x2="448" y2="212" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Inverse rotation */}
          <rect x="318" y="185" width="125" height="55" rx="8" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2" />
          <text x="380" y="208" fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="middle">Inverse Rotate</text>
          <text x="380" y="226" fill={GRAY} fontSize="11" textAnchor="middle">{'Πᵀ · ŷ'}</text>

          <line x1="313" y1="212" x2="283" y2="212" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Rescale */}
          <rect x="163" y="185" width="115" height="55" rx="8" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1.5" />
          <text x="220" y="208" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Rescale</text>
          <text x="220" y="226" fill={GRAY} fontSize="11" textAnchor="middle">{'||x|| · ŷ'}</text>

          <line x1="158" y1="212" x2="128" y2="212" stroke={BLUE} strokeWidth="1.5" markerEnd="url(#tq-arr2-blue)" />

          {/* Output */}
          <rect x="15" y="185" width="108" height="55" rx="8" fill={BLUE} fillOpacity="0.15" stroke={BLUE} strokeWidth="2" />
          <text x="69" y="208" fill="#60a5fa" fontSize="13" fontWeight="700" textAnchor="middle">{'\u0078\u0302'}</text>
          <text x="69" y="226" fill={GRAY} fontSize="11" textAnchor="middle">Reconstructed</text>

          {/* Bottom note */}
          <rect x="80" y="280" width="640" height="60" rx="10" fill={A} fillOpacity="0.06" stroke={A} strokeWidth="1" strokeDasharray="4 3" />
          <text x="400" y="302" fill={FG} fontSize="12" textAnchor="middle">
            Key property: the random rotation matrix Π is shared (seeded), not stored per-vector.
          </text>
          <text x="400" y="324" fill={GRAY} fontSize="11" textAnchor="middle">
            {'Total storage per vector: b · d bits (indices) + 32 bits (norm) = b · d + 32 bits'}
          </text>
        </svg>
      </Diagram>

      {/* SVG 5: TurboQuant_mse Pipeline — Full Flow */}
      <Diagram caption="TurboQuant_mse Full Pipeline: encode path (top) and decode path (bottom) with step numbers">
        <svg viewBox="0 0 800 420" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-pf-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <marker id="tq-pf-arr-b" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={BLUE} />
            </marker>
            <linearGradient id="tq-pf-enc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={A} stopOpacity="0.12" />
              <stop offset="100%" stopColor={A} stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="tq-pf-dec" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor={BLUE} stopOpacity="0.12" />
              <stop offset="100%" stopColor={BLUE} stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect width="800" height="420" rx="12" fill={BG} />

          {/* ENCODE PATH — solid border */}
          <rect x="10" y="10" width="780" height="160" rx="8" fill="url(#tq-pf-enc)" stroke={A} strokeWidth="1.2" />
          <text x="400" y="30" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">ENCODE</text>

          {/* Step 1: Input */}
          <circle cx="48" cy="56" r="10" fill={A} fillOpacity="0.25" stroke={A} strokeWidth="1.2" />
          <text x="48" y="60" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">1</text>
          <rect x="22" y="70" width="52" height="40" rx="6" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1" />
          <text x="48" y="86" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Input</text>
          <text x="48" y="100" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">x (128-d)</text>

          <line x1="78" y1="90" x2="102" y2="90" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-pf-arr)" />

          {/* Step 2: Compute norm */}
          <circle cx="136" cy="56" r="10" fill={A} fillOpacity="0.25" stroke={A} strokeWidth="1.2" />
          <text x="136" y="60" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">2</text>
          <rect x="106" y="70" width="60" height="40" rx="6" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1" />
          <text x="136" y="86" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Norm</text>
          <text x="136" y="100" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'||x||'}</text>

          <line x1="170" y1="90" x2="194" y2="90" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-pf-arr)" />

          {/* Step 3: Normalize */}
          <circle cx="234" cy="56" r="10" fill={A} fillOpacity="0.25" stroke={A} strokeWidth="1.2" />
          <text x="234" y="60" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">3</text>
          <rect x="198" y="70" width="72" height="40" rx="6" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1" />
          <text x="234" y="86" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Normalize</text>
          <text x="234" y="100" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'x/||x||'}</text>

          <line x1="274" y1="90" x2="298" y2="90" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-pf-arr)" />

          {/* Step 4: Random rotate — highlighted */}
          <circle cx="352" cy="56" r="10" fill={A} fillOpacity="0.35" stroke={A3} strokeWidth="1.5" />
          <text x="352" y="60" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">4</text>
          <rect x="302" y="70" width="100" height="40" rx="6" fill={A} fillOpacity="0.2" stroke={A3} strokeWidth="1.5" />
          <text x="352" y="86" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">Random Rotate</text>
          <text x="352" y="100" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'y = Π · (x/||x||)'}</text>

          <line x1="406" y1="90" x2="430" y2="90" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-pf-arr)" />

          {/* Step 5: Scalar quantize */}
          <circle cx="490" cy="56" r="10" fill={A} fillOpacity="0.25" stroke={A} strokeWidth="1.2" />
          <text x="490" y="60" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">5</text>
          <rect x="434" y="70" width="112" height="40" rx="6" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1" />
          <text x="490" y="86" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Scalar Quantize</text>
          <text x="490" y="100" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">Lloyd-Max per y_i</text>

          <line x1="550" y1="90" x2="574" y2="90" stroke={A} strokeWidth="1.2" markerEnd="url(#tq-pf-arr)" />

          {/* Step 6: Store */}
          <circle cx="644" cy="56" r="10" fill={A} fillOpacity="0.25" stroke={A} strokeWidth="1.2" />
          <text x="644" y="60" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">6</text>
          <rect x="578" y="70" width="132" height="40" rx="6" fill={A} fillOpacity="0.18" stroke={A} strokeWidth="1.5" />
          <text x="644" y="86" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">Store Codes</text>
          <text x="644" y="100" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'{||x||, q₁..q_d}'}</text>

          {/* Norm side-branch annotation */}
          <line x1="136" y1="112" x2="136" y2="140" stroke={A2} strokeWidth="1" strokeDasharray="3 2" />
          <line x1="136" y1="140" x2="644" y2="140" stroke={A2} strokeWidth="1" strokeDasharray="3 2" />
          <line x1="644" y1="140" x2="644" y2="112" stroke={A2} strokeWidth="1" strokeDasharray="3 2" />
          <text x="390" y="156" fill={A2} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'||x|| stored as 32-bit float (4 bytes) alongside quantized codes'}</text>

          {/* DECODE PATH — dashed border to distinguish from encode */}
          <rect x="10" y="180" width="780" height="160" rx="8" fill="url(#tq-pf-dec)" stroke={BLUE} strokeWidth="1.2" strokeDasharray="8 4" />
          <text x="400" y="200" fill="#60a5fa" fontSize="14" fontWeight="700" textAnchor="middle">DECODE</text>

          {/* Step A: Load codes */}
          <circle cx="680" cy="224" r="10" fill={BLUE} fillOpacity="0.25" stroke={BLUE} strokeWidth="1.2" />
          <text x="680" y="228" fill="#60a5fa" fontSize="11" fontWeight="700" textAnchor="middle">A</text>
          <rect x="610" y="238" width="140" height="44" rx="6" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1" strokeDasharray="6 3" />
          <text x="680" y="256" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Load Codes</text>
          <text x="680" y="272" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'{||x||, q₁..q_d}'}</text>

          <line x1="606" y1="260" x2="582" y2="260" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-pf-arr-b)" />

          {/* Step B: Dequantize */}
          <circle cx="520" cy="224" r="10" fill={BLUE} fillOpacity="0.25" stroke={BLUE} strokeWidth="1.2" />
          <text x="520" y="228" fill="#60a5fa" fontSize="11" fontWeight="700" textAnchor="middle">B</text>
          <rect x="458" y="238" width="120" height="44" rx="6" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1" strokeDasharray="6 3" />
          <text x="518" y="256" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Dequantize</text>
          <text x="518" y="272" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'q_i → r_i (lookup)'}</text>

          <line x1="454" y1="260" x2="430" y2="260" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-pf-arr-b)" />

          {/* Step C: Inverse rotation — highlighted */}
          <circle cx="362" cy="224" r="10" fill={BLUE} fillOpacity="0.35" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="362" y="228" fill="#60a5fa" fontSize="11" fontWeight="700" textAnchor="middle">C</text>
          <rect x="306" y="238" width="120" height="44" rx="6" fill={BLUE} fillOpacity="0.2" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="366" y="256" fill="#60a5fa" fontSize="11" fontWeight="700" textAnchor="middle">{'Inverse Rotate'}</text>
          <text x="366" y="272" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'Πᵀ · ŷ'}</text>

          <line x1="302" y1="260" x2="278" y2="260" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-pf-arr-b)" />

          {/* Step D: Rescale */}
          <circle cx="212" cy="224" r="10" fill={BLUE} fillOpacity="0.25" stroke={BLUE} strokeWidth="1.2" />
          <text x="212" y="228" fill="#60a5fa" fontSize="11" fontWeight="700" textAnchor="middle">D</text>
          <rect x="154" y="238" width="120" height="44" rx="6" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="1" strokeDasharray="6 3" />
          <text x="214" y="256" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Rescale</text>
          <text x="214" y="272" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'||x|| · Πᵀŷ'}</text>

          <line x1="150" y1="260" x2="126" y2="260" stroke={BLUE} strokeWidth="1.2" markerEnd="url(#tq-pf-arr-b)" />

          {/* Step E: Output */}
          <circle cx="62" cy="224" r="10" fill={BLUE} fillOpacity="0.25" stroke={BLUE} strokeWidth="1.2" />
          <text x="62" y="228" fill="#60a5fa" fontSize="11" fontWeight="700" textAnchor="middle">E</text>
          <rect x="22" y="238" width="80" height="44" rx="6" fill={BLUE} fillOpacity="0.18" stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="62" y="256" fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="middle">{'\u0078\u0302'}</text>
          <text x="62" y="272" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">reconstructed</text>

          {/* Byte annotations along top */}
          <text x="48" y="124" fill={A2} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">512B</text>
          <text x="234" y="124" fill={A2} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">512B</text>
          <text x="352" y="124" fill={A2} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">512B</text>
          <text x="490" y="124" fill={A2} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">64B</text>
          <text x="644" y="124" fill={A2} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">68B</text>

          {/* Bottom summary */}
          <rect x="60" y="370" width="320" height="34" rx="6" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="0.6" />
          <text x="220" y="392" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'Encode: O(d log d) — rotate + d binary searches'}</text>

          <rect x="420" y="370" width="320" height="34" rx="6" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="0.6" />
          <text x="580" y="392" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'Decode: O(d log d) — d lookups + inverse rotate'}</text>
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

      <SimpleExplain>
        <p><strong>The distortion bound in plain English:</strong> The formula says "the error you get from compressing to b bits per number is proportional to α_b/d." Two key insights: (1) More bits = exponentially less error (each extra bit roughly quarters the error). (2) Higher dimensions = LESS error per dimension. This is counterintuitive — you'd think more dimensions means more to compress. But random rotation makes dimensions independent, so errors don't compound. They actually help each other average out.</p>
      </SimpleExplain>

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

      {/* SVG 6: Scalar Quantization Close-up */}
      <Diagram caption="Scalar Quantization Close-up: more bits = more levels = smaller quantization error">
        <svg viewBox="0 0 800 350" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-sq-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
          </defs>
          <rect width="800" height="350" rx="12" fill={BG} />
          <text x="400" y="24" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">SCALAR QUANTIZATION: ONE COORDINATE CLOSE-UP</text>

          {/* === 2-BIT (stacked vertically with more space) === */}
          <text x="400" y="42" fill={BLUE} fontSize="13" fontWeight="700" textAnchor="middle">2-BIT (4 levels)</text>
          <line x1="80" y1="72" x2="720" y2="72" stroke={GRAY} strokeWidth="1.5" />
          <text x="72" y="76" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="end">-1</text>
          <text x="728" y="76" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">+1</text>
          {[80, 240, 400, 560, 720].map((x, i) => (
            <line key={`t2-${i}`} x1={x} y1={62} x2={x} y2={82} stroke={GRAY} strokeWidth="1" strokeDasharray="3 2" />
          ))}
          {[160, 320, 480, 640].map((x, i) => (
            <g key={`r2-${i}`}>
              <circle cx={x} cy={72} r="5" fill={BLUE} opacity="0.8" />
              <text x={x} y={97} fill={BLUE} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">r{i + 1}</text>
            </g>
          ))}
          {/* Original value */}
          <line x1="435" y1="56" x2="435" y2="68" stroke={A3} strokeWidth="2.5" />
          <circle cx="435" cy="53" r="4" fill={A3} />
          <text x="460" y="56" fill={A3} fontSize="11" fontWeight="600" textAnchor="start" fontFamily="'JetBrains Mono', monospace">0.15</text>
          {/* Error bracket — thick and red */}
          <line x1="435" y1="107" x2="480" y2="107" stroke={RED} strokeWidth="2.5" />
          <line x1="435" y1="102" x2="435" y2="112" stroke={RED} strokeWidth="2" />
          <line x1="480" y1="102" x2="480" y2="112" stroke={RED} strokeWidth="2" />
          <text x="458" y="126" fill={RED} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">Error = 0.35</text>

          {/* === 3-BIT === */}
          <text x="400" y="137" fill={PURPLE} fontSize="13" fontWeight="700" textAnchor="middle">3-BIT (8 levels)</text>
          <line x1="80" y1="172" x2="720" y2="172" stroke={GRAY} strokeWidth="1.5" />
          <text x="72" y="176" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="end">-1</text>
          <text x="728" y="176" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">+1</text>
          {Array.from({ length: 9 }, (_, i) => 80 + i * 80).map((x, i) => (
            <line key={`t3-${i}`} x1={x} y1={162} x2={x} y2={182} stroke={GRAY} strokeWidth="1" strokeDasharray="3 2" />
          ))}
          {Array.from({ length: 8 }, (_, i) => 120 + i * 80).map((x, i) => (
            <g key={`r3-${i}`}>
              <circle cx={x} cy={172} r="4.5" fill={PURPLE} opacity="0.8" />
            </g>
          ))}
          {/* Original value */}
          <line x1="435" y1="156" x2="435" y2="168" stroke={A3} strokeWidth="2.5" />
          <circle cx="435" cy="153" r="4" fill={A3} />
          <text x="460" y="156" fill={A3} fontSize="11" fontWeight="600" textAnchor="start" fontFamily="'JetBrains Mono', monospace">0.15</text>
          {/* Error bracket */}
          <line x1="435" y1="195" x2="440" y2="195" stroke={RED} strokeWidth="2.5" />
          <line x1="435" y1="190" x2="435" y2="200" stroke={RED} strokeWidth="2" />
          <line x1="440" y1="190" x2="440" y2="200" stroke={RED} strokeWidth="2" />
          <text x="468" y="200" fill={RED} fontSize="11" fontWeight="700" fontFamily="'JetBrains Mono', monospace">Error = 0.10</text>

          {/* === 4-BIT === */}
          <text x="400" y="222" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">4-BIT (16 levels)</text>
          <line x1="80" y1="252" x2="720" y2="252" stroke={GRAY} strokeWidth="1.5" />
          <text x="72" y="256" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="end">-1</text>
          <text x="728" y="256" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">+1</text>
          {Array.from({ length: 17 }, (_, i) => 80 + i * 40).map((x, i) => (
            <line key={`t4-${i}`} x1={x} y1={244} x2={x} y2={260} stroke={GRAY} strokeWidth="0.8" strokeDasharray="2 2" />
          ))}
          {Array.from({ length: 16 }, (_, i) => 100 + i * 40).map((x, i) => (
            <circle key={`r4-${i}`} cx={x} cy={252} r="3.5" fill={GREEN} opacity="0.75" />
          ))}
          {/* Original value */}
          <line x1="435" y1="236" x2="435" y2="248" stroke={A3} strokeWidth="2.5" />
          <circle cx="435" cy="233" r="4" fill={A3} />
          <text x="460" y="238" fill={A3} fontSize="11" fontWeight="600" textAnchor="start" fontFamily="'JetBrains Mono', monospace">0.15</text>
          {/* Tiny error */}
          <rect x="434" y="265" width="4" height="8" rx="1" fill={RED} fillOpacity="0.6" />
          <text x="468" y="276" fill={RED} fontSize="11" fontWeight="700" fontFamily="'JetBrains Mono', monospace">Error = 0.03</text>

          {/* === Bottom insight === */}
          <rect x="150" y="300" width="500" height="38" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="400" y="320" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">Each extra bit = ~4x less error</text>
          <text x="400" y="336" fill={GRAY} fontSize="11" textAnchor="middle">{'2-bit: 0.35  |  3-bit: 0.10  |  4-bit: 0.03'}</text>
        </svg>
      </Diagram>

      {/* SVG B: Why Beta Distribution? — Visual Proof */}
      <Diagram caption="Why Beta Distribution? The geometric reason: projecting a sphere onto one axis gives a Beta distribution, which approaches Gaussian as dimension grows">
        <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-beta-proof-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <radialGradient id="tq-beta-sph" cx="45%" cy="40%" r="50%">
              <stop offset="0%" stopColor={A} stopOpacity="0.2" />
              <stop offset="100%" stopColor={A} stopOpacity="0.02" />
            </radialGradient>
          </defs>
          <rect width="800" height="380" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="26" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">Why Beta Distribution? A Visual Proof in 4 Steps</text>

          {/* Step 1: Unit vector on sphere */}
          <circle cx="30" cy="72" r="13" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="30" y="77" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">1</text>
          <text x="50" y="77" fill={FG} fontSize="12" fontWeight="600">Start: unit vector on S^(d-1)</text>

          <circle cx="100" cy="162" r="65" fill="url(#tq-beta-sph)" stroke={A} strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="100" y1="162" x2="148" y2="118" stroke={A3} strokeWidth="2.5" markerEnd="url(#tq-beta-proof-arr)" />
          <circle cx="148" cy="118" r="4" fill={A3} />
          <text x="156" y="112" fill={A3} fontSize="12" fontWeight="700">x</text>
          <text x="100" y="244" fill={GRAY} fontSize="11" textAnchor="middle">{'\u2016x\u2016 = 1'}</text>

          {/* Step 2: Random rotation */}
          <circle cx="222" cy="72" r="13" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="222" y="77" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">2</text>
          <text x="242" y="77" fill={FG} fontSize="12" fontWeight="600">Random rotation {'\u03A0'}</text>

          <circle cx="300" cy="162" r="65" fill="url(#tq-beta-sph)" stroke={GREEN} strokeWidth="1.2" strokeDasharray="4 3" />
          {/* Show the rotated vector and its projection onto the vertical axis */}
          <line x1="300" y1="162" x2="338" y2="118" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#tq-beta-proof-arr)" />
          <circle cx="338" cy="118" r="4" fill={GREEN} />
          <text x="346" y="112" fill={GREEN} fontSize="12" fontWeight="700">{'\u03A0x'}</text>

          {/* Vertical axis for projection */}
          <line x1="300" y1="95" x2="300" y2="230" stroke={GRAY} strokeWidth="1" strokeDasharray="3 2" />
          <text x="288" y="90" fill={GRAY} fontSize="11" textAnchor="end">axis i</text>

          {/* Horizontal projection line */}
          <line x1="338" y1="118" x2="300" y2="118" stroke={PURPLE} strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="300" cy="118" r="3.5" fill={PURPLE} />
          <text x="310" y="108" fill={PURPLE} fontSize="11" fontWeight="600">y_i</text>

          <text x="300" y="250" fill={GRAY} fontSize="11" textAnchor="middle">Projection onto one axis</text>

          {/* Step 3: Projection = Beta */}
          <circle cx="420" cy="72" r="12" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="420" y="77" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle">3</text>
          <text x="438" y="77" fill={FG} fontSize="11" fontWeight="600">{'\u2192'} Beta dist.</text>

          {/* U-shaped Beta distribution for low d */}
          <rect x="405" y="102" width="150" height="120" rx="6" fill={A} fillOpacity="0.04" stroke={A} strokeWidth="0.6" />
          <text x="480" y="118" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">d = 4</text>
          {/* U-shaped curve */}
          <path d="M 420 212 C 420 180, 430 165, 445 155 C 455 149, 465 147, 480 150 C 495 147, 505 149, 515 155 C 530 165, 540 180, 540 212" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1.5" />
          <line x1="415" y1="212" x2="545" y2="212" stroke={GRAY} strokeWidth="0.8" />
          <text x="480" y="228" fill={GRAY} fontSize="11" textAnchor="middle">{'y_i\u00B2 ~ Beta(1/2, 3/2)'}</text>
          <text x="480" y="244" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">U-shaped (low d)</text>

          {/* Step 4: High d -> Gaussian */}
          <circle cx="620" cy="72" r="12" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
          <text x="620" y="77" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">4</text>
          <text x="638" y="77" fill={FG} fontSize="11" fontWeight="600">{'\u2192'} Gaussian</text>

          {/* Bell-shaped curve for high d */}
          <rect x="605" y="102" width="160" height="120" rx="6" fill={GREEN} fillOpacity="0.04" stroke={GREEN} strokeWidth="0.6" />
          <text x="685" y="118" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">d = 128</text>
          {/* Bell curve */}
          <path d="M 620 212 C 625 210, 635 208, 645 198 C 655 182, 665 155, 685 140 C 705 155, 715 182, 725 198 C 735 208, 745 210, 750 212" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <line x1="615" y1="212" x2="755" y2="212" stroke={GRAY} strokeWidth="0.8" />
          <text x="685" y="228" fill={GRAY} fontSize="11" textAnchor="middle">{'y_i ~ N(0, 1/d)'}</text>
          <text x="685" y="244" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">Bell curve (high d)</text>

          {/* Convergence arrow between step 3 and step 4 */}
          <line x1="560" y1="170" x2="600" y2="170" stroke={A} strokeWidth="1.5" markerEnd="url(#tq-beta-proof-arr)" />
          <text x="580" y="162" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">d{'\u2192\u221E'}</text>

          {/* Bottom: Geometric intuition */}
          <rect x="60" y="270" width="680" height="46" rx="10" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="1" />
          <text x="400" y="290" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Geometry: projecting a d-sphere onto one axis concentrates mass near zero as d grows</text>
          <text x="400" y="308" fill={GRAY} fontSize="11" textAnchor="middle">This is why TurboQuant can use a FIXED quantizer for ALL inputs after rotation</text>

          {/* The punchline badge */}
          <rect x="180" y="328" width="440" height="38" rx="10" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1.2" />
          <text x="400" y="346" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">Known distribution = known optimal quantizer = no training!</text>
          <text x="400" y="362" fill={GRAY} fontSize="11" textAnchor="middle">{'Beta(d/2, d/2) for d=128 is sharply peaked \u2014 Lloyd-Max exploits this perfectly'}</text>
        </svg>
      </Diagram>

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

      {/* SVG 7: MSE vs Inner Product: The Bias Problem */}
      <Diagram caption="The Bias Problem: MSE-optimal quantization systematically shrinks inner products toward zero">
        <svg viewBox="0 0 800 370" style={{ width: '100%', height: 'auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <defs>
            <marker id="tq-bp-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <marker id="tq-bp-arr-r" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={RED} />
            </marker>
            <linearGradient id="tq-bp-err-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={RED} stopOpacity="0.25" />
              <stop offset="100%" stopColor={RED} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="800" height="370" rx="12" fill={BG} />

          {/* LEFT: Vector angle diagram */}
          <text x="200" y="24" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">TRUE vs QUANTIZED INNER PRODUCT</text>

          {/* Origin point */}
          <circle cx="120" cy="200" r="2.5" fill={GRAY} />

          {/* True vector x */}
          <line x1="120" y1="200" x2="280" y2="100" stroke={A} strokeWidth="2.5" markerEnd="url(#tq-bp-arr)" />
          <text x="290" y="98" fill={A3} fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">x</text>

          {/* True vector y */}
          <line x1="120" y1="200" x2="310" y2="160" stroke={BLUE} strokeWidth="2.5" />
          <circle cx="310" cy="160" r="4" fill={BLUE} />
          <text x="320" y="158" fill={BLUE} fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">y</text>

          {/* Angle arc for true inner product */}
          <path d="M 200 152 A 85 85 0 0 1 222 168" fill="none" stroke={GREEN} strokeWidth="1.8" />
          <text x="218" y="147" fill={GREEN} fontSize="11" fontWeight="600" fontFamily="'JetBrains Mono', monospace">{'⟨x,y⟩'}</text>

          {/* Quantized vector Q(x) - shorter, slightly different angle */}
          <line x1="120" y1="200" x2="252" y2="118" stroke={A} strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.6" />
          <circle cx="252" cy="118" r="3.5" fill={A} fillOpacity="0.5" stroke={A} strokeWidth="1" />
          <text x="260" y="116" fill={A} fontSize="11" opacity="0.7" fontFamily="Inter, system-ui, sans-serif">Q(x)</text>

          {/* Quantized vector Q(y) - shorter */}
          <line x1="120" y1="200" x2="278" y2="170" stroke={BLUE} strokeWidth="1.5" strokeDasharray="5 3" strokeOpacity="0.6" />
          <circle cx="278" cy="170" r="3.5" fill={BLUE} fillOpacity="0.5" stroke={BLUE} strokeWidth="1" />
          <text x="286" y="180" fill={BLUE} fontSize="11" opacity="0.7" fontFamily="Inter, system-ui, sans-serif">Q(y)</text>

          {/* "Shrunk" annotation arrows */}
          <line x1="268" y1="108" x2="256" y2="116" stroke={RED} strokeWidth="1.5" markerEnd="url(#tq-bp-arr-r)" strokeOpacity="0.8" />
          <text x="280" y="108" fill={RED} fontSize="11" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">shrunk</text>

          {/* Label: true IP */}
          <rect x="20" y="230" width="160" height="22" rx="5" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="0.8" />
          <text x="100" y="245" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'True: ⟨x,y⟩ = 0.80'}</text>

          {/* Label: biased IP */}
          <rect x="200" y="230" width="180" height="22" rx="5" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="0.8" />
          <text x="290" y="245" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{'Biased: ⟨Q(x),Q(y)⟩ = 0.68'}</text>

          {/* Divider */}
          <line x1="410" y1="20" x2="410" y2="280" stroke={GRAY} strokeWidth="0.8" strokeDasharray="6 4" strokeOpacity="0.3" />

          {/* RIGHT: Error distribution diagram */}
          <text x="600" y="24" fill={FG} fontSize="13" fontWeight="700" textAnchor="middle">BIAS DISTRIBUTION</text>
          <text x="600" y="42" fill={GRAY} fontSize="11" textAnchor="middle">Inner product estimates across many vector pairs</text>

          {/* Horizontal number line */}
          <line x1="440" y1="180" x2="760" y2="180" stroke={GRAY} strokeWidth="1" />
          <text x="440" y="196" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace">0.0</text>
          <text x="600" y="196" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">0.5</text>
          <text x="760" y="196" fill={GRAY} fontSize="11" fontFamily="'JetBrains Mono', monospace" textAnchor="end">1.0</text>

          {/* True value marker */}
          <line x1="696" y1="60" x2="696" y2="184" stroke={GREEN} strokeWidth="2" />
          <text x="726" y="58" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="start" fontFamily="'JetBrains Mono', monospace">{'true ⟨x,y⟩'}</text>

          {/* Biased distribution - shifted left (bell curve) */}
          <path d={`M 520 180
            C 520 180, 540 178, 560 165
            C 580 148, 600 100, 620 80
            C 630 72, 638 70, 646 72
            C 658 80, 670 108, 686 148
            C 700 165, 720 178, 740 180
            L 740 180 L 520 180 Z`}
            fill="url(#tq-bp-err-grad)" stroke={RED} strokeWidth="1.5" />

          {/* Mean of biased distribution */}
          <line x1="640" y1="66" x2="640" y2="184" stroke={RED} strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="604" y="58" fill={RED} fontSize="11" fontWeight="600" textAnchor="end" fontFamily="'JetBrains Mono', monospace">{'E[⟨Q(x),Q(y)⟩]'}</text>

          {/* Bias bracket */}
          <line x1="640" y1="205" x2="696" y2="205" stroke={RED} strokeWidth="2" />
          <line x1="640" y1="200" x2="640" y2="210" stroke={RED} strokeWidth="1.5" />
          <line x1="696" y1="200" x2="696" y2="210" stroke={RED} strokeWidth="1.5" />
          <text x="668" y="224" fill={RED} fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">BIAS</text>
          <text x="668" y="240" fill={RED} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">systematic underestimate</text>

          {/* Bottom insight */}
          <rect x="430" y="260" width="360" height="40" rx="8" fill={RED} fillOpacity="0.06" stroke={RED} strokeWidth="0.8" />
          <text x="610" y="278" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">MSE-optimal shrinks vectors toward centroids</text>
          <text x="610" y="294" fill={GRAY} fontSize="11" textAnchor="middle">{'⟨Q(x), Q(y)⟩ < ⟨x, y⟩ -- systematically, not randomly'}</text>

          {/* Formula at bottom */}
          <rect x="120" y="316" width="560" height="40" rx="8" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="1.2" />
          <text x="400" y="340" fill={FG} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{`E[\u27E8Q(x),Q(y)\u27E9] = \u03B1\u00B2 \u00B7 \u27E8x,y\u27E9  where \u03B1 < 1 \u2192 systematic shrinkage`}</text>
        </svg>
      </Diagram>

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
        <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
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
          <rect width="800" height="500" rx="12" fill={BG} />

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
          <text x="700" y="224" fill={GRAY} fontSize="11" textAnchor="middle">{'1-bit QJL: sign(S·r)'}</text>

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
          <text x="200" y="410" fill={GRAY} fontSize="11" textAnchor="middle">Best for: reconstruction, perplexity</text>
          <text x="600" y="410" fill={GRAY} fontSize="11" textAnchor="middle">Best for: attention, NN search, ranking</text>

          {/* Shared budget badge */}
          <rect x="200" y="440" width="400" height="30" rx="8" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="0.8" />
          <text x="400" y="460" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Same bit budget (b bits/coord) — different allocation strategy</text>
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
          <svg viewBox="0 0 800 380" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
            <defs>
              <marker id="tq-a4" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
              </marker>
              <marker id="tq-a4b" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                <polygon points="0 0, 10 3.5, 0 7" fill={BLUE} />
              </marker>
            </defs>
            <rect width="800" height="380" rx="12" fill={BG} />

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

            <rect x="348" y="70" width="100" height="35" rx="6" fill={GREEN} fillOpacity="0.25" stroke={GREEN} strokeWidth="2.5" />
            <text x="398" y="92" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">{'sign(S·k)'}</text>
            <text x="398" y="58" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">{'±1 only'}</text>

            <line x1="452" y1="87" x2="480" y2="87" stroke={GREEN} strokeWidth="1.2" markerEnd="url(#tq-a4)" />

            <rect x="484" y="70" width="130" height="35" rx="6" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1" strokeDasharray="3 3" />
            <text x="549" y="86" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">1-bit codes</text>
            <text x="549" y="100" fill={GRAY} fontSize="11" textAnchor="middle">d bits total</text>

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
            <text x="510" y="274" fill={GRAY} fontSize="11" textAnchor="middle">{'Unbiased: E[est] = <q, k> · √(2/πd)'}</text>

            {/* Asymmetric label */}
            <rect x="30" y="240" width="180" height="45" rx="8" fill={PURPLE} fillOpacity="0.08" stroke={PURPLE} strokeWidth="1" />
            <text x="120" y="258" fill={PURPLE} fontSize="11" fontWeight="600" textAnchor="middle">ASYMMETRIC</text>
            <text x="120" y="274" fill={GRAY} fontSize="11" textAnchor="middle">key=1bit, query=full precision</text>

            {/* Bottom insight with breathing room */}
            <rect x="120" y="320" width="560" height="40" rx="8" fill={GREEN} fillOpacity="0.06" stroke={GREEN} strokeWidth="0.8" />
            <text x="400" y="338" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">Continuous signal {'→'} sign() crushes to {'±1'} {'→'} 1 bit per dimension</text>
            <text x="400" y="354" fill={GRAY} fontSize="11" textAnchor="middle">Asymmetric trick: key is 1-bit, query stays full precision</text>
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

      <SimpleExplain>
        <p><strong>Why "unbiased" matters so much:</strong> When AI models decide which words to pay attention to, they compute dot products between vectors. If your compressor consistently underestimates these dot products (biased), the AI makes slightly wrong attention decisions — billions of times per second. These small errors compound into noticeably worse outputs. TurboQuant_prod guarantees zero systematic bias: sometimes it overestimates, sometimes underestimates, but ON AVERAGE it's exactly right. This is like a bathroom scale that's sometimes +2 lbs, sometimes -2 lbs, but averages to your true weight. For AI, this averaging-out property is mathematically provable.</p>
      </SimpleExplain>

      <Callout type="math">
        <strong>The 1/d factor is magic.</strong> The variance of the inner-product estimator
        scales as O(1/d). This means that in high dimensions (d = 128, 256, ...), the estimator
        becomes very concentrated around the true value. High dimensions are usually a curse, but
        here they are a blessing -- more coordinates means more independent random variables, which
        means better averaging. This is the <H tip="Concentration of measure phenomenon = in high dimensions, random variables that are sums/averages of many weakly-dependent terms become very predictable. The standard deviation shrinks as 1/√d relative to the mean. For TurboQuant, this means the inner-product estimate has relative error ≈ 1/√d, vanishing in high dimensions." color={A}>concentration of measure</H> phenomenon at work.
      </Callout>

      {/* SVG 8: QJL Residual Correction — How It Works */}
      <Diagram caption="QJL Residual Correction: the complete TurboQuant_prod pipeline showing how (b-1)-bit MSE quantization combines with 1-bit QJL sketching">
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <defs>
            <marker id="tq-rc-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
            <marker id="tq-rc-arr-g" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GREEN} />
            </marker>
            <marker id="tq-rc-arr-p" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={PURPLE} />
            </marker>
          </defs>
          <rect width="800" height="400" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="22" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">QJL Residual Correction Pipeline</text>
          <text x="400" y="38" fill={GRAY} fontSize="11" textAnchor="middle">How TurboQuant_prod builds an unbiased inner-product estimator</text>

          {/* Step 1: Quantize */}
          <circle cx="42" cy="78" r="14" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="42" y="83" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">1</text>
          <rect x="64" y="58" width="155" height="42" rx="8" fill={A} fillOpacity="0.12" stroke={A} strokeWidth="1.2" />
          <text x="141" y="76" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">MSE Quantize</text>
          <text x="141" y="92" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{"Q(x) = (b-1)-bit"}</text>

          {/* Arrow */}
          <line x1="224" y1="79" x2="256" y2="79" stroke={A} strokeWidth="1.3" markerEnd="url(#tq-rc-arr)" />

          {/* Step 2: Compute residual */}
          <circle cx="272" cy="78" r="14" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
          <text x="272" y="83" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">2</text>
          <rect x="294" y="58" width="175" height="42" rx="8" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1.2" />
          <text x="381" y="76" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">Compute Residual</text>
          <text x="381" y="92" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{"r = x - \u03B1·Q(x)"}</text>

          {/* Arrow */}
          <line x1="474" y1="79" x2="506" y2="79" stroke={GREEN} strokeWidth="1.3" markerEnd="url(#tq-rc-arr-g)" />

          {/* Step 3: QJL Sketch */}
          <circle cx="522" cy="78" r="14" fill={PURPLE} fillOpacity="0.2" stroke={PURPLE} strokeWidth="1.5" />
          <text x="522" y="83" fill={PURPLE} fontSize="13" fontWeight="700" textAnchor="middle">3</text>
          <rect x="544" y="58" width="165" height="42" rx="8" fill={PURPLE} fillOpacity="0.12" stroke={PURPLE} strokeWidth="1.2" />
          <text x="626" y="76" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">QJL Sketch</text>
          <text x="626" y="92" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{"S·sign(\u03A6·r)"}</text>

          {/* Shrinkage factor callout */}
          <rect x="270" y="112" width="200" height="24" rx="6" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="370" y="128" fill={A} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{"\u03B1 = shrinkage factor (debias)"}</text>

          {/* Step 4: Final Estimate — centered below */}
          <circle cx="250" cy="172" r="14" fill={A} fillOpacity="0.25" stroke={A} strokeWidth="1.5" />
          <text x="250" y="177" fill={A3} fontSize="13" fontWeight="700" textAnchor="middle">4</text>
          <text x="280" y="176" fill={FG} fontSize="12" fontWeight="700">Final Estimate</text>

          {/* Two-term formula box */}
          <rect x="80" y="196" width="640" height="56" rx="10" fill={A} fillOpacity="0.06" stroke={A} strokeWidth="1.5" />

          {/* Term 1 */}
          <rect x="100" y="206" width="250" height="36" rx="8" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1" />
          <text x="225" y="222" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{"\u03B1·\u27E8Q(x), Q(y)\u27E9"}</text>
          <text x="225" y="238" fill={GRAY} fontSize="11" textAnchor="middle">MSE quantizer term</text>

          {/* Plus sign */}
          <text x="375" y="228" fill={FG} fontSize="18" fontWeight="700" textAnchor="middle">+</text>

          {/* Term 2 */}
          <rect x="400" y="206" width="300" height="36" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="550" y="222" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{"\u27E8sketch(r_x), sketch(r_y)\u27E9"}</text>
          <text x="550" y="238" fill={GRAY} fontSize="11" textAnchor="middle">QJL residual correction term</text>

          {/* Unbiased result */}
          <rect x="200" y="270" width="400" height="38" rx="10" fill={PURPLE} fillOpacity="0.1" stroke={PURPLE} strokeWidth="1.2" />
          <text x="400" y="286" fill={PURPLE} fontSize="12" fontWeight="700" textAnchor="middle">{"\u2261 Unbiased estimate of \u27E8x, y\u27E9"}</text>
          <text x="400" y="300" fill={GRAY} fontSize="11" textAnchor="middle">Bias from MSE quantization is exactly cancelled by QJL correction</text>

          {/* UNBIASED badge */}
          <rect x="280" y="326" width="240" height="36" rx="10" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1.5" />
          <text x="400" y="346" fill={GREEN} fontSize="16" fontWeight="700" textAnchor="middle">UNBIASED</text>
          <text x="400" y="360" fill={GRAY} fontSize="11" textAnchor="middle">{'E[estimate] = ⟨x, y⟩ exactly'}</text>

          {/* Arrow down from formula to result */}
          <line x1="400" y1="254" x2="400" y2="268" stroke={PURPLE} strokeWidth="1.3" markerEnd="url(#tq-rc-arr-p)" />
        </svg>
      </Diagram>

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

      <SimpleExplain>
        <p><strong>Shannon's bound in human terms:</strong> Claude Shannon proved in 1948 that there's a fundamental speed limit for compression — you literally CANNOT do better than a certain quality at a given compression ratio, no matter how clever your algorithm. TurboQuant gets within 2.7× of this cosmic speed limit. To put this in perspective: most practical quantizers are 10-100× away from Shannon's bound. Being at 2.7× is like running a marathon in 5 hours when the world record is 2 hours — you're in the same ballpark as theoretical perfection.</p>
      </SimpleExplain>

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


      {/* SVG 9: Information-Theoretic Bound — Visual */}
      <Diagram caption="Information-Theoretic Bound: TurboQuant tracks remarkably close to Shannon's theoretical minimum across all bit rates">
        <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <defs>
            <marker id="tq-it-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="6" markerHeight="4" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={GRAY} />
            </marker>
          </defs>
          <rect width="800" height="400" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="24" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">MSE vs Bits Per Dimension (Log Scale)</text>

          {/* Legend */}
          <line x1="220" y1="44" x2="248" y2="44" stroke={A} strokeWidth="2.5" />
          <circle cx="234" cy="44" r="3" fill={A} />
          <text x="254" y="48" fill={FG} fontSize="11">TurboQuant</text>
          <line x1="360" y1="44" x2="388" y2="44" stroke={GREEN} strokeWidth="2" strokeDasharray="5 3" />
          <text x="394" y="48" fill={FG} fontSize="11">Shannon bound</text>
          <line x1="510" y1="44" x2="538" y2="44" stroke={RED} strokeWidth="2" />
          <circle cx="524" cy="44" r="3" fill={RED} />
          <text x="544" y="48" fill={FG} fontSize="11">Naive quantization</text>

          {/* Y-axis */}
          <line x1="100" y1="70" x2="100" y2="270" stroke={GRAY} strokeWidth="1.5" />
          <text x="50" y="170" fill={GRAY} fontSize="11" textAnchor="middle" transform="rotate(-90, 50, 170)">MSE (log scale)</text>
          {/* Y ticks */}
          <text x="90" y="82" fill={GRAY} fontSize="11" textAnchor="end" fontFamily="'JetBrains Mono', monospace">10⁻¹</text>
          <line x1="95" y1="78" x2="105" y2="78" stroke={GRAY} strokeWidth="0.6" />
          <text x="90" y="142" fill={GRAY} fontSize="11" textAnchor="end" fontFamily="'JetBrains Mono', monospace">10⁻²</text>
          <line x1="95" y1="138" x2="105" y2="138" stroke={GRAY} strokeWidth="0.6" />
          <text x="90" y="202" fill={GRAY} fontSize="11" textAnchor="end" fontFamily="'JetBrains Mono', monospace">10⁻³</text>
          <line x1="95" y1="198" x2="105" y2="198" stroke={GRAY} strokeWidth="0.6" />
          <text x="90" y="262" fill={GRAY} fontSize="11" textAnchor="end" fontFamily="'JetBrains Mono', monospace">10⁻⁴</text>
          <line x1="95" y1="258" x2="105" y2="258" stroke={GRAY} strokeWidth="0.6" />

          {/* X-axis */}
          <line x1="100" y1="270" x2="720" y2="270" stroke={GRAY} strokeWidth="1.5" />
          <text x="410" y="298" fill={GRAY} fontSize="11" textAnchor="middle">Bits per dimension</text>
          {/* X ticks */}
          {[1,2,3,4,5].map((b, i) => (
            <g key={i}>
              <line x1={100 + (i + 1) * 120} y1="265" x2={100 + (i + 1) * 120} y2="275" stroke={GRAY} strokeWidth="0.6" />
              <text x={100 + (i + 1) * 120} y="288" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">{b}</text>
            </g>
          ))}

          {/* Grid lines */}
          {[78, 138, 198, 258].map((y, i) => (
            <line key={i} x1="105" y1={y} x2="720" y2={y} stroke={GRAY} strokeWidth="0.3" strokeDasharray="3 4" opacity="0.4" />
          ))}

          {/* Naive quantization line (RED) — much worse, flatter decay */}
          <polyline points="220,78 340,110 460,148 580,186 700,218" fill="none" stroke={RED} strokeWidth="2" />
          {[{x:220,y:78},{x:340,y:110},{x:460,y:148},{x:580,y:186},{x:700,y:218}].map((p,i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={RED} />
          ))}

          {/* TurboQuant line (AMBER) — close to bound */}
          <polyline points="220,88 340,138 460,196 580,240 700,258" fill="none" stroke={A} strokeWidth="2.5" />
          {[{x:220,y:88},{x:340,y:138},{x:460,y:196},{x:580,y:240},{x:700,y:258}].map((p,i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill={A} />
          ))}

          {/* Shannon bound line (GREEN dashed) — theoretical minimum */}
          <polyline points="220,98 340,152 460,210 580,252 700,268" fill="none" stroke={GREEN} strokeWidth="2" strokeDasharray="6 3" />

          {/* Gap annotation at b=2 */}
          <line x1="342" y1="138" x2="342" y2="152" stroke={RED} strokeWidth="1" strokeDasharray="2 2" />
          <rect x="345" y="135" width="64" height="22" rx="6" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.2" />
          <text x="377" y="151" fill={RED} fontSize="13" fontWeight="700" textAnchor="middle">{"≤2.7×"}</text>
          {/* Arrow bracket */}
          <line x1="342" y1="140" x2="342" y2="154" stroke={RED} strokeWidth="1.5" />

          {/* Gap annotation showing naive is much worse */}
          <line x1="462" y1="148" x2="462" y2="196" stroke={GRAY} strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="478" y="176" fill={GRAY} fontSize="11" fontWeight="600">{"~10× worse"}</text>

          {/* Bottom insight */}
          <rect x="120" y="330" width="560" height="40" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="0.8" />
          <text x="400" y="350" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">TurboQuant stays within 2.7× of Shannon bound at every bit rate</text>
          <text x="400" y="366" fill={GRAY} fontSize="11" textAnchor="middle">No practical quantizer can beat the Shannon bound</text>
        </svg>
      </Diagram>
      <Diagram caption={<><strong>Shannon Bound Gap</strong> — TurboQuant distortion vs the information-theoretic minimum at each bit rate</>}>
        <svg viewBox="0 0 800 480" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
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
          <rect width="800" height="480" rx="12" fill="#0a0f1a" />

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
          <text x="60" y="155" fill={GRAY} fontSize="11" textAnchor="middle">32× compress</text>
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
          <text x="60" y="220" fill={GRAY} fontSize="11" textAnchor="middle">16× compress</text>
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
          <text x="60" y="285" fill={GRAY} fontSize="11" textAnchor="middle">10.7× compress</text>
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
          <text x="60" y="350" fill={GRAY} fontSize="11" textAnchor="middle">8× compress</text>
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
          <rect x="100" y="400" width="600" height="50" rx="10" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1.2" />
          <text x="400" y="420" fill={FG} fontSize="14" fontWeight="600" textAnchor="middle">
            Worst-case gap ≤ 2.7× — constant across all bit rates and dimensions
          </text>
          <text x="400" y="440" fill={GRAY} fontSize="11" textAnchor="middle">
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

      {/* SVG 11: KV Cache Compression — Real-World Impact */}
      <Diagram caption="KV Cache Compression Impact: how TurboQuant at 4 bits transforms GPU memory economics for LLM serving">
        <svg viewBox="0 0 800 350" style={{ width: '100%', height: 'auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <defs>
            <linearGradient id="tq-kv-red" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={RED} stopOpacity="0.7" />
              <stop offset="100%" stopColor={RED} stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="tq-kv-green" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={GREEN} stopOpacity="0.7" />
              <stop offset="100%" stopColor={GREEN} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="800" height="350" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="22" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">KV Cache: Before vs After TurboQuant</text>
          <text x="400" y="38" fill={GRAY} fontSize="11" textAnchor="middle">H100 GPU (80 GB) serving Llama-3-70B at 128K context</text>

          {/* === LEFT: Before === */}
          <rect x="100" y="46" width="200" height="24" rx="6" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="1" />
          <text x="200" y="63" fill={RED} fontSize="14" fontWeight="700" textAnchor="middle">BEFORE (FP16)</text>

          {/* GPU memory bar — full */}
          <rect x="60" y="86" width="280" height="50" rx="8" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1" />
          <text x="200" y="82" fill={GRAY} fontSize="11" textAnchor="middle">H100 — 80 GB Total</text>

          {/* KV cache portion = 39 GB out of 80 */}
          <rect x="62" y="88" width={39/80 * 276} height="46" rx="6" fill="url(#tq-kv-red)" />
          <text x={62 + 39/80 * 276 / 2} y="110" fill={FG} fontSize="13" fontWeight="700" textAnchor="middle">KV Cache</text>
          <text x={62 + 39/80 * 276 / 2} y="126" fill={FG} fontSize="11" textAnchor="middle" opacity="0.8">39 GB</text>

          {/* Model weights portion */}
          <rect x={62 + 39/80 * 276 + 2} y="88" width={35/80 * 276} height="46" rx="6" fill={BLUE} fillOpacity="0.3" />
          <text x={62 + 39/80 * 276 + 2 + 35/80 * 276 / 2} y="116" fill={BLUE} fontSize="11" textAnchor="middle">Weights 35GB</text>

          {/* Single user icon */}
          <rect x="140" y="140" width="120" height="30" rx="8" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="1" />
          <text x="200" y="160" fill={RED} fontSize="14" fontWeight="700" textAnchor="middle">1 user max</text>

          {/* Latency */}
          <rect x="140" y="180" width="120" height="24" rx="6" fill={GRAY} fillOpacity="0.08" stroke={GRAY} strokeWidth="0.8" />
          <text x="200" y="196" fill={GRAY} fontSize="11" textAnchor="middle">High latency</text>

          {/* Divider */}
          <line x1="400" y1="55" x2="400" y2="220" stroke={GRAY} strokeWidth="1" strokeDasharray="5 4" />

          {/* === RIGHT: After === */}
          <rect x="500" y="46" width="200" height="24" rx="6" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="1" />
          <text x="600" y="63" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">AFTER (TQ 4-bit)</text>

          {/* GPU memory bar */}
          <rect x="460" y="86" width="280" height="50" rx="8" fill={GRAY} fillOpacity="0.1" stroke={GRAY} strokeWidth="1" />
          <text x="600" y="82" fill={GRAY} fontSize="11" textAnchor="middle">H100 — 80 GB Total</text>

          {/* Compressed KV cache = ~10 GB */}
          <rect x="462" y="88" width={10/80 * 276} height="46" rx="6" fill="url(#tq-kv-green)" />
          <text x={462 + 10/80 * 276 / 2} y="116" fill={FG} fontSize="11" fontWeight="700" textAnchor="middle">10GB</text>

          {/* Model weights */}
          <rect x={462 + 10/80 * 276 + 2} y="88" width={35/80 * 276} height="46" rx="6" fill={BLUE} fillOpacity="0.3" />
          <text x={462 + 10/80 * 276 + 2 + 35/80 * 276 / 2} y="116" fill={BLUE} fontSize="11" textAnchor="middle">Weights 35GB</text>

          {/* Free space */}
          <rect x={462 + 10/80 * 276 + 35/80 * 276 + 4} y="88" width={34/80 * 276} height="46" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="0.8" strokeDasharray="3 3" />
          <text x={462 + 10/80 * 276 + 35/80 * 276 + 4 + 34/80 * 276 / 2} y="116" fill={GREEN} fontSize="11" textAnchor="middle">Free 35GB</text>

          {/* 4 users */}
          <rect x="500" y="140" width="200" height="30" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.2" />
          <text x="600" y="160" fill={GREEN} fontSize="14" fontWeight="700" textAnchor="middle">4 users simultaneously</text>

          {/* Latency improvement */}
          <rect x="530" y="180" width="140" height="24" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="0.8" />
          <text x="600" y="196" fill={GREEN} fontSize="11" textAnchor="middle">Lower latency</text>

          {/* Bottom summary */}
          <rect x="100" y="230" width="600" height="40" rx="10" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="1" />
          <text x="400" y="258" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">{"4× memory reduction → 4× more concurrent users"}</text>

          {/* Perplexity badge */}
          <rect x="210" y="278" width="380" height="30" rx="8" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="1" />
          <text x="400" y="298" fill={GREEN} fontSize="13" fontWeight="700" textAnchor="middle">{"Perplexity: 2.86 → 2.88 (virtually lossless)"}</text>
        </svg>
      </Diagram>


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

      {/* SVG 12: Nearest Neighbor Search — Quality Comparison */}
      <Diagram caption="Recall@10 comparison at 4 bits per dimension: TurboQuant variants consistently outperform traditional quantization methods">
        <svg viewBox="0 0 800 350" style={{ width: '100%', height: 'auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <rect width="800" height="350" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="22" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">Recall@10 at 4 Bits — GloVe-100 Benchmark</text>
          <text x="400" y="38" fill={GRAY} fontSize="11" textAnchor="middle">Higher is better. All methods use 4 bits per dimension.</text>

          {/* Y-axis guide lines */}
          {[80, 85, 90, 95].map((v, i) => (
            <g key={i}>
              <line x1="120" y1={240 - (v - 78) * 10} x2="700" y2={240 - (v - 78) * 10} stroke={GRAY} strokeWidth="0.3" strokeDasharray="3 4" opacity="0.4" />
              <text x="112" y={244 - (v - 78) * 10} fill={GRAY} fontSize="11" textAnchor="end" fontFamily="'JetBrains Mono', monospace">{v}%</text>
            </g>
          ))}

          {/* Baseline */}
          <line x1="120" y1="240" x2="700" y2="240" stroke={GRAY} strokeWidth="0.5" />

          {/* Bar 1: PQ */}
          <rect x="155" y={240 - (82 - 78) * 10} width="100" height={(82 - 78) * 10} rx="6" fill={GRAY} fillOpacity="0.4" stroke={GRAY} strokeWidth="1" />
          <text x="205" y={240 - (82 - 78) * 10 - 8} fill={GRAY} fontSize="15" fontWeight="700" textAnchor="middle">82%</text>
          <text x="205" y="258" fill={FG} fontSize="11" textAnchor="middle">PQ</text>
          <text x="205" y="271" fill={GRAY} fontSize="11" textAnchor="middle">Learned codebook</text>

          {/* Bar 2: OPQ */}
          <rect x="285" y={240 - (87 - 78) * 10} width="100" height={(87 - 78) * 10} rx="6" fill={GRAY} fillOpacity="0.5" stroke={GRAY} strokeWidth="1" />
          <text x="335" y={240 - (87 - 78) * 10 - 8} fill={GRAY} fontSize="15" fontWeight="700" textAnchor="middle">87%</text>
          <text x="335" y="258" fill={FG} fontSize="11" textAnchor="middle">OPQ</text>
          <text x="335" y="271" fill={GRAY} fontSize="11" textAnchor="middle">+ learned rotation</text>

          {/* Bar 3: TurboQuant_mse */}
          <rect x="415" y={240 - (91 - 78) * 10} width="100" height={(91 - 78) * 10} rx="6" fill={A} fillOpacity="0.6" stroke={A} strokeWidth="2" />
          <text x="465" y={240 - (91 - 78) * 10 - 8} fill={A3} fontSize="15" fontWeight="700" textAnchor="middle">91%</text>
          <text x="465" y="258" fill={A3} fontSize="11" fontWeight="600" textAnchor="middle">TQ_mse</text>
          <text x="465" y="271" fill={GRAY} fontSize="11" textAnchor="middle">Random rotation</text>

          {/* Bar 4: TurboQuant_prod */}
          <rect x="545" y={240 - (94 - 78) * 10} width="100" height={(94 - 78) * 10} rx="6" fill={A} fillOpacity="0.8" stroke={A} strokeWidth="1.5" />
          <text x="595" y={240 - (94 - 78) * 10 - 8} fill={A3} fontSize="16" fontWeight="700" textAnchor="middle">94%</text>
          <text x="595" y="258" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">TQ_prod</text>
          <text x="595" y="271" fill={GRAY} fontSize="11" textAnchor="middle">+ QJL correction</text>

          {/* Star on winner */}
          <text x="595" y={240 - (94 - 78) * 10 - 22} fill={A3} fontSize="14" textAnchor="middle">{'\u2605'}</text>

          {/* Gap annotation — floating above all bars */}
          <line x1="205" y1={240 - (94 - 78) * 10 - 28} x2="595" y2={240 - (94 - 78) * 10 - 28} stroke={GREEN} strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="205" y1={240 - (82 - 78) * 10} x2="205" y2={240 - (94 - 78) * 10 - 28} stroke={GREEN} strokeWidth="0.8" strokeDasharray="3 2" />
          <line x1="595" y1={240 - (94 - 78) * 10} x2="595" y2={240 - (94 - 78) * 10 - 28} stroke={GREEN} strokeWidth="0.8" strokeDasharray="3 2" />
          <rect x="360" y={240 - (94 - 78) * 10 - 38} width="70" height="18" rx="4" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="0.8" />
          <text x="395" y={240 - (94 - 78) * 10 - 24} fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">+12% gap</text>

          {/* Bottom metric */}
          <rect x="140" y="290" width="520" height="36" rx="8" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="0.8" />
          <text x="400" y="308" fill={FG} fontSize="12" fontWeight="600" textAnchor="middle">TurboQuant_prod: 94% Recall@10 with ZERO training (no codebook needed)</text>
          <text x="400" y="322" fill={GRAY} fontSize="11" textAnchor="middle">PQ requires offline k-means training on representative data</text>
        </svg>
      </Diagram>


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
        <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto', fontFamily: 'system-ui, sans-serif' }}>
          <rect width="800" height="500" rx="12" fill="#0a0f1a" />

          {/* Title */}
          <text x="400" y="30" fill={A} fontSize="15" fontWeight="700" textAnchor="middle">
            KV CACHE MEMORY: Llama-3-70B @ 128K Context
          </text>
          <text x="400" y="48" fill={GRAY} fontSize="11" textAnchor="middle">
            Per-user GPU memory for Key-Value cache across quantization levels
          </text>

          {/* Model info box */}
          <rect x="30" y="62" width="740" height="30" rx="6" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="0.8" />
          <text x="400" y="82" fill={GRAY} fontSize="11" textAnchor="middle">
            80 layers × 8 KV heads × 128 head_dim × 128K tokens × 2 (K+V) = ~20.97B elements per user
          </text>

          {/* Bar chart */}
          {/* 32-bit (FP32) */}
          <text x="130" y="128" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">FP32 (32-bit)</text>
          <text x="130" y="143" fill={GRAY} fontSize="11" textAnchor="end">Full precision</text>
          <rect x="145" y="116" width="560" height="32" rx="6" fill={RED} fillOpacity="0.6" />
          <text x="715" y="137" fill={FG} fontSize="13" fontWeight="700" textAnchor="start">78.0 GB</text>

          {/* 16-bit (FP16/BF16) - typical baseline */}
          <text x="130" y="178" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">FP16 (16-bit)</text>
          <text x="130" y="193" fill={GRAY} fontSize="11" textAnchor="end">Standard inference</text>
          <rect x="145" y="166" width="280" height="32" rx="6" fill="#f97316" fillOpacity="0.6" />
          <text x="435" y="187" fill={FG} fontSize="13" fontWeight="700" textAnchor="start">39.0 GB</text>

          {/* TurboQuant 4-bit */}
          <text x="130" y="228" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">TQ 4-bit</text>
          <text x="130" y="243" fill={GRAY} fontSize="11" textAnchor="end">PPL: 2.88 (↑0.02)</text>
          <rect x="145" y="216" width="70" height="32" rx="6" fill={A} fillOpacity="0.7" />
          <text x="225" y="237" fill={A3} fontSize="13" fontWeight="700" textAnchor="start">9.75 GB</text>
          {/* Savings badge */}
          <rect x="310" y="221" width="60" height="22" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="340" y="236" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">4× ↓</text>

          {/* TurboQuant 3-bit */}
          <text x="130" y="278" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">TQ 3-bit</text>
          <text x="130" y="293" fill={GRAY} fontSize="11" textAnchor="end">PPL: 2.94 (↑0.08)</text>
          <rect x="145" y="266" width="53" height="32" rx="6" fill={A} fillOpacity="0.8" />
          <text x="208" y="287" fill={A3} fontSize="13" fontWeight="700" textAnchor="start">7.3 GB</text>
          {/* Savings badge */}
          <rect x="280" y="271" width="68" height="22" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="314" y="286" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">5.3× ↓</text>

          {/* TurboQuant 2-bit */}
          <text x="130" y="328" fill={FG} fontSize="13" fontWeight="600" textAnchor="end">TQ 2-bit</text>
          <text x="130" y="343" fill={GRAY} fontSize="11" textAnchor="end">NIAH: 0.91</text>
          <rect x="145" y="316" width="35" height="32" rx="6" fill={A2} fillOpacity="0.8" />
          <text x="190" y="337" fill={A3} fontSize="13" fontWeight="700" textAnchor="start">4.9 GB</text>
          {/* Savings badge */}
          <rect x="255" y="321" width="60" height="22" rx="6" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1" />
          <text x="285" y="336" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">8× ↓</text>

          {/* GPU capacity line */}
          <line x1="717" y1="110" x2="717" y2="355" stroke={RED} strokeWidth="1.5" strokeDasharray="6 4" />
          <text x="717" y="365" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle">H100</text>
          <text x="717" y="377" fill={RED} fontSize="11" textAnchor="middle">80 GB</text>

          {/* A100 capacity line */}
          <line x1={145 + (40 / 78) * 560} y1="110" x2={145 + (40 / 78) * 560} y2="355" stroke="#f97316" strokeWidth="1.5" strokeDasharray="6 4" />
          <text x={145 + (40 / 78) * 560} y="365" fill="#f97316" fontSize="11" fontWeight="600" textAnchor="middle">A100</text>
          <text x={145 + (40 / 78) * 560} y="377" fill="#f97316" fontSize="11" textAnchor="middle">40 GB</text>

          {/* Insight boxes */}
          <rect x="40" y="392" width="350" height="38" rx="8" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="1" />
          <text x="215" y="408" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">
            At 3-bit: fits on a single A100 (40 GB)
          </text>
          <text x="215" y="422" fill={GRAY} fontSize="11" textAnchor="middle">
            FP16 requires 2× A100s or 1× H100 just for KV cache
          </text>

          <rect x="410" y="392" width="360" height="38" rx="8" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="1" />
          <text x="590" y="408" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">
            At 4-bit: serve 4× more concurrent users
          </text>
          <text x="590" y="422" fill={GRAY} fontSize="11" textAnchor="middle">
            Or extend context to 512K on the same hardware
          </text>
        </svg>
      </Diagram>

      <SimpleExplain>
        <p><strong>What this means for real AI systems:</strong> A model like Llama-3-70B serving long conversations needs 78 GB of memory just for its "attention cache" — that's an entire high-end GPU's worth. TurboQuant at 4 bits shrinks this to 9.75 GB — small enough to fit alongside the model weights on a single GPU. This is the difference between needing 4 expensive GPUs and needing 1. At $30,000 per GPU, that's a $90,000 saving per server. Multiply by thousands of servers, and you understand why Google published this paper.</p>
      </SimpleExplain>

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


      {/* SVG 13: End-to-End: From Raw Vector to Compact Code */}
      <Diagram caption="The complete TurboQuant pipeline: from a 512-byte float32 vector to a 68-byte compact code in five steps">
        <svg viewBox="0 0 800 320" style={{ width: '100%', height: 'auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <defs>
            <marker id="tq-e2e-arr" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
              <polygon points="0 0, 10 3.5, 0 7" fill={A} />
            </marker>
          </defs>
          <rect width="800" height="320" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="20" fill={FG} fontSize="13" fontWeight="700" textAnchor="middle">End-to-End: Raw Vector → Compact Code</text>

          {/* Step 1: Raw vector */}
          <circle cx="32" cy="70" r="12" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="1.5" />
          <text x="32" y="75" fill={RED} fontSize="11" fontWeight="700" textAnchor="middle">1</text>
          <rect x="14" y="88" width="96" height="52" rx="8" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="1" />
          <text x="62" y="106" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Raw Vector</text>
          <text x="62" y="120" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">128-d float32</text>
          <text x="62" y="134" fill={RED} fontSize="11" fontWeight="700" textAnchor="middle">512 bytes</text>

          {/* Arrow */}
          <line x1="114" y1="114" x2="136" y2="114" stroke={A} strokeWidth="1.3" markerEnd="url(#tq-e2e-arr)" />

          {/* Step 2: Extract norm */}
          <circle cx="155" cy="70" r="12" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.5" />
          <text x="155" y="75" fill={BLUE} fontSize="11" fontWeight="700" textAnchor="middle">2</text>
          <rect x="137" y="88" width="96" height="52" rx="8" fill={BLUE} fillOpacity="0.1" stroke={BLUE} strokeWidth="1" />
          <text x="185" y="106" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Extract Norm</text>
          <text x="185" y="120" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">store ||x||</text>
          <text x="185" y="134" fill={BLUE} fontSize="11" fontWeight="700" textAnchor="middle">4 bytes</text>

          {/* Arrow */}
          <line x1="237" y1="114" x2="259" y2="114" stroke={A} strokeWidth="1.3" markerEnd="url(#tq-e2e-arr)" />

          {/* Step 3: Random Hadamard */}
          <circle cx="278" cy="70" r="12" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="278" y="75" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">3</text>
          <rect x="260" y="88" width="115" height="52" rx="8" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1.5" />
          <text x="317" y="106" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">Hadamard Rotate</text>
          <text x="317" y="120" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">O(d log d)</text>
          <text x="317" y="134" fill={GRAY} fontSize="11" textAnchor="middle">spreads energy</text>

          {/* Arrow */}
          <line x1="379" y1="114" x2="401" y2="114" stroke={A} strokeWidth="1.3" markerEnd="url(#tq-e2e-arr)" />

          {/* Step 4: Lloyd-Max quantize */}
          <circle cx="420" cy="70" r="12" fill={A} fillOpacity="0.2" stroke={A} strokeWidth="1.5" />
          <text x="420" y="75" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">4</text>
          <rect x="402" y="88" width="130" height="52" rx="8" fill={A} fillOpacity="0.15" stroke={A} strokeWidth="1.5" />
          <text x="467" y="106" fill={A3} fontSize="11" fontWeight="700" textAnchor="middle">Beta-Optimal Quant</text>
          <text x="467" y="120" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">4-bit Lloyd-Max</text>
          <text x="467" y="134" fill={GRAY} fontSize="11" textAnchor="middle">per coordinate</text>

          {/* Arrow */}
          <line x1="536" y1="114" x2="558" y2="114" stroke={A} strokeWidth="1.3" markerEnd="url(#tq-e2e-arr)" />

          {/* Step 5: Output */}
          <circle cx="577" cy="70" r="12" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="1.5" />
          <text x="577" y="75" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">5</text>
          <rect x="559" y="88" width="110" height="52" rx="8" fill={GREEN} fillOpacity="0.15" stroke={GREEN} strokeWidth="1.5" />
          <text x="614" y="106" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">Compact Code</text>
          <text x="614" y="120" fill={GRAY} fontSize="11" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">128×4 = 512 bits</text>
          <text x="614" y="134" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">64 + 4 = 68 bytes</text>

          {/* Final result box */}
          <rect x="686" y="78" width="104" height="70" rx="10" fill={A} fillOpacity="0.15" stroke={A3} strokeWidth="2" />
          <text x="737" y="102" fill={A3} fontSize="22" fontWeight="700" textAnchor="middle">{"7.5×"}</text>
          <text x="737" y="118" fill={FG} fontSize="11" textAnchor="middle">compression</text>
          <text x="737" y="134" fill={GRAY} fontSize="11" textAnchor="middle">512B → 68B</text>

          {/* Bottom: Size flow */}
          <rect x="40" y="165" width="720" height="32" rx="8" fill={A} fillOpacity="0.06" stroke={A} strokeWidth="0.8" />
          <text x="62" y="186" fill={RED} fontSize="11" fontWeight="700">512B</text>
          <text x="100" y="186" fill={GRAY} fontSize="11">→</text>
          <text x="120" y="186" fill={FG} fontSize="11">normalize</text>
          <text x="185" y="186" fill={GRAY} fontSize="11">→</text>
          <text x="210" y="186" fill={FG} fontSize="11">rotate (free)</text>
          <text x="300" y="186" fill={GRAY} fontSize="11">→</text>
          <text x="330" y="186" fill={FG} fontSize="11">quantize each coord to 4 bits</text>
          <text x="540" y="186" fill={GRAY} fontSize="11">→</text>
          <text x="570" y="186" fill={A3} fontSize="11" fontWeight="700">64B indices</text>
          <text x="640" y="186" fill={GRAY} fontSize="11">+</text>
          <text x="660" y="186" fill={BLUE} fontSize="11" fontWeight="700">4B norm</text>
          <text x="710" y="186" fill={GRAY} fontSize="11">=</text>
          <text x="738" y="186" fill={GREEN} fontSize="12" fontWeight="700">68B</text>

          {/* Properties row */}
          <rect x="100" y="208" width="140" height="22" rx="6" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="0.6" />
          <text x="170" y="223" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">Zero training</text>
          <rect x="260" y="208" width="140" height="22" rx="6" fill={BLUE} fillOpacity="0.08" stroke={BLUE} strokeWidth="0.6" />
          <text x="330" y="223" fill={BLUE} fontSize="11" fontWeight="600" textAnchor="middle">O(d log d) per vec</text>
          <rect x="420" y="208" width="165" height="22" rx="6" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="0.6" />
          <text x="502" y="223" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">{'≤2.7× Shannon bound'}</text>
          <rect x="605" y="208" width="140" height="22" rx="6" fill={PURPLE} fillOpacity="0.08" stroke={PURPLE} strokeWidth="0.6" />
          <text x="675" y="223" fill={PURPLE} fontSize="11" fontWeight="600" textAnchor="middle">Streaming/online</text>
        </svg>
      </Diagram>

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

      {/* SVG 14: TurboQuant vs The World */}
      <Diagram caption="TurboQuant vs The World: a final comparison of four quantization paradigms across accuracy, speed, and training requirements">
        <svg viewBox="0 0 800 450" style={{ width: '100%', height: 'auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
          <rect width="800" height="450" rx="12" fill={BG} />

          {/* Title */}
          <text x="400" y="22" fill={FG} fontSize="14" fontWeight="700" textAnchor="middle">TurboQuant vs The World</text>
          <text x="400" y="38" fill={GRAY} fontSize="11" textAnchor="middle">Four quantization paradigms compared across key dimensions</text>

          {/* Column 1: Naive Scalar */}
          <rect x="20" y="52" width="175" height="280" rx="10" fill={RED} fillOpacity="0.06" stroke={RED} strokeWidth="1" />
          <text x="107" y="72" fill={RED} fontSize="12" fontWeight="700" textAnchor="middle">Naive Scalar</text>
          <text x="107" y="86" fill={GRAY} fontSize="11" textAnchor="middle">No rotation, direct quant</text>

          <text x="107" y="112" fill={GRAY} fontSize="11" textAnchor="middle">Rotation</text>
          <text x="107" y="126" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle">None</text>
          <text x="107" y="148" fill={GRAY} fontSize="11" textAnchor="middle">MSE</text>
          <text x="107" y="162" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle">High (data-dep.)</text>
          <text x="107" y="184" fill={GRAY} fontSize="11" textAnchor="middle">Training</text>
          <text x="107" y="198" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">None</text>
          <text x="107" y="220" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>
          <text x="107" y="234" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">Fast</text>

          {/* Stars */}
          <text x="107" y="262" fill={RED} fontSize="14" textAnchor="middle">{'\u2605\u2606\u2606\u2606\u2606'}</text>
          <text x="107" y="280" fill={GRAY} fontSize="11" textAnchor="middle">Accuracy</text>
          <text x="107" y="296" fill={GREEN} fontSize="14" textAnchor="middle">{'\u2605\u2605\u2605\u2605\u2606'}</text>

          {/* Column 2: Product Quantization */}
          <rect x="205" y="52" width="175" height="280" rx="10" fill={GRAY} fillOpacity="0.06" stroke={GRAY} strokeWidth="1" />
          <text x="292" y="72" fill={FG} fontSize="12" fontWeight="700" textAnchor="middle">Product Quant (PQ)</text>
          <text x="292" y="86" fill={GRAY} fontSize="11" textAnchor="middle">Learned codebooks</text>

          <text x="292" y="112" fill={GRAY} fontSize="11" textAnchor="middle">Rotation</text>
          <text x="292" y="126" fill={FG} fontSize="11" fontWeight="600" textAnchor="middle">Learned (OPQ)</text>
          <text x="292" y="148" fill={GRAY} fontSize="11" textAnchor="middle">MSE</text>
          <text x="292" y="162" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">Moderate</text>
          <text x="292" y="184" fill={GRAY} fontSize="11" textAnchor="middle">Training</text>
          <text x="292" y="198" fill={RED} fontSize="11" fontWeight="600" textAnchor="middle">k-means (slow)</text>
          <text x="292" y="220" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>
          <text x="292" y="234" fill={A} fontSize="11" fontWeight="600" textAnchor="middle">Medium</text>

          {/* Stars */}
          <text x="292" y="262" fill={A} fontSize="14" textAnchor="middle">{'\u2605\u2605\u2605\u2606\u2606'}</text>
          <text x="292" y="280" fill={GRAY} fontSize="11" textAnchor="middle">Accuracy</text>
          <text x="292" y="296" fill={A} fontSize="14" textAnchor="middle">{'\u2605\u2605\u2606\u2606\u2606'}</text>

          {/* Column 3: TurboQuant_mse */}
          <rect x="390" y="52" width="175" height="280" rx="10" fill={A} fillOpacity="0.08" stroke={A} strokeWidth="1.2" />
          <text x="477" y="72" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle">TurboQuant_mse</text>
          <text x="477" y="86" fill={GRAY} fontSize="11" textAnchor="middle">Random rotation + Lloyd-Max</text>

          <text x="477" y="112" fill={GRAY} fontSize="11" textAnchor="middle">Rotation</text>
          <text x="477" y="126" fill={A3} fontSize="11" fontWeight="600" textAnchor="middle">Random (free)</text>
          <text x="477" y="148" fill={GRAY} fontSize="11" textAnchor="middle">MSE</text>
          <text x="477" y="162" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">Low (≤2.7× opt)</text>
          <text x="477" y="184" fill={GRAY} fontSize="11" textAnchor="middle">Training</text>
          <text x="477" y="198" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">Zero</text>
          <text x="477" y="220" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>
          <text x="477" y="234" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">Fast (O(d log d))</text>

          {/* Stars */}
          <text x="477" y="262" fill={A3} fontSize="14" textAnchor="middle">{'\u2605\u2605\u2605\u2605\u2606'}</text>
          <text x="477" y="280" fill={GRAY} fontSize="11" textAnchor="middle">Accuracy</text>
          <text x="477" y="296" fill={GREEN} fontSize="14" textAnchor="middle">{'\u2605\u2605\u2605\u2605\u2605'}</text>

          {/* Column 4: TurboQuant_prod */}
          <rect x="575" y="52" width="205" height="280" rx="10" fill={A} fillOpacity="0.12" stroke={A3} strokeWidth="2" />
          <text x="677" y="72" fill={A3} fontSize="12" fontWeight="700" textAnchor="middle">TurboQuant_prod</text>
          <text x="677" y="86" fill={GRAY} fontSize="11" textAnchor="middle">+ QJL residual correction</text>

          <text x="677" y="112" fill={GRAY} fontSize="11" textAnchor="middle">Rotation</text>
          <text x="677" y="126" fill={A3} fontSize="11" fontWeight="600" textAnchor="middle">Random (free)</text>
          <text x="677" y="148" fill={GRAY} fontSize="11" textAnchor="middle">Inner Product</text>
          <text x="677" y="162" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">UNBIASED</text>
          <text x="677" y="184" fill={GRAY} fontSize="11" textAnchor="middle">Training</text>
          <text x="677" y="198" fill={GREEN} fontSize="11" fontWeight="700" textAnchor="middle">Zero</text>
          <text x="677" y="220" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>
          <text x="677" y="234" fill={GREEN} fontSize="11" fontWeight="600" textAnchor="middle">Fast (O(d log d))</text>

          {/* Stars */}
          <text x="677" y="262" fill={A3} fontSize="14" textAnchor="middle">{'\u2605\u2605\u2605\u2605\u2605'}</text>
          <text x="677" y="280" fill={GRAY} fontSize="11" textAnchor="middle">Accuracy</text>
          <text x="677" y="296" fill={GREEN} fontSize="14" textAnchor="middle">{'\u2605\u2605\u2605\u2605\u2605'}</text>

          {/* Crown on winner */}
          <text x="677" y="46" fill={A3} fontSize="16" textAnchor="middle">{'\u{1F451}'}</text>

          {/* Bottom row labels */}
          <text x="107" y="296" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>
          <text x="292" y="296" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>
          <text x="477" y="296" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>
          <text x="677" y="296" fill={GRAY} fontSize="11" textAnchor="middle">Speed</text>

          {/* Bottom insight */}
          <rect x="80" y="350" width="640" height="50" rx="10" fill={A} fillOpacity="0.1" stroke={A} strokeWidth="1.2" />
          <text x="400" y="372" fill={A3} fontSize="14" fontWeight="700" textAnchor="middle">TurboQuant_prod: best accuracy + zero training + unbiased inner products</text>
          <text x="400" y="392" fill={GRAY} fontSize="11" textAnchor="middle">The only method with provable guarantees AND practical performance</text>

          {/* Visual verdict row */}
          <rect x="40" y="416" width="720" height="26" rx="6" fill={A} fillOpacity="0.04" />
          <text x="107" y="434" fill={RED} fontSize="12" textAnchor="middle">{"✗ No guarantee"}</text>
          <text x="292" y="434" fill={GRAY} fontSize="12" textAnchor="middle">{"✗ Needs training"}</text>
          <text x="477" y="434" fill={GREEN} fontSize="12" textAnchor="middle">{"✓ 2.7× optimal"}</text>
          <text x="677" y="434" fill={GREEN} fontSize="12" fontWeight="700" textAnchor="middle">{"✓ Unbiased + optimal"}</text>
        </svg>
      </Diagram>

    </>
  );
}
