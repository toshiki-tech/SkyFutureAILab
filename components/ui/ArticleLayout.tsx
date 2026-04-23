import type { ReactNode } from 'react'
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'
import { ArticleMeta } from './ArticleMeta'

type ArticleLayoutProps = {
  breadcrumbs: BreadcrumbItem[]
  title: string
  excerpt?: string
  meta?: {
    publishedAt?: string
    updatedAt?: string
    industry?: string
    problem?: string
    techTags?: string[]
  }
  children: ReactNode
  footer?: ReactNode
  sidebar?: ReactNode
}

export function ArticleLayout({
  breadcrumbs,
  title,
  excerpt,
  meta,
  children,
  footer,
  sidebar,
}: ArticleLayoutProps) {
  const hasMeta =
    meta &&
    (meta.publishedAt ||
      meta.updatedAt ||
      meta.industry ||
      meta.problem ||
      (meta.techTags && meta.techTags.length > 0))

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16 max-w-7xl">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      <div className="grid gap-10 lg:grid-cols-4 lg:gap-12">
        <article className="lg:col-span-3">
          <header className="mb-10 md:mb-12 pb-8 md:pb-10 border-b border-gray-200">
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              {title}
            </h1>
            {excerpt && (
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {excerpt}
              </p>
            )}
            {hasMeta && (
              <ArticleMeta
                publishedAt={meta.publishedAt}
                updatedAt={meta.updatedAt}
                industry={meta.industry}
                problem={meta.problem}
                techTags={meta.techTags}
                className="mt-6"
              />
            )}
          </header>

          <div className="prose prose-lg max-w-none">{children}</div>

          {footer && <div className="mt-16 md:mt-20 space-y-14">{footer}</div>}
        </article>

        {sidebar && (
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">{sidebar}</div>
          </aside>
        )}
      </div>

      <div className="lg:hidden h-24" aria-hidden="true" />
    </div>
  )
}
