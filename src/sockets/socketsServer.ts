import { Server } from 'socket.io'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import server from '../server.js'
import passport from 'passport'
import sessionParser from '../sessionParser.js'
import SocketsHandler from './socketsHandler.js'

const io = new Server(server)

const onlyForHandshake = (middleware: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const isHandshake = req._query.sid === undefined
    if (isHandshake) {
      middleware(req, res, next)
    } else {
      next()
    }
  }
}

io.engine.use(onlyForHandshake(sessionParser))
io.engine.use(onlyForHandshake(passport.session()))
io.engine.use(
  onlyForHandshake((req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.writeHead(401)
      res.end()
    }
  })
)

io.on('connection', (socket) => {
  const socketsHandler = new SocketsHandler(io, socket)
  socketsHandler.initialize()
})
