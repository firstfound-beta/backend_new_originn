// src/routes/adminRoutes.ts
import express from "express";
import {
  getPendingStartups,
  approveStartup,
  rejectStartup,
  getPendingCompany,
  approveCompany,
  rejectCompany,
} from "../controllers/adminController";

const router = express.Router();

// Startups
router.get("/startups/pending", getPendingStartups);
router.patch("/startups/:id/accept", approveStartup);
router.patch("/startups/:id/reject", rejectStartup);

// company
router.get("/company/pending", getPendingCompany);
router.patch("/company/:id/accept", approveCompany);
router.patch("/company/:id/reject", rejectCompany);

export default router;
