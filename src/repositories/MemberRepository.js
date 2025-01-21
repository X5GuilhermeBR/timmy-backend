const Member = require('../models/Member');
const User = require('../models/User');
const { Sequelize } = require('sequelize');


const createMember = async (userData, memberData, transaction) => {
  const user = await User.create(userData, { transaction });

  const member = await Member.create({ ...memberData, user_id: user.id }, { transaction });

  return { user, member };
};

const getAllMembers = async () => {
  return await Member.findAll({
    attributes: [
      'id',
      'full_name',
      'phone_number',
      [Sequelize.col('User.activated'), 'activated'],
      [Sequelize.col('User.avatar_url'), 'avatar_url'],
    ],
    include: [
      {
        model: User,
        attributes: [],
      },
    ],
    raw: true,
  });
};

const deactivateMember = async (id) => {
  console.log(`Desativando membro com ID: ${id}`);
  const [rowsUpdated] = await Member.update(
    { is_actived: false },
    { where: { id, is_actived: true } }
  );
  return rowsUpdated;
};

const updateMember = async (id, updateData) => {
  const member = await Member.findByPk(id);

  if (!member) {
    return null;
  }

  const updatedMember = await member.update(updateData);

  return updatedMember;
};

module.exports = { createMember, getAllMembers, deactivateMember, updateMember };
