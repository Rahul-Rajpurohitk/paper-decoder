import { useState } from 'react';
import './styles/library.css';
import './styles/reader.css';

import PaperLibrary from './components/PaperLibrary';
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

export default function App() {
  const [activePaper, setActivePaper] = useState(null);
  const paper = PAPERS.find(p => p.id === activePaper);
  const PaperComponent = activePaper ? PAPER_COMPONENTS[activePaper] : null;

  if (!activePaper) {
    return <PaperLibrary papers={PAPERS} onSelect={setActivePaper} />;
  }

  return (
    <div>
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

      <footer className="reader-footer">
        <span>Paper Decoder &mdash; Deep-dive AI paper learning</span>
        <span>Scalable to N papers</span>
      </footer>
    </div>
  );
}
