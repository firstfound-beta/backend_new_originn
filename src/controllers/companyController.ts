// src/controllers/productController.ts
import { Request, Response } from "express";
import CompleteStartupDetailsSchema from "../models/company";

// Register product (X2)
export const registerCompany = async (req: Request, res: Response) => {
  try {
    const { startupId, name, description, imageUrl } = req.body;
    console.log('startupid', startupId);
    

    const company  = new CompleteStartupDetailsSchema({  startupId, name, description, imageUrl });
    console.log('company', company);
    
    await company.save();
    console.log('here');
    

    res.status(201).json({ message: "Product submitted for approval", company });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Public products (X1)
export const getApprovedCompanys = async (req: Request, res: Response) => {
  const products = await CompleteStartupDetailsSchema.find({ status: "approved" }).populate("startupId", "name");
  res.json(products);
};
