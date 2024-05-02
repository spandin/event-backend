import { event } from '@prisma/client'
import prisma from '../prisma.js'
import { CreateEvent } from '../types/index.js'

type CreateEventWithCreatorId = CreateEvent & {
  creator_id: string
}

class EventRepository {
  getAllByUserId(user_id: string) {
    return prisma.event.findMany({
      where: {
        members: {
          some: {
            user_id
          }
        }
      },
      include: {
        creator: true
      }
    })
  }

  getOneByEventId(id: string) {
    return prisma.event.findUnique({
      where: {
        id
      },
      include: {
        members: true,
        purchases: true,
        creator: true
      }
    })
  }

  createOne({ creator_id, title, description, location, date }: CreateEventWithCreatorId) {
    return prisma.event.create({
      data: {
        title,
        creator_id,
        date,
        ...(description && { description }),
        ...(location && { location })
      }
    })
  }

  updateOne(id: string, data: Partial<event>) {
    return prisma.event.update({
      where: {
        id
      },
      data
    })
  }

  deleteOne(id: string) {
    return prisma.event.delete({
      where: { id }
    })
  }
}

export default new EventRepository()
