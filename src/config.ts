import { CorsOptions } from 'cors'
import { SessionOptions } from 'express-session'
import { SESSION_MAX_AGE, CLIENT_BASE_URL } from './constants'

export const SESSION_CONFIG: SessionOptions = {
  secret: process.env.SESSION_SECRET || '',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: SESSION_MAX_AGE
  }
}

export const CORS_CONFIG: CorsOptions = {
  origin: [CLIENT_BASE_URL],
  credentials: true
}
