import express from 'express'
import AppLogger from '../core/logger/AppLogger'
import MongoModels from '../db/mongo/models'
const MongoRouter = express.Router()

// get users list
MongoRouter.get('/users', (request, response) => {
  MongoModels.UserModel.find((error, users) => {
    if (error) response.send(error)
    else response.send(users)
  })
})

// add a user
MongoRouter.post('/add-user', (request, response) => {
  // insert only if user not exist
  let firstName = request.body.firstName || ''
  MongoModels.UserModel.findOne({ firstName: firstName }, (error, user) => {
    // insert only if user not exist
    if (error) {
      response.send(error)
    } else {
      if (!user) {
        const userModel = new MongoModels.UserModel(request.body)
        userModel.save((error) => {
          if (error) {
            response.send(error)
          } else {
            response.send(userModel)
          }
        })
      } else {
        response.send('user exist')
      }
    }
  })
})

// get photos list
MongoRouter.post('/photos', (req, res) => {
  AppLogger.debug('MongoRouter photos res : ' + res)
})

export default MongoRouter
