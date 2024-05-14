import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import authService from '../services/rest/restAuthService.js'

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await authService.authentificateGoogleUser(profile)
        done(null, user)
      } catch (error) {
        if (error instanceof Error) done(error)
      }
    }
  )
)
