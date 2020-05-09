// mongoose part
import mongoose from 'mongoose';
import {
  AppLogger,
} from '../../../../core';

// promise
mongoose.Promise = Promise;

/**
 * Mongodb connect
 */
const MongoDBConnect = async () => {
  const dbHost = process.env.MONGOOSE_DB_HOST;
  const dbPort = process.env.MONGOOSE_DB_PORT;
  const dbName = process.env.MONGOOSE_DB_NAME;
  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    AppLogger.debug('Connected to mongo!!!');
  } catch (error) {
    AppLogger.error('Could not connect to MongoDB', error);
  }
};

export default MongoDBConnect;
