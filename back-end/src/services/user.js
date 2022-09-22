const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs');
const { user } = require('../database/models');

const login = async ({ email, password }) => {
  const ERROR_MESSAGE = 'Incorrect email or password';
  const userF = await user.findOne({ where: { email } });
  if (!userF) return { code: StatusCodes.NOT_FOUND, err: ERROR_MESSAGE };

  const decryptedPassword = md5(password) === userF.password;
  
  if (!decryptedPassword) return { code: StatusCodes.UNAUTHORIZED, err: ERROR_MESSAGE };
  
  const { id, role, name } = userF;
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  const token = jwt.sign( 
    { id, role, name, email }, secret, { expiresIn: '7d', algorithm: 'HS256' },
  );

  return { user: { id, role, name, email }, token };
};

module.exports = { login };