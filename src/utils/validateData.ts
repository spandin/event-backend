import { Schema } from 'zod'
import ApiError from './apiError.js'
import { ResponceMessage, StatusCode } from '../enums/index.js'

export const validateDataWithSchema = <T>(schema: Schema<T>, data: unknown): T => {
  const validation = schema.safeParse(data)

  if (!validation.success) {
    throw new ApiError(StatusCode.BAD_REQUEST, ResponceMessage.WRONG_PROPS)
  }

  return validation.data
}
