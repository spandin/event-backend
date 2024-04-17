import express from 'express';
import authController from '../controllers/authController';
import passport from 'passport';
import { isUserAuthenticated } from '../middleware/isUserAuthenticated';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', passport.authenticate('local'), authController.login);
authRouter.get('/user', isUserAuthenticated, authController.login);
authRouter.delete('/logout', isUserAuthenticated, authController.logout);

export default authRouter;
