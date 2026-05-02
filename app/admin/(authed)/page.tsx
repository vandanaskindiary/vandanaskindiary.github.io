import Link from 'next/link'
import { db } from '@/lib/db/client'
import { posts, products } from '@/lib/db/schema'
import { count, desc, eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const [[postsTotal], [postsPublished], [postsFeatured], [productsTotal]] = await Promise.all([
    db.select({ value: count() }).from(posts),
    db.select({ value: count() }).from(posts).where(eq(posts.published, true)),
    db.select({ value: count() }).from(posts).where(eq(posts.featured, true)),
    db.select({ value: count() }).from(products),
  ])

  const recentPosts = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      published: posts.published,
      featured: posts.featured,
      category: posts.category,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .orderBy(desc(posts.updatedAt))
    .limit(6)

  const drafts = postsTotal.value - postsPublished.value

  const stats = [
    { label: 'Total posts', value: postsTotal.value, color: '#f0e8f5' },
    { label: 'Published', value: postsPublished.value, color: '#e8f5e8' },
    { label: 'Drafts', value: drafts, color: '#f5ece0' },
    { label: 'Featured', value: postsFeatured.value, color: '#f5e8ee' },
    { label: 'Products', value: productsTotal.value, color: '#e8eef5' },
  ]

  return (
    <div className="px-10 py-10 max-w-6xl">
      <header className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-plum">Admin</p>
          <h1 className="font-serif text-5xl font-bold text-ink mt-1 leading-none">Dashboard</h1>
          <p className="text-sm text-muted mt-2">A quick look at what&apos;s live and what&apos;s pending.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/posts/new"
            className="bg-plum text-white px-5 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + New post
          </Link>
          <Link
            href="/admin/products/new"
            className="px-5 py-3 rounded-full text-sm font-medium border border-plum text-plum hover:bg-plum hover:text-white transition-colors"
          >
            + New product
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border p-5"
            style={{ background: s.color }}
          >
            <div className="text-xs font-bold tracking-widest uppercase text-muted mb-2">{s.label}</div>
            <div className="font-serif text-4xl font-bold text-ink leading-none">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-border bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-serif text-2xl font-bold text-ink">Recent posts</h2>
          <Link href="/admin/posts" className="text-sm font-semibold text-plum hover:underline">
            All posts →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-serif text-2xl text-ink mb-2">No posts yet.</p>
            <p className="text-sm text-muted mb-6">Start the diary with your first review or routine.</p>
            <Link
              href="/admin/posts/new"
              className="inline-block bg-plum text-white px-5 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              + Write your first post
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recentPosts.map((p) => (
              <li key={p.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/posts/${p.id}`}
                    className="font-serif text-lg font-bold text-ink hover:text-plum transition-colors block truncate"
                  >
                    {p.title}
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-muted mt-1">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>/{p.slug}</span>
                    <span>·</span>
                    <span>{new Date(p.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {p.featured && (
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full"
                      style={{ background: '#f5e8ee', color: '#784f77' }}
                    >
                      Featured
                    </span>
                  )}
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full"
                    style={{
                      background: p.published ? '#e8f5e8' : '#f5ece0',
                      color: p.published ? '#2d6a3a' : '#8c4f2e',
                    }}
                  >
                    {p.published ? 'Live' : 'Draft'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
