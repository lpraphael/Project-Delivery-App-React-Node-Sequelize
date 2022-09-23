const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const md5 = require('md5');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');

const { user } = require('../database/models');

const register = async ({ name, email, password, role = 'customer' }) => {
  const ERROR = 'Email or name already registered';
  const fUser = await user.findOne({
    where: {
      [Op.or]: [
        { name },
        { email },
      ],
    },
  });

  if (fUser) return { err: ERROR, code: StatusCodes.CONFLICT };

  const passwordEncrypt = md5(password);

  const userCreated = await user.create({ email,
    name,
    role,
    password: passwordEncrypt,
  });

  return userCreated;
};

const login = async ({ email, password }) => {
  const ERROR = 'Incorrect email or password';
  const userF = await user.findOne({ where: { email } });
  if (!userF) return { code: StatusCodes.NOT_FOUND, err: ERROR };

  const decryptedPassword = md5(password) === userF.password;
  
  if (!decryptedPassword) return { code: StatusCodes.UNAUTHORIZED, err: ERROR };
  
  const { id, role, name } = userF;
  const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
  const token = jwt.sign( 
    { id, role, name, email }, secret, { expiresIn: '7d', algorithm: 'HS256' },
  );

  return { user: { id, role, name, email }, token };
};

module.exports = { register, login };