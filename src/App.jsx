import { useState, useEffect } from 'react';
import './styles/library.css';
import './styles/reader.css';

import PaperLibrary from './components/PaperLibrary';
import ReadingProgress from './components/ReadingProgress';
import MSAPaper from './papers/msa/MSAPaper';
import TurboQuantPaper from './papers/turboquant/TurboQuantPaper';
import DINOv3Paper from './papers/dinov3/DINOv3Paper';
import msaConfig from './papers/msa/config';
import tqConfig from './papers/turboquant/config';
import dinov3Config from './papers/dinov3/config';

const PAPERS = [msaConfig, tqConfig, dinov3Config, {
  id: 'placeholder_1',
  title: 'Next Paper',
  subtitle: 'Coming soon — suggest a paper!',
  venue: '—',
  tags: [],
  accent: '#475569',
  status: 'upcoming',
}];

const PAPER_COMPONENTS = {
  msa: MSAPaper,
  turboquant: TurboQuantPaper,
  dinov3: DINOv3Paper,
};

const PAPER_SECTIONS = {
  msa: ['The Core Problem', 'Architecture', 'Training Pipeline', 'Three-Stage Inference', 'Results', 'Mental Models'],
  turboquant: ['The Core Problem', 'Random Rotation', 'TurboQuant_mse', 'TurboQuant_prod', 'Lower Bounds', 'Results', 'Mental Models'],
  dinov3: ['Why DINOv3?', 'ViT-7B Architecture', 'Multi-Crop Strategy', 'Teacher-Student & Losses', 'Gram Anchoring', 'Training Pipeline', 'Distillation', 'Results'],
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

  // Lazy-load TOC only in paper view
  const TableOfContents = require('./components/TableOfContents').default;

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
