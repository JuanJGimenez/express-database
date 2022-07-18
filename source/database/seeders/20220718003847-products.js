'use strict';
const {index} = require('../../models/product.model')
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Products',index(), {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Products', null, {});
  }
};
