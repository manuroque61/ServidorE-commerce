import ProductManager from "../models/ProductManager.js";
import { io } from "../config/server.js";

export const getAllProducts = async (req, res) => {
  res.json(await ProductManager.getAll());
};

export const addProduct = async (req, res) => {
  const product = await ProductManager.addProduct(req.body);
  io.emit("updateProducts", await ProductManager.getAll()); // Emitir evento de actualización
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await ProductManager.deleteProduct(Number(req.params.id));
  io.emit("updateProducts", await ProductManager.getAll()); // Emitir evento de actualización
  res.sendStatus(200);
};
