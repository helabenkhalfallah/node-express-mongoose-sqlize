// all used messages

// all language keys
const KEYS = {
  USER_ALREADY_EXIST: 'USER_ALREADY_EXIST',
  VERIFY_REQUIRED_INFORMATION: 'VERIFY_REQUIRED_INFORMATION',
  USER_NOT_EXIST: 'USER_NOT_EXIST',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  WRONG_SESSION: 'WRONG_SESSION',
  USER_ID_NOT_FOUND: 'USER_ID_NOT_FOUND',
  USER_EMAIL_NOT_FOUND: 'USER_EMAIL_NOT_FOUND',
}

// all messages
const DATA = [
  {
    key: KEYS.USER_ALREADY_EXIST,
    value: 'User already exist.',
    language: 'en'
  },
  {
    key: KEYS.VERIFY_REQUIRED_INFORMATION,
    value: 'Please verify required information.',
    language: 'en'
  },
  {
    key: KEYS.USER_NOT_EXIST,
    value: 'User not exist.',
    language: 'en'
  },
  {
    key: KEYS.WRONG_PASSWORD,
    value: 'Authentication failed. Wrong password.',
    language: 'en'
  },
  {
    key: KEYS.WRONG_SESSION,
    value: 'An error was occured, please logout and authenticate again !',
    language: 'en'
  },
  {
    key: KEYS.USER_ID_NOT_FOUND,
    value: 'Cannot find user with this id !',
    language: 'en'
  },
  {
    key: KEYS.USER_EMAIL_NOT_FOUND,
    value: 'Cannot find user with this email !',
    language: 'en'
  },
]


const Messages = {
  KEYS,
  DATA,
}

export default Messages