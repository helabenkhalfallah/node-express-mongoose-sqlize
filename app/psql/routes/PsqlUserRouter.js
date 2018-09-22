import express from 'express'
import UserController from '../controllers/UserController'

// express router
const PsqlUserRouter = express.Router()

// retrieve all users
PsqlUserRouter.get('/users', (request, response) => {
  UserController.find(request, response)
})

// get user by id
PsqlUserRouter.post('/user-id', (request, response) => {
  UserController.findById(request, response)
})

// get user by email
PsqlUserRouter.post('/user-email', (request, response) => {
  UserController.findByEmail(request, response)
})

// add a user
PsqlUserRouter.post('/add-user', (request, response) => {
  UserController.addIfNotExist(request, response)
})

// update a user by email key
PsqlUserRouter.post('/update-user', (request, response) => {
  UserController.updateIfExist(request, response)
})

// delete a user by email key
PsqlUserRouter.post('/delete-user', (request, response) => {
  UserController.deleteIfExist(request, response)
})

export default PsqlUserRouter
