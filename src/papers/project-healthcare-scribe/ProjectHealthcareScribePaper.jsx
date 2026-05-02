import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';

const C       = '#10b981';
const C2      = '#047857';
const BG      = '#06140f';
const SURFACE = '#0a1f17';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#103025';
const PURPLE  = '#a855f7';
const AMBER   = '#f59e0b';
const RED     = '#ef4444';
const GREEN   = '#22c55e';
const BLUE    = '#3b82f6';
const PINK    = '#ec4899';
const EMERALD = '#10b981';
const TEAL    = '#14b8a6';
const ORANGE  = '#fb923c';
const CYAN    = '#06b6d4';
const LIME    = '#84cc16';

function HCReqs() {
  const must = [
    'Capture room audio (mobile or in-room mic)',
    'Streaming medical ASR (terminology-aware)',
    'Speaker diarization (doctor / patient / others)',
    'De-identification (PHI scrub for non-clinical use)',
    'SOAP note generation (S / O / A / P)',
    'ICD-10 + CPT coding for billing',
    'EHR write-back via FHIR (Epic · Cerner · Athena)',
    'Clinician review · accept/reject · sign',
  ];
  const nfr = [
    ['Note time saved',     '>= 90 min/day',  'P0'],
    ['Note acceptance',     '>= 85%',         'P0'],
    ['Medical WER',         '< 4%',           'P0'],
    ['Coding F1',           '>= 0.92',        'P0'],
    ['HIPAA + BAA',         'compliant',      'P0'],
    ['ePHI containment',    'no leak',        'P0'],
    ['Cost / encounter',    '< $1.20',        'P1'],
    ['Latency to draft',    '< 2 min post-visit','P0'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Healthcare scribe functional and NFRs">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS - MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(16,185,129,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={240} y={86} textAnchor="middle" fill={C} fontSize={12} fontWeight={700} fontFamily="monospace">FUNCTIONAL (P0)</text>
      {must.map((m, i) => (
        <g key={i}>
          <text x={64} y={120 + i * 42} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">YES</text>
          <text x={104} y={120 + i * 42} fill={FG} fontSize={10} fontFamily="monospace">{m}</text>
        </g>
      ))}
      <rect x={460} y={60} width={380} height={400} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={650} y={86} textAnchor="middle" fill={AMBER} fontSize={12} fontWeight={700} fontFamily="monospace">NFR - SLO</text>
      {nfr.map((r, i) => {
        const y = 116 + i * 40;
        return (
          <g key={i}>
            <text x={476} y={y} fill={FG} fontSize={10} fontFamily="monospace">{r[0]}</text>
            <text x={680} y={y} fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{r[1]}</text>
            <text x={800} y={y} fill={r[2] === 'P0' ? RED : AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">{r[2]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function HCArch() {
  return (
    <svg viewBox="0 0 880 720" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Healthcare scribe architecture">
      <defs>
        <marker id="hcArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
        <linearGradient id="hcBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0a1f17" />
          <stop offset="100%" stopColor="#04130c" />
        </linearGradient>
      </defs>
      <rect width={880} height={720} rx={12} fill="url(#hcBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE - VISIT TO ASR TO SOAP TO CODES TO EHR
      </text>

      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">CAPTURE</text>
      {['Mobile app', 'Web app', 'In-room mic', 'Tele-visit', 'Watch'].map((s, i) => (
        <g key={i}>
          <rect x={195 + i * 125} y={66} width={110} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={250 + i * 125} y={86} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />

      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        AUDIO INTAKE - encrypted upload - chunk - VAD - noise reduce - PCI mic gain
      </text>

      <line x1={165} y1={162} x2={165} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />
      <line x1={435} y1={162} x2={435} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />
      <line x1={710} y1={162} x2={710} y2={184} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />

      <rect x={40} y={186} width={250} height={70} rx={9} fill="rgba(34,211,238,0.07)" stroke={CYAN} strokeWidth={1.5} />
      <text x={165} y={208} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">MEDICAL ASR</text>
      <text x={165} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Deepgram Medical / Suki</text>
      <text x={165} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">terminology-aware - WER &lt;4%</text>

      <rect x={310} y={186} width={250} height={70} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={435} y={208} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">DIARIZATION</text>
      <text x={435} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">pyannote + clustering</text>
      <text x={435} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">doctor / patient / others</text>

      <rect x={580} y={186} width={260} height={70} rx={9} fill="rgba(239,68,68,0.07)" stroke={RED} strokeWidth={1.5} />
      <text x={710} y={208} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">DE-IDENTIFICATION</text>
      <text x={710} y={228} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">PHI scrubber (18 HIPAA cats)</text>
      <text x={710} y={244} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">tokenize - retain re-identify key</text>

      <line x1={290} y1={221} x2={310} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />
      <line x1={560} y1={221} x2={580} y2={221} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />

      <rect x={40} y={290} width={800} height={84} rx={10} fill="rgba(16,185,129,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={60} y={310} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">SOAP GENERATOR</text>
      {[
        { x: 50,  label: 'SUBJECTIVE', desc: 'patient story' },
        { x: 220, label: 'OBJECTIVE',  desc: 'exam + vitals + labs' },
        { x: 390, label: 'ASSESSMENT', desc: 'differential + dx' },
        { x: 560, label: 'PLAN',       desc: 'orders / meds / followup' },
        { x: 730, label: 'EXTRA',      desc: 'ROS / HPI / PMH' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={324} width={140} height={42} rx={5} fill={SURFACE} stroke={C} strokeWidth={0.9} />
          <text x={t.x + 80} y={342} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 80} y={358} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      <line x1={440} y1={374} x2={440} y2={392} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />

      <rect x={40} y={392} width={400} height={70} rx={10} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.5} />
      <text x={60} y={412} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">CODING ENGINE</text>
      <text x={60} y={432} fill={FG} fontSize={10} fontFamily="monospace">ICD-10 + CPT + HCC + RxNorm + LOINC</text>
      <text x={60} y={448} fill={GRAY} fontSize={9} fontFamily="monospace">grounded in note - cited spans - confidence per code</text>

      <rect x={460} y={392} width={380} height={70} rx={10} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.5} />
      <text x={480} y={412} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">CLINICIAN REVIEW UI</text>
      <text x={480} y={432} fill={FG} fontSize={10} fontFamily="monospace">side-by-side audio + note - inline edit - sign</text>
      <text x={480} y={448} fill={GRAY} fontSize={9} fontFamily="monospace">corrections feed back as labels (signed)</text>

      <line x1={240} y1={462} x2={240} y2={482} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />
      <line x1={650} y1={462} x2={650} y2={482} stroke={FG} strokeWidth={1.4} markerEnd="url(#hcArr)" />

      <rect x={40} y={482} width={800} height={70} rx={10} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.5} />
      <text x={60} y={502} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">EHR WRITE-BACK (FHIR)</text>
      <text x={60} y={522} fill={FG} fontSize={10} fontFamily="monospace">Epic · Cerner · Athena · Allscripts · eClinicalWorks</text>
      <text x={60} y={538} fill={GRAY} fontSize={9} fontFamily="monospace">FHIR R4 - ADT - Encounter - DocumentReference - Condition - Procedure - MedicationRequest</text>

      <rect x={40} y={576} width={800} height={70} rx={10} fill="rgba(20,184,166,0.07)" stroke={TEAL} strokeWidth={1.5} />
      <text x={60} y={596} fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">REVENUE CYCLE LOOP</text>
      <text x={60} y={616} fill={FG} fontSize={10} fontFamily="monospace">codes - claim - clearinghouse - payer - paid? - feedback to coder</text>
      <text x={60} y={632} fill={GRAY} fontSize={9} fontFamily="monospace">denials route back as training signal · collections improve over time</text>

      <rect x={40} y={656} width={800} height={36} rx={6} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={440} y={678} textAnchor="middle" fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">
        OBSERVABILITY (PHI-safe) - latency - acceptance rate - coding F1 - denial rate - clinician satisfaction
      </text>
    </svg>
  );
}

function HCSequence() {
  const lanes = [
    { x: 70,  label: 'Visit'    },
    { x: 200, label: 'App'      },
    { x: 330, label: 'ASR'      },
    { x: 460, label: 'SOAP Gen' },
    { x: 600, label: 'Coder'    },
    { x: 740, label: 'EHR'      },
  ];
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Healthcare scribe sequence">
      <defs>
        <marker id="hcSArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={600} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE - 15-MIN VISIT TO SIGNED EHR NOTE
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={560} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 70,  to: 200, y: 110, label: '1. doc taps Start - patient consents',color: PURPLE },
        { from: 200, to: 200, y: 138, label: '2. encrypted audio upload streaming', color: BLUE, self: true },
        { from: 200, to: 330, y: 168, label: '3. stream chunks to ASR',              color: CYAN },
        { from: 330, to: 200, y: 196, label: '4. partials + diarization labels',     color: CYAN, reverse: true },
        { from: 70,  to: 200, y: 226, label: '5. visit ends - tap Stop',             color: PURPLE },
        { from: 200, to: 460, y: 254, label: '6. final transcript - de-id pass',     color: BLUE },
        { from: 460, to: 460, y: 282, label: '7. SOAP gen (Sonnet 4.6)',             color: GREEN, self: true },
        { from: 460, to: 600, y: 310, label: '8. coding (ICD-10 / CPT / HCC)',       color: AMBER },
        { from: 600, to: 460, y: 338, label: '9. codes with cited spans',            color: AMBER, reverse: true },
        { from: 460, to: 200, y: 366, label: '10. draft delivered (~90s post-visit)',color: GREEN, reverse: true },
        { from: 200, to: 70,  y: 394, label: '11. doc reviews on phone',             color: PURPLE, reverse: true },
        { from: 70,  to: 200, y: 422, label: '12. inline edits - sign',              color: PINK },
        { from: 200, to: 740, y: 450, label: '13. FHIR DocumentReference create',    color: GREEN },
        { from: 740, to: 200, y: 478, label: '14. ack + EHR ID',                     color: GREEN, reverse: true },
        { from: 200, to: 740, y: 506, label: '15. Encounter / Condition / Procedure',color: GREEN },
        { from: 740, to: 70,  y: 534, label: '16. note appears in EHR chart',         color: GREEN, reverse: true },
      ].map((m, i) => (
        <g key={i}>
          {m.self ? (
            <>
              <path d={`M ${m.from} ${m.y} q 30 -8 0 18`} fill="none" stroke={m.color} strokeWidth={1.4} markerEnd="url(#hcSArr)" />
              <text x={m.from + 38} y={m.y + 6} fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          ) : (
            <>
              <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#hcSArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
              <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
            </>
          )}
        </g>
      ))}
      <rect x={40} y={566} width={800} height={26} rx={5} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={584} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        15-min visit - draft in 90s - clinician edit + sign 2-3 min - 90+ min/day saved
      </text>
    </svg>
  );
}

function PHIBoundary() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="PHI boundary">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        PHI BOUNDARY - HIPAA SAFE HARBOR + LIMITED DATA SET
      </text>
      <rect x={40} y={56} width={800} height={84} rx={9} fill="rgba(239,68,68,0.07)" stroke={RED} strokeWidth={1.4} />
      <text x={60} y={78} fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">PHI ZONE (BAA REQUIRED · ePHI ENCRYPTED · AUDITED)</text>
      <text x={60} y={98} fill={FG} fontSize={10} fontFamily="monospace">audio · transcripts · SOAP notes · codes · billing claims · EHR write-backs</text>
      <text x={60} y={116} fill={FG} fontSize={9} fontFamily="monospace">CMK encryption at rest + in transit · per-tenant key isolation · access-logged · 6y retention</text>
      <text x={60} y={132} fill={GRAY} fontSize={9} fontFamily="monospace">All compute in HIPAA-eligible AWS / GCP / Azure · BAA from every cloud + LLM vendor</text>
      <rect x={40} y={156} width={400} height={130} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.3} />
      <text x={60} y={176} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">DE-ID PIPELINE (18 HIPAA categories)</text>
      <text x={56} y={196} fill={FG} fontSize={9} fontFamily="monospace">- names - addresses - dates - phone</text>
      <text x={56} y={212} fill={FG} fontSize={9} fontFamily="monospace">- email - SSN - MRN - account #</text>
      <text x={56} y={228} fill={FG} fontSize={9} fontFamily="monospace">- license # - VIN - URL - IP</text>
      <text x={56} y={244} fill={FG} fontSize={9} fontFamily="monospace">- biometric - photo - device</text>
      <text x={56} y={260} fill={FG} fontSize={9} fontFamily="monospace">- web URL - any other unique ID</text>
      <text x={56} y={278} fill={GRAY} fontSize={9} fontFamily="monospace">tokenize - retain re-id key in HSM</text>
      <rect x={460} y={156} width={380} height={130} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.3} />
      <text x={480} y={176} fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">LIMITED DATA SET (LLM input)</text>
      <text x={476} y={196} fill={FG} fontSize={9} fontFamily="monospace">- de-id&apos;d transcript only</text>
      <text x={476} y={212} fill={FG} fontSize={9} fontFamily="monospace">- LLM never sees PHI</text>
      <text x={476} y={228} fill={FG} fontSize={9} fontFamily="monospace">- output is re-id&apos;d on the way back</text>
      <text x={476} y={244} fill={FG} fontSize={9} fontFamily="monospace">- LLM provider has BAA + zero retain</text>
      <text x={476} y={260} fill={FG} fontSize={9} fontFamily="monospace">- prompt-cache disabled for PHI</text>
      <text x={476} y={278} fill={GRAY} fontSize={9} fontFamily="monospace">structurally enforced</text>
      <rect x={40} y={302} width={800} height={84} rx={9} fill="rgba(245,158,11,0.07)" stroke={AMBER} strokeWidth={1.3} />
      <text x={60} y={322} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">AUDIT LOG (immutable)</text>
      <text x={60} y={342} fill={FG} fontSize={9} fontFamily="monospace">- who accessed which patient&apos;s data when</text>
      <text x={60} y={358} fill={FG} fontSize={9} fontFamily="monospace">- every LLM call - signed - hash-chained</text>
      <text x={60} y={374} fill={FG} fontSize={9} fontFamily="monospace">- 6y retention - exported to compliance team monthly</text>
      <rect x={40} y={400} width={800} height={42} rx={6} fill="rgba(99,102,241,0.06)" stroke={BLUE} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={420} fill={BLUE} fontSize={10} fontWeight={700} fontFamily="monospace">PATIENT CONSENT</text>
      <text x={60} y={436} fill={FG} fontSize={9} fontFamily="monospace">verbal consent at start of visit · captured in audio · re-played on demand for any patient request</text>
    </svg>
  );
}

function HCCost() {
  const items = [
    { name: 'ASR (medical)',         cents: 25, color: CYAN },
    { name: 'Diarization',            cents: 8,  color: PURPLE },
    { name: 'De-id pipeline',         cents: 5,  color: RED },
    { name: 'SOAP gen (Sonnet)',      cents: 35, color: GREEN },
    { name: 'Coding engine',          cents: 25, color: AMBER },
    { name: 'EHR write + infra',      cents: 22, color: BLUE },
  ];
  const total = items.reduce((s, x) => s + x.cents, 0);
  let acc = 0;
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Healthcare scribe cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER ENCOUNTER - $1.20 BREAKDOWN (15-min visit)
      </text>
      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {items.map((it, i) => {
        const w = (it.cents / total) * 780;
        const x = 50 + acc;
        acc += w;
        return (
          <g key={i}>
            <rect x={x} y={90} width={w} height={60} fill={it.color} fillOpacity={0.45} stroke={it.color} strokeWidth={1} />
            <text x={x + w / 2} y={126} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">{it.cents}c</text>
          </g>
        );
      })}
      {items.map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 2) * 400} ${190 + Math.floor(i / 2) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={370} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">{it.cents}c</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: $1.20 / ENCOUNTER</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">@ 25 visits/doc/day = $30/doc/day - ROI in saved doc time alone</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">90 min/day saved - billed at $300/hr clinical time = $450/day saved per doc</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">~15x ROI · plus +5% capture rate via better coding (huge in revenue cycle)</text>
    </svg>
  );
}

function HCFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Healthcare scribe failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES + MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'HALLUCINATED FINDING', risk: 'note says symptom not in audio', mit: 'span citation per finding / 2nd-LLM verify / clinician sign required' },
        { x: 240, title: 'MISCODING',             risk: 'wrong ICD-10 - billing denial',  mit: 'evidence-grounded codes / coder review / denial feedback loop' },
        { x: 450, title: 'PHI LEAK',              risk: 'ePHI in non-PHI logs',           mit: 'PHI tag propagation / log scrubber / pre-flight access review' },
        { x: 660, title: 'EHR WRITE FAILURE',     risk: 'note lost between sign and EHR', mit: 'idempotent writes / retry queue / clinician failure dashboard' },
      ].map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={70} width={200} height={310} rx={10} fill={SURFACE} stroke={RED} strokeWidth={1.2} />
          <text x={f.x + 100} y={94} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">{f.title}</text>
          <text x={f.x + 100} y={130} textAnchor="middle" fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">RISK</text>
          <text x={f.x + 100} y={150} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{f.risk}</text>
          <line x1={f.x + 30} y1={210} x2={f.x + 170} y2={210} stroke={DIM} strokeWidth={0.6} />
          <text x={f.x + 100} y={232} textAnchor="middle" fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace">MITIGATIONS</text>
          {f.mit.split(' / ').map((m, k) => (
            <text key={k} x={f.x + 100} y={252 + k * 16} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">- {m}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function HCTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Healthcare scribe trade-offs">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DESIGN TRADE-OFFS
      </text>
      <line x1={20} y1={70} x2={860} y2={70} stroke={DIM} strokeWidth={0.5} />
      <text x={40}  y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">DECISION</text>
      <text x={300} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">CHOSE</text>
      <text x={520} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">REJECTED</text>
      <text x={740} y={62} fill={GRAY} fontSize={10} fontWeight={700} fontFamily="monospace">REASON</text>
      {[
        ['Capture device',    'Phone primary',                   'Hardware mic',                'Adoption / ergonomics'],
        ['ASR provider',      'Deepgram Medical',                 'Whisper-large',               'Medical WER / streaming'],
        ['SOAP model',        'Sonnet 4.6 (de-id\'d input)',      'Opus 4.7',                    'Cost / quality balance'],
        ['Coding model',       'Specialized fine-tune',            'Generic LLM',                'F1 0.92 vs 0.78'],
        ['EHR integration',    'FHIR R4',                          'HL7 v2',                     'Modern + supported'],
        ['LLM data flow',     'De-id\'d only',                    'Raw to LLM',                  'HIPAA Limited Data Set'],
        ['Review UX',          'Phone-first - sign on phone',     'Desktop only',                'Doc workflow'],
        ['Billing loop',      'Closed - denial feedback',          'Submit and forget',          'Compounding accuracy'],
        ['Deploy',             'Single-region per tenant',         'Multi-region',                'HIPAA + BAA boundary'],
      ].map((r, i) => {
        const y = 100 + i * 32;
        return (
          <g key={i}>
            {i % 2 === 0 && <rect x={20} y={y - 18} width={840} height={28} rx={4} fill="rgba(255,255,255,0.02)" />}
            <text x={40} y={y} fill={FG} fontSize={9} fontWeight={700} fontFamily="monospace">{r[0]}</text>
            <text x={300} y={y} fill={C} fontSize={9} fontFamily="monospace">{r[1]}</text>
            <text x={520} y={y} fill={GRAY} fontSize={9} fontFamily="monospace">{r[2]}</text>
            <text x={740} y={y} fill={GRAY} fontSize={9} fontFamily="monospace">{r[3]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function HCDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Healthcare scribe deployment">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT - HIPAA-ELIGIBLE - BAA - SINGLE-REGION PER TENANT
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">EDGE</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Cloudflare (no PHI) - WAF - SSO via Okta - mobile cert pinning - device attestation</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(16,185,129,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">PHI ZONE (HIPAA-eligible AWS / GCP / Azure - BAA from cloud + every vendor)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">CAPTURE TIER</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">- audio-ingest - 8 pods</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">- transcoder - 4 pods</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">- VAD + chunking</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">- presigned upload URLs</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">CMK encryption all-TLS</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">PROCESSING TIER</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">- ASR (Deepgram Medical)</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">- diarizer + de-id</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">- SOAP gen (Sonnet via BAA)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">- coder (specialized model)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PHI never leaves region</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">EHR INTEGRATION</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">- FHIR client (Epic / Cerner)</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">- HL7v2 fallback</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">- claim adapter (837 / X12)</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">- mTLS - VPN per tenant</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">tenant-pinned credentials</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} />
      <text x={75}  y={322} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">STORAGE (CMK - 6y retention - immutable audit)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">- S3 (audio - encrypted CMK - separate per tenant)</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">- Postgres (encounters - notes - codes - tenant-isolated DB)</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">- audit log (append-only - hash-chained - exported to compliance monthly)</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY (PHI-safe)</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel - Datadog - PHI-stripped logs - acceptance rate dashboard - coding F1 - denial dashboard</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR (single-region per tenant)</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">Same-region replica - RPO 5min - RTO 1hr - DR cut-over within HIPAA boundary</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">No multi-region active-active - data residency requirements supersede</text>
    </svg>
  );
}

export default function ProjectHealthcareScribePaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Abridge / Suki / Nuance DAX-class clinical scribe" color={C} />
          <p>
            Build a <H tip="Clinical AI scribe = an agent that listens to the doctor-patient conversation and generates the clinician's documentation (SOAP note), suggests billing codes (ICD-10 / CPT), and writes back into the EHR via FHIR — saving 90+ minutes per clinician per day. Abridge ($550M raised 2025), Suki, Nuance DAX (Microsoft), Augmedix, Heidi Health, ScribeAmerica AI, DeepScribe. The single largest healthcare-AI category by ARR." color={C}>clinical AI scribe</H> for a 1500-clinician health system spanning 15 specialties (primary care, cardio, ortho, peds, etc.). Hard goals: 90+ min/day saved per clinician, ≥85% note acceptance rate, &lt;4% medical WER, ≥0.92 coding F1, no PHI leakage, HIPAA + BAA compliant, $&lt;1.20/encounter.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: a clinician hits Start, has the visit, hits Stop. 90 seconds later, a draft SOAP note + billing codes are ready. The clinician edits and signs in 2-3 minutes instead of 15. Clinician gets dinner with their family.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: clinical decision support (separate Glass Health / OpenEvidence layer), patient-facing chat, scheduling. The scribe documents; it doesn&apos;t prescribe.
          </Callout>
          <StackCard
            accent={C}
            title="AI Healthcare Scribe · Abridge/Suki-class"
            subtitle="Visit → ASR → de-id → SOAP → codes → EHR. 90+ min/day saved, $1.20/encounter."
            slos={[
              { label: 'TIME SAVED',     value: '≥ 90 min', note: '/clinician/day' },
              { label: 'NOTE ACCEPT',    value: '≥ 85%',    note: 'specialty-tuned' },
              { label: 'MEDICAL WER',    value: '< 4%',     note: 'terminology-aware' },
              { label: 'CODING F1',       value: '≥ 0.92',   note: 'specialized model' },
            ]}
            stack={[
              { layer: 'Capture',     choice: 'Mobile app (primary)',                why: 'Adoption · ergonomics' },
              { layer: 'ASR',         choice: 'Deepgram Medical (BAA)',              why: 'Streaming · WER under 4%' },
              { layer: 'Diarization', choice: 'pyannote + clustering',                why: 'Doc/patient/others' },
              { layer: 'De-id',       choice: 'HIPAA Safe Harbor (18 cats)',          why: 'LLM gets Limited Data Set' },
              { layer: 'SOAP gen',    choice: 'Sonnet 4.6 (de-id input · BAA)',      why: 'Structured output' },
              { layer: 'Coder',       choice: 'Specialized fine-tune',               why: 'F1 0.92 vs 0.78 generic' },
              { layer: 'EHR',          choice: 'FHIR R4 (Epic / Cerner)',              why: '70%+ US coverage' },
            ]}
            scale={[
              { label: 'Clinicians',       value: '1 500' },
              { label: 'Visits / day',      value: '33 K' },
              { label: 'Audio / day',       value: '~8 K hrs' },
              { label: 'Specialties',       value: '15' },
            ]}
            cost={{
              perUnit: '$1.20',
              unitLabel: 'per encounter',
              perPeriod: '~$1.2 M',
              periodLabel: 'per month',
            }}
            moats={[
              'PHI never reaches LLM raw · de-id boundary is structural',
              'Denial-feedback loop on coding · accuracy compounds',
              'Specialty-aware fine-tunes lift acceptance 70% → 88%',
              '+5% billing capture is bigger ROI than time saved',
            ]}
          />
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it does · what it must guarantee" color={C} />
          <HCReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="Throughput · cost · ROI" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Clinicians',    formula: 'C = 1{,}500', explanation: 'Mid-size health system.' },
              { label: 'Visits / day',  formula: 'V = 1500 \\times 22 = 33{,}000', explanation: '22 visits per clinician per day.' },
              { label: 'Avg visit',     formula: '\\overline{t} = 15\\,\\text{min}', explanation: 'Across specialties.' },
              { label: 'Audio /day',    formula: '\\sim 8000\\,\\text{hr}', explanation: 'Streamed to ASR.' },
              { label: 'Cost /enc',     formula: '\\$1.20', explanation: 'ASR + de-id + SOAP + coder + EHR + infra.' },
              { label: 'ROI / day',     formula: '90\\,\\text{min} \\times \\$300/hr = \\$450/clinician', explanation: 'Vs $30/clinician cost = ~15x.' },
              { label: 'Capture lift',  formula: '+5\\%\\,\\text{billing capture}', explanation: 'Bigger ROI than time saved at scale.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Visit → ASR → SOAP → codes → EHR" color={C} />
          <HCArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Capture</strong>: mobile app (primary) · web · in-room mic · tele-visit · watch.</li>
            <li><strong>Audio intake</strong>: encrypted upload · VAD · noise reduce · streaming chunks.</li>
            <li><strong>Medical ASR</strong>: Deepgram Medical / Suki internal · terminology-aware · WER &lt;4%.</li>
            <li><strong>Diarization</strong>: pyannote + clustering · doctor / patient / others.</li>
            <li><strong>De-identification</strong>: HIPAA Safe Harbor 18-category PHI scrub · tokenize · retain re-id key in HSM.</li>
            <li><strong>SOAP generator</strong>: Sonnet 4.6 (BAA) · de-id&apos;d input only · 4 sections + ROS/HPI/PMH.</li>
            <li><strong>Coding engine</strong>: specialized fine-tune · ICD-10 + CPT + HCC + RxNorm + LOINC · cited spans.</li>
            <li><strong>Clinician review UI</strong>: side-by-side audio + note · inline edit · sign on phone.</li>
            <li><strong>EHR write-back</strong>: FHIR R4 (Epic / Cerner / Athena) · HL7v2 fallback · idempotent.</li>
            <li><strong>Revenue cycle loop</strong>: codes → claim → clearinghouse → payer → denial feedback.</li>
          </ul>
        </section>
      )}

      {show('PHI Boundary') && (
        <section>
          <SectionHeader num="05" title="PHI Boundary" subtitle="HIPAA Safe Harbor + Limited Data Set" color={C} />
          <PHIBoundary />
          <Callout type="warning">
            The single highest-stakes design decision: PHI must never reach the LLM provider in raw form. Run de-identification first (18 HIPAA categories), then send the limited data set to the LLM with BAA, then re-identify on the way back. Prompt-cache disabled for PHI flows. This is what makes deployment in real hospitals possible.
          </Callout>
        </section>
      )}

      {show('Sequence: One Visit') && (
        <section>
          <SectionHeader num="06" title="Sequence: One Visit" subtitle="15-min visit to signed EHR note" color={C} />
          <HCSequence />
        </section>
      )}

      {show('SOAP Generation') && (
        <section>
          <SectionHeader num="07" title="SOAP Generation" subtitle="Specialty-aware · structured · cited" color={C} />
          <h3>Structure</h3>
          <ul>
            <li><strong>S — Subjective</strong>: chief complaint, HPI, ROS, PMH, family history, social history, meds, allergies.</li>
            <li><strong>O — Objective</strong>: vitals, exam findings, labs, imaging.</li>
            <li><strong>A — Assessment</strong>: differential diagnosis, working diagnosis with reasoning.</li>
            <li><strong>P — Plan</strong>: orders, prescriptions, procedures, patient education, follow-up.</li>
          </ul>
          <h3>Specialty-aware</h3>
          <p>
            One model fits all is a trap. A cardiology visit needs different fields than peds. Per-specialty prompts + few-shot examples + per-specialty fine-tunes for high-volume specialties. The clinician picks specialty at start; defaults work for primary care. Fields auto-fill from prior encounters to mirror clinician patterns over time.
          </p>
        </section>
      )}

      {show('Medical Coding') && (
        <section>
          <SectionHeader num="08" title="Medical Coding" subtitle="ICD-10 + CPT + HCC · grounded · billing-grade" color={C} />
          <ul>
            <li><strong>ICD-10-CM</strong>: diagnosis codes — every condition mentioned and assessed.</li>
            <li><strong>CPT</strong>: procedure / E&amp;M codes — visit complexity, time, MDM-based.</li>
            <li><strong>HCC</strong>: hierarchical condition categories for risk-adjusted reimbursement.</li>
            <li><strong>RxNorm</strong>: medication codes — every prescription has a normalized code.</li>
            <li><strong>LOINC</strong>: lab observation codes — for orders.</li>
          </ul>
          <h3>Why specialized model beats generic LLM</h3>
          <p>
            Coding is an extraction problem with a closed vocabulary (~70K ICD-10 codes). A specialized fine-tune on 100K+ coded encounters hits F1 ~0.92; a generic LLM hits ~0.78. The 14-point gap is millions of dollars in proper reimbursement vs denial-and-rework. Every code ships with a cited span the coder can verify.
          </p>
          <Callout type="key">
            Closed-loop on denials: when a payer denies a claim, that signal feeds back as a labeled training example. Coding accuracy compounds quarter over quarter — the moat that no generic LLM provider can match.
          </Callout>
        </section>
      )}

      {show('EHR Integration') && (
        <section>
          <SectionHeader num="09" title="EHR Integration" subtitle="FHIR R4 + HL7v2 fallback" color={C} />
          <ComparisonTable
            headers={['EHR', 'API', 'Auth', 'Notes']}
            rows={[
              ['Epic',         'FHIR R4 + Hyperspace',     'OAuth + JWT',        'App Orchard required'],
              ['Cerner',       'FHIR R4',                  'OAuth',               'Free SMART-on-FHIR'],
              ['Athena',       'FHIR R4 + proprietary',    'OAuth',               'API throttle limits'],
              ['Allscripts',   'FHIR R4 + Veradigm',       'OAuth',               'Patchy FHIR support'],
              ['eClinicalWorks','HL7v2 + REST',            'API key',            'HL7v2 fallback common'],
              ['Meditech',     'FHIR R4 partial',          'OAuth',               'Smaller hospitals'],
            ]}
          />
          <p>
            FHIR R4 is the modern standard but Epic and Cerner cover ~70% of US hospitals between them. Build to FHIR first, fall back to HL7v2 for legacy. Per-tenant credentials, mTLS where available, audit every write. Idempotent writes (with idempotency key) so retries don&apos;t double-create encounters.
          </p>
        </section>
      )}

      {show('Compliance') && (
        <section>
          <SectionHeader num="10" title="Compliance" subtitle="HIPAA + BAA + state laws + ePHI" color={C} />
          <ul>
            <li><strong>HIPAA + HITECH</strong>: Privacy Rule + Security Rule + Breach Notification.</li>
            <li><strong>BAA chain</strong>: with cloud provider (AWS/GCP/Azure) · with LLM vendor (Anthropic/OpenAI) · with ASR vendor · with EHR · with clearinghouse.</li>
            <li><strong>ePHI handling</strong>: CMK encryption · per-tenant key · access logged · 6-year retention · breach notification &lt;60 days.</li>
            <li><strong>State laws</strong>: California (CMIA), New York (SHIELD), Texas (HB300) — region pinning per state.</li>
            <li><strong>SOC 2 Type II + HITRUST CSF</strong>: standard for enterprise tier.</li>
            <li><strong>Patient consent</strong>: verbal at visit start (captured) + written option per state.</li>
            <li><strong>De-id audit</strong>: monthly review by compliance team · false-negative tracking.</li>
          </ul>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="11" title="Deployment Topology" subtitle="HIPAA-eligible · single-region per tenant" color={C} />
          <HCDeployment />
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="12" title="Cost Analysis" subtitle="Per-encounter economics + ROI" color={C} />
          <HCCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="13" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <HCFailures />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="14" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <HCTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="15" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="The PHI boundary is the architecture"
            color={C}
            analogy="Surgical site sterilization is what makes surgery possible."
            technical="De-id before LLM, re-id after. BAA chain. CMK encryption. Single-region per tenant. These aren't add-ons; they're structural."
          />
          <MentalModel
            title="Clinician-in-loop always"
            color={GREEN}
            analogy="An autopilot with a co-pilot is safer than either alone."
            technical="The note is a draft. The clinician signs. Without that loop, the product is liability-uninsurable. With it, it's a force multiplier."
          />
          <MentalModel
            title="Coding is the revenue lever"
            color={AMBER}
            analogy="A surgeon who codes correctly captures the value of their work; one who doesn't loses 5% of revenue."
            technical="A specialized coder + denial feedback loop compounds. +5% capture rate is bigger ROI than time saved at scale."
          />
          <MentalModel
            title="Specialty-aware beats one-size-fits-all"
            color={PURPLE}
            analogy="A specialist nurse beats a generalist for cardiology charting."
            technical="Per-specialty prompts and fine-tunes lift acceptance rate from ~70% (generic) to ~88% (specialty-tuned)."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="16" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>Abridge engineering blog (PHI-safe LLM patterns)</li>
            <li>Suki AI architecture posts (specialty-aware scribing)</li>
            <li>FHIR R4 spec + SMART on FHIR</li>
            <li>HIPAA Safe Harbor + Limited Data Set definitions</li>
            <li>HITRUST CSF readiness checklist</li>
            <li>Deepgram Medical + Suki ASR docs</li>
            <li>This module&apos;s research vault: <code>vault/research/project-healthcare/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design an Abridge-class clinical scribe on a whiteboard in 45 min, justify the PHI boundary + clinician-in-loop + specialty-aware coding, and explain the BAA chain that makes hospital deployment legally possible.
          </Callout>
        </section>
      )}
    </>
  );
}
