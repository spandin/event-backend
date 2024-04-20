import express from 'express';
import passport from 'passport';
import routes from './routers';
import session from 'express-session';
import cors from 'cors';
import './strategies/local-strategy';
import './strategies/google-strategy';
import { PORT, SESSION_MAX_AGE, SESSION_SECRET } from './constants';

const SERVER_PORT = process.env.PORT || PORT;

const initialize = () => {
  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:5173'],
      optionsSuccessStatus: 200,
      credentials: true,
      preflightContinue: true,
    })
  );
  app.use(express.json());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: SESSION_MAX_AGE,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(routes);

  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
};

initialize();
