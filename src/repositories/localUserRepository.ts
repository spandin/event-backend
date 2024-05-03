import prisma from '../prisma.js'
import { local_user } from '@prisma/client'
import { PrismaTransactionClient } from '../types/index.js'

class LocalUserRepository {
  createOne(user_id: string, password: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.local_user.create({
      data: {
        password,
        user_id
      }
    })
  }

  updateOne(user_id: string, user: Partial<local_user>, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    return prismaInstance.local_user.update({
      where: {
        user_id
      },
      data: { ...user }
    })
  }
}

export default new LocalUserRepository()
