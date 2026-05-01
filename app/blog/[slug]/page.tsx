import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getRelatedPosts } from '@/lib/db/queries'
import ProductCard from '@/components/ProductCard'
import PostCard from '@/components/PostCard'
import ShareButtons from '@/components/ShareButtons'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  const title = post.seoTitle || `${post.title} — Vandana Skin Diary`
  const description = post.seoDescription || post.excerpt
  return {
    title,
    description,
    keywords: post.tags.join(', '),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      images: post.ogImage || post.coverImage ? [{ url: (post.ogImage || post.coverImage)! }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.ogImage || post.coverImage ? [(post.ogImage || post.coverImage)!] : undefined,
    },
  }
}

function formatDate(d: Date | null): string {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post || !post.published) notFound()

  const relatedPosts = await getRelatedPosts(post.id, post.category)

  return (
    <div>
      <ArticleJsonLd post={post} />
      <div className="px-6 pt-12 pb-0" style={{ background: `linear-gradient(to bottom, ${post.color}bb, #faf7f4)` }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm font-semibold text-plum flex items-center gap-2 mb-6 hover:underline">
            ← Back to Blog
          </Link>
          <div className="flex gap-3 items-center mb-4 flex-wrap">
            <span className="text-xs font-bold tracking-wider uppercase text-plum">{post.category}</span>
            <span className="text-xs text-muted">· {formatDate(post.publishedAt)} · {post.readTime} read</span>
          </div>
          <h1 className="font-serif font-bold text-ink leading-tight mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 48px)' }}>
            {post.title}
          </h1>
          <p className="text-lg italic leading-relaxed text-muted mb-8">{post.excerpt}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-20">
        <div className="rounded-2xl overflow-hidden mb-8" style={{ background: post.color, aspectRatio: '16/7' }}>
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs opacity-50 text-center p-6"
              style={{ color: '#5a3060' }}>
              featured post image — product flatlay or lifestyle
            </div>
          )}
        </div>

        <ShareButtons title={post.title} />

        <div
          className="prose-vsd"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        {post.products.length > 0 && (
          <div className="rounded-3xl p-7 mb-8 mt-10 border border-border" style={{ background: '#f3ece6' }}>
            <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
              <div>
                <h3 className="font-serif text-2xl font-bold text-ink">Products Mentioned in This Post</h3>
                <p className="text-xs text-muted mt-1">Affiliate links — I earn a small commission at no cost to you.</p>
              </div>
              <Link href="/products" className="text-sm font-semibold text-plum border border-plum rounded-full px-4 py-1.5 hover:bg-plum hover:text-white transition-colors">
                View all picks →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.products.map((p) => <ProductCard key={p.id} product={p} compact />)}
            </div>
          </div>
        )}

        <div className="rounded-xl p-4 mb-8 text-sm leading-relaxed" style={{ background: '#f9f5f2', borderLeft: '3px solid #784f77', color: '#7a5a4a' }}>
          <strong className="text-ink">Disclosure:</strong> This post contains affiliate links to Amazon, Nykaa, and Flipkart.
          If you purchase through these links, I may earn a small commission at no extra cost to you.
          I only recommend products I&apos;ve personally tested and genuinely love.
        </div>

        <div className="flex gap-2 flex-wrap mb-12">
          {post.tags.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: '#784f7714', color: '#784f77' }}>#{t}</span>
          ))}
        </div>

        {relatedPosts.length > 0 && (
          <div>
            <h3 className="font-serif text-3xl font-bold text-ink mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
