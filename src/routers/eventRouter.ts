import express from 'express'
import { isUserAuthenticated } from '../middleware/isUserAuthenticated.js'

const eventRouter = express.Router()

eventRouter.use(isUserAuthenticated)

export default eventRouter
