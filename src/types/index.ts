import z from 'zod'
import { createEventSchema, updateEventSchema } from '../schemas/index.js'

export type CreateEvent = z.infer<typeof createEventSchema>
export type UpdateEvent = z.infer<typeof updateEventSchema>
