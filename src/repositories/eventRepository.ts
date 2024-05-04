import { event } from '@prisma/client'
import { PrismaTransactionClient } from '../types/index.js'
import prisma from '../prisma.js'
import { CreateEvent } from '../types/index.js'

type CreateEventWithCreatorId = CreateEvent & {
  owner_id: string
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
        owner: true
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
        owner: true,
        members: true
      }
    })
  }

  createOne({ owner_id, title, description, location, date }: CreateEventWithCreatorId, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.create({
      data: {
        title,
        owner_id,
        date,
        ...(description && { description }),
        ...(location && { location })
      },
      include: {
        members: true
      }
    })
  }

  updateOne(id: string, data: Partial<event>, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.update({
      where: {
        id
      },
      data,
      include: {
        members: true
      }
    })
  }

  deleteOne(id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event.delete({
      where: { id },
      include: {
        members: true
      }
    })
  }
}

export default new EventRepository()
