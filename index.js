//dot env configuration
import dotenv from 'dotenv'

// load env
dotenv.load()

//launch server after loading env var
require('./server/server.js')

