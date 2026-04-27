import { createClient } from 'next-sanity'

/**
 * Server-only Sanity client with write privileges.
 * NEVER import from a Client Component or anything reachable from the browser bundle —
 * the SANITY_API_READ_WRITE_TOKEN must never leak to the browser.
 * Used by /app/api/* route handlers only.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_WRITE_TOKEN,
})
