import { PrismaTransactionClient } from '../types/index.js'
import { ResponceMessage, StatusCode } from '../enums/index.js'
import prisma from '../prisma.js'
import eventMemberRepository from '../repositories/eventMemberRepository.js'
import eventRepository from '../repositories/eventRepository.js'
import userRepository from '../repositories/userRepository.js'
import { CreateEvent, UpdateEvent } from '../types/index.js'
import ApiError from '../utils/apiError.js'

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

  async createEvent(creator_id: string, data: CreateEvent) {
    const event = await eventRepository.createOne({ creator_id, ...data })
    await this.addMemberToEvent(event.id, creator_id, creator_id)
    return event
  }

  async deleteEvent(event_id: string, owner_id: string) {
    return await prisma.$transaction(async (tx) => {
      await this.validateEventExistenceAndOwnership(event_id, owner_id, tx)

      await eventMemberRepository.deleteAllByEventId(event_id, tx)

      const deletedEvent = await eventRepository.deleteOne(event_id, tx)
      return deletedEvent
    })
  }

  async updateEvent(event_id: string, owner_id: string, data: UpdateEvent) {
    return await prisma.$transaction(async (tx) => {
      await this.validateEventExistenceAndOwnership(event_id, owner_id, tx)

      const updatedEvent = await eventRepository.updateOne(event_id, data, tx)
      return updatedEvent
    })
  }

  async addMemberToEvent(event_id: string, owner_id: string, member_id: string) {
    return await prisma.$transaction(async (tx) => {
      await this.validateEventExistenceAndOwnership(event_id, owner_id, tx)

      const isUserAMember = await this.isUserAMember(event_id, member_id, tx)
      if (isUserAMember) {
        throw new ApiError(StatusCode.CONFLICT, ResponceMessage.EVENT_USER_ALREADY_MEMBER)
      }

      const eventMember = await eventMemberRepository.createOne(event_id, member_id, tx)
      return eventMember
    })
  }

  async deleteMemberFromEvent(event_id: string, owner_id: string, member_id: string) {
    return await prisma.$transaction(async (tx) => {
      await this.validateEventExistenceAndOwnership(event_id, owner_id, tx)

      const isUserAMember = await this.isUserAMember(event_id, member_id, tx)
      if (!isUserAMember) {
        throw new ApiError(StatusCode.CONFLICT, ResponceMessage.EVENT_USER_NOT_MEMBER)
      }

      const eventMember = await eventMemberRepository.deleteOneByEventIdAndUserId(event_id, member_id, tx)
      return eventMember
    })
  }

  private async isUserAMember(event_id: string, user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    const event = await eventRepository.getOneByEventId(event_id, prismaInstance)
    if (!event) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.EVENT_DOESNT_EXIST)
    }

    const user = await userRepository.getOneById(user_id, prismaInstance)
    if (!user) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.USER_DOESNT_EXIST)
    }

    const isUserAMember = event.members.find((member) => member.user_id === user_id)
    return isUserAMember
  }

  private async validateEventExistenceAndOwnership(event_id: string, user_id: string, tx?: PrismaTransactionClient) {
    const prismaInstance = tx || prisma

    const event = await eventRepository.getOneByEventId(event_id, prismaInstance)
    if (!event) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.EVENT_DOESNT_EXIST)
    }

    const user = await userRepository.getOneById(user_id, prismaInstance)
    if (!user) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.USER_DOESNT_EXIST)
    }

    const isUserAnOwner = event.creator_id === user.id

    if (!isUserAnOwner) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ResponceMessage.USER_NO_PERMISSION)
    }
  }
}

export default new EventService()
