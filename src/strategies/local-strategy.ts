import passport from 'passport'
import { Strategy } from 'passport-local'
import { ResponceMessage, StatusCode } from '../enums/index.js'
import { loginSchema } from '../schemas/index.js'
import authService from '../services/rest/restAuthService.js'
import { ApiError } from '../utils/index.js'
import { validateDataWithSchema } from '../utils/schemas/validateDataWithSchema.js'

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
      const validatedData = validateDataWithSchema(
        loginSchema,
        { email, password },
        new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      )

      const user = await authService.loginLocalUser(validatedData.email, validatedData.password)
      return done(null, user)
    } catch (error) {
      if (error instanceof Error) return done(error)
    }
  })
)
