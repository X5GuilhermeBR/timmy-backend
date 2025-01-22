// src/models/index.js
const { sequelize, Sequelize } = require('../infrastructure/database');
const User = require('./user');
const Member = require('./member');
const Address = require('./address');

// Criando as associações
Member.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Member, { foreignKey: 'user_id' });

Member.hasMany(Address, { foreignKey: 'member_id' });
Address.belongsTo(Member, { foreignKey: 'member_id' });

// Exportando os modelos
const models = {
  User,
  Member,
  Address,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { sequelize, Sequelize, ...models };
