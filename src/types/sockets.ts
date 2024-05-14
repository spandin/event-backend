import { MessageType, ResponceMessage, ServerMessageMode } from '../enums/index.js'
import { EventMemberWithUser, EventWithOwner } from './prisma.js'

export type ErrorData = {
  event_id?: string
}

export type MessageData = {
  event_id?: string
  event?: EventWithOwner
  eventMember?: EventMemberWithUser
}

export type ServiceOutput = {
  data?: MessageData
  broadcastIds?: string[]
}

export type Output = ServiceOutput & {
  mode: ServerMessageMode
  type: MessageType
  message: ResponceMessage
}
