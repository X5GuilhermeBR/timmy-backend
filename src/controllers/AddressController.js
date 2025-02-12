const AddressRepository = require('../repositories/AddressRepository');

class AddressController {
  async create(req, res) {
    try {
      const { member_id, street, number, complement, city, state, zip_code, country } = req.body;

      const newAddress = await AddressRepository.createAddress({
        member_id,
        street,
        number,
        complement,
        city,
        state,
        zip_code,
        country,
      });

      return res.status(201).json({
        message: 'Endereço criado com sucesso!',
        data: {
          address: newAddress,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Erro ao criar endereço',
        error: error.message,
      });
    }
  }

  async getByMemberId(req, res) {
    try {
      const { userId } = req.params;

      const address = await AddressRepository.getAddressByMemberId(userId);

      if (!address) {
        return res.status(404).json({ message: 'Endereço não encontrado' });
      }

      return res.status(200).json(address);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      return res.status(500).json({
        message: 'Erro ao buscar endereço',
        error: error.message,
      });
    }
  }
}

module.exports = new AddressController();
