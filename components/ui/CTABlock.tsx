import type { ReactNode } from 'react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

type CTABlockProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  tone?: 'dark' | 'soft' | 'accent'
  className?: string
}

const tones = {
  dark: {
    bg: 'bg-primary-900',
    eyebrow: 'text-accent-400',
    title: 'text-white',
    desc: 'text-gray-300',
    primaryVariant: 'primary' as const,
    secondaryVariant: 'outline' as const,
    secondaryExtra: 'bg-transparent border-white/30 text-white hover:bg-white/10',
  },
  soft: {
    bg: 'bg-accent-50 border border-accent-200/50',
    eyebrow: 'text-accent-700',
    title: 'text-primary-900',
    desc: 'text-gray-700',
    primaryVariant: 'primary' as const,
    secondaryVariant: 'outline' as const,
    secondaryExtra: '',
  },
  accent: {
    bg: 'bg-accent-500',
    eyebrow: 'text-white/80',
    title: 'text-white',
    desc: 'text-white/90',
    primaryVariant: 'secondary' as const,
    secondaryVariant: 'outline' as const,
    secondaryExtra: 'bg-transparent border-white/40 text-white hover:bg-white/10',
  },
}

export function CTABlock({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  tone = 'dark',
  className,
}: CTABlockProps) {
  const t = tones[tone]
  return (
    <div
      className={cn(
        'rounded-2xl px-6 py-10 md:px-12 md:py-14 text-center',
        t.bg,
        className
      )}
    >
      {eyebrow && (
        <p className={cn('mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.18em]', t.eyebrow)}>
          {eyebrow}
        </p>
      )}
      <h3 className={cn('text-2xl md:text-4xl font-bold leading-tight', t.title)}>{title}</h3>
      {description && (
        <p className={cn('mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed', t.desc)}>
          {description}
        </p>
      )}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button href={primary.href} variant={t.primaryVariant} size="lg">
          {primary.label}
        </Button>
        {secondary && (
          <Button
            href={secondary.href}
            variant={t.secondaryVariant}
            size="lg"
            className={t.secondaryExtra}
          >
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  )
}
