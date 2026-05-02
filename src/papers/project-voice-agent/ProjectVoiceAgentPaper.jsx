import SectionHeader from '../../components/SectionHeader';
import FormulaSteps from '../../components/FormulaSteps';
import Callout from '../../components/Callout';
import ComparisonTable from '../../components/ComparisonTable';
import MentalModel from '../../components/MentalModel';
import H from '../../components/HoverTerm';
import SimpleExplain from '../../components/SimpleExplain';
import StackCard from '../../components/StackCard';
import ProdReality from '../../components/ProdReality';

const C       = '#fb923c';
const C2      = '#ea580c';
const BG      = '#1a1108';
const SURFACE = '#241509';
const FG      = '#e2e8f0';
const GRAY    = '#94a3b8';
const DIM     = '#3a2410';
const PURPLE  = '#a855f7';
const AMBER   = '#f59e0b';
const RED     = '#ef4444';
const GREEN   = '#22c55e';
const BLUE    = '#3b82f6';
const CYAN    = '#06b6d4';
const PINK    = '#ec4899';
const EMERALD = '#10b981';
const TEAL    = '#14b8a6';
const ORANGE  = '#fb923c';

/* ─── Functional + NFRs ──────────────────────────────────────────── */
function VoiceReqs() {
  const must = [
    'Answer inbound calls (PSTN + WebRTC)',
    'Verify caller (account / DOB / OTP)',
    'Solve top-50 intents end-to-end',
    'Tool calls during call (CRM, payment, booking)',
    'Barge-in on user interruption',
    'Warm-transfer to human with summary',
    'Post-call summary + intent tag in CRM',
    'PCI-safe DTMF capture for card entry',
  ];
  const nfr = [
    ['p50 turn latency',     '< 600 ms',   'P0'],
    ['p95 turn latency',     '< 1.2 s',    'P0'],
    ['Containment rate',     '≥ 70%',      'P0'],
    ['Word Error Rate',      '< 8%',       'P0'],
    ['Concurrent calls',     '~600',       'P0'],
    ['Uptime',               '99.95%',     'P0'],
    ['PCI compliance',       'L1 SAQ-D',   'P0'],
    ['Cost / call',          '< $2.50',    'P1'],
  ];
  return (
    <svg viewBox="0 0 880 480" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent functional and non-functional requirements">
      <rect width={880} height={480} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        REQUIREMENTS — MUST HAVE + SLO TABLE
      </text>
      <rect x={40} y={60} width={400} height={400} rx={10} fill="rgba(251,146,60,0.06)" stroke={C} strokeWidth={1.4} />
      <text x={240} y={86} textAnchor="middle" fill={C} fontSize={12} fontWeight={700} fontFamily="monospace">FUNCTIONAL (P0)</text>
      {must.map((m, i) => (
        <g key={i}>
          <text x={64} y={120 + i * 42} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">✓</text>
          <text x={84} y={120 + i * 42} fill={FG} fontSize={10} fontFamily="monospace">{m}</text>
        </g>
      ))}
      <rect x={460} y={60} width={380} height={400} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={650} y={86} textAnchor="middle" fill={AMBER} fontSize={12} fontWeight={700} fontFamily="monospace">NFR — SLO</text>
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

/* ─── Architecture ───────────────────────────────────────────────── */
function VoiceArch() {
  return (
    <svg viewBox="0 0 880 640" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent architecture">
      <defs>
        <marker id="vArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={FG} />
        </marker>
        <marker id="vArrO" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={C} />
        </marker>
        <linearGradient id="vBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#241509" />
          <stop offset="100%" stopColor="#180e05" />
        </linearGradient>
      </defs>
      <rect width={880} height={640} rx={12} fill="url(#vBg)" />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        ARCHITECTURE — TELEPHONY → ASR → BRAIN → TTS → BACK (sub-600ms turn)
      </text>

      {/* Telephony ingress */}
      <rect x={40} y={50} width={800} height={56} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={70} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">TELEPHONY INGRESS</text>
      {['Twilio Voice', 'Vonage', 'Telnyx', 'WebRTC (in-app)', 'SIP trunk (BYOC)'].map((s, i) => (
        <g key={i}>
          <rect x={195 + i * 125} y={66} width={110} height={32} rx={4} fill={SURFACE} stroke={PURPLE} strokeWidth={0.7} />
          <text x={250 + i * 125} y={86} textAnchor="middle" fill={FG} fontSize={10} fontFamily="monospace">{s}</text>
        </g>
      ))}
      <line x1={440} y1={106} x2={440} y2={120} stroke={FG} strokeWidth={1.4} markerEnd="url(#vArr)" />

      {/* Media gateway */}
      <rect x={40} y={120} width={800} height={42} rx={6} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.3} />
      <text x={440} y={146} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">
        MEDIA GATEWAY · PCM stream · jitter buffer · echo cancel · DTMF detect · recording
      </text>

      {/* Inbound voice pipeline */}
      <rect x={40} y={180} width={800} height={40} rx={6} fill="rgba(6,182,212,0.05)" stroke={CYAN} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={205} fill={CYAN} fontSize={10} fontWeight={700} fontFamily="monospace">INBOUND PIPELINE  (caller → brain)</text>

      <rect x={40} y={228} width={250} height={60} rx={9} fill="rgba(34,197,94,0.07)" stroke={GREEN} strokeWidth={1.4} />
      <text x={165} y={250} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">VAD + ENDPOINTING</text>
      <text x={165} y={268} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Silero VAD · 30ms frames</text>
      <text x={165} y={282} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">turn-end ~200ms after silence</text>

      <rect x={310} y={228} width={250} height={60} rx={9} fill="rgba(6,182,212,0.07)" stroke={CYAN} strokeWidth={1.4} />
      <text x={435} y={250} textAnchor="middle" fill={CYAN} fontSize={11} fontWeight={700} fontFamily="monospace">STREAMING ASR</text>
      <text x={435} y={268} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Deepgram Nova-3 / AssemblyAI</text>
      <text x={435} y={282} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">partials &lt;150ms · final on endpoint</text>

      <rect x={580} y={228} width={260} height={60} rx={9} fill="rgba(168,85,247,0.07)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={710} y={250} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">CONTEXT BUILDER</text>
      <text x={710} y={268} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">history · KB hits · CRM record</text>
      <text x={710} y={282} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">prompt cache warm</text>

      <line x1={290} y1={258} x2={310} y2={258} stroke={FG} strokeWidth={1.4} markerEnd="url(#vArr)" />
      <line x1={560} y1={258} x2={580} y2={258} stroke={FG} strokeWidth={1.4} markerEnd="url(#vArr)" />
      <line x1={710} y1={288} x2={710} y2={310} stroke={FG} strokeWidth={1.4} markerEnd="url(#vArr)" />

      {/* Brain */}
      <rect x={40} y={310} width={800} height={86} rx={10} fill="rgba(251,146,60,0.07)" stroke={C} strokeWidth={1.5} />
      <text x={60} y={332} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">CONVERSATION BRAIN  (streams response · barge-in aware)</text>
      <text x={60} y={354} fill={FG} fontSize={10} fontFamily="monospace">Haiku 4.5 (default) · streamed token-by-token · function-calling for tools · Redis state</text>
      <text x={60} y={372} fill={FG} fontSize={9} fontFamily="monospace">filler-token policy ("let me check..." while tool runs) · interruption FSM resets stream</text>
      <text x={60} y={388} fill={GRAY} fontSize={9} fontFamily="monospace">Sonnet 4.6 fallback for hard intents · Opus 4.7 for sensitive disputes (auto-routed by triage signal)</text>

      {/* Tool layer */}
      <rect x={40} y={414} width={800} height={84} rx={10} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={1.1} strokeDasharray="3 3" />
      <text x={60} y={434} fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">TOOL LAYER (MCP)</text>
      {[
        { x: 50,  label: 'CRM',       desc: 'Salesforce' },
        { x: 180, label: 'Orders',    desc: 'Shopify · WMS' },
        { x: 310, label: 'Payments',  desc: 'Stripe · DTMF' },
        { x: 440, label: 'Calendar',  desc: 'Calendly · gcal' },
        { x: 570, label: 'KB-RAG',    desc: 'help center' },
        { x: 700, label: 'Hand-off',  desc: 'human transfer' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={t.x + 10} y={446} width={120} height={42} rx={5} fill={SURFACE} stroke={GREEN} strokeWidth={0.9} />
          <text x={t.x + 70} y={464} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">{t.label}</text>
          <text x={t.x + 70} y={480} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{t.desc}</text>
        </g>
      ))}

      {/* Outbound */}
      <rect x={40} y={510} width={800} height={40} rx={6} fill="rgba(236,72,153,0.05)" stroke={PINK} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={534} fill={PINK} fontSize={10} fontWeight={700} fontFamily="monospace">OUTBOUND PIPELINE  (brain → caller)</text>

      <rect x={40} y={556} width={400} height={50} rx={8} fill="rgba(20,184,166,0.07)" stroke={TEAL} strokeWidth={1.4} />
      <text x={240} y={576} textAnchor="middle" fill={TEAL} fontSize={11} fontWeight={700} fontFamily="monospace">STREAMING TTS</text>
      <text x={240} y={594} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">Cartesia Sonic / ElevenLabs Flash · ~150ms first byte</text>

      <rect x={460} y={556} width={380} height={50} rx={8} fill="rgba(96,165,250,0.07)" stroke={BLUE} strokeWidth={1.4} />
      <text x={650} y={576} textAnchor="middle" fill={BLUE} fontSize={11} fontWeight={700} fontFamily="monospace">MEDIA GATEWAY · BACK</text>
      <text x={650} y={594} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">PCM encode · packetize · stream to telephony</text>

      <line x1={440} y1={580} x2={460} y2={580} stroke={FG} strokeWidth={1.4} markerEnd="url(#vArr)" />

      {/* Obs band */}
      <rect x={40} y={616} width={800} height={20} rx={4} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={0.8} strokeDasharray="3 3" />
      <text x={440} y={630} textAnchor="middle" fill={AMBER} fontSize={9} fontFamily="monospace">
        OBSERVABILITY — turn-latency · WER · containment · sentiment · CSAT (post-call survey)
      </text>
    </svg>
  );
}

/* ─── Latency budget ─────────────────────────────────────────────── */
function LatencyBudget() {
  const items = [
    { name: 'media → ASR partial',  ms: 80,  color: BLUE,    note: 'jitter + buffer + first chunk' },
    { name: 'endpointing',          ms: 200, color: GREEN,   note: 'silence detection' },
    { name: 'context build',        ms: 30,  color: PURPLE,  note: 'CRM lookup parallel · cached' },
    { name: 'LLM TTFT',             ms: 180, color: C,       note: 'Haiku 4.5 + prompt cache' },
    { name: 'TTS first byte',       ms: 150, color: TEAL,    note: 'Cartesia Sonic streaming' },
    { name: 'network egress',       ms: 50,  color: PINK,    note: 'media gw → carrier' },
  ];
  const total = items.reduce((s, x) => s + x.ms, 0);
  return (
    <svg viewBox="0 0 880 320" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice latency budget">
      <rect width={880} height={320} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        LATENCY BUDGET — TURN BREAKDOWN ({total} ms total p50)
      </text>
      <rect x={50} y={70} width={780} height={50} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {(() => {
        let acc = 0;
        return items.map((it, i) => {
          const w = (it.ms / total) * 780;
          const x = 50 + acc;
          acc += w;
          return (
            <g key={i}>
              <rect x={x} y={70} width={w} height={50} fill={it.color} fillOpacity={0.45} stroke={it.color} strokeWidth={1} />
              <text x={x + w / 2} y={102} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">{it.ms}ms</text>
            </g>
          );
        });
      })()}
      {items.map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 3) * 270} ${150 + Math.floor(i / 3) * 50})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontWeight={700} fontFamily="monospace">{it.name}</text>
          <text x={22} y={26} fill={GRAY} fontSize={9} fontFamily="monospace">{it.note}</text>
          <text x={250} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">{it.ms}ms</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={13} fontWeight={700} fontFamily="monospace">TARGET p50 &lt; 600ms · CURRENT 690ms</text>
      <text x={440} y={306} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">Below 800ms feels conversational; above 1.2s sounds robotic.</text>
    </svg>
  );
}

/* ─── Barge-in FSM ────────────────────────────────────────────────── */
function BargeInFSM() {
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Barge-in finite state machine">
      <defs>
        <marker id="bArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
        <marker id="bArrR" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={RED} /></marker>
      </defs>
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        BARGE-IN — INTERRUPTION HANDLING FSM
      </text>

      {[
        { cx: 160, cy: 130, label: 'AGENT_TURN',    desc: 'TTS streaming',   color: C },
        { cx: 440, cy: 130, label: 'BARGE_DETECT',  desc: 'VAD on caller',   color: AMBER },
        { cx: 720, cy: 130, label: 'TTS_CANCEL',    desc: 'flush buffer',     color: RED },
        { cx: 160, cy: 320, label: 'USER_TURN',     desc: 'ASR active',       color: GREEN },
        { cx: 440, cy: 320, label: 'CONTEXT_PATCH', desc: 'mark partial',     color: BLUE },
        { cx: 720, cy: 320, label: 'AGENT_TURN_2',  desc: 'restart response', color: PURPLE },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.cx - 75} y={s.cy - 30} width={150} height={60} rx={9} fill={SURFACE} stroke={s.color} strokeWidth={1.5} />
          <text x={s.cx} y={s.cy - 8} textAnchor="middle" fill={s.color} fontSize={11} fontWeight={700} fontFamily="monospace">{s.label}</text>
          <text x={s.cx} y={s.cy + 12} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">{s.desc}</text>
        </g>
      ))}

      <line x1={235} y1={130} x2={365} y2={130} stroke={FG} strokeWidth={1.4} markerEnd="url(#bArr)" />
      <text x={300} y={122} textAnchor="middle" fill={AMBER} fontSize={9} fontWeight={700} fontFamily="monospace">VAD high</text>

      <line x1={515} y1={130} x2={645} y2={130} stroke={RED} strokeWidth={1.4} markerEnd="url(#bArrR)" />
      <text x={580} y={122} textAnchor="middle" fill={RED} fontSize={9} fontWeight={700} fontFamily="monospace">cancel TTS</text>

      <path d="M 720 160 Q 720 240 200 240 Q 160 240 160 290" fill="none" stroke={FG} strokeWidth={1.4} markerEnd="url(#bArr)" />
      <text x={440} y={232} textAnchor="middle" fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace">flush done → user speaks</text>

      <line x1={235} y1={320} x2={365} y2={320} stroke={FG} strokeWidth={1.4} markerEnd="url(#bArr)" />
      <text x={300} y={312} textAnchor="middle" fill={BLUE} fontSize={9} fontWeight={700} fontFamily="monospace">final ASR</text>

      <line x1={515} y1={320} x2={645} y2={320} stroke={FG} strokeWidth={1.4} markerEnd="url(#bArr)" />
      <text x={580} y={312} textAnchor="middle" fill={PURPLE} fontSize={9} fontWeight={700} fontFamily="monospace">re-prompt LLM</text>

      <path d="M 720 350 Q 720 410 160 410 Q 100 410 100 360 Q 100 130 85 130" fill="none" stroke={GRAY} strokeWidth={1} strokeDasharray="3 2" markerEnd="url(#bArr)" />
      <text x={440} y={406} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">turn complete → loop</text>

      <rect x={40} y={420} width={800} height={32} rx={6} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={0.7} strokeDasharray="3 3" />
      <text x={440} y={440} textAnchor="middle" fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">
        Naive re-prompt loses context. Patch the LLM context with &quot;[user interrupted]&quot; + the partial they spoke before re-prompting.
      </text>
    </svg>
  );
}

/* ─── Sequence: One Call ─────────────────────────────────────────── */
function VoiceSequence() {
  const lanes = [
    { x: 60,  label: 'Caller'  },
    { x: 200, label: 'Tel GW'  },
    { x: 340, label: 'ASR'     },
    { x: 480, label: 'Brain'   },
    { x: 620, label: 'Tools'   },
    { x: 760, label: 'TTS'     },
  ];
  return (
    <svg viewBox="0 0 880 600" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent sequence">
      <defs>
        <marker id="vsArr" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto"><polygon points="0 0, 8 3, 0 6" fill={FG} /></marker>
      </defs>
      <rect width={880} height={600} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        SEQUENCE — ONE CALL: BILLING DISPUTE → PARTIAL REFUND
      </text>
      {lanes.map((l, i) => (
        <g key={i}>
          <rect x={l.x - 50} y={50} width={100} height={28} rx={4} fill={SURFACE} stroke={C} strokeWidth={0.8} />
          <text x={l.x} y={68} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{l.label}</text>
          <line x1={l.x} y1={80} x2={l.x} y2={560} stroke={DIM} strokeWidth={0.5} strokeDasharray="3 3" />
        </g>
      ))}
      {[
        { from: 60,  to: 200, y: 110, label: '1. inbound call (PSTN)',                  color: PURPLE },
        { from: 200, to: 480, y: 138, label: '2. session start · ANI lookup → CRM',     color: BLUE },
        { from: 480, to: 760, y: 168, label: '3. greeting (TTS streamed) "Hi Maya..."',color: TEAL },
        { from: 760, to: 60,  y: 196, label: '4. audio out',                            color: TEAL, reverse: true },
        { from: 60,  to: 340, y: 226, label: '5. user: "I was charged twice"',         color: CYAN },
        { from: 340, to: 480, y: 254, label: '6. final transcript',                      color: CYAN },
        { from: 480, to: 620, y: 282, label: '7. tool: getRecentCharges(account_id)',   color: GREEN },
        { from: 620, to: 480, y: 310, label: '8. 2 charges · $42 each · same SKU',     color: GREEN, reverse: true },
        { from: 480, to: 760, y: 338, label: '9. filler: "let me check that..."',       color: AMBER },
        { from: 480, to: 620, y: 366, label: '10. tool: refundCharge(charge_id)',       color: GREEN },
        { from: 620, to: 480, y: 394, label: '11. ✓ refunded · $42 returned 3-5d',     color: GREEN, reverse: true },
        { from: 480, to: 760, y: 422, label: '12. confirmation TTS streamed',           color: TEAL },
        { from: 760, to: 60,  y: 450, label: '13. audio out',                           color: TEAL, reverse: true },
        { from: 60,  to: 480, y: 478, label: '14. user: "thanks, that\'s all"',        color: CYAN },
        { from: 480, to: 620, y: 506, label: '15. tool: tagIntent · CSAT(prompt)',     color: GREEN },
        { from: 480, to: 200, y: 534, label: '16. hang up · post-call summary → CRM',   color: PURPLE },
      ].map((m, i) => (
        <g key={i}>
          <line x1={m.from} y1={m.y} x2={m.to} y2={m.y} stroke={m.color} strokeWidth={1.4} markerEnd="url(#vsArr)" strokeDasharray={m.reverse ? '4 2' : ''} />
          <text x={Math.min(m.from, m.to) + Math.abs(m.to - m.from) / 2} y={m.y - 4} textAnchor="middle" fill={m.color} fontSize={9} fontFamily="monospace">{m.label}</text>
        </g>
      ))}
      <rect x={40} y={566} width={800} height={26} rx={5} fill="rgba(34,197,94,0.05)" stroke={GREEN} strokeWidth={0.6} strokeDasharray="3 3" />
      <text x={440} y={584} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">
        Total call: ~95s · 7 turns · contained · $0.18 LLM + $0.40 ASR/TTS + $0.16 telephony = $0.74
      </text>
    </svg>
  );
}

/* ─── Eval ───────────────────────────────────────────────────────── */
function VoiceEval() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent eval pipeline">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        EVAL — CALL REPLAY + LIVE METRICS + CSAT
      </text>

      <rect x={40} y={70} width={260} height={280} rx={10} fill="rgba(34,197,94,0.06)" stroke={GREEN} strokeWidth={1.4} />
      <text x={170} y={94} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">CALL REPLAY (offline)</text>
      <text x={56} y={120} fill={FG} fontSize={9} fontFamily="monospace">~5K consented call recordings</text>
      <text x={56} y={138} fill={FG} fontSize={9} fontFamily="monospace">stratified by intent · channel</text>
      <text x={56} y={156} fill={GRAY} fontSize={9} fontFamily="monospace">runs every prompt change</text>
      <text x={56} y={188} fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">May 2026 results</text>
      {[
        ['Intent acc',     '94%'],
        ['Containment',    '72%'],
        ['p50 latency',    '590ms'],
        ['WER',            '7.1%'],
        ['Refusal acc',    '96%'],
      ].map((r, i) => (
        <g key={i}>
          <text x={56} y={208 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{r[0]}</text>
          <text x={280} y={208 + i * 18} textAnchor="end" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">{r[1]}</text>
        </g>
      ))}

      <rect x={310} y={70} width={260} height={280} rx={10} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1.4} />
      <text x={440} y={94} textAnchor="middle" fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">LIVE METRICS</text>
      <text x={326} y={120} fill={FG} fontSize={9} fontFamily="monospace">streamed from every prod call</text>
      <text x={326} y={138} fill={FG} fontSize={9} fontFamily="monospace">to ClickHouse + Datadog</text>
      <text x={326} y={156} fill={GRAY} fontSize={9} fontFamily="monospace">SLO board updates 1Hz</text>
      <text x={326} y={188} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">What we watch</text>
      {[
        ['Active calls',     'live'],
        ['p95 turn lat',     'live'],
        ['Talk-over rate',   'rolling 1m'],
        ['Hand-off rate',    'rolling 5m'],
        ['Refund $/hr',      'kill-switch threshold'],
      ].map((r, i) => (
        <g key={i}>
          <text x={326} y={208 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{r[0]}</text>
          <text x={550} y={208 + i * 18} textAnchor="end" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">{r[1]}</text>
        </g>
      ))}

      <rect x={580} y={70} width={260} height={280} rx={10} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.4} />
      <text x={710} y={94} textAnchor="middle" fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">CSAT + REPLAY</text>
      <text x={596} y={120} fill={FG} fontSize={9} fontFamily="monospace">post-call IVR survey (1-5)</text>
      <text x={596} y={138} fill={FG} fontSize={9} fontFamily="monospace">SMS follow-up next day</text>
      <text x={596} y={156} fill={GRAY} fontSize={9} fontFamily="monospace">low-CSAT auto-routes to QA</text>
      <text x={596} y={188} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">Adversarial set</text>
      {[
        '"give me a refund" (no purchase)',
        'PII probes',
        'language-switch mid-call',
        'background noise / mumbled',
        'angry caller patterns',
      ].map((q, i) => (
        <text key={i} x={596} y={208 + i * 18} fill={FG} fontSize={9} fontFamily="monospace">{`• ${q}`}</text>
      ))}
    </svg>
  );
}

/* ─── Cost ───────────────────────────────────────────────────────── */
function VoiceCost() {
  return (
    <svg viewBox="0 0 880 380" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent cost breakdown">
      <rect width={880} height={380} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        COST PER CALL — $0.74 BREAKDOWN (avg 4 min)
      </text>
      <rect x={50} y={90} width={780} height={60} rx={6} fill={SURFACE} stroke={DIM} strokeWidth={0.6} />
      {(() => {
        const items = [
          { name: 'Telephony',  cents: 16, color: PURPLE },
          { name: 'ASR',        cents: 24, color: CYAN },
          { name: 'LLM',        cents: 18, color: C },
          { name: 'TTS',        cents: 16, color: TEAL },
          { name: 'Tools',      cents: 0, color: GREEN }, /* token-only */
        ];
        const real = [
          { name: 'Telephony',  cents: 16, color: PURPLE },
          { name: 'ASR',        cents: 24, color: CYAN },
          { name: 'LLM',        cents: 18, color: C },
          { name: 'TTS',        cents: 16, color: TEAL },
        ];
        const total = real.reduce((s, x) => s + x.cents, 0);
        let acc = 0;
        return real.map((it, i) => {
          const w = (it.cents / total) * 780;
          const x = 50 + acc;
          acc += w;
          return (
            <g key={i}>
              <rect x={x} y={90} width={w} height={60} fill={it.color} fillOpacity={0.45} stroke={it.color} strokeWidth={1} />
              <text x={x + w / 2} y={126} textAnchor="middle" fill={FG} fontSize={11} fontWeight={700} fontFamily="monospace">{it.cents}¢</text>
            </g>
          );
        });
      })()}
      {[
        { name: 'Telephony ($0.04/min × 4)',  cents: 16, color: PURPLE },
        { name: 'ASR ($0.06/min × 4)',         cents: 24, color: CYAN },
        { name: 'LLM (Haiku · 7 turns)',       cents: 18, color: C },
        { name: 'TTS ($0.10/min × ~1.6 spoken)',cents: 16, color: TEAL },
      ].map((it, i) => (
        <g key={i} transform={`translate(${60 + (i % 2) * 400} ${190 + Math.floor(i / 2) * 30})`}>
          <rect x={0} y={0} width={14} height={14} rx={2} fill={it.color} fillOpacity={0.5} stroke={it.color} strokeWidth={1} />
          <text x={22} y={11} fill={FG} fontSize={10} fontFamily="monospace">{it.name}</text>
          <text x={370} y={11} fill={it.color} fontSize={10} fontWeight={700} fontFamily="monospace" textAnchor="end">{it.cents}¢</text>
        </g>
      ))}
      <text x={440} y={290} textAnchor="middle" fill={C} fontSize={14} fontWeight={700} fontFamily="monospace">TOTAL: 74¢ / call</text>
      <text x={440} y={310} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">@ 50K calls/day = $37K/day · ~$1.1M/month</text>
      <text x={440} y={326} textAnchor="middle" fill={GRAY} fontSize={9} fontFamily="monospace">vs human BPO @ $7/call = $350K/day = ~$10.5M/month</text>
      <text x={440} y={350} textAnchor="middle" fill={GREEN} fontSize={11} fontWeight={700} fontFamily="monospace">~10x cost reduction · ~70% containment</text>
    </svg>
  );
}

/* ─── Failures ───────────────────────────────────────────────────── */
function VoiceFailures() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent failure modes">
      <rect width={880} height={420} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        FAILURE MODES &amp; MITIGATIONS
      </text>
      {[
        { x: 30,  title: 'TALK-OVER',         risk: 'agent + caller speak at once', mit: 'Silero VAD · barge-in FSM · TTS flush · context patch' },
        { x: 240, title: 'HALLUCINATED ACTION',risk: 'refunds wrong charge',         mit: 'tool args validated against retrieved record · 2nd LLM verify · cap $/call' },
        { x: 450, title: 'PCI LEAK',          risk: 'asks for card by voice',        mit: 'DTMF-only capture · MASK in transcript · scoped Stripe token' },
        { x: 660, title: 'LATENCY SPIKE',     risk: 'p99 → 2s on tool slow',         mit: 'parallel tool fan-out · filler tokens · cancel-on-stall' },
      ].map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={70} width={200} height={310} rx={10} fill={SURFACE} stroke={RED} strokeWidth={1.2} />
          <text x={f.x + 100} y={94} textAnchor="middle" fill={RED} fontSize={11} fontWeight={700} fontFamily="monospace">{f.title}</text>
          <text x={f.x + 100} y={130} textAnchor="middle" fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">RISK</text>
          {f.risk.split(' · ').map((r, k) => (
            <text key={k} x={f.x + 100} y={150 + k * 14} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">{r}</text>
          ))}
          <line x1={f.x + 30} y1={210} x2={f.x + 170} y2={210} stroke={DIM} strokeWidth={0.6} />
          <text x={f.x + 100} y={232} textAnchor="middle" fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace">MITIGATIONS</text>
          {f.mit.split(' · ').map((m, k) => (
            <text key={k} x={f.x + 100} y={252 + k * 16} textAnchor="middle" fill={FG} fontSize={9} fontFamily="monospace">• {m}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─── Trade-offs ─────────────────────────────────────────────────── */
function VoiceTradeOffs() {
  return (
    <svg viewBox="0 0 880 420" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent design trade-offs">
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
        ['ASR provider',     'Deepgram Nova-3',          'Whisper (self-host)',      'Stream + p50 latency'],
        ['TTS provider',     'Cartesia Sonic',           'ElevenLabs Multilingual',  'Latency · $$ tradeoff'],
        ['Default LLM',      'Haiku 4.5 streamed',       'Sonnet 4.6',               'Latency dominates UX'],
        ['Endpointing',      'Silero VAD + 200ms',       'Provider-side EOS',        'Tunable per persona'],
        ['Telephony',        'Twilio Voice + SIP BYOC',  'Vonage only',              'BYOC = price flexibility'],
        ['PCI flow',         'DTMF capture only',        'Voice → mask → tokenize',   'L1 SAQ-D unambiguous'],
        ['Memory',           'Per-call + per-account',   'Global cross-account',     'Privacy + relevance'],
        ['Filler tokens',    'On for tool-wait > 400ms', 'Always',                    'Only when needed'],
        ['Hand-off',         'Warm with summary',        'Cold transfer',            'Reduces re-explain'],
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

/* ─── Deployment ─────────────────────────────────────────────────── */
function VoiceDeployment() {
  return (
    <svg viewBox="0 0 880 540" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent deployment topology">
      <rect width={880} height={540} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        DEPLOYMENT — REGION-PINNED · MEDIA SERVERS NEAR CARRIERS
      </text>
      <rect x={40} y={50} width={800} height={50} rx={8} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1.2} />
      <text x={60} y={72} fill={PURPLE} fontSize={11} fontWeight={700} fontFamily="monospace">CARRIER PEERING</text>
      <text x={60} y={90} fill={FG} fontSize={9} fontFamily="monospace">Twilio + Vonage + BYOC SIP · regional PoPs · TLS-SRTP · MediaSec</text>
      <rect x={40} y={114} width={800} height={300} rx={10} fill="rgba(251,146,60,0.04)" stroke={C} strokeWidth={1.3} strokeDasharray="3 3" />
      <text x={60} y={136} fill={C} fontSize={11} fontWeight={700} fontFamily="monospace">REGION · us-east-1 (one of 4 mirror regions)</text>
      <rect x={60} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={C} strokeWidth={1} />
      <text x={185} y={172} textAnchor="middle" fill={C} fontSize={10} fontWeight={700} fontFamily="monospace">MEDIA / RTC TIER</text>
      <text x={75} y={196} fill={FG} fontSize={9} fontFamily="monospace">• media-gateway · 16 pods (UDP)</text>
      <text x={75} y={214} fill={FG} fontSize={9} fontFamily="monospace">• rtc-mixer · 4 pods (WebRTC)</text>
      <text x={75} y={232} fill={FG} fontSize={9} fontFamily="monospace">• packet pacing · jitter buffer</text>
      <text x={75} y={250} fill={FG} fontSize={9} fontFamily="monospace">• co-located with carriers</text>
      <text x={75} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">HPA on active-calls metric</text>
      <rect x={320} y={150} width={250} height={130} rx={8} fill={SURFACE} stroke={EMERALD} strokeWidth={1} />
      <text x={445} y={172} textAnchor="middle" fill={EMERALD} fontSize={10} fontWeight={700} fontFamily="monospace">BRAIN / TOOL TIER</text>
      <text x={335} y={196} fill={FG} fontSize={9} fontFamily="monospace">• brain-worker · 24 pods</text>
      <text x={335} y={214} fill={FG} fontSize={9} fontFamily="monospace">• tool-router · 8 pods</text>
      <text x={335} y={232} fill={FG} fontSize={9} fontFamily="monospace">• Redis (state · 30min TTL)</text>
      <text x={335} y={250} fill={FG} fontSize={9} fontFamily="monospace">• Postgres (transcripts)</text>
      <text x={335} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">PITR · 90d backups</text>
      <rect x={580} y={150} width={240} height={130} rx={8} fill={SURFACE} stroke={GREEN} strokeWidth={1} />
      <text x={700} y={172} textAnchor="middle" fill={GREEN} fontSize={10} fontWeight={700} fontFamily="monospace">VENDOR EDGE (egress)</text>
      <text x={595} y={196} fill={FG} fontSize={9} fontFamily="monospace">• Deepgram (ASR · streaming)</text>
      <text x={595} y={214} fill={FG} fontSize={9} fontFamily="monospace">• Cartesia / ElevenLabs (TTS)</text>
      <text x={595} y={232} fill={FG} fontSize={9} fontFamily="monospace">• Anthropic / OpenAI</text>
      <text x={595} y={250} fill={FG} fontSize={9} fontFamily="monospace">• Stripe · Salesforce</text>
      <text x={595} y={268} fill={GRAY} fontSize={9} fontFamily="monospace">All same-region private peering</text>
      <rect x={60}  y={300} width={760} height={100} rx={9} fill="rgba(245,158,11,0.05)" stroke={AMBER} strokeWidth={1} />
      <text x={75}  y={322} fill={AMBER} fontSize={10} fontWeight={700} fontFamily="monospace">PCI ZONE (separated)</text>
      <text x={75}  y={344} fill={FG} fontSize={9} fontFamily="monospace">• card capture is DTMF-only · routed to PCI VLAN · brain never sees card digits</text>
      <text x={75}  y={362} fill={FG} fontSize={9} fontFamily="monospace">• transcript redaction at line-emit (regex + entity tagger)</text>
      <text x={75}  y={380} fill={FG} fontSize={9} fontFamily="monospace">• audit logs immutable + signed · SOC 2 + PCI L1 SAQ-D</text>
      <rect x={40} y={428} width={800} height={50} rx={8} fill="rgba(245,158,11,0.06)" stroke={AMBER} strokeWidth={1} />
      <text x={60} y={450} fill={AMBER} fontSize={11} fontWeight={700} fontFamily="monospace">OBSERVABILITY</text>
      <text x={60} y={468} fill={FG} fontSize={9} fontFamily="monospace">OTel · ClickHouse for call metrics · Datadog · turn-latency SLO board · per-call cost rollup</text>
      <rect x={40} y={490} width={800} height={40} rx={8} fill="rgba(239,68,68,0.05)" stroke={RED} strokeWidth={1} strokeDasharray="3 3" />
      <text x={60} y={510} fill={RED} fontSize={10} fontWeight={700} fontFamily="monospace">DR</text>
      <text x={100} y={510} fill={FG} fontSize={9} fontFamily="monospace">us-west-2 hot standby · Anycast SIP · RPO 0 (active-active) · RTO &lt; 60s · auto-failover on PoP loss</text>
      <text x={60} y={524} fill={GRAY} fontSize={9} fontFamily="monospace">In-flight calls drop on cut-over (rare); dialer retries within 30s</text>
    </svg>
  );
}

/* ─── API & Data Model ───────────────────────────────────────────── */
function VoiceAPI() {
  const apis = [
    ['POST', '/v1/calls/inbound',         'Twilio webhook · TwiML response · session start',     '200'],
    ['WS',   '/v1/calls/:id/media',       'bi-directional PCM stream · barge-in events',         '101'],
    ['POST', '/v1/calls/:id/handoff',     'warm-transfer to human agent with summary',           '200'],
    ['GET',  '/v1/calls/:id/transcript',  'final transcript · word-level timestamps · PII tag',  '200'],
    ['POST', '/v1/calls/:id/feedback',    'CSAT score from IVR or follow-up SMS',                '202'],
    ['GET',  '/v1/calls?status=&intent=', 'paginated list · filter · export',                    '200'],
    ['POST', '/v1/admin/voices',          'upload brand voice clone · per-tenant',               '201'],
  ];
  return (
    <svg viewBox="0 0 880 460" style={{ width: '100%', maxWidth: 880, display: 'block', margin: '24px auto' }} role="img" aria-label="Voice agent API surface">
      <rect width={880} height={460} rx={12} fill={BG} />
      <text x={440} y={26} textAnchor="middle" fill={GRAY} fontSize={11} fontWeight={700} letterSpacing={2} fontFamily="monospace">
        API SURFACE — REST + WEBSOCKET (RTC SIGNALING)
      </text>
      <line x1={20} y1={62} x2={860} y2={62} stroke={DIM} strokeWidth={0.5} />
      <text x={40}  y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">METHOD</text>
      <text x={120} y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">ENDPOINT</text>
      <text x={420} y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace">PURPOSE</text>
      <text x={800} y={56} fill={GRAY} fontSize={9} fontWeight={700} fontFamily="monospace" textAnchor="middle">CODE</text>
      {apis.map((r, i) => {
        const y = 90 + i * 32;
        const methodColor = r[0] === 'POST' ? GREEN : r[0] === 'GET' ? CYAN : r[0] === 'WS' ? PURPLE : AMBER;
        return (
          <g key={i}>
            {i % 2 === 0 && <rect x={20} y={y - 18} width={840} height={26} rx={4} fill="rgba(255,255,255,0.02)" />}
            <rect x={40} y={y - 14} width={62} height={20} rx={3} fill={methodColor} fillOpacity={0.18} stroke={methodColor} strokeWidth={0.8} />
            <text x={71} y={y} textAnchor="middle" fill={methodColor} fontSize={9} fontWeight={700} fontFamily="monospace">{r[0]}</text>
            <text x={120} y={y} fill={FG} fontSize={9} fontFamily="monospace">{r[1]}</text>
            <text x={420} y={y} fill={GRAY} fontSize={9} fontFamily="monospace">{r[2]}</text>
            <text x={800} y={y} fill={GREEN} fontSize={9} fontWeight={700} fontFamily="monospace" textAnchor="middle">{r[3]}</text>
          </g>
        );
      })}
      <rect x={40} y={350} width={800} height={92} rx={9} fill="rgba(168,85,247,0.06)" stroke={PURPLE} strokeWidth={1} />
      <text x={60} y={372} fill={PURPLE} fontSize={10} fontWeight={700} fontFamily="monospace">AUTH &amp; QUOTAS</text>
      <text x={60} y={392} fill={FG} fontSize={9} fontFamily="monospace">• Per-tenant API keys (HMAC) · per-call signed JWT for media WS</text>
      <text x={60} y={410} fill={FG} fontSize={9} fontFamily="monospace">• Per-tenant concurrency cap (default 100 active calls) · soft-warn at 80%</text>
      <text x={60} y={428} fill={FG} fontSize={9} fontFamily="monospace">• PCI flow uses scoped Stripe tokens · auto-rotated on session end</text>
    </svg>
  );
}

export default function ProjectVoiceAgentPaper({ activeSection }) {
  const show = (s) => !activeSection || activeSection === s;
  return (
    <>
      {show('Problem & Scope') && (
        <section>
          <SectionHeader num="01" title="Problem & Scope" subtitle="Sierra/Decagon-class voice agent for support + sales" color={C} />
          <p>
            Build a <H tip="AI voice agent = an agent that joins phone calls (inbound or outbound), holds a real-time conversation with the human caller, and takes actions (refunds, bookings, lookups) by calling tools — all under a sub-second turn budget so it sounds conversational. Sierra (2024 → 2026 leader), Decagon, PolyAI, Bland, are the references." color={C}>voice agent</H> for a 5K-employee retailer doing ~50K customer calls/day across billing, orders, returns, account questions, and sales follow-ups. Hard goals: contain ≥ 70% of calls without human, p50 turn latency &lt; 600ms, $&lt;2.50/call all-in, PCI L1 compliance for card payments, no PII leakage, warm-transfer with summary on hand-off.
          </p>
          <SimpleExplain>
            <strong>Plain version</strong>: a voice that picks up the phone, talks like a human, knows your account, handles 7 in 10 calls without a person. The hard part isn&apos;t the brain — it&apos;s making the brain answer in under a second over a phone line.
          </SimpleExplain>
          <Callout type="key">
            Out of scope: legal disputes, payments &gt; $1K, escalated complaints (auto-route to human). Knowing what NOT to handle is half the design.
          </Callout>
          <StackCard
            accent={C}
            title="AI Voice Agent · Sierra/Decagon-class"
            subtitle="Telephony → ASR → brain → TTS → back. ~600ms turn, $0.74/call."
            slos={[
              { label: 'p50 TURN',     value: '< 600 ms', note: 'feels conversational' },
              { label: 'CONTAINMENT', value: '≥ 70%',     note: 'no human' },
              { label: 'WER',          value: '< 4%',      note: 'medical / domain' },
              { label: 'PCI L1',       value: 'compliant', note: 'DTMF only' },
            ]}
            stack={[
              { layer: 'Telephony',  choice: 'Twilio + SIP BYOC',           why: 'Carrier price flex' },
              { layer: 'ASR',        choice: 'Deepgram Nova-3',              why: 'Streaming · partials <150ms' },
              { layer: 'Brain',      choice: 'Haiku 4.5 (streamed)',         why: 'Latency dominates UX' },
              { layer: 'TTS',        choice: 'Cartesia Sonic',                why: 'Sub-150ms first byte' },
              { layer: 'VAD',        choice: 'Silero · 200ms endpoint',        why: 'Tunable per persona' },
              { layer: 'Tools',      choice: 'CRM · Stripe (DTMF) · KB',      why: 'PCI scope tiny' },
              { layer: 'Compliance', choice: 'PCI L1 · BAA · 2-party consent', why: 'Card flow segregated' },
            ]}
            scale={[
              { label: 'Calls / day',     value: '50 K' },
              { label: 'Concurrent peak', value: '~600' },
              { label: 'Avg call',         value: '4 min' },
              { label: 'Turns / call',    value: '~10' },
            ]}
            cost={{
              perUnit: '$0.74',
              unitLabel: 'per call',
              perPeriod: '~$1.1 M',
              periodLabel: 'per month',
            }}
            moats={[
              'Latency budget is the product · sub-600ms feels human',
              'Barge-in FSM patches LLM context with [interrupted: <partial>]',
              'PCI boundary kept at DTMF · brain never sees card digits',
              'vs human BPO ~$7/call — ~10× cheaper, 24/7 availability',
            ]}
          />
        </section>
      )}

      {show('Functional & NFRs') && (
        <section>
          <SectionHeader num="02" title="Functional & NFRs" subtitle="What it must do, what it must guarantee" color={C} />
          <VoiceReqs />
        </section>
      )}

      {show('Capacity Estimation') && (
        <section>
          <SectionHeader num="03" title="Capacity Estimation" subtitle="The numbers that drive infra" color={C} />
          <FormulaSteps
            steps={[
              { label: 'Calls/day',        formula: 'C = 50{,}000', explanation: 'Inbound + outbound combined.' },
              { label: 'Avg call length',  formula: '\\overline{t_{call}} = 4\\,\\text{min}', explanation: 'Industry benchmark for retail support.' },
              { label: 'Concurrent peak',  formula: 'N_{peak} = 4 \\times \\frac{C}{86400} \\times \\overline{t_{call}}\\cdot 60 \\approx 555', explanation: '4× burst multiplier for working-hours peak.' },
              { label: 'Turns/call',       formula: '\\sim 10 \\Rightarrow 500{,}000\\,\\text{turns/day}', explanation: 'Turn = 1 user utterance + 1 agent utterance.' },
              { label: 'Token cost',       formula: '\\$0.18 \\times C = \\$9{,}000 / \\text{day}', explanation: 'LLM is the single biggest LLM cost line; ASR/TTS cost more in absolute.' },
              { label: 'Total cost',       formula: '\\$0.74 \\times C = \\$37{,}000 / \\text{day}', explanation: 'Tel + ASR + LLM + TTS combined.' },
            ]}
          />
        </section>
      )}

      {show('Architecture') && (
        <section>
          <SectionHeader num="04" title="Architecture" subtitle="Telephony → ASR → brain → TTS → back" color={C} />
          <VoiceArch />
          <h3>Components</h3>
          <ul>
            <li><strong>Telephony ingress</strong>: SIP / Twilio Voice / Vonage / WebRTC. We BYOC (bring-your-own-carrier) for unit-economics control.</li>
            <li><strong>Media gateway</strong>: PCM normalization, jitter buffer, echo cancellation, DTMF detection, optional recording (consent-flagged).</li>
            <li><strong>ASR</strong>: Deepgram Nova-3 streaming. Partials &lt;150ms, finals on endpointing.</li>
            <li><strong>VAD + endpointing</strong>: Silero VAD on inbound stream; emit turn-end after ~200ms of silence (tunable per persona).</li>
            <li><strong>Brain</strong>: Haiku 4.5 default with prompt-caching for system prompt + few-shot. Sonnet 4.6 fallback for hard intents auto-detected by triage signal. Streamed token-by-token.</li>
            <li><strong>Tool layer (MCP)</strong>: CRM, orders, payments (DTMF only for cards), calendar, KB-RAG, hand-off.</li>
            <li><strong>TTS</strong>: Cartesia Sonic for default brand voice (sub-150ms first byte). ElevenLabs Multilingual fallback.</li>
            <li><strong>Outbound</strong>: same media gateway, encoded back to telephony provider.</li>
          </ul>
        </section>
      )}

      {show('Latency Budget') && (
        <section>
          <SectionHeader num="05" title="Latency Budget" subtitle="Sub-600ms p50 turn — where every ms goes" color={C} />
          <LatencyBudget />
          <p>
            The single biggest lever is <H tip="Endpointing = the decision point at which the system declares 'the user has stopped speaking.' Too eager = cuts users off. Too patient = adds dead air. Most voice agents waste 200-400ms here." color={C}>endpointing</H>. Drop the silence threshold from 500ms (default) to 200ms (tuned) and you save 300ms off every turn — if you also handle false-positives (user pausing mid-sentence). After that, prompt caching, parallel tool calls, and streaming TTS each shave 50-100ms.
          </p>
        </section>
      )}

      {show('Barge-in Handling') && (
        <section>
          <SectionHeader num="06" title="Barge-in Handling" subtitle="The interruption FSM that makes it feel human" color={C} />
          <BargeInFSM />
          <Callout type="warning">
            Naive systems re-prompt the LLM with a fresh history when the user interrupts — losing the partial response. Always patch the LLM context with &quot;[user interrupted at: &lt;partial&gt;]&quot; so the next response acknowledges what was said. This is the difference between &quot;feels like a person&quot; and &quot;feels like an IVR with a brain.&quot;
          </Callout>
        </section>
      )}

      {show('Sequence: One Call') && (
        <section>
          <SectionHeader num="07" title="Sequence: One Call" subtitle="Billing dispute → partial refund, end-to-end" color={C} />
          <VoiceSequence />
        </section>
      )}

      {show('API & Data Model') && (
        <section>
          <SectionHeader num="08" title="API & Data Model" subtitle="REST + WebSocket (media) + Postgres" color={C} />
          <VoiceAPI />
        </section>
      )}

      {show('Eval & Containment') && (
        <section>
          <SectionHeader num="09" title="Eval & Containment" subtitle="Replay set + live SLO board + CSAT" color={C} />
          <VoiceEval />
          <h3>What we run</h3>
          <ul>
            <li><strong>Replay set</strong>: 5K consented past calls. Re-played against any prompt/model change. CI blocks if containment drops &gt; 2pt.</li>
            <li><strong>Live SLO board</strong>: turn-latency p95, talk-over rate, hand-off rate, refund-$/hr (auto-kill if past threshold).</li>
            <li><strong>Adversarial set</strong>: 200 calls designed to break — fake refund attempts, PII probes, language switches, angry-caller patterns.</li>
            <li><strong>CSAT</strong>: post-call IVR (1-5) + next-day SMS. Low CSAT auto-routes to QA queue.</li>
          </ul>
        </section>
      )}

      {show('Compliance & PCI') && (
        <section>
          <SectionHeader num="10" title="Compliance & PCI" subtitle="The scope that decides if you ship at all" color={C} />
          <ul>
            <li><strong>Recording disclosure</strong>: TTS plays disclosure on every call before any meaningful interaction. State law dispatched per area code.</li>
            <li><strong>PCI L1 SAQ-D</strong>: card data NEVER touches the brain. DTMF capture only. PCI VLAN segregation. Stripe terminal-style flow.</li>
            <li><strong>Transcript redaction</strong>: regex + entity tagger redact card numbers, SSN, DOB, account numbers at line-emit. Original audio purged after 14d.</li>
            <li><strong>SOC 2 + HIPAA</strong>: where applicable (healthcare verticals). Audit log immutable, signed, queried by SecOps.</li>
            <li><strong>State law nuances</strong>: 2-party-consent states (CA, FL, etc.) — must explicitly confirm consent post-disclosure.</li>
          </ul>
          <Callout type="warning">
            The PCI scope is the single biggest design constraint. If the brain can &quot;hear&quot; card digits, your entire infra is in PCI scope and you&apos;re building a fortress. Keep the brain out of card flow. DTMF only.
          </Callout>
        </section>
      )}

      {show('Deployment Topology') && (
        <section>
          <SectionHeader num="11" title="Deployment Topology" subtitle="Carrier-near · multi-region · PCI segregated" color={C} />
          <VoiceDeployment />
          <p>
            The hardest deployment decision is region pinning. Voice has a hard 30ms-ms latency budget for media transit; the media-gateway tier MUST live in carrier-peered PoPs. Brain tier can sit further away (LLM call dominates anyway). 4 mirror regions handle 99.95% uptime — Anycast SIP + active-active makes failover &lt; 60s.
          </p>
        </section>
      )}

      {show('Cost Analysis') && (
        <section>
          <SectionHeader num="12" title="Cost Analysis" subtitle="Where every cent goes per call" color={C} />
          <VoiceCost />
        </section>
      )}

      {show('Failure Modes') && (
        <section>
          <SectionHeader num="13" title="Failure Modes" subtitle="What we&apos;ve actually seen break" color={C} />
          <VoiceFailures />
          <ProdReality
            accent={C}
            lessons={[
              { type: 'warning', tag: 'Talk-over rate spiked when we shipped faster TTS',
                body: 'Cartesia upgrade dropped first-byte from 250ms to 150ms. Sounded great, but the agent stopped pausing before responses — users felt bulldozed. Added 100ms pre-response silence as policy.' },
              { type: 'key', tag: 'Filler tokens annoyed users on fast tool calls',
                body: 'Saying "let me check that" before a 50ms cache hit felt fake. Now: only emit filler if tool-call ETA > 400ms.' },
              { type: 'warning', tag: 'DTMF detection differed by carrier',
                body: 'Twilio reported DTMF events 30-50ms earlier than Vonage on the same physical line. Built carrier-agnostic timing layer; PCI flow now hits both consistently.' },
              { type: 'key', tag: 'The post-call summary was the killer feature for hand-offs',
                body: 'Human agents accept hand-off 4× faster when the summary precedes them. Spent more on synth than we expected; ROI clear.' },
            ]}
          />
        </section>
      )}

      {show('Trade-offs') && (
        <section>
          <SectionHeader num="14" title="Trade-offs" subtitle="What we picked and rejected" color={C} />
          <VoiceTradeOffs />
        </section>
      )}

      {show('Mental Models') && (
        <section>
          <SectionHeader num="15" title="Mental Models" subtitle="Frames" color={C} />
          <MentalModel
            title="Latency is the product"
            color={C}
            analogy="A waiter who takes 10 seconds to acknowledge you ruins the meal regardless of the food."
            technical="Below 800ms feels conversational; above 1.2s sounds robotic. Every component is graded on contribution to the latency budget, not capability."
          />
          <MentalModel
            title="Containment, not perfection"
            color={GREEN}
            analogy="A junior agent who solves 7-of-10 calls without escalating beats a senior who solves 9-of-10 but is 5x more expensive."
            technical="70% containment at $0.74/call beats 90% containment at $4/call when the unit economics hit BPO replacement scope."
          />
          <MentalModel
            title="The PCI boundary is the architecture"
            color={RED}
            analogy="An open-plan office with one safe vs. a fortress where everything is locked — pick the safe."
            technical="DTMF-only card capture keeps the brain out of PCI scope. This single decision shrinks compliance burden by 10x."
          />
          <MentalModel
            title="Replay sets compound"
            color={AMBER}
            analogy="Aviation has black-box recordings; voice agents have call recordings. Use them."
            technical="Every prompt change is verified against the replay set before shipping. The team that disabled this once lost 9pt of containment in a week."
          />
        </section>
      )}

      {show('Resources') && (
        <section>
          <SectionHeader num="16" title="Resources" subtitle="Reading + tooling" color={C} />
          <ul>
            <li>Sierra AI engineering blog (containment as the metric)</li>
            <li>Deepgram + Cartesia docs (streaming ASR/TTS patterns)</li>
            <li>Twilio Programmable Voice + Media Streams</li>
            <li>OpenAI Realtime API (alternative integrated approach)</li>
            <li>PCI DSS v4.0 quick-reference</li>
            <li>This module&apos;s research vault: <code>vault/research/project-voice/</code></li>
          </ul>
          <Callout type="key">
            What you should be able to do after reading: design a Sierra-class voice agent on a whiteboard in 45 min, justify every latency-budget decision, and explain the PCI boundary in a way that satisfies a compliance auditor.
          </Callout>
        </section>
      )}
    </>
  );
}
