import { Response, Request, NextFunction } from 'express'
import { StatusCode } from '../enums/index.js'
import { ApiError } from '../utils/index.js'

export default (error: Error, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof ApiError) {
    res.status(error.status).send({ message: error.message })
  } else {
    res.status(+StatusCode.SERVER_ERROR).send({ message: error.message })
  }

  next()
}
