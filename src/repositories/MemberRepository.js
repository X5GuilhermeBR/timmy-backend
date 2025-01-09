const Member = require('../models/Member');
const Address = require('../../addresses/models/Address');
const User = require('../../users/models/User');

const createMember = async (userData, memberData, addressData, transaction) => {
  const user = await User.create(userData, { transaction });
  const member = await Member.create({ ...memberData, UserId: user.id }, { transaction });
  const address = await Address.create({ ...addressData, MemberId: member.id }, { transaction });

  return { user, member, address };
};

module.exports = { createMember };
