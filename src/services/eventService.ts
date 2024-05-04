import { EventWithMembersOwner, PrismaTransactionClient, UserWithLocalGoogle } from '../types/index.js'
import { ResponceMessage, StatusCode } from '../enums/index.js'
import eventMemberRepository from '../repositories/eventMemberRepository.js'
import eventRepository from '../repositories/eventRepository.js'
import userRepository from '../repositories/userRepository.js'
import { CreateEvent, UpdateEvent } from '../types/index.js'
import ApiError from '../utils/apiError.js'
import performTransaction from '../utils/performTransaction.js'

class EventService {
  async getEventByEventId(event_id: string) {
    const event = await eventRepository.getOneByEventId(event_id)
    if (!event) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.EVENT_DOESNT_EXIST)
    }
    return event
  }

  async getEventsByUserId(user_id: string) {
    return eventRepository.getAllByUserId(user_id)
  }

  async getEventMembersByEventId(event_id: string) {
    return eventMemberRepository.getAllByEventId(event_id)
  }

  async createEvent(owner_id: string, data: CreateEvent) {
    const event = await eventRepository.createOne({ owner_id, ...data })
    await this.addMemberToEvent(event.id, owner_id, owner_id)
    return event
  }

  async deleteEvent(event_id: string, owner_id: string) {
    return performTransaction(async (tx) => {
      await this.validateEventOwnership(event_id, owner_id, tx)

      await eventMemberRepository.deleteAllByEventId(event_id, tx)

      const deletedEvent = await eventRepository.deleteOne(event_id, tx)
      return deletedEvent
    })
  }

  async updateEvent(event_id: string, owner_id: string, data: UpdateEvent) {
    return performTransaction(async (tx) => {
      await this.validateEventOwnership(event_id, owner_id, tx)

      const updatedEvent = await eventRepository.updateOne(event_id, data, tx)
      return updatedEvent
    })
  }

  async addMemberToEvent(event_id: string, owner_id: string, member_id: string) {
    return performTransaction(async (tx) => {
      const event = await this.validateEventByEventId(event_id, tx)

      this.validateEventOwnership(event, owner_id)

      const isUserAMember = await this.isUserAMember(event, member_id, tx)
      if (isUserAMember) {
        throw new ApiError(StatusCode.CONFLICT, ResponceMessage.EVENT_USER_ALREADY_MEMBER)
      }

      const eventMember = await eventMemberRepository.createOne(event_id, member_id, tx)
      return eventMember
    })
  }

  async deleteMemberFromEvent(event_id: string, owner_id: string, member_id: string) {
    return performTransaction(async (tx) => {
      const event = await this.validateEventByEventId(event_id, tx)

      await this.validateEventOwnership(event, owner_id)

      const isUserAMember = await this.isUserAMember(event, member_id, tx)
      if (!isUserAMember) {
        throw new ApiError(StatusCode.CONFLICT, ResponceMessage.EVENT_USER_NOT_MEMBER)
      }

      const eventMember = await eventMemberRepository.deleteOneByEventIdAndUserId(event_id, member_id, tx)
      return eventMember
    })
  }

  async validateEventByEventId(event_id: string, tx?: PrismaTransactionClient) {
    const event = await eventRepository.getOneByEventId(event_id, tx)
    if (!event) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.EVENT_DOESNT_EXIST)
    }
    return event
  }

  async validateUserByUserId(user_id: string, tx?: PrismaTransactionClient) {
    const user = await userRepository.getOneById(user_id, tx)
    if (!user) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.USER_DOESNT_EXIST)
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
      throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.USER_NO_PERMISSION)
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

export default new EventService()
