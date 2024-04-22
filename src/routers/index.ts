import express from 'express'
import authRouter from './authRouter'
import errorHandler from '../middleware/errorHandler'

const routes = express.Router()
routes.use('/auth', authRouter)
routes.use(errorHandler)

export default routes
