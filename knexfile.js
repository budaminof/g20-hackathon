// Update with your config settings.

module.exports = {
    development: {
    client: 'postgresql',
    connection: 'postgres://localhost/knex-gearswap-auth',
    pool: {
      min: 2,
      max: 10
    }
  }

};
