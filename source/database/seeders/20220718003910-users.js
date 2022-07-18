'use strict';
const {index} = require('../../models/user.model')
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users',index(),{});
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
