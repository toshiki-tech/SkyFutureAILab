import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface PortableTextRendererProps {
  value: any
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
          normal: ({ children }) => <p className="mb-4 text-base leading-relaxed text-gray-700">{children}</p>,
          h2: ({ children }) => <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900">{children}</h3>,
        },
        list: {
          bullet: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>,
          number: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
        },
        types: {
          image: ({ value }) => {
            if (!value?.asset) return null
            try {
              const imageUrl = urlFor(value).width(1200).height(800).url()
              return (
                <div className="my-6">
                  <Image
                    src={imageUrl}
                    alt={value?.alt || ''}
                    width={1200}
                    height={800}
                    className="h-auto w-full rounded-lg"
                  />
                </div>
              )
            } catch {
              return null
            }
          },
        },
        marks: {
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          link: ({ children, value }) => {
            const rel = value?.href?.startsWith('http') ? 'noreferrer noopener' : undefined
            return (
              <a
                href={value?.href}
                rel={rel}
                className="text-primary-600 underline hover:text-primary-800"
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
