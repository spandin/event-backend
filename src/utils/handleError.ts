import { Response } from 'express';
import { StatusCode } from '../enums';
import ApiError from './apiError';

export default (res: Response, error: unknown): void => {
  if (error instanceof ApiError) {
    res.status(error.status).send({ message: error.message });
  } else if (error instanceof Error) {
    res.status(+StatusCode.SERVER_ERROR).send({ message: error.message });
  }
};
