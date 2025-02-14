import express from "express";
import { createCart } from "../controllers/cartsController.js";

const router = express.Router();

router.post("/", createCart);

export default router;
