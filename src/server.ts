import express from 'express'
import passport from 'passport'
import routes from './routers'
import session from 'express-session'
import cors from 'cors'
import './strategies/local-strategy'
import './strategies/google-strategy'
import { SESSION_MAX_AGE, SESSION_SECRET } from './constants'

const server = express()

server.use(
  cors({
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials: true,
    preflightContinue: true
  })
)
server.use(express.json())

server.use(
  session({
    secret: process.env.SESSION_SECRET || SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: SESSION_MAX_AGE
    }
  })
)

server.use(passport.initialize())
server.use(passport.session())

server.use(routes)

export default server
