const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.getAll);
router.get('/:pid', ProductController.getById);
router.post('/', ProductController.create);
router.put('/:pid', ProductController.update);
router.delete('/:pid', ProductController.delete);

module.exports = router;
