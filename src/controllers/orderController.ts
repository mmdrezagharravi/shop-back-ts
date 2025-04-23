// // controllers/orderController.ts
// import { Request, Response } from "express";
// import { Order } from "../models/Order";
// import { Cart } from "../models/Cart";

// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const userId = req.body.userId;

//     const cart = await Cart.findOne({ userId }).populate("items.productId");

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "سبد خرید خالی است." });
//     }

//     // محاسبه مجموع قیمت
//     const totalPrice = cart.items.reduce((sum, item) => {
//       const product = item.product as any; // چون populate کردیم
//       return sum + product.price * item.quantity;
//     }, 0);

//     const items = cart.items.map((item) => ({
//       product: item.product._id,
//       quantity: item.quantity,
//     }));

//     const newOrder = new Order({
//       userId,
//       items,
//       totalPrice,
//       status: "pending",
//     });

//     await newOrder.save();
//     await Cart.deleteOne({ userId });

//     res.status(201).json({ message: "okkk", order: newOrder });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "error in oreder api !!!!" });
//   }
// };
