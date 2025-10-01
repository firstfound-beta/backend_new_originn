// src/app.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import startupRoutes from "./routes/startupRoutes";
import compnayRoutes from "./routes/companyRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/startups", startupRoutes);
app.use("/api/company", compnayRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
