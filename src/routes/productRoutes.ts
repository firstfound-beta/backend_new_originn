// src/routes/productRoutes.ts
import express from "express";
import { registerProduct, getApprovedProducts } from "../controllers/productController";

const router = express.Router();

router.post("/register", registerProduct);
router.get("/", getApprovedProducts);

export default router;
