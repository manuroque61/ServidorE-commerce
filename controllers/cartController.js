const FileManager = require('../utils/fileManager');
const { randomUUID } = require('crypto');

const cartManager = new FileManager('./data/carts.json');

class CartController {
    static create(req, res) {
        const carts = cartManager.read();
        const newCart = { id: randomUUID(), products: [] };

        carts.push(newCart);
        cartManager.write(carts);
        res.status(201).json(newCart);
    }

    static getById(req, res) {
        const carts = cartManager.read();
        const cart = carts.find(c => c.id === req.params.cid);
        cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
    }

    static addProduct(req, res) {
        const carts = cartManager.read();
        const cart = carts.find(c => c.id === req.params.cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const productId = req.params.pid;
        const productIndex = cart.products.findIndex(p => p.product === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        cartManager.write(carts);
        res.json(cart);
    }
}

module.exports = CartController;
