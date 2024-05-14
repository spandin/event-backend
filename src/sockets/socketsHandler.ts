import { Server, Socket } from 'socket.io'
import socketsEventController from '../controllers/sockets/socketsEventController.js'
import { ErrorMessageType, ResponceMessage, ServerMessageMode } from '../enums/index.js'
import { Output } from '../types/sockets.js'
import { SocketsError } from '../utils/index.js'
import { MessageType } from '../enums/index.js'

class SocketsHandler {
  constructor(
    private server: Server,
    private socket: Socket
  ) {}

  initialize() {
    const id = this.socket.request.user.id
    this.socket.join(id)
    this.setHandlers(id)
  }

  private setHandlers(id: string) {
    this.socket.on(MessageType.EVENT_CREATE, async (data) => {
      try {
        this.broadcastMessages(await socketsEventController.createEvent(id, data))
      } catch (error) {
        this.handleError(error)
      }
    })

    this.socket.on(MessageType.EVENT_UPDATE, async (data) => {
      try {
        this.broadcastMessages(await socketsEventController.updateEvent(id, data))
      } catch (error) {
        this.handleError(error)
      }
    })

    this.socket.on(MessageType.EVENT_DELETE, async (data) => {
      try {
        this.broadcastMessages(await socketsEventController.deleteEvent(id, data))
      } catch (error) {
        this.handleError(error)
      }
    })

    this.socket.on(MessageType.EVENT_MEMBER_ADD, async (data) => {
      try {
        this.broadcastMessages(await socketsEventController.addMemberToEvent(id, data))
      } catch (error) {
        this.handleError(error)
      }
    })

    this.socket.on(MessageType.EVENT_MEMBER_DELETE, async (data) => {
      try {
        this.broadcastMessages(await socketsEventController.deleteMemberFromEvent(id, data))
      } catch (error) {
        this.handleError(error)
      }
    })
  }

  private broadcastMessages({ mode, type, data, message, broadcastIds }: Output) {
    switch (mode) {
      case ServerMessageMode.SEND:
        this.socket.emit(type, { message, ...(data && { data }) })
        break
      case ServerMessageMode.BROADCAST:
        this.server.emit(type, { message, ...(data && { data }) })
        break
      case ServerMessageMode.BROADCAST_SELECTIVE:
        if (broadcastIds)
          broadcastIds.forEach((id) => {
            if (this.server.sockets.adapter.rooms.has(id)) this.server.to(id).emit(type, { message, ...(data && { data }) })
          })
        break
    }
  }

  private handleError(error: unknown) {
    if (error instanceof SocketsError) {
      this.socket.emit(error.type, { message: error.message, data: error.data })
    } else {
      this.socket.emit(ErrorMessageType.ERROR_SERVER, { message: ResponceMessage.SERVER_ERROR })
    }
  }
}

export default SocketsHandler
