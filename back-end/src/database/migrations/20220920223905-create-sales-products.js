const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'sale_id',
        references: {
          model: 'sales',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('salesProducts');
  }
};
