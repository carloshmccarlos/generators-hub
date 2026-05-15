# Tech Stack

## Frontend
- Vinext
- Vite 8
- React 19
- Custom Vinext Vite config uses manual `@vitejs/plugin-rsc` entries with `vinext({ rsc: false })`
- Cloudflare Workers deploys require `@cloudflare/vite-plugin` in `vite.config.ts`
- Tailwind CSS 4
- Root-level `DESIGN.md` keeps the visual system aligned
- The hub uses a light, catalog-like directory shell and concise cards
- The hub home uses short copy, restrained static layout, editorial spacing, and registry-driven tool cards
- Hub card presentation lives in a separate component file to preserve one React component per file
- Tool pages keep the existing compact form and result layout
- Static guide pages use the same shell and short-form editorial layout
- Shared field classes keep paired inputs and selectors aligned with equal visual spacing
- Client and server generation timeouts are intentionally staggered so the UI waits slightly longer than the upstream API budget
- SiliconFlow chat completion requests disable thinking so the model returns the completed JSON answer without reasoning text
- Prompt size is kept compact to reduce upstream generation latency
- Modular component architecture enforces one React component per file
- `app/layout.tsx` owns global metadata wiring and JSON-LD
- Page-level metadata comes from each route file so tools and guide pages stay independently indexable
- Static share and favicon assets live in `public/` so metadata stays lightweight and cacheable
- `vinext deploy` generates `wrangler.jsonc` and `worker/index.ts` for the Cloudflare runtime
- `wrangler.jsonc` declares the production custom domain route for `generators.317713.xyz`
- `wrangler.jsonc` sets `keep_vars: true` so dashboard variables survive deploys
- `pnpm run deploy` passes `--keep-vars` to Wrangler so dashboard variables are preserved during deploys
- Local development currently pins `wrangler.jsonc` `compatibility_date` to `2026-04-17` to match the bundled workerd runtime
- Static crawl files live in `public/` as `robots.txt`, `sitemap.xml`, and `llms.txt`
- `lib/site.ts` now describes the hub shell
- `lib/site.ts` and the shared structured data helpers keep SEO and GEO metadata in one place
- Route-level JSON-LD is used for the hub, tool pages, and guide pages so AI crawlers can extract intent without rendering the full UI
- `lib/tools/registry.ts` is the single source of truth for hub tool cards and statuses
- Canonical metadata keeps `https://generators.317713.xyz/` as the production base URL
- `public/sitemap.xml` includes explicit crawl URLs and freshness hints
- `public/llms.txt` provides a compact, citation-friendly site map for AI systems
- `public/robots.txt` points crawlers to the canonical sitemap and keeps API routes out of indexation
- Sequence Generator is a pure client-side tool and does not add an API route
- Sequence charts use inline SVG, not a charting library
- Formula evaluation uses a restricted parser/compiled function instead of a third-party math library

## Runtime
- Cloudflare Workers-compatible deployment
- Route handlers served from the app router
- `vinext dev` uses the printed local URL; do not assume port `3000` if another process is already bound there
- Generation waits up to 60s on the server and 35s on the client before surfacing a timeout
- A 30s cooldown is enforced between TikTok Comment generations to prevent API hammering

## AI
- SiliconFlow API via server-side fetch
- OpenAI-compatible chat completions endpoint
- Default model: `deepseek-ai/DeepSeek-V4-Flash`
- Shared AI client lives in `lib/silicon.ts`
- Default generation settings use `max_tokens: 2000`, `temperature: 0.85`, `top_p: 0.85`, `top_k: 50`, `frequency_penalty: 0.1`, and `enable_thinking: false`

## Storage
- No database
- `localStorage` only for tool-scoped client state
- `generator-hub:tiktok-comment:draft` stores TikTok form drafts
- `generator-hub:sequence-generator:draft` stores Sequence Generator form drafts

## Tooling
- pnpm only
- TypeScript
- Vitest for tests
- Wrangler for Cloudflare deployment config
- Cloudflare Workers via Vinext deploy
- `pnpm run deploy` builds first, then hands off to local Wrangler for the Cloudflare publish step

## Environment Variables
- `SILICON_API_KEY`
- `SILICON_MODEL` defaults to `deepseek-ai/DeepSeek-V4-Flash`
- `SILICON_BASE_URL` defaults to `https://api.siliconflow.cn/v1`
- `KEY` is accepted as a local fallback for the existing environment key slot
- Google verification file lives in `public/google7cfc68ab913bcd14.html`
