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
    const events = await eventRepository.getAllByUserId(user_id)
    return events
  }

  async createEvent(creator_id: string, data: CreateEvent) {
    const event = await eventRepository.createOne({ creator_id, ...data })

    await this.addMemberToEvent(creator_id, event.id)

    return event
  }

  async deleteEvent(event_id: string) {
    const event = await eventRepository.getOneByEventId(event_id)

    if (!event) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.EVENT_DOESNT_EXIST)
    }

    await prisma.$transaction([eventMemberRepository.deleteAllByEventId(event_id), eventRepository.deleteOne(event_id)])
  }

  async updateEvent(event_id: string, data: UpdateEvent) {
    const event = await eventRepository.getOneByEventId(event_id)

    if (!event) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.EVENT_DOESNT_EXIST)
    }

    const updatedEvent = await eventRepository.updateOne(event_id, data)

    return updatedEvent
  }

  async addMemberToEvent(event_id: string, user_id: string) {
    const isUserAMember = await this.isUserAMember(event_id, user_id)

    if (isUserAMember) {
      throw new ApiError(StatusCode.CONFLICT, ResponceMessage.EVENT_USER_ALREADY_MEMBER)
    }

    const eventMember = await eventMemberRepository.createOne(user_id, event_id)

    return eventMember
  }

  async deleteMemberFromEvent(event_id: string, user_id: string) {
    const isUserAMember = await this.isUserAMember(event_id, user_id)

    if (!isUserAMember) {
      throw new ApiError(StatusCode.CONFLICT, ResponceMessage.EVENT_USER_NOT_MEMBER)
    }

    const eventMember = await eventMemberRepository.deleteOneByEventIdAndUserId(event_id, user_id)

    return eventMember
  }

  private async isUserAMember(event_id: string, user_id: string) {
    const [event, user] = await prisma.$transaction([eventRepository.getOneByEventId(event_id), userRepository.getOneById(user_id)])

    if (!user) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.USER_DOESNT_EXIST)
    }

    if (!event) {
      throw new ApiError(StatusCode.NOT_FOUND, ResponceMessage.EVENT_DOESNT_EXIST)
    }

    const isUserAMember = event.members.find((member) => member.user_id === user_id)

    return isUserAMember
  }
}

export default new EventService()
