'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Security_Questions', [
      { id: 1, question: "What was your childhood nickname?" },
      { id: 2, question: "In what city did you meet your spouse / significant other ?" },
      { id: 3, question: "What is the name of your favorite childhood friend ?" },
      { id: 4, question: "What is your oldest sibling's middle name?" },
      { id: 5, question: "What is your oldest cousin's first name?" },
      { id: 6, question: "In what city or town did your parents meet ?" },
      { id: 7, question: "In what city does your nearest sibling live ?" },
      { id: 8, question: "In what city or town was your first job ?" },
    ], {});

    await queryInterface.bulkInsert('Seeker_Plans', [
      { name: "basic", cost: 0, limit: 0, description: "Viewing Only" },
      { name: "prime", cost: 0, limit: 0, description: "Maximum of 5 applications" },
      { name: "gold", cost: 0, limit: 0, description: "Unlimited number of applications" },
    ], {});

    await queryInterface.bulkInsert('Employer_Plans', [
      { name: "basic", cost: 0, limit: 0, description: "Viewing Only" },
      { name: "prime", cost: 0, limit: 0, description: "Maximum of 5 applications" },
      { name: "gold", cost: 0, limit: 0, description: "Unlimited number of applications" },
      { name: "elite", cost: 0, limit: 0, description: "Unlimited number of applications" },
    ], {});
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
