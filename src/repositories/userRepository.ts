import prisma from '../prisma.js'
import { user } from '@prisma/client'

class UserRepository {
  getByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email
      },
      include: {
        google_user: true,
        local_user: true
      }
    })
  }

  getById(id: string) {
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

  getByGoogleId(google_id: string) {
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

  create(email: string) {
    return prisma.user.create({
      data: {
        email
      }
    })
  }

  update(id: string, user: Partial<user>) {
    return prisma.user.update({
      where: {
        id
      },
      data: { ...user }
    })
  }
}

export default new UserRepository()
