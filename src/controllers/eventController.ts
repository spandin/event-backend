import { NextFunction, Request, Response } from 'express'
import { StatusCode, ResponceMessage } from '../enums/index.js'
import ApiError from '../utils/apiError.js'
import { createEventSchema, updateEventSchema } from '../schemas/index.js'
import eventService from '../services/eventService.js'

class EventController {
  async getEventByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const event = await eventService.getEventByEventId(id)

      res.status(+StatusCode.OK).send({ data: { event } })
    } catch (error) {
      next(error)
    }
  }

  async getEventsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await eventService.getEventsByUserId(req.user!.id)

      res.status(+StatusCode.OK).send({ data: { events } })
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, location, date } = req.body

      const validation = createEventSchema.safeParse({ title, description, location, date })

      if (!validation.success) {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      }

      const event = await eventService.createEvent(req.user!.id, validation.data)

      res.status(+StatusCode.OK).send({ data: { event }, message: ResponceMessage.EVENT_CREATED })
    } catch (error) {
      next(error)
    }
  }

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const event = await eventService.deleteEvent(id)

      res.status(+StatusCode.OK).send({ data: { event }, message: ResponceMessage.EVENT_DELETED })
    } catch (error) {
      next(error)
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const { title, description, location, date, isActive } = req.body
      const data = { title, description, location, date, isActive }

      const validation = updateEventSchema.safeParse(data)

      if (!validation.success) {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      }

      const event = await eventService.updateEvent(id, data)

      res.status(+StatusCode.OK).send({ data: { event }, message: ResponceMessage.EVENT_UPDATED })
    } catch (error) {
      next(error)
    }
  }

  async addMemberToEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const { user_id } = req.body

      if (!user_id || typeof user_id !== 'string') {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      }

      await eventService.addMemberToEvent(id, user_id)

      res.status(+StatusCode.OK).send({ message: ResponceMessage.EVENT_MEMBER_ADDED })
    } catch (error) {
      next(error)
    }
  }

  async deleteMemberFromEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const { user_id } = req.body

      if (!user_id || typeof user_id !== 'string') {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      }

      await eventService.deleteMemberFromEvent(id, user_id)

      res.status(+StatusCode.OK).send({ message: ResponceMessage.EVENT_MEMBER_DELETED })
    } catch (error) {
      next(error)
    }
  }
}

export default new EventController()
