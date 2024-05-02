import { NextFunction, Request, Response } from 'express'
import { StatusCode, ResponceMessage } from '../enums/index.js'
import ApiError from '../utils/apiError.js'
import { createEventSchema } from '../schemas/index.js'
import eventService from '../services/eventService.js'

class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, location } = req.body

      const validation = createEventSchema.safeParse({ title, description, location })

      if (!validation.success) {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      }

      const event = await eventService.createEvent(req.user!.id, validation.data)

      res.status(+StatusCode.OK).send({ data: { event }, message: ResponceMessage.EVENT_CREATED })
    } catch (error) {
      next(error)
    }
  }

  async getEventsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await eventService.getEventsByUserId(req.user!.id)

      return events
    } catch (error) {
      next(error)
    }
  }
}

export default new EventController()
