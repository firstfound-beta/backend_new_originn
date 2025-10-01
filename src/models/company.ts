// models/CompleteStartupDetails.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICompleteStartupDetails extends Document {
  startupId: mongoose.Types.ObjectId; // reference to Startup
  logo: string;
  businessRegistrationNo: string;
  links?: {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
  category: string;
  description: string;
  coverPhoto: string;

  teamDetails: {
    name: string;
    designation: string;
    institution: string;
    photo: string;
  }[];

  founderDetails: {
    name: string;
    designation: string;
    institution: string;
    photo: string;
    description: string;
  }[];

  status: "pending" | "approved" | "rejected"; // admin workflow
}

const CompleteStartupDetailsSchema = new Schema<ICompleteStartupDetails>(
  {
    startupId: { type: Schema.Types.ObjectId, ref: "Startup", required: true },
    logo: { type: String },
    businessRegistrationNo: { type: String },
    links: {
      linkedin: String,
      instagram: String,
      youtube: String,
      twitter: String,
    },
    category: { type: String },
    description: { type: String },
    coverPhoto: { type: String },

    teamDetails: [
      {
        name: String,
        designation: String,
        institution: String,
        photo: String,
      },
    ],

    founderDetails: [
      {
        name: String,
        designation: String,
        institution: String,
        photo: String,
        description: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICompleteStartupDetails>(
  "CompleteStartupDetails",
  CompleteStartupDetailsSchema
);
