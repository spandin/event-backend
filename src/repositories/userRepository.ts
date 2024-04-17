import prisma from '../prisma';

class UserRepository {
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
