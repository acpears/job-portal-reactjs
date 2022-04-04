'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Jobs', [{
      title: "IT Project Manager",
      description: "Adipisicing ipsum nulla exercitation ut velit ad sint Lorem sit id quis. Laboris cillum reprehenderit tempor sit velit minim et mollit velit esse ex culpa. Ex do adipisicing sunt commodo ut. Ut magna ea sit deserunt ut exercitation laborum enim do. Tempor ea ad dolor laboris.",
      num_positions: 1,
      filled_positions: 0,
      category: "IT",
      employer_id: "1"
    },
    {
      title: "Finance Assistant",
      description: "Adipisicing ipsum nulla exercitation ut velit ad sint Lorem sit id quis. Laboris cillum reprehenderit tempor sit velit minim et mollit velit esse ex culpa. Ex do adipisicing sunt commodo ut. Ut magna ea sit deserunt ut exercitation laborum enim do. Tempor ea ad dolor laboris.",
      num_positions: 2,
      filled_positions: 0,
      category: "Accounting",
      employer_id: "1"
    },
    {
      title: "Opereation Technician",
      description: "Adipisicing ipsum nulla exercitation ut velit ad sint Lorem sit id quis. Laboris cillum reprehenderit tempor sit velit minim et mollit velit esse ex culpa. Ex do adipisicing sunt commodo ut. Ut magna ea sit deserunt ut exercitation laborum enim do. Tempor ea ad dolor laboris.",
      num_positions: 8,
      filled_positions: 0,
      category: "Operations",
      employer_id: "1"
    }], {});

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
