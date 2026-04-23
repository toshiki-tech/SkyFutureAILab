import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  size?: 'md' | 'lg'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  size = 'md',
  tone = 'light',
  className,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleClass = size === 'lg' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'
  const titleColor = tone === 'dark' ? 'text-white' : 'text-gray-900'
  const descColor = tone === 'dark' ? 'text-gray-200' : 'text-gray-600'
  const eyebrowColor = tone === 'dark' ? 'text-accent-400' : 'text-accent-600'

  return (
    <header className={cn(alignClass, 'max-w-3xl mb-10 md:mb-14', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.18em]',
            eyebrowColor
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={cn('font-bold leading-tight', titleClass, titleColor)}>{title}</h2>
      {description && (
        <p className={cn('mt-5 text-base md:text-lg leading-relaxed', descColor)}>
          {description}
        </p>
      )}
    </header>
  )
}
