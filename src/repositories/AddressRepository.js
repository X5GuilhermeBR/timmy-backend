const { Address } = require('../models');

class AddressRepository {
  async createAddress({ member_id, street, number, complement, city, state, zip_code, country }) {
    const newAddress = await Address.create({
      member_id,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
      country,
    });

    return newAddress.get({ plain: true });
  }

  async getAddressByMemberId(memberId) {
    return await Address.findOne({ where: { member_id: memberId } });
  }
}

module.exports = new AddressRepository();
