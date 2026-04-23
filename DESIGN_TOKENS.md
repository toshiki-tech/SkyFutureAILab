# Design Tokens

Single source of truth for visual design. All colors, spacing, typography, shadows flow from `tailwind.config.ts`. Do **not** hardcode hex, rgb, or arbitrary pixel values in components — extend this doc and the config instead.

## Colors

### Brand — `primary` (slate-based neutral dark)

Brand's "black" / surface dark. Use for dominant backgrounds (Hero, Footer), body text on light bg (`primary-900`), and structural chrome.

- `primary-50 → 950` — full scale, 11 steps

### Brand — `accent` (gold `#b68d40`)

Only brand-expressive color. Use sparingly for CTAs, highlights, hover states. Do **not** use as body text color or surface fill.

- `accent-50 → 950` — full scale

### Semantic (forms & alerts)

- `success` — form success state, completed indicators
- `warning` — non-blocking caution
- `error` — field validation errors, destructive actions

### Neutral (`gray-*` from Tailwind default)

Kept as-is. Preferred usages:

| Token | Usage |
|---|---|
| `text-gray-900` | Headings, emphasized body |
| `text-gray-700` | Body, long-form reading |
| `text-gray-600` | Secondary body, meta info |
| `text-gray-500` | Avoid for body. OK for inline timestamps on white bg. |
| `text-gray-400` | Placeholders, disabled labels only |
| `bg-gray-50` | Section alternating background |
| `bg-gray-100` | Tag chips (neutral tone), subtle fills |
| `border-gray-200` | Default borders, dividers |

## Typography

Type scale in `tailwind.config.ts` `fontSize` — each step includes tuned `lineHeight` + `letterSpacing`. **Use Tailwind size classes; don't hardcode `leading-*` / `tracking-*` when a size class covers it.**

| Class | px | Role |
|---|---|---|
| `text-xs` | 12 | Micro meta, tags |
| `text-sm` | 14 | Secondary body, form labels |
| `text-base` | 16 | Default body |
| `text-lg` | 18 | Lead paragraph |
| `text-xl` | 20 | Small section header |
| `text-2xl` | 24 | Card title, subsection |
| `text-3xl` | 30 | Section title (mobile H2) |
| `text-4xl` | 36 | Page title (mobile H1) / Section title (desktop H2) |
| `text-5xl` | 48 | Hero title (desktop H1) |
| `text-6xl` | 60 | Display only |

Font family is tuned for JP (system stack today, Noto Sans JP via `next/font` planned in Block 12).

## Spacing

Default Tailwind spacing + extras:

- `spacing-18` (4.5rem), `22` (5.5rem), `26` (6.5rem), `30` (7.5rem) — section-scale rhythm

Section vertical padding is owned by `<Section size="sm|md|lg|xl">` — do not hand-tune `py-*` on pages.

## Radius

Tailwind defaults. Preferred:

- `rounded-md` — chips, buttons inside forms
- `rounded-lg` — buttons, inputs
- `rounded-xl` — cards
- `rounded-2xl` — hero blocks, CTA blocks
- `rounded-full` — pills, avatars

## Shadows

- `shadow-card` — default resting card
- `shadow-card-hover` — card on hover / interactive elevation
- `shadow-elevated` — modals, sticky CTA, overlays
- `shadow-glow` — accent gold subtle glow, use sparingly for hero/feature
- `shadow-glow-lg` — hero CTA emphasis

## Focus ring

Global `:focus-visible` is set in `app/globals.css` — keyboard-only 2px accent gold outline. Don't disable per-component unless replacing with equivalent visible indicator.

## UI Primitives

Located in `components/ui/`. Prefer these over hand-rolling.

| Component | Use for |
|---|---|
| `<Section bg size width>` | Page sections with consistent padding/width |
| `<SectionHeader eyebrow title description>` | Section titles |
| `<Button variant size href?>` | All clickable actions (primary/secondary/outline/ghost) |
| `<Chip active tone>` | Filter pills, techTags |
| `<Badge variant>` | Category labels (industry/problem/tag/semantic) |
| `<Card variant padding interactive href?>` | Any framed content block |
| `<CTABlock tone>` | End-of-page conversion block |
| `<ArticleMeta>` | Publish date + industry + problem + techTags row |
| `<Breadcrumb tone>` | Detail page breadcrumbs |

Import from `@/components/ui`:

```tsx
import { Section, SectionHeader, Button, Card } from '@/components/ui'
```

## Migration notes

- **Old** `components/Breadcrumb.tsx` still exists with a `light?: boolean` prop. New code must use `@/components/ui` version with `tone="light" | "dark"`. Old one will be removed once all pages migrate (Blocks 7–8).
- **Hardcoded `shadow-glow`** previously used blue; fixed to accent gold in `tailwind.config.ts`. Any existing hero using `shadow-glow` will automatically pick up the new color.
- **`cn()`** utility lives at `@/lib/utils` — use it to compose classes instead of template literals.
