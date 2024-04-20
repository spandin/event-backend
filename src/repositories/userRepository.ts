import prisma from '../prisma';
import { user } from '@prisma/client';

class UserRepository {
  async getByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        google_user: true,
        local_user: true,
      },
    });
  }

  async getById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        google_user: true,
        local_user: true,
      },
    });
  }

  async getByGoogleId(google_id: string) {
    return await prisma.user.findFirst({
      where: {
        google_user: {
          google_id,
        },
      },
      include: {
        google_user: true,
        local_user: true,
      },
    });
  }

  async create(email: string) {
    return await prisma.user.create({
      data: {
        email,
      },
    });
  }

  async update(id: string, user: Partial<user>) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: { ...user },
    });
  }
}

export default new UserRepository();
