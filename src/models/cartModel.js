import mongoose from 'mongoose';

// Definir esquema del carrito
const cartSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
});

export default mongoose.model('Cart', cartSchema);