import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema',
  out: './db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
  verbose: true,
  strict: true,
});