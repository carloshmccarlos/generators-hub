# Generator Hub PRD v3.0

## Product Summary
Generator Hub is a compact front door for practical web generators. TikTok Comment and Sequence Generator are the two live tools in this release. Static SEO guides support the data-engineering search intent around "sequence generator" without turning the product into a content-heavy marketing site.

Search and AI discovery are part of the product surface. The site should stay compact, indexable, and easy for AI systems to cite.

## Product Shape
- `/` is the hub home and shows only tool entry points plus a short status area.
- `/tools/tiktok-comment` is the live tool page for TikTok comment generation, incorporating both the interactive generator and inline About & FAQ sections at the bottom.
- `/tools/sequence-generator` is the live tool page for math sequence generation.
- `/tools/bible-verse` is the live tool page for generating random bible verses.
- Static guide routes support discovery for Informatica, IICS, Snowflake, and concept intent:
  - `/informatica-sequence-generator`
  - `/informatica-sequence-generator-config`
  - `/iics-sequence-generator`
  - `/snowflake-sequence-generator`
  - `/sequence-generator-meaning`
- Tool pages are isolated by route and by localStorage namespace.

## Design Direction
- Hub home is a typographic-indexed tool directory: tools displayed as large numbered entries (01, 02, 03) rather than a bento card grid.
- No About or FAQ sections on the home page; maintain strict minimalism and focus only on the tools.
- TikTok Comment Generator page uses an optimized two-column side-by-side layout on desktop (Form input on the left, Results panel on the right) with an aligned two-column side-by-side inline About (left, 5 columns) and FAQ (right, 7 columns) section at the bottom.
- Font pairing: **Libre Baskerville** (display/headings, crisp classical serif) + **Geist** (body/UI, geometric sans). Neither are generic AI defaults.
- Color accent: copper-amber `oklch(58% 0.14 65)` for live status indicators and TikTok Comment active UI selections, alongside deep ink foreground on warm cream background.
- Remove nested card-in-card patterns. Flat, typographically-driven hierarchy replaces doubled borders.
- Keep page copy short.
- Use the existing light visual system with restrained borders, predictable spacing, editorial proportion, and minimal motion.
- Keep tool UIs compact, fast, and touch-friendly.
- Keep guide pages text-first, structured, and easy to scan.
- Treat SEO, social preview, favicon, Google verification, robots, sitemap, and llms.txt as part of the product shell.
- Use JSON-LD and metadata to make the hub, tool pages, and guide pages easy to understand for search engines and AI crawlers.
- Keep Cloudflare deployment one-command through Vinext and the Workers runtime.
- Treat `https://generators.317713.xyz/` as the canonical domain for crawl and share metadata.
- Preserve Cloudflare dashboard variables on deploy with `keep_vars: true` so environment configuration does not get wiped.
- Ship crawl files for search and AI discovery without adding marketing pages.

## Scope
- Hub home with two live tool cards and a generic coming-soon section.
- TikTok Comment tool page with the existing server-backed generator flow.
- TikTok Comment generation uses the server-side SiliconFlow provider configuration from environment variables.
- Sequence Generator tool page with a pure client-side math generator flow.
- Static guide pages for the data-engineering and concept-search intent around "sequence generator."
- Modular component architecture, one React component per file.
- Site-wide metadata, route-level canonical tags, and AI-readable structured data.
- `robots.txt`, `sitemap.xml`, and `llms.txt` tuned for crawl and citation discovery.

## In Scope
- Hub home route, two tool routes, and five guide routes.
- Tool registry for hub navigation and metadata.
- Hub-level, tool-level, and guide-level metadata.
- Sequence Generator modes:
  - `arithmetic`
  - `geometric`
  - `fibonacci`
  - `random`
  - `formula`
- Sequence output summary, list view, copy action, CSV export, and lightweight SVG chart.
- Tool-scoped draft state in `localStorage`.
- Inline validation, loading, timeout, and error states.
- Mobile-friendly layout.

## Out of Scope
- Sequence Generator server API or third-party integrations.
- Digital electronics simulator.
- Account systems, server storage, or history.
- Marketing pages.
- Backward compatibility for old routes or storage keys.
- Dark mode toggle.

## Content Rules
- Guide pages stay factual, compact, and implementation-oriented.
- Guide pages use short intros, parameter or syntax tables, steps, code blocks, FAQ, and related links.
- TikTok comments must sound native and platform-aware.
- No hate speech, slurs, or personal attacks.
- `debate_starter` must stay respectful and non-abusive.
- Short comments should stay concise.

## Success Criteria
- Users can open the hub, find both live tools above the fold on common desktop/tablet layouts, and launch either one from the home page.
- Sequence Generator can generate, copy, chart, and export math sequences without an account.
- Guide pages are indexable with distinct metadata and crawl entries.
- Mobile users can complete both tool flows without layout issues.
- The app does not store user input on the server.
- Search engines can crawl every public route without guessing the canonical domain.
- AI systems can extract the purpose, live tools, and guide routes from metadata and llms.txt without reading the full UI.
