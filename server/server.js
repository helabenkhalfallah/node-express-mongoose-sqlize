//import router 
import AppRouter from '../routes/AppRouter'

//import logger
import AppLogger from '../core/logger/AppLogger'
import morgan from 'morgan'
AppLogger.stream = {
  write: function (message, encoding) {
    AppLogger.info(message, encoding)
  }
}

//express config 
import express from 'express'
import cors from 'cors'

//mongoose part
import DBConnect from '../db/DBConnect'
DBConnect()

// Create an express instance
const app = express()

//configure app
app.use('*', cors())
app.use(morgan('dev', { 'stream': AppLogger.stream }))

//routes
app.use('/app', AppRouter)

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
