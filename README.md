# Vandana Skin Diary

A Next.js 15 beauty blog with a built-in admin dashboard, Vercel Postgres database (Neon), and image uploads via Vercel Blob.

## Stack
- **Next.js 15** (App Router, Server Components, ISR)
- **TypeScript**
- **Vercel Postgres** (Neon under the hood)
- **Drizzle ORM**
- **Vercel Blob** for image uploads
- **JWT cookie auth** for the `/admin` dashboard
- **Tailwind CSS v3**
- **Tiptap** rich-text editor

---

## Local startup

You need a Vercel project with a Postgres database already provisioned (see deployment steps below). Then:

```bash
# 1. Install deps
npm install

# 2. Pull env vars from Vercel into .env.local
npm i -g vercel
vercel link            # pick the vandanaskindiary project
vercel env pull .env.local

# 3. Push schema, seed data, create the admin user
npm run db:push
npm run db:seed
npm run admin:set-password vandana@example.com 'a-strong-password'

# 4. Run the dev server
npm run dev            # http://localhost:3000
```

Admin login: `http://localhost:3000/admin/login`

> If `db:push` errors with `No POSTGRES_URL or DATABASE_URL found`, the env wasn't pulled — re-run `vercel env pull .env.local`.

---

## Deploying to Vercel — full step-by-step

### 1. Push code to GitHub
```bash
git push origin main
```

### 2. Create the Vercel project
- Go to **[vercel.com/new](https://vercel.com/new)** → import `vandanaskindiary/vandanaskindiary.github.io`
- Framework preset: **Next.js** (auto-detected)
- **Don't click Deploy yet** — add the database first

### 3. Provision Postgres (Neon)
- Project → **Storage** tab → **Create Database** → pick **Neon Postgres**
- Region: **Singapore (`ap-southeast-1`)** — closest Neon region to India
- **Connect** to the project — auto-injects `DATABASE_URL`, `POSTGRES_URL`, etc.

### 4. Provision Vercel Blob (image storage)
- Same **Storage** tab → **Create Store** → **Blob**
- Connect it — auto-injects `BLOB_READ_WRITE_TOKEN`

### 5. Add the remaining env vars
Project → **Settings → Environment Variables** (set for Production, Preview, Development):

| Key | Value |
|---|---|
| `AUTH_SECRET` | output of `openssl rand -base64 32` |
| `ADMIN_EMAIL` | the writer's email |
| `NEXT_PUBLIC_SITE_URL` | `https://vandanaskindiary.com` (or the Vercel URL until DNS is set) |

### 6. Set the function region to Mumbai
Project → **Settings → Functions** → **Region** → **Mumbai (`bom1`)**.
(The DB lives in Singapore, but functions run in Mumbai for lowest latency to Indian visitors.)

### 7. First deploy
Click **Deploy**. Build will succeed; the DB is empty.

### 8. Push schema, seed data, create admin (one-time)
```bash
vercel link
vercel env pull .env.local
npm run db:push
npm run db:seed
npm run admin:set-password vandana@example.com 'her-password'
```

### 9. Visit the live URL
Blog renders from the DB. Admin login at `/admin/login`.

### 10. Custom domain (optional)
Project → **Settings → Domains** → add `vandanaskindiary.com`. Vercel walks through the DNS records.

---

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema to DB (run after schema edits) |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:seed` | Seed DB from `data/posts.ts` and `data/products.ts` |
| `npm run admin:set-password <email> <password>` | Create or reset an admin user |

---

## How your sister uses the dashboard

1. Open `https://vandanaskindiary.com/admin` → log in
2. **Posts → New Post** → write, paste images, link products, **Publish**
3. **Products → New Product** → name, brand, price, affiliate link, image
4. Linked products auto-appear at the bottom of the post

(The dashboard UI itself is being built — auth + DB layer is already in place.)

---

## Affiliate disclosure
Affiliate links go in the `link` field of each product (Amazon, Nykaa, Flipkart, Myntra, etc).
The disclosure banner is already in place on `/products` and inside every blog post.
