const express = require('express');
const saleController = require('../controllers/sales');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const validators = require('../middlewares/validators');

const router = express.Router();

router.post('/',
  authorizationMiddleware,
  validators.createSale,
  saleController.create);

router.patch('/:id',
  authorizationMiddleware,
  validators.updateStatus,
  saleController.updateStatus);

router.get('/',
  authorizationMiddleware,
  saleController.listAll);

router.get('/:id',
  saleController.listOne);

module.exports = router;
