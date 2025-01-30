const FileManager = require('../utils/fileManager');
const { randomUUID } = require('crypto');

const productManager = new FileManager('./data/products.json');

class ProductController {
    static getAll(req, res) {
        const products = productManager.read();
        const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
        res.json(products.slice(0, limit));
    }

    static getById(req, res) {
        const products = productManager.read();
        const product = products.find(p => p.id === req.params.pid);
        product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
    }

    static create(req, res) {
        const { title, description, code, price, stock, category, thumbnails, status } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const products = productManager.read();
        const newProduct = { 
            id: randomUUID(), title, description, code, price, stock, category, 
            thumbnails: thumbnails || [], status: status ?? true 
        };

        products.push(newProduct);
        productManager.write(products);
        res.status(201).json(newProduct);
    }

    static update(req, res) {
        const products = productManager.read();
        const index = products.findIndex(p => p.id === req.params.pid);
        if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

        products[index] = { ...products[index], ...req.body, id: products[index].id };
        productManager.write(products);
        res.json(products[index]);
    }

    static delete(req, res) {
        let products = productManager.read();
        const filteredProducts = products.filter(p => p.id !== req.params.pid);
        if (filteredProducts.length === products.length) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        productManager.write(filteredProducts);
        res.status(204).send();
    }
}

module.exports = ProductController;
