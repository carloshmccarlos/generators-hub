# Architecture

## Overview
The app is a multi-surface Vinext App Router project with a hub shell at `/`, two live tool routes, and a set of static guide pages.
The hub owns discovery and routing. TikTok Comment owns the server-backed generation flow. Sequence Generator owns a pure client-side math flow. Static guide pages handle SEO and concept discovery for sequence-related queries.
Because the repo uses a custom Vite config, Vinext still wires the App Router through manual `@vitejs/plugin-rsc` entries.
The visual layer stays light and compact so the hub remains minimal while tool and guide pages preserve short copy and dense utility.
The root layout owns shared metadata, viewport, favicon links, and site-wide JSON-LD.
Cloudflare deployment still uses `@cloudflare/vite-plugin` plus the generated `wrangler.jsonc` and `worker/index.ts` scaffold.

## Request Flow
1. Vinext boots the App Router through the explicit RSC, SSR, and browser entries defined in `vite.config.ts`.
2. `app/layout.tsx` emits shared metadata and JSON-LD before either page renders.
3. The hub page reads from the tool registry and exposes two live tools plus a generic coming-soon section in a compact catalog-style directory layout.
4. TikTok users open `/tools/tiktok-comment`.
5. The TikTok tool page renders the generator shell and its back-to-hub entry.
6. Client input is validated and posted to `/api/tools/tiktok-comment/generate`.
7. The server builds system and user prompts.
8. The server calls SiliconFlow through its OpenAI-compatible `chat/completions` API.
9. The server validates the model payload.
10. The server filters duplicates, near-duplicates, unsafe lines, and AI-sounding openers.
11. The server returns grouped comments to the client.
12. The client renders grouped results and copy actions.
13. Sequence users open `/tools/sequence-generator`.
14. The Sequence Generator page validates local form state, generates the requested sequence in the browser, computes summary/chart/CSV data, and renders the result without a server round-trip.
15. Guide-page visitors open one of the static sequence routes and receive route-level metadata plus static structured content.
16. Search crawlers and AI systems use the shared metadata, route metadata, sitemap, robots file, and llms.txt to understand the site without needing hidden content.

## Deployment Flow
1. `vinext deploy` emits `wrangler.jsonc` and `worker/index.ts` when the Cloudflare scaffold is missing.
2. `vite.config.ts` must include `@cloudflare/vite-plugin` so the RSC environment runs in workerd during Cloudflare builds.
3. Wrangler serves `dist/client` as static assets and routes requests through the generated Worker entry.
4. Local dev compatibility date is pinned to `2026-04-17` so `vinext dev` matches the currently bundled workerd support window.
5. The repo deploy script runs the build step first, then invokes local Wrangler to publish the generated Cloudflare bundle.

## Crawl Surface
1. `public/robots.txt` exposes the canonical production URL and sitemap.
2. `public/sitemap.xml` lists the hub home, both tool routes, and the static guide routes with freshness hints.
3. `public/llms.txt` gives AI crawlers a compact, citation-friendly summary of the hub, the two live tools, and the key sequence guide routes.
4. `app/layout.tsx` emits canonical, social, and JSON-LD metadata from the same base URL.
5. Route-level metadata and structured data keep each public page independently indexable and citation-ready.

## Public Data Shapes
- `toolRegistry`
- `ToolSummary`
- `ToolStatus`
- `GenerateCommentInput`
- `LanguageCode`
- `CommentGoalId`
- `ToneId`
- `CommentGroupKey`
- `GeneratedComments`
- `SequenceMode`
- `SequenceDraft`
- `SequenceResult`
- `SequencePoint`
- `Route-specific metadata and structured data from `app/tools/*/page.tsx` and the guide pages`

## Server Responsibilities
- Normalize the request body.
- Build prompts from constants and examples.
- Call SiliconFlow with a 60s timeout.
- Disable thinking so the model emits the final JSON payload instead of mixing in reasoning text.
- Default to `deepseek-ai/DeepSeek-V4-Flash` when no model is supplied.
- Validate the raw response shape.
- Apply comment filtering and group-level minimum checks.
- Return a small JSON error on failure.

## Client Responsibilities
- Keep the hub page minimal.
- Keep tool pages compact and single-purpose.
- Keep guide pages text-first and scan-friendly.
- Show validation, loading, timeout, and error states.
- Copy single comments and whole groups.
- Generate sequence values locally for arithmetic, geometric, fibonacci, random, and formula modes.
- Validate sequence inputs, compile formula expressions safely, and block non-finite or oversized values.
- Generate CSV export blobs and lightweight inline SVG chart points from the sequence result.
- Scroll to results after a successful generation on mobile.
- Keep paired select controls visually even by reusing shared field styling.
- Keep the client timeout at 35s so the server can return a controlled 504 before the browser aborts the request.
- Enforce a 30s cooldown between generations so the API is not hammered on repeated attempts.
- Keep prompts compact to reduce latency and make timeout failures less likely.
- Keep metadata and icon work in the layout and `public/` assets rather than adding new UI components.

## Non-Goals
- No database.
- No account system.
- No comment history across sessions.
- No digital electronics simulator.
- No sequence API route or third-party tool integration.
- No client-side call to SiliconFlow.

## Component Registry
| Area | Role |
|------|------|
| `app/page.tsx` | Hub entry route |
| `app/tools/tiktok-comment/page.tsx` | Live tool route |
| `app/tools/sequence-generator/page.tsx` | Live sequence tool route |
| `components/hub/index.tsx` | Hub UI shell |
| `components/hub/tool-card.tsx` | Registry-backed hub tool card |
| `components/tools/tiktok-comment/index.tsx` | Tool page wrapper |
| `components/tools/sequence-generator/index.tsx` | Sequence tool wrapper |
| `components/comment-assistant/*` | TikTok generator internals |
| `components/sequence-generator/*` | Sequence generator internals |
| `app/*.page.tsx` sequence guides | Static SEO content pages |
