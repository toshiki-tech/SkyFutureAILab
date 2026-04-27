import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

interface PortableTextRendererProps {
  value: any
}

const calloutToneClass: Record<string, { box: string; title: string; icon: string; label: string }> = {
  info: {
    box: 'border-blue-200 bg-blue-50',
    title: 'text-blue-900',
    icon: 'bg-blue-500',
    label: 'INFO',
  },
  tip: {
    box: 'border-emerald-200 bg-emerald-50',
    title: 'text-emerald-900',
    icon: 'bg-emerald-500',
    label: 'TIP',
  },
  warning: {
    box: 'border-amber-200 bg-amber-50',
    title: 'text-amber-900',
    icon: 'bg-amber-500',
    label: 'WARNING',
  },
  danger: {
    box: 'border-red-200 bg-red-50',
    title: 'text-red-900',
    icon: 'bg-red-500',
    label: 'DANGER',
  },
}

const refTypeToHref: Record<string, string> = {
  case: '/cases',
  method: '/method',
  service: '/service',
  column: '/column',
}

const refTypeToLabel: Record<string, string> = {
  case: '関連事例',
  method: '関連メソッド',
  service: '関連サービス',
  column: '関連コラム',
}

export default function PortableTextRenderer({
  value,
}: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null
  }

  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <p className="mb-5 text-base md:text-lg leading-[1.85] text-gray-700">
              {children}
            </p>
          ),
          h2: ({ children }) => (
            <h2 className="mb-5 mt-12 pb-3 text-2xl md:text-3xl font-bold text-gray-900 border-b border-gray-200">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-4 mt-10 text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3 before:content-[''] before:h-6 before:w-1 before:bg-accent-500 before:rounded-sm">
              {children}
            </h3>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="mb-6 ml-5 list-disc marker:text-accent-500 space-y-2 text-gray-700">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="mb-6 ml-5 list-decimal marker:font-bold marker:text-accent-600 space-y-2 text-gray-700">
              {children}
            </ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="text-base md:text-lg leading-[1.8] pl-1">{children}</li>
          ),
          number: ({ children }) => (
            <li className="text-base md:text-lg leading-[1.8] pl-1">{children}</li>
          ),
        },
        types: {
          image: ({ value }) => {
            if (!value?.asset) return null
            try {
              const imageUrl = urlFor(value).width(1200).height(800).url()
              return (
                <div className="my-8">
                  <Image
                    src={imageUrl}
                    alt={value?.alt || ''}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full rounded-xl"
                  />
                </div>
              )
            } catch {
              return null
            }
          },
          callout: ({ value }) => {
            const tone = (value?.tone as keyof typeof calloutToneClass) || 'info'
            const t = calloutToneClass[tone] || calloutToneClass.info
            return (
              <aside
                className={`my-8 rounded-xl border ${t.box} p-5 md:p-6`}
                role="note"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`inline-flex h-5 items-center rounded-md px-2 text-[11px] font-bold tracking-wide text-white ${t.icon}`}
                  >
                    {t.label}
                  </span>
                  {value?.title && (
                    <span className={`text-base font-bold ${t.title}`}>
                      {value.title}
                    </span>
                  )}
                </div>
                <div className="text-sm md:text-base leading-[1.8] text-gray-800 [&_p]:mb-2 [&_p:last-child]:mb-0">
                  <PortableText value={value?.body || []} />
                </div>
              </aside>
            )
          },
          linkCard: ({ value }) => {
            const ref = value?.reference
            if (!ref?.slug?.current || !ref?._type) return null
            const baseHref = refTypeToHref[ref._type as string]
            if (!baseHref) return null
            const href = `${baseHref}/${ref.slug.current}`
            const label = value?.label || refTypeToLabel[ref._type as string] || '関連記事'
            const imgUrl = ref.featuredImage?.asset?.url
            return (
              <Link
                href={href}
                className="my-8 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-accent-400 hover:shadow-md md:flex-row"
              >
                {imgUrl && (
                  <div className="relative aspect-[16/9] w-full md:aspect-auto md:h-auto md:w-48 md:flex-shrink-0">
                    <Image
                      src={imgUrl}
                      alt={ref.featuredImage?.alt || ref.title || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, 192px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-5">
                  <p className="mb-2 text-xs font-bold tracking-wider text-accent-600">
                    {label}
                  </p>
                  <h4 className="mb-2 text-base font-bold text-gray-900 md:text-lg">
                    {ref.title}
                  </h4>
                  {ref.excerpt && (
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {ref.excerpt}
                    </p>
                  )}
                  {value?.note && (
                    <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
                      {value.note}
                    </p>
                  )}
                </div>
              </Link>
            )
          },
          metric: ({ value }) => {
            const items = Array.isArray(value?.items) ? value.items : []
            if (items.length === 0) return null
            const cols =
              items.length >= 4
                ? 'sm:grid-cols-2 lg:grid-cols-4'
                : items.length === 3
                ? 'sm:grid-cols-3'
                : 'sm:grid-cols-2'
            return (
              <div className={`my-8 grid gap-4 ${cols}`}>
                {items.map((m: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 text-center"
                  >
                    <p className="mb-2 text-3xl font-bold text-accent-600 md:text-4xl">
                      {m?.value}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {m?.label}
                    </p>
                    {m?.note && (
                      <p className="mt-1 text-xs text-gray-500">{m.note}</p>
                    )}
                  </div>
                ))}
              </div>
            )
          },
          codeBlock: ({ value }) => {
            if (!value?.code) return null
            return (
              <figure className="my-8 overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
                {(value.filename || value.language) && (
                  <figcaption className="flex items-center justify-between border-b border-gray-800 px-4 py-2 text-xs text-gray-300">
                    <span className="font-mono">{value.filename || ''}</span>
                    {value.language && (
                      <span className="rounded bg-gray-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-gray-400">
                        {value.language}
                      </span>
                    )}
                  </figcaption>
                )}
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-100">
                  <code className={`language-${value.language || 'text'} font-mono`}>
                    {value.code}
                  </code>
                </pre>
              </figure>
            )
          },
        },
        marks: {
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">{children}</strong>
          ),
          link: ({ children, value }) => {
            const rel = value?.href?.startsWith('http') ? 'noreferrer noopener' : undefined
            return (
              <a
                href={value?.href}
                rel={rel}
                className="text-accent-600 underline underline-offset-4 hover:text-accent-700"
              >
                {children}
              </a>
            )
          },
        },
      }}
    />
  )
}
