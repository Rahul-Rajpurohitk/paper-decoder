import { useState, useEffect } from 'react';
import './styles/library.css';
import './styles/reader.css';

import PaperLibrary from './components/PaperLibrary';
import ReadingProgress from './components/ReadingProgress';
import TableOfContents from './components/TableOfContents';
import MSAPaper from './papers/msa/MSAPaper';
import TurboQuantPaper from './papers/turboquant/TurboQuantPaper';
import DINOv3Paper from './papers/dinov3/DINOv3Paper';
import AttnResPaper from './papers/attnres/AttnResPaper';
import DeepSeekMHCPaper from './papers/deepseek-mhc/DeepSeekMHCPaper';
import DeepSeekR1Paper from './papers/deepseek-r1/DeepSeekR1Paper';
import Llama4Paper from './papers/llama4/Llama4Paper';
import FreeTransformerPaper from './papers/free-transformer/FreeTransformerPaper';
import Mamba2Paper from './papers/mamba2/Mamba2Paper';
import KANPaper from './papers/kan/KANPaper';
import DeepSeekV3Paper from './papers/deepseek-v3/DeepSeekV3Paper';
import RLForLLMsPaper from './papers/rl-for-llms/RLForLLMsPaper';
import RLVRPaper from './papers/rlvr/RLVRPaper';
import AgenticSystemsPaper from './papers/agentic-systems/AgenticSystemsPaper';
import ProjectSupportAgentPaper from './papers/project-support-agent/ProjectSupportAgentPaper';
import ProjectSWEAgentPaper from './papers/project-swe-agent/ProjectSWEAgentPaper';
import ProjectDataAnalystPaper from './papers/project-data-analyst/ProjectDataAnalystPaper';
import msaConfig from './papers/msa/config';
import tqConfig from './papers/turboquant/config';
import dinov3Config from './papers/dinov3/config';
import attnresConfig from './papers/attnres/config';
import mhcConfig from './papers/deepseek-mhc/config';
import r1Config from './papers/deepseek-r1/config';
import llama4Config from './papers/llama4/config';
import ftConfig from './papers/free-transformer/config';
import mamba2Config from './papers/mamba2/config';
import kanConfig from './papers/kan/config';
import dsv3Config from './papers/deepseek-v3/config';
import rlConfig from './papers/rl-for-llms/config';
import rlvrConfig from './papers/rlvr/config';
import agenticConfig from './papers/agentic-systems/config';
import projectSupportConfig from './papers/project-support-agent/config';
import projectSWEConfig from './papers/project-swe-agent/config';
import projectAnalystConfig from './papers/project-data-analyst/config';

const PAPERS = [projectSupportConfig, projectSWEConfig, projectAnalystConfig, agenticConfig, msaConfig, tqConfig, dinov3Config, attnresConfig, mhcConfig, r1Config, llama4Config, ftConfig, rlConfig, rlvrConfig, mamba2Config, kanConfig, dsv3Config];

const PAPER_COMPONENTS = {
  msa: MSAPaper,
  turboquant: TurboQuantPaper,
  dinov3: DINOv3Paper,
  attnres: AttnResPaper,
  'deepseek-mhc': DeepSeekMHCPaper,
  'deepseek-r1': DeepSeekR1Paper,
  llama4: Llama4Paper,
  'free-transformer': FreeTransformerPaper,
  'rl-for-llms': RLForLLMsPaper,
  rlvr: RLVRPaper,
  mamba2: Mamba2Paper,
  kan: KANPaper,
  'deepseek-v3': DeepSeekV3Paper,
  'agentic-systems': AgenticSystemsPaper,
  'project-support-agent': ProjectSupportAgentPaper,
  'project-swe-agent': ProjectSWEAgentPaper,
  'project-data-analyst': ProjectDataAnalystPaper,
};

const PAPER_SECTIONS = {
  msa: ['The Core Problem', 'Architecture', 'Training Pipeline', 'Three-Stage Inference', 'Results', 'Mental Models'],
  turboquant: ['The Core Problem', 'Random Rotation', 'TurboQuant_mse', 'TurboQuant_prod', 'Lower Bounds', 'Results', 'Mental Models'],
  dinov3: ['Why DINOv3?', 'ViT-7B Architecture', 'Multi-Crop Strategy', 'Teacher-Student & Losses', 'Gram Anchoring', 'Training Pipeline', 'Distillation', 'Results'],
  attnres: ['The Problem', 'Attention Residuals', 'Block AttnRes', 'Why It Works', 'Results', 'Architecture', 'Mental Models'],
  'deepseek-mhc': ['The Problem', 'Hyper-Connections', 'Manifold Constraint', 'Sinkhorn Algorithm', 'Scaling Results', 'Architecture', 'Mental Models'],
  'deepseek-r1': ['Why R1?', 'RL Without SFT', 'Chain-of-Thought Emergence', 'Training Pipeline', 'Distillation', 'Results', 'Mental Models'],
  llama4: ['Why Llama 4?', 'MoE Architecture', 'iRoPE & 10M Context', 'Early Fusion Multimodal', 'Training at Scale', 'Model Family', 'Mental Models'],
  'rl-for-llms': ['What is RL?', 'Policy & Reward', 'PPO', 'RLHF', 'DPO', 'GRPO', 'RLVR & Beyond'],
  rlvr: ['The Question', 'Verifiable Rewards', 'CoT-Pass@K', 'Does RL Teach Reasoning?', 'The Counter-Evidence', 'Practical Impact', 'Mental Models'],
  mamba2: ['Why Mamba?', 'State Space Models', 'Selective Scan', 'SSD Framework', 'Mamba-2 Architecture', 'Results', 'Mental Models'],
  kan: ['Why KAN?', 'Kolmogorov-Arnold Theorem', 'Learnable Activations', 'B-Splines', 'Training & Pruning', 'Results', 'Mental Models'],
  'deepseek-v3': ['Why V3?', 'MoE Architecture', 'Multi-Head Latent Attention', 'Multi-Token Prediction', 'FP8 Training', 'Results', 'Mental Models'],
  'free-transformer': ['The Idea', 'Latent Variable Z', 'ELBO Training', 'Reasoning Gains', 'Structured Generation', 'Results', 'Mental Models'],
  'agentic-systems': ['The Agentic Era', 'Anatomy of an Agent', 'Tool Use & MCP', 'Memory Architectures', 'Planning & Reasoning', 'Multi-Agent Patterns', 'Framework Landscape', 'Production Stack', 'Cost & Latency', 'Security & Guardrails', 'Project: Customer Support Agent', 'Project: AI Software Engineer', 'Project: Data Analyst Agent', 'Failure Modes & Anti-patterns', 'Mental Models & Resources'],
  'project-support-agent': ['Problem & Scope', 'Functional Requirements', 'Non-Functional Requirements (NFRs)', 'Capacity Estimation', 'High-Level Architecture', 'Sequence: One Ticket', 'API Design', 'Data Model', 'Triage Subsystem', 'Specialist Agents', 'Knowledge Base / RAG', 'Memory Architecture', 'Tool Layer (MCP)', 'Deployment Topology', 'Security & Compliance', 'Observability & Eval', 'Failure Modes', 'Cost Analysis', 'Trade-offs', 'Mental Models & Resources'],
  'project-swe-agent': ['Problem & Scope', 'Functional Requirements', 'Capacity Estimation', 'Architecture', 'Sandbox Internals', 'Agent Loop Deep Dive', 'Tool Shell', 'Eval & SWE-bench', 'Cost Analysis', 'Failure Modes', 'Security', 'Trade-offs', 'Mental Models', 'Resources'],
  'project-data-analyst': ['Problem & Scope', 'Functional & NFRs', 'Capacity Estimation', 'Architecture', 'Sequence: One Question', 'Semantic Layer Deep Dive', 'SQL Safety Pipeline', 'Schema Retrieval (RAG)', 'Eval & Observability', 'Governance & PII', 'Cost Analysis', 'Failure Modes', 'Trade-offs', 'Mental Models', 'Resources'],
};

export default function App() {
  const [activePaper, setActivePaper] = useState(null);
  const paper = PAPERS.find(p => p.id === activePaper);
  const PaperComponent = activePaper ? PAPER_COMPONENTS[activePaper] : null;

  // Scroll to top when switching papers
  useEffect(() => { window.scrollTo(0, 0); }, [activePaper]);

  if (!activePaper) {
    return <PaperLibrary papers={PAPERS} onSelect={setActivePaper} />;
  }

  return (
    <div>
      <ReadingProgress color={paper.accent} />

      <header className="reader-header">
        <div className="reader-header-inner">
          <button className="reader-back-btn" onClick={() => setActivePaper(null)}>
            &larr; Library
          </button>
          <div className="reader-header-info">
            <div className="reader-header-title">{paper.title}</div>
            <div className="reader-header-meta">
              {paper.subtitle} &middot; {paper.authors} &middot; {paper.org}
            </div>
          </div>
          <span
            className="reader-venue-badge"
            style={{
              background: `color-mix(in srgb, ${paper.accent} 12%, transparent)`,
              color: paper.accent,
            }}
          >
            {paper.venue}
          </span>
        </div>
      </header>

      <main className="reader-main">
        {PaperComponent && <PaperComponent />}
      </main>

      <TableOfContents
        sections={PAPER_SECTIONS[activePaper] || []}
        color={paper.accent}
      />

      <footer className="reader-footer">
        <span>Paper Decoder &mdash; Deep-dive AI paper learning</span>
        <span>Built for depth, not skimming</span>
      </footer>
    </div>
  );
}
