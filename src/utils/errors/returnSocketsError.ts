import { ErrorMessageType, ResponceMessage } from '../../enums/index.js'
import { ErrorData } from '../../types/index.js'
import { IntermediaryError } from './intermediaryError.js'
import { SocketsError } from './socketsError.js'

export const returnSocketsError = (type: ErrorMessageType, errorOrErrorMessage: unknown, data?: ErrorData) => {
  if (errorOrErrorMessage instanceof IntermediaryError) {
    return new SocketsError(type, errorOrErrorMessage.message, data)
  } else if (typeof errorOrErrorMessage === 'string') {
    return new SocketsError(type, errorOrErrorMessage)
  } else {
    return new SocketsError(type, ResponceMessage.SERVER_ERROR)
  }
}
