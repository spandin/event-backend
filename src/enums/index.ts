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

  LOGIN = 'You have successfully logged in',
  REGISTER = 'You have successfully registered',
  LOGOUT = 'You have successfully logged out',

  USER_ALREADY_EXISTS = 'This email is already in use',
  USER_DOESNT_EXIST = `This user doesn't exist`,
  USER_WRONG_CREDENTIALS = 'The passed credentials are incorrect',

  EVENT_CREATED = 'Event successfully created',
  EVENT_DELETED = 'Event successfully deleted',
  EVENT_UPDATED = 'Event successfully updated',
  EVENT_DOESNT_EXIST = `Event doesn't exist`,
  EVENT_USER_ALREADY_MEMBER = 'User is already a member',
  EVENT_USER_NOT_MEMBER = 'User is not a member'
}
