// src/routes/productRoutes.ts
import express from "express";
import { registerCompany, getApprovedCompanys, getCompanyId } from "../controllers/companyController";

const router = express.Router();

router.post("/register", registerCompany);
router.get("/", getApprovedCompanys);
router.get("/:id", getCompanyId);

export default router;
