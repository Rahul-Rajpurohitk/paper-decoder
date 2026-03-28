# Paper Decoder — Rebuild Design Spec

## Goal
A proper AI paper learning app. Scalable to N papers. Portfolio-grade visuals. Genuinely useful for deep learning.

## Architecture
- React + Vite, hosted on Vercel
- KaTeX for math rendering
- Custom SVG diagrams (no base64 screenshots)
- CSS modules for styling
- Per-paper folder structure under `src/papers/`

## Component Library
- FormulaBlock: KaTeX + symbol glossary
- DiagramSVG: Architecture/pipeline SVGs
- ConceptCard, StepFlow, ComparisonTable, StatBar, Callout, SectionHeader, SymbolGlossary, MentalModel
- PaperLibrary: Home page

## Content Pattern (per concept)
1. Why (human language)
2. Visual (SVG diagram)
3. Math (KaTeX)
4. Symbol Glossary
5. Intuition / Mental Model
6. So What?

## Papers
1. MSA: Memory Sparse Attention (100M tokens)
2. TurboQuant: Online Vector Quantization

## Design System
- Dark theme (#0a0f1a base)
- Inter + JetBrains Mono + Instrument Serif
- Per-paper accent colors
- Glassmorphism-lite cards
- Generous spacing
