import express from 'express'
import AppLogger from '../core/logger/AppLogger'
import AppModels from '../models/index'
const AppRouter = express.Router()

AppRouter.get('/users', (req, res) => {
  AppModels.UserModel.find((error, users) => {
    if (error) res.send(error)
    else res.send(users)
  })
})

AppRouter.post('/photos', (req, res) => {
  AppLogger.debug('AppRouter photos res : ' + res)
})

export default AppRouter