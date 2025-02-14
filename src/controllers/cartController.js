import CartManager from "../models/CartManager.js";

export const createCart = async (req, res) => {
  res.json(await CartManager.addCart());
};
