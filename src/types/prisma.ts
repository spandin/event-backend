import { PrismaClient, Prisma } from '@prisma/client'

export type PrismaTransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>

export type UserWithLocalGoogle = Prisma.userGetPayload<{
  include: {
    local_user: true
    google_user: true
  }
}>

export type EventWithOwner = Prisma.eventGetPayload<{
  include: {
    owner: true
  }
}>

export type EventWithMembersOwner = Prisma.eventGetPayload<{
  include: {
    owner: true
    members: true
  }
}>

export type EventMemberWithUser = Prisma.event_memberGetPayload<{
  include: {
    user: true
  }
}>
