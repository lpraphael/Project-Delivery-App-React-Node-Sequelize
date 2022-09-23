const { StatusCodes } = require('http-status-codes');
const {
  loginS,
  createUsersS,
} = require('../helpers/schemas');

const createUsers = (req, res, next) => {
  const { error } = createUsersS.validate(req.body);
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
}; 