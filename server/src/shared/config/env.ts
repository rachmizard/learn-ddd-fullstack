import dotenv from 'dotenv'
dotenv.config()

type Env = 'development' | 'production'

const _env = {
  development: {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/express-ts',
  },
  production: {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/express-ts',
  },
}

export const env = _env[(process.env.NODE_ENV as Env) || 'development']
