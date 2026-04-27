/**
 * One-shot migration: import all mock content from lib/content/* into the
 * configured Sanity dataset.
 *
 * Run:
 *   node --env-file=.env.local node_modules/.bin/tsx scripts/migrate-to-sanity.ts --dry-run
 *   node --env-file=.env.local node_modules/.bin/tsx scripts/migrate-to-sanity.ts --apply
 *
 * Or via npx (no install needed):
 *   node --env-file=.env.local --import=tsx/esm scripts/migrate-to-sanity.ts --dry-run
 *
 * Idempotent: uses createOrReplace keyed by the mock _id, so re-runs overwrite.
 */

import { createClient } from 'next-sanity'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { mockCtaConfig } from '../lib/content/ctaConfig'
import { mockIndustryCategories } from '../lib/content/industryCategories'
import { mockServiceDetails } from '../lib/content/services'
import { mockMethodDetails } from '../lib/content/methods'
import { mockCaseDetails } from '../lib/content/cases'
import { mockColumnDetails } from '../lib/content/columns'
import type { Case, Method, Service, Column, IndustryCategory } from '../types'

type Mode = 'dry-run' | 'apply'
const args = process.argv.slice(2)
const mode: Mode = args.includes('--apply') ? 'apply' : 'dry-run'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_READ_WRITE_TOKEN

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}
if (mode === 'apply' && !token) {
  console.error('Missing SANITY_API_READ_WRITE_TOKEN (required for --apply)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ────────────────────────────────────────────────────────────────────────
// helpers
// ────────────────────────────────────────────────────────────────────────

function toIso(d: string | undefined): string | undefined {
  if (!d) return undefined
  // YYYY-MM-DD → noon UTC ISO so timezone offsets don't bump the date
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return new Date(`${d}T00:00:00Z`).toISOString()
  return new Date(d).toISOString()
}

function withKeys<T extends Record<string, any>>(arr: T[] | undefined): T[] | undefined {
  if (!Array.isArray(arr)) return arr
  return arr.map((item, i) => {
    const next: any = { ...item, _key: item._key || `k${i}_${Math.random().toString(36).slice(2, 8)}` }
    // PortableText blocks have children[] which also need _key
    if (Array.isArray(item.children)) {
      next.children = item.children.map((c: any, j: number) => ({
        ...c,
        _key: c._key || `k${i}_c${j}`,
      }))
    }
    return next
  })
}

// ────────────────────────────────────────────────────────────────────────
// converters
// ────────────────────────────────────────────────────────────────────────

function buildIndustryCategoryDocs(items: IndustryCategory[]) {
  return items.map((c) => ({
    _id: c._id,
    _type: 'industryCategory',
    value: c.value,
    displayName: c.displayName,
    description: c.description,
    order: c.order,
  }))
}

function buildCtaConfigDoc() {
  return {
    _id: 'ctaConfig.singleton',
    _type: 'ctaConfig',
    primaryCTA: mockCtaConfig.primaryCTA,
    secondaryCTA: mockCtaConfig.secondaryCTA,
  }
}

function buildServiceDocs(items: Service[]) {
  return items.map((s) => ({
    _id: s._id,
    _type: 'service',
    title: s.title,
    slug: { _type: 'slug', current: s.slug.current },
    excerpt: s.excerpt,
    content: withKeys(s.content as any[] | undefined),
    techTags: s.techTags,
    publishedAt: toIso(s.publishedAt),
    updatedAt: toIso(s.updatedAt),
  }))
}

function buildMethodDocs(items: Method[]) {
  return items.map((m) => ({
    _id: m._id,
    _type: 'method',
    title: m.title,
    slug: { _type: 'slug', current: m.slug.current },
    techTags: m.techTags,
    excerpt: m.excerpt,
    content: withKeys(m.content as any[] | undefined),
    publishedAt: toIso(m.publishedAt),
    updatedAt: toIso(m.updatedAt),
    featured: m.featured,
  }))
}

function buildColumnDocs(items: Column[]) {
  return items.map((c) => ({
    _id: c._id,
    _type: 'column',
    title: c.title,
    slug: { _type: 'slug', current: c.slug.current },
    category: c.category,
    author: c.author,
    techTags: c.techTags,
    excerpt: c.excerpt,
    content: withKeys(c.content as any[] | undefined),
    publishedAt: toIso(c.publishedAt),
    updatedAt: toIso(c.updatedAt),
    featured: c.featured,
  }))
}

function buildCaseDocs(items: Case[]) {
  return items.map((c) => ({
    _id: c._id,
    _type: 'case',
    title: c.title,
    slug: { _type: 'slug', current: c.slug.current },
    problem: c.problem,
    industry: c.industry?._id
      ? { _type: 'reference', _ref: c.industry._id }
      : undefined,
    techTags: c.techTags,
    excerpt: c.excerpt,
    content: withKeys(c.content as any[] | undefined),
    publishedAt: toIso(c.publishedAt),
    updatedAt: toIso(c.updatedAt),
    featured: c.featured,
  }))
}

// strip undefined fields recursively (Sanity rejects unknown undefined values)
function clean(obj: any): any {
  if (Array.isArray(obj)) return obj.map(clean)
  if (obj && typeof obj === 'object') {
    const out: any = {}
    for (const [k, v] of Object.entries(obj)) {
      if (v === undefined) continue
      out[k] = clean(v)
    }
    return out
  }
  return obj
}

// ────────────────────────────────────────────────────────────────────────
// main
// ────────────────────────────────────────────────────────────────────────

const allDocs = clean([
  ...buildIndustryCategoryDocs(mockIndustryCategories),
  buildCtaConfigDoc(),
  ...buildServiceDocs(Object.values(mockServiceDetails)),
  ...buildMethodDocs(Object.values(mockMethodDetails)),
  ...buildColumnDocs(Object.values(mockColumnDetails)),
  ...buildCaseDocs(Object.values(mockCaseDetails)),
])

// summary
const grouped = allDocs.reduce((acc: Record<string, number>, d: any) => {
  acc[d._type] = (acc[d._type] || 0) + 1
  return acc
}, {})
console.log(`mode: ${mode}`)
console.log(`projectId: ${projectId}  dataset: ${dataset}`)
console.log(`docs by type:`, grouped)
console.log(`total: ${allDocs.length}`)

if (mode === 'dry-run') {
  const out = resolve(process.cwd(), 'migration-dryrun.json')
  writeFileSync(out, JSON.stringify(allDocs, null, 2), 'utf8')
  console.log(`wrote ${out}`)
  console.log(`(no writes performed — re-run with --apply to push to Sanity)`)
  process.exit(0)
}

// apply: createOrReplace each doc, in dependency order
async function run() {
  let ok = 0
  let fail = 0
  for (const doc of allDocs) {
    try {
      await client.createOrReplace(doc as any)
      ok++
      process.stdout.write(`✓ ${doc._type} ${doc._id}\n`)
    } catch (e: any) {
      fail++
      process.stdout.write(`✗ ${doc._type} ${doc._id} :: ${e?.message || e}\n`)
    }
  }
  console.log(`\nresult: ok=${ok} fail=${fail}`)
  process.exit(fail > 0 ? 1 : 0)
}
run()
