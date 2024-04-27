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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: new PrismaSessionStore(prisma as any, {
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined
  })
}

export const CORS_CONFIG: CorsOptions = {
  origin: CLIENT_BASE_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: true
}
