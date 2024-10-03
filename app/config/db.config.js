const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Usuario = require('../models/Usuarios.model.js')(sequelize, Sequelize);
db.Libros = require('../models/Libros.model.js')(sequelize, Sequelize);
db.Autores = require('../models/Autores.model.js')(sequelize,Sequelize);
 
module.exports = db;