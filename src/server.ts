import express from 'express'
import passport from 'passport'
import routes from './routers/index.js'
import cors from 'cors'
import './strategies/local-strategy.js'
import './strategies/google-strategy.js'
import { CORS_CONFIG } from './config.js'
import { createServer } from 'http'
import sessionParser from './sessionParser.js'

const app = express()

app.enable('trust proxy')

app.use(cors(CORS_CONFIG))
app.use(express.json())
app.use(sessionParser)

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

const server = createServer()

export default server
