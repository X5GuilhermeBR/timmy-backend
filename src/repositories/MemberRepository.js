const { Member, User } = require('../models');
const { Sequelize } = require('sequelize');

const createMember = async (userData, memberData, transaction) => {
  const user = await User.create(userData, { transaction });

  const member = await Member.create({ ...memberData, user_id: user.id }, { transaction });

  return { user, member };
};

const getMemberById = async (id) => {
  try {
    const member = await Member.findOne({
      where: { id },
      attributes: [
        'id',
        'full_name',
        'date_of_birth',
        'marital_status',
        'baptism_date',
        'is_actived',
        [Sequelize.col('User.email'), 'email'],
        [Sequelize.col('User.activated'), 'activated'],
        [Sequelize.col('User.avatar_url'), 'avatar_url'],
      ],
      include: [
        {
          model: User,
          attributes: [], 
        }
      ],
      raw: true,
    });

    return member || null;
  } catch (error) {
    throw new Error('Error fetching member: ' + error.message);
  }
};

const getAllMembers = async () => {
  return await Member.findAll({
    attributes: [
      'id',
      'full_name',
      'phone_number',
      'is_actived',
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

module.exports = { createMember,  getMemberById, getAllMembers, deactivateMember, updateMember };
