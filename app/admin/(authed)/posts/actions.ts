'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { posts } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { setPostProducts } from '@/lib/db/queries'
import { getSession } from '@/lib/auth'

async function requireAuth() {
  const session = await getSession()
  if (!session) redirect('/admin/login')
}

function parseFormData(formData: FormData) {
  const tags = String(formData.get('tags') ?? '')
    .split(',').map((t) => t.trim()).filter(Boolean)
  const productIds = String(formData.get('productIds') ?? '')
    .split(',').map(Number).filter(Boolean)
  const isPublished = formData.get('published') === 'on'
  const rawDate = String(formData.get('publishedAt') ?? '').trim()
  const publishedAt = isPublished
    ? rawDate ? new Date(rawDate) : new Date()
    : null

  return {
    title: String(formData.get('title') ?? '').trim(),
    slug: String(formData.get('slug') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    category: String(formData.get('category') ?? 'Skincare'),
    color: String(formData.get('color') ?? '#e8d8e8'),
    readTime: String(formData.get('readTime') ?? '5 min').trim(),
    coverImage: String(formData.get('coverImage') ?? '').trim() || null,
    bodyHtml: String(formData.get('bodyHtml') ?? ''),
    tags,
    featured: formData.get('featured') === 'on',
    published: isPublished,
    publishedAt,
    seoTitle: String(formData.get('seoTitle') ?? '').trim() || null,
    seoDescription: String(formData.get('seoDescription') ?? '').trim() || null,
    ogImage: String(formData.get('ogImage') ?? '').trim() || null,
    productIds,
  }
}

export async function createPost(formData: FormData) {
  await requireAuth()
  const { productIds, ...data } = parseFormData(formData)
  const [created] = await db
    .insert(posts)
    .values({ ...data, updatedAt: new Date() })
    .returning({ id: posts.id })
  await setPostProducts(created.id, productIds)
  revalidatePath('/')
  revalidatePath('/blog')
  redirect(`/admin/posts/${created.id}`)
}

export async function updatePost(id: number, formData: FormData) {
  await requireAuth()
  const { productIds, ...data } = parseFormData(formData)
  await db.update(posts).set({ ...data, updatedAt: new Date() }).where(eq(posts.id, id))
  await setPostProducts(id, productIds)
  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath(`/blog/${data.slug}`)
  redirect(`/admin/posts/${id}`)
}

export async function deletePost(id: number) {
  await requireAuth()
  const [post] = await db.select({ slug: posts.slug }).from(posts).where(eq(posts.id, id)).limit(1)
  await db.delete(posts).where(eq(posts.id, id))
  revalidatePath('/')
  revalidatePath('/blog')
  if (post) revalidatePath(`/blog/${post.slug}`)
  redirect('/admin/posts')
}
