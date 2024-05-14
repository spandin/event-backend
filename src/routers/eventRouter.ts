import express from 'express'
import { isUserAuthenticated } from '../middleware/isUserAuthenticated.js'
import eventController from '../controllers/rest/restEventController.js'

const eventRouter = express.Router()

eventRouter.use(isUserAuthenticated)
eventRouter.get('', eventController.getEventsByUserId)
eventRouter.get('/:id', eventController.getEventByEventId)
eventRouter.get('/:id/members', eventController.getEventMembersByEventId)

export default eventRouter
