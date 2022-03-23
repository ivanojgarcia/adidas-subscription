require('dotenv').config()

module.exports = {
  development: {
    username: process.env.USER_DATABASE,
    password: process.env.USER_PASS_DATABASE,
    database: process.env.DATABASE,
    // host: 'postgres-db',
    dialect: 'postgres',
  },
  test: {
    username: process.env.USER_DATABASE,
    password: process.env.USER_PASS_DATABASE,
    database: process.env.DATABASE,
    // host: 'postgres-db',
    dialect: 'postgres',
  },
  production: {
    username: process.env.USER_DATABASE,
    password: process.env.USER_PASS_DATABASE,
    database: process.env.DATABASE,
    host: 'postgres-db',
    dialect: 'postgres',
  },
}