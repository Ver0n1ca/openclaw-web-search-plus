# 🔍 web-search-plus-plugin

**Multi-provider web search as a native OpenClaw tool.**

A standalone OpenClaw plugin that registers `web_search_plus` as a first-class tool with intelligent auto-routing. No skill dependency needed — install, configure, and go.

## ✨ Features

- **Intelligent auto-routing** — analyzes query intent and picks the best provider automatically
- **7 search providers** — use one or all, graceful fallback if any is down
- **Local result caching** — saves API costs on repeated queries
- **Interactive setup wizard** — guided configuration via `python3 scripts/setup.py`
- **Native OpenClaw tool** — registers as `web_search_plus`, not a skill

## 🔎 Supported Providers

| Provider | Best for | Free tier |
|----------|----------|-----------|
| **Serper** (Google) | Facts, news, shopping, local businesses | 2,500 queries/month |
| **Tavily** | Deep research, analysis, explanations | 1,000 queries/month |
| **Querit** | Multi-lingual AI search with rich metadata and real-time info | 1,000 queries/month |
| **Exa** (Neural) | Semantic discovery, finding similar content | 1,000 queries/month |
| **Perplexity** | AI-synthesized answers with citations | Via API key |
| **You.com** | Real-time RAG, LLM-ready snippets | Limited free tier |
| **SearXNG** | Privacy-first, self-hosted, $0 cost | Free (self-hosted) |

## 🧠 Auto-Routing Examples

The plugin analyzes your query and picks the best provider:

| Query | Routed to | Why |
|-------|-----------|-----|
| "iPhone 16 Pro price" | Serper | Shopping intent detected |
| "how does TCP/IP work" | Tavily | Research/explanation intent |
| "latest multilingual EV market updates" | Querit | Real-time AI search with metadata-rich results |
| "companies like Stripe" | Exa | Discovery/semantic intent |
| "what is quantum computing" | Perplexity | Direct answer intent |
| "latest news AI regulation" | Serper | News intent |

You can always override with `provider: "tavily"` (or any other) to force a specific provider.

## Original Repo
Modified fromhttps://github.com/robbyczgw-cla/web-search-plus-plugin (MIT License)
Changes by Nico Wu: TS build fixes, env support, OpenClaw registration

## 📦 Installation

### Clone

```bash
git clone https://github.com/Ver0n1ca/openclaw-web-search-plus.git
```

### build

```bash
cd web-search-plus-plugin
npm install
npm run build
```
This should generate dist/index.js file.

### Configure API Keys

```bash
cp .env.template .env
# Edit .env and add your API keys (at least one required)
```

### Add to OpenClaw Config

```json
{
  "plugins": {
    "load": {
      "paths": [
        "./node_modules/web-search-plus-plugin"
      ]
    },
    "entries": {
      "web-search-plus-plugin": {
        "enabled": true
      }
    }
  }
}
```

Restart your gateway after adding the plugin.

## 🔑 Environment Variables

Copy `.env.template` to `.env` and add at least one API key:

| Variable | Provider | Sign up |
|----------|----------|---------|
| `SERPER_API_KEY` | Serper (Google) | [console.serper.dev](https://console.serper.dev) |
| `TAVILY_API_KEY` | Tavily | [tavily.com](https://tavily.com) |
| `QUERIT_API_KEY` | Querit | [querit.ai](https://querit.ai) |
| `EXA_API_KEY` | Exa | [exa.ai](https://exa.ai) |
| `PERPLEXITY_API_KEY` | Perplexity | [perplexity.ai](https://docs.perplexity.ai) |
| `KILOCODE_API_KEY` | Perplexity via Kilo | [kilocode.ai](https://kilocode.ai) |
| `YOU_API_KEY` | You.com | [you.com/api](https://you.com/api) |
| `SEARXNG_URL` | SearXNG (self-hosted) | [docs.searxng.org](https://docs.searxng.org) |

## 🤖 Enable for an Agent

Allow the tool in your agent config:

```json
{
  "agents": {
    "list": [
      {
        "name": "my-agent",
        "tools": {
          "allow": ["web_search_plus"]
        }
      }
    ]
  }
}
```

## 🛠️ Tool Parameters

The registered `web_search_plus` tool accepts:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search query |
| `provider` | string | ❌ | Force a provider: `serper`, `tavily`, `querit`, `exa`, `perplexity`, `you`, `searxng`, or `auto` (default) |
| `count` | number | ❌ | Number of results (default: 5) |

## 🧪 Test Directly

You can test the search script standalone:

```bash
# Auto-route
python3 scripts/search.py -q "your query here"

# Force a specific provider
python3 scripts/search.py -q "your query" -p tavily

# More results
python3 scripts/search.py -q "your query" --max-results 10
```

## ❓ FAQ

### Do I need all 7 providers?
No. The plugin works with just one API key. Configure whichever providers you have — the auto-router will use what's available and skip what's not.

### What's the difference between this plugin and the `web-search-plus` skill?
The **plugin** registers a native tool that any agent can use directly. The **skill** provides a SKILL.md with instructions for the agent. Both use the same search backend. Use the plugin for cleaner integration — it's the recommended approach.

### Do I need Python?
Yes, Python 3 is required. The search logic runs as a Python script. Most Linux servers and macOS have Python 3 pre-installed.

### How does auto-routing work?
The router scores each provider based on query signals — keywords like "price" or "buy" boost Serper, deep explanation queries boost Tavily, multilingual or metadata-rich real-time search can favor Querit, semantic/discovery queries boost Exa, and direct questions boost Perplexity. The highest-scoring provider wins.

### Does it cache results?
Yes. Results are cached locally in a `.cache/` directory inside the plugin folder. Identical queries return cached results instantly and don't consume API credits. Cache is file-based and survives restarts.

### Can I use Perplexity through Kilo Gateway?
Yes. Set `KILOCODE_API_KEY` in your `.env` — the plugin routes Perplexity requests through the Kilo Gateway automatically. You can also use a direct `PERPLEXITY_API_KEY`.

### What about SearXNG?
SearXNG is a self-hosted meta search engine that aggregates 70+ sources. It's free but requires your own instance. The plugin validates the instance URL on setup and includes SSRF protection for security.

### Does it work in sandboxed agents?
Yes, as long as the tool is allowed in the agent's tool config. The plugin runs on the host alongside the gateway.

## 📋 Requirements

- **OpenClaw** gateway (any recent version)
- **Python 3** (3.8+)
- At least **one API key** from a supported provider

## 📄 License

MIT
Modified from robbyczgw-cla/web-search-plus-plugin (MIT License)
Changes by Nico Wu: TS build fixes, env support, OpenClaw

## 👤 Maintainer

**Nico Wu** — [GitHub](https://github.com/Ver0n1ca)
