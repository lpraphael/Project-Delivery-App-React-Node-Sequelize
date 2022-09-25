const Joi = require('joi');

const loginS = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const createSaleS = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.number().required(),
  productsArray: Joi.array().items(
    Joi.object(
      { 
        quantity: Joi.number().required(),
        productId: Joi.number().required(),
      },
      ).required(),
      ).required(),
});

const updateStatusS = Joi.object({
  status: Joi.string().valid(
    'Pendente',
    'Preparando',
    'Em Trânsito',
    'Entregue',
    ).required(),
});

const createUsersS = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  role: Joi.string()
    .valid(
      'administrator',
      'seller',
      'customer',
    ),
  name: Joi.string()
    .min(12)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

module.exports = {
  loginS,
  updateStatusS,
  createUsersS,
  createSaleS,
};