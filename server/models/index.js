const sequelize = require('../config/config');
const Ping = require('./ping');  
const UserOTP = require('./userOTP')
const UserProfile = require('./userProfile')

const syncDb = async () => {
  await sequelize.sync({ force: false });
  console.log('Database synchronized');
};

module.exports = { sequelize, Ping, UserOTP, UserProfile, syncDb };
