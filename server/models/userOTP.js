const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const UserProfile = require('./userProfile');


const UserOTP = sequelize.define('UserOTP', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },


  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },

  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },

  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  


  createdAt: {
    type: DataTypes.INTEGER(13),
    allowNull: false,
    defaultValue: () => Math.floor(Date.now() / 1000),
  },
  
  updatedAt: {
    // type: DataTypes.DATE,
    type: DataTypes.INTEGER(13),
    allowNull: false,
    defaultValue: () => Math.floor(Date.now() / 1000),
  },
 

});

module.exports = UserOTP;



