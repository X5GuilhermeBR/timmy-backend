const Address = require('../models/Address');

class AddressRepository {
  async createAddress({ member_id, street, number, city, state, zip_code, country }) {
    const newAddress = await Address.create({
      member_id,
      street,
      number,
      city,
      state,
      zip_code,
      country,
    });

    return newAddress.get({ plain: true });
  }
}

module.exports = new AddressRepository();
