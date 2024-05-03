import prisma from '../prisma.js'
import { google_user } from '@prisma/client'
import { PrismaTransactionClient } from '../types/index.js'

class GoogleUserRepository {
  createOne(user_id: string, google_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.google_user.create({
      data: {
        google_id,
        user_id
      }
    })
  }

  updateOne(user_id: string, user: Partial<google_user>, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.google_user.update({
      where: {
        user_id
      },
      data: { ...user }
    })
  }
}

export default new GoogleUserRepository()
