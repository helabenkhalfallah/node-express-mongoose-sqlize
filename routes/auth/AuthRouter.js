import express from 'express'
import AuthController from '../../controllers/authentication/AuthController'

// router instance
const AuthRouter = express.Router()

// authentication : register
AuthRouter.post('/register', (req, res) => {
  AuthController.register(req, res)
})

// authentication : login
AuthRouter.post('/login', (req, res, next) => {
  AuthController.login(req, res, next)
})

export default AuthRouter