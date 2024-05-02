import prisma from '../prisma.js'
import { user } from '@prisma/client'

class UserRepository {
  getOneByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      },
      include: {
        google_user: true,
        local_user: true
      }
    })
  }

  getOneById(id: string) {
    return prisma.user.findUnique({
      where: {
        id
      },
      include: {
        google_user: true,
        local_user: true
      }
    })
  }

  getOneByGoogleId(google_id: string) {
    return prisma.user.findFirst({
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

  createOne(email: string) {
    return prisma.user.create({
      data: {
        email
      }
    })
  }

  updateOne(id: string, user: Partial<user>) {
    return prisma.user.update({
      where: {
        id
      },
      data: { ...user }
    })
  }
}

export default new UserRepository()
