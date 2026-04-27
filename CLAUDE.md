# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SkyFuture AI Lab — a Japanese corporate site about DX support using Microsoft 365 / Power Platform / Dynamics 365 / generative AI. Next.js 14 (App Router) front-end backed by Sanity CMS, with Sanity Studio embedded in the same Next app at `/studio`.

## Common commands

```bash
npm run dev           # Next dev server on :3000 (also serves Studio at /studio)
npm run build         # Production build
npm run start         # Run production build
npm run lint          # next lint (extends next/core-web-vitals)
npm run sanity        # Standalone Sanity Studio on :3333 (alternative to embedded /studio)
npm run sanity:deploy # Deploy Studio to sanity.io
```

No test framework is configured.

`.npmrc` sets `legacy-peer-deps=true` — `npm install` will fail without it because of peer-dep mismatches between Sanity, styled-components, and React 18. Don't remove it.

## Environment

Before running anything, copy `env.local.template` to `.env.local` and fill:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (usually `production`)
- `SANITY_API_READ_TOKEN` (optional, for private content)
- `SANITY_API_READ_WRITE_TOKEN` (only for `scripts/migrate-to-sanity.ts` — Editor-role token; not used by the Next runtime)

### One-shot mock → Sanity migration

`scripts/migrate-to-sanity.ts` imports everything in `lib/content/*` into the configured dataset using `client.createOrReplace`, so it's idempotent. Run via the `tsx` loader hook (devDep):

```bash
node --env-file=.env.local --import tsx scripts/migrate-to-sanity.ts --dry-run   # writes migration-dryrun.json, no network writes
node --env-file=.env.local --import tsx scripts/migrate-to-sanity.ts --apply     # actually writes
```

`_id` convention used: `ind-*` (industryCategory), `svc-*` (service), `method-*`, `col-*` (column), `case-*`, plus the singleton `ctaConfig.singleton`. Reuse these prefixes if you add new mock entries you intend to re-import. The script does NOT migrate `featuredImage` (mock images are external URLs, not Sanity assets).

Both `sanity/lib/client.ts` and `sanity.config.ts` silently fall back to placeholder values when env is missing (client uses `'dummy'`, Studio uses `'your-project-id'` with a `console.warn`). Neither throws on boot, so "queries return nothing / Studio shows an error screen" often means `.env.local` is missing — check it first.

## Architecture

### Routing (app/ directory)

All user-facing routes use English path segments. The Japanese paths that existed earlier (`/無料相談`, `/資料請求`) were removed; `/contact` and `/request` replaced them. `app/サービス/[slug]/` and `app/会社紹介/` are **empty leftover directories** — not active routes. Don't add pages there; use `/service/[slug]` and `/about` instead.

Active routes:

- `/` (home), `/about`, `/search`
- `/cases`, `/cases/[slug]` — case studies
- `/method`, `/method/[slug]` — method articles (singular `method` is canonical)
- `/service`, `/service/[slug]` — services
- `/column`, `/column/[slug]` — column articles. Backed by Sanity (`column` schema). The list/detail pages fetch from Sanity first and fall back to `mockAllColumns` / `mockColumnDetails` when no documents exist or the fetch fails (handy for local dev without `.env.local`).
- `/contact` — 無料相談 form
- `/request` — 資料請求 landing page
- `/studio/[[...index]]` — embedded Sanity Studio (catch-all route). Mounted at `basePath: '/studio'` in `sanity.config.ts`.

`NAV_LINKS` in `lib/constants.ts` is the source of truth for the header menu.

### Form submissions (`/contact`, `/request`)

Both forms POST to Next.js API routes (`app/api/contact/route.ts`, `app/api/request/route.ts`) which validate server-side and write to Sanity as `contactSubmission` / `requestSubmission` documents. The browser bundle never sees the write token — `sanity/lib/writeClient.ts` is server-only and uses `SANITY_API_READ_WRITE_TOKEN`.

In Studio, submissions live under "📨 送信フォーム" (separate from "📝 コンテンツ"). Each submission has `status` (未対応 / 対応中 / 完了 / 不要対応) + `internalNotes` editable; all user-submitted fields are `readOnly: true` (UI hint only — the API still writes them via the write token). `agreedToPrivacy` + `submittedAt` are stored as legal evidence of consent.

No email notification is wired up — submissions are pull-only via Studio.

### Content model (Sanity schemas in `sanity/schemas/`)

Six document types + two submission types + four reusable content-block objects, registered in `sanity/schemas/index.ts`:

- **case** (`事例`) — `problem` (radio, 6 fixed Japanese options hardcoded in `case.ts`), `industry` (reference to `industryCategory`, **required**), `techTags` (multi, free-form options hardcoded in `case.ts`), plus `content`, `featuredImage`, `seo`, `featured`.
- **method** (`メソッド`) — `techTags` is **required, min 1**. Same tag option list as `case`.
- **service** — simpler: title, content, featuredImage, optional techTags.
- **column** (`コラム`) — `category` (radio, fixed list in `column.ts`), `author`, `techTags`, `excerpt`, `content`, `featuredImage`, `seo`, `featured`. Same tag option list as `case`/`method`. Category list is independent and lives only in `column.ts`.
- **industryCategory** — reference doc used to filter cases. Has `value` (URL slug), `displayName`, `order`.
- **ctaConfig** — singleton (`_id: ctaConfig.singleton`) for primary/secondary CTA buttons. Edit at Studio → ⚙️ サイト設定 → CTA 設定. If this document doesn't exist, Hero and StickyCTA render nothing — see `SANITY_INIT.md`.
- **contactSubmission** / **requestSubmission** — form submissions written by `/api/contact` and `/api/request`. Status field for tracking; submission data fields are `readOnly` in Studio.

Custom Portable Text blocks (in `sanity/schemas/objects/`, available inside every `content` field):

- **callout** — tone (`info`/`tip`/`warning`/`danger`) + optional title + body (Portable Text).
- **linkCard** — reference to a `case`/`method`/`service`/`column` doc + optional label + note. Detail-page GROQ queries dereference it via the shared `contentProjection` fragment in `lib/sanity/queries.ts`; if you add a new query that exposes `content`, include `${contentProjection}` so the card resolves.
- **metric** — 1–4 KPI items (`value` + `label` + optional `note`), grid auto-sized in the renderer.
- **codeBlock** — `language` (predefined list) + optional `filename` + `code`. Plain `<pre>` rendering, no syntax highlighting (install `@sanity/code-input` + a highlighter later if needed).

The hardcoded tag/problem/category option lists are duplicated between `case.ts`, `method.ts`, `column.ts`, and the union types in `types/index.ts` (`CaseProblem`, `TechTag`). Keep them in sync when adding values.

### Sanity access layer

- `sanity/lib/client.ts` — shared `createClient` instance. `useCdn` on in production only.
- `lib/sanity/queries.ts` — **all GROQ queries live here**. When adding a page that reads Sanity data, add the query here rather than inlining.
- `lib/sanity/image.ts` — `@sanity/image-url` helper.

Key query patterns worth knowing:

- `casesQuery` / `methodsQuery` use `!defined($param)` guards so the same query handles both "list all" and "filtered by problem/industry/techTag". Pass `undefined` to skip a filter.
- `industry` is dereferenced inline (`industry->{...}`) — callers get the displayName, not just the ref.
- `relatedCasesQuery` / `relatedMethodsQuery` find related content via `count(techTags[@ in $techTags]) > 0` — items with zero `techTags` on either side will never relate.
- `searchQuery` returns `{cases, methods, services, columns}` in one request. Note: `/search` (`app/search/page.tsx`) is a client component still backed by mock data and currently consumes only the first three buckets — wire it to `searchQuery` if you want Sanity-backed search.
- Every list/detail query projects a normalized `seo` object using `coalesce(seo.field, fallback)` — components can render SEO metadata without per-case fallback logic.

### Embedded Studio

`app/studio/[[...index]]/page.tsx` renders the Studio inside the Next app via `next-sanity/studio`. `sanity.config.ts` has `basePath: '/studio'`. This is why the same project ships both `npm run dev` (Studio at `http://localhost:3000/studio`) and `npm run sanity` (standalone Studio at :3333). Content edits from either path go to the same dataset.

### TypeScript

- Path alias: `@/*` → project root (used as `@/components/...`, `@/lib/...`).
- `strict: true` is on.
- Types for Sanity documents live in `types/sanity.ts`; shared types and union string types re-exported from `types/index.ts`.

### Styling / assets

- Tailwind is the primary styling system; `styled-components` is also a runtime dep (used in Studio-adjacent code and some ornate components — don't reach for it for new plain components, prefer Tailwind).
- `next.config.js` only whitelists `cdn.sanity.io` for remote images. Any new external image host must be added there.
- Static imagery lives in `public/images/` (hero backgrounds, logos, CEO portrait, etc.). Components reference them by absolute path like `/images/method-hero.png`.

## Sanity Studio bootstrap

Before the site renders correctly, Studio must have at least one `ctaConfig` doc and several `industryCategory` docs. Full bootstrap checklist and a suggested industry list are in `SANITY_INIT.md`. If the cases page errors with `Unable to parse value of $industry=undefined`, the cause is a case document missing its (required) industry reference.
