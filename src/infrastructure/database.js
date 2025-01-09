const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(config.development); 
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

module.exports = { sequelize, testConnection };
