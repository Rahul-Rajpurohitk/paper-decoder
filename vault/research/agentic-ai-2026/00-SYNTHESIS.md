# Agentic AI Systems — May 2026 Synthesis

> Compiled from 16 firecrawl searches on 2026-05-01. Source files: `01-*` through `16-*`.
> All searches filtered to last-month time window for freshness.

## The Landscape (May 2026)

### Foundation models that drive agents
- **Claude Opus 4.7** (Anthropic) — flagship reasoning + Computer Use. 1M context.
- **Claude Sonnet 4.6** — production workhorse. Tool use, structured output, streaming.
- **Claude Haiku 4.5** — fast/cheap path for high-volume agents.
- **GPT-5 / o3 family** (OpenAI) — Agents SDK as first-class deployment surface.
- **Gemini 2.5 Ultra** (Google) — Project Astra, Agent Development Kit (ADK).
- **DeepSeek V3.5 / R1.5** — open-weight competition; widely deployed in cost-sensitive enterprise.
- **Llama 4** — Meta's open-weight, MoE-based, strong on tool calling.

### Frameworks — winners as of May 2026
1. **LangGraph** (LangChain) — production leader. State machine + checkpointing + LangSmith.
2. **CrewAI** — role-based multi-agent. Quick to prototype; popular for ops automation.
3. **OpenAI Agents SDK** — handoffs as first-class primitive; tight integration with OpenAI stack.
4. **Anthropic SDK + Computer Use** — direct Claude tool loop; minimal abstraction; strong with MCP.
5. **Pydantic AI** — typed Python agents with structured output as a first principle.
6. **Microsoft Agent Framework** — Azure-integrated; positioned as enterprise default.
7. **Google ADK** (Agent Development Kit) — Vertex-native; works with Gemini.
8. **Mastra** — TypeScript-native; strong Vercel/edge story.
9. **Swarms** — director-worker harness. Open-source.
10. **AutoGen** (Microsoft Research, open) — programmable multi-agent conversations.

### MCP (Model Context Protocol) — the universal connector
- **Origin**: Anthropic, November 2024. Open spec.
- **Wire format**: JSON-RPC 2.0 over stdio or HTTP.
- **Adopters**: GitHub, Cloudflare, Stripe, Microsoft Fabric, OpenAI (Apr 2026 announcement), Google.
- **Components**: Tools (callable functions), Resources (data sources), Prompts (templates).
- **Spec health**: Versioned, with breaking-change notices. April 2026 design flaw on auth scope flagged at 200K servers.
- **Roadmap**: Streaming-first transport, agent-to-agent (A2A) extension, signed tool manifests.

## Multi-Agent Architecture Patterns (six canonical forms)

| Pattern | Topology | Strength | When to use |
|---|---|---|---|
| **Single agent + tools** | 1 agent, N tools | Simplest, easy to debug | <80% of jobs |
| **Orchestrator-worker** | 1 supervisor → N workers | Clear control flow | Variable subtask count |
| **Pipeline** | Linear chain | Deterministic, predictable | Strict ordering |
| **Hierarchical** | Tree of supervisors | Enterprise scale, separation of concerns | Org-mirroring tasks |
| **Swarm** | Peers, handoffs | Specialist routing | Customer support / triage |
| **Mesh** | All-to-all | Maximum flexibility | Research workloads |

## Production Stack (May 2026 default)

```
┌─────────────────────────────────────────────────────┐
│  Application Layer (UI / API / Slack / Email)       │
├─────────────────────────────────────────────────────┤
│  Agent Orchestration (LangGraph / Agents SDK)       │
├─────────────────────────────────────────────────────┤
│  Eval + Observability (LangSmith / Braintrust /     │
│    Phoenix / Helicone / Galileo / Maxim / Datadog)   │
├─────────────────────────────────────────────────────┤
│  Tool Layer (MCP servers, internal APIs, RAG)        │
├─────────────────────────────────────────────────────┤
│  Memory (Redis short-term, Postgres+pgvector long,   │
│    Mem0 / Zep / Letta for episodic)                  │
├─────────────────────────────────────────────────────┤
│  Model Routing (LiteLLM / OpenRouter / Portkey)      │
├─────────────────────────────────────────────────────┤
│  Foundation Models (Claude / GPT-5 / Gemini)         │
└─────────────────────────────────────────────────────┘
```

## Trade-offs to Make Explicit

### Cost
- Prompt caching cuts 50–90% on stable system prompts.
- Model routing (cheap → expensive) saves ~3× on aggregate.
- Parallel tool calls reduce wall-time without increasing token cost.

### Latency
- Streaming responses + speculative tool execution.
- Edge inference (Mastra + Vercel + Cloudflare Workers AI).
- Local model routing for low-latency hops (Haiku 4.5 for routing).

### Reliability
- LLM-as-a-judge eval pipelines run in CI.
- Human-in-the-loop sampling on production traces.
- Trace-native observability (OpenTelemetry standard, OTel-LLM extensions).

### Security
- Prompt injection: input sanitisation, output validation, structured-only tool args.
- Jailbreaks: model-side guardrails (Constitutional AI, Anthropic), regex layer for known attacks.
- Sandboxing: code execution in containers (E2B, Modal, Daytona); per-call ephemeral runtimes.
- MCP auth: per-tool scope tokens, recent flaw in default config flagged April 2026.

## Enterprise Deployment Patterns (real, May 2026)

1. **Customer support agent** — Klarna, Intercom Fin, Zendesk AI. Handles 60–80% of tier-1 tickets.
2. **AI software engineer** — Devin (Cognition), Cursor, Replit Agent, GitHub Copilot Agent.
3. **Data analyst agent** — Hex AI, Mode, Snowflake Cortex, Databricks Genie.
4. **Sales / SDR agent** — 11x.ai, Regie, Cresta. Outbound prospecting + email drafting.
5. **Operations agent** — Decagon, Sierra, Crescendo. Ops automation in regulated industries.

## Module Plan — `agentic-systems`

**Title**: Agentic AI Systems — Production Engineering (May 2026)
**Subtitle**: Frameworks, patterns, projects, trade-offs — the complete picture

### Sections (15)
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

### Visual targets per section
- Architecture diagram(s)
- Pattern visual where applicable
- Trade-off matrix
- Real-world example callout
- HoverTerms with definitions

### File size target: 200KB+ (largest module yet)
