import jwt from 'jsonwebtoken';
import MongoModels from '../../mongo/db/models/index';
import UserController from '../../mongo/controllers/UserController';
import {
  MesssageProvider,
  Messages,
} from '../../../core';

const User = MongoModels.UserModel;

/**
 * Register a new user
 * @param {*} request
 * @param {*} response
 * @return {*} created user or error
 */
const register = (request, response) => {
  if (UserController.isValidUser(request)) {
    // insert only if we have required data
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
          const userModel = UserController.userFromRequest(request);
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
 * User login
 * @param {*} request
 * @param {*} response
 * @return {*} logged existant user or error
 */
const login = async (request, response) => {
  const email = request.body.email || '';
  const password = request.body.password || '';
  if (email && password) {
    User.findOne({email: email}, (error, user) => {
      // check if user exist
      if (error) {
        response.status(401).send({
          success: false,
          message: error.message,
        });
      } else {
        if (!user) {
          response.status(401).send({
            success: false,
            message: MesssageProvider
                .messageByKey(Messages.KEYS.USER_NOT_EXIST),
          });
        } else {
          // check if password matches
          user.comparePassword(password, (error, isMatch) => {
            if (isMatch && !error) {
              // if user is found and password is right create a token
              // algorithm: process.env.JWT_TOKEN_HASH_ALGO
              const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_OR_KEY, {
                expiresIn: process.env.JWT_TOKEN_EXPIRATION,
              });

              // return the information including token as JSON
              response
                  .status(200)
                  .send({
                    success: true,
                    user: user,
                    token: `${process.env.JWT_TOKEN_PREFIX} ${token}`,
                  });
            } else {
              response
                  .status(401)
                  .send({
                    success: false,
                    message: MesssageProvider
                        .messageByKey(Messages.KEYS.WRONG_PASSWORD),
                  });
            }
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

// logout user will be on front part
// remove token

const AuthController = {
  register,
  login,
};

export default AuthController;
