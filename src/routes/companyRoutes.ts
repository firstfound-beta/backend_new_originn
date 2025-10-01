// src/routes/productRoutes.ts
import express from "express";
import { registerCompany, getApprovedCompanys } from "../controllers/companyController";

const router = express.Router();

router.post("/register", registerCompany);
router.get("/", getApprovedCompanys);

export default router;
