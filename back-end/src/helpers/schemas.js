const Joi = require('joi');

const loginS = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
  .min(6)
  .required(),
});

const createUsersS = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('administrator', 'seller', 'customer'),
  name: Joi.string().min(12).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  loginS,
  createUsersS,
};