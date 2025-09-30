// src/controllers/productController.ts
import { Request, Response } from "express";
import Product from "../models/Product";

// Register product (X2)
export const registerProduct = async (req: Request, res: Response) => {
  try {
    const { startupId, name, description, imageUrl } = req.body;

    const product = new Product({ startup: startupId, name, description, imageUrl });
    await product.save();

    res.status(201).json({ message: "Product submitted for approval", product });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Public products (X1)
export const getApprovedProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ status: "accepted" }).populate("startup", "name");
  res.json(products);
};
