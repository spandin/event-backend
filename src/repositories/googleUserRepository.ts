import prisma from '../prisma.js'
import { google_user } from '@prisma/client'

class GoogleUserRepository {
  create(user_id: string, google_id: string) {
    return prisma.google_user.create({
      data: {
        google_id,
        user_id
      }
    })
  }

  update(user_id: string, user: Partial<google_user>) {
    return prisma.google_user.update({
      where: {
        user_id
      },
      data: { ...user }
    })
  }
}

export default new GoogleUserRepository()
