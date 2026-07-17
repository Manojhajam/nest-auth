'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('visitors', 'status');

    await queryInterface.addColumn('visitors', 'visitor_type', {
      type: Sequelize.ENUM('CITIZEN', 'VENDOR', 'CONTRACTOR', 'NGO', 'POLICE', 'OTHER'),
      allowNull: false,
      defaultValue: 'CITIZEN',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('visitors', 'visitor_type');

    await queryInterface.addColumn('visitors', 'status', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },
};
