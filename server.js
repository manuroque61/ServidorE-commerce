import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';

const app = express();
connectDB();
app.use(express.json());

// Configuración de Handlebars
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Rutas API
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Iniciar servidor
const httpServer = app.listen(3000, () => console.log('✅ Servidor en puerto 3000'));
const io = new Server(httpServer);

