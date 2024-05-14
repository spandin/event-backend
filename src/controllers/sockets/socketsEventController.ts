import { ErrorMessageType, MessageType, ResponceMessage, ServerMessageMode } from '../../enums/index.js'
import {
  addMemberToEventSchema,
  containsEventIdSchema,
  createEventSchema,
  deleteMemberFromEventSchema,
  updateEventSchema
} from '../../schemas/index.js'
import socketsEventService from '../../services/sockets/socketsEventService.js'
import { Output } from '../../types/sockets.js'
import { IntermediaryError } from '../../utils/index.js'
import { returnSocketsError } from '../../utils/errors/returnSocketsError.js'
import { validateDataWithSchema } from '../../utils/schemas/validateDataWithSchema.js'

class SocketsEventController {
  async createEvent(user_id: string, input: unknown): Promise<Output> {
    try {
      const validatedInput = validateDataWithSchema(createEventSchema, input, new IntermediaryError(ResponceMessage.WRONG_PROPS))

      const { data, broadcastIds } = await socketsEventService.createEvent(user_id, validatedInput)

      return {
        mode: ServerMessageMode.SEND,
        type: MessageType.EVENT_CREATE,
        message: ResponceMessage.EVENT_CREATED,
        data,
        broadcastIds
      }
    } catch (error) {
      throw returnSocketsError(ErrorMessageType.ERROR_EVENT_CREATE, error)
    }
  }

  async deleteEvent(user_id: string, input: unknown): Promise<Output> {
    const { event_id } = validateDataWithSchema(
      containsEventIdSchema,
      input,
      returnSocketsError(ErrorMessageType.ERROR_EVENT_DELETE, ResponceMessage.WRONG_PROPS)
    )

    try {
      const { data, broadcastIds } = await socketsEventService.deleteEvent(event_id, user_id)

      return {
        mode: ServerMessageMode.BROADCAST_SELECTIVE,
        type: MessageType.EVENT_DELETE,
        message: ResponceMessage.EVENT_DELETED,
        data: {
          event_id,
          ...data
        },
        broadcastIds
      }
    } catch (error) {
      throw returnSocketsError(ErrorMessageType.ERROR_EVENT_DELETE, error, { event_id })
    }
  }

  async updateEvent(user_id: string, input: unknown): Promise<Output> {
    const { event_id } = validateDataWithSchema(
      containsEventIdSchema,
      input,
      returnSocketsError(ErrorMessageType.ERROR_EVENT_UPDATE, ResponceMessage.WRONG_PROPS)
    )

    try {
      const validatedInput = validateDataWithSchema(updateEventSchema, input, new IntermediaryError(ResponceMessage.WRONG_PROPS))

      const { data, broadcastIds } = await socketsEventService.updateEvent(user_id, validatedInput)

      return {
        mode: ServerMessageMode.BROADCAST_SELECTIVE,
        type: MessageType.EVENT_UPDATE,
        message: ResponceMessage.EVENT_UPDATED,
        data: {
          event_id,
          ...data
        },
        broadcastIds
      }
    } catch (error) {
      throw returnSocketsError(ErrorMessageType.ERROR_EVENT_UPDATE, error, { event_id })
    }
  }

  async addMemberToEvent(user_id: string, input: unknown): Promise<Output> {
    const { event_id } = validateDataWithSchema(
      containsEventIdSchema,
      input,
      returnSocketsError(ErrorMessageType.ERROR_EVENT_MEMBER_ADD, ResponceMessage.WRONG_PROPS)
    )

    try {
      const { member_id } = validateDataWithSchema(addMemberToEventSchema, input, new IntermediaryError(ResponceMessage.WRONG_PROPS))

      const { data, broadcastIds } = await socketsEventService.addMemberToEvent(event_id, user_id, member_id)

      return {
        mode: ServerMessageMode.BROADCAST_SELECTIVE,
        type: MessageType.EVENT_MEMBER_ADD,
        message: ResponceMessage.EVENT_MEMBER_ADDED,
        data: {
          event_id,
          ...data
        },
        broadcastIds
      }
    } catch (error) {
      throw returnSocketsError(ErrorMessageType.ERROR_EVENT_MEMBER_ADD, error, { event_id })
    }
  }

  async deleteMemberFromEvent(user_id: string, input: unknown): Promise<Output> {
    const { event_id } = validateDataWithSchema(
      containsEventIdSchema,
      input,
      returnSocketsError(ErrorMessageType.ERROR_EVENT_MEMBER_DELETE, ResponceMessage.WRONG_PROPS)
    )

    try {
      const { member_id } = validateDataWithSchema(deleteMemberFromEventSchema, input, new IntermediaryError(ResponceMessage.WRONG_PROPS))

      const { data, broadcastIds } = await socketsEventService.deleteMemberFromEvent(event_id, user_id, member_id)

      return {
        mode: ServerMessageMode.BROADCAST_SELECTIVE,
        type: MessageType.EVENT_MEMBER_DELETE,
        message: ResponceMessage.EVENT_MEMBER_DELETED,
        data: {
          event_id,
          ...data
        },
        broadcastIds
      }
    } catch (error) {
      throw returnSocketsError(ErrorMessageType.ERROR_EVENT_MEMBER_DELETE, error, { event_id })
    }
  }
}

export default new SocketsEventController()
