/**
 * PortableText block builders for mock content.
 * These produce Sanity-compatible block structures so the same
 * renderer (PortableTextRenderer) can consume both mock and real data.
 */

type PortableBlock = {
  _type: 'block'
  style: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote'
  children: Array<{ _type: 'span'; text: string; marks: string[] }>
  markDefs: unknown[]
  listItem?: 'bullet' | 'number'
}

export function block(
  text: string,
  opts: {
    bold?: boolean
    style?: PortableBlock['style']
    listItem?: PortableBlock['listItem']
  } = {}
): PortableBlock {
  return {
    _type: 'block',
    style: opts.style ?? 'normal',
    children: [{ _type: 'span', text, marks: opts.bold ? ['strong'] : [] }],
    markDefs: [],
    ...(opts.listItem ? { listItem: opts.listItem } : {}),
  }
}

export const p = (text: string) => block(text)
export const bold = (text: string) => block(text, { bold: true })
export const h2 = (text: string) => block(text, { style: 'h2' })
export const h3 = (text: string) => block(text, { style: 'h3' })
export const bullet = (text: string) => block(text, { listItem: 'bullet' })
export const numbered = (text: string) => block(text, { listItem: 'number' })

export type { PortableBlock }
