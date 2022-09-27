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

  const { id } = await user.create({ email,
    name,
    role,
    password: passwordEncrypt,
  });

  return { id, name, email, role };
};

const listAll = async () => {
  const users = await user.findAll(
    { attributes: {
      exclude: ['updatedAt', 'createdAt', 'password'],
    } },
);
  const roledUsers = { customers: [], sellers: [], administrators: [] };
  users.forEach((u) => {
    roledUsers[`${u.role}s`] = [...roledUsers[`${u.role}s`], u];
  });

  return roledUsers;
};

const delUser = async (id) => {
  const ERROR = 'User not found';
  const message = 'User deleted successfully';
  const userF = await user.destroy({ where: { id } });

  if (userF === 0) return { code: StatusCodes.NOT_FOUND, err: ERROR };

  return { message };
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

module.exports = { register, listAll, delUser, login };