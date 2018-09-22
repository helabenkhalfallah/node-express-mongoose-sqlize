import { isEmpty } from 'lodash'
import AppLogger from '../../../core/logger/AppLogger'
import PsqlDB from '../db/models/index'
import MesssageProvider from '../../../messages/MesssageProvider'
import Messages from '../../../messages/Messages'


// retreive all user
const find = (request, response) => {
  PsqlDB.users.findAll().then(users => {
    // retrieve all users
    response
      .status(200)
      .send({
        success: true,
        users: users
      })
  }).catch((error) => {
    // return error
    AppLogger.info('PsqlRouter findAll error : ' + error)
    response
      .status(401)
      .send({
        success: false,
        message: error.message
      })
  })
}

// find user by id
const findById = (request, response) => {
  let userId = request.body.id || ''
  PsqlDB.users.findById(userId)
    .then(user => {
      // retrieve all users
      AppLogger.info('PsqlRouter find by id user : ' + user)
      if (user) {
        response
          .status(200)
          .send({
            success: true,
            user: user
          })
      } else {
        response
          .status(401)
          .send({
            success: false,
            message: MesssageProvider
              .messageByKey(Messages.KEYS.USER_ID_NOT_FOUND)
          })
      }
    }).catch((error) => {
      // return error
      AppLogger.info('PsqlRouter find by id error : ' + error)
      response
        .status(401)
        .send({
          success: false,
          message: error.message
        })
    })
}

// find user by email
const findByEmail = (request, response) => {
  let email = request.body.email || ''
  PsqlDB.users.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      // retrieve all users
      AppLogger.info('PsqlRouter find by email user : ' + user)
      if (user) {
        response
          .status(200)
          .send({
            success: true,
            user: user
          })
      } else {
        response
          .status(401)
          .send({
            success: false,
            message: MesssageProvider
              .messageByKey(Messages.KEYS.USER_EMAIL_NOT_FOUND)
          })
      }
    }).catch((error) => {
      // return error
      AppLogger.info('PsqlRouter find by email error : ' + error)
      response
        .status(401)
        .send({
          success: false,
          message: error.message
        })
    })
}


// add user if not exist
const addIfNotExist = (request, response) => {
  // insert only if user not exist
  // date format should been 1984-09-28
  let firstName = request.body.firstName || ''
  let lastName = request.body.lastName || ''
  let email = request.body.email || ''
  let birthday = request.body.birthday || ''
  let job = request.body.job || ''
  PsqlDB.users.findAll({
    where: {
      email: email
    }
  }).then(users => {
    // retrieve all users
    AppLogger.info('PsqlRouter created users : ' + users)
    if (isEmpty(users)) {
      PsqlDB.users.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthday,
        job: job
      }).then(user => {
        // send created customer to client
        AppLogger.info('PsqlRouter created user : ' + user)
        response
          .status(200)
          .send({
            success: true,
            user: user
          })
      }).catch((error) => {
        // return error
        AppLogger.info('PsqlRouter created error : ' + error)
        response
          .status(401)
          .send({
            success: false,
            message: error.message
          })
      })
    } else {
      AppLogger.info('PsqlRouter create user already exist  ')
      response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider
            .messageByKey(Messages.KEYS.USER_ALREADY_EXIST)
        })
    }
  }).catch((error) => {
    // return error
    AppLogger.info('PsqlRouter create error : ' + error)
    response
      .status(401)
      .send({
        success: false,
        message: error.message
      })
  })
}

// update user if exist
const updateIfExist = (request, response) => {
  // to do
  // edit only if user exist
  // date format should been 1984-09-28
  let firstName = request.body.firstName || ''
  let lastName = request.body.lastName || ''
  let email = request.body.email || ''
  let birthday = request.body.birthday || ''
  let job = request.body.job || ''
  PsqlDB.users.findOne({
    where: {
      email: email
    }
  }).then(user => {
    // user to edit
    AppLogger.info('PsqlRouter user to edit  : ' + user)
    if (!isEmpty(user)) {
      PsqlDB.users.update(
        {
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          job: job
        },
        {
          where: {
            email: email
          }
        }
      ).then(() => {
        // send created customer to client
        AppLogger.info('PsqlRouter edit check user email : ' + email)
        PsqlDB.users.findOne({
          where: {
            email: email
          }
        })
          .then(user => {
            // retrieve all users
            AppLogger.info('PsqlRouter edited user result : ' + user)
            response
              .status(200)
              .send({
                success: true,
                user: user
              })
          }).catch((error) => {
            // return error
            AppLogger.info('PsqlRouter edited user error: ' + error)
            response
              .status(401)
              .send({
                success: false,
                message: error.message
              })
          })
      }).catch((error) => {
        // return error
        AppLogger.info('PsqlRouter edit error : ' + error)
        response
          .status(401)
          .send({
            success: false,
            message: error.message
          })
      })
    } else {
      AppLogger.info('PsqlRouter edit user not exist  ')
      response
        .status(401)
        .send({
          success: false,
          message: MesssageProvider
            .messageByKey(Messages.KEYS.USER_EMAIL_NOT_FOUND)
        })
    }
  }).catch((error) => {
    // return error
    AppLogger.info('PsqlRouter edit error : ' + error)
    response
      .status(401)
      .send({
        success: false,
        message: error.message
      })
  })
}

// delete user if exist
const deleteIfExist = (request, response) => {
  let email = request.body.email || ''
  PsqlDB.users.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      // user to delete
      AppLogger.info('PsqlRouter delete by email user : ' + user)
      if (user) {
        PsqlDB.users.destroy({
          where: {
            email: email
          }
        }).then(() => {
          AppLogger.info('PsqlRouter delete user by email success : ' + email)
          response
            .status(200)
            .send({
              success: true,
              user: user
            })
        }).catch((error) => {
          // return error
          AppLogger.info('PsqlRouter delete user by email error : ' + error)
          response
            .status(401)
            .send({
              success: false,
              message: error.message
            })
        })
      } else {
        response
          .status(401)
          .send({
            success: false,
            message: MesssageProvider
              .messageByKey(Messages.KEYS.USER_EMAIL_NOT_FOUND)
          })
      }
    }).catch((error) => {
      // return error
      AppLogger.info('PsqlRouter delete by email error : ' + error)
      response
        .status(401)
        .send({
          success: false,
          message: error.message
        })
    })
}

// export user controller module
const UserController = {
  find,
  findById,
  findByEmail,
  addIfNotExist,
  updateIfExist,
  deleteIfExist,
}

export default UserController