const sequelize = require('../infrastructure/database');
const MemberRepository = require('../repositories/MemberRepository');

const createMember = async (userData, memberData, addressData) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await MemberRepository.createMember(userData, memberData, addressData, transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw new Error('Failed to create member: ' + error.message);
  }
};

module.exports = { createMember };
