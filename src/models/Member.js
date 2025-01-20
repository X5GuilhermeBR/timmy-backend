const { DataTypes } = require('sequelize');
const { sequelize } = require('../infrastructure/database');
const User = require('./user');
const Address = require('./address'); 

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
  is_actived: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'members',
  timestamps: true,
});

Member.hasMany(Address, { foreignKey: 'member_id' });
Member.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Member;
