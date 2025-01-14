const express = require('express');
const { sequelize } = require('./infrastructure/database');
const memberRoutes = require('./routes/membersRoute');
const addressRoutes = require('./routes/AddressRoute');
require('./models/Associations');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', memberRoutes);
app.use('/api', addressRoutes);

sequelize.sync()
  .then(() => {
    console.log('🚀 Banco de dados sincronizado com sucesso!');
    app.listen(PORT, () => {
      console.log(`🌐 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao sincronizar o banco de dados:', error);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro no servidor!', error: err.message });
});
