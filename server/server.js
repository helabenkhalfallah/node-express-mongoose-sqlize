//express config 
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'

//import router 
import MgUserRouter from '../routes/mongo/MgUserRouter'
import PsqlUserRouter from '../routes/psql/PsqlUserRouter'
import AuthRouter from '../routes/auth/AuthRouter'

//import logger
import AppLogger from '../core/logger/AppLogger'
import morgan from 'morgan'
AppLogger.stream = {
  write: function (message, encoding) {
    AppLogger.info(message, encoding)
  }
}

// database part
import MongoDBConnect from '../db/mongo/db/MongoDBConnect'
if (process.env.MONGOOSE_ENABLED === 'true') {
  AppLogger.debug('server MONGOOSE_ENABLED')
  MongoDBConnect()
}

// Create an express instance
const app = express()

// init cookie parser
app.use(cookieParser())

//configure app
app.use('*', cors())
app.use(morgan('dev', { 'stream': AppLogger.stream }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// init and configure passport
app.use(passport.initialize())

//app routes
// authentication routes
app.use('/auth', AuthRouter)

// others routes
if (process.env.MONGOOSE_ENABLED === 'true') {
  //mongo routes
  AppLogger.debug('server MONGOOSE_ENABLED')
  app.use('/app/mongo/users', MgUserRouter)
}
if (process.env.PSQL_ENABLED === 'true') {
  //psql routes
  AppLogger.debug('server PSQL_ENABLED')
  app.use('/app/psql/users', PsqlUserRouter)
}

//route index
app.get('/', (req, res) => {
  res.send('Invalid endpoint!')
})

// Start server
const portNumber = process.env.SERVER_APP_PORT || 3300
AppLogger.debug('AppRouter portNumber : ' + portNumber)
app.listen(portNumber, () => {
  AppLogger.debug('server started - ' + portNumber)
})
