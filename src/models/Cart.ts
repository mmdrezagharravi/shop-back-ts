import { Schema, model, Types } from "mongoose";

interface ICart {
  user: Types.ObjectId;
  items: { product: Types.ObjectId; quantity: number }[];
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true } // اضافه کردن createdAt و updatedAt به صورت خودکار
);

export const Cart = model<ICart>("Cart", cartSchema);
