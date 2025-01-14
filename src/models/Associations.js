const Member = require('./Member');
const Address = require('./Address');

Member.hasMany(Address, { foreignKey: 'member_id' });
Address.belongsTo(Member, { foreignKey: 'member_id' });
