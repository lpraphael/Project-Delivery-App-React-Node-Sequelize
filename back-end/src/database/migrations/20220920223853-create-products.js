const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
      urlImage: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'url_image',
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('products');
  }
};
