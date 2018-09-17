import express from 'express'
import UserController from '../controllers/mongo/UserController'
const MongoRouter = express.Router()
import AppLogger from '../core/logger/AppLogger'

// get users list
MongoRouter.get('/users', (request, response) => {
  UserController.find(request, response)
})

// add a user
MongoRouter.post('/add-user', (request, response) => {
  UserController.addIfNotExist(request, response)
})

// update a user if exist
MongoRouter.post('/update-user', (request, response) => {
  UserController.updateIfExist(request, response)
})

// delete a user if exist
MongoRouter.post('/delete-user', (request, response) => {
  UserController.deleteIfExist(request, response)
})

// get photos list
MongoRouter.post('/photos', (req, res) => {
  AppLogger.debug('MongoRouter photos res : ' + res)
})

export default MongoRouter
