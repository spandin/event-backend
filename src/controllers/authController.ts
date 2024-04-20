import { Request, Response } from 'express'
import ApiError from '../utils/apiError'
import { ResponceMessage, StatusCode } from '../enums'
import authService from '../services/authService'
import { registrationSchema } from '../schemas'
import isDataValid from '../utils/isDataValid'

class AuthController {
  async registerLocalUser(req: Request, res: Response) {
    const { email, password } = req.body
    if (!isDataValid(registrationSchema, { email, password })) {
      throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
    }

    const user = await authService.registerLocalUser(email, password)

    res.status(+StatusCode.OK).send(user)
  }

  logout(req: Request, res: Response) {
    req.logout(() => {
      res.status(+StatusCode.OK).send(ResponceMessage.LOGOUT)
    })
  }

  getAuthentificatedUser(req: Request, res: Response) {
    res.status(+StatusCode.OK).send({ user: req.user, message: ResponceMessage.LOGIN })
  }
}

export default new AuthController()
