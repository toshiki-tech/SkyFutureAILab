import Link from 'next/link'
import { cn } from '@/lib/utils'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  tone?: 'light' | 'dark'
  className?: string
}

const tones = {
  light: {
    list: 'text-gray-600',
    separator: 'text-gray-400',
    active: 'text-gray-900 font-medium',
    inactive: 'text-gray-600 hover:text-accent-600',
  },
  dark: {
    list: 'text-gray-300',
    separator: 'text-gray-500',
    active: 'text-white font-medium',
    inactive: 'text-gray-300 hover:text-white',
  },
}

export function Breadcrumb({ items, tone = 'light', className }: BreadcrumbProps) {
  const t = tones[tone]

  return (
    <nav aria-label="パンくずリスト" className={className}>
      <ol className={cn('flex flex-wrap items-center gap-2 text-sm', t.list)}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <span className={cn('mx-2', t.separator)} aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span className={isLast ? t.active : undefined}>{item.label}</span>
              ) : (
                <Link href={item.href} className={cn(t.inactive, 'transition-colors')}>
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
