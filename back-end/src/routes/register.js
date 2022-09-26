const express = require('express');
const validators = require('../middlewares/validators');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/',
  validators.createUsers,
  userController.register);

module.exports = router;
