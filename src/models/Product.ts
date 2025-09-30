// src/models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  startup: mongoose.Types.ObjectId;
  name: string;
  description: string;
  imageUrl?: string;
  status: "pending" | "accepted" | "rejected";
}

const ProductSchema: Schema = new Schema(
  {
    startup: { type: Schema.Types.ObjectId, ref: "Startup", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>(
  "Product",
  ProductSchema,
  "newProducts"
);
