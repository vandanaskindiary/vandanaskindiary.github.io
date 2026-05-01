# Vandana Skin Diary — Next.js 14

A clean, modern, mobile-friendly beauty blog optimised for affiliate marketing and Pinterest traffic.

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Fonts** — Cormorant Garamond + DM Sans

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → open http://localhost:3000

# 3. Build for production
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          ← Root layout (Navbar + Footer)
│   ├── page.tsx            ← Home page
│   ├── globals.css         ← Global styles + Tailwind
│   ├── blog/
│   │   ├── page.tsx        ← Blog listing (filterable + searchable)
│   │   └── [slug]/
│   │       └── page.tsx    ← Single post template
│   ├── products/
│   │   └── page.tsx        ← Affiliate shop (sortable + filterable)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── privacy/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   ├── ProductCard.tsx
│   ├── NewsletterForm.tsx
│   └── ShareButtons.tsx
└── data/
    ├── types.ts            ← TypeScript types
    ├── posts.ts            ← All blog posts + body content
    └── products.ts         ← All affiliate products
```

## Adding Affiliate Links

Open `data/products.ts` and replace each `YOUR_AFFILIATE_LINK_HERE` with your actual affiliate URL:

```ts
{
  id: 'p1',
  name: 'Minimalist 10% Niacinamide Serum',
  link: 'https://www.amazon.in/dp/XXXXXX?tag=yourtag-21', // ← your link here
  where: 'Amazon',
  ...
}
```

## Adding New Posts

Add a new object to the `POSTS` array in `data/posts.ts`:

```ts
{
  id: 11,
  slug: 'your-post-slug',        // used as URL: /blog/your-post-slug
  category: 'Skincare',
  title: 'Your Post Title',
  excerpt: 'Short description...',
  readTime: '5 min',
  date: 'May 1, 2026',
  featured: false,               // set true to show on homepage
  color: '#e8d8e8',              // placeholder image bg color
  tags: ['tag1', 'tag2'],
  relatedProducts: ['p1', 'p3'], // product IDs to show in post
  body: [
    { heading: 'Section Heading', content: 'Section body text...' },
    // add as many sections as you need
  ],
}
```

## Deploying to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Click **Deploy** — done! 🚀

No environment variables needed for the base setup.

## Affiliate Platforms Supported
- Amazon Associates
- Flipkart Affiliate
- Nykaa Affiliate
- Myntra Affiliate

## SEO
- Every page has `<title>` and `<meta description>` via Next.js `generateMetadata`
- Blog posts have OpenGraph tags for Pinterest/social sharing
- Static generation (`generateStaticParams`) for all blog post pages
- Clean URL structure: `/blog/post-slug`, `/products`, etc.

---
Made with 💜 by Vandana Skin Diary
