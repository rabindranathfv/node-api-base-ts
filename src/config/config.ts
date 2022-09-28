import { config } from 'dotenv'
config({ path: `.env.${process.env.NODE_ENV ?? 'development'}.local` })

export const {
  NODE_ENV,
  PORT,
  DB_HOS,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  EXTERNAL_API,
  CONFIG_FILES,
  CONFIG_PATH } = process.env
