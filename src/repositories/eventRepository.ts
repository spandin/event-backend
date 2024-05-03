import { event } from '@prisma/client'
import { PrismaTransactionClient } from '../types/index.js'
import prisma from '../prisma.js'
import { CreateEvent } from '../types/index.js'

type CreateEventWithCreatorId = CreateEvent & {
  creator_id: string
}

class EventRepository {
  getAllByUserId(user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.findMany({
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

  getOneByEventId(id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.findUnique({
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

  createOne({ creator_id, title, description, location, date }: CreateEventWithCreatorId, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.create({
      data: {
        title,
        creator_id,
        date,
        ...(description && { description }),
        ...(location && { location })
      }
    })
  }

  updateOne(id: string, data: Partial<event>, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.update({
      where: {
        id
      },
      data
    })
  }

  deleteOne(id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.delete({
      where: { id }
    })
  }
}

export default new EventRepository()
