//mongoose part
import mongoose from 'mongoose'
import AppLogger from '../core/logger/AppLogger'

//promise
mongoose.Promise = global.Promise

//connect
const DBConnect = async () => {
  let dbHost = process.env.MONGOOSE_DB_HOST
  let dbPort = process.env.MONGOOSE_DB_PORT
  let dbName = process.env.MONGOOSE_DB_NAME
  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)
    AppLogger.debug('Connected to mongo!!!')
  }
  catch (err) {
    AppLogger.error('Could not connect to MongoDB')
  }
}

export default DBConnect
