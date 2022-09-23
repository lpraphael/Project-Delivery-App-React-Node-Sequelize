const { StatusCodes } = require('http-status-codes');
const { product } = require('../database/models');

const listAll = async () => {
  const foundProduct = await product.findAll();
  return foundProduct;
};

const listOne = async (id) => {
  const ERROR = 'Product does not exist';
  const foundProduct = await product.findByPk(id);

  if (!foundProduct) return { err: ERROR, code: StatusCodes.NOT_FOUND };

  return foundProduct;
};

module.exports = {
  listAll,
  listOne,
};