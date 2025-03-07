import Cart from '../models/cartModel.js';

// Obtener carrito por ID con populate
export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar producto de un carrito
export const removeProductFromCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
        await cart.save();
        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};