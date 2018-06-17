import express from 'express'
import AppLogger from '../core/logger/AppLogger'
import AppModels from '../models/index'
const AppRouter = express.Router()

// get users list
AppRouter.get('/users', (request, response) => {
  AppModels.UserModel.find((error, users) => {
    if (error) response.send(error)
    else response.send(users)
  })
})

// add a user
AppRouter.post('/add-user', (request, response) => {
  // insert only if user not exist
  let firstName = request.body.firstName || ''
  AppModels.UserModel.findOne({ firstName: firstName }, (error, user) => {
    // insert only if user not exist
    if (error) {
      response.send(error)
    } else {
      if (!user) {
        const userModel = new AppModels.UserModel(request.body)
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
AppRouter.post('/photos', (req, res) => {
  AppLogger.debug('AppRouter photos res : ' + res)
})

export default AppRouter
