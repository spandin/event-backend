import express from 'express'
import { isUserAuthenticated } from '../middleware/isUserAuthenticated.js'
import eventController from '../controllers/eventController.js'

const eventRouter = express.Router()

eventRouter.use(isUserAuthenticated)
eventRouter.post('', eventController.createEvent)

export default eventRouter
