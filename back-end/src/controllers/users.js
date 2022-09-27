const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const userService = require('../services/users');

const listAll = async (req, res) => {
  const { role } = req.user;
  try {
    const users = await userService.listAll();
    if (role !== 'administrator') return res.status(StatusCodes.OK).json(users.sellers);

    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const delUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.delUser(id);
    if (user.err) return res.status(user.code).json({ message: user.err });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    if (user.err) {
      return res.status(user.code).json({ message: user.err });
    }

    return res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    if (user.err) return res.status(user.code).json({ message: user.err });
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { register, listAll, delUser, login };