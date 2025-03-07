import { Router } from 'express';
import { getCartById, removeProductFromCart } from '../controllers/cartsController.js';

const router = Router();
router.get('/:cid', getCartById);
router.delete('/:cid/products/:pid', removeProductFromCart);
export default router;