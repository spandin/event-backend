import { SESSION_MAX_AGE, CLIENT_BASE_URL } from './constants'

export const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET || '',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: SESSION_MAX_AGE
  }
}

export const CORS_CONFIG = {
  origin: [CLIENT_BASE_URL],
  credentials: true
}
