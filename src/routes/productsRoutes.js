import express from "express";
import { getAllProducts, addProduct, deleteProduct } from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

export default router;
