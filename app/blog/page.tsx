import { Suspense } from 'react'
import { listPublishedPosts } from '@/lib/db/queries'
import BlogList from './BlogList'

export const revalidate = 60

export const metadata = {
  title: 'The Diary — Vandana Skin Diary',
  description: 'Honest skincare, beauty & wellness — no paid opinions, ever.',
}

export default async function BlogPage() {
  const posts = await listPublishedPosts()
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted">Loading…</div>}>
      <BlogList posts={posts} />
    </Suspense>
  )
}
