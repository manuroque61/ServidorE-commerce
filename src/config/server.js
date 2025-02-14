import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productsRoutes from "../routes/productsRoutes.js";
import cartsRoutes from "../routes/cartsRoutes.js";
import viewsRoutes from "../routes/viewsRoutes.js";

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Rutas
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/", viewsRoutes);

// Servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

// WebSockets
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("newProduct", (data) => {
    io.emit("updateProducts", data);
  });

  socket.on("deleteProduct", (productId) => {
    io.emit("updateProducts", productId);
  });
});

export { io };
