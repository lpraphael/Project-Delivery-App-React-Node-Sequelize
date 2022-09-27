const express = require('express');

const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const validators = require('../middlewares/validators');
const userController = require('../controllers/users');
 
const router = express.Router();

router.delete('/:id',
  authorizationMiddleware,
  validators.adm,
  userController.delUser);

router.post('/',
  authorizationMiddleware,
  validators.adm,
  validators.createUsers,
  userController.register);

router.get('/sellers',
    authorizationMiddleware,
    userController.listAll);

router.get('/all',
  authorizationMiddleware,
  validators.adm,
  userController.listAll);

module.exports = router;
