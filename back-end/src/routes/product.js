const express = require('express');
const productController = require('../controllers/products');

const router = express.Router();

router.get('/:id', productController.listOne);
router.get('/', productController.listAll);

module.exports = router;
