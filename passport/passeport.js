import passportJWT from 'passport-jwt'
import MongoModels from '../db/mongo/models'

// passport & jwt config
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// import User model
const User = MongoModels.UserModel

// define passeport jwt strategy
let opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme(process.env.JWT_SCHEME)
opts.secretOrKey = process.env.JWT_SECRET_OR_KEY
const passeportJWTStrategy = new JWTStrategy(opts, function (jwt_payload, done) {
  const email = jwt_payload.email
  User.findOne({ email: email }, (error, user) => {
    if (error) {
      return done(error, false)
    } else {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    }
  })
})

// config passport
module.exports = function (passport) {

  // token strategy
  passport.use(passeportJWTStrategy)

  // return configured passeport
  return passport
}