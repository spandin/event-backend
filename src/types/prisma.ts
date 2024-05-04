import { PrismaClient, Prisma } from '@prisma/client'
import eventService from '../services/eventService.js'

export type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>
export type EventWithMembersOwner = Prisma.PromiseReturnType<typeof eventService.validateEventByEventId>
export type UserWithLocalGoogle = Prisma.PromiseReturnType<typeof eventService.validateUserByUserId>
