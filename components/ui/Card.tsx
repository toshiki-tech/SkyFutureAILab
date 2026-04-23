import Link from 'next/link'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'flat' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  href?: string
  children: ReactNode
}

const variants = {
  flat: 'bg-white',
  elevated: 'bg-white shadow-card',
  outlined: 'bg-white border border-gray-200',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  variant = 'outlined',
  padding = 'md',
  interactive,
  href,
  className,
  children,
  ...rest
}: CardProps) {
  const classes = cn(
    'rounded-xl overflow-hidden transition-all duration-200',
    variants[variant],
    paddings[padding],
    interactive && 'hover:shadow-card-hover hover:border-accent-500/40 hover:-translate-y-0.5',
    href && 'block cursor-pointer',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
