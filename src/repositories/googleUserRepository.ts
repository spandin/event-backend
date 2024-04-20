import prisma from '../prisma'
import { google_user } from '@prisma/client'

class GoogleUserRepository {
  async create(user_id: string, google_id: string) {
    return await prisma.google_user.create({
      data: {
        google_id,
        user_id
      }
    })
  }

  async update(user_id: string, user: Partial<google_user>) {
    return await prisma.google_user.update({
      where: {
        user_id
      },
      data: { ...user }
    })
  }
}

export default new GoogleUserRepository()
