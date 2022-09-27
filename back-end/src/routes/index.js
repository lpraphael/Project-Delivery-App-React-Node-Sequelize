const loginRouter = require('./login');
const productRouter = require('./product');
const registerRouter = require('./register');
const saleRouter = require('./sale');
const userRouter = require('./user');

module.exports = {
  saleRouter,
  userRouter,
  productRouter,
  loginRouter,
  registerRouter,
};