import './lib/load-env'
import { defineConfig } from 'drizzle-kit'

const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
if (!url) {
  throw new Error('No POSTGRES_URL or DATABASE_URL found in env. Run `vercel env pull .env.local` first.')
}

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: { url },
})
