import 'dotenv/config'
import { db } from '../lib/db/client'
import { posts, products, postsProducts } from '../lib/db/schema'
import { POSTS } from '../data/posts'
import { PRODUCTS } from '../data/products'

function bodyToHtml(body: { heading: string; content: string }[]): string {
  return body
    .map(
      (s) =>
        `<h2>${escapeHtml(s.heading)}</h2><p>${escapeHtml(s.content)}</p>`
    )
    .join('\n')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function parseDate(s: string): Date {
  const d = new Date(s)
  return isNaN(d.getTime()) ? new Date() : d
}

async function main() {
  console.log('seeding products…')
  const productIdMap = new Map<string, number>()
  for (const p of PRODUCTS) {
    const [row] = await db
      .insert(products)
      .values({
        name: p.name,
        brand: p.brand,
        price: p.price,
        mrp: p.mrp,
        rating: String(p.rating),
        reviews: p.reviews,
        category: p.category,
        tagline: p.tag,
        color: p.color,
        description: p.desc,
        link: p.link,
        whereToBuy: p.where,
        tags: p.tags,
      })
      .returning({ id: products.id })
    productIdMap.set(p.id, row.id)
  }

  console.log('seeding posts…')
  for (const post of POSTS) {
    const publishedAt = parseDate(post.date)
    const [row] = await db
      .insert(posts)
      .values({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        color: post.color,
        readTime: post.readTime,
        bodyHtml: bodyToHtml(post.body),
        tags: post.tags,
        featured: post.featured,
        published: true,
        publishedAt,
        seoTitle: `${post.title} — Vandana Skin Diary`,
        seoDescription: post.excerpt,
      })
      .returning({ id: posts.id })

    const linkedIds = post.relatedProducts
      .map((legacyId) => productIdMap.get(legacyId))
      .filter((x): x is number => x !== undefined)

    if (linkedIds.length > 0) {
      await db.insert(postsProducts).values(
        linkedIds.map((productId, position) => ({
          postId: row.id,
          productId,
          position,
        }))
      )
    }
  }

  console.log('done')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
