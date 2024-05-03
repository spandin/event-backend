import prisma from '../prisma.js'
import { user } from '@prisma/client'
import { PrismaTransactionClient } from '../types/index.js'

class UserRepository {
  getOneByEmail(email: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.user.findUnique({
      where: {
        email
      },
      include: {
        google_user: true,
        local_user: true
      }
    })
  }

  getOneById(id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.user.findUnique({
      where: {
        id
      },
      include: {
        google_user: true,
        local_user: true
      }
    })
  }

  getOneByGoogleId(google_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.user.findFirst({
      where: {
        google_user: {
          google_id
        }
      },
      include: {
        google_user: true,
        local_user: true
      }
    })
  }

  createOne(email: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.user.create({
      data: {
        email
      }
    })
  }

  updateOne(id: string, user: Partial<user>, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.user.update({
      where: {
        id
      },
      data: { ...user }
    })
  }
}

export default new UserRepository()
