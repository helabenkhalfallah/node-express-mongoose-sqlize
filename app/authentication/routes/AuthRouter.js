import express from 'express';
import AuthController from '../controllers/AuthController';

const {
  Router,
} = express;

// router instance
// eslint-disable-next-line new-cap
const AuthRouter = Router();

/**
 * Register new user route
 */
AuthRouter.post(process.env.AUTH_REGISTER_PATH, (req, res) => {
  AuthController.register(req, res);
});

/**
 * Login an existant user
 */
AuthRouter.post(process.env.AUTH_LOGIN_PATH, (req, res, next) => {
  AuthController.login(req, res, next);
});

export default AuthRouter;
