const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

router.get('/:category/products', productController.getAllProducts);
router.get(
	'/:category/products/:productId',
	productController.getProductDetails
);

module.exports = router;
