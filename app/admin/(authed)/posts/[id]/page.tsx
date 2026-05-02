import { notFound } from 'next/navigation'
import { getPostById, listProducts } from '@/lib/db/queries'
import { updatePost } from '../actions'
import PostEditor from '../PostEditor'
import DeletePostButton from '../DeletePostButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const [post, allProducts] = await Promise.all([
    getPostById(Number(id)),
    listProducts(),
  ])
  if (!post) notFound()

  const updateAction = updatePost.bind(null, post.id)

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-10 py-3 border-b border-border bg-cream-dark">
        <Link href="/admin/posts" className="text-xs font-semibold text-muted hover:text-ink">
          ← All posts
        </Link>
        <div className="flex items-center gap-3">
          {post.published && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="text-xs font-semibold text-plum hover:underline"
            >
              View live ↗
            </Link>
          )}
          <DeletePostButton id={post.id} />
        </div>
      </div>
      <PostEditor action={updateAction} post={post} allProducts={allProducts} />
    </div>
  )
}
