import passport from 'passport';
import { Strategy } from 'passport-local';
import { ResponceMessage } from '../enums';
import isDataValid from '../utils/isDataValid';
import { loginSchema } from '../schemas';
import authService from '../services/authService';

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await authService.getAuthenticatedUser(id);

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(
  new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      if (!isDataValid(loginSchema, { email, password })) {
        throw new Error(ResponceMessage.WRONG_PROPS);
      }

      const user = await authService.loginLocalUser(email, password);
      return done(null, user);
    } catch (error) {
      if (error instanceof Error) return done(error.message);
    }
  })
);
