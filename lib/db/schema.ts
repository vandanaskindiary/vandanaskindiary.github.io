import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  primaryKey,
  numeric,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull().default(''),
  category: varchar('category', { length: 80 }).notNull().default('Skincare'),
  color: varchar('color', { length: 16 }).notNull().default('#e8d8e8'),
  readTime: varchar('read_time', { length: 20 }).notNull().default('5 min'),
  coverImage: text('cover_image'),
  bodyHtml: text('body_html').notNull().default(''),
  tags: text('tags').array().notNull().default([]),
  featured: boolean('featured').notNull().default(false),
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  ogImage: text('og_image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  brand: varchar('brand', { length: 120 }).notNull().default(''),
  price: varchar('price', { length: 32 }).notNull().default(''),
  mrp: varchar('mrp', { length: 32 }).notNull().default(''),
  rating: numeric('rating', { precision: 2, scale: 1 }).notNull().default('0'),
  reviews: integer('reviews').notNull().default(0),
  category: varchar('category', { length: 80 }).notNull().default('Skincare'),
  tagline: varchar('tagline', { length: 80 }).notNull().default(''),
  color: varchar('color', { length: 16 }).notNull().default('#e8d5e8'),
  description: text('description').notNull().default(''),
  link: text('link').notNull().default(''),
  whereToBuy: varchar('where_to_buy', { length: 80 }).notNull().default('Amazon'),
  coverImage: text('cover_image'),
  tags: text('tags').array().notNull().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const postsProducts = pgTable(
  'posts_products',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    position: integer('position').notNull().default(0),
  },
  (t) => ({ pk: primaryKey({ columns: [t.postId, t.productId] }) })
)

export const postsRelations = relations(posts, ({ many }) => ({
  postsProducts: many(postsProducts),
}))

export const productsRelations = relations(products, ({ many }) => ({
  postsProducts: many(postsProducts),
}))

export const postsProductsRelations = relations(postsProducts, ({ one }) => ({
  post: one(posts, { fields: [postsProducts.postId], references: [posts.id] }),
  product: one(products, { fields: [postsProducts.productId], references: [products.id] }),
}))

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type User = typeof users.$inferSelect
