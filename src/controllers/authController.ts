import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/apiError.js'
import { ResponceMessage, StatusCode } from '../enums/index.js'
import authService from '../services/authService.js'
import { registrationSchema } from '../schemas/index.js'

class AuthController {
  async registerLocalUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const validation = registrationSchema.safeParse({ email, password })

      if (!validation.success) {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      }

      await authService.registerLocalUser(validation.data.email, validation.data.password)

      res.status(+StatusCode.OK).send({ message: ResponceMessage.REGISTER })
    } catch (error) {
      next(error)
    }
  }

  logout(req: Request, res: Response, next: NextFunction) {
    try {
      req.logout(() => {
        res.status(+StatusCode.OK).send({ message: ResponceMessage.LOGOUT })
      })
    } catch (error) {
      next(error)
    }
  }

  getAuthentificatedUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(+StatusCode.OK).send({ data: { user: req.user }, message: ResponceMessage.LOGIN })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
