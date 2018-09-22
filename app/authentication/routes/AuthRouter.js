import express from 'express'
import AuthController from '../controllers/AuthController'

// router instance
const AuthRouter = express.Router()

// authentication : register
AuthRouter.post(process.env.AUTH_REGISTER_PATH, (req, res) => {
  AuthController.register(req, res)
})

// authentication : login
AuthRouter.post(process.env.AUTH_LOGIN_PATH, (req, res, next) => {
  AuthController.login(req, res, next)
})

export default AuthRouter