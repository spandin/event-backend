import { EventWithMembersOwner, PrismaTransactionClient, UserWithLocalGoogle } from '../../types/index.js'
import { ResponceMessage } from '../../enums/index.js'
import eventMemberRepository from '../../repositories/eventMemberRepository.js'
import eventRepository from '../../repositories/eventRepository.js'
import userRepository from '../../repositories/userRepository.js'
import { CreateEvent, UpdateEvent } from '../../types/index.js'
import { performTransaction, IntermediaryError } from '../../utils/index.js'
import { ServiceOutput } from '../../types/index.js'

class SocketsEventService {
  async createEvent(owner_id: string, data: CreateEvent): Promise<ServiceOutput> {
    const event = await eventRepository.createOne({ owner_id, ...data })
    await this.addMemberToEvent(event.id, owner_id, owner_id)

    const broadcastIds = [owner_id]

    return {
      data: {
        event
      },
      broadcastIds
    }
  }

  async deleteEvent(event_id: string, owner_id: string): Promise<ServiceOutput> {
    return performTransaction(async (tx) => {
      const event = await this.validateEventByEventId(event_id, tx)

      await this.validateEventMutability(event)
      await this.validateEventOwnership(event_id, owner_id, tx)

      await eventMemberRepository.deleteAllByEventId(event_id, tx)

      await eventRepository.deleteOne(event_id, tx)

      const broadcastIds = event.members.map((member) => member.user_id)

      return {
        data: {
          event
        },
        broadcastIds
      }
    })
  }

  async updateEvent(owner_id: string, { event_id, data }: UpdateEvent): Promise<ServiceOutput> {
    return performTransaction(async (tx) => {
      const event = await this.validateEventByEventId(event_id, tx)

      await this.validateEventMutability(event)
      await this.validateEventOwnership(event, owner_id)

      const updatedEvent = await eventRepository.updateOne(event_id, data, tx)

      const broadcastIds = event.members.map((member) => member.user_id)

      return {
        data: {
          event: updatedEvent
        },
        broadcastIds
      }
    })
  }

  async addMemberToEvent(event_id: string, owner_id: string, member_id: string): Promise<ServiceOutput> {
    return performTransaction(async (tx) => {
      const event = await this.validateEventByEventId(event_id, tx)

      await this.validateEventMutability(event)
      await this.validateEventOwnership(event, owner_id)

      const isUserAMember = await this.isUserAMember(event, member_id, tx)
      if (isUserAMember) {
        throw new IntermediaryError(ResponceMessage.EVENT_USER_ALREADY_MEMBER)
      }

      const eventMember = await eventMemberRepository.createOne(event_id, member_id, tx)

      const broadcastIds = [...event.members.map((member) => member.user_id), eventMember.user_id]

      return {
        data: {
          eventMember
        },
        broadcastIds
      }
    })
  }

  async deleteMemberFromEvent(event_id: string, owner_id: string, member_id: string): Promise<ServiceOutput> {
    return performTransaction(async (tx) => {
      const event = await this.validateEventByEventId(event_id, tx)

      await this.validateEventMutability(event)
      await this.validateEventOwnership(event, owner_id)

      if (event.owner_id === member_id) {
        throw new IntermediaryError(ResponceMessage.EVENT_MEMBER_OWNER)
      }

      const isUserAMember = await this.isUserAMember(event, member_id, tx)
      if (!isUserAMember) {
        throw new IntermediaryError(ResponceMessage.EVENT_USER_NOT_MEMBER)
      }

      const eventMember = await eventMemberRepository.deleteOneByEventIdAndUserId(event_id, member_id, tx)

      const broadcastIds = event.members.map((member) => member.user_id)

      return {
        data: {
          eventMember
        },
        broadcastIds
      }
    })
  }

  private async validateEventByEventId(event_id: string, tx?: PrismaTransactionClient) {
    const event = await eventRepository.getOneByEventId(event_id, tx)
    if (!event) {
      throw new IntermediaryError(ResponceMessage.EVENT_DOESNT_EXIST)
    }
    return event
  }

  private async validateUserByUserId(user_id: string, tx?: PrismaTransactionClient) {
    const user = await userRepository.getOneById(user_id, tx)
    if (!user) {
      throw new IntermediaryError(ResponceMessage.USER_DOESNT_EXIST)
    }
    return user
  }

  private async validateEventOwnership(event: EventWithMembersOwner, owner_id: string): Promise<void>
  private async validateEventOwnership(event_id: string, owner_id: string, tx: PrismaTransactionClient): Promise<void>
  private async validateEventOwnership(
    eventOrEventId: EventWithMembersOwner | string,
    owner_id: string,
    tx?: PrismaTransactionClient
  ): Promise<void> {
    const event = typeof eventOrEventId === 'string' ? await this.validateEventByEventId(eventOrEventId, tx) : eventOrEventId

    const isUserAnOwner = event.owner_id === owner_id
    if (!isUserAnOwner) {
      throw new IntermediaryError(ResponceMessage.USER_NO_PERMISSION)
    }
  }

  private async validateEventMutability(event: EventWithMembersOwner): Promise<void>
  private async validateEventMutability(event_id: string, tx: PrismaTransactionClient): Promise<void>
  private async validateEventMutability(eventOrEventId: EventWithMembersOwner | string, tx?: PrismaTransactionClient) {
    const event = typeof eventOrEventId === 'string' ? await this.validateEventByEventId(eventOrEventId, tx) : eventOrEventId

    const isEventArchived = event.isArchived

    if (isEventArchived) {
      throw new IntermediaryError(ResponceMessage.EVENT_ARCHIVED)
    }
  }

  private async isUserAMember(event_id: string, user_id: string, tx: PrismaTransactionClient): Promise<boolean>
  private async isUserAMember(event: EventWithMembersOwner, user: UserWithLocalGoogle, tx: PrismaTransactionClient): Promise<boolean>
  private async isUserAMember(event: EventWithMembersOwner, user_id: string, tx: PrismaTransactionClient): Promise<boolean>
  private async isUserAMember(event_id: string, user: UserWithLocalGoogle, tx: PrismaTransactionClient): Promise<boolean>
  private async isUserAMember(event: EventWithMembersOwner, user: UserWithLocalGoogle): Promise<boolean>
  private async isUserAMember(
    eventOrEventId: EventWithMembersOwner | string,
    userOrUserId: UserWithLocalGoogle | string,
    tx?: PrismaTransactionClient
  ) {
    const event = typeof eventOrEventId === 'string' ? await this.validateEventByEventId(eventOrEventId, tx) : eventOrEventId
    const user = typeof userOrUserId === 'string' ? await this.validateUserByUserId(userOrUserId, tx) : userOrUserId

    const isUserAMember = event.members.some((member) => member.user_id === user.id)
    return isUserAMember
  }
}

export default new SocketsEventService()
