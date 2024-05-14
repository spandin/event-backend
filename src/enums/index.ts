export const enum StatusCode {
  OK = '200',
  BAD_REQUEST = '400',
  UNAUTHORIZED = '401',
  FORBIDDEN = '403',
  NOT_FOUND = '404',
  CONFLICT = '409',
  SERVER_ERROR = '500'
}

export const enum ResponceMessage {
  WRONG_PROPS = 'Required properties are either not passed or have wrong format',
  UNAUTHORIZED = 'User not authorized',
  SERVER_ERROR = 'Server has hand an error',

  LOGIN = 'You have successfully logged in',
  REGISTER = 'You have successfully registered',
  LOGOUT = 'You have successfully logged out',

  USER_ALREADY_EXISTS = 'Email is already in use',
  USER_DOESNT_EXIST = `User doesn't exist`,
  USER_WRONG_CREDENTIALS = 'The passed credentials are incorrect',
  USER_NO_PERMISSION = `User doesn't have the required permission`,

  EVENT_CREATED = 'Event has been created',
  EVENT_DELETED = 'Event has been deleted',
  EVENT_UPDATED = 'Event has been updated',
  EVENT_MEMBER_ADDED = 'User has been added as a member',
  EVENT_MEMBER_DELETED = 'User has been deleted as a member',

  EVENT_DOESNT_EXIST = `Event doesn't exist`,
  EVENT_USER_ALREADY_MEMBER = 'User is already a member',
  EVENT_USER_NOT_MEMBER = 'User is not a member',
  EVENT_MEMBER_OWNER = `User is the owner of the event`,
  EVENT_ARCHIVED = `Event has already been archived`
}

export const enum ServerMessageMode {
  SEND = 'SEND',
  BROADCAST = 'BROADCAST',
  BROADCAST_SELECTIVE = 'BROADCAST_SELECTIVE'
}

export const enum MessageType {
  EVENT_CREATE = 'EVENT_CREATE',
  EVENT_UPDATE = 'EVENT_UPDATE',
  EVENT_DELETE = 'EVENT_DELETE',
  EVENT_MEMBER_ADD = 'EVENT_MEMBER_ADD',
  EVENT_MEMBER_DELETE = 'EVENT_MEMBER_DELETE'
}

export const enum ErrorMessageType {
  ERROR_EVENT_CREATE = 'ERROR_EVENT_CREATE',
  ERROR_EVENT_UPDATE = 'ERROR_EVENT_UPDATE',
  ERROR_EVENT_DELETE = 'ERROR_EVENT_DELETE',
  ERROR_EVENT_MEMBER_ADD = 'ERROR_EVENT_MEMBER_ADD',
  ERROR_EVENT_MEMBER_DELETE = 'ERROR_EVENT_MEMBER_DELETE',
  ERROR_SERVER = 'ERROR_SERVER'
}
