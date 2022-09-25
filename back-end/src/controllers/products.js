const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { product } = require('../database/models');
const productService = require('../services/products');

const listAll = async (_req, res) => {
  const allProducts = await product.findAll({
    attributes: { exclude: ['updatedAt', 'createdAt'] },
  });

  return res.status(StatusCodes.OK).json(allProducts);
};

const listOne = async (req, res) => {
  const { id } = req.params;

  try {
    const oneProduct = await productService.listOne(id);
    if (oneProduct.err) {
      return res.status(800).json({ message: oneProduct.err });
    }

    return res.status(StatusCodes.OK).json(oneProduct);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  listAll,
  listOne,
};