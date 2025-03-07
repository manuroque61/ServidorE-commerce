import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Definir esquema del producto
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    thumbnail: String
});

// Agregar paginación al modelo
productSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productSchema);
