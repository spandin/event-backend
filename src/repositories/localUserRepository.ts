import prisma from '../prisma.js'
import { local_user } from '@prisma/client'

class LocalUserRepository {
  async create(user_id: string, password: string) {
    return await prisma.local_user.create({
      data: {
        password,
        user_id
      }
    })
  }

  async update(user_id: string, user: Partial<local_user>) {
    return await prisma.local_user.update({
      where: {
        user_id
      },
      data: { ...user }
    })
  }
}

export default new LocalUserRepository()
