const fs = require('fs');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { user } = require('../database/models');

const authorizationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const keySecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
    const verified = jwt.verify(token, keySecret);
    const foundUser = await user.findOne({ where: { email: verified.email } });

    if (!foundUser) return res.status(401).json({ message: 'Error to find user' });

    req.user = foundUser;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authorizationMiddleware;