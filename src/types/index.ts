import z from 'zod'
import { createEventSchema } from '../schemas/index.js'

export type CreateEvent = z.infer<typeof createEventSchema>
