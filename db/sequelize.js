const config = require("./dbconfig");
//const { Sequelize, DataTypes } = require('sequelize');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    //operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    //timezone: '+07'
  },
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// overwrite date time conversion
// Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
//   date = this._applyTimezone(date, options);
//   // Z here means current timezone, _not_ UTC
//   // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
//   return date.format('YYYY-MM-DD HH:mm:ss.SSS');
// };
// export
module.exports = db;