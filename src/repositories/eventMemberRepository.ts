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
        user: true
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
        user: true
      }
    })
  }

  createOne(event_id: string, user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.create({
      data: {
        user_id,
        event_id
      },
      include: {
        user: true
      }
    })
  }

  updateOneByEventIdAndUserId(event_id: string, user_id: string, data: Partial<event_member>, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.event_member.update({
      where: {
        user_id_event_id: {
          user_id,
          event_id
        }
      },
      data,
      include: {
        user: true
      }
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

    return prismaInstance.event_member.delete({
      where: {
        user_id_event_id: {
          user_id,
          event_id
        }
      },
      include: {
        user: true
      }
    })
  }
}

export default new EventMemberRepository()
