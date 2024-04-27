import express from 'express'
import passport from 'passport'
import routes from './routers/index.js'
import session from 'express-session'
import cors from 'cors'
import './strategies/local-strategy.js'
import './strategies/google-strategy.js'
import { SESSION_CONFIG, CORS_CONFIG } from './config.js'
const server = express()

server.use(cors(CORS_CONFIG))
server.use(express.json())

server.use(session(SESSION_CONFIG))

server.use(passport.initialize())
server.use(passport.session())

server.use(routes)

export default server
