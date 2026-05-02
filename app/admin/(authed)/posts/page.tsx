import Link from 'next/link'
import { listAllPosts } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export default async function AdminPostsPage() {
  const allPosts = await listAllPosts()

  return (
    <div className="px-10 py-10 max-w-5xl">
      <header className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-plum">Admin</p>
          <h1 className="font-serif text-5xl font-bold text-ink mt-1 leading-none">Posts</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-plum text-white px-5 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New post
        </Link>
      </header>

      <div className="rounded-3xl border border-border bg-white overflow-hidden">
        {allPosts.length === 0 ? (
          <div className="px-8 py-20 text-center">
            <p className="font-serif text-2xl text-ink mb-2">No posts yet.</p>
            <Link href="/admin/posts/new" className="inline-block mt-4 bg-plum text-white px-5 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              + Write your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-bold tracking-widest uppercase text-muted">Title</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-muted hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-muted hidden lg:table-cell">Updated</th>
                <th className="px-4 py-3 text-center text-xs font-bold tracking-widest uppercase text-muted">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allPosts.map((p) => (
                <tr key={p.id} className="hover:bg-cream transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {p.featured && (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shrink-0" style={{ background: '#f5e8ee', color: '#784f77' }}>
                          ✦
                        </span>
                      )}
                      <Link href={`/admin/posts/${p.id}`} className="font-serif font-bold text-ink hover:text-plum transition-colors line-clamp-1">
                        {p.title}
                      </Link>
                    </div>
                    <p className="text-xs text-muted mt-0.5">/{p.slug}</p>
                  </td>
                  <td className="px-4 py-4 text-muted hidden md:table-cell">{p.category}</td>
                  <td className="px-4 py-4 text-muted hidden lg:table-cell whitespace-nowrap">
                    {new Date(p.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full"
                      style={{
                        background: p.published ? '#e8f5e8' : '#f5ece0',
                        color: p.published ? '#2d6a3a' : '#8c4f2e',
                      }}
                    >
                      {p.published ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/admin/posts/${p.id}`} className="text-xs font-semibold text-plum hover:underline">
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
