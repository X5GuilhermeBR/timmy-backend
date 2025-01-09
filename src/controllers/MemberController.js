const MemberService = require('../services/MemberService');

const createMember = async (req, res) => {
  try {
    const { user, member, address } = req.body;
    const result = await MemberService.createMember(user, member, address);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createMember };
