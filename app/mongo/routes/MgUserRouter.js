import express from 'express'
import UserController from '../controllers/UserController'
import AuthUtils from '../../authentication/utils/AuthUtils'
import passport from 'passport'
import MesssageProvider from '../../../messages/MesssageProvider'
import Messages from '../../../messages/Messages'


// router instance  
require('../../../passport/passeport')(passport)
const MgUserRouter = express.Router()

// get users list
MgUserRouter.get(process.env.USER_LIST_PATH,
  passport.authenticate(process.env.JWT_SCHEME, { session: false }), (request, response) => {
    const token = AuthUtils.retrieveToken(request.headers)
    if (AuthUtils.isValidToken(token)) {
      // valid token
      UserController.find(request, response)
    } else {
      // invalid token
      response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider.messageByKey(Messages.WRONG_SESSION)
        })
    }
  })

// add a user
MgUserRouter.post(process.env.USER_ADD_PATH,
  passport.authenticate(process.env.JWT_SCHEME, { session: false }), (request, response) => {
    const token = AuthUtils.retrieveToken(request.headers)
    if (AuthUtils.isValidToken(token)) {
      // valid token
      UserController.addIfNotExist(request, response)
    } else {
      // invalid token
      response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider.messageByKey(Messages.WRONG_SESSION)
        })
    }
  })

// update a user if exist
MgUserRouter.post(process.env.USER_UPDATE_PATH,
  passport.authenticate(process.env.JWT_SCHEME, { session: false }), (request, response) => {
    UserController.updateIfExist(request, response)
    const token = AuthUtils.retrieveToken(request.headers)
    if (AuthUtils.isValidToken(token)) {
      // valid token
      UserController.addIfNotExist(request, response)
    } else {
      // invalid token
      response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider.messageByKey(Messages.WRONG_SESSION)
        })
    }
  })

// delete a user if exist
MgUserRouter.post(process.env.USER_DELETE_PATH,
  passport.authenticate(process.env.JWT_SCHEME, { session: false }), (request, response) => {
    const token = AuthUtils.retrieveToken(request.headers)
    if (AuthUtils.isValidToken(token)) {
      // valid token
      UserController.deleteIfExist(request, response)
    } else {
      // invalid token
      response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider.messageByKey(Messages.WRONG_SESSION)
        })
    }
  })

// returns the user that made the request
MgUserRouter.get(process.env.USER_PROFILE_PATH,
  passport.authenticate(process.env.JWT_SCHEME, { session: false }), (request, response) => {
    const token = AuthUtils.retrieveToken(request.headers)
    if (AuthUtils.isValidToken(token)) {
      // valid token
      response.send(request.user)
    } else {
      // invalid token
      response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider.messageByKey(Messages.WRONG_SESSION)
        })
    }
  })


export default MgUserRouter
