import mongoose, { Document, Schema } from "mongoose";

export interface IStartup extends Document {
  companyName: string;
  about: string;
  companyWebsite?: string;
  founderTitle: "Mr" | "Ms" | "Miss";
  founderName: string;
  founderMail: string;
  founderPhone: string;
  instituteName: string;
  pitchDeckPath?: string;
  password?: string;
  teamMembers: number;
  stage: "Idea" | "Prototype" | "Pre-Revenue" | "Revenue";
  address: string;
  status: "pending" | "accepted" | "rejected";  // new field
}

const StartupSchema = new Schema<IStartup>(
  {
    companyName: { type: String, required: true },
    about: { type: String, required: true },
    companyWebsite: { type: String },
    founderTitle: { type: String, enum: ["Mr", "Ms", "Miss"], required: true },
    founderName: { type: String, required: true },
    founderMail: { type: String, required: true },
    founderPhone: { type: String, required: true },
    instituteName: { type: String, required: true },
    pitchDeckPath: { type: String },
    teamMembers: { type: Number, required: true },
    password:{type:String},
    stage: {
      type: String,
      enum: ["Idea", "Prototype", "Pre-Revenue", "Revenue"],
      required: true,
    },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStartup>("Startup", StartupSchema, "newStartups");
