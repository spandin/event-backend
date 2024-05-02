import prisma from '../prisma.js'
import { local_user } from '@prisma/client'

class LocalUserRepository {
  create(user_id: string, password: string) {
    return prisma.local_user.create({
      data: {
        password,
        user_id
      }
    })
  }

  update(user_id: string, user: Partial<local_user>) {
    return prisma.local_user.update({
      where: {
        user_id
      },
      data: { ...user }
    })
  }
}

export default new LocalUserRepository()
