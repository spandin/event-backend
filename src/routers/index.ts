import express from 'express'
import authRouter from './authRouter'

const routes = express.Router()
routes.use('/auth', authRouter)

export default routes
