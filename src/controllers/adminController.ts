// src/controllers/adminController.ts
import { Request, Response } from "express";
import Startup from "../models/Startup";
import CompleteStartupDetailsSchema from "../models/company"
import { sendMail } from "../config/mailer";



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
    { status: "accepted", password },
    { new: true }
  );

  if (!startup) return res.status(404).json({ message: "Startup not found" });

  // Send email to founder
  await sendMail(
    startup.founderMail,
    "Your Startup Has Been Approved!",
    `Congratulations! Your startup "${startup.companyName}" has been approved.\n\nYour temporary password: ${password}`
  );

  res.json({ message: "Startup approved and email sent", startup });
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

  // Send email to founder
  await sendMail(
    startup.founderMail,
    "Your Startup Has Been Rejected",
    `We are sorry to inform you that your startup "${startup.companyName}" has been rejected.`
  );

  res.json({ message: "Startup rejected and email sent", startup });
};

// View pending Company/Product
export const getPendingCompany = async (_req: Request, res: Response) => {
  const companies = await CompleteStartupDetailsSchema.find({ status: "pending" }).populate("startupId", "companyName founderMail");
  res.json(companies);
};

// Approve product
export const approveCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await CompleteStartupDetailsSchema.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true }
  ).populate("startupId", "companyName founderMail");

  if (!company) return res.status(404).json({ message: "Product not found" });

  if (company.startupId) {
    await sendMail(
      (company.startupId as any).founderMail,
      "Your Product Has Been Approved",
      `Good news! Your product "${company.businessRegistrationNo}" from startup "${(company.startupId as any).companyName}" has been approved.`
    );
  }

  res.json({ message: "Product approved and email sent", company });
};

// Reject product
export const rejectCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await CompleteStartupDetailsSchema.findByIdAndUpdate(
    id,
    { status: "rejected" },
    { new: true }
  ).populate("startupId", "companyName founderMail");

  if (!company) return res.status(404).json({ message: "Product not found" });

  if (company.startupId) {
    await sendMail(
      (company.startupId as any).founderMail,
      "Your Product Has Been Rejected",
      `We are sorry to inform you that your product "${company.businessRegistrationNo}" from startup "${(company.startupId as any).companyName}" has been rejected.`
    );
  }

  res.json({ message: "Product rejected and email sent", company });
};
