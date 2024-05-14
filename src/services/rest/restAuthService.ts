import bcrypt from 'bcrypt'
import { StatusCode, ResponceMessage } from '../../enums/index.js'
import { SALT_ROUNDS } from '../../constants/index.js'
import userRepository from '../../repositories/userRepository.js'
import localUserRepository from '../../repositories/localUserRepository.js'
import { Profile } from 'passport-google-oauth20'
import googleUserRepository from '../../repositories/googleUserRepository.js'
import { performTransaction, ApiError, cleanUser } from '../../utils/index.js'

class AuthService {
  async registerLocalUser(email: string, password: string) {
    return performTransaction(async (tx) => {
      const user = await userRepository.getOneByEmail(email, tx)

      if (user) {
        throw new ApiError(StatusCode.CONFLICT, ResponceMessage.USER_ALREADY_EXISTS)
      }

      const hash = await bcrypt.hash(password, SALT_ROUNDS)

      const newUser = await userRepository.createOne(email, tx)
      await localUserRepository.createOne(newUser.id, hash, tx)

      return cleanUser(newUser)
    })
  }

  async loginLocalUser(email: string, password: string) {
    const user = await userRepository.getOneByEmail(email)

    if (!user || !user.local_user) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.USER_DOESNT_EXIST)
    }

    const isPasswordValid = await bcrypt.compare(password, user.local_user.password)

    if (!isPasswordValid) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.USER_WRONG_CREDENTIALS)
    }

    return cleanUser(user)
  }

  async authentificateGoogleUser(profile: Profile) {
    const { id: google_id, emails } = profile
    const email = emails![0].value

    return performTransaction(async (tx) => {
      const user = await userRepository.getOneByGoogleId(google_id, tx)

      if (!user) {
        const newUser = await userRepository.createOne(email, tx)
        await googleUserRepository.createOne(newUser.id, google_id, tx)

        return cleanUser(newUser)
      }

      return cleanUser(user)
    })
  }

  async getAuthenticatedUser(id: string) {
    const user = await userRepository.getOneById(id)

    if (!user) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.USER_DOESNT_EXIST)
    }

    return cleanUser(user)
  }
}

export default new AuthService()
