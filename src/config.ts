import { CorsOptions } from 'cors'
import { SessionOptions } from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { SESSION_MAX_AGE, CLIENT_BASE_URL } from './constants/index.js'
import prisma from './prisma.js'

export const SESSION_CONFIG: SessionOptions = {
  secret: process.env.SESSION_SECRET || '',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: SESSION_MAX_AGE
  },
  store: new PrismaSessionStore(prisma, {
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined
  })
}

export const CORS_CONFIG: CorsOptions = {
  origin: [CLIENT_BASE_URL],
  credentials: true
}
