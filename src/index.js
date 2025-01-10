const express = require('express');
const { sequelize } = require('./infrastructure/database');
const memberRoutes = require('./routes/membersRoute');
require('dotenv').config();

const User = require('./models/User');
const Member = require('./models/Member');
const Address = require('./models/Address');

Member.belongsTo(User, { foreignKey: 'user_id' });
Member.hasMany(Address, { foreignKey: 'member_id' });
Address.belongsTo(Member, { foreignKey: 'member_id' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', memberRoutes);

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
