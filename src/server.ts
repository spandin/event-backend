import express from 'express'
import passport from 'passport'
import routes from './routers'
import session from 'express-session'
import cors from 'cors'
import './strategies/local-strategy'
import './strategies/google-strategy'
import { SESSION_CONFIG, CORS_CONFIG } from './config'
const server = express()

server.use(cors(CORS_CONFIG))
server.use(express.json())

server.use(session(SESSION_CONFIG))

server.use(passport.initialize())
server.use(passport.session())

server.use(routes)

export default server
