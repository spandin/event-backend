import express from 'express'
import authController from '../controllers/authController.js'
import passport from 'passport'
import { isUserAuthenticated } from '../middleware/isUserAuthenticated.js'
import { CLIENT_ORIGINS } from '../constants/index.js'

const authRouter = express.Router()

authRouter.post('/register', authController.registerLocalUser)
authRouter.post('/login', passport.authenticate('local'), authController.getAuthentificatedUser)
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
authRouter.get('/google/callback', passport.authenticate('google', { successRedirect: CLIENT_ORIGINS[0] }))
authRouter.get('/user', isUserAuthenticated, authController.getAuthentificatedUser)
authRouter.delete('/logout', isUserAuthenticated, authController.logout)

export default authRouter
