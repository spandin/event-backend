import { NextFunction, Request, Response } from 'express'
import { StatusCode } from '../../enums/index.js'
import eventService from '../../services/rest/restEventService.js'

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

  async getEventMembersByEventId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const eventMembers = await eventService.getEventMembersByEventId(id)

      res.status(+StatusCode.OK).send({ data: { eventMembers } })
    } catch (error) {
      next(error)
    }
  }
}

export default new EventController()
