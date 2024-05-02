import prisma from '../prisma.js'
import { google_user } from '@prisma/client'

class GoogleUserRepository {
  createOne(user_id: string, google_id: string) {
    return prisma.google_user.create({
      data: {
        google_id,
        user_id
      }
    })
  }

  updateOne(user_id: string, user: Partial<google_user>) {
    return prisma.google_user.update({
      where: {
        user_id
      },
      data: { ...user }
    })
  }
}

export default new GoogleUserRepository()
