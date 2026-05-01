import { and, desc, eq, inArray, ne } from 'drizzle-orm'
import { db } from './client'
import { posts, products, postsProducts, type Post, type Product } from './schema'

export type PostWithProducts = Post & { products: Product[] }

export async function listPublishedPosts(): Promise<Post[]> {
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
}

export async function listAllPosts(): Promise<Post[]> {
  return db.select().from(posts).orderBy(desc(posts.updatedAt))
}

export async function getPostBySlug(slug: string): Promise<PostWithProducts | null> {
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
  if (!post) return null
  const linked = await db
    .select({ product: products, position: postsProducts.position })
    .from(postsProducts)
    .innerJoin(products, eq(products.id, postsProducts.productId))
    .where(eq(postsProducts.postId, post.id))
    .orderBy(postsProducts.position)
  return { ...post, products: linked.map((l) => l.product) }
}

export async function getPostById(id: number): Promise<PostWithProducts | null> {
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  if (!post) return null
  const linked = await db
    .select({ product: products, position: postsProducts.position })
    .from(postsProducts)
    .innerJoin(products, eq(products.id, postsProducts.productId))
    .where(eq(postsProducts.postId, post.id))
    .orderBy(postsProducts.position)
  return { ...post, products: linked.map((l) => l.product) }
}

export async function getRelatedPosts(postId: number, category: string, limit = 3): Promise<Post[]> {
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.published, true), eq(posts.category, category), ne(posts.id, postId)))
    .orderBy(desc(posts.publishedAt))
    .limit(limit)
}

export async function listProducts(): Promise<Product[]> {
  return db.select().from(products).orderBy(desc(products.updatedAt))
}

export async function getProductById(id: number): Promise<Product | null> {
  const [p] = await db.select().from(products).where(eq(products.id, id)).limit(1)
  return p ?? null
}

export async function setPostProducts(postId: number, productIds: number[]): Promise<void> {
  await db.delete(postsProducts).where(eq(postsProducts.postId, postId))
  if (productIds.length === 0) return
  await db.insert(postsProducts).values(
    productIds.map((productId, position) => ({ postId, productId, position }))
  )
}

export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (ids.length === 0) return []
  return db.select().from(products).where(inArray(products.id, ids))
}
