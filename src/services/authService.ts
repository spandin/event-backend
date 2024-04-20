import bcrypt from 'bcrypt';
import ApiError from '../utils/apiError';
import { StatusCode, ResponceMessage } from '../enums';
import { SALT_ROUNDS } from '../constants';
import userRepository from '../repositories/userRepository';
import cleanUser from '../utils/cleanUser';
import localUserRepository from '../repositories/localUserRepository';
import { Profile } from 'passport-google-oauth20';
import googleUserRepository from '../repositories/googleUserRepository';

class AuthService {
  async registerLocalUser(email: string, password: string) {
    const user = await userRepository.getByEmail(email);

    if (user) {
      throw new ApiError(
        StatusCode.CONFLICT,
        ResponceMessage.USER_ALREADY_EXISTS
      );
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await userRepository.create(email);
    await localUserRepository.create(newUser.id, hash);

    return cleanUser(newUser);
  }

  async loginLocalUser(email: string, password: string) {
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new Error(ResponceMessage.USER_DOESNT_EXIST);
    }

    if (!user.local_user) {
      throw new Error(ResponceMessage.USER_WRONG_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.local_user.password
    );

    if (!isPasswordValid) {
      throw new Error(ResponceMessage.USER_WRONG_CREDENTIALS);
    }

    return cleanUser(user);
  }

  async authentificateGoogleUser(profile: Profile) {
    const { id: google_id, emails } = profile;
    const email = emails![0].value;

    const user = await userRepository.getByGoogleId(google_id);

    if (!user) {
      const newUser = await userRepository.create(email);
      await googleUserRepository.create(newUser.id, google_id);

      return cleanUser(newUser);
    }

    return cleanUser(user);
  }

  async getAuthenticatedUser(id: string) {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new Error(ResponceMessage.USER_DOESNT_EXIST);
    }

    return cleanUser(user);
  }
}

export default new AuthService();
