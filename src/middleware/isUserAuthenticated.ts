import { Request, Response, NextFunction } from 'express';
import { ResponceMessage, StatusCode } from '../enums';
import ApiError from '../utils/apiError';
import handleError from '../utils/handleError';

export const isUserAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.isAuthenticated()) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.UNAUTHORIZED);
    }

    next();
  } catch (error) {
    handleError(res, error);
  }
};
