import z from 'zod'
import { createEventSchema, updateEventSchema } from '../schemas/index.js'
import { PrismaClient } from '@prisma/client'

export type CreateEvent = z.infer<typeof createEventSchema>
export type UpdateEvent = z.infer<typeof updateEventSchema>

export type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>
