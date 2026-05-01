import Link from 'next/link'
import type { Post } from '@/data/types'

interface PostCardProps {
  post: Post
  wide?: boolean
}

export default function PostCard({ post, wide = false }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block bg-white rounded-3xl overflow-hidden border border-border transition-all duration-250 hover:-translate-y-1.5 hover:shadow-xl ${
        wide ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'
      }`}
      style={{ boxShadow: '0 2px 12px rgba(120,79,119,0.07)' }}
    >
      {/* Image placeholder */}
      <div
        className="relative overflow-hidden"
        style={{
          background: post.color,
          aspectRatio: wide ? 'auto' : '16/10',
          minHeight: wide ? '280px' : undefined,
        }}
      >
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
          <defs>
            <pattern id={`stripe-${post.id}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <line x1="0" y1="12" x2="12" y2="0" stroke="#5a3060" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#stripe-${post.id})`} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-xs opacity-50 text-center p-3"
          style={{ color: '#5a3060' }}>
          {post.category} — blog photo
        </span>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center ${wide ? 'p-8' : 'p-5'}`}>
        <div className="flex gap-2 items-center mb-2">
          <span className="text-xs font-bold tracking-wider uppercase text-plum">{post.category}</span>
          <span className="text-xs text-muted">· {post.readTime} read · {post.date}</span>
        </div>
        <h3
          className={`font-serif font-bold text-ink leading-snug mb-2 group-hover:text-plum transition-colors ${
            wide ? 'text-2xl' : 'text-lg'
          }`}
        >
          {post.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex gap-2 flex-wrap">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#784f7714', color: '#784f77' }}>
              #{t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
