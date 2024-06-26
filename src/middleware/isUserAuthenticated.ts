import { Request, Response, NextFunction } from 'express'
import { ResponceMessage, StatusCode } from '../enums'
import ApiError from '../utils/apiError'

export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.UNAUTHORIZED)
  }

  next()
}
