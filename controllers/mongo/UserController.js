import MongoModels from '../../db/mongo/models'

const find = (request, response) => {
  MongoModels.UserModel.find((error, users) => {
    if (error) response.send(error)
    else response.send(users)
  })
}

const addIfNotExist = (request, response) => {
  // insert only if user not exist
  let email = request.body.email || ''
  let username = request.body.username || ''
  let password = request.body.password || ''
  let firstName = request.body.firstName || ''
  let lastName = request.body.lastName || ''
  // insert only if we have required data
  if (email
    && username
    && password
    && firstName
    && lastName) {
    // we can find by username or email
    // because they are unique
    MongoModels.UserModel.findOne({ email: email }, (error, user) => {
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
  } else {
    response.send('Please, verify the required information')
  }
}

const updateIfExist = (request, response) => {
  // to do
}

const deleteIfExist = (request, response) => {
  // to do
}

const UserController = {
  find,
  addIfNotExist,
  updateIfExist,
  deleteIfExist
}

export default UserController
