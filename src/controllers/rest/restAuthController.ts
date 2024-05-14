import { NextFunction, Request, Response } from 'express'
import { ResponceMessage, StatusCode } from '../../enums/index.js'
import authService from '../../services/rest/restAuthService.js'
import { registrationSchema } from '../../schemas/index.js'
import { validateDataWithSchema } from '../../utils/schemas/validateDataWithSchema.js'
import { ApiError } from '../../utils/index.js'

class AuthController {
  async registerLocalUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = validateDataWithSchema(
        registrationSchema,
        { email: req.body.email, password: req.body.password },
        new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
      )

      await authService.registerLocalUser(email, password)

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
