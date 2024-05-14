import { Schema } from 'zod'

export const validateDataWithSchema = <T>(schema: Schema<T>, data: unknown, error: Error): T => {
  const validation = schema.safeParse(data)

  if (!validation.success) {
    throw error
  }

  return validation.data
}
