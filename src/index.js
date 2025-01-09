const express = require('express');
const { sequelize } = require('./infrastructure/database');
const memberRoutes = require('./routes/membersRoute');
const app = express();

app.use(express.json()); // Para que o body da requisição seja processado como JSON

// Usar a rota para criação de membros
app.use('/api', memberRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
