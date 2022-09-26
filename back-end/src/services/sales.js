const { StatusCodes } = require('http-status-codes');
const { sale, salesProduct, product } = require('../database/models');

const listOne = async (id) => {
  const ERROR = 'Sale does not exist';
  const saleF = await sale.findOne({
    where: { id },
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    include: [{ model: product, as: 'products', through: { attributes: ['quantity'] } }],
  });
  if (!saleF) return { err: ERROR, code: StatusCodes.NOT_FOUND };
  return saleF;
};

const listAll = async (role, id) => {
  const sales = await sale.findAll({
    where: { [role]: id },
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    include: [{ model: product, as: 'products', through: { attributes: [] } }],
  });
  return sales;
};

const updateStatus = async ({ id }, { status }) => {
  const ERROR = 'Sale does not exist';
  let saleF = await sale.findByPk(id, {
    attributes: { exclude: ['updatedAt', 'createdAt'] },
  });
  if (!saleF) {
    return { 
    err: ERROR,
    code: StatusCodes.NOT_FOUND,
  };
  }
  saleF.status = status;
  saleF = await saleF.save();

  return { saleF };
};

const create = async ({ 
  userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, productsArray }) => {
  const products = await product.findAll();
  const productsIds = products.map((p) => p.id);
  const bool = productsArray.every(({ productId }) => productsIds.includes(productId));
  if (!bool) return { code: StatusCodes.NOT_FOUND, err: 'Products do not exist' };

  const { id, status } = await sale.create({ userId,
    sellerId,
    deliveryNumber,
    totalPrice,
    deliveryAddress,
    status: 'Pendente',
    saleDate: Date.now(),
    updatedAt: Date.now(),
    createdAt: Date.now(),
  });

await Promise.all(productsArray.map((p) => salesProduct
  .create({ productId: p.productId, saleId: id, quantity: p.quantity })));

return { id, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status };
};

module.exports = {
  listAll,
  listOne,
  create,
  updateStatus,
};