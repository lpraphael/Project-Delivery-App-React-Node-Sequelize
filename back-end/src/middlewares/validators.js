const { StatusCodes } = require('http-status-codes');
const {
  loginS,
  createUsersS,
  createSaleS,
  updateStatusS,
} = require('../helpers/schemas');

const createSale = (req, res, next) => {
  const { error } = createSaleS.validate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });

  next();
};

const createUsers = (req, res, next) => {
  const { error } = createUsersS.validate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });

  next();
};

const updateStatus = (req, res, next) => {
  const { error } = updateStatusS.validate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });

  next();
};

const login = (req, res, next) => {
  const { error } = loginS.validate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });

  next();
};

module.exports = {
  login,
  createUsers,
  createSale,
  updateStatus,
}; 