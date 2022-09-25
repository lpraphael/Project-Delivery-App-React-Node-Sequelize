const express = require('express');
const userController = require('../controllers/users');
const validators = require('../middlewares/validators');

const router = express.Router();

router.post('/',
  validators.login,
  userController.login);

module.exports = router;