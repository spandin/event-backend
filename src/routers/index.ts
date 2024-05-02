import express from 'express'
import authRouter from './authRouter.js'
import eventRouter from './eventRouter.js'
import errorHandler from '../middleware/errorHandler.js'

const routes = express.Router()
routes.use('/auth', authRouter)
routes.use('/event', eventRouter)
routes.use(errorHandler)

export default routes
