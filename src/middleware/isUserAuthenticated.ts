import { Request, Response, NextFunction } from 'express'
import { ResponceMessage, StatusCode } from '../enums/index.js'
import { ApiError } from '../utils/index.js'

export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.UNAUTHORIZED)
  }

  next()
}
