// src/routes/startupRoutes.ts
import express from "express";
import { registerStartup, loginStartup, getDashboard } from "../controllers/startupController";

const router = express.Router();

router.post("/register", registerStartup);
router.post("/login", loginStartup);
router.get("/dashboard", getDashboard);

export default router;
