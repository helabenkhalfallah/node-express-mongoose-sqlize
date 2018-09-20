import express from 'express'
import UserController from '../../controllers/mongo/UserController'
import AuthUtils from '../../utils/AuthUtils'
import passport from 'passport'


// router instance  
require('../../passport/passeport')(passport)
const MgUserRouter = express.Router()

// get users list
MgUserRouter.get('/users-list', passport.authenticate('jwt', { session: false }), (request, response) => {
  const token = AuthUtils.retrieveToken(request.headers)
  if (AuthUtils.isValidToken(token)) {
    // valid token
    UserController.find(request, response)
  } else {
    // invalid token
    response.send('An error was occured, please logout and authenticate again !')
  }
})

// add a user
MgUserRouter.post('/add-user', passport.authenticate('jwt', { session: false }), (request, response) => {
  const token = AuthUtils.retrieveToken(request.headers)
  if (AuthUtils.isValidToken(token)) {
    // valid token
    UserController.addIfNotExist(request, response)
  } else {
    // invalid token
    response.send('An error was occured, please logout and authenticate again !')
  }
})

// update a user if exist
MgUserRouter.post('/update-user', passport.authenticate('jwt', { session: false }), (request, response) => {
  UserController.updateIfExist(request, response)
  const token = AuthUtils.retrieveToken(request.headers)
  if (AuthUtils.isValidToken(token)) {
    // valid token
    UserController.addIfNotExist(request, response)
  } else {
    // invalid token
    response.send('An error was occured, please logout and authenticate again !')
  }
})

// delete a user if exist
MgUserRouter.post('/delete-user', passport.authenticate('jwt', { session: false }), (request, response) => {
  const token = AuthUtils.retrieveToken(request.headers)
  if (AuthUtils.isValidToken(token)) {
    // valid token
    UserController.deleteIfExist(request, response)
  } else {
    // invalid token
    response.send('An error was occured, please logout and authenticate again !')
  }
})

// returns the user that made the request
MgUserRouter.get('/profile', passport.authenticate('jwt', { session: false }), (request, response) => {
  const token = AuthUtils.retrieveToken(request.headers)
  if (AuthUtils.isValidToken(token)) {
    // valid token
    response.send(request.user)
  } else {
    // invalid token
    response.send('An error was occured, please logout and authenticate again !')
  }
})


export default MgUserRouter
