import memorystore from 'memorystore'
import session from 'express-session'
import { SESSION_MAX_AGE } from './constants/index.js'

const MemoryStore = memorystore(session)

const sessionParser = session({
  secret: process.env.SESSION_SECRET || '',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: SESSION_MAX_AGE,
    ...(process.env.NODE_ENV === 'production'
      ? {
          secure: true,
          sameSite: 'none'
        }
      : {})
  },
  store: new MemoryStore({
    checkPeriod: 86400000
  })
})

export default sessionParser
