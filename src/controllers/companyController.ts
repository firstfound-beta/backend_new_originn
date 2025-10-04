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
  const products = await CompleteStartupDetailsSchema.find({ status: "approved" }).populate("startupId");
  console.log('products', products);
  
  res.json(products);
};

export const getCompanyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const startup = await CompleteStartupDetailsSchema.findById(id);

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.json(startup);
  } catch (error) {
    console.error("Error fetching startup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
