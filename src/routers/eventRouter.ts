import express from 'express'
import { isUserAuthenticated } from '../middleware/isUserAuthenticated.js'
import eventController from '../controllers/eventController.js'

const eventRouter = express.Router()

eventRouter.use(isUserAuthenticated)
eventRouter.get('', eventController.getEventsByUserId)
eventRouter.get('/:id', eventController.getEventByEventId)
eventRouter.post('', eventController.createEvent)
eventRouter.delete('/:id', eventController.deleteEvent)
eventRouter.patch('/:id', eventController.updateEvent)
eventRouter.patch('/member/:id', eventController.addMemberToEvent)
eventRouter.delete('/member/:id', eventController.deleteMemberFromEvent)

export default eventRouter
