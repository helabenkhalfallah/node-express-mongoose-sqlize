'use strict';
import Sequelize from 'Sequelize';

// configure psql db
const dbHost = process.env.PSQL_DB_HOST;
const dbName = process.env.PSQL_DB_NAME;
const dbPort = process.env.PSQL_DB_PORT;
const dbUser = process.env.PSQL_DB_USER;
const dbPassword = process.env.PSQL_DB_PASSWORD;
const dbDialect = process.env.PSQL_DB_DIALECT;
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  operatorsAliases: false,
  define: {
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Connect all the models/tables in
// the database to a db object,
// so everything is accessible via one object
const PsqlDB = {};

PsqlDB.Sequelize = Sequelize;
PsqlDB.sequelize = sequelize;

// Models/tables
// PsqlDB.owners = require('../models/owners.js')(sequelize, Sequelize)
PsqlDB.users = require('./UserEntity')(sequelize, Sequelize);

// Relations
// PsqlDB.pets.belongsTo(PsqlDB.owners)
// PsqlDB.owners.hasMany(PsqlDB.pets)


export default PsqlDB;

