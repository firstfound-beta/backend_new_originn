// src/controllers/adminController.ts
import { Request, Response } from "express";
import Startup from "../models/Startup";
import Product from "../models/Product";

// View pending startups
export const getPendingStartups = async (_req: Request, res: Response) => {
  const startups = await Startup.find({ status: "pending" });
  res.json(startups);
};

// Approve startup
export const approveStartup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const password = Math.random().toString(36).slice(-8); // random password

  const startup = await Startup.findByIdAndUpdate(
    id,
    { status: "active", password },
    { new: true }
  );

  if (!startup) return res.status(404).json({ message: "Startup not found" });

  res.json({ message: "Startup approved", startup });
};

// Reject startup
export const rejectStartup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const startup = await Startup.findByIdAndUpdate(
    id,
    { status: "rejected" },
    { new: true }
  );

  if (!startup) return res.status(404).json({ message: "Startup not found" });

  res.json({ message: "Startup rejected", startup });
};

// View pending products
export const getPendingProducts = async (_req: Request, res: Response) => {
  const products = await Product.find({ status: "pending" }).populate("startup", "name");
  res.json(products);
};

// Approve product
export const approveProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { status: "accepted" }, { new: true });

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product approved", product });
};

// Reject product
export const rejectProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { status: "rejected" }, { new: true });

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product rejected", product });
};
