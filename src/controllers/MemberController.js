const { sequelize } = require('../infrastructure/database');
const { createMember, getAllMembers, deactivateMember, updateMember } = require('../repositories/MemberRepository');

class MemberController {
  static async createMember(req, res) {
    const { user, member } = req.body;
  
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const newMemberData = await createMember(user, member, transaction);
      await transaction.commit();
  
      res.status(201).json({
        message: 'Membro criado com sucesso!',
        data: newMemberData,
      });
    } catch (error) {
      if (transaction) await transaction.rollback();
  
      res.status(500).json({
        message: 'Erro ao criar membro',
        error: error.message,
      });
    }
  }

  static async getAllMembers(req, res) {
    try {
      const members = await getAllMembers();
      res.status(200).json({
        message: 'Lista de membros recuperada com sucesso!',
        data: members,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao recuperar membros',
        error: error.message,
      });
    }
  }

  static async deactivateMember(req, res) {
    const { id } = req.params;

    try {
      const rowsUpdated = await deactivateMember(id);

      if (rowsUpdated === 0) {
        return res.status(404).json({
          message: `Membro com ID ${id} não encontrado.`,
        });
      }

      res.status(200).json({
        message: `Membro com ID ${id} foi desativado com sucesso.`,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao desativar o membro.',
        error: error.message,
      });
    }
  }

  static async updateMember(req, res) {
    const { id } = req.params;
    const { full_name, date_of_birth, marital_status, baptism_date } = req.body;

    try {
      const updatedMember = await updateMember(id, {
        full_name,
        date_of_birth,
        marital_status,
        baptism_date,
      });

      if (!updatedMember) {
        return res.status(404).json({ message: 'Membro não encontrado.' });
      }

      res.status(200).json({
        message: 'Membro atualizado com sucesso!',
        data: updatedMember,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Erro ao atualizar o membro.',
        error: error.message,
      });
    }
  }
}

module.exports = MemberController;
