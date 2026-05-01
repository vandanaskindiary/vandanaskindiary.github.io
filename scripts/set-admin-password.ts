import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { db } from '../lib/db/client'
import { users } from '../lib/db/schema'
import { eq } from 'drizzle-orm'

async function main() {
  const email = process.argv[2]
  const password = process.argv[3]
  if (!email || !password) {
    console.error('usage: pnpm admin:set-password <email> <password>')
    process.exit(1)
  }
  const hash = await bcrypt.hash(password, 12)
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing) {
    await db.update(users).set({ passwordHash: hash }).where(eq(users.email, email))
    console.log(`updated password for ${email}`)
  } else {
    await db.insert(users).values({ email, passwordHash: hash })
    console.log(`created admin ${email}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
