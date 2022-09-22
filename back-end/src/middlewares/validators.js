const { StatusCodes } = require('http-status-codes');

const {
  loginSchema,
} = require('../helpers/schemas');

const login = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });

  next();
};

module.exports = {
  login,
}; 