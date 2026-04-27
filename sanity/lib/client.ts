import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

/**
 * Public-read client for the marketing site.
 *
 * - No token. Public dataset, anonymous reads only. (Sending an invalid token
 *   makes Sanity return 401 "Session not found".)
 * - useCdn: true. Routes via apicdn.sanity.io with built-in 60s cache.
 *
 * Why useCdn: true is the safer choice here:
 * Even with `dynamic = 'force-dynamic'` on every page, next-sanity's wrapped
 * fetch can end up caching an early null response in Next.js Data Cache —
 * if Sanity briefly returns null during a doc rename / migration, that null
 * sticks for subsequent SSR requests on the same URL. The Sanity CDN endpoint
 * uses a different host so doesn't share that cache; its own TTL is short
 * (60s) so any transient miss self-heals.
 *
 * For writes, use sanity/lib/writeClient.ts (server-only, with token).
 */
export const client = createClient({
  projectId: projectId || 'dummy',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true,
})
