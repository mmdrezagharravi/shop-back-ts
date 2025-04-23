// models/Order.ts
import mongoose, { Schema, model, Types } from "mongoose";

interface IOrder {
  userId: Types.ObjectId;
  items: { product: Types.ObjectId; quantity: number }[];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true } // اضافه کردن createdAt و updatedAt به صورت خودکار
);

export const Order = model<IOrder>("Order", orderSchema);
