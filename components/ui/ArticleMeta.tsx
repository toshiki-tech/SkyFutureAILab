import { Badge } from './Badge'
import { Chip } from './Chip'
import { cn } from '@/lib/utils'

type ArticleMetaProps = {
  publishedAt?: string
  updatedAt?: string
  industry?: string
  problem?: string
  techTags?: string[]
  tone?: 'light' | 'dark'
  className?: string
}

function formatDate(iso?: string) {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export function ArticleMeta({
  publishedAt,
  updatedAt,
  industry,
  problem,
  techTags,
  tone = 'light',
  className,
}: ArticleMetaProps) {
  const dateColor = tone === 'dark' ? 'text-gray-300' : 'text-gray-500'

  return (
    <div className={cn('flex flex-wrap items-center gap-2 text-sm', className)}>
      {industry && <Badge variant="industry">{industry}</Badge>}
      {problem && <Badge variant="problem">{problem}</Badge>}
      {publishedAt && (
        <time className={cn('font-medium', dateColor)} dateTime={publishedAt}>
          {formatDate(publishedAt)}
        </time>
      )}
      {updatedAt && updatedAt !== publishedAt && (
        <span className={cn('text-xs', dateColor)}>
          （更新: {formatDate(updatedAt)}）
        </span>
      )}
      {techTags && techTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 ml-1">
          {techTags.map((tag) => (
            <Chip key={tag} size="sm" tone="accent">
              {tag}
            </Chip>
          ))}
        </div>
      )}
    </div>
  )
}
