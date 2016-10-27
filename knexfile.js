// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'serverAPI',
      user:     'admin',
      password: ''
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'serverAPI',
      user:     'admin',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'd8o8mpl0b79muq',
      user:     'ptqkftcxusqolz',
      password: '2M8koxuxoQk1b9WkPK_hd1f4hQ'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
