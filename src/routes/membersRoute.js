const express = require('express');
const User = require('../models/User');
const Member = require('../models/Member');
const Address = require('../models/Address');
const { sequelize } = require('../infrastructure/database'); 

const router = express.Router();

router.post('/member', async (req, res) => {
  const { user, member, address } = req.body;

  let transaction; 

  try {
    
    transaction = await sequelize.transaction();

    const newUser = await User.create(user, { transaction });

    const newMember = await Member.create({ ...member, userId: newUser.id }, { transaction });

    const newAddress = await Address.create({ ...address, memberId: newMember.id }, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: 'Membro criado com sucesso!',
      data: {
        user: newUser,
        member: newMember,
        address: newAddress,
      },
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }

    res.status(500).json({
      message: 'Erro ao criar membro',
      error: error.message,
    });
  }
});

module.exports = router;
