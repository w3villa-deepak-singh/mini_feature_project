
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Ping = sequelize.define('Ping', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Ping;
