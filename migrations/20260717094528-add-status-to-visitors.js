'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('visitors', 'status', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('visitors', 'status');
  },
};