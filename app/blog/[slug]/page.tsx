import { notFound } from 'next/navigation'
import Link from 'next/link'
import { POSTS } from '@/data/posts'
import { PRODUCTS } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import PostCard from '@/components/PostCard'
import ShareButtons from '@/components/ShareButtons'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Vandana Skin Diary`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

export default function PostPage({ params }: Props) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const relatedProducts = PRODUCTS.filter((p) => post.relatedProducts.includes(p.id))
  const relatedPosts = POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)

  return (
    <div>
      {/* Hero banner */}
      <div className="px-6 pt-12 pb-0" style={{ background: `linear-gradient(to bottom, ${post.color}bb, #faf7f4)` }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm font-semibold text-plum flex items-center gap-2 mb-6 hover:underline">
            ← Back to Blog
          </Link>
          <div className="flex gap-3 items-center mb-4 flex-wrap">
            <span className="text-xs font-bold tracking-wider uppercase text-plum">{post.category}</span>
            <span className="text-xs text-muted">· {post.date} · {post.readTime} read</span>
          </div>
          <h1 className="font-serif font-bold text-ink leading-tight mb-5"
            style={{ fontSize: 'clamp(28px, 4.5vw, 48px)' }}>
            {post.title}
          </h1>
          <p className="text-lg italic leading-relaxed text-muted mb-8">{post.excerpt}</p>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-20">
        {/* Featured image placeholder */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ background: post.color, aspectRatio: '16/7' }}>
          <div className="w-full h-full flex items-center justify-center font-mono text-xs opacity-50 text-center p-6"
            style={{ color: '#5a3060' }}>
            featured post image — product flatlay or lifestyle
          </div>
        </div>

        {/* Share bar */}
        <ShareButtons title={post.title} />

        {/* Body sections */}
        {post.body.map((section) => (
          <div key={section.heading} className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-ink mb-3 leading-snug">{section.heading}</h2>
            <p className="text-base leading-loose" style={{ color: '#4a2a3a' }}>{section.content}</p>
          </div>
        ))}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="rounded-3xl p-7 mb-8 border border-border" style={{ background: '#f3ece6' }}>
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
              {relatedProducts.map((p) => <ProductCard key={p.id} product={p} compact />)}
            </div>
          </div>
        )}

        {/* Affiliate disclosure */}
        <div className="rounded-xl p-4 mb-8 text-sm leading-relaxed" style={{ background: '#f9f5f2', borderLeft: '3px solid #784f77', color: '#7a5a4a' }}>
          <strong className="text-ink">Disclosure:</strong> This post contains affiliate links to Amazon, Nykaa, and Flipkart.
          If you purchase through these links, I may earn a small commission at no extra cost to you.
          I only recommend products I&apos;ve personally tested and genuinely love.
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-12">
          {post.tags.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: '#784f7714', color: '#784f77' }}>#{t}</span>
          ))}
        </div>

        {/* Related posts */}
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
