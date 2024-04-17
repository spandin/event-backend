import bcrypt from 'bcrypt';
import ApiError from '../utils/apiError';
import { StatusCode, ResponceMessage } from '../enums';
import { SALT_ROUNDS } from '../constants';
import userRepository from '../repositories/userRepository';
import cleanUser from '../utils/cleanUser';

class AuthService {
  async register(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email);

    if (user) {
      throw new ApiError(
        StatusCode.CONFLICT,
        ResponceMessage.USER_ALREADY_EXISTS
      );
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await userRepository.createUser(email, hash);

    return cleanUser(newUser);
  }

  async login(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error(ResponceMessage.USER_DOESNT_EXIST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error(ResponceMessage.USER_WRONG_PASSWORD);
    }

    return cleanUser(user);
  }

  async getUser(id: number) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new Error(ResponceMessage.USER_DOESNT_EXIST);
    }

    return cleanUser(user);
  }
}

export default new AuthService();
