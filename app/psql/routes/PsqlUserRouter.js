import express from 'express'
import UserController from '../controllers/UserController'

// express router
const PsqlUserRouter = express.Router()

// retrieve all users
PsqlUserRouter.get(process.env.USER_LIST_PATH, (request, response) => {
  UserController.find(request, response)
})

// get user by id
PsqlUserRouter.post(process.env.USER_PROFILE_ID_PATH, (request, response) => {
  UserController.findById(request, response)
})

// get user by email
PsqlUserRouter.post(process.env.USER_PROFILE_EMAIL_PATH, (request, response) => {
  UserController.findByEmail(request, response)
})

// add a user
PsqlUserRouter.post(process.env.USER_ADD_PATH, (request, response) => {
  UserController.addIfNotExist(request, response)
})

// update a user by email key
PsqlUserRouter.post(process.env.USER_UPDATE_PATH, (request, response) => {
  UserController.updateIfExist(request, response)
})

// delete a user by email key
PsqlUserRouter.post(process.env.USER_DELETE_PATH, (request, response) => {
  UserController.deleteIfExist(request, response)
})

export default PsqlUserRouter
