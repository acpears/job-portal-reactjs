'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Seekers', [{
      first_name: "Adam",
      last_name: "Pearson",
      email: "adamcpearson@yahoo.ca",
      password: "$2a$10$tzOjuzQfIMdWVL3JSN55WuG0OrZhNr8VBqr77ee2MDHU6dENR5eLC",

    }], {});

    await queryInterface.bulkInsert('Employers', [{
      company_name: "Adam Company",
      email: "adamcpearson@yahoo.ca",
      password: "$2a$10$tzOjuzQfIMdWVL3JSN55WuG0OrZhNr8VBqr77ee2MDHU6dENR5eLC",

    }], {});



    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
