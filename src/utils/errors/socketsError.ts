import { ErrorMessageType } from '../../enums/index.js'
import { ErrorData } from '../../types/index.js'

export class SocketsError extends Error {
  type: ErrorMessageType
  data?: ErrorData

  constructor(type: ErrorMessageType, message: string, data?: ErrorData) {
    super(message)
    this.type = type
    this.data = data
  }
}
