import { StatusCode } from '../enums/index.js'

class ApiError extends Error {
  status: number
  constructor(status: StatusCode, message: string) {
    super(message)
    this.status = +status
  }
}

export default ApiError
