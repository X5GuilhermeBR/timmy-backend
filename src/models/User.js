// src/models/user.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../infrastructure/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  avatar_url: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
