import { Response, Request, NextFunction } from 'express'
import { StatusCode } from '../enums'
import ApiError from '../utils/apiError'

export default (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof ApiError) {
    res.status(error.status).send({ message: error.message })
  } else {
    res.status(+StatusCode.SERVER_ERROR).send({ message: error.message })
  }

  next()
}
