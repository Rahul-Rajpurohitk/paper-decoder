# Agentic AI Systems Module — Build Plan (May 2026)

## Goal
Heavy enterprise-grade module on agentic AI in `paper-decoder`. Master-level depth, fresh May 2026 content, real frameworks, production trade-offs, three end-to-end enterprise project case studies.

## Module config
- **id**: `agentic-systems`
- **title**: Agentic AI Systems — Production Engineering
- **subtitle**: Frameworks, patterns, projects, trade-offs — May 2026
- **file**: `src/papers/agentic-systems/AgenticSystemsPaper.jsx`
- **target size**: 200KB+ (largest module in app)

## Sections (15)
1. The Agentic Era
2. Anatomy of an Agent
3. Tool Use & MCP
4. Memory Architectures
5. Planning & Reasoning
6. Multi-Agent Patterns
7. Framework Landscape
8. Production Stack
9. Cost & Latency
10. Security & Guardrails
11. Enterprise Project — Customer Support Agent
12. Enterprise Project — AI Software Engineer
13. Enterprise Project — Data Analyst Agent
14. Failure Modes & Anti-patterns
15. Mental Models & Resources

## Visual budget
- 15-20 custom inline SVG diagrams.
- Each section has at least one architecture / pattern visual.
- Trade-off matrices where applicable.

## Style
- HoverTerms (`<H>`) for every named concept (target 60+).
- FormulaSteps where math applies (loss formulas, eval metrics, cost models).
- Callouts for warnings, key insights.
- ProTips for production wisdom.
- No em dashes (per portfolio convention).
- Trade-offs explicitly called out.

## Research grounding
Every claim references a numbered file in `vault/research/agentic-ai-2026/`.
Synthesis at `00-SYNTHESIS.md` is the canonical summary.

## Sequence
1. Build module file (one big Write).
2. Wire into App.jsx (imports, PAPERS array, PAPER_COMPONENTS, PAPER_SECTIONS).
3. Build verify.
4. Commit + push.

## Out of scope (later)
- The user mentioned "later we will do more research in directions". Future iterations:
  - Deeper dives per framework (LangGraph deep, OpenAI Agents SDK deep).
  - Industry vertical deep dives (legal, healthcare, finance).
  - Agent benchmarks (SWE-bench, GAIA, etc).
  - Build out vault as we go.
