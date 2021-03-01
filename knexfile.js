require('dotenv').config()

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: 'true',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  }

};
