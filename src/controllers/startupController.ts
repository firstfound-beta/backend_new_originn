// src/controllers/startupController.ts
import { Request, Response } from "express";
import Startup from "../models/Startup";

// Register startup (X2)
export const registerStartup = async (req: Request, res: Response) => {
  try {
    console.log("Received body:", req.body);
    //  console.log('startup', startup);

    const data = {
      ...req.body,
      founderPhone: req.body.founderPhone?.trim() || "N/A",
      teamMembers: Number(req.body.teamMembers || 0),
      pitchDeckPath: req.body.pitchDeckPath || "",
      address: req.body.address || "N/A",
      instituteName: req.body.instituteName || "N/A",
    };
    const startup = new Startup(data);
    console.log('startup', startup);

    await startup.save();
    console.log("here");
    res
      .status(201)
      .json({ message: "Startup submitted for approval", startup });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Login (only approved startups)
export const loginStartup = async (req: Request, res: Response) => {
  const { founderMail, password } = req.body;
  console.log("mail ,pass", founderMail, password);

  const startup = await Startup.findOne({ founderMail, status: "accepted" });

  console.log("startup", startup);
  if (!startup || startup.password !== password) {
    return res
      .status(401)
      .json({ message: "Invalid credentials or not approved" });
  }

  res.json({ message: "Login successful", startupId: startup._id });
};

// Dashboard (dummy for now)
export const getDashboard = async (req: Request, res: Response) => {
  const { startupId } = req.query;
  const startup = await Startup.findById(startupId);

  if (!startup) return res.status(404).json({ message: "Startup not found" });

  res.json({
    dashboard: `Welcome ${startup.companyName}, this is your dashboard.`,
  });
};
