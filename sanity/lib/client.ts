import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

/**
 * Public-read client for the marketing site.
 *
 * Intentionally does NOT include a token. The Sanity dataset is configured
 * for public anonymous reads, so no Authorization header is needed. Sending
 * an invalid/expired token would cause Sanity to return
 * 401 "Session not found" — which is exactly what's been happening on
 * Vercel when env vars contain a stale token.
 *
 * For writes, use sanity/lib/writeClient.ts (server-side, with token).
 * For draft preview reads (logged-in editors), build a separate client
 * that explicitly accepts a token at call site.
 */
export const client = createClient({
  projectId: projectId || 'dummy',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: false,
  // No token. Anonymous reads only.
})
