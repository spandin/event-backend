import prisma from '../prisma';

class UserRepository {
  async getUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getUserById(id: number) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async createUser(email: string, password: string) {
    return await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}

export default new UserRepository();
