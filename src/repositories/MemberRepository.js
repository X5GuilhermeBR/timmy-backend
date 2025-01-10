const Member = require('../models/Member');
const Address = require('../models/Address');
const User = require('../models/User');

const createMember = async (userData, memberData, addressData, transaction) => {
  const user = await User.create(userData, { transaction });
  const member = await Member.create({ ...memberData, UserId: user.id }, { transaction });
  const address = await Address.create({ ...addressData, MemberId: member.id }, { transaction });

  return { user, member, address };
};

const getAllMembers = async () => {
  return await Member.findAll({
    include: [
      {
        model: User,
        attributes: ['email', 'activated', 'avatar_url'],
      },
      {
        model: Address,
        attributes: ['street', 'city', 'state', 'zip_code'],
      },
    ],
  });
};

module.exports = { createMember, getAllMembers };
