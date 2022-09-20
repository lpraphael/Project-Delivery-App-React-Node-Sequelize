const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('sales', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'user_id',
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'seller_id',
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price',
      },
      deliveryAddress: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'delivery_address',
      },
      deliveryNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'delivery_number',
      },
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'sale_date',
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('sales');
  },
};
