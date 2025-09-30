// src/app.ts
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import startupRoutes from "./routes/startupRoutes";
import productRoutes from "./routes/productRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/startups", startupRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
