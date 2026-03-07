# Changelog

All notable changes to web-search-plus-plugin are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) + [Semantic Versioning](https://semver.org/).

## [1.1.5] - 2026-03-07

### Changed
- 📖 **Expanded README** — provider comparison table with free tiers, auto-routing examples, tool parameter docs, CLI test commands, 8 FAQ entries, requirements section

## [1.1.4] - 2026-03-07

### Added
- 🔍 **Perplexity provider** added to README and `.env.template`
- 📦 **npm publish** — proper `files` list, `main`, `repository` fields in package.json

## [1.1.3] - 2026-03-06

### Added
- 🕒 **Perplexity freshness filter** — synced from web-search-plus v2.8.5

## [1.1.2] - 2026-03-05

### Security
- 🔒 **SSRF protection** — synced from web-search-plus v2.8.4. SearXNG instance URLs are validated against private IP ranges and cloud metadata endpoints

## [1.1.1] - 2026-03-04

### Fixed
- 🔧 **Perplexity results parsing** — synced from web-search-plus v2.8.3

## [1.1.0] - 2026-03-03

### Added
- 🔍 **Perplexity (Sonar Pro)** — new provider via direct API key or Kilo Gateway (`KILOCODE_API_KEY`)
- 🧠 **Auto-routing improvements** — Perplexity scored for direct-answer queries
- 🔄 Synced search.py with web-search-plus skill v2.8.0

## [1.0.2] - 2026-02-28

### Fixed
- 🔑 **`.env` loading** — plugin loads `.env` from its own directory with fallback to sibling skill path
- 🔒 **`.gitignore`** — `.env` added to prevent accidental key commits
- 📄 **`.env.template`** — added for easy setup

## [1.0.1] - 2026-02-27

### Added
- 📖 **You.com and SearXNG** providers documented in README

## [1.0.0] - 2026-02-26

### Added
- 🎉 **Initial release** — standalone OpenClaw plugin
- 🔍 Registers `web_search_plus` as native tool
- 🧠 Auto-routing across Serper, Tavily, Exa
- 📦 Bundled Python backend (`scripts/search.py`)
- 🛠️ Interactive setup wizard (`scripts/setup.py`)
- 💾 Local result caching
- ⚡ Graceful provider fallbacks
