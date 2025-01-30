const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');

router.post('/', CartController.create);
router.get('/:cid', CartController.getById);
router.post('/:cid/product/:pid', CartController.addProduct);

module.exports = router;
