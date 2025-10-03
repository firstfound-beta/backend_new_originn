// src/controllers/adminController.ts
import { Request, Response } from "express";
import Startup from "../models/Startup";
import CompleteStartupDetailsSchema from "../models/company";

// View  startups
export const getPendingStartups = async (_req: Request, res: Response) => {
  const startups = await Startup.find();
  res.json(startups);
};

// Approve startup
export const approveStartup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const password = Math.random().toString(36).slice(-8); // random password

  const startup = await Startup.findByIdAndUpdate(
    id,
    { status: "accepted", password },
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

// View pending Company
export const getPendingCompany = async (_req: Request, res: Response) => {
 const companies = await CompleteStartupDetailsSchema.find()
    .populate("startupId");
  console.log('companies', companies);
  
  res.json(companies);
};

// Approve product
export const approveCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await CompleteStartupDetailsSchema.findByIdAndUpdate(id, { status: "approved" }, { new: true });

  if (!company) return res.status(404).json({ message: "Company not found" });

  res.json({ message: "Product approved", company });
};

// Reject product
export const rejectCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await CompleteStartupDetailsSchema.findByIdAndUpdate(id, { status: "rejected" }, { new: true });

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product rejected", product });
};
