// all used messages

// all language keys
const KEYS = {
  VERIFY_REQUIRED_INFORMATION: 'VERIFY_REQUIRED_INFORMATION',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  WRONG_SESSION: 'WRONG_SESSION',
  USER_NOT_EXIST: 'USER_NOT_EXIST',
  USER_ALREADY_EXIST: 'USER_ALREADY_EXIST',
  USER_ID_NOT_FOUND: 'USER_ID_NOT_FOUND',
  USER_EMAIL_NOT_FOUND: 'USER_EMAIL_NOT_FOUND',
  USER_ADD_ERROR: 'USER_ADD_ERROR',
  USER_UPDATE_ERROR: 'USER_UPDATE_ERROR',
  USER_DELETE_ERROR: 'USER_DELETE_ERROR',
  USER_LIST_ERROR: 'USER_LIST_ERROR',
  USER_LIST_DELETE_SUCCESS: 'USER_LIST_DELETE_SUCCESS',
};

// all messages
const DATA = [
  {
    key: KEYS.USER_ALREADY_EXIST,
    value: 'User already exist.',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.VERIFY_REQUIRED_INFORMATION,
    value: 'Please verify required information.',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_NOT_EXIST,
    value: 'User not exist.',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.WRONG_PASSWORD,
    value: 'Authentication failed. Wrong password.',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.WRONG_SESSION,
    value: 'An error was occured, please logout and authenticate again !',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_ID_NOT_FOUND,
    value: 'Cannot find user with this id !',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_EMAIL_NOT_FOUND,
    value: 'Cannot find user with this email !',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_ADD_ERROR,
    value: 'An error occured when inserting user!',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_UPDATE_ERROR,
    value: 'An error occured when updating user!',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_DELETE_ERROR,
    value: 'An error occured when deleting user!',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_LIST_ERROR,
    value: 'An error occured when getting user list !',
    language: 'en',
    status: 401,
  },
  {
    key: KEYS.USER_LIST_DELETE_SUCCESS,
    value: 'User list deleted with success !',
    language: 'en',
    status: 200,
  },
];

const Messages = {
  KEYS,
  DATA,
};

export default Messages;
