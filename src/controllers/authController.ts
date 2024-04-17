import { Request, Response } from 'express';
import ApiError from '../utils/apiError';
import { ResponceMessage, StatusCode } from '../enums';
import authService from '../services/authService';
import handleError from '../utils/handleError';
import { registrationSchema } from '../schemas';
import isDataValid from '../utils/isDataValid';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!isDataValid(registrationSchema, { email, password })) {
        throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS);
      }

      const user = await authService.register(email, password);

      res.status(+StatusCode.OK).send(user);
    } catch (error) {
      handleError(res, error);
    }
  }

  login(req: Request, res: Response) {
    res
      .status(+StatusCode.OK)
      .send({ user: req.user, message: ResponceMessage.LOGIN });
  }

  logout(req: Request, res: Response) {
    req.logout(() => {
      res.status(+StatusCode.OK).send(ResponceMessage.LOGOUT);
    });
  }
}

export default new AuthController();
