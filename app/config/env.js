

const env = {
  database: 'antigua_umg_24_09_24',
  username: 'antigua_umg_24_09_24_user',
  password: 'k1tJEaanbkU3yBqDCiam79VF8rs3jj2U',
  host: 'dpg-crppvajtq21c73d6ilr0-a.oregon-postgres.render.com',
  dialect: 'postgres',
  ssl: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;