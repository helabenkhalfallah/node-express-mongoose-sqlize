import MongoModels from '../db/models/index';
import {
  MesssageProvider,
  Messages,
} from '../../../core';

const User = MongoModels.UserModel;

/**
 * Check for required params
 * @param {*} request
 * @return {boolean}
 */
const isValidUser = (request) => {
  if (request) {
    const email = request.body.email || '';
    const username = request.body.username || '';
    const password = request.body.password || '';
    const firstName = request.body.firstName || '';
    const lastName = request.body.lastName || '';
    if (email && username && password && firstName && lastName) {
      return true;
    }
  }
  return false;
};

/**
 * Retrieve user from request
 * @param {*} request
 * @return {object} user or null
 */
const userFromRequest = (request) => {
  if (isValidUser(request)) {
    return new User(request.body);
  }
  return null;
};

/**
 * Retrieve all user
 * @param {*} request
 * @param {*} response
 */
const find = (request, response) => {
  User.find((error, users) => {
    if (!error) {
      response
          .status(200)
          .send({
            success: true,
            users: users,
          });
    } else {
      response
          .status(401)
          .send({
            success: false,
            message: error.message,
          });
    }
  });
};

/**
 * Add user if not exist
 * @param {*} request
 * @param {*} response
 * @return {*}
 */
const addIfNotExist = (request, response) => {
  // insert only if we have required data
  if (isValidUser(request)) {
    // we can find by username or email
    // because they are unique
    // insert only if user not exist
    const email = request.body.email || '';
    User.findOne({email: email}, (error, user) => {
      // insert only if user not exist
      if (error) {
        response
            .status(401)
            .send({
              success: false,
              message: error.message,
            });
      } else {
        if (!user) {
          const userModel = userFromRequest(request);
          userModel.save((error) => {
            if (error) {
              response
                  .status(401)
                  .send({
                    success: false,
                    message: error.message,
                  });
            } else {
              response
                  .status(200)
                  .send({
                    success: true,
                    user: userModel,
                  });
            }
          });
        } else {
          response
              .status(401)
              .send({
                success: false,
                message: MesssageProvider
                    .messageByKey(Messages.KEYS.USER_ALREADY_EXIST),
              });
        }
      }
    });
  } else {
    return response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider
              .messageByKey(Messages.KEYS.VERIFY_REQUIRED_INFORMATION),
        });
  }
};

/**
 * Update user if exist
 * @param {*} request
 * @param {*} response
 */
const updateIfExist = (request, response) => {
  // to do
};

/**
 * Delete user if exist
 * @param {*} request
 * @param {*} response
 */
const deleteIfExist = (request, response) => {
  // to do
};

const UserController = {
  userFromRequest,
  isValidUser,
  find,
  addIfNotExist,
  updateIfExist,
  deleteIfExist,
};

export default UserController;
