# Vandana Skin Diary

A Next.js 15 beauty blog with a built-in admin dashboard, Vercel Postgres database, and image uploads via Vercel Blob.

## Stack
- **Next.js 15** (App Router, Server Components, ISR)
- **TypeScript** (strict)
- **Vercel Postgres** (Neon under the hood)
- **Drizzle ORM**
- **Vercel Blob** for image uploads
- **JWT cookie auth** for the `/admin` dashboard
- **Tailwind CSS v3**
- **Tiptap** rich-text editor

## Local development

```bash
npm install
cp .env.example .env.local        # fill values from your Vercel project
npm run db:push                   # creates tables in your Postgres
npm run db:seed                   # ports the existing static posts/products into DB
npm run admin:set-password vandana@example.com 'a-strong-password'
npm run dev                       # http://localhost:3000
```

The admin lives at `http://localhost:3000/admin`.

---

## Deploying to Vercel — full step-by-step

### 1. Push code to GitHub
The repo is already wired to `git@github-personal:vandanaskindiary/vandanaskindiary.github.io.git`. After committing, run:
```bash
git push origin main
```

### 2. Create the Vercel project
1. Go to **[vercel.com/new](https://vercel.com/new)** → import the `vandanaskindiary/vandanaskindiary.github.io` repo.
2. Framework preset: **Next.js** (auto-detected).
3. Don't click Deploy yet — first add the database.

### 3. Provision Vercel Postgres (Neon)
1. In the Vercel project → **Storage** tab → **Create Database** → pick **Neon Postgres** from the marketplace.
2. Choose region **Washington D.C. (iad1)** (matches the build region; lowest latency).
3. After creation, click **Connect** and link it to your project.
   This auto-injects `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_USER`, etc. into your env.

### 4. Provision Vercel Blob (image storage)
1. Same **Storage** tab → **Create Store** → **Blob**.
2. Connect it to your project.
   Auto-injects `BLOB_READ_WRITE_TOKEN`.

### 5. Add the remaining env vars manually
Project → **Settings → Environment Variables**, add for **Production, Preview, Development**:

| Key | Value |
|---|---|
| `AUTH_SECRET` | run `openssl rand -base64 32` and paste the output |
| `ADMIN_EMAIL` | the writer's email (used at login) |
| `NEXT_PUBLIC_SITE_URL` | `https://vandanaskindiary.com` (or the Vercel URL until DNS is set) |

`ADMIN_PASSWORD_HASH` is set by running the password script — see step 7.

### 6. First deploy
Click **Deploy**. The build will succeed but the DB is empty.

### 7. Push schema, seed, set admin password
Pull the env locally (one-time):
```bash
npm i -g vercel
vercel link            # pick the project you just created
vercel env pull .env.local
```
Then:
```bash
npm run db:push                                                   # creates tables
npm run db:seed                                                   # ports static data
npm run admin:set-password vandana@example.com 'her-password'     # creates admin user
```

### 8. Redeploy (or just open the live URL)
Visit `https://<your-project>.vercel.app` — the blog renders from the DB.
Admin login lives at `/admin/login`.

### 9. Custom domain (optional)
Project → **Settings → Domains** → add `vandanaskindiary.com`. Vercel walks you through the DNS records.

---

## How your sister uses the dashboard

1. Open `https://vandanaskindiary.com/admin` → log in.
2. **Posts → New Post** → write, paste images, link products, click **Publish**.
3. **Products → New Product** → name, brand, price, affiliate link, image.
4. Linked products auto-appear at the bottom of the post.

(Coming in the next commit: this dashboard UI itself. The auth + DB layer is in place; UI is being built.)

---

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (run before pushing if unsure) |
| `npm run db:push` | Push schema changes to DB |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:seed` | Seed DB from `data/posts.ts` and `data/products.ts` |
| `npm run admin:set-password <email> <password>` | Create or reset an admin |

## Affiliate disclosure
Affiliate links go in the `link` field of each product (Amazon, Nykaa, Flipkart, Myntra, etc).
The disclosure banner is already in place on `/products` and inside every blog post.
