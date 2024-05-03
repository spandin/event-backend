import { event_member } from '@prisma/client'
import { PrismaTransactionClient } from '../types/index.js'
import prisma from '../prisma.js'

class EventMemberRepository {
  getAllByUserId(user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.findMany({
      where: {
        user_id
      },
      include: {
        event: true
      }
    })
  }

  getAllByEventId(event_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.findMany({
      where: {
        event_id
      },
      include: {
        event: true
      }
    })
  }

  createOne(event_id: string, user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.create({
      data: {
        user_id,
        event_id
      }
    })
  }

  updateOneByEventIdAndUserId(event_id: string, user_id: string, data: Partial<event_member>, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.updateMany({
      where: {
        event_id,
        user_id
      },
      data
    })
  }

  deleteAllByEventId(event_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.deleteMany({
      where: {
        event_id
      }
    })
  }

  deleteAllByUserId(user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.deleteMany({
      where: {
        user_id
      }
    })
  }

  deleteOneByEventIdAndUserId(event_id: string, user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.deleteMany({
      where: {
        event_id,
        user_id
      }
    })
  }
}

export default new EventMemberRepository()
