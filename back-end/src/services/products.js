const { StatusCodes } = require('http-status-codes');
const { product } = require('../database/models');

const listOne = async (id) => {
  const ERROR = 'Product does not exist';
  const foundProduct = await product.findByPk(id, {
    attributes: { exclude: ['updatedAt', 'createdAt'] },
  });

  if (!foundProduct) return { err: ERROR, code: StatusCodes.NOT_FOUND };

  return foundProduct;
};

module.exports = {
  listOne,
};