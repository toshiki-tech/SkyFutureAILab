import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ChipProps = {
  children: ReactNode
  href?: string
  active?: boolean
  size?: 'sm' | 'md'
  tone?: 'neutral' | 'accent' | 'primary'
  className?: string
  onClick?: () => void
}

const sizes = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
}

const tones = {
  neutral: {
    idle: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    active: 'bg-primary-900 text-white',
  },
  accent: {
    idle: 'bg-accent-50 text-accent-700 hover:bg-accent-100',
    active: 'bg-accent-500 text-white',
  },
  primary: {
    idle: 'bg-primary-50 text-primary-700 hover:bg-primary-100',
    active: 'bg-primary-900 text-white',
  },
}

export function Chip({
  children,
  href,
  active,
  size = 'sm',
  tone = 'neutral',
  className,
  onClick,
}: ChipProps) {
  const classes = cn(
    'inline-flex items-center font-medium rounded-full transition-colors',
    sizes[size],
    active ? tones[tone].active : tones[tone].idle,
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }

  return <span className={classes}>{children}</span>
}
