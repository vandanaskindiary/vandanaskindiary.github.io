import type { Post } from '@/lib/db/schema'

export default function ArticleJsonLd({ post }: { post: Post }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vandanaskindiary.com'
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.ogImage || post.coverImage || undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Person', name: 'Vandana' },
    publisher: {
      '@type': 'Organization',
      name: 'Vandana Skin Diary',
      url: siteUrl,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
