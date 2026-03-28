# Paper Decoder — by Atikan (अति-कण)

Deep-dive deconstructions of frontier AI/ML research papers. Every formula explained. Every design choice justified.

## Papers Included
1. **Memory Sparse Attention (MSA)** — End-to-End Memory Model Scaling to 100M Tokens (NeurIPS 2026)
2. **TurboQuant** — Online Vector Quantization with Near-optimal Distortion Rate (arXiv 2025) + QJL linked paper

## Deploy on Vercel
```bash
npm install
npm run dev        # local dev
npm run build      # production build
```

Or just push to GitHub and connect to Vercel — zero config needed.

## Adding New Papers
1. Add entry to `PAPERS` array in `src/App.jsx`
2. Create a `NewPaperModule()` function using shared components
3. Add one line to the router in the main `App` component

## Stack
- Vite + React 18
- Zero external UI dependencies
- Paper figures extracted and embedded as base64
