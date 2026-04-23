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
                    className="h-auto w-full rounded-xl"
                  />
                </div>
              )
            } catch {
              return null
            }
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
