import { config } from 'dotenv'

config({ path: '.env.local' })
config()

if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
  process.env.POSTGRES_URL = process.env.DATABASE_URL
}
if (!process.env.POSTGRES_URL_NON_POOLING && process.env.DATABASE_URL_UNPOOLED) {
  process.env.POSTGRES_URL_NON_POOLING = process.env.DATABASE_URL_UNPOOLED
}
