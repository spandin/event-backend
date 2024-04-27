import passport from 'passport'
import { Strategy } from 'passport-local'
import { ResponceMessage, StatusCode } from '../enums/index.js'
import isDataValid from '../utils/isDataValid.js'
import { loginSchema } from '../schemas/index.js'
import authService from '../services/authService.js'
import ApiError from '../utils/apiError.js'

passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await authService.getAuthenticatedUser(id)

    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

passport.use(
  new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      if (!isDataValid(loginSchema, { email, password })) {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      }

      const user = await authService.loginLocalUser(email, password)
      return done(null, user)
    } catch (error) {
      if (error instanceof Error) return done(error)
    }
  })
)
