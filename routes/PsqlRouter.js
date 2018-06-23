import express from 'express'
import AppLogger from '../core/logger/AppLogger'
import PsqlDB from '../db/psql/models'
const PsqlRouter = express.Router()

// retrive all users
PsqlRouter.get('/users', (request, response) => {
  PsqlDB.users.findAll().then(users => {
    // retrive all users
    response.send(users)
  })
})

// add a user
PsqlRouter.post('/add-user', (request, response) => {
  // insert only if user not exist
  let firstName = request.body.firstName || ''
  let lastName = request.body.lastName || ''
  let email = request.body.email || ''
  let birthday = request.body.birthday || ''
  let job = request.body.job || ''
  AppLogger.info('PsqlRouter request firstName : ' + firstName)
  AppLogger.info('PsqlRouter request lastName : ' + lastName)
  AppLogger.info('PsqlRouter request email : ' + email)
  AppLogger.info('PsqlRouter request birthday : ' + birthday)
  AppLogger.info('PsqlRouter request job : ' + job)
  PsqlDB.users.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    birthday: birthday,
    job: job
  }).then(user => {
    // Send created customer to client
    AppLogger.info('PsqlRouter created user : ' + PsqlRouter)
    response.json(user)
  })
})

export default PsqlRouter



/* PsqlDB.users.sync({ force: false }).then(() => {
    // Table created
    let insertedUser = PsqlDB.users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthday: birthday,
      job: job
    })
    AppLogger.info('PsqlRouter insertedUser : ' + insertedUser)
  }) */

