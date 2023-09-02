import dotenv from 'dotenv'

dotenv.config()

export default {
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASS,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DIALECT: process.env.DB_DIALECT,
}
