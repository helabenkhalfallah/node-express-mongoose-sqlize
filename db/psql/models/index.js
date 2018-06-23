'use strict'
import fs from 'fs'
import path from 'path'
import Sequelize from 'Sequelize'

//psql db instance
let PsqlDB = {}

//configure psql db
let basename = path.basename(__filename)
let dbHost = process.env.PSQL_DB_HOST
let dbName = process.env.PSQL_DB_NAME
let dbPort = process.env.PSQL_DB_PORT
let dbUser = process.env.PSQL_DB_USER
let dbPassword = process.env.PSQL_DB_PASSWORD
let sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  operatorsAliases: false,
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file))
    PsqlDB[model.name] = model
  })

Object.keys(PsqlDB).forEach(modelName => {
  if (PsqlDB[modelName].associate) {
    PsqlDB[modelName].associate(PsqlDB)
  }
})

PsqlDB.sequelize = sequelize
PsqlDB.Sequelize = Sequelize

export default PsqlDB

