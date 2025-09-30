// src/routes/adminRoutes.ts
import express from "express";
import {
  getPendingStartups,
  approveStartup,
  rejectStartup,
  getPendingProducts,
  approveProduct,
  rejectProduct,
} from "../controllers/adminController";

const router = express.Router();

// Startups
router.get("/startups/pending", getPendingStartups);
router.patch("/startups/:id/accept", approveStartup);
router.patch("/startups/:id/reject", rejectStartup);

// Products
router.get("/products/pending", getPendingProducts);
router.patch("/products/:id/accept", approveProduct);
router.patch("/products/:id/reject", rejectProduct);

export default router;
