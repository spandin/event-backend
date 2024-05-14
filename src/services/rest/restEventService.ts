import { StatusCode, ResponceMessage } from '../../enums/index.js'
import eventMemberRepository from '../../repositories/eventMemberRepository.js'
import eventRepository from '../../repositories/eventRepository.js'
import { ApiError } from '../../utils/index.js'

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
}

export default new EventService()
