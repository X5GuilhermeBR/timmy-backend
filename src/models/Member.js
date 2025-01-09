// src/models/member.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../infrastructure/database');

const Member = sequelize.define('Member', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  marital_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  baptism_date: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'members',
  timestamps: true,
});

module.exports = Member;
