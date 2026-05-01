export type Post = {
  id: number
  slug: string
  category: string
  title: string
  excerpt: string
  readTime: string
  date: string
  featured: boolean
  color: string
  tags: string[]
  relatedProducts: string[]
  body: {
    heading: string
    content: string
  }[]
}

export type Product = {
  id: string
  name: string
  brand: string
  price: string
  mrp: string
  rating: number
  reviews: number
  category: string
  tag: string
  color: string
  desc: string
  link: string
  where: string
  tags: string[]
}
