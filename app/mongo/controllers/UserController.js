import MongoModels from '../db/models/index'
import MesssageProvider from '../../../messages/MesssageProvider'
import Messages from '../../../messages/Messages'


const User = MongoModels.UserModel


// check for required params
const isValidUser = (request) => {
  if (request) {
    let email = request.body.email || ''
    let username = request.body.username || ''
    let password = request.body.password || ''
    let firstName = request.body.firstName || ''
    let lastName = request.body.lastName || ''
    if (email && username && password && firstName && lastName)
      return true
  }
  return false
}

// user from request
// TODO : change to factory or constructor
const UserFromRequest = (request) => {
  if (isValidUser(request)) {
    return new User(request.body)
  }
  return null
}

// retreive all user
const find = (request, response) => {
  User.find((error, users) => {
    if (error) response.send(error)
    else response.send(users)
  })
}

// add user if not exist
const addIfNotExist = (request, response) => {
  // insert only if we have required data
  if (isValidUser(request)) {
    // we can find by username or email
    // because they are unique
    // insert only if user not exist
    let email = request.body.email || ''
    User.findOne({ email: email }, (error, user) => {
      // insert only if user not exist
      if (error) {
        response.send(error)
      } else {
        if (!user) {
          const userModel = UserFromRequest(request)
          userModel.save((error) => {
            if (error) {
              response
                .status(401)
                .send({
                  success: false,
                  message: error.message
                })
            } else {
              response
                .status(200)
                .send({
                  success: false,
                  user: userModel
                })
            }
          })
        } else {
          response
            .status(401)
            .send({
              success: false,
              message: MesssageProvider
                .messageByKey(Messages.USER_ALREADY_EXIST)
            })
        }
      }
    })
  } else {
    return response
      .status(401)
      .send({
        success: false,
        message: MesssageProvider
          .messageByKey(Messages.VERIFY_REQUIRED_INFORMATION)
      })
  }
}

// update user if exist
const updateIfExist = (request, response) => {
  // to do
}

// delete user if exist
const deleteIfExist = (request, response) => {
  // to do
}

// export user controller module
const UserController = {
  UserFromRequest,
  isValidUser,
  find,
  addIfNotExist,
  updateIfExist,
  deleteIfExist
}

export default UserController
