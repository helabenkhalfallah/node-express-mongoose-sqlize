import express from 'express';
import UserController from '../controllers/UserController';
import AuthUtils from '../../authentication/utils/AuthUtils';
import passport from 'passport';
import {
  MesssageProvider,
  Messages,
} from '../../../core';

const {
  Router,
} = express;

// router instance
// cast to our passport client
require('../../../passport/passport')(passport);

// eslint-disable-next-line new-cap
const MgUserRouter = Router();

/**
 * Get users list route
 */
MgUserRouter.get(process.env.USER_LIST_PATH,
    passport.authenticate(process.env.JWT_SCHEME, {session: false}), (request, response) => {
      const token = AuthUtils.retrieveToken(request.headers);
      if (AuthUtils.isValidToken(token)) {
      // valid token
        UserController.find(request, response);
      } else {
      // invalid token
        response
            .status(401)
            .send({
              success: false,
              message: MesssageProvider.messageByKey(Messages.KEYS.WRONG_SESSION),
            });
      }
    });

/**
 * Add new user route
 */
MgUserRouter.post(process.env.USER_ADD_PATH,
    passport.authenticate(process.env.JWT_SCHEME, {session: false}), (request, response) => {
      const token = AuthUtils.retrieveToken(request.headers);
      if (AuthUtils.isValidToken(token)) {
      // valid token
        UserController.addIfNotExist(request, response);
      } else {
      // invalid token
        response
            .status(401)
            .send({
              success: false,
              message: MesssageProvider.messageByKey(Messages.KEYS.WRONG_SESSION),
            });
      }
    });

/**
 * Update a user if exist route
 */
MgUserRouter.post(process.env.USER_UPDATE_PATH,
    passport.authenticate(process.env.JWT_SCHEME, {session: false}), (request, response) => {
      UserController.updateIfExist(request, response);
      const token = AuthUtils.retrieveToken(request.headers);
      if (AuthUtils.isValidToken(token)) {
      // valid token
        UserController.addIfNotExist(request, response);
      } else {
      // invalid token
        response
            .status(401)
            .send({
              success: false,
              message: MesssageProvider.messageByKey(Messages.KEYS.WRONG_SESSION),
            });
      }
    });

/**
 * Delete a user if exist route
 */
MgUserRouter.post(process.env.USER_DELETE_PATH,
    passport.authenticate(process.env.JWT_SCHEME, {session: false}), (request, response) => {
      const token = AuthUtils.retrieveToken(request.headers);
      if (AuthUtils.isValidToken(token)) {
      // valid token
        UserController.deleteIfExist(request, response);
      } else {
      // invalid token
        response
            .status(401)
            .send({
              success: false,
              message: MesssageProvider.messageByKey(Messages.KEYS.WRONG_SESSION),
            });
      }
    });

/**
 * Returns the user that made the request route (whoami)
 */
MgUserRouter.get(process.env.USER_PROFILE_PATH,
    passport.authenticate(process.env.JWT_SCHEME, {session: false}), (request, response) => {
      const token = AuthUtils.retrieveToken(request.headers);
      if (AuthUtils.isValidToken(token)) {
      // valid token
        response.send(request.user);
      } else {
      // invalid token
        response
            .status(401)
            .send({
              success: false,
              message: MesssageProvider.messageByKey(Messages.KEYS.WRONG_SESSION),
            });
      }
    });


export default MgUserRouter;
