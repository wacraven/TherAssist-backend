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
      user: 'ptqkftcxusqolz',
      password: '2M8koxuxoQk1b9WkPK_hd1f4hQ',
      host: 'ec2-54-243-52-115.compute-1.amazonaws.com',
      database: 'd8o8mpl0b79muq',
      ssl: true
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
