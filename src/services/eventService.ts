import { ResponceMessage, StatusCode } from '../enums/index.js'
import prisma from '../prisma.js'
import eventMemberRepository from '../repositories/eventMemberRepository.js'
import eventRepository from '../repositories/eventRepository.js'
import userRepository from '../repositories/userRepository.js'
import ApiError from '../utils/apiError.js'

class EventService {
  async addMemberToEvent(event_id: string, user_id: string) {
    const isUserAMember = await this.isUserAMember(event_id, user_id)

    if (isUserAMember) {
      throw new ApiError(StatusCode.CONFLICT, ResponceMessage.EVENT_USER_ALREADY_MEMBER)
    }

    const eventMember = await eventMemberRepository.createOne(user_id, event_id)

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
